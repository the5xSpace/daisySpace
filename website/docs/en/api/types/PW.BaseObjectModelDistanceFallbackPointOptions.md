[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / BaseObjectModelDistanceFallbackPointOptions

# Type Alias: BaseObjectModelDistanceFallbackPointOptions

> **BaseObjectModelDistanceFallbackPointOptions** = `Omit`\<[`PointComOptions`](../interfaces/PointComOptions.md), `"position"` \| `"show"` \| `"size"`\> & `object`

## Type Declaration

### enabled?

> `optional` **enabled?**: `boolean`

### farMultiplier?

> `optional` **farMultiplier?**: `number`

### pixelSize?

> `optional` **pixelSize?**: `number`

Compatibility field, equivalent to `sizePx`.

### sizePx?

> `optional` **sizePx?**: `number`

Pixel size. Default fallback points are rendered in pixels only, not using metric dimensions.
