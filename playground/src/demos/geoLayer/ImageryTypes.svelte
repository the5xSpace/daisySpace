<script>
// =============================================================================
// ImageryTypes.svelte - 影像源切换 Demo
// -----------------------------------------------------------------------------
// 本文件演示不同影像源（底图）的切换功能：
//   - XYZ: 标准瓦片服务（ArcGIS World Imagery）
//   - OpenStreetMap: 开放街道地图
//   - ArcGisMapServer: ArcGIS 地图服务
//
// 关键 API：
//   - engine.geoLayer.setBaseImagery(config)  // 设置底图
//   - engine.geoLayer.addImagery(config)      // 叠加图层
//   - engine.geoLayer.clearImagery()          // 清除所有图层
//   - config.type: Daisy.GeoImageryType.XYZ | OpenStreetMap | ArcGisMapServer
//   - config.url: 瓦片服务 URL（XYZ 需要 {z}/{y}/{x} 模板）
//   - config.minLevel / config.maxLevel: 缩放级别范围
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化时间与场景 ─────────────────────────────────────────────────────────
// 设置时间范围，10 倍速播放
const now = Daisy.JulianDate.now();
const start = Daisy.JulianDate.addHours(now, -1, new Daisy.JulianDate());
const stop = Daisy.JulianDate.addHours(now, 3, new Daisy.JulianDate());
// setSceneTime: 设置场景时间范围（不传第三参数默认不循环）
engine.setSceneTime(start, stop);
engine.setCurrentTime(now);
engine.setMultiplier(10);  // 10 倍速
engine.play();

// ── 2. 设置初始影像 ─────────────────────────────────────────────────────────
// setBaseImagery: 设置底图（会清除之前的底图）
// addImagery: 叠加图层（不会清除之前的图层）
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    minLevel: 0, maxLevel: 18,
});
// 叠加 OSM 标注图层
engine.geoLayer.addImagery({ type: Daisy.GeoImageryType.OpenStreetMap });

// ── 3. 影像切换函数 ─────────────────────────────────────────────────────────
// clearImagery: 清除所有影像图层（底图 + 叠加层）
// setBaseImagery: 设置新的底图
function setXYZ() {
    engine.geoLayer.clearImagery();
    engine.geoLayer.setBaseImagery({
        type: Daisy.GeoImageryType.XYZ,
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        minLevel: 0, maxLevel: 18,
    });
    __log("已切换为 XYZ 卫星影像");
}

// ArcGisMapServer: ArcGIS 地图服务（街道地图）
function setArcGIS() {
    engine.geoLayer.clearImagery();
    engine.geoLayer.setBaseImagery({
        type: Daisy.GeoImageryType.ArcGisMapServer,
        url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
    });
    __log("已切换为 ArcGIS 街道地图");
}

// OpenStreetMap: 开放街道地图
function setOSM() {
    engine.geoLayer.clearImagery();
    engine.geoLayer.setBaseImagery({ type: Daisy.GeoImageryType.OpenStreetMap });
    __log("已切换为 OSM 底图");
}

// addOSM: 叠加 OSM 标注图层（不清除现有图层）
function addOSM() {
    engine.geoLayer.addImagery({ type: Daisy.GeoImageryType.OpenStreetMap });
    __log("已叠加 OSM 标注图层");
}

// clearAll: 清除所有影像图层
function clearAll() {
    engine.geoLayer.clearImagery();
    __log("已清除所有影像图层");
}
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="影像源切换" padding="12px" width="220px">
    <div class="panel-head-simple">
        <span class="panel-icon">🗺️</span>
        <span class="panel-title-text">影像源切换</span>
    </div>

    <div class="img-group">
        <div class="img-group-label">切换底图</div>
        <div class="btn-stack">
            <button onclick={setXYZ}>XYZ 卫星影像</button>
            <button onclick={setArcGIS}>ArcGIS 街道地图</button>
            <button onclick={setOSM}>OSM 底图</button>
        </div>
    </div>

    <div class="img-group">
        <div class="img-group-label">叠加操作</div>
        <div class="btn-stack">
            <button onclick={addOSM}>叠加 OSM 标注</button>
        </div>
    </div>

    <div class="img-group">
        <div class="img-group-label">系统</div>
        <div class="btn-stack">
            <button class="btn-danger" onclick={clearAll}>清除所有图层</button>
        </div>
    </div>
</DemoPanel>
<style>
.panel-head-simple {
    display: flex; align-items: center; gap: 7px;
    margin-bottom: 8px; padding-bottom: 10px;
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
.img-group {
    margin-top: 8px;
}
.img-group + .img-group {
    padding-top: 8px;
    border-top: 1px solid var(--panel-border);
}
.img-group-label {
    font-size: 10px; font-weight: 600;
    color: var(--panel-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 6px;
}
.btn-stack {
    display: flex; flex-direction: column; gap: 5px;
}
button {
    width: 100%; min-height: 28px;
    background: var(--panel-bg-card);
    border: 1px solid var(--panel-border);
    color: var(--panel-text);
    padding: 5px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 12px;
    text-align: left;
    transition: all 0.12s;
}
button:hover { background: var(--color-accent-muted); border-color: var(--color-accent); }
.btn-danger {
    color: var(--color-error);
    border-color: var(--color-error-muted);
}
.btn-danger:hover {
    background: var(--color-error-muted);
    border-color: var(--color-error);
}
</style>
