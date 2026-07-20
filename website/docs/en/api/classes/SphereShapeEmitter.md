[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SphereShapeEmitter

# Class: SphereShapeEmitter

Particle emitter interface.

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new SphereShapeEmitter**(`options?`): `SphereShapeEmitter`

#### Parameters

##### options?

###### arc?

`number`

###### emitFrom?

[`ParticleEmitFrom`](../types/ParticleEmitFrom.md)

###### radius?

`number`

###### radiusThickness?

`number`

#### Returns

`SphereShapeEmitter`

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
