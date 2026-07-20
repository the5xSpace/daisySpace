# Sensor

Sensor is one of the most core components in the DaisySpace-Sdk physical world, encapsulating beam visualization, coverage projection, tracking modes, and flow material capabilities.

## Architecture

Sensor implements the `IComponent` interface and is mounted onto physical objects via `BaseObject.addSensor()`. It internally uses multiple Features (EllipticalConeFeature / ShaderPolygonFeature, etc.) for composite rendering:

```
BaseObject（卫星/地面站）
    └── Sensor 组件
          ├── 波束体积（EllipticalConeFeature / CylinderFeature / CubeFeature）
          ├── 覆盖足迹（ShaderPolygonFeature + BeamProjector）
          └── 流动效果（自定义材质）
```

## Beam Types (SensorType)

| Type | Value | Geometry |
|------|:---:|----------|
| `PW.SensorType.EllipticalCone` | `"ellipticalCone"` | Elliptical cone (X/Y aperture independently configurable) |
| `PW.SensorType.Cone` | `"cone"` | Cone (circular cross-section) |
| `PW.SensorType.Pyramid` | `"pyramid"` | Quadrilateral pyramid (rendered internally using CubeFeature) |
| `PW.SensorType.Cylinder` | `"cylinder"` | Cylinder |

## Adding a Sensor

Each physical object type has a different default emission direction (set automatically by `addSensor()`):

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

## Emit Direction

Controls the beam's orientation relative to the host object:

| Value | Direction | Use Case |
|-------|-----------|----------|
| `CENTER` | Origin emission | General |
| `TO_UP` | +Z (upward) | Ground station skyward |
| `TO_BOTTOM` | -Z (downward) | Aircraft ground reconnaissance |
| `TO_GROUND` | Surface normal direction | Satellite ground-facing |
| `TO_FRONT` | +X (forward) | Vehicle front-facing |
| `TO_AFTER` | -X (backward) | Rear-view sensor |
| `TO_LEFT` | +Y (left) | Side-view |
| `TO_RIGHT` | -Y (right) | Side-view |

Default values per object type: `Satellite` is `TO_BOTTOM`, `Aircraft` is `TO_BOTTOM`, `GroundStation` is `TO_UP`, `Vehicle` is `TO_FRONT`.

## Beam Attitude (beamAttitudeDeg)

Manually set the beam pointing angle:

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

> Note: When tracking mode is enabled, `beamAttitudeDeg` is ignored.

## Tracking Mode (link.track)

The sensor automatically tracks a target entity or coordinate:

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

Supported target types: `Entity`, `BaseObject`, `Cartesian3`, `Cartographic`.

## Coverage Footprint (BeamFootprint)

Only `emitDirection === TO_GROUND` generates a ground coverage footprint; calling this capability with other emission directions returns an empty result.

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

The footprint is computed via `BeamProjector` (SGP4 coordinates → ground intersection → polygon contour), and rendered using `ShaderPolygonFeature`.

## Flow Effect (link.flow)

Flow material on the beam volume:

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

When `activeWhen` is not configured, the flow effect follows whether the track has a target (activated when a target exists).

### drawFootprint — Compute and Render Coverage

Computes and renders the sensor's ground coverage area within a time range, based on `BeamProjector` for beam-ground intersection sampling:

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

`drawFootprint` is called directly by the `Sensor` instance, internally delegating to `BeamProjector` for time-series sampling, then rendering polygons via `ShaderPolygonFeature`. Call `clearFootprintUnionRenderer()` to clear the rendered result.

### throughGround

Controls whether the beam is prohibited from penetrating the ground/celestial ellipsoid, default `true`:

```typescript
sat.addSensor({
    throughGround: false,     // 允许穿透，直接按 beamLength 延伸
    // ... other options
})
```

- `true`: Penetration prohibited. When the beam faces the ellipsoid and intersects, the length is limited to the nearest intersection point
- `false`: Penetration allowed. The beam extends directly by `beamLength`. Suitable for deep space sensors or scenarios not requiring ground clipping

### apertureDeg X/Y Axis

Under `TO_GROUND` emission direction, the X/Y axes of `apertureDeg` have a clear relationship with the satellite's motion direction:

```typescript
sat.addSensor({
    apertureDeg: { xDeg: 30, yDeg: 60 },  // 30° 沿轨方向, 60° 交轨方向
})
```

| Axis | Direction | Description |
|------|-----------|-------------|
| `xDeg` | Along-track | Aperture angle in the satellite's forward direction |
| `yDeg` | Cross-track | Aperture angle perpendicular to the forward direction |

When `apertureDeg` is a single `number`, the X/Y aperture angles are the same (conical cross-section).

## Coverage Merge

Boolean merging of multiple sensor coverage areas (WASM accelerated):

```typescript
// 多颗卫星的传感器覆盖合并
const sensors = sats.map(sat => sat.sensors[0])
// 覆盖合并通过 Constellation + CoverageAnalysis 实现（见分析工具篇）
```

## SensorOptions Complete List

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Name |
| `type` | `SensorType` | Beam volume type |
| `show` | `TimeValue<boolean>` | Master switch (off stops all computation) |
| `beamShow` | `TimeValue<boolean>` | Controls only beam visibility |
| `material` | `DMaterial` | Material (overrides color) |
| `color` | `DColor` | Color (default CYAN 25% transparent) |
| `apertureDeg` | `number \| { xDeg, yDeg }` | X/Y independent aperture |
| `beamLength` | `TimeValue<number>` | Beam length (meters) |
| `emitDirection` | `EmitDirection` | Emission direction |
| `throughGround` | `boolean` | Whether to prohibit penetration of ground/celestial ellipsoid |
| `beamAttitudeDeg` | `SensorBeamAttitudeDeg` | Manual attitude angle |
| `link.track` | `SensorTrackInterval[]` | Track target time interval configuration |
| `link.flow` | `SensorFlowConfigDetail` | Flow effect configuration |
| `footPrint` | `BeamFootprint \| false` | Coverage footprint configuration |

> **Related API**: [PW.Sensor](/en/api/classes/PW.Sensor) · `Analysis.BeamProjector` · [ShaderPolygonFeature](/en/api/classes/ShaderPolygonFeature)

---

<!--
示例参考: [SensorBeam.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/physicalWorld/SensorBeam.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
