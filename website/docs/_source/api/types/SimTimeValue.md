[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SimTimeValue

# Type Alias: SimTimeValue\<T\>

> **SimTimeValue**\<`T`\> = `T` \| ((`time`) => `T`) \| [`TimeSample`](TimeSample.md)\<`T`\>[] \| [`TimeSeries`](TimeSeries.md)\<`T`\>

仿真时间值（推荐使用的语义名）。

支持四种输入方式：
- 常量：`T`
- 回调：`(time) => T`
- 采样数组：`TimeSample<T>[]`
- 采样对象：`TimeSeries<T>`

## Type Parameters

### T

`T`

## Example

```ts
// 1) 常量
const v1: SimTimeValue<number> = 200_000;

// 2) 回调
const v2: SimTimeValue<number> = (time) => 200_000;

// 3) 采样数组（默认 linear）
const v3: SimTimeValue<number> = [
 { time: t0, value: 120_000 },
 { time: t1, value: 260_000 },
];

// 4) 采样对象（显式 cubic）
const v4: SimTimeValue<number> = { interpolation: "cubic", samples: [{ time: t0, value: 1 }, { time: t1, value: 2 }] };
```
