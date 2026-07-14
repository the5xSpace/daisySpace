[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CoveragePolygon

# Interface: CoveragePolygon

单个覆盖区域的闭合多边形定义。
ring 为经纬度点数组，首尾无需重复（自动闭合）。

## Properties

### color

> **color**: `string`

CSS 颜色字符串，如 "#ff0000" / "rgba(255,0,0,0.5)"

***

### label?

> `optional` **label?**: `string`

多边形标签文字（可选），设置后会在多边形重心位置显示

***

### ring

> **ring**: \[`number`, `number`\][]

闭合经纬度环 [[lng, lat], [lng, lat], ...]，至少 3 个点
