<script>
// =============================================================================
// 控制面板配置器
// -----------------------------------------------------------------------------
// 交互式配置 ControlPanelWidget 的所有选项，包括：
//   - mode: 标准/精简/自定义模式
//   - preset: 面板位置预设
//   - layout: 行/列布局
//   - draggable: 是否可拖拽
//   - offset: 偏移量
//   - customize: 自定义控件列表
//   - speed: 倍率范围设置
// 关键 API:
//   - Daisy.ControlPanelWidget : 播放控制面板组件
// =============================================================================

// ── 1. 组件属性与配置 ────────────────────────────────────────────────────────
let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// 可选的面板模式
const modes = ["standard", "lite", "customize"];

// 面板位置预设选项
const presets = [
    "default",
    "leftTop",
    "leftBottom",
    "leftCenter",
    "centerTop",
    "centerBottom",
    "center",
    "rightTop",
    "rightBottom",
    "rightCenter",
];
// 布局方向选项
const layouts = ["row", "column"];

// 可选的控制按钮列表
const availableControls = [
    { key: "play_pause", label: "播放/暂停" },
    { key: "stop", label: "停止" },
    { key: "speed", label: "倍率菜单" },
    { key: "speedSlider", label: "倍率滑条" },
    { key: "2d_3d", label: "2D/3D" },
];

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

// ── 2. 响应式状态 ──────────────────────────────────────────────────────────
// 使用 Svelte 5 $state() 创建响应式变量

let mode = $state("standard");        // 面板模式
let preset = $state("rightCenter");   // 位置预设
let layout = $state("column");        // 布局方向
let draggable = $state(true);          // 是否可拖拽
let offsetX = $state(12);              // X轴偏移
let offsetY = $state(28);              // Y轴偏移
let speedMin = $state(-8192);          // 最小倍率
let speedMax = $state(8192);           // 最大倍率
let speedPositiveOnly = $state(false); // 仅正向倍率
let controls = $state(["play_pause", "stop", "speedSlider", "2d_3d"]);  // 当前控件
let widgetColor = $state("default");
let widgetOpacity = $state(1);
let widgetGrayscale = $state(0);
let activeWidget = null;   // 当前活动组件实例
let applyTimer = 0;        // 应用定时器
let copyLabel = $state("复制");  // 复制按钮文本
let copyTimer = 0;         // 复制定时器

// 使用 $derived 自动计算选项预览
let optionsPreview = $derived(JSON.stringify(buildOptions(), null, 2));

$effect(() => {
    Daisy.ColorPalette.setWidgetTheme(widgetColor, {
        opacity: Number(widgetOpacity),
        grayscale: Number(widgetGrayscale),
    });
});

// ── 3. 工具函数 ──────────────────────────────────────────────────────────────
// 安全地将值转换为数字
function toNumber(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
}

// 构建组件选项对象
function buildOptions() {
    const min = toNumber(speedMin, -8192);
    const max = Math.max(1, Math.abs(toNumber(speedMax, 8192)));
    return {
        mode,           // 面板模式
        preset,         // 位置预设
        layout,         // 布局方向
        draggable,      // 是否可拖拽
        offset: {
            x: toNumber(offsetX, 12),  // X轴偏移
            y: toNumber(offsetY, 28),  // Y轴偏移
        },
        customize: controls.slice(),   // 自定义控件列表
        speedMin: speedPositiveOnly ? 1 : Math.min(min, -1),  // 最小倍率
        speedMax: max,                 // 最大倍率
        speedPositiveOnly,             // 仅正向倍率
    };
}

// ── 4. 组件管理函数 ────────────────────────────────────────────────────────
// 移除当前活动的控制面板组件
function removeActiveWidget() {
    if (!activeWidget) return;
    try {
        engine.removeWidget(activeWidget, true);  // true 表示彻底销毁
    } finally {
        activeWidget = null;
    }
}

// 应用当前配置，重新创建控制面板
function applyCurrent() {
    const options = buildOptions();
    removeActiveWidget();  // 先移除旧组件
    activeWidget = engine.addWidget(new Daisy.ControlPanelWidget(options));
    __log("ControlPanel 配置已更新: " + mode + " / " + preset + " / " + layout);
}

// 延迟应用，避免频繁更新
function requestApply() {
    clearTimeout(applyTimer);
    applyTimer = setTimeout(applyCurrent, 0);
}

// 复制选项 JSON 到剪贴板
async function copyOptions() {
    try {
        await navigator.clipboard.writeText(optionsPreview);
        copyLabel = "已复制";
    } catch {
        copyLabel = "复制失败";
    }
    // 1.4秒后恢复按钮文本
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
        copyLabel = "复制";
    }, 1400);
}

// ── 5. UI 事件处理函数 ──────────────────────────────────────────────────────
// 设置面板模式
function setMode(value) {
    mode = value;
    requestApply();
}

// 设置布局方向
function setLayout(value) {
    layout = value;
    requestApply();
}

// 切换控件显示/隐藏
function toggleControl(key) {
    if (controls.includes(key)) {
        // 至少保留一个控件
        if (controls.length <= 1) return;
        controls = controls.filter((item) => item !== key);
    } else {
        controls = [...controls, key];
    }
    requestApply();
}

// ── 6. 预设配置 ──────────────────────────────────────────────────────────────
// 标准配置：完整功能面板
function resetStandard() {
    mode = "standard";
    preset = "rightCenter";
    layout = "column";
    draggable = true;
    offsetX = 12;
    offsetY = 28;
    speedMin = -8192;
    speedMax = 8192;
    speedPositiveOnly = false;
    controls = ["play_pause", "stop", "speedSlider", "2d_3d"];
    requestApply();
}

// 精简配置：紧凑布局
function resetCompact() {
    mode = "lite";
    preset = "rightBottom";
    layout = "row";
    draggable = true;
    offsetX = 12;
    offsetY = 28;
    speedMin = -4096;
    speedMax = 4096;
    speedPositiveOnly = false;
    controls = ["play_pause", "stop", "speed", "2d_3d"];
    requestApply();
}

// 正向倍率配置：仅正向播放
function resetPositiveSpeed() {
    mode = "customize";
    preset = "centerTop";
    layout = "row";
    draggable = false;
    offsetX = 12;
    offsetY = 28;
    speedMin = 1;
    speedMax = 64;
    speedPositiveOnly = true;
    controls = ["play_pause", "speed", "speedSlider"];
    requestApply();
}

// ── 7. 初始化时间系统 ──────────────────────────────────────────────────────
const now = Daisy.JulianDate.now();
const start = Daisy.JulianDate.addHours(now, -6, new Daisy.JulianDate());  // 6小时前
const stop = Daisy.JulianDate.addHours(now, 18, new Daisy.JulianDate());   // 18小时后
engine.setSceneTime(start, stop, true);  // 设置时间范围
engine.setCurrentTime(now);              // 设置当前时间
engine.setMultiplier(1);                 // 1倍速
engine.play();

// 初始应用配置
applyCurrent();

// ── 8. 资源清理 ──────────────────────────────────────────────────────────────
registerCleanup(() => {
    clearTimeout(applyTimer);
    clearTimeout(copyTimer);
    removeActiveWidget();
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="控制面板配置">
        <div class="panel-head">
            <div class="panel-title">ControlPanel</div>
            <div class="preset-actions">
                <button type="button" onclick={resetStandard}>标准</button>
                <button type="button" onclick={resetCompact}>精简</button>
                <button type="button" onclick={resetPositiveSpeed}>正向倍率</button>
            </div>
        </div>

        <section class="section">
            <div class="section-title">theme</div>
            <div class="theme-palette">
                {#each widgetThemes as theme}
                    <button
                        type="button"
                        class="theme-btn {theme.key === widgetColor ? 'is-active' : ''}"
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
                <label for="cp-theme-opacity">透明度 <output>{Math.round(Number(widgetOpacity) * 100)}%</output></label>
                <input id="cp-theme-opacity" type="range" min="0.45" max="1" step="0.05" bind:value={widgetOpacity} />
                <label for="cp-theme-grayscale">灰度 <output>{Math.round(Number(widgetGrayscale) * 100)}%</output></label>
                <input id="cp-theme-grayscale" type="range" min="0" max="1" step="0.05" bind:value={widgetGrayscale} />
            </div>
        </section>

        <section class="section">
            <div class="field">
                <label for="cp-preset">preset</label>
                <select id="cp-preset" bind:value={preset} onchange={requestApply}>
                    {#each presets as item}
                        <option value={item}>{item}</option>
                    {/each}
                </select>
            </div>

            <div class="field">
                <span class="field-label">mode</span>
                <div class="segmented">
                    {#each modes as item}
                        <button
                            type="button"
                            class:is-active={mode === item}
                            aria-pressed={mode === item}
                            onclick={() => setMode(item)}
                        >
                            {item}
                        </button>
                    {/each}
                </div>
            </div>

            <div class="field">
                <span class="field-label">layout</span>
                <div class="segmented">
                    {#each layouts as item}
                        <button
                            type="button"
                            class:is-active={layout === item}
                            aria-pressed={layout === item}
                            onclick={() => setLayout(item)}
                        >
                            {item}
                        </button>
                    {/each}
                </div>
            </div>

            <label class="check-field">
                <input
                    type="checkbox"
                    checked={draggable}
                    onchange={(event) => { draggable = event.currentTarget.checked; requestApply(); }}
                />
                <span>draggable</span>
            </label>
        </section>

        <section class="section">
            <div class="section-title">offset</div>
            <div class="range-grid">
                <label for="cp-offset-x">x <output>{offsetX}</output></label>
                <input id="cp-offset-x" type="range" min="-120" max="120" step="4" bind:value={offsetX} oninput={requestApply} />
                <label for="cp-offset-y">y <output>{offsetY}</output></label>
                <input id="cp-offset-y" type="range" min="-120" max="160" step="4" bind:value={offsetY} oninput={requestApply} />
            </div>
        </section>

        <section class="section">
            <div class="section-title">customize</div>
            <div class="control-list">
                {#each availableControls as item}
                    <button
                        type="button"
                        class:is-active={controls.includes(item.key)}
                        aria-pressed={controls.includes(item.key)}
                        onclick={() => toggleControl(item.key)}
                    >
                        {item.label}
                    </button>
                {/each}
            </div>
        </section>

        <section class="section">
            <div class="section-title">speed</div>
            <label class="check-field">
                <input
                    type="checkbox"
                    checked={speedPositiveOnly}
                    onchange={(event) => { speedPositiveOnly = event.currentTarget.checked; requestApply(); }}
                />
                <span>speedPositiveOnly</span>
            </label>
            <div class="number-grid">
                <label for="cp-speed-min">speedMin</label>
                <input id="cp-speed-min" type="number" step="1" bind:value={speedMin} onchange={requestApply} />
                <label for="cp-speed-max">speedMax</label>
                <input id="cp-speed-max" type="number" min="1" step="1" bind:value={speedMax} onchange={requestApply} />
            </div>
        </section>

        <div class="preview-head">
            <div class="section-title">options</div>
            <button type="button" class="copy-btn" onclick={copyOptions}>{copyLabel}</button>
        </div>
        <pre class="preview">{optionsPreview}</pre>
    </DemoPanel>

<style>
.panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.panel-title,
.section-title {
    color: var(--panel-text);
    font-size: 12px;
    font-weight: 700;
    line-height: 1;
}

.preset-actions,
.segmented,
.control-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.section {
    display: grid;
    grid-template-columns: repeat(2, minmax(min(12rem, 100%), 1fr));
    gap: 8px;
    min-inline-size: min(34rem, calc(100vw - 64px));
}

.section-title,
.control-list,
.range-grid,
.number-grid,
.theme-palette,
.theme-effects,
.preview-head,
.preview {
    grid-column: 1 / -1;
}

.field,
.check-field {
    min-width: 0;
}

.field-label,
.section-title {
    color: var(--panel-text-muted);
    font-size: 10px;
    line-height: 1;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.check-field {
    display: flex;
    align-items: center;
    gap: 7px;
    min-height: 30px;
    padding: 0 8px;
    border: 1px solid var(--panel-border);
    border-radius: 6px;
    background: var(--panel-bg-embed);
    color: var(--panel-text-bright);
    font-size: 11px;
}

select,
input[type="number"] {
    min-width: 0;
    height: 30px;
    border: 1px solid var(--panel-border);
    border-radius: 6px;
    background: var(--panel-bg-embed);
    color: var(--panel-text-bright);
    font-size: 12px;
    padding: 0 8px;
    outline: none;
}

button {
    min-width: 0;
    min-height: 30px;
    border: 1px solid var(--panel-border);
    border-radius: 6px;
    background: var(--panel-bg-embed);
    color: var(--panel-text-muted);
    font-size: 12px;
    font-weight: 650;
    cursor: pointer;
    padding: 0 10px;
}

button:hover,
select:hover,
input[type="number"]:hover {
    color: var(--panel-text-bright);
    border-color: var(--color-accent);
    background: var(--panel-btn-bg);
}

button.is-active {
    color: var(--panel-text);
    border-color: var(--color-accent);
    background: var(--color-accent-muted);
    box-shadow: inset 0 0 0 1px var(--panel-bg-card);
}

.range-grid,
.number-grid,
.theme-effects {
    display: grid;
    grid-template-columns: max-content minmax(8rem, 1fr);
    gap: 8px;
    align-items: center;
}

.theme-palette {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.theme-btn {
    position: relative;
    width: 26px;
    min-width: 26px;
    height: 26px;
    min-height: 26px;
    border-radius: 50%;
    padding: 0;
}

.light-dot {
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    border: 1px solid rgba(15, 23, 42, 0.28);
    background: rgba(255, 255, 255, 0.7);
}

.preview-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-top: 2px;
}

.copy-btn {
    min-height: 24px;
    padding: 0 8px;
    font-size: 11px;
}

.range-grid label,
.theme-effects label {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    color: var(--panel-text-bright);
    font-size: 11px;
}

output {
    color: var(--panel-accent);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
}

input[type="range"] {
    min-width: 0;
    accent-color: var(--panel-accent);
}

input[type="checkbox"] {
    accent-color: var(--panel-accent);
}

.preview {
    margin: 0;
    max-inline-size: 100%;
    overflow: auto;
    border: 1px solid var(--panel-border);
    border-radius: 6px;
    background: var(--panel-bg-embed);
    color: var(--panel-text-bright);
    font-size: 11px;
    line-height: 1.45;
    padding: 8px;
}

@media (max-width: 760px) {
    .panel-head,
    .section {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        min-inline-size: 0;
    }
}
</style>
