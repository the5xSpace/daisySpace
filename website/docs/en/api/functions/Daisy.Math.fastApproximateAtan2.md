[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / fastApproximateAtan2

# Function: fastApproximateAtan2()

> **fastApproximateAtan2**(`x`, `y`): `number`

Computes a fast approximation of Atan2(x, y) for arbitrary input scalars.

Range reduction math based on nvidia's cg reference implementation: http://developer.download.nvidia.com/cg/atan2.html

## Parameters

### x

`number`

An input number that isn't zero if y is zero.

### y

`number`

An input number that isn't zero if x is zero.

## Returns

`number`

An approximation of atan2(x, y)
