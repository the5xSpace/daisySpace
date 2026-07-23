# Rocket and Propulsion Dynamics

[PW.Rocket](/en/api/classes/PW.Rocket) wraps the complete rocket-launch simulation workflow: configure the launch site and multistage propulsion parameters, use the built-in RK4 integrator to calculate the ascent trajectory, and output position samples, flight events, and a flight summary. It also provides engine-particle visuals, body-axis debugging, and automatic attitude alignment.

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

[Rocket](/en/api/classes/PW.Rocket) inherits all configuration from [Vehicle](/en/api/classes/PW.Vehicle) and adds rocket-specific parameters:

| Parameter | Type | Description |
|------|------|------|
| `model` | `ModelFeatureOptions` | 3D model (glTF / GLB) |
| `label` | `LabelFeatureOptions` | Text label |
| `ascent` | `AscentTrajectoryOptions` | Ascent trajectory configuration, which can be passed directly to the constructor |
| `epoch` | `JulianDate` | Trajectory start time |
| `autoOrientationByVelocity` | `boolean` | Rotate automatically along the velocity direction (default `true`) |
| `autoAlignVerticalModelToFlight` | `boolean` | Automatically align model Z-up to X-forward (default `true`) |
| `bodyAxis` | `boolean \| BodyAxisOptions` | Show body-coordinate debugging axes |

## Propulsion System

### PropulsionComponent / JetEngine

[JetEngine](/en/api/classes/PW.JetEngine) is a semantic subclass of [PropulsionComponent](/en/api/classes/PW.PropulsionComponent) that controls the visual effect of particle flames. **At this stage, flames do not affect trajectory physics.**

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
|------|------|
| `engine.start(power?)` | Ignite (`power` from 0 to 1) |
| `engine.stop()` | Shut down |
| `engine.setPower(n)` | Adjust thrust from 0 to 1 (visual effect only) |
| `engine.enabled` | Whether the engine is enabled |

`Rocket` includes a default `"main-engine"` propulsion component, which can be controlled directly with `rocket.ignite(power)` / `rocket.shutdown()` / `rocket.setThrottle(power)`.

## Ascent Trajectory

The built-in 2D RK4 integrator simulates powered-flight dynamics in the orbital plane: thrust, gravity, and aerodynamic drag vary over time while mass decreases as propellant is consumed. After launch-site parameters and stage configuration are provided, the integrator advances from launch time at a fixed step and outputs an ECEF position-sample sequence ([TrajectorySample](/en/api/classes/TrajectorySample)) for quickly estimating powered-flight orbit samples.

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
|------|------|------|
| `latitude` | `number` | Latitude in degrees |
| `longitude` | `number` | Longitude in degrees |
| `altitude` | `number` | Launch-site altitude in meters |
| `azimuth` | `number` | Launch azimuth in degrees (0 = north, 90 = east) |

### Rocket Stages

| Parameter | Type | Description |
|------|------|------|
| `thrust` | `number` | Thrust in newtons (N) |
| `isp` | `number` | Specific impulse in seconds |
| `propellantMass` | `number` | Propellant mass in kg |
| `dryMass` | `number` | Dry mass in kg (mass remaining after burnout) |

The integrator handles stage separation automatically: the upper stage is discarded after burnout and the next stage ignites. The final payload remains in ballistic flight.

### Pitch Program

| Parameter | Type | Description |
|------|------|------|
| `startTime` | `number` | Pitch start time in seconds after launch |
| `pitchRate` | `number` | Pitch-angle rate in degrees per second |
| `endAngle` | `number` | Final pitch angle in degrees (0 = horizontal, 90 = vertical) |

Typical values start the pitch maneuver 10 to 15 seconds after launch, gradually turning from 90° (vertical) toward horizontal at about 0.3 to 0.5 degrees per second. The final angle is usually 5 to 15°.

### Aerodynamic Drag

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `enabled` | `boolean` | `false` | Whether to enable atmospheric drag |
| `dragCoeff` | `number` | — | Drag coefficient (dimensionless) |
| `area` | `number` | — | Reference area (m²) |

The drag model uses the ISA-1976 standard atmospheric density, which decays exponentially with altitude.

### Flight Phases

The integrator divides the flight into four phases automatically:

| Phase | Trigger | Behavior |
|------|----------|------|
| `VERTICAL` | Launch begins | Vertical ascent with no horizontal velocity |
| `PITCHOVER` | Pitch program triggers | Gradually lower the pitch angle at `pitchRate` |
| `GRAVITY_TURN` | Pitch reaches `endAngle` | Align velocity with thrust; gravity naturally bends the trajectory |
| `BALLISTIC` | Final-stage burnout | Gravity and drag only, with no thrust |

## Read Results

After `applyAscentTrajectory()` is called, [Rocket](/en/api/classes/PW.Rocket) automatically fills the following read-only properties:

```typescript
const events  = rocket.events     // AscentEvent[]
const summary = rocket.summary   // AscentSummary | undefined
const traj    = rocket.trajectory // TrajectorySample | undefined
```

### AscentEvent

| Field | Type | Description |
|------|------|------|
| `time` | `number` | Event time in seconds after launch |
| `type` | `"liftoff" \| "pitchover" \| "staging" \| "burnout" \| "apogee"` | Event type |
| `altitude` | `number` | Current altitude in meters |
| `velocity` | `number` | Current speed in m/s |

### AscentSummary

| Field | Type | Description |
|------|------|------|
| `maxAltitude` | `number` | Maximum altitude in meters |
| `maxVelocity` | `number` | Maximum speed in m/s |
| `maxAcceleration` | `number` | Maximum acceleration in m/s² |
| `totalDeltaV` | `number` | Total ΔV in m/s |
| `apogeeAltitude` | `number` | Apogee altitude in meters |
| `events` | `AscentEvent[]` | Complete event list |

### Real-Time Telemetry

Query the flight state at any time with `getFlightStateAtTime()`:

```typescript
engine.onPreRender((time) => {
    const st = rocket.getFlightStateAtTime(time)
    console.log(st.altitudeMeters, st.speedMetersPerSecond, st.elapsedSeconds)
})
```

## Use Precomputed Trajectory Samples

When trajectory samples have already been calculated by an external tool such as a custom ascent simulation or ballistic solver, build a [TrajectorySample](/en/api/classes/TrajectorySample) directly and inject it into the rocket to bypass the built-in RK4 integrator:

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

## Real-Time Data Injection (Live Mode)

When receiving rocket positions continuously from a real-time source such as a telemetry stream, create an empty [TrajectorySample](/en/api/classes/TrajectorySample), attach it to the rocket, and append data frame by frame:

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

## Model and Attitude

Default behavior:
- `autoOrientationByVelocity: true` — The entity always faces the velocity direction
- `autoAlignVerticalModelToFlight: true` — Automatically rotate the model from Z-up to flight X-forward

If the model is already vertical on the launch pad, such as Saturn V, disable automatic alignment in the constructor:

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

[PW.Rocket](/en/api/classes/PW.Rocket) inherits from [BaseObject](/en/api/classes/PW.BaseObject) and provides the following events:

### Lifecycle

| Method | Description |
|------|------|
| `rocket.onBeforeRegister(callback)` | Callback before registration |
| `rocket.onRegister(callback)` | Callback after registration |
| `rocket.onBeforeUpdate(callback)` | Callback before each frame update, with `(time)` |
| `rocket.onUpdate(callback)` | Callback after each frame update, with `(time)` |
| `rocket.onBeforeDestroy(callback)` | Callback before destruction |
| `rocket.onDestroy(callback)` | Callback after destruction |

### Interaction Events

Interaction events are bridged to the underlying Entity. The payload automatically receives a `spaceObject` field pointing to the current object:

```typescript
rocket.onClick((e) => {
    console.log("点击了火箭:", e.spaceObject.name)
})
```

| Method | Description |
|------|------|
| `rocket.onClick(handler)` | Click |
| `rocket.offClick(handler?)` | Remove listener |
| `rocket.onDblClick(handler)` | Double-click |
| `rocket.offDblClick(handler?)` | Remove listener |
| `rocket.onMouseEnter(handler)` | Mouse enter |
| `rocket.offMouseEnter(handler?)` | Remove listener |
| `rocket.onMouseLeave(handler)` | Mouse leave |
| `rocket.offMouseLeave(handler?)` | Remove listener |


## Advanced: Use AscentTrajectoryBuilder Directly

If the automatic visualization wrapped by [Rocket](/en/api/classes/PW.Rocket) is not needed, use [AscentTrajectoryBuilder](/en/api/classes/AscentTrajectoryBuilder) directly to generate a raw trajectory:

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

> **Related APIs**: [PW.Rocket](/en/api/classes/PW.Rocket) · [PW.Vehicle](/en/api/classes/PW.Vehicle) · [PW.JetEngine](/en/api/classes/PW.JetEngine) · [PW.PropulsionComponent](/en/api/classes/PW.PropulsionComponent) · [AscentTrajectoryBuilder](/en/api/classes/AscentTrajectoryBuilder) · [TrajectorySample](/en/api/classes/TrajectorySample)
