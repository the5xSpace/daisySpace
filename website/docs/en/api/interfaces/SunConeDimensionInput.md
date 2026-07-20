[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SunConeDimensionInput

# Interface: SunConeDimensionInput

Sun cone physical dimension calculation parameters.

## Properties

### bodyRadius

> **bodyRadius**: `number`

Occluding body radius; units must be consistent with `sunRadius` and `centerDistance`.

***

### centerDistance

> **centerDistance**: `number`

Center distance between the two bodies, must be greater than the sum of their radii.

***

### sunRadius

> **sunRadius**: `number`

Light source body radius, must be greater than `bodyRadius`.
