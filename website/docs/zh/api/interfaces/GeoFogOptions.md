[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GeoFogOptions

# Interface: GeoFogOptions

场景雾效配置；仅修改传入的字段。

## Properties

### brightness?

> `optional` **brightness?**: `number`

雾效亮度。

***

### density?

> `optional` **density?**: `number`

雾密度；数值越大，远处地表越早融入背景。

***

### enabled?

> `optional` **enabled?**: `boolean`

是否启用雾效。

***

### renderable?

> `optional` **renderable?**: `boolean`

是否直接渲染雾色；关闭后仍可保留雾效对细节层级的影响。

***

### screenSpaceErrorFactor?

> `optional` **screenSpaceErrorFactor?**: `number`

雾效参与细节层级计算时使用的屏幕空间误差系数。
