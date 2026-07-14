# 任务看板

任务看板组件将 [TimeSchedule](/api/classes/TimeSchedule) 中的 [TimeTask](/api/classes/TimeTask) 和 [TimePointTask](/api/classes/TimePointTask) 可视化。提供两种视图：

| 组件 | 视图 | 适用场景 |
|------|------|----------|
| [TaskGanttWidget](/api/classes/TaskGanttWidget) | 甘特图（横条 + 时间轴） | 时间区间任务 |
| [TaskTimeLineWidget](/api/classes/TaskTimeLineWidget) | 步骤列表（状态 + 进度） | 时间点任务 / 顺序步骤 |

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

### 构造选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `mode` | `"standard"` \| `"lite"` | `"standard"` | 标准甘特图 / 精简列表 |
| `title` | string | `"时间线"` | 面板标题 |
| `width` | number | 680 | 面板宽度（px） |
| `height` | number | 190 | 面板高度（px） |
| `pixelsPerMinute` | number | 18 | 时间轴像素密度 |
| `tickCount` | number | 6 | 时间轴刻度数 |
| `timeFormat` | TimeFormatConfig | — | 任务标签时间格式，[时间格式化](/guide/time-format) |
| `axisTimeFormat` | TimeFormatConfig | — | 独立的时间轴刻度格式（不传则复用 timeFormat） |
| `x` / `y` / `right` / `bottom` | number | — | 面板位置 |

### 运行时方法

```typescript
gantt.setTitle("发射流程")
gantt.refresh()
```

## TaskTimeLineWidget

步骤列表视图，以纵向列表展示任务状态和进度：

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

### 构造选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `mode` | `"standard"` \| `"lite"` | `"standard"` | 标准详情 / 精简列表 |
| `title` | string | `"任务进度"` | 面板标题 |
| `width` | number | 320 | 面板宽度（px） |
| `height` | number | 180 | 面板高度（px） |
| `timeFormat` | TimeFormatConfig | — | 步骤时间格式 |
| `onStepClick` | `(task: TimeTask) => void` | — | 点击步骤回调 |

### 任务状态

| 状态 | 说明 |
|------|------|
| idle | 未开始 |
| entered | 已进入时间区间 |
| active | 当前正在执行 |
| finished | 已完成 |

> **相关 API**：[TaskGanttWidget](/api/classes/TaskGanttWidget) · [TaskTimeLineWidget](/api/classes/TaskTimeLineWidget) · [TimeSchedule](/api/classes/TimeSchedule) · [TimeTask](/api/classes/TimeTask) · [TimePointTask](/api/classes/TimePointTask)
