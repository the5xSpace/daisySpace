[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / WebMapServiceImageryProvider

# Class: WebMapServiceImageryProvider

Provides tiled imagery hosted by a Web Map Service (WMS) server.

## Example

```ts
// WMS servers operated by the US government https://apps.nationalmap.gov/services/
const provider = new Daisy.WebMapServiceImageryProvider({
 url : 'https://basemap.nationalmap.gov:443/arcgis/services/USGSHydroCached/MapServer/WMSServer',
 layers : '0',
 proxy: new Daisy.DefaultProxy('/proxy/')
});
const imageryLayer = new Daisy.ImageryLayer(provider);
viewer.imageryLayers.add(imageryLayer);
```

## Param

Object describing initialization options

## Constructors

### Constructor

> **new WebMapServiceImageryProvider**(`options`): `WebMapServiceImageryProvider`

#### Parameters

##### options

[`ConstructorOptions`](../types/Daisy.WebMapServiceImageryProvider.ConstructorOptions.md)

#### Returns

`WebMapServiceImageryProvider`

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

### enablePickFeatures

> **enablePickFeatures**: `boolean`

Gets or sets a value indicating whether feature picking is enabled. If true, [WebMapServiceImageryProvider#pickFeatures](#pickfeatures) will
invoke the `GetFeatureInfo` service on the WMS server and attempt to interpret the features included in the response. If false,
[WebMapServiceImageryProvider#pickFeatures](#pickfeatures) will immediately return undefined (indicating no pickable
features) without communicating with the server. Set this property to false if you know your data
source does not support picking features or if you don't want this provider's features to be pickable.

***

### errorEvent

> `readonly` **errorEvent**: `Event`

Gets an event that is raised when the imagery provider encounters an asynchronous error. By subscribing
to the event, you will be notified of the error and can potentially recover from it. Event listeners
are passed an instance of TileProviderError.

***

### getFeatureInfoUrl

> `readonly` **getFeatureInfoUrl**: `string` \| `Resource`

Gets the getFeatureInfo URL of the WMS server.

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

> `readonly` **layers**: `string`

Gets the names of the WMS layers, separated by commas.

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

Gets the URL of the WMS server.

***

### DefaultParameters

> `readonly` `static` **DefaultParameters**: `any`

The default parameters to include in the WMS URL to obtain images. The values are as follows:
 service=WMS
 version=1.1.1
 request=GetMap
 styles=
 format=image/jpeg

***

### GetFeatureInfoDefaultParameters

> `readonly` `static` **GetFeatureInfoDefaultParameters**: `any`

The default parameters to include in the WMS URL to get feature information. The values are as follows:
 service=WMS
 version=1.1.1
 request=GetFeatureInfo

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
