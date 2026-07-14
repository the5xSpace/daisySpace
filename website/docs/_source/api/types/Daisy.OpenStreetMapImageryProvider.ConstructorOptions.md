[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [OpenStreetMapImageryProvider](../modules/Daisy.OpenStreetMapImageryProvider.md) / ConstructorOptions

# Type Alias: ConstructorOptions

> **ConstructorOptions** = `object`

Initialization options for the OpenStreetMapImageryProvider constructor

## Properties

### credit?

> `optional` **credit?**: [`Credit`](../classes/Daisy.Credit.md) \| `string`

A credit for the data source, which is displayed on the canvas.

***

### ellipsoid?

> `optional` **ellipsoid?**: [`Ellipsoid`](../classes/Daisy.Ellipsoid.md)

The ellipsoid. If not specified, the WGS84 ellipsoid is used.

***

### fileExtension?

> `optional` **fileExtension?**: `string`

The file extension for images on the server.

***

### maximumLevel?

> `optional` **maximumLevel?**: `number`

The maximum level-of-detail supported by the imagery provider, or undefined if there is no limit.

***

### minimumLevel?

> `optional` **minimumLevel?**: `number`

The minimum level-of-detail supported by the imagery provider.

***

### rectangle?

> `optional` **rectangle?**: [`Rectangle`](../classes/Daisy.Rectangle.md)

The rectangle of the layer.

***

### retinaTiles?

> `optional` **retinaTiles?**: `boolean`

When true, request tiles at the 2x resolution for retina displays.

***

### url?

> `optional` **url?**: `string`

The OpenStreetMap server url.
