[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BoxShapeEmitter

# Class: BoxShapeEmitter

粒子发射器接口。

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

发射一个粒子。

#### Parameters

##### particle

[`ParticleLike`](../interfaces/ParticleLike.md)

待初始化的粒子对象（需写入 position 和 velocity）。

#### Returns

`void`

#### Implementation of

[`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md).[`emit`](../interfaces/ParticleEmitterLike.md#emit)
