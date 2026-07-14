[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / RingEmitter

# Class: RingEmitter

粒子发射器接口。

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new RingEmitter**(`innerRadius?`, `outerRadius?`, `direction?`): `RingEmitter`

#### Parameters

##### innerRadius?

`number` = `0.5`

##### outerRadius?

`number` = `1.0`

##### direction?

`Cartesian3`

#### Returns

`RingEmitter`

## Accessors

### innerRadius

#### Get Signature

> **get** **innerRadius**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **innerRadius**(`value`): `void`

##### Parameters

###### value

`number`

##### Returns

`void`

***

### outerRadius

#### Get Signature

> **get** **outerRadius**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **outerRadius**(`value`): `void`

##### Parameters

###### value

`number`

##### Returns

`void`

## Methods

### emit()

> **emit**(`particle`): `void`

发射一个粒子。

#### Parameters

##### particle

[`ParticleLike`](../interfaces/ParticleLike.md)

待初始化的粒子对象（需写入 position 和 velocity）。

#### Returns

`void`

#### Implementation of

[`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md).[`emit`](../interfaces/ParticleEmitterLike.md#emit)
