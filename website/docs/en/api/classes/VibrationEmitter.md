[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / VibrationEmitter

# Class: VibrationEmitter

Particle emitter interface.

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new VibrationEmitter**(`options?`): `VibrationEmitter`

#### Parameters

##### options?

###### amplitude?

`number`

###### axis?

[`ParticleEmitterAxis`](../types/ParticleEmitterAxis.md)

###### direction?

`Cartesian3`

###### phase?

`number`

###### phaseStep?

`number`

###### radius?

`number`

#### Returns

`VibrationEmitter`

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
