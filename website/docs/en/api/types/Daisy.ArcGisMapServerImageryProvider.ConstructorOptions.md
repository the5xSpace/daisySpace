[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [ArcGisMapServerImageryProvider](../modules/Daisy.ArcGisMapServerImageryProvider.md) / ConstructorOptions

# Type Alias: ConstructorOptions

> **ConstructorOptions** = `object`

Initialization options for the ArcGisMapServerImageryProvider constructor

## Properties

### credit?

> `optional` **credit?**: [`Credit`](../classes/Daisy.Credit.md) \| `string`

A credit for the data source, which is displayed on the canvas. This parameter is ignored when accessing a tiled server.

***

### ellipsoid?

> `optional` **ellipsoid?**: [`Ellipsoid`](../classes/Daisy.Ellipsoid.md)

The ellipsoid. If the tilingScheme is specified and used,
 this parameter is ignored and the tiling scheme's ellipsoid is used instead. If neither
 parameter is specified, the default ellipsoid is used.

***

### enablePickFeatures?

> `optional` **enablePickFeatures?**: `boolean`

If true, [ArcGisMapServerImageryProvider#pickFeatures](../classes/Daisy.ArcGisMapServerImageryProvider.md#pickfeatures) will invoke
 the Identify service on the MapServer and return the features included in the response. If false,
 [ArcGisMapServerImageryProvider#pickFeatures](../classes/Daisy.ArcGisMapServerImageryProvider.md#pickfeatures) will immediately return undefined (indicating no pickable features)
 without communicating with the server. Set this property to false if you don't want this provider's features to
 be pickable. Can be overridden by setting the [ArcGisMapServerImageryProvider#enablePickFeatures](../classes/Daisy.ArcGisMapServerImageryProvider.md#enablepickfeatures) property on the object.

***

### layers?

> `optional` **layers?**: `string`

A comma-separated list of the layers to show, or undefined if all layers should be shown.

***

### maximumLevel?

> `optional` **maximumLevel?**: `number`

The maximum tile level to request, or undefined if there is no maximum. This parameter is ignored when accessing
 a tiled server.

***

### rectangle?

> `optional` **rectangle?**: [`Rectangle`](../classes/Daisy.Rectangle.md)

The rectangle of the layer. This parameter is ignored when accessing
 a tiled layer.

***

### tileDiscardPolicy?

> `optional` **tileDiscardPolicy?**: `TileDiscardPolicy`

The policy that determines if a tile
 is invalid and should be discarded. If this value is not specified, a default
 DiscardMissingTileImagePolicy is used for tiled map servers, and a
 NeverTileDiscardPolicy is used for non-tiled map servers. In the former case,
 we request tile 0,0 at the maximum tile level and check pixels (0,0), (200,20), (20,200),
 (80,110), and (160, 130). If all of these pixels are transparent, the discard check is
 disabled and no tiles are discarded. If any of them have a non-transparent color, any
 tile that has the same values in these pixel locations is discarded. The end result of
 these defaults should be correct tile discarding for a standard ArcGIS Server. To ensure
 that no tiles are discarded, construct and pass a NeverTileDiscardPolicy for this
 parameter.

***

### tileHeight?

> `optional` **tileHeight?**: `number`

The height of each tile in pixels. This parameter is ignored when accessing a tiled server.

***

### tileWidth?

> `optional` **tileWidth?**: `number`

The width of each tile in pixels. This parameter is ignored when accessing a tiled server.

***

### tilingScheme?

> `optional` **tilingScheme?**: `TilingScheme`

The tiling scheme to use to divide the world into tiles.
 This parameter is ignored when accessing a tiled server.

***

### usePreCachedTilesIfAvailable?

> `optional` **usePreCachedTilesIfAvailable?**: `boolean`

If true, the server's pre-cached
 tiles are used if they are available. Exporting Tiles is only supported with deprecated APIs.
