[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / MarkerTarget

# Interface: MarkerTarget

标记目标配置。

定义一个需要在场景中标注的目标点。

## Properties

### color?

> `optional` **color?**: `Color`

标记颜色。

***

### getPosition

> **getPosition**: (`time`) => `Cartesian3`

获取目标在指定时刻的位置。

#### Parameters

##### time

`JulianDate`

仿真时间。

#### Returns

`Cartesian3`

目标位置（世界坐标）。

***

### label

> **label**: `string`

标记标签文本。
