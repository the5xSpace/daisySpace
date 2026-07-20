[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / calculateSunConeDimensions

# Function: calculateSunConeDimensions()

> **calculateSunConeDimensions**(`input`): [`SunConeDimensions`](../interfaces/SunConeDimensions.md)

Calculates the umbra length and corresponding penumbra radius based on the radii and center distance of two spherical celestial bodies.

## Parameters

### input

[`SunConeDimensionInput`](../interfaces/SunConeDimensionInput.md)

## Returns

[`SunConeDimensions`](../interfaces/SunConeDimensions.md)

## Example

```ts
const dimensions = Daisy.calculateSunConeDimensions({
 bodyRadius: 6_378_137,
 sunRadius: 696_340_000,
 centerDistance: 149_597_870_700,
});
console.log(dimensions.umbraLength);
```
