# 着色器多边形

[ShaderPolygonFeature](/en/api/classes/ShaderPolygonFeature) 是一个基于自定义着色器管线的多边形渲染组件，同时支持贴地投影和悬浮多边形，适用于覆盖区域、地理围栏、高性能批量渲染等场景。

## 基础用法

多边形通过 `pathway` 定义顶点序列（`Cartesian3[]`），至少需要 3 个顶点：

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")

const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)

entity.addFeature(new Daisy.ShaderPolygonFeature({
    pathway: [
        Daisy.Cartesian3.fromDegrees(90, 20, 0),
        Daisy.Cartesian3.fromDegrees(120, 20, 0),
        Daisy.Cartesian3.fromDegrees(110, 40, 0),
    ],
    color: Daisy.Color.BLUE.withAlpha(0.35),
}))
```

也支持通过 `polygonHierarchy`（`PolygonHierarchy`）或预构建的 `mesh`（`ShaderPolygonMeshInput`）输入几何数据。

## 贴地与悬浮

`surfaceConform` 控制多边形是否投影到天体表面（默认 `false`）：

```typescript
// 贴地多边形（surfaceConform: true）
new Daisy.ShaderPolygonFeature({
    pathway: positions,
    color: Daisy.Color.fromCssColorString("#2288ff").withAlpha(0.35),
    surfaceConform: true,
})

// 悬浮多边形（surfaceConform: false + height 抬升）
new Daisy.ShaderPolygonFeature({
    pathway: positions,
    color: Daisy.Color.fromCssColorString("#00ddff").withAlpha(0.5),
    surfaceConform: false,
    height: 2000000,   // 高度（米）
})
```

曲面的细分粒度等高级参数可通过 `subdivisionGranularityMeters`、`maxSubdivisionDepth`、`surfaceErrorMeters` 等控制。

## 轮廓边

```typescript
new Daisy.ShaderPolygonFeature({
    pathway: positions,
    color: Daisy.Color.RED.withAlpha(0.3),
    outline: true,
    outlineColor: Daisy.Color.WHITE,
    outlineWidth: 2,       // 像素
})
```

> **注意：** 轮廓边基于测地线密化（`_densifyGeodesic`）生成，边数过多时会对性能有明显影响。ShadePolygonPerf 压测中已提示"启用轮廓边会导致性能急剧下降"。

### 动态更新轮廓

```typescript
// 动态开启或关闭轮廓
feature.setOutline(true, Daisy.Color.WHITE, 1.5)
feature.setOutline(false)
```

## Worker 并行建网

网格构建（三角化 + 曲面细分）默认在 Web Worker 中异步执行，不阻塞主线程：

- 所有实例共享一个 `sharedMeshBuildWorker`，避免重复创建 Worker 开销
- Worker 故障时自动回退到主线程（`meshBuildWorkerFallbackToMainThread = true`）
- 可通过 `meshBuildInWorker` 选项关闭（一般不需要）

该机制保证了即使单帧内创建上百个多边形，主线程渲染也不被建网阻塞。

## 性能模式

### 批量创建

在 Perf 压测 Demo（`ShaderPolygonPerf.svelte`）中，采用**分批创建**模式避免单帧阻塞：

```typescript
const BATCH = 80  // 每批 80 个
function addBatch() {
    const end = Math.min(idx + BATCH, n)
    for (let i = idx; i < end; i++) {
        entity.addFeature(new Daisy.ShaderPolygonFeature({
            pathway: defs[i].pts,
            color: defs[i].color,
        }))
    }
    idx = end
    if (idx < n) setTimeout(addBatch, 0) // 让出主线程
}
```

### 压测数据

`ShaderPolygonPerf` Demo 展示了 **1000 个彩色多边形**同时渲染的能力（最多 1000 个，4~8 边形，黄金角均匀分布到椭球面）。

### 性能要点

| 要点 | 说明 |
|------|------|
| 分批创建 | 每批 ~80 个，`setTimeout(fn, 0)` 让出主线程 |
| Worker 建网 | 默认开启，三角化不阻塞渲染 |
| 避免大规模轮廓边 | 轮廓边需要测地线密化，开销显著 |
| 控制曲面细分粒度 | `subdivisionGranularityMeters` 不宜设得过小 |
| 控制多边形边数 | 单多边形边数越多，三角化与密化越重 |

## 参数表

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `pathway` | `Pathway` | — | 多边形顶点序列（`Cartesian3[]`/`REF` 等） |
| `polygonHierarchy` | `PolygonHierarchy` | — | 多边形层级 |
| `mesh` | `ShaderPolygonMeshInput` | — | 预构建网格（`{ vertices, indices, boundingSphere }`） |
| `color` | `DColor` | `Color.CYAN.withAlpha(0.8)` | 填充颜色 |
| `surfaceConform` | `boolean` | `false` | 是否投影到天体表面（贴地） |
| `height` | `number` | — | 悬浮高度（米），`surfaceConform: false` 时有效 |
| `outline` | `boolean` | `false` | 是否绘制轮廓线 |
| `outlineColor` | `DColor` | `Color.BLACK` | 轮廓颜色 |
| `outlineWidth` | `number` | `1` | 轮廓宽度（像素） |
| `show` | `boolean` | `true` | 显隐 |
| `name` | `string` | — | 名称（调试用） |
| `effectType` | `number` | `0` | 着色器特效类型索引 |
| `speed` | `number` | `1` | 特效动画速度 |
| `radius` | `number` | `1` | 特效半径（米） |
| `projectionMode` | `"tangent" \| "cartographic"` | `"tangent"` | 曲面投影模式 |
| `projectionReferenceLongitude` | `number` | — | Cartographic 投影参考经度 |
| `subdivisionGranularityMeters` | `number` | — | 曲面细分粒度（米） |
| `maxSubdivisionDepth` | `number` | — | 最大细分深度 |
| `surfaceErrorMeters` | `number` | — | 曲面拟合误差容限（米） |
| `surfaceLiftMeters` | `number` | — | 曲面法线方向抬升（米） |
| `boundaryDensify` | `boolean` | `true` | 边界加密插值 |
| `boundaryMaxArcMeters` | `number` | — | 边界加密最大弧长（米） |
| `boundaryMaxSagittaMeters` | `number` | — | 边界加密最大矢高（米） |
| `boundaryMaxDeltaLonDeg` | `number` | — | 边界加密最大经度跨度 |
| `boundaryMaxDeltaLatDeg` | `number` | — | 边界加密最大纬度跨度 |
| `skinnyAspectLimit` | `number` | — | 狭长三角面长宽比阈值 |
| `midpointErrorMeters` | `number` | — | 中点误差容限（米） |
| `centroidErrorMeters` | `number` | — | 质心误差容限（米） |
| `preferLongestEdgeSplit` | `boolean` | `false` | 优先沿最长边分裂 |
| `disableCulling` | `boolean` | `false` | 禁用背面剔除 |
| `disableBackFaceCulling` | `boolean` | `false` | 独立背面剔除 |
| `depthTestEnabled` | `boolean` | `true` | 深度测试 |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | 距离显示条件 |
| `ellipsoid` | `CelestialEllipsoid` | — | 天体椭球配置 |
| `debug` | `boolean` | `false` | 调试模式 |
| `debugWireframe` | `boolean` | `false` | 线框渲染（调试） |
| `debugWireframeColor` | `Color` | — | 线框颜色 |

> **相关 API**：[ShaderPolygonFeature](/en/api/classes/ShaderPolygonFeature)
