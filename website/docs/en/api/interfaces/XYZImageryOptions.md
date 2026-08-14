[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / XYZImageryOptions

# Interface: XYZImageryOptions

XYZ tile imagery configuration.

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

Pixels close to this color will become transparent; useful for removing backgrounds from overlay tiles.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`colorToAlpha`](GeoImageryBaseOptions.md#colortoalpha)

***

### colorToAlphaThreshold?

> `optional` **colorToAlphaThreshold?**: `number`

RGB channel tolerance for color-to-transparency (0 ~ 1), default 0.004.

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

Daytime area opacity (0 ~ 1). Effective when Earth lighting is enabled.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`dayAlpha`](GeoImageryBaseOptions.md#dayalpha)

***

### maxLevel?

> `optional` **maxLevel?**: `number`

Maximum level, default 18

***

### minLevel?

> `optional` **minLevel?**: `number`

Minimum level, default 0

***

### nightAlpha?

> `optional` **nightAlpha?**: `number`

Nighttime area opacity (0 ~ 1). Effective when Earth lighting is enabled.

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`nightAlpha`](GeoImageryBaseOptions.md#nightalpha)

***

### show?

> `optional` **show?**: `boolean`

Whether to display this layer, default true

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`show`](GeoImageryBaseOptions.md#show)

***

### subdomains?

> `optional` **subdomains?**: `string`[]

Subdomain list, used for {s} variable

***

### tilingScheme?

> `optional` **tilingScheme?**: [`XYZImageryTilingScheme`](../types/XYZImageryTilingScheme.md)

Tiling scheme. Defaults to Web Mercator.
Geographic tiles usually cover the full -90° to 90° latitude range.

***

### type

> **type**: [`XYZ`](../enums/GeoImageryType.md#xyz)

Layer type: XYZ

***

### url

> **url**: `string`

Tile URL template
Supports {x} {y} {z} {s}
