[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / HemisphereEmitter

# Class: HemisphereEmitter

粒子发射器接口。

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new HemisphereEmitter**(`radius?`, `direction?`): `HemisphereEmitter`

#### Parameters

##### radius?

`number` = `1.0`

##### direction?

`Cartesian3`

#### Returns

`HemisphereEmitter`

## Accessors

### radius

#### Get Signature

> **get** **radius**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **radius**(`value`): `void`

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
