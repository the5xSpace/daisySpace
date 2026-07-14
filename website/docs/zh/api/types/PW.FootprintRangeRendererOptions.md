[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / FootprintRangeRendererOptions

# Type Alias: FootprintRangeRendererOptions

> **FootprintRangeRendererOptions** = `object`

footprint 区间渲染器配置。

用于持续展示某个时间范围内的覆盖结果。

## Properties

### fillColor?

> `optional` **fillColor?**: [`DColor`](DColor.md)

覆盖面的填充颜色。

***

### footprintTimes?

> `optional` **footprintTimes?**: `Daisy.JulianDate` \| `Daisy.JulianDate`[] \| [`TimeRange`](PW.TimeRange.md) \| [`TimeRanges`](PW.TimeRanges.md)

需要统计的 footprint 时间范围或时刻集合。

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

是否显示区间渲染结果。
