[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / IFeature

# Interface: IFeature

Daisy Feature 抽象能力接口。

Feature 用于在 Daisy.Entity 上挂载可渲染或可交互的能力（如模型、点、线、面、UI 覆盖层等）。

## Properties

### includeInBoundingSphere

> **includeInBoundingSphere**: `boolean`

***

### isDestroyed

> `readonly` **isDestroyed**: `boolean`

***

### options

> **options**: `any`

***

### registered

> **registered**: `boolean`

***

### requiresEntityModelMatrix

> `readonly` **requiresEntityModelMatrix**: `boolean`

当前 Feature 是否需要 Entity 在每帧预先计算模型矩阵。

点、标签、广告牌这类只依赖实体位置的 Feature 可以返回 false，
从而让海量目标场景跳过不必要的姿态/矩阵计算。

***

### transformer

> **transformer**: `Transformer` \| `undefined`

***

### type

> `readonly` **type**: `string`

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

##### Returns

`string`

#### Set Signature

> **set** **id**(`value`): `void`

##### Parameters

###### value

`string`

##### Returns

`void`

***

### name

#### Get Signature

> **get** **name**(): `string`

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

##### Parameters

###### value

`string`

##### Returns

`void`

***

### useLod

#### Get Signature

> **get** **useLod**(): `boolean`

##### Returns

`boolean`

#### Set Signature

> **set** **useLod**(`value`): `void`

##### Parameters

###### value

`boolean`

##### Returns

`void`

## Methods

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### forceFlush()

> **forceFlush**(): `void`

强制更新

#### Returns

`void`

***

### getBoundingSphere()?

> `optional` **getBoundingSphere**(`time?`): `BoundingSphere` \| `undefined`

#### Parameters

##### time?

`JulianDate`

#### Returns

`BoundingSphere` \| `undefined`

***

### hiddenLodIt()

> **hiddenLodIt**(): `void`

#### Returns

`void`

***

### morphSwitchHandle()

> **morphSwitchHandle**(`mode`): `void`

#### Parameters

##### mode

`SceneMode`

#### Returns

`void`

***

### onAfterRegister()

> **onAfterRegister**(`callback`): `void`

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onBeforeDestroy()

> **onBeforeDestroy**(`callback`): `void`

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onBeforeRegister()

> **onBeforeRegister**(`callback`): `void`

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onBeforeUpdate()

> **onBeforeUpdate**(`callback`): `void`

#### Parameters

##### callback

(`spaceObject`, `time`) => `void`

#### Returns

`void`

***

### onDestroy()

> **onDestroy**(`callback`): `void`

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onRegister()

> **onRegister**(`callback`): `void`

#### Parameters

##### callback

(`spaceObject`) => `void`

#### Returns

`void`

***

### onUpdate()

> **onUpdate**(`callback`): `void`

#### Parameters

##### callback

(`spaceObject`, `time`) => `void`

#### Returns

`void`

***

### preUpdate()

> **preUpdate**(`entity`, `time`): `void`

#### Parameters

##### entity

`any`

##### time

`JulianDate`

#### Returns

`void`

***

### reCreate()

> **reCreate**(`spaceObject`): `void`

#### Parameters

##### spaceObject

[`Entity`](../classes/Entity.md)

#### Returns

`void`

***

### register()

> **register**(`entity`): `IFeature`

#### Parameters

##### entity

[`Entity`](../classes/Entity.md)

#### Returns

`IFeature`

***

### setIncludeInBoundingSphere()

> **setIncludeInBoundingSphere**(`value`): `this`

#### Parameters

##### value

`boolean`

#### Returns

`this`

***

### showLodIt()

> **showLodIt**(): `void`

#### Returns

`void`

***

### unregister()

> **unregister**(): `void`

#### Returns

`void`

***

### update()

> **update**(`spaceObject`, `time`): `void`

#### Parameters

##### spaceObject

[`Entity`](../classes/Entity.md)

##### time

`JulianDate`

#### Returns

`void`

***

### updateByInteraction()?

> `optional` **updateByInteraction**(`interaction`, `entity`): `void`

#### Parameters

##### interaction

`InteractionComponent`

##### entity

[`Entity`](../classes/Entity.md)

#### Returns

`void`
