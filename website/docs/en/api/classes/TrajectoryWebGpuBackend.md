[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TrajectoryWebGpuBackend

# Class: TrajectoryWebGpuBackend

## Methods

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### evaluatePositions()

> **evaluatePositions**(`samples`, `queryTimesAbs`, `_options?`): `Promise`\<[`TrajectoryGpuEvaluateResult`](../interfaces/TrajectoryGpuEvaluateResult.md)\>

#### Parameters

##### samples

[`TrajectoryGpuSampleData`](../interfaces/TrajectoryGpuSampleData.md)

##### queryTimesAbs

`Float64Array`

##### \_options?

[`TrajectoryGpuEvaluateOptions`](../interfaces/TrajectoryGpuEvaluateOptions.md)

#### Returns

`Promise`\<[`TrajectoryGpuEvaluateResult`](../interfaces/TrajectoryGpuEvaluateResult.md)\>

***

### create()

> `static` **create**(): `Promise`\<`TrajectoryWebGpuBackend` \| `undefined`\>

#### Returns

`Promise`\<`TrajectoryWebGpuBackend` \| `undefined`\>

***

### isSupported()

> `static` **isSupported**(): `boolean`

#### Returns

`boolean`
