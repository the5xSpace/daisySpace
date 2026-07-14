[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [WebMapServiceImageryProvider](../modules/Daisy.WebMapServiceImageryProvider.md) / ConstructorOptions

# Type Alias: ConstructorOptions

> **ConstructorOptions** = `{ layers: string; url: Resource \| string }`

Initialization options for the WebMapServiceImageryProvider constructor

## Properties

### clock?

> `optional` **clock?**: `Clock`

A Clock instance that is used when determining the value for the time dimension. Required when `times` is specified.

***

### credit?

> `optional` **credit?**: [`Credit`](../classes/Daisy.Credit.md) \| `string`

A credit for the data source, which is displayed on the canvas.

***

### crs?

> `optional` **crs?**: `string`

CRS specification, for use with WMS specification >= 1.3.0.

***

### ellipsoid?

> `optional` **ellipsoid?**: [`Ellipsoid`](../classes/Daisy.Ellipsoid.md)

The ellipsoid. If the tilingScheme is specified,
 this parameter is ignored and the tiling scheme's ellipsoid is used instead. If neither
 parameter is specified, the WGS84 ellipsoid is used.

***

### enablePickFeatures?

> `optional` **enablePickFeatures?**: `boolean`

If true, [WebMapServiceImageryProvider#pickFeatures](../classes/Daisy.WebMapServiceImageryProvider.md#pickfeatures) will invoke
 the GetFeatureInfo operation on the WMS server and return the features included in the response. If false,
 [WebMapServiceImageryProvider#pickFeatures](../classes/Daisy.WebMapServiceImageryProvider.md#pickfeatures) will immediately return undefined (indicating no pickable features)
 without communicating with the server. Set this property to false if you know your WMS server does not support
 GetFeatureInfo or if you don't want this provider's features to be pickable. Note that this can be dynamically
 overridden by modifying the WebMapServiceImageryProvider#enablePickFeatures property.

***

### getFeatureInfoFormats?

> `optional` **getFeatureInfoFormats?**: `GetFeatureInfoFormat`[]

The formats
 in which to try WMS GetFeatureInfo requests.

***

### getFeatureInfoParameters?

> `optional` **getFeatureInfoParameters?**: `any`

Additional parameters to pass to the WMS server in the GetFeatureInfo URL.

***

### getFeatureInfoUrl?

> `optional` **getFeatureInfoUrl?**: `Resource` \| `string`

The getFeatureInfo URL of the WMS service. If the property is not defined then we use the property value of url.

***

### layers

> **layers**: `string`

The layers to include, separated by commas.

***

### maximumLevel?

> `optional` **maximumLevel?**: `number`

The maximum level-of-detail supported by the imagery provider, or undefined if there is no limit.
 If not specified, there is no limit.

***

### minimumLevel?

> `optional` **minimumLevel?**: `number`

The minimum level-of-detail supported by the imagery provider. Take care when
 specifying this that the number of tiles at the minimum level is small, such as four or less. A larger number is
 likely to result in rendering problems.

***

### parameters?

> `optional` **parameters?**: `any`

Additional parameters to pass to the WMS server in the GetMap URL.

***

### rectangle?

> `optional` **rectangle?**: [`Rectangle`](../classes/Daisy.Rectangle.md)

The rectangle of the layer.

***

### srs?

> `optional` **srs?**: `string`

SRS specification, for use with WMS specification 1.1.0 or 1.1.1

***

### subdomains?

> `optional` **subdomains?**: `string` \| `string`[]

The subdomains to use for the `{s}` placeholder in the URL template.
 If this parameter is a single string, each character in the string is a subdomain. If it is
 an array, each element in the array is a subdomain.

***

### tileHeight?

> `optional` **tileHeight?**: `number`

The height of each tile in pixels.

***

### tileWidth?

> `optional` **tileWidth?**: `number`

The width of each tile in pixels.

***

### tilingScheme?

> `optional` **tilingScheme?**: `TilingScheme`

The tiling scheme to use to divide the world into tiles.

***

### times?

> `optional` **times?**: [`TimeIntervalCollection`](../classes/Daisy.TimeIntervalCollection.md)

TimeIntervalCollection with its data property being an object containing time dynamic dimension and their values.

***

### url

> **url**: `Resource` \| `string`

The URL of the WMS service. The URL supports the same keywords as the [UrlTemplateImageryProvider](../classes/Daisy.UrlTemplateImageryProvider.md).
