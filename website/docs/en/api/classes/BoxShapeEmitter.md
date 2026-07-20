[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BoxShapeEmitter

# Class: BoxShapeEmitter

Particle emitter interface.

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new BoxShapeEmitter**(`options?`): `BoxShapeEmitter`

#### Parameters

##### options?

###### dimensions?

`Cartesian3`

###### direction?

`Cartesian3`

###### emitFrom?

[`ParticleEmitFrom`](../types/ParticleEmitFrom.md)

###### scale?

`Cartesian3`

#### Returns

`BoxShapeEmitter`

## Accessors

### dimensions

#### Get Signature

> **get** **dimensions**(): `Cartesian3`

##### Returns

`Cartesian3`

#### Set Signature

> **set** **dimensions**(`value`): `void`

##### Parameters

###### value

`Cartesian3`

##### Returns

`void`

***

### emitFrom

#### Get Signature

> **get** **emitFrom**(): `NormalizedParticleEmitFrom`

##### Returns

`NormalizedParticleEmitFrom`

#### Set Signature

> **set** **emitFrom**(`value`): `void`

##### Parameters

###### value

[`ParticleEmitFrom`](../types/ParticleEmitFrom.md)

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
