# Rocket and Propulsion Dynamics

[PW.Rocket](/en/api/classes/PW.Rocket) encapsulates the complete process of rocket launch simulation: configuring launch site and multi-stage propulsion parameters → built-in RK4 integrator automatically computes the ascent trajectory → outputs position sequences, flight events, and flight summary. It also provides engine particle visuals, body coordinate system debug axes, and automatic orientation alignment.

## Minimal Example

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

## Class Hierarchy

```
BaseObject
 └── FreeObject         位置 / 朝向 / path
      └── Vehicle       传感器 + 推进组件管理
           └── Rocket   上升轨迹 + 自动朝向 + 火焰控制
```

## Constructor Configuration

[Rocket](/en/api/classes/PW.Rocket) inherits all configurations from [Vehicle](/en/api/classes/PW.Vehicle), plus rocket-specific parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `model` | `ModelFeatureOptions` | 3D model (glTF / GLB) |
| `label` | `LabelFeatureOptions` | Text label |
| `ascent` | `AscentTrajectoryOptions` | Ascent trajectory configuration (can be passed directly in constructor) |
| `epoch` | `JulianDate` | Trajectory start time |
| `autoOrientationByVelocity` | `boolean` | Auto-rotate by velocity direction (default `true`) |
| `autoAlignVerticalModelToFlight` | `boolean` | Model Z-up → X-forward auto-alignment (default `true`) |
| `bodyAxis` | `boolean \| BodyAxisOptions` | Show body coordinate system debug axes |

## Propulsion System

### PropulsionComponent / JetEngine

[JetEngine](/en/api/classes/PW.JetEngine) is a semantic subclass of [PropulsionComponent](/en/api/classes/PW.PropulsionComponent), controlling the visual effect of particle flames. **Currently, flames do not affect trajectory physics calculations.**

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

| Method | Description |
|--------|-------------|
| `engine.start(power?)` | Ignite (`power` 0~1) |
| `engine.stop()` | Shutdown |
| `engine.setPower(n)` | Adjust thrust (0~1, visual only) |
| `engine.enabled` | Whether enabled |

`Rocket` comes with a default `"main-engine"` propulsion component, directly controllable via `rocket.ignite(power)` / `rocket.shutdown()` / `rocket.setThrottle(power)`.

## Ascent Trajectory

The built-in 2D RK4 integrator simulates boost-phase dynamics within the orbital plane: thrust, gravity, and aerodynamic drag vary over time, with mass decreasing as propellant is consumed. After inputting launch site parameters and stage configuration, the integrator advances from launch time at a fixed step size, outputting an ECEF position sampling sequence ([TrajectorySample](/en/api/classes/TrajectorySample)), which can be used to quickly estimate the boost-phase orbit samples.

### AscentTrajectoryOptions

The parameter object passed to `applyAscentTrajectory()` drives the built-in 2D RK4 integrator:

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

### Launch Site

| Parameter | Type | Description |
|-----------|------|-------------|
| `latitude` | `number` | Latitude (degrees) |
| `longitude` | `number` | Longitude (degrees) |
| `altitude` | `number` | Launch site altitude (meters) |
| `azimuth` | `number` | Launch azimuth (degrees, 0=north, 90=east) |

### Rocket Stages

| Parameter | Type | Description |
|-----------|------|-------------|
| `thrust` | `number` | Thrust (Newtons, N) |
| `isp` | `number` | Specific impulse (seconds) |
| `propellantMass` | `number` | Propellant mass (kg) |
| `dryMass` | `number` | Dry mass (kg, remaining mass after burnout) |

The integrator automatically handles stage separation: the previous stage jettisons after burnout, and the next stage ignites. The final payload remains in ballistic flight.

### Pitch Program

| Parameter | Type | Description |
|-----------|------|-------------|
| `startTime` | `number` | Pitch start time (seconds after launch) |
| `pitchRate` | `number` | Pitch angle change rate (degrees/second) |
| `endAngle` | `number` | Final pitch angle (degrees, 0=horizontal, 90=vertical) |

Typical parameters: start pitching 10~15 seconds after launch, gradually turning from 90° (vertical) to horizontal at a rate of about 0.3~0.5 degrees/second, with a final angle of typically 5~15°.

### Aerodynamic Drag

| Parameter | Type | Default | Description |
|-----------|------|:---:|-------------|
| `enabled` | `boolean` | `false` | Whether to enable atmospheric drag |
| `dragCoeff` | `number` | — | Drag coefficient (dimensionless) |
| `area` | `number` | — | Reference area (m²) |

The drag model uses the ISA-1976 standard atmospheric density, exponentially decaying with altitude.

### Flight Phases

The integrator automatically divides into four phases:

| Phase | Trigger Condition | Behavior |
|-------|------------------|----------|
| `VERTICAL` | Launch start | Vertical ascent, no horizontal velocity |
| `PITCHOVER` | Pitch program triggered | Gradually reduces pitch angle according to `pitchRate` |
| `GRAVITY_TURN` | Pitch angle reaches `endAngle` | Velocity direction aligns with thrust direction, gravity naturally curves the trajectory |
| `BALLISTIC` | Final stage burnout | Only gravity + drag, no thrust |

## Reading Results

After `applyAscentTrajectory()` is called, [Rocket](/en/api/classes/PW.Rocket) automatically populates the following read-only properties:

```typescript
const events  = rocket.events     // AscentEvent[]
const summary = rocket.summary   // AscentSummary | undefined
const traj    = rocket.trajectory // TrajectorySample | undefined
```

### AscentEvent

| Field | Type | Description |
|-------|------|-------------|
| `time` | `number` | Event time (seconds after launch) |
| `type` | `"liftoff" \| "pitchover" \| "staging" \| "burnout" \| "apogee"` | Event type |
| `altitude` | `number` | Current altitude (meters) |
| `velocity` | `number` | Current velocity (m/s) |

### AscentSummary

| Field | Type | Description |
|-------|------|-------------|
| `maxAltitude` | `number` | Maximum altitude (meters) |
| `maxVelocity` | `number` | Maximum velocity (m/s) |
| `maxAcceleration` | `number` | Maximum acceleration (m/s²) |
| `totalDeltaV` | `number` | Total ΔV (m/s) |
| `apogeeAltitude` | `number` | Apogee altitude (meters) |
| `events` | `AscentEvent[]` | Complete event list |

### Real-Time Telemetry

Query the flight state at any time via `getFlightStateAtTime()`:

```typescript
engine.onPreRender((time) => {
    const st = rocket.getFlightStateAtTime(time)
    console.log(st.altitudeMeters, st.speedMetersPerSecond, st.elapsedSeconds)
})
```

## Using Pre-Computed Trajectory Samples

When you already have trajectory sampling points computed by external tools (custom ascent simulation, external ballistic solver), you can directly construct a [TrajectorySample](/en/api/classes/TrajectorySample) and inject it into the rocket, bypassing the built-in RK4 integrator:

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

## Live Data Injection (Live Mode)

When continuously receiving rocket positions from real-time data sources like telemetry streams, first create an empty [TrajectorySample](/en/api/classes/TrajectorySample) and mount it to the rocket, then append data frame by frame:

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

## Model and Orientation

Default behavior:
- `autoOrientationByVelocity: true` — Entity always faces the velocity direction
- `autoAlignVerticalModelToFlight: true` — Model Z-up → flight X-forward auto-rotation

If the model is already vertical on the launch pad (like Saturn V), disable auto-alignment in the constructor:

```typescript
new Daisy.PW.Rocket({
    model: { url: "/models/rocket.glb" },
    autoAlignVerticalModelToFlight: false,
})
```

## Complete Workflow

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

## Events

[PW.Rocket](/en/api/classes/PW.Rocket) inherits from [BaseObject](/en/api/classes/PW.BaseObject), providing the following events:

### Lifecycle

| Method | Description |
|--------|-------------|
| `rocket.onBeforeRegister(callback)` | Pre-registration callback |
| `rocket.onRegister(callback)` | Post-registration callback |
| `rocket.onBeforeUpdate(callback)` | Pre-update each frame, parameter `(time)` |
| `rocket.onUpdate(callback)` | Post-update each frame, parameter `(time)` |
| `rocket.onBeforeDestroy(callback)` | Pre-destruction callback |
| `rocket.onDestroy(callback)` | Post-destruction callback |

### Interaction Events

Interaction events are bridged to the underlying Entity, with the payload automatically injecting the `spaceObject` field pointing to the current object:

```typescript
rocket.onClick((e) => {
    console.log("点击了火箭:", e.spaceObject.name)
})
```

| Method | Description |
|--------|-------------|
| `rocket.onClick(handler)` | Single click |
| `rocket.offClick(handler?)` | Remove |
| `rocket.onDblClick(handler)` | Double click |
| `rocket.offDblClick(handler?)` | Remove |
| `rocket.onMouseEnter(handler)` | Mouse enter |
| `rocket.offMouseEnter(handler?)` | Remove |
| `rocket.onMouseLeave(handler)` | Mouse leave |
| `rocket.offMouseLeave(handler?)` | Remove |


## Advanced: Direct Use of AscentTrajectoryBuilder

If you don't need the automatic visualization encapsulated by [Rocket](/en/api/classes/PW.Rocket), you can directly use [AscentTrajectoryBuilder](/en/api/classes/AscentTrajectoryBuilder) to generate raw trajectories:

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

> **Related API**: [PW.Rocket](/en/api/classes/PW.Rocket) · [PW.Vehicle](/en/api/classes/PW.Vehicle) · [PW.JetEngine](/en/api/classes/PW.JetEngine) · [PW.PropulsionComponent](/en/api/classes/PW.PropulsionComponent) · [AscentTrajectoryBuilder](/en/api/classes/AscentTrajectoryBuilder) · [TrajectorySample](/en/api/classes/TrajectorySample)
