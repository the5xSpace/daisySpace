[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / NightTileLayerOptions

# Interface: NightTileLayerOptions

夜间瓦片图层配置。默认使用 Daisy 内置离线夜景瓦片。

## Properties

### alpha?

> `optional` **alpha?**: `number`

整体透明度，默认 1。

***

### brightness?

> `optional` **brightness?**: `number`

亮度，默认 1。

***

### contrast?

> `optional` **contrast?**: `number`

对比度，默认 1。

***

### dayAlpha?

> `optional` **dayAlpha?**: `number`

白昼区域透明度，默认 0。

***

### enableLighting?

> `optional` **enableLighting?**: `boolean`

是否自动启用地球光照，默认 true。

***

### id?

> `optional` **id?**: `string`

图层 ID。

***

### name?

> `optional` **name?**: `string`

图层名称。

***

### nightAlpha?

> `optional` **nightAlpha?**: `number`

夜间区域透明度，默认 1。

***

### show?

> `optional` **show?**: `boolean`

是否显示，默认 true。

***

### source?

> `optional` **source?**: [`GeoImageryOptions`](../types/GeoImageryOptions.md)

自定义瓦片源，默认使用 Daisy 内置离线夜景瓦片。
