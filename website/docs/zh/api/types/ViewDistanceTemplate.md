[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ViewDistanceTemplate

# Type Alias: ViewDistanceTemplate

> **ViewDistanceTemplate** = `object` & `{ [K in ViewDistanceLevel]: Daisy.DistanceDisplayCondition }`

视距阈值模板。

每个 `ViewDistanceLevel` 对应一个 `Daisy.DistanceDisplayCondition(near, far)`，
用于描述某类要素在不同观察尺度下的可见距离范围。

## Type Declaration

### PATH\_RESOLUTION\_SCALE?

> `optional` **PATH\_RESOLUTION\_SCALE?**: `number`

轨迹/路径分辨率缩放系数。

数值越大，路径显示更平滑（插值/采样更密），但计算/渲染开销更高。
