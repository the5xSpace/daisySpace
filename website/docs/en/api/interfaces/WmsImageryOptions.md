[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / WmsImageryOptions

# Interface: WmsImageryOptions

WMS imagery configuration

## Extends

- [`GeoImageryBaseOptions`](GeoImageryBaseOptions.md)

## Properties

### alpha?

> `optional` **alpha?**: `number`

Layer transparency (0 ~ 1), defaults to 1

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`alpha`](GeoImageryBaseOptions.md#alpha)

***

### brightness?

> `optional` **brightness?**: `number`

Layer brightness, defaults to 1.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`brightness`](GeoImageryBaseOptions.md#brightness)

***

### colorToAlpha?

> `optional` **colorToAlpha?**: `Color`

Pixels close to this color will become transparent, useful for removing backgrounds from overlaid tiles with solid colors.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`colorToAlpha`](GeoImageryBaseOptions.md#colortoalpha)

***

### colorToAlphaThreshold?

> `optional` **colorToAlphaThreshold?**: `number`

RGB channel tolerance for color-to-alpha (0 ~ 1), defaults to 0.004.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`colorToAlphaThreshold`](GeoImageryBaseOptions.md#colortoalphathreshold)

***

### contrast?

> `optional` **contrast?**: `number`

Layer contrast, defaults to 1.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`contrast`](GeoImageryBaseOptions.md#contrast)

***

### dayAlpha?

> `optional` **dayAlpha?**: `number`

Daytime area transparency (0 ~ 1). Takes effect when Earth lighting is enabled.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`dayAlpha`](GeoImageryBaseOptions.md#dayalpha)

***

### format?

> `optional` **format?**: `string`

Image format, defaults to "image/png"

***

### layers

> **layers**: `string`

Comma-separated list of layer names

***

### nightAlpha?

> `optional` **nightAlpha?**: `number`

Nighttime area transparency (0 ~ 1). Takes effect when Earth lighting is enabled.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`nightAlpha`](GeoImageryBaseOptions.md#nightalpha)

***

### show?

> `optional` **show?**: `boolean`

Whether to show this layer, defaults to true

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`show`](GeoImageryBaseOptions.md#show)

***

### styles?

> `optional` **styles?**: `string`

Custom style name

***

### transparent?

> `optional` **transparent?**: `boolean`

Whether transparent, defaults to true

***

### type

> **type**: [`WMS`](../enums/GeoImageryType.md#wms)

Layer type: WMS

***

### url

> **url**: `string`

WMS service URL

***

### version?

> `optional` **version?**: `string`

WMS version, defaults to "1.1.1"
