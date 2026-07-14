[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeSample

# Type Alias: TimeSample\<T\>

> **TimeSample**\<`T`\> = `object`

时间采样点：每个值必须与一个仿真时间一一对应。

## Example

```ts
const samples = [
 { time: t0, value: 120_000 },
 { time: t1, value: 260_000 },
 { time: t2, value: 180_000 },
];
```

## Type Parameters

### T

`T`

## Properties

### time

> **time**: `Daisy.JulianDate`

***

### value

> **value**: `T`
