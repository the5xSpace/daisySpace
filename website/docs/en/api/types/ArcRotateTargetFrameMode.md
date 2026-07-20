[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArcRotateTargetFrameMode

# Type Alias: ArcRotateTargetFrameMode

> **ArcRotateTargetFrameMode** = `"model"` \| `"enu"`

Reference frame used by the orbit camera when following a target.

- model: uses the target's worldMatrix, the orbit view inherits the target's orientation
- enu: uses the East-North-Up reference frame at the target position, preventing the camera from inheriting the target's pitch/roll
