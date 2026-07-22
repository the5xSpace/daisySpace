[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / SensorFlowConfigDetail

# Type Alias: SensorFlowConfigDetail

> **SensorFlowConfigDetail** = `object`

Sensor beam flow effect configuration.

## Properties

### activeWhen?

> `optional` **activeWhen?**: [`SensorFlowSchedule`](PW.SensorFlowSchedule.md)

Flow effect activation condition.

Supports:
- `true`: always active
- `false`: always off (default)
- `TimeValue<boolean>`: dynamic on/off based on simulation time
- `TimeValue<TimeRanges>` / `TimeRanges`: on/off based on time ranges

When omitted, defaults to "follows whether the track has a target".

***

### count?

> `optional` **count?**: `number`

Band layer density (0~1).

#### Default

```ts
0.3
```

***

### direction?

> `optional` **direction?**: [`SensorFlowDirection`](PW.SensorFlowDirection.md)

Flow direction.

- `forward` / `1`: forward (default)
- `reverse` / `-1`: reverse

Notes:
- This field is an optional enhancement
- If omitted, the built-in flow material's forward effect is used by default

***

### intervalColor?

> `optional` **intervalColor?**: [`DColor`](DColor.md)

Interval color (optional). When omitted, a more transparent and slightly darkened color will be automatically derived from the beam fill color.

***

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

Flow effect material (optional).

- Can pass a color string or Daisy color object as a solid color material
- Can pass a custom material, e.g., `MaterialFactory.SpiralFlow(...)`
- When omitted, uses default fallback: internally generates a set of
 flow materials based on the beam `color`, and auto-derives `spiralColor` using a complementary color tool
- For typical link/tracking scenarios, omitting this field is usually sufficient

***

### opacity?

> `optional` **opacity?**: `number`

Opacity (0~1).

#### Default

```ts
1.0
```

***

### speed?

> `optional` **speed?**: `number`

Flow speed factor.

#### Default

```ts
1.0
```

***

### thickness?

> `optional` **thickness?**: `number`

Band width (0~1).

#### Default

```ts
0.35
```
