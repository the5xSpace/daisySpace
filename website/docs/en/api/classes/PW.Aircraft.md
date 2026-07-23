[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Aircraft

# Class: Aircraft

Aircraft: an aircraft specialization of Vehicle.

Semantic conventions:
- The default sensor mounting direction is TO_BOTTOM (downward relative to the body).
- Application code can override the mounting direction with `addSensor({ emitDirection: ... })`.

## Example

```ts
import * as Daisy from "daisy-space-sdk";

const aircraft = new Daisy.PW.Aircraft({ name: "UAV-1" });
aircraft.position = Daisy.Cartesian3.fromDegrees(120.0, 30.0, 10_000);
aircraft.bindViewer(viewer);

// 默认下视
aircraft.addSensor({ apertureDeg: 10, beamLength: 200_000 });

// 覆盖为前视
aircraft.addSensor({ emitDirection: Daisy.EmitDirection.TO_FRONT, apertureDeg: 6, beamLength: 150_000 });
```

## Extends

- [`Vehicle`](PW.Vehicle.md)

## Extended by

- [`NearEarthOrbiter`](PW.NearEarthOrbiter.md)

## Constructors

### Constructor

> **new Aircraft**(`options?`, `celestialEllipsoid?`): `Aircraft`

Create a Vehicle.

#### Parameters

##### options?

[`VehicleConfig`](../types/PW.VehicleConfig.md)

Vehicle configuration (inherits FreeObjectConfig and adds orientation/sensors).

##### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

Celestial body (Earth by default).

#### Returns

`Aircraft`

#### Example

```ts
const vehicle = new Vehicle({
 name: "Vehicle-1",
 model: { url: "/models/ChandraXrayObservatory.glb", minimumPixelSize: 48 },
 label: { text: "Vehicle-1" },
 sensors: { type: SensorType.EllipticalCone, range: 120_000, apertureDeg: 10 },
});
vehicle.position = Daisy.Cartesian3.fromDegrees(121.5, 31.2, 30);
vehicle.bindViewer(viewer);
```

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`constructor`](PW.Vehicle.md#constructor)

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`_celestialEllipsoid`](PW.Vehicle.md#_celestialellipsoid)

***

### \_entity

> **\_entity**: [`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`_entity`](PW.Vehicle.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`isDestroyed`](PW.Vehicle.md#isdestroyed)

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

Get the host Entity for mounting Features, interaction events, updates, and more.

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`entity`](PW.Vehicle.md#entity)

***

### options

#### Get Signature

> **get** **options**(): [`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

Original snapshot of the object creation/configuration parameters; subclasses may extend its structure.

Note: this is the source of the semantic configuration, not the rendering result. Rendering is applied by _applyConfig plus Feature/Component.

##### Returns

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`options`](PW.Vehicle.md#options)

***

### orientation

#### Get Signature

> **get** **orientation**(): `Property` \| `Quaternion` \| `undefined`

##### Returns

`Property` \| `Quaternion` \| `undefined`

#### Set Signature

> **set** **orientation**(`value`): `void`

Convenience setter for orientation; writes to the host Entity.orientation.

##### Parameters

###### value

`Property` \| `Quaternion` \| `undefined`

##### Returns

`void`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`orientation`](PW.Vehicle.md#orientation)

***

### position

#### Get Signature

> **get** **position**(): [`ObjectPositon`](../types/PW.ObjectPositon.md)

Set the object position (supports static coordinates or sampled trajectories).

- Assignment also writes to the host entity.position.
- CelestialEntity objects (non-Earth bodies) cannot use TrajectorySample values that support inertial frames.

##### Example

```ts
vehicle.position = Daisy.Cartesian3.fromDegrees(121.5, 31.2, 30);
```

##### Returns

[`ObjectPositon`](../types/PW.ObjectPositon.md)

#### Set Signature

> **set** **position**(`value`): `void`

Convenience setter for position (supports static coordinates or sampled trajectories).

##### Parameters

###### value

[`ObjectPositon`](../types/PW.ObjectPositon.md)

##### Returns

`void`

#### Inherited from

[`Vessel`](PW.Vessel.md).[`position`](PW.Vessel.md#position)

## Methods

### addComponent()

> **addComponent**\<`T`\>(`component`): `T`

Mount a PhysicalWorld component on the current object.

Note: Features should still be mounted through Entity.addFeature(); this method is only for IComponent.

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

[`Vehicle`](PW.Vehicle.md).[`addComponent`](PW.Vehicle.md#addcomponent)

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`addLink`](PW.Vehicle.md#addlink)

***

### addPropulsion()

> **addPropulsion**\<`T`\>(`propulsion`): `T`

#### Type Parameters

##### T

`T` *extends* [`PropulsionComponent`](PW.PropulsionComponent.md)

#### Parameters

##### propulsion

`T`

#### Returns

`T`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`addPropulsion`](PW.Vehicle.md#addpropulsion)

***

### addSensor()

> **addSensor**(`options?`): [`Sensor`](PW.Sensor.md)

Add a sensor and apply the default beam-length inference commonly used by aircraft.

Notes:
- When `beamLength/range` is not provided explicitly, a reasonable default length is inferred from the object state when possible.
- The inference reuses the Vehicle implementation.

#### Parameters

##### options?

[`SensorOptions`](../types/PW.SensorOptions.md) = `{}`

#### Returns

[`Sensor`](PW.Sensor.md)

#### Overrides

[`Vehicle`](PW.Vehicle.md).[`addSensor`](PW.Vehicle.md#addsensor)

***

### bindEngine()

> **bindEngine**(`engine`): `void`

Bind to an Engine and complete registration.

- If the Engine has no Entity with the same id, addEntity is called automatically.
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

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`bindEngine`](PW.Vehicle.md#bindengine)

***

### destroy()

> **destroy**(): `void`

Destroy the object, including interaction listeners, components, the host Entity, and the event manager.

#### Returns

`void`

#### Example

```ts
obj.destroy();
```

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`destroy`](PW.Vehicle.md#destroy)

***

### getComponentById()

> **getComponentById**(`id?`): [`Component`](../types/PW.Component.md)[]

Get components by id. IDs are theoretically globally unique, but an array is returned for historical compatibility.

#### Parameters

##### id?

`string`

Component id

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getComponentById`](PW.Vehicle.md#getcomponentbyid)

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

[`Vehicle`](PW.Vehicle.md).[`getComponentByName`](PW.Vehicle.md#getcomponentbyname)

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

[`Vehicle`](PW.Vehicle.md).[`getComponents`](PW.Vehicle.md#getcomponents)

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

Get the local orientation at the current simulation time.

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getCurrentOrientation`](PW.Vehicle.md#getcurrentorientation)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

Get the live position at the current simulation time.

If position is a TrajectorySample, it is evaluated at the current Engine time. If it is a static Cartesian3, it is returned directly.

#### Returns

`Cartesian3` \| `undefined`

World coordinates at the current time, or undefined when evaluation is not possible.

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getCurrentPosition`](PW.Vehicle.md#getcurrentposition)

***

### getOrientationAtTime()

> **getOrientationAtTime**(`timestamp`): [`Rotation`](../types/Rotation.md)

Get the local orientation at a specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getOrientationAtTime`](PW.Vehicle.md#getorientationattime)

***

### getPosition()

> **getPosition**(`time`): `Cartesian3` \| `undefined`

Get the position at a specified time by delegating to the host entity.getPosition.

#### Parameters

##### time

`JulianDate`

Simulation time

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getPosition`](PW.Vehicle.md#getposition)

***

### getPositionAtTime()

> **getPositionAtTime**(`timestamp`): `Cartesian3` \| `undefined`

Get the world position at a specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getPositionAtTime`](PW.Vehicle.md#getpositionattime)

***

### getPropulsion()

> **getPropulsion**(`idOrName`): [`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Parameters

##### idOrName

`string`

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getPropulsion`](PW.Vehicle.md#getpropulsion)

***

### getPropulsions()

> **getPropulsions**(): [`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getPropulsions`](PW.Vehicle.md#getpropulsions)

***

### getTransformAtTime()

> **getTransformAtTime**(`timestamp`): `BaseObjectResolvedTransform`

Get the local transform at a specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`BaseObjectResolvedTransform`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getTransformAtTime`](PW.Vehicle.md#gettransformattime)

***

### getTransformMatrixAtTime()

> **getTransformMatrixAtTime**(`timestamp`): `Matrix4`

Get the local transform matrix at a specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`Matrix4`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getTransformMatrixAtTime`](PW.Vehicle.md#gettransformmatrixattime)

***

### register()

> **register**(): `void`

Register the host Entity with the Daisy pipeline (triggers entity.reRegisterAll).

#### Returns

`void`

#### Example

```ts
obj.register();
```

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`register`](PW.Vehicle.md#register)

***

### removeComponentById()

> **removeComponentById**(`id`): `void`

Remove a component by id (destroying it first).

#### Parameters

##### id

`string`

Component id

#### Returns

`void`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`removeComponentById`](PW.Vehicle.md#removecomponentbyid)

***

### removeComponentByName()

> **removeComponentByName**(`name`): `void`

Remove a component by name (destroying it first).

#### Parameters

##### name

`string`

Component name

#### Returns

`void`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`removeComponentByName`](PW.Vehicle.md#removecomponentbyname)

***

### removePropulsion()

> **removePropulsion**(`idOrName`): `void`

#### Parameters

##### idOrName

`string`

#### Returns

`void`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`removePropulsion`](PW.Vehicle.md#removepropulsion)

***

### resetTemporalState()

> **resetTemporalState**(`time?`): `void`

Reset runtime state across frames and time loops.

Engine calls this method when it detects that simulation time moved backward. It does not destroy application configuration; it only clears BaseObject time-value caches and forwards the reset to mounted components.

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`resetTemporalState`](PW.Vehicle.md#resettemporalstate)

***

### setOptions()

> **setOptions**(`config`): `void`

Update configuration and rebuild the corresponding Features according to the strategy.

#### Parameters

##### config

[`VehicleConfig`](../types/PW.VehicleConfig.md)

New configuration

#### Returns

`void`

#### Example

```ts
obj.setOptions({ label: { text: "Updated" } });
```

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`setOptions`](PW.Vehicle.md#setoptions)

***

### unregister()

> **unregister**(): `void`

Unregister: remove all Features mounted on the Entity and notify components to unbind.

#### Returns

`void`

#### Example

```ts
obj.unregister();
```

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`unregister`](PW.Vehicle.md#unregister)

***

### update()

> **update**(`time`): `void`

Update each frame by driving entity.update and the update methods of mounted components.

#### Parameters

##### time

`JulianDate`

Simulation time

#### Returns

`void`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`update`](PW.Vehicle.md#update)

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

[`Vehicle`](PW.Vehicle.md).[`offClick`](PW.Vehicle.md#offclick)

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

[`Vehicle`](PW.Vehicle.md).[`offDblClick`](PW.Vehicle.md#offdblclick)

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

[`Vehicle`](PW.Vehicle.md).[`offMouseEnter`](PW.Vehicle.md#offmouseenter)

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

[`Vehicle`](PW.Vehicle.md).[`offMouseLeave`](PW.Vehicle.md#offmouseleave)

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

[`Vehicle`](PW.Vehicle.md).[`onBeforeDestroy`](PW.Vehicle.md#onbeforedestroy)

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

[`Vehicle`](PW.Vehicle.md).[`onBeforeRegister`](PW.Vehicle.md#onbeforeregister)

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

[`Vehicle`](PW.Vehicle.md).[`onBeforeUnregister`](PW.Vehicle.md#onbeforeunregister)

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

[`Vehicle`](PW.Vehicle.md).[`onBeforeUpdate`](PW.Vehicle.md#onbeforeupdate)

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

[`Vehicle`](PW.Vehicle.md).[`onClick`](PW.Vehicle.md#onclick)

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

[`Vehicle`](PW.Vehicle.md).[`onDblClick`](PW.Vehicle.md#ondblclick)

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

[`Vehicle`](PW.Vehicle.md).[`onDestroy`](PW.Vehicle.md#ondestroy)

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

[`Vehicle`](PW.Vehicle.md).[`onMouseEnter`](PW.Vehicle.md#onmouseenter)

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

[`Vehicle`](PW.Vehicle.md).[`onMouseLeave`](PW.Vehicle.md#onmouseleave)

***

### onRegister()

> **onRegister**(`callback`): `void`

Listen for the completed-register event.
 REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`onRegister`](PW.Vehicle.md#onregister)

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

[`Vehicle`](PW.Vehicle.md).[`onUnregister`](PW.Vehicle.md#onunregister)

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

[`Vehicle`](PW.Vehicle.md).[`onUpdate`](PW.Vehicle.md#onupdate)
