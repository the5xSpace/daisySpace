[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / CustomHeightmapTerrainProvider

# Class: CustomHeightmapTerrainProvider

A simple TerrainProvider that gets height values from a callback function.
It can be used for procedurally generated terrain or as a way to load custom
heightmap data without creating a subclass of TerrainProvider.

There are some limitations such as no water mask, no vertex normals, and no
availability, so a full-fledged TerrainProvider subclass is better suited
for these more sophisticated use cases.

## Example

```ts
const viewer = new Daisy.Viewer("cesiumContainer", {
 terrainProvider: new Daisy.CustomHeightmapTerrainProvider({
 width: 32,
 height: 32,
 callback: function (x, y, level) {
 return new Float32Array(32 * 32); // all zeros
 },
 }),
});
```

## Param

Object with the following properties:

## Param

The callback function for requesting tile geometry.

## Param

The number of columns per heightmap tile.

## Param

The number of rows per heightmap tile.

## Param

The tiling scheme specifying how the ellipsoidal
surface is broken into tiles. If this parameter is not provided, a GeographicTilingScheme
is used.

## Param

The ellipsoid. If the tilingScheme is specified,
this parameter is ignored and the tiling scheme's ellipsoid is used instead. If neither
parameter is specified, the default ellipsoid is used.

## Param

A credit for the data source, which is displayed on the canvas.

## Constructors

### Constructor

> **new CustomHeightmapTerrainProvider**(`options`): `CustomHeightmapTerrainProvider`

#### Parameters

##### options

###### callback

[`GeometryCallback`](../types/Daisy.CustomHeightmapTerrainProvider.GeometryCallback.md)

###### credit?

`string` \| [`Credit`](Daisy.Credit.md)

###### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

###### height

`number`

###### tilingScheme?

`TilingScheme`

###### width

`number`

#### Returns

`CustomHeightmapTerrainProvider`

## Properties

### availability

> `readonly` **availability**: `TileAvailability`

Gets an object that can be used to determine availability of terrain from this provider, such as
at points and in rectangles. This property may be undefined if availability
information is not available.

***

### credit

> `readonly` **credit**: [`Credit`](Daisy.Credit.md)

Gets the credit to display when this terrain provider is active. Typically this is used to credit
the source of the terrain.

***

### errorEvent

> `readonly` **errorEvent**: `Event`

Gets an event that is raised when the terrain provider encounters an asynchronous error. By subscribing
to the event, you will be notified of the error and can potentially recover from it. Event listeners
are passed an instance of TileProviderError.

***

### hasVertexNormals

> `readonly` **hasVertexNormals**: `boolean`

Gets a value indicating whether or not the requested tiles include vertex normals.
Vertex normals are not supported by CustomHeightmapTerrainProvider, so the return
value will always be false.

***

### hasWaterMask

> `readonly` **hasWaterMask**: `boolean`

Gets a value indicating whether or not the provider includes a water mask. The water mask
indicates which areas of the globe are water rather than land, so they can be rendered
as a reflective surface with animated waves.
Water mask is not supported by CustomHeightmapTerrainProvider, so the return
value will always be false.

***

### height

> `readonly` **height**: `boolean`

Gets the number of rows per heightmap tile.

***

### tilingScheme

> `readonly` **tilingScheme**: `TilingScheme`

Gets the tiling scheme used by this provider.

***

### width

> `readonly` **width**: `boolean`

Gets the number of columns per heightmap tile.

## Methods

### getLevelMaximumGeometricError()

> **getLevelMaximumGeometricError**(`level`): `number`

Gets the maximum geometric error allowed in a tile at a given level.

#### Parameters

##### level

`number`

The tile level for which to get the maximum geometric error.

#### Returns

`number`

The maximum geometric error.

***

### getTileDataAvailable()

> **getTileDataAvailable**(`x`, `y`, `level`): `boolean` \| `undefined`

Determines whether data for a tile is available to be loaded.

#### Parameters

##### x

`number`

The X coordinate of the tile for which to request geometry.

##### y

`number`

The Y coordinate of the tile for which to request geometry.

##### level

`number`

The level of the tile for which to request geometry.

#### Returns

`boolean` \| `undefined`

Undefined if not supported, otherwise true or false.

***

### loadTileDataAvailability()

> **loadTileDataAvailability**(`x`, `y`, `level`): `Promise`\<`void`\> \| `undefined`

Makes sure we load availability data for a tile

#### Parameters

##### x

`number`

The X coordinate of the tile for which to request geometry.

##### y

`number`

The Y coordinate of the tile for which to request geometry.

##### level

`number`

The level of the tile for which to request geometry.

#### Returns

`Promise`\<`void`\> \| `undefined`

Undefined if nothing need to be loaded or a Promise that resolves when all required tiles are loaded

***

### requestTileGeometry()

> **requestTileGeometry**(`x`, `y`, `level`, `request?`): `Promise`\<`TerrainData`\> \| `undefined`

Requests the geometry for a given tile. The result includes terrain
data and indicates that all child tiles are available.

#### Parameters

##### x

`number`

The X coordinate of the tile for which to request geometry.

##### y

`number`

The Y coordinate of the tile for which to request geometry.

##### level

`number`

The level of the tile for which to request geometry.

##### request?

[`Request`](Daisy.Request.md)

The request object. Intended for internal use only.

#### Returns

`Promise`\<`TerrainData`\> \| `undefined`

A promise for the requested geometry. If this method
 returns undefined instead of a promise, it is an indication that too many requests are already
 pending and the request will be retried later.
