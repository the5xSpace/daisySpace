[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SpiralEmitter

# Class: SpiralEmitter

Particle emitter interface.

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new SpiralEmitter**(`radius?`, `height?`, `turns?`): `SpiralEmitter`

#### Parameters

##### radius?

`number` = `1.0`

##### height?

`number` = `1.0`

##### turns?

`number` = `2.0`

#### Returns

`SpiralEmitter`

## Methods

### emit()

> **emit**(`particle`): `void`

Emit a single particle.

#### Parameters

##### particle

[`ParticleLike`](../interfaces/ParticleLike.md)

The particle object to initialize (must write position and velocity).

#### Returns

`void`

#### Implementation of

[`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md).[`emit`](../interfaces/ParticleEmitterLike.md#emit)
