[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TrajectoryGpuAttitudeBackend

# Class: TrajectoryGpuAttitudeBackend

## Methods

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### evaluateAttitudes()

> **evaluateAttitudes**(`samples`, `queryTimesAbs`): `Promise`\<[`TrajectoryGpuAttitudeResult`](../interfaces/TrajectoryGpuAttitudeResult.md)\>

#### Parameters

##### samples

[`TrajectoryGpuSampleData`](../interfaces/TrajectoryGpuSampleData.md)

##### queryTimesAbs

`Float64Array`

#### Returns

`Promise`\<[`TrajectoryGpuAttitudeResult`](../interfaces/TrajectoryGpuAttitudeResult.md)\>

***

### create()

> `static` **create**(): `Promise`\<`TrajectoryGpuAttitudeBackend` \| `undefined`\>

#### Returns

`Promise`\<`TrajectoryGpuAttitudeBackend` \| `undefined`\>

***

### isSupported()

> `static` **isSupported**(): `boolean`

#### Returns

`boolean`
