[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / lerp

# Function: lerp()

> **lerp**(`p`, `q`, `time`): `number`

Computes the linear interpolation of two values.

## Parameters

### p

`number`

The start value to interpolate.

### q

`number`

The end value to interpolate.

### time

`number`

The time of interpolation generally in the range `[0.0, 1.0]`.

## Returns

`number`

The linearly interpolated value.

## Example

```ts
const n = Daisy.Math.lerp(0.0, 2.0, 0.5); // returns 1.0
```
