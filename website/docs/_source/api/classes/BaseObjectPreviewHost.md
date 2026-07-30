[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BaseObjectPreviewHost

# Class: BaseObjectPreviewHost

承载 IComponent，并可通过内部 Entity 承载 Feature 的物理对象宿主。

## Implements

- [`PreviewHost`](../interfaces/PreviewHost.md)

## Constructors

### Constructor

> **new BaseObjectPreviewHost**(`engine`, `object`): `BaseObjectPreviewHost`

#### Parameters

##### engine

[`Engine`](Engine.md)

##### object

[`BaseObject`](PW.BaseObject.md)

#### Returns

`BaseObjectPreviewHost`

## Properties

### kind

> `readonly` **kind**: `"base-object"`

#### Implementation of

[`PreviewHost`](../interfaces/PreviewHost.md).[`kind`](../interfaces/PreviewHost.md#kind)

***

### object

> `readonly` **object**: [`BaseObject`](PW.BaseObject.md)

#### Implementation of

[`PreviewHost`](../interfaces/PreviewHost.md).[`object`](../interfaces/PreviewHost.md#object)

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md)

##### Returns

[`Entity`](Entity.md)

#### Implementation of

[`PreviewHost`](../interfaces/PreviewHost.md).[`entity`](../interfaces/PreviewHost.md#entity)

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

##### Returns

`boolean`

#### Implementation of

[`PreviewHost`](../interfaces/PreviewHost.md).[`isDestroyed`](../interfaces/PreviewHost.md#isdestroyed)

## Methods

### clear()

> **clear**(): `void`

#### Returns

`void`

#### Implementation of

[`PreviewHost`](../interfaces/PreviewHost.md).[`clear`](../interfaces/PreviewHost.md#clear)

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

#### Implementation of

[`PreviewHost`](../interfaces/PreviewHost.md).[`destroy`](../interfaces/PreviewHost.md#destroy)

***

### mountComponent()

> **mountComponent**\<`T`\>(`component`): `T`

#### Type Parameters

##### T

`T` *extends* [`IComponent`](../interfaces/PW.IComponent.md)

#### Parameters

##### component

`T`

#### Returns

`T`

#### Implementation of

[`PreviewHost`](../interfaces/PreviewHost.md).[`mountComponent`](../interfaces/PreviewHost.md#mountcomponent)

***

### mountFeature()

> **mountFeature**\<`T`\>(`feature`): `T`

#### Type Parameters

##### T

`T` *extends* [`Feature`](Feature.md)

#### Parameters

##### feature

`T`

#### Returns

`T`

#### Implementation of

[`PreviewHost`](../interfaces/PreviewHost.md).[`mountFeature`](../interfaces/PreviewHost.md#mountfeature)
