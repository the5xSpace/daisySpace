[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Transforms](../modules/Daisy.Transforms.md) / computeFixedToIcrfMatrix

# Function: computeFixedToIcrfMatrix()

> **computeFixedToIcrfMatrix**(`date`, `result?`): [`Matrix3`](../classes/Daisy.Matrix3.md) \| `undefined`

Computes a rotation matrix to transform a point or vector from the Earth-Fixed frame axes (ITRF)
to the International Celestial Reference Frame (GCRF/ICRF) inertial frame axes
at a given time. This function may return undefined if the data necessary to
do the transformation is not yet loaded.

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
// Transform a point from the Fixed axes to the ICRF axes.
const now = Daisy.JulianDate.now();
const pointInFixed = Daisy.Cartesian3.fromDegrees(0.0, 0.0);
const fixedToIcrf = Daisy.Transforms.computeFixedToIcrfMatrix(now);
let pointInInertial = new Daisy.Cartesian3();
if (Daisy.defined(fixedToIcrf)) {
 pointInInertial = Daisy.Matrix3.multiplyByVector(fixedToIcrf, pointInFixed, pointInInertial);
}
```
