[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskGanttRenderer

# Type Alias: TaskGanttRenderer

> **TaskGanttRenderer** = (`container`, `state`) => `void`

Custom render function signature.

The user fully controls the timeline UI rendering logic through this function.

## Parameters

### container

`HTMLElement`

Mount DOM container (panel element created by the Widget)

### state

[`TaskGanttState`](../interfaces/TaskGanttState.md)

Current schedule state snapshot (computed internally by the Widget)

## Returns

`void`
