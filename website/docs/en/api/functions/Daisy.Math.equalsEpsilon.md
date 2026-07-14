[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Math](../modules/Daisy.Math.md) / equalsEpsilon

# Function: equalsEpsilon()

> **equalsEpsilon**(`left`, `right`, `relativeEpsilon?`, `absoluteEpsilon?`): `boolean`

Determines if two values are equal using an absolute or relative tolerance test. This is useful
to avoid problems due to roundoff error when comparing floating-point values directly. The values are
first compared using an absolute tolerance test. If that fails, a relative tolerance test is performed.
Use this test if you are unsure of the magnitudes of left and right.

## Parameters

### left

`number`

The first value to compare.

### right

`number`

The other value to compare.

### relativeEpsilon?

`number`

The maximum inclusive delta between `left` and `right` for the relative tolerance test.

### absoluteEpsilon?

`number`

The maximum inclusive delta between `left` and `right` for the absolute tolerance test.

## Returns

`boolean`

`true` if the values are equal within the epsilon; otherwise, `false`.

## Example

```ts
const a = Daisy.Math.equalsEpsilon(0.0, 0.01, Daisy.Math.EPSILON2); // true
const b = Daisy.Math.equalsEpsilon(0.0, 0.1, Daisy.Math.EPSILON2); // false
const c = Daisy.Math.equalsEpsilon(3699175.1634344, 3699175.2, Daisy.Math.EPSILON7); // true
const d = Daisy.Math.equalsEpsilon(3699175.1634344, 3699175.2, Daisy.Math.EPSILON9); // false
```
