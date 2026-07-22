[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CoverageLabelOptions

# Interface: CoverageLabelOptions

Display style configuration for coverage area labels.

## Properties

### fillColor?

> `optional` **fillColor?**: `string`

Text fill color, defaults to "#ffffff"

***

### font?

> `optional` **font?**: `string`

Font CSS string, defaults to "14px sans-serif"

***

### outlineColor?

> `optional` **outlineColor?**: `string`

Text outline color, defaults to "#000000"

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Text outline width (pixels), defaults to 2

***

### pixelOffset?

> `optional` **pixelOffset?**: \[`number`, `number`\]

Screen pixel offset [x, y], defaults to undefined

***

### show?

> `optional` **show?**: `boolean`

Whether to show the label, defaults to true

***

### translucencyByDistance?

> `optional` **translucencyByDistance?**: \[`number`, `number`, `number`, `number`\]

Label view distance fade [near, nearAlpha, far, farAlpha], defaults to [1e5, 1, 5e6, 0]
