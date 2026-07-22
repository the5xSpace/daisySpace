[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / FootprintRangeRendererOptions

# Type Alias: FootprintRangeRendererOptions

> **FootprintRangeRendererOptions** = `object`

Footprint range renderer configuration.

Used for continuous display of coverage results within a specified time range.

## Properties

### fillColor?

> `optional` **fillColor?**: [`DColor`](DColor.md)

Fill color for the coverage area.

***

### footprintTimes?

> `optional` **footprintTimes?**: `Daisy.JulianDate` \| `Daisy.JulianDate`[] \| [`TimeRange`](PW.TimeRange.md) \| [`TimeRanges`](PW.TimeRanges.md)

Footprint time range or moment collection to be aggregated.

***

### maxSampleCount?

> `optional` **maxSampleCount?**: `number`

Coverage sample count limit. Default 1000, maximum effective value 3000.

***

### outline?

> `optional` **outline?**: `boolean`

Whether to draw the outline.

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](DColor.md)

Outline color.

***

### outlineWidthPx?

> `optional` **outlineWidthPx?**: `number`

Outline width, in pixels.

***

### sampleStepSeconds?

> `optional` **sampleStepSeconds?**: `number`

Sample step, in seconds.

***

### show?

> `optional` **show?**: `boolean`

Whether to show the range render result.
