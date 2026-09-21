# Ground Stations

GroundStation is a tracking and control site fixed to a planetary surface. It can mount an antenna model, deploy air-facing sensors, and establish communication links with spacecraft. `PW.Site` is a semantic alias for `PW.GroundStation`; the two are equivalent.

## Object Hierarchy

```
BaseObject（抽象基类）
  └── FreeObject
        └── Vehicle                    ← 传感器默认 TO_FRONT
              └── GroundStation / Site ← 传感器默认 TO_UP
```

## Create a Ground Station

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

// 默认：构造时自动挂载内置 daisy 固定地面站模型
const site = new Daisy.PW.GroundStation({
    name: "Beijing-DSN",
    position: Daisy.Cartesian3.fromDegrees(116.4, 39.9, 80),
    text: {
        text: "Beijing-DSN",
        font: "13px sans-serif",
        offsetPx: new Daisy.Cartesian2(0, -26),
        showBackground: true,
    },
})
site.bindEngine(engine)

// 关闭内置模型：仅保留点位/文本
const bareSite = new Daisy.PW.GroundStation({
    name: "Beijing-DSN-Bare",
    position: Daisy.Cartesian3.fromDegrees(116.4, 39.9, 80),
    useBuiltinModel: false,
    point: false,
    text: {
        text: "Beijing-DSN",
        font: "13px sans-serif",
        offsetPx: new Daisy.Cartesian2(0, -26),
        showBackground: true,
    },
})
// 等价写法：stationModel: false 或 model: false
bareSite.bindEngine(engine)
```

GroundStation mounts the `daisy` fixed-ground-station model by default (`models/daisy-fixed-ground-station.glb`). Use `stationModel` to select a preset station type or provide a custom model configuration. You can also disable the model with `useBuiltinModel: false` / `model: false`. See [Built-in Model Library](/en/guide/model-library).

## Station Types (stationModel)

| Value | Description |
|------|------|
| `"daisy"` | Built-in fixed ground station (default) |
| `"dsn34"` | DSN 34 m antenna preset (currently mapped to builtin `fixedGroundStation`) |
| `"dsn70"` | DSN 70 m large-antenna preset |
| `"radome"` | Radome preset |
| `false` | Do not mount a model; display only the point |
| `ModelOptions` | Custom model (url / minimumPixelSize / maximumScale) |

The shared toggle `useBuiltinModel` also applies here (default `true`): set it to `false` to skip automatic builtin mounting.

## Control Antenna Orientation

The antenna model controls orientation through the `azimuth` and `elevation` rotation nodes. Use `setAntennaPointing()` to drive these model nodes:

```typescript
// 方位角 135°，俯仰角 42°
site.setAntennaPointing(135, 42)

// 获取天线节点列表，确认可控节点
const nodes = site.getAntennaNodeNames()
// 示例输出：["azimuth", "elevation", "base", ...]
```

Use `antenna` to configure custom rotation-node names, rotation axes, and angle offsets:

```typescript
const site = new Daisy.PW.GroundStation({
    name: "Custom-Antenna",
    useBuiltinModel: true,          // 默认开启；false 时不挂载内置模型
    stationModel: "dsn70",          // 也可换成 "daisy" / "dsn34" / "radome"
    antenna: {
        azimuthNode: "azimuth",
        elevationNode: "elevation",
        azimuthAxis: Daisy.Cartesian3.UNIT_Y,
        elevationAxis: Daisy.Cartesian3.UNIT_X,
        azimuthOffsetDeg: 0,
        elevationOffsetDeg: 0,
    },
})
```

> `link.track` on Sensor controls the actual beam direction; `setAntennaPointing()` only drives the model nodes' visual orientation.

## Add Sensors

GroundStation sensors use `TO_UP` (pointing toward the sky) by default, which is suitable for air-observation scenarios:

```typescript
const beam = site.addSensor({
    name: "Tracking-Beam",
    type: Daisy.PW.SensorType.EllipticalCone,
    emitDirection: Daisy.EmitDirection.TO_UP,  // 默认值，可省略
    apertureDeg: { xDeg: 4.5, yDeg: 4.5 },
    beamLength: 180_000,
    color: Daisy.Color.CYAN.withAlpha(0.34),
    outline: true,
    outlineColor: Daisy.Color.WHITE.withAlpha(0.72),
})
```

Sensors can track an aircraft through `link.track`, keeping the beam pointed at the target in real time:

```typescript
const trackPlan = [{ start: missionStart, end: missionStop, target: aircraft }]

site.addSensor({
    name: "Tracking-Beam",
    type: Daisy.PW.SensorType.EllipticalCone,
    apertureDeg: 4.5,
    beamLength: 180_000,
    color: Daisy.Color.CYAN.withAlpha(0.34),
    link: {
        track: trackPlan,
        flow: { activeWhen: [{ start: missionStart, end: missionStop }] },
    },
})
```

See [Sensors](/en/guide/sensor).

## Add Communication Links

`addLink()` creates a visual link between the ground station and a target spacecraft, with time scheduling and flow animation:

```typescript
site.addLink({
    name: "Telemetry-Link",
    target: aircraft,
    color: Daisy.Color.LIME,
    width: 3,
    direction: "forward",
    speed: 1.35,
    show: [{ start: missionStart, end: missionStop }],
    arcType: Daisy.ArcType.NONE,
})
```

See [Link Communication](/en/guide/link).

## Integrate Transit Forecasts

Use `getTransits()` to obtain satellite transit windows and pass those window times to the link's `show` configuration:

```typescript
const transits = sat.getTransits({
    startTime: engine.getStartTime(),
    endTime: engine.getStopTime(),
    observerLocation: [39.9, 116.4, 80],
    minElevationDeg: 10,
})

const passSlots = transits.map(t => ({ start: t.start, end: t.end }))
```

## Constructor Parameters

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `name` | `string` | — | Site name |
| `position` | `Cartesian3` | `ZERO` | ECEF coordinates |
| `stationModel` | `"daisy"` \| `"dsn34"` \| `"dsn70"` \| `"radome"` \| `ModelOptions` \| `false` | `"daisy"` | Antenna model configuration |
| `model` | `ModelOptions` \| `false` | — | Overrides stationModel; false prevents mounting a model |
| `useBuiltinModel` | `boolean` | `true` | Whether to enable the builtin model; `false` skips automatic mounting |
| `antenna` | `GroundStationAntennaPointingOptions` | — | Antenna-node control configuration |
| `text` | `TextOptions` \| `false` | — | Text |
| `point` | `PointComOptions` \| `false` | — | Point marker |
| `image` | `ImageOptions` \| `false` | — | Image |
| `sensors` | `SensorOptions` \| `SensorOptions[]` | — | Sensors to mount initially |

## Events

[PW.GroundStation](/en/api/classes/PW.GroundStation) extends [BaseObject](/en/api/classes/PW.BaseObject). Its event API matches [Satellites](/en/guide/satellite#事件), including the complete lifecycle and interaction events.

---

> **Related API**: [PW.GroundStation](/en/api/classes/PW.GroundStation) · [PW.Sensor](/en/api/classes/PW.Sensor) · [PW.Link](/en/api/classes/PW.Link) · [PW.Aircraft](/en/api/classes/PW.Aircraft)
