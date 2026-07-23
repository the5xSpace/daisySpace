# Line Features

Line Features render polylines, corridors, walls, tubular volumes, and direction arrows along specified paths.

## PolylineFeature

`PolylineFeature` draws a polyline along a path. It supports fixed positions and dynamic tracking, and can visualize links, flight paths, and similar relationships.

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

Supported element types for `pathway`:

| Element | Description |
|------|------|
| `Cartesian3` | Static coordinate point |
| `Entity` | Daisy Entity; reads the current position each frame |
| `REF.SELF_ENTITY` | The host Entity itself |
| `REF.PARENT_ENTITY` | Parent Entity |
| `REF.GLOBAL_ORIGIN` | World origin |

### Parameter Table

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `pathway` | `Pathway` | `[]` | Polyline path |
| `trackTarget` | `Entity \| Cartesian3` | — | Dynamic tracking target, automatically appended to pathway |
| `trackingTarget` | Same as `trackTarget` | — | Compatibility alias for `trackTarget` |
| `width` | `number` | 2 | Line width in pixels, minimum 1 |
| `clampToGround` | `boolean` | false | Whether to clamp to the ground |
| `material` | `DMaterial` | — | Polyline material |
| `depthFailMaterial` | `DMaterial` | — | Depth-fail material used when occluded |
| `alwaysOnTop` | `boolean` | false | Whether to remain visible; enables depthFailMaterial |
| `loop` | `boolean` | false | Whether to close the path into a loop |
| `arcType` | `ArcType` | `GEODESIC` | Interpolation method |
| `sortBefore` | `boolean` | true | Whether to sort geographically before ground sampling |
| `classificationType` | `ClassificationType` | `BOTH` | Ground-classification target |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | Celestial ellipsoid |
| `show` | `boolean` | true | Visibility |
| `name` | `string` | — | Name |

### MaterialFactory Line-Material Presets

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

`CorridorFeature` draws a constant-width corridor along a path, such as a flight corridor or road. It supports ground clamping and extrusion.

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

### Parameter Table

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `pathway` | `Pathway` | `[]` | Corridor path |
| `width` | `number` | 1000 | Corridor width in meters |
| `height` | `number` | 0.1 | Corridor height in meters |
| `extrudedHeight` | `number` | — | Extrusion height in meters, creating a solid shape |
| `cornerType` | `CornerType` | `ROUNDED` | Corner type |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | Sampling granularity in radians |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | Vertex format |
| `material` | `DMaterial` | `BLUE.alpha(0.5)` | Corridor material |
| `outline` | `boolean` | false | Whether to draw an outline |
| `outlineColor` | `DColor` | `BLACK` | Outline color |
| `outlineWidth` | `number` | 1 | Outline width in pixels |
| `show` | `boolean` | true | Visibility |
| `fill` | `boolean` | true | Whether to fill faces |
| `clampToGround` | `boolean` | false | Whether to clamp to the ground |
| `classificationType` | `ClassificationType` | `BOTH` | Ground-classification target |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Display distance condition |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | Celestial ellipsoid |
| `updateThrottleMs` | `number` | 400 | Update throttle interval in milliseconds |

## WallFeature

`WallFeature` draws a vertical wall along a path, such as a fence, barrier, or vertical surface. Each vertex can define independent minimum and maximum heights.

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

### Parameter Table

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `pathway` | `Pathway` | `[]` | Wall path |
| `minimumHeights` | `number[]` | — | Minimum height per vertex in meters; length should match the path |
| `maximumHeights` | `number[]` | — | Maximum height per vertex in meters; length should match the path |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | Sampling granularity in radians |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | Vertex format |
| `material` | `DMaterial` | `BLUE.alpha(0.5)` | Wall material |
| `outline` | `boolean` | false | Whether to draw an outline |
| `outlineColor` | `DColor` | `BLACK` | Outline color |
| `outlineWidth` | `number` | 1 | Outline width in pixels |
| `show` | `boolean` | true | Visibility |
| `fill` | `boolean` | true | Whether to fill faces |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Display distance condition |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | Celestial ellipsoid |
| `updateThrottleMs` | `number` | 400 | Update throttle interval in milliseconds |

## PolylineVolumeFeature

`PolylineVolumeFeature` extrudes a tubular volume along a path using a specified cross-section, such as a cylindrical pipe or square channel.

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

When `shape` is omitted, a circular cross-section with a radius of 100 meters is used by default (approximated with 16 sides).

### Parameter Table

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `pathway` | `Pathway` | `[]` | Pipe path |
| `shape` | `Cartesian2[]` | Circle (r=100) | Pipe cross-section; at least 3 points |
| `cornerType` | `CornerType` | `ROUNDED` | Corner type |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | Sampling granularity in radians |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | Vertex format |
| `material` | `DMaterial` | `BLUE.alpha(0.5)` | Pipe material |
| `outline` | `boolean` | false | Whether to draw an outline |
| `outlineColor` | `DColor` | `BLACK` | Outline color |
| `outlineWidth` | `number` | 1 | Outline width in pixels |
| `show` | `boolean` | true | Visibility |
| `fill` | `boolean` | true | Whether to fill faces |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Display distance condition |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | Celestial ellipsoid |
| `updateThrottleMs` | `number` | 400 | Update throttle interval in milliseconds |

## ArrowPointerFeature

`ArrowPointerFeature` draws an arrow line from the host Entity to a target. It supports built-in celestial targets and custom callbacks.

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

### target Types

| Type | Description |
|------|------|
| `"sun"` | Sun position (built-in; follows simulation time automatically) |
| `"moon"` | Moon position |
| `"mars"` | Mars position |
| `"earthCenter"` | Earth center (Cartesian3.ZERO) |
| `Cartesian3` | Static coordinate point |
| `Entity` | Daisy Entity; reads the current position each frame |
| `Cesium.Entity` | Cesium Entity; resolves its position each frame |
| `(entity, time) => Cartesian3` | Custom callback |

### Parameter Table

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `target` | `ArrowPointerTarget` | — | Target to point to (required) |
| `show` | `boolean` | true | Visibility |
| `length` | `number` | — | Arrow length in meters; takes precedence over `lengthPx` |
| `lengthPx` | `number` | 100 | Arrow length in screen pixels |
| `width` | `number` | 5 | Line width in pixels, minimum 1 |
| `color` | `DColor` | `WHITE` | Arrow color |
| `arrowSize` | `number` | 15 | Arrow texture size in pixels |
| `label` | `ArrowPointerLabelOptions \| string` | — | Label at the arrow tip |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Display distance condition |

> **Related APIs**: [PolylineFeature](/en/api/classes/PolylineFeature) · [CorridorFeature](/en/api/classes/CorridorFeature) · [WallFeature](/en/api/classes/WallFeature) · [PolylineVolumeFeature](/en/api/classes/PolylineVolumeFeature) · [ArrowPointerFeature](/en/api/classes/ArrowPointerFeature) · [MaterialFactory](/en/api/classes/MaterialFactory)

---

<!--
  示例参考: [Line feature demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/features)
-->
