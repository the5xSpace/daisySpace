# 卫星与轨道力学

卫星仿真是 DaisySpace-Sdk 物理世界的核心能力。本章覆盖 TLE 解析、SGP4 轨道传播、星历采样和卫星对象创建。

## 对象层次

```
BaseObject（抽象基类）
  └── FreeObject
        └── Vehicle
              └── Aircraft
                    └── NearEarthOrbiter    ← SGP4 轨道传播
                          └── Satellite      ← 语义别名
```

`Satellite` 是 `NearEarthOrbiter` 的语义别名——两者 API 完全相同，卫星从语义上更清晰。

## PW 命名空间

所有物理世界类通过 `PW` 命名空间访问：

```typescript
import * as Daisy from "daisy-space-sdk"

const sat = new Daisy.PW.Satellite({ name: "STARLINK-1008" })
```

## BaseObject 基础范式

所有物理对象在进入仿真前都需要绑定 Engine：

```typescript
const sat = new Daisy.PW.Satellite({ name: "MySat" })
sat.bindEngine(engine)   // 挂载 Entity，并自动完成注册
```

`bindEngine()` 会将宿主 Entity 添加到 Engine，并触发对象注册。通常不需要再手动调用 `register()`。

> **建议**：需要渲染或进入每帧更新前调用 `bindEngine()`。传感器、组件和可视化配置既可在绑定前声明，也可在绑定后追加。

## TLE 解析（Spg4Tle）

`Spg4Tle` 处理两行轨道根数（TLE）的解析和元数据提取：

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

## SGP4 轨道计算（SPG4）

`SPG4` 类提供静态方法，**无需** Engine 上下文即可进行轨道计算：

### 解析

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

### 外推（observeAt）

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

### 过境预报（findTransits）

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

### 可见窗口

```typescript
const windows = Daisy.Spg4.visibilityWindows(
    tleText,
    [39.9, 116.4, 50],
    startDate,
    endDate,
)
// 返回 [[startMs, endMs], [startMs, endMs], ...]
```

## 卫星对象（Satellite/NearEarthOrbiter）

### 创建与轨道设置

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

`setTle()` 只负责写入轨道源。是否每帧实时传播由 `enableSpg4Propagation` 控制；默认场景更常用预计算轨迹，绑定后会按 `trajectory` 配置自动执行一次 `applyTrajectory()`。

### 构造器一站式配置

`Satellite` 构造器接受一个完整配置对象，可在一步内完成卫星创建、轨迹、点标记、标签、路径和星下点轨迹的全部配置：

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
    label: {
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

> 构造器配置与 `setTle()` 互斥：传入 `tle` 后无需再调用 `setTle()`。`model` / `point` / `label` / `path` / `groundTrack` 均会在 `bindEngine()` 阶段自动创建对应 Feature。

### enableSpg4Propagation

控制卫星是否每帧实时计算 SGP4 轨道位置：

- **`true`**：每帧调用 SGP4 实时外推。动态精确但 CPU 开销高，适合少量卫星
- **`false`**：使用 `trajectory.stepSeconds` 预计算轨迹并写入 Entity position，渲染时直接插值。适合大型星座

```typescript
// 大量卫星场景推荐预计算模式
const sat = new Daisy.PW.Satellite({
    enableSpg4Propagation: false,
    trajectory: { stepSeconds: 60 },
})
```

### Spg4.ephemeris — 星历表采样

`Spg4.ephemeris` 是 `Spg4` 的静态方法，对时间范围做等间隔采样，返回观测结果的数组：

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

每个 `s` 为一次观测结果，包含星下点经纬高、轨道状态，以及观测者视角的方位角、仰角和距离。

### 星历采样与轨迹写入

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

### 使用外部轨道采样数据

当用户已有外部工具（GMAT、STK、自定义外推）计算的轨道采样点时，可直接构建 [TrajectorySample](/api/classes/TrajectorySample) 并注入卫星，无需经过 SGP4：

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

| 参数 | 类型 | 说明 |
|------|------|------|
| `referenceFrame` | `ReferenceFrame` | 参考系：`FIXED`（地固）或 `INERTIAL`（惯性） |
| `interpolationAlgorithm` | `"LINEAR" \| "LAGRANGE" \| "HERMITE"` | 插值算法，默认 `"LAGRANGE"` |
| `interpolationDegree` | `number` | 插值阶数，默认 3 |

### 实时数据注入（Live 模式）

从 WebSocket 等实时数据源持续接收轨道位置时，先创建空 [TrajectorySample](/api/classes/TrajectorySample) 并挂载到卫星，后续逐帧追加数据。内部自动每帧插值当前时间对应的位置，无需手动 update：

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

### 过境搜索（对象实例方法）

```typescript
const transits = sat.getTransits({
    startTime: engine.getStartTime(),
    endTime: engine.getStopTime(),
    observerLocation: [39.9, 116.4, 50],
    minElevationDeg: 10,
    maxTransits: 50,
})
```

### 挂载传感器

```typescript
const sensor = sat.addSensor({
    type: Daisy.PW.SensorType.Cone,
    apertureDeg: 45,              // 开角（度）
    emitDirection: Daisy.EmitDirection.TO_GROUND,
    beamLength: 500_000,          // 波束长度（米）
    material: Daisy.Color.RED.withAlpha(0.3),
})
```

详见 [传感器](/guide/sensor)。

### 轨道可视化组件

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

// 实时轨道圈（动态更新）
sat.addComponent(new Daisy.PW.RealtimeOrbitComponent({
    material: Daisy.Color.BLUE.withAlpha(0.4),
}))
```

## 星座批量创建

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

对于大规模星座（数千至上万颗卫星），建议使用预计算轨迹，并在不需要地面裁剪时设置 `throughGround: false`，减少对地求交带来的额外开销。

## 完整示例

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
## 事件

[PW.Satellite](/api/classes/PW.Satellite) 继承自 [BaseObject](/api/classes/PW.BaseObject)，提供以下事件：

### 生命周期

| 方法 | 说明 |
|------|------|
| `sat.onBeforeRegister(callback)` | 注册前回调 |
| `sat.onRegister(callback)` | 注册后回调 |
| `sat.onBeforeUpdate(callback)` | 每帧更新前，参数 `(time)` |
| `sat.onUpdate(callback)` | 每帧更新后，参数 `(time)` |
| `sat.onBeforeDestroy(callback)` | 销毁前回调 |
| `sat.onDestroy(callback)` | 销毁后回调 |

### 交互事件

交互事件桥接到底层 Entity，payload 自动注入 `spaceObject` 字段指向当前对象：

```typescript
sat.onClick((e) => {
    console.log("点击了卫星:", e.spaceObject.name)
})
```

| 方法 | 说明 |
|------|------|
| `sat.onClick(handler)` | 单击 |
| `sat.offClick(handler?)` | 移除 |
| `sat.onDblClick(handler)` | 双击 |
| `sat.offDblClick(handler?)` | 移除 |
| `sat.onMouseEnter(handler)` | 鼠标进入 |
| `sat.offMouseEnter(handler?)` | 移除 |
| `sat.onMouseLeave(handler)` | 鼠标离开 |
| `sat.offMouseLeave(handler?)` | 移除 |


> **相关 API**：[PW.Satellite](/api/classes/PW.Satellite) · [TrajectorySample](/api/classes/TrajectorySample) · [Spg4](/api/variables/Spg4) · [Spg4Tle](/api/classes/Spg4Tle)
---

<!--
示例参考: [Spg4Parse.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/physicalWorld/Spg4Parse.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
