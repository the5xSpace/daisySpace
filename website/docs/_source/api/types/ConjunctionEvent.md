[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ConjunctionEvent

# Type Alias: ConjunctionEvent

> **ConjunctionEvent** = `{ minDistance: number; relativeSpeedPerSecond: number; satAId: string; satBId: string; stateA: OrbitState; stateB: OrbitState; tcaTimestampMs: number; tcaUtc: Date; timeBasis: "UTC" }`

交汇事件（>=2 星最近距离预报）。

- `tcaUtc`: 最近距离发生时刻（TCA）
- `minDistance`: 最近距离（m）
- `relativeSpeedPerSecond`: 相对速度模长（m/s），基于 ECEF 速度估计
- `stateA`/`stateB`: 同一 `tcaUtc` 下双方的完整状态输出（含 ECI/ECEF/LLA）

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
