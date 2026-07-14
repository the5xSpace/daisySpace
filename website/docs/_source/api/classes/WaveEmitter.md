[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / WaveEmitter

# Class: WaveEmitter

粒子发射器接口。

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new WaveEmitter**(`options?`): `WaveEmitter`

#### Parameters

##### options?

###### amplitude?

`number`

###### direction?

`Cartesian3`

###### frequency?

`number`

###### length?

`number`

###### phase?

`number`

###### phaseStep?

`number`

###### width?

`number`

#### Returns

`WaveEmitter`

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
