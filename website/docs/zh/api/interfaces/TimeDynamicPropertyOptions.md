[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeDynamicPropertyOptions

# Interface: TimeDynamicPropertyOptions\<T\>

通用动态属性配置。

## Type Parameters

### T

`T`

## Properties

### defaultValue?

> `optional` **defaultValue?**: `T`

未命中任何区间时返回的默认值。

***

### intervals?

> `optional` **intervals?**: [`TimeDynamicInterval`](../types/TimeDynamicInterval.md)\<`T`\>[]

初始时间区间列表；构造时会复制数组。
