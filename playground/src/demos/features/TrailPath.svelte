<script>
// =============================================================================
// TrailPath Demo — 轨迹尾迹工作台
//
// 本示例演示如何使用 setPath 创建实体轨迹尾迹：
// 1. 创建移动实体（24 小时周期绕地球飞行）
// 2. 配置轨迹参数（历史/未来时间、宽度、颜色等）
// 3. 自动生成代码预览
//
// 关键 API：n// - entity.setPath: 设置实体轨迹
//   - historySecond: 历史轨迹时间（秒）
//   - futureSecond: 未来轨迹时间（秒）
//   - width: 轨迹宽度
//   - historyColor: 历史轨迹颜色
//   - futureColor: 未来轨迹颜色
//   - resolutionSecond: 分辨率（秒）
//   - autoOptimize: 是否自动优化
//   - show: 是否显示
// - Daisy.TrajectorySample: 轨迹采样
//   - pushData: 推送轨迹数据
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化 ──────────────────────────────────────────────
const C3 = Daisy.Cartesian3;
const Color = Daisy.Color;

// ---- 1. 创建移动实体（24 小时周期绕地球飞行） ----
const startTime = engine.getStartTime();
const orbitPeriod = 86400;
const stepSec = 60;
const totalSteps = Math.ceil(orbitPeriod / stepSec);
const orbitAlt = 800000;

const trajectory = new Daisy.TrajectorySample(Daisy.ReferenceFrame.FIXED);
const samples = [];
for (let i = 0; i <= totalSteps; i++) {
    const t = Daisy.JulianDate.addSeconds(startTime, i * stepSec, new Daisy.JulianDate());
    const angle = ((i * stepSec) / orbitPeriod) * 2 * Math.PI;
    const lon = (116 + (angle * 180 / Math.PI) * 0.5) % 360;
    const lat = 30 * Math.sin(angle * 2);
    samples.push({ time: t, position: C3.fromDegrees(lon, lat, orbitAlt) });
}
trajectory.pushData(samples);

const satEntity = engine.createEntity("TrailSat");
satEntity.position = trajectory;
satEntity.addFeature(new Daisy.PointFeature({
    pixelSize: 10,
    color: Color.CYAN,
    outlineColor: Color.WHITE,
    outlineWidth: 2,
}));

const sceneStartTime = Daisy.JulianDate.addSeconds(startTime, 3600, new Daisy.JulianDate());
const stopTime = Daisy.JulianDate.addSeconds(startTime, orbitPeriod, new Daisy.JulianDate());
engine.setSceneTime(sceneStartTime, stopTime, true);
engine.play(260);

// ---- 2. 默认 path 配置 ----
let historySecond = $state(43200);
let futureSecond = $state(43200);
let width = $state(3);
let historyColor = $state("#00aaff");
let futureColor = $state("#00ff88");
let resolution = $state(60);
let autoOptimize = $state(true);
let showPath = $state(true);

let showCodePreview = $state(false);
let codePreviewText = $state("");

function applyPath() {
    satEntity.setPath({
        historySecond,
        futureSecond,
        width,
        historyColor: Color.fromCssColorString(historyColor),
        futureColor: Color.fromCssColorString(futureColor),
        resolutionSecond: resolution,
        autoOptimize,
        show: showPath,
    });
}

// ── $effect: 任何路径参数变更时同步 ──
$effect(() => {
    const _ = historySecond + futureSecond + width + historyColor + futureColor + resolution + (autoOptimize ? 1 : 0) + (showPath ? 1 : 0);
    applyPath();
});

// ---- 代码生成 ----
function parseRgb(hex) {
    const c = document.createElement("canvas");
    c.width = c.height = 1;
    const ctx = c.getContext("2d");
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, 1, 1);
    const d = ctx.getImageData(0, 0, 1, 1).data;
    return { r: d[0], g: d[1], b: d[2] };
}

function toHex(r, g, b) {
    return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
}

function buildCode() {
    var rgb1 = parseRgb(historyColor);
    var rgb2 = parseRgb(futureColor);
    return [
        '// ---- 轨迹尾迹：TrailPath ----',
        "const startTime = engine.getStartTime();",
        "const orbitPeriod = 86400;",
        "const trajectory = new Daisy.TrajectorySample(Daisy.ReferenceFrame.FIXED);",
        "const samples = [];",
        "for (let i = 0; i <= Math.ceil(orbitPeriod / 60); i++) {",
        "    const t = Daisy.JulianDate.addSeconds(startTime, i * 60, new Daisy.JulianDate());",
        "    const angle = ((i * 60) / orbitPeriod) * 2 * Math.PI;",
        "    const lon = (angle * 180 / Math.PI) % 360;",
        '    const lat = 30 * Math.sin(angle * 2);',
        '    samples.push({ time: t, position: Daisy.Cartesian3.fromDegrees(lon, lat, 800000) });',
        "}",
        "trajectory.pushData(samples);",
        "",
        "const entity = engine.createEntity('Satellite');",
        "entity.position = trajectory;",
        "",
        "engine.setSceneTime(startTime, Daisy.JulianDate.addSeconds(startTime, orbitPeriod), true);",
        "engine.play(60);",
        "",
        "entity.setPath({",
        "    historySecond: " + historySecond + ",",
        "    futureSecond: " + futureSecond + ",",
        "    width: " + width + ",",
        "    historyColor: Daisy.Color.fromRgba(0x" + toHex(rgb1.r, rgb1.g, rgb1.b).slice(1) + "ff),",
        "    futureColor: Daisy.Color.fromRgba(0x" + toHex(rgb2.r, rgb2.g, rgb2.b).slice(1) + "ff),",
        "    resolutionSecond: " + resolution + ",",
        "    autoOptimize: " + autoOptimize + ",",
        "    show: " + showPath + ",",
        "});",
        "",
        "engine.camera.followTarget(entity, { view: { distance: 50000, pitchDeg: -30 } });",
    ].join("\n");
}

function openCodePreview() { codePreviewText = buildCode(); showCodePreview = true; }
function closeCodePreview() { showCodePreview = false; }
async function copyCode() {
    try { await navigator.clipboard.writeText(codePreviewText); } catch { /* fallback */ }
}

// ── 初始应用 ──
applyPath();

registerCleanup(() => { /* all cleanup handled by Svelte */ });

__log("轨迹尾迹工作台：实体沿 24h 轨道飞行，拖动滑块实时调整 path 属性。");
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="轨迹尾迹工作台">
        <div class="tp-head">
            <div class="tp-title">轨迹尾迹工作台</div>
            <button class="tp-code-btn" onclick={openCodePreview}>查看代码</button>
        </div>

        <div class="tp-section">
            <div class="tp-sec-title">时间跨度</div>
            <div class="tp-grid">
                <div class="tp-ctrl">
                    <label for="tp-history"><span>历史轨迹(s)</span><output>{historySecond}</output></label>
                    <input id="tp-history" type="range" min="60" max="86400" step="60" bind:value={historySecond} />
                </div>
                <div class="tp-ctrl">
                    <label for="tp-future"><span>未来轨迹(s)</span><output>{futureSecond}</output></label>
                    <input id="tp-future" type="range" min="60" max="86400" step="60" bind:value={futureSecond} />
                </div>
            </div>
        </div>

        <div class="tp-section">
            <div class="tp-sec-title">样式</div>
            <div class="tp-grid">
                <div class="tp-ctrl">
                    <label for="tp-width"><span>线宽(px)</span><output>{width}</output></label>
                    <input id="tp-width" type="range" min="1" max="20" step="1" bind:value={width} />
                </div>
                <div class="tp-ctrl">
                    <label for="tp-resolution"><span>分辨率(s)</span><output>{resolution}</output></label>
                    <input id="tp-resolution" type="range" min="10" max="600" step="10" bind:value={resolution} />
                </div>
            </div>
            <div class="tp-switch">
                <label><input type="checkbox" bind:checked={autoOptimize} /> 自动优化</label>
                <label><input type="checkbox" bind:checked={showPath} /> 显示轨迹</label>
            </div>
        </div>

        <div class="tp-section">
            <div class="tp-sec-title">颜色</div>
            <div class="tp-grid">
                <div class="tp-ctrl">
                    <label for="tp-historyColor"><span>历史颜色</span></label>
                    <input id="tp-historyColor" type="color" bind:value={historyColor} />
                </div>
                <div class="tp-ctrl">
                    <label for="tp-futureColor"><span>未来颜色</span></label>
                    <input id="tp-futureColor" type="color" bind:value={futureColor} />
                </div>
            </div>
        </div>
    </DemoPanel>
{#if showCodePreview}
    <div class="tp-code-overlay">
        <div
            class="tp-code-backdrop"
            role="button"
            tabindex="0"
            aria-label="关闭代码预览"
            onclick={closeCodePreview}
            onkeydown={(event) => (event.key === "Enter" || event.key === " ") && closeCodePreview()}
        ></div>
        <div class="tp-code-panel" role="dialog">
            <div class="tp-code-head">
                <div>
                    <div class="tp-code-title">轨迹代码预览</div>
                    <div class="tp-code-sub">包含实体创建与 setPath 配置，可直接复制使用。</div>
                </div>
                <button class="tp-code-close" onclick={closeCodePreview}>关闭</button>
            </div>
            <textarea class="tp-code-text" readonly>{codePreviewText}</textarea>
            <div class="tp-code-foot">
                <button class="tp-code-copy" onclick={copyCode}>复制代码</button>
            </div>
        </div>
    </div>
{/if}

<style>
.tp-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px; border-bottom: 1px solid rgba(150, 210, 255, 0.18);
}
.tp-title { font-size: 15px; font-weight: 700; color: var(--panel-text-bright); }
.tp-code-btn {
    min-height: 30px; padding: 0 10px; color: var(--panel-text-bright);
    background: linear-gradient(135deg, rgba(127, 217, 255, 0.24), rgba(92, 132, 255, 0.16));
    border: 1px solid rgba(150, 210, 255, 0.3); border-radius: 6px; cursor: pointer; white-space: nowrap;
}
.tp-code-btn:hover { background: linear-gradient(135deg, rgba(127, 217, 255, 0.34), rgba(92, 132, 255, 0.24)); }
.tp-section {
    padding: 10px 12px; border-bottom: 1px solid rgba(150, 210, 255, 0.12);
}
.tp-section:last-child { border-bottom: 0; }
.tp-sec-title { color: var(--panel-text); font-size: 12px; font-weight: 700; margin-bottom: 8px; }
.tp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 10px; }
.tp-ctrl { display: grid; gap: 4px; min-width: 0; }
.tp-ctrl label { display: flex; justify-content: space-between; color: var(--panel-text-muted); font-size: 11px; }
.tp-ctrl output { color: var(--panel-text); font-variant-numeric: tabular-nums; }
.tp-ctrl input[type="range"] { width: 100%; accent-color: var(--panel-accent); }
.tp-ctrl input[type="color"] {
    width: 100%; height: 28px; border: 1px solid rgba(150, 210, 255, 0.24); border-radius: 6px; background: transparent;
}
.tp-switch { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 8px; }
.tp-switch label { display: inline-flex; align-items: center; gap: 6px; color: var(--panel-text-muted); }

/* 代码预览遮罩 */
.tp-code-overlay {
    position: fixed; inset: 0; z-index: 10000; display: grid; place-items: center; pointer-events: all;
}
.tp-code-backdrop {
    position: absolute; inset: 0; background: rgba(2, 6, 12, 0.58); backdrop-filter: blur(4px);
}
.tp-code-panel {
    position: relative; width: min(860px, calc(100vw - 32px)); height: min(80vh, 780px);
    display: grid; grid-template-rows: auto 1fr auto; gap: 10px; padding: 14px;
    color: var(--ds-overlay-text); background: var(--ds-overlay-bg);
    border: 1px solid rgba(150, 210, 255, 0.26); border-radius: 12px;
    box-shadow: 0 26px 70px rgba(0, 0, 0, 0.48);
}
.tp-code-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.tp-code-title { font-size: 16px; font-weight: 700; color: var(--panel-text-bright); }
.tp-code-sub { margin-top: 4px; color: var(--panel-text-muted); font-size: 12px; }
.tp-code-close, .tp-code-copy {
    min-height: 32px; padding: 0 12px; color: var(--panel-text-bright);
    background: rgba(127, 217, 255, 0.14); border: 1px solid rgba(150, 210, 255, 0.24); border-radius: 6px; cursor: pointer;
}
.tp-code-close:hover, .tp-code-copy:hover { background: rgba(127, 217, 255, 0.22); }
.tp-code-text {
    width: 100%; height: 100%; margin: 0; padding: 14px; color: var(--panel-text);
    background: rgba(0, 0, 0, 0.34); border: 1px solid rgba(150, 210, 255, 0.16);
    border-radius: 10px; resize: none; outline: none; overflow: auto;
    font: 12px/1.55 "Cascadia Mono", "Consolas", monospace; white-space: pre;
}
.tp-code-foot { display: flex; justify-content: flex-end; }
</style>
