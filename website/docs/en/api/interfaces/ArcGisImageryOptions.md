[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArcGisImageryOptions

# Interface: ArcGisImageryOptions

ArcGIS MapServer imagery configuration

## Extends

- [`GeoImageryBaseOptions`](GeoImageryBaseOptions.md)

## Properties

### alpha?

> `optional` **alpha?**: `number`

Layer opacity (0 ~ 1), default 1

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`alpha`](GeoImageryBaseOptions.md#alpha)

***

### brightness?

> `optional` **brightness?**: `number`

Layer brightness, default 1.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`brightness`](GeoImageryBaseOptions.md#brightness)

***

### colorToAlpha?

> `optional` **colorToAlpha?**: `Color`

Pixels close to this color will become transparent, useful for removing background from overlaid tiles with a base color.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`colorToAlpha`](GeoImageryBaseOptions.md#colortoalpha)

***

### colorToAlphaThreshold?

> `optional` **colorToAlphaThreshold?**: `number`

RGB channel tolerance for color-to-alpha (0 ~ 1), default 0.004.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`colorToAlphaThreshold`](GeoImageryBaseOptions.md#colortoalphathreshold)

***

### contrast?

> `optional` **contrast?**: `number`

Layer contrast, default 1.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`contrast`](GeoImageryBaseOptions.md#contrast)

***

### dayAlpha?

> `optional` **dayAlpha?**: `number`

Daytime area opacity (0 ~ 1). Takes effect when Earth lighting is enabled.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`dayAlpha`](GeoImageryBaseOptions.md#dayalpha)

***

### nightAlpha?

> `optional` **nightAlpha?**: `number`

Night area opacity (0 ~ 1). Takes effect when Earth lighting is enabled.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`nightAlpha`](GeoImageryBaseOptions.md#nightalpha)

***

### show?

> `optional` **show?**: `boolean`

Whether to show the layer, default true

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`show`](GeoImageryBaseOptions.md#show)

***

### type

> **type**: [`ArcGisMapServer`](../enums/GeoImageryType.md#arcgismapserver)

Layer type: ArcGIS MapServer

***

### url?

> `optional` **url?**: `string`

ArcGIS MapServer service URL; when omitted, the global authorization setting is used,
then the SDK's default World Street Map URL.

***

### usePreCachedTilesIfAvailable?

> `optional` **usePreCachedTilesIfAvailable?**: `boolean`

Whether to prefer ArcGIS pre-cached tiles. Defaults to `false` to avoid the `?f=json` metadata request during creation.
