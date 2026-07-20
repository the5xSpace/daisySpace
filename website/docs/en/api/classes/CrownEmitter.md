[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CrownEmitter

# Class: CrownEmitter

Particle emitter interface.

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new CrownEmitter**(`radius?`, `height?`): `CrownEmitter`

#### Parameters

##### radius?

`number` = `1.0`

##### height?

`number` = `0.2`

#### Returns

`CrownEmitter`

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

### radius

#### Get Signature

> **get** **radius**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **radius**(`value`): `void`

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
