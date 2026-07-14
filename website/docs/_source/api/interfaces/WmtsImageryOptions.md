[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / WmtsImageryOptions

# Interface: WmtsImageryOptions

WMTS 影像配置

## Extends

- [`GeoImageryBaseOptions`](GeoImageryBaseOptions.md)

## Properties

### alpha?

> `optional` **alpha?**: `number`

图层透明度（0 ~ 1），默认 1

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`alpha`](GeoImageryBaseOptions.md#alpha)

***

### brightness?

> `optional` **brightness?**: `number`

图层亮度，默认 1。

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`brightness`](GeoImageryBaseOptions.md#brightness)

***

### colorToAlpha?

> `optional` **colorToAlpha?**: `Color`

与该颜色接近的像素将变为透明，可用于去除带底色的叠加瓦片背景。

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`colorToAlpha`](GeoImageryBaseOptions.md#colortoalpha)

***

### colorToAlphaThreshold?

> `optional` **colorToAlphaThreshold?**: `number`

颜色转透明的 RGB 通道容差（0 ~ 1），默认 0.004。

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`colorToAlphaThreshold`](GeoImageryBaseOptions.md#colortoalphathreshold)

***

### contrast?

> `optional` **contrast?**: `number`

图层对比度，默认 1。

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`contrast`](GeoImageryBaseOptions.md#contrast)

***

### dayAlpha?

> `optional` **dayAlpha?**: `number`

白昼区域透明度（0 ~ 1）。启用地球光照时生效。

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`dayAlpha`](GeoImageryBaseOptions.md#dayalpha)

***

### format?

> `optional` **format?**: `string`

影像格式，默认 "image/png"

***

### layer

> **layer**: `string`

图层名称

***

### maxLevel?

> `optional` **maxLevel?**: `number`

最大层级，默认 18

***

### minLevel?

> `optional` **minLevel?**: `number`

最小层级，默认 0

***

### nightAlpha?

> `optional` **nightAlpha?**: `number`

夜间区域透明度（0 ~ 1）。启用地球光照时生效。

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`nightAlpha`](GeoImageryBaseOptions.md#nightalpha)

***

### show?

> `optional` **show?**: `boolean`

是否显示该图层，默认 true

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`show`](GeoImageryBaseOptions.md#show)

***

### style?

> `optional` **style?**: `string`

样式名称，默认 "default"

***

### subdomains?

> `optional` **subdomains?**: `string`[]

子域名列表，用于 {s} 变量

***

### tileMatrixSetID

> **tileMatrixSetID**: `string`

瓦片矩阵集 ID

***

### type

> **type**: [`WMTS`](../enums/GeoImageryType.md#wmts)

图层类型：WMTS

***

### url

> **url**: `string`

WMTS 服务地址
