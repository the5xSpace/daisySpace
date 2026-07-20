[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / createTimeFormatter

# Function: createTimeFormatter()

> **createTimeFormatter**(`config?`): (`time`) => `string`

Creates a reusable simulation time formatting function.

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
