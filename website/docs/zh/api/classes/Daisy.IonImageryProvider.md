[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / IonImageryProvider

# Class: IonImageryProvider


To construct a IonImageryProvider, call [IonImageryProvider.fromAssetId](#fromassetid). Do not call the constructor directly.


Provides tiled imagery using the ion REST API.

## Example

```ts
const imageryLayer = Daisy.ImageryLayer.fromProviderAsync(Daisy.IonImageryProvider.fromAssetId(3812));
viewer.imageryLayers.add(imageryLayer);
```

## Param

**options**

Object describing initialization options

## Constructors

### Constructor

> **new IonImageryProvider**(`options?`): `IonImageryProvider`

#### Parameters

##### options?

[`ConstructorOptions`](../types/Daisy.IonImageryProvider.ConstructorOptions.md)

#### Returns

`IonImageryProvider`

## Properties

### credit

> `readonly` **credit**: [`Credit`](Daisy.Credit.md)

Gets the credit to display when this imagery provider is active. Typically this is used to credit
the source of the imagery.

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

### maximumLevel

> `readonly` **maximumLevel**: `number` \| `undefined`

Gets the maximum level-of-detail that can be requested.

***

### minimumLevel

> `readonly` **minimumLevel**: `number`

Gets the minimum level-of-detail that can be requested. Generally,
a minimum level should only be used when the rectangle of the imagery is small
enough that the number of tiles at the minimum level is small. An imagery
provider with more than a few tiles at the minimum level will lead to
rendering problems.

***

### proxy

> `readonly` **proxy**: `Proxy`

Gets the proxy used by this provider.

***

### rectangle

> `readonly` **rectangle**: [`Rectangle`](Daisy.Rectangle.md)

Gets the rectangle, in radians, of the imagery provided by the instance.

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

Gets the tiling scheme used by the provider.

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
a tile. This function is optional, so it may not exist on all ImageryProviders.

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
 It may also be undefined if picking is not supported.

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

### fromAssetId()

> `static` **fromAssetId**(`assetId`, `options?`): `Promise`\<`IonImageryProvider`\>

Creates a provider for tiled imagery using the ion REST API.

#### Parameters

##### assetId

`number`

An ion imagery asset ID.

##### options?

[`ConstructorOptions`](../types/Daisy.IonImageryProvider.ConstructorOptions.md)

Object describing initialization options.

#### Returns

`Promise`\<`IonImageryProvider`\>

A promise which resolves to the created IonImageryProvider.

#### Example

```ts
const imageryLayer = Daisy.ImageryLayer.fromProviderAsync(Daisy.IonImageryProvider.fromAssetId(3812));
viewer.imageryLayers.add(imageryLayer);
```
