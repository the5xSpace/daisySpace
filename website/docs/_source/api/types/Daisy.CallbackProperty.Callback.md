[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [CallbackProperty](../modules/Daisy.CallbackProperty.md) / Callback

# Type Alias: Callback

> **Callback** = (`time?`, `result?`) => `any`

A function that returns the value of the property.

## Parameters

### time?

[`JulianDate`](../classes/Daisy.JulianDate.md)

The time for which to retrieve the value. If omitted, the current system time is used.

### result?

`any`

The object to store the value into. If omitted, the function must create and return a new instance.

## Returns

`any`
