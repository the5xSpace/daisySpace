<script>
// =============================================================================
// GroundTrack Demo — 卫星星下点和地面路径
//
// 本示例演示如何显示卫星的星下点和地面路径：
// 1. 创建卫星对象
// 2. 配置星下点显示
// 3. 配置历史/未来路径
// 4. 添加控制面板
//
// 关键 API：
// - Daisy.PW.Satellite: 卫星对象
// - groundTrack: 星下点配置
//   - point: 星下点配置
//   - historyLine: 历史路径配置
//   - predictLine: 未来路径配置
// - ControlPanelWidget: 控制面板组件
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 设置场景时间 ──────────────────────────────────────────────────
// 场景时间：2026-04-20 06:00:00，前后各 1/3 小时
const now = Daisy.JulianDate.fromDate(new Date("2026-04-20T06:00:00Z"));
const start = Daisy.JulianDate.addHours(now, -1, new Daisy.JulianDate());
const stop = Daisy.JulianDate.addHours(now, 3, new Daisy.JulianDate());
engine.setSceneTime(start, stop);
engine.setCurrentTime(now);
engine.setMultiplier(20);
engine.setLoop(true);
engine.play();

// ── 2. 配置和状态 ──────────────────────────────────────────────────
// palettes: 颜色调色板
// selectedPalette: 选中的调色板索引
// pointVisible: 星下点是否可见
// historyVisible: 历史路径是否可见
// predictVisible: 未来路径是否可见
// pointSize: 星下点大小（像素）
// lineWidth: 路径宽度（像素）
const palettes = [
    { name: "Cyan", color: Daisy.Color.CYAN, hex: "#22d3ee" },
    { name: "Lime", color: Daisy.Color.LIME, hex: "#84cc16" },
    { name: "Amber", color: Daisy.Color.fromCssColorString("#f59e0b"), hex: "#f59e0b" },
];

let selectedPalette = $state(0);
let pointVisible = $state(true);
let historyVisible = $state(true);
let predictVisible = $state(true);
let pointSize = $state(14);
let lineWidth = $state(3);

let sat = null;
let controlWidget = null;

// ── 3. 辅助函数 ──────────────────────────────────────────────────────
// colorWithAlpha: 根据选中的调色板创建带透明度的颜色
function colorWithAlpha(alpha) {
    return palettes[selectedPalette].color.withAlpha(alpha);
}

// groundTrackOptions: 生成星下点配置
// - point: 星下点配置
//   - show: 是否显示
//   - size: 大小（像素）
//   - color: 颜色
//   - outlineColor: 轮廓颜色
//   - outlineWidth: 轮廓宽度
// - historyLine: 历史路径配置
//   - show: 是否显示
//   - width: 宽度（像素）
//   - material: 材质（颜色）
// - predictLine: 未来路径配置
//   - show: 是否显示
//   - width: 宽度（像素）
//   - material: 材质（颜色）
function groundTrackOptions() {
    return {
        // 步长和时间窗口由 path 配置自动推导，不再独立设置
        point: {
            show: pointVisible,
            size: pointSize,
            color: colorWithAlpha(0.95),
            outlineColor: Daisy.Color.BLACK.withAlpha(0.75),
            outlineWidth: 2,
        },
        historyLine: {
            show: historyVisible,
            width: lineWidth,
            material: colorWithAlpha(0.85),
        },
        predictLine: {
            show: predictVisible,
            width: Math.max(1, lineWidth - 1),
            material: colorWithAlpha(0.38),
        },
    };
}

// ── 4. 创建卫星对象 ──────────────────────────────────────────────────
// createSatellite: 创建卫星对象
// - name: 卫星名称
// - tle: 两行根数（TLE）格式的轨道参数
// - enableSpg4Propagation: 是否启用 SGP4 实时轨道传播
// - trajectory: 轨迹配置
//   - stepSeconds: 采样步长（秒）
// - point: 点标记配置
// - label: 标签配置
// - path: 路径配置
// - groundTrack: 星下点配置
function createSatellite() {
    sat = new Daisy.PW.Satellite({
        name: "STARLINK-1008",
        tle: `STARLINK-1008
1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990
2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`,
        enableSpg4Propagation: false,
        trajectory: { stepSeconds: 30 },
        point: { pixelSize: 14, color: Daisy.Color.WHITE.withAlpha(0.9), outlineColor: Daisy.Color.BLACK.withAlpha(0.7), outlineWidth: 1.5 },
        label: { text: "STARLINK-1008", font: "14px sans-serif", offsetPx: new Daisy.Cartesian2(0, -18), showBackground: true, backgroundColor: Daisy.Color.BLACK.withAlpha(0.35) },
        path: { historySecond: 50 * 60, futureSecond: 35 * 60, resolutionSecond: 30, width: 2, color: Daisy.Color.CYAN.withAlpha(0.6) },
        groundTrack: groundTrackOptions(),
    });
    sat.bindEngine(engine);
}

// applyGroundTrack: 应用星下点配置
// 移除现有的 GroundTrackComponent，然后添加新的配置
function applyGroundTrack() {
    if (!sat) return;
    const existing = sat.getComponents("GroundTrackComponent")[0];
    if (existing) sat.removeComponentById(existing.id);
    sat.addGroundTrack(groundTrackOptions());
    __log(`GroundTrack 样式已更新: ${palettes[selectedPalette].name}, 点 ${pointSize}px, 线 ${lineWidth}px`);
}

// setPalette: 设置调色板
// - index: 调色板索引
function setPalette(index) {
    selectedPalette = index;
    applyGroundTrack();
}

// updateTrack: 更新星下点配置
function updateTrack() {
    applyGroundTrack();
}

// addSceneControls: 添加场景控制面板
// ControlPanelWidget: 控制面板组件
// - mode: 模式（customize/standard 等）
// - preset: 预设位置（rightBottom/rightTop 等）
// - layout: 布局（row/column）
// - draggable: 是否可拖拽
// - customize: 自定义控件列表
// - speedMin/speedMax: 速度范围
function addSceneControls() {
    controlWidget = engine.addWidget(new Daisy.ControlPanelWidget({
        mode: "customize",
        preset: "rightBottom",
        layout: "row",
        draggable: true,
        customize: ["play_pause", "speedSlider", "2d_3d"],
        speedMin: -256,
        speedMax: 256,
    }));
}

createSatellite();
addSceneControls();
engine.camera.flyToTarget(Daisy.Cartesian3.fromDegrees(116.4, 40, 15000000));
__log("GroundTrack 已创建: 当前点 + 地面历史/预测路径");

registerCleanup(() => {
    if (controlWidget) engine.removeWidget(controlWidget, true);
});
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>


<DemoPanel title="星下点轨迹">
        <div class="panel-head">
            <div>
                <div class="panel-title">星下点</div>
                <div class="panel-subtitle">GroundTrackComponent</div>
            </div>
            <div class="mode-hint">2D / 3D</div>
        </div>

        <section class="section">
            <div class="section-title">显示</div>
            <label class="check-field">
                <input type="checkbox" checked={pointVisible} onchange={(event) => { pointVisible = event.currentTarget.checked; updateTrack(); }} />
                <span>当前投影点</span>
            </label>
            <label class="check-field">
                <input type="checkbox" checked={historyVisible} onchange={(event) => { historyVisible = event.currentTarget.checked; updateTrack(); }} />
                <span>历史地面线</span>
            </label>
            <label class="check-field">
                <input type="checkbox" checked={predictVisible} onchange={(event) => { predictVisible = event.currentTarget.checked; updateTrack(); }} />
                <span>预测地面线</span>
            </label>
        </section>

        <section class="section">
            <div class="section-title">颜色</div>
            <div class="swatches">
                {#each palettes as item, index}
                    <button
                        type="button"
                        class:is-active={selectedPalette === index}
                        aria-label={item.name}
                        aria-pressed={selectedPalette === index}
                        title={item.name}
                        style={`--swatch:${item.hex}`}
                        onclick={() => setPalette(index)}
                    ></button>
                {/each}
            </div>
        </section>

        <section class="section">
            <div class="range-row">
                <label for="gt-point-size">点直径 <output>{pointSize}px</output></label>
                <input id="gt-point-size" type="range" min="6" max="28" step="1" bind:value={pointSize} oninput={updateTrack} />
            </div>
            <div class="range-row">
                <label for="gt-line-width">线宽 <output>{lineWidth}px</output></label>
                <input id="gt-line-width" type="range" min="1" max="8" step="1" bind:value={lineWidth} oninput={updateTrack} />
            </div>
        </section>
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

.panel-subtitle,
.mode-hint {
    margin-top: 4px;
    color: var(--panel-text-muted);
    font-size: 10px;
    line-height: 1;
}

.mode-hint {
    margin-top: 0;
    padding: 5px 7px;
    border: 1px solid rgba(148, 163, 184, 0.16);
    border-radius: 6px;
    color: var(--panel-text-muted);
    background: rgba(15, 23, 42, 0.54);
}

.section {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
}

.section-title,
.swatches,
.range-row {
    grid-column: 1 / -1;
}

.check-field {
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    min-height: 32px;
    padding: 0 8px;
    border: 1px solid rgba(148, 163, 184, 0.14);
    border-radius: 6px;
    background: rgba(2, 6, 23, 0.42);
    color: var(--panel-text-bright);
    font-size: 11px;
    line-height: 1.2;
}

.check-field span {
    min-width: 0;
}

.swatches {
    display: flex;
    gap: 8px;
}

.swatches button {
    width: 30px;
    height: 30px;
    border: 1px solid var(--panel-btn-bg);
    border-radius: 999px;
    background: var(--swatch);
    cursor: pointer;
}

.swatches button.is-active {
    box-shadow: 0 0 0 2px rgba(234, 243, 255, 0.84), 0 0 18px color-mix(in srgb, var(--swatch), transparent 30%);
}

.range-row {
    display: grid;
    grid-template-columns: 5.5rem minmax(0, 1fr);
    gap: 8px;
    align-items: center;
}

.range-row label {
    display: flex;
    justify-content: space-between;
    gap: 6px;
    color: var(--panel-text-bright);
    font-size: 11px;
}

output {
    color: var(--panel-accent);
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
}

input[type="range"],
input[type="checkbox"] {
    accent-color: var(--panel-accent);
}

@media (max-width: 760px) {
    .section {
        grid-template-columns: 1fr;
    }
}
</style>
