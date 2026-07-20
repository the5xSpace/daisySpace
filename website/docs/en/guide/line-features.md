# 线要素

线要素（Line Features）沿指定路径渲染折线、走廊、墙体、管状体积和指向箭头。

## PolylineFeature

`PolylineFeature` 沿路径绘制折线，支持固定点位和动态追踪，可用于可视化链路关系、飞行轨迹等。

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")

const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
```

```typescript
// 固定点位折线
entity.addFeature(new Daisy.PolylineFeature({
    pathway: [
        Daisy.Cartesian3.fromDegrees(-100, 40, 0),
        Daisy.Cartesian3.fromDegrees(-90, 45, 0),
        Daisy.Cartesian3.fromDegrees(-80, 40, 0),
    ],
    width: 3,
    material: Daisy.MaterialFactory.PolylineGlow({ color: Daisy.Color.CYAN }),
}))

// 动态追踪：从宿主实体连接到目标实体
entity.addFeature(new Daisy.PolylineFeature({
    trackTarget: targetEntity,
    width: 2,
    material: Daisy.MaterialFactory.PolylineDash({ color: Daisy.Color.RED, dashLength: 16 }),
}))
```

`pathway` 支持的元素类型：

| 元素 | 说明 |
|------|------|
| `Cartesian3` | 静态坐标点 |
| `Entity` | Daisy 实体（每帧取当前位置） |
| `REF.SELF_ENTITY` | 宿主实体自身 |
| `REF.PARENT_ENTITY` | 父实体 |
| `REF.GLOBAL_ORIGIN` | 世界原点 |

### 参数表

| 参数 | 类型 | 默认 | 说明 |
|------|------|:---:|------|
| `pathway` | `Pathway` | `[]` | 折线路径 |
| `trackTarget` | `Entity \| Cartesian3` | — | 动态追踪目标，自动补入 pathway |
| `trackingTarget` | 同 `trackTarget` | — | `trackTarget` 的兼容别名 |
| `width` | `number` | 2 | 线宽（像素，最小 1） |
| `clampToGround` | `boolean` | false | 是否贴地 |
| `material` | `DMaterial` | — | 折线材质 |
| `depthFailMaterial` | `DMaterial` | — | 深度失败材质（被遮挡时使用） |
| `alwaysOnTop` | `boolean` | false | 是否始终可见（启用 depthFailMaterial） |
| `loop` | `boolean` | false | 是否闭合为环 |
| `arcType` | `ArcType` | `GEODESIC` | 插值方式 |
| `sortBefore` | `boolean` | true | 贴地采样前是否按地理顺序排序 |
| `classificationType` | `ClassificationType` | `BOTH` | 贴地分类目标 |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | 天体椭球 |
| `show` | `boolean` | true | 显隐 |
| `name` | `string` | — | 名称 |

### MaterialFactory 线材质预设

```typescript
// 发光折线
Daisy.MaterialFactory.PolylineGlow({
    color: Daisy.Color.CYAN,       // 颜色
    glowPower: 0.25,         // 光晕强度
    taperPower: 1.0,         // 锥度
})

// 虚线
Daisy.MaterialFactory.PolylineDash({
    color: Daisy.Color.RED,        // 虚线颜色
    gapColor: Daisy.Color.TRANSPARENT, // 间隔颜色
    dashLength: 16,          // 虚线长度
    dashPattern: 255,        // 虚线样式（位掩码）
    speed: 5,                // > 0 时开启流动效果
    flowColor: Daisy.Color.YELLOW, // 流动颜色（仅动态模式有效）
})

// 流动箭头（单箭头沿折线流动）
Daisy.MaterialFactory.PolylineArrow({
    color: Daisy.Color.WHITE,      // 箭头颜色
    speed: 1.2,              // 流动速度（> 0 时开启流光）
    direction: "forward",    // 方向：forward / backward / both
    arrowSize: 15,           // 箭头纹理大小（像素）
})

// 箭头路径（重复箭头沿线流动，适合路径规划/行进路线）
Daisy.MaterialFactory.PolylineArrowPath({
    color: Daisy.Color.ORANGE,     // 箭头颜色
    speed: 3.0,              // 流动速度
    arrowSize: 15,           // 箭头大小（相对于间距的比例 %）
    spacing: 0.2,            // 箭头间距
    direction: "forward",    // 方向：forward / backward
    glowColor: Daisy.Color.CYAN,   // 可选：开启箭头内部流光效果
})
```

## CorridorFeature

`CorridorFeature` 沿路径绘制等宽走廊几何体（飞行走廊、道路等），支持贴地和挤出。

```typescript
entity.addFeature(new Daisy.CorridorFeature({
    pathway: [
        Daisy.Cartesian3.fromDegrees(116, 38, 0),
        Daisy.Cartesian3.fromDegrees(117, 39, 0),
    ],
    width: 2000,                             // 走廊宽度（米）
    height: 50,                              // 走廊高度（米）
    extrudedHeight: 500,                     // 挤出高度（米）
    material: Daisy.Color.BLUE.withAlpha(0.3),
    outline: true,
    outlineColor: Daisy.Color.CYAN,
    outlineWidth: 2,
}))
```

### 参数表

| 参数 | 类型 | 默认 | 说明 |
|------|------|:---:|------|
| `pathway` | `Pathway` | `[]` | 走廊路径 |
| `width` | `number` | 1000 | 走廊宽度（米） |
| `height` | `number` | 0.1 | 走廊高度（米） |
| `extrudedHeight` | `number` | — | 挤出高度（米），形成立体效果 |
| `cornerType` | `CornerType` | `ROUNDED` | 拐角类型 |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | 采样粒度（弧度） |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | 顶点格式 |
| `material` | `DMaterial` | `BLUE.alpha(0.5)` | 走廊材质 |
| `outline` | `boolean` | false | 是否绘制轮廓线 |
| `outlineColor` | `DColor` | `BLACK` | 轮廓颜色 |
| `outlineWidth` | `number` | 1 | 轮廓宽度（像素） |
| `show` | `boolean` | true | 显隐 |
| `fill` | `boolean` | true | 是否填充面 |
| `clampToGround` | `boolean` | false | 是否贴地 |
| `classificationType` | `ClassificationType` | `BOTH` | 贴地分类目标 |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | 显示距离条件 |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | 天体椭球 |
| `updateThrottleMs` | `number` | 400 | 更新节流时间（毫秒） |

## WallFeature

`WallFeature` 沿路径绘制立面墙体（围栏、屏障、垂直面等），每个顶点可独立设置最小/最大高度。

```typescript
const positions = [
    Daisy.Cartesian3.fromDegrees(-122, 37, 100),
    Daisy.Cartesian3.fromDegrees(-122, 38, 100),
    Daisy.Cartesian3.fromDegrees(-121, 38, 100),
]

entity.addFeature(new Daisy.WallFeature({
    pathway: positions,
    minimumHeights: [2000, 3000, 2000],   // 每点最小高度（米），长度与路径一致
    maximumHeights: [3000, 4000, 3000],   // 每点最大高度（米），长度与路径一致
    material: Daisy.MaterialFactory.Solid({ color: "#3b82f6", alpha: 0.6 }),
    outline: true,
    outlineColor: Daisy.Color.WHITE,
}))
```

### 参数表

| 参数 | 类型 | 默认 | 说明 |
|------|------|:---:|------|
| `pathway` | `Pathway` | `[]` | 墙体路径 |
| `minimumHeights` | `number[]` | — | 每点最小高度（米），长度应与路径一致 |
| `maximumHeights` | `number[]` | — | 每点最大高度（米），长度应与路径一致 |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | 采样粒度（弧度） |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | 顶点格式 |
| `material` | `DMaterial` | `BLUE.alpha(0.5)` | 墙体材质 |
| `outline` | `boolean` | false | 是否绘制轮廓线 |
| `outlineColor` | `DColor` | `BLACK` | 轮廓颜色 |
| `outlineWidth` | `number` | 1 | 轮廓宽度（像素） |
| `show` | `boolean` | true | 显隐 |
| `fill` | `boolean` | true | 是否填充面 |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | 显示距离条件 |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | 天体椭球 |
| `updateThrottleMs` | `number` | 400 | 更新节流时间（毫秒） |

## PolylineVolumeFeature

`PolylineVolumeFeature` 沿路径以指定截面形状挤出管状体积（圆柱形管道、方形通道等）。

```typescript
// 方形截面通道
const squareShape = [
    new Daisy.Cartesian2(-50, -50),
    new Daisy.Cartesian2( 50, -50),
    new Daisy.Cartesian2( 50,  50),
    new Daisy.Cartesian2(-50,  50),
]

entity.addFeature(new Daisy.PolylineVolumeFeature({
    pathway: [
        Daisy.Cartesian3.fromDegrees(120, 30, 0),
        Daisy.Cartesian3.fromDegrees(121, 31, 0),
    ],
    shape: squareShape,                      // Cartesian2[] 截面轮廓
    material: Daisy.MaterialFactory.Solid({ color: "#10b981", alpha: 0.5 }),
    outline: true,
    outlineColor: Daisy.Color.GREEN,
}))
```

不传 `shape` 时默认使用半径为 100 米的圆形截面（16 边形近似）。

### 参数表

| 参数 | 类型 | 默认 | 说明 |
|------|------|:---:|------|
| `pathway` | `Pathway` | `[]` | 管道路径 |
| `shape` | `Cartesian2[]` | 圆形（r=100） | 管道截面形状，最少 3 个点 |
| `cornerType` | `CornerType` | `ROUNDED` | 拐角类型 |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | 采样粒度（弧度） |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | 顶点格式 |
| `material` | `DMaterial` | `BLUE.alpha(0.5)` | 管道材质 |
| `outline` | `boolean` | false | 是否绘制轮廓线 |
| `outlineColor` | `DColor` | `BLACK` | 轮廓颜色 |
| `outlineWidth` | `number` | 1 | 轮廓宽度（像素） |
| `show` | `boolean` | true | 显隐 |
| `fill` | `boolean` | true | 是否填充面 |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | 显示距离条件 |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | 天体椭球 |
| `updateThrottleMs` | `number` | 400 | 更新节流时间（毫秒） |

## ArrowPointerFeature

`ArrowPointerFeature` 从宿主实体向目标绘制箭头线，支持内置天体目标和自定义回调。

```typescript
// 指向太阳（内置目标名）
entity.addFeature(new Daisy.ArrowPointerFeature({
    target: "sun",                           // 内置目标名：sun/moon/mars/earthCenter
    lengthPx: 120,                           // 箭头长度（像素）
    width: 3,                                // 线宽（像素）
    color: Daisy.Color.YELLOW,
    label: { text: "SUN", font: "14px sans-serif" },
}))

// 指向另一个实体
entity.addFeature(new Daisy.ArrowPointerFeature({
    target: otherEntity,                     // Entity / Cartesian3 / Entity / 回调
    length: 5000,                            // 箭头长度（米），优先于 lengthPx
    color: Daisy.Color.CYAN,
    arrowSize: 20,
    label: "TARGET",
}))
```

### target 类型

| 类型 | 说明 |
|------|------|
| `"sun"` | 太阳位置（内置，自动跟随仿真时间） |
| `"moon"` | 月球位置 |
| `"mars"` | 火星位置 |
| `"earthCenter"` | 地心（Cartesian3.ZERO） |
| `Cartesian3` | 静态坐标点 |
| `Entity` | Daisy 实体，每帧取当前位置 |
| `Cesium.Entity` | Cesium 实体，每帧解析位置 |
| `(entity, time) => Cartesian3` | 自定义回调 |

### 参数表

| 参数 | 类型 | 默认 | 说明 |
|------|------|:---:|------|
| `target` | `ArrowPointerTarget` | — | 指向目标（必填） |
| `show` | `boolean` | true | 显隐 |
| `length` | `number` | — | 箭头长度（米），优先于 `lengthPx` |
| `lengthPx` | `number` | 100 | 箭头长度（屏幕像素） |
| `width` | `number` | 5 | 线宽（像素，最小 1） |
| `color` | `DColor` | `WHITE` | 箭头颜色 |
| `arrowSize` | `number` | 15 | 箭头纹理大小（像素） |
| `label` | `ArrowPointerLabelOptions \| string` | — | 箭头前端标签 |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | 显示距离条件 |

> **相关 API**：[PolylineFeature](/en/api/classes/PolylineFeature) · [CorridorFeature](/en/api/classes/CorridorFeature) · [WallFeature](/en/api/classes/WallFeature) · [PolylineVolumeFeature](/en/api/classes/PolylineVolumeFeature) · [ArrowPointerFeature](/en/api/classes/ArrowPointerFeature) · [MaterialFactory](/en/api/classes/MaterialFactory)

---

<!--
  示例参考: [Line feature demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/features)
-->
