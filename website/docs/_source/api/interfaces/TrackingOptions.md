[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TrackingOptions

# Interface: TrackingOptions

跟踪目标配置选项。

用于让 Feature（如轨迹线、折线等）自动追踪某个动态目标。

## Properties

### trackingEnabled?

> `optional` **trackingEnabled?**: [`TimeValue`](../types/TimeValue.md)\<`boolean`\>

是否启用跟踪（支持按仿真时间动态切换）。

***

### trackingTarget

> **trackingTarget**: [`Entity`](../classes/Entity.md) \| `Cartesian3` \| [`FreeObject`](../classes/PW.FreeObject.md) \| \{ `entity`: [`Entity`](../classes/Entity.md); \} \| `undefined`

跟踪目标（实体、坐标点或自由对象）。
