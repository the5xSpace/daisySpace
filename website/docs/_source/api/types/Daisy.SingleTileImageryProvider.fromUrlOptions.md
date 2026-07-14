[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [SingleTileImageryProvider](../modules/Daisy.SingleTileImageryProvider.md) / fromUrlOptions

# Type Alias: fromUrlOptions

> **fromUrlOptions** = `object`

Initialization options for the SingleTileImageryProvider constructor when using SingleTileImageryProvider.fromUrl

## Properties

### credit?

> `optional` **credit?**: [`Credit`](../classes/Daisy.Credit.md) \| `string`

A credit for the data source, which is displayed on the canvas.

***

### ellipsoid?

> `optional` **ellipsoid?**: [`Ellipsoid`](../classes/Daisy.Ellipsoid.md)

The ellipsoid. If not specified, the WGS84 ellipsoid is used.

***

### rectangle?

> `optional` **rectangle?**: [`Rectangle`](../classes/Daisy.Rectangle.md)

The rectangle, in radians, covered by the image.
