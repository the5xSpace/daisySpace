[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / NearEarthOrbiterTrajectoryRequest

# Type Alias: NearEarthOrbiterTrajectoryRequest

> **NearEarthOrbiterTrajectoryRequest** = `object`

Trajectory write request.

A business-oriented shorthand entry point:
- `startTime/endTime` can be omitted and will default to the current scene time
- `stepSeconds` defaults to 600

## Properties

### endTime?

> `optional` **endTime?**: `Daisy.JulianDate`

Sampling end time (simulation time); defaults to scene end time

***

### intervalSeconds?

> `optional` **intervalSeconds?**: `number`

Legacy parameter alias: sampling interval (in seconds)

***

### observerLocation?

> `optional` **observerLocation?**: \[`number`, `number`, `number`\]

Observer position (lon/lat/alt), units: deg/deg/m; defaults to [0,0,0]

***

### setOrientation?

> `optional` **setOrientation?**: `boolean`

Whether to write orientation; defaults to true

***

### startTime?

> `optional` **startTime?**: `Daisy.JulianDate`

Sampling start time (simulation time); defaults to scene start time

***

### stepSeconds?

> `optional` **stepSeconds?**: `number`

Sampling step (in seconds); defaults to 600

***

### trajectoryOptions?

> `optional` **trajectoryOptions?**: [`NearEarthOrbiterTrajectoryOptions`](PW.NearEarthOrbiterTrajectoryOptions.md)

Interpolation parameters
