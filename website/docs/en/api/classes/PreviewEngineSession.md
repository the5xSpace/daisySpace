[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PreviewEngineSession

# Class: PreviewEngineSession

Single-target SDK preview session.

The session owns the complete lifecycle of the Engine, temporary host, and current target. It must not be written into the application Scenario.

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

Replaces the startup placeholder host with a complete Entity or BaseObject constructed by the caller.

The Session takes exclusive ownership of the instance lifecycle without clearing its existing Feature or Component instances.

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

`number` = `...`

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

Replaces the temporary host when the host type or physical object subtype changes.

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
