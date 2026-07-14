[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / VisibilityWindow

# Type Alias: VisibilityWindow

> **VisibilityWindow** = `{ endTimestampMs: number; endUtc: Date; satIds: string[]; startTimestampMs: number; startUtc: Date; timeBasis: "UTC" }`

可视窗口（用于互视/遮挡分析）。

- `startUtc`/`endUtc` 为 UTC
- `satIds` 为参与窗口的卫星标识（当前实现为 NORAD ID 字符串）

## Properties

### endTimestampMs

> **endTimestampMs**: `number`

***

### endUtc

> **endUtc**: `Date`

***

### satIds

> **satIds**: `string`[]

***

### startTimestampMs

> **startTimestampMs**: `number`

***

### startUtc

> **startUtc**: `Date`

***

### timeBasis

> **timeBasis**: `"UTC"`
