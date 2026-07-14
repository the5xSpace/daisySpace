[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Transforms](../modules/Daisy.Transforms.md) / fixedFrameToHeadingPitchRoll

# Function: fixedFrameToHeadingPitchRoll()

> **fixedFrameToHeadingPitchRoll**(`transform`, `ellipsoid?`, `fixedFrameTransform?`, `result?`): `HeadingPitchRoll`

Computes heading-pitch-roll angles from a transform in a particular reference frame. Heading is the rotation from the local east
direction where a positive angle is increasing eastward. Pitch is the rotation from the local east-north plane. Positive pitch angles
are above the plane. Negative pitch angles are below the plane. Roll is the first rotation applied about the local east axis.

## Parameters

### transform

[`Matrix4`](../classes/Daisy.Matrix4.md)

The transform

### ellipsoid?

[`Ellipsoid`](../classes/Daisy.Ellipsoid.md)

The ellipsoid whose fixed frame is used in the transformation.

### fixedFrameTransform?

[`LocalFrameToFixedFrame`](../types/Daisy.Transforms.LocalFrameToFixedFrame.md)

A 4x4 transformation
 matrix from a reference frame to the provided ellipsoid's fixed reference frame

### result?

`HeadingPitchRoll`

The object onto which to store the result.

## Returns

`HeadingPitchRoll`

The modified result parameter or a new HeadingPitchRoll instance if none was provided.
