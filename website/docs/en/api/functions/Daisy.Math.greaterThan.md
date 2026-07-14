[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / greaterThan

# Function: greaterThan()

> **greaterThan**(`left`, `right`, `absoluteEpsilon`): `boolean`

Determines if the left value is greater the right value. If the two values are within
`absoluteEpsilon` of each other, they are considered equal and this function returns false.

## Parameters

### left

`number`

The first number to compare.

### right

`number`

The second number to compare.

### absoluteEpsilon

`number`

The absolute epsilon to use in comparison.

## Returns

`boolean`

`true` if `left` is greater than `right` by more than
 `absoluteEpsilon`. `false` if `left` is less or if the two
 values are nearly equal.
