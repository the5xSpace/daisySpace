[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [SingleTileImageryProvider](../modules/Daisy.SingleTileImageryProvider.md) / ConstructorOptions

# Type Alias: ConstructorOptions

> **ConstructorOptions** = `{ url: Resource \| string }`

Initialization options for the SingleTileImageryProvider constructor

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

***

### tileHeight?

> `optional` **tileHeight?**: `number`

The height of the tile, in pixels.

***

### tileWidth?

> `optional` **tileWidth?**: `number`

The width of the tile, in pixels.

***

### url

> **url**: `Resource` \| `string`

The url for the tile.
