<script>
// =============================================================================
// 原生时间轴 & 全局主题色
// -----------------------------------------------------------------------------
// 展示 Daisy 原生时间轴组件（NativeTimelineWidget）和全局主题色配置。
// 使用 ColorPalette.setWidgetTheme 可统一修改所有 Widget 的色调。
//
// 关键 API：
// - Daisy.ColorPalette.setWidgetTheme(color, { opacity, grayscale })
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();
let color = $state("default");
const themes = [
    { key: "default", label: "默认", swatch: "linear-gradient(180deg,#26374c,#121b28)" },
    { key: "light", label: "Light", swatch: "linear-gradient(180deg,#f8fbff,#dfe8f2)" },
    { key: "blue", label: "蓝", swatch: "#2eaaff" },
    { key: "green", label: "绿", swatch: "#22c55e" },
    { key: "red", label: "红", swatch: "#ef4444" },
    { key: "orange", label: "橙", swatch: "#f97316" },
    { key: "purple", label: "紫", swatch: "#a855f7" },
    { key: "cyan", label: "青", swatch: "#06b6d4" },
    { key: "pink", label: "粉", swatch: "#ec4899" },
    { key: "slate", label: "灰", swatch: "#64748b" },
];

$effect(() => {
    Daisy.ColorPalette.setWidgetTheme(color);
    __log(`setWidgetTheme: ${color}`);
});
</script>

<div class="control-panel">
    <div class="head">
        <div class="eyebrow">Global Widget Theme</div>
        <h2>主题色</h2>
    </div>
    <div class="presets">
        {#each themes as theme}
            <button
                class="preset-btn {theme.key === color ? 'active' : ''}"
                style="background:{theme.swatch}"
                title={theme.label}
                aria-label={theme.label}
                onclick={() => color = theme.key}
            >
                {#if theme.key === "light"}
                    <span class="light-dot"></span>
                {/if}
            </button>
        {/each}
    </div>
</div>

<style>
    .control-panel {
        position: absolute; top: 18px; left: 18px; z-index: 8;
        width: 220px; padding: 14px;
        border: 1px solid var(--ds-overlay-border); border-radius: 8px;
        background: var(--ds-overlay-bg);
        color: var(--ds-overlay-text); font-family: "Segoe UI","Microsoft YaHei",sans-serif;
        backdrop-filter: blur(12px);
    }
    .head { margin-bottom: 8px; }
    .eyebrow { color: var(--ds-overlay-accent); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
    h2 { margin: 2px 0 0; font-size: 16px; line-height: 1.2; }
    .presets { display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap; }
    .preset-btn { position: relative; width: 28px; height: 28px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: border-color .15s; }
    .preset-btn:hover { border-color: #fff; }
    .preset-btn.active { border-color: #2eaaff; box-shadow: 0 0 6px #2eaaff; }
    .light-dot {
        position: absolute;
        inset: 7px;
        border-radius: 50%;
        border: 1px solid rgba(15, 23, 42, 0.28);
        background: rgba(255, 255, 255, 0.7);
    }
</style>
