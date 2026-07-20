[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskStepListState

# Interface: TaskStepListState

Complete state received by the custom task step list renderer.

## Properties

### currentTime

> **currentTime**: `JulianDate`

Current simulation time.

***

### onStepClick?

> `optional` **onStepClick?**: (`task`) => `void`

Triggers task click behavior; not present when no click callback is configured.

#### Parameters

##### task

[`TaskStepEntry`](TaskStepEntry.md)

#### Returns

`void`

***

### sceneEnd

> **sceneEnd**: `JulianDate`

Current scene simulation end time.

***

### sceneStart

> **sceneStart**: `JulianDate`

Current scene simulation start time.

***

### tasks

> **tasks**: [`TaskStepEntry`](TaskStepEntry.md)[]

Task steps generated in scheduler order.
