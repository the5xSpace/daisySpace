<script>
// =============================================================================
// TilesetFeature Demo — 3DTiles 模型 LOD 演示
//
// 本示例演示如何使用 TilesetFeature 加载和控制 3DTiles 模型：
// 1. 加载 3DTiles 模型
// 2. 控制屏幕空间误差（SSE）
// 3. 动态 SSE 根据距离自动调节质量
// 4. 模型变换（缩放/偏移）
//
// 关键 API：
// - Daisy.TilesetFeature: 3DTiles 组件
//   - url: 3DTiles 数据路径
//   - maximumScreenSpaceError: 最大屏幕空间误差
//   - dynamicScreenSpaceError: 是否启用动态 SSE
//   - modelMatrix: 模型变换矩阵
// - tilesetFeature.onload: 加载完成回调
// - entity.getBoundingSphere(): 获取包围球
// - engine.camera.flyToTarget: 相机飞到目标
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化 ──────────────────────────────────────────────
var TILESET_URL = Daisy.BuildModuleUrl.getUrl("tileset/tileset.json");

var tilesetEntity = engine.createEntity("Dragon Tileset");
tilesetEntity.position = Daisy.Cartesian3.fromDegrees(-75.612, 39.958, 0);

var tilesetFeature = new Daisy.TilesetFeature({
    url: TILESET_URL,
    maximumScreenSpaceError: 16,
    dynamicScreenSpaceError: false,
    show: true,
});
tilesetEntity.addFeature(tilesetFeature);

tilesetFeature.onload(function () {
    __log("tileset loaded, flying to bounding sphere...");
    flyToDragon(5);
});

__log("TilesetFeature: 加载 dragon 三级离散 LOD（low / medium / high）");

// ── 响应式状态 ──
let sse = $state(16);
let dynamicSse = $state(false);
let show = $state(true);
let scale = $state(1);
let activeCam = $state("近距离");
let statusText = $state("等待加载…");
let fps = $state(0);

function applyParams() {
    tilesetFeature.options = Object.assign({}, tilesetFeature.options, {
        maximumScreenSpaceError: sse,
        dynamicScreenSpaceError: dynamicSse,
        show,
    });
}

// ── $effect: SSE/显隐变更时同步 ──
$effect(() => {
    const _ = sse + (dynamicSse ? 1 : 0) + (show ? 1 : 0);
    applyParams();
});

function flyToDragon(rangeFactor) {
    var bs = tilesetEntity.getBoundingSphere();
    if (!bs) return;
    var range = bs.radius * (rangeFactor || 5);
    engine.camera.flyToTarget(tilesetEntity, {
        offset: new Daisy.HeadingPitchRange(0, Daisy.Math.toRadians(-45), range),
    });
}

var cameraPresets = { "鸟瞰": 8, "近距离": 4, "超近距离": 2, "侧面": 5 };

function flyToPreset(name) {
    flyToDragon(cameraPresets[name]);
    activeCam = name;
    __log("相机: " + name);
}

function applyTransformToFeature(transformScale, upOffset) {
    var m = Daisy.Matrix4.IDENTITY;
    if (transformScale !== 1) {
        m = Daisy.Matrix4.fromScale(new Daisy.Cartesian3(transformScale, transformScale, transformScale));
    }
    if (upOffset) {
        var t = Daisy.Matrix4.fromTranslation(new Daisy.Cartesian3(0, 0, upOffset));
        m = Daisy.Matrix4.multiply(m, t, new Daisy.Matrix4());
    }
    tilesetFeature.options = Object.assign({}, tilesetFeature.options, { modelMatrix: m });
    __log("变换: scale=" + transformScale + " offset=" + upOffset + "m");
}

function resetTransform() {
    scale = 1;
    tilesetFeature.options = Object.assign({}, tilesetFeature.options, { modelMatrix: undefined });
    __log("变换: 已重置");
}

function scale2x() { scale *= 2; applyTransformToFeature(scale, 0); }
function scale05x() { scale *= 0.5; applyTransformToFeature(scale, 0); }
function moveUp() { applyTransformToFeature(scale, 50); }

// ── FPS 统计 ──
let frameCount = 0;
let lastFpsTime = performance.now();
function updateFps() {
    frameCount++;
    var now = performance.now();
    if (now - lastFpsTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFpsTime = now;
    }
    requestAnimationFrame(updateFps);
}
requestAnimationFrame(updateFps);

// ── 加载状态检测 ──
tilesetFeature.onload(function () {
    statusText = "已加载 — 鼠标滚轮缩放观察 LOD 切换";
});

__log("=== TilesetFeature Dragon LOD 演示 ===");
__log("数据: CesiumGS 3d-tiles-samples/TilesetWithDiscreteLOD");
__log("三级 LOD: dragon_low(44KB) → dragon_medium(264KB) → dragon_high(4.3MB)");
__log("滑动 SSE 滑块观察 LOD 层级切换");
__log("开启「动态 SSE」后远距离自动降级");

import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="TilesetFeature · Dragon LOD 演示">
        <div class="panel-title">TilesetFeature · Dragon LOD 演示</div>
        <div class="ts-row">
            <span class="ts-label">SSE</span>
            <input type="range" min="1" max="64" step="1" bind:value={sse} />
            <div class="ts-val">{sse}</div>
        </div>
        <div class="ts-hint">最大屏幕空间误差：值越小细节越高，值越大加载越快</div>
        <div class="ts-sub">
            <label><input type="checkbox" bind:checked={dynamicSse} /> 动态 SSE</label>
            <label><input type="checkbox" bind:checked={show} /> 显示</label>
        </div>
        <div class="ts-hint">动态 SSE：根据距离自动调节质量，远距离降低细节</div>
        <div class="ts-status" class:loaded={statusText.startsWith("已加载")}>{statusText}</div>
        <div class="ts-cam">
            {#each Object.keys(cameraPresets) as name}
                <button class:active={activeCam === name} onclick={() => flyToPreset(name)}>{name}</button>
            {/each}
        </div>
        <div class="ts-transform">
            <button onclick={resetTransform}>重置变换</button>
            <button onclick={scale2x}>放大 2x</button>
            <button onclick={scale05x}>缩小 0.5x</button>
            <button onclick={moveUp}>上移 50m</button>
        </div>
        <div class="ts-hint">modelMatrix：对 tileset 做缩放 / 偏移变换</div>
        <div class="ts-fps">{fps ? fps + " FPS" : ""}</div>
    </DemoPanel>
<style>
.panel-title { font-size: 13px; font-weight: 700; color: var(--panel-accent); margin-bottom: 10px; }
.ts-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.ts-row input[type="range"] { flex: 1; accent-color: var(--panel-accent); height: 6px; }
.ts-val { font-size: 18px; font-weight: 800; color: var(--panel-accent); min-width: 40px; text-align: right; font-variant-numeric: tabular-nums; }
.ts-label { color: var(--panel-text-muted); font-size: 11px; min-width: 50px; }
.ts-sub { display: flex; align-items: center; gap: 14px; margin-top: 4px; margin-bottom: 6px; }
.ts-sub label { display: inline-flex; align-items: center; gap: 5px; color: var(--panel-text-muted); font-size: 11px; }
.ts-hint { color: var(--panel-text-label); font-size: 10px; margin-top: 1px; line-height: 1.3; }
.ts-status { color: #d4a574; font-size: 10px; margin-top: 4px; }
.ts-status.loaded { color: #5fda7f; }
.ts-cam { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
.ts-cam button, .ts-transform button {
    background: rgba(80, 160, 220, 0.15); border: 1px solid rgba(120, 200, 255, 0.3);
    color: #9dd4f0; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 11px;
}
.ts-cam button:hover, .ts-transform button:hover { background: rgba(80, 160, 220, 0.35); }
.ts-cam button.active { background: rgba(80, 160, 220, 0.4); border-color: var(--panel-accent); color: var(--panel-text-bright); }
.ts-transform { display: flex; gap: 6px; margin-top: 6px; }
.ts-transform button {
    background: rgba(220, 160, 80, 0.15); border-color: rgba(255, 200, 100, 0.3); color: #e8c87a;
}
.ts-transform button:hover { background: rgba(220, 160, 80, 0.35); }
.ts-fps { color: #5fda7f; font-size: 11px; margin-top: 6px; font-variant-numeric: tabular-nums; }
</style>
