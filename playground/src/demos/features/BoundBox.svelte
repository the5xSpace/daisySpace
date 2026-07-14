<script>
// =============================================================================
// BoundBox Demo — 包围盒碰撞检测演示
//
// 本示例演示如何使用 BoundBoxFeature 进行碰撞检测，包括：
// 1. 创建包围盒实体
// 2. 配置碰撞检测参数
// 3. 监听碰撞事件（onCollisionStart/onCollisionEnd）
// 4. 宽相检测（Broad Phase）优化
//
// 关键 API：
// - entity.getOrCreateBoundBoxFeature(): 创建包围盒组件
//   - dimensions: 包围盒尺寸（Cartesian3）
//   - enableCollision: 是否启用碰撞检测
//   - collisionVisualMode: 碰撞视觉模式（"highlight"/"color"等）
//   - collisionColor: 碰撞时的颜色
// - BoundBoxCollection: 碰撞检测集合
//   - enableBroadPhase: 是否启用宽相检测
//   - spatialHashThreshold: 空间哈希阈值
//   - collisionDetectionFrequencyHz: 碰撞检测频率
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 1. 初始化和常量定义 ──────────────────────────────────────────────
var C3 = Daisy.Cartesian3;
var Color = Daisy.Color;
var NORMAL_FILL_COLOR = Color.fromCssColorString ? Color.fromCssColorString("#2f9bff") : Color.CYAN;
var NORMAL_OUTLINE_COLOR = Color.fromCssColorString ? Color.fromCssColorString("#66e8ff") : Color.CYAN;
var MARKER_COLOR = Color.fromCssColorString ? Color.fromCssColorString("#d8fbff") : Color.WHITE;
var COLLISION_COLOR = Color.RED.withAlpha ? Color.RED.withAlpha(0.82) : Color.RED;

// 场景配置
var CENTER_LON = 116.35;
var CENTER_LAT = 40.0;
var ALT = 120000; // 高度 120km
var FIELD_RADIUS_DEG = 5.2;
var LAT_SCALE = 0.58;
var SIM_DURATION = 240; // 仿真时长 240秒
var DT = 4; // 时间步长 4秒
var DEFAULT_COUNT = 30; // 默认对象数量
var MIN_COUNT = 15;
var MAX_COUNT = 300;
var DEFAULT_DETECTION_HZ = 3; // 默认检测频率 3Hz
var startTime = Daisy.JulianDate.now();
var activeEntities = [];
var activeBoxes = [];
var activeMarkers = [];
var currentPoolCount = 0;

// ── 2. 响应式状态 ──────────────────────────────────────────────
let activeCount = $state(DEFAULT_COUNT);
let detectionHz = $state(DEFAULT_DETECTION_HZ);
let collisionEnabled = $state(true);
let broadPhaseEnabled = $state(true);
let focusMode = $state("learn");
let rebuildTimer = 0;

// ── 3. 统计状态 ──────────────────────────────────────────────
let pairsCount = $state(0);
let rejectCount = $state(0);
let narrowCount = $state(0);
let obbTestsCount = $state(0);
let hitCount = $state(0);
let durationMs = $state("0.00ms");
let statStart = $state(0);
let statMove = $state(0);
let statEnd = $state(0);
let collisionLogEntries = $state([]);

// ── 4. 辅助函数 ──────────────────────────────────────────────
// seededRandom: 伪随机数生成器
function seededRandom(seed) {
    var x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
}

// withAlpha: 安全的颜色透明度设置
function withAlpha(color, alpha) {
    return color && color.withAlpha ? color.withAlpha(alpha) : color;
}

// getBoxLabel: 获取包围盒标签
function getBoxLabel(box, fallbackIndex) {
    return (box && box.entity && (box.entity.name || (box.entity.getId && box.entity.getId()))) || ("对象" + fallbackIndex);
}

// formatCollisionLog: 格式化碰撞日志
function formatCollisionLog(action, sourceIndex, otherBox) {
    return "对象" + sourceIndex + " " + action + " " + getBoxLabel(otherBox, "?");
}

// visibleBoxCount: 可见包围盒数量
function visibleBoxCount(count) {
    return count;
}

// ── 5. 轨迹生成 ──────────────────────────────────────────────
// buildOrbitTrajectory: 生成轨道轨迹
function buildOrbitTrajectory(index, count) {
    var trajectory = new Daisy.TrajectorySample(Daisy.ReferenceFrame.FIXED);
    var samples = [];
    var ring = index % 13;
    var lane = Math.floor(index / 13);
    var phase = seededRandom(index + 3) * Daisy.Math.TWO_PI;
    var turns = (index % 5 === 0 ? -1 : 1) * (1 + (index % 4) * 0.35);
    var radius = FIELD_RADIUS_DEG * (0.24 + 0.76 * ((ring + 1) / 13));
    var laneOffset = (lane % 17 - 8) * 0.045;

    for (var step = 0; step <= SIM_DURATION / DT; step++) {
        var elapsed = step * DT;
        var progress = elapsed / SIM_DURATION;
        var t = Daisy.JulianDate.addSeconds(startTime, elapsed, new Daisy.JulianDate());
        var angle = phase + Daisy.Math.TWO_PI * turns * progress;
        var wave = Math.sin(progress * Daisy.Math.TWO_PI * (1 + (index % 3)) + phase) * 0.075;
        var lon = CENTER_LON + radius * Math.cos(angle) + laneOffset;
        var lat = CENTER_LAT + radius * Math.sin(angle) * LAT_SCALE + wave;
        var alt = ALT + ((index % 17) - 8) * 850;
        samples.push({ time: t, position: C3.fromDegrees(lon, lat, alt) });
    }

    trajectory.pushData(samples);
    return trajectory;
}

// ── 6. 创建包围盒实体 ──────────────────────────────────────────────
// makeBox: 创建单个包围盒实体
function makeBox(index) {
    var entity = engine.createEntity("Collision-" + index);
    entity.position = buildOrbitTrajectory(index, MAX_COUNT);
    var color = NORMAL_FILL_COLOR;
    var shape = index % 4 === 0 ? "ball" : "rect";
    var size = 7000 + (index % 11) * 360;
    var dimX = shape === "ball" ? size : size * (1.25 + seededRandom(index) * 1.4);
    var dimY = shape === "ball" ? size : size * (0.75 + seededRandom(index + 19) * 0.8);
    var dimZ = shape === "ball" ? size : size * (0.65 + seededRandom(index + 41) * 0.65);
    // 创建点标记
    var marker = entity.addFeature(new Daisy.PointFeature({
        pixelSize: 3,
        color: withAlpha(MARKER_COLOR, 0.72),
        outlineColor: withAlpha(NORMAL_OUTLINE_COLOR, 0.62),
        outlineWidth: 1,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
    }));
    // 创建包围盒
    var box = entity.getOrCreateBoundBoxFeature({
        dimensions: new C3(dimX, dimY, dimZ),
        color: withAlpha(NORMAL_FILL_COLOR, 0.24),
        shape,
        outlineColor: NORMAL_OUTLINE_COLOR,
        outlineWidth: 2.0,
        visualScale: 1.01,
        show: false,
        enableCollision: true,
        collisionVisualMode: "highlight",
        collisionColor: COLLISION_COLOR,
        collisionVisualScale: 1.02,
    });
    // 矩形包围盒设置旋转
    if (shape === "rect") {
        box.transformer.setRotation({
            heading: (index * 37) % 360,
            pitch: (index % 7) * 4,
            roll: (index % 5) * 6,
        });
    }
    marker.__demoIndex = index;
    marker.__demoColor = color;
    box.__demoIndex = index;
    box.__demoColor = NORMAL_FILL_COLOR;
    box.__demoOutlineColor = NORMAL_OUTLINE_COLOR;

    // 绑定碰撞事件
    box.onCollisionStart(function (other) {
        statStart++;
        collisionLogEntries = [
            formatCollisionLog("开始碰撞", index, other),
            ...collisionLogEntries.slice(0, 8),
        ];
    });
    box.onCollisionEnd(function (other) {
        statEnd++;
        collisionLogEntries = [
            formatCollisionLog("结束碰撞", index, other),
            ...collisionLogEntries.slice(0, 8),
        ];
    });

    // 保存引用
    activeEntities.push(entity);
    activeBoxes.push(box);
    activeMarkers.push(marker);
}

// ── 7. 场景管理 ──────────────────────────────────────────────
// clearScenario: 清除场景
function clearScenario() {
    for (var i = 0; i < activeEntities.length; i++) {
        try { engine.removeEntity(activeEntities[i]); } catch (err) { /* ignore */ }
    }
    activeEntities = [];
    activeBoxes = [];
    activeMarkers = [];
    currentPoolCount = 0;
}

// buildPool: 构建对象池
function buildPool(count) {
    currentPoolCount = count;
    for (var i = activeEntities.length; i < count; i++) {
        makeBox(i);
    }
}

// applyVisibilityMode: 应用可见性模式
function applyVisibilityMode() {
    for (var i = 0; i < activeBoxes.length; i++) {
        var box = activeBoxes[i];
        var marker = activeMarkers[i];
        var active = i < currentPoolCount;
        var visible = active;
        var color = box.__demoColor || NORMAL_FILL_COLOR;
        var outlineColor = box.__demoOutlineColor || NORMAL_OUTLINE_COLOR;
        var markerVisible = active;

        activeEntities[i].show = active;
        box.options = {
            ...box.options,
            show: visible,
            visible,
            enableCollision: active,
            detectCollision: active,
            color: withAlpha(color, 0.24),
            outlineColor: outlineColor,
            outlineWidth: 2.0,
        };
        marker.options = {
            ...marker.options,
            pixelSize: 3,
            color: withAlpha(MARKER_COLOR, 0.72),
            show: markerVisible,
        };
        if (marker.node) {
            marker.node.show = markerVisible;
            marker.node.pixelSize = marker.options.pixelSize;
            marker.node.color = marker.options.color;
        }
    }
}

// setActiveCount: 设置活动对象数量
function setActiveCount(count) {
    activeCount = count;
    statStart = 0; statMove = 0; statEnd = 0;
    collisionLogEntries = [];
    clearScenario();
    engine.collections.boundBoxCollection.clearCollisionStates();
    buildPool(count);
    applyVisibilityMode();
}

// scheduleActiveCount: 延迟设置活动对象数量（防抖）
function scheduleActiveCount(count) {
    activeCount = count;
    clearTimeout(rebuildTimer);
    rebuildTimer = setTimeout(function () {
        setActiveCount(activeCount);
    }, 120);
}

// ── 8. 响应式效果 ──────────────────────────────────────────────
// 检测频率变更
$effect(() => {
    engine.collections.boundBoxCollection.collisionDetectionFrequencyHz = detectionHz;
});

// 碰撞检测开关
$effect(() => {
    engine.collections.boundBoxCollection.enableCollisionDetection = collisionEnabled;
});

// 宽相检测开关
$effect(() => {
    engine.collections.boundBoxCollection.enableBroadPhase = broadPhaseEnabled;
});

// ── 9. 初始化场景 ──────────────────────────────────────────────
var stopTime = Daisy.JulianDate.addSeconds(startTime, SIM_DURATION, new Daisy.JulianDate());
engine.setSceneTime(startTime, stopTime, true);
engine.setCurrentTime(startTime);
engine.setMultiplier(10);
engine.play();

// 配置碰撞检测参数
engine.collections.boundBoxCollection.useObb = true;
engine.collections.boundBoxCollection.enableBroadPhase = true;
engine.collections.boundBoxCollection.spatialHashThreshold = 40;
engine.collections.boundBoxCollection.collisionDetectionFrequencyHz = DEFAULT_DETECTION_HZ;

// 添加控制面板
engine.addWidget(new Daisy.ControlPanelWidget({
    mode: "standard",
    preset: "leftBottom",
    layout: "column",
    draggable: true,
    customize: ["play_pause", "stop", "speedSlider"],
    speedMin: 1,
    speedMax: 64,
    speedPositiveOnly: true,
}));

// 初始化对象池
setActiveCount(DEFAULT_COUNT);

// ── 10. 性能统计 ──────────────────────────────────────────────
var statsTimer = setInterval(function () {
    var stats = engine.collections.boundBoxCollection.getStats();
    pairsCount = stats.broadPhaseCandidatePairs || stats.totalPairs || 0;
    rejectCount = stats.broadPhaseRejectedPairs || 0;
    narrowCount = stats.narrowPhaseTests || 0;
    obbTestsCount = stats.obbTests || 0;
    hitCount = stats.collisions || 0;
    durationMs = (stats.durationMs || 0).toFixed(2) + "ms";
}, 240);

// 相机飞到场景中心
engine.camera.flyToTarget(C3.fromDegrees(CENTER_LON, CENTER_LAT, ALT), {
    offset: new Daisy.HeadingPitchRange(0, Daisy.Math.toRadians(-58), 1050000),
});

// 日志输出
__log("=== BoundBoxFeature broad-phase stress demo ===");
__log("默认 30 个对象参与碰撞检测，可拖动面板滑块调整数量");
__log("蓝色为普通包围盒，红色为当前碰撞包围盒");

// ── 11. 资源清理 ──────────────────────────────────────────────
registerCleanup(() => {
    clearInterval(statsTimer);
    clearTimeout(rebuildTimer);
    clearScenario();
});

// compactNumber: 数字格式化（1000 -> 1k）
function compactNumber(value) {
    return value >= 1000 ? Math.round(value / 1000) + "k" : String(value);
}
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="包围盒：用得会，也跑得动">
        <div class="panel-kicker">BoundBoxFeature lab</div>
        <div class="panel-title">包围盒：用得会，也跑得动</div>

        <div class="bb-tabs">
            <button class:is-active={focusMode === "learn"} onclick={() => focusMode = "learn"}>快速上手</button>
            <button class:is-active={focusMode === "scale"} onclick={() => focusMode = "scale"}>压力调试</button>
            <button class:is-active={focusMode === "events"} onclick={() => focusMode = "events"}>事件观察</button>
        </div>

        {#if focusMode === "learn"}
            <div class="bb-learn">
                <div class="bb-card">
                    <b>1. 给实体绑定盒子</b>
                    使用 <span>entity.getOrCreateBoundBoxFeature()</span> 创建单实例包围盒。
                </div>
                <div class="bb-card">
                    <b>2. 大数量先做宽相</b>
                    空间分桶先筛候选 pair，再进入 OBB/SAT 精检。
                </div>
                <div class="bb-card">
                    <b>3. 事件只关心状态变化</b>
                    监听 start/end，move 可按需打开，避免高频日志拖慢页面。
                </div>
            </div>
            <pre class="bb-code">entity.getOrCreateBoundBoxFeature({`{`}
  dimensions: new Daisy.Cartesian3(8000, 6000, 5000),
  enableCollision: true,
  collisionVisualMode: "highlight"
{`}`});</pre>
        {/if}

        {#if focusMode === "scale"}
        <div class="bb-section">参与对象</div>
        <div class="bb-row">
            <span>数量</span>
            <!-- <input
                type="range"
                min={MIN_COUNT}
                max={MAX_COUNT}
                step="20"
                value={activeCount}
                oninput={(event) => scheduleActiveCount(Number(event.currentTarget.value))}
            /> -->
            <span class="bb-value">{activeCount}</span>
        </div>
        <div class="bb-preset">
            <button onclick={() => setActiveCount(30)}>30对象</button>
            <button onclick={() => setActiveCount(100)}>100对象</button>
            <button onclick={() => setActiveCount(150)}>150对象</button>
            <button onclick={() => setActiveCount(300)}>300对象</button>
        </div>
        <div class="bb-row">
            <label for="bb-detection-hz">检测频率</label>
            <input id="bb-detection-hz" type="range" min="1" max="10" step="1" bind:value={detectionHz} />
            <span class="bb-value">{detectionHz}Hz</span>
        </div>
        <div class="bb-hint">
            所有参与对象都会显示包围盒。当前 <b>{visibleBoxCount(activeCount)}</b> 个包围盒可见。
        </div>

        <div class="bb-section">检测模式</div>
        <div class="bb-controls">
            <label><input type="checkbox" bind:checked={collisionEnabled} /> 碰撞检测</label>
            <label><input type="checkbox" bind:checked={broadPhaseEnabled} /> 半径预检测</label>
            <label><input type="checkbox" checked disabled /> OBB/SAT 托底</label>
        </div>

        <div class="bb-section">性能统计</div>
        <div class="bb-grid">
            <span>候选 Pair <b>{compactNumber(pairsCount)}</b></span>
            <span>预检跳过 <b>{compactNumber(rejectCount)}</b></span>
            <span>进入精检 <b>{compactNumber(narrowCount)}</b></span>
            <span>OBB 次数 <b>{compactNumber(obbTestsCount)}</b></span>
            <span>碰撞 Pair <b>{compactNumber(hitCount)}</b></span>
            <span>耗时 <b>{durationMs}</b></span>
        </div>
        {/if}

        {#if focusMode === "events"}
        <div class="bb-section">事件统计</div>
        <div class="bb-stats">
            <span>Start: <b>{statStart}</b></span>
            <span>Move: <b>{statMove}</b></span>
            <span>End: <b>{statEnd}</b></span>
        </div>

        <div class="bb-section">碰撞日志</div>
        <div class="bb-log">
            {#each collisionLogEntries as entry}
                <div>{entry}</div>
            {:else}
                <div class="bb-log-empty">等待碰撞事件...</div>
            {/each}
        </div>
        <div class="bb-hint">日志只记录 start/end，避免高数量对象下 collisionMove 刷屏。</div>
        {/if}
    </DemoPanel>
<style>
.panel-kicker {
    color: var(--panel-text-muted);
    font-size: 10px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
}
.panel-title { font-size: 15px; font-weight: 800; color: var(--panel-text); margin: 2px 0 10px; }
.bb-tabs {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
    margin-bottom: 10px;
}
.bb-tabs button,
.bb-preset button {
    min-height: 28px;
    border: 1px solid rgba(127, 217, 255, 0.24);
    border-radius: 999px;
    background: rgba(127, 217, 255, 0.08);
    color: var(--panel-text-muted);
    font-size: 11px;
    cursor: pointer;
}
.bb-tabs button.is-active,
.bb-preset button:hover {
    background: linear-gradient(135deg, rgba(48, 160, 220, 0.55), rgba(34, 84, 128, 0.65));
    border-color: var(--color-accent);
    color: var(--panel-text);
}
.bb-section {
    color: var(--panel-text-muted); font-size: 11px; font-weight: 700;
    margin: 10px 0 6px; text-transform: uppercase; letter-spacing: 0.5px;
}
.bb-row { display: flex; align-items: center; gap: 10px; margin: 7px 0; }
.bb-row label { min-width: 82px; color: var(--panel-text-muted); font-size: 11px; }
.bb-row input[type="range"] { flex: 1; min-width: 0; accent-color: var(--panel-accent); }
.bb-value { width: 54px; text-align: right; color: var(--panel-accent); font-weight: 700; font-variant-numeric: tabular-nums; }
.bb-hint { color: var(--panel-text-muted); font-size: 10px; line-height: 1.45; margin-top: 4px; }
.bb-preset {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
    margin: 8px 0;
}
.bb-learn { display: grid; gap: 7px; }
.bb-card {
    border: 1px solid rgba(127, 217, 255, 0.14);
    border-radius: 8px;
    background: var(--panel-bg-card);
    padding: 8px 10px;
    color: var(--panel-text-muted);
}
.bb-card b { display: block; color: var(--panel-text); margin-bottom: 2px; }
.bb-card span { color: var(--panel-accent); }
.bb-code {
    font-family: "Cascadia Code", "Consolas", monospace;
    color: var(--panel-accent);
    background: rgba(0, 0, 0, 0.22);
    border-radius: 6px;
    padding: 7px 8px;
    margin: 7px 0 0;
    white-space: pre-wrap;
}
.bb-grid {
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 5px 12px; margin-top: 6px; font-size: 11px;
}
.bb-grid span { color: var(--panel-text-muted); }
.bb-grid b { color: var(--ds-overlay-text); font-weight: 700; font-variant-numeric: tabular-nums; }
.bb-controls { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; margin: 8px 0; }
.bb-controls label { display: inline-flex; align-items: center; gap: 5px; color: var(--panel-text-muted); font-size: 11px; }
.bb-stats {
    display: flex; gap: 12px; margin: 6px 0; font-size: 11px;
    font-variant-numeric: tabular-nums; flex-wrap: wrap;
}
.bb-stats span { color: var(--panel-text-muted); }
.bb-stats b { font-weight: 700; }
.bb-log {
    background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(100, 180, 255, 0.15);
    border-radius: 4px; padding: 6px 8px; max-height: 92px; overflow-y: auto;
    font-size: 10px; color: #9dd4f0; font-family: "Cascadia Code", "Consolas", monospace; line-height: 1.5;
}
.bb-log-empty { color: var(--panel-text-muted); }
</style>
