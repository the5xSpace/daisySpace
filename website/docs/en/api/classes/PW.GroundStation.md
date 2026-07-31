[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / GroundStation

# Class: GroundStation

GroundStation: a ground site or tracking station.

Semantic conventions:
- The default sensor mount direction is TO_UP (pointing skyward)
- Applications can override the mount direction with `addSensor({ emitDirection })`

## Example

```ts
import * as Daisy from "daisy-space-sdk";

const station = new Daisy.PW.GroundStation({ name: "GS-1", text: { text: "GS-1" } });
station.position = Daisy.Cartesian3.fromDegrees(116.39, 39.9, 0);
station.bindViewer(viewer);

// 站点上视传感器（默认 TO_UP）
station.addSensor({ apertureDeg: 12, beamLength: 200_000 });
```

## Extends

- [`Vehicle`](PW.Vehicle.md)

## Constructors

### Constructor

> **new GroundStation**(`options?`, `celestialEllipsoid?`): `GroundStation`

#### Parameters

##### options?

[`GroundStationConfig`](../types/PW.GroundStationConfig.md)

##### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Returns

`GroundStation`

#### Overrides

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

Get the host Entity, used for attaching Features, interaction events, updates, and more.

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`entity`](PW.Vehicle.md#entity)

***

### id

#### Get Signature

> **get** **id**(): `string`

##### Returns

`string`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`id`](PW.Vehicle.md#id)

***

### options

#### Get Signature

> **get** **options**(): [`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

The original snapshot of the object creation and configuration parameters. Different subclasses may extend its structure.

Note: this is the source of the semantic configuration, not the rendered result. Rendering is applied by _applyConfig together with Features and Components.

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

Conveniently set orientation by writing the host Entity.orientation.

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

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`position`](PW.Vehicle.md#position)

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

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`addSensor`](PW.Vehicle.md#addsensor)

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

[`Vehicle`](PW.Vehicle.md).[`bindEngine`](PW.Vehicle.md#bindengine)

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

[`Vehicle`](PW.Vehicle.md).[`destroy`](PW.Vehicle.md#destroy)

***

### getAntennaNodeNames()

> **getAntennaNodeNames**(): `string`[]

Get station model node names so applications can confirm controllable nodes.

#### Returns

`string`[]

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

[`Vehicle`](PW.Vehicle.md).[`getComponentById`](PW.Vehicle.md#getcomponentbyid)

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

[`Vehicle`](PW.Vehicle.md).[`getComponentByName`](PW.Vehicle.md#getcomponentbyname)

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

Get the real-time position at the current simulation time.

If position is a TrajectorySample, it is evaluated at the engine current time;
if it is a static Cartesian3, it is returned directly.

#### Returns

`Cartesian3` \| `undefined`

World coordinates at the current time, or undefined when evaluation is not possible.

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getCurrentPosition`](PW.Vehicle.md#getcurrentposition)

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

[`Vehicle`](PW.Vehicle.md).[`getOrientationAtTime`](PW.Vehicle.md#getorientationattime)

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

[`Vehicle`](PW.Vehicle.md).[`getPosition`](PW.Vehicle.md#getposition)

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

### getStationModel()

> **getStationModel**(): `any`

Get the station main-model Feature.

#### Returns

`any`

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

[`Vehicle`](PW.Vehicle.md).[`getTransformAtTime`](PW.Vehicle.md#gettransformattime)

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

[`Vehicle`](PW.Vehicle.md).[`getTransformMatrixAtTime`](PW.Vehicle.md#gettransformmatrixattime)

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

[`Vehicle`](PW.Vehicle.md).[`register`](PW.Vehicle.md#register)

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

[`Vehicle`](PW.Vehicle.md).[`removeComponentById`](PW.Vehicle.md#removecomponentbyid)

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

Engine calls this method when it detects that simulation time has moved backward. It does not destroy business configuration; it only clears the
BaseObject time-value cache and propagates the reset to attached components.

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`resetTemporalState`](PW.Vehicle.md#resettemporalstate)

***

### setAntennaPointing()

> **setAntennaPointing**(`azimuthDeg`, `elevationDeg`, `options?`): `boolean`

Set the station antenna azimuth and elevation attitude.

This method targets model-node control; true beam pointing should still be handled by the Sensor link.track.

#### Parameters

##### azimuthDeg

`number`

##### elevationDeg

`number`

##### options?

[`GroundStationAntennaPointingOptions`](../types/PW.GroundStationAntennaPointingOptions.md)

#### Returns

`boolean`

Returns true when the model is loaded and at least one target node was written successfully.

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

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`setOptions`](PW.Vehicle.md#setoptions)

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

[`Vehicle`](PW.Vehicle.md).[`unregister`](PW.Vehicle.md#unregister)

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

Listen for the event before destruction.
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

Listen for the event before registration.
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

Listen for the event before unregistration.
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

Listen for the event before an update.
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

Listen for destruction events.
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

Listen for registration-complete events.
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

Listen for unregistration events.
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
