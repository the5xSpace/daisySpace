[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PropagationOptions

# Type Alias: PropagationOptions

> **PropagationOptions** = `object`

传播输出选项。

- `centralBody`: 用于椭球/几何侧的中心天体选择（默认 earth）
- `ellipsoid`: 显式指定椭球（优先级高于 `centralBody`）
- `earthRotationRateRadPerSec`: 地球自转角速度（用于 ECEF 速度修正项 \(\omega \times r\)），默认 `7.2921150e-5`
- `observer`: 指定观测点则可输出 `enu`
- `includeENU`: 是否强制输出 ENU（设置 `observer` 时无需显式传 true）

## Properties

### centralBody?

> `optional` **centralBody?**: [`CentralBody`](CentralBody.md)

***

### earthRotationRateRadPerSec?

> `optional` **earthRotationRateRadPerSec?**: `number`

***

### ellipsoid?

> `optional` **ellipsoid?**: `Daisy.Ellipsoid`

***

### includeENU?

> `optional` **includeENU?**: `boolean`

***

### observer?

> `optional` **observer?**: [`ObserverDefinition`](ObserverDefinition.md)
