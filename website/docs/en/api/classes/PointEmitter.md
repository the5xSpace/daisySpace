[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PointEmitter

# Class: PointEmitter

Particle emitter interface.

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new PointEmitter**(`direction?`): `PointEmitter`

#### Parameters

##### direction?

`Cartesian3`

#### Returns

`PointEmitter`

## Accessors

### direction

#### Get Signature

> **get** **direction**(): `Cartesian3`

##### Returns

`Cartesian3`

#### Set Signature

> **set** **direction**(`value`): `void`

##### Parameters

###### value

`Cartesian3`

##### Returns

`void`

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
