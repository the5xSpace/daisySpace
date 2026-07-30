[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EntityPreviewHost

# Class: EntityPreviewHost

仅承载 Feature 的轻量 Entity 宿主。

## Implements

- [`PreviewHost`](../interfaces/PreviewHost.md)

## Constructors

### Constructor

> **new EntityPreviewHost**(`engine`, `entity`): `EntityPreviewHost`

#### Parameters

##### engine

[`Engine`](Engine.md)

##### entity

[`Entity`](Entity.md)

#### Returns

`EntityPreviewHost`

## Properties

### entity

> `readonly` **entity**: [`Entity`](Entity.md)

#### Implementation of

[`PreviewHost`](../interfaces/PreviewHost.md).[`entity`](../interfaces/PreviewHost.md#entity)

***

### kind

> `readonly` **kind**: `"entity"`

#### Implementation of

[`PreviewHost`](../interfaces/PreviewHost.md).[`kind`](../interfaces/PreviewHost.md#kind)

***

### object

> `readonly` **object**: `undefined` = `undefined`

#### Implementation of

[`PreviewHost`](../interfaces/PreviewHost.md).[`object`](../interfaces/PreviewHost.md#object)

## Accessors

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

> **mountComponent**\<`T`\>(`_component`): `T`

#### Type Parameters

##### T

`T` *extends* [`IComponent`](../interfaces/PW.IComponent.md)

#### Parameters

##### \_component

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
