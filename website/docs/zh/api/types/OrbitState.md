[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / OrbitState

# Type Alias: OrbitState

> **OrbitState** = `{ ecef: OrbitStateECEF; eci: OrbitStateECI; lla: OrbitStateLLA; timeBasis: "UTC"; timestampMs: number; timeUtc: Date }`

轨道全状态输出（满足“同时包含 ECI/ECEF/LLA/时间戳”的约束）。

- `eci.frame` 固定为 `TEME`（与 SGP4 输出一致）
- `ecef.frame` 固定为 `ECEF`
- `lla` 为角度制经纬高（基于 `Daisy.Ellipsoid`）
- `enu` 仅在传入 `observer`（或 `includeENU`）时输出

## Properties

### ecef

> **ecef**: [`OrbitStateECEF`](OrbitStateECEF.md)

***

### eci

> **eci**: [`OrbitStateECI`](OrbitStateECI.md)

***

### enu?

> `optional` **enu?**: [`OrbitStateENU`](OrbitStateENU.md)

***

### j2000?

> `optional` **j2000?**: [`OrbitStateECI`](OrbitStateECI.md)

***

### lla

> **lla**: [`OrbitStateLLA`](OrbitStateLLA.md)

***

### teme?

> `optional` **teme?**: [`OrbitStateECI`](OrbitStateECI.md)

***

### timeBasis

> **timeBasis**: `"UTC"`

***

### timestampMs

> **timestampMs**: `number`

***

### timeUtc

> **timeUtc**: `Date`
