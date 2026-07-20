# 参考平面与网格图层

辅助图层通过 `engine.addViewLayer()` 添加到场景，独立于影像/地形图层。所有图层继承自 [Layer](/en/api/classes/Layer)，支持 `show` / `destroy` 生命周期。

## 参考平面

### 赤道面

[EquatorialPlaneLayers](/en/api/classes/Plane.EquatorialPlaneLayers) 在地球赤道位置绘制半透明圆盘 + 网格：

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

engine.addViewLayer(new Daisy.Plane.EquatorialPlaneLayers({
    color: Daisy.Color.CYAN,
    planeAlpha: 0.15,
}))
```

### 黄道面

[EclipticPlaneLayers](/en/api/classes/Plane.EclipticPlaneLayers) 在黄道面位置绘制圆盘 + 网格：

```typescript
engine.addViewLayer(new Daisy.Plane.EclipticPlaneLayers({
    show: true,
    color: Daisy.Color.ORANGE,
    planeAlpha: 0.12,
}))
```

### 黄道参考平面（带刻度）

[EclipticReferencePlaneLayers](/en/api/classes/Plane.EclipticReferencePlaneLayers) 在黄道面上绘制同心圆刻度标记：

```typescript
engine.addViewLayer(new Daisy.Plane.EclipticReferencePlaneLayers({
    color: Daisy.Color.WHITE,
    planeAlpha: 0.08,
}))
```

### PlaneLayer 通用选项

以上三者共享 [PlaneLayerOptions](/en/api/interfaces/Plane.PlaneLayerOptions)：

| 选项 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `show` | `boolean` | `true` | 是否显示 |
| `color` | `DColor` | — | 网格线颜色 |
| `planeAlpha` | `number` | `0.1` | 圆盘填充透明度 |
| `segments` | `number` | — | 圆盘分段数（越大越圆滑） |
| `referenceRadius` | `number` | — | 参考半径（米） |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | 距离显示条件 |
| `gridStyle` | `PlaneGridStyle` | — | 网格样式（见下方） |

### 网格样式

| 选项 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `followCamera` | `boolean` | `true` | 是否根据相机距离自适应网格密度 |
| `cellPixelSize` | `number` | `80` | 目标网格单元屏幕像素尺寸 |
| `linePixelWidth` | `number` | `1` | 网格线像素宽 |
| `minCellSizeMeters` | `number` | `100000` | 网格单元最小尺寸（防止过密） |
| `maxCellSizeMeters` | `number` | `5e9` | 网格单元最大尺寸（防止过稀） |
| `cellAlpha` | `number` | `0.1` | 网格单元填充透明度 |

```typescript
new Daisy.Plane.EquatorialPlaneLayers({
    color: Daisy.Color.CYAN,
    planeAlpha: 0.1,
    gridStyle: {
        followCamera: true,
        cellPixelSize: 60,
        linePixelWidth: 1.5,
        cellAlpha: 0.08,
    },
})
```

## 经纬度网格

### EarthGridLayers

[EarthGridLayers](/en/api/classes/EarthGridLayers) 在地球表面绘制经纬度网格线：

```typescript
engine.addViewLayer(new Daisy.EarthGridLayers({
    show: true,
    color: Daisy.Color.WHITE.withAlpha(0.3),
    width: 1,
}))
```

### CelestialGeodeticGridLayers

[CelestialGeodeticGridLayers](/en/api/classes/CelestialGeodeticGridLayers) 在指定天体表面绘制经纬度网格。`EarthGridLayers` 是其地球默认子类：

```typescript
const mars = Daisy.PW.CelestialEllipsoid.create({
    ellipsoid: Daisy.ELLIPSOID.MARS,
})
engine.addViewLayer(new Daisy.CelestialGeodeticGridLayers({
    show: true,
    color: Daisy.Color.CYAN.withAlpha(0.2),
    width: 1,
}, mars))
```

| 选项 | 类型 | 说明 |
|------|------|------|
| `show` | `boolean` | 是否显示 |
| `color` | `DColor` | 网格线颜色 |
| `width` | `number` | 线宽（像素） |
| 构造函数第二参数 | `CelestialEllipsoid` | 绑定的天体（省略时默认为地球） |

## 天球网格

[CelestialSphereGridLayers](/en/api/classes/CelestialSphereGridLayers) 以经纬度间隔在天球上绘制网格球面：

```typescript
engine.addViewLayer(new Daisy.CelestialSphereGridLayers({
    show: true,
    color: Daisy.Color.WHITE.withAlpha(0.15),
    radius: 10_000_000,
}))
```

| 选项 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `show` | `boolean` | `true` | 是否显示 |
| `color` | `DColor` | — | 网格线颜色 |
| `radius` | `number` | — | 球体半径（米） |

## 夜间瓦片

[NightTileLayer](/en/api/classes/NightTileLayer) 将夜间瓦片限制在地球夜侧显示。它在 3D 地球和 2D 地图中使用同一套日夜边界计算，默认使用 Daisy 内置的离线夜景瓦片（`static/night`，`z=0..3`），不依赖第三方网络服务。

```typescript
import * as Daisy from "daisy-space-sdk"

const nightTiles = new Daisy.NightTileLayer({
    dayAlpha: 0,
    nightAlpha: 1,
    brightness: 1.15,
})
engine.addWidget(nightTiles)
```

需要使用远程夜间灯光数据时，可以传入 Daisy 影像源配置。下面以 NASA GIBS 为例：

```typescript
const nightTiles = new Daisy.NightTileLayer({
    source: {
        type: Daisy.GeoImageryType.WMTS,
        url: "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/wmts.cgi",
        layer: "VIIRS_CityLights_2012",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible_Level8",
    },
})
```

| 选项 | 默认值 | 说明 |
|------|:---:|------|
| `show` | `true` | 是否显示夜间瓦片 |
| `dayAlpha` | `0` | 白昼区域透明度 |
| `nightAlpha` | `1` | 夜间区域透明度 |
| `brightness` | `1` | 瓦片亮度 |
| `contrast` | `1` | 瓦片对比度 |
| `enableLighting` | `true` | 自动启用地球日夜计算 |
| `source` | Daisy 内置离线 XYZ | 自定义 Daisy 影像源；可传入 XYZ、WMTS 等远程源 |

`NightTileLayer` 不改写原始瓦片像素，也不控制基础影像的最大层级。基础影像的 `maxLevel` 应在基础影像源配置中设置；夜间效果只负责按地球光照状态混合自身影像。传入 `source` 后，瓦片请求和服务能力由用户提供的影像源配置负责。

## 日锥

[SunConeLayer](/en/api/classes/SunConeLayer) 绘制天体背向太阳一侧的本影和半影。它适合日食/月食、航天器进出影区和太阳能状态分析，不是普通地图必需的装饰图层。

日锥只在 3D 中有明确的空间含义，因此 **2D 模式不会创建锥体 Primitive**；切回 3D 时会按照 Daisy Layer 生命周期自动重建。夜间瓦片不依赖日锥，两者可以独立使用。

```typescript
const sunCone = new Daisy.SunConeLayer({
    body: Daisy.PW.CelestialEllipsoid.Earth(),
    umbraColor: Daisy.Color.BLUE.withAlpha(0.34),
    penumbraColor: Daisy.Color.ORANGE.withAlpha(0.16),
    visualLengthScale: 0.12,
})
engine.addViewLayer(sunCone)
```

`visualLengthScale` 只压缩显示长度，使天体和锥体能在同一视野中辨认；`calculateSunConeDimensions()` 与遮挡判定始终使用真实物理尺寸。

### 判断移动物体的光照状态

将实体或物理对象的当前世界坐标直接传给 `getSunOcclusionState()`：

```typescript
const position = satellite.getCurrentPosition()
if (position) {
    const state = Daisy.getSunOcclusionState(position, engine.getCurrentTime())
    // state: "sunlit" | "penumbra" | "umbra"
}
```

自定义中心天体时复用同一组天体对象：

```typescript
const moon = Daisy.PW.CelestialEllipsoid.Moon()
const sun = Daisy.PW.CelestialEllipsoid.Sun()
const state = Daisy.getSunOcclusionState(position, engine.getCurrentTime(), {
    body: moon,
    sun,
})
```

### 模式与生命周期

| 能力 | 3D | 2D | morph 行为 |
|------|:---:|:---:|------|
| 夜间瓦片 | 支持 | 支持 | 销毁自身影像并重新注册 |
| 日锥本影/半影 | 3D 控件 | - | 仅在 3D 场景创建空间图元 |
| 太阳遮挡计算 | 支持 | 支持 | 纯计算，不持有渲染资源 |

## 图层管理

```typescript
const layer = new Daisy.EarthGridLayers()

// 添加
engine.addViewLayer(layer)

// 显示/隐藏
layer.show = true
layer.show = false

// 兼容接口先移出更新集合，再显式销毁
engine.removeViewLayer(layer)
layer.destroy()

// Widget 统一接口也可以一次完成移除与销毁
engine.removeWidget(layer, true)
```

> `removeViewLayer()` 是兼容接口，只把图层移出更新集合；需要继续释放资源时必须调用 `destroy()`。推荐新代码使用 `removeWidget(layer, true)`。

> **相关 API**：Plane.[EclipticPlaneLayers](/en/api/classes/Plane.EclipticPlaneLayers) · Plane.[EquatorialPlaneLayers](/en/api/classes/Plane.EquatorialPlaneLayers) · Plane.[EclipticReferencePlaneLayers](/en/api/classes/Plane.EclipticReferencePlaneLayers) · [EarthGridLayers](/en/api/classes/EarthGridLayers) · [CelestialGeodeticGridLayers](/en/api/classes/CelestialGeodeticGridLayers) · [CelestialSphereGridLayers](/en/api/classes/CelestialSphereGridLayers) · [NightTileLayer](/en/api/classes/NightTileLayer) · [SunConeLayer](/en/api/classes/SunConeLayer)
