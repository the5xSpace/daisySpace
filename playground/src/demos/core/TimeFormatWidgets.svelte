<script>
import DemoPanel from "../../shell/DemoPanel.svelte";

// =============================================================================
// TimeFormatWidgets Demo — 全局时间格式和 Widget 局部覆盖验证
// =============================================================================

let { engine, daisy: Daisy, log: __log, registerCleanup } = $props();

const schedule = engine.timeSchedule;
schedule.clear();

const startTime = Daisy.JulianDate.fromDate(new Date("2025-06-01T00:00:00Z"));
const stopTime = Daisy.JulianDate.fromDate(new Date("2025-06-01T01:36:00Z"));
engine.setSceneTime(startTime, stopTime, true);
engine.setCurrentTime(startTime);

let globalMode = $state("beijingTime");

const formatProfiles = {
    worldTime: {
        label: "世界时",
        title: "世界时 UTC",
        hint: "绝对时间，0 时区",
        factory: () => Daisy.TimeFormatters.coordinatedUniversalTime({ format: "HH:mm:ss TZ" }),
    },
    beijingTime: {
        label: "北京时间",
        title: "北京时间 UTC+8",
        hint: "绝对时间，东八区",
        factory: () => Daisy.TimeFormatters.beijingTime({ format: "HH:mm:ss TZ" }),
    },
    elapsedSeconds: {
        label: "起点秒",
        title: "T0 累计秒",
        hint: "相对场景起点累计",
        factory: () => Daisy.TimeFormatters.elapsedSeconds(startTime),
    },
};

const globalOptions = [
    { key: "worldTime", ...formatProfiles.worldTime },
    { key: "beijingTime", ...formatProfiles.beijingTime },
    { key: "elapsedSeconds", ...formatProfiles.elapsedSeconds },
];

const callbackPreviewFormat = Daisy.TimeFormatters.custom((dt) => {
    const quarter = Math.floor(dt.minute / 15) + 1;
    return `${dt.format("HH:mm:ss.SSS")} Q${quarter} ${dt.timezoneName}`;
}, {
    utcOffsetHours: 8,
    timezoneName: "BJT",
});
const callbackPreview = engine.formatTime(startTime, callbackPreviewFormat);

function getProfile(mode) {
    return formatProfiles[mode] ?? formatProfiles.beijingTime;
}

function makeTitle(base, mode = globalMode) {
    return `${base} / ${getProfile(mode).title}`;
}

function refreshDemoTitles(mode) {
    const titleMode = mode ?? globalMode;
    simulationTimeWidget?.setTitle?.(makeTitle("仿真时间", titleMode));
    taskTimelineWidget?.setTitle?.(makeTitle("任务进度", titleMode));
    liteTimelineWidget?.setTitle?.(makeTitle("任务进度 Lite", titleMode));
    ganttWidget?.setTitle?.(makeTitle("甘特图", titleMode));
    liteGanttWidget?.setTitle?.(makeTitle("甘特图 Lite", titleMode));
}

function applyGlobalFormat(mode) {
    engine.setTimeFormat(getProfile(mode).factory());
    refreshDemoTitles(mode);
}

function selectGlobalMode(mode) {
    if (globalMode === mode) return;
    globalMode = mode;
    applyGlobalFormat(mode);
    __log(`全局时间格式: ${getProfile(mode).title}`);
}

engine.setTimeFormat(getProfile(globalMode).factory());

const taskDefs = [
    { id: "sync-clock", name: "时钟同步", startOffset: 0, endOffset: 10 * 60 },
    { id: "link-window", name: "通信窗口", startOffset: 12 * 60, endOffset: 25 * 60 },
    { id: "attitude-review", name: "姿态复核", startOffset: 28 * 60, endOffset: 42 * 60 },
    { id: "payload-check", name: "载荷校验", startOffset: 45 * 60, endOffset: 56 * 60 },
    { id: "data-downlink", name: "数据回传", startOffset: 59 * 60, endOffset: 75 * 60 },
    { id: "final-pass", name: "最终确认", startOffset: 78 * 60, endOffset: 92 * 60 },
];

for (const item of taskDefs) {
    const taskStart = Daisy.JulianDate.addSeconds(startTime, item.startOffset, new Daisy.JulianDate());
    const taskEnd = Daisy.JulianDate.addSeconds(startTime, item.endOffset, new Daisy.JulianDate());
    schedule.add(new Daisy.TimeTask({
        id: item.id,
        name: item.name,
        startJulianTime: taskStart,
        endJulianTime: taskEnd,
        onEnter: () => __log(`[进入] ${item.name}`),
        onLeave: () => __log(`[离开] ${item.name}`),
    }));
}

const timelineWidget = engine.addWidget(new Daisy.TimelineWidget());

let simulationTimeWidget = engine.addWidget(new Daisy.SimulationTimeDisplayWidget({
    widgetOptions: {
        preset: "rightTop",
        offset: { x: 14, y: 16 },
        title: makeTitle("仿真时间"),
        timeLabel: undefined,
    },
}));

let taskTimelineWidget = engine.addWidget(new Daisy.TaskTimeLineWidget(schedule, {
    title: makeTitle("任务进度"),
    width: 330,
    height: 178,
    minHeight: 136,
    maxScrollHeight: 112,
    x: 12,
    y: 342,
}));

let liteTimelineWidget = engine.addWidget(new Daisy.TaskTimeLineWidget(schedule, {
    mode: "lite",
    title: makeTitle("任务进度 Lite"),
    width: 242,
    height: 270,
    minHeight: 150,
    maxScrollHeight: 220,
    right: 12,
    bottom: 56,
    onStepClick: (task) => engine.setCurrentTime(task.startJulianTime),
}));

let ganttWidget = engine.addWidget(new Daisy.TaskGanttWidget(schedule, {
    title: makeTitle("甘特图"),
    width: 650,
    height: 198,
    minWidth: 420,
    minHeight: 150,
    maxScrollHeight: 132,
    x: 360,
    y: 84,
}));

let liteGanttWidget = engine.addWidget(new Daisy.TaskGanttWidget(schedule, {
    mode: "lite",
    title: makeTitle("甘特图 Lite"),
    width: 300,
    height: 190,
    minWidth: 240,
    minHeight: 150,
    maxScrollHeight: 128,
    x: 360,
    y: 310,
}));

refreshDemoTitles(globalMode);
engine.setMultiplier(48);
engine.play();
__log("时间格式化 demo 已启动");

registerCleanup(() => {
    for (const widget of [
        timelineWidget,
        simulationTimeWidget,
        taskTimelineWidget,
        liteTimelineWidget,
        ganttWidget,
        liteGanttWidget,
    ]) {
        try { engine.removeWidget(widget, true); } catch {}
    }
    schedule.clear();
    engine.setTimeFormat(Daisy.TimeFormatters.coordinatedUniversalTime());
});
</script>

<DemoPanel title="时间格式化" width="340px" left="12px" top="12px" padding="12px">
    <div class="format-panel">
        <div class="panel-label">全局格式</div>
        <div class="segmented">
            {#each globalOptions as option}
                <button
                    type="button"
                    class:is-active={globalMode === option.key}
                    title={option.hint}
                    onclick={() => selectGlobalMode(option.key)}
                >
                    {option.label}
                </button>
            {/each}
        </div>

        <div class="current-format">
            <span>{getProfile(globalMode).title}</span>
            <b>{getProfile(globalMode).hint}</b>
        </div>

        <div class="format-map">
            <div><span>跟随全局</span><b>底部时间轴、仿真时间、任务进度、甘特图</b></div>
            <div><span>局部覆盖</span><b>Widget 构造参数 timeFormat 可单独指定</b></div>
            <div><span>DateTime</span><b>回调入参示例：{callbackPreview}</b></div>
        </div>
    </div>
</DemoPanel>

<style>
.format-panel {
    display: grid;
    gap: 10px;
    min-width: 0;
    color: var(--panel-text);
}

.panel-label {
    color: var(--panel-text-muted);
    font-size: 11px;
    line-height: 1;
}

.segmented {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 4px;
    padding: 3px;
    border: 1px solid var(--panel-border);
    border-radius: 8px;
    background: var(--panel-bg-embed);
}

.segmented button {
    min-height: 30px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: var(--panel-text-muted);
    font: inherit;
    font-size: 12px;
    cursor: pointer;
}

.segmented button:hover,
.segmented button.is-active {
    color: var(--panel-text);
    background: var(--panel-btn-primary-bg);
}

.current-format {
    display: grid;
    grid-template-columns: 116px minmax(0, 1fr);
    gap: 8px;
    align-items: center;
    min-height: 28px;
    padding: 0 8px;
    border: 1px solid var(--panel-border);
    border-radius: 6px;
    background: var(--panel-bg-card);
}

.current-format span {
    color: var(--panel-accent);
    font-size: 12px;
}

.current-format b {
    min-width: 0;
    color: var(--panel-text-muted);
    font-size: 11px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.format-map {
    display: grid;
    gap: 6px;
}

.format-map div {
    display: grid;
    grid-template-columns: 78px minmax(0, 1fr);
    gap: 8px;
    align-items: center;
    min-height: 26px;
    padding: 0 8px;
    border: 1px solid var(--panel-border);
    border-radius: 6px;
    background: var(--panel-bg-card);
}

.format-map span {
    color: var(--panel-accent);
    font-size: 11px;
}

.format-map b {
    min-width: 0;
    color: var(--panel-text);
    font-size: 12px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
