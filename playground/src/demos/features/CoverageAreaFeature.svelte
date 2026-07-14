<script>
// =============================================================================
// CoverageAreaFeature Demo — 多色地面覆盖
//
// 本示例演示如何使用 CoverageAreaFeature 将多个不规则经纬度多边形以各自颜色
// 栅格化为地面覆盖叠加在地球表面：
// 1. 黄金角螺旋均匀分布生成大量不规则多边形（带 jitter 扰动）
// 2. 叠加中国各省份精确边界（CHINA_PROVINCES, 35 省 195 环）
// 3. 交互式调整多边形数量、尺寸、描边和分辨率
//
// 关键 API：
// - new Daisy.CoverageAreaFeature({ polygons, opacity, resolution, outlineWidth, outlineColor })
// - feature.setPolygons(polygons) — 更新全部多边形
//   - 每项: { ring: [[lng, lat], ...], color: "hsl(...)" }
// - feature.setOutline(width, color) — 动态更新描边
// - feature.setResolution(pxPerDegree) — 动态更新栅格精度
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

const now = Daisy.JulianDate.fromDate(new Date("2026-04-20T06:00:00Z"));
const start = Daisy.JulianDate.addHours(now, -1, new Daisy.JulianDate());
const stop = Daisy.JulianDate.addHours(now, 3, new Daisy.JulianDate());
engine.setSceneTime(start, stop);
engine.setCurrentTime(now);
engine.setMultiplier(1);
engine.play();

let destroyed = false;
registerCleanup(() => { destroyed = true; if (entity) entity.destroy(); });

// ── 工具：生成不规则多边形顶点 ──
function hexRing(cx, cy, radiusDeg, sides = 6, jitter = 0.3) {
    const pts = [];
    const baseRotation = Math.random() * Math.PI * 2;
    for (let i = 0; i < sides; i++) {
        const angle = (i / sides) * Math.PI * 2 + baseRotation;
        const rJitter = radiusDeg * (1 + (Math.random() - 0.5) * jitter * 2);
        let lng = cx + rJitter * Math.cos(angle);
        const lat = cy + rJitter * Math.sin(angle) + (Math.random() - 0.5) * radiusDeg * 0.05;
        lng = ((lng + 180) % 360 + 360) % 360 - 180;
        pts.push([lng, lat]);
    }
    return pts;
}

// ── 中国省份多边形（35 省，195 个环，数据来自 DataV GeoJSON）──
import { CHINA_PROVINCES } from "./chinaProvinces";

/**
 * 黄金角螺旋均匀分布（参考 ShaderPolygonPerf）。
 * 保证任意两点间距离大致相等，无随机聚簇。
 * 生成不规则多边形（带 jitter 扰动）。
 */
function generatePolygons(count, sizeDeg) {
    const polygons = [];
    const goldenAngle = 137.508;
    const densityFactor = Math.sqrt(1000 / Math.max(count, 1));
    for (let i = 0; i < count; i++) {
        const lon = (i * goldenAngle) % 360 - 180;
        const lat = Math.asin(1.0 - 2.0 * i / count) * (180 / Math.PI);
        const rDeg = sizeDeg * densityFactor;
        const sides = 5 + (i % 5);
        const ring = hexRing(lon, lat, Math.max(rDeg, 0.5), sides, 0.3);
        const hue = (i / count) * 360;
        const color = `hsl(${hue}, 70%, 55%)`;
        polygons.push({ ring, color });
    }
    return polygons;
}
/** 单个 CoverageAreaFeature，SDK 内部每个 polygon 独立 beginPath/closePath/fill */
function applyPolygons(n, s) {
    const polygons = generatePolygons(n, s);
    for (const cp of CHINA_PROVINCES) polygons.push(cp);
    if (destroyed || !feature) return;
    feature.setPolygons(polygons);
    lastPolygons = polygons;
    lastCount = polygons.length;
    regenerating = false;
}

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

// ── 响应式状态 ──
let polygonCount = $state(5000);
let sizeDeg = $state(2);
let entity = null;
let feature = null;
let lastCount = $state(0);
let regenerating = $state(false);
let lastPolygons = $state([]);
let strokeEnabled = $state(false);
let outlineWidth = $state(1);
let outlineColorHex = $state("#ff0000");
let resolution = $state(16);
const OUTLINE_ALPHA = 0.8;

// 初始化
entity = new Daisy.Entity("coverage-entity");
entity.position = Daisy.Cartesian3.fromDegrees(0, 0, 0);
entity.bindEngine(engine);
feature = entity.addFeature(new Daisy.CoverageAreaFeature({
    polygons: [],
    opacity: 0.6,
    minVisible: 0.01,
    outlineWidth: strokeEnabled ? outlineWidth : 0,
    outlineColor: hexToRgba(outlineColorHex, OUTLINE_ALPHA),
    resolution,
}));
engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(0, 20, 30000000));
// 初始渲染
applyPolygons(polygonCount, sizeDeg);

// ── 挂载帧率监控与场景控制组件 ──
engine.addWidget(new Daisy.FrameRateWidget());
engine.addWidget(    new Daisy.ControlPanelWidget({ mode: "lite" }));

// 滑动条变更时重新生成
$effect(() => {
    const n = polygonCount;
    const s = sizeDeg;
    if (destroyed || !feature) return;
    regenerating = true;
    requestAnimationFrame(() => applyPolygons(n, s));
});

// 描边/分辨率变化时直接更新
$effect(() => {
    if (destroyed || !feature) return;
    feature.setOutline(strokeEnabled ? outlineWidth : 0, hexToRgba(outlineColorHex, OUTLINE_ALPHA));
});
$effect(() => {
    if (destroyed || !feature) return;
    feature.setResolution(resolution);
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="中国全境边界 · 投影校验">
    <div class="head">
        <div class="eyebrow">Coverage Area Feature</div>
        <h2>中国全境边界 · 投影校验</h2>
    </div>
    <div class="ctrl-row">
        <span class="ctrl-label">数量</span>
        <input type="range" min="0" max="20000" step="100" bind:value={polygonCount} />
        <span class="ctrl-val">{polygonCount}</span>
    </div>
    <div class="ctrl-row">
        <span class="ctrl-label">尺寸</span>
        <input type="range" min="2" max="30" step="1" bind:value={sizeDeg} />
        <span class="ctrl-val">{sizeDeg}°</span>
    </div>
    <div class="ctrl-row">
        <span class="ctrl-label">描边</span>
        <label class="toggle">
            <input type="checkbox" bind:checked={strokeEnabled} />
            <span class="toggle-slider"></span>
        </label>
    </div>
    {#if strokeEnabled}
    <div class="ctrl-row">
        <span class="ctrl-label">宽度</span>
        <input type="range" min="0.5" max="5" step="0.5" bind:value={outlineWidth} />
        <span class="ctrl-val">{outlineWidth.toFixed(1)}px</span>
    </div>
    <div class="ctrl-row">
        <span class="ctrl-label">边色</span>
        <input type="color" bind:value={outlineColorHex} />
        <span class="ctrl-val" style="min-width: auto;">{outlineColorHex}</span>
    </div>
    {/if}
    <div class="ctrl-row">
        <span class="ctrl-label">清晰度</span>
        <input type="range" min="4" max="16" step="1" bind:value={resolution} />
        <span class="ctrl-val">{resolution}px/°</span>
    </div>
    <div class="ctrl-hint">数量=0 时仅显示中国各省份边界，用于验证地理投影</div>
    <div class="ctrl-sub">
        {#if regenerating}
            <span class="spinner">⟳ 生成中...</span>
        {:else}
            <span>{lastCount} 个多边形</span>
            <span style="color:rgba(220,236,255,0.45)">|</span>
            <span>opacity 0.6</span>
            <span style="color:rgba(220,236,255,0.45)">|</span>
            <span>{resolution}px/°</span>
        {/if}
    </div>
</DemoPanel>

<style>
.head { margin-bottom: 10px; }
    .eyebrow { color: var(--ds-overlay-accent); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
    h2 { margin: 2px 0 0; font-size: 15px; line-height: 1.3; }
    .ctrl-row { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
    .ctrl-row input[type="range"] {
        flex: 1; height: 4px; -webkit-appearance: none; appearance: none;
        background: var(--ds-overlay-border); border-radius: 2px; outline: none;
    }
    .ctrl-row input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none; appearance: none;
        width: 14px; height: 14px; border-radius: 50%;
        background: var(--ds-overlay-accent); cursor: pointer;
    }
    .ctrl-row input[type="color"] {
        -webkit-appearance: none; appearance: none;
        width: 28px; height: 20px; padding: 0; border: 1px solid rgba(106,188,255,0.4);
        border-radius: 4px; background: transparent; cursor: pointer;
    }
    .ctrl-row input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
    .ctrl-row input[type="color"]::-webkit-color-swatch { border: none; border-radius: 3px; }
    .ctrl-label { color: var(--panel-text); font-size: 11px; min-width: 28px; }
    .ctrl-val { font-size: 18px; font-weight: 700; color: var(--ds-overlay-accent); min-width: 50px; text-align: right; font-variant-numeric: tabular-nums; }
    .ctrl-hint { color: #d4a574; font-size: 10px; margin: 4px 0 6px; line-height: 1.3; }
    .ctrl-sub { display: flex; align-items: center; gap: 8px; font-size: 11px; color: var(--ds-overlay-text-label); }
    .spinner { color: #f59e0b; }
    .toggle { position: relative; display: inline-flex; align-items: center; cursor: pointer; }
    .toggle input { position: absolute; opacity: 0; width: 0; height: 0; }
    .toggle-slider {
        width: 32px; height: 18px; background: var(--panel-bg-embed); border-radius: 10px;
        transition: background .2s; position: relative; border: 1px solid var(--ds-overlay-border);
    }
    .toggle-slider::after {
        content: ""; position: absolute; top: 2px; left: 2px;
        width: 12px; height: 12px; border-radius: 50%; background: var(--ds-overlay-text-muted);
        transition: transform .2s, background .2s;
    }
    .toggle input:checked + .toggle-slider { background: var(--ds-overlay-accent); border-color: var(--ds-overlay-accent); }
    .toggle input:checked + .toggle-slider::after { transform: translateX(14px); background: #fff; }
</style>
