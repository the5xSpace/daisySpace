[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / IonImageryOptions

# Interface: IonImageryOptions

Ion 资产 影像资源配置。

## Extends

- [`GeoImageryBaseOptions`](GeoImageryBaseOptions.md)

## Properties

### alpha?

> `optional` **alpha?**: `number`

图层透明度（0 ~ 1），默认 1

#### Inherited from

[`GeoImageryBaseOptions`](GeoImageryBaseOptions.md).[`alpha`](GeoImageryBaseOptions.md#alpha)

***

### assetId

> **assetId**: `number`

Ion 资产 影像资产 ID，例如 `2` 表示 底层 World Imagery。

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

### type

> **type**: [`Ion`](../enums/GeoImageryType.md#cesiumion)

图层类型：Ion 资产。
