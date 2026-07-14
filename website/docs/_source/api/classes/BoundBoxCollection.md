[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BoundBoxCollection

# Class: BoundBoxCollection

BoundBoxCollection 负责管理所有 BoundBoxFeature，并提供碰撞检测与事件分发能力。
- 只负责能力和事件分发，不主动调度。
- 由外部（如 engine）决定何时调用 triggerCollisionEvents。
- 可实现碰撞检测

## Constructors

### Constructor

> **new BoundBoxCollection**(): `BoundBoxCollection`

#### Returns

`BoundBoxCollection`

## Properties

### enableBroadPhase

> **enableBroadPhase**: `boolean` = `true`

OBB/SAT 前的保守外接球预检测。只能筛掉确定不碰撞的对象对。

***

### enableCollisionDetection

> **enableCollisionDetection**: `boolean` = `true`

碰撞检测开关

***

### ~~forceDisableObbLimit~~

> **forceDisableObbLimit**: `number` = `Number.POSITIVE_INFINITY`

#### Deprecated

OBB/SAT 作为准确性托底，不再按数量自动关闭。

***

### spatialHashThreshold

> **spatialHashThreshold**: `number` = `80`

对象数量达到该值后，使用空间分桶减少候选 pair。

***

### useObb

> **useObb**: `boolean` = `true`

OBB/SAT 最终精确检测开关。

#### Remarks

为保证碰撞检测准确性，当前实现始终使用 OBB/SAT 作为托底。
该字段保留用于兼容旧代码，设置为 false 不会关闭最终精检。

## Accessors

### collisionDetectionFrequencyHz

#### Get Signature

> **get** **collisionDetectionFrequencyHz**(): `number`

每秒碰撞检测次数。有效范围 1-10，超过 10 会按 10 处理。

##### Returns

`number`

#### Set Signature

> **set** **collisionDetectionFrequencyHz**(`value`): `void`

##### Parameters

###### value

`number`

##### Returns

`void`

***

### maxCollisionDetectionInterval

#### Get Signature

> **get** **maxCollisionDetectionInterval**(): `number`

兼容旧配置：检测间隔不会低于 100ms，避免超过 10Hz。

##### Returns

`number`

#### Set Signature

> **set** **maxCollisionDetectionInterval**(`value`): `void`

##### Parameters

###### value

`number`

##### Returns

`void`

## Methods

### addBox()

> **addBox**(`box`): `void`

添加 BoundBoxFeature 到集合

#### Parameters

##### box

[`BoundBoxFeature`](BoundBoxFeature.md)

#### Returns

`void`

***

### checkCollisions()

> **checkCollisions**(): `void`

检查所有盒子的两两碰撞，返回碰撞对列表

#### Returns

`void`

***

### clear()

> **clear**(): `void`

清空集合和事件

#### Returns

`void`

***

### clearCollisionStates()

> **clearCollisionStates**(): `void`

清空集合中所有包围盒的当前碰撞状态。

适用于批量启停、重建场景或压力测试切换数量时，避免旧 pair 状态污染下一轮检测。

#### Returns

`void`

***

### getStats()

> **getStats**(): [`BoundBoxCollisionStats`](../interfaces/BoundBoxCollisionStats.md)

#### Returns

[`BoundBoxCollisionStats`](../interfaces/BoundBoxCollisionStats.md)

***

### removeBox()

> **removeBox**(`box`): `void`

从集合移除 BoundBoxFeature

#### Parameters

##### box

[`BoundBoxFeature`](BoundBoxFeature.md)

#### Returns

`void`
