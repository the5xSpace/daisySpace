[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeDynamicInterval

# Type Alias: TimeDynamicInterval\<T\>

> **TimeDynamicInterval**\<`T`\> = \{ `end?`: `never`; `start`: `JulianDate`; `stop`: `JulianDate`; `value`: `T`; \} \| \{ `end`: `JulianDate`; `start`: `JulianDate`; `stop?`: `never`; `value`: `T`; \}

A single closed-interval time segment used by dynamic properties; the end time can be written as `stop` or `end`.

## Type Parameters

### T

`T`

## Union Members

### Type Literal

\{ `end?`: `never`; `start`: `JulianDate`; `stop`: `JulianDate`; `value`: `T`; \}

#### end?

> `optional` **end?**: `never`

Compatibility field mutually exclusive with `stop`.

#### start

> **start**: `JulianDate`

Interval start time.

#### stop

> **stop**: `JulianDate`

Interval end time.

#### value

> **value**: `T`

Value returned when the interval is hit.

***

### Type Literal

\{ `end`: `JulianDate`; `start`: `JulianDate`; `stop?`: `never`; `value`: `T`; \}

#### end

> **end**: `JulianDate`

Interval end time.

#### start

> **start**: `JulianDate`

Interval start time.

#### stop?

> `optional` **stop?**: `never`

Compatibility field mutually exclusive with `end`.

#### value

> **value**: `T`

Value returned when the interval is hit.
