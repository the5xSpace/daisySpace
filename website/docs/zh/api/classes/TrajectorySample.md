[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TrajectorySample

# Class: TrajectorySample

轨迹点采样与插值工具。

内部使用 `SampledPositionProperty` 保存时序位置点，并提供：
- 插值后的实时位置查询
- 速度方向/ENU 旋转矩阵计算
- 轨迹范围采样、动态路径回调等能力

## Extended by

- [`TrajectorySampleBodyFixed`](TrajectorySampleBodyFixed.md)

## Constructors

### Constructor

> **new TrajectorySample**(`referenceFrame?`, `options?`): `TrajectorySample`

轨迹点采样对象（静态）

#### Parameters

##### referenceFrame?

`ReferenceFrame` = `Daisy.ReferenceFrame.FIXED`

参考系；默认 `ReferenceFrame.FIXED`

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

轨迹结束时刻（最后一个采样点）。

#### Returns

`JulianDate` \| `undefined`

***

### evaluate()

> **evaluate**(`time`): `Cartesian3` \| `undefined`

获取指定时间点的轨迹点

#### Parameters

##### time

`JulianDate`

目标时刻

#### Returns

`Cartesian3` \| `undefined`

***

### evaluateECEF()

> **evaluateECEF**(`time`, `result?`): `Cartesian3` \| `undefined`

获取指定时刻的 ECEF（地固系）坐标。

当内部采样属性为 `INERTIAL` 参考系时，会自动将 TEME/ICRF 结果转换到 FIXED。

#### Parameters

##### time

`JulianDate`

目标时刻

##### result?

`Cartesian3`

结果复用对象（可选）

#### Returns

`Cartesian3` \| `undefined`

***

### evaluateEcefAtAbsSecondsInto()

> **evaluateEcefAtAbsSecondsInto**(`absSecondsList`, `out`, `valid?`): `void`

批量按绝对秒取 ECEF 位置。

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

获取指定时间点的轨迹点

#### Parameters

##### time

`JulianDate`

目标时刻

##### referenceFrame?

`ReferenceFrame` = `Daisy.ReferenceFrame.FIXED`

参考系；默认 `ReferenceFrame.FIXED`

#### Returns

`Cartesian3` \| `undefined`

***

### evaluateInReferenceFrameAtAbsSecondsGpu()

> **evaluateInReferenceFrameAtAbsSecondsGpu**(`absSecondsList`, `referenceFrame`, `out`, `valid?`): `Promise`\<`boolean`\>

批量 GPU Catmull-Rom 插值求位置（异步）。

仅在 computeBackend=webgpu/auto 且 GPU 后端就绪时有效；
否则返回 undefined，调用方应降级到 evaluateInReferenceFrameAtAbsSecondsInto。

约束：referenceFrame 必须与 trajectory 的 referenceFrame 一致（GPU 不做系转换）。

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

批量按绝对秒取指定参考系位置（同步 CPU 路径）。

若 GPU 后端就绪且参考系匹配，委托给 evaluateInReferenceFrameAtAbsSecondsGpu
——但此处保持同步，GPU 结果通过 fire-and-forget 异步获取；调用方如需确保 GPU 执行，
应直接调用 evaluateInReferenceFrameAtAbsSecondsGpu 并 await。

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

获取指定参考系位置并写入 result。供批量热路径复用对象。

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

获取轨迹总时长（秒）。

#### Returns

`number`

***

### getEnuRotation()

> **getEnuRotation**(`startPos`, `endPos`, `enuMatrix4`): `Matrix3`

计算从 `startPos` 指向 `endPos` 的 ENU 旋转矩阵（3x3）。

#### Parameters

##### startPos

`Cartesian3`

起点坐标

##### endPos

`Cartesian3`

终点坐标

##### enuMatrix4

`Matrix4`

`eastNorthUpToFixedFrame(startPos)` 计算得到的矩阵

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

计算实体在 `time` 的模型矩阵（4x4）。

通常用于将模型“朝向运动方向”对齐：内部取 `nextTime` 的位置作为前向方向估计。

#### Parameters

##### time

`JulianDate`

当前时刻

##### nextTime

`JulianDate`

用于估计前向方向的下一时刻

##### startPos

`Cartesian3`

当前时刻的位置

#### Returns

`Matrix4`

***

### getOrientation()

> **getOrientation**(`time`): `Matrix4`

获取指定时刻的 ENU 姿态矩阵（4x4）。

#### Parameters

##### time

`JulianDate`

目标时刻

#### Returns

`Matrix4`

***

### getOrientationMatrix4()

> **getOrientationMatrix4**(`time`, `startPos?`, `fallbackNextTime?`): `Matrix4`

基于位置采样序列计算连续方向矩阵。

与 `getMatrix4(time, nextTime, startPos)` 不同，本方法不依赖渲染帧的
nextFrameTime，而是在当前采样区间内用 `time ± step` 的位置做中心差分，
让方向成为由 Daisy 位置采样派生出的对等连续采样。

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

获取 GPU/Worker 友好的紧凑采样数据。

#### Returns

[`TrajectoryPackedSamples`](../interfaces/TrajectoryPackedSamples.md)

***

### getPositionsProperty()

> **getPositionsProperty**(): `SampledPositionProperty`

获取实时位置属性

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

获取全程方向属性采样

#### Returns

`Property`

***

### inTheTimeRange()

> **inTheTimeRange**(`time`): `boolean`

判断 time 是否在 [startTime, endTime] 区间内（包含边界）

#### Parameters

##### time

`JulianDate`

#### Returns

`boolean`

***

### pushData()

> **pushData**(`timeWithPositionArray`): `void`

批量添加轨迹点

#### Parameters

##### timeWithPositionArray

\{ `position`: `Cartesian3` \| `Cartographic`; `time`: `JulianDate`; \} \| `object`[]

轨迹点数组或单个轨迹点

#### Returns

`void`

***

### removeSample()

> **removeSample**(`time`): `void`

删除指定时间点的轨迹点

#### Parameters

##### time

`JulianDate`

目标时刻

#### Returns

`void`

***

### removeSamples()

> **removeSamples**(`time`): `void`

删除指定时间段的轨迹点

#### Parameters

##### time

`TimeInterval`

目标时间段

#### Returns

`void`

***

### resetTemporalState()

> **resetTemporalState**(): `void`

重置跨周期的临时运动状态。

#### Returns

`void`

***

### sampleRange()

> **sampleRange**(`start`, `end`, `stepSecond`): `Cartesian3`[]

获取一段时间内的轨迹点

#### Parameters

##### start

`JulianDate`

起始时刻

##### end

`JulianDate`

结束时刻

##### stepSecond

`number`

采样步长（秒）

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

轨迹起始时刻（首个采样点）。

#### Returns

`JulianDate` \| `undefined`
