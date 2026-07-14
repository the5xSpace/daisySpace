[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeDynamicInterval

# Type Alias: TimeDynamicInterval\<T\>

> **TimeDynamicInterval**\<`T`\> = \{ `end?`: `never`; `start`: `JulianDate`; `stop`: `JulianDate`; `value`: `T`; \} \| \{ `end`: `JulianDate`; `start`: `JulianDate`; `stop?`: `never`; `value`: `T`; \}

动态属性使用的单个闭区间时间片段；结束时刻可写为 `stop` 或 `end`。

## Type Parameters

### T

`T`

## Union Members

### Type Literal

\{ `end?`: `never`; `start`: `JulianDate`; `stop`: `JulianDate`; `value`: `T`; \}

#### end?

> `optional` **end?**: `never`

与 `stop` 互斥的兼容字段。

#### start

> **start**: `JulianDate`

区间开始时刻。

#### stop

> **stop**: `JulianDate`

区间结束时刻。

#### value

> **value**: `T`

区间命中时返回的值。

***

### Type Literal

\{ `end`: `JulianDate`; `start`: `JulianDate`; `stop?`: `never`; `value`: `T`; \}

#### end

> **end**: `JulianDate`

区间结束时刻。

#### start

> **start**: `JulianDate`

区间开始时刻。

#### stop?

> `optional` **stop?**: `never`

与 `end` 互斥的兼容字段。

#### value

> **value**: `T`

区间命中时返回的值。
