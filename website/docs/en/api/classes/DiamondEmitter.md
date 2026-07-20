[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DiamondEmitter

# Class: DiamondEmitter

Particle emitter interface.

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new DiamondEmitter**(`options?`): `DiamondEmitter`

#### Parameters

##### options?

###### direction?

`Cartesian3`

###### emitFrom?

[`ParticleEmitFrom`](../types/ParticleEmitFrom.md)

###### height?

`number`

###### rotation?

`number`

###### width?

`number`

#### Returns

`DiamondEmitter`

## Accessors

### height

#### Get Signature

> **get** **height**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **height**(`value`): `void`

##### Parameters

###### value

`number`

##### Returns

`void`

***

### width

#### Get Signature

> **get** **width**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **width**(`value`): `void`

##### Parameters

###### value

`number`

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
