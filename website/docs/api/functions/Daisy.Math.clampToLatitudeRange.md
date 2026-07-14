[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / clampToLatitudeRange

# Function: clampToLatitudeRange()

> **clampToLatitudeRange**(`angle`): `number`

Convenience function that clamps a latitude value, in radians, to the range [`-Math.PI/2`, `Math.PI/2`).
Useful for sanitizing data before use in objects requiring correct range.

## Parameters

### angle

`number`

The latitude value, in radians, to clamp to the range [`-Math.PI/2`, `Math.PI/2`).

## Returns

`number`

The latitude value clamped to the range [`-Math.PI/2`, `Math.PI/2`).

## Example

```ts
// Clamp 108 degrees latitude to 90 degrees latitude
const latitude = Daisy.Math.clampToLatitudeRange(Daisy.Math.toRadians(108.0));
```
