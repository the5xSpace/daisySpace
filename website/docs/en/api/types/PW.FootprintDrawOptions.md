[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / FootprintDrawOptions

# Type Alias: FootprintDrawOptions

> **FootprintDrawOptions** = `{ begin: Daisy.JulianDate; end: Daisy.JulianDate }`

Footprint draw configuration.

Used for one-time drawing of coverage results within a specified time interval, supporting both per-frame and merged draw modes.

## Properties

### begin

> **begin**: `Daisy.JulianDate`

Draw start time.

***

### debug?

> `optional` **debug?**: `boolean`

Whether to enable debug drawing.

***

### debugName?

> `optional` **debugName?**: `string`

Debug draw name.

***

### debugWireframe?

> `optional` **debugWireframe?**: `boolean`

Whether to enable debug wireframe.

***

### end

> **end**: `Daisy.JulianDate`

Draw end time.

***

### fillColor?

> `optional` **fillColor?**: [`DColor`](DColor.md)

Fill color.

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

Whether to show the draw result.

***

### union?

> `optional` **union?**: `boolean`

Whether to merge multiple sampled footprints into a single result.
