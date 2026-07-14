[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Transforms](../modules/Daisy.Transforms.md) / rotationMatrixFromPositionVelocity

# Function: rotationMatrixFromPositionVelocity()

> **rotationMatrixFromPositionVelocity**(`position`, `velocity`, `ellipsoid?`, `result?`): [`Matrix3`](../classes/Daisy.Matrix3.md)

Transform a position and velocity to a rotation matrix.

## Parameters

### position

[`Cartesian3`](../classes/Daisy.Cartesian3.md)

The position to transform.

### velocity

[`Cartesian3`](../classes/Daisy.Cartesian3.md)

The velocity vector to transform.

### ellipsoid?

[`Ellipsoid`](../classes/Daisy.Ellipsoid.md)

The ellipsoid whose fixed frame is used in the transformation.

### result?

[`Matrix3`](../classes/Daisy.Matrix3.md)

The object onto which to store the result.

## Returns

[`Matrix3`](../classes/Daisy.Matrix3.md)

The modified result parameter or a new Matrix3 instance if none was provided.
