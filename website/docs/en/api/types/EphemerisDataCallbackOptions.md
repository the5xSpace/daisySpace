[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EphemerisDataCallbackOptions

# Type Alias: EphemerisDataCallbackOptions

> **EphemerisDataCallbackOptions** = `{ callback: (append) => void; referenceFrame: Daisy.ReferenceFrame }`

Ephemeris data source configuration (callback append form).

Used for continuously appending position points (e.g., real-time streaming data).

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
