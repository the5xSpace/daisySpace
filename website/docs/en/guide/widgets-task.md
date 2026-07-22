# Task Board

The Task Board widget visualizes [TimeTask](/en/api/classes/TimeTask) and [TimePointTask](/en/api/classes/TimePointTask) from [TimeSchedule](/en/api/classes/TimeSchedule). It provides two views:

| Component | View | Use Case |
|------|------|----------|
| [TaskGanttWidget](/en/api/classes/TaskGanttWidget) | Gantt chart (bars + timeline) | Time interval tasks |
| [TaskTimeLineWidget](/en/api/classes/TaskTimeLineWidget) | Step list (status + progress) | Time point tasks / sequential steps |

## TaskGanttWidget

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
const start = Daisy.JulianDate.fromIso8601("2026-07-01T00:00:00Z")
const stop  = Daisy.JulianDate.fromIso8601("2026-07-01T01:00:00Z")
engine.setSceneTime(start, stop, true)

// 创建任务并加入默认调度器
const task1 = new Daisy.TimeTask({
    name: "一级点火",
    startJulianTime: Daisy.JulianDate.addSeconds(start, 0, new Daisy.JulianDate()),
    endJulianTime: Daisy.JulianDate.addSeconds(start, 180, new Daisy.JulianDate()),
})

const task2 = new Daisy.TimeTask({
    name: "二级点火",
    startJulianTime: Daisy.JulianDate.addSeconds(start, 180, new Daisy.JulianDate()),
    endJulianTime: Daisy.JulianDate.addSeconds(start, 360, new Daisy.JulianDate()),
})

engine.timeSchedule.add(task1)
engine.timeSchedule.add(task2)

// 创建甘特图组件
const gantt = new Daisy.TaskGanttWidget(engine.timeSchedule, {
    mode: "standard",
    title: "任务时间线",
    timeFormat: { preset: "t0", t0: start },
    pixelsPerMinute: 18,
    tickCount: 6,
})
engine.addWidget(gantt)
```

### Constructor Options

| Option | Type | Default | Description |
|------|------|:---:|------|
| `mode` | `"standard"` \| `"lite"` | `"standard"` | 标准甘特图 / 精简列表 |
| `title` | string | `"时间线"` | 面板标题 |
| `width` | number | 680 | 面板宽度（px） |
| `height` | number | 190 | 面板高度（px） |
| `pixelsPerMinute` | number | 18 | 时间轴像素密度 |
| `tickCount` | number | 6 | 时间轴刻度数 |
| `timeFormat` | TimeFormatConfig | — | 任务标签时间格式，[Time Formatting](/en/guide/time-format) |
| `axisTimeFormat` | TimeFormatConfig | — | 独立的时间轴刻度格式（不传则复用 timeFormat） |
| `x` / `y` / `right` / `bottom` | number | — | 面板位置 |

### Runtime Methods

```typescript
gantt.setTitle("发射流程")
gantt.refresh()
```

## TaskTimeLineWidget

Step list view, displaying task status and progress in a vertical list:

```typescript
const stepList = new Daisy.TaskTimeLineWidget(engine.timeSchedule, {
    mode: "standard",
    title: "任务进度",
    timeFormat: { preset: "t0", t0: start },
    onStepClick: (task) => {
        console.log("点击了任务:", task.name)
    },
})
engine.addWidget(stepList)
```

### Constructor Options

| Option | Type | Default | Description |
|------|------|:---:|------|
| `mode` | `"standard"` \| `"lite"` | `"standard"` | 标准详情 / 精简列表 |
| `title` | string | `"任务进度"` | 面板标题 |
| `width` | number | 320 | 面板宽度（px） |
| `height` | number | 180 | 面板高度（px） |
| `timeFormat` | TimeFormatConfig | — | 步骤时间格式 |
| `onStepClick` | `(task: TimeTask) => void` | — | 点击步骤回调 |

### Task Status

| Status | Description |
|------|------|
| idle | Not started |
| entered | Entered time range |
| active | Currently executing |
| finished | Completed |

> **Related API**: [TaskGanttWidget](/en/api/classes/TaskGanttWidget) · [TaskTimeLineWidget](/en/api/classes/TaskTimeLineWidget) · [TimeSchedule](/en/api/classes/TimeSchedule) · [TimeTask](/en/api/classes/TimeTask) · [TimePointTask](/en/api/classes/TimePointTask)
