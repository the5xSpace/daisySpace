# Task Dashboard

Task dashboard widgets visualize the [TimeTask](/en/api/classes/TimeTask) and [TimePointTask](/en/api/classes/TimePointTask) instances in [TimeSchedule](/en/api/classes/TimeSchedule). They provide two views:

| Component | View | Suitable scene |
|------|------|----------|
| [TaskGanttWidget](/en/api/classes/TaskGanttWidget) | Gantt chart (bars + timeline) | Interval tasks |
| [TaskTimeLineWidget](/en/api/classes/TaskTimeLineWidget) | Step list (status + progress) | Point-in-time tasks / sequential steps |

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
| `mode` | `"standard"` \| `"lite"` | `"standard"` | Standard Gantt chart / compact list |
| `title` | string | `"时间线"` | Panel title |
| `width` | number | 680 | Panel width (px) |
| `height` | number | 190 | Panel height (px) |
| `pixelsPerMinute` | number | 18 | Timeline pixel density |
| `tickCount` | number | 6 | Number of timeline ticks |
| `timeFormat` | TimeFormatConfig | — | Task-label time format, see [Time Formatting](/en/guide/time-format) |
| `axisTimeFormat` | TimeFormatConfig | — | Independent timeline tick format; reuses timeFormat when omitted |
| `x` / `y` / `right` / `bottom` | number | — | Panel position |

### Runtime Methods

```typescript
gantt.setTitle("发射流程")
gantt.refresh()
```

## TaskTimeLineWidget

The step-list view displays task status and progress in a vertical list:

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
| `mode` | `"standard"` \| `"lite"` | `"standard"` | Standard details / compact list |
| `title` | string | `"任务进度"` | Panel title |
| `width` | number | 320 | Panel width (px) |
| `height` | number | 180 | Panel height (px) |
| `timeFormat` | TimeFormatConfig | — | Step time format |
| `onStepClick` | `(task: TimeTask) => void` | — | Callback when a step is clicked |

### Task Status

| Status | Description |
|------|------|
| idle | Not started |
| entered | Entered the time interval |
| active | Currently executing |
| finished | Completed |

> **Related API**: [TaskGanttWidget](/en/api/classes/TaskGanttWidget) · [TaskTimeLineWidget](/en/api/classes/TaskTimeLineWidget) · [TimeSchedule](/en/api/classes/TimeSchedule) · [TimeTask](/en/api/classes/TimeTask) · [TimePointTask](/en/api/classes/TimePointTask)
