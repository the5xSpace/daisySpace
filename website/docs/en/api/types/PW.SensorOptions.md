[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / SensorOptions

# Type Alias: SensorOptions

> **SensorOptions** = `object`

Sensor-component configuration (all angles are in degrees and distances are in meters).

Notes:
- Angles, ranges, and similar values support `TimeValue<T>` and can change dynamically with simulation time.
- A footprint can be generated only when `emitDirection === TO_GROUND`.

## Properties

### apertureDeg?

> `optional` **apertureDeg?**: [`SensorApertureDeg`](PW.SensorApertureDeg.md)

Sensor aperture in degrees, supporting time-varying values.

Supports three input forms:
- Constant: provide an angle value directly
- Callback: return an angle value dynamically from simulation time
- Time samples: provide discrete sample points with an optional interpolation method

#### Example

```ts
// 1) 常量
apertureDeg: 15 // 单角度值，等价于 { xDeg: 15, yDeg: 15 }
apertureDeg: { xDeg: 10, yDeg: 6 } // 横纵角度分别为 10 和 6

// 2) 回调（按仿真时间动态计算）
apertureDeg: (time) => ({ xDeg: 10, yDeg: 6 })

// 3) 时间采样（离散点 + 插值）
apertureDeg: {
 interpolation: "cubic",
 samples: [
 { time: t0, value: { xDeg: 10, yDeg: 6 } },
 { time: t1, value: { xDeg: 12, yDeg: 8 } },
 { time: t2, value: { xDeg: 14, yDeg: 10 } },
 ]
}
```

#### Default

```ts
{ xDeg: 10, yDeg: 6 }
```

***

### beamAttitudeDeg?

> `optional` **beamAttitudeDeg?**: [`TimeValue`](TimeValue.md)\<[`SensorBeamAttitudeDeg`](PW.SensorBeamAttitudeDeg.md)\>

Beam attitude in degrees, supporting time-varying values.

Supports three input forms:
- Constant: provide an attitude value directly
- Callback: return an attitude value dynamically from simulation time
- Time samples: provide discrete sample points with an optional interpolation method

#### Example

```ts
// 1) 常量
beamAttitudeDeg: { azimuthDeg: 0, elevationDeg: -30, rollDeg: 0 }

// 2) 回调（按仿真时间动态计算）
beamAttitudeDeg: (time) => ({ azimuthDeg: 0, elevationDeg: -30, rollDeg: 0 })

// 3) 时间采样（离散点 + 插值）
beamAttitudeDeg: {
 interpolation: "cubic",
 samples: [
 { time: t0, value: { azimuthDeg: 0, elevationDeg: -20, rollDeg: 0 } },
 { time: t1, value: { azimuthDeg: 30, elevationDeg: -30, rollDeg: 0 } },
 { time: t2, value: { azimuthDeg: 60, elevationDeg: -25, rollDeg: 0 } },
 ]
}
```

#### Default

```ts
{ azimuthDeg: 0, elevationDeg: 0, rollDeg: 0 }
```

***

### beamLength?

> `optional` **beamLength?**: [`TimeValue`](TimeValue.md)\<`number`\>

Beam length in meters, supporting time-varying values.

Supports three input forms:
- Constant: provide a numeric value directly
- Callback: return a numeric value dynamically from simulation time
- Time samples: provide discrete sample points with an optional interpolation method

#### Example

```ts
1) 常量
range: 200_000

2) 回调（按仿真时间动态计算）
range: (time) => 200_000

3) 时间采样（离散点 + 插值）
range: {
 interpolation: "cubic",
 samples: [
 { time: t0, value: 120_000 },
 { time: t1, value: 260_000 },
 { time: t2, value: 180_000 },
 ]
}
4) 还可通过创建时间计划，手动指定range，可避免手动计算时间符合度的成本
viewer.timeSchedule.add(new TimeTask({
 startJulianTime,
 endJulianTime,
 onEnter: () => {
 //会覆盖之前的range配置
 sensor.range = 200_000;
 }
 }))
```

#### Default

```ts
200000
```

***

### beamShow?

> `optional` **beamShow?**: [`TimeValue`](TimeValue.md)\<`boolean`\>

Whether to show the beam body, supporting time-varying values.

Semantics:
- Controls only sensor-volume and beam rendering
- Does not affect auxiliary rendering such as the footprint or range renderer
- When `show=false`, the entire sensor is still considered disabled

#### Default

```ts
true
```

***

### celestialEllipsoid?

> `optional` **celestialEllipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

Celestial ellipsoid containing the sensor (Earth by default).

***

### color?

> `optional` **color?**: [`DColor`](DColor.md)

Color, used as the default material source when material is not provided.

#### Default

```ts
Daisy.Color.CYAN.withAlpha(0.25)
```

***

### debugAutoLength?

> `optional` **debugAutoLength?**: `boolean` \| `number` \| \{ `throttleMs?`: `number`; \}

Automatic-length debugging switch.

Accepts a boolean for quick activation or a throttle configuration to control debug-output frequency.

***

### emitDirection?

> `optional` **emitDirection?**: [`EmitDirection`](../enums/EmitDirection.md)

Mounting direction.
CENTER rotates around the object center and emits from both sides of the middle.
TOP_CENTER rotates around the top-center point and uses the top as the emission point.
BOTTOM_CENTER rotates around the bottom-center point and uses the bottom as the emission point.
TO_GROUND rotates around the top-center point, emits from the top toward the ellipsoid, converts automatically to the GNU reference frame, points initially toward the ellipsoid surface, ignores object length, and computes the ellipsoid-intersection height automatically (for Earth, this can be understood as altitude above ground).

#### Default

```ts
"EmitDirection.TO_GROUND"
```

***

### footPrint?

> `optional` **footPrint?**: [`BeamFootprint`](PW.BeamFootprint.md) \| `false`

Real-time beam-footprint rendering configuration.

Passing `false` disables footprint rendering.

***

### link?

> `optional` **link?**: [`SensorLinkOptions`](PW.SensorLinkOptions.md)

Link-combination configuration.

Semantics:
- `link.track`: switches tracking targets by time interval
- `link.flow`: controls the beam's flowing-material effect

Example:
```ts
link: {
 track: [
 { start: t0, end: t1, target: satA.entity },
 { start: t1, end: t2, target: satB.entity },
 ],
 flow: {
 activeWhen: [{ start: t0, end: t1 }],
 direction: "reverse",
 speed: 1.2,
 },
}
```

***

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

Material (takes precedence over color).

***

### name?

> `optional` **name?**: `string`

Name (optional).

- Also written to component.name
- Can be used for debugging and name-based component lookup

***

### outline?

> `optional` **outline?**: `boolean`

Whether to show the outline.

#### Default

```ts
true
```

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](DColor.md)

Outline color.

#### Default

```ts
Daisy.Color.WHITE.withAlpha(0.5)
```

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Outline width in pixels; the final value is clamped to the range supported by the device.

#### Default

```ts
1
```

***

### show?

> `optional` **show?**: [`TimeValue`](TimeValue.md)\<`boolean`\>

Whether to show, supporting changes with simulation time.

Convention:
- When show resolves to false at the current time, this sensor stops calculating, including tracking and ground projection.
- After it resolves to true again, it continues working with the current configuration.

#### Example

```ts
sensor.options = {
 show: {
 interpolation: "step",
 samples: [
 { time: t0, value: false },
 { time: t1, value: true },
 ],
 },
};
```

#### Default

```ts
true
```

***

### slices?

> `optional` **slices?**: `number`

Number of slices; larger values produce smoother geometry at a higher cost.

***

### throughGround?

> `optional` **throughGround?**: `boolean`

Whether to disable penetration through the ground or celestial ellipsoid.

Semantics:
- true: prevent penetration (default). When the beam points toward and intersects the ellipsoid, its length is limited to the nearest intersection.
- false: allow penetration. Beam length follows the user's `beamLength` or the tracking-target distance.

Note:
This option forces emitDirection = EmitDirection.TO_GROUND.

#### Default

```ts
true
```

***

### type?

> `optional` **type?**: [`SensorType`](../enums/PW.SensorType.md)

Volume type.

#### Default

```ts
SensorType.EllipticalCone
```
