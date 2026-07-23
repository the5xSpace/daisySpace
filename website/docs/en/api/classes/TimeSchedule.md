[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeSchedule

# Class: TimeSchedule

Simulation-time scheduler that manages interval and point-in-time tasks and triggers callbacks as simulation time advances.

Core responsibilities:
1. **Task management**: add, remove, and clear interval tasks ([TimeTask](TimeTask.md)) and point-in-time tasks ([TimePointTask](TimePointTask.md))
2. **State-driven progression**: call `update(curTime)` every frame to advance simulation time and automatically detect task entry, exit, and triggering
3. **Event notifications**: emit `onTaskStatusChange` when task state changes so UI components such as [TaskTimeLineWidget](TaskTimeLineWidget.md) can respond
4. **State queries**: use `getTasks()` to obtain the current state of all tasks

Interval-task state transitions:
```
idle → entered（onEnter 回调）→ active（onTick 每帧）→ finished（onLeave 回调）
 ↑ │
 └────────────────(loop 回退到开始之前)──────────────────────────────────────┘
```

## Example

```ts
// 基本用法
const schedule = engine.timeSchedule;

const task = new Daisy.TimeTask({
 id: "observation",
 name: "观测窗口",
 startJulianTime: startTime,
 endJulianTime: endTime,
 onEnter: () => console.log("进入"),
 onTick: () => console.log("执行中"),
 onLeave: () => console.log("离开"),
});
schedule.add(task);

// 监听状态变更（供 UI 组件使用）
schedule.onTaskStatusChange(({ task, prevStatus, currentStatus }) => {
 console.log(`${task.name}: ${prevStatus} → ${currentStatus}`);
});

// 在渲染循环中推进时间
function renderLoop() {
 schedule.update(engine.getCurrentTime());
 requestAnimationFrame(renderLoop);
}
```

## Constructors

### Constructor

> **new TimeSchedule**(`ctx`): `TimeSchedule`

Creates a simulation-time scheduler.

#### Parameters

##### ctx

[`Engine`](Engine.md)

Context object, usually an [Engine](Engine.md) instance, passed as the `ctx` parameter to every task callback.

#### Returns

`TimeSchedule`

## Methods

### add()

> **add**(`task`): `void`

Adds an interval task.

#### Parameters

##### task

[`TimeTask`](TimeTask.md)

Interval task to add.

#### Returns

`void`

#### Example

```ts
const task = new Daisy.TimeTask({ startJulianTime, endJulianTime });
schedule.add(task);
```

***

### addPoint()

> **addPoint**(`task`): `void`

Adds a point-in-time task.

#### Parameters

##### task

[`TimePointTask`](TimePointTask.md)

Point-in-time task to add.

#### Returns

`void`

#### Example

```ts
const pointTask = new Daisy.TimePointTask({ timeJulianTime });
schedule.addPoint(pointTask);
```

***

### clear()

> **clear**(): `void`

Clears all tasks (removes both interval and point-in-time tasks and resets their state to idle).

#### Returns

`void`

#### Example

```ts
schedule.clear();
console.log(schedule.getTasks().length); // 0
```

***

### destroy()

> **destroy**(): `void`

Destroys the scheduler and cleans up all resources.

After destruction:
- all tasks are cleared and reset to idle
- all event listeners are removed
- subsequent `add`/`addPoint`/`update` calls are silently ignored

#### Returns

`void`

#### Example

```ts
schedule.destroy();
```

***

### getTasks()

> **getTasks**(): readonly [`TimeTask`](TimeTask.md)\<`unknown`\>[]

Gets all registered interval tasks as a read-only array.

Useful for UI components to iterate over tasks, calculate progress, and display status.

#### Returns

readonly [`TimeTask`](TimeTask.md)\<`unknown`\>[]

Read-only array of all [TimeTask](TimeTask.md) instances in the scheduler.

#### Example

```ts
const tasks = schedule.getTasks();
tasks.forEach(task => {
 console.log(`${task.name}: ${task.status}`);
});
```

***

### offTaskStatusChange()

> **offTaskStatusChange**(`handler`): `void`

Unsubscribes from task-status change events.

#### Parameters

##### handler

`TaskStatusChangeHandler`

Callback previously registered through [onTaskStatusChange](#ontaskstatuschange).

#### Returns

`void`

#### Example

```ts
const handler = ({ task }) => updateUI(task);
schedule.onTaskStatusChange(handler);
// ... 稍后取消订阅
schedule.offTaskStatusChange(handler);
```

***

### onTaskStatusChange()

> **onTaskStatusChange**(`handler`): `void`

Subscribes to task-status change events.

When any [TimeTask](TimeTask.md) changes state (idle→entered / entered→active / active→idle),
the callback is scheduled through the microtask queue, and multiple listeners can subscribe simultaneously.

#### Parameters

##### handler

`TaskStatusChangeHandler`

State-change callback.

#### Returns

`void`

#### Example

```ts
// 用于 UI 组件响应状态变更
schedule.onTaskStatusChange(({ task, prevStatus, currentStatus }) => {
 if (currentStatus === "active") {
 highlightTask(task.id);
 }
});
```

***

### remove()

> **remove**(`task`): `boolean`

Removes the specified interval task.

#### Parameters

##### task

[`TimeTask`](TimeTask.md)

Task instance to remove.

#### Returns

`boolean`

Whether removal succeeded (false means the task is not in the scheduler).

#### Example

```ts
const removed = schedule.remove(task);
if (removed) console.log("任务已移除");
```

***

### removeById()

> **removeById**(`id`): `boolean`

Removes a task by id (supports both interval and point-in-time tasks).

#### Parameters

##### id

`string`

Unique task identifier.

#### Returns

`boolean`

Whether removal succeeded.

#### Example

```ts
schedule.removeById("observation-window");
```

***

### removePoint()

> **removePoint**(`task`): `boolean`

Removes the specified point-in-time task.

#### Parameters

##### task

[`TimePointTask`](TimePointTask.md)

The task instance to remove.

#### Returns

`boolean`

Whether the task was removed successfully.

***

### update()

> **update**(`curTime`): `void`

Advances scheduler time and should be called every frame in the render loop.

This method iterates over all registered tasks and uses the current simulation time to determine:
1. Interval tasks: whether they are entered, exited, or active, triggering the corresponding callbacks and state-change events
2. Point-in-time tasks: whether their trigger time has been reached, triggering the `onTrigger` callback

Throttling is supported internally: when `_detectIntervalMs > 0`, detection is throttled to that interval.

#### Parameters

##### curTime

`JulianDate`

Current simulation time (JulianDate), usually obtained from `engine.getCurrentTime()`.

#### Returns

`void`

#### Example

```ts
// 在渲染循环中调用
function onBeforeRender() {
 schedule.update(engine.getCurrentTime());
}
engine.onBeforeRender(onBeforeRender);
```
