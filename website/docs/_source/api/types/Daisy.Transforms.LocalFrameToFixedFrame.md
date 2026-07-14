[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Transforms](../modules/Daisy.Transforms.md) / LocalFrameToFixedFrame

# Type Alias: LocalFrameToFixedFrame

> **LocalFrameToFixedFrame** = (`origin`, `ellipsoid?`, `result?`) => [`Matrix4`](../classes/Daisy.Matrix4.md)

Computes a 4x4 transformation matrix from a reference frame
centered at the provided origin to the provided ellipsoid's fixed reference frame.

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
