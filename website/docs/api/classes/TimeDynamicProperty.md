[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeDynamicProperty

# Class: TimeDynamicProperty\<T\>

按仿真时刻解析值的通用动态属性。

区间按添加顺序匹配；多个区间重叠时返回第一个命中的值。

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

创建动态属性并复制初始区间。

#### Parameters

##### options?

[`TimeDynamicPropertyOptions`](../interfaces/TimeDynamicPropertyOptions.md)\<`T`\>

#### Returns

`TimeDynamicProperty`\<`T`\>

## Methods

### addInterval()

> **addInterval**(`interval`): `void`

追加一个时间区间；区间顺序决定重叠时的匹配优先级。

#### Parameters

##### interval

[`TimeDynamicInterval`](../types/TimeDynamicInterval.md)\<`T`\>

#### Returns

`void`

***

### getDefaultValue()

> **getDefaultValue**(): `T` \| `undefined`

获取当前默认值。

#### Returns

`T` \| `undefined`

***

### getIntervals()

> **getIntervals**(): [`TimeDynamicInterval`](../types/TimeDynamicInterval.md)\<`T`\>[]

获取时间区间数组的浅拷贝。

#### Returns

[`TimeDynamicInterval`](../types/TimeDynamicInterval.md)\<`T`\>[]

***

### getValue()

> **getValue**(`time`): `T` \| `undefined`

获取指定时刻的第一个区间匹配值，未命中时返回默认值。

#### Parameters

##### time

`JulianDate`

#### Returns

`T` \| `undefined`

***

### setDefaultValue()

> **setDefaultValue**(`value`): `void`

设置未命中任何区间时使用的默认值。

#### Parameters

##### value

`T`

#### Returns

`void`
