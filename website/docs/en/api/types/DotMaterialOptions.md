[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DotMaterialOptions

# Type Alias: DotMaterialOptions

> **DotMaterialOptions** = `object`

Dot matrix material configuration.

## Properties

### darkColor?

> `optional` **darkColor?**: [`DColor`](DColor.md)

Background color. Defaults to black.

***

### lightColor?

> `optional` **lightColor?**: [`DColor`](DColor.md)

Dot color. Defaults to white.

***

### repeat?

> `optional` **repeat?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

Horizontal/vertical repeat count; a single number applies the same value to both directions. Default 10.
