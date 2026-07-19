---
title: Built-in Static Resources
---

# Built-in Static Resources

The `dist` directory of `daisy-space-sdk` contains not only JavaScript and type declarations, but also the Cesium files, Worker, imagery, models, and sample data required to run the engine. All built-in assets should be rooted at the SDK asset base URL and resolved with `Daisy.BuildModuleUrl.getUrl()`.

```typescript
import * as Daisy from "daisy-space-sdk"

const skyboxPositiveX = Daisy.BuildModuleUrl.getUrl(
    "sandAssets/SkyBox/gradient/px.jpg",
)
```

::: warning Do not use application-root paths
Do not write application-root paths such as `/sandAssets/...`, `/static/...`, or `/cesium/...`. These URLs bypass the SDK asset base URL and can lead to 404s or the wrong asset version when the application is deployed under a subdirectory, on a CDN, or into multiple isolated SDK directories.
:::

## Configure the Asset Base URL

The asset base URL must point to an HTTP-accessible copy of the SDK `dist` directory and must be set before calling `Engine.create()`. When copying the files, keep the internal `dist` directory structure intact and do not flatten the subdirectories into the application root.

```typescript
import * as Daisy from "daisy-space-sdk"

// 构建产物将 SDK dist 发布到了 /vendor/daisy/
Daisy.BuildModuleUrl.setBaseUrl("/vendor/daisy/")

const engine = await Daisy.Engine.create("daisyContainer")
```

When deploying on a CDN, use a separate SDK root directory as well:

```typescript
Daisy.BuildModuleUrl.setBaseUrl(
    "https://cdn.example.com/daisy-space-sdk/0.3.0/",
)
```

`BuildModuleUrl.getUrl()` accepts paths relative to that base URL; `http:`, `https:`, `data:`, and `blob:` URLs are returned unchanged. Prefer passing relative paths that do not start with `/` so the code clearly expresses that the asset belongs to the SDK.

> Build tools such as Vite and Webpack usually do not automatically publish non-JavaScript files from `node_modules/daisy-space-sdk/dist`. Applications need to map or copy the SDK `dist` directory to the same public location in both development and production builds. The SDK already includes the Cesium runtime, so business projects do not need `vite-plugin-cesium`, and they should not bring in a second copy of Cesium.

## Asset Directory Overview

The SDK currently includes the following asset root directories. Public assets can be referenced directly by business code; internal assets are managed by the engine; demo assets are only for examples and tests.

| Root Directory | Category | Purpose | Usage Constraints |
|------|------|------|------|
| `assets/` | SDK internal | Bundled chunks and compute Workers | File names include content hashes and can only be loaded by the SDK |
| `cesium/` | SDK internal | Cesium assets, Widgets, workers, styles, and runtime data | Used automatically by `Engine`; do not assemble internal file paths manually |
| `static/` | Public asset | Default imagery, night imagery, skyboxes, celestial textures, and common models | Use `BuildModuleUrl.getUrl()` |
| `models/` | Public asset | GLB sample models for spacecraft, vehicles, and ground facilities | Good for demos and prototypes; verify file names when upgrading the SDK |
| `data/` | Public asset | Country boundaries, land outlines, and population data | Load with the appropriate parser |
| `sandAssets/` | Public asset | Gradient skyboxes used by Playground | Usable in business scenarios, but verify file names when upgrading the SDK |
| `tileset/` | Public asset | Dragon sample 3D Tiles dataset | Load from `tileset/tileset.json` |
| `cache/` | Demo asset | Starlink demo cache and ephemeris text | Not a production data source or stable contract |
| `tests/` | Test asset | SDK automated test fixtures | Not for production features |

## Common Public Assets

### Earth and Night Imagery

`static/earth/` and `static/night/` are the SDK's built-in low-zoom XYZ tiles. They currently cover levels `0` through `3`, making them suitable for offline previews and default scenes, but not for high-resolution global basemaps.

```typescript
const earthUrl = Daisy.BuildModuleUrl.getUrl(
    "static/earth/{z}/{x}/{y}.jpg",
)
const nightUrl = Daisy.BuildModuleUrl.getUrl(
    "static/night/{z}/{x}/{y}.jpg",
)

engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: earthUrl,
    minLevel: 0,
    maxLevel: 3,
})
```

`static/assets/NaturalEarthII/` also provides a `0` through `2` level set of Natural Earth II tiles and `tilemapresource.xml`.

### Skyboxes

Each skybox includes six faces: `px`, `nx`, `py`, `ny`, `pz`, and `nz`.

| Path Pattern | Format | Description |
|------|------|------|
| `static/assets/SkyBox/default/{face}.png` | PNG | Daisy default skybox |
| `static/assets/SkyBox/cesium/{face}.jpg` | JPG | Cesium-style skybox |
| `sandAssets/SkyBox/gradient/{face}.jpg` | JPG | Playground gradient skybox |

```typescript
const skybox = (face: string) =>
    Daisy.BuildModuleUrl.getUrl(`sandAssets/SkyBox/gradient/${face}.jpg`)

engine.geoLayer.setSky({
    type: Daisy.GeoSkyType.SkyBox,
    sources: {
        positiveX: skybox("px"),
        negativeX: skybox("nx"),
        positiveY: skybox("py"),
        negativeY: skybox("ny"),
        positiveZ: skybox("pz"),
        negativeZ: skybox("nz"),
    },
})
```

### Celestial Textures and Common Models

| Asset Path | Purpose |
|------|------|
| `static/assets/moon/moon_2048x1024.jpg` | Moon surface texture |
| `static/assets/moon/moon_terrain_1440x720.jpg` | Moon terrain texture |
| `static/assets/moon/img.png` | Moon image asset |
| `static/assets/mars/mars_1920x960.png` | Mars surface texture |
| `static/assets/camera.glb`, `camera2.glb` | Camera models |
| `static/assets/radar0.glb` | Radar model |
| `static/assets/satellite0.glb`, `satellite1.glb` | Satellite models |
| `static/assets/satellite2.gltf`, `satellite3.gltf` | Satellite glTF models |
| `static/assets/rocket.png` | Rocket image |
| `static/assets/satellite0.png`, `moonSmall.jpg` | Icons and thumbnails |

```typescript
const moonTexture = Daisy.BuildModuleUrl.getUrl(
    "static/assets/moon/moon_2048x1024.jpg",
)
const marsTexture = Daisy.BuildModuleUrl.getUrl(
    "static/assets/mars/mars_1920x960.png",
)
const satelliteModel = Daisy.BuildModuleUrl.getUrl(
    "static/assets/satellite0.glb",
)
```

The `models/` directory also includes full GLB sample models such as Astronaut, CesiumMan, Hubble, Juno, ISS, a Mars rover, a deep-space network antenna, a drone, and a cargo ship. The reference pattern is the same, for example:

```typescript
const modelUrl = Daisy.BuildModuleUrl.getUrl(
    "models/InternationalSpaceStationISSA.glb",
)

entity.addFeature(new Daisy.ModelFeature({ url: modelUrl }))
```

These sample models are intended for quick scene setup, but their file names are not guaranteed to remain unchanged across SDK versions. If a production project depends on a specific model, pin the SDK version or manage the approved model and its license as part of your own asset pipeline.

### Data and 3D Tiles

| Asset Path | Content |
|------|------|
| `data/ne_110m_admin_0_countries.geojson` | 110m country boundaries |
| `data/ne_110m_land.geojson` | 110m land outline |
| `data/ne_50m_land.geojson` | 50m land outline |
| `data/population-global-360x180.bin` | Global population raster binary |
| `data/population-points.json` | Population point data |
| `tileset/tileset.json` | Entry point for the Dragon sample Tileset |

```typescript
const countriesUrl = Daisy.BuildModuleUrl.getUrl(
    "data/ne_110m_admin_0_countries.geojson",
)
const dragonTilesetUrl = Daisy.BuildModuleUrl.getUrl(
    "tileset/tileset.json",
)

entity.addFeature(new Daisy.TilesetFeature({
    url: dragonTilesetUrl,
}))
```

## SDK Internal Assets

`assets/` contains bundled chunks and Workers, while `cesium/` contains the static files for the underlying rendering runtime. Both asset groups must ship with the SDK, but business code should not reference specific files directly.

```typescript
// 正确：只设置 SDK 总资源基址
Daisy.BuildModuleUrl.setBaseUrl("/vendor/daisy/")

// 不要这样做：内部文件名和目录结构不属于稳定公共接口
// fetch("/cesium/approximateTerrainHeights.json")
// import("/assets/CoverageWorker.worker-Cn8q0X8o.js")
```

`Engine.create()` derives the underlying runtime directory from the SDK base URL. Unless you are diagnosing compatibility issues in an older release, do not call `Engine.setEngineBaseUrl()` separately to override the Cesium path.

## Demo and Test Assets

`cache/starlink-demo-cache.json`, `cache/starlink-ephemeris.txt`, and `tests/data/sample.czml` are included to reproduce examples and automated tests. They may change with the demos and should not be treated as a production data contract.

## Troubleshooting 404s

1. Print `Daisy.BuildModuleUrl.baseUrl` before creating the engine and confirm that it points to the published SDK `dist` root.
2. Use `Daisy.BuildModuleUrl.getUrl("cesium/approximateTerrainHeights.json")` to check the final URL, then open it directly in the browser.
3. Confirm that development and production builds use the same public-directory mapping and that all asset root directories were copied.
4. Confirm that you are not hardcoding `/sandAssets/`, `/static/`, or `/cesium/`.
5. When using a CDN, confirm that CORS headers, cache versioning, and the SDK JavaScript version all match.

> **Related APIs**: [BuildModuleUrl](/en/api/classes/BuildModuleUrl) · [Engine](/en/api/classes/Engine) · [ModelFeature](/en/api/classes/ModelFeature) · [TilesetFeature](/en/api/classes/TilesetFeature)
