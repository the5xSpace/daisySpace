[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / SensorTrackInterval

# Type Alias: SensorTrackInterval

> **SensorTrackInterval** = `{ start: Daisy.JulianDate }`

单个传感器跟踪目标时间区间。

## Properties

### end?

> `optional` **end?**: `Daisy.JulianDate`

区间结束时刻。

***

### start

> **start**: `Daisy.JulianDate`

区间开始时刻。

***

### stop?

> `optional` **stop?**: `Daisy.JulianDate`

`end` 的兼容别名。

***

### target?

> `optional` **target?**: `SensorTrackingTargetValue`

区间内跟踪的目标；为空时表示该区间不跟踪。
