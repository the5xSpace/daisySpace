[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / VisibilityWindow

# Type Alias: VisibilityWindow

> **VisibilityWindow** = `{ endTimestampMs: number; endUtc: Date; satIds: string[]; startTimestampMs: number; startUtc: Date; timeBasis: "UTC" }`

Visibility window (for inter-satellite visibility/occlusion analysis).

- `startUtc`/`endUtc` are UTC
- `satIds` are satellite identifiers participating in the window (currently NORAD ID strings)

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
