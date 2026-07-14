<script>
// =============================================================================
// ShaderPolygonPerf Demo — 着色器多边形性能压测
//
// 本示例演示 ShaderPolygonFeature 的性能特性：
// 1. 最多 1000 个着色器多边形同时渲染
// 2. 黄金角均匀分布到椭球
// 3. 动态调整数量和尺寸
// 4. 轮廓边性能影响
//
// 关键 API：
// - Daisy.ShaderPolygonFeature: 着色器多边形组件
//   - pathway: 多边形路径坐标
//   - color: 填充颜色
//   - outline: 是否显示轮廓
//   - outlineColor: 轮廓颜色
//   - outlineWidth: 轮廓宽度
// - feature.setOutline: 设置轮廓
// - entity.removeFeature: 移除组件
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化 ──────────────────────────────────────────────
const C3 = Daisy.Cartesian3;
const Color = Daisy.Color;

const MAX = 1000;
const BATCH = 80;

// ---- 黄金角均匀分布到椭球 ----
function generateDefs(count, sizeDeg) {
    const defs = [];
    const goldenAngle = 137.508;
    for (let i = 0; i < count; i++) {
        const lon = (i * goldenAngle) % 360 - 180;
        const lat = Math.asin(1.0 - 2.0 * i / count) * (180 / Math.PI);
        const sides = 4 + (i % 5);
        const rDeg = sizeDeg * (0.7 + (i % 3) * 0.15);
        const pts = [];
        for (let j = 0; j < sides; j++) {
            const a = (j / sides) * Math.PI * 2 + (i * 0.618);
            pts.push(C3.fromDegrees(lon + rDeg * Math.cos(a), lat + rDeg * Math.sin(a), 0));
        }
        const hue = (i / count) * 360;
        const c = Color.fromHsl(hue / 360, 0.7, 0.55, 1.0).withAlpha(0.75);
        defs.push({ pts, color: c });
    }
    return defs;
}

const entity = engine.createEntity("PerfTest");
entity.position = C3.fromDegrees(0, 20, 0);

let activeFeatures = [];
let count = $state(500);
let sizeDeg = $state(10);
let showOutline = $state(false);
let fps = $state(0);
let renderTimer = null;

function clearFeatures() {
    if (renderTimer) { clearTimeout(renderTimer); renderTimer = null; }
    for (const f of activeFeatures) entity.removeFeature(f);
    activeFeatures = [];
}

function applyCount(n) {
    clearFeatures();
    if (n === 0) return;
    const defs = generateDefs(n, sizeDeg);
    let idx = 0;
    function addBatch() {
        const end = Math.min(idx + BATCH, n);
        for (let i = idx; i < end; i++) {
            const d = defs[i];
            const f = new Daisy.ShaderPolygonFeature({
                pathway: d.pts,
                color: d.color,
                outline: showOutline,
                outlineColor: Color.WHITE,
                outlineWidth: 1.5,
            });
            entity.addFeature(f);
            activeFeatures.push(f);
        }
        idx = end;
        if (idx < n) renderTimer = setTimeout(addBatch, 0);
    }
    addBatch();
}

// ── $effect: 数量或尺寸变更时重建 ──
$effect(() => {
    // 读取 count 和 sizeDeg 以建立依赖
    const _ = count + sizeDeg;
    applyCount(count);
});

// ── $effect: 轮廓开关变更 ──
$effect(() => {
    const _ = showOutline;
    for (const f of activeFeatures) f.setOutline(showOutline, Color.WHITE, 1.5);
});

// ---- FPS 统计 ----
let frameCount = 0;
let lastFpsTime = performance.now();
function updateFps() {
    frameCount++;
    const now = performance.now();
    if (now - lastFpsTime >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFpsTime = now;
    }
    requestAnimationFrame(updateFps);
}
requestAnimationFrame(updateFps);

// ---- 初始 ----
applyCount(500);
engine.camera.flyToTarget(C3.fromDegrees(30, 20, 15000000));

__log("=== ShaderPolygon 性能压测 ===");
__log("基于自定义着色器管线，单帧可渲染数百个贴地多边形");
__log("数量 0~1000，尺寸 1~45°");

registerCleanup(() => {
    if (renderTimer) clearTimeout(renderTimer);
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="Demo">
        <div class="panel-label">ShaderPolygonFeature 高性能贴地多边形</div>
        <div class="sp-row">
            <span class="sp-row-label">数量</span>
            <input type="range" min="0" max="1000" step="10" bind:value={count} />
            <div class="sp-val">{count}</div>
        </div>
        <div class="sp-row">
            <span class="sp-row-label">尺寸</span>
            <input type="range" min="1" max="45" step="1" bind:value={sizeDeg} />
            <div class="sp-val">{sizeDeg}°</div>
        </div>
        <div class="sp-hint">面积越大，单体渲染时长越大，但不会阻塞主线任务</div>
        <div class="sp-sub">
            <label><input type="checkbox" bind:checked={showOutline} /> 轮廓边</label>
            <span class="sp-hint">启用会导致性能急剧下降</span>
        </div>
        <div class="sp-fps">{fps ? fps + " FPS" : ""}</div>
    </DemoPanel>
<style>
.panel-label { color: var(--panel-text-muted); font-size: 11px; margin-bottom: 2px; }
.sp-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
.sp-row:last-child { margin-bottom: 0; }
.sp-row input[type="range"] { flex: 1; accent-color: var(--panel-accent); height: 6px; }
.sp-row-label { color: var(--panel-text-muted); font-size: 11px; min-width: 36px; }
.sp-val { font-size: 20px; font-weight: 800; color: var(--panel-accent); min-width: 48px; text-align: right; font-variant-numeric: tabular-nums; }
.sp-hint { color: #d4a574; font-size: 10px; margin-top: 2px; line-height: 1.3; }
.sp-sub { display: flex; align-items: center; gap: 14px; margin-top: 6px; }
.sp-sub label { display: inline-flex; align-items: center; gap: 5px; color: var(--panel-text-muted); font-size: 11px; }
.sp-fps { color: #5fda7f; font-size: 11px; margin-top: 4px; font-variant-numeric: tabular-nums; }
</style>
