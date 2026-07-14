[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskGanttRenderer

# Type Alias: TaskGanttRenderer

> **TaskGanttRenderer** = (`container`, `state`) => `void`

自定义渲染函数签名。

用户通过此函数完全控制时间线 UI 的渲染逻辑。

## Parameters

### container

`HTMLElement`

挂载 DOM 容器（Widget 创建的面板元素）

### state

[`TaskGanttState`](../interfaces/TaskGanttState.md)

当前调度状态快照（由 Widget 内部计算）

## Returns

`void`
