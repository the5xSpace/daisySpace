[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TrajectorySample

# Class: TrajectorySample

Trajectory-point sampling and interpolation utility.

Internally, `SampledPositionProperty` stores time-dependent positions and provides:
- Real-time position queries after interpolation
- Velocity-direction and ENU rotation-matrix calculations
- Trajectory-range sampling and dynamic path callbacks

## Extended by

- [`TrajectorySampleBodyFixed`](TrajectorySampleBodyFixed.md)

## Constructors

### Constructor

> **new TrajectorySample**(`referenceFrame?`, `options?`): `TrajectorySample`

Trajectory-point sampling object (static)

#### Parameters

##### referenceFrame?

`ReferenceFrame` = `Daisy.ReferenceFrame.FIXED`

Reference frame; defaults to `ReferenceFrame.FIXED`

##### options?

[`TrajectorySampleOptions`](../interfaces/TrajectorySampleOptions.md)

#### Returns

`TrajectorySample`

## Properties

### endPos?

> `optional` **endPos?**: `Cartesian3`

***

### lastTime

> **lastTime**: `number`

***

### timeCache

> `static` **timeCache**: `TimeCache`\<`Matrix4`\>

## Methods

### endTime()

> **endTime**(): `JulianDate` \| `undefined`

Trajectory end time (the last sample).

#### Returns

`JulianDate` \| `undefined`

***

### evaluate()

> **evaluate**(`time`): `Cartesian3` \| `undefined`

Get the trajectory point at the specified time.

#### Parameters

##### time

`JulianDate`

Target time

#### Returns

`Cartesian3` \| `undefined`

***

### evaluateECEF()

> **evaluateECEF**(`time`, `result?`): `Cartesian3` \| `undefined`

Get the ECEF (Earth-fixed) coordinates at the specified time.

When the internal sampled property uses the `INERTIAL` reference frame, TEME/ICRF results are automatically converted to FIXED.

#### Parameters

##### time

`JulianDate`

Target time

##### result?

`Cartesian3`

Reusable result object (optional)

#### Returns

`Cartesian3` \| `undefined`

***

### evaluateEcefAtAbsSecondsInto()

> **evaluateEcefAtAbsSecondsInto**(`absSecondsList`, `out`, `valid?`): `void`

Get ECEF positions in batches using absolute seconds.

#### Parameters

##### absSecondsList

`ArrayLike`\<`number`\>

##### out

`Cartesian3`[]

##### valid?

`Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`void`

***

### evaluateInReferenceFrame()

> **evaluateInReferenceFrame**(`time`, `referenceFrame?`): `Cartesian3` \| `undefined`

Get the trajectory point at the specified time.

#### Parameters

##### time

`JulianDate`

Target time

##### referenceFrame?

`ReferenceFrame` = `Daisy.ReferenceFrame.FIXED`

Reference frame; defaults to `ReferenceFrame.FIXED`

#### Returns

`Cartesian3` \| `undefined`

***

### evaluateInReferenceFrameAtAbsSecondsGpu()

> **evaluateInReferenceFrameAtAbsSecondsGpu**(`absSecondsList`, `referenceFrame`, `out`, `valid?`): `Promise`\<`boolean`\>

Compute positions in batches with GPU Catmull-Rom interpolation (asynchronous).

Valid only when computeBackend=webgpu/auto and the GPU backend is ready;
otherwise it returns undefined, and callers should fall back to evaluateInReferenceFrameAtAbsSecondsInto.

Constraint: referenceFrame must match the trajectory referenceFrame (the GPU path does not perform frame conversion).

#### Parameters

##### absSecondsList

`ArrayLike`\<`number`\>

##### referenceFrame

`ReferenceFrame`

##### out

`Cartesian3`[]

##### valid?

`Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`Promise`\<`boolean`\>

***

### evaluateInReferenceFrameAtAbsSecondsInto()

> **evaluateInReferenceFrameAtAbsSecondsInto**(`absSecondsList`, `referenceFrame`, `out`, `valid?`): `void`

Get positions in the specified reference frame by absolute seconds (synchronous CPU path).

When the GPU backend is ready and the reference frames match, this delegates to evaluateInReferenceFrameAtAbsSecondsGpu
—but this method remains synchronous and obtains the GPU result asynchronously in a fire-and-forget manner. Callers that need to ensure GPU execution
should call evaluateInReferenceFrameAtAbsSecondsGpu directly and await it.

#### Parameters

##### absSecondsList

`ArrayLike`\<`number`\>

##### referenceFrame

`ReferenceFrame`

##### out

`Cartesian3`[]

##### valid?

`Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`void`

***

### evaluateInReferenceFrameInto()

> **evaluateInReferenceFrameInto**(`time`, `referenceFrame?`, `result`): `Cartesian3` \| `undefined`

Get the position in the specified reference frame and write it to result. Intended for object reuse on batch hot paths.

#### Parameters

##### time

`JulianDate`

##### referenceFrame?

`ReferenceFrame` = `Daisy.ReferenceFrame.FIXED`

##### result

`Cartesian3`

#### Returns

`Cartesian3` \| `undefined`

***

### evaluateOrientationGpu()

> **evaluateOrientationGpu**(`time`): `Promise`\<`Matrix4` \| `undefined`\>

#### Parameters

##### time

`JulianDate`

#### Returns

`Promise`\<`Matrix4` \| `undefined`\>

***

### getComputeBackend()

> **getComputeBackend**(): [`TrajectoryComputeBackendMode`](../types/TrajectoryComputeBackendMode.md)

#### Returns

[`TrajectoryComputeBackendMode`](../types/TrajectoryComputeBackendMode.md)

***

### getDuration()

> **getDuration**(): `number`

Get the total trajectory duration in seconds.

#### Returns

`number`

***

### getEnuRotation()

> **getEnuRotation**(`startPos`, `endPos`, `enuMatrix4`): `Matrix3`

Compute the ENU rotation matrix (3x3) from `startPos` toward `endPos`.

#### Parameters

##### startPos

`Cartesian3`

Start coordinate

##### endPos

`Cartesian3`

End coordinate

##### enuMatrix4

`Matrix4`

Matrix computed by `eastNorthUpToFixedFrame(startPos)`

#### Returns

`Matrix3`

***

### getInterpolationOptions()

> **getInterpolationOptions**(): `object`

#### Returns

`object`

##### interpolationAlgorithm

> **interpolationAlgorithm**: [`TrajectoryInterpolationAlgorithm`](../types/TrajectoryInterpolationAlgorithm.md)

##### interpolationDegree

> **interpolationDegree**: `number`

***

### getMatrix4()

> **getMatrix4**(`time`, `nextTime`, `startPos`): `Matrix4`

Compute the model matrix (4x4) of the object at `time`.

Usually used to align the model “toward the direction of motion”; the position at `nextTime` is used internally to estimate the forward direction.

#### Parameters

##### time

`JulianDate`

Current time

##### nextTime

`JulianDate`

Next time used to estimate the forward direction

##### startPos

`Cartesian3`

Position at the current time

#### Returns

`Matrix4`

***

### getOrientation()

> **getOrientation**(`time`): `Matrix4`

Get the ENU attitude matrix (4x4) at the specified time.

#### Parameters

##### time

`JulianDate`

Target time

#### Returns

`Matrix4`

***

### getOrientationMatrix4()

> **getOrientationMatrix4**(`time`, `startPos?`, `fallbackNextTime?`): `Matrix4`

Compute a continuous orientation matrix from the position sample sequence.

Unlike `getMatrix4(time, nextTime, startPos)`, this method does not depend on the render frame's
nextFrameTime. It uses positions at `time ± step` within the current sample interval for a central difference,
making the orientation an equivalent continuous sample derived from Daisy position samples.

#### Parameters

##### time

`JulianDate`

##### startPos?

`Cartesian3`

##### fallbackNextTime?

`JulianDate`

#### Returns

`Matrix4`

***

### getPackedSamples()

> **getPackedSamples**(): [`TrajectoryPackedSamples`](../interfaces/TrajectoryPackedSamples.md)

Get compact sample data suitable for GPU/Worker use.

#### Returns

[`TrajectoryPackedSamples`](../interfaces/TrajectoryPackedSamples.md)

***

### getPositionsProperty()

> **getPositionsProperty**(): `SampledPositionProperty`

Get the real-time position property.

#### Returns

`SampledPositionProperty`

***

### getReferenceFrame()

> **getReferenceFrame**(): `ReferenceFrame`

#### Returns

`ReferenceFrame`

***

### getSamplePositions()

> **getSamplePositions**(): `Cartesian3`[]

#### Returns

`Cartesian3`[]

***

### getSampleVersion()

> **getSampleVersion**(): `number`

#### Returns

`number`

***

### getTimes()

> **getTimes**(): `JulianDate`[]

#### Returns

`JulianDate`[]

***

### getVelocityOrientation()

> **getVelocityOrientation**(): `Property`

Get orientation-property samples for the entire trajectory.

#### Returns

`Property`

***

### inTheTimeRange()

> **inTheTimeRange**(`time`): `boolean`

Check whether time is within the [startTime, endTime] interval, including the boundaries.

#### Parameters

##### time

`JulianDate`

#### Returns

`boolean`

***

### pushData()

> **pushData**(`timeWithPositionArray`): `void`

Add trajectory points in batches.

#### Parameters

##### timeWithPositionArray

\{ `position`: `Cartesian3` \| `Cartographic`; `time`: `JulianDate`; \} \| `object`[]

Array of trajectory points or a single trajectory point

#### Returns

`void`

***

### removeSample()

> **removeSample**(`time`): `void`

Delete the trajectory point at the specified time.

#### Parameters

##### time

`JulianDate`

Target time

#### Returns

`void`

***

### removeSamples()

> **removeSamples**(`time`): `void`

Delete trajectory points in the specified time interval.

#### Parameters

##### time

`TimeInterval`

Target time interval

#### Returns

`void`

***

### resetTemporalState()

> **resetTemporalState**(): `void`

Reset temporary motion state across cycles.

#### Returns

`void`

***

### sampleRange()

> **sampleRange**(`start`, `end`, `stepSecond`): `Cartesian3`[]

Get trajectory points over a time interval.

#### Parameters

##### start

`JulianDate`

Start time

##### end

`JulianDate`

End time

##### stepSecond

`number`

Sampling step in seconds

#### Returns

`Cartesian3`[]

***

### setComputeBackend()

> **setComputeBackend**(`mode`): `this`

#### Parameters

##### mode

[`TrajectoryComputeBackendMode`](../types/TrajectoryComputeBackendMode.md)

#### Returns

`this`

***

### setInterpolationOptions()

> **setInterpolationOptions**(`options?`): `this`

#### Parameters

##### options?

`Pick`\<[`TrajectorySampleOptions`](../interfaces/TrajectorySampleOptions.md), `"interpolationAlgorithm"` \| `"interpolationDegree"`\>

#### Returns

`this`

***

### startTime()

> **startTime**(): `JulianDate` \| `undefined`

Trajectory start time (the first sample).

#### Returns

`JulianDate` \| `undefined`
