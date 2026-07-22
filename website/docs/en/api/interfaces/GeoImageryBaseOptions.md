[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GeoImageryBaseOptions

# Interface: GeoImageryBaseOptions

Common imagery parameters.

## Extended by

- [`IonImageryOptions`](IonImageryOptions.md)
- [`OsmImageryOptions`](OsmImageryOptions.md)
- [`ArcGisImageryOptions`](ArcGisImageryOptions.md)
- [`XYZImageryOptions`](XYZImageryOptions.md)
- [`WmtsImageryOptions`](WmtsImageryOptions.md)
- [`WmsImageryOptions`](WmsImageryOptions.md)

## Properties

### alpha?

> `optional` **alpha?**: `number`

Layer opacity (0 ~ 1). Default 1

***

### brightness?

> `optional` **brightness?**: `number`

Layer brightness. Default 1.

***

### colorToAlpha?

> `optional` **colorToAlpha?**: `Color`

Pixels close to this color become transparent. Can be used to remove background from overlaid tiles with a base color.

***

### colorToAlphaThreshold?

> `optional` **colorToAlphaThreshold?**: `number`

RGB channel tolerance for color-to-alpha (0 ~ 1). Default 0.004.

***

### contrast?

> `optional` **contrast?**: `number`

Layer contrast. Default 1.

***

### dayAlpha?

> `optional` **dayAlpha?**: `number`

Daytime region opacity (0 ~ 1). Effective when Earth lighting is enabled.

***

### nightAlpha?

> `optional` **nightAlpha?**: `number`

Nighttime region opacity (0 ~ 1). Effective when Earth lighting is enabled.

***

### show?

> `optional` **show?**: `boolean`

Whether to show this layer. Default true
