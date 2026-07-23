[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Mars

# Class: Mars

Mars object (with ellipsoid, grid, body axis, and optional atmosphere)

## Example

```ts
const mars = new Mars({
 name: "Mars",
 ellipsoid: { show: true, terminator: true },
 atmosphere: { show: true, intensity: 0 },
 bodyAxis: true,
});
mars.bindEngine(engine);
engine.switchToCelestial(mars);
```

## Extends

- [`CelestialBody`](PW.CelestialBody.md)

## Constructors

### Constructor

> **new Mars**(`options?`): `Mars`

#### Parameters

##### options?

[`MarsConfig`](../types/PW.MarsConfig.md) = `{}`

#### Returns

`Mars`

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

Exposed for external use: get the celestial Ellipsoid (available only after `bindEngine`).

##### Returns

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`bodyEllipsoid`](PW.CelestialBody.md#bodyellipsoid)

***

### celestialBodyOptions

#### Get Signature

> **get** **celestialBodyOptions**(): [`CelestialBodyConfig`](../types/PW.CelestialBodyConfig.md)

Get the subclass configuration snapshot, used by the base class to access subclass configuration.

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

> **get** **options**(): [`MarsConfig`](../types/PW.MarsConfig.md)

Original snapshot of object creation/configuration parameters; subclasses may extend its structure.

Note: This is the source of the “semantic configuration”, not the rendered result. Rendering is completed by _applyConfig + Feature/Component.

##### Returns

[`MarsConfig`](../types/PW.MarsConfig.md)

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

[`CelestialBody`](PW.CelestialBody.md).[`position`](PW.CelestialBody.md#position)

## Methods

### \_createCelestialEllipsoid()

> **\_createCelestialEllipsoid**(`engine`): [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

Create and return this body's CelestialEllipsoid, including position, attitude, gravity, and other parameters.

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

Build the custom ellipsoid material, including shader + uniforms.

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

Get the body-axis label prefix, such as "Moon-fixed".

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

Get the celestial-body name.

#### Returns

`string`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getDefaultName`](PW.CelestialBody.md#_getdefaultname)

***

### \_getEllipsoid()

> **\_getEllipsoid**(): `Ellipsoid`

Get the celestial ellipsoid constant.

#### Returns

`Ellipsoid`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getEllipsoid`](PW.CelestialBody.md#_getellipsoid)

***

### \_getLockCameraAltitudeMultiplier()

> **\_getLockCameraAltitudeMultiplier**(): `number`

Get the lockCamera camera-altitude multiplier relative to maxRadius.

#### Returns

`number`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getLockCameraAltitudeMultiplier`](PW.CelestialBody.md#_getlockcameraaltitudemultiplier)

***

### \_getSurfaceGravity()

> **\_getSurfaceGravity**(): `number`

Get surface gravity (m/s²).

#### Returns

`number`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getSurfaceGravity`](PW.CelestialBody.md#_getsurfacegravity)

***

### \_isBoundCelestial()

> **\_isBoundCelestial**(`target`): `boolean`

Check whether the given target is the current celestial body, used by the lockCamera currentCelestial check.

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

Initialize the Mars lockCamera camera using a simplified path (without a reposition parameter and with Gram-Schmidt up).

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

Component instance

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

Base bindEngine: unified common flow.
Call order:
1. `_createCelestialEllipsoid` → set the celestial ellipsoid
2. `super.bindEngine` → register the entity
3. `_setupGrid` → latitude-longitude grid
4. `_setupSunDirectionObserver` → lighting direction
5. `_bindEngineExtras` → subclass extensions
6. `_setupLockCamera` → camera lock

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

Legacy alias: bind to Engine.

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

Destroy the object (remove interaction listeners, destroy components, destroy the host entity, and release the event manager).

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

Get components by id. The id is theoretically globally unique, but an array is returned for compatibility with legacy logic.

#### Parameters

##### id?

`string`

Component id

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

Component name (component.name)

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

Component type (corresponding to component.type); omit it to return all components.

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`getComponents`](PW.CelestialBody.md#getcomponents)

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

Get the local attitude at the current simulation time.

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

Get the local attitude at the specified simulation time.

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

Get the position at the specified time (delegates to the host entity.getPosition).

#### Parameters

##### time

`JulianDate`

Simulation time

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

Get the local attitude at the specified simulation time.

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

Get the local transform matrix at the specified simulation time.

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

Register the host entity with the Daisy pipeline (triggers entity.reRegisterAll).

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

Remove components by id (calls destroy first).

#### Parameters

##### id

`string`

组件 id

#### Returns

`void`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`removeComponentById`](PW.CelestialBody.md#removecomponentbyid)

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

[`CelestialBody`](PW.CelestialBody.md).[`removeComponentByName`](PW.CelestialBody.md#removecomponentbyname)

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

[`CelestialBody`](PW.CelestialBody.md).[`resetTemporalState`](PW.CelestialBody.md#resettemporalstate)

***

### resumeCameraLock()

> **resumeCameraLock**(): `void`

Resume the camera tracking controller (called after a flyTo animation ends).

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

Manually mark camera locking as initialized (skip repositioning and only correct the up direction).

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

Temporarily hide or show the latitude-longitude grid, such as during a camera transition, without changing grid configuration.

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

Set the lockCamera suppress state, such as pausing the lock during a flyTo animation.

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

Unregister: remove all Features attached to the entity and notify components to unbind.

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

Update every frame (drives entity.update and synchronously updates attached components).

#### Parameters

##### time

`JulianDate`

仿真时间

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

Listen for the before-destroy event.
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

Listen for the before-register event.
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

Listen for the before-unregister event.
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

Listen for the before-update event.
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

Listen for destroy events.
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

Listen for completed-register events.
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

Listen for unregister events.
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
