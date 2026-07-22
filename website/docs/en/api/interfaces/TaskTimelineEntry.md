[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskTimelineEntry

# Interface: TaskTimelineEntry

A single task entry passed to the render function (with calculated layout percentages and colors).

Internally calculated by [TaskGanttWidget](../classes/TaskGanttWidget.md), accessed by custom render functions via
[TaskGanttState.tasks](TaskGanttState.md#tasks).

## Properties

### barHeight

> **barHeight**: `number`

Progress bar height (px), uniform for all tasks.
Dynamically calculated from available track height and task count.

***

### color

> **color**: `string`

Unique task color (HSL format, e.g. `hsl(120, 70%, 55%)`)

***

### endTime

> **endTime**: `JulianDate`

Task end time (JulianDate), used for tooltip display

***

### id

> **id**: `string`

Unique task ID (corresponds to TimeTask.id)

***

### leftPercent

> **leftPercent**: `number`

Left offset percentage on the timeline (0-100).
Calculation: `(taskStart - sceneStart) / totalSpan * 100`

***

### leftPx

> **leftPx**: `number`

Left position within the timeline content area (px).
Uses pixel coordinates consistently with ticks and cursor to reduce offset from percentage conversion.

***

### name

> **name**: `string`

Task display name (prefers TimeTask.name, falls back to id)

***

### progress

> **progress**: `number`

Execution progress within the interval (0-100).
Calculation: `(nowSeconds - taskStart) / taskDuration * 100`
Only has a value when status is "entered" or "active", 0 when idle.

***

### startTime

> **startTime**: `JulianDate`

Task start time (JulianDate), used for tooltip display

***

### status

> **status**: `TimeTaskStatus`

Current task status ("idle" | "entered" | "active")

***

### topPx

> **topPx**: `number`

Vertical position (px), calculated based on task index.
Each task occupies one row, evenly arranged vertically.

***

### widthPercent

> **widthPercent**: `number`

Width percentage (0-100).
Calculation: `taskDuration / totalSpan * 100`

***

### widthPx

> **widthPx**: `number`

Task bar width (px).
