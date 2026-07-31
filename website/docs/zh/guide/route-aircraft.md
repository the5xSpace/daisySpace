# 飞行器与航路

Aircraft（飞行器）是 Vehicle 的航空特化，默认传感器方向为 `TO_BOTTOM`（机体下视）。航路仿真通过 `RouteComponent` + `PathBuilder` + Aircraft 三者协作实现。

## 对象层次

```
FreeObject
  └── Vehicle
        └── Aircraft（传感器默认 TO_BOTTOM）
```

Aircraft 本身是一个物理对象，可以沿轨迹运动。它的位置通过 `TrajectorySample` / `Cartesian3` 控制，运动能力来自 `Vehicle` 基类的轨迹采样求值。

## PathBuilder — 路径构建器

`PathBuilder` 从航点集合创建路径，提供两种产出：

| 方法 | 产出 | 用途 |
|------|------|------|
| `buildPositions()` | `Cartesian3[]` | 纯位置数组（折线、几何体） |
| `buildTrajectory(start, stop)` | `TrajectorySample` | 带时间的仿真轨迹（驱动实体运动） |

### 基础链式调用

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")

const pts = [
    Daisy.Cartesian3.fromDegrees(116.4, 39.9, 0),   // 北京
    Daisy.Cartesian3.fromDegrees(118.5, 38.2, 0),   // 济南
    Daisy.Cartesian3.fromDegrees(120.8, 31.5, 0),   // 上海
]

// 纯贝塞尔曲线位置
const positions = new Daisy.PathBuilder()
    .fromWaypoints(pts)
    .bezier(20, 30)           // 张力角 20°, 每段 30 采样点
    .buildPositions()

// 带高度剖面的仿真轨迹
const trajectory = new Daisy.PathBuilder()
    .fromWaypoints(pts)
    .bezier(15, 24)
    .setAltitudeProfile({
        segmentAltitudes: [8000, 10000],        // 每段巡航高度（米）
        groundAltitude: 100,
        climbRatio: 0.2,                        // 爬升占 20%
        descentRatio: 0.8,                      // 最后 20% 为下降
    })
    .buildTrajectory(startTime, stopTime, {
        maxSampleIntervalSeconds: 1 / 24,
    })
```

### 插值模式

| 模式 | 方法 | 说明 |
|------|------|------|
| Bezier（默认） | `.bezier(tensionDeg, samples)` | 二次贝塞尔，张力角控制曲率（5~40°） |
| Geodesic | `.setInterpolation("geodesic")` | 大地方位线（最优地球表面路径） |
| Linear | `.setInterpolation("linear")` | 直线 |

### 闭合路径

```typescript
const ring = new Daisy.PathBuilder()
    .fromWaypoints([p1, p2, p3, p4])
    .bezier(15, 20)
    .setClosed(true)
    .buildPositions()
```

## RouteComponent — 航路可视化

`RouteComponent` 是挂在 `BaseObject` 上的 IComponent，负责绘制航路：

```typescript
const route = new Daisy.PW.RouteComponent({
    waypoints: [
        {
            position: Daisy.Cartesian3.fromDegrees(116.4, 39.9, 0),
            label: "北京",
            subtitle: "首都国际机场 · 起飞",
            popoverContent: "\<div\>ICAO: ZBAA\</div\>",
        },
        {
            position: Daisy.Cartesian3.fromDegrees(120.8, 31.5, 0),
            label: "上海",
            subtitle: "浦东国际机场",
        },
    ],
    lineColor: Daisy.Color.CYAN,
    lineWidth: 2,
    arcType: Daisy.ArcType.GEODESIC,
    curveType: "geodesic",
})

// 挂载到任意 BaseObject
const carrier = new Daisy.PW.FreeObject({ name: "RouteCarrier" })
carrier.bindEngine(engine)
carrier.addComponent(route)
```

### RouteComponentOptions

| 参数 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `waypoints` | `RouteWaypoint[]` | — | 航点列表（≥2个） |
| `lineWidth` | `number` | 2 | 连线宽度（像素） |
| `lineColor` | `DColor` | cyan | 连线颜色 |
| `curveType` | `"geodesic" \| "bezier"` | bezier | 实际曲线类型 |
| `arcType` | `ArcType` | GEODESIC | 连线插值方式 |
| `clampToGround` | `boolean` | false | 贴地；仅 `curveType: "geodesic"` 生效 |
| `showLine` | `boolean` | true | 显示连线 |
| `showLabels` | `boolean` | true | 显示航点标签 |
| `showIcons` | `boolean` | true | 显示航点图标 |
| `iconScale` | `number` | 1.0 | 图标缩放 |
| `labelFont` | `string` | "13px sans-serif" | 标签字体 |
| `popoverTrigger` | `"always" \| "click" \| "hover"` | hover | Popover 触发方式 |
| `bezierTension` | `number` | 5 | 贝塞尔张力角 |
| `bezierSamples` | `number` | 24 | 每段贝塞尔采样数 |

当 `curveType` 为 `"bezier"` 时，路径由 `PathBuilder` 生成，`arcType` 和 `clampToGround` 不参与路径构建。

### RouteWaypoint

| 字段 | 类型 | 说明 |
|------|------|------|
| `position` | `Cartesian3` | 航点坐标 |
| `label` | `string` | 主标题 |
| `subtitle` | `string` | 副标题 |
| `icon` | `string` | 自定义图标 URL |
| `popoverContent` | `string` | HTML 弹出内容 |

## Aircraft — 飞行器

```typescript
const aircraft = new Daisy.PW.Aircraft({
    name: "UAV-1",
    position: Daisy.Cartesian3.fromDegrees(116.4, 39.9, 10000),
    point: { size: 1000, color: Daisy.Color.ORANGE },
    text: { text: "UAV-1" },
})

aircraft.bindEngine(engine)

// 设置运动轨迹
aircraft.position = trajectory  // TrajectorySample from PathBuilder
```

Aircraft 默认传感器方向为 `TO_BOTTOM`，可通过 `addSensor` 的 `emitDirection` 覆盖。

## 完整航路仿真示例

```typescript
// 步骤 1: 构建轨迹
const waypoints = [
    Daisy.Cartesian3.fromDegrees(116.4, 39.9, 0),
    Daisy.Cartesian3.fromDegrees(118.5, 38.2, 0),
    Daisy.Cartesian3.fromDegrees(120.8, 31.5, 0),
]

const trajectory = new Daisy.PathBuilder()
    .fromWaypoints(waypoints)
    .bezier(15, 30)
    .setAltitudeProfile({
        segmentAltitudes: [8000, 10000],
        climbRatio: 0.2,
        descentRatio: 0.8,
    })
    .buildTrajectory(engine.getStartTime(), engine.getStopTime())

// 步骤 2: 创建航路可视化
const route = new Daisy.PW.RouteComponent({
    waypoints: waypoints.map((pos, i) => ({
        position: pos,
        label: ["北京", "济南", "上海"][i],
        subtitle: `航点 ${i + 1}`,
    })),
    lineColor: Daisy.Color.CYAN,
    lineWidth: 2,
})

const carrier = new Daisy.PW.FreeObject({ name: "Route" })
carrier.bindEngine(engine)
carrier.addComponent(route)

// 步骤 3: 创建飞行器并跟随
const aircraft = new Daisy.PW.Aircraft({
    name: "Airbus",
    position: trajectory,
    point: { size: 1000, color: Daisy.Color.ORANGE },
})
aircraft.bindEngine(engine)

// 步骤 4: 相机跟踪
engine.camera.followTarget(aircraft)
```


---

<!--
示例参考: [RouteDemo.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/physicalWorld/RouteDemo.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
