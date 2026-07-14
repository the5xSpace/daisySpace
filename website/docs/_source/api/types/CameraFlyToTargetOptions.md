[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CameraFlyToTargetOptions

# Type Alias: CameraFlyToTargetOptions

> **CameraFlyToTargetOptions** = `object`

相机飞行到目标的额外参数。

## Properties

### duration?

> `optional` **duration?**: `number`

飞行耗时（秒）。

数值越大，飞行过程越慢；为 0 时通常代表瞬移。

***

### offset?

> `optional` **offset?**: `Daisy.HeadingPitchRange` \| `Daisy.Cartesian3`

相机飞行目标偏移量
