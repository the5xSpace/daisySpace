[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Transforms](../modules/Daisy.Transforms.md) / headingPitchRollQuaternion

# Function: headingPitchRollQuaternion()

> **headingPitchRollQuaternion**(`origin`, `headingPitchRoll`, `ellipsoid?`, `fixedFrameTransform?`, `result?`): [`Quaternion`](../classes/Daisy.Quaternion.md)

Computes a quaternion from a reference frame with axes computed from the heading-pitch-roll angles
centered at the provided origin. Heading is the rotation from the local east
direction where a positive angle is increasing eastward. Pitch is the rotation from the local east-north plane. Positive pitch angles
are above the plane. Negative pitch angles are below the plane. Roll is the first rotation applied about the local east axis.

## Parameters

### origin

[`Cartesian3`](../classes/Daisy.Cartesian3.md)

The center point of the local reference frame.

### headingPitchRoll

`HeadingPitchRoll`

The heading, pitch, and roll.

### ellipsoid?

[`Ellipsoid`](../classes/Daisy.Ellipsoid.md)

The ellipsoid whose fixed frame is used in the transformation.

### fixedFrameTransform?

[`LocalFrameToFixedFrame`](../types/Daisy.Transforms.LocalFrameToFixedFrame.md)

A 4x4 transformation
 matrix from a reference frame to the provided ellipsoid's fixed reference frame

### result?

[`Quaternion`](../classes/Daisy.Quaternion.md)

The object onto which to store the result.

## Returns

[`Quaternion`](../classes/Daisy.Quaternion.md)

The modified result parameter or a new Quaternion instance if none was provided.

## Example

```ts
// Get the quaternion from local heading-pitch-roll at cartographic (0.0, 0.0) to Earth's fixed frame.
const center = Daisy.Cartesian3.fromDegrees(0.0, 0.0);
const heading = -Daisy.Math.PI_OVER_TWO;
const pitch = Daisy.Math.PI_OVER_FOUR;
const roll = 0.0;
const hpr = new HeadingPitchRoll(heading, pitch, roll);
const quaternion = Daisy.Transforms.headingPitchRollQuaternion(center, hpr);
```
