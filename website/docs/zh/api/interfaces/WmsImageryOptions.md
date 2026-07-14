[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / WmsImageryOptions

# Interface: WmsImageryOptions

WMS 影像配置

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

### layers

> **layers**: `string`

图层名称列表（逗号分隔）

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

### styles?

> `optional` **styles?**: `string`

自定义样式名称

***

### transparent?

> `optional` **transparent?**: `boolean`

是否透明，默认 true

***

### type

> **type**: [`WMS`](../enums/GeoImageryType.md#wms)

图层类型：WMS

***

### url

> **url**: `string`

WMS 服务地址

***

### version?

> `optional` **version?**: `string`

WMS 版本，默认 "1.1.1"
