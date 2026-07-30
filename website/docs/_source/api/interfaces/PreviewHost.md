[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PreviewHost

# Interface: PreviewHost

PreviewEngineSession 使用的临时宿主公共接口。

## Properties

### entity

> `readonly` **entity**: [`Entity`](../classes/Entity.md)

***

### isDestroyed

> `readonly` **isDestroyed**: `boolean`

***

### kind

> `readonly` **kind**: [`PreviewHostKind`](../types/PreviewHostKind.md)

***

### object?

> `readonly` `optional` **object?**: [`BaseObject`](../classes/PW.BaseObject.md)

## Methods

### clear()

> **clear**(): `void`

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

#### Returns

`void`

***

### mountComponent()

> **mountComponent**\<`T`\>(`component`): `T`

#### Type Parameters

##### T

`T` *extends* [`IComponent`](PW.IComponent.md)

#### Parameters

##### component

`T`

#### Returns

`T`

***

### mountFeature()

> **mountFeature**\<`T`\>(`feature`): `T`

#### Type Parameters

##### T

`T` *extends* [`Feature`](../classes/Feature.md)

#### Parameters

##### feature

`T`

#### Returns

`T`
