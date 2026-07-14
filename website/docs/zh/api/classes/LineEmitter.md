[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / LineEmitter

# Class: LineEmitter

粒子发射器接口。

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

发射一个粒子。

#### Parameters

##### particle

[`ParticleLike`](../interfaces/ParticleLike.md)

待初始化的粒子对象（需写入 position 和 velocity）。

#### Returns

`void`

#### Implementation of

[`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md).[`emit`](../interfaces/ParticleEmitterLike.md#emit)
