<script>
// =============================================================================
// 组件聚合演示
// -----------------------------------------------------------------------------
// 展示如何动态管理多个 Widget 组件，包括：
//   - SimulationTimeDisplayWidget : 仿真时间显示
//   - FrameRateWidget             : 帧率监控
//   - TimelineWidget              : 时间轴
//   - ControlPanelWidget          : 播放控制面板
// 关键 API:
//   - engine.addWidget()          : 添加组件
//   - engine.removeWidget()       : 移除组件
// =============================================================================

// ── 1. 组件属性 ────────────────────────────────────────────────────────────────
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1b. 全局色盘 ──────────────────────────────────────────────────────────
let widgetColor = $state("default");
let widgetOpacity = $state(1);
let widgetGrayscale = $state(0);
const widgetThemes = [
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
    Daisy.ColorPalette.setWidgetTheme(widgetColor, {
        opacity: Number(widgetOpacity),
        grayscale: Number(widgetGrayscale),
    });
});

// ── 2. 控制面板状态 ──────────────────────────────────────────────────────────
let controlPanelLayout = $state("column");
let controlPanelInstance = $state(null);

const widgetDefs = [
    { key: "simulationTime", label: "仿真时间", cls: () => new Daisy.SimulationTimeDisplayWidget({ widgetOptions: { preset: "centerTop", title: "仿真时间" } }) },
    { key: "frameRate", label: "帧率监控", cls: () => new Daisy.FrameRateWidget(
        { widgetOptions: { preset: "centerTop", title: "帧率监控" } }
    ) },
    { key: "timeline", label: "时间轴", cls: () => new Daisy.TimelineWidget() },
];

let states = $state(widgetDefs.map((d) => ({ ...d, enabled: true, instance: null })));

// ── 3. 组件切换函数 ──────────────────────────────────────────────────────────
function toggleWidget(index) {
    const w = states[index];
    if (w.enabled) {
        if (w.instance) {
            engine.removeWidget(w.instance, true);
            w.instance = null;
        }
        w.enabled = false;
        __log(`已移除 ${w.label}`);
    } else {
        const widget = w.cls();
        engine.addWidget(widget);
        w.instance = widget;
        w.enabled = true;
        __log(`已添加 ${w.label}`);
    }
}

function toggleControlPanel() {
    if (controlPanelInstance) {
        engine.removeWidget(controlPanelInstance, true);
        controlPanelInstance = null;
    } else {
        controlPanelInstance = new Daisy.ControlPanelWidget({ layout: controlPanelLayout, preset: "rightCenter", draggable: true });
        engine.addWidget(controlPanelInstance);
    }
}

function switchControlPanelLayout(layout) {
    if (layout === controlPanelLayout) return;
    controlPanelLayout = layout;
    if (controlPanelInstance) {
        engine.removeWidget(controlPanelInstance, true);
        controlPanelInstance = new Daisy.ControlPanelWidget({ layout, preset: "leftCenter", draggable: true });
        engine.addWidget(controlPanelInstance);
    }
}

// ── 4. 资源清理 ──────────────────────────────────────────────────────────────
registerCleanup(() => {
    for (const w of states) {
        if (w.instance) {
            try { engine.removeWidget(w.instance, true); } catch {}
            w.instance = null;
        }
    }
    if (controlPanelInstance) {
        try { engine.removeWidget(controlPanelInstance, true); } catch {}
        controlPanelInstance = null;
    }
});

// ── 5. 初始化所有组件 ──────────────────────────────────────────────────────
for (const w of states) {
    const widget = w.cls();
    engine.addWidget(widget);
    w.instance = widget;
}
controlPanelInstance = new Daisy.ControlPanelWidget({ layout: controlPanelLayout, preset: "rightCenter", draggable: true });
engine.addWidget(controlPanelInstance);
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="控件显示控制">
        <div class="toggle-list">
            {#each states as w, i}
                <button
                    type="button"
                    class="toggle-btn"
                    class:is-active={w.enabled}
                    onclick={() => toggleWidget(i)}
                >
                    <span class="dot"></span>
                    <span>{w.label}</span>
                </button>
            {/each}

            <div class="divider"></div>

            <button
                type="button"
                class="toggle-btn"
                class:is-active={controlPanelInstance !== null}
                onclick={toggleControlPanel}
            >
                <span class="dot"></span>
                <span>播放控件</span>
            </button>

            {#if controlPanelInstance !== null}
                <div class="layout-switch">
                    <button
                        type="button"
                        class="layout-btn"
                        class:is-active={controlPanelLayout === "column"}
                        onclick={() => switchControlPanelLayout("column")}
                    >
                        竖版
                    </button>
                    <button
                        type="button"
                        class="layout-btn"
                        class:is-active={controlPanelLayout === "row"}
                        onclick={() => switchControlPanelLayout("row")}
                    >
                        横版
                    </button>
                </div>
            {/if}
        </div>

        <div class="divider"></div>
        <div class="panel-title">主题色</div>
        <div class="theme-palette">
            {#each widgetThemes as theme}
                <button
                    type="button"
                    class="color-btn {theme.key === widgetColor ? 'active' : ''}"
                    style="background:{theme.swatch}"
                    title={theme.label}
                    aria-label={theme.label}
                    onclick={() => widgetColor = theme.key}
                >
                    {#if theme.key === "light"}
                        <span class="light-dot"></span>
                    {/if}
                </button>
            {/each}
        </div>
        <div class="theme-effects">
            <label for="widget-opacity">透明度 <output>{Math.round(Number(widgetOpacity) * 100)}%</output></label>
            <input id="widget-opacity" type="range" min="0.45" max="1" step="0.05" bind:value={widgetOpacity} />
            <label for="widget-grayscale">灰度 <output>{Math.round(Number(widgetGrayscale) * 100)}%</output></label>
            <input id="widget-grayscale" type="range" min="0" max="1" step="0.05" bind:value={widgetGrayscale} />
        </div>
    </DemoPanel>
<style>
.panel-title {
    color: var(--panel-text);
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
}

.toggle-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.toggle-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    min-height: 28px;
    padding: 0 8px;
    border: 1px solid var(--panel-border);
    border-radius: 5px;
    background: var(--panel-bg-embed);
    color: var(--panel-text-muted);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
}

.toggle-btn:hover {
    color: var(--panel-text-bright);
    border-color: var(--color-accent);
    background: var(--panel-btn-bg);
}

.toggle-btn.is-active {
    color: var(--panel-text);
    border-color: var(--color-accent);
    background: var(--color-accent-muted);
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--panel-text-muted);
    transition: background 0.15s ease;
}

.is-active .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-accent-soft);
    box-shadow: 0 0 6px var(--color-accent-soft);
}

.divider {
    height: 1px;
    background: var(--panel-border);
    margin: 2px 0;
}

.layout-switch {
    display: flex;
    gap: 4px;
    padding-left: 14px;
}

.layout-btn {
    flex: 1;
    min-height: 24px;
    padding: 0 6px;
    border: 1px solid var(--panel-border);
    border-radius: 4px;
    background: var(--panel-bg-embed);
    color: var(--panel-text-muted);
    font-size: 11px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s ease;
}

.layout-btn:hover {
    color: var(--panel-text-bright);
    border-color: var(--color-accent);
}

.layout-btn.is-active {
    color: var(--panel-text);
    border-color: var(--color-accent);
    background: var(--color-accent-muted);
}

.theme-palette {
    display: flex;
    gap: 5px;
    flex-wrap: wrap;
    margin-top: 6px;
}
.color-btn {
    position: relative;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 2px solid transparent;
    cursor: pointer;
    transition: border-color .15s;
}
.color-btn:hover { border-color: var(--color-accent); }
.color-btn.active { border-color: var(--color-accent); box-shadow: 0 0 6px var(--color-accent); }
.light-dot {
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    border: 1px solid rgba(15, 23, 42, 0.28);
    background: rgba(255, 255, 255, 0.7);
}
.theme-effects {
    display: grid;
    grid-template-columns: max-content minmax(80px, 1fr);
    gap: 7px 8px;
    align-items: center;
    margin-top: 8px;
}
.theme-effects label {
    display: flex;
    gap: 5px;
    color: var(--panel-text-muted);
    font-size: 11px;
    white-space: nowrap;
}
.theme-effects output {
    color: var(--panel-accent);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
}
.theme-effects input {
    min-width: 0;
    accent-color: var(--panel-accent);
}
</style>
