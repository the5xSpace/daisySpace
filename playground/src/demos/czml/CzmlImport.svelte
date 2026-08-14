<script>
// =============================================================================
// CZML 导入对比 Demo
//
// 展示同一份 CZML 数据在 Daisy 模式（CzmlImporter Entity/Feature 管线）
// 与 Cesium 回退模式（CzmlImporter.load(czml, "cesium") 原生 CZML 数据源）
// 下的渲染差异，默认左右分屏对比，也可聚焦单侧查看。
//
// 功能：
// 1. 左右分屏对比：左侧 Daisy 渲染，右侧 Cesium 原生渲染
// 2. 相机同步：右侧相机自动跟随左侧操作
// 3. 聚焦模式：可切换为仅看 Daisy 侧或仅看 Cesium 侧
// 4. 时钟同步：两侧时间轴保持同步
//
// 关键 API：
// - new Daisy.CzmlImporter(engine) — CZML 数据导入器
// - importer.load(czmlData) — 返回 Daisy Entity 数组
// - importer.load(czmlData, "cesium") — 返回 Cesium DataSource
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const czmlUrl = "/tests/data/sample.czml";
let initialized = false;
let compareRoot;
let daisySlot;
let cesiumSlot;
let focusMode = $state("compare");

let movedViewerNodes = [];
let cesiumEngine;
let cesiumDataSource;
let resizeObserver;
let czmlEntities = [];
let disposed = false;
let cameraChangedListener;
let cameraChangedRemove;

function moveMainViewerIntoPane() {
    movedViewerNodes = Array.from(container.childNodes).filter((node) => node !== compareRoot);
    for (const node of movedViewerNodes) {
        if (node.parentNode === container) {
            daisySlot.appendChild(node);
        }
    }
}

function restoreMainViewer() {
    for (const node of movedViewerNodes) {
        if (node.parentNode && node.parentNode !== container) {
            container.appendChild(node);
        }
    }
}

async function loadCzml() {
    const res = await fetch(czmlUrl);
    if (!res.ok) throw new Error(`Failed to fetch ${czmlUrl}: ${res.status}`);
    const czmlData = await res.json();
    __log(`CZML 文件已加载: ${czmlUrl}（${czmlData.length - 1} 个实体）`);
    return czmlData;
}

function cleanupDaisyEntities() {
    for (const entity of czmlEntities) {
        try {
            engine.removeEntity(entity);
        } catch {
        }
    }
    czmlEntities = [];
}

async function cleanupCesiumDataSource() {
    if (!cesiumDataSource || !cesiumEngine) return;
    try {
        await cesiumEngine._originViewer.dataSources.remove(cesiumDataSource, true);
    } catch {
    }
    cesiumDataSource = undefined;
}

async function createCesiumCompareEngine() {
    cesiumEngine = await Daisy.Engine.create(cesiumSlot, {
        timeline: false,
        animation: false,
        simulationTimeWidget: false,
        controlPanel: false,
    });
    cesiumEngine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default });
    cesiumEngine.geoLayer.clearImagery();
    cesiumEngine.geoLayer.setBaseImagery({
        type: Daisy.GeoImageryType.XYZ,
        url: Daisy.BuildModuleUrl.getUrl("static/assets/NaturalEarthII/{z}/{x}/{reverseY}.jpg"),
        minLevel: 0,
        maxLevel: 2,
        tilingScheme: "geographic",
    });
}

function syncClockToCesium() {
    if (!cesiumEngine) return;
    cesiumEngine.setSceneTime(engine.getStartTime(), engine.getStopTime(), engine.isSceneTimeLoopEnabled());
    cesiumEngine.setCurrentTime(engine.getCurrentTime());
    cesiumEngine.setMultiplier(engine.getMultiplier());
    if (engine.isAnimating()) { cesiumEngine.play(); } else { cesiumEngine.pause(); }
}

function syncRightCamera() {
    if (!cesiumEngine) return;
    try {
        const pos = engine.camera.getPosition();
        const dir = engine.camera.getDirection();
        const up = engine.camera.getUp();
        cesiumEngine.camera.setView({
            destination: Daisy.Cartesian3.clone(pos),
            orientation: {
                direction: Daisy.Cartesian3.clone(dir),
                up: Daisy.Cartesian3.clone(up),
            },
        });
    } catch {
    }
}

function setupCameraSync() {
    cameraChangedListener = () => syncRightCamera();
    cameraChangedRemove = engine.camera.onChanged(cameraChangedListener);
}

function setupResizeSync() {
    resizeObserver = new ResizeObserver(() => {
        engine.resize();
        cesiumEngine?.resize();
    });
    resizeObserver.observe(container);
}

async function loadBothModes() {
    const czmlData = await loadCzml();

    cleanupDaisyEntities();
    const daisyImporter = new Daisy.CzmlImporter(engine);
    czmlEntities = daisyImporter.load(czmlData);

    await cleanupCesiumDataSource();
    const cesiumImporter = new Daisy.CzmlImporter(cesiumEngine);
    cesiumDataSource = await cesiumImporter.load(czmlData, "cesium");
    await cesiumEngine._originViewer.dataSources.add(cesiumDataSource);

    syncClockToCesium();
    syncRightCamera();
    engine.play?.();
    cesiumEngine.play?.();
    __log('[对比模式] 左侧 importer.load(czml)，右侧 importer.load(czml, "cesium")');
}

async function startCompareMode() {
    moveMainViewerIntoPane();
    await createCesiumCompareEngine();
    if (disposed) return;
    setupResizeSync();
    setupCameraSync();
    await loadBothModes();
    if (!disposed) {
        requestAnimationFrame(() => {
            engine.resize();
            cesiumEngine?.resize();
            syncRightCamera();
        });
    }
}

$effect(() => {
    if (initialized || !compareRoot || !daisySlot || !cesiumSlot) return;
    initialized = true;
    startCompareMode();

    registerCleanup?.(async () => {
        disposed = true;
        resizeObserver?.disconnect();
        resizeObserver = undefined;

        if (cameraChangedRemove) {
            try {
                cameraChangedRemove();
            } catch {
            }
        }

        cleanupDaisyEntities();
        await cleanupCesiumDataSource();

        if (cesiumEngine) {
            try {
                cesiumEngine.destroy();
            } catch {
            }
            cesiumEngine = undefined;
        }

        restoreMainViewer();
    });
});

function setFocus(mode = "compare") {
    focusMode = mode;
    requestAnimationFrame(() => {
        engine.resize();
        cesiumEngine?.resize();
        syncRightCamera();
    });
}
</script>

<div
    class="czml-compare"
    class:focus-daisy={focusMode === "daisy"}
    class:focus-cesium={focusMode === "cesium"}
    bind:this={compareRoot}
>
    <div class="compare-toolbar">
        <div>
            <span>CZML 对比模式</span>
            <strong>同一份数据，两条渲染路径</strong>
        </div>
        <div class="mode-tabs">
            <button type="button" class:active={focusMode === "compare"} onclick={() => setFocus("compare")}>左右对比</button>
            <button type="button" class:active={focusMode === "daisy"} onclick={() => setFocus("daisy")}>聚焦 Daisy</button>
            <button type="button" class:active={focusMode === "cesium"} onclick={() => setFocus("cesium")}>聚焦 Cesium</button>
        </div>
    </div>

    <section class="pane pane-daisy">
        <div class="pane-label">
            <span>Daisy</span>
            <strong>CzmlImporter + Entity/Feature</strong>
        </div>
        <div class="viewer-slot" bind:this={daisySlot}></div>
    </section>

    <section class="pane pane-cesium">
        <div class="pane-label right">
            <span>Cesium</span>
            <strong>CzmlImporter.load(czml, "cesium")</strong>
        </div>
        <div class="viewer-slot" bind:this={cesiumSlot}></div>
    </section>
</div>

<style>
.czml-compare {
    position: absolute;
    inset: 0;
    z-index: 5;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    background: #020817;
}
.czml-compare.focus-daisy {
    grid-template-columns: minmax(0, 1fr) 0;
}
.czml-compare.focus-cesium {
    grid-template-columns: 0 minmax(0, 1fr);
}
.pane {
    position: relative;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
    transition: opacity 0.18s ease;
}
.pane-daisy {
    border-right: 1px solid rgba(125, 211, 252, 0.35);
}
.focus-daisy .pane-cesium,
.focus-cesium .pane-daisy {
    opacity: 0;
    pointer-events: none;
}
.viewer-slot {
    position: absolute;
    inset: 0;
    min-width: 0;
    min-height: 0;
}
.viewer-slot :global(.cesium-viewer),
.viewer-slot :global(.cesium-widget),
.viewer-slot :global(.cesium-widget canvas) {
    width: 100% !important;
    height: 100% !important;
}
.compare-toolbar {
    position: absolute;
    top: 12px;
    left: 50%;
    z-index: 20;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 8px 10px 8px 12px;
    border: 1px solid rgba(125, 211, 252, 0.28);
    border-radius: 10px;
    background: rgba(2, 8, 23, 0.78);
    color: #e0f2fe;
    backdrop-filter: blur(10px);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.28);
}
.compare-toolbar span {
    display: block;
    color: #7dd3fc;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}
.compare-toolbar strong {
    display: block;
    margin-top: 2px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
}
.mode-tabs {
    display: inline-flex;
    gap: 4px;
    padding: 3px;
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-radius: 8px;
    background: rgba(15, 23, 42, 0.72);
}
.mode-tabs button {
    height: 28px;
    padding: 0 10px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: #94a3b8;
    cursor: pointer;
    font-size: 12px;
}
.mode-tabs button:hover,
.mode-tabs button.active {
    background: rgba(56, 189, 248, 0.18);
    color: #e0f2fe;
}
.pane-label {
    position: absolute;
    top: 66px;
    left: 14px;
    z-index: 10;
    padding: 7px 10px;
    border: 1px solid rgba(125, 211, 252, 0.24);
    border-radius: 8px;
    background: rgba(2, 8, 23, 0.68);
    color: #e0f2fe;
    backdrop-filter: blur(8px);
}
.pane-label.right {
    left: auto;
    right: 14px;
}
.pane-label span {
    display: block;
    color: #67e8f9;
    font-size: 13px;
    font-weight: 800;
}
.pane-label strong {
    display: block;
    margin-top: 2px;
    color: #bae6fd;
    font-size: 11px;
    font-weight: 500;
}
@media (max-width: 860px) {
    .czml-compare {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
    .czml-compare.focus-daisy {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 0;
    }
    .czml-compare.focus-cesium {
        grid-template-columns: 1fr;
        grid-template-rows: 0 1fr;
    }
    .pane-daisy {
        border-right: 0;
        border-bottom: 1px solid rgba(125, 211, 252, 0.35);
    }
    .compare-toolbar {
        left: 12px;
        right: 12px;
        transform: none;
        justify-content: space-between;
    }
}
</style>
