[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EphemerisDataCallbackOptions

# Type Alias: EphemerisDataCallbackOptions

> **EphemerisDataCallbackOptions** = `{ callback: (append) => void; referenceFrame: Daisy.ReferenceFrame }`

星历数据源配置（回调追加形式）。

用于持续追加位置点（如实时流数据）。

## Properties

### callback

> **callback**: (`append`) => `void`

#### Parameters

##### append

[`TimePosition`](TimePosition.md)[]

#### Returns

`void`

***

### referenceFrame

> **referenceFrame**: `Daisy.ReferenceFrame`
