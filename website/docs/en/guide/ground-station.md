# Ground Station

GroundStation is a tracking and control station fixed on a planetary surface, capable of mounting antenna models, deploying skyward sensors, and establishing communication links with spacecraft. `PW.Site` is a semantic alias for `PW.GroundStation` — they are fully equivalent.

## Object Hierarchy

```
BaseObject（抽象基类）
  └── FreeObject
        └── Vehicle                    ← 传感器默认 TO_FRONT
              └── GroundStation / Site ← 传感器默认 TO_UP
```

## Creating a Ground Station

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

const site = new Daisy.PW.GroundStation({
    name: "Beijing-DSN",
    position: Daisy.Cartesian3.fromDegrees(116.4, 39.9, 80),
    stationModel: false,          // 不挂载 3D 天线模型
    point: false,
    label: {
        text: "Beijing-DSN",
        font: "13px sans-serif",
        offsetPx: new Daisy.Cartesian2(0, -26),
        showBackground: true,
    },
})
site.bindEngine(engine)
```

GroundStation mounts the `dsn34` antenna model by default; you can select a preset station type or pass a custom model configuration via `stationModel`.

## Station Model Options (stationModel)

| Value | Description |
|-------|-------------|
| `"dsn34"` | DSN 34m antenna (default) |
| `"dsn70"` | DSN 70m large antenna |
| `"radome"` | Radome |
| `false` | No model, only display point |
| `ModelOptions` | Custom model (url / minimumPixelSize / maximumScale) |

## Antenna Pointing Control

The antenna model achieves attitude control through two rotation nodes: `azimuth` and `elevation`. Use `setAntennaPointing()` to drive the model nodes:

```typescript
// 方位角 135°，俯仰角 42°
site.setAntennaPointing(135, 42)

// 获取天线节点列表，确认可控节点
const nodes = site.getAntennaNodeNames()
// 示例输出：["azimuth", "elevation", "base", ...]
```

Custom rotation node names, axes, and offset angles can be configured via `antenna`:

```typescript
const site = new Daisy.PW.GroundStation({
    name: "Custom-Antenna",
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

> The Sensor's `link.track` is responsible for controlling the actual beam direction; `setAntennaPointing()` only drives the visual pose of the model nodes.

## Adding Sensors

GroundStation's sensors default to the `TO_UP` (skyward) installation direction, suitable for sky observation scenarios:

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

Sensors can track flying targets via `link.track`, enabling real-time beam pointing:

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

See [Sensor](/en/guide/sensor) for details.

## Adding Communication Links

`addLink()` establishes a visual link between the ground station and a target spacecraft, supporting time scheduling and flow animation:

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

See [Link Communication](/en/guide/link) for details.

## Transit Prediction Integration

Use the `getTransits()` method to obtain satellite transit windows, and use the window times for the link's `show` configuration:

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
|-----------|------|:---:|-------------|
| `name` | `string` | — | Station name |
| `position` | `Cartesian3` | `ZERO` | ECEF coordinates |
| `stationModel` | `"dsn34"` \| `"dsn70"` \| `"radome"` \| `ModelOptions` \| `false` | `"dsn34"` | Antenna model configuration |
| `model` | `ModelOptions` \| `false` | — | Overrides stationModel; pass false to not mount a model |
| `antenna` | `GroundStationAntennaPointingOptions` | — | Antenna node control configuration |
| `label` | `LabelOptions` \| `false` | — | Text label |
| `point` | `PointComOptions` \| `false` | — | Point marker |
| `billboard` | `BillboardOptions` \| `false` | — | Billboard |
| `sensors` | `SensorOptions` \| `SensorOptions[]` | — | Pre-mounted sensors |

## Events

[PW.GroundStation](/en/api/classes/PW.GroundStation) inherits from [BaseObject](/en/api/classes/PW.BaseObject), with the same event API as [Satellite](/en/guide/satellite#events), including full lifecycle events and interaction events.

---

> **Related API**: [PW.GroundStation](/en/api/classes/PW.GroundStation) · [PW.Sensor](/en/api/classes/PW.Sensor) · [PW.Link](/en/api/classes/PW.Link) · [PW.Aircraft](/en/api/classes/PW.Aircraft)
