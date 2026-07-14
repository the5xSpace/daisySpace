[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Transforms](../modules/Daisy.Transforms.md) / computeIcrfToCentralBodyFixedMatrix

# Function: computeIcrfToCentralBodyFixedMatrix()

> **computeIcrfToCentralBodyFixedMatrix**(`date`, `result?`): [`Matrix3`](../classes/Daisy.Matrix3.md) \| `undefined`

The default function to compute a rotation matrix to transform a point or vector from the International Celestial
Reference Frame (GCRF/ICRF) inertial frame axes to the central body, typically Earth, fixed frame axis at a given
time for use in lighting and transformation from inertial reference frames. This function may return undefined if
the data necessary to do the transformation is not yet loaded.

## Parameters

### date

[`JulianDate`](../classes/Daisy.JulianDate.md)

The time at which to compute the rotation matrix.

### result?

[`Matrix3`](../classes/Daisy.Matrix3.md)

The object onto which to store the result. If this parameter is
 not specified, a new instance is created and returned.

## Returns

[`Matrix3`](../classes/Daisy.Matrix3.md) \| `undefined`

The rotation matrix, or undefined if the data necessary to do the
 transformation is not yet loaded.

## Example

```ts
// Set the default ICRF to fixed transformation to that of the Moon.
Daisy.Transforms.computeIcrfToCentralBodyFixedMatrix = Daisy.Transforms.computeIcrfToMoonFixedMatrix;
```
