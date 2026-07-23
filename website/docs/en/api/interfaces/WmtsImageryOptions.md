[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / WmtsImageryOptions

# Interface: WmtsImageryOptions

WMTS imagery configuration.

## Extends

- [`GeoImageryBaseOptions`](GeoImageryBaseOptions.md)

## Properties

### alpha?

> `optional` **alpha?**: `number`

Layer opacity (0 to 1); defaults to 1.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`alpha`](GeoImageryBaseOptions.md#alpha)

***

### brightness?

> `optional` **brightness?**: `number`

Layer brightness; defaults to 1.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`brightness`](GeoImageryBaseOptions.md#brightness)

***

### colorToAlpha?

> `optional` **colorToAlpha?**: `Color`

Pixels close to this color become transparent. Use this to remove the background from overlay tiles with a solid base color.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`colorToAlpha`](GeoImageryBaseOptions.md#colortoalpha)

***

### colorToAlphaThreshold?

> `optional` **colorToAlphaThreshold?**: `number`

RGB-channel tolerance for converting a color to transparency (0 to 1); defaults to 0.004.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`colorToAlphaThreshold`](GeoImageryBaseOptions.md#colortoalphathreshold)

***

### contrast?

> `optional` **contrast?**: `number`

Layer contrast; defaults to 1.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`contrast`](GeoImageryBaseOptions.md#contrast)

***

### dayAlpha?

> `optional` **dayAlpha?**: `number`

Opacity of the daylight region (0 to 1). Effective when globe lighting is enabled.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`dayAlpha`](GeoImageryBaseOptions.md#dayalpha)

***

### format?

> `optional` **format?**: `string`

Image format; defaults to "image/png".

***

### layer

> **layer**: `string`

Layer name.

***

### maxLevel?

> `optional` **maxLevel?**: `number`

Maximum level; defaults to 18.

***

### minLevel?

> `optional` **minLevel?**: `number`

Minimum level; defaults to 0.

***

### nightAlpha?

> `optional` **nightAlpha?**: `number`

Opacity of the nighttime region (0 to 1). Effective when globe lighting is enabled.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`nightAlpha`](GeoImageryBaseOptions.md#nightalpha)

***

### show?

> `optional` **show?**: `boolean`

Whether to show the layer; defaults to true.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`show`](GeoImageryBaseOptions.md#show)

***

### style?

> `optional` **style?**: `string`

Style name; defaults to "default".

***

### subdomains?

> `optional` **subdomains?**: `string`[]

List of subdomains used for the {s} variable.

***

### tileMatrixSetID

> **tileMatrixSetID**: `string`

Tile matrix set ID.

***

### type

> **type**: [`WMTS`](../enums/GeoImageryType.md#wmts)

Layer type: WMTS.

***

### url

> **url**: `string`

WMTS service URL.
