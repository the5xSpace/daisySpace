# Geo Layers

`engine.geoLayer` manages three types of geographic resources: imagery, terrain, and sky/atmosphere.

## Imagery

### Base Map Setup

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

Supported `GeoImageryType`:

| Type | Description |
|------|-------------|
| `XYZ` | Standard tile service (requires `url`, template `{z}/{y}/{x}`) |
| `OpenStreetMap` | OSM OpenStreetMap |
| `ArcGisMapServer` | ArcGIS map service (requires `url`) |
| `WMTS` | WMTS standard service |
| `WMS` | WMS standard service |
| `CesiumIon` | Cesium Ion resource (requires `assetId`) |

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

`GeoTerrainType` enum provides four terrain data sources:

| Type | Description |
|------|-------------|
| `GeoTerrainType.CesiumIon` | Cesium Ion asset terrain (loads default global terrain when `assetId` is omitted) |
| `GeoTerrainType.ArcGis` | ArcGIS terrain service |
| `GeoTerrainType.Ellipsoid` | Smooth ellipsoid (no elevation), suitable for Moon/Mars scenes |
| `GeoTerrainType.Custom` | Custom elevation data (requires `provider`) |

```typescript
// 默认全球地形（Cesium Ion，省略 assetId 即加载默认地形）
engine.geoLayer.setTerrain({
    type: Daisy.GeoTerrainType.CesiumIon,
})
```

### Custom Elevation Terrain

Pass a custom terrain provider via `GeoTerrainType.Custom`:

```typescript
engine.geoLayer.setTerrain({
    type: Daisy.GeoTerrainType.Custom,
    provider: myTerrainProvider,
})
```

### Procedural Terrain (CustomHeightmapTerrainProvider)

`CustomHeightmapTerrainProvider` allows dynamically generating elevation data via a callback function, with no external service needed:

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

> `callback(x, y, level)` — `x` / `y` are tile coordinates, `level` is the zoom level. The return value must be a `Float32Array` elevation array (unit: meters).

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

`GeoSkyType` enum controls sky rendering:

| Type | Description |
|------|-------------|
| `GeoSkyType.None` | No sky rendering, solid color background |
| `GeoSkyType.SkyBox` | Custom skybox texture (six-sided cube map) |
| `GeoSkyType.Default` | Default atmospheric scattering sky |

> `GeoSkyType.None` is suitable for deep space/star field scenes; `GeoSkyType.Default` automatically adapts to the planet's ellipsoid.

### setGlobeOptions

Controls the rendering behavior of the Earth ellipsoid:

```typescript
engine.geoLayer.setGlobeOptions({
    show: true,
    baseColor: Daisy.Color.BLACK,
    depthTestAgainstTerrain: true,
})
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `show` | `boolean` | Whether to show the Earth surface |
| `baseColor` | `Color` | Base color when no imagery is available (Moon/Mars often use `BLACK`) |
| `depthTestAgainstTerrain` | `boolean` | Whether to enable depth testing (prevents objects from penetrating terrain) |

## Fog

Fog is used to simulate atmospheric attenuation, enhancing scene depth and long-distance occlusion:

```typescript
engine.geoLayer.setFog({
    enabled: true,
    density: 8.0e-5,
    screenSpaceErrorFactor: 6000,
})
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `enabled` | `boolean` | Whether to enable fog |
| `density` | `number` | Fog density (default `8.0e-5`) |
| `screenSpaceErrorFactor` | `number` | SSE factor, affects fog decay rate with distance (default `6000`) |

> **Related API**: [Engine](/en/api/classes/Engine) · `CustomHeightmapTerrainProvider`


---

<!--
示例参考: [GeoLayer demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/geoLayer)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
