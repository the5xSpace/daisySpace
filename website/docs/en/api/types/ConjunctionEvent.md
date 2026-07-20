[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ConjunctionEvent

# Type Alias: ConjunctionEvent

> **ConjunctionEvent** = `{ minDistance: number; relativeSpeedPerSecond: number; satAId: string; satBId: string; stateA: OrbitState; stateB: OrbitState; tcaTimestampMs: number; tcaUtc: Date; timeBasis: "UTC" }`

Conjunction event (closest approach prediction for >=2 satellites).

- `tcaUtc`: Time of Closest Approach (TCA)
- `minDistance`: minimum distance (m)
- `relativeSpeedPerSecond`: relative speed magnitude (m/s), estimated from ECEF velocities
- `stateA`/`stateB`: full state output for both objects at the same `tcaUtc` (including ECI/ECEF/LLA)

## Properties

### minDistance

> **minDistance**: `number`

***

### relativeSpeedPerSecond

> **relativeSpeedPerSecond**: `number`

***

### satAId

> **satAId**: `string`

***

### satBId

> **satBId**: `string`

***

### stateA

> **stateA**: [`OrbitState`](OrbitState.md)

***

### stateB

> **stateB**: [`OrbitState`](OrbitState.md)

***

### tcaTimestampMs

> **tcaTimestampMs**: `number`

***

### tcaUtc

> **tcaUtc**: `Date`

***

### timeBasis

> **timeBasis**: `"UTC"`
