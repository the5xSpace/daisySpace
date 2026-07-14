[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / resolveSimTimeDerivative

# Function: resolveSimTimeDerivative()

> **resolveSimTimeDerivative**\<`T`\>(`value`, `time`): `T` \| `undefined`

计算仿真时间值在指定时刻的“变化率”（导数，单位：每秒）。

说明：
- 仅对“离散采样”输入（TimeSample/TimeSeries）有意义
- 对 `"step"` 会返回 0（区间内保持常量）
- 采用数值微分近似：在 `time` 左右取一个小时间窗做对称差分

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
