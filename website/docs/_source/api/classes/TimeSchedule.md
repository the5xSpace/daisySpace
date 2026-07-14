[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeSchedule

# Class: TimeSchedule

仿真时间调度器 — 管理时间区间任务和时间点任务，在仿真时间推进时触发回调。

核心职责：
1. **任务管理**：添加/移除/清空时间区间任务（[TimeTask](TimeTask.md)）和时间点任务（[TimePointTask](TimePointTask.md)）
2. **状态驱动**：每帧调用 `update(curTime)` 推进仿真时间，自动检测任务进入/离开/触发
3. **事件通知**：任务状态变更时通过 `onTaskStatusChange` 发送事件，供 UI 组件（如 [TaskTimeLineWidget](TaskTimeLineWidget.md)）响应
4. **状态查询**：通过 `getTasks()` 获取所有任务的当前状态

时间区间任务的状态流转：
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

创建仿真时间调度器。

#### Parameters

##### ctx

[`Engine`](Engine.md)

上下文对象，通常是 [Engine](Engine.md) 实例，会作为 `ctx` 参数传递给所有任务回调

#### Returns

`TimeSchedule`

## Methods

### add()

> **add**(`task`): `void`

添加时间区间任务。

#### Parameters

##### task

[`TimeTask`](TimeTask.md)

要添加的时间区间任务

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

添加时间点任务。

#### Parameters

##### task

[`TimePointTask`](TimePointTask.md)

要添加的时间点任务

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

清空所有任务（区间任务和时间点任务全部移除，状态重置为 idle）。

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

销毁调度器并清理所有资源。

销毁后：
- 所有任务被清空并重置为 idle 状态
- 所有事件监听器被移除
- 后续的 `add`/`addPoint`/`update` 调用会被静默忽略

#### Returns

`void`

#### Example

```ts
schedule.destroy();
```

***

### getTasks()

> **getTasks**(): readonly [`TimeTask`](TimeTask.md)\<`unknown`\>[]

获取所有已注册的时间区间任务（只读数组）。

可用于 UI 组件遍历任务列表、计算进度、展示状态等。

#### Returns

readonly [`TimeTask`](TimeTask.md)\<`unknown`\>[]

当前调度器中所有 [TimeTask](TimeTask.md) 的只读数组

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

取消订阅任务状态变更事件。

#### Parameters

##### handler

`TaskStatusChangeHandler`

之前通过 [onTaskStatusChange](#ontaskstatuschange) 注册的回调函数

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

订阅任务状态变更事件。

当任意 [TimeTask](TimeTask.md) 的状态发生转换时（idle→entered / entered→active / active→idle），
回调会通过微任务队列调度执行，支持多个监听器同时订阅。

#### Parameters

##### handler

`TaskStatusChangeHandler`

状态变更回调函数

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

移除指定时间区间任务。

#### Parameters

##### task

[`TimeTask`](TimeTask.md)

要移除的任务实例

#### Returns

`boolean`

是否移除成功（false 表示该任务不在调度器中）

#### Example

```ts
const removed = schedule.remove(task);
if (removed) console.log("任务已移除");
```

***

### removeById()

> **removeById**(`id`): `boolean`

根据任务 id 移除任务（支持区间任务和时间点任务）。

#### Parameters

##### id

`string`

任务唯一标识

#### Returns

`boolean`

是否移除成功

#### Example

```ts
schedule.removeById("observation-window");
```

***

### removePoint()

> **removePoint**(`task`): `boolean`

移除指定时间点任务。

#### Parameters

##### task

[`TimePointTask`](TimePointTask.md)

要移除的任务实例

#### Returns

`boolean`

是否移除成功

***

### update()

> **update**(`curTime`): `void`

推进调度器时间（应在渲染循环中每帧调用）。

此方法会遍历所有已注册的任务，根据当前仿真时间判断：
1. 时间区间任务：检测是否进入/离开/在区间内，触发对应回调和状态变更事件
2. 时间点任务：检测是否到达触发时间点，触发 `onTrigger` 回调

内部支持节流控制：若 `_detectIntervalMs > 0`，则按间隔节流检测。

#### Parameters

##### curTime

`JulianDate`

当前仿真时间（JulianDate），通常从 `engine.getCurrentTime()` 获取

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
