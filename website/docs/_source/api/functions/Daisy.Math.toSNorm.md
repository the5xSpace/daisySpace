[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / toSNorm

# Function: toSNorm()

> **toSNorm**(`value`, `rangeMaximum?`): `number`

Converts a scalar value in the range [-1.0, 1.0] to a SNORM in the range [0, rangeMaximum]

## Parameters

### value

`number`

The scalar value in the range [-1.0, 1.0]

### rangeMaximum?

`number`

The maximum value in the mapped range, 255 by default.

## Returns

`number`

A SNORM value, where 0 maps to -1.0 and rangeMaximum maps to 1.0.
