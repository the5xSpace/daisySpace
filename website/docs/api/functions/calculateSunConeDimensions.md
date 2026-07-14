[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / calculateSunConeDimensions

# Function: calculateSunConeDimensions()

> **calculateSunConeDimensions**(`input`): [`SunConeDimensions`](../interfaces/SunConeDimensions.md)

根据两个球形天体的半径和中心距计算本影长度及对应位置的半影半径。

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
