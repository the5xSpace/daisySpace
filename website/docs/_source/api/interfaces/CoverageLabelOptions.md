[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CoverageLabelOptions

# Interface: CoverageLabelOptions

覆盖区域标签的显示样式配置。

## Properties

### fillColor?

> `optional` **fillColor?**: `string`

文本填充色，默认 "#ffffff"

***

### font?

> `optional` **font?**: `string`

字体 CSS 字符串，默认 "14px sans-serif"

***

### outlineColor?

> `optional` **outlineColor?**: `string`

文本描边颜色，默认 "#000000"

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

文本描边宽度（像素），默认 2

***

### pixelOffset?

> `optional` **pixelOffset?**: \[`number`, `number`\]

屏幕像素偏移 [x, y]，默认 undefined

***

### show?

> `optional` **show?**: `boolean`

是否显示标签，默认 true

***

### translucencyByDistance?

> `optional` **translucencyByDistance?**: \[`number`, `number`, `number`, `number`\]

标签视距淡出 [near, nearAlpha, far, farAlpha]，默认 [1e5, 1, 5e6, 0]
