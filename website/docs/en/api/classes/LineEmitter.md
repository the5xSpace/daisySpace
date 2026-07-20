[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / LineEmitter

# Class: LineEmitter

Particle emitter interface.

## Implements

- [`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md)

## Constructors

### Constructor

> **new LineEmitter**(`length?`, `axis?`, `direction?`): `LineEmitter`

#### Parameters

##### length?

`number` = `1.0`

##### axis?

`"x"` \| `"y"` \| `"z"`

##### direction?

`Cartesian3`

#### Returns

`LineEmitter`

## Accessors

### axis

#### Get Signature

> **get** **axis**(): `"x"` \| `"y"` \| `"z"`

##### Returns

`"x"` \| `"y"` \| `"z"`

#### Set Signature

> **set** **axis**(`value`): `void`

##### Parameters

###### value

`"x"` \| `"y"` \| `"z"`

##### Returns

`void`

***

### length

#### Get Signature

> **get** **length**(): `number`

##### Returns

`number`

#### Set Signature

> **set** **length**(`value`): `void`

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
