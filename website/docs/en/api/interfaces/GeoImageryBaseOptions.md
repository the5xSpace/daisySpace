[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GeoImageryBaseOptions

# Interface: GeoImageryBaseOptions

影像通用参数。

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

图层透明度（0 ~ 1），默认 1

***

### brightness?

> `optional` **brightness?**: `number`

图层亮度，默认 1。

***

### colorToAlpha?

> `optional` **colorToAlpha?**: `Color`

与该颜色接近的像素将变为透明，可用于去除带底色的叠加瓦片背景。

***

### colorToAlphaThreshold?

> `optional` **colorToAlphaThreshold?**: `number`

颜色转透明的 RGB 通道容差（0 ~ 1），默认 0.004。

***

### contrast?

> `optional` **contrast?**: `number`

图层对比度，默认 1。

***

### dayAlpha?

> `optional` **dayAlpha?**: `number`

白昼区域透明度（0 ~ 1）。启用地球光照时生效。

***

### nightAlpha?

> `optional` **nightAlpha?**: `number`

夜间区域透明度（0 ~ 1）。启用地球光照时生效。

***

### show?

> `optional` **show?**: `boolean`

是否显示该图层，默认 true
