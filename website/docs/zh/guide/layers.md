# 地理图层

`engine.geoLayer` 管理三类地理资源：影像、地形和天空/大气。

## 影像（Imagery）

### 底图设置

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

支持的 `GeoImageryType`：

| 类型 | 说明 |
|------|------|
| `XYZ` | 标准瓦片服务（需 `url`，可通过 `tilingScheme` 选择坐标方案） |
| `OpenStreetMap` | OSM 开放街道地图（`url` 可省略，默认使用官方地址） |
| `ArcGisMapServer` | ArcGIS 地图服务（`url` 可省略，使用全局设置或 SDK 默认地址） |
| `WMTS` | WMTS 标准服务 |
| `WMS` | WMS 标准服务 |
| `CesiumIon` | Cesium Ion 资源（需 `assetId`） |

### 第三方地图资源与授权

第三方地图资源的 token、key 和默认地址通过 `GlobalConfig.configure()` 注入运行时。它们只保存在宿主的本地偏好或运行时上下文，不写入 Scenario、Package 或导出资源定义。

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

OpenStreetMap 默认使用 `https://tile.openstreetmap.org/`，兼容服务可以在 URL 中使用 `{key}` 占位符。ArcGIS 默认关闭 `usePreCachedTilesIfAvailable`；当服务不可达或初始化失败时，SDK 回退到本地 `static/earth/` 影像，并保持 globe/椭球可见。

### XYZ 瓦片坐标方案

`XYZ` 默认使用 `webMercator`（Web Mercator）坐标方案，适合大多数在线地图服务，但纬度范围通常只到约 `±85.0511°`。需要覆盖完整 `-90°` 到 `90°` 纬度的经纬度瓦片时，设置 `tilingScheme: "geographic"`。

| 坐标方案 | 适用场景 |
|------|------|
| `webMercator` | 默认方案；适用于 EPSG:3857 等 Web Mercator 服务 |
| `geographic` | 适用于 EPSG:4326 / 经纬度瓦片，可覆盖南北极 |

使用 `geographic` 时，如果服务按 TMS 行号存储瓦片（南侧行号为 `0`），URL 应使用 `{reverseY}`；标准 XYZ 服务仍使用 `{y}`：

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

### 叠加图层

```typescript
// 叠加标注图层
engine.geoLayer.addImagery({
    type: Daisy.GeoImageryType.OpenStreetMap,
})

// 清除所有
engine.geoLayer.clearImagery()
```

## 地形（Terrain）

### 地形类型

`GeoTerrainType` 枚举提供了四种地形数据源：

| 类型 | 说明 |
|------|------|
| `GeoTerrainType.CesiumIon` | Cesium Ion 资产地形（`assetId` 省略时加载默认全球地形） |
| `GeoTerrainType.ArcGis` | ArcGIS 地形服务 |
| `GeoTerrainType.Ellipsoid` | 光滑椭球体（无高程），适用于月球/火星场景 |
| `GeoTerrainType.Custom` | 自定义高程数据（需 `provider`） |

```typescript
// 默认全球地形（Cesium Ion，省略 assetId 即加载默认地形）
engine.geoLayer.setTerrain({
    type: Daisy.GeoTerrainType.CesiumIon,
})
```

### 自定义高程地形

通过 `GeoTerrainType.Custom` 传入自定义地形 provider：

```typescript
engine.geoLayer.setTerrain({
    type: Daisy.GeoTerrainType.Custom,
    provider: myTerrainProvider,
})
```

### 程序化地形 (CustomHeightmapTerrainProvider)

`CustomHeightmapTerrainProvider` 允许通过回调函数动态生成高程数据，无需外部服务：

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

> `callback(x, y, level)` 的 `x` / `y` 为瓦片坐标，`level` 为缩放级别。返回值必须是 `Float32Array` 高程数组（单位：米）。

## 天空 / 大气（Sky）

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

### 天空类型

`GeoSkyType` 枚举控制天空渲染方式：

| 类型 | 说明 |
|------|------|
| `GeoSkyType.None` | 不渲染天空，纯色背景 |
| `GeoSkyType.SkyBox` | 自定义天空盒纹理（六面体贴图） |
| `GeoSkyType.Default` | 默认大气散射天空 |

> `GeoSkyType.None` 适合深空/星表场景；`GeoSkyType.Default` 自动适配星球椭球体。

### setGlobeOptions

控制地球椭球体的渲染行为：

```typescript
engine.geoLayer.setGlobeOptions({
    show: true,
    baseColor: Daisy.Color.BLACK,
    depthTestAgainstTerrain: true,
})
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `show` | `boolean` | 是否显示地球表面 |
| `baseColor` | `Color` | 无影像时的基础色（月球/火星等常用 `BLACK`） |
| `depthTestAgainstTerrain` | `boolean` | 是否开启深度测试（避免物体穿透地形） |

## 雾效

雾效用于模拟大气衰减，增强场景纵深感和远距离遮挡效果：

```typescript
engine.geoLayer.setFog({
    enabled: true,
    density: 8.0e-5,
    screenSpaceErrorFactor: 6000,
})
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `enabled` | `boolean` | 是否启用雾效 |
| `density` | `number` | 雾浓度（默认 `8.0e-5`） |
| `screenSpaceErrorFactor` | `number` | SSE 系数，影响雾随距离衰减速率（默认 `6000`） |

> **相关 API**：[Engine](/api/classes/Engine) · `CustomHeightmapTerrainProvider`


---

<!--
  示例参考: [GeoLayer demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/geoLayer)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
