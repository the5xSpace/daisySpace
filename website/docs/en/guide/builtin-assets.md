---
title: Built-In Static Assets
---

# Built-In Static Assets

In addition to JavaScript and type declarations, the `dist` directory of `daisy-space-sdk` contains the Cesium files, Workers, imagery, models, and sample data required by the engine. Treat the SDK asset base URL as the root for all built-in assets and generate URLs with `Daisy.BuildModuleUrl.getUrl()`.

```typescript
import * as Daisy from "daisy-space-sdk"

const skyboxPositiveX = Daisy.BuildModuleUrl.getUrl(
    "sandAssets/SkyBox/gradient/px.jpg",
)
```

::: warning Do not use application-root paths
Do not write application-root paths such as `/sandAssets/...`, `/static/...`, or `/cesium/...`. They bypass the SDK asset base URL and can cause 404 errors or load the wrong asset version when the application is deployed in a subdirectory, on a CDN, or with multiple isolated SDK directories.
:::

## Configure the Asset Base URL

The asset base URL must point to an HTTP-accessible copy of the SDK `dist` directory and must be set before `Engine.create()`. Preserve the directory structure inside `dist` when copying it; do not flatten the directories into the application root.

```typescript
import * as Daisy from "daisy-space-sdk"

// 构建产物将 SDK dist 发布到了 /vendor/daisy/
Daisy.BuildModuleUrl.setBaseUrl("/vendor/daisy/")

const engine = await Daisy.Engine.create("daisyContainer")
```

When deploying to a CDN, use a dedicated SDK root directory in the same way:

```typescript
Daisy.BuildModuleUrl.setBaseUrl(
    "https://cdn.example.com/daisy-space-sdk/0.3.0/",
)
```

`BuildModuleUrl.getUrl()` accepts a path relative to this root. `http:`, `https:`, `data:`, and `blob:` URLs are returned unchanged. Prefer relative paths that do not begin with `/`, so the code clearly expresses that the resource is built into the SDK.

> Build tools such as Vite and Webpack typically do not automatically publish non-JavaScript files from `node_modules/daisy-space-sdk/dist`. The application must map or copy the complete SDK `dist` directory to the same public directory in both development and production builds. The SDK already includes the Cesium runtime, so application projects do not need to install `vite-plugin-cesium` or add a separate Cesium copy.

## Asset Directory Overview

The SDK currently includes all of the following asset roots. Public assets can be referenced directly by applications, internal assets are managed by the engine, and demo assets are intended only for examples and tests.

| Root | Category | Purpose | Usage constraint |
|------|------|------|------|
| `assets/` | SDK internal | Built module chunks and compute Workers | Filenames include content hashes; load only through the SDK |
| `cesium/` | SDK internal | Cesium assets, Widgets, Workers, styles, and runtime data | Used automatically by `Engine`; do not construct internal file URLs |
| `static/` | Public | Default imagery, night imagery, skyboxes, celestial textures, and common models | Use `BuildModuleUrl.getUrl()` |
| `models/` | Public | GLB sample models for spacecraft, vehicles, ground facilities, and more | Suitable for demos and prototypes; verify filenames when upgrading the SDK |
| `data/` | Public | Country boundaries, land outlines, and population data | Read with a loader for the corresponding format |
| `sandAssets/` | Public | Gradient skybox used by the Playground | Can be used in applications; verify filenames when upgrading the SDK |
| `tileset/` | Public | Dragon sample 3D Tiles dataset | Load from `tileset/tileset.json` |
| `cache/` | Demo | Starlink demo cache and ephemeris text | Not an application data source or stable API |
| `tests/` | Test | SDK automated-test samples | Not for production features |

## Common Public Assets

### Earth and Night Imagery

`static/earth/` and `static/night/` are low-level XYZ tiles included with the SDK. They currently cover levels `0` through `3`, making them suitable for offline previews and default scenes but not for a high-resolution global basemap.

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

`static/assets/NaturalEarthII/` also provides Natural Earth II tiles for levels `0` through `2` and `tilemapresource.xml`.

### Skyboxes

Each skybox contains six faces: `px`, `nx`, `py`, `ny`, `pz`, and `nz`:

| Path pattern | Format | Description |
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

| Asset path | Use |
|------|------|
| `static/assets/moon/moon_2048x1024.jpg` | Moon surface texture |
| `static/assets/moon/moon_terrain_1440x720.jpg` | Moon terrain texture |
| `static/assets/moon/img.png` | Moon image asset |
| `static/assets/mars/mars_1920x960.png` | Mars surface texture |
| `static/assets/camera.glb`、`camera2.glb` | Camera models |
| `static/assets/radar0.glb` | Radar model |
| `static/assets/satellite0.glb`、`satellite1.glb` | Satellite models |
| `static/assets/satellite2.gltf`、`satellite3.gltf` | Satellite glTF models |
| `static/assets/rocket.png` | Rocket image |
| `static/assets/satellite0.png`、`moonSmall.jpg` | Icons and thumbnails |

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

The `models/` directory also contains complete GLB sample models including Astronaut, CesiumMan, Hubble, Juno, ISS, Mars rovers, deep-space network antennas, drones, and cargo ships. Reference them in the same way, for example:

```typescript
const modelUrl = Daisy.BuildModuleUrl.getUrl(
    "models/InternationalSpaceStationISSA.glb",
)

entity.addFeature(new Daisy.ModelFeature({ url: modelUrl }))
```

These sample models are intended for quickly assembling scenes, and filenames are not guaranteed to remain unchanged across SDK versions. If a production project depends on specific model content, pin the SDK version or manage a verified, licensed version of the model as an application asset.

### Data and 3D Tiles

| Asset path | Content |
|------|------|
| `data/ne_110m_admin_0_countries.geojson` | 110m country boundaries |
| `data/ne_110m_land.geojson` | 110m land outlines |
| `data/ne_50m_land.geojson` | 50m land outlines |
| `data/population-global-360x180.bin` | Global population raster binary data |
| `data/population-points.json` | Population point data |
| `tileset/tileset.json` | Dragon sample Tileset entry point |

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

`assets/` contains bundled chunks and Workers, while `cesium/` contains static files for the underlying rendering runtime. Both asset groups must be published with the SDK, but application code should not reference individual files directly.

```typescript
// 正确：只设置 SDK 总资源基址
Daisy.BuildModuleUrl.setBaseUrl("/vendor/daisy/")

// 不要这样做：内部文件名和目录结构不属于稳定公共接口
// fetch("/cesium/approximateTerrainHeights.json")
// import("/assets/CoverageWorker.worker-Cn8q0X8o.js")
```

`Engine.create()` derives the underlying runtime directory from the SDK asset base URL. Do not call `Engine.setEngineBaseUrl()` separately to override the Cesium path unless troubleshooting compatibility with an old version.

## Demo and Test Assets

`cache/starlink-demo-cache.json`, `cache/starlink-ephemeris.txt`, and `tests/data/sample.czml` are included to reproduce examples and run automated tests. They may change with the demos and should not be treated as production data contracts.

## Troubleshooting 404 Errors

1. Before creating the engine, print `Daisy.BuildModuleUrl.baseUrl` and confirm that it points to the published SDK `dist` root.
2. Use `Daisy.BuildModuleUrl.getUrl("cesium/approximateTerrainHeights.json")` to inspect the final URL and open it directly in a browser.
3. Confirm that the development server and production build use the same public-directory mapping and that all asset roots were copied.
4. Confirm that `/sandAssets/`, `/static/`, and `/cesium/` are not hard-coded.
5. When using a CDN, confirm that CORS headers, cache versions, and the SDK JavaScript version are consistent.

> **Related API**: [BuildModuleUrl](/en/api/classes/BuildModuleUrl) · [Engine](/en/api/classes/Engine) · [ModelFeature](/en/api/classes/ModelFeature) · [TilesetFeature](/en/api/classes/TilesetFeature)
