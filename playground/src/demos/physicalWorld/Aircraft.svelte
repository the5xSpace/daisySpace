<script>
// =============================================================================
// Aircraft Demo — 低空四旋翼巡检与波束扫描
//
// 本示例演示 Aircraft 作为低空无人机平台时的完整任务过程：
// 1. 使用 PathBuilder 创建短途巡检轨迹
// 2. 使用 RouteComponent 标注航点与目标区
// 3. 使用 Aircraft 挂载模型、轨迹和标签
// 4. 使用 Aircraft.addSensor() 创建下视扫描波束与实时 footprint
// 5. 使用相机跟随与任务面板展示飞行/探测状态
//
// 关键 API：
// - Daisy.PW.Aircraft: 飞行器/无人机对象
// - Daisy.PW.RouteComponent: 航路与航点表现
// - Aircraft.addSensor(): 为飞行器挂载物理传感器
// - beamAttitudeDeg: 动态扫描姿态
// - footPrint: 实时地面扫描足迹
// =============================================================================

import DemoPanel from "../../shell/DemoPanel.svelte";

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const C3 = Daisy.Cartesian3;
const C2 = Daisy.Cartesian2;
const Color = Daisy.Color;
const JD = Daisy.JulianDate;

// 资源目录当前没有显式命名的四轴 GLB；放入模型后只需要替换这里。
const quadrotorModelUrl = Daisy.BuildModuleUrl.getUrl("models/uav2.glb");

// ── 1. 场景与时间 ─────────────────────────────────────────────────────────────
const start = JD.fromDate(new Date("2026-04-20T06:00:00Z"));
const stop = JD.addMinutes(start, 9, new JD());
const initialTime = JD.addSeconds(start, 85, new JD());

engine.geoLayer.clearImagery();
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    minLevel: 0,
    maxLevel: 18,
});
engine.geoLayer.setTerrain({ type: Daisy.GeoTerrainType.Ellipsoid });
engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });
engine.geoLayer.setGlobeOptions({
    show: true,
    depthTestAgainstTerrain: true,
    enableLighting: true,
});

engine.geoLayer.setFog({ enabled: true, density: 1.8e-4 });

engine.setSceneTime(start, stop, true);
engine.setCurrentTime(initialTime);
engine.setMultiplier(5);
engine.setLoop(true);
engine.play();

engine.addWidget(new Daisy.ControlPanelWidget({
    mode: "lite",
    preset: "rightTop",
    layout: "row",
    draggable: true,
}));
engine.addWidget(new Daisy.TimelineWidget());

// ── 2. 短途巡检航线 ───────────────────────────────────────────────────────────
const missionWaypoints = [
    {
        id: "A",
        label: "起飞点",
        subtitle: "巡检车停机坪 · 120m",
        lon: 121.17688,
        lat: 31.15458,
        alt: 120,
    },
    {
        id: "B",
        label: "河道入口",
        subtitle: "进入低空搜索航段 · 180m",
        lon: 121.1818,
        lat: 31.15632,
        alt: 180,
    },
    {
        id: "C",
        label: "目标区",
        subtitle: "波束扫描重点区 · 220m",
        lon: 121.18672,
        lat: 31.15808,
        alt: 220,
    },
    {
        id: "D",
        label: "复扫航点",
        subtitle: "侧向补扫 · 190m",
        lon: 121.19016,
        lat: 31.1557,
        alt: 190,
    },
    {
        id: "E",
        label: "返航点",
        subtitle: "回收准备 · 130m",
        lon: 121.18496,
        lat: 31.1528,
        alt: 130,
    },
];

const routePositions = missionWaypoints.map((wp) => C3.fromDegrees(wp.lon, wp.lat, 0));
const aircraftPositions = missionWaypoints.map((wp) => C3.fromDegrees(wp.lon, wp.lat, wp.alt));
const routeDurationSeconds = JD.secondsDifference(stop, start);
const trajectorySampleRateHz = 24;
const trajectory = new Daisy.PathBuilder()
    .fromWaypoints(aircraftPositions)
    .bezier(8, 20)
    .buildTrajectory(start, stop, {
        timeDistribution: 18,
        sampleRateHz: trajectorySampleRateHz,
    });

const routeLinePositions = new Daisy.PathBuilder()
    .fromWaypoints(routePositions)
    .bezier(8, 20)
    .buildPositions();

const routeHost = new Daisy.PW.FreeObject({
    name: "UAV-Route-Host",
    position: C3.fromDegrees(0, 0, 0),
    point: false,
    label: false,
    path: false,
});
routeHost.bindEngine(engine);

const routeComponent = new Daisy.PW.RouteComponent({
    waypoints: missionWaypoints.map((wp) => ({
        position: C3.fromDegrees(wp.lon, wp.lat, 0),
        label: `${wp.id} ${wp.label}`,
        subtitle: wp.subtitle,
        popoverContent: `
            <div style="display:grid;gap:4px;font-size:12px">
                <div>${wp.subtitle}</div>
                <div style="color:var(--panel-text-muted)">经度: ${wp.lon.toFixed(5)}</div>
                <div style="color:var(--panel-text-muted)">纬度: ${wp.lat.toFixed(5)}</div>
                <div style="color:var(--panel-text-muted)">任务高度: ${wp.alt} m</div>
            </div>
        `,
    })),
    lineWidth: 3,
    material: Daisy.MaterialFactory.PolylineArrow({
        color: "#22d3ee",
        speed: 1.15,
        arrowSize: 20,
    }),
    curveType: "bezier",
    bezierTension: 8,
    bezierSamples: 20,
    showLine: true,
    showLabels: true,
    showIcons: true,
    outline: false,
    iconScale: 1.05,
    labelFont: "bold 12px sans-serif",
    labelColor: Color.WHITE,
    labelOffsetY: -30,
    popoverTrigger: "hover",
});
routeHost.addComponent(routeComponent);

// ── 3. 目标点与地面辅助线 ───────────────────────────────────────────────────
const targetSpecs = [
    {
        name: "Target-A",
        label: "目标 A",
        lon: 121.1858,
        lat: 31.1575,
        color: Color.ORANGE,
        type: "疑似热源",
    },
    {
        name: "Target-B",
        label: "目标 B",
        lon: 121.18835,
        lat: 31.15662,
        color: Color.RED,
        type: "车辆/设备",
    },
    {
        name: "Target-C",
        label: "目标 C",
        lon: 121.18392,
        lat: 31.15428,
        color: Color.LIME,
        type: "回传参考点",
    },
];

const targetObjects = targetSpecs.map((spec) => {
    const obj = new Daisy.PW.FreeObject({
        name: spec.name,
        position: C3.fromDegrees(spec.lon, spec.lat, 8),
        point: {
            sizePx: 13,
            color: spec.color.withAlpha(0.92),
            outlineColor: Color.WHITE,
            outlineWidth: 2,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
        label: {
            text: `${spec.label} · ${spec.type}`,
            font: "bold 12px sans-serif",
            offsetPx: new C2(0, -20),
            showBackground: true,
            backgroundColor: Color.BLACK.withAlpha(0.48),
            fillColor: Color.WHITE,
        },
        path: false,
        model: false,
    });
    obj.bindEngine(engine);
    return obj;
});

const scanArea = engine.createEntity("UAV-Scan-Area");
scanArea.position = C3.fromDegrees(121.18692, 31.15672, 16);
scanArea.addFeature(new Daisy.EllipsoidFeature({
    radii: new C3(230, 145, 4),
    color: Color.CYAN.withAlpha(0.1),
    outline: true,
    outlineColor: Color.CYAN.withAlpha(0.72),
    outlineWidth: 1,
    emitDirection: Daisy.EmitDirection.CENTER,
}));
scanArea.addFeature(new Daisy.UI.LabelFeature({
    text: "SCAN ZONE",
    font: "bold 12px sans-serif",
    offsetPx: new C2(0, -24),
    showBackground: true,
    backgroundColor: Color.BLACK.withAlpha(0.42),
    fillColor: Color.CYAN,
}));

// ── 4. 创建无人机 Aircraft ──────────────────────────────────────────────────
const aircraft = new Daisy.PW.Aircraft({
    name: "UAV-Quad-01",
    model: {
        url: quadrotorModelUrl,
        minimumPixelSize: 72,
        maximumScale: 600,
        scale: 0.32,
        shadows: Daisy.ShadowMode.ENABLED,
        color: Color.WHITE,
        colorBlendAmount: 0.08,
    },
    modelDistanceFallbackPoint: {
        enabled: true,
        sizePx: 10,
        color: Color.CYAN,
        outlineColor: Color.WHITE,
        outlineWidth: 2,
    },
    point: false,
    path: {
        show: true,
        width: 3,
        color: Color.CYAN.withAlpha(0.46),
        historyColor: Color.CYAN.withAlpha(0.92),
        futureColor: Color.LIME.withAlpha(0.42),
        historySecond: routeDurationSeconds,
        futureSecond: routeDurationSeconds,
        resolutionSecond: 2,
        updateIntervalSecond: 0.2,
        autoOptimize: false,
        maxDirectionInterpolationCount: 900,
    },
    label: {
        text: "UAV-Quad-01",
        font: "bold 13px sans-serif",
        offsetPx: new C2(0, -28),
        showBackground: true,
        backgroundColor: Color.BLACK.withAlpha(0.48),
        backgroundPadding: new C2(8, 5),
        fillColor: Color.WHITE,
    },
});
aircraft.position = trajectory;
aircraft.orientation = trajectory.getVelocityOrientation();
aircraft.bindEngine(engine);

const modelFeature = aircraft.entity.getFeatures().find((f) => f.type === "ModelFeature");
if (modelFeature) {
    modelFeature.onload(() => {
        const anims = modelFeature.getAnimationInfos();
        __log?.(`模型动画列表: ${anims.length} 个 - ${anims.map((a) => `${a.index}:${a.name ?? "unnamed"}`).join(", ")}`);
        // 旋翼动画（每个旋翼一个独立动画）
        const rotorAnimations = anims.filter(
            (a) => a.name?.toLowerCase().includes("motor_props")
        );
        if (rotorAnimations.length > 0) {
            // 为每个旋翼动画单独启动（确保每个 index 都被独立 add）
            for (const anim of rotorAnimations) {
                modelFeature.playAnimation({
                    index: anim.index,
                    loop: Daisy.ModelAnimationLoop.REPEAT,
                    multiplier: 3.0,
                });
            }
            __log?.(`已为 ${rotorAnimations.length} 个旋翼启动独立动画`);
        } else {
            // 没有匹配到 motor_props，回退到全部播放
            const ids = modelFeature.playAllAnimations({
                loop: Daisy.ModelAnimationLoop.REPEAT,
                multiplier: 3.0,
            });
            __log?.(`回退到 playAllAnimations: 启动了 ${ids.length} 个动画`);
        }
    });
}

const scanPeriodSeconds = 28;
function beamAttitudeDeg(time) {
    const dt = JD.secondsDifference(time, start);
    const phase = (dt / scanPeriodSeconds) * Math.PI * 2;
    return {
        azimuthDeg: 28 * Math.sin(phase),
        elevationDeg: -8 + 5 * Math.cos(phase * 0.7),
        rollDeg: 0,
    };
}

const scanSensor = aircraft.addSensor({
    name: "UAV-EO-Scanner",
    type: Daisy.PW.SensorType.EllipticalCone,
    emitDirection: Daisy.EmitDirection.TO_GROUND,
    apertureDeg: { xDeg: 24, yDeg: 12 },
    beamLength: 460,
    color: Color.CYAN.withAlpha(0.34),
    outline: true,
    outlineColor: Color.WHITE.withAlpha(0.78),
    outlineWidth: 1,
    slices: 48,
    beamAttitudeDeg,
    footPrint: {
        show: true,
        fillColor: Color.CYAN.withAlpha(0.2),
        outline: true,
        outlineColor: Color.CYAN.withAlpha(0.92),
        outlineWidthPx: 2,
        footprintTimes: { start, end: stop },
        sampleStepSeconds: 3,
        retainSeconds: 120,
        maxSampleCount: 260,
    },
});

// ── 5. 相机与运行状态 ───────────────────────────────────────────────────────
let cameraMode = $state("follow");
let missionInfo = $state({
    stage: "起飞",
    progress: 0,
    lat: 0,
    lon: 0,
    alt: 0,
    speed: 0,
    nearestTarget: "Target-A",
    range: 0,
    scanAz: 0,
    time: "",
});

let _lastPos;
let _lastTickMs;

function getTargetPosition(spec) {
    return C3.fromDegrees(spec.lon, spec.lat, 8);
}

function getMissionStage(progress) {
    if (progress < 0.14) return "起飞爬升";
    if (progress < 0.42) return "航线巡飞";
    if (progress < 0.68) return "目标扫描";
    if (progress < 0.86) return "侧向复扫";
    return "返航回收";
}

function applyFollowCamera() {
    cameraMode = "follow";
    engine.camera.followTarget(aircraft, {
        view: {
            distance: 60,
            pitchDeg: -30,
            headingDeg: -120,
        },
        arcRotate: {
            enableGroundCollisionSlide: false,
            targetFrameMode: "enu",
        },
        installInputListeners: true,
    });
    engine.camera.setFrustumNear?.(0.1);
    __log?.("相机：跟随无人机，可拖拽环绕观察波束。");
}

function applyOverviewCamera() {
    cameraMode = "overview";
    engine.camera.removeTrackedDaisyEntity?.();
    engine.camera.flyToTarget(routeLinePositions, {
        offset: new Daisy.HeadingPitchRange(
            Daisy.Math.toRadians(28),
            Daisy.Math.toRadians(-56),
            2500,
        ),
        duration: 0.8,
    });
    __log?.("相机：任务全景。");
}

function applyScanCamera() {
    cameraMode = "scan";
    engine.camera.removeTrackedDaisyEntity?.();
    engine.camera.flyToTarget([aircraft.entity, scanArea].filter(Boolean), {
        offset: new Daisy.HeadingPitchRange(
            Daisy.Math.toRadians(-18),
            Daisy.Math.toRadians(-68),
            1200,
        ),
        duration: 0.8,
    });
    __log?.("相机：俯视扫描区。");
}

applyFollowCamera();

const statsTimer = globalThis.setInterval(() => {
    const time = engine.getCurrentTime?.();
    if (!time) return;
    const pos = aircraft.getCurrentPosition?.();
    if (!pos) return;

    const nowMs = globalThis.performance?.now?.() ?? Date.now();
    const carto = Daisy.Cartographic.fromCartesian(pos);
    const elapsed = Math.max(0, JD.secondsDifference(time, start));
    const progress = Math.max(0, Math.min(1, elapsed / routeDurationSeconds));
    const attitude = beamAttitudeDeg(time);

    let speed = missionInfo.speed;
    if (_lastPos && _lastTickMs) {
        const dt = Math.max(0.001, (nowMs - _lastTickMs) / 1000);
        speed = Math.round(Daisy.Cartesian3.distance(pos, _lastPos) / dt);
    }
    _lastPos = Daisy.Cartesian3.clone(pos);
    _lastTickMs = nowMs;

    let nearest = targetSpecs[0];
    let nearestDistance = Number.POSITIVE_INFINITY;
    for (const spec of targetSpecs) {
        const d = Daisy.Cartesian3.distance(pos, getTargetPosition(spec));
        if (d < nearestDistance) {
            nearest = spec;
            nearestDistance = d;
        }
    }

    missionInfo = {
        stage: getMissionStage(progress),
        progress: Math.round(progress * 100),
        lat: Daisy.Math.toDegrees(carto.latitude),
        lon: Daisy.Math.toDegrees(carto.longitude),
        alt: Math.round(carto.height),
        speed,
        nearestTarget: nearest.label,
        range: Math.round(nearestDistance),
        scanAz: Math.round(attitude.azimuthDeg),
        time: Daisy.JulianDate.toDate(time).toTimeString().slice(0, 8),
    };

    try {
        aircraft.label?.setText?.(`UAV-Quad-01 · ${missionInfo.alt}m`);
    } catch {}
}, 220);

registerCleanup?.(() => {
    globalThis.clearInterval(statsTimer);
    try { engine.camera.removeTrackedDaisyEntity?.(); } catch {}
    try { aircraft.destroy(); } catch {}
    try { routeHost.destroy(); } catch {}
    try { scanArea.destroy(); } catch {}
    for (const obj of targetObjects) {
        try { obj.destroy(); } catch {}
    }
});

__log?.("Aircraft 示例已升级：短途无人机巡飞 + 下视波束扫描 + 实时 footprint。");
</script>

<DemoPanel title="四旋翼巡检任务" width="340px" right="14px" left="auto" top="64px">
    <div class="mission-head">
        <div>
            <div class="eyebrow">UAV MISSION</div>
            <h3>短途无人机巡飞</h3>
        </div>
        <span class="state-pill">{missionInfo.stage}</span>
    </div>

    <div class="progress-block">
        <div class="progress-meta">
            <span>任务进度</span>
            <b>{missionInfo.progress}%</b>
        </div>
        <div class="progress-track">
            <div style={`width:${missionInfo.progress}%`}></div>
        </div>
    </div>

    <div class="metric-grid">
        <div>
            <span>高度</span>
            <strong>{missionInfo.alt} m</strong>
        </div>
        <div>
            <span>地速</span>
            <strong>{missionInfo.speed} m/s</strong>
        </div>
        <div>
            <span>扫描偏角</span>
            <strong>{missionInfo.scanAz}°</strong>
        </div>
        <div>
            <span>时间 UTC</span>
            <strong>{missionInfo.time}</strong>
        </div>
    </div>

    <div class="target-card">
        <div>
            <span>最近目标</span>
            <strong>{missionInfo.nearestTarget}</strong>
        </div>
        <b>{missionInfo.range} m</b>
    </div>

    <div class="waypoint-list">
        {#each missionWaypoints as wp}
            <div class="waypoint">
                <span>{wp.id}</span>
                <div>
                    <b>{wp.label}</b>
                    <small>{wp.alt}m · {wp.subtitle}</small>
                </div>
            </div>
        {/each}
    </div>

    <div class="camera-controls">
        <button class:active={cameraMode === "follow"} onclick={applyFollowCamera}>跟随</button>
        <button class:active={cameraMode === "overview"} onclick={applyOverviewCamera}>全景</button>
        <button class:active={cameraMode === "scan"} onclick={applyScanCamera}>扫描区</button>
    </div>

    <div class="legend">
        <span><i class="line route"></i>航线</span>
        <span><i class="line trail"></i>飞行轨迹</span>
        <span><i class="dot beam"></i>波束足迹</span>
        <span><i class="dot target"></i>探测目标</span>
    </div>
</DemoPanel>

<style>
    .mission-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 12px;
    }

    .eyebrow {
        color: var(--panel-accent);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.13em;
    }

    h3 {
        margin: 3px 0 0;
        color: var(--panel-text-bright);
        font-size: 18px;
        line-height: 1.2;
    }

    .state-pill {
        flex: 0 0 auto;
        padding: 5px 9px;
        border-radius: 999px;
        background: rgba(34, 211, 238, 0.14);
        color: #67e8f9;
        font-size: 11px;
        font-weight: 800;
        white-space: nowrap;
    }

    .progress-block {
        margin-bottom: 12px;
    }

    .progress-meta {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
        color: var(--panel-text-muted);
        font-size: 11px;
    }

    .progress-meta b {
        color: var(--panel-text-bright);
        font-variant-numeric: tabular-nums;
    }

    .progress-track {
        height: 8px;
        overflow: hidden;
        border-radius: 999px;
        background: rgba(148, 163, 184, 0.16);
    }

    .progress-track div {
        height: 100%;
        border-radius: inherit;
        background: linear-gradient(90deg, #22d3ee, #84cc16);
        transition: width 0.18s ease;
    }

    .metric-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
        margin-bottom: 10px;
    }

    .metric-grid div,
    .target-card {
        border: 1px solid var(--panel-border);
        border-radius: 8px;
        background: var(--panel-bg-card);
    }

    .metric-grid div {
        padding: 8px 9px;
    }

    .metric-grid span,
    .target-card span {
        display: block;
        color: var(--panel-text-muted);
        font-size: 10px;
        line-height: 1.1;
    }

    .metric-grid strong,
    .target-card strong {
        display: block;
        margin-top: 5px;
        color: var(--panel-text-bright);
        font-size: 13px;
        line-height: 1.1;
        font-variant-numeric: tabular-nums;
    }

    .target-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 9px 10px;
        margin-bottom: 10px;
    }

    .target-card b {
        color: #facc15;
        font-size: 13px;
        font-variant-numeric: tabular-nums;
    }

    .waypoint-list {
        display: grid;
        gap: 6px;
        margin-bottom: 12px;
    }

    .waypoint {
        display: grid;
        grid-template-columns: 24px 1fr;
        align-items: center;
        gap: 8px;
        padding: 7px 9px;
        border: 1px solid rgba(148, 163, 184, 0.14);
        border-radius: 8px;
        background: rgba(15, 23, 42, 0.3);
    }

    .waypoint > span {
        display: grid;
        place-items: center;
        width: 24px;
        height: 24px;
        border-radius: 7px;
        background: rgba(34, 211, 238, 0.14);
        color: #67e8f9;
        font-size: 11px;
        font-weight: 800;
    }

    .waypoint b {
        display: block;
        color: var(--panel-text-bright);
        font-size: 12px;
        line-height: 1.15;
    }

    .waypoint small {
        display: block;
        margin-top: 3px;
        color: var(--panel-text-muted);
        font-size: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .camera-controls {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4px;
        padding: 4px;
        border: 1px solid var(--panel-border);
        border-radius: 8px;
        background: rgba(2, 8, 15, 0.34);
    }

    button {
        height: 30px;
        border: 0;
        border-radius: 6px;
        background: transparent;
        color: var(--panel-text-muted);
        font-size: 12px;
        font-weight: 800;
        cursor: pointer;
    }

    button:hover {
        color: var(--panel-text-bright);
        background: var(--panel-btn-bg);
    }

    button.active {
        color: #06121d;
        background: #67e8f9;
    }

    .legend {
        display: flex;
        flex-wrap: wrap;
        gap: 8px 12px;
        margin-top: 12px;
        padding-top: 10px;
        border-top: 1px solid var(--panel-border);
        color: var(--panel-text-muted);
        font-size: 11px;
    }

    .legend span {
        display: inline-flex;
        align-items: center;
        gap: 5px;
    }

    .line {
        width: 18px;
        height: 3px;
        border-radius: 999px;
    }

    .route {
        background: #22d3ee;
        box-shadow: 0 0 8px rgba(34, 211, 238, 0.7);
    }

    .trail {
        background: #84cc16;
    }

    .dot {
        width: 9px;
        height: 9px;
        border-radius: 999px;
    }

    .beam {
        background: rgba(34, 211, 238, 0.62);
        box-shadow: 0 0 8px rgba(34, 211, 238, 0.8);
    }

    .target {
        background: #f97316;
        box-shadow: 0 0 8px rgba(249, 115, 22, 0.8);
    }
</style>
