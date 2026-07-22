[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ActiveModelAnimationInfo

# Type Alias: ActiveModelAnimationInfo

> **ActiveModelAnimationInfo** = `{ id: string; name: string }`

Active animation info (runtime state).

## Properties

### delay?

> `optional` **delay?**: `number`

Delay start time (in seconds).

***

### id

> **id**: `string`

Unique animation identifier.

***

### loop?

> `optional` **loop?**: [`ModelAnimationLoop`](../enums/ModelAnimationLoop.md)

Loop mode.

***

### multiplier?

> `optional` **multiplier?**: `number`

Playback rate multiplier.

***

### name

> **name**: `string`

Animation name.

***

### reverse?

> `optional` **reverse?**: `boolean`

Whether to play in reverse.

***

### startTime?

> `optional` **startTime?**: `Daisy.JulianDate`

Start time (simulation time).

***

### stopTime?

> `optional` **stopTime?**: `Daisy.JulianDate`

Stop time (simulation time).
