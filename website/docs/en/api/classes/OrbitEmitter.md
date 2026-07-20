[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / OrbitEmitter

# Class: OrbitEmitter

Particle emitter interface.

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

Emit a single particle.

#### Parameters

##### particle

[`ParticleLike`](../interfaces/ParticleLike.md)

The particle object to initialize (must write position and velocity).

#### Returns

`void`

#### Implementation of

[`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md).[`emit`](../interfaces/ParticleEmitterLike.md#emit)
