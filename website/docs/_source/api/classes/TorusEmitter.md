[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TorusEmitter

# Class: TorusEmitter

粒子发射器接口。

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new TorusEmitter**(`majorRadius?`, `tubeRadius?`): `TorusEmitter`

#### Parameters

##### majorRadius?

`number` = `1.0`

##### tubeRadius?

`number` = `0.25`

#### Returns

`TorusEmitter`

## Accessors

### majorRadius

#### Get Signature

> **get** **majorRadius**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **majorRadius**(`value`): `void`

##### Parameters

###### value

`number`

##### Returns

`void`

***

### tubeRadius

#### Get Signature

> **get** **tubeRadius**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **tubeRadius**(`value`): `void`

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
