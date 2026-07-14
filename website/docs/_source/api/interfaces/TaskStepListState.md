[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskStepListState

# Interface: TaskStepListState

自定义任务步骤列表渲染器接收的完整状态。

## Properties

### currentTime

> **currentTime**: `JulianDate`

当前仿真时刻。

***

### onStepClick?

> `optional` **onStepClick?**: (`task`) => `void`

触发任务点击行为；未配置点击回调时不存在。

#### Parameters

##### task

[`TaskStepEntry`](TaskStepEntry.md)

#### Returns

`void`

***

### sceneEnd

> **sceneEnd**: `JulianDate`

当前场景的仿真结束时刻。

***

### sceneStart

> **sceneStart**: `JulianDate`

当前场景的仿真开始时刻。

***

### tasks

> **tasks**: [`TaskStepEntry`](TaskStepEntry.md)[]

按调度器顺序生成的任务步骤。
