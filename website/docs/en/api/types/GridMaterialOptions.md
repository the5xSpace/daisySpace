[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GridMaterialOptions

# Type Alias: GridMaterialOptions

> **GridMaterialOptions** = `object`

Grid material configuration.

## Properties

### cellAlpha?

> `optional` **cellAlpha?**: `number`

Grid cell interior alpha. Default `0.1`.

***

### color?

> `optional` **color?**: [`DColor`](DColor.md)

Grid line color. Defaults to white.

***

### lineCount?

> `optional` **lineCount?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

Horizontal/vertical grid count; a single number applies the same value to both directions. Default 8.

***

### lineOffset?

> `optional` **lineOffset?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

Horizontal/vertical grid line offset; a single number applies the same value to both directions. Default 0.

***

### lineThickness?

> `optional` **lineThickness?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

Horizontal/vertical grid line thickness; a single number applies the same value to both directions. Default 1.
