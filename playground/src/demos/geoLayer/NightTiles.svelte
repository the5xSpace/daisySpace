<script>
// =============================================================================
// 夜间瓦片
// =============================================================================
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const startTime = Daisy.JulianDate.fromIso8601("2026-01-15T03:00:00Z");
const stopTime = Daisy.JulianDate.addHours(startTime, 24, new Daisy.JulianDate());
engine.setSceneTime(startTime, stopTime, true);
engine.setCurrentTime(startTime);
engine.pause();
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    minLevel: 0, maxLevel: 18,
});

const nasaNightSource = {
    type: Daisy.GeoImageryType.WMTS,
    url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/wmts.cgi",
    layer: "VIIRS_CityLights_2012",
    style: "default",
    format: "image/jpeg",
    tileMatrixSetID: "GoogleMapsCompatible_Level8",
};

let nightVisible = $state(true);
let imageryMode = $state("offline");
let sceneMode = $state(engine.is3D() ? "3D" : "2D");
let nightTiles = createNightTiles();

function createNightTiles() {
    return engine.addWidget(new Daisy.NightTileLayer({
        source: imageryMode === "online" ? nasaNightSource : undefined,
    }));
}

function switchImageryMode(mode) {
    if (mode === imageryMode) return;
    imageryMode = mode;
    engine.removeWidget(nightTiles, true);
    nightTiles = createNightTiles();
    nightTiles.show = nightVisible;
    __log(mode === "online" ? "已切换到 NASA GIBS 在线夜间瓦片" : "已切换到 Daisy 内置离线夜间瓦片");
}

function toggleNightTiles() {
    nightTiles.show = nightVisible;
}

function switchTo2D() {
    sceneMode = "2D";
    engine.morphTo2D();
}

function switchTo3D() {
    sceneMode = "3D";
    engine.morphTo3D();
}

const onMorphSwitch = (mode) => {
    sceneMode = mode === Daisy.SceneMode.SCENE3D ? "3D" : "2D";
};
engine.onMorphSwitch(onMorphSwitch);
registerCleanup(() => {
    engine.offMorphSwitch(onMorphSwitch);
    engine.removeWidget(nightTiles, true);
});

engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(-75, 30, 25_000_000), { duration: 0.8 });
__log("夜间瓦片已启用，夜间效果独立于基础影像层级");

import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="夜间瓦片" width="min(230px, calc(100% - 24px))" padding="12px">
    <div class="mode-switch" aria-label="场景模式">
        <button class:active={sceneMode === "3D"} onclick={switchTo3D}>3D</button>
        <button class:active={sceneMode === "2D"} onclick={switchTo2D}>2D</button>
    </div>

    <div class="source-switch" aria-label="夜间瓦片来源">
        <button class:active={imageryMode === "offline"} onclick={() => switchImageryMode("offline")}>内置离线</button>
        <button class:active={imageryMode === "online"} onclick={() => switchImageryMode("online")}>NASA 在线</button>
    </div>

    <label class="toggle-row">
        <input type="checkbox" bind:checked={nightVisible} onchange={toggleNightTiles} />
        <span class="swatch"></span>
        夜间瓦片
    </label>
</DemoPanel>

<style>
.mode-switch {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    padding: 2px;
    border: 1px solid var(--panel-border);
    border-radius: 6px;
    background: var(--panel-bg-embed);
}
.mode-switch button {
    min-height: 28px;
    border: 1px solid transparent;
    border-radius: 5px;
    color: var(--panel-text-muted);
    background: transparent;
    cursor: pointer;
    font-size: 12px;
}
.mode-switch button.active {
    color: var(--panel-text-bright);
    border-color: var(--panel-border);
    background: var(--panel-btn-primary-bg);
}
.source-switch {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    margin-top: 10px;
    padding: 2px;
    border: 1px solid var(--panel-border);
    border-radius: 6px;
    background: var(--panel-bg-embed);
}
.source-switch button {
    min-height: 28px;
    border: 1px solid transparent;
    border-radius: 5px;
    color: var(--panel-text-muted);
    background: transparent;
    cursor: pointer;
    font-size: 12px;
}
.source-switch button.active {
    color: var(--panel-text-bright);
    border-color: var(--panel-border);
    background: var(--panel-btn-primary-bg);
}
.toggle-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    color: var(--panel-text);
    font-size: 12px;
}
.toggle-row { cursor: pointer; }
.toggle-row input { margin: 0; }
.swatch {
    width: 12px;
    height: 12px;
    border: 1px solid rgba(255, 255, 255, 0.26);
    border-radius: 3px;
    background: #2756c7;
}
</style>
