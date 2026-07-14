[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CrownEmitter

# Class: CrownEmitter

粒子发射器接口。

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

发射一个粒子。

#### Parameters

##### particle

[`ParticleLike`](../interfaces/ParticleLike.md)

待初始化的粒子对象（需写入 position 和 velocity）。

#### Returns

`void`

#### Implementation of

[`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md).[`emit`](../interfaces/ParticleEmitterLike.md#emit)
