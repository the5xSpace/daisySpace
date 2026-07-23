[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / CelestialBody

# Abstract Class: CelestialBody

Abstract base class for celestial planetary objects.

Common implementation extracted from Moon and Mars. Subclasses only need to implement their abstract methods:
- Ellipsoid material and shader
- CelestialEllipsoid constructor parameters
- lockCamera camera-initialization logic
- subclass-specific features, such as atmosphere and terminator fade-in/fade-out

## Example

```ts
class MyBody extends CelestialBody {
 _getEllipsoid() { return ELLIPSOID.MY_BODY; }
 // ... implement other abstract methods
}
```

## Extends

- [`BaseObject`](PW.BaseObject.md)

## Extended by

- [`Moon`](PW.Moon.md)
- [`Mars`](PW.Mars.md)

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`_celestialEllipsoid`](PW.BaseObject.md#_celestialellipsoid)

***

### \_entity

> `abstract` **\_entity**: [`Entity`](Entity.md)

#### Overrides

[`BaseObject`](PW.BaseObject.md).[`_entity`](PW.BaseObject.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`isDestroyed`](PW.BaseObject.md#isdestroyed)

## Accessors

### bodyEllipsoid

#### Get Signature

> **get** **bodyEllipsoid**(): [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

Exposes the celestial Ellipsoid for external use (available only after `bindEngine`).

##### Returns

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

***

### celestialBodyOptions

#### Get Signature

> **get** **celestialBodyOptions**(): [`CelestialBodyConfig`](../types/PW.CelestialBodyConfig.md)

Get a snapshot of the subclass configuration for internal access by the base class.

##### Returns

[`CelestialBodyConfig`](../types/PW.CelestialBodyConfig.md)

***

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

> **get** **options**(): `any`

The original snapshot of the object creation and configuration parameters. Different subclasses may extend its structure.

Note: this is the source of the semantic configuration, not the rendered result. Rendering is applied by _applyConfig together with Features and Components.

##### Returns

`any`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`options`](PW.BaseObject.md#options)

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

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`position`](PW.BaseObject.md#position)

## Methods

### \_createCelestialEllipsoid()

> `abstract` **\_createCelestialEllipsoid**(`engine`): [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

Create and return this body's CelestialEllipsoid, including position, orientation, gravity, and other parameters.

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

***

### \_createEllipsoidMaterial()

> `abstract` **\_createEllipsoidMaterial**(`config`): `Material`

Build the custom ellipsoid material, including the shader and uniforms.

#### Parameters

##### config

###### shadows

`ShadowMode`

###### show

`boolean`

###### terminator

`boolean`

#### Returns

`Material`

***

### \_getBodyLabelPrefix()

> `abstract` **\_getBodyLabelPrefix**(): `string`

Get the body-axis label prefix, such as "Moon-fixed frame".

#### Returns

`string`

***

### \_getDefaultGridId()

> `abstract` **\_getDefaultGridId**(): `string`

Get the default latitude-longitude grid ID.

#### Returns

`string`

***

### \_getDefaultName()

> `abstract` **\_getDefaultName**(): `string`

Get the celestial body name.

#### Returns

`string`

***

### \_getEllipsoid()

> `abstract` **\_getEllipsoid**(): `Ellipsoid`

Get the celestial body ellipsoid constant.

#### Returns

`Ellipsoid`

***

### \_getLockCameraAltitudeMultiplier()

> `abstract` **\_getLockCameraAltitudeMultiplier**(): `number`

Get the lockCamera camera altitude multiplier relative to maxRadius.

#### Returns

`number`

***

### \_getSurfaceGravity()

> `abstract` **\_getSurfaceGravity**(): `number`

Get the surface gravity (m/s²).

#### Returns

`number`

***

### \_isBoundCelestial()

> **\_isBoundCelestial**(`target`): `boolean`

Determine whether the given target is the current celestial body, for the currentCelestial check in lockCamera.

#### Parameters

##### target

`any`

#### Returns

`boolean`

***

### \_tryInitCameraForLock()

> `abstract` **\_tryInitCameraForLock**(`engine`, `time`): `boolean`

lockCamera camera-initialization logic (positioning, orientation, and rotation), which varies significantly between celestial bodies.

#### Parameters

##### engine

[`Engine`](Engine.md)

##### time

`JulianDate`

#### Returns

`boolean`

***

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

### bindEngine()

> **bindEngine**(`engine`): `void`

Base-class bindEngine: the unified common flow.
Call order:
1. `_createCelestialEllipsoid` → set the celestial ellipsoid
2. `super.bindEngine` → register the entity
3. `_setupGrid` → configure the latitude-longitude grid
4. `_setupSunDirectionObserver` → configure the lighting direction
5. `_bindEngineExtras` → apply subclass extensions
6. `_setupLockCamera` → configure camera locking

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`void`

#### Overrides

[`BaseObject`](PW.BaseObject.md).[`bindEngine`](PW.BaseObject.md#bindengine)

***

### ~~bindViewer()~~

> **bindViewer**(`viewer`): `void`

Legacy alias: bind to the Engine.

#### Parameters

##### viewer

[`Engine`](Engine.md)

#### Returns

`void`

#### Deprecated

Use bindEngine instead.

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

#### Overrides

[`BaseObject`](PW.BaseObject.md).[`destroy`](PW.BaseObject.md#destroy)

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

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getComponentById`](PW.BaseObject.md#getcomponentbyid)

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

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getComponentByName`](PW.BaseObject.md#getcomponentbyname)

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

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getComponents`](PW.BaseObject.md#getcomponents)

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

Get the local orientation at the current simulation time.

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

Get the local orientation at the specified simulation time.

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

Get the position at the specified time by delegating to the host entity.getPosition.

#### Parameters

##### time

`JulianDate`

Simulation time.

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

Get the local orientation at the specified simulation time.

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

Get the local transformation matrix at the specified simulation time.

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

Register the host entity with the Daisy pipeline, triggering entity.reRegisterAll.

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

Remove a component by ID, destroying it first.

#### Parameters

##### id

`string`

Component ID.

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`removeComponentById`](PW.BaseObject.md#removecomponentbyid)

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

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`removeComponentByName`](PW.BaseObject.md#removecomponentbyname)

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

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`resetTemporalState`](PW.BaseObject.md#resettemporalstate)

***

### resumeCameraLock()

> **resumeCameraLock**(): `void`

Restore the camera tracking controller, called after a flyTo animation ends.

#### Returns

`void`

***

### setCameraLockInitialized()

> **setCameraLockInitialized**(`value`): `void`

Legacy alias.

#### Parameters

##### value

`boolean`

#### Returns

`void`

***

### setCameraLockIntialized()

> **setCameraLockIntialized**(`value`): `void`

Manually mark camera locking as initialized. This skips repositioning and only corrects the up direction.

#### Parameters

##### value

`boolean`

#### Returns

`void`

***

### setGridSuppressShow()

> **setGridSuppressShow**(`value`): `void`

Temporarily hide or show the latitude-longitude grid, such as during a camera transition, without affecting the grid configuration.

#### Parameters

##### value

`boolean`

#### Returns

`void`

***

### setSuppressLock()

> **setSuppressLock**(`value`): `void`

Set the suppress state for lockCamera, such as pausing locking during a flyTo animation.

#### Parameters

##### value

`boolean`

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

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`unregister`](PW.BaseObject.md#unregister)

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

Listen for the event before destruction.
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

Listen for the event before registration.
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

Listen for the event before unregistration.
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

Listen for the event before an update.
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

Listen for destruction events.
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

Listen for registration-complete events.
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

Listen for unregistration events.
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
