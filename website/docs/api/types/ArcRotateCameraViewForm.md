[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArcRotateCameraViewForm

# Type Alias: ArcRotateCameraViewForm

> **ArcRotateCameraViewForm** = `object`

环绕视角参数（球坐标 + roll）。

约定：
- theta：水平角（绕局部 Z 轴）
- phi：俯仰角（限制在接近 ±90° 以内，避免奇异）
- radius：距离（大于 0）
- roll：绕视线方向滚转

## Properties

### phi?

> `optional` **phi?**: `number`

***

### radius?

> `optional` **radius?**: `number`

***

### roll?

> `optional` **roll?**: `number`

***

### theta?

> `optional` **theta?**: `number`
