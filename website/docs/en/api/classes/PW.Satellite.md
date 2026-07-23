[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Satellite

# Class: Satellite

Satellite: Semantic alias for NearEarthOrbiter.

The semantics are closer to “satellite”, making it easier to distinguish related objects such as SpaceStation / Debris / Satellite in application code.

## Example

```ts
import * as Daisy from "daisy-space-sdk";

const sat = new Daisy.PW.Satellite({ name: "STARLINK-1008", enableSpg4Propagation: true });
const tle = await sat.loadTleByNoradId(44714, 6 * 3600);
sat.setTle(tle);
sat.bindViewer(viewer);
```

## Extends

- [`NearEarthOrbiter`](PW.NearEarthOrbiter.md)

## Constructors

### Constructor

> **new Satellite**(`options?`, `celestialEllipsoid?`): `Satellite`

Creates a NearEarthOrbiter.

#### Parameters

##### options?

[`NearEarthOrbiterConfig`](../types/PW.NearEarthOrbiterConfig.md)

Configuration (includes orbit source and propagation strategy)

##### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md) = `...`

Parent celestial body (default Earth)

#### Returns

`Satellite`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`constructor`](PW.NearEarthOrbiter.md#constructor)

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`_celestialEllipsoid`](PW.NearEarthOrbiter.md#_celestialellipsoid)

***

### \_entity

> **\_entity**: [`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`_entity`](PW.NearEarthOrbiter.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`isDestroyed`](PW.NearEarthOrbiter.md#isdestroyed)

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

Gets the host Entity (for mounting Features, interaction events, updates, etc.).

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`entity`](PW.NearEarthOrbiter.md#entity)

***

### options

#### Get Signature

> **get** **options**(): [`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

Raw snapshot of object creation/configuration parameters (subclasses extend the structure).

Note: This is the source of the “semantic configuration”, not the rendered result. Rendering is completed by _applyConfig + Feature/Component.

##### Returns

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`options`](PW.NearEarthOrbiter.md#options)

***

### orientation

#### Get Signature

> **get** **orientation**(): `Property` \| `Quaternion` \| `undefined`

##### Returns

`Property` \| `Quaternion` \| `undefined`

#### Set Signature

> **set** **orientation**(`value`): `void`

Convenient orientation setter (writes to host Entity.orientation).

##### Parameters

###### value

`Property` \| `Quaternion` \| `undefined`

##### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`orientation`](PW.NearEarthOrbiter.md#orientation)

***

### position

#### Get Signature

> **get** **position**(): [`ObjectPositon`](../types/PW.ObjectPositon.md)

Sets the object position (supports static coordinates or sampled trajectories).

- Writes to host entity.position after assignment
- CelestialEntity (non-Earth bodies) does not allow TrajectorySample in inertial frame

##### Example

```ts
vehicle.position = Daisy.Cartesian3.fromDegrees(121.5, 31.2, 30);
```

##### Returns

[`ObjectPositon`](../types/PW.ObjectPositon.md)

#### Set Signature

> **set** **position**(`value`): `void`

Convenient position setter (supports static coordinates or sampled trajectories).

##### Parameters

###### value

[`ObjectPositon`](../types/PW.ObjectPositon.md)

##### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`position`](PW.NearEarthOrbiter.md#position)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addComponent`](PW.NearEarthOrbiter.md#addcomponent)

***

### addGroundTrack()

> **addGroundTrack**(`options?`): [`GroundTrackComponent`](PW.GroundTrackComponent.md)

Adds a real-time ground track component.

#### Parameters

##### options?

[`GroundTrackComponentOptions`](../types/PW.GroundTrackComponentOptions.md) = `{}`

#### Returns

[`GroundTrackComponent`](PW.GroundTrackComponent.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addGroundTrack`](PW.NearEarthOrbiter.md#addgroundtrack)

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addLink`](PW.NearEarthOrbiter.md#addlink)

***

### addOrbitElementsView()

> **addOrbitElementsView**(`options?`): [`OrbitElementsViewComponent`](PW.OrbitElementsViewComponent.md)

Adds an orbital elements view component.

#### Parameters

##### options?

[`OrbitElementsViewComponentOptions`](../types/PW.OrbitElementsViewComponentOptions.md) = `{}`

#### Returns

[`OrbitElementsViewComponent`](PW.OrbitElementsViewComponent.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addOrbitElementsView`](PW.NearEarthOrbiter.md#addorbitelementsview)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addPropulsion`](PW.NearEarthOrbiter.md#addpropulsion)

***

### addRealtimeOrbit()

> **addRealtimeOrbit**(`options?`): [`RealtimeOrbitComponent`](PW.RealtimeOrbitComponent.md)

Adds a real-time orbit component.

#### Parameters

##### options?

[`RealtimeOrbitComponentOptions`](../types/PW.RealtimeOrbitComponentOptions.md) = `{}`

#### Returns

[`RealtimeOrbitComponent`](PW.RealtimeOrbitComponent.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addRealtimeOrbit`](PW.NearEarthOrbiter.md#addrealtimeorbit)

***

### addSensor()

> **addSensor**(`options?`): [`Sensor`](PW.Sensor.md)

Adds a sensor.

Notes:
- Orbital targets typically expect the sensor to be “mounted at the origin of the body coordinate system”
- Injects a default position so the sensor is unaffected by object position write strategies

#### Parameters

##### options?

[`SensorOptions`](../types/PW.SensorOptions.md) = `{}`

#### Returns

[`Sensor`](PW.Sensor.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addSensor`](PW.NearEarthOrbiter.md#addsensor)

***

### applyEphemerisTrajectory()

> **applyEphemerisTrajectory**(...`args`): [`TrajectorySample`](TrajectorySample.md)

Legacy name compatibility entry.

#### Parameters

##### args

...\[[`NearEarthOrbiterEphemerisRequest`](../types/PW.NearEarthOrbiterEphemerisRequest.md) & `object`\]

#### Returns

[`TrajectorySample`](TrajectorySample.md)

#### Overrides

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`applyEphemerisTrajectory`](PW.NearEarthOrbiter.md#applyephemeristrajectory)

***

### applyTrajectory()

> **applyTrajectory**(...`args`): [`TrajectorySample`](TrajectorySample.md)

Shortcut entry for writing trajectory samples.

#### Parameters

##### args

...\[[`NearEarthOrbiterTrajectoryRequest`](../types/PW.NearEarthOrbiterTrajectoryRequest.md)\]

#### Returns

[`TrajectorySample`](TrajectorySample.md)

#### Overrides

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`applyTrajectory`](PW.NearEarthOrbiter.md#applytrajectory)

***

### bindEngine()

> **bindEngine**(`engine`): `void`

Binds to Engine and completes registration.

Additional behavior:
- If auto-trajectory is not disabled and an orbit source exists, automatically executes `applyTrajectory()` after binding

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`bindEngine`](PW.NearEarthOrbiter.md#bindengine)

***

### buildEphemerisTrajectory()

> **buildEphemerisTrajectory**(`params`): [`TrajectorySample`](TrajectorySample.md)

Builds ephemeris trajectory samples (TrajectorySample) over a time range.

Notes:
- This method drives the target through “offline sampling + interpolation”
- If real-time propagation is enabled, this method is optional

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`buildEphemerisTrajectory`](PW.NearEarthOrbiter.md#buildephemeristrajectory)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`calculateEphemeris`](PW.NearEarthOrbiter.md#calculateephemeris)

***

### clearEphemerisCache()

> **clearEphemerisCache**(): `void`

Clears the ephemeris cache.

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`clearEphemerisCache`](PW.NearEarthOrbiter.md#clearephemeriscache)

***

### destroy()

> **destroy**(): `void`

Destroys the object (cleans up interaction listeners, destroys components, destroys host entity, releases event manager).

#### Returns

`void`

#### Example

```ts
obj.destroy();
```

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`destroy`](PW.NearEarthOrbiter.md#destroy)

***

### getComponentById()

> **getComponentById**(`id?`): [`Component`](../types/PW.Component.md)[]

Gets component list by id (theoretically globally unique, but returns an array for historical compatibility).

#### Parameters

##### id?

`string`

Component id

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getComponentById`](PW.NearEarthOrbiter.md#getcomponentbyid)

***

### getComponentByName()

> **getComponentByName**(`name?`): [`Component`](../types/PW.Component.md)[]

Gets component list by name.

#### Parameters

##### name?

`string`

Component name (component.name)

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getComponentByName`](PW.NearEarthOrbiter.md#getcomponentbyname)

***

### getComponents()

> **getComponents**(`type?`): [`Component`](../types/PW.Component.md)[]

Gets the component list.

#### Parameters

##### type?

`string`

Component type (corresponds to component.type); if not passed, returns all.

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getComponents`](PW.NearEarthOrbiter.md#getcomponents)

***

### getCurrentOrbitState()

> **getCurrentOrbitState**(`options?`): [`NearEarthOrbiterState`](../types/PW.NearEarthOrbiterState.md) \| `null`

Gets the orbital state at the current simulation time.

#### Parameters

##### options?

###### observerLocation?

\[`number`, `number`, `number`\]

###### velocitySampleSeconds?

`number`

#### Returns

[`NearEarthOrbiterState`](../types/PW.NearEarthOrbiterState.md) \| `null`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getCurrentOrbitState`](PW.NearEarthOrbiter.md#getcurrentorbitstate)

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

Gets the local orientation at the current simulation time.

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getCurrentOrientation`](PW.NearEarthOrbiter.md#getcurrentorientation)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

Gets the real-time position at the current simulation time.

If position is a TrajectorySample, evaluates at the engine's current time;
If it's a static Cartesian3, returns directly.

#### Returns

`Cartesian3` \| `undefined`

World coordinates at the current time, or undefined (if evaluation fails)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getCurrentPosition`](PW.NearEarthOrbiter.md#getcurrentposition)

***

### getEphemeris()

> **getEphemeris**(`params?`): `any`[] \| `undefined`

Gets the currently computed and cached ephemeris data.

If params are provided, returns cached result only if consistent with current cache parameters; does not trigger recalculation.

#### Parameters

##### params?

[`NearEarthOrbiterEphemerisRequest`](../types/PW.NearEarthOrbiterEphemerisRequest.md)

#### Returns

`any`[] \| `undefined`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getEphemeris`](PW.NearEarthOrbiter.md#getephemeris)

***

### getEphemerisCache()

> **getEphemerisCache**(): [`NearEarthOrbiterEphemerisCache`](../types/PW.NearEarthOrbiterEphemerisCache.md) \| `undefined`

Gets the current ephemeris cache metadata.

#### Returns

[`NearEarthOrbiterEphemerisCache`](../types/PW.NearEarthOrbiterEphemerisCache.md) \| `undefined`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getEphemerisCache`](PW.NearEarthOrbiter.md#getephemeriscache)

***

### getOrbitDefinition()

> **getOrbitDefinition**(): `unknown`

Gets the current orbit definition.

#### Returns

`unknown`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getOrbitDefinition`](PW.NearEarthOrbiter.md#getorbitdefinition)

***

### getOrbitElements()

> **getOrbitElements**(): `OrbitElements`

Parses the orbital elements of the current orbit definition.

#### Returns

`OrbitElements`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getOrbitElements`](PW.NearEarthOrbiter.md#getorbitelements)

***

### getOrbitMetadata()

> **getOrbitMetadata**(): `OrbitMetadata`

Parses the metadata of the current orbit definition.

#### Returns

`OrbitMetadata`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getOrbitMetadata`](PW.NearEarthOrbiter.md#getorbitmetadata)

***

### getOrbitStateAtTime()

> **getOrbitStateAtTime**(`time`, `options?`): [`NearEarthOrbiterState`](../types/PW.NearEarthOrbiterState.md) \| `null`

Gets the orbital state at a specified simulation time (position/orientation/instantaneous orbital elements).

#### Parameters

##### time

`JulianDate`

##### options?

###### observerLocation?

\[`number`, `number`, `number`\]

###### velocitySampleSeconds?

`number`

#### Returns

[`NearEarthOrbiterState`](../types/PW.NearEarthOrbiterState.md) \| `null`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getOrbitStateAtTime`](PW.NearEarthOrbiter.md#getorbitstateattime)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getOrientationAtTime`](PW.NearEarthOrbiter.md#getorientationattime)

***

### getPosition()

> **getPosition**(`time`): `Cartesian3` \| `undefined`

Gets the position at a specified time (delegates to host entity.getPosition).

#### Parameters

##### time

`JulianDate`

Simulation time

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getPosition`](PW.NearEarthOrbiter.md#getposition)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getPositionAtTime`](PW.NearEarthOrbiter.md#getpositionattime)

***

### getPropulsion()

> **getPropulsion**(`idOrName`): [`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Parameters

##### idOrName

`string`

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getPropulsion`](PW.NearEarthOrbiter.md#getpropulsion)

***

### getPropulsions()

> **getPropulsions**(): [`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getPropulsions`](PW.NearEarthOrbiter.md#getpropulsions)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getTransformAtTime`](PW.NearEarthOrbiter.md#gettransformattime)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getTransformMatrixAtTime`](PW.NearEarthOrbiter.md#gettransformmatrixattime)

***

### getTransits()

> **getTransits**(`params`): `any`[]

Computes satellite transit windows (based on current orbit source).

The `start/end` in the return value are millisecond timestamps, usable directly as `Date` or `JulianDate`.

#### Parameters

##### params

[`NearEarthOrbiterTransitRequest`](../types/PW.NearEarthOrbiterTransitRequest.md)

#### Returns

`any`[]

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getTransits`](PW.NearEarthOrbiter.md#gettransits)

***

### getVisibilityWindows()

> **getVisibilityWindows**(`params`): `number`[][]

Computes visibility windows (returns [startMs, endMs] list only).

#### Parameters

##### params

`Omit`\<[`NearEarthOrbiterTransitRequest`](../types/PW.NearEarthOrbiterTransitRequest.md), `"minElevationDeg"` \| `"maxTransits"`\>

#### Returns

`number`[][]

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getVisibilityWindows`](PW.NearEarthOrbiter.md#getvisibilitywindows)

***

### loadTleByNameFromGroup()

> **loadTleByNameFromGroup**(`params`): `Promise`\<`string` \| `undefined`\>

Fuzzy-matches by name in the group list and writes to the current object.

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`loadTleByNameFromGroup`](PW.NearEarthOrbiter.md#loadtlebynamefromgroup)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`loadTleByNoradId`](PW.NearEarthOrbiter.md#loadtlebynoradid)

***

### loadTleGroup()

> **loadTleGroup**(`groupName`, `cacheLifeSeconds?`): `Promise`\<`string`[]\>

Fetches a TLE list by group (with caching).

#### Parameters

##### groupName

`string`

##### cacheLifeSeconds?

`number`

#### Returns

`Promise`\<`string`[]\>

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`loadTleGroup`](PW.NearEarthOrbiter.md#loadtlegroup)

***

### observeAtTime()

> **observeAtTime**(`time`, `observerLocation?`): `any`

Computes single-point observation result at a specified simulation time.

#### Parameters

##### time

`JulianDate`

##### observerLocation?

\[`number`, `number`, `number`\]

#### Returns

`any`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`observeAtTime`](PW.NearEarthOrbiter.md#observeattime)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`register`](PW.NearEarthOrbiter.md#register)

***

### removeComponentById()

> **removeComponentById**(`id`): `void`

Removes component by id (calls destroy first).

#### Parameters

##### id

`string`

Component id

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`removeComponentById`](PW.NearEarthOrbiter.md#removecomponentbyid)

***

### removeComponentByName()

> **removeComponentByName**(`name`): `void`

Removes component by name (calls destroy first).

#### Parameters

##### name

`string`

Component name

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`removeComponentByName`](PW.NearEarthOrbiter.md#removecomponentbyname)

***

### removePropulsion()

> **removePropulsion**(`idOrName`): `void`

#### Parameters

##### idOrName

`string`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`removePropulsion`](PW.NearEarthOrbiter.md#removepropulsion)

***

### resetTemporalState()

> **resetTemporalState**(`time?`): `void`

Resets cross-frame/cross-time-loop runtime state.

Engine calls this method when detecting simulation time going backward. It does not destroy business configuration, only
BaseObject's own time value cache, and propagates reset to mounted components.

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`resetTemporalState`](PW.NearEarthOrbiter.md#resettemporalstate)

***

### setOptions()

> **setOptions**(`config`): `void`

Updates configuration (rebuilds corresponding Features per strategy).

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`setOptions`](PW.NearEarthOrbiter.md#setoptions)

***

### setOrbitDefinition()

> **setOrbitDefinition**(`source`): `this`

Sets the orbit definition (preferred entry).

#### Parameters

##### source

`unknown`

#### Returns

`this`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`setOrbitDefinition`](PW.NearEarthOrbiter.md#setorbitdefinition)

***

### setOrbitSource()

> **setOrbitSource**(`source`): `void`

Sets a general orbit source.

#### Parameters

##### source

`unknown`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`setOrbitSource`](PW.NearEarthOrbiter.md#setorbitsource)

***

### setSpg4PropagationEnabled()

> **setSpg4PropagationEnabled**(`enabled`): `void`

Enables/disables real-time propagation.

#### Parameters

##### enabled

`boolean`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`setSpg4PropagationEnabled`](PW.NearEarthOrbiter.md#setspg4propagationenabled)

***

### setTle()

> **setTle**(`tle`): `void`

Sets TLE (legacy compatibility entry).

#### Parameters

##### tle

`string` \| `string`[]

Two-line or three-line TLE (string or string array)

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`setTle`](PW.NearEarthOrbiter.md#settle)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`unregister`](PW.NearEarthOrbiter.md#unregister)

***

### update()

> **update**(`time`): `void`

Per-frame update:
- Optional real-time propagation: updates position by simulation time
- Optional velocity orientation: auto-updates orientation when position is a trajectory sample

#### Parameters

##### time

`JulianDate`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`update`](PW.NearEarthOrbiter.md#update)

## Events

### offClick()

> **offClick**(`handler?`): `void`

Removes the object click event listener.
 click

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`offClick`](PW.NearEarthOrbiter.md#offclick)

***

### offDblClick()

> **offDblClick**(`handler?`): `void`

Removes the object double-click event listener.
 dblclick

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`offDblClick`](PW.NearEarthOrbiter.md#offdblclick)

***

### offMouseEnter()

> **offMouseEnter**(`handler?`): `void`

Removes the object mouse enter event listener.
 mouseenter

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`offMouseEnter`](PW.NearEarthOrbiter.md#offmouseenter)

***

### offMouseLeave()

> **offMouseLeave**(`handler?`): `void`

Removes the object mouse leave event listener.
 mouseleave

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`offMouseLeave`](PW.NearEarthOrbiter.md#offmouseleave)

***

### onBeforeDestroy()

> **onBeforeDestroy**(`callback`): `void`

Listens for the pre-destruction event.
 BEFORE_DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onBeforeDestroy`](PW.NearEarthOrbiter.md#onbeforedestroy)

***

### onBeforeRegister()

> **onBeforeRegister**(`callback`): `void`

Listens for the pre-registration event.
 BEFORE_REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onBeforeRegister`](PW.NearEarthOrbiter.md#onbeforeregister)

***

### onBeforeUnregister()

> **onBeforeUnregister**(`callback`): `void`

Listens for the pre-unregistration event.
 BEFORE_UNREGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onBeforeUnregister`](PW.NearEarthOrbiter.md#onbeforeunregister)

***

### onBeforeUpdate()

> **onBeforeUpdate**(`callback`): `void`

Listens for the pre-update event.
 BEFORE_UPDATE

#### Parameters

##### callback

(`time`) => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onBeforeUpdate`](PW.NearEarthOrbiter.md#onbeforeupdate)

***

### onClick()

> **onClick**(`handler`): `void`

Listens for the object click event.
 click

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onClick`](PW.NearEarthOrbiter.md#onclick)

***

### onDblClick()

> **onDblClick**(`handler`): `void`

Listens for the object double-click event.
 dblclick

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onDblClick`](PW.NearEarthOrbiter.md#ondblclick)

***

### onDestroy()

> **onDestroy**(`callback`): `void`

Listens for the destruction event.
 DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onDestroy`](PW.NearEarthOrbiter.md#ondestroy)

***

### onMouseEnter()

> **onMouseEnter**(`handler`): `void`

Listens for the object mouse enter event.
 mouseenter

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onMouseEnter`](PW.NearEarthOrbiter.md#onmouseenter)

***

### onMouseLeave()

> **onMouseLeave**(`handler`): `void`

Listens for the object mouse leave event.
 mouseleave

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onMouseLeave`](PW.NearEarthOrbiter.md#onmouseleave)

***

### onRegister()

> **onRegister**(`callback`): `void`

Listens for the registration completion event.
 REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onRegister`](PW.NearEarthOrbiter.md#onregister)

***

### onUnregister()

> **onUnregister**(`callback`): `void`

Listens for the unregistration event.
 UNREGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onUnregister`](PW.NearEarthOrbiter.md#onunregister)

***

### onUpdate()

> **onUpdate**(`callback`): `void`

Listens for the update event.
 UPDATE

#### Parameters

##### callback

(`time`) => `void`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onUpdate`](PW.NearEarthOrbiter.md#onupdate)
