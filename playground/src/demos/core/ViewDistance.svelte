<script>
// =============================================================================
// ViewDistance Demo — 视距策略演示
//
// 本示例演示如何使用视距策略（ViewDistanceStrategy）控制不同距离范围内的对象显示：
// 1. 视距级别（EXTREME_NEAR/NEAR/MEDIUM/FAR/EXTREME_FAR）
// 2. 场景类型（SPACE/AVIATION/MARITIME/GROUND）
// 3. 距离显示条件（DistanceDisplayCondition）
// 4. 手动覆盖（Manual Override）
// 5. 路径采样（Path Sampling）
//
// 关键 API：
// - engine.viewDistanceStrategy: 获取视距策略
// - strategy.getScene(): 获取当前场景类型
// - strategy.setScene(scene): 设置场景类型
// - strategy.getDistanceDisplayCondition(level): 获取距离显示条件
// - strategy.computeCameraToPositionDistance(): 计算相机到位置的距离
// - DistanceDisplayCondition(near, far): 距离显示条件（近/远距离）
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const C = Daisy.Color;
const C2 = Daisy.Cartesian2;
const C3 = Daisy.Cartesian3;
const DDC = Daisy.DistanceDisplayCondition;

// ── 1. 视距级别配置 ──────────────────────────────────────────────────
// ViewDistanceLevel: 视距级别枚举
// - EXTREME_NEAR: 极近距离
// - NEAR: 近距离
// - MEDIUM: 中距离
// - FAR: 远距离
// - EXTREME_FAR: 极远距离
const LEVELS = [
    Daisy.ViewDistanceLevel.EXTREME_NEAR,
    Daisy.ViewDistanceLevel.NEAR,
    Daisy.ViewDistanceLevel.MEDIUM,
    Daisy.ViewDistanceLevel.FAR,
    Daisy.ViewDistanceLevel.EXTREME_FAR,
];

// ── 2. 场景类型配置 ──────────────────────────────────────────────────
// ViewScene: 场景类型枚举
// - SPACE: 太空场景（目标高度 8,000 km）
// - AVIATION: 航空场景（目标高度 75 km）
// - MARITIME: 海事场景（目标高度 28 km）
// - GROUND: 地面场景（目标高度 1.8 km）
const SCENES = [
    { id: Daisy.ViewScene.SPACE, label: "SPACE", targetHeight: 8_000_000 },
    { id: Daisy.ViewScene.AVIATION, label: "AVIATION", targetHeight: 75_000 },
    { id: Daisy.ViewScene.MARITIME, label: "MARITIME", targetHeight: 28_000 },
    { id: Daisy.ViewScene.GROUND, label: "GROUND", targetHeight: 1_800 },
];

// ── 3. 相机配置 ──────────────────────────────────────────────────────
// SCENE_CAMERA: 每个场景类型的相机配置
// - headingDeg: 航向角（度）
// - pitchDeg: 俯仰角（度）
// - rangeScale: 距离缩放因子
const SCENE_CAMERA = {
    [Daisy.ViewScene.SPACE]: { headingDeg: 0, pitchDeg: -72, rangeScale: 1.15 },
    [Daisy.ViewScene.AVIATION]: { headingDeg: -24, pitchDeg: -36, rangeScale: 0.95 },
    [Daisy.ViewScene.MARITIME]: { headingDeg: 24, pitchDeg: -28, rangeScale: 0.88 },
    [Daisy.ViewScene.GROUND]: { headingDeg: -36, pitchDeg: -22, rangeScale: 0.72 },
};

// ── 4. 高度停靠点 ──────────────────────────────────────────────────
// HEIGHT_STOPS: 预设高度停靠点列表
// 用于快速切换相机高度
const HEIGHT_STOPS = [
    { label: "100 m", height: 100 },
    { label: "800 m", height: 800 },
    { label: "5 km", height: 5_000 },
    { label: "50 km", height: 50_000 },
    { label: "200 km", height: 200_000 },
    { label: "5,000 km", height: 5_000_000 },
    { label: "50,000 km", height: 50_000_000 },
];

// ── 5. 状态变量 ──────────────────────────────────────────────────────
// strategy: 视距策略实例
// center: 中心点坐标（北京）
// start/stop: 场景时间范围
const strategy = engine.viewDistanceStrategy;
const center = { lon: 116.4074, lat: 39.9042 };
const start = Daisy.JulianDate.now();
const stop = Daisy.JulianDate.addSeconds(start, 3600, new Daisy.JulianDate());

// 响应式状态
let currentScene = $state(strategy.getScene());
let distanceIndex = $state(3);
let livePreview = $state(true);
let showManual = $state(true);
let visibleCounts = $state({});
let currentDistance = $state("--");
let pathSampleCount = $state(0);
let activeLevel = $state("--");

// 非响应式状态
const records = [];
let previewEntity;
let pathFeature;
let pathBeads = [];
let sweepTimer = $state();

__log("=== 视距策略 Demo ===");
engine.setSceneTime(start, stop, true);
engine.setCurrentTime(start);
engine.setMultiplier(1);
engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    minLevel: 0,
    maxLevel: 18,
});

// ── 6. 辅助函数 ──────────────────────────────────────────────────────
// formatDistance: 格式化距离显示
// - meters: 距离（米）
// - 返回格式化字符串（如 "1.2 km"、"5.0 Mm"）
function formatDistance(meters) {
    if (!Number.isFinite(meters)) return "--";
    if (meters >= 1e12) return "inf";
    if (meters >= 1_000_000) return (meters / 1_000_000).toFixed(1) + " Mm";
    if (meters >= 1_000) return (meters / 1_000).toFixed(meters >= 10_000 ? 0 : 1) + " km";
    return Math.round(meters) + " m";
}

// getTemplateRows: 获取模板行数据
// 遍历所有视距级别，获取距离显示条件
function getTemplateRows() {
    return LEVELS.map((level) => {
        const ddc = strategy.getDistanceDisplayCondition(level);
        return {
            level,
            near: formatDistance(ddc?.near ?? 0),
            far: formatDistance(ddc?.far ?? Number.POSITIVE_INFINITY),
            raw: ddc,
        };
    });
}

// makePosition: 创建位置坐标
// - offsetLon: 经度偏移量
// - offsetLat: 纬度偏移量
// - height: 高度（米）
function makePosition(offsetLon, offsetLat, height) {
    return C3.fromDegrees(center.lon + offsetLon, center.lat + offsetLat, height);
}

// ── 7. 创建示例实体 ──────────────────────────────────────────────────
// addSample: 创建示例实体
// - name: 实体名称
// - label: 标签文本
// - level: 视距级别
// - color: 颜色
// - position: 位置坐标
// - manualDdc: 手动距离显示条件（可选）
// - defaulted: 是否使用默认距离显示条件（可选）
function addSample({ name, label, level, color, position, manualDdc, defaulted = false }) {
    const entity = engine.createEntity(name);
    entity.position = position;
    const ddc = manualDdc ?? (defaulted ? undefined : strategy.getDistanceDisplayCondition(level));
    const point = new Daisy.PointFeature({
        sizePx: manualDdc ? 18 : 16,
        color,
        outlineColor: manualDdc ? C.WHITE : C.BLACK.withAlpha(0.65),
        outlineWidth: manualDdc ? 2 : 1,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        distanceDisplayCondition: ddc,
    });
    const tag = new Daisy.UI.LabelFeature({
        text: label,
        font: "12px sans-serif",
        fillColor: color,
        style: Daisy.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: 2,
        outlineColor: C.BLACK,
        showBackground: true,
        backgroundColor: C.BLACK.withAlpha(manualDdc ? 0.72 : 0.54),
        backgroundPadding: new C2(6, 4),
        pixelOffset: new C2(0, -22),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        distanceDisplayCondition: ddc,
    });
    entity.addFeature(point);
    entity.addFeature(tag);
    records.push({ entity, point, tag, level, manual: !!manualDdc, defaulted, position });
    return entity;
}

// 创建示例实体
// 这些实体用于演示不同视距级别的显示效果
addSample({
    name: "vd-ground",
    label: "GROUND default",
    level: Daisy.ViewDistanceLevel.NEAR,
    color: C.LIME,
    position: makePosition(-0.012, -0.006, 10),
    defaulted: true,
});
addSample({
    name: "vd-aviation",
    label: "AVIATION medium",
    level: Daisy.ViewDistanceLevel.MEDIUM,
    color: C.YELLOW,
    position: makePosition(0.055, 0.018, 12_000),
});
addSample({
    name: "vd-maritime",
    label: "MARITIME far",
    level: Daisy.ViewDistanceLevel.FAR,
    color: C.CYAN,
    position: makePosition(-0.09, 0.02, 200),
});
addSample({
    name: "vd-space",
    label: "SPACE extreme far",
    level: Daisy.ViewDistanceLevel.EXTREME_FAR,
    color: C.ORANGE,
    position: makePosition(0.18, 0.08, 720_000),
});
addSample({
    name: "vd-manual",
    label: "manual override",
    level: Daisy.ViewDistanceLevel.INFINITE,
    color: C.MAGENTA,
    position: makePosition(0.11, -0.05, 80_000),
    manualDdc: new DDC(0, 900_000),
});

// ── 8. 路径预览 ──────────────────────────────────────────────────────
// previewEntity: 路径预览实体
// pathFeature: 路径特征
// pathBeads: 路径上的点标记
previewEntity = engine.createEntity("vd-path-preview");
previewEntity.position = makePosition(0, 0, 0);

// buildPathPreviewPoints: 构建路径预览点
// 生成椭圆形路径点
function buildPathPreviewPoints() {
    const scale = Math.max(1, Math.round(strategy.PathResolutionScale || 1));
    const count = 18 * scale;
    const points = [];
    const radiusLon = 0.34;
    const radiusLat = 0.16;
    for (let i = 0; i <= count; i++) {
        const a = (i / count) * Math.PI * 2;
        points.push(C3.fromDegrees(
            center.lon + Math.cos(a) * radiusLon,
            center.lat + Math.sin(a) * radiusLat,
            160_000 + Math.sin(a * 3) * 35_000,
        ));
    }
    pathSampleCount = points.length;
    return points;
}

// refreshPathPreview: 刷新路径预览
// 更新路径特征和点标记
function refreshPathPreview() {
    const points = buildPathPreviewPoints();
    if (!pathFeature) {
        pathFeature = new Daisy.PolylineFeature({
            name: "Strategy-Path-Sampling",
            pathway: points,
            width: 2,
            material: C.WHITE.withAlpha(0.58),
            clampToGround: false,
            arcType: Daisy.ArcType.NONE,
        });
        previewEntity.addFeature(pathFeature);
    } else {
        pathFeature.options = {
            ...pathFeature.options,
            pathway: points,
        };
    }
    for (const bead of pathBeads) {
        try {
            engine.removeEntity?.(bead);
            bead.destroy?.();
        } catch {
        }
    }
    pathBeads = [];
    const visibleStep = Math.max(1, Math.round(points.length / 48));
    for (let i = 0; i < points.length; i += visibleStep) {
        const bead = engine.createEntity(`vd-path-bead-${i}`);
        bead.position = points[i];
        bead.addFeature(new Daisy.PointFeature({
            sizePx: points.length > 120 ? 4 : 6,
            color: C.WHITE.withAlpha(points.length > 120 ? 0.55 : 0.75),
            outlineColor: C.BLACK.withAlpha(0.55),
            outlineWidth: 1,
            disableDepthTestDistance: Number.POSITIVE_INFINITY,
        }));
        pathBeads.push(bead);
    }
}

// ── 9. 场景切换和相机控制 ──────────────────────────────────────────
// applyRecordDistance: 应用记录的距离显示条件
// - record: 记录对象
// - 手动记录：根据 showManual 控制显示
// - 自动记录：根据 livePreview 更新距离显示条件
function applyRecordDistance(record) {
    if (record.manual) {
        record.point.options = { ...record.point.options, show: showManual };
        record.tag.options = { ...record.tag.options, show: showManual };
        return;
    }
    if (!livePreview) return;
    const ddc = strategy.getDistanceDisplayCondition(record.level);
    record.point.options = { ...record.point.options, distanceDisplayCondition: ddc };
    record.tag.options = { ...record.tag.options, distanceDisplayCondition: ddc };
    record.point.reCreate(record.entity);
    record.tag.reCreate(record.entity);
}

// applyStrategyToSamples: 应用策略到示例
// 更新所有记录的距离显示条件和路径预览
function applyStrategyToSamples() {
    for (const record of records) {
        applyRecordDistance(record);
    }
    refreshPathPreview();
    updateStats();
}

// setScene: 设置场景类型
// - scene: 场景类型（ViewScene 枚举）
function setScene(scene) {
    strategy.setScene(scene);
    currentScene = scene;
    __log("视距模板切换: " + scene + " / path scale " + strategy.PathResolutionScale);
    applyStrategyToSamples();
}

// setCameraHeight: 设置相机高度
// - height: 目标高度（米）
// - duration: 飞行时间（秒）
function setCameraHeight(height, duration = 0.9) {
    const preset = SCENE_CAMERA[currentScene] ?? SCENE_CAMERA[Daisy.ViewScene.GROUND];
    engine.camera.flyToTarget(C3.fromDegrees(center.lon, center.lat, height), {
        duration,
        offset: new Daisy.HeadingPitchRange(
            Daisy.Math.toRadians(preset.headingDeg),
            Daisy.Math.toRadians(preset.pitchDeg),
            Math.max(300, height * preset.rangeScale),
        ),
    });
}

// setDistanceIndex: 设置距离索引
// - index: 高度停靠点索引
function setDistanceIndex(index) {
    distanceIndex = Number(index);
    setCameraHeight(HEIGHT_STOPS[distanceIndex].height);
}

// jumpToScene: 跳转到场景
// - scene: 场景类型
function jumpToScene(scene) {
    const info = SCENES.find((item) => item.id === scene);
    setScene(scene);
    if (info) setCameraHeight(info.targetHeight, 1.1);
}

// setSceneAndCamera: 设置场景和相机
// - scene: 场景类型
// - height: 目标高度（米）
// - duration: 飞行时间（秒）
function setSceneAndCamera(scene, height, duration = 0.9) {
    setScene(scene);
    setCameraHeight(height, duration);
}

// toggleLivePreview: 切换实时预览
function toggleLivePreview() {
    livePreview = !livePreview;
    applyStrategyToSamples();
}

// toggleManual: 切换手动覆盖
function toggleManual() {
    showManual = !showManual;
    for (const record of records) {
        if (!record.manual) continue;
        record.point.options = { ...record.point.options, show: showManual };
        record.tag.options = { ...record.tag.options, show: showManual };
    }
    updateStats();
}

// ── 10. 扫描和统计 ──────────────────────────────────────────────────
// playSweep: 播放扫描
// 自动切换高度停靠点
function playSweep() {
    if (sweepTimer) {
        globalThis.clearInterval(sweepTimer);
        sweepTimer = undefined;
        return;
    }
    let i = 0;
    sweepTimer = globalThis.setInterval(() => {
        setDistanceIndex(i % HEIGHT_STOPS.length);
        i++;
        if (i > HEIGHT_STOPS.length) {
            globalThis.clearInterval(sweepTimer);
            sweepTimer = undefined;
        }
    }, 1250);
}

// distanceToRecord: 计算相机到记录的距离
// - record: 记录对象
// - 返回距离（米）
function distanceToRecord(record) {
    const cameraPos = engine.camera.getPosition();
    return strategy.computeCameraToPositionDistance(cameraPos, record.position, {
        time: engine.getCurrentTime(),
    });
}

// isVisibleByDistance: 检查记录是否在可见距离内
// - record: 记录对象
// - 返回是否可见
function isVisibleByDistance(record) {
    if (record.manual && !showManual) return false;
    const ddc = record.manual
        ? record.point.options.distanceDisplayCondition
        : record.point.options.distanceDisplayCondition ?? strategy.getDistanceDisplayCondition(record.level);
    const distance = distanceToRecord(record);
    const near = Number.isFinite(ddc?.near) ? ddc.near : 0;
    const far = Number.isFinite(ddc?.far) ? ddc.far : Number.POSITIVE_INFINITY;
    return distance >= near && distance <= far;
}

// updateStats: 更新统计信息
// 计算每个视距级别的可见/总数
function updateStats() {
    const next = {};
    for (const level of LEVELS) next[level] = { total: 0, visible: 0 };
    for (const record of records) {
        const key = record.manual ? "MANUAL" : record.level;
        next[key] = next[key] ?? { total: 0, visible: 0 };
        next[key].total++;
        if (isVisibleByDistance(record)) next[key].visible++;
    }
    visibleCounts = next;

    const target = makePosition(0, 0, 0);
    const cameraPos = engine.camera.getPosition();
    const d = strategy.computeCameraToPositionDistance(cameraPos, target);
    currentDistance = formatDistance(d);
    const matched = getTemplateRows().find((row) => {
        const near = Number.isFinite(row.raw?.near) ? row.raw.near : 0;
        const far = Number.isFinite(row.raw?.far) ? row.raw.far : Number.POSITIVE_INFINITY;
        return d >= near && d <= far;
    });
    activeLevel = matched?.level ?? "--";
}

// ── 11. 初始化和清理 ──────────────────────────────────────────────────
// statsTimer: 定时更新统计信息
const statsTimer = globalThis.setInterval(updateStats, 350);
registerCleanup?.(() => {
    globalThis.clearInterval(statsTimer);
    if (sweepTimer) globalThis.clearInterval(sweepTimer);
});

// 初始化场景和相机
setSceneAndCamera(currentScene, HEIGHT_STOPS[distanceIndex].height, 0);
updateStats();
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="视距控制">
    <section class="vd-panel vd-left">
        <div class="vd-title">
            <span>View Distance</span>
            <strong>{currentScene}</strong>
        </div>

        <div class="segmented" aria-label="scene template">
            {#each SCENES as scene}
                <button class:active={currentScene === scene.id} onclick={() => setSceneAndCamera(scene.id, scene.targetHeight, 1.1)}>
                    {scene.label}
                </button>
            {/each}
        </div>

        <div class="distance-control">
            <div class="control-head">
                <span>Camera Distance</span>
                <strong>{HEIGHT_STOPS[distanceIndex].label}</strong>
            </div>
            <input
                type="range"
                min="0"
                max={HEIGHT_STOPS.length - 1}
                step="1"
                value={distanceIndex}
            oninput={(event) => setDistanceIndex(Number(event.currentTarget.value))}
        />
            <div class="ticks">
                <span>100m</span>
                <span>50Mm</span>
            </div>
        </div>

        <div class="toggle-row">
            <button class:active={livePreview} onclick={toggleLivePreview}>Live Preview</button>
            <button class:active={showManual} onclick={toggleManual}>Manual Override</button>
        </div>

        <button class="primary" onclick={playSweep}>
            {sweepTimer ? "Stop Sweep" : "Play Sweep"}
        </button>
    </section>

    <section class="vd-panel vd-right">
        <div class="readout-grid">
            <div>
                <span>Distance</span>
                <strong>{currentDistance}</strong>
            </div>
            <div>
                <span>Active Level</span>
                <strong>{activeLevel}</strong>
            </div>
            <div>
                <span>Path Scale</span>
                <strong>{strategy.PathResolutionScale}x</strong>
            </div>
            <div>
                <span>Path Samples</span>
                <strong>{pathSampleCount}</strong>
            </div>
        </div>

        <div class="thresholds">
            {#each getTemplateRows() as row}
                <div class:hit={activeLevel === row.level}>
                    <span>{row.level}</span>
                    <b>{row.near} - {row.far}</b>
                    <em>{visibleCounts[row.level]?.visible ?? 0}/{visibleCounts[row.level]?.total ?? 0}</em>
                </div>
            {/each}
            <div class="manual-row">
                <span>MANUAL</span>
                <b>0 - 900 km</b>
                <em>{visibleCounts.MANUAL?.visible ?? 0}/{visibleCounts.MANUAL?.total ?? 0}</em>
            </div>
        </div>
    </section>
</DemoPanel>

<style>
    

    .vd-panel {
        border: 1px solid var(--panel-border);
        border-radius: 8px;
        background: var(--ds-overlay-bg);
        box-shadow: 0 18px 46px rgba(0, 0, 0, 0.32);
        backdrop-filter: blur(14px);
    }

    .vd-left {
        top: 16px;
        left: 16px;
        width: min(330px, calc(100vw - 32px));
        padding: 14px;
    }

    .vd-right {
        top: 16px;
        right: 16px;
        width: min(390px, calc(100vw - 32px));
        padding: 14px;
    }

    .vd-title,
    .control-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 10px;
    }

    .vd-title span,
    .control-head span,
    .readout-grid span {
        color: var(--panel-text-muted);
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
    }

    .vd-title strong,
    .control-head strong {
        color: var(--color-success);
        font-size: 13px;
    }

    .segmented,
    .toggle-row {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 7px;
        margin-bottom: 12px;
    }

    button {
        min-height: 32px;
        border: 1px solid var(--panel-border);
        border-radius: 6px;
        color: var(--panel-text-bright);
        background: rgba(255, 255, 255, 0.065);
        font-size: 12px;
        font-weight: 750;
        cursor: pointer;
    }

    button:hover,
    button.active {
        color: var(--ds-overlay-text-bright);
        border-color: var(--color-success);
        background: #79f2d2;
    }

    .primary {
        width: 100%;
        color: #03130f;
        background: var(--color-warning);
        border-color: var(--color-warning);
    }

    .distance-control {
        margin-bottom: 12px;
        padding: 10px;
        border: 1px solid var(--panel-border);
        border-radius: 7px;
        background: rgba(255, 255, 255, 0.045);
    }

    input[type="range"] {
        width: 100%;
        accent-color: var(--color-success);
    }

    .ticks {
        display: flex;
        justify-content: space-between;
        color: var(--panel-text-label);
        font-size: 10px;
        font-weight: 700;
    }

    .readout-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
        margin-bottom: 12px;
    }

    .readout-grid div {
        min-width: 0;
        padding: 9px 10px;
        border: 1px solid var(--panel-border);
        border-radius: 6px;
        background: var(--panel-bg-card);
    }

    .readout-grid strong {
        display: block;
        margin-top: 4px;
        overflow: hidden;
        color: var(--panel-text-bright);
        font-size: 16px;
        line-height: 1.1;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .thresholds {
        display: grid;
        gap: 5px;
    }

    .thresholds div {
        display: grid;
        grid-template-columns: minmax(96px, 1fr) minmax(110px, 1.1fr) 42px;
        align-items: center;
        gap: 8px;
        min-height: 29px;
        padding: 5px 8px;
        border: 1px solid var(--panel-border);
        border-radius: 6px;
        background: var(--panel-bg-card);
        font-size: 11px;
    }

    .thresholds div.hit {
        border-color: var(--color-warning);
        background: var(--color-warning-muted);
    }

    .thresholds span {
        color: var(--color-success);
        font-weight: 800;
    }

    .thresholds b {
        color: var(--panel-text-bright);
        font-weight: 700;
    }

    .thresholds em {
        color: var(--color-warning);
        font-style: normal;
        font-weight: 800;
        text-align: right;
    }

    .manual-row span {
        color: var(--color-purple);
    }

    @media (max-width: 760px) {
        .vd-left,
        .vd-right {
            left: 12px;
            right: 12px;
            width: auto;
        }

        .vd-right {
            top: auto;
            bottom: 12px;
        }

        .readout-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }

        .thresholds {
            display: none;
        }
    }
</style>
