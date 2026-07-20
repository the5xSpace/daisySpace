[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / MarkerTarget

# Interface: MarkerTarget

Marker target configuration.

Defines a target point that needs to be marked in the scene.

## Properties

### color?

> `optional` **color?**: `Color`

Marker color.

***

### getPosition

> **getPosition**: (`time`) => `Cartesian3`

Gets the target position at the specified time.

#### Parameters

##### time

`JulianDate`

Simulation time.

#### Returns

`Cartesian3`

Target position (world coordinates).

***

### label

> **label**: `string`

Marker label text.
