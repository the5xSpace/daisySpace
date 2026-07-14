[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Transforms](../modules/Daisy.Transforms.md) / computeIcrfToFixedMatrix

# Function: computeIcrfToFixedMatrix()

> **computeIcrfToFixedMatrix**(`date`, `result?`): [`Matrix3`](../classes/Daisy.Matrix3.md) \| `undefined`

Computes a rotation matrix to transform a point or vector from the International Celestial
Reference Frame (GCRF/ICRF) inertial frame axes to the Earth-Fixed frame axes (ITRF)
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
scene.postUpdate.addEventListener(function(scene, time) {
 // View in ICRF.
 const icrfToFixed = Daisy.Transforms.computeIcrfToFixedMatrix(time);
 if (Daisy.defined(icrfToFixed)) {
 const offset = Daisy.Cartesian3.clone(camera.position);
 const transform = Daisy.Matrix4.fromRotationTranslation(icrfToFixed);
 camera.lookAtTransform(transform, offset);
 }
});
```
