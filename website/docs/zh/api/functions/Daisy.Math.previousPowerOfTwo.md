[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / previousPowerOfTwo

# Function: previousPowerOfTwo()

> **previousPowerOfTwo**(`n`): `number`

Computes the previous power-of-two integer less than or equal to the provided non-negative integer.
The maximum allowed input is (2^32)-1 due to 32-bit bitwise operator limitation in Javascript.

## Parameters

### n

`number`

The integer to test in the range [0, (2^32)-1].

## Returns

`number`

The previous power-of-two integer.

## Example

```ts
const n = Daisy.Math.previousPowerOfTwo(29); // 16
const m = Daisy.Math.previousPowerOfTwo(32); // 32
```
