[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CircleShapeEmitter

# Class: CircleShapeEmitter

Particle emitter interface.

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new CircleShapeEmitter**(`options?`): `CircleShapeEmitter`

#### Parameters

##### options?

###### arc?

`number`

###### direction?

`Cartesian3`

###### emitFrom?

[`ParticleEmitFrom`](../types/ParticleEmitFrom.md)

###### radius?

`number`

###### radiusThickness?

`number`

#### Returns

`CircleShapeEmitter`

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
