[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / fastApproximateAtan

# Function: fastApproximateAtan()

> **fastApproximateAtan**(`x`): `number`

Computes a fast approximation of Atan for input in the range [-1, 1].

Based on Michal Drobot's approximation from ShaderFastLibs,
which in turn is based on "Efficient approximations for the arctangent function,"
Rajan, S. Sichun Wang Inkol, R. Joyal, A., May 2006.
Adapted from ShaderFastLibs under MIT License.

## Parameters

### x

`number`

An input number in the range [-1, 1]

## Returns

`number`

An approximation of atan(x)
