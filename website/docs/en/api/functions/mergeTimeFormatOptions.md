[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / mergeTimeFormatOptions

# Function: mergeTimeFormatOptions()

> **mergeTimeFormatOptions**(`base?`, `override?`): [`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

Merges base and local time format configurations.

When the local config is a preset name or callback, it fully replaces the base config. When the local config is an object, it merges by field.

## Parameters

### base?

[`TimeFormatConfig`](../types/TimeFormatConfig.md)

### override?

[`TimeFormatConfig`](../types/TimeFormatConfig.md)

## Returns

[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)
