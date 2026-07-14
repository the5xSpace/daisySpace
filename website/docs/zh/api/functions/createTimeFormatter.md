[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / createTimeFormatter

# Function: createTimeFormatter()

> **createTimeFormatter**(`config?`): (`time`) => `string`

创建可重复使用的仿真时间格式化函数。

## Parameters

### config?

[`TimeFormatConfig`](../types/TimeFormatConfig.md)

## Returns

(`time`) => `string`

## Example

```ts
const formatMissionTime = Daisy.createTimeFormatter({
 preset: "t0",
 t0: "2026-01-01T00:00:00Z",
 t0ShowMilliseconds: true,
});
const label = formatMissionTime(engine.getCurrentTime());
```
