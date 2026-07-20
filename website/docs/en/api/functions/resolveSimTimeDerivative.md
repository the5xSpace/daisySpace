[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / resolveSimTimeDerivative

# Function: resolveSimTimeDerivative()

> **resolveSimTimeDerivative**\<`T`\>(`value`, `time`): `T` \| `undefined`

Computes the "rate of change" (derivative, in units per second) of a simulation time value at a given time.

Notes:
- Only meaningful for "discrete sample" inputs (TimeSample/TimeSeries)
- Returns 0 for `"step"` (constant within the interval)
- Uses numerical differentiation approximation: symmetric difference over a small time window around `time`

## Type Parameters

### T

`T`

## Parameters

### value

[`SimTimeValue`](../types/SimTimeValue.md)\<`T`\>

### time

`JulianDate`

## Returns

`T` \| `undefined`

## Example

```ts
const rate = resolveSimTimeDerivative(rangeSeries, viewer.clock.currentTime);
// rate: number | undefined，表示 range 每秒变化量
```
