<script>
// =============================================================================
// TimeSchedule Demo — 时间调度 + TaskTimeLineWidget + TaskGanttWidget
//
// 本示例演示如何：
// 1. 创建时间任务调度器（TimeTask）
// 2. 配置任务的开始/结束时间、进入/离开回调
// 3. 使用 TaskTimeLineWidget 和 TaskGanttWidget 可视化任务进度
// 4. 监听任务状态变更事件
//
// 关键 API：
// - engine.timeSchedule: 获取时间调度器
// - Daisy.TimeTask: 时间任务配置（id, name, startJulianTime, endJulianTime, onEnter, onLeave）
// - Daisy.TaskTimeLineWidget: 时间线进度可视化组件
// - Daisy.TaskGanttWidget: 甘特图可视化组件
// - schedule.onTaskStatusChange(): 监听任务状态变更
// =============================================================================

let { engine, daisy: Daisy, container, log: __log, registerCleanup } = $props();

// ── 0. Widget 主题调试面板 ───────────────────────────────────────────────
// 任务调度示例需要同时验证 TaskTimeLineWidget / TaskGanttWidget 的主题适配。
// 这里复用 SDK 的全局 Widget 主题入口，不触碰任务调度本身的执行逻辑。
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

// 获取引擎的时间调度器实例
const schedule = engine.timeSchedule;

// ── 1. 设置场景时间范围 ──────────────────────────────────────────────────
// 场景时间定义为 2025-06-01 00:00:00 到 01:40:00（共 100 分钟）
// 最后参数 true 表示时间到达 stopTime 后自动循环回 startTime
const startTime = Daisy.JulianDate.fromDate(new Date("2025-06-01T00:00:00Z"));
const stopTime = Daisy.JulianDate.fromDate(new Date("2025-06-01T01:40:00Z"));
engine.setSceneTime(startTime, stopTime, true);

// ── 2. 定义任务列表 ──────────────────────────────────────────────────────
// 每个任务包含：
//   - id: 任务唯一标识
//   - name: 任务显示名称
//   - startOffset: 相对于场景开始时间的偏移量（秒）
//   - endOffset: 相对于场景开始时间的偏移量（秒）
//
// 注意：这里使用 60 秒 = 1 分钟的偏移量
const tasks = [
    { id: "pre-check",       name: "发射前检查",   startOffset: 0,          endOffset: 8 * 60 },
    { id: "fuel-loading",    name: "燃料加注",     startOffset: 10 * 60,    endOffset: 18 * 60 },
    { id: "sys-calibration", name: "系统校准",     startOffset: 20 * 60,    endOffset: 28 * 60 },
    { id: "observation",     name: "观测窗口",     startOffset: 30 * 60,    endOffset: 42 * 60 },
    { id: "signal-lock",     name: "信号锁定",     startOffset: 32 * 60,    endOffset: 40 * 60 },
    { id: "data-download",   name: "数据回传",     startOffset: 44 * 60,    endOffset: 50 * 60 },
    { id: "attitude-adjust", name: "姿态调整",     startOffset: 52 * 60,    endOffset: 56 * 60 },
    { id: "thermal-check",   name: "热控检测",     startOffset: 58 * 60,    endOffset: 64 * 60 },
    { id: "post-analysis",   name: "事后分析",     startOffset: 66 * 60,    endOffset: 76 * 60 },
    { id: "report-gen",      name: "报告生成",     startOffset: 78 * 60,    endOffset: 88 * 60 },
];

function compactTimeLabel(jd) {
    const iso = Daisy.JulianDate.toIso8601(jd);
    return iso.substring(11, 19);
}

// ── 3. 创建时间任务并添加到调度器 ──────────────────────────────────────
// 遍历任务列表，为每个任务创建 TimeTask 实例并添加到 schedule
for (const t of tasks) {
    // 将偏移量转换为 JulianDate 时间点
    // JulianDate.addSeconds(baseTime, seconds, result)
    //   - baseTime: 基准时间
    //   - seconds: 偏移秒数
    //   - result: 结果存储对象
    const start = Daisy.JulianDate.addSeconds(startTime, t.startOffset, new Daisy.JulianDate());
    const end = Daisy.JulianDate.addSeconds(startTime, t.endOffset, new Daisy.JulianDate());

    // 创建时间任务配置
    // TimeTask 参数：
    //   - id: 任务 ID
    //   - name: 任务名称
    //   - startJulianTime: 开始时间（JulianDate 格式）
    //   - endJulianTime: 结束时间（JulianDate 格式）
    //   - onEnter: 进入任务时间段时的回调函数
    //     - curTime: 当前时间
    //     - ctx: 上下文对象
    //     - getStartOffset: 获取距离开始时间的偏移量
    //   - onLeave: 离开任务时间段时的回调函数
    //     - curTime: 当前时间
    //     - ctx: 上下文对象
    //     - getStartOffset: 获取距离开始时间的偏移量
    //     - getEndOffset: 获取任务持续时间
    const task = new Daisy.TimeTask({
        id: t.id, name: t.name, startJulianTime: start, endJulianTime: end,
        onEnter: (_curTime, _ctx, getStartOffset) => {
            __log(`[进入] ${t.name} — 起始偏移: ${Math.round(getStartOffset())}s`);
        },
        onLeave: (_curTime, _ctx, _getStartOffset, getEndOffset) => {
            __log(`[离开] ${t.name} — 持续: ${Math.round(getEndOffset())}s`);
        },
    });

    // 将任务添加到调度器
    schedule.add(task);
}

// ── 4. 创建并添加可视化组件 ──────────────────────────────────────────────
// TaskTimeLineWidget: 时间线进度可视化（标准版）
// 参数：
//   - schedule: 时间调度器实例
//   - 配置选项：
//     - title: 组件标题
//     - width/height: 宽高（像素）
//     - minHeight: 最小高度
//     - maxScrollHeight: 最大滚动高度
const timelineWidget = new Daisy.TaskTimeLineWidget(schedule, {
    title: "任务进度",
    width: 320,
    height: 178,
    minHeight: 136,
    maxScrollHeight: 112,
    x: 12,
    y: 80,
    formatTime: compactTimeLabel,
});
engine.addWidget(timelineWidget);

// TaskTimeLineWidget lite: 同一组任务数据的窄版竖向 step 呈现。
const liteTimelineWidget = new Daisy.TaskTimeLineWidget(schedule, {
    mode: "lite",
    title: "任务进度 Lite",
    width: 220,
    height: 278,
    minHeight: 150,
    maxScrollHeight: 228,
    right: 12,
    bottom: 18,
    formatTime: compactTimeLabel,
    onStepClick: (task) => engine.setCurrentTime(task.startJulianTime),
});
engine.addWidget(liteTimelineWidget);

// TaskGanttWidget: 甘特图可视化
// 参数：
//   - schedule: 时间调度器实例
//   - 配置选项：
//     - title: 组件标题
//     - height: 高度（像素）
//     - minWidth: 最小宽度
//     - minHeight: 最小高度
//     - maxScrollHeight: 最大滚动高度
//     - y: Y 轴位置（像素）
const ganttWidget = new Daisy.TaskGanttWidget(schedule, {
    title: "时间线", width: 680, height: 198, minWidth: 400, minHeight: 140, maxScrollHeight: 132, y: 305, formatTime: compactTimeLabel,
});
engine.addWidget(ganttWidget);

// TaskGanttWidget lite: 窄版任务窗口概览，保留时间轴位置关系。
const liteGanttWidget = new Daisy.TaskGanttWidget(schedule, {
    mode: "lite",
    title: "时间线 Lite",
    width: 240,
    height: 190,
    minWidth: 220,
    minHeight: 150,
    maxScrollHeight: 128,
    x: 360,
    y: 80,
    formatTime: compactTimeLabel,
});
engine.addWidget(liteGanttWidget);

// ── 5. 监听任务状态变更事件 ──────────────────────────────────────────────
// onTaskStatusChange: 当任务状态变更时触发
// 回调参数：
//   - task: 任务对象
//   - prevStatus: 之前的状态
//   - currentStatus: 当前状态
schedule.onTaskStatusChange(({ task, prevStatus, currentStatus }) => {
    __log(`[状态变更] ${task.name ?? task.id}: ${prevStatus} → ${currentStatus}`);
});

// ── 6. 启动引擎播放 ──────────────────────────────────────────────────────
// setMultiplier(60): 设置时间倍率为 60x（1 秒 = 1 分钟）
// play(): 启动引擎时间播放
engine.setMultiplier(60);
engine.play();
__log("引擎播放已启动, 时间倍率 60x");

// ── 7. 清理资源 ──────────────────────────────────────────────────────────
// registerCleanup 注册清理回调，当 demo 销毁时自动执行
// 这里移除添加的组件并清空调度器
registerCleanup(() => {
    // 从引擎移除可视化组件
    engine.removeWidget(timelineWidget);
    engine.removeWidget(liteTimelineWidget);
    engine.removeWidget(ganttWidget);
    engine.removeWidget(liteGanttWidget);
    // 清空调度器中的所有任务
    schedule.clear();
});
// =============================================================================
import DemoPanel from "../../shell/DemoPanel.svelte";
</script>

<DemoPanel title="任务调度主题" width="300px" right="12px" left="auto" padding="12px">
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
        <label for="task-schedule-widget-opacity">
            透明度 <output>{Math.round(Number(widgetOpacity) * 100)}%</output>
        </label>
        <input
            id="task-schedule-widget-opacity"
            type="range"
            min="0.45"
            max="1"
            step="0.05"
            bind:value={widgetOpacity}
        />

        <label for="task-schedule-widget-grayscale">
            灰度 <output>{Math.round(Number(widgetGrayscale) * 100)}%</output>
        </label>
        <input
            id="task-schedule-widget-grayscale"
            type="range"
            min="0"
            max="1"
            step="0.05"
            bind:value={widgetGrayscale}
        />
    </div>
</DemoPanel>

<style>
.panel-title {
    color: var(--panel-text);
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
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
    transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
}

.color-btn:hover {
    border-color: var(--color-accent);
    transform: translateY(-1px);
}

.color-btn.active {
    border-color: var(--color-accent);
    box-shadow: 0 0 6px var(--color-accent);
}

.light-dot {
    position: absolute;
    inset: 6px;
    border-radius: 50%;
    border: 1px solid rgba(15, 23, 42, 0.28);
    background: rgba(255, 255, 255, 0.7);
}

.theme-effects {
    display: grid;
    grid-template-columns: max-content minmax(90px, 1fr);
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
