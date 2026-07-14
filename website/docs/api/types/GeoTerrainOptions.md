[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GeoTerrainOptions

# Type Alias: GeoTerrainOptions

> **GeoTerrainOptions** = \{ `type`: [`Ellipsoid`](../enums/GeoTerrainType.md#ellipsoid); \} \| \{ `assetId?`: `number`; `requestVertexNormals?`: `boolean`; `requestWaterMask?`: `boolean`; `type`: [`Ion`](../enums/GeoTerrainType.md#cesiumion); \} \| \{ `type`: [`ArcGis`](../enums/GeoTerrainType.md#arcgis); \} \| \{ `provider`: `any`; `type`: [`Custom`](../enums/GeoTerrainType.md#custom); \}

地形资源配置。

## Union Members

### Type Literal

\{ `type`: [`Ellipsoid`](../enums/GeoTerrainType.md#ellipsoid); \}

#### type

> **type**: [`Ellipsoid`](../enums/GeoTerrainType.md#ellipsoid)

地形类型：无高程的椭球体。

***

### Type Literal

\{ `assetId?`: `number`; `requestVertexNormals?`: `boolean`; `requestWaterMask?`: `boolean`; `type`: [`Ion`](../enums/GeoTerrainType.md#cesiumion); \}

#### assetId?

> `optional` **assetId?**: `number`

Ion 资产 地形资产 ID。默认 `1`。

#### requestVertexNormals?

> `optional` **requestVertexNormals?**: `boolean`

是否请求地形顶点法线。坡度、坡向等地形材质依赖该数据。默认 `true`。

#### requestWaterMask?

> `optional` **requestWaterMask?**: `boolean`

是否请求水陆遮罩。默认 `false`。

#### type

> **type**: [`Ion`](../enums/GeoTerrainType.md#cesiumion)

地形类型：Ion 资产。

***

### Type Literal

\{ `type`: [`ArcGis`](../enums/GeoTerrainType.md#arcgis); \}

#### type

> **type**: [`ArcGis`](../enums/GeoTerrainType.md#arcgis)

地形类型：ArcGIS

***

### Type Literal

\{ `provider`: `any`; `type`: [`Custom`](../enums/GeoTerrainType.md#custom); \}

#### provider

> **provider**: `any`

自定义地形数据源实例，仅建议高级用户使用。

#### type

> **type**: [`Custom`](../enums/GeoTerrainType.md#custom)

地形类型：自定义
