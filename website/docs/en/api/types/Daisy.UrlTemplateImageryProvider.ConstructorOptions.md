[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [UrlTemplateImageryProvider](../modules/Daisy.UrlTemplateImageryProvider.md) / ConstructorOptions

# Type Alias: ConstructorOptions

> **ConstructorOptions** = `{ url: Resource \| string }`

Initialization options for the UrlTemplateImageryProvider constructor

## Properties

### credit?

> `optional` **credit?**: [`Credit`](../classes/Daisy.Credit.md) \| `string`

A credit for the data source, which is displayed on the canvas.

***

### customTags?

> `optional` **customTags?**: `any`

Allow to replace custom keywords in the URL template. The object must have strings as keys and functions as values.

***

### ellipsoid?

> `optional` **ellipsoid?**: [`Ellipsoid`](../classes/Daisy.Ellipsoid.md)

The ellipsoid. If the tilingScheme is specified,
 this parameter is ignored and the tiling scheme's ellipsoid is used instead. If neither
 parameter is specified, the WGS84 ellipsoid is used.

***

### enablePickFeatures?

> `optional` **enablePickFeatures?**: `boolean`

If true, [UrlTemplateImageryProvider#pickFeatures](../classes/Daisy.UrlTemplateImageryProvider.md#pickfeatures) will
 request the `pickFeaturesUrl` and attempt to interpret the features included in the response. If false,
 [UrlTemplateImageryProvider#pickFeatures](../classes/Daisy.UrlTemplateImageryProvider.md#pickfeatures) will immediately return undefined (indicating no pickable
 features) without communicating with the server. Set this property to false if you know your data
 source does not support picking features or if you don't want this provider's features to be pickable. Note
 that this can be dynamically overridden by modifying the UriTemplateImageryProvider#enablePickFeatures
 property.

***

### getFeatureInfoFormats?

> `optional` **getFeatureInfoFormats?**: `GetFeatureInfoFormat`[]

The formats in which to get feature information at a
 specific location when [UrlTemplateImageryProvider#pickFeatures](../classes/Daisy.UrlTemplateImageryProvider.md#pickfeatures) is invoked. If this
 parameter is not specified, feature picking is disabled.

***

### hasAlphaChannel?

> `optional` **hasAlphaChannel?**: `boolean`

true if the images provided by this imagery provider
 include an alpha channel; otherwise, false. If this property is false, an alpha channel, if
 present, will be ignored. If this property is true, any images without an alpha channel will
 be treated as if their alpha is 1.0 everywhere. When this property is false, memory usage
 and texture upload time are potentially reduced.

***

### maximumLevel?

> `optional` **maximumLevel?**: `number`

The maximum level-of-detail supported by the imagery provider, or undefined if there is no limit.

***

### minimumLevel?

> `optional` **minimumLevel?**: `number`

The minimum level-of-detail supported by the imagery provider. Take care when specifying
 this that the number of tiles at the minimum level is small, such as four or less. A larger number is likely
 to result in rendering problems.

***

### pickFeaturesUrl?

> `optional` **pickFeaturesUrl?**: `Resource` \| `string`

The URL template to use to pick features. If this property is not specified,
 [UrlTemplateImageryProvider#pickFeatures](../classes/Daisy.UrlTemplateImageryProvider.md#pickfeatures) will immediately returned undefined, indicating no
 features picked. The URL template supports all of the keywords supported by the `url`
 parameter, plus the following:

- `{i}`: The pixel column (horizontal coordinate) of the picked position, where the Westernmost pixel is 0.
- `{j}`: The pixel row (vertical coordinate) of the picked position, where the Northernmost pixel is 0.
- `{reverseI}`: The pixel column (horizontal coordinate) of the picked position, where the Easternmost pixel is 0.
- `{reverseJ}`: The pixel row (vertical coordinate) of the picked position, where the Southernmost pixel is 0.
- `{longitudeDegrees}`: The longitude of the picked position in degrees.
- `{latitudeDegrees}`: The latitude of the picked position in degrees.
- `{longitudeProjected}`: The longitude of the picked position in the projected coordinates of the tiling scheme.
- `{latitudeProjected}`: The latitude of the picked position in the projected coordinates of the tiling scheme.
- `{format}`: The format in which to get feature information, as specified in the GetFeatureInfoFormat.


***

### rectangle?

> `optional` **rectangle?**: [`Rectangle`](../classes/Daisy.Rectangle.md)

The rectangle, in radians, covered by the image.

***

### subdomains?

> `optional` **subdomains?**: `string` \| `string`[]

The subdomains to use for the `{s}` placeholder in the URL template.
 If this parameter is a single string, each character in the string is a subdomain. If it is
 an array, each element in the array is a subdomain.

***

### tileDiscardPolicy?

> `optional` **tileDiscardPolicy?**: `TileDiscardPolicy`

A policy for discarding tile images according to some criteria

***

### tileHeight?

> `optional` **tileHeight?**: `number`

Pixel height of image tiles.

***

### tileWidth?

> `optional` **tileWidth?**: `number`

Pixel width of image tiles.

***

### tilingScheme?

> `optional` **tilingScheme?**: `TilingScheme`

The tiling scheme specifying how the ellipsoidal
surface is broken into tiles. If this parameter is not provided, a [WebMercatorTilingScheme](../classes/Daisy.WebMercatorTilingScheme.md)
is used.

***

### url

> **url**: `Resource` \| `string`

The URL template to use to request tiles. It has the following keywords:

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


***

### urlSchemeZeroPadding?

> `optional` **urlSchemeZeroPadding?**: `any`

Gets the URL scheme zero padding for each tile coordinate. The format is '000' where
each coordinate will be padded on the left with zeros to match the width of the passed string of zeros. e.g. Setting:
urlSchemeZeroPadding : { '{x}' : '0000'}
will cause an 'x' value of 12 to return the string '0012' for {x} in the generated URL.
It the passed object has the following keywords:

- `{z}`: The zero padding for the level of the tile in the tiling scheme.
- `{x}`: The zero padding for the tile X coordinate in the tiling scheme.
- `{y}`: The zero padding for the the tile Y coordinate in the tiling scheme.
- `{reverseX}`: The zero padding for the tile reverseX coordinate in the tiling scheme.
- `{reverseY}`: The zero padding for the tile reverseY coordinate in the tiling scheme.
- `{reverseZ}`: The zero padding for the reverseZ coordinate of the tile in the tiling scheme.

