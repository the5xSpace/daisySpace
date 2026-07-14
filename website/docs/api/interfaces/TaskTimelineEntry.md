[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskTimelineEntry

# Interface: TaskTimelineEntry

传给渲染函数的单个任务条目（已计算好布局百分比和颜色）。

由 [TaskGanttWidget](../classes/TaskGanttWidget.md) 内部计算，用户自定义渲染函数通过
[TaskGanttState.tasks](TaskGanttState.md#tasks) 获取。

## Properties

### barHeight

> **barHeight**: `number`

进度条高度（px），所有任务统一。
由可用轨道高度和任务数量动态计算。

***

### color

> **color**: `string`

任务唯一颜色（HSL 格式，如 `hsl(120, 70%, 55%)`）

***

### endTime

> **endTime**: `JulianDate`

任务结束时间（JulianDate），用于 tooltip 显示

***

### id

> **id**: `string`

任务唯一标识（对应 TimeTask.id）

***

### leftPercent

> **leftPercent**: `number`

在时间轴上的左偏移百分比 (0-100)。
计算方式：`(taskStart - sceneStart) / totalSpan * 100`

***

### leftPx

> **leftPx**: `number`

在时间轴内容区内的左侧位置（px）。
与刻度、游标统一使用像素坐标，减少百分比换算造成的偏移。

***

### name

> **name**: `string`

任务显示名称（优先使用 TimeTask.name，回退到 id）

***

### progress

> **progress**: `number`

区间内执行进度 (0-100)。
计算方式：`(nowSeconds - taskStart) / taskDuration * 100`
仅在 status 为 "entered" 或 "active" 时有值，idle 时为 0。

***

### startTime

> **startTime**: `JulianDate`

任务起始时间（JulianDate），用于 tooltip 显示

***

### status

> **status**: `TimeTaskStatus`

任务当前状态（"idle" | "entered" | "active"）

***

### topPx

> **topPx**: `number`

垂直位置（px），基于任务索引计算。
每个任务占一行，纵向均匀排列。

***

### widthPercent

> **widthPercent**: `number`

宽度百分比 (0-100)。
计算方式：`taskDuration / totalSpan * 100`

***

### widthPx

> **widthPx**: `number`

任务条宽度（px）。
