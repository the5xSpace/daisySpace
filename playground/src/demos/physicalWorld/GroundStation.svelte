<script>
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const siteLon = 116.4074;
const siteLat = 39.9042;
const siteAlt = 80;
const orbitRadiusMeters = 85_000;
const patrolAltitude = 12_500;
const missionStart = Daisy.JulianDate.fromDate(new Date("2026-04-20T06:00:00Z"));
const missionStop = Daisy.JulianDate.addSeconds(missionStart, 60 * 60, new Daisy.JulianDate());
const initialTime = Daisy.JulianDate.addSeconds(missionStart, 8 * 60, new Daisy.JulianDate());
const activeWindow = { start: missionStart, end: missionStop };

let telemetry = $state({
    rangeKm: "--",
    azimuthDeg: "--",
    elevationDeg: "--",
    linkState: "TRACKING",
    nodeState: "loading",
});

engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });
engine.geoLayer.setGlobeOptions({ show: true, baseColor: Daisy.Color.BLACK, depthTestAgainstTerrain: true });
engine.setSceneTime(missionStart, missionStop, true);
engine.setCurrentTime(initialTime);
engine.setMultiplier(12);
engine.setLoop(true);
engine.play();

function makeCircularTrajectory() {
    const trajectory = new Daisy.TrajectorySample(Daisy.ReferenceFrame.FIXED, {
        interpolationAlgorithm: "LAGRANGE",
        interpolationDegree: 5,
    });
    const latMeters = 111_320;
    const lonMeters = latMeters * Math.cos(Daisy.Math.toRadians(siteLat));
    const samples = [];
    for (let i = 0; i <= 96; i++) {
        const t = Daisy.JulianDate.addSeconds(missionStart, i * 45, new Daisy.JulianDate());
        const phase = (i / 48) * Math.PI * 2;
        const lon = siteLon + (Math.cos(phase) * orbitRadiusMeters) / lonMeters;
        const lat = siteLat + (Math.sin(phase) * orbitRadiusMeters) / latMeters;
        const wave = Math.sin(phase * 2) * 900;
        samples.push({
            time: t,
            position: Daisy.Cartesian3.fromDegrees(lon, lat, patrolAltitude + wave),
        });
    }
    trajectory.pushData(samples);
    return trajectory;
}

function makePatrolRing() {
    const latMeters = 111_320;
    const lonMeters = latMeters * Math.cos(Daisy.Math.toRadians(siteLat));
    const points = [];
    for (let i = 0; i <= 96; i++) {
        const phase = (i / 96) * Math.PI * 2;
        const lon = siteLon + (Math.cos(phase) * orbitRadiusMeters) / lonMeters;
        const lat = siteLat + (Math.sin(phase) * orbitRadiusMeters) / latMeters;
        points.push(Daisy.Cartesian3.fromDegrees(lon, lat, patrolAltitude));
    }
    return points;
}

function computeLookAngles(sitePos, targetPos) {
    if (!sitePos || !targetPos) return undefined;
    const toTarget = Daisy.Cartesian3.subtract(targetPos, sitePos, new Daisy.Cartesian3());
    const range = Daisy.Cartesian3.magnitude(toTarget);
    if (!Number.isFinite(range) || range <= 1) return undefined;
    const enu = Daisy.Transforms.eastNorthUpToFixedFrame(sitePos);
    const invEnu = Daisy.Matrix4.inverseTransformation(enu, new Daisy.Matrix4());
    const local = Daisy.Matrix4.multiplyByPointAsVector(invEnu, toTarget, new Daisy.Cartesian3());
    const az = (Daisy.Math.toDegrees(Math.atan2(local.x, local.y)) + 360) % 360;
    const el = Daisy.Math.toDegrees(Math.asin(Daisy.Math.clamp(local.z / range, -1, 1)));
    return { range, az, el };
}

const site = new Daisy.PW.GroundStation({
    name: "Beijing-DSN",
    stationModel: false,
    position: Daisy.Cartesian3.fromDegrees(siteLon, siteLat, siteAlt),
    point: false,
    label: {
        text: "Beijing-DSN",
        font: "13px sans-serif",
        offsetPx: new Daisy.Cartesian2(0, -26),
        showBackground: true,
        backgroundColor: Daisy.Color.BLACK.withAlpha(0.42),
    },
});
site.bindEngine(engine);

const patrolRing = new Daisy.PolylineFeature({
    name: "Patrol-Orbit",
    pathway: makePatrolRing(),
    width: 2,
    material: Daisy.Color.WHITE.withAlpha(0.32),
    loop: true,
    clampToGround: false,
    arcType: Daisy.ArcType.NONE,
});
site.entity.addFeature(patrolRing);

const aircraftTrajectory = makeCircularTrajectory();
const aircraft = new Daisy.PW.Aircraft({
    name: "Target-UAV",
    model: {
        url: Daisy.BuildModuleUrl.getUrl("models/GlobalHawk.glb"),
        minimumPixelSize: 64,
        maximumScale: 1600,
    },
    point: {
        size: 900,
        color: Daisy.Color.ORANGE,
        outlineColor: Daisy.Color.BLACK.withAlpha(0.6),
        outlineWidth: 1,
    },
    label: {
        text: "Target-UAV",
        font: "13px sans-serif",
        offsetPx: new Daisy.Cartesian2(0, -18),
        showBackground: true,
        backgroundColor: Daisy.Color.BLACK.withAlpha(0.42),
    },
    path: {
        show: true,
        width: 2,
        color: Daisy.Color.ORANGE.withAlpha(0.45),
        historyColor: Daisy.Color.ORANGE.withAlpha(0.85),
        futureColor: Daisy.Color.CYAN.withAlpha(0.55),
        historySecond: 12 * 60,
        futureSecond: 18 * 60,
        updateIntervalSecond: 1 / 12,
    },
});
aircraft.position = aircraftTrajectory;
aircraft.orientation = aircraftTrajectory.getVelocityOrientation();
aircraft.bindEngine(engine);

const trackPlan = [{ start: missionStart, end: missionStop, target: aircraft }];
const trackingBeam = site.addSensor({
    name: "Tracking-Beam",
    type: Daisy.PW.SensorType.EllipticalCone,
    emitDirection: Daisy.EmitDirection.TO_UP,
    apertureDeg: { xDeg: 4.5, yDeg: 4.5 },
    beamLength: 180_000,
    color: Daisy.Color.CYAN.withAlpha(0.34),
    outline: true,
    outlineColor: Daisy.Color.WHITE.withAlpha(0.72),
    outlineWidth: 1.2,
    link: {
        track: trackPlan,
        flow: { activeWhen: [activeWindow] },
    },
});

site.addLink({
    name: "Telemetry-Link",
    target: aircraft,
    color: Daisy.Color.LIME,
    width: 3,
    direction: "forward",
    speed: 1.35,
    show: [activeWindow],
    arcType: Daisy.ArcType.NONE,
});

function updateTelemetry() {
    const time = engine.getCurrentTime?.() ?? engine.getCurrentTime();
    const sitePos = site.entity?.getFrameAwarePosition?.(time) ?? site.entity?.getCurrentPosition?.();
    const targetPos = aircraft.entity?.getFrameAwarePosition?.(time) ?? aircraft.entity?.getCurrentPosition?.();
    const look = computeLookAngles(sitePos, targetPos);
    const modelNodes = site.getAntennaNodeNames?.() ?? [];
    if (look) {
        const antennaApplied = site.setAntennaPointing?.(look.az, look.el) === true;
        telemetry = {
            rangeKm: (look.range / 1000).toFixed(1),
            azimuthDeg: look.az.toFixed(1),
            elevationDeg: look.el.toFixed(1),
            linkState: look.el > 3 ? "LOCKED" : "SEARCH",
            nodeState: antennaApplied ? "tracking" : (modelNodes.length ? "model loaded" : "loading"),
        };
    }
}

const _removeTick = engine.onTick(updateTelemetry);
const statsTimer = globalThis.setInterval(updateTelemetry, 500);
registerCleanup?.(() => {
    _removeTick();
    globalThis.clearInterval(statsTimer);
});
updateTelemetry();

engine.camera.flyToTarget([site.entity, aircraft.entity], {
    duration: 0,
    offset: new Daisy.HeadingPitchRange(
        Daisy.Math.toRadians(-18),
        Daisy.Math.toRadians(-35),
        380_000,
    ),
});

__log?.("地面站 Demo 已创建: GroundStation 模型 + 盘旋飞机 + 实时跟踪波束 + 遥测链路");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="地面站">
    <div class="panel-top">
        <div>
            <div class="eyebrow">Ground Station</div>
            <h3>Beijing-DSN 跟踪工作台</h3>
        </div>
        <span class:searching={telemetry.linkState !== "LOCKED"}>{telemetry.linkState}</span>
    </div>

    <div class="metric-grid">
        <div>
            <span>目标距离</span>
            <strong>{telemetry.rangeKm}<small>km</small></strong>
        </div>
        <div>
            <span>方位角</span>
            <strong>{telemetry.azimuthDeg}<small>deg</small></strong>
        </div>
        <div>
            <span>俯仰角</span>
            <strong>{telemetry.elevationDeg}<small>deg</small></strong>
        </div>
        <div>
            <span>天线节点</span>
            <strong>{telemetry.nodeState}</strong>
        </div>
    </div>

    <div class="status-row">
        <span></span>
        <p>天线模型、传感器波束与链路同时追踪盘旋目标。</p>
    </div>
    </DemoPanel>

<style>
    .panel-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 14px;
    }

    .eyebrow {
        color: var(--panel-accent);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0;
        text-transform: uppercase;
    }

    h3 {
        margin: 4px 0 0;
        font-size: 17px;
        line-height: 1.25;
        letter-spacing: 0;
    }

    .panel-top span {
        flex: 0 0 auto;
        min-width: 68px;
        padding: 6px 9px;
        border-radius: 999px;
        color: #04150e;
        background: #30e89d;
        font-size: 11px;
        font-weight: 800;
        text-align: center;
    }

    .panel-top span.searching {
        color: #211705;
        background: #ffbd45;
    }

    .metric-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
    }

    .metric-grid div {
        min-width: 0;
        padding: 10px 11px;
        border: 1px solid var(--panel-border);
        border-radius: 6px;
        background: var(--panel-bg-card);
    }

    .metric-grid span {
        display: block;
        margin-bottom: 5px;
        color: var(--panel-text-label);
        font-size: 11px;
        font-weight: 700;
    }

    strong {
        display: block;
        min-height: 20px;
        overflow: hidden;
        color: var(--panel-text-bright);
        font-size: 16px;
        line-height: 1.2;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    small {
        margin-left: 3px;
        color: var(--panel-text-muted);
        font-size: 11px;
    }

    .status-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 12px;
        color: var(--panel-text-muted);
        font-size: 12px;
        line-height: 1.45;
    }

    .status-row span {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: #30e89d;
        box-shadow: 0 0 16px rgba(48, 232, 157, 0.86);
    }

    .status-row p {
        margin: 0;
    }
</style>
