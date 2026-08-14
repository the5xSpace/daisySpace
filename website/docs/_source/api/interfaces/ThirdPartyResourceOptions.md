[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ThirdPartyResourceOptions

# Interface: ThirdPartyResourceOptions

全局第三方地图资源配置。

## Properties

### arcgis?

> `optional` **arcgis?**: `object`

ArcGIS 资源配置。

#### key?

> `optional` **key?**: `string`

ArcGIS access token 或 API key。

#### url?

> `optional` **url?**: `string`

默认 ArcGIS MapServer 地址。

***

### cesiumIon?

> `optional` **cesiumIon?**: `object`

Ion 资产 资源配置。

#### token?

> `optional` **token?**: `string`

Ion 资产 access token。

***

### openstreetmap?

> `optional` **openstreetmap?**: `object`

OpenStreetMap 或兼容 OSM XYZ 服务配置。

#### key?

> `optional` **key?**: `string`

自定义服务所需的 key；URL 模板中的 `{key}` 会被替换。

#### url?

> `optional` **url?**: `string`

自定义 OSM 服务地址。
