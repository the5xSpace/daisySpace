<script>
// =============================================================================
// FreeObject Demo — 国外道路上的通用载荷平台
//
// 本示例把 FreeObject 讲成一个可装配、可切换能力的通用对象：
// 1. 车体沿国外真实道路轨迹移动
// 2. 同一对象可切换不同载荷/视觉组合
// 3. 统一使用 ArcGIS XYZ 影像底图，突出地面语义
//
// 关键 API：
// - Daisy.PW.FreeObject: 通用物理语义对象
// - position: 轨迹采样（TrajectorySampleBodyFixed）
// - model / label / path / popover / collisionBall / cube / arrowPoint
// - addSensor(): 为 FreeObject 挂载传感器
// - entity.setBodyAxis(): 显示对象本体坐标系，验证模型局部轴与姿态
// - bindEngine(engine): 绑定引擎
// - camera.followTarget(): 相机跟随目标
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const C3 = Daisy.Cartesian3;
const C2 = Daisy.Cartesian2;
const Color = Daisy.Color;
const JD = Daisy.JulianDate;
const routeHeightMeters = 6;

// ── 1. 场景与底图 ─────────────────────────────────────────────────────────────
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

const start = JD.fromDate(new Date("2026-04-20T02:00:00Z"));
// ── 2. 国外道路路线 ───────────────────────────────────────────────────────────
// 纽约曼哈顿：Times Square -> Columbus Circle 的真实 driving route
const routeWaypoints = [
    { lon: -73.985506, lat: 40.758002 },
    { lon: -73.985732, lat: 40.758046 },
    { lon: -73.986728, lat: 40.758462 },
    { lon: -73.988386, lat: 40.75916 },
    { lon: -73.987929, lat: 40.759787 },
    { lon: -73.987511, lat: 40.760361 },
    { lon: -73.986968, lat: 40.761105 },
    { lon: -73.986525, lat: 40.761723 },
    { lon: -73.985755, lat: 40.762769 },
    { lon: -73.985194, lat: 40.763557 },
    { lon: -73.984776, lat: 40.764112 },
    { lon: -73.984229, lat: 40.764856 },
    { lon: -73.983786, lat: 40.765486 },
    { lon: -73.983321, lat: 40.766108 },
    { lon: -73.982873, lat: 40.766716 },
    { lon: -73.982413, lat: 40.767331 },
    { lon: -73.981978, lat: 40.767681 },
    { lon: -73.981414, lat: 40.768168 },
];

const route = new Daisy.TrajectorySampleBodyFixed();
const routeLegSeconds = 18;
routeWaypoints.forEach((waypoint, index) => {
    route.pushData({
        time: JD.addSeconds(start, index * routeLegSeconds, new JD()),
        position: C3.fromDegrees(waypoint.lon, waypoint.lat, routeHeightMeters),
    });
});

const routePolylinePositions = routeWaypoints.map((waypoint) =>
    C3.fromDegrees(waypoint.lon, waypoint.lat, routeHeightMeters)
);

const routeDurationSeconds = (routeWaypoints.length - 1) * routeLegSeconds;
const stop = JD.addSeconds(start, routeDurationSeconds, new JD());
const now = JD.addSeconds(start, 90, new JD());

engine.setSceneTime(start, stop, true);
engine.setCurrentTime(now);
engine.setMultiplier(4);
engine.setLoop(true);
engine.play();

function routeLookAheadPosition(time, secondsAhead = 45) {
    const targetTime = JD.addSeconds(time, secondsAhead, new JD());
    return route.evaluateECEF(targetTime) ?? route.evaluateECEF(time);
}

// ── 3. Popover 内容 ───────────────────────────────────────────────────────────
const popoverNode = document.createElement("div");
popoverNode.className = "freeobject-popover";

function renderPopover(spec) {
    popoverNode.innerHTML = `
        <div class="freeobject-popover__kicker">FREEOBJECT / ${spec.badge}</div>
        <div class="freeobject-popover__title">${spec.title}</div>
        <div class="freeobject-popover__copy">${spec.summary}</div>
        <div class="freeobject-popover__chips">
            ${spec.capabilities.map((item) => `<span>${item}</span>`).join("")}
        </div>
    `;
}

// ── 4. 模式定义 ───────────────────────────────────────────────────────────────
const carModel = {
    url: Daisy.BuildModuleUrl.getUrl("models/bluecar.glb"),
    showOutline: false,
    shadows: Daisy.ShadowMode.ENABLED,
};

const baseLabel = (text) => ({
    text,
    font: "13px sans-serif",
    offsetPx: new C2(0, -20),
    showBackground: true,
    backgroundColor: Color.BLACK.withAlpha(0.52),
    fillColor: Color.WHITE,
});

const basePath = {
    show: true,
    width: 3,
    color: Color.CYAN.withAlpha(0.62),
    historyColor: Color.CYAN.withAlpha(0.88),
    futureColor: Color.LIME.withAlpha(0.45),
    historySecond: 12 * 60,
    futureSecond: 12 * 60,
    resolutionSecond: 1,
    updateIntervalSecond: 1 / 12,
    autoOptimize: false,
};

const modeSpecs = {
    cruise: {
        badge: "基础巡航",
        title: "城市巡航车",
        summary: "最小闭环示例：FreeObject 用轨迹驱动车体，在城市道路上持续巡航。",
        labelText: "CityCar / Cruise",
        capabilities: ["model", "label", "path", "sensor", "popover"],
        model: carModel,
        label: baseLabel("CityCar / Cruise"),
        path: basePath,
        polyline: false,
        popover: {
            element: popoverNode,
            trigger: "hover",
            show: false,
            destroyDOM: false,
            fixedWidth: 260,
            anchorPosition: "top",
            gap: 10,
            backgroundColor: "rgba(4, 12, 20, 0.92)",
            color: "#e7f7ff",
        },
        sensor: {
            name: "FreeObject-FrontSensor",
            type: Daisy.PW.SensorType.EllipticalCone,
            emitDirection: Daisy.EmitDirection.TO_FRONT,
            apertureDeg: { xDeg: 20, yDeg: 9 },
            beamLength: 260,
            color: Color.CYAN.withAlpha(0.24),
            outline: true,
            outlineColor: Color.CYAN.withAlpha(0.9),
            outlineWidth: 1,
        },
        collisionBall: false,
        cube: false,
        arrowPoint: false,
        point: false,
        billboard: false,
    },
    payload: {
        badge: "任务载荷",
        title: "载荷车",
        summary: "在同一辆车上叠加碰撞球和载荷盒，说明 FreeObject 不只是模型壳子，还能装配安全与任务组件。",
        labelText: "CityCar / Payload",
        capabilities: ["model", "label", "path", "sensor", "collisionBall", "cube", "popover"],
        model: carModel,
        label: baseLabel("CityCar / Payload"),
        path: basePath,
        polyline: false,
        popover: {
            element: popoverNode,
            trigger: "hover",
            show: false,
            destroyDOM: false,
            fixedWidth: 260,
            anchorPosition: "top",
            gap: 10,
            backgroundColor: "rgba(4, 12, 20, 0.92)",
            color: "#e7f7ff",
        },
        sensor: {
            name: "FreeObject-FrontSensor",
            type: Daisy.PW.SensorType.EllipticalCone,
            emitDirection: Daisy.EmitDirection.TO_FRONT,
            apertureDeg: { xDeg: 28, yDeg: 14 },
            beamLength: 180,
            color: Color.ORANGE.withAlpha(0.24),
            outline: true,
            outlineColor: Color.ORANGE.withAlpha(0.9),
            outlineWidth: 1,
        },
        collisionBall: {
            radius: 4.5,
            show: true,
            enableCollision: true,
            enableCollisionStateShow: true,
            color: Color.LIME.withAlpha(0.14),
            collisionColor: Color.RED.withAlpha(0.22),
            outlineColor: Color.LIME.withAlpha(0.72),
            outlineWidth: 1,
        },
        cube: {
            bottomX: 5.6,
            bottomY: 2.8,
            topX: 4.0,
            topY: 2.0,
            height: 2.2,
            outline: true,
            outlineWidth: 1,
            outlineColor: Color.WHITE.withAlpha(0.72),
            color: Color.fromCssColorString("#84ccff").withAlpha(0.24),
            emitDirection: Daisy.EmitDirection.CENTER,
            show: true,
        },
        arrowPoint: false,
        point: false,
        billboard: false,
    },
    inspect: {
        badge: "感知强化",
        title: "前向感知车",
        summary: "用前向箭头和更长的传感器波束，强调 FreeObject 作为通用载体时的方向语义。",
        labelText: "CityCar / Inspect",
        capabilities: ["model", "label", "path", "sensor", "arrowPoint", "popover"],
        model: carModel,
        label: baseLabel("CityCar / Inspect"),
        path: basePath,
        polyline: false,
        popover: {
            element: popoverNode,
            trigger: "hover",
            show: false,
            destroyDOM: false,
            fixedWidth: 260,
            anchorPosition: "top",
            gap: 10,
            backgroundColor: "rgba(4, 12, 20, 0.92)",
            color: "#e7f7ff",
        },
        sensor: {
            name: "FreeObject-FrontSensor",
            type: Daisy.PW.SensorType.EllipticalCone,
            emitDirection: Daisy.EmitDirection.TO_FRONT,
            apertureDeg: { xDeg: 14, yDeg: 6 },
            beamLength: 340,
            color: Color.LIME.withAlpha(0.22),
            outline: true,
            outlineColor: Color.LIME.withAlpha(0.92),
            outlineWidth: 1,
        },
        collisionBall: false,
        cube: false,
        arrowPoint: {
            target: (_entity, time) => routeLookAheadPosition(time, 45),
            show: true,
            lengthPx: 140,
            width: 3,
            color: Color.YELLOW,
            arrowSize: 14,
            label: {
                text: "Ahead / 45s",
                font: "12px sans-serif",
                offsetPx: new C2(0, -18),
                showBackground: true,
                backgroundColor: Color.BLACK.withAlpha(0.5),
                fillColor: Color.WHITE,
            },
        },
        point: false,
        billboard: false,
    },
};

const modeOrder = ["cruise", "payload", "inspect"];
let activeMode = $state("cruise");
let activeSpec = $derived(modeSpecs[activeMode]);
let cameraMode = $state("follow");

// ── 5. 创建对象 ───────────────────────────────────────────────────────────────
const car = new Daisy.PW.FreeObject({
    name: "CityCar",
    position: route,
    model: modeSpecs.cruise.model,
    label: modeSpecs.cruise.label,
    path: modeSpecs.cruise.path,
    polyline: modeSpecs.cruise.polyline,
    popover: modeSpecs.cruise.popover,
});
car.bindEngine(engine);
car.entity.setBodyAxis({
    lengthPx: 120,
    axisWidth: 4,
    showLabels: true,
    showSphere: false,
    labelPrefix: "Body-",
});

function buildObjectConfig(spec) {
    return {
        model: spec.model,
        label: spec.label,
        path: spec.path,
        polyline: spec.polyline,
        popover: spec.popover,
        collisionBall: spec.collisionBall,
        cube: spec.cube,
        arrowPoint: spec.arrowPoint,
        point: spec.point,
        billboard: spec.billboard,
    };
}

function syncSensor(spec) {
    car.removeComponentByName("FreeObject-FrontSensor");
    if (spec.sensor) {
        car.addSensor(spec.sensor);
    }
}

function applyMode(mode) {
    const spec = modeSpecs[mode];
    if (!spec) return;
    activeMode = mode;
    renderPopover(spec);
    car.setOptions(buildObjectConfig(spec));
    syncSensor(spec);
    __log?.(`FreeObject 模式已切换：${spec.title}`);
}

applyMode(activeMode);

function applyOverviewCamera(duration = 0.8) {
    cameraMode = "overview";
    engine.camera.removeTrackedDaisyEntity?.();
    engine.camera.flyToTarget(routePolylinePositions, {
        offset: new Daisy.HeadingPitchRange(
            Daisy.Math.toRadians(18),
            Daisy.Math.toRadians(-58),
            2100,
        ),
        duration,
    });
    __log?.("观察视角：全景。可自由缩放和平移。");
}

function applyFollowCamera() {
    cameraMode = "follow";
    engine.camera.followTarget(car, {
        view: { distance: 260, pitchDeg: -14, headingDeg: 8 },
        arcRotate: {
            enableGroundCollisionSlide: false,
        },
        installInputListeners: true,
    });
    engine.camera.setFrustumNear?.(0.1);
    __log?.("观察视角：跟车。可拖拽环绕，也可滚轮缩放。");
}

function applyFreeCamera() {
    cameraMode = "free";
    engine.camera.removeTrackedDaisyEntity?.();
    __log?.("观察视角：自由。相机控制权已交还。");
}

applyFollowCamera();

registerCleanup?.(() => {
    try {
        car.destroy();
    } catch {
    }
});

__log?.("FreeObject 已切换为国外道路载荷平台：ArcGIS XYZ + 跟车视角 + 单路线。");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="FreeObject">
    <div class="panel-head">
        <div>
            <div class="eyebrow">FreeObject</div>
            <h3>城市道路上的通用载荷平台</h3>
        </div>
        <span>{activeSpec.badge}</span>
    </div>

    <p class="lead">{activeSpec.summary}</p>

    <div class="mode-list">
        {#each modeOrder as modeId}
            <button
                type="button"
                class:active={activeMode === modeId}
                onclick={() => applyMode(modeId)}
            >
                <b>{modeSpecs[modeId].title}</b>
                <small>{modeSpecs[modeId].badge}</small>
            </button>
        {/each}
    </div>

    <div class="capability-grid">
        {#each activeSpec.capabilities as capability}
            <span>{capability}</span>
        {/each}
    </div>

    <div class="camera-controls">
        <button type="button" class:active={cameraMode === "overview"} onclick={() => applyOverviewCamera()}>
            全景
        </button>
        <button type="button" class:active={cameraMode === "follow"} onclick={applyFollowCamera}>
            跟车
        </button>
        <button type="button" class:active={cameraMode === "free"} onclick={applyFreeCamera}>
            自由
        </button>
    </div>

    <div class="panel-footer">
        <strong>{activeSpec.labelText}</strong>
        <p>默认跟车观察，可滚轮缩放；需要查看路线全貌时再切到全景。</p>
    </div>
    </DemoPanel>

<style>
    .panel-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
    }

    .eyebrow {
        color: var(--panel-accent);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    h3 {
        margin: 4px 0 0;
        font-size: 18px;
        line-height: 1.22;
    }

    .panel-head span {
        flex: 0 0 auto;
        padding: 6px 10px;
        border-radius: 999px;
        background: rgba(96, 165, 250, 0.2);
        color: var(--panel-text-bright);
        font-size: 11px;
        font-weight: 700;
        white-space: nowrap;
    }

    .lead {
        margin: 10px 0 14px;
        color: var(--panel-text);
        font-size: 13px;
        line-height: 1.55;
    }

    .mode-list {
        display: grid;
        gap: 8px;
    }

    .mode-list button {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        width: 100%;
        padding: 11px 12px;
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 12px;
        color: var(--panel-text);
        background: var(--panel-bg-embed);
        text-align: left;
        cursor: pointer;
        transition:
            transform 140ms ease,
            border-color 140ms ease,
            background 140ms ease;
    }

    .mode-list button:hover {
        transform: translateY(-1px);
        border-color: rgba(125, 211, 252, 0.55);
        background: var(--panel-bg-embed);
    }

    .mode-list button.active {
        border-color: var(--color-accent);
        background: linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(15, 23, 42, 0.96));
        box-shadow: inset 0 0 0 1px var(--panel-border);
    }

    .mode-list b {
        display: block;
        font-size: 14px;
        font-weight: 700;
    }

    .mode-list small {
        color: var(--panel-text);
        font-size: 11px;
        white-space: nowrap;
    }

    .capability-grid {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 14px;
    }

    .capability-grid span {
        padding: 5px 9px;
        border: 1px solid var(--panel-border);
        border-radius: 999px;
        color: var(--panel-text-muted);
        background: var(--panel-bg-card);
        font-size: 11px;
    }

    .camera-controls {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4px;
        margin-top: 14px;
        padding: 4px;
        border: 1px solid rgba(125, 211, 252, 0.14);
        border-radius: 10px;
        background: rgba(2, 8, 15, 0.42);
    }

    .camera-controls button {
        min-height: 32px;
        border: 0;
        border-radius: 7px;
        color: var(--panel-text-muted);
        background: transparent;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
    }

    .camera-controls button:hover {
        color: var(--panel-text-bright);
        background: var(--panel-bg-card);
    }

    .camera-controls button.active {
        color: #06121d;
        background: #9bdcff;
    }

    .panel-footer {
        margin-top: 14px;
        padding-top: 12px;
        border-top: 1px solid var(--panel-border);
    }

    .panel-footer strong {
        display: block;
        color: var(--panel-text-bright);
        font-size: 13px;
        margin-bottom: 4px;
    }

    .panel-footer p {
        margin: 0;
        color: var(--panel-text-muted);
        font-size: 12px;
        line-height: 1.45;
    }

    :global(.freeobject-popover) {
        display: grid;
        gap: 8px;
        color: var(--panel-text);
    }

    :global(.freeobject-popover__kicker) {
        color: var(--panel-accent);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
    }

    :global(.freeobject-popover__title) {
        font-size: 16px;
        font-weight: 800;
        line-height: 1.25;
    }

    :global(.freeobject-popover__copy) {
        color: var(--panel-text);
        font-size: 12px;
        line-height: 1.5;
    }

    :global(.freeobject-popover__chips) {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
    }

    :global(.freeobject-popover__chips span) {
        padding: 4px 8px;
        border: 1px solid var(--panel-border);
        border-radius: 999px;
        color: var(--panel-text-muted);
        background: var(--panel-bg-card);
        font-size: 11px;
    }
</style>
