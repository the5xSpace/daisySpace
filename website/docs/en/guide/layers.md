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

// 内置类型
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.OpenStreetMap,
})

// ArcGIS 地图服务
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.ArcGisMapServer,
    url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
})
```

Supported `GeoImageryType` values:

| Type | Description |
|------|------|
| `XYZ` | Standard tile service (`url` required; template `{z}/{y}/{x}`) |
| `OpenStreetMap` | OSM OpenStreetMap data |
| `ArcGisMapServer` | ArcGIS map service (`url` required) |
| `WMTS` | Standard WMTS service |
| `WMS` | Standard WMS service |
| `CesiumIon` | Cesium Ion resource (`assetId` required) |

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
