[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ThirdPartyResourceOptions

# Interface: ThirdPartyResourceOptions

Global configuration for third-party map resources.

## Properties

### arcgis?

> `optional` **arcgis?**: `object`

ArcGIS resource configuration.

#### key?

> `optional` **key?**: `string`

ArcGIS access token or API key.

#### url?

> `optional` **url?**: `string`

Default ArcGIS MapServer URL.

***

### cesiumIon?

> `optional` **cesiumIon?**: `object`

Ion asset resource configuration.

#### token?

> `optional` **token?**: `string`

Ion asset access token.

***

### openstreetmap?

> `optional` **openstreetmap?**: `object`

OpenStreetMap or compatible OSM XYZ service configuration.

#### key?

> `optional` **key?**: `string`

Key required by a custom service; `{key}` in the URL template is replaced.

#### url?

> `optional` **url?**: `string`

Custom OSM service URL.
