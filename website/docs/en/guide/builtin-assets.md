---
title: 内置静态资源
---

# 内置静态资源

`daisy-space-sdk` 的 `dist` 目录除了 JavaScript 和类型声明，还包含引擎运行所需的 Cesium 文件、Worker、影像、模型和示例数据。所有内置资源都应以 SDK 的资源基址为根，通过 `Daisy.BuildModuleUrl.getUrl()` 生成 URL。

```typescript
import * as Daisy from "daisy-space-sdk"

const skyboxPositiveX = Daisy.BuildModuleUrl.getUrl(
    "sandAssets/SkyBox/gradient/px.jpg",
)
```

::: warning 不要使用应用根路径
不要写 `/sandAssets/...`、`/static/...`、`/cesium/...` 等应用根路径。这些地址会绕过 SDK 资源基址，在应用部署到子目录、CDN 或多个 SDK 隔离目录时产生 404 或加载到错误版本的资源。
:::

## 配置资源基址

资源基址必须指向可通过 HTTP 访问的 SDK `dist` 副本，并在 `Engine.create()` 之前设置。复制时保留 `dist` 内部目录结构，不要把各目录拍平到应用根目录。

```typescript
import * as Daisy from "daisy-space-sdk"

// 构建产物将 SDK dist 发布到了 /vendor/daisy/
Daisy.BuildModuleUrl.setBaseUrl("/vendor/daisy/")

const engine = await Daisy.Engine.create("daisyContainer")
```

部署在 CDN 时同样使用一个独立的 SDK 根目录：

```typescript
Daisy.BuildModuleUrl.setBaseUrl(
    "https://cdn.example.com/daisy-space-sdk/0.3.0/",
)
```

`BuildModuleUrl.getUrl()` 接受相对于该根目录的路径；`http:`、`https:`、`data:` 和 `blob:` URL 会原样返回。建议传入不以 `/` 开头的相对路径，让代码清楚表达“这是 SDK 内置资源”。

> Vite、Webpack 等构建工具通常不会自动发布 `node_modules/daisy-space-sdk/dist` 中的非 JavaScript 文件。应用需要在开发服务和生产构建中将 SDK `dist` 完整映射或复制到同一个公开目录。SDK 已内置 Cesium 运行时，业务项目不需要安装 `vite-plugin-cesium`，也不应另行引入一份 Cesium。

## 资源目录总览

SDK 当前包含以下全部资源根目录。公开资源可供业务直接引用；内部资源由引擎管理；演示资源只用于示例和测试。

| 根目录 | 分类 | 用途 | 使用约束 |
|------|------|------|------|
| `assets/` | SDK 内部 | 构建后的模块分块与计算 Worker | 文件名带内容哈希，只能由 SDK 加载 |
| `cesium/` | SDK 内部 | Cesium Assets、Widgets、Workers、样式及运行时数据 | 由 `Engine` 自动使用，不要拼接内部文件地址 |
| `static/` | 公开资源 | 默认影像、夜景影像、天空盒、天体纹理及常用模型 | 使用 `BuildModuleUrl.getUrl()` |
| `models/` | 公开资源 | 航天器、车辆、地面设施等 GLB 示例模型 | 适合演示和原型，升级 SDK 时核对文件名 |
| `data/` | 公开资源 | 国家边界、陆地轮廓和人口数据 | 使用对应格式的加载器读取 |
| `sandAssets/` | 公开资源 | Playground 使用的渐变天空盒 | 可用于业务场景，但升级 SDK 时核对文件名 |
| `tileset/` | 公开资源 | Dragon 示例 3D Tiles 数据集 | 从 `tileset/tileset.json` 加载 |
| `cache/` | 演示资源 | Starlink 演示缓存与星历文本 | 不作为业务数据源或稳定接口 |
| `tests/` | 测试资源 | SDK 自动测试样例 | 不用于生产功能 |

## 常用公开资源

### 地球与夜景影像

`static/earth/` 和 `static/night/` 是 SDK 自带的低级别 XYZ 瓦片，当前覆盖 `0` 至 `3` 级，适合离线预览和默认场景，不是高分辨率全球底图。

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

`static/assets/NaturalEarthII/` 还提供一套 `0` 至 `2` 级的 Natural Earth II 瓦片及 `tilemapresource.xml`。

### 天空盒

每套天空盒都包含 `px`、`nx`、`py`、`ny`、`pz`、`nz` 六个面：

| 路径模式 | 格式 | 说明 |
|------|------|------|
| `static/assets/SkyBox/default/{face}.png` | PNG | Daisy 默认天空盒 |
| `static/assets/SkyBox/cesium/{face}.jpg` | JPG | Cesium 风格天空盒 |
| `sandAssets/SkyBox/gradient/{face}.jpg` | JPG | Playground 渐变天空盒 |

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

### 天体纹理与常用模型

| 资源路径 | 用途 |
|------|------|
| `static/assets/moon/moon_2048x1024.jpg` | 月球表面纹理 |
| `static/assets/moon/moon_terrain_1440x720.jpg` | 月球地形纹理 |
| `static/assets/moon/img.png` | 月球图像资源 |
| `static/assets/mars/mars_1920x960.png` | 火星表面纹理 |
| `static/assets/camera.glb`、`camera2.glb` | 相机模型 |
| `static/assets/radar0.glb` | 雷达模型 |
| `static/assets/satellite0.glb`、`satellite1.glb` | 卫星模型 |
| `static/assets/satellite2.gltf`、`satellite3.gltf` | 卫星 glTF 模型 |
| `static/assets/rocket.png` | 火箭图片 |
| `static/assets/satellite0.png`、`moonSmall.jpg` | 图标与缩略图 |

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

`models/` 目录还包含 Astronaut、CesiumMan、Hubble、Juno、ISS、火星探测器、深空网络天线、无人机、货船等完整 GLB 示例模型。引用方式一致，例如：

```typescript
const modelUrl = Daisy.BuildModuleUrl.getUrl(
    "models/InternationalSpaceStationISSA.glb",
)

entity.addFeature(new Daisy.ModelFeature({ url: modelUrl }))
```

这些示例模型用于快速搭建场景，不保证文件名跨 SDK 版本不变。生产项目若依赖特定模型内容，建议固定 SDK 版本，或将已确认授权和版本的模型纳入自己的业务资产管理。

### 数据与 3D Tiles

| 资源路径 | 内容 |
|------|------|
| `data/ne_110m_admin_0_countries.geojson` | 110m 国家边界 |
| `data/ne_110m_land.geojson` | 110m 陆地轮廓 |
| `data/ne_50m_land.geojson` | 50m 陆地轮廓 |
| `data/population-global-360x180.bin` | 全球人口栅格二进制数据 |
| `data/population-points.json` | 人口点数据 |
| `tileset/tileset.json` | Dragon 示例 Tileset 入口 |

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

## SDK 内部资源

`assets/` 中包含打包分块和 Worker，`cesium/` 中包含底层渲染运行时的静态文件。这两类资源必须随 SDK 一起发布，但业务代码不应直接引用具体文件。

```typescript
// 正确：只设置 SDK 总资源基址
Daisy.BuildModuleUrl.setBaseUrl("/vendor/daisy/")

// 不要这样做：内部文件名和目录结构不属于稳定公共接口
// fetch("/cesium/approximateTerrainHeights.json")
// import("/assets/CoverageWorker.worker-Cn8q0X8o.js")
```

`Engine.create()` 会从 SDK 总资源基址推导底层运行时目录。除非在排查旧版本兼容问题，否则不要单独调用 `Engine.setEngineBaseUrl()` 覆盖 Cesium 路径。

## 演示与测试资源

`cache/starlink-demo-cache.json`、`cache/starlink-ephemeris.txt` 和 `tests/data/sample.czml` 随包提供是为了复现实例与自动测试。它们可能随演示调整，不应作为生产数据契约。

## 排查 404

1. 在创建引擎前输出 `Daisy.BuildModuleUrl.baseUrl`，确认它指向已发布的 SDK `dist` 根目录。
2. 用 `Daisy.BuildModuleUrl.getUrl("cesium/approximateTerrainHeights.json")` 检查最终 URL，并在浏览器直接访问。
3. 确认开发服务器和生产构建使用相同的公开目录映射，且复制了所有资源根目录。
4. 确认没有硬编码 `/sandAssets/`、`/static/` 或 `/cesium/`。
5. 使用 CDN 时确认跨域响应头、缓存版本和 SDK JavaScript 版本一致。

> **相关 API**：[BuildModuleUrl](/en/api/classes/BuildModuleUrl) · [Engine](/en/api/classes/Engine) · [ModelFeature](/en/api/classes/ModelFeature) · [TilesetFeature](/en/api/classes/TilesetFeature)
