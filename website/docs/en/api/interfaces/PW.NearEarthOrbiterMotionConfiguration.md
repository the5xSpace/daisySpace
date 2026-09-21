[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / NearEarthOrbiterMotionConfiguration

# Interface: NearEarthOrbiterMotionConfiguration

近地轨道对象的高层运动配置。

`source` 表达数据来自哪里，`positionMode` 表达如何计算位置，
`attitudeMode` 表达姿态如何得到，`ephemeris` 只服务于预计算星历。

## Properties

### attitudeMode?

> `optional` **attitudeMode?**: [`NearEarthOrbiterAttitudeMode`](../types/PW.NearEarthOrbiterAttitudeMode.md)

***

### ephemeris?

> `optional` **ephemeris?**: [`NearEarthOrbiterEphemerisPlan`](PW.NearEarthOrbiterEphemerisPlan.md)

***

### positionMode

> **positionMode**: [`NearEarthOrbiterPositionMode`](../types/PW.NearEarthOrbiterPositionMode.md)

***

### source

> **source**: [`NearEarthOrbiterMotionSource`](../types/PW.NearEarthOrbiterMotionSource.md)
