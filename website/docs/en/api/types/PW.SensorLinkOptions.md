[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / SensorLinkOptions

# Type Alias: SensorLinkOptions

> **SensorLinkOptions** = `object`

Sensor link tracking and flow effect configuration.

## Properties

### flow?

> `optional` **flow?**: [`SensorFlowOptions`](PW.SensorFlowOptions.md)

Beam flow effect configuration within the link.

Recommended usage:
```ts
flow: {
 activeWhen: windows,
}
```

The above usage directly uses the built-in default flow material; if you need to override the default appearance, add `material` or other parameters.

***

### track?

> `optional` **track?**: [`SensorTrackInterval`](PW.SensorTrackInterval.md)[]

Link tracking schedule (can switch targets by time period).

Recommended usage:
- Writing only `track` completes basic tracking
- When you only need the "default flow effect", `flow` can also be written as just
 `activeWhen`
- The default material is automatically generated from the beam color, and the visual result is usually good enough
