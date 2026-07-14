[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / CelestialEllipsoidOrientation

# Type Alias: CelestialEllipsoidOrientation

> **CelestialEllipsoidOrientation** = `Daisy.Matrix3` \| `Daisy.Quaternion` \| ((`time?`) => `Daisy.Matrix3` \| `Daisy.Quaternion` \| `undefined` \| `null`)

天体局部坐标系到世界坐标的姿态来源

- 支持固定矩阵/四元数
- 或按时间返回的函数
