[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / getSunOcclusionState

# Function: getSunOcclusionState()

> **getSunOcclusionState**(`observer`, `time`, `options?`): [`SunOcclusionState`](../types/SunOcclusionState.md)

使用天体对象判定任意世界坐标点的太阳遮挡状态。

## Parameters

### observer

`Cartesian3`

待判定点的世界坐标。

### time

`JulianDate`

用于计算天体位置的仿真时刻。

### options?

[`CelestialSunOcclusionOptions`](../interfaces/CelestialSunOcclusionOptions.md) = `{}`

遮挡天体和光源天体；未设置时使用地球与太阳模型。

## Returns

[`SunOcclusionState`](../types/SunOcclusionState.md)

## Example

```ts
const observer = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000);
const state = Daisy.getSunOcclusionState(observer, engine.getCurrentTime());
```
