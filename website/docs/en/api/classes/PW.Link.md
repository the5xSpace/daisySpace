[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Link

# Class: Link

Manages link rendering and transmission effects between two objects.

The component combines target visibility, time schedules, and central-body occlusion results to determine whether to render the link at the current time.

## Example

```ts
sat.addLink({
 name: "Downlink-Sat",
 target: groundStation,
 show: downlinkWindows,
 direction: "reverse",
 speed: 1.0,
});
```

## Extends

- [`BaseComponent`](PW.BaseComponent.md)

## Constructors

### Constructor

> **new Link**(`options`): `Link`

Creates the link component; the link geometry is created only after registration with a physical object.

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

`Link`

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

> `readonly` **type**: `string` = `"Link"`

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

[`RouteComponent`](PW.RouteComponent.md).[`id`](PW.RouteComponent.md#id)

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

[`RouteComponent`](PW.RouteComponent.md).[`name`](PW.RouteComponent.md#name)

***

### options

#### Get Signature

> **get** **options**(): [`LinkOptions`](../types/PW.LinkOptions.md)

Gets the complete current configuration.

##### Returns

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Set Signature

> **set** **options**(`value`): `void`

Merges the link configuration and synchronizes existing link geometry.

##### Parameters

###### value

`Partial`\<[`LinkOptions`](../types/PW.LinkOptions.md)\>

##### Returns

`void`

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

Destroys the link component and its link geometry.

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`destroy`](PW.BaseComponent.md#destroy)

***

### getHostObject()

> **getHostObject**(): [`BaseObject`](PW.BaseObject.md) \| `undefined`

Gets the currently bound host object.

#### Returns

[`BaseObject`](PW.BaseObject.md) \| `undefined`

The physical object that owns the current link.

***

### register()

> **register**(`object`): `Link`

Registers with the host physical object and creates the link geometry.

#### Parameters

##### object

[`BaseObject`](PW.BaseObject.md)

#### Returns

`Link`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`register`](PW.BaseComponent.md#register)

***

### remove()

> **remove**(): `void`

Removes the link component from the host object and destroys its internal resources.

#### Returns

`void`

***

### resetTemporalState()

> **resetTemporalState**(`_time?`): `void`

Resets temporary state preserved across time cycles.

When simulation time moves backward or loops to its start, the host object calls this method so the component can clear cross-frame caches.

#### Parameters

##### \_time?

`JulianDate`

#### Returns

`void`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`resetTemporalState`](PW.BaseComponent.md#resettemporalstate)

***

### setShow()

> **setShow**(`show`): `void`

Updates the link display schedule.

#### Parameters

##### show

[`LinkSchedule`](../types/PW.LinkSchedule.md)

New display schedule.

#### Returns

`void`

***

### setTarget()

> **setTarget**(`target`): `void`

Updates the link target endpoint.

#### Parameters

##### target

[`LinkEndpoint`](../types/PW.LinkEndpoint.md)

New target object or position.

#### Returns

`void`

***

### unregister()

> **unregister**(): `void`

Unregisters the component and releases the link geometry.

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`unregister`](PW.BaseComponent.md#unregister)

***

### update()

> **update**(`_spaceObject`, `time`): `void`

Refreshes link visibility and geometry configuration for the current time.

The link geometry is rendered only when a target exists, both endpoints are visible, the display schedule matches, and the link is not occluded by a central body.

#### Parameters

##### \_spaceObject

`any`

Current host object; the link does not use this parameter directly.

##### time

`JulianDate`

Current simulation time.

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`update`](PW.BaseComponent.md#update)
