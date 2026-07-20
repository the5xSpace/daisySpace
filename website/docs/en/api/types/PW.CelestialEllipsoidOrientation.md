[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / CelestialEllipsoidOrientation

# Type Alias: CelestialEllipsoidOrientation

> **CelestialEllipsoidOrientation** = `Daisy.Matrix3` \| `Daisy.Quaternion` \| ((`time?`) => `Daisy.Matrix3` \| `Daisy.Quaternion` \| `undefined` \| `null`)

Orientation source from celestial body local coordinates to world coordinates

- Supports fixed matrix/quaternion
- Or a function that returns a value by time
