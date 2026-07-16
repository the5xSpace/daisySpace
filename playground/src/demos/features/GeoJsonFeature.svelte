<script>
// =============================================================================
// GeoJsonFeature Demo — GeoJSON 渲染
//
// 本示例演示如何使用 GeoJsonFeature 从 URL 加载 GeoJSON 数据并渲染为地面覆盖：
// 1. 加载 ne_110m_admin_0_countries.geojson（世界国家边界）
// 2. 通过回调按国家修改多边形属性和颜色
// 3. 交互式调整描边宽度、颜色和透明度
//
// 关键 API：
// - new Daisy.GeoJsonFeature({ outlineWidth, outlineColor, opacity, resolution, label })
// - feature.loadFromUrl(url, callback) — 加载 GeoJSON 并转换
//   - callback 接收 polygons 和 options，返回修改后的配置
// - feature.setOutline(width, color) — 动态更新描边
// - feature.setOpacity(opacity) — 动态更新透明度
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

function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

// ── 状态 ──
let entity = null;
let feature = null;
let loading = $state(false);
let loaded = $state(false);
let error = $state("");
let outlineWidth = $state(0.8);
let outlineColorHex = $state("#ff0000");
let opacity = $state(0.35);
const OUTLINE_ALPHA = 0.8;

// ── 初始化 ──
entity = new Daisy.Entity("geojson-entity");
entity.position = Daisy.Cartesian3.fromDegrees(0, 0, 0);
entity.bindEngine(engine);
feature = entity.addFeature(new Daisy.GeoJsonFeature({
    outlineWidth,
    outlineColor: hexToRgba(outlineColorHex, OUTLINE_ALPHA),
    opacity,
    resolution: 8,
    label: {
        show: true,
        font: "12px sans-serif",
        fillColor: "#ffffff",
        outlineColor: "#0f172a",
        outlineWidth: 3,
    },
}));
engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(0, 20, 30000000));

// ── 挂载帧率监控与场景控制组件 ──
engine.addWidget(new Daisy.FrameRateWidget());
engine.addWidget(new Daisy.ControlPanelWidget({ mode: "lite" }));
engine.addWidget(new Daisy.EarthGridLayers());

// ── 加载默认 GeoJSON ──
async function loadDefault() {
    if (destroyed || !feature || loading) return;
    loading = true;
    error = "";
    try {
        await feature.loadFromUrl("data/ne_110m_admin_0_countries.geojson", (polygons, options) => {
            return {
                polygons,
                options: {
                    ...options,
                    outlineWidth,
                    outlineColor: hexToRgba(outlineColorHex, OUTLINE_ALPHA),
                    opacity,
                },
            };
        });
        loaded = true;
    } catch (e) {
        error = e.message;
        console.error("GeoJsonFeature demo:", e);
    } finally {
        loading = false;
    }
}
loadDefault();

// ── 描边变化 ──
$effect(() => {
    if (destroyed || !feature) return;
    feature.setOutline(outlineWidth, hexToRgba(outlineColorHex, OUTLINE_ALPHA));
});

// ── 透明度变化 ──
$effect(() => {
    if (destroyed || !feature) return;
    feature.setOpacity(opacity);
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="世界国家边界 · GeoJSON 渲染">
    <div class="head">
        <div class="eyebrow">GeoJSON Feature</div>
        <h2>世界国家边界 · GeoJSON 渲染</h2>
    </div>

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
    <div class="ctrl-row">
        <span class="ctrl-label">透明度</span>
        <input type="range" min="0.1" max="1" step="0.05" bind:value={opacity} />
        <span class="ctrl-val">{opacity.toFixed(2)}</span>
    </div>
    <div class="ctrl-sub">
        {#if loading}
            <span class="spinner">⟳ 加载中...</span>
        {:else if error}
            <span style="color:#ef4444;">{error}</span>
        {:else if loaded}
            <span>ne_110m_admin_0_countries.geojson · 按国家着色 + 名称标签</span>
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
        width: 28px; height: 20px; padding: 0; border: 1px solid var(--panel-border);
        border-radius: 4px; background: transparent; cursor: pointer;
    }
    .ctrl-row input[type="color"]::-webkit-color-swatch-wrapper { padding: 0; }
    .ctrl-row input[type="color"]::-webkit-color-swatch { border: none; border-radius: 3px; }
    .ctrl-label { color: var(--panel-text-muted); font-size: 11px; min-width: 36px; }
    .ctrl-val { font-size: 18px; font-weight: 700; color: var(--ds-overlay-accent); min-width: 48px; text-align: right; font-variant-numeric: tabular-nums; }
    .ctrl-sub { display: flex; align-items: center; gap: 8px; margin-top: 8px; font-size: 11px; color: var(--ds-overlay-text-label); }
    .spinner { color: var(--color-warning); }
</style>
