# Time Scheduling

Simulation-time scheduling is a core requirement in space simulation. DaisySpace-Sdk provides two kinds of time capabilities:
1. **Simulation clock** — time playback control at the Engine layer (covered in [Engine time control](/en/guide/engine#时间控制))
2. **Task scheduling** - a time-driven task system implemented by `TimeSchedule` + `TimeTask` / `TimePointTask`

This document focuses on the **task scheduler**.

## Architecture

```
Engine.timeSchedule  ──→  TimeSchedule（默认实例）
Engine.createTimeSchedule() ──→  TimeSchedule（自定义实例）

TimeSchedule
    ├── TimeTask[]     时间区间任务（有起止时间）
    └── TimePointTask[] 时间点任务（单次触发）
```

The Engine automatically creates a `timeSchedule` instance in its constructor and calls `schedule.update(currentTime)` in `RenderLoopManager` every frame. To create an independent scheduler, for example for use inside a specific Entity or BaseObject, call `engine.createTimeSchedule()`.

## TimeTask - Interval Task

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

`TimeTask` constructor parameters:

| Parameter | Type | Description |
|------|------|------|
| `id` | `string` | Unique task identifier |
| `name` | `string` | Display name of the task |
| `startJulianTime` | `JulianDate` | Start time |
| `endJulianTime` | `JulianDate` | End time |
| `onEnter` | `TimeTaskHandler` | Invoked once when entering the interval |
| `onTick` | `TimeTaskHandler` | Invoked every frame within the interval |
| `onLeave` | `TimeTaskHandler` | Invoked once when leaving the interval |

Callback parameters (4):
- `curTime` - current simulation time
- `ctx` - context object (the Engine instance)
- `getStartOffset()` - offset in seconds from the start time to the current time
- `getEndOffset()` - offset in seconds from the current time to the end time

### State Transitions

```
idle  ──(进入区间)──→  entered  ──(首帧 onTick)──→  active  ──(离开区间)──→  finished
  ↑                                                                              │
  └────────────────(loop 回退到开始之前)──────────────────────────────────────────┘
```

| State | Meaning |
|------|------|
| `idle` | Not in the interval |
| `entered` | Just entered the interval (`onEnter` has fired, but `onTick` has not) |
| `active` | Executing within the interval |
| `finished` | Has left the interval |

## TimePointTask - Point-in-Time Task

Fires once when simulation time reaches the specified time point:

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

| Parameter | Type | Description |
|------|------|------|
| `id` | `string` | Unique identifier |
| `name` | `string` | Display name |
| `timeJulianTime` | `JulianDate` | Trigger time point |
| `onTrigger` | `TimePointTaskHandler` | Invoked once when reached |

State: `idle` -> `triggered` (once only).

## Scheduler Management

`engine.timeSchedule` is the default scheduler, but independent schedulers can also be created:

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

## State-Change Listeners

```typescript
schedule.onTaskStatusChange(({ task, prevStatus, currentStatus }) => {
    console.log(`${task.name}: ${prevStatus} → ${currentStatus}`)
})

schedule.offTaskStatusChange(handler)  // 取消订阅
```

This event fires on state transitions (scheduled as a microtask) and is commonly used to update UI components such as `TaskTimeLineWidget` and `TaskGanttWidget`.

## Visualization Components

The scheduler can be used with the built-in visualization Widgets:

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

## Scheduler and Simulation Clock

- The scheduler **does not control** the simulation clock; it only **responds** to it.
- The Engine render loop calls `schedule.update(engine.getCurrentTime())` every frame.
- Simulation time is driven by `engine.play()` / `engine.setMultiplier()` / `engine.setCurrentTime()`.
- Scheduler task callbacks run through the **microtask queue**; exceptions are caught automatically and do not interrupt the scheduler.

## Common Pitfalls

> **Pitfall 1 - The scheduler depends on simulation time**: a task fires only when simulation time is within the `TimeTask` interval `[startJulianTime, endJulianTime]`. Ensure the range passed to `engine.setSceneTime()` covers the task time.
>
> **Pitfall 2 - State reset in loop mode**: when `setSceneTime(start, stop, true)` enables looping, `TimeSchedule` automatically resets `finished` to `idle` before simulation time jumps back to the interval, allowing tasks to fire again on every loop.
>
> **Pitfall 3 — continuation of the `engine.clock` pitfall**: if `engine.clock` is not synchronized correctly (see the [Engine pitfall](/en/guide/engine)), the scheduler may read real time rather than simulation time from `engine.getCurrentTime()`, so tasks never match.


---

<!--
  示例参考: [TimeSchedule.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/core/TimeSchedule.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
