[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ModelAnimationPlayOptions

# Type Alias: ModelAnimationPlayOptions

> **ModelAnimationPlayOptions** = `object`

Model animation playback configuration.

## Properties

### animationTime?

> `optional` **animationTime?**: [`ModelAnimationTimeCallback`](ModelAnimationTimeCallback.md)

Custom animation time mapping function.

***

### delay?

> `optional` **delay?**: `number`

Animation delay before start (unit: seconds).

***

### index?

> `optional` **index?**: `number`

Animation index (choose one from `name`).

***

### loop?

> `optional` **loop?**: [`ModelAnimationLoop`](../enums/ModelAnimationLoop.md)

Loop mode.

***

### multiplier?

> `optional` **multiplier?**: `number`

Animation playback rate multiplier.

***

### name?

> `optional` **name?**: `string`

Animation name (choose one from `index`).

***

### removeOnStop?

> `optional` **removeOnStop?**: `boolean`

Whether to automatically remove the animation when it stops.

***

### reverse?

> `optional` **reverse?**: `boolean`

Whether to play in reverse.

***

### startTime?

> `optional` **startTime?**: `Daisy.JulianDate`

Animation start time (simulation time).

***

### stopTime?

> `optional` **stopTime?**: `Daisy.JulianDate`

Animation stop time (simulation time).
