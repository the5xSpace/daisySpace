[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / convertLongitudeRange

# Function: convertLongitudeRange()

> **convertLongitudeRange**(`angle`): `number`

Converts a longitude value, in radians, to the range [`-Math.PI`, `Math.PI`).

## Parameters

### angle

`number`

The longitude value, in radians, to convert to the range [`-Math.PI`, `Math.PI`).

## Returns

`number`

The equivalent longitude value in the range [`-Math.PI`, `Math.PI`).

## Example

```ts
// Convert 270 degrees to -90 degrees longitude
const longitude = Daisy.Math.convertLongitudeRange(Daisy.Math.toRadians(270.0));
```
