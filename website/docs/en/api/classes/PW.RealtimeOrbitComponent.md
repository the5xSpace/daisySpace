[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / RealtimeOrbitComponent

# Class: RealtimeOrbitComponent

Renders the instantaneous orbit at the current time.

Unlike the `path` trail, this component does not display a historical or future time window. It estimates the osculating orbit from the current position and velocity, then renders a complete closed ellipse in the orbital plane.

## Extends

- [`BaseComponent`](PW.BaseComponent.md)

## Constructors

### Constructor

> **new RealtimeOrbitComponent**(`options?`): `RealtimeOrbitComponent`

#### Parameters

##### options?

[`RealtimeOrbitComponentOptions`](../types/PW.RealtimeOrbitComponentOptions.md) = `{}`

#### Returns

`RealtimeOrbitComponent`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`constructor`](PW.BaseComponent.md#constructor)

## Properties

### transformer

> **transformer**: `Transformer` \| `undefined` = `undefined`

Component-level Transformer (optional).

Recommended for representing installation or physical-reference transforms instead of modifying Entity.transformer.

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`transformer`](PW.BaseComponent.md#transformer)

***

### type

> `readonly` **type**: `string` = `"RealtimeOrbitComponent"`

Component type identifier. Subclasses must override it.

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`type`](PW.BaseComponent.md#type)

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

Sets the component id (globally unique identifier).

- Usually generated automatically by BaseComponent.register()
- Can also be specified manually to align with an external system id

##### Returns

`string`

#### Set Signature

> **set** **id**(`value`): `void`

Sets the component id (globally unique identifier).

- Usually generated automatically by BaseComponent.register()
- Can also be specified manually to align with an external system id

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`id`](PW.BaseComponent.md#id)

***

### name

#### Get Signature

> **get** **name**(): `string`

Sets the component name for lookup and management by name.

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

Sets the component name for lookup and management by name.

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`name`](PW.BaseComponent.md#name)

***

### registered

#### Get Signature

> **get** **registered**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`registered`](PW.BaseComponent.md#registered)

## Methods

### destroy()

> **destroy**(): `void`

Destroys the component and its internal resources.

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`destroy`](PW.BaseComponent.md#destroy)

***

### getDebugAngles()

> **getDebugAngles**(`time?`): \{ `inclinationDeg`: `number`; `raanDeg`: `number`; \} \| `undefined`

Reads approximate orbital-element angles for external debugging.

#### Parameters

##### time?

`JulianDate`

#### Returns

\{ `inclinationDeg`: `number`; `raanDeg`: `number`; \} \| `undefined`

***

### getLatestElements()

> **getLatestElements**(): [`RealtimeOrbitElements`](../types/PW.RealtimeOrbitElements.md) \| `undefined`

#### Returns

[`RealtimeOrbitElements`](../types/PW.RealtimeOrbitElements.md) \| `undefined`

***

### getOptimalViewDistanceMeters()

> **getOptimalViewDistanceMeters**(): `number` \| `undefined`

#### Returns

`number` \| `undefined`

***

### register()

> **register**(`object`): `RealtimeOrbitComponent`

Registers the component with a physical object.

Subclasses typically create or bind an internal rendering adapter (Feature) or initialize resources here.

#### Parameters

##### object

`any`

#### Returns

`RealtimeOrbitComponent`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`register`](PW.BaseComponent.md#register)

***

### resetTemporalState()

> **resetTemporalState**(): `void`

Resets temporary state preserved across time cycles.

When simulation time moves backward or loops to its start, the host object calls this method so the component can clear cross-frame caches.

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`resetTemporalState`](PW.BaseComponent.md#resettemporalstate)

***

### unregister()

> **unregister**(): `void`

Unloads the component from the physical object without destroying the component instance, which can be used for temporary disabling.

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`unregister`](PW.BaseComponent.md#unregister)

***

### update()

> **update**(`spaceObject`, `time`): `void`

Updates every frame, driven by simulation time.

#### Parameters

##### spaceObject

[`Entity`](Entity.md)

##### time

`JulianDate`

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`update`](PW.BaseComponent.md#update)
