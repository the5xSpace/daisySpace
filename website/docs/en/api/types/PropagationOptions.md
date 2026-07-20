[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PropagationOptions

# Type Alias: PropagationOptions

> **PropagationOptions** = `object`

Propagation output options.

- `centralBody`: central body selection for ellipsoid/geometry (default earth)
- `ellipsoid`: explicitly specify the ellipsoid (higher priority than `centralBody`)
- `earthRotationRateRadPerSec`: 地球自转角速度（用于 ECEF 速度修正项 \(\omega \times r\)），默认 `7.2921150e-5`
- `observer`: specify an observation point to output `enu`
- `includeENU`: whether to force ENU output (not needed when `observer` is set)

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
