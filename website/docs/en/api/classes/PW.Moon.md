[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Moon

# Class: Moon

Moon object, including the ellipsoid, grid, body axis, and terminator.

## Example

```ts
const moon = new Moon({
 name: "Moon",
 ellipsoid: { show: true, terminator: true },
 bodyAxis: true,
});
moon.bindEngine(engine);
engine.switchToCelestial(moon);
```

## Extends

- [`CelestialBody`](PW.CelestialBody.md)

## Constructors

### Constructor

> **new Moon**(`options?`): `Moon`

#### Parameters

##### options?

[`CelestialBodyConfig`](../types/PW.CelestialBodyConfig.md) = `{}`

#### Returns

`Moon`

#### Overrides

`CelestialBody.constructor`

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`_celestialEllipsoid`](PW.CelestialBody.md#_celestialellipsoid)

***

### \_entity

> **\_entity**: [`Entity`](Entity.md)

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_entity`](PW.CelestialBody.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`isDestroyed`](PW.CelestialBody.md#isdestroyed)

## Accessors

### bodyEllipsoid

#### Get Signature

> **get** **bodyEllipsoid**(): [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

Exposes the celestial Ellipsoid for external use (available only after `bindEngine`).

##### Returns

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`bodyEllipsoid`](PW.CelestialBody.md#bodyellipsoid)

***

### celestialBodyOptions

#### Get Signature

> **get** **celestialBodyOptions**(): [`CelestialBodyConfig`](../types/PW.CelestialBodyConfig.md)

Get a snapshot of the subclass configuration for internal access by the base class.

##### Returns

[`CelestialBodyConfig`](../types/PW.CelestialBodyConfig.md)

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`celestialBodyOptions`](PW.CelestialBody.md#celestialbodyoptions)

***

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

Get the host Entity, used for attaching Features, interaction events, updates, and more.

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`entity`](PW.CelestialBody.md#entity)

***

### options

#### Get Signature

> **get** **options**(): [`CelestialBodyConfig`](../types/PW.CelestialBodyConfig.md)

The original snapshot of the object creation and configuration parameters. Different subclasses may extend its structure.

Note: this is the source of the semantic configuration, not the rendered result. Rendering is applied by _applyConfig together with Features and Components.

##### Returns

[`CelestialBodyConfig`](../types/PW.CelestialBodyConfig.md)

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`options`](PW.CelestialBody.md#options)

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

[`CelestialBody`](PW.CelestialBody.md).[`position`](PW.CelestialBody.md#position)

## Methods

### \_createCelestialEllipsoid()

> **\_createCelestialEllipsoid**(`engine`): [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

Create and return this body's CelestialEllipsoid, including position, orientation, gravity, and other parameters.

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_createCelestialEllipsoid`](PW.CelestialBody.md#_createcelestialellipsoid)

***

### \_createEllipsoidMaterial()

> **\_createEllipsoidMaterial**(`config`): `Material`

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

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_createEllipsoidMaterial`](PW.CelestialBody.md#_createellipsoidmaterial)

***

### \_getBodyLabelPrefix()

> **\_getBodyLabelPrefix**(): `string`

Get the body-axis label prefix, such as "Moon-fixed frame".

#### Returns

`string`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getBodyLabelPrefix`](PW.CelestialBody.md#_getbodylabelprefix)

***

### \_getDefaultGridId()

> **\_getDefaultGridId**(): `string`

Get the default latitude-longitude grid ID.

#### Returns

`string`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getDefaultGridId`](PW.CelestialBody.md#_getdefaultgridid)

***

### \_getDefaultName()

> **\_getDefaultName**(): `string`

Get the celestial body name.

#### Returns

`string`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getDefaultName`](PW.CelestialBody.md#_getdefaultname)

***

### \_getEllipsoid()

> **\_getEllipsoid**(): `Ellipsoid`

Get the celestial body ellipsoid constant.

#### Returns

`Ellipsoid`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getEllipsoid`](PW.CelestialBody.md#_getellipsoid)

***

### \_getLockCameraAltitudeMultiplier()

> **\_getLockCameraAltitudeMultiplier**(): `number`

Get the lockCamera camera altitude multiplier relative to maxRadius.

#### Returns

`number`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getLockCameraAltitudeMultiplier`](PW.CelestialBody.md#_getlockcameraaltitudemultiplier)

***

### \_getSurfaceGravity()

> **\_getSurfaceGravity**(): `number`

Get the surface gravity (m/s²).

#### Returns

`number`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getSurfaceGravity`](PW.CelestialBody.md#_getsurfacegravity)

***

### \_isBoundCelestial()

> **\_isBoundCelestial**(`target`): `boolean`

Determine whether the given target is the current celestial body, for the currentCelestial check in lockCamera.

#### Parameters

##### target

`any`

#### Returns

`boolean`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`_isBoundCelestial`](PW.CelestialBody.md#_isboundcelestial)

***

### \_tryInitCameraForLock()

> **\_tryInitCameraForLock**(`engine`, `time`): `boolean`

Initialize the Moon lockCamera: look down from above the equator with the spin axis pointing up.

#### Parameters

##### engine

[`Engine`](Engine.md)

##### time

`JulianDate`

#### Returns

`boolean`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_tryInitCameraForLock`](PW.CelestialBody.md#_tryinitcameraforlock)

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

[`CelestialBody`](PW.CelestialBody.md).[`addComponent`](PW.CelestialBody.md#addcomponent)

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`addLink`](PW.CelestialBody.md#addlink)

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

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`bindEngine`](PW.CelestialBody.md#bindengine)

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

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`bindViewer`](PW.CelestialBody.md#bindviewer)

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

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`destroy`](PW.CelestialBody.md#destroy)

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

[`CelestialBody`](PW.CelestialBody.md).[`getComponentById`](PW.CelestialBody.md#getcomponentbyid)

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

[`CelestialBody`](PW.CelestialBody.md).[`getComponentByName`](PW.CelestialBody.md#getcomponentbyname)

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

[`CelestialBody`](PW.CelestialBody.md).[`getComponents`](PW.CelestialBody.md#getcomponents)

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

Get the local orientation at the current simulation time.

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`getCurrentOrientation`](PW.CelestialBody.md#getcurrentorientation)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

Get the world position at the current simulation time.

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`getCurrentPosition`](PW.CelestialBody.md#getcurrentposition)

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

[`CelestialBody`](PW.CelestialBody.md).[`getOrientationAtTime`](PW.CelestialBody.md#getorientationattime)

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

[`CelestialBody`](PW.CelestialBody.md).[`getPosition`](PW.CelestialBody.md#getposition)

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

[`CelestialBody`](PW.CelestialBody.md).[`getPositionAtTime`](PW.CelestialBody.md#getpositionattime)

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

[`CelestialBody`](PW.CelestialBody.md).[`getTransformAtTime`](PW.CelestialBody.md#gettransformattime)

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

[`CelestialBody`](PW.CelestialBody.md).[`getTransformMatrixAtTime`](PW.CelestialBody.md#gettransformmatrixattime)

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

[`CelestialBody`](PW.CelestialBody.md).[`register`](PW.CelestialBody.md#register)

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

[`CelestialBody`](PW.CelestialBody.md).[`removeComponentById`](PW.CelestialBody.md#removecomponentbyid)

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

[`CelestialBody`](PW.CelestialBody.md).[`removeComponentByName`](PW.CelestialBody.md#removecomponentbyname)

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

[`CelestialBody`](PW.CelestialBody.md).[`resetTemporalState`](PW.CelestialBody.md#resettemporalstate)

***

### resumeCameraLock()

> **resumeCameraLock**(): `void`

Restore the camera tracking controller, called after a flyTo animation ends.

#### Returns

`void`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`resumeCameraLock`](PW.CelestialBody.md#resumecameralock)

***

### setCameraLockInitialized()

> **setCameraLockInitialized**(`value`): `void`

Legacy alias.

#### Parameters

##### value

`boolean`

#### Returns

`void`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`setCameraLockInitialized`](PW.CelestialBody.md#setcameralockinitialized)

***

### setCameraLockIntialized()

> **setCameraLockIntialized**(`value`): `void`

Manually mark camera locking as initialized. This skips repositioning and only corrects the up direction.

#### Parameters

##### value

`boolean`

#### Returns

`void`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`setCameraLockIntialized`](PW.CelestialBody.md#setcameralockintialized)

***

### setGridSuppressShow()

> **setGridSuppressShow**(`value`): `void`

Temporarily hide or show the latitude-longitude grid, such as during a camera transition, without affecting the grid configuration.

#### Parameters

##### value

`boolean`

#### Returns

`void`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`setGridSuppressShow`](PW.CelestialBody.md#setgridsuppressshow)

***

### setSuppressLock()

> **setSuppressLock**(`value`): `void`

Set the suppress state for lockCamera, such as pausing locking during a flyTo animation.

#### Parameters

##### value

`boolean`

#### Returns

`void`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`setSuppressLock`](PW.CelestialBody.md#setsuppresslock)

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

[`CelestialBody`](PW.CelestialBody.md).[`unregister`](PW.CelestialBody.md#unregister)

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

[`CelestialBody`](PW.CelestialBody.md).[`update`](PW.CelestialBody.md#update)

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

[`CelestialBody`](PW.CelestialBody.md).[`offClick`](PW.CelestialBody.md#offclick)

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

[`CelestialBody`](PW.CelestialBody.md).[`offDblClick`](PW.CelestialBody.md#offdblclick)

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

[`CelestialBody`](PW.CelestialBody.md).[`offMouseEnter`](PW.CelestialBody.md#offmouseenter)

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

[`CelestialBody`](PW.CelestialBody.md).[`offMouseLeave`](PW.CelestialBody.md#offmouseleave)

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

[`CelestialBody`](PW.CelestialBody.md).[`onBeforeDestroy`](PW.CelestialBody.md#onbeforedestroy)

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

[`CelestialBody`](PW.CelestialBody.md).[`onBeforeRegister`](PW.CelestialBody.md#onbeforeregister)

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

[`CelestialBody`](PW.CelestialBody.md).[`onBeforeUnregister`](PW.CelestialBody.md#onbeforeunregister)

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

[`CelestialBody`](PW.CelestialBody.md).[`onBeforeUpdate`](PW.CelestialBody.md#onbeforeupdate)

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

[`CelestialBody`](PW.CelestialBody.md).[`onClick`](PW.CelestialBody.md#onclick)

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

[`CelestialBody`](PW.CelestialBody.md).[`onDblClick`](PW.CelestialBody.md#ondblclick)

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

[`CelestialBody`](PW.CelestialBody.md).[`onDestroy`](PW.CelestialBody.md#ondestroy)

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

[`CelestialBody`](PW.CelestialBody.md).[`onMouseEnter`](PW.CelestialBody.md#onmouseenter)

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

[`CelestialBody`](PW.CelestialBody.md).[`onMouseLeave`](PW.CelestialBody.md#onmouseleave)

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

[`CelestialBody`](PW.CelestialBody.md).[`onRegister`](PW.CelestialBody.md#onregister)

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

[`CelestialBody`](PW.CelestialBody.md).[`onUnregister`](PW.CelestialBody.md#onunregister)

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

[`CelestialBody`](PW.CelestialBody.md).[`onUpdate`](PW.CelestialBody.md#onupdate)
