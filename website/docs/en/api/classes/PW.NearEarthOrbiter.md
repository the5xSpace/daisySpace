[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / NearEarthOrbiter

# Class: NearEarthOrbiter

NearEarthOrbiter: Near-Earth orbit targets (satellites/space stations/debris, etc.).

Capabilities:
- Fetch TLE by NORAD Catalog Number (with caching)
- Accept general orbit source inputs (TLE / OMM XML / JSON GP)
- Real-time propagation using general orbit sources (optional)
- Build ephemeris sampling trajectories (TrajectorySample) over a time range

## Example

```ts
import * as Daisy from "daisy-space-sdk";

const sat = new Daisy.PW.NearEarthOrbiter({
 name: "STARLINK-1008",
 enableSpg4Propagation: true,
});
const tle = await sat.loadTleByNoradId(44714, 6 * 3600);
sat.setTle(tle);
sat.bindViewer(viewer);
```

## Extends

- [`Aircraft`](PW.Aircraft.md)

## Extended by

- [`Satellite`](PW.Satellite.md)

## Constructors

### Constructor

> **new NearEarthOrbiter**(`options?`, `celestialEllipsoid?`): `NearEarthOrbiter`

Creates a NearEarthOrbiter.

#### Parameters

##### options?

[`NearEarthOrbiterConfig`](../types/PW.NearEarthOrbiterConfig.md)

Configuration (including orbit source and propagation strategy)

##### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md) = `...`

Host celestial body (default: Earth)

#### Returns

`NearEarthOrbiter`

#### Overrides

[`Aircraft`](PW.Aircraft.md).[`constructor`](PW.Aircraft.md#constructor)

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`_celestialEllipsoid`](PW.Aircraft.md#_celestialellipsoid)

***

### \_entity

> **\_entity**: [`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`_entity`](PW.Aircraft.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`isDestroyed`](PW.Aircraft.md#isdestroyed)

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

Gets the host Entity (used for mounting Features, interaction events, updates, etc.).

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`entity`](PW.Aircraft.md#entity)

***

### options

#### Get Signature

> **get** **options**(): [`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

Raw snapshot of object creation/configuration parameters (extended by different subclasses).

Note: This is the source of "semantic configuration", not the rendered result. Rendering is completed by _applyConfig + Feature/Component.

##### Returns

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`options`](PW.Aircraft.md#options)

***

### orientation

#### Get Signature

> **get** **orientation**(): `Property` \| `Quaternion` \| `undefined`

##### Returns

`Property` \| `Quaternion` \| `undefined`

#### Set Signature

> **set** **orientation**(`value`): `void`

Convenience setter for orientation (writes to host Entity.orientation).

##### Parameters

###### value

`Property` \| `Quaternion` \| `undefined`

##### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`orientation`](PW.Aircraft.md#orientation)

***

### position

#### Get Signature

> **get** **position**(): [`ObjectPositon`](../types/PW.ObjectPositon.md)

Sets object position (supports static coordinates or sampling trajectories).

- Synchronized to host entity.position after assignment
- TrajectorySample with inertial frame support is not allowed for CelestialEntity (non-Earth celestial bodies)

##### Example

```ts
vehicle.position = Daisy.Cartesian3.fromDegrees(121.5, 31.2, 30);
```

##### Returns

[`ObjectPositon`](../types/PW.ObjectPositon.md)

#### Set Signature

> **set** **position**(`value`): `void`

Convenience setter for position (supports static coordinates or sampling trajectories).

##### Parameters

###### value

[`ObjectPositon`](../types/PW.ObjectPositon.md)

##### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`position`](PW.Aircraft.md#position)

## Methods

### addComponent()

> **addComponent**\<`T`\>(`component`): `T`

Mounts a PhysicalWorld component to the current object.

Note: Features should still be mounted via Entity.addFeature(); this method is for IComponent only.

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

[`Aircraft`](PW.Aircraft.md).[`addComponent`](PW.Aircraft.md#addcomponent)

***

### addGroundTrack()

> **addGroundTrack**(`options?`): [`GroundTrackComponent`](PW.GroundTrackComponent.md)

Adds a real ground-track scrolling trajectory component.

#### Parameters

##### options?

[`GroundTrackComponentOptions`](../types/PW.GroundTrackComponentOptions.md) = `{}`

#### Returns

[`GroundTrackComponent`](PW.GroundTrackComponent.md)

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`addLink`](PW.Aircraft.md#addlink)

***

### addOrbitElementsView()

> **addOrbitElementsView**(`options?`): [`OrbitElementsViewComponent`](PW.OrbitElementsViewComponent.md)

Adds an orbit elements geometry view component.

#### Parameters

##### options?

[`OrbitElementsViewComponentOptions`](../types/PW.OrbitElementsViewComponentOptions.md) = `{}`

#### Returns

[`OrbitElementsViewComponent`](PW.OrbitElementsViewComponent.md)

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

[`Aircraft`](PW.Aircraft.md).[`addPropulsion`](PW.Aircraft.md#addpropulsion)

***

### addRealtimeOrbit()

> **addRealtimeOrbit**(`options?`): [`RealtimeOrbitComponent`](PW.RealtimeOrbitComponent.md)

Adds a real-time orbit ring component.

#### Parameters

##### options?

[`RealtimeOrbitComponentOptions`](../types/PW.RealtimeOrbitComponentOptions.md) = `{}`

#### Returns

[`RealtimeOrbitComponent`](PW.RealtimeOrbitComponent.md)

***

### addSensor()

> **addSensor**(`options?`): [`Sensor`](PW.Sensor.md)

Adds a sensor.

Notes:
- Orbiting targets usually want sensors "mounted at the body frame origin"
- A default position is injected here so the sensor is not affected by object position write strategies

#### Parameters

##### options?

[`SensorOptions`](../types/PW.SensorOptions.md) = `{}`

#### Returns

[`Sensor`](PW.Sensor.md)

#### Overrides

[`Aircraft`](PW.Aircraft.md).[`addSensor`](PW.Aircraft.md#addsensor)

***

### applyEphemerisTrajectory()

> **applyEphemerisTrajectory**(`params`): [`TrajectorySample`](TrajectorySample.md)

Legacy compatibility entry point.

#### Parameters

##### params

[`NearEarthOrbiterEphemerisRequest`](../types/PW.NearEarthOrbiterEphemerisRequest.md) & `object`

#### Returns

[`TrajectorySample`](TrajectorySample.md)

#### Example

```ts
sat.applyTrajectory({ stepSeconds: 30 });
```

***

### applyTrajectory()

> **applyTrajectory**(`params?`): [`TrajectorySample`](TrajectorySample.md)

Shorthand entry point for writing trajectory samples.

Default behavior:
- Automatically uses the current scene's start/end time
- `stepSeconds` defaults to 600

#### Parameters

##### params?

[`NearEarthOrbiterTrajectoryRequest`](../types/PW.NearEarthOrbiterTrajectoryRequest.md)

#### Returns

[`TrajectorySample`](TrajectorySample.md)

#### Example

```ts
sat.applyTrajectory();
sat.applyTrajectory({ stepSeconds: 30 });
```

***

### bindEngine()

> **bindEngine**(`engine`): `void`

Binds to the Engine and completes registration.

Additional behavior:
- If automatic trajectory is not explicitly disabled and an orbit source already exists, executes `applyTrajectory()` once after binding

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`void`

#### Overrides

[`Aircraft`](PW.Aircraft.md).[`bindEngine`](PW.Aircraft.md#bindengine)

***

### buildEphemerisTrajectory()

> **buildEphemerisTrajectory**(`params`): [`TrajectorySample`](TrajectorySample.md)

Builds ephemeris trajectory sampling (TrajectorySample) over a time range.

Notes:
- This method drives the target via "offline sampling + interpolation"
- You can choose not to use this method if you have enabled real-time propagation

#### Parameters

##### params

[`NearEarthOrbiterEphemerisRequest`](../types/PW.NearEarthOrbiterEphemerisRequest.md) & `object`

#### Returns

[`TrajectorySample`](TrajectorySample.md)

#### Example

```ts
const traj = sat.buildEphemerisTrajectory({
 startTime,
 endTime: stopTime,
 intervalSeconds: 30,
 trajectoryOptions: { interpolationAlgorithm: "LAGRANGE", interpolationDegree: 5 },
});
sat.position = traj as any;
sat.orientation = traj.getVelocityOrientation() as any;
```

***

### calculateEphemeris()

> **calculateEphemeris**(`params`): `any`[]

Gets ephemeris calculation results over a time range (without building TrajectorySample).

#### Parameters

##### params

[`NearEarthOrbiterEphemerisRequest`](../types/PW.NearEarthOrbiterEphemerisRequest.md)

#### Returns

`any`[]

#### Example

```ts
const ephemeris = sat.calculateEphemeris({ startTime, endTime: stopTime, intervalSeconds: 30 });
console.log(ephemeris[0]);
```

***

### clearEphemerisCache()

> **clearEphemerisCache**(): `void`

Clears the ephemeris cache.

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Destroys the object (cleans up interaction listeners, destroys components, destroys the host entity, and releases the event manager).

#### Returns

`void`

#### Example

```ts
obj.destroy();
```

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`destroy`](PW.Aircraft.md#destroy)

***

### getComponentById()

> **getComponentById**(`id?`): [`Component`](../types/PW.Component.md)[]

Gets the component list by id (theoretically globally unique, but returns an array for backward compatibility).

#### Parameters

##### id?

`string`

Component ID

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getComponentById`](PW.Aircraft.md#getcomponentbyid)

***

### getComponentByName()

> **getComponentByName**(`name?`): [`Component`](../types/PW.Component.md)[]

Gets the component list by name.

#### Parameters

##### name?

`string`

Component name (component.name)

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getComponentByName`](PW.Aircraft.md#getcomponentbyname)

***

### getComponents()

> **getComponents**(`type?`): [`Component`](../types/PW.Component.md)[]

Gets the component list.

#### Parameters

##### type?

`string`

Component type (corresponding to component.type); returns all if not provided

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getComponents`](PW.Aircraft.md#getcomponents)

***

### getCurrentOrbitState()

> **getCurrentOrbitState**(`options?`): [`NearEarthOrbiterState`](../types/PW.NearEarthOrbiterState.md) \| `null`

Gets the orbit state at the current simulation time.

#### Parameters

##### options?

###### observerLocation?

[`number`, `number`, `number`]

###### velocitySampleSeconds?

`number`

#### Returns

[`NearEarthOrbiterState`](../types/PW.NearEarthOrbiterState.md) \| `null`

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

Gets the local orientation at the current simulation time.

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getCurrentOrientation`](PW.Aircraft.md#getcurrentorientation)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

Gets the real-time position at the current simulation time.

If position is a TrajectorySample, it evaluates based on the engine's current time; if it's a static Cartesian3, it returns directly.

#### Returns

`Cartesian3` \| `undefined`

World coordinates at the current time, or undefined (when evaluation fails)

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getCurrentPosition`](PW.Aircraft.md#getcurrentposition)

***

### getEphemeris()

> **getEphemeris**(`params?`): `any`[] \| `undefined`

Gets the currently calculated and cached ephemeris data.

If params are provided, returns cached results only if they match current cache parameters; does not trigger recalculation.

#### Parameters

##### params?

[`NearEarthOrbiterEphemerisRequest`](../types/PW.NearEarthOrbiterEphemerisRequest.md)

#### Returns

`any`[] \| `undefined`

***

### getEphemerisCache()

> **getEphemerisCache**(): [`NearEarthOrbiterEphemerisCache`](../types/PW.NearEarthOrbiterEphemerisCache.md) \| `undefined`

Gets current ephemeris cache metadata.

#### Returns

[`NearEarthOrbiterEphemerisCache`](../types/PW.NearEarthOrbiterEphemerisCache.md) \| `undefined`

***

### getOrbitDefinition()

> **getOrbitDefinition**(): `unknown`

Gets the current orbit definition.

#### Returns

`unknown`

***

### getOrbitElements()

> **getOrbitElements**(): `OrbitElements`

Parses the orbit elements of the current orbit definition.

#### Returns

`OrbitElements`

***

### getOrbitMetadata()

> **getOrbitMetadata**(): `OrbitMetadata`

Parses the metadata of the current orbit definition.

#### Returns

`OrbitMetadata`

***

### getOrbitStateAtTime()

> **getOrbitStateAtTime**(`time`, `options?`): [`NearEarthOrbiterState`](../types/PW.NearEarthOrbiterState.md) \| `null`

Gets the orbit state (position/orientation/instantaneous orbit elements) at a specified simulation time.

#### Parameters

##### time

`JulianDate`

##### options?

###### observerLocation?

[`number`, `number`, `number`]

###### velocitySampleSeconds?

`number`

#### Returns

[`NearEarthOrbiterState`](../types/PW.NearEarthOrbiterState.md) \| `null`

***

### getOrientationAtTime()

> **getOrientationAtTime**(`timestamp`): [`Rotation`](../types/Rotation.md)

Gets the local orientation at a specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getOrientationAtTime`](PW.Aircraft.md#getorientationattime)

***

### getPosition()

> **getPosition**(`time`): `Cartesian3` \| `undefined`

Gets the position at a specified time (delegated to host entity.getPosition).

#### Parameters

##### time

`JulianDate`

Simulation time

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getPosition`](PW.Aircraft.md#getposition)

***

### getPositionAtTime()

> **getPositionAtTime**(`timestamp`): `Cartesian3` \| `undefined`

Gets the world position at a specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getPositionAtTime`](PW.Aircraft.md#getpositionattime)

***

### getPropulsion()

> **getPropulsion**(`idOrName`): [`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Parameters

##### idOrName

`string`

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getPropulsion`](PW.Aircraft.md#getpropulsion)

***

### getPropulsions()

> **getPropulsions**(): [`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getPropulsions`](PW.Aircraft.md#getpropulsions)

***

### getTransformAtTime()

> **getTransformAtTime**(`timestamp`): `BaseObjectResolvedTransform`

Gets the local orientation at a specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`BaseObjectResolvedTransform`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getTransformAtTime`](PW.Aircraft.md#gettransformattime)

***

### getTransformMatrixAtTime()

> **getTransformMatrixAtTime**(`timestamp`): `Matrix4`

Gets the local transformation matrix at a specified simulation time.

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`Matrix4`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getTransformMatrixAtTime`](PW.Aircraft.md#gettransformmatrixattime)

***

### getTransits()

> **getTransits**(`params`): `any`[]

Calculates satellite transit windows (satellite's own capability, based on current orbit source).

`start/end` in the return value are millisecond timestamps that can be directly converted to `Date` or `JulianDate`.

#### Parameters

##### params

[`NearEarthOrbiterTransitRequest`](../types/PW.NearEarthOrbiterTransitRequest.md)

#### Returns

`any`[]

***

### getVisibilityWindows()

> **getVisibilityWindows**(`params`): `number`[][]

Calculates visible windows (returns only [startMs, endMs] list).

#### Parameters

##### params

`Omit`\<[`NearEarthOrbiterTransitRequest`](../types/PW.NearEarthOrbiterTransitRequest.md), `"minElevationDeg"` \| `"maxTransits"`\>

#### Returns

`number`[][]

***

### loadTleByNameFromGroup()

> **loadTleByNameFromGroup**(`params`): `Promise`\<`string` \| `undefined`\>

Fuzzy matches by name in the group list and writes to the current object.

#### Parameters

##### params

###### cacheLifeSeconds?

`number`

###### groupName

`string`

###### nameLike

`string`

#### Returns

`Promise`\<`string` \| `undefined`\>

***

### loadTleByNoradId()

> **loadTleByNoradId**(`noradId`, `cacheLifeSeconds?`): `Promise`\<`string`\>

Fetches TLE by NORAD Catalog Number (with caching).

#### Parameters

##### noradId

`number`

NORAD Catalog Number

##### cacheLifeSeconds?

`number`

Cache lifetime (seconds)

#### Returns

`Promise`\<`string`\>

***

### loadTleGroup()

> **loadTleGroup**(`groupName`, `cacheLifeSeconds?`): `Promise`\<`string`[]\>

Fetches TLE list by group (with caching).

#### Parameters

##### groupName

`string`

##### cacheLifeSeconds?

`number`

#### Returns

`Promise`\<`string`[]\>

***

### observeAtTime()

> **observeAtTime**(`time`, `observerLocation?`): `any`

Calculates single-point observation results at a specified simulation time.

#### Parameters

##### time

`JulianDate`

##### observerLocation?

[`number`, `number`, `number`]

#### Returns

`any`

***

### register()

> **register**(): `void`

Registers the host entity into the Daisy pipeline (triggers entity.reRegisterAll).

#### Returns

`void`

#### Example

```ts
obj.register();
```

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`register`](PW.Aircraft.md#register)

***

### removeComponentById()

> **removeComponentById**(`id`): `void`

Removes component by id (will destroy first).

#### Parameters

##### id

`string`

Component ID

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`removeComponentById`](PW.Aircraft.md#removecomponentbyid)

***

### removeComponentByName()

> **removeComponentByName**(`name`): `void`

Removes component by name (will destroy first).

#### Parameters

##### name

`string`

Component name

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`removeComponentByName`](PW.Aircraft.md#removecomponentbyname)

***

### removePropulsion()

> **removePropulsion**(`idOrName`): `void`

#### Parameters

##### idOrName

`string`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`removePropulsion`](PW.Aircraft.md#removepropulsion)

***

### resetTemporalState()

> **resetTemporalState**(`time?`): `void`

Resets runtime state across frames/time loops.

Engine calls this method when simulation time rewind is detected. This does not destroy business configuration; it only cleans up BaseObject's own time value cache and forwards reset to mounted components.

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`resetTemporalState`](PW.Aircraft.md#resettemporalstate)

***

### setOptions()

> **setOptions**(`config`): `void`

Updates configuration (recreates corresponding Features according to strategy).

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

[`Aircraft`](PW.Aircraft.md).[`setOptions`](PW.Aircraft.md#setoptions)

***

### setOrbitDefinition()

> **setOrbitDefinition**(`source`): `this`

Sets orbit definition (preferred entry point).

#### Parameters

##### source

`unknown`

#### Returns

`this`

***

### setOrbitSource()

> **setOrbitSource**(`source`): `void`

Sets a general orbit source.

#### Parameters

##### source

`unknown`

#### Returns

`void`

***

### setSpg4PropagationEnabled()

> **setSpg4PropagationEnabled**(`enabled`): `void`

Enables/disables real-time propagation.

#### Parameters

##### enabled

`boolean`

#### Returns

`void`

***

### setTle()

> **setTle**(`tle`): `void`

Sets TLE (legacy compatibility entry point).

#### Parameters

##### tle

`string` \| `string`[]

Two or three line TLE (string or string array)

#### Returns

`void`

***

### unregister()

> **unregister**(): `void`

Unregisters: removes all Features mounted on the entity and notifies components to unbind.

#### Returns

`void`

#### Example

```ts
obj.unregister();
```

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`unregister`](PW.Aircraft.md#unregister)

***

### update()

> **update**(`time`): `void`

Per-frame updates:
- Optional real-time propagation: updates position by simulation time
- Optional velocity orientation: automatically updates orientation when position is a trajectory sample

#### Parameters

##### time

`JulianDate`

#### Returns

`void`

#### Overrides

[`Aircraft`](PW.Aircraft.md).[`update`](PW.Aircraft.md#update)

## Events

### offClick()

> **offClick**(`handler?`): `void`

Unsubscribes from object click events.
 click

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`offClick`](PW.Aircraft.md#offclick)

***

### offDblClick()

> **offDblClick**(`handler?`): `void`

Unsubscribes from object double-click events.
 dblclick

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`offDblClick`](PW.Aircraft.md#offdblclick)

***

### offMouseEnter()

> **offMouseEnter**(`handler?`): `void`

Unsubscribes from object mouse-enter events.
 mouseenter

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`offMouseEnter`](PW.Aircraft.md#offmouseenter)

***

### offMouseLeave()

> **offMouseLeave**(`handler?`): `void`

Unsubscribes from object mouse-leave events.
 mouseleave

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`offMouseLeave`](PW.Aircraft.md#offmouseleave)

***

### onBeforeDestroy()

> **onBeforeDestroy**(`callback`): `void`

Listens for pre-destroy events.
 BEFORE_DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`onBeforeDestroy`](PW.Aircraft.md#onbeforedestroy)

***

### onBeforeRegister()

> **onBeforeRegister**(`callback`): `void`

Listens for pre-register events.
 BEFORE_REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`onBeforeRegister`](PW.Aircraft.md#onbeforeregister)

***

### onBeforeUnregister()

> **onBeforeUnregister**(`callback`): `void`

Listens for pre-unregister events.
 BEFORE_UNREGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`onBeforeUnregister`](PW.Aircraft.md#onbeforeunregister)

***

### onBeforeUpdate()

> **onBeforeUpdate**(`callback`): `void`

Listens for pre-update events.
 BEFORE_UPDATE

#### Parameters

##### callback

(`time`) => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`onBeforeUpdate`](PW.Aircraft.md#onbeforeupdate)

***

### onClick()

> **onClick**(`handler`): `void`

Listens for object click events.
 click

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`onClick`](PW.Aircraft.md#onclick)

***

### onDblClick()

> **onDblClick**(`handler`): `void`

Listens for object double-click events.
 dblclick

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`onDblClick`](PW.Aircraft.md#ondblclick)

***

### onDestroy()

> **onDestroy**(`callback`): `void`

Listens for destroy events.
 DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`onDestroy`](PW.Aircraft.md#ondestroy)

***

### onMouseEnter()

> **onMouseEnter**(`handler`): `void`

Listens for object mouse-enter events.
 mouseenter

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`onMouseEnter`](PW.Aircraft.md#onmouseenter)

***

### onMouseLeave()

> **onMouseLeave**(`handler`): `void`

Listens for object mouse-leave events.
 mouseleave

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`onMouseLeave`](PW.Aircraft.md#onmouseleave)

***

### onRegister()

> **onRegister**(`callback`): `void`

Listens for register completion events.
 REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`onRegister`](PW.Aircraft.md#onregister)

***

### onUnregister()

> **onUnregister**(`callback`): `void`

Listens for unregister events.
 UNREGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`onUnregister`](PW.Aircraft.md#onunregister)

***

### onUpdate()

> **onUpdate**(`callback`): `void`

Listens for update events.
 UPDATE

#### Parameters

##### callback

(`time`) => `void`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`onUpdate`](PW.Aircraft.md#onupdate)