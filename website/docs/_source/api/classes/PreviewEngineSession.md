[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PreviewEngineSession

# Class: PreviewEngineSession

单目标 SDK 预览会话。

会话拥有 Engine、临时宿主和当前目标的完整生命周期，不应写入业务场景。

## Properties

### engine

> `readonly` **engine**: [`Engine`](Engine.md)

## Accessors

### bodyAxisVisible

#### Get Signature

> **get** **bodyAxisVisible**(): `boolean`

##### Returns

`boolean`

***

### host

#### Get Signature

> **get** **host**(): [`PreviewHost`](../interfaces/PreviewHost.md)

##### Returns

[`PreviewHost`](../interfaces/PreviewHost.md)

***

### hostKind

#### Get Signature

> **get** **hostKind**(): [`PreviewHostKind`](../types/PreviewHostKind.md)

##### Returns

[`PreviewHostKind`](../types/PreviewHostKind.md)

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

##### Returns

`boolean`

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

`T` *extends* [`IComponent`](../interfaces/PW.IComponent.md)

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

`T` *extends* [`Feature`](Feature.md)

#### Parameters

##### feature

`T`

#### Returns

`T`

***

### replaceHost()

> **replaceHost**(`host`): [`PreviewHost`](../interfaces/PreviewHost.md)

用调用方已构造的完整 Entity 或 BaseObject 替换启动占位宿主。

Session 接管该实例的独占生命周期，但不会清空它已有的 Feature 或 Component。

#### Parameters

##### host

[`Entity`](Entity.md) \| [`BaseObject`](PW.BaseObject.md)

#### Returns

[`PreviewHost`](../interfaces/PreviewHost.md)

***

### resetCamera()

> **resetCamera**(`range?`): `void`

#### Parameters

##### range?

`number`

#### Returns

`void`

***

### resize()

> **resize**(): `void`

#### Returns

`void`

***

### setAutoOrbit()

> **setAutoOrbit**(`value`): `void`

#### Parameters

##### value

`boolean`

#### Returns

`void`

***

### setBodyAxisVisible()

> **setBodyAxisVisible**(`value`): `void`

#### Parameters

##### value

`boolean`

#### Returns

`void`

***

### setHost()

> **setHost**(`spec`): [`PreviewHost`](../interfaces/PreviewHost.md)

宿主类型或物理对象子类型变化时替换临时宿主。

#### Parameters

##### spec

[`PreviewHostSpec`](../types/PreviewHostSpec.md)

#### Returns

[`PreviewHost`](../interfaces/PreviewHost.md)

***

### create()

> `static` **create**(`container`, `options?`): `Promise`\<`PreviewEngineSession`\>

#### Parameters

##### container

`string` \| `Viewer` \| `HTMLElement`

##### options?

[`PreviewEngineSessionOptions`](../interfaces/PreviewEngineSessionOptions.md) = `{}`

#### Returns

`Promise`\<`PreviewEngineSession`\>
