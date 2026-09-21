[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / GroundTrackComponentOptions

# Type Alias: GroundTrackComponentOptions

> **GroundTrackComponentOptions** = `object`

## Properties

### currentPoint?

> `optional` **currentPoint?**: [`GroundTrackPointStyle`](PW.GroundTrackPointStyle.md)

***

### futureLine?

> `optional` **futureLine?**: [`GroundTrackLineStyle`](PW.GroundTrackLineStyle.md)

Preferred semantic name for the forecast line style.

***

### futureSeconds?

> `optional` **futureSeconds?**: `number`

Preferred semantic name for the forecast duration.

***

### historyLine?

> `optional` **historyLine?**: [`GroundTrackLineStyle`](PW.GroundTrackLineStyle.md)

***

### historySeconds?

> `optional` **historySeconds?**: `number`

History duration in seconds.

***

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

***

### name?

> `optional` **name?**: `string`

***

### point?

> `optional` **point?**: [`GroundTrackPointStyle`](PW.GroundTrackPointStyle.md)

***

### ~~predictLine?~~

> `optional` **predictLine?**: [`GroundTrackLineStyle`](PW.GroundTrackLineStyle.md)

#### Deprecated

Use `futureLine`.

***

### ~~predictSeconds?~~

> `optional` **predictSeconds?**: `number`

#### Deprecated

Use `futureSeconds`.

***

### sampleIntervalSeconds?

> `optional` **sampleIntervalSeconds?**: `number`

Alias for `samplingStepSeconds`.

***

### ~~sampleStepSeconds?~~

> `optional` **sampleStepSeconds?**: `number`

#### Deprecated

Use `samplingStepSeconds`.

***

### samplingStepSeconds?

> `optional` **samplingStepSeconds?**: `number`

Preferred semantic name for the sampling interval.

***

### show?

> `optional` **show?**: `boolean`

***

### size?

> `optional` **size?**: `number`

***

### sizePx?

> `optional` **sizePx?**: `number`

***

### timeRangeMode?

> `optional` **timeRangeMode?**: [`GroundTrackTimeRangeMode`](PW.GroundTrackTimeRangeMode.md)

Whether history/prediction duration and sampling follow the host object's
motion path. Defaults to `"inherit"` for compatibility with older scenes.

***

### width?

> `optional` **width?**: `number`
