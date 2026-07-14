[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ModelAnimationPlayOptions

# Type Alias: ModelAnimationPlayOptions

> **ModelAnimationPlayOptions** = `object`

模型动画播放配置。

## Properties

### animationTime?

> `optional` **animationTime?**: [`ModelAnimationTimeCallback`](ModelAnimationTimeCallback.md)

自定义动画时间映射函数。

***

### delay?

> `optional` **delay?**: `number`

动画延迟启动时间（单位：秒）。

***

### index?

> `optional` **index?**: `number`

动画索引（与 `name` 二选一）。

***

### loop?

> `optional` **loop?**: [`ModelAnimationLoop`](../enums/ModelAnimationLoop.md)

循环模式。

***

### multiplier?

> `optional` **multiplier?**: `number`

动画播放速率倍数。

***

### name?

> `optional` **name?**: `string`

动画名称（与 `index` 二选一）。

***

### removeOnStop?

> `optional` **removeOnStop?**: `boolean`

停止时是否自动移除动画。

***

### reverse?

> `optional` **reverse?**: `boolean`

是否反向播放。

***

### startTime?

> `optional` **startTime?**: `Daisy.JulianDate`

动画开始时间（仿真时间）。

***

### stopTime?

> `optional` **stopTime?**: `Daisy.JulianDate`

动画停止时间（仿真时间）。
