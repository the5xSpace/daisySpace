[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeDynamicPropertyOptions

# Interface: TimeDynamicPropertyOptions\<T\>

Generic dynamic property configuration.

## Type Parameters

### T

`T`

## Properties

### defaultValue?

> `optional` **defaultValue?**: `T`

Default value returned when no interval is matched.

***

### intervals?

> `optional` **intervals?**: [`TimeDynamicInterval`](../types/TimeDynamicInterval.md)\<`T`\>[]

Initial time interval list; the array is copied during construction.
