# 地面覆盖

地面覆盖类 Feature 用于将多边形区域、热力数据和 GeoJSON 数据渲染为地球表面的彩色覆盖层。

## Feature 选型

| 需求 | Feature | 说明 |
|------|---------|------|
| 批量不规则多边形覆盖 | `CoverageAreaFeature` | 硬件加速栅格化，适合大规模多边形 |
| 热力密度分布 | `HeatmapFeature` | 从散点生成热力图，支持地理遮罩 |
| GeoJSON 数据导入 | `GeoJsonFeature` | 从 URL 加载 GeoJSON，自动解析渲染 |

---

## CoverageAreaFeature

`CoverageAreaFeature` 将多个不规则经纬度多边形以各自颜色栅格化为地面覆盖叠加在地球表面。内部使用 Canvas 2D 逐环 `beginPath/closePath/fill` 实现硬件加速栅格化。

### 基础用法

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)

entity.addFeature(new Daisy.CoverageAreaFeature({
    polygons: [
        {
            ring: [
                [116, 38], [117, 39], [118, 38], [117, 37],
            ],
            color: "rgba(255, 0, 0, 0.6)",
        },
        {
            ring: [
                [120, 40], [121, 41], [122, 40], [121, 39],
            ],
            color: "hsl(200, 70%, 55%)",
        },
    ],
    opacity: 0.6,
    resolution: 8,           // 像素/经度，控制栅格精度
    outlineWidth: 1,
    outlineColor: "rgba(255, 0, 0, 0.8)",
}))
```

### polygons 格式

`polygons` 是 `{ ring, color }` 数组，每项定义一个独立的多边形区域：

| 字段 | 类型 | 说明 |
|------|------|------|
| `ring` | `[lng, lat][]` | 多边形顶点序列（经纬度坐标，闭合成环） |
| `color` | `string` | 填充颜色（CSS 颜色字符串，如 `rgba(...)` 或 `hsl(...)`） |

### 动态更新

```typescript
// 更新全部多边形
feature.setPolygons([
    { ring: [[100, 30], [102, 32], [103, 30]], color: "#ff0000" },
])

// 动态调整描边
feature.setOutline(2, "rgba(0, 255, 0, 0.9)")

// 动态调整栅格精度
feature.setResolution(12)   // 12px/°
```

`setResolution` 与 `setOutline` 的变更会立即生效，无需重新传入多边形数据。

### 省份边界加载（35 省 195 环）

CoverageAreaFeature 支持大规模多边形加载。以下示例叠加中国各省份精确边界和数千个随机多边形：

```typescript
import { CHINA_PROVINCES } from "./chinaProvinces"

// 混合自定义多边形与中国省份
const polygons = generateRandomPolygons(5000)
for (const province of CHINA_PROVINCES) {
    polygons.push(province)
}

const feature = new Daisy.CoverageAreaFeature({
    polygons,
    opacity: 0.6,
    resolution: 16,
    outlineWidth: 1,
    outlineColor: "rgba(255, 0, 0, 0.8)",
})
entity.addFeature(feature)
```

省份数据来源：DataV GeoJSON，共 35 个省，195 个多边形环。

### 分辨率与性能

`resolution`（单位：`px/°`）控制栅格 Canvas 的精度。值越高图像越清晰，但显存和绘制开销越大。建议范围 4~16：

- 低分辨率（4~8）：适合高密度大量多边形，保证帧率
- 高分辨率（12~16）：适合精细边界渲染（如省份边界）

> **注意：** 栅格化后为纹理，无法像矢量一样无极缩放。动态分辨率通过 `setResolution()` 即时重绘。

### 参数表

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `polygons` | `{ ring, color }[]` | `[]` | 多边形数组 |
| `opacity` | `number` | `1` | 全局透明度 |
| `resolution` | `number` | `8` | 栅格精度（px/°），范围建议 4~16 |
| `outlineWidth` | `number` | `0` | 描边宽度（像素） |
| `outlineColor` | `string` | `"rgba(0,0,0,1)"` | 描边颜色（CSS 字符串） |
| `minVisible` | `number` | `0.01` | 最小可见分辨率阈值 |
| `name` | `string` | — | 名称 |

---

## HeatmapFeature

`HeatmapFeature` 将散点数据渲染为热力覆盖图。原始数据通过 `grid` 描述符传入，包含点数组、地理范围和扩散半径。

### 基础用法

```typescript
entity.addFeature(new Daisy.HeatmapFeature({
    grid: {
        points: [
            { lng: 116.4, lat: 39.9, value: 0.8 },  // lng=经度, lat=纬度
            { lng: 121.5, lat: 31.2, value: 0.6 },
            { lng: 113.3, lat: 23.1, value: 0.9 },
        ],
        region: {
            westLon: 110,
            southLat: 20,
            eastLon: 130,
            northLat: 45,
        },
        spread: 2,              // 扩散半径（度）
    },
    colorScheme: "thermal",
    opacity: 0.7,
}))
```

### grid 描述符

| 字段 | 类型 | 说明 |
|------|------|------|
| `points` | `{ lng, lat, value }[]` | 热力点数组：`lng` 为经度，`lat` 为纬度，`value` 为权重 |
| `region` | `{ westLon, southLat, eastLon, northLat }` | 热力渲染区域边界 |
| `spread` | `number` | 单点热力扩散半径（度） |

### 色标配置

```typescript
// 预设色标
new Daisy.HeatmapFeature({
    grid: { /* ... */ },
    colorScheme: "thermal",   // 红-橙-黄色温渐变
})

new Daisy.HeatmapFeature({ grid: { /* ... */ }, colorScheme: "viridis" })
new Daisy.HeatmapFeature({ grid: { /* ... */ }, colorScheme: "blue-red" })

// 自定义色标
new Daisy.HeatmapFeature({
    grid: { /* ... */ },
    colorScheme: "custom",
    colors: [
        Daisy.Color.BLUE,
        Daisy.Color.CYAN,
        Daisy.Color.GREEN,
        Daisy.Color.YELLOW,
        Daisy.Color.ORANGE,
        Daisy.Color.RED,
        Daisy.Color.PURPLE,
        new Daisy.Color(0.15, 0.00, 0.15),
    ],
})
```

自定义色标时 `colorScheme` 必须设为 `"custom"`，`colors` 数组定义从低值到高值的颜色渐变序列。

### 地理遮罩

通过 `masks` 数组可将热力图裁剪到指定地理区域，例如仅在陆地上显示：

```typescript
// 加载陆地边界 GeoJSON 作为遮罩
const landGeoJSON = await fetch("/data/ne_110m_land.geojson").then(r => r.json())

new Daisy.HeatmapFeature({
    grid: { /* ... */ },
    colorScheme: "custom",
    colors: CUSTOM_COLORS,
    masks: [
        { geojson: landGeoJSON, type: "hideOutside" },
    ],
    opacity: 0.7,
})
```

| 遮罩字段 | 类型 | 说明 |
|----------|------|------|
| `geojson` | `object` | GeoJSON 几何数据 |
| `type` | `"hideInside" \| "hideOutside"` | 遮罩类型；省略时使用默认行为 |

### 外部数据加载

完整示例：加载人口密度点数据并配合陆地遮罩渲染全球人口热力图：

```typescript
const [points, landGeoJSON] = await Promise.all([
    fetch("/data/population-points.json").then(r => r.json()),
    fetch("/data/ne_110m_land.geojson").then(r => r.json()),
])

entity.addFeature(new Daisy.HeatmapFeature({
    grid: {
        points,
        region: { westLon: -180, southLat: -90, eastLon: 180, northLat: 90 },
        spread: 4,
    },
    colorScheme: "custom",
    colors: CUSTOM_COLORS,
    masks: [{ geojson: landGeoJSON, type: "hideOutside" }],
    opacity: 0.7,
}))
```

### 参数表

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `grid` | `{ points, region, spread }` | — | 热力网格描述符 |
| `colorScheme` | `"thermal" \| "viridis" \| "blue-red" \| "custom"` | `"thermal"` | 色标方案 |
| `colors` | `DColor[]` | — | 自定义色标数组（`colorScheme: "custom"` 时必填） |
| `masks` | `{ geojson, type }[]` | `[]` | 遮罩配置数组 |
| `opacity` | `number` | `1` | 全局透明度 |
| `name` | `string` | — | 名称 |

---

## GeoJsonFeature

`GeoJsonFeature` 从 URL 异步加载 GeoJSON 数据，自动解析多边形并委托内部 `CoverageAreaFeature` 渲染。支持 FeatureCollection、Feature、MultiPolygon 等 GeoJSON 类型，可从 properties 中提取标签文字。

### 基础用法

```typescript
const feature = new Daisy.GeoJsonFeature({
    outlineWidth: 0.8,
    outlineColor: "rgba(255, 0, 0, 0.8)",
    opacity: 0.35,
    resolution: 8,
    label: {
        show: true,
        font: "12px sans-serif",
        fillColor: "#ffffff",
        outlineColor: "#0f172a",
        outlineWidth: 3,
    },
})
entity.addFeature(feature)

// 异步加载 GeoJSON 并渲染
await feature.loadFromUrl("/data/ne_110m_admin_0_countries.geojson", (polygons, options) => {
    return {
        polygons,
        options: {
            ...options,
            outlineWidth: 1,
            outlineColor: "rgba(255, 255, 255, 0.9)",
            opacity: 0.5,
        },
    }
})
```

### loadFromUrl(url, callback)

`loadFromUrl` 是 GeoJsonFeature 的核心方法，负责异步加载和解析：

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | `string` | GeoJSON 文件的 URL 路径 |
| `callback` | `(polygons, options) => { polygons, options }` | 返回修改后的 polygons 和 options |

回调接收两个参数：
- `polygons`：解析后的多边形数组（`{ ring, color }[]` 格式，直接传递给内部 CoverageAreaFeature）
- `options`：当前渲染选项（`{ outlineWidth, outlineColor, opacity }`）

回调必须返回 `{ polygons, options }` 对象，可在此处按国家属性修改颜色、调整样式。

### 样式控制

```typescript
// 动态更新描边
feature.setOutline(1.5, "rgba(0, 255, 200, 0.8)")

// 动态更新透明度
feature.setOpacity(0.6)
```

`setOutline` 和 `setOpacity` 的底层委托给内部 `CoverageAreaFeature`，与直接使用 CoverageAreaFeature 行为一致。

### 标签渲染

通过 `label` 选项可从 GeoJSON properties 中自动提取标签文字并渲染：

```typescript
new Daisy.GeoJsonFeature({
    outlineWidth: 0.8,
    outlineColor: "rgba(255, 0, 0, 0.8)",
    opacity: 0.35,
    resolution: 8,
    label: {
        show: true,
        font: "12px sans-serif",
        fillColor: "#ffffff",
        outlineColor: "#0f172a",
        outlineWidth: 3,
    },
})
```

标签文字由 GeoJSON 的 `properties` 字段中的 `name` 或 `admin` 等属性自动映射。

### 支持的 GeoJSON 类型

| 类型 | 说明 |
|------|------|
| `FeatureCollection` | 标准要素集合，最常见的数据格式 |
| `Feature` | 单个要素 |
| `MultiPolygon` | 多多边形（含孔洞的复杂区域） |

### 参数表

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `outlineWidth` | `number` | `1` | 描边宽度（像素） |
| `outlineColor` | `string` | — | 描边颜色（CSS 字符串） |
| `opacity` | `number` | `1` | 全局透明度 |
| `resolution` | `number` | `8` | 内部 CoverageAreaFeature 栅格精度（px/°） |
| `label` | `{ show, font, fillColor, outlineColor, outlineWidth }` | — | 标签配置 |
| `name` | `string` | — | 名称 |

> **相关 API**：[CoverageAreaFeature](/api/classes/CoverageAreaFeature) · [HeatmapFeature](/api/classes/HeatmapFeature) · [GeoJsonFeature](/api/classes/GeoJsonFeature)
