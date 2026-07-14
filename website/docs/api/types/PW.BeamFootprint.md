[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / BeamFootprint

# Type Alias: BeamFootprint

> **BeamFootprint** = `object`

实时波束覆盖显示配置。

## Properties

### fillColor?

> `optional` **fillColor?**: [`DColor`](DColor.md)

填充色

***

### footprintTimes?

> `optional` **footprintTimes?**: `Daisy.JulianDate` \| `Daisy.JulianDate`[] \| [`TimeRange`](PW.TimeRange.md) \| [`TimeRanges`](PW.TimeRanges.md)

覆盖输出时间范围 可以是一个或多个时刻，也可以是多个时间或者单个时间范围

***

### maxSampleCount?

> `optional` **maxSampleCount?**: `number`

覆盖采样数量上限。默认 1000，最大有效值 3000。

当时间范围 / 采样间隔推导出的采样数量超过上限时，系统会自动放大采样间隔，
以降低覆盖绘制分辨率并保护渲染性能。

***

### outline?

> `optional` **outline?**: `boolean`

启用边框

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](DColor.md)

边框颜色

***

### outlineWidthPx?

> `optional` **outlineWidthPx?**: `number`

边框宽度像素

***

### retainSeconds?

> `optional` **retainSeconds?**: `number`

采样覆盖绘图过期后的保留时间，单位为秒；`0` 表示立即移除。

***

### sampleStepSeconds?

> `optional` **sampleStepSeconds?**: `number`

采样间隔（秒），默认 60 秒

***

### show?

> `optional` **show?**: `boolean`

是否启用波束覆盖实时可视化
