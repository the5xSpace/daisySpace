[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Transforms](../modules/Daisy.Transforms.md) / computeTemeToPseudoFixedMatrix

# Function: computeTemeToPseudoFixedMatrix()

> **computeTemeToPseudoFixedMatrix**(`date`, `result?`): [`Matrix3`](../classes/Daisy.Matrix3.md)

Computes a rotation matrix to transform a point or vector from True Equator Mean Equinox (TEME) axes to the
pseudo-fixed axes at a given time. This method treats the UT1 time standard as equivalent to UTC.

## Parameters

### date

[`JulianDate`](../classes/Daisy.JulianDate.md)

The time at which to compute the rotation matrix.

### result?

[`Matrix3`](../classes/Daisy.Matrix3.md)

The object onto which to store the result.

## Returns

[`Matrix3`](../classes/Daisy.Matrix3.md)

The modified result parameter or a new Matrix3 instance if none was provided.

## Example

```ts
//Set the view to the inertial frame.
scene.postUpdate.addEventListener(function(scene, time) {
 const now = Daisy.JulianDate.now();
 const offset = Daisy.Matrix4.multiplyByPoint(camera.transform, camera.position, new Daisy.Cartesian3());
 const transform = Daisy.Matrix4.fromRotationTranslation(Daisy.Transforms.computeTemeToPseudoFixedMatrix(now));
 const inverseTransform = Daisy.Matrix4.inverseTransformation(transform, new Daisy.Matrix4());
 Daisy.Matrix4.multiplyByPoint(inverseTransform, offset, offset);
 camera.lookAtTransform(transform, offset);
});
```
