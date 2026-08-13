[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Vehicle

# Class: Vehicle

Vehicle: a mobile platform physical-semantic object.

Design principles:
- Exposes a semantic API while reusing Daisy.Entity + Feature + PW.Component internally
- Most graphics attachment capabilities (model/text/image/trajectory/collision, etc.) reuse the FreeObject strategy system

`Vehicle` and its derived classes inherit `FreeObjectConfig.path`. The configuration is forwarded directly to the host `Entity.setPath()`, so a trail does not require an additional `addComponent()` call.

## Extends

- [`FreeObject`](PW.FreeObject.md)

## Extended by

- [`Aircraft`](PW.Aircraft.md)
- [`Rocket`](PW.Rocket.md)
- [`GroundStation`](PW.GroundStation.md)
- [`Vessel`](PW.Vessel.md)

## Constructors

### Constructor

> **new Vehicle**(`options?`, `celestialEllipsoid?`): `Vehicle`

Create a Vehicle.

#### Parameters

##### options?

[`VehicleConfig`](../types/PW.VehicleConfig.md)

Vehicle configuration (extends FreeObjectConfig and adds orientation/sensors).

##### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

Owning celestial body (Earth by default).

#### Returns

`Vehicle`

#### Example

```ts
const vehicle = new Vehicle({
 name: "Vehicle-1",
 model: { url: "/models/ChandraXrayObservatory.glb", minimumPixelSize: 48 },
 text: { text: "Vehicle-1" },
 sensors: { type: SensorType.EllipticalCone, range: 120_000, apertureDeg: 10 },
});
vehicle.position = Daisy.Cartesian3.fromDegrees(121.5, 31.2, 30);
vehicle.bindViewer(viewer);
```

#### Overrides

[`FreeObject`](PW.FreeObject.md).[`constructor`](PW.FreeObject.md#constructor)

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`_celestialEllipsoid`](PW.FreeObject.md#_celestialellipsoid)

***

### \_entity

> **\_entity**: [`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`_entity`](PW.FreeObject.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`isDestroyed`](PW.FreeObject.md#isdestroyed)

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

Get the host Entity, used for attaching Features, interaction events, updates, and more.

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`entity`](PW.FreeObject.md#entity)

***

### id

#### Get Signature

> **get** **id**(): `string`

##### Returns

`string`

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`id`](PW.FreeObject.md#id)

***

### options

#### Get Signature

> **get** **options**(): [`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

The original snapshot of the object creation and configuration parameters. Different subclasses may extend its structure.

Note: this is the source of the semantic configuration, not the rendered result. Rendering is applied by _applyConfig together with Features and Components.

##### Returns

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`options`](PW.FreeObject.md#options)

***

### orientation

#### Get Signature

> **get** **orientation**(): `Property` \| `Quaternion` \| `undefined`

##### Returns

`Property` \| `Quaternion` \| `undefined`

#### Set Signature

> **set** **orientation**(`value`): `void`

Conveniently set orientation by writing the host Entity.orientation.

##### Parameters

###### value

`Property` \| `Quaternion` \| `undefined`

##### Returns

`void`

***

### position

#### Get Signature

> **get** **position**(): [`ObjectPositon`](../types/PW.ObjectPositon.md)

Set the object position, supporting static coordinates or sampled trajectories.

- The value is synchronized to the host entity.position after assignment.
- For a CelestialEntity (a non-Earth celestial body), TrajectorySample values that use an inertial frame are not supported.

##### Example

```ts
vehicle.position = Daisy.Cartesian3.fromDegrees(121.5, 31.2, 30);
```

##### Returns

[`ObjectPositon`](../types/PW.ObjectPositon.md)

#### Set Signature

> **set** **position**(`value`): `void`

Conveniently set position, supporting static coordinates or sampled trajectories.

##### Parameters

###### value

[`ObjectPositon`](../types/PW.ObjectPositon.md)

##### Returns

`void`

#### Overrides

[`FreeObject`](PW.FreeObject.md).[`position`](PW.FreeObject.md#position)

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

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`addComponent`](PW.FreeObject.md#addcomponent)

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`addLink`](PW.FreeObject.md#addlink)

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

***

### addSensor()

> **addSensor**(`options?`): [`Sensor`](PW.Sensor.md)

Add a physical sensor component.

Vehicle sensors default to TO_FRONT.
Applications can override the mount direction with `emitDirection`.

#### Parameters

##### options?

[`SensorOptions`](../types/PW.SensorOptions.md) = `{}`

#### Returns

[`Sensor`](PW.Sensor.md)

#### Example

```ts
import * as Daisy from "daisy-space-sdk";

const vehicle = new Daisy.PW.Vehicle({ name: "Vehicle-1" });
vehicle.bindViewer(viewer);

// 默认 TO_FRONT
vehicle.addSensor({ apertureDeg: { xDeg: 12, yDeg: 6 }, beamLength: 200_000 });

// 覆盖安装方向
vehicle.addSensor({ emitDirection: Daisy.EmitDirection.TO_UP, apertureDeg: 10, beamLength: 120_000 });
```

#### Overrides

[`FreeObject`](PW.FreeObject.md).[`addSensor`](PW.FreeObject.md#addsensor)

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

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`bindEngine`](PW.FreeObject.md#bindengine)

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

[`FreeObject`](PW.FreeObject.md).[`destroy`](PW.FreeObject.md#destroy)

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

[`FreeObject`](PW.FreeObject.md).[`getComponentById`](PW.FreeObject.md#getcomponentbyid)

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

[`FreeObject`](PW.FreeObject.md).[`getComponentByName`](PW.FreeObject.md#getcomponentbyname)

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

[`FreeObject`](PW.FreeObject.md).[`getComponents`](PW.FreeObject.md#getcomponents)

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

Get the local orientation at the current simulation time.

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`getCurrentOrientation`](PW.FreeObject.md#getcurrentorientation)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

Get the real-time position at the current simulation time.

If position is a TrajectorySample, it is evaluated at the engine current time;
if it is a static Cartesian3, it is returned directly.

#### Returns

`Cartesian3` \| `undefined`

World coordinates at the current time, or undefined when evaluation is not possible.

#### Overrides

[`FreeObject`](PW.FreeObject.md).[`getCurrentPosition`](PW.FreeObject.md#getcurrentposition)

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

[`FreeObject`](PW.FreeObject.md).[`getOrientationAtTime`](PW.FreeObject.md#getorientationattime)

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

[`FreeObject`](PW.FreeObject.md).[`getPosition`](PW.FreeObject.md#getposition)

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

[`FreeObject`](PW.FreeObject.md).[`getPositionAtTime`](PW.FreeObject.md#getpositionattime)

***

### getPropulsion()

> **getPropulsion**(`idOrName`): [`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Parameters

##### idOrName

`string`

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

***

### getPropulsions()

> **getPropulsions**(): [`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md)[]

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

[`FreeObject`](PW.FreeObject.md).[`getTransformAtTime`](PW.FreeObject.md#gettransformattime)

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

[`FreeObject`](PW.FreeObject.md).[`getTransformMatrixAtTime`](PW.FreeObject.md#gettransformmatrixattime)

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

[`FreeObject`](PW.FreeObject.md).[`register`](PW.FreeObject.md#register)

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

[`FreeObject`](PW.FreeObject.md).[`removeComponentById`](PW.FreeObject.md#removecomponentbyid)

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

[`FreeObject`](PW.FreeObject.md).[`removeComponentByName`](PW.FreeObject.md#removecomponentbyname)

***

### removePropulsion()

> **removePropulsion**(`idOrName`): `void`

#### Parameters

##### idOrName

`string`

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

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`resetTemporalState`](PW.FreeObject.md#resettemporalstate)

***

### setOptions()

> **setOptions**(`config`): `void`

Update configuration and rebuild the corresponding Feature according to policy.

#### Parameters

##### config

[`VehicleConfig`](../types/PW.VehicleConfig.md)

New configuration.

#### Returns

`void`

#### Example

```ts
obj.setOptions({ text: { text: "Updated" } });
```

#### Overrides

[`FreeObject`](PW.FreeObject.md).[`setOptions`](PW.FreeObject.md#setoptions)

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

[`FreeObject`](PW.FreeObject.md).[`unregister`](PW.FreeObject.md#unregister)

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

[`FreeObject`](PW.FreeObject.md).[`update`](PW.FreeObject.md#update)

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

[`FreeObject`](PW.FreeObject.md).[`offClick`](PW.FreeObject.md#offclick)

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

[`FreeObject`](PW.FreeObject.md).[`offDblClick`](PW.FreeObject.md#offdblclick)

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

[`FreeObject`](PW.FreeObject.md).[`offMouseEnter`](PW.FreeObject.md#offmouseenter)

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

[`FreeObject`](PW.FreeObject.md).[`offMouseLeave`](PW.FreeObject.md#offmouseleave)

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

[`FreeObject`](PW.FreeObject.md).[`onBeforeDestroy`](PW.FreeObject.md#onbeforedestroy)

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

[`FreeObject`](PW.FreeObject.md).[`onBeforeRegister`](PW.FreeObject.md#onbeforeregister)

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

[`FreeObject`](PW.FreeObject.md).[`onBeforeUnregister`](PW.FreeObject.md#onbeforeunregister)

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

[`FreeObject`](PW.FreeObject.md).[`onBeforeUpdate`](PW.FreeObject.md#onbeforeupdate)

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

[`FreeObject`](PW.FreeObject.md).[`onClick`](PW.FreeObject.md#onclick)

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

[`FreeObject`](PW.FreeObject.md).[`onDblClick`](PW.FreeObject.md#ondblclick)

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

[`FreeObject`](PW.FreeObject.md).[`onDestroy`](PW.FreeObject.md#ondestroy)

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

[`FreeObject`](PW.FreeObject.md).[`onMouseEnter`](PW.FreeObject.md#onmouseenter)

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

[`FreeObject`](PW.FreeObject.md).[`onMouseLeave`](PW.FreeObject.md#onmouseleave)

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

[`FreeObject`](PW.FreeObject.md).[`onRegister`](PW.FreeObject.md#onregister)

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

[`FreeObject`](PW.FreeObject.md).[`onUnregister`](PW.FreeObject.md#onunregister)

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

[`FreeObject`](PW.FreeObject.md).[`onUpdate`](PW.FreeObject.md#onupdate)
