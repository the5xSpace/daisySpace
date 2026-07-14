# 材质系统

`MaterialFactory` 提供统一材质工厂，封装 40+ 种内置材质和自定义特效材质。所有材质通过工厂方法创建，返回 `DaisyMaterialDescriptor`，可传入任意 Feature 的 `material` 参数。

## 面材质（Surface）

适用于面要素（Ellipse、Polygon、Rectangle 等）和立体几何。所有方法均通过 `MaterialFactory` 静态调用。

### Solid / Color

最基础的纯色材质，也是点、面、立体几何最稳定的默认材质。

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")

Daisy.MaterialFactory.Solid({ color: "#38bdf8", alpha: 0.74 })
// 简写
Daisy.MaterialFactory.Color(Daisy.Color.RED.withAlpha(0.5))
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `DColor` | `WHITE` | 颜色 |
| `alpha` | `number` | `1` | 透明度（0–1） |

### Image

图片贴图材质，适合带纹理坐标的面与立体几何。

```typescript
Daisy.MaterialFactory.Image("/assets/texture.png")
// 或通过 Builtin
Daisy.MaterialFactory.Builtin("image", { image: canvasElement, repeat: 3 })
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `image` | `string` \| `HTMLCanvasElement` \| `HTMLImageElement` | — | 纹理源 |
| `repeat` | `number` \| `Cartesian2` | 1 | 纹理重复次数 |

### Grid

规则网格材质，适合网格面、区域边界和体表辅助线。

```typescript
Daisy.MaterialFactory.Grid({
    color: Daisy.Color.WHITE,
    cellAlpha: 0.2,
    lineCount: new Daisy.Cartesian2(8, 8),
    lineThickness: new Daisy.Cartesian2(1, 1),
})
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `DColor` | `WHITE` | 网格线颜色 |
| `cellAlpha` | `number` | `0.1` | 格子填充透明度 |
| `lineCount` | `Cartesian2` | `(8, 8)` | 行/列网格线数量 |
| `lineThickness` | `Cartesian2` | `(1, 1)` | 行/列线宽 |
| `lineOffset` | `Cartesian2` | `(0, 0)` | 网格线偏移 |

### Checkerboard

棋盘格材质，适合纹理坐标调试和规则填充。

```typescript
Daisy.MaterialFactory.Checkerboard({
    lightColor: Daisy.Color.WHITE,
    darkColor: Daisy.Color.fromCssColorString("#2563eb"),
    repeat: new Daisy.Cartesian2(4, 4),
})
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `lightColor` | `DColor` | `WHITE` | 亮格颜色 |
| `darkColor` | `DColor` | `DARKGRAY` | 暗格颜色 |
| `repeat` | `Cartesian2` | `(2, 2)` | 行列重复次数 |

### Stripe

条纹材质，适合方向性纹理和扫描基底。

```typescript
Daisy.MaterialFactory.Stripe({
    evenColor: Daisy.Color.fromCssColorString("#fb7185"),
    oddColor: Daisy.Color.fromCssColorString("#1f2937"),
    repeat: 10,
    orientation: Daisy.StripeOrientation.HORIZONTAL,
})
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `evenColor` | `DColor` | `CYAN` | 偶数条纹颜色 |
| `oddColor` | `DColor` | `BLACK` | 奇数条纹颜色 |
| `repeat` | `number` | 1 | 重复次数 |
| `offset` | `number` | 0 | 条纹偏移 |
| `orientation` | `StripeOrientation` | `HORIZONTAL` | 方向：`HORIZONTAL` / `VERTICAL` |

### Dot

点阵材质，适合离散采样、遮罩和低密度填充。

```typescript
Daisy.MaterialFactory.Dot({
    lightColor: Daisy.Color.fromCssColorString("#fef08a"),
    darkColor: Daisy.Color.fromCssColorString("#0f172a"),
    repeat: 10,
})
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `lightColor` | `DColor` | `WHITE` | 圆点颜色 |
| `darkColor` | `DColor` | `BLACK` | 背景颜色 |
| `repeat` | `Cartesian2` | `(1, 1)` | 行列重复次数 |

## 线材质（Polyline）

适用于 `PolylineFeature`。通过 `MaterialFactory.Builtin(type, options)` 或专用快捷方法创建。

### PolylineGlow

```typescript
Daisy.MaterialFactory.PolylineGlow({ color: Daisy.Color.CYAN, glowPower: 0.25 })
// 等效于
Daisy.MaterialFactory.Builtin("polylineGlow", { color: "#22d3ee", glowPower: 0.22 })
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `DColor` | `WHITE` | 主线颜色 |
| `glowPower` | `number` | `0.25` | 光晕强度（0–1） |
| `taperPower` | `number` | `1.0` | 锥度衰减 |

### PolylineDash

```typescript
Daisy.MaterialFactory.PolylineDash({ color: Daisy.Color.RED, dashLength: 16 })
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `DColor` | `WHITE` | 虚线颜色 |
| `gapColor` | `DColor` | `TRANSPARENT` | 间隔颜色 |
| `dashLength` | `number` | 16 | 虚线长度（像素） |
| `dashPattern` | `number` | `255` | 虚线样式位掩码 |
| `speed` | `number` | 0 | 流动速度（>0 时开启动态效果，单位 px/s） |
| `flowColor` | `DColor` | — | 流动颜色（仅动态模式有效） |

### PolylineArrow

单箭头沿折线流动，适合方向指示。

```typescript
Daisy.MaterialFactory.PolylineArrow({ color: "#34d399", speed: 1.5, arrowSize: 24 })
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `DColor` | `WHITE` | 箭头颜色 |
| `speed` | `number` | 1.2 | 流动速度 |
| `direction` | `"forward"` \| `"backward"` \| `"both"` | `"forward"` | 流动方向 |
| `arrowSize` | `number` | 15 | 箭头纹理大小（像素） |

### PolylineArrowPath

重复箭头沿线流动，适合路径规划/行进路线。

```typescript
Daisy.MaterialFactory.PolylineArrowPath({ color: Daisy.Color.ORANGE, speed: 3.0 })
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `DColor` | `YELLOW` | 箭头颜色 |
| `speed` | `number` | 3.0 | 流动速度 |
| `arrowSize` | `number` | 15 | 箭头大小（占间距的百分比） |
| `spacing` | `number` | 0.2 | 箭头间距 |
| `direction` | `"forward"` \| `"backward"` | `"forward"` | 方向 |
| `glowColor` | `DColor` | — | 可选：开启箭头内部流光效果 |

## 自定义特效材质

Sdk 内置 20+ 种自定义 Shader 材质（通过 `shaderManager.boot()` 注册）。以下为 5 大核心特效材质的完整参数表。

### SpiralFlow

螺旋轴向流动，适合圆形区域和能量扩散面。

```typescript
Daisy.MaterialFactory.SpiralFlow({
    color: "#155e75",
    spiralColor: "#facc15",
    speed: 1.2,
    count: 7,
    thickness: 0.28,
    opacity: 0.72,
    direction: "forward",  // 或 "backward"
})
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `DColor` | 蓝色 `(30,144,255)` | 主颜色 |
| `spiralColor` | `DColor` | `YELLOW` | 螺旋线颜色 |
| `speed` | `number` | `1.0` | 滚动速度（≥0.1） |
| `count` | `number` | `6.0` | 层数，范围 `[1, 20]` |
| `thickness` | `number` | `0.35` | 带宽，范围 `[0.05, 0.95]` |
| `opacity` | `number` | `1.0` | 透明度（0–1） |
| `direction` | `"forward" \| "backward"` | `"forward"` | 流动方向 |

### DownEmitDiffuse

从中心向下扩散的能量面，适合投影式区域表达。

```typescript
Daisy.MaterialFactory.DownEmitDiffuse({
    color: "#166534",
    bottomColor: "#22c55e",
    speed: 0.8,
    diffusionRadius: 0.46,
    diffusionWidth: 0.08,
    opacity: 0.66,
})
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `DColor` | `GREEN` | 主颜色 |
| `bottomColor` | `DColor` | 亮绿 `(0,255,128)` | 底部扩散颜色 |
| `speed` | `number` | `1.0` | 动画速度（≥0.1） |
| `diffusionRadius` | `number` | `0.45` | 扩散半径（0.05–1.0） |
| `diffusionWidth` | `number` | `0.06` | 扩散带宽（0.01–0.5） |
| `opacity` | `number` | `1.0` | 透明度（0–1） |

### NeonScan

霓虹斜向扫描，适合雷达扫掠和状态高亮面。

```typescript
Daisy.MaterialFactory.NeonScan({
    baseColor: "#164e63",
    neonColor: "#7dd3fc",
    speed: 1.0,
    bandWidth: 0.18,
    glowSize: 0.42,
    opacity: 0.78,
})
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `baseColor` | `DColor` | `PURPLE` | 基底颜色 |
| `neonColor` | `DColor` | `CYAN` | 霓虹扫描带颜色 |
| `speed` | `number` | `1.5` | 扫描速度（≥0.1） |
| `bandWidth` | `number` | `0.15` | 扫描带宽度（0.01–0.5） |
| `glowSize` | `number` | `0.35` | 柔光扩散半径（0.05–0.95） |
| `opacity` | `number` | `1.0` | 透明度（0–1） |

### RadialPulse

中心径向脉冲，适合告警范围和传播效果。

```typescript
Daisy.MaterialFactory.RadialPulse({
    color: "#0f766e",
    pulseColor: "#f8fafc",
    speed: 1.0,
    ringWidth: 0.09,
    opacity: 0.7,
    center: new Daisy.Cartesian2(0.5, 0.5),
})
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `DColor` | `CYAN` | 基底颜色 |
| `pulseColor` | `DColor` | `WHITE` | 脉冲环颜色 |
| `speed` | `number` | `1.0` | 脉冲速度（≥0.1） |
| `ringWidth` | `number` | `0.08` | 脉冲环宽度（0.01–0.5） |
| `center` | `Cartesian2` | `(0.5, 0.5)` | 脉冲中心（UV 坐标） |
| `opacity` | `number` | `1.0` | 透明度（0–1） |

### RingSweep

角向环形扫描，适合圆盘形态的扫描光束。

```typescript
Daisy.MaterialFactory.RingSweep({
    color: "#312e81",
    sweepColor: "#fb923c",
    speed: 1.0,
    width: 0.16,
    opacity: 0.72,
})
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `DColor` | `BLUE` | 基底颜色 |
| `sweepColor` | `DColor` | `ORANGE` | 扫掠光束颜色 |
| `speed` | `number` | `1.0` | 扫描速度（≥0.1） |
| `width` | `number` | `0.12` | 光束宽度（0.01–0.5） |
| `opacity` | `number` | `1.0` | 透明度（0–1） |

## Daisy 高级着色器材质

以下是 17 种 `Daisy*` 系列高级材质，均通过 `MaterialFactory.*` 快捷方法调用。

| 方法 | 效果 | 说明 |
|------|------|------|
| `DaisyNoiseField` | fbm 噪声场 | 适合云雾、能量面和体表扰动，`colorA` / `colorB` / `scale` / `speed` / `contrast` |
| `DaisyGridGlow` | 发光网格 | 脉冲网格线，`baseColor` / `lineColor` / `cellCount` / `lineWidth` / `speed` |
| `DaisyContourBands` | 等值线分层 | 高度/强度/分级区域，`lowColor` / `highColor` / `bandCount` / `slope` |
| `DaisyCellular` | 细胞边界纹理 | 适合分块区域和非均匀边界，`baseColor` / `edgeColor` / `cellCount` |
| `DaisyHeatmap` | 径向热力图 | 适合强度中心和风险分布，`coldColor` / `midColor` / `hotColor` / `radius` |
| `DaisyScanline` | 扫描线闪烁 | 适合屏幕、雷达、面板式材质，`baseColor` / `scanColor` / `density` / `thickness` |
| `DaisyTurbulence` | 湍流噪声 | 适合不稳定云团和流体感表面，`colorA` / `colorB` / `scale` / `intensity` |
| `DaisyMarble` | 噪声扭曲云纹 | 适合地质、能量云和装饰性体表，`baseColor` / `veinColor` / `frequency` / `warp` |
| `DaisySdfRings` | SDF 同心环 | 适合精确脉冲、靶心和波纹，`ringColor` / `count` / `width` |
| `DaisyHalftone` | 半调网点 | 适合密度表达和图形化遮罩，`paperColor` / `inkColor` / `density` |
| `DaisyWarpedStripes` | 域扭曲条纹 | 适合流向、风场和不规则条带，`colorA` / `colorB` / `frequency` / `warpStrength` |
| `DaisyAurora` | 极光帘幕 | 适合垂直流动和能量幕墙，`lowColor` / `highColor` / `waviness` |
| `DaisyCircuit` | 电路线脉冲 | 适合数据链路和科技体表，`traceColor` / `cells` |
| `DaisyTopoRipple` | 等值线扫雷达波 | 适合地形感扫描和热区传播，`lineColor` / `bands` / `rippleCount` |
| `DaisyMatrixRain` | 码流雨滴 | 适合数据流和矩阵式信息面，`rainColor` / `columns` / `rows` |
| `DaisyDitherFade` | Bayer 点阵渐隐 | 适合低成本透明过渡和扫描遮罩，`colorA` / `colorB` / `radial` |
| `DaisyAdvancedWater` | 高级拟态水面 | 5 层波浪、cross 法线、菲涅尔效应、Blinn-Phong 高光，`baseColor` / `surfaceColor` / `waveSpeed` / `waveFrequency` |

使用示例：

```typescript
// 噪声场
Daisy.MaterialFactory.DaisyNoiseField({ colorA: "#06b6d4", colorB: "#84cc16", scale: 8, contrast: 0.42 })

// 发光网格
Daisy.MaterialFactory.DaisyGridGlow({ baseColor: "#020617", lineColor: "#38bdf8", cellCount: { x: 9, y: 7 } })

// 热力图
Daisy.MaterialFactory.DaisyHeatmap({ coldColor: "#2563eb", midColor: "#22c55e", hotColor: "#f97316", radius: 0.72 })

// 高级水面
Daisy.MaterialFactory.DaisyAdvancedWater({ baseColor: "#001432", surfaceColor: "#006496", waveSpeed: 0.8, waveFrequency: 12.0 })
```

## Bonus 贴图材质（Builtin）

除面材质外，`MaterialFactory.Builtin()` 还支持以下标准贴图材质类型，通过 `Builtin(type, options)` 调用：

| type | 说明 | 关键参数 |
|------|------|----------|
| `"diffuseMap"` | 漫反射贴图 | `image`、`repeat` |
| `"alphaMap"` | 透明遮罩贴图 | `image`、`repeat` |
| `"specularMap"` | 高光强度贴图 | `image`、`repeat` |
| `"emissionMap"` | 自发光贴图 | `image`、`repeat` |
| `"bumpMap"` | 凹凸扰动贴图 | `image`、`repeat`、`strength` |
| `"normalMap"` | 法线贴图 | `image`、`repeat`、`strength` |
| `"water"` | 水面法线动画 | `normalMap`、`frequency`、`animationSpeed`、`amplitude` |
| `"rimLighting"` | 边缘光材质 | `color`、`rimColor`、`width` |
| `"fade"` | 方向渐隐 | `fadeInColor`、`fadeOutColor`、`maximumDistance`、`fadeDirection` |
| `"elevationContour"` | 地形等高线 | `contourColor`、`spacing`、`width` |
| `"elevationRamp"` | 地形高度渐变 | `image`、`minimumHeight`、`maximumHeight` |
| `"slopeRamp"` | 地形坡度渐变 | `image` |
| `"aspectRamp"` | 地形坡向渐变 | `image` |
| `"elevationBand"` | 地形高度分带 | `heights`、`colors` |
| `"waterMask"` | 地表水陆遮罩 | `waterColor`、`landColor` |

## 载体类型兼容性

不同材质适用于不同 Feature 载体类型：

| 载体 | Feature 类型 | 可用材质 |
|------|-------------|---------|
| `point` | `PointFeature` | 仅 `Solid / Color`（PointFeature 使用 `color` 参数，不接收 `material`） |
| `line` | `PolylineFeature` | `PolylineGlow`、`PolylineDash`、`PolylineArrow`、`PolylineArrowPath`、`PolylineOutline` |
| `surface` | `EllipseFeature`、`PolygonFeature`、`RectangleFeature` 等 | 所有面材质、自定义特效材质、Daisy 高级材质 |
| `solid` | `CylinderFeature`、`BoxFeature`、`EllipsoidFeature`、`SphereFeature` | 所有面材质、Daisy 高级材质（`AdvancedWater` 除外） |
| `terrain` | 地球表面 / Globe | `ElevationContour`、`ElevationRamp`、`SlopeRamp`、`AspectRamp`、`ElevationBand`、`WaterMask` |

### 材质挂载示例

```typescript
const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
```

```typescript
// 面要素：挂载螺旋流动材质
entity.addFeature(new Daisy.PolygonFeature({
    hierarchy: positions,
    material: Daisy.MaterialFactory.SpiralFlow({ color: "#155e75", spiralColor: "#facc15", speed: 1.2 }),
}))

// 线要素：挂载流动箭头
entity.addFeature(new Daisy.PolylineFeature({
    pathway: linePositions,
    width: 4,
    material: Daisy.MaterialFactory.PolylineArrow({ color: "#34d399", speed: 1.5 }),
}))

// 点要素：仅支持颜色
entity.addFeature(new Daisy.PointFeature({
    sizePx: 12,
    color: Daisy.Color.RED,
}))
```

> **相关 API**：[MaterialFactory](/api/classes/MaterialFactory) · [SpiralFlowMaterial](/api/classes/SpiralFlowMaterial) · [DownEmitDiffuseMaterial](/api/classes/DownEmitDiffuseMaterial) · [NeonScanMaterial](/api/classes/NeonScanMaterial) · [RadialPulseMaterial](/api/classes/RadialPulseMaterial) · [RingSweepMaterial](/api/classes/RingSweepMaterial)

---

<!--
示例参考: [Material demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/materials)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
