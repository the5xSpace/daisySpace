[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / incrementWrap

# Function: incrementWrap()

> **incrementWrap**(`n?`, `maximumValue?`, `minimumValue?`): `number`

Increments a number with a wrapping to a minimum value if the number exceeds the maximum value.

## Parameters

### n?

`number`

The number to be incremented.

### maximumValue?

`number`

The maximum incremented value before rolling over to the minimum value.

### minimumValue?

`number`

The number reset to after the maximum value has been exceeded.

## Returns

`number`

The incremented number.

## Example

```ts
const n = Daisy.Math.incrementWrap(5, 10, 0); // returns 6
const m = Daisy.Math.incrementWrap(10, 10, 0); // returns 0
```
