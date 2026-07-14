[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BodyTrackedCameraState

# Interface: BodyTrackedCameraState

机体跟踪相机的局部状态。

将相机位置与姿态表示在“机体坐标系”（随天体自转的局部坐标系）中，便于在天体旋转时保持相对视角稳定。

## Properties

### body

> **body**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

***

### localOrientation

> **localOrientation**: `Quaternion`

***

### localPosition

> **localPosition**: `Cartesian3`
