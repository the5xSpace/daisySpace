[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / SensorTrackInterval

# Type Alias: SensorTrackInterval

> **SensorTrackInterval** = `{ start: Daisy.JulianDate }`

Single sensor tracking target time interval.

## Properties

### end?

> `optional` **end?**: `Daisy.JulianDate`

Interval end time.

***

### start

> **start**: `Daisy.JulianDate`

Interval start time.

***

### stop?

> `optional` **stop?**: `Daisy.JulianDate`

Compatibility alias for `end`.

***

### target?

> `optional` **target?**: `SensorTrackingTargetValue`

Target tracked within the interval; empty means no tracking in this interval.
