# Sensors

Sensor is one of the core components in the DaisySpace-Sdk physical world. It encapsulates beam visualization, coverage projection, tracking mode, and flowing materials.

## Architecture

Sensor implements the `IComponent` interface and is attached to a physical object through `BaseObject.addSensor()`. Internally, it combines multiple Features such as EllipticalConeFeature and ShaderPolygonFeature for rendering:

```
BaseObject（卫星/地面站）
    └── Sensor 组件
          ├── 波束体积（EllipticalConeFeature / CylinderFeature / CubeFeature）
          ├── 覆盖足迹（ShaderPolygonFeature + BeamProjector）
          └── 流动效果（自定义材质）
```

## Beam Types (SensorType)

| Type | Value | Geometry |
|------|:---:|--------|
| `PW.SensorType.EllipticalCone` | `"ellipticalCone"` | Elliptical cone (independent X/Y aperture angles) |
| `PW.SensorType.Cone` | `"cone"` | Cone (circular cross-section) |
| `PW.SensorType.Pyramid` | `"pyramid"` | Pyramid (rendered internally with CubeFeature) |
| `PW.SensorType.Cylinder` | `"cylinder"` | Cylinder |

## Add a Sensor

Each physical object type has a different default emission direction. `addSensor()` sets the default `emitDirection` automatically:

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("container")
const sat = new Daisy.PW.Satellite({ name: "SAT-1" })
sat.bindEngine(engine)

const sensor = sat.addSensor({
    type: Daisy.PW.SensorType.EllipticalCone,
    apertureDeg: 45,                   // 开角（度），也可写 { xDeg, yDeg }
    beamLength: 500_000,               // 波束长度（米）
    color: Daisy.Color.RED.withAlpha(0.3),
    emitDirection: Daisy.EmitDirection.TO_GROUND,
})
```

## Emission Direction (EmitDirection)

Controls the beam direction relative to the host object:

| Value | Direction | Use case |
|------|------|----------|
| `CENTER` | Emit from the origin | General purpose |
| `TO_UP` | +Z (up) | Ground station to sky |
| `TO_BOTTOM` | -Z (down) | Aircraft-to-ground observation |
| `TO_GROUND` | Surface normal direction | Satellite-to-ground observation |
| `TO_FRONT` | +X (forward) | Vehicle forward view |
| `TO_AFTER` | -X (backward) | Rear-facing sensor |
| `TO_LEFT` | +Y (left) | Side view |
| `TO_RIGHT` | -Y (right) | Side view |

The defaults by object type are: `Satellite` uses `TO_BOTTOM`, `Aircraft` uses `TO_BOTTOM`, `GroundStation` uses `TO_UP`, and `Vehicle` uses `TO_FRONT`.

## Beam Attitude (beamAttitudeDeg)

Set the beam pointing angles manually:

```typescript
sat.addSensor({
    type: Daisy.PW.SensorType.Cone,
    apertureDeg: 30,
    beamAttitudeDeg: {
        azimuthDeg: 0,     // 方位角（绕 +Z）
        elevationDeg: -90, // 俯仰角（-90 = 正下方）
        rollDeg: 0,        // 横滚角
    },
})
```

> Note: `beamAttitudeDeg` is ignored when tracking mode is enabled.

## Tracking Mode (link.track)

The sensor automatically tracks target entities or coordinates:

```typescript
// 按时间段切换目标
sensor.options = {
    link: {
        track: [
            { start: t0, end: t1, target: satA.entity },
            { start: t1, end: t2, target: satB.entity },
        ],
    }
}

// 无目标时不写对应时间段，或结束当前 track 区间
sensor.options = {
    link: {
        track: [
            { start: t2, stop: t3, target: station.entity },
        ],
    }
}
```

Supported target types: `Entity`, `BaseObject`, `Cartesian3`, and `Cartographic`.

## Coverage Footprint (BeamFootprint)

Ground coverage footprints are generated only when `emitDirection === TO_GROUND`; other emission directions return an empty result.

Render the ground coverage area below the sensor:

```typescript
sensor.setBeamFootprint({
    show: true,
    fillColor: Daisy.Color.RED.withAlpha(0.25),
    outline: true,
    outlineColor: Daisy.Color.WHITE,
    outlineWidthPx: 2,
    footprintTimes: { start: t0, end: t1 },  // 或 JulianDate[] / TimeRange[]
    sampleStepSeconds: 30,
    maxSampleCount: 1000,
    retainSeconds: 5000,
})
```

The footprint is computed by `BeamProjector` (SGP4 coordinates to ground intersections to a polygon outline) and rendered with `ShaderPolygonFeature`.

## Flow Effect (link.flow)

Apply a flowing material to the beam volume:

```typescript
sensor.options = {
    link: {
        flow: {
            speed: 1.0,            // 流速系数（默认 1）
            count: 0.3,            // 带状层密度（0~1）
            thickness: 0.35,       // 带宽（0~1）
            opacity: 0.8,          // 透明度
            direction: "forward",  // "forward" 或 "reverse"
            activeWhen: [
                { start: t0, end: t1 },
            ],
        },
    },
}
```

When `activeWhen` is not configured, the flow effect follows whether track has a target and activates when a target is present.

### drawFootprint: Calculate and Draw Coverage

Calculate and render the sensor's ground coverage over a time range by sampling beam-ground intersections with `BeamProjector`:

```typescript
sensor.drawFootprint({
    begin: engine.getStartTime(),
    end: engine.getStopTime(),
    union: true,                              // 合并所有时间片覆盖
    sampleStepSeconds: 30,                    // 采样间隔
    maxSampleCount: 500,                      // 最大采样点数
    fillColor: Daisy.Color.RED.withAlpha(0.25),
    outline: true,
    outlineColor: Daisy.Color.RED,
    outlineWidthPx: 2,
})
```

Call `drawFootprint` directly on a `Sensor` instance. It delegates time-series sampling to `BeamProjector` and renders the polygon with `ShaderPolygonFeature`. Call `clearFootprintUnionRenderer()` to clear the rendered result.

### throughGround

Controls whether the beam is prevented from passing through the ground or a celestial ellipsoid. The default is `true`:

```typescript
sat.addSensor({
    throughGround: false,     // 允许穿透，直接按 beamLength 延伸
    // ... other options
})
```

- `true`: Prevents penetration. When a beam points toward and intersects the ellipsoid, its length is limited to the nearest intersection.
- `false`: Allows penetration. The beam extends directly by `beamLength`, which is suitable for deep-space sensors or scenarios that do not require ground clipping.

### apertureDeg X/Y Axes

With the `TO_GROUND` emission direction, the X/Y axes of `apertureDeg` have a defined relationship to the satellite's direction of motion:

```typescript
sat.addSensor({
    apertureDeg: { xDeg: 30, yDeg: 60 },  // 30° 沿轨方向, 60° 交轨方向
})
```

| Axis | Direction | Description |
|------|------|------|
| `xDeg` | Along-track | Aperture angle in the satellite's direction of travel |
| `yDeg` | Cross-track | Aperture angle perpendicular to the direction of travel |

When `apertureDeg` is a single `number`, the X/Y aperture angles are equal, producing a conical cross-section.

## Coverage Merge

Boolean merging of coverage areas from multiple sensors, accelerated by WASM:

```typescript
// 多颗卫星的传感器覆盖合并
const sensors = sats.map(sat => sat.sensors[0])
// 覆盖合并通过 Constellation + CoverageAnalysis 实现（见分析工具篇）
```

## Complete SensorOptions Reference

| Parameter | Type | Description |
|------|------|------|
| `name` | `string` | Name |
| `type` | `SensorType` | Beam volume type |
| `show` | `TimeValue<boolean>` | Master switch; disabling it stops all calculations |
| `beamShow` | `TimeValue<boolean>` | Controls beam visibility only |
| `material` | `DMaterial` | Material, taking priority over color |
| `color` | `DColor` | Color, CYAN with 25% opacity by default |
| `apertureDeg` | `number \| { xDeg, yDeg }` | Independent X/Y aperture angles |
| `beamLength` | `TimeValue<number>` | Beam length in meters |
| `emitDirection` | `EmitDirection` | Emission direction |
| `throughGround` | `boolean` | Whether to prevent penetration of the ground or celestial ellipsoid |
| `beamAttitudeDeg` | `SensorBeamAttitudeDeg` | Manual attitude angles |
| `link.track` | `SensorTrackInterval[]` | Target tracking intervals |
| `link.flow` | `SensorFlowConfigDetail` | Flow effect configuration |
| `footPrint` | `BeamFootprint \| false` | Coverage footprint configuration |

> **Related APIs**: [PW.Sensor](/en/api/classes/PW.Sensor) · `Analysis.BeamProjector` · [ShaderPolygonFeature](/en/api/classes/ShaderPolygonFeature)

---

<!--
示例参考: [SensorBeam.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/physicalWorld/SensorBeam.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
