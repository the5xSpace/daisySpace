[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Constellation

# Class: Constellation

## Constructors

### Constructor

> **new Constellation**(): `Constellation`

#### Returns

`Constellation`

### Constructor

> **new Constellation**(`topology`): `Constellation`

#### Parameters

##### topology

[`ConstellationTopology`](../types/PW.ConstellationTopology.md)

#### Returns

`Constellation`

### Constructor

> **new Constellation**(`options`): `Constellation`

#### Parameters

##### options

[`ConstellationConfig`](../types/ConstellationConfig.md)

#### Returns

`Constellation`

## Accessors

### allPositions

#### Get Signature

> **get** **allPositions**(): [`TrajectorySample`](TrajectorySample.md)[]

##### Returns

[`TrajectorySample`](TrajectorySample.md)[]

***

### allSensors

#### Get Signature

> **get** **allSensors**(): [`Sensor`](PW.Sensor.md)[]

##### Returns

[`Sensor`](PW.Sensor.md)[]

***

### allTles

#### Get Signature

> **get** **allTles**(): [`Spg4Tle`](Spg4Tle.md)[]

##### Returns

[`Spg4Tle`](Spg4Tle.md)[]

***

### options

#### Get Signature

> **get** **options**(): [`ConstellationConfig`](../types/ConstellationConfig.md)

只读的构造配置快照；卫星集合和聚合结果不属于此配置。

##### Returns

[`ConstellationConfig`](../types/ConstellationConfig.md)

***

### satelliteCount

#### Get Signature

> **get** **satelliteCount**(): `number`

##### Returns

`number`

***

### topology

#### Get Signature

> **get** **topology**(): [`WalkerTopology`](../types/WalkerTopology.md) \| `undefined`

##### Returns

[`WalkerTopology`](../types/WalkerTopology.md) \| `undefined`

***

### topologyConfig

#### Get Signature

> **get** **topologyConfig**(): [`ConstellationTopology`](../types/PW.ConstellationTopology.md) \| `undefined`

读取完整 topology 配置；`topology` 保持原有 WalkerTopology API。

##### Returns

[`ConstellationTopology`](../types/PW.ConstellationTopology.md) \| `undefined`

## Methods

### addCleanup()

> **addCleanup**(`fn`): `void`

#### Parameters

##### fn

() => `void`

#### Returns

`void`

***

### addSatellite()

> **addSatellite**(`sat`): `void`

#### Parameters

##### sat

[`Satellite`](PW.Satellite.md)

#### Returns

`void`

***

### bindEngine()

> **bindEngine**(`engine`): `void`

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### filter()

> **filter**(`fn`): [`Satellite`](PW.Satellite.md)[]

#### Parameters

##### fn

(`sat`) => `boolean`

#### Returns

[`Satellite`](PW.Satellite.md)[]

***

### forEach()

> **forEach**(`fn`): `void`

#### Parameters

##### fn

(`sat`, `index`) => `void`

#### Returns

`void`

***

### getSatelliteByName()

> **getSatelliteByName**(`name`): [`Satellite`](PW.Satellite.md) \| `undefined`

#### Parameters

##### name

`string`

#### Returns

[`Satellite`](PW.Satellite.md) \| `undefined`

***

### getSatellites()

> **getSatellites**(): readonly [`Satellite`](PW.Satellite.md)[]

#### Returns

readonly [`Satellite`](PW.Satellite.md)[]

***

### map()

> **map**\<`T`\>(`fn`): `T`[]

#### Type Parameters

##### T

`T`

#### Parameters

##### fn

(`sat`, `index`) => `T`

#### Returns

`T`[]

***

### removeSatellite()

> **removeSatellite**(`sat`): `void`

#### Parameters

##### sat

[`Satellite`](PW.Satellite.md)

#### Returns

`void`

***

### setOptions()

> **setOptions**(`config`): `void`

更新构造配置。省略字段保持不变，显式传入 undefined 可清除对应字段。

#### Parameters

##### config

`Partial`\<[`ConstellationConfig`](../types/ConstellationConfig.md)\>

#### Returns

`void`

***

### setTopology()

> **setTopology**(`topology?`): `void`

兼容/便捷设置 topology 的入口。

#### Parameters

##### topology?

[`ConstellationTopology`](../types/PW.ConstellationTopology.md)

#### Returns

`void`
