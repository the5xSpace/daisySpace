[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / SingleTileImageryProvider

# Class: SingleTileImageryProvider

Provides a single, top-level imagery tile. The single image is assumed to be in
the Geographic projection (i.e. WGS84 / EPSG:4326),
and will be rendered using a GeographicTilingScheme.

## Param

**options**

Object describing initialization options

## Constructors

### Constructor

> **new SingleTileImageryProvider**(`options`): `SingleTileImageryProvider`

#### Parameters

##### options

[`ConstructorOptions`](../types/Daisy.SingleTileImageryProvider.ConstructorOptions.md)

#### Returns

`SingleTileImageryProvider`

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

### url

> `readonly` **url**: `string`

Gets the URL of the single, top-level imagery tile.

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

The resolved image

***

### fromUrl()

> `static` **fromUrl**(`url`, `options?`): `Promise`\<`SingleTileImageryProvider`\>

Creates a provider for a single, top-level imagery tile. The single image is assumed to use a

#### Parameters

##### url

`string` \| `Resource`

The url for the tile

##### options?

[`fromUrlOptions`](../types/Daisy.SingleTileImageryProvider.fromUrlOptions.md)

Object describing initialization options.

#### Returns

`Promise`\<`SingleTileImageryProvider`\>

The resolved SingleTileImageryProvider.

#### Example

```ts
const provider = await SingleTileImageryProvider.fromUrl("https://yoururl.com/image.png");
```
