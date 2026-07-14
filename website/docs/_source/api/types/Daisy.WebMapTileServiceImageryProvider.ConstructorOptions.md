[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [WebMapTileServiceImageryProvider](../modules/Daisy.WebMapTileServiceImageryProvider.md) / ConstructorOptions

# Type Alias: ConstructorOptions

> **ConstructorOptions** = `{ layer: string; style: string; tileMatrixSetID: string; url: Resource \| string }`

Initialization options for the WebMapTileServiceImageryProvider constructor

## Properties

### clock?

> `optional` **clock?**: `Clock`

A Clock instance that is used when determining the value for the time dimension. Required when `times` is specified.

***

### credit?

> `optional` **credit?**: [`Credit`](../classes/Daisy.Credit.md) \| `string`

A credit for the data source, which is displayed on the canvas.

***

### dimensions?

> `optional` **dimensions?**: `any`

A object containing static dimensions and their values.

***

### ellipsoid?

> `optional` **ellipsoid?**: [`Ellipsoid`](../classes/Daisy.Ellipsoid.md)

The ellipsoid. If not specified, the WGS84 ellipsoid is used.

***

### format?

> `optional` **format?**: `string`

The MIME type for images to retrieve from the server.

***

### layer

> **layer**: `string`

The layer name for WMTS requests.

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

The rectangle covered by the layer.

***

### style

> **style**: `string`

The style name for WMTS requests.

***

### subdomains?

> `optional` **subdomains?**: `string` \| `string`[]

The subdomains to use for the `{s}` placeholder in the URL template.
 If this parameter is a single string, each character in the string is a subdomain. If it is
 an array, each element in the array is a subdomain.

***

### tileHeight?

> `optional` **tileHeight?**: `number`

The tile height in pixels.

***

### tileMatrixLabels?

> `optional` **tileMatrixLabels?**: `any`[]

A list of identifiers in the TileMatrix to use for WMTS requests, one per TileMatrix level.

***

### tileMatrixSetID

> **tileMatrixSetID**: `string`

The identifier of the TileMatrixSet to use for WMTS requests.

***

### tileWidth?

> `optional` **tileWidth?**: `number`

The tile width in pixels.

***

### tilingScheme?

> `optional` **tilingScheme?**: `TilingScheme`

The tiling scheme corresponding to the organization of the tiles in the TileMatrixSet.

***

### times?

> `optional` **times?**: [`TimeIntervalCollection`](../classes/Daisy.TimeIntervalCollection.md)

TimeIntervalCollection with its `data` property being an object containing time dynamic dimension and their values.

***

### url

> **url**: `Resource` \| `string`

The base URL for the WMTS GetTile operation (for KVP-encoded requests) or the tile-URL template (for RESTful requests). The tile-URL template should contain the following variables: &#123;style&#125;, &#123;TileMatrixSet&#125;, &#123;TileMatrix&#125;, &#123;TileRow&#125;, &#123;TileCol&#125;. The first two are optional if actual values are hardcoded or not required by the server. The &#123;s&#125; keyword may be used to specify subdomains.
