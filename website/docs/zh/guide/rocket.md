# 火箭与推进动力学

[PW.Rocket](/api/classes/PW.Rocket) 封装了火箭发射仿真的完整流程：配置发射场与多级推进参数 → 内置 RK4 积分器自动计算上升轨迹 → 输出位置序列、飞行事件与飞行摘要。同时提供发动机粒子视觉、本体坐标系调试轴和自动朝向对齐。

## 最小示例

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("container")
const entity = engine.createEntity("demo")

const rocket = new Daisy.PW.Rocket({
    name: "Saturn V",
    model: { url: "/models/SaturnV.glb", scale: 0.06 },
})

rocket.bindEngine(engine)

// 配置上升轨迹并发射
const epoch = Daisy.JulianDate.fromDate(new Date("2026-07-01T00:00:00Z"))
rocket.applyAscentTrajectory(epoch, {
    launchSite: { latitude: 28.5, longitude: -80.5, altitude: 0, azimuth: 90 },
    stages: [
        { thrust: 7_607_000, isp: 311, propellantMass: 395_000, dryMass: 25_600 },
        { thrust: 934_000, isp: 348, propellantMass: 92_670, dryMass: 4_500 },
    ],
    payloadMass: 15_600,
    pitchProgram: { startTime: 12, pitchRate: 0.4, endAngle: 8 },
    drag: { enabled: true, dragCoeff: 0.3, area: 10.75 },
    timestep: 0.25,
})

rocket.ignite(1)
engine.setSceneTime(epoch, rocket.stopTime!, false)
engine.flyTo(rocket, { duration: 3 })
engine.play(10)
```

## 类层次

```
BaseObject
 └── FreeObject         位置 / 朝向 / path
      └── Vehicle       传感器 + 推进组件管理
           └── Rocket   上升轨迹 + 自动朝向 + 火焰控制
```

## 构造配置

[Rocket](/api/classes/PW.Rocket) 继承 [Vehicle](/api/classes/PW.Vehicle) 的所有配置，加上火箭专属参数：

| 参数 | 类型 | 说明 |
|------|------|------|
| `model` | `ModelFeatureOptions` | 3D 模型（glTF / GLB） |
| `text` | `TextOptions` | 文本 |
| `ascent` | `AscentTrajectoryOptions` | 上升轨迹配置（可在构造时直接传入） |
| `epoch` | `JulianDate` | 轨迹起始时间 |
| `autoOrientationByVelocity` | `boolean` | 自动按速度方向旋转（默认 `true`） |
| `autoAlignVerticalModelToFlight` | `boolean` | 模型 Z-up → X-forward 自动对齐（默认 `true`） |
| `bodyAxis` | `boolean \| BodyAxisOptions` | 显示本体坐标系调试轴 |

## 推进系统

### PropulsionComponent / JetEngine

[JetEngine](/api/classes/PW.JetEngine) 是 [PropulsionComponent](/api/classes/PW.PropulsionComponent) 的语义子类，控制粒子火焰的视觉效果。**当前阶段火焰不影响轨迹物理计算。**

```typescript
const engine = rocket.addPropulsion(new Daisy.PW.JetEngine({
    name: "main-engine",
    position: new Daisy.Cartesian3(0, 0, 0),
    scale: new Daisy.Cartesian3(1.25, 1.25, 1.25),
    enabled: false,
    power: 0,
    particle: {
        preset: "rocket-flame",
        color: Daisy.Color.ORANGE,
        length: 92,
        radius: 8.5,
        screenSpaceSizing: true,
        minLengthPx: 92,
        maxLengthPx: 280,
    },
}))
```

| 方法 | 说明 |
|------|------|
| `engine.start(power?)` | 点火（`power` 0~1） |
| `engine.stop()` | 关机 |
| `engine.setPower(n)` | 调节推力（0~1，仅视觉效果） |
| `engine.enabled` | 是否启用 |

`Rocket` 自带一个默认 `"main-engine"` 推进组件，可通过 `rocket.ignite(power)` / `rocket.shutdown()` / `rocket.setThrottle(power)` 直接控制。

## 上升轨迹

内置 2D RK4 积分器在轨道面内模拟主动段动力学：推力、重力、气动阻力随时间变化，质量随推进剂消耗递减。输入发射场参数和级数配置后，积分器从发射时刻起按固定步长推进，输出 ECEF 位置采样序列（[TrajectorySample](/api/classes/TrajectorySample)），可用于快速推算主动段的轨道采样。

### AscentTrajectoryOptions

调用 `applyAscentTrajectory()` 传入的参数对象，驱动内置的 2D RK4 积分器：

```typescript
rocket.applyAscentTrajectory(epoch, {
    launchSite: { ... },  // 发射场
    stages: [ ... ],      // 火箭级数
    pitchProgram: { ... },// 俯仰程序
    drag: { ... },        // 气动阻力
    timestep: 0.25,       // 积分步长（秒）
    payloadMass: 15_600,  // 有效载荷质量（kg）
})
```

### 发射场

| 参数 | 类型 | 说明 |
|------|------|------|
| `latitude` | `number` | 纬度（度） |
| `longitude` | `number` | 经度（度） |
| `altitude` | `number` | 发射场海拔（米） |
| `azimuth` | `number` | 发射方位角（度，0=正北，90=正东） |

### 火箭级数

| 参数 | 类型 | 说明 |
|------|------|------|
| `thrust` | `number` | 推力（牛顿，N） |
| `isp` | `number` | 比冲（秒） |
| `propellantMass` | `number` | 推进剂质量（kg） |
| `dryMass` | `number` | 干重（kg，燃尽后剩余质量） |

积分器自动处理级间分离：上一级燃尽后抛离，下一级点火。最终 payload 留在弹道飞行。

### 俯仰程序

| 参数 | 类型 | 说明 |
|------|------|------|
| `startTime` | `number` | 俯仰开始时间（发射后秒数） |
| `pitchRate` | `number` | 俯仰角变化率（度/秒） |
| `endAngle` | `number` | 最终俯仰角（度，0=水平，90=垂直） |

典型参数：发射后 10~15 秒开始俯仰，以约 0.3~0.5 度/秒的速率从 90°（垂直）逐渐转向水平，最终角通常 5~15°。

### 气动阻力

| 参数 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `enabled` | `boolean` | `false` | 是否启用大气阻力 |
| `dragCoeff` | `number` | — | 阻力系数（无量纲） |
| `area` | `number` | — | 参考面积（m²） |

阻力模型使用 ISA-1976 标准大气密度，随海拔指数衰减。

### 飞行阶段

积分器自动划分四个阶段：

| 阶段 | 触发条件 | 行为 |
|------|----------|------|
| `VERTICAL` | 发射开始 | 垂直上升，无水平速度 |
| `PITCHOVER` | 俯仰程序触发 | 按 `pitchRate` 逐渐压低俯仰角 |
| `GRAVITY_TURN` | 俯仰角到达 `endAngle` | 速度方向与推力方向对齐，重力自然弯曲轨迹 |
| `BALLISTIC` | 末级燃尽 | 仅受重力 + 阻力，无推力 |

## 读取结果

`applyAscentTrajectory()` 调用后，[Rocket](/api/classes/PW.Rocket) 自动填充以下只读属性：

```typescript
const events  = rocket.events     // AscentEvent[]
const summary = rocket.summary   // AscentSummary | undefined
const traj    = rocket.trajectory // TrajectorySample | undefined
```

### AscentEvent

| 字段 | 类型 | 说明 |
|------|------|------|
| `time` | `number` | 事件时间（发射后秒数） |
| `type` | `"liftoff" \| "pitchover" \| "staging" \| "burnout" \| "apogee"` | 事件类型 |
| `altitude` | `number` | 当前海拔（米） |
| `velocity` | `number` | 当前速率（m/s） |

### AscentSummary

| 字段 | 类型 | 说明 |
|------|------|------|
| `maxAltitude` | `number` | 最大海拔（米） |
| `maxVelocity` | `number` | 最大速率（m/s） |
| `maxAcceleration` | `number` | 最大加速度（m/s²） |
| `totalDeltaV` | `number` | 总 ΔV（m/s） |
| `apogeeAltitude` | `number` | 远地点海拔（米） |
| `events` | `AscentEvent[]` | 完整事件列表 |

### 实时遥测

通过 `getFlightStateAtTime()` 查询任意时刻的飞行状态：

```typescript
engine.onPreRender((time) => {
    const st = rocket.getFlightStateAtTime(time)
    console.log(st.altitudeMeters, st.speedMetersPerSecond, st.elapsedSeconds)
})
```

## 使用预计算轨迹采样

当用户已有外部工具（定制上升仿真、外部弹道解算）计算的轨迹采样点时，可直接构建 [TrajectorySample](/api/classes/TrajectorySample) 并注入火箭，跳过内置 RK4 积分器：

```typescript
// 1. 创建火箭（不调用 applyAscentTrajectory）
const rocket = new Daisy.PW.Rocket({ name: "MyRocket", model: { url: "/models/rocket.glb" } })
rocket.bindEngine(engine)

// 2. 用外部上升仿真结果构建轨迹
const traj = new Daisy.TrajectorySample(Daisy.ReferenceFrame.FIXED, {
    interpolationAlgorithm: "LAGRANGE",
    interpolationDegree: 5,
})

traj.pushData([
    { time: t0, position: Daisy.Cartesian3.fromDegrees(lon0, lat0, alt0) },
    { time: t1, position: Daisy.Cartesian3.fromDegrees(lon1, lat1, alt1) },
    // ... 更多采样点
])

// 3. 绑定位置
rocket.position = traj
```

## 实时数据注入（Live 模式）

从遥测流等实时数据源持续接收火箭位置时，先创建空 [TrajectorySample](/api/classes/TrajectorySample) 并挂载到火箭，后续逐帧追加数据：

```typescript
// 1. 创建火箭，挂载空轨迹
const rocket = new Daisy.PW.Rocket({ name: "LiveRocket", model: { url: "/models/rocket.glb" } })
const liveTraj = new Daisy.TrajectorySample(Daisy.ReferenceFrame.FIXED, { interpolationDegree: 3 })

rocket.bindEngine(engine)
rocket.position = liveTraj

// 2. 逐帧注入实时遥测
telemetryStream.on("data", (packet) => {
    liveTraj.pushData({
        time: Daisy.JulianDate.fromIso8601(packet.timestamp),
        position: Daisy.Cartesian3.fromDegrees(packet.lon, packet.lat, packet.alt),
    })
})
```

## 模型与朝向

默认行为：
- `autoOrientationByVelocity: true` — 实体始终朝向速度方向
- `autoAlignVerticalModelToFlight: true` — 模型 Z-up → 飞行 X-forward 自动旋转

如果模型在发射台上本身就是竖直的（如 Saturn V），应在构造时关闭自动对齐：

```typescript
new Daisy.PW.Rocket({
    model: { url: "/models/rocket.glb" },
    autoAlignVerticalModelToFlight: false,
})
```

## 完整工作流

```typescript
// 1. 创建
const rocket = new Daisy.PW.Rocket({ name: "Atlas V", model: { url: "/models/rocket.glb" } })

// 2. 绑定引擎
rocket.bindEngine(engine)

// 3. （可选）自定义发动机粒子
const mainEng = rocket.addPropulsion(new Daisy.PW.JetEngine({
    name: "main-engine",
    particle: {
        preset: "rocket-flame",
        color: Daisy.Color.ORANGE,
        length: 120,
        radius: 10,
        screenSpaceSizing: true,
    },
}))

// 4. 计算轨迹
rocket.applyAscentTrajectory(epoch, ascentOptions)

// 5. 点火 + 起飞
rocket.ignite(1)
engine.setSceneTime(rocket.startTime!, rocket.stopTime!, false)
engine.flyTo(rocket, { duration: 3 })
engine.play(10)

// 6. 监控
rocket.events.forEach(e => console.log(`${e.type} @ t+${e.time}s, alt=${e.altitude}m, v=${e.velocity}m/s`))
console.log("远地点:", rocket.summary?.apogeeAltitude, "m")
console.log("总 ΔV:", rocket.summary?.totalDeltaV, "m/s")
```

## 事件

[PW.Rocket](/api/classes/PW.Rocket) 继承自 [BaseObject](/api/classes/PW.BaseObject)，提供以下事件：

### 生命周期

| 方法 | 说明 |
|------|------|
| `rocket.onBeforeRegister(callback)` | 注册前回调 |
| `rocket.onRegister(callback)` | 注册后回调 |
| `rocket.onBeforeUpdate(callback)` | 每帧更新前，参数 `(time)` |
| `rocket.onUpdate(callback)` | 每帧更新后，参数 `(time)` |
| `rocket.onBeforeDestroy(callback)` | 销毁前回调 |
| `rocket.onDestroy(callback)` | 销毁后回调 |

### 交互事件

交互事件桥接到底层 Entity，payload 自动注入 `spaceObject` 字段指向当前对象：

```typescript
rocket.onClick((e) => {
    console.log("点击了火箭:", e.spaceObject.name)
})
```

| 方法 | 说明 |
|------|------|
| `rocket.onClick(handler)` | 单击 |
| `rocket.offClick(handler?)` | 移除 |
| `rocket.onDblClick(handler)` | 双击 |
| `rocket.offDblClick(handler?)` | 移除 |
| `rocket.onMouseEnter(handler)` | 鼠标进入 |
| `rocket.offMouseEnter(handler?)` | 移除 |
| `rocket.onMouseLeave(handler)` | 鼠标离开 |
| `rocket.offMouseLeave(handler?)` | 移除 |


## 进阶：直接使用 AscentTrajectoryBuilder

如果不需要 [Rocket](/api/classes/PW.Rocket) 封装的自动可视化，可直接使用 [AscentTrajectoryBuilder](/api/classes/AscentTrajectoryBuilder) 生成原始轨迹：

```typescript
const builder = new Daisy.PW.AscentTrajectoryBuilder()
    .launchSite(28.5, -80.5, 0, 90)
    .addStage(7_607_000, 311, 395_000, 25_600)
    .addStage(934_000, 348, 92_670, 4_500)
    .payloadMass(15_600)
    .pitchProgram(12, 0.4, 8)
    .drag({ enabled: true, dragCoeff: 0.3, area: 10.75 })
    .timestep(0.25)

const trajectory = builder.buildTrajectory(epoch)
const events = builder.getEvents()
const summary = builder.getSummary()

// 可手动注入任意 Entity
entity.position = trajectory
```

> **相关 API**：[PW.Rocket](/api/classes/PW.Rocket) · [PW.Vehicle](/api/classes/PW.Vehicle) · [PW.JetEngine](/api/classes/PW.JetEngine) · [PW.PropulsionComponent](/api/classes/PW.PropulsionComponent) · [AscentTrajectoryBuilder](/api/classes/AscentTrajectoryBuilder) · [TrajectorySample](/api/classes/TrajectorySample)
