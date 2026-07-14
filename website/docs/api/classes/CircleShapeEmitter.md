[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CircleShapeEmitter

# Class: CircleShapeEmitter

粒子发射器接口。

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

发射一个粒子。

#### Parameters

##### particle

[`ParticleLike`](../interfaces/ParticleLike.md)

待初始化的粒子对象（需写入 position 和 velocity）。

#### Returns

`void`

#### Implementation of

[`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md).[`emit`](../interfaces/ParticleEmitterLike.md#emit)
