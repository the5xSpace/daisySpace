[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GridMaterialOptions

# Type Alias: GridMaterialOptions

> **GridMaterialOptions** = `object`

网格材质配置。

## Properties

### cellAlpha?

> `optional` **cellAlpha?**: `number`

网格单元内部透明度。默认 `0.1`。

***

### color?

> `optional` **color?**: [`DColor`](DColor.md)

网格线颜色。默认白色。

***

### lineCount?

> `optional` **lineCount?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

横纵方向的网格数量；数字表示两个方向使用相同值。默认 8。

***

### lineOffset?

> `optional` **lineOffset?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

横纵方向的网格线偏移；数字表示两个方向使用相同值。默认 0。

***

### lineThickness?

> `optional` **lineThickness?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

横纵方向的网格线粗细；数字表示两个方向使用相同值。默认 1。
