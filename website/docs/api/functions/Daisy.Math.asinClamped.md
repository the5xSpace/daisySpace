[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / asinClamped

# Function: asinClamped()

> **asinClamped**(`value`): `number`

Computes `Math.asin(value)`, but first clamps `value` to the range [-1.0, 1.0]
so that the function will never return NaN.

## Parameters

### value

`number`

The value for which to compute asin.

## Returns

`number`

The asin of the value if the value is in the range [-1.0, 1.0], or the asin of -1.0 or 1.0,
 whichever is closer, if the value is outside the range.
