[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / BeamFootprint

# Type Alias: BeamFootprint

> **BeamFootprint** = `object`

Real-time beam footprint display configuration.

## Properties

### fillColor?

> `optional` **fillColor?**: [`DColor`](DColor.md)

Fill color

***

### footprintTimes?

> `optional` **footprintTimes?**: `Daisy.JulianDate` \| `Daisy.JulianDate`[] \| [`TimeRange`](PW.TimeRange.md) \| [`TimeRanges`](PW.TimeRanges.md)

Output time range for coverage. Can be one or more moments, or multiple times or a single time range.

***

### maxSampleCount?

> `optional` **maxSampleCount?**: `number`

Maximum number of coverage samples. Default is 1000, maximum effective value is 3000.

When the sample count derived from the time range / sampling interval exceeds the limit, the system automatically increases the sampling interval, to reduce coverage rendering resolution and protect rendering performance.

***

### outline?

> `optional` **outline?**: `boolean`

Enable outline

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](DColor.md)

Outline color

***

### outlineWidthPx?

> `optional` **outlineWidthPx?**: `number`

Outline width in pixels

***

### retainSeconds?

> `optional` **retainSeconds?**: `number`

Retention time (in seconds) after the sampled coverage plot expires; `0` means remove immediately.

***

### sampleStepSeconds?

> `optional` **sampleStepSeconds?**: `number`

Sampling interval (seconds), default is 60 seconds

***

### show?

> `optional` **show?**: `boolean`

Whether to enable real-time visualization of beam footprint