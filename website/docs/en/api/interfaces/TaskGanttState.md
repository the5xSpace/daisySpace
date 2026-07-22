[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskGanttState

# Interface: TaskGanttState

Complete state snapshot passed to the render function.

Built by [TaskGanttWidget](../classes/TaskGanttWidget.md) on each render, containing the scene time range,
current time, all task entries, time cursor position, and timeline ticks.

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

Bottom axis area height (px)

***

### axisTicks

> **axisTicks**: [`TimeAxisTick`](TimeAxisTick.md)[]

List of timeline ticks

***

### currentTime

> **currentTime**: `JulianDate`

Current simulation time (corresponds to engine.getCurrentTime())

***

### cursorPercent

> **cursorPercent**: `number`

Current time position percentage within the scene (0-100).
Used to render the horizontal position of the time cursor (vertical line).

***

### cursorPx

> **cursorPx**: `number`

Current time horizontal position within the timeline content area (px)

***

### followScroll

> **followScroll**: `boolean`

Whether timeline follow-scroll is currently enabled

***

### sceneEnd

> **sceneEnd**: `JulianDate`

Scene end time (corresponds to engine.getStopTime())

***

### sceneStart

> **sceneStart**: `JulianDate`

Scene start time (corresponds to engine.getStartTime())

***

### tasks

> **tasks**: [`TaskTimelineEntry`](TaskTimelineEntry.md)[]

All task entries (with calculated layout percentages, progress, and individual colors)

***

### timelineContentWidth

> **timelineContentWidth**: `number`

Horizontal content width shared by timeline ticks and task bars (px)

***

### trackContentHeight

> **trackContentHeight**: `number`

Total track content height (px), used to set the scrollable container height
