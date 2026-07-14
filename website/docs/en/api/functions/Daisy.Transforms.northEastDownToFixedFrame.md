[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Transforms](../modules/Daisy.Transforms.md) / northEastDownToFixedFrame

# Function: northEastDownToFixedFrame()

> **northEastDownToFixedFrame**(`origin`, `ellipsoid?`, `result?`): [`Matrix4`](../classes/Daisy.Matrix4.md)

Computes a 4x4 transformation matrix from a reference frame with an north-east-down axes
centered at the provided origin to the provided ellipsoid's fixed reference frame.
The local axes are defined as:

- The `x` axis points in the local north direction.
- The `y` axis points in the local east direction.
- The `z` axis points in the opposite direction of the ellipsoid surface normal which passes through the position.


## Parameters

### origin

[`Cartesian3`](../classes/Daisy.Cartesian3.md)

The center point of the local reference frame.

### ellipsoid?

[`Ellipsoid`](../classes/Daisy.Ellipsoid.md)

The ellipsoid whose fixed frame is used in the transformation.

### result?

[`Matrix4`](../classes/Daisy.Matrix4.md)

The object onto which to store the result.

## Returns

[`Matrix4`](../classes/Daisy.Matrix4.md)

The modified result parameter or a new Matrix4 instance if none was provided.

## Example

```ts
// Get the transform from local north-east-down at cartographic (0.0, 0.0) to Earth's fixed frame.
const center = Daisy.Cartesian3.fromDegrees(0.0, 0.0);
const transform = Daisy.Transforms.northEastDownToFixedFrame(center);
```
