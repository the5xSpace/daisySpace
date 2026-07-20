[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeSeries

# Type Alias: TimeSeries\<T\>

> **TimeSeries**\<`T`\> = `object`

Time sample series.

- `samples`: list of discrete sample points (sorted by time)
- `interpolation`: interpolation mode

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
