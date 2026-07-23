[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / FreeObject

# Class: FreeObject

FreeObject: a general-purpose physical semantic object that can attach a set of common Features.

- Earth body: uses Entity
- Non-Earth body: uses CelestialEntity (supports celestial offsets and rotation)

## Example

```ts
const obj = new FreeObject({
 name: "Obj-1",
 model: { url: "/models/ChandraXrayObservatory.glb", minimumPixelSize: 40 },
 label: { text: "Obj-1" },
});
obj.position = Daisy.Cartesian3.fromDegrees(116.39, 39.9, 1000);
obj.bindViewer(viewer);
```

## Extends

- [`BaseObject`](PW.BaseObject.md)

## Extended by

- [`Vehicle`](PW.Vehicle.md)

## Constructors

### Constructor

> **new FreeObject**(`options?`, `celestialEllipsoid?`): `FreeObject`

Create a FreeObject.

#### Parameters

##### options?

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

FreeObject configuration

##### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

Owning celestial body (Earth by default)

#### Returns

`FreeObject`

#### Overrides

`BaseObject.constructor`

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`_celestialEllipsoid`](PW.BaseObject.md#_celestialellipsoid)

***

### \_entity

> **\_entity**: [`Entity`](Entity.md) \| `CelestialEntity`

#### Overrides

[`BaseObject`](PW.BaseObject.md).[`_entity`](PW.BaseObject.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`isDestroyed`](PW.BaseObject.md#isdestroyed)

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

Get the host Entity, used for attaching Features, interaction events, updates, and more.

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`entity`](PW.BaseObject.md#entity)

***

### options

#### Get Signature

> **get** **options**(): [`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

Original snapshot of object creation/configuration parameters; subclasses may extend its structure.

Note: This is the source of the “semantic configuration”, not the rendered result. Rendering is completed by _applyConfig + Feature/Component.

##### Returns

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

#### Overrides

[`BaseObject`](PW.BaseObject.md).[`options`](PW.BaseObject.md#options)

***

### position

#### Get Signature

> **get** **position**(): [`ObjectPositon`](../types/PW.ObjectPositon.md)

##### Returns

[`ObjectPositon`](../types/PW.ObjectPositon.md)

#### Set Signature

> **set** **position**(`value`): `void`

Set the object position (supports static coordinates or sampled trajectories).

- The value is also written to the host entity.position
- CelestialEntity objects (non-Earth bodies) do not support TrajectorySample values using an inertial frame

##### Example

```ts
vehicle.position = Daisy.Cartesian3.fromDegrees(121.5, 31.2, 30);
```

##### Parameters

###### value

[`ObjectPositon`](../types/PW.ObjectPositon.md)

##### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`position`](PW.BaseObject.md#position)

## Methods

### addComponent()

> **addComponent**\<`T`\>(`component`): `T`

Attach a PhysicalWorld component to the current object.

Note: Features should still be attached through Entity.addFeature(); this method is intended only for IComponent.

#### Type Parameters

##### T

`T` *extends* [`IComponent`](../interfaces/PW.IComponent.md)

#### Parameters

##### component

`T`

Component instance

#### Returns

`T`

#### Example

```ts
obj.addComponent(new Sensor({ range: 100000 }));
```

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`addComponent`](PW.BaseObject.md#addcomponent)

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`addLink`](PW.BaseObject.md#addlink)

***

### addSensor()

> **addSensor**(`options?`): [`Sensor`](PW.Sensor.md)

Add a physical sensor component (general implementation).

Design goals:
- Centralize the basic “add sensor” capability in FreeObject to support more physical-object categories
- Let subclasses provide only the semantic difference in their “default mounting direction”

#### Parameters

##### options?

[`SensorOptions`](../types/PW.SensorOptions.md) = `{}`

#### Returns

[`Sensor`](PW.Sensor.md)

#### Example

```ts
import * as Daisy from "daisy-space-sdk";

const obj = new Daisy.PW.FreeObject({ name: "Obj-1" });
obj.bindViewer(viewer);

// 默认 TO_UP
obj.addSensor({ apertureDeg: 10, beamLength: 80_000 });

// 覆盖安装方向
obj.addSensor({ emitDirection: Daisy.EmitDirection.TO_FRONT, apertureDeg: 6, beamLength: 60_000 });
```

***

### bindEngine()

> **bindEngine**(`engine`): `void`

Bind to Engine and complete registration.

- If Engine does not contain an entity with the same id, addEntity is called automatically
- register() is then triggered

#### Parameters

##### engine

[`Engine`](Engine.md)

Daisy Engine

#### Returns

`void`

#### Example

```ts
obj.bindEngine(engine);
```

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`bindEngine`](PW.BaseObject.md#bindengine)

***

### destroy()

> **destroy**(): `void`

Destroy the object (remove interaction listeners, destroy components, destroy the host entity, and release the event manager).

#### Returns

`void`

#### Example

```ts
obj.destroy();
```

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`destroy`](PW.BaseObject.md#destroy)

***

### getComponentById()

> **getComponentById**(`id?`): [`Component`](../types/PW.Component.md)[]

Get components by id. The id is theoretically globally unique, but an array is returned for compatibility with legacy logic.

#### Parameters

##### id?

`string`

Component id

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getComponentById`](PW.BaseObject.md#getcomponentbyid)

***

### getComponentByName()

> **getComponentByName**(`name?`): [`Component`](../types/PW.Component.md)[]

Get components by name.

#### Parameters

##### name?

`string`

Component name (component.name)

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getComponentByName`](PW.BaseObject.md#getcomponentbyname)

***

### getComponents()

> **getComponents**(`type?`): [`Component`](../types/PW.Component.md)[]

Get the component list.

#### Parameters

##### type?

`string`

Component type (corresponding to component.type); omit it to return all components.

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getComponents`](PW.BaseObject.md#getcomponents)

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

Get the local attitude at the current simulation time.

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getCurrentOrientation`](PW.BaseObject.md#getcurrentorientation)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

Get the world position at the current simulation time.

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getCurrentPosition`](PW.BaseObject.md#getcurrentposition)

***

### getOrientationAtTime()

> **getOrientationAtTime**(`timestamp`): [`Rotation`](../types/Rotation.md)

Get the local attitude at the specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getOrientationAtTime`](PW.BaseObject.md#getorientationattime)

***

### getPosition()

> **getPosition**(`time`): `Cartesian3` \| `undefined`

Get the position at the specified time (delegates to the host entity.getPosition).

#### Parameters

##### time

`JulianDate`

Simulation time

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getPosition`](PW.BaseObject.md#getposition)

***

### getPositionAtTime()

> **getPositionAtTime**(`timestamp`): `Cartesian3` \| `undefined`

Get the world position at the specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getPositionAtTime`](PW.BaseObject.md#getpositionattime)

***

### getTransformAtTime()

> **getTransformAtTime**(`timestamp`): `BaseObjectResolvedTransform`

Get the local attitude at the specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`BaseObjectResolvedTransform`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getTransformAtTime`](PW.BaseObject.md#gettransformattime)

***

### getTransformMatrixAtTime()

> **getTransformMatrixAtTime**(`timestamp`): `Matrix4`

Get the local transform matrix at the specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`Matrix4`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getTransformMatrixAtTime`](PW.BaseObject.md#gettransformmatrixattime)

***

### register()

> **register**(): `void`

Register the host entity with the Daisy pipeline (triggers entity.reRegisterAll).

#### Returns

`void`

#### Example

```ts
obj.register();
```

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`register`](PW.BaseObject.md#register)

***

### removeComponentById()

> **removeComponentById**(`id`): `void`

Remove components by id (calls destroy first).

#### Parameters

##### id

`string`

Component id

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`removeComponentById`](PW.BaseObject.md#removecomponentbyid)

***

### removeComponentByName()

> **removeComponentByName**(`name`): `void`

Remove components by name (calls destroy first).

#### Parameters

##### name

`string`

Component name

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`removeComponentByName`](PW.BaseObject.md#removecomponentbyname)

***

### resetTemporalState()

> **resetTemporalState**(`time?`): `void`

Reset runtime state across frames and time loops.

Engine calls this method when it detects that simulation time moved backward. It does not destroy business configuration; it only clears
BaseObject time-value caches and forwards the reset to attached components.

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`resetTemporalState`](PW.BaseObject.md#resettemporalstate)

***

### setOptions()

> **setOptions**(`config`): `void`

Update configuration (rebuilds the corresponding Features according to policy).

#### Parameters

##### config

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

New configuration

#### Returns

`void`

#### Example

```ts
obj.setOptions({ label: { text: "Updated" } });
```

***

### unregister()

> **unregister**(): `void`

Unregister: remove all Features attached to the entity and notify components to unbind.

#### Returns

`void`

#### Example

```ts
obj.unregister();
```

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`unregister`](PW.BaseObject.md#unregister)

***

### update()

> **update**(`time`): `void`

Update every frame (drives entity.update and synchronously updates attached components).

#### Parameters

##### time

`JulianDate`

Simulation time

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`update`](PW.BaseObject.md#update)

## Events

### offClick()

> **offClick**(`handler?`): `void`

Stop listening for object click events.
 click

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`offClick`](PW.BaseObject.md#offclick)

***

### offDblClick()

> **offDblClick**(`handler?`): `void`

Stop listening for object double-click events.
 dblclick

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`offDblClick`](PW.BaseObject.md#offdblclick)

***

### offMouseEnter()

> **offMouseEnter**(`handler?`): `void`

Stop listening for object mouse-enter events.
 mouseenter

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`offMouseEnter`](PW.BaseObject.md#offmouseenter)

***

### offMouseLeave()

> **offMouseLeave**(`handler?`): `void`

Stop listening for object mouse-leave events.
 mouseleave

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`offMouseLeave`](PW.BaseObject.md#offmouseleave)

***

### onBeforeDestroy()

> **onBeforeDestroy**(`callback`): `void`

Listen for the before-destroy event.
 BEFORE_DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onBeforeDestroy`](PW.BaseObject.md#onbeforedestroy)

***

### onBeforeRegister()

> **onBeforeRegister**(`callback`): `void`

Listen for the before-register event.
 BEFORE_REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onBeforeRegister`](PW.BaseObject.md#onbeforeregister)

***

### onBeforeUnregister()

> **onBeforeUnregister**(`callback`): `void`

Listen for the before-unregister event.
 BEFORE_UNREGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onBeforeUnregister`](PW.BaseObject.md#onbeforeunregister)

***

### onBeforeUpdate()

> **onBeforeUpdate**(`callback`): `void`

Listen for the before-update event.
 BEFORE_UPDATE

#### Parameters

##### callback

(`time`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onBeforeUpdate`](PW.BaseObject.md#onbeforeupdate)

***

### onClick()

> **onClick**(`handler`): `void`

Listen for object click events.
 click

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onClick`](PW.BaseObject.md#onclick)

***

### onDblClick()

> **onDblClick**(`handler`): `void`

Listen for object double-click events.
 dblclick

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onDblClick`](PW.BaseObject.md#ondblclick)

***

### onDestroy()

> **onDestroy**(`callback`): `void`

Listen for destroy events.
 DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onDestroy`](PW.BaseObject.md#ondestroy)

***

### onMouseEnter()

> **onMouseEnter**(`handler`): `void`

Listen for object mouse-enter events.
 mouseenter

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onMouseEnter`](PW.BaseObject.md#onmouseenter)

***

### onMouseLeave()

> **onMouseLeave**(`handler`): `void`

Listen for object mouse-leave events.
 mouseleave

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onMouseLeave`](PW.BaseObject.md#onmouseleave)

***

### onRegister()

> **onRegister**(`callback`): `void`

Listen for completed-register events.
 REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onRegister`](PW.BaseObject.md#onregister)

***

### onUnregister()

> **onUnregister**(`callback`): `void`

Listen for unregister events.
 UNREGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onUnregister`](PW.BaseObject.md#onunregister)

***

### onUpdate()

> **onUpdate**(`callback`): `void`

Listen for update events.
 UPDATE

#### Parameters

##### callback

(`time`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onUpdate`](PW.BaseObject.md#onupdate)
