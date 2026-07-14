[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / ArcGisMapServerImageryProvider

# Class: ArcGisMapServerImageryProvider


This object is normally not instantiated directly, use [ArcGisMapServerImageryProvider.fromBasemapType](#frombasemaptype) or [ArcGisMapServerImageryProvider.fromUrl](#fromurl).


Provides tiled imagery hosted by an ArcGIS MapServer. By default, the server's pre-cached tiles are
used, if available.




An [ArcGIS Access Token](https://developers.arcgis.com/documentation/mapping-apis-and-services/security|) is required to authenticate requests to an ArcGIS Image Tile service.
To access secure ArcGIS resources, it's required to create an ArcGIS developer
account or an ArcGIS online account, then implement an authentication method to obtain an access token.

## Examples

```ts
// Set the default access token for accessing ArcGIS Image Tile service
Daisy.ArcGisMapService.defaultAccessToken = "<ArcGIS Access Token>";

// Add a base layer from a default ArcGIS basemap
const viewer = new Daisy.Viewer("cesiumContainer", {
 baseLayer: Daisy.ImageryLayer.fromProviderAsync(
 Daisy.ArcGisMapServerImageryProvider.fromBasemapType(
 Daisy.ArcGisBaseMapType.SATELLITE
 )
 ),
});
```

```ts
// Create an imagery provider from the url directly
const esri = await Daisy.ArcGisMapServerImageryProvider.fromUrl(
 "https://ibasemaps-api.arcgis.com/arcgis/rest/services/World_Imagery/MapServer", {
 token: "<ArcGIS Access Token>"
});
```

## Param

Object describing initialization options

## Constructors

### Constructor

> **new ArcGisMapServerImageryProvider**(`options?`): `ArcGisMapServerImageryProvider`

#### Parameters

##### options?

[`ConstructorOptions`](../types/Daisy.ArcGisMapServerImageryProvider.ConstructorOptions.md)

#### Returns

`ArcGisMapServerImageryProvider`

## Properties

### credit

> `readonly` **credit**: [`Credit`](Daisy.Credit.md)

Gets the credit to display when this imagery provider is active. Typically this is used to credit
the source of the imagery.

***

### enablePickFeatures

> **enablePickFeatures**: `boolean`

Gets or sets a value indicating whether feature picking is enabled. If true, [ArcGisMapServerImageryProvider#pickFeatures](#pickfeatures) will
invoke the "identify" operation on the ArcGIS server and return the features included in the response. If false,
[ArcGisMapServerImageryProvider#pickFeatures](#pickfeatures) will immediately return undefined (indicating no pickable features)
without communicating with the server.

***

### errorEvent

> `readonly` **errorEvent**: `Event`

Gets an event that is raised when the imagery provider encounters an asynchronous error. By subscribing
to the event, you will be notified of the error and can potentially recover from it. Event listeners
are passed an instance of TileProviderError.

***

### hasAlphaChannel

> `readonly` **hasAlphaChannel**: `boolean`

Gets a value indicating whether or not the images provided by this imagery provider
include an alpha channel. If this property is false, an alpha channel, if present, will
be ignored. If this property is true, any images without an alpha channel will be treated
as if their alpha is 1.0 everywhere. When this property is false, memory usage
and texture upload time are reduced.

***

### layers

> **layers**: `string`

Gets the comma-separated list of layer IDs to show.

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

### token

> `readonly` **token**: `string`

Gets the ArcGIS token used to authenticate with the ArcGis MapServer service.

***

### url

> `readonly` **url**: `string`

Gets the URL of the ArcGIS MapServer.

***

### usingPrecachedTiles

> `readonly` **usingPrecachedTiles**: `boolean`

Gets a value indicating whether this imagery provider is using pre-cached tiles from the
ArcGIS MapServer.

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

> **pickFeatures**(`x`, `y`, `level`, `longitude`, `latitude`): `Promise`\<`ImageryLayerFeatureInfo`[]\> \| `undefined`

/**
Asynchronously determines what features, if any, are located at a given longitude and latitude within
a tile.

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

`Promise`\<`ImageryLayerFeatureInfo`[]\> \| `undefined`

A promise for the picked features that will resolve when the asynchronous
 picking completes. The resolved value is an array of ImageryLayerFeatureInfo
 instances. The array may be empty if no features are found at the given location.

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

***

### fromBasemapType()

> `static` **fromBasemapType**(`style`, `options?`): `Promise`\<`ArcGisMapServerImageryProvider`\>

Creates an [ImageryProvider](Daisy.ImageryProvider.md) which provides tiled imagery from an ArcGIS base map.

#### Parameters

##### style

`ArcGisBaseMapType`

The style of the ArcGIS base map imagery. Valid options are ArcGisBaseMapType.SATELLITE, ArcGisBaseMapType.OCEANS, and ArcGisBaseMapType.HILLSHADE.

##### options?

[`ConstructorOptions`](../types/Daisy.ArcGisMapServerImageryProvider.ConstructorOptions.md)

Object describing initialization options.

#### Returns

`Promise`\<`ArcGisMapServerImageryProvider`\>

A promise that resolves to the created ArcGisMapServerImageryProvider.

#### Examples

```ts
// Set the default access token for accessing ArcGIS Image Tile service
Daisy.ArcGisMapService.defaultAccessToken = "<ArcGIS Access Token>";

// Add a base layer from a default ArcGIS basemap
const provider = await Daisy.ArcGisMapServerImageryProvider.fromBasemapType(
 Daisy.ArcGisBaseMapType.SATELLITE);
```

```ts
// Add a base layer from a default ArcGIS Basemap
const viewer = new Daisy.Viewer("cesiumContainer", {
 baseLayer: Daisy.ImageryLayer.fromProviderAsync(
 Daisy.ArcGisMapServerImageryProvider.fromBasemapType(
 Daisy.ArcGisBaseMapType.HILLSHADE, {
 token: "<ArcGIS Access Token>"
 }
 )
 ),
});
```

***

### fromUrl()

> `static` **fromUrl**(`url`, `options?`): `Promise`\<`ArcGisMapServerImageryProvider`\>

Creates an [ImageryProvider](Daisy.ImageryProvider.md) which provides tiled imagery hosted by an ArcGIS MapServer. By default, the server's pre-cached tiles are
used, if available.

#### Parameters

##### url

`string` \| `Resource`

The URL of the ArcGIS MapServer service.

##### options?

[`ConstructorOptions`](../types/Daisy.ArcGisMapServerImageryProvider.ConstructorOptions.md)

Object describing initialization options.

#### Returns

`Promise`\<`ArcGisMapServerImageryProvider`\>

A promise that resolves to the created ArcGisMapServerImageryProvider.

#### Example

```ts
const esri = await Daisy.ArcGisMapServerImageryProvider.fromUrl(
 "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
);
```
