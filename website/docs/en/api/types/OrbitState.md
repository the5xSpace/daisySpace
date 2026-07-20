[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / OrbitState

# Type Alias: OrbitState

> **OrbitState** = `{ ecef: OrbitStateECEF; eci: OrbitStateECI; lla: OrbitStateLLA; timeBasis: "UTC"; timestampMs: number; timeUtc: Date }`

Full orbit state output (satisfying the constraint of “including ECI/ECEF/LLA/timestamp simultaneously”).

- `eci.frame` is always `TEME` (consistent with SGP4 output)
- `ecef.frame` is always `ECEF`
- `lla` is latitude/longitude/height in degrees (based on `Daisy.Ellipsoid`)
- `enu` is only output when `observer` (or `includeENU`) is provided

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
