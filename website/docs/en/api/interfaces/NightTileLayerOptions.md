[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / NightTileLayerOptions

# Interface: NightTileLayerOptions

Night tile layer configuration. Uses Daisy's built-in offline night tiles by default.

## Properties

### alpha?

> `optional` **alpha?**: `number`

Overall opacity, default 1.

***

### brightness?

> `optional` **brightness?**: `number`

Brightness, default 1.

***

### contrast?

> `optional` **contrast?**: `number`

Contrast, default 1.

***

### dayAlpha?

> `optional` **dayAlpha?**: `number`

Daytime region opacity, default 0.

***

### enableLighting?

> `optional` **enableLighting?**: `boolean`

Whether to automatically enable Earth lighting, default true.

***

### id?

> `optional` **id?**: `string`

Layer ID.

***

### name?

> `optional` **name?**: `string`

Layer name.

***

### nightAlpha?

> `optional` **nightAlpha?**: `number`

Nighttime region opacity, default 1.

***

### show?

> `optional` **show?**: `boolean`

Whether to show, default true.

***

### source?

> `optional` **source?**: [`GeoImageryOptions`](../types/GeoImageryOptions.md)

Custom tile source, uses Daisy's built-in offline night tiles by default.
