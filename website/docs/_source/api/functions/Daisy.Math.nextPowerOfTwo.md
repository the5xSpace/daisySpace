[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / nextPowerOfTwo

# Function: nextPowerOfTwo()

> **nextPowerOfTwo**(`n`): `number`

Computes the next power-of-two integer greater than or equal to the provided non-negative integer.
The maximum allowed input is 2^31 due to 32-bit bitwise operator limitation in Javascript.

## Parameters

### n

`number`

The integer to test in the range [0, 2^31].

## Returns

`number`

The next power-of-two integer.

## Example

```ts
const n = Daisy.Math.nextPowerOfTwo(29); // 32
const m = Daisy.Math.nextPowerOfTwo(32); // 32
```
