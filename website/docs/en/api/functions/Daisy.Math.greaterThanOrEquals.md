[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / greaterThanOrEquals

# Function: greaterThanOrEquals()

> **greaterThanOrEquals**(`left`, `right`, `absoluteEpsilon`): `boolean`

Determines if the left value is greater than or equal to the right value. If the two values are within
`absoluteEpsilon` of each other, they are considered equal and this function returns true.

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

`true` if `left` is greater than `right` or if the
 the values are nearly equal.
