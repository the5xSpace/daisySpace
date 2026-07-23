[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GeoTerrainOptions

# Type Alias: GeoTerrainOptions

> **GeoTerrainOptions** = \{ `type`: [`Ellipsoid`](../enums/GeoTerrainType.md#ellipsoid); \} \| \{ `assetId?`: `number`; `requestVertexNormals?`: `boolean`; `requestWaterMask?`: `boolean`; `type`: [`Ion`](../enums/GeoTerrainType.md#cesiumion); \} \| \{ `type`: [`ArcGis`](../enums/GeoTerrainType.md#arcgis); \} \| \{ `provider`: `any`; `type`: [`Custom`](../enums/GeoTerrainType.md#custom); \}

Terrain resource configuration.

## Union Members

### Type Literal

\{ `type`: [`Ellipsoid`](../enums/GeoTerrainType.md#ellipsoid); \}

#### type

> **type**: [`Ellipsoid`](../enums/GeoTerrainType.md#ellipsoid)

Terrain type: ellipsoid without elevation.

***

### Type Literal

\{ `assetId?`: `number`; `requestVertexNormals?`: `boolean`; `requestWaterMask?`: `boolean`; `type`: [`Ion`](../enums/GeoTerrainType.md#cesiumion); \}

#### assetId?

> `optional` **assetId?**: `number`

Cesium Ion terrain asset ID. Defaults to `1`.

#### requestVertexNormals?

> `optional` **requestVertexNormals?**: `boolean`

Whether to request terrain vertex normals. Terrain materials such as slope and aspect depend on this data. Defaults to `true`.

#### requestWaterMask?

> `optional` **requestWaterMask?**: `boolean`

Whether to request water mask. Defaults to `false`.

#### type

> **type**: [`Ion`](../enums/GeoTerrainType.md#cesiumion)

Terrain type: Cesium Ion asset.

***

### Type Literal

\{ `type`: [`ArcGis`](../enums/GeoTerrainType.md#arcgis); \}

#### type

> **type**: [`ArcGis`](../enums/GeoTerrainType.md#arcgis)

Terrain type: ArcGIS.

***

### Type Literal

\{ `provider`: `any`; `type`: [`Custom`](../enums/GeoTerrainType.md#custom); \}

#### provider

> **provider**: `any`

Custom terrain data source instance. Recommended for advanced users only.

#### type

> **type**: [`Custom`](../enums/GeoTerrainType.md#custom)

Terrain type: Custom.
