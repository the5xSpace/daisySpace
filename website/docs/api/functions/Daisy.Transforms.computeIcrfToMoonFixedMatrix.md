[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Transforms](../modules/Daisy.Transforms.md) / computeIcrfToMoonFixedMatrix

# Function: computeIcrfToMoonFixedMatrix()

> **computeIcrfToMoonFixedMatrix**(`date`, `result?`): [`Matrix3`](../classes/Daisy.Matrix3.md)

Computes a rotation matrix to transform a point or vector from the International Celestial
Reference Frame (GCRF/ICRF) inertial frame axes to the Moon-Fixed frame axes
at a given time.

## Parameters

### date

[`JulianDate`](../classes/Daisy.JulianDate.md)

The time at which to compute the rotation matrix.

### result?

[`Matrix3`](../classes/Daisy.Matrix3.md)

The object onto which to store the result. If this parameter is
 not specified, a new instance is created and returned.

## Returns

[`Matrix3`](../classes/Daisy.Matrix3.md)

The rotation matrix.

## Example

```ts
// Set the default ICRF to fixed transformation to that of the Moon.
Daisy.Transforms.computeIcrfToCentralBodyFixedMatrix = Daisy.Transforms.computeIcrfToMoonFixedMatrix;
```
