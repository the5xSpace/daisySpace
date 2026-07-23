[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / BaseObject

# Abstract Class: BaseObject

PhysicalWorld base object (semantic object).

Role:
- Publicly, organize capabilities by "physical semantics", such as Vehicle and Moon.
- Internally, hold a Daisy.Entity/CelestialEntity as the rendering and interaction host.
- Lifecycle: bindEngine -> register -> update* -> unregister/destroy

Design constraints:
- Features are still attached and managed through Entity.addFeature().
- Components (IComponent) carry higher-level physical semantic capabilities, such as Sensor, and may drive Features internally.

## Extended by

- [`FreeObject`](PW.FreeObject.md)
- [`CelestialBody`](PW.CelestialBody.md)

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

***

### \_entity

> `abstract` **\_entity**: [`Entity`](Entity.md) \| `CelestialEntity`

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

Get the host Entity, used for attaching Features, interaction events, updates, and more.

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

***

### options

#### Get Signature

> **get** **options**(): `any`

The original snapshot of the object creation and configuration parameters. Different subclasses may extend its structure.

Note: this is the source of the semantic configuration, not the rendered result. Rendering is applied by _applyConfig together with Features and Components.

##### Returns

`any`

***

### position

#### Get Signature

> **get** **position**(): [`ObjectPositon`](../types/PW.ObjectPositon.md)

##### Returns

[`ObjectPositon`](../types/PW.ObjectPositon.md)

#### Set Signature

> **set** **position**(`value`): `void`

Set the object position, supporting static coordinates or sampled trajectories.

- The value is synchronized to the host entity.position after assignment.
- For a CelestialEntity (a non-Earth celestial body), TrajectorySample values that use an inertial frame are not supported.

##### Example

```ts
vehicle.position = Daisy.Cartesian3.fromDegrees(121.5, 31.2, 30);
```

##### Parameters

###### value

[`ObjectPositon`](../types/PW.ObjectPositon.md)

##### Returns

`void`

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

Component instance.

#### Returns

`T`

#### Example

```ts
obj.addComponent(new Sensor({ range: 100000 }));
```

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

***

### bindEngine()

> **bindEngine**(`engine`): `void`

Bind to the Engine and complete registration.

- If the Engine does not contain an entity with the same ID, addEntity is called automatically.
- register() is then triggered.

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

***

### destroy()

> **destroy**(): `void`

Destroy the object by removing interaction listeners, destroying components, destroying the host entity, and releasing the event manager.

#### Returns

`void`

#### Example

```ts
obj.destroy();
```

***

### getComponentById()

> **getComponentById**(`id?`): [`Component`](../types/PW.Component.md)[]

Get components by ID. The ID is theoretically globally unique, but an array is returned for compatibility with legacy logic.

#### Parameters

##### id?

`string`

Component ID.

#### Returns

[`Component`](../types/PW.Component.md)[]

***

### getComponentByName()

> **getComponentByName**(`name?`): [`Component`](../types/PW.Component.md)[]

Get components by name.

#### Parameters

##### name?

`string`

Component name (component.name).

#### Returns

[`Component`](../types/PW.Component.md)[]

***

### getComponents()

> **getComponents**(`type?`): [`Component`](../types/PW.Component.md)[]

Get the component list.

#### Parameters

##### type?

`string`

Component type, corresponding to component.type; omit it to return all components.

#### Returns

[`Component`](../types/PW.Component.md)[]

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

Get the local orientation at the current simulation time.

#### Returns

[`Rotation`](../types/Rotation.md)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

Get the world position at the current simulation time.

#### Returns

`Cartesian3` \| `undefined`

***

### getOrientationAtTime()

> **getOrientationAtTime**(`timestamp`): [`Rotation`](../types/Rotation.md)

Get the local orientation at the specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

[`Rotation`](../types/Rotation.md)

***

### getPosition()

> **getPosition**(`time`): `Cartesian3` \| `undefined`

Get the position at the specified time by delegating to the host entity.getPosition.

#### Parameters

##### time

`JulianDate`

Simulation time.

#### Returns

`Cartesian3` \| `undefined`

***

### getPositionAtTime()

> **getPositionAtTime**(`timestamp`): `Cartesian3` \| `undefined`

Get the world position at the specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`Cartesian3` \| `undefined`

***

### getTransformAtTime()

> **getTransformAtTime**(`timestamp`): `BaseObjectResolvedTransform`

Get the local orientation at the specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`BaseObjectResolvedTransform`

***

### getTransformMatrixAtTime()

> **getTransformMatrixAtTime**(`timestamp`): `Matrix4`

Get the local transformation matrix at the specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`Matrix4`

***

### register()

> **register**(): `void`

Register the host entity with the Daisy pipeline, triggering entity.reRegisterAll.

#### Returns

`void`

#### Example

```ts
obj.register();
```

***

### removeComponentById()

> **removeComponentById**(`id`): `void`

Remove a component by ID, destroying it first.

#### Parameters

##### id

`string`

Component ID.

#### Returns

`void`

***

### removeComponentByName()

> **removeComponentByName**(`name`): `void`

Remove a component by name, destroying it first.

#### Parameters

##### name

`string`

Component name.

#### Returns

`void`

***

### resetTemporalState()

> **resetTemporalState**(`time?`): `void`

Reset runtime state across frames and time loops.

Engine calls this method when it detects that simulation time has moved backward. It does not destroy business configuration; it only clears the
BaseObject time-value cache and propagates the reset to attached components.

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

***

### unregister()

> **unregister**(): `void`

Unregister the object by removing all Features attached to the entity and notifying components to detach.

#### Returns

`void`

#### Example

```ts
obj.unregister();
```

***

### update()

> **update**(`time`): `void`

Update every frame, driving entity.update and synchronously updating attached components.

#### Parameters

##### time

`JulianDate`

Simulation time.

#### Returns

`void`

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

***

### onBeforeDestroy()

> **onBeforeDestroy**(`callback`): `void`

Listen for the event before destruction.
 BEFORE_DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onBeforeRegister()

> **onBeforeRegister**(`callback`): `void`

Listen for the event before registration.
 BEFORE_REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onBeforeUnregister()

> **onBeforeUnregister**(`callback`): `void`

Listen for the event before unregistration.
 BEFORE_UNREGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onBeforeUpdate()

> **onBeforeUpdate**(`callback`): `void`

Listen for the event before an update.
 BEFORE_UPDATE

#### Parameters

##### callback

(`time`) => `void`

#### Returns

`void`

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

***

### onDestroy()

> **onDestroy**(`callback`): `void`

Listen for destruction events.
 DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

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

***

### onRegister()

> **onRegister**(`callback`): `void`

Listen for registration-complete events.
 REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onUnregister()

> **onUnregister**(`callback`): `void`

Listen for unregistration events.
 UNREGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

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
