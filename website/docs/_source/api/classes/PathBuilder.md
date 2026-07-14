[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PathBuilder

# Class: PathBuilder

## Constructors

### Constructor

> **new PathBuilder**(`options?`): `PathBuilder`

#### Parameters

##### options?

[`PathBuilderOptions`](../interfaces/PathBuilderOptions.md)

#### Returns

`PathBuilder`

## Methods

### bezier()

> **bezier**(`tensionDeg?`, `samplesPerSegment?`): `this`

#### Parameters

##### tensionDeg?

`number`

##### samplesPerSegment?

`number`

#### Returns

`this`

***

### buildPositions()

> **buildPositions**(): `Cartesian3`[]

#### Returns

`Cartesian3`[]

***

### buildTrajectory()

> **buildTrajectory**(`start`, `stop`, `options?`): [`TrajectorySample`](TrajectorySample.md)

#### Parameters

##### start

`JulianDate`

##### stop

`JulianDate`

##### options?

[`BuildTrajectoryOptions`](../interfaces/BuildTrajectoryOptions.md)

#### Returns

[`TrajectorySample`](TrajectorySample.md)

***

### fromWaypoints()

> **fromWaypoints**(`positions`): `this`

#### Parameters

##### positions

`Cartesian3`[]

#### Returns

`this`

***

### geodesic()

> **geodesic**(): `this`

#### Returns

`this`

***

### linear()

> **linear**(): `this`

#### Returns

`this`

***

### setAltitudeProfile()

> **setAltitudeProfile**(`profile`): `this`

#### Parameters

##### profile

[`AltitudeProfile`](../interfaces/AltitudeProfile.md)

#### Returns

`this`

***

### setBezierTension()

> **setBezierTension**(`deg`): `this`

#### Parameters

##### deg

`number`

#### Returns

`this`

***

### setClosed()

> **setClosed**(`closed`): `this`

#### Parameters

##### closed

`boolean`

#### Returns

`this`

***

### setInterpolation()

> **setInterpolation**(`type`): `this`

#### Parameters

##### type

`"linear"` \| `"bezier"` \| `"geodesic"`

#### Returns

`this`

***

### setSamplesPerSegment()

> **setSamplesPerSegment**(`n`): `this`

#### Parameters

##### n

`number`

#### Returns

`this`
