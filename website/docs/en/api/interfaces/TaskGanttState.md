[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskGanttState

# Interface: TaskGanttState

传给渲染函数的完整状态快照。

每次渲染时由 [TaskGanttWidget](../classes/TaskGanttWidget.md) 构建，包含场景时间范围、
当前时间、所有任务条目、时间指针位置和时间轴刻度。

## Example

```ts
const widget = new TaskGanttWidget(schedule, {
 renderer: (container, state) => {
 // state.tasks - 所有任务条目（含独立颜色）
 // state.cursorPercent - 当前时间指针位置 (0-100)
 // state.axisTicks - 时间轴刻度

 render(html`
 共 ${state.tasks.length} 个任务
 `, container);
 }
});
```

## Properties

### axisHeight

> **axisHeight**: `number`

底部轴区高度（px）

***

### axisTicks

> **axisTicks**: [`TimeAxisTick`](TimeAxisTick.md)[]

时间轴刻度列表

***

### currentTime

> **currentTime**: `JulianDate`

当前仿真时间（对应 engine.getCurrentTime()）

***

### cursorPercent

> **cursorPercent**: `number`

当前时间在场景中的位置百分比 (0-100)。
用于渲染时间指针（竖线）的水平位置。

***

### cursorPx

> **cursorPx**: `number`

当前时间在时间轴内容区内的水平位置（px）

***

### followScroll

> **followScroll**: `boolean`

当前是否启用时间线跟随滚动

***

### sceneEnd

> **sceneEnd**: `JulianDate`

场景结束时间（对应 engine.getStopTime()）

***

### sceneStart

> **sceneStart**: `JulianDate`

场景开始时间（对应 engine.getStartTime()）

***

### tasks

> **tasks**: [`TaskTimelineEntry`](TaskTimelineEntry.md)[]

所有任务条目（已计算好布局百分比、进度和独立颜色）

***

### timelineContentWidth

> **timelineContentWidth**: `number`

时间轴刻度与任务条共用的横向内容宽度（px）

***

### trackContentHeight

> **trackContentHeight**: `number`

任务轨道内容总高度（px），用于设置可滚动容器高度
