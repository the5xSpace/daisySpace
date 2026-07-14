[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeSeries

# Type Alias: TimeSeries\<T\>

> **TimeSeries**\<`T`\> = `object`

时间采样序列。

- `samples`：离散采样点列表（会按 time 排序）
- `interpolation`：插值模式

## Example

```ts
const rangeSeries = {
 interpolation: "cubic",
 samples: [
 { time: t0, value: 120_000 },
 { time: t1, value: 260_000 },
 { time: t2, value: 180_000 },
 ],
};
```

## Type Parameters

### T

`T`

## Properties

### interpolation?

> `optional` **interpolation?**: [`TimeInterpolationMode`](TimeInterpolationMode.md)

***

### samples

> **samples**: [`TimeSample`](TimeSample.md)\<`T`\>[]
