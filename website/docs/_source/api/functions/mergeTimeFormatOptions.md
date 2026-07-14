[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / mergeTimeFormatOptions

# Function: mergeTimeFormatOptions()

> **mergeTimeFormatOptions**(`base?`, `override?`): [`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)

合并基础与局部时间格式配置。

当局部配置是预设名或回调时会完整替换基础配置；局部配置为对象时按字段覆盖。

## Parameters

### base?

[`TimeFormatConfig`](../types/TimeFormatConfig.md)

### override?

[`TimeFormatConfig`](../types/TimeFormatConfig.md)

## Returns

[`TimeFormatOptions`](../interfaces/TimeFormatOptions.md)
