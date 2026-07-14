[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Constellation

# Class: Constellation

## Constructors

### Constructor

> **new Constellation**(`topology?`): `Constellation`

#### Parameters

##### topology?

[`WalkerTopology`](../types/WalkerTopology.md)

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
