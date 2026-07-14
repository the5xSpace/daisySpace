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

兼容字段，等同 `sizePx`。

### sizePx?

> `optional` **sizePx?**: `number`

像素尺寸。默认 fallback 点只按像素渲染，不使用米制尺寸。
