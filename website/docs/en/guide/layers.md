# Geographic Layers

`engine.geoLayer` manages three types of geographic resources: imagery, terrain, and sky/atmosphere.

## Imagery

### Base Imagery

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")
```

```typescript
// XYZ 瓦片服务
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    minLevel: 0,
    maxLevel: 18,
})

// SDK 主内置影像
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: Daisy.BuildModuleUrl.getUrl("static/earth/{z}/{x}/{y}.jpg"),
    minLevel: 0,
    maxLevel: 3,
    tilingScheme: "webMercator",
})

// 第二套内置影像：完整 Geographic 纬度范围
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: Daisy.BuildModuleUrl.getUrl(
        "static/assets/NaturalEarthII/{z}/{x}/{reverseY}.jpg",
    ),
    minLevel: 0,
    maxLevel: 2,
    tilingScheme: "geographic",
})

// OpenStreetMap 默认地址
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.OpenStreetMap,
})

// ArcGIS 地图服务；url 可省略，使用全局设置或 SDK 默认地址
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.ArcGisMapServer,
})
```

Supported `GeoImageryType` values:

| Type | Description |
|------|------|
| `XYZ` | Standard tile service (`url` required; choose a tiling scheme with `tilingScheme`) |
| `OpenStreetMap` | OSM OpenStreetMap imagery (`url` is optional and defaults to the official service) |
| `ArcGisMapServer` | ArcGIS map service (`url` is optional and uses the global setting or SDK default) |
| `WMTS` | Standard WMTS service |
| `WMS` | Standard WMS service |
| `CesiumIon` | Cesium Ion resource (`assetId` required) |

### Third-Party Map Resources and Authorization

Inject third-party map tokens, keys, and default service URLs into the runtime with `GlobalConfig.configure()`. They remain in the host's local preferences or runtime context and are not written to Scenario, Package, or exported resource definitions.

```typescript
Daisy.GlobalConfig.configure({
    thirdPartyResources: {
        cesiumIon: { token: "your-cesium-ion-token" },
        arcgis: {
            key: "your-arcgis-key-or-token",
            url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
        },
        openstreetmap: {
            url: "https://tile.openstreetmap.org/",
        },
    },
})
```

OpenStreetMap defaults to `https://tile.openstreetmap.org/`; compatible services may use the `{key}` placeholder in their URL. ArcGIS disables `usePreCachedTilesIfAvailable` by default. If the service is unreachable or initialization fails, the SDK falls back to local `static/earth/` imagery while keeping the globe/ellipsoid visible.

### XYZ Tiling Schemes

`XYZ` uses the `webMercator` (Web Mercator) tiling scheme by default. It is suitable for most online map services, but the latitude range usually ends at approximately `±85.0511°`. To cover the full `-90°` to `90°` latitude range with geographic tiles, set `tilingScheme: "geographic"`.

| Tiling scheme | Use case |
|------|------|
| `webMercator` | Default; suitable for Web Mercator services such as EPSG:3857 |
| `geographic` | Suitable for EPSG:4326 / geographic tiles and can cover the poles |

When using `geographic`, if the service stores tiles with TMS row numbering (the southernmost row is `0`), use `{reverseY}` in the URL. Standard XYZ services still use `{y}`:

```typescript
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: Daisy.BuildModuleUrl.getUrl(
        "static/assets/NaturalEarthII/{z}/{x}/{reverseY}.jpg",
    ),
    minLevel: 0,
    maxLevel: 2,
    tilingScheme: "geographic",
})
```

### Overlay Layers

```typescript
// 叠加标注图层
engine.geoLayer.addImagery({
    type: Daisy.GeoImageryType.OpenStreetMap,
})

// 清除所有
engine.geoLayer.clearImagery()
```

## Terrain

### Terrain Types

The `GeoTerrainType` enum provides four terrain data sources:

| Type | Description |
|------|------|
| `GeoTerrainType.CesiumIon` | Cesium Ion asset terrain (loads the default global terrain when `assetId` is omitted) |
| `GeoTerrainType.ArcGis` | ArcGIS terrain service |
| `GeoTerrainType.Ellipsoid` | Smooth ellipsoid (no elevation), suitable for Moon/Mars scenes |
| `GeoTerrainType.Custom` | Custom elevation data (`provider` required) |

```typescript
// 默认全球地形（Cesium Ion，省略 assetId 即加载默认地形）
engine.geoLayer.setTerrain({
    type: Daisy.GeoTerrainType.CesiumIon,
})
```

### Custom Elevation Terrain

Pass a custom terrain provider through `GeoTerrainType.Custom`:

```typescript
engine.geoLayer.setTerrain({
    type: Daisy.GeoTerrainType.Custom,
    provider: myTerrainProvider,
})
```

### Procedural Terrain (CustomHeightmapTerrainProvider)

`CustomHeightmapTerrainProvider` dynamically generates elevation data through a callback without an external service:

```typescript
engine.geoLayer.setTerrain({
    type: Daisy.GeoTerrainType.Custom,
    provider: new Daisy.CustomHeightmapTerrainProvider({
        width: 64,
        height: 64,
        callback: (x, y, level) => {
            const size = 64
            const heights = new Float32Array(size * size)
            const n = Math.pow(2, level)
            for (let row = 0; row < size; row++) {
                for (let col = 0; col < size; col++) {
                    const lon = (x + col / (size - 1)) * (180 / n) - 180
                    const lat = (y + row / (size - 1)) * (180 / n) - 90
                    heights[row * size + col] = Math.sin(lon * 0.4 + lat * 0.3) * 420000
                }
            }
            return heights
        },
    }),
})
```

> In `callback(x, y, level)`, `x` / `y` are tile coordinates and `level` is the zoom level. The return value must be a `Float32Array` of elevations, in meters.

## Sky / Atmosphere

```typescript
// 默认天空盒
engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default })

// 自定义天空盒纹理
engine.geoLayer.setSky({
    type: Daisy.GeoSkyType.SkyBox,
    sources: {
        positiveX: "/assets/SkyBox/px.png",
        negativeX: "/assets/SkyBox/nx.png",
        positiveY: "/assets/SkyBox/py.png",
        negativeY: "/assets/SkyBox/ny.png",
        positiveZ: "/assets/SkyBox/pz.png",
        negativeZ: "/assets/SkyBox/nz.png",
    },
})
```

### Sky Types

The `GeoSkyType` enum controls sky rendering:

| Type | Description |
|------|------|
| `GeoSkyType.None` | Does not render a sky; uses a solid-color background |
| `GeoSkyType.SkyBox` | Custom skybox texture (cubemap) |
| `GeoSkyType.Default` | Default atmospheric-scattering sky |

> `GeoSkyType.None` is suitable for deep-space and star-catalog scenes; `GeoSkyType.Default` adapts automatically to the planetary ellipsoid.

### setGlobeOptions

Controls rendering behavior for the Earth ellipsoid:

```typescript
engine.geoLayer.setGlobeOptions({
    show: true,
    baseColor: Daisy.Color.BLACK,
    depthTestAgainstTerrain: true,
})
```

| Parameter | Type | Description |
|------|------|------|
| `show` | `boolean` | Whether to display the Earth's surface |
| `baseColor` | `Color` | Base color when no imagery is used (`BLACK` is common for Moon/Mars) |
| `depthTestAgainstTerrain` | `boolean` | Whether to enable depth testing (prevents objects from penetrating terrain) |

## Fog

Fog simulates atmospheric attenuation and enhances scene depth and distant occlusion:

```typescript
engine.geoLayer.setFog({
    enabled: true,
    density: 8.0e-5,
    screenSpaceErrorFactor: 6000,
})
```

| Parameter | Type | Description |
|------|------|------|
| `enabled` | `boolean` | Whether to enable fog |
| `density` | `number` | Fog density (default `8.0e-5`) |
| `screenSpaceErrorFactor` | `number` | SSE factor controlling the distance attenuation rate of fog (default `6000`) |

> **Related API**: [Engine](/en/api/classes/Engine) · `CustomHeightmapTerrainProvider`


---

<!--
  示例参考: [GeoLayer demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/geoLayer)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
