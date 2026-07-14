[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / isPowerOfTwo

# Function: isPowerOfTwo()

> **isPowerOfTwo**(`n`): `boolean`

Determines if a non-negative integer is a power of two.
The maximum allowed input is (2^32)-1 due to 32-bit bitwise operator limitation in Javascript.

## Parameters

### n

`number`

The integer to test in the range [0, (2^32)-1].

## Returns

`boolean`

`true` if the number if a power of two; otherwise, `false`.

## Example

```ts
const t = Daisy.Math.isPowerOfTwo(16); // true
const f = Daisy.Math.isPowerOfTwo(20); // false
```
