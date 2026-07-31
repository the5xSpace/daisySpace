[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / IFeature

# Interface: IFeature

Daisy Feature abstract capability interface.

Feature is used to mount renderable or interactive capabilities (such as models, points, lines, surfaces, UI overlays, etc.) on Daisy.Entity.

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

Whether the current Feature requires the Entity to precompute the model matrix each frame.

Features that only depend on entity position, such as points, labels, and images, can return false,
allowing large-scale target scenes to skip unnecessary attitude/matrix calculations.

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

Force update

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
