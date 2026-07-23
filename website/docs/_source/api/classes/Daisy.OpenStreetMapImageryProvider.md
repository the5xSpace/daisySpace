[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / OpenStreetMapImageryProvider

# Class: OpenStreetMapImageryProvider

An imagery provider that provides tiled imagery hosted by OpenStreetMap
or another provider of Slippy tiles. The default url connects to OpenStreetMap's volunteer-run
servers, so you must conform to their
[Usage Policy](http://wiki.openstreetmap.org/wiki/Tile_usage_policy|Tile).

## Example

```ts
const osm = new Daisy.OpenStreetMapImageryProvider({
 url : 'https://tile.openstreetmap.org/'
});
```

## Param

**options**

Object describing initialization options

## Extends

- [`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md)

## Constructors

### Constructor

> **new OpenStreetMapImageryProvider**(`options`): `OpenStreetMapImageryProvider`

#### Parameters

##### options

[`ConstructorOptions`](../types/Daisy.OpenStreetMapImageryProvider.ConstructorOptions.md)

#### Returns

`OpenStreetMapImageryProvider`

#### Overrides

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`constructor`](Daisy.UrlTemplateImageryProvider.md#constructor)

## Properties

### credit

> `readonly` **credit**: [`Credit`](Daisy.Credit.md)

Gets the credit to display when this imagery provider is active. Typically this is used to credit
the source of the imagery.

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`credit`](Daisy.UrlTemplateImageryProvider.md#credit)

***

### enablePickFeatures

> **enablePickFeatures**: `boolean`

Gets or sets a value indicating whether feature picking is enabled. If true, [UrlTemplateImageryProvider#pickFeatures](Daisy.UrlTemplateImageryProvider.md#pickfeatures) will
request the `options.pickFeaturesUrl` and attempt to interpret the features included in the response. If false,
[UrlTemplateImageryProvider#pickFeatures](Daisy.UrlTemplateImageryProvider.md#pickfeatures) will immediately return undefined (indicating no pickable
features) without communicating with the server. Set this property to false if you know your data
source does not support picking features or if you don't want this provider's features to be pickable.

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`enablePickFeatures`](Daisy.UrlTemplateImageryProvider.md#enablepickfeatures)

***

### errorEvent

> `readonly` **errorEvent**: `Event`

Gets an event that is raised when the imagery provider encounters an asynchronous error. By subscribing
to the event, you will be notified of the error and can potentially recover from it. Event listeners
are passed an instance of TileProviderError.

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`errorEvent`](Daisy.UrlTemplateImageryProvider.md#errorevent)

***

### hasAlphaChannel

> `readonly` **hasAlphaChannel**: `boolean`

Gets a value indicating whether or not the images provided by this imagery provider
include an alpha channel. If this property is false, an alpha channel, if present, will
be ignored. If this property is true, any images without an alpha channel will be treated
as if their alpha is 1.0 everywhere. When this property is false, memory usage
and texture upload time are reduced.

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`hasAlphaChannel`](Daisy.UrlTemplateImageryProvider.md#hasalphachannel)

***

### maximumLevel

> `readonly` **maximumLevel**: `number` \| `undefined`

Gets the maximum level-of-detail that can be requested, or undefined if there is no limit.

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`maximumLevel`](Daisy.UrlTemplateImageryProvider.md#maximumlevel)

***

### minimumLevel

> `readonly` **minimumLevel**: `number`

Gets the minimum level-of-detail that can be requested.

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`minimumLevel`](Daisy.UrlTemplateImageryProvider.md#minimumlevel)

***

### pickFeaturesUrl

> `readonly` **pickFeaturesUrl**: `string`

Gets the URL template to use to use to pick features. If this property is not specified,
[UrlTemplateImageryProvider#pickFeatures](Daisy.UrlTemplateImageryProvider.md#pickfeatures) will immediately return undefined, indicating no
features picked. The URL template supports all of the keywords supported by the
[UrlTemplateImageryProvider#url](#url) property, plus the following:

- `{i}`: The pixel column (horizontal coordinate) of the picked position, where the Westernmost pixel is 0.
- `{j}`: The pixel row (vertical coordinate) of the picked position, where the Northernmost pixel is 0.
- `{reverseI}`: The pixel column (horizontal coordinate) of the picked position, where the Easternmost pixel is 0.
- `{reverseJ}`: The pixel row (vertical coordinate) of the picked position, where the Southernmost pixel is 0.
- `{longitudeDegrees}`: The longitude of the picked position in degrees.
- `{latitudeDegrees}`: The latitude of the picked position in degrees.
- `{longitudeProjected}`: The longitude of the picked position in the projected coordinates of the tiling scheme.
- `{latitudeProjected}`: The latitude of the picked position in the projected coordinates of the tiling scheme.
- `{format}`: The format in which to get feature information, as specified in the GetFeatureInfoFormat.


#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`pickFeaturesUrl`](Daisy.UrlTemplateImageryProvider.md#pickfeaturesurl)

***

### proxy

> `readonly` **proxy**: `Proxy`

Gets the proxy used by this provider.

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`proxy`](Daisy.UrlTemplateImageryProvider.md#proxy)

***

### rectangle

> `readonly` **rectangle**: [`Rectangle`](Daisy.Rectangle.md)

Gets the rectangle, in radians, of the imagery provided by this instance.

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`rectangle`](Daisy.UrlTemplateImageryProvider.md#rectangle)

***

### tileDiscardPolicy

> `readonly` **tileDiscardPolicy**: `TileDiscardPolicy`

Gets the tile discard policy. If not undefined, the discard policy is responsible
for filtering out "missing" tiles via its shouldDiscardImage function. If this function
returns undefined, no tiles are filtered.

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`tileDiscardPolicy`](Daisy.UrlTemplateImageryProvider.md#tilediscardpolicy)

***

### tileHeight

> `readonly` **tileHeight**: `number`

Gets the height of each tile, in pixels.

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`tileHeight`](Daisy.UrlTemplateImageryProvider.md#tileheight)

***

### tileWidth

> `readonly` **tileWidth**: `number`

Gets the width of each tile, in pixels.

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`tileWidth`](Daisy.UrlTemplateImageryProvider.md#tilewidth)

***

### tilingScheme

> `readonly` **tilingScheme**: `TilingScheme`

Gets the tiling scheme used by this provider.

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`tilingScheme`](Daisy.UrlTemplateImageryProvider.md#tilingscheme)

***

### url

> `readonly` **url**: `string`

Gets the URL template to use to request tiles. It has the following keywords:

- `{z}`: The level of the tile in the tiling scheme. Level zero is the root of the quadtree pyramid.
- `{x}`: The tile X coordinate in the tiling scheme, where 0 is the Westernmost tile.
- `{y}`: The tile Y coordinate in the tiling scheme, where 0 is the Northernmost tile.
- `{s}`: One of the available subdomains, used to overcome browser limits on the number of simultaneous requests per host.
- `{reverseX}`: The tile X coordinate in the tiling scheme, where 0 is the Easternmost tile.
- `{reverseY}`: The tile Y coordinate in the tiling scheme, where 0 is the Southernmost tile.
- `{reverseZ}`: The level of the tile in the tiling scheme, where level zero is the maximum level of the quadtree pyramid. In order to use reverseZ, maximumLevel must be defined.
- `{westDegrees}`: The Western edge of the tile in geodetic degrees.
- `{southDegrees}`: The Southern edge of the tile in geodetic degrees.
- `{eastDegrees}`: The Eastern edge of the tile in geodetic degrees.
- `{northDegrees}`: The Northern edge of the tile in geodetic degrees.
- `{westProjected}`: The Western edge of the tile in projected coordinates of the tiling scheme.
- `{southProjected}`: The Southern edge of the tile in projected coordinates of the tiling scheme.
- `{eastProjected}`: The Eastern edge of the tile in projected coordinates of the tiling scheme.
- `{northProjected}`: The Northern edge of the tile in projected coordinates of the tiling scheme.
- `{width}`: The width of each tile in pixels.
- `{height}`: The height of each tile in pixels.


#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`url`](Daisy.UrlTemplateImageryProvider.md#url)

***

### urlSchemeZeroPadding

> `readonly` **urlSchemeZeroPadding**: `any`

Gets the URL scheme zero padding for each tile coordinate. The format is '000' where each coordinate will be padded on
the left with zeros to match the width of the passed string of zeros. e.g. Setting:
urlSchemeZeroPadding : { '{x}' : '0000'}
will cause an 'x' value of 12 to return the string '0012' for {x} in the generated URL.
It has the following keywords:

- `{z}`: The zero padding for the level of the tile in the tiling scheme.
- `{x}`: The zero padding for the tile X coordinate in the tiling scheme.
- `{y}`: The zero padding for the the tile Y coordinate in the tiling scheme.
- `{reverseX}`: The zero padding for the tile reverseX coordinate in the tiling scheme.
- `{reverseY}`: The zero padding for the tile reverseY coordinate in the tiling scheme.
- `{reverseZ}`: The zero padding for the reverseZ coordinate of the tile in the tiling scheme.


#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`urlSchemeZeroPadding`](Daisy.UrlTemplateImageryProvider.md#urlschemezeropadding)

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

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`getTileCredits`](Daisy.UrlTemplateImageryProvider.md#gettilecredits)

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
 It may also be undefined if picking is not supported.

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`pickFeatures`](Daisy.UrlTemplateImageryProvider.md#pickfeatures)

***

### requestImage()

> **requestImage**(`x`, `y`, `level`, `request?`): `Promise`\<[`ImageryTypes`](../types/Daisy.ImageryTypes.md)\> \| `undefined`

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

#### Inherited from

[`UrlTemplateImageryProvider`](Daisy.UrlTemplateImageryProvider.md).[`requestImage`](Daisy.UrlTemplateImageryProvider.md#requestimage)
