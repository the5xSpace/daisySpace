[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BodyTrackedCameraState

# Interface: BodyTrackedCameraState

Local state of the body-tracked camera.

Represents camera position and orientation in the “body coordinate system” (a local coordinate system that rotates with the celestial body), making it easy to maintain a stable relative view as the celestial body rotates.

## Properties

### body

> **body**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

***

### localOrientation

> **localOrientation**: `Quaternion`

***

### localPosition

> **localPosition**: `Cartesian3`
