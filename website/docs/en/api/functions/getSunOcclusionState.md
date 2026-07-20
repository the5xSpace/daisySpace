[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / getSunOcclusionState

# Function: getSunOcclusionState()

> **getSunOcclusionState**(`observer`, `time`, `options?`): [`SunOcclusionState`](../types/SunOcclusionState.md)

Determines the sun occlusion state for any world coordinate point using celestial body objects.

## Parameters

### observer

`Cartesian3`

World coordinates of the point to evaluate.

### time

`JulianDate`

Simulation time used to calculate celestial body positions.

### options?

[`CelestialSunOcclusionOptions`](../interfaces/CelestialSunOcclusionOptions.md) = `{}`

Occluding body and light source body; defaults to Earth and Sun models when not set.

## Returns

[`SunOcclusionState`](../types/SunOcclusionState.md)

## Example

```ts
const observer = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000);
const state = Daisy.getSunOcclusionState(observer, engine.getCurrentTime());
```
