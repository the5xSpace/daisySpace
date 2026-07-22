[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeDynamicProperty

# Class: TimeDynamicProperty\<T\>

A generic dynamic property that resolves values by simulation time.

Intervals are matched in order of addition; when multiple intervals overlap, the first matching value is returned.

## Example

```ts
const opacity = new Daisy.TimeDynamicProperty<number>({ defaultValue: 1 });
opacity.addInterval({ start, stop, value: 0.5 });
const valueAtNow = opacity.getValue(now);
```

## Type Parameters

### T

`T`

## Constructors

### Constructor

> **new TimeDynamicProperty**\<`T`\>(`options?`): `TimeDynamicProperty`\<`T`\>

Creates a dynamic property and copies the initial interval.

#### Parameters

##### options?

[`TimeDynamicPropertyOptions`](../interfaces/TimeDynamicPropertyOptions.md)\<`T`\>

#### Returns

`TimeDynamicProperty`\<`T`\>

## Methods

### addInterval()

> **addInterval**(`interval`): `void`

Appends a time interval; the interval order determines the matching priority when overlapping.

#### Parameters

##### interval

[`TimeDynamicInterval`](../types/TimeDynamicInterval.md)\<`T`\>

#### Returns

`void`

***

### getDefaultValue()

> **getDefaultValue**(): `T` \| `undefined`

Gets the current default value.

#### Returns

`T` \| `undefined`

***

### getIntervals()

> **getIntervals**(): [`TimeDynamicInterval`](../types/TimeDynamicInterval.md)\<`T`\>[]

Gets a shallow copy of the time interval array.

#### Returns

[`TimeDynamicInterval`](../types/TimeDynamicInterval.md)\<`T`\>[]

***

### getValue()

> **getValue**(`time`): `T` \| `undefined`

Gets the first matching interval value at the specified time; returns the default value if no interval is hit.

#### Parameters

##### time

`JulianDate`

#### Returns

`T` \| `undefined`

***

### setDefaultValue()

> **setDefaultValue**(`value`): `void`

Sets the default value used when no interval is matched.

#### Parameters

##### value

`T`

#### Returns

`void`
