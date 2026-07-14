[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / FootprintDrawOptions

# Type Alias: FootprintDrawOptions

> **FootprintDrawOptions** = `{ begin: Daisy.JulianDate; end: Daisy.JulianDate }`

footprint 绘制配置。

用于一次性绘制指定时间区间内的覆盖结果，支持逐帧绘制和合并绘制两种模式。

## Properties

### begin

> **begin**: `Daisy.JulianDate`

绘制开始时间。

***

### debug?

> `optional` **debug?**: `boolean`

是否启用调试绘制。

***

### debugName?

> `optional` **debugName?**: `string`

调试绘制名称。

***

### debugWireframe?

> `optional` **debugWireframe?**: `boolean`

是否启用调试线框。

***

### end

> **end**: `Daisy.JulianDate`

绘制结束时间。

***

### fillColor?

> `optional` **fillColor?**: [`DColor`](DColor.md)

填充颜色。

***

### maxSampleCount?

> `optional` **maxSampleCount?**: `number`

覆盖采样数量上限。默认 1000，最大有效值 3000。

***

### outline?

> `optional` **outline?**: `boolean`

是否绘制轮廓。

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](DColor.md)

轮廓颜色。

***

### outlineWidthPx?

> `optional` **outlineWidthPx?**: `number`

轮廓宽度，单位为像素。

***

### sampleStepSeconds?

> `optional` **sampleStepSeconds?**: `number`

采样步长，单位为秒。

***

### show?

> `optional` **show?**: `boolean`

是否显示绘制结果。

***

### union?

> `optional` **union?**: `boolean`

是否将多个采样 footprint 合并成一个结果。
