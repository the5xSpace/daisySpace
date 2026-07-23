[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / WebMapTileServiceImageryProvider

# Class: WebMapTileServiceImageryProvider

Provides tiled imagery served by [1.0.0](http://www.opengeospatial.org/standards/wmts|WMTS) compliant servers.
This provider supports HTTP KVP-encoded and RESTful GetTile requests, but does not yet support the SOAP encoding.

## Examples

```ts
// Example 1. USGS shaded relief tiles (KVP)
const shadedRelief1 = new Daisy.WebMapTileServiceImageryProvider({
 url : 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer/WMTS',
 layer : 'USGSShadedReliefOnly',
 style : 'default',
 format : 'image/jpeg',
 tileMatrixSetID : 'default028mm',
 // tileMatrixLabels : ['default028mm:0', 'default028mm:1', 'default028mm:2' ...],
 maximumLevel: 19,
 credit : new Daisy.Credit('U. S. Geological Survey')
});
viewer.imageryLayers.addImageryProvider(shadedRelief1);
```

```ts
// Example 2. USGS shaded relief tiles (RESTful)
const shadedRelief2 = new Daisy.WebMapTileServiceImageryProvider({
 url : 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer/WMTS/tile/1.0.0/USGSShadedReliefOnly/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg',
 layer : 'USGSShadedReliefOnly',
 style : 'default',
 format : 'image/jpeg',
 tileMatrixSetID : 'default028mm',
 maximumLevel: 19,
 credit : new Daisy.Credit('U. S. Geological Survey')
});
viewer.imageryLayers.addImageryProvider(shadedRelief2);
```

```ts
// Example 3. NASA time dynamic weather data (RESTful)
const times = Daisy.TimeIntervalCollection.fromIso8601({
 iso8601: '2015-07-30/2017-06-16/P1D',
 dataCallback: function dataCallback(interval, index) {
 return {
 Time: Daisy.JulianDate.toIso8601(interval.start)
 };
 }
});
const weather = new Daisy.WebMapTileServiceImageryProvider({
 url : 'https://gibs.earthdata.nasa.gov/wmts/epsg4326/best/AMSR2_Snow_Water_Equivalent/default/{Time}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png',
 layer : 'AMSR2_Snow_Water_Equivalent',
 style : 'default',
 tileMatrixSetID : '2km',
 maximumLevel : 5,
 format : 'image/png',
 clock: clock,
 times: times,
 credit : new Daisy.Credit('NASA Global Imagery Browse Services for EOSDIS')
});
viewer.imageryLayers.addImageryProvider(weather);
```

## Param

**options**

Object describing initialization options

## Constructors

### Constructor

> **new WebMapTileServiceImageryProvider**(`options`): `WebMapTileServiceImageryProvider`

#### Parameters

##### options

[`ConstructorOptions`](../types/Daisy.WebMapTileServiceImageryProvider.ConstructorOptions.md)

#### Returns

`WebMapTileServiceImageryProvider`

## Properties

### clock

> **clock**: `Clock`

Gets or sets a clock that is used to get keep the time used for time dynamic parameters.

***

### credit

> `readonly` **credit**: [`Credit`](Daisy.Credit.md)

Gets the credit to display when this imagery provider is active. Typically this is used to credit
the source of the imagery.

***

### dimensions

> **dimensions**: `any`

Gets or sets an object that contains static dimensions and their values.

***

### errorEvent

> `readonly` **errorEvent**: `Event`

Gets an event that is raised when the imagery provider encounters an asynchronous error. By subscribing
to the event, you will be notified of the error and can potentially recover from it. Event listeners
are passed an instance of TileProviderError.

***

### format

> `readonly` **format**: `string`

Gets the mime type of images returned by this imagery provider.

***

### hasAlphaChannel

> `readonly` **hasAlphaChannel**: `boolean`

Gets a value indicating whether or not the images provided by this imagery provider
include an alpha channel. If this property is false, an alpha channel, if present, will
be ignored. If this property is true, any images without an alpha channel will be treated
as if their alpha is 1.0 everywhere. When this property is false, memory usage
and texture upload time are reduced.

***

### maximumLevel

> `readonly` **maximumLevel**: `number` \| `undefined`

Gets the maximum level-of-detail that can be requested.

***

### minimumLevel

> `readonly` **minimumLevel**: `number`

Gets the minimum level-of-detail that can be requested.

***

### proxy

> `readonly` **proxy**: `Proxy`

Gets the proxy used by this provider.

***

### rectangle

> `readonly` **rectangle**: [`Rectangle`](Daisy.Rectangle.md)

Gets the rectangle, in radians, of the imagery provided by this instance.

***

### tileDiscardPolicy

> `readonly` **tileDiscardPolicy**: `TileDiscardPolicy`

Gets the tile discard policy. If not undefined, the discard policy is responsible
for filtering out "missing" tiles via its shouldDiscardImage function. If this function
returns undefined, no tiles are filtered.

***

### tileHeight

> `readonly` **tileHeight**: `number`

Gets the height of each tile, in pixels.

***

### tileWidth

> `readonly` **tileWidth**: `number`

Gets the width of each tile, in pixels.

***

### tilingScheme

> `readonly` **tilingScheme**: `TilingScheme`

Gets the tiling scheme used by this provider.

***

### times

> **times**: [`TimeIntervalCollection`](Daisy.TimeIntervalCollection.md)

Gets or sets a time interval collection that is used to get time dynamic parameters. The data of each
TimeInterval is an object containing the keys and values of the properties that are used during
tile requests.

***

### url

> `readonly` **url**: `string`

Gets the URL of the service hosting the imagery.

## Methods

### getTileCredits()

> **getTileCredits**(`x`, `y`, `level`): [`Credit`](Daisy.Credit.md)[]

Gets the credits to be displayed when a given tile is displayed.

#### Parameters

##### x

`number`

The tile X coordinate.

##### y

`number`

The tile Y coordinate.

##### level

`number`

The tile level;

#### Returns

[`Credit`](Daisy.Credit.md)[]

The credits to be displayed when the tile is displayed.

***

### pickFeatures()

> **pickFeatures**(`x`, `y`, `level`, `longitude`, `latitude`): `undefined`

Picking features is not currently supported by this imagery provider, so this function simply returns
undefined.

#### Parameters

##### x

`number`

The tile X coordinate.

##### y

`number`

The tile Y coordinate.

##### level

`number`

The tile level.

##### longitude

`number`

The longitude at which to pick features.

##### latitude

`number`

The latitude at which to pick features.

#### Returns

`undefined`

Undefined since picking is not supported.

***

### requestImage()

> **requestImage**(`x`, `y`, `level`, `request?`): `Promise`\<[`ImageryTypes`](../types/Daisy.ImageryTypes.md)\> \| `undefined`

Requests the image for a given tile.

#### Parameters

##### x

`number`

The tile X coordinate.

##### y

`number`

The tile Y coordinate.

##### level

`number`

The tile level.

##### request?

[`Request`](Daisy.Request.md)

The request object. Intended for internal use only.

#### Returns

`Promise`\<[`ImageryTypes`](../types/Daisy.ImageryTypes.md)\> \| `undefined`

A promise for the image that will resolve when the image is available, or
 undefined if there are too many active requests to the server, and the request should be retried later.
