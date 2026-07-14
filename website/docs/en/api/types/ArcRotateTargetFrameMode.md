[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArcRotateTargetFrameMode

# Type Alias: ArcRotateTargetFrameMode

> **ArcRotateTargetFrameMode** = `"model"` \| `"enu"`

环绕相机跟随目标时使用的参考系。

- model：使用目标 worldMatrix，环绕视角会继承目标姿态
- enu：使用目标位置的 East-North-Up 参考系，避免相机继承目标俯仰/滚转
