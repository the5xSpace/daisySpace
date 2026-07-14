[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / OrbitEmitter

# Class: OrbitEmitter

粒子发射器接口。

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new OrbitEmitter**(`options?`): `OrbitEmitter`

#### Parameters

##### options?

###### clockwise?

`boolean`

###### direction?

`Cartesian3`

###### height?

`number`

###### phase?

`number`

###### phaseStep?

`number`

###### radius?

`number`

#### Returns

`OrbitEmitter`

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
