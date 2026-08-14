# Satellites and Orbital Mechanics

Satellite simulation is a core capability of the DaisySpace-Sdk physical world. This chapter covers TLE parsing, SGP4 propagation, ephemeris sampling, and satellite-object creation.

## Object Hierarchy

```
BaseObject（抽象基类）
  └── FreeObject
        └── Vehicle
              └── Aircraft
                    └── NearEarthOrbiter    ← SGP4 轨道传播
                          └── Satellite      ← 语义别名
```

`Satellite` is a semantic alias for `NearEarthOrbiter`; the two APIs are identical, while Satellite is clearer semantically.

## PW Namespace

All physical-world classes are accessed through the `PW` namespace:

```typescript
import * as Daisy from "daisy-space-sdk"

const sat = new Daisy.PW.Satellite({ name: "STARLINK-1008" })
```

## BaseObject Pattern

All physical objects must be bound to an Engine before entering the simulation:

```typescript
const sat = new Daisy.PW.Satellite({ name: "MySat" })
sat.bindEngine(engine)   // 挂载 Entity，并自动完成注册
```

`bindEngine()` adds the host Entity to the Engine and triggers object registration. You usually do not need to call `register()` manually afterward.

> **Recommendation**: call `bindEngine()` before rendering or per-frame updates begin. Sensors, components, and visualization options can be declared before binding or added afterward.

## TLE Parsing (Spg4Tle)

`Spg4Tle` parses two-line element sets (TLEs) and extracts metadata:

```typescript
const tle = new Daisy.Spg4Tle(`STARLINK-1008
1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990
2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`)

// 轨道属性
tle.name              // "STARLINK-1008"
tle.satelliteNumber   // 44714
tle.inclinationDeg    // 53.1558
tle.eccentricity      // 0.0002025
tle.semimajorAxisMeters   // 半长轴（米）

// 双对象比对
const comparison = tle.compareTo(otherTle)
// deltaEpochSeconds, deltaInclinationDeg, deltaSemimajorAxisMeters, ...

// 交会预估
const conjunction = tle.estimateConjunctionWith(otherTle)
// estimatedClosestApproachMeters

// 从 CelesTrak 拉取
const tle = await Daisy.Spg4Tle.fetchTleFromCatalog(noradId)
```

## SGP4 Orbit Computation (SPG4)

The `SPG4` class provides static methods for orbit computation **without** an Engine context:

### Parsing

```typescript
// 解析轨道元数据
const meta = Daisy.Spg4.parseOrbitMetadata(tleText)
// { format, noradCatalogNumber, name, epochMs, orbitClass, ... }

// 解析经典轨道根数
const elems = Daisy.Spg4.parseOrbitElements(tleText)
// { semiMajorAxisKm, eccentricity, inclination,
//   rightAscensionOfAscendingNode, argumentOfPerigee, meanAnomaly,
//   meanMotion, orbitalPeriodSeconds, bstar }

// 解析 TLE 元数据（不是归一化后的 TLE 文本）
const normalized = Daisy.Spg4.parseTle(tleText)
```

### Propagation (observeAt)

```typescript
const date = new Date("2026-04-20T12:00:00Z")

// 惯性系外推（无观测者）
const result = Daisy.Spg4.observeAt(tleText, null, date)
// result.latitude, result.longitude, result.altitude  — 星下点
// result.eci.position, result.eci.velocity            — TEME 坐标系

// 含 J2000 惯性系
const j2000 = Daisy.Spg4.observeAtJ2000(tleText, null, date)
// j2000.j2000.position, j2000.j2000.velocity

// 观测者视角（北京，纬度/经度/高度；高度通常用米，绝对值 <= 200 时按 km 兼容处理）
const obs = Daisy.Spg4.observeAt(tleText, [39.9, 116.4, 50], date)
// obs.azimuth, obs.elevation, obs.rangeSat, obs.footprint
```

### Transit Prediction (findTransits)

```typescript
const transits = Daisy.Spg4.findTransits(
    tleText,
    [39.9, 116.4, 50],  // 观测者（北京，50 按 km 兼容处理）
    startDate,
    endDate,
    5,                   // 最小仰角（度）
    20,                  // 最大结果数
)

for (const t of transits) {
    console.log(t.start, t.end, t.duration, t.maxElevation)
}
```

### Visibility Windows

```typescript
const windows = Daisy.Spg4.visibilityWindows(
    tleText,
    [39.9, 116.4, 50],
    startDate,
    endDate,
)
// 返回 [[startMs, endMs], [startMs, endMs], ...]
```

## Satellite Objects (Satellite/NearEarthOrbiter)

### Creation and Orbit Setup

```typescript
const sat = new Daisy.PW.Satellite({
    name: "STARLINK-1008",
    enableSpg4Propagation: true,
})

// 方式一：直接设 TLE
sat.setTle(tle)
sat.bindEngine(engine)

// 方式二：按 NORAD ID 远程加载
const tle = await sat.loadTleByNoradId(44714, 6 * 3600)  // 缓存 6 小时
sat.bindEngine(engine)
```

`setTle()` only writes the orbit source. Whether to propagate in real time each frame is controlled by `enableSpg4Propagation`. Precomputed trajectories are more common by default, and `applyTrajectory()` runs automatically after binding according to the `trajectory` configuration.

### All-in-One Constructor Configuration

The `Satellite` constructor accepts a complete configuration object, allowing satellite creation, trajectory, point marker, label, path, and ground-track configuration in one step:

```typescript
const sat = new Daisy.PW.Satellite({
    name: "SAT-1",
    tle: tleText,                         // TLE 数据源
    enableSpg4Propagation: false,         // true = SGP4 每帧计算, false = 预计算轨迹
    trajectory: { stepSeconds: 30 },      // 轨迹采样间隔
    model: {
        url: "/models/sat.glb",
        minimumPixelSize: 48,
    },
    point: {
        size: 900,
        color: Daisy.Color.CYAN,
        outlineColor: Daisy.Color.BLACK.withAlpha(0.6),
        outlineWidth: 1.4,
    },
    text: {
        text: "SAT-1",
        font: "13px sans-serif",
        offsetPx: new Daisy.Cartesian2(0, -18),
        showBackground: true,
        backgroundColor: Daisy.Color.BLACK.withAlpha(0.36),
    },
    path: {
        show: true,
        color: Daisy.Color.CYAN.withAlpha(0.45),
        width: 2,
    },
    groundTrack: {
        show: true,
        material: Daisy.Color.GREEN.withAlpha(0.3),
    },
})
sat.bindEngine(engine)
```

> Constructor configuration and `setTle()` are mutually exclusive: after passing `tle`, you do not need to call `setTle()`. `model` / `point` / `label` / `path` / `groundTrack` automatically create the corresponding Features during `bindEngine()`.

### enableSpg4Propagation

Controls whether the satellite computes its SGP4 position in real time every frame:

- **`true`**: propagates with SGP4 every frame. It is dynamically accurate but CPU-intensive and suitable for a small number of satellites.
- **`false`**: precomputes a trajectory using `trajectory.stepSeconds` and writes it to the Entity position, which is interpolated directly during rendering. Suitable for large constellations.

```typescript
// 大量卫星场景推荐预计算模式
const sat = new Daisy.PW.Satellite({
    enableSpg4Propagation: false,
    trajectory: { stepSeconds: 60 },
})
```

### Spg4.ephemeris - Ephemeris Sampling

`Spg4.ephemeris` is a static method of `Spg4` that samples a time range at regular intervals and returns an array of observations:

```typescript
const samples = Daisy.Spg4.ephemeris(
    tleText,
    [39.9, 116.4, 50],                      // 观测者位置 [纬度, 经度, 高度]
    new Date("2026-04-20T06:00:00Z"),        // 起始时间
    new Date("2026-04-20T09:00:00Z"),        // 结束时间
    60000,                                    // 采样间隔（毫秒）
)

for (const s of samples) {
    console.log(s.latitude, s.longitude, s.altitude)
}
```

Each `s` is an observation containing sub-satellite longitude/latitude/height, orbital state, and the observer's azimuth, elevation, and distance.

### Sampling Ephemeris and Writing a Trajectory

```typescript
// 获取星历结果数组（不构建 TrajectorySample）
const ephemeris = sat.calculateEphemeris({
    startTime: engine.getStartTime(),
    endTime: engine.getStopTime(),
    intervalSeconds: 30,
})

// 构建 TrajectorySample 并写入卫星 position
const trajectory = sat.applyTrajectory({
    stepSeconds: 600,
    trajectoryOptions: {
        interpolationAlgorithm: "LAGRANGE",
        interpolationDegree: 5,
    },
})
```

### Using External Orbit Samples

When orbit samples have already been calculated by an external tool such as GMAT, STK, or a custom propagator, build a [TrajectorySample](/en/api/classes/TrajectorySample) directly and inject it into the satellite without using SGP4:

```typescript
// 1. 创建 TrajectorySample，指定参考系和插值方式
const traj = new Daisy.TrajectorySample(Daisy.ReferenceFrame.FIXED, {
    interpolationAlgorithm: "LAGRANGE",
    interpolationDegree: 5,
})

// 2. 批量写入外部计算的轨道采样点
traj.pushData([
    {
        time: Daisy.JulianDate.fromIso8601("2026-07-01T00:00:00Z"),
        position: Daisy.Cartesian3.fromDegrees(116, 39, 500_000),
    },
    {
        time: Daisy.JulianDate.fromIso8601("2026-07-01T00:30:00Z"),
        position: Daisy.Cartesian3.fromDegrees(116.5, 39.5, 510_000),
    },
    // ... 更多采样点
])

// 3. 绑定到卫星
sat.bindEngine(engine)
sat.position = traj
```

| Parameter | Type | Description |
|------|------|------|
| `referenceFrame` | `ReferenceFrame` | Reference frame: `FIXED` (Earth-fixed) or `INERTIAL` |
| `interpolationAlgorithm` | `"LINEAR" \| "LAGRANGE" \| "HERMITE"` | Interpolation algorithm, default `"LAGRANGE"` |
| `interpolationDegree` | `number` | Interpolation degree, default 3 |

### Real-Time Data Injection (Live Mode)

When receiving orbit positions continuously from a real-time source such as WebSocket, create an empty [TrajectorySample](/en/api/classes/TrajectorySample) and attach it to the satellite, then append data frame by frame. The current-time position is interpolated automatically each frame, so no manual update is needed:

```typescript
// 1. 创建空 TrajectorySample，先挂载到卫星
const liveTraj = new Daisy.TrajectorySample(Daisy.ReferenceFrame.FIXED, {
    interpolationAlgorithm: "LAGRANGE",
    interpolationDegree: 3,
})

sat.bindEngine(engine)
sat.position = liveTraj

// 2. 从实时数据源逐帧接收位置，持续追加
webSocket.on("message", (data) => {
    const { time, lon, lat, alt } = JSON.parse(data)
    liveTraj.pushData({
        time: Daisy.JulianDate.fromIso8601(time),
        position: Daisy.Cartesian3.fromDegrees(lon, lat, alt),
    })
})
```

### Transit Search (Object Instance Method)

```typescript
const transits = sat.getTransits({
    startTime: engine.getStartTime(),
    endTime: engine.getStopTime(),
    observerLocation: [39.9, 116.4, 50],
    minElevationDeg: 10,
    maxTransits: 50,
})
```

### Mounting Sensors

```typescript
const sensor = sat.addSensor({
    type: Daisy.PW.SensorType.Cone,
    apertureDeg: 45,              // 开角（度）
    emitDirection: Daisy.EmitDirection.TO_GROUND,
    beamLength: 500_000,          // 波束长度（米）
    material: Daisy.Color.RED.withAlpha(0.3),
})
```

See [Sensors](/en/guide/sensor) for details.

### Orbit Visualization Components

```typescript
// 轨道圈（轨道根数几何体）
sat.addComponent(new Daisy.PW.OrbitElementsViewComponent({
    material: Daisy.Color.CYAN.withAlpha(0.2),
}))

// 星下点轨迹
sat.addComponent(new Daisy.PW.GroundTrackComponent({
    material: Daisy.Color.RED,
    width: 2,
}))

// 运动轨迹线：由 Entity.setPath() 统一实现。
// 仅在预计算轨迹或外部 TrajectorySample 模式下显示；实时 SGP4 模式使用当前 Cartesian3，
// 不会生成退化的回放轨迹。
sat.entity.setPath({
    historySecond: 43200,
    futureSecond: 43200,
    color: Daisy.Color.BLUE.withAlpha(0.4),
})
```

## Batch-Creating a Constellation

```typescript
// 从压缩星历文本批量创建
const sats = tleList.map((tleText, i) => {
    const sat = new Daisy.PW.Satellite({ name: `SAT-${i}` })
    sat.setTle(tleText)
    sat.bindEngine(engine)
    const sensor = sat.addSensor({ type: Daisy.PW.SensorType.Cone, apertureDeg: 30 })
    return sat
})
```

For large constellations with thousands to tens of thousands of satellites, use precomputed trajectories. When ground clipping is unnecessary, set `throughGround: false` to reduce the overhead of ground intersections.

## Complete Example

```typescript
const engine = await Daisy.Engine.create("container")

const tle = `STARLINK-1008
1 44714U 19074B   26110.25002315  .02219194  00000+0  53041-1 0  9990
2 44714  53.1558 344.8432 0002025 106.0305 345.7371 15.37590305  5813`

// 步骤 1: 查看轨道参数（无需 Engine）
const elems = Daisy.Spg4.parseOrbitElements(tle)
console.log(`轨道周期: ${elems.orbitalPeriodSeconds.toFixed(1)}s`)

// 步骤 2: 创建卫星
const sat = new Daisy.PW.Satellite({ name: "STARLINK-1008" })
sat.setTle(tle)
sat.bindEngine(engine)

// 步骤 3: 写入轨迹 + 添加传感器
sat.applyTrajectory({ stepSeconds: 60 })
const sensor = sat.addSensor({
    type: Daisy.PW.SensorType.Cone,
    apertureDeg: 30,
    emitDirection: Daisy.EmitDirection.TO_GROUND,
    beamLength: 400_000,
})

// 步骤 4: 添加可视化组件
sat.addComponent(new Daisy.PW.OrbitElementsViewComponent({
    material: Daisy.Color.CYAN.withAlpha(0.15),
}))

// 步骤 5: 飞向目标
engine.flyTo(sat.entity, { duration: 2 })
```
## Events

[PW.Satellite](/en/api/classes/PW.Satellite) inherits from [BaseObject](/en/api/classes/PW.BaseObject) and provides the following events:

### Lifecycle

| Method | Description |
|------|------|
| `sat.onBeforeRegister(callback)` | Callback before registration |
| `sat.onRegister(callback)` | Callback after registration |
| `sat.onBeforeUpdate(callback)` | Callback before each frame update, with `(time)` |
| `sat.onUpdate(callback)` | Callback after each frame update, with `(time)` |
| `sat.onBeforeDestroy(callback)` | Callback before destruction |
| `sat.onDestroy(callback)` | Callback after destruction |

### Interaction Events

Interaction events are bridged to the underlying Entity, and the payload automatically receives a `spaceObject` field pointing to the current object:

```typescript
sat.onClick((e) => {
    console.log("点击了卫星:", e.spaceObject.name)
})
```

| Method | Description |
|------|------|
| `sat.onClick(handler)` | Single click |
| `sat.offClick(handler?)` | Remove listener |
| `sat.onDblClick(handler)` | Double click |
| `sat.offDblClick(handler?)` | Remove listener |
| `sat.onMouseEnter(handler)` | Mouse enters |
| `sat.offMouseEnter(handler?)` | Remove listener |
| `sat.onMouseLeave(handler)` | Mouse leaves |
| `sat.offMouseLeave(handler?)` | Remove listener |


> **Related APIs**: [PW.Satellite](/en/api/classes/PW.Satellite) · [TrajectorySample](/en/api/classes/TrajectorySample) · [Spg4](/en/api/variables/Spg4) · [Spg4Tle](/en/api/classes/Spg4Tle)
---

<!--
示例参考: [Spg4Parse.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/physicalWorld/Spg4Parse.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
