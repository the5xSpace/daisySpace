[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ActiveModelAnimationInfo

# Type Alias: ActiveModelAnimationInfo

> **ActiveModelAnimationInfo** = `{ id: string; name: string }`

活跃动画信息（运行时状态）。

## Properties

### delay?

> `optional` **delay?**: `number`

延迟启动时间（单位：秒）。

***

### id

> **id**: `string`

动画唯一标识。

***

### loop?

> `optional` **loop?**: [`ModelAnimationLoop`](../enums/ModelAnimationLoop.md)

循环模式。

***

### multiplier?

> `optional` **multiplier?**: `number`

播放速率倍数。

***

### name

> **name**: `string`

动画名称。

***

### reverse?

> `optional` **reverse?**: `boolean`

是否反向播放。

***

### startTime?

> `optional` **startTime?**: `Daisy.JulianDate`

开始时间（仿真时间）。

***

### stopTime?

> `optional` **stopTime?**: `Daisy.JulianDate`

停止时间（仿真时间）。
