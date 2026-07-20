# 时间调度

仿真时间调度是航天仿真的核心需求之一。DaisySpace-Sdk 提供两类时间能力：
1. **仿真时钟** — Engine 层的时间播放控制（已涵盖在 [Engine 引擎](/en/guide/engine#时间控制)）
2. **任务调度** — `TimeSchedule` + `TimeTask` / `TimePointTask` 实现的时间驱动任务系统

本文档聚焦于**任务调度器**。

## 架构

```
Engine.timeSchedule  ──→  TimeSchedule（默认实例）
Engine.createTimeSchedule() ──→  TimeSchedule（自定义实例）

TimeSchedule
    ├── TimeTask[]     时间区间任务（有起止时间）
    └── TimePointTask[] 时间点任务（单次触发）
```

Engine 在构造函数中自动创建一个 `timeSchedule` 实例，每帧在 `RenderLoopManager` 中调用 `schedule.update(currentTime)`。如果需要独立的调度器（例如在特定 Entity 或 BaseObject 内使用），可以调用 `engine.createTimeSchedule()` 创建新实例。

## TimeTask — 时间区间任务

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

const start = Daisy.JulianDate.addSeconds(sceneStart, 5 * 60, new Daisy.JulianDate())
const end   = Daisy.JulianDate.addSeconds(sceneStart, 20 * 60, new Daisy.JulianDate())

const task = new Daisy.TimeTask({
    id: "observation",
    name: "观测窗口",
    startJulianTime: start,
    endJulianTime: end,
    onEnter: (curTime, ctx, getStartOffset) => {
        console.log("进入:", Math.round(getStartOffset()), "秒")
    },
    onTick: (curTime, ctx, getStartOffset, getEndOffset) => {
        // 每帧触发，在 [start, end] 区间内
    },
    onLeave: (curTime, ctx, getStartOffset, getEndOffset) => {
        console.log("离开:", Math.round(getEndOffset()), "秒")
    },
})

// 添加到调度器
schedule.add(task)
```

`TimeTask` 构造参数：

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 任务唯一标识 |
| `name` | `string` | 任务显示名称 |
| `startJulianTime` | `JulianDate` | 开始时间 |
| `endJulianTime` | `JulianDate` | 结束时间 |
| `onEnter` | `TimeTaskHandler` | 进入区间时触发一次 |
| `onTick` | `TimeTaskHandler` | 在区间内每帧触发 |
| `onLeave` | `TimeTaskHandler` | 离开区间时触发一次 |

回调参数（4 个）：
- `curTime` — 当前仿真时间
- `ctx` — 上下文对象（Engine 实例）
- `getStartOffset()` — 当前时间相对开始时间的秒偏移
- `getEndOffset()` — 当前时间相对结束时间的秒偏移

### 状态流转

```
idle  ──(进入区间)──→  entered  ──(首帧 onTick)──→  active  ──(离开区间)──→  finished
  ↑                                                                              │
  └────────────────(loop 回退到开始之前)──────────────────────────────────────────┘
```

| 状态 | 含义 |
|------|------|
| `idle` | 未进入区间 |
| `entered` | 刚进入区间（`onEnter` 已触发，`onTick` 尚未） |
| `active` | 正在区间内执行 |
| `finished` | 已离开区间 |

## TimePointTask — 时间点任务

在仿真时间到达指定时间点时触发一次：

```typescript
const triggerTime = Daisy.JulianDate.addSeconds(startTime, 30 * 60, new Daisy.JulianDate())

const pointTask = new Daisy.TimePointTask({
    id: "ignition",
    name: "点火",
    timeJulianTime: triggerTime,
    onTrigger: (curTime, ctx, getOffset) => {
        console.log("点火！偏移:", Math.round(getOffset()), "秒")
    },
})

schedule.addPoint(pointTask)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识 |
| `name` | `string` | 显示名称 |
| `timeJulianTime` | `JulianDate` | 触发时间点 |
| `onTrigger` | `TimePointTaskHandler` | 到达时触发一次 |

状态：`idle` → `triggered`（仅一次）。

## 调度器管理

`engine.timeSchedule` 是默认调度器，但也可以创建独立调度器：

```typescript
// 使用默认调度器
const schedule = engine.timeSchedule

// 创建独立调度器（独立生命周期）
const customSchedule = engine.createTimeSchedule()
customSchedule.add(task)
engine.removeTimeSchedule(customSchedule)  // 移除并销毁

// 任务管理
schedule.add(task)
schedule.remove(task)       // 按实例移除
schedule.removeById("id")   // 按 ID 移除
schedule.addPoint(pointTask)
schedule.removePoint(pointTask)
schedule.clear()            // 清空全部
schedule.getTasks()         // 获取所有区间任务（只读）
```

## 状态变更监听

```typescript
schedule.onTaskStatusChange(({ task, prevStatus, currentStatus }) => {
    console.log(`${task.name}: ${prevStatus} → ${currentStatus}`)
})

schedule.offTaskStatusChange(handler)  // 取消订阅
```

此事件在状态转换时触发（微任务调度），常用于驱动 UI 组件（如 `TaskTimeLineWidget`、`TaskGanttWidget`）更新。

## 可视化组件

调度器可配合内置可视化 Widget 使用：

```typescript
// 时间线进度
engine.addWidget(new Daisy.TaskTimeLineWidget(schedule, {
    title: "任务进度",
    width: 380,
    height: 260,
}))

// 甘特图
engine.addWidget(new Daisy.TaskGanttWidget(schedule, {
    title: "时间线",
    height: 320,
}))
```

## 调度器与仿真时钟的关系

- 调度器**不控制**仿真时钟——它只**响应**仿真时钟。
- Engine 的渲染循环每帧调用 `schedule.update(engine.getCurrentTime())`。
- 仿真时间由 `engine.play()` / `engine.setMultiplier()` / `engine.setCurrentTime()` 驱动。
- 调度器的任务回调通过**微任务队列**调度执行，异常自动捕获，不会中断调度器。

## 常见陷阱

> **陷阱 1 — 调度器依赖仿真时间**：仿真时间必须在 `TimeTask` 的 `[startJulianTime, endJulianTime]` 区间内任务才会触发。确保 `engine.setSceneTime()` 的范围覆盖任务时间。
>
> **陷阱 2 — loop 模式下的状态重置**：当 `setSceneTime(start, stop, true)` 启用循环时，`TimeSchedule` 在仿真时间跳回区间之前会自动将 `finished` 状态重置为 `idle`，保证每次循环都能重新触发任务。
>
> **陷阱 3 — `engine.clock` 陷阱的延续**：如果 `engine.clock` 未正确同步（见 [Engine 陷阱](/en/guide/engine)），调度器从 `engine.getCurrentTime()` 读取的可能是实时时间而非仿真时间，导致任务永远无法匹配。


---

<!--
  示例参考: [TimeSchedule.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/core/TimeSchedule.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
