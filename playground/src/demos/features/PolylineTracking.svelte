<script>
// =============================================================================
// PolylineTracking Demo — 折线跟踪演示
//
// 本示例演示如何使用 PolylineFeature 的 trackTarget 和 trackingTarget 属性
// 创建动态跟踪的折线：
// 1. trackTarget: 路径端点跟随目标实体
// 2. trackingTarget: 折线端点固定在目标实体上
//
// 关键 API：
// - Daisy.PolylineFeature: 折线组件
//   - pathway: 路径坐标（支持 [Daisy.REF.SELF_ENTITY] 表示自身实体）
//   - trackTarget: 跟踪目标（路径端点跟随目标）
//   - trackingTarget: 跟踪目标（折线端点固定在目标上）
//   - material: 材质
//   - alwaysOnTop: 是否始终在最上层
//   - depthFailMaterial: 深度测试失败时的材质
// - Daisy.TrajectorySample: 轨迹采样
//   - pushData: 推送轨迹数据
//   - interpolationAlgorithm: 插值算法
// - engine.camera.followTarget: 相机跟随目标
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化和时间设置 ──────────────────────────────────────────────
const C3 = Daisy.Cartesian3;
const C2 = Daisy.Cartesian2;
const Color = Daisy.Color;
const Material = Daisy.MaterialFactory;

const entities = [];
const startTime = Daisy.JulianDate.fromDate(new Date("2026-04-20T02:00:00Z"));
const currentTime = Daisy.JulianDate.addSeconds(startTime, 90, new Daisy.JulianDate());
const stopTime = Daisy.JulianDate.addSeconds(startTime, 900, new Daisy.JulianDate());

// 设置场景时间
engine.setSceneTime(startTime, stopTime, true);
engine.setCurrentTime(currentTime);
engine.setMultiplier(8);
engine.setLoop(true);
engine.setUpdateMaxFps(false);
engine.play();

// 设置基础图层
engine.geoLayer.clearImagery();
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: Daisy.BuildModuleUrl.getUrl("static/earth/{z}/{x}/{y}.jpg"),
    minLevel: 0,
    maxLevel: 3,
});

// ── 2. 辅助函数 ──────────────────────────────────────────────
function p(lon, lat, height = 0) {
    return C3.fromDegrees(lon, lat, height);
}

function createEntity(name, position) {
    const entity = engine.createEntity(name);
    entity.position = position;
    entities.push(entity);
    return entity;
}

function createTimedPath(points, totalSeconds, samplesPerLeg = 28) {
    const samples = [];
    const legs = Math.max(1, points.length - 1);
    for (let leg = 0; leg < legs; leg++) {
        const a = points[leg];
        const b = points[leg + 1];
        for (let i = 0; i < samplesPerLeg; i++) {
            const u = i / samplesPerLeg;
            const t = Daisy.JulianDate.addSeconds(
                startTime,
                ((leg + u) / legs) * totalSeconds,
                new Daisy.JulianDate()
            );
            samples.push({
                time: t,
                position: p(
                    a.lon + (b.lon - a.lon) * u,
                    a.lat + (b.lat - a.lat) * u,
                    a.height + (b.height - a.height) * u
                ),
            });
        }
    }
    const last = points[points.length - 1];
    samples.push({
        time: Daisy.JulianDate.addSeconds(startTime, totalSeconds, new Daisy.JulianDate()),
        position: p(last.lon, last.lat, last.height),
    });
    const trajectory = new Daisy.TrajectorySample(Daisy.ReferenceFrame.FIXED, {
        interpolationAlgorithm: "LINEAR",
        interpolationDegree: 1,
    });
    trajectory.pushData(samples);
    return trajectory;
}

function addMarker(entity, color, label) {
    entity.addFeature(new Daisy.PointFeature({
        pixelSize: 12,
        color,
        outlineColor: Color.WHITE,
        outlineWidth: 2,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
    }));
    entity.addFeature(new Daisy.UI.LabelFeature({
        text: label,
        font: "13px sans-serif",
        offsetPx: new C2(0, -18),
        showBackground: true,
        backgroundColor: Color.BLACK.withAlpha(0.45),
        fillColor: Color.WHITE,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
    }));
}

const drone = createEntity("PolylineTrack-Drone", createTimedPath([
    { lon: 116.05, lat: 39.72, height: 380000 },
    { lon: 116.34, lat: 40.08, height: 520000 },
    { lon: 116.78, lat: 39.94, height: 430000 },
    { lon: 116.38, lat: 39.64, height: 560000 },
    { lon: 116.05, lat: 39.72, height: 380000 },
], 900));
addMarker(drone, "#38bdf8", "巡飞目标");

const rover = createEntity("PolylineTrack-Rover", createTimedPath([
    { lon: 116.08, lat: 39.6, height: 0 },
    { lon: 116.68, lat: 39.62, height: 0 },
    { lon: 116.82, lat: 40.0, height: 0 },
    { lon: 116.22, lat: 40.08, height: 0 },
    { lon: 116.08, lat: 39.6, height: 0 },
], 900));
addMarker(rover, "#f59e0b", "地面目标");

const relay = createEntity("PolylineTrack-Relay", p(116.48, 39.9, 90000));
addMarker(relay, "#a78bfa", "中继点");

drone.addFeature(new Daisy.PolylineFeature({
    pathway: [Daisy.REF.SELF_ENTITY],
    trackTarget: rover,
    width: 5,
    material: Material.PolylineGlow({ color: "#22c55e", glowPower: 0.22 }),
    alwaysOnTop: true,
    depthFailMaterial: Material.PolylineGlow({ color: "#22c55e", glowPower: 0.35 }),
    arcType: Daisy.ArcType.NONE,
}));

drone.addFeature(new Daisy.PolylineFeature({
    trackingTarget: relay,
    width: 4,
    material: Material.PolylineGlow({ color: "#facc15", glowPower: 0.28 }),
    alwaysOnTop: true,
    depthFailMaterial: "#facc15",
    arcType: Daisy.ArcType.NONE,
}));

rover.addFeature(new Daisy.PolylineFeature({
    pathway: C3.fromDegreesArray([
        116.08, 39.6,
        116.68, 39.62,
        116.82, 40.0,
        116.22, 40.08,
        116.08, 39.6,
    ]),
    width: 3,
    material: "#60a5fa",
    clampToGround: true,
    sortBefore: false,
}));

function followDrone() {
    engine.camera.followTarget(drone, {
        view: { distance: 1050000, pitchDeg: -42, headingDeg: 25 },
    });
}

function followRover() {
    engine.camera.followTarget(rover, {
        view: { distance: 850000, pitchDeg: -55, headingDeg: -20 },
    });
}

function overview() {
    engine.camera.flyToTarget([drone, rover, relay], {
        duration: 0.1,
        offset: new Daisy.HeadingPitchRange(0, Daisy.Math.toRadians(-48), 1700000),
    });
}

overview();

__log("PolylineTracking: trackTarget 自动补入 pathway，动态端点已开始跟随");

registerCleanup(() => {
    try { engine.camera.removeTrackedDaisyEntity(); } catch {}
    for (const entity of entities) {
        try { engine.removeEntity(entity); } catch {}
    }
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="折线追踪" padding="12px" width="250px">
    <div class="panel-head-simple">
        <span class="panel-icon">📡</span>
        <span class="panel-title-text">折线动态追踪</span>
    </div>
    <div class="track-grid">
        <button onclick={followDrone}>
            <span class="btn-dot" style="background:#38bdf8"></span>
            跟随巡飞目标
        </button>
        <button onclick={followRover}>
            <span class="btn-dot" style="background:#f59e0b"></span>
            跟随地面目标
        </button>
        <button onclick={overview} class="btn-alt">
            <span class="btn-dot" style="background:#a78bfa"></span>
            全景总览
        </button>
    </div>
</DemoPanel>

<style>
.panel-head-simple {
    display: flex; align-items: center; gap: 7px;
    margin-bottom: 10px; padding-bottom: 10px;
    border-bottom: 1px solid var(--panel-border);
}
.panel-icon {
    width: 24px; height: 24px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 5px;
    background: var(--color-accent-muted);
    font-size: 12px;
}
.panel-title-text {
    font-size: 13px; font-weight: 700;
    color: var(--panel-text-bright);
}
.track-grid {
    display: flex; flex-direction: column; gap: 6px;
}
button {
    width: 100%; min-height: 30px;
    display: flex; align-items: center; gap: 8px;
    padding: 5px 10px;
    border: 1px solid var(--panel-border);
    border-radius: 6px;
    color: var(--panel-text);
    background: var(--panel-bg-card);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.12s;
}
button:hover {
    background: var(--color-accent-muted);
    border-color: var(--color-accent);
}
.btn-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
}
</style>
