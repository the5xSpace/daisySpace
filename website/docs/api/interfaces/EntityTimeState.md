[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EntityTimeState

# Interface: EntityTimeState

实体在某一时刻的时间状态快照。

## Properties

### position?

> `optional` **position?**: `Cartesian3`

实体在该时刻的位置（世界坐标系）。

***

### positionECEF?

> `optional` **positionECEF?**: `Cartesian3`

实体在该时刻的位置（地固坐标系 / ECEF）。

***

### positionInertial?

> `optional` **positionInertial?**: `Cartesian3`

实体在该时刻的位置（惯性坐标系）。

***

### time

> **time**: `JulianDate`

仿真时间。
