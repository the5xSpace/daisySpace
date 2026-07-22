[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Entity

# Class: Entity

Daisy Entity.

- Feature lifecycle management (registration/unregistration)
- Runtime state: trajectory, orientation, occlusion/frustum checks
- Interaction event integration with Daisy Engine

## Constructors

### Constructor

> **new Entity**(`name?`, `options?`): `Entity`

Create a Daisy Entity.

#### Parameters

##### name?

`string` = `""`

Entity name, defaults to empty string

##### options?

Optional configuration

###### id?

`string`

Custom entity id, auto-generates GUID if not provided

#### Returns

`Entity`

#### Example

```ts
const entity = new Entity("卫星A");
const entity2 = new Entity("卫星B", { id: "sat-b" });
```

## Properties

### celestialEllipsoid

> **celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

***

### isBehindCamera

> **isBehindCamera**: `boolean` = `false`

Whether behind the camera

***

### isInCameraCullingVolume

> **isInCameraCullingVolume**: `boolean` = `false`

Whether within the camera view frustum

***

### isOccludedByEarth

> **isOccludedByEarth**: `boolean` = `false`

Whether occluded by the Earth

***

### lastPosition

> **lastPosition**: `Cartesian3` \| `undefined`

***

### lastUpdateSimTime

> **lastUpdateSimTime**: `JulianDate` \| `undefined`

***

### lastVelocity

> **lastVelocity**: `Cartesian3` \| `undefined`

***

### matrix

> **matrix**: `Matrix4` = `Daisy.Matrix4.IDENTITY`

***

### previousFrameState

> **previousFrameState**: [`EntityTimeState`](../interfaces/EntityTimeState.md) \| `undefined`

***

### transformer

> **transformer**: `Transformer`

***

### updateGroup

> **updateGroup**: `number` \| `undefined`

***

### ~~viewer~~

> **viewer**: [`Engine`](Engine.md) \| `undefined`

Compatible with old naming: use `engine` instead.

#### Deprecated

Use engine instead

***

### viewForm

> **viewForm**: `Cartesian3` = `Daisy.Cartesian3.ZERO`

## Accessors

### activated

#### Get Signature

> **get** **activated**(): `boolean`

Get whether in active state.

##### Returns

`boolean`

#### Set Signature

> **set** **activated**(`value`): `void`

Set whether in active state.

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### bodyAxis

#### Get Signature

> **get** **bodyAxis**(): `BodyAxis` \| `undefined`

Get the body axis debug object (only exists when enabled and in 3D mode).

##### Returns

`BodyAxis` \| `undefined`

***

### bodyAxisVectors

#### Get Signature

> **get** **bodyAxisVectors**(): `object`

Get the entity body axis vectors (normalized x/y/z).

##### Returns

`object`

###### x

> **x**: `Cartesian3`

###### y

> **y**: `Cartesian3`

###### z

> **z**: `Cartesian3`

***

### boundingSphereRadius

#### Get Signature

> **get** **boundingSphereRadius**(): `number`

Get bounding sphere radius.

##### Returns

`number`

***

### customProperties

#### Get Signature

> **get** **customProperties**(): `Record`\<`string`, `any`\> \| `undefined`

Get custom attributes.

##### Returns

`Record`\<`string`, `any`\> \| `undefined`

#### Set Signature

> **set** **customProperties**(`value`): `void`

Set entity custom attributes.

##### Parameters

###### value

`Record`\<`string`, `any`\> \| `undefined`

##### Returns

`void`

***

### description

#### Get Signature

> **get** **description**(): `string` \| `undefined`

Get description.

##### Returns

`string` \| `undefined`

#### Set Signature

> **set** **description**(`value`): `void`

Set entity description.

##### Parameters

###### value

`string` \| `undefined`

##### Returns

`void`

***

### engine

#### Get Signature

> **get** **engine**(): [`Engine`](Engine.md) \| `undefined`

New naming alias: synchronized with `viewer`, preferred for new code.

##### Returns

[`Engine`](Engine.md) \| `undefined`

#### Set Signature

> **set** **engine**(`value`): `void`

##### Parameters

###### value

[`Engine`](Engine.md) \| `undefined`

##### Returns

`void`

***

### hovered

#### Get Signature

> **get** **hovered**(): `boolean`

Get whether in hover state.

##### Returns

`boolean`

#### Set Signature

> **set** **hovered**(`value`): `void`

Set whether in hover state.

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### interaction

#### Get Signature

> **get** **interaction**(): `InteractionComponent`

Get the interaction component (for picking, hover, click, and other state management).

##### Returns

`InteractionComponent`

***

### name

#### Get Signature

> **get** **name**(): `string`

Get entity name.

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

Set entity name.

##### Parameters

###### value

`string`

##### Returns

`void`

***

### orientation

#### Get Signature

> **get** **orientation**(): `Property` \| `Quaternion` \| `undefined`

Get entity orientation property

##### Returns

`Property` \| `Quaternion` \| `undefined`

#### Set Signature

> **set** **orientation**(`value`): `void`

Set entity orientation property

##### Parameters

###### value

`Property` \| `Quaternion` \| `undefined`

##### Returns

`void`

***

### parentId

#### Get Signature

> **get** **parentId**(): `string` \| `undefined`

Get parent entity id.

##### Returns

`string` \| `undefined`

#### Set Signature

> **set** **parentId**(`value`): `void`

Set parent entity id (triggers parent-child relationship synchronization).

##### Parameters

###### value

`string` \| `undefined`

##### Returns

`void`

***

### position

#### Get Signature

> **get** **position**(): `EntityPositions`

Get entity position property (not real-time position)

##### Returns

`EntityPositions`

#### Set Signature

> **set** **position**(`position`): `void`

Set entity position property, typically a TrajectorySample or Cartesian3. This is the key property for simulation scenes, used to update entity position.

##### Parameters

###### position

`EntityPositions`

Entity position property, typically a TrajectorySample or Cartesian3

##### Returns

`void`

***

### show

#### Get Signature

> **get** **show**(): `boolean`

Get entity display property, typically a boolean. This is a key property for simulation scenes, used to control whether the entity is visible.

##### Returns

`boolean`

#### Set Signature

> **set** **show**(`value`): `void`

Set entity display property, typically a boolean. This is a key property for simulation scenes, used to control whether the entity is visible.

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### viewDistanceConst

#### Get Signature

> **get** **viewDistanceConst**(): [`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

Get the view distance configuration

##### Returns

[`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

***

### viewFrom

#### Get Signature

> **get** **viewFrom**(): `Cartesian3` \| `undefined`

Get camera follow view offset

##### Returns

`Cartesian3` \| `undefined`

#### Set Signature

> **set** **viewFrom**(`value`): `void`

Set camera follow view offset

##### Parameters

###### value

`Cartesian3` \| `undefined`

##### Returns

`void`

***

### worldMatrix

#### Get Signature

> **get** **worldMatrix**(): `Matrix4`

Get the current world matrix (prefer using cached currentMatrix).

##### Returns

`Matrix4`

## Methods

### \_hasContinuousUpdateDemandAt()

> **\_hasContinuousUpdateDemandAt**(`time`): `boolean`

Determine if there is a hit internal continuous update requirement at the current time.

#### Parameters

##### time

`JulianDate`

Current simulation time

#### Returns

`boolean`

***

### \_registerContinuousUpdateDemand()

> **\_registerContinuousUpdateDemand**(`demand`, `token?`): `string`

Register an internal scheduling demand that "this frame must update the entity".

Description:
- This is an internal priority hook for components/features, not a regular business API
- When any demand returns true at the current time, the scheduler skips regular displacement throttling and directly executes the entity update

#### Parameters

##### demand

`EntityContinuousUpdateDemand`

Given the current simulation time, returns whether this frame must be updated

##### token?

`string`

Optional stable identifier; auto-generated if not provided

#### Returns

`string`

The actually written token

***

### \_unregisterContinuousUpdateDemand()

> **\_unregisterContinuousUpdateDemand**(`token?`): `void`

Cancel internal scheduling demand registration.

#### Parameters

##### token?

`string`

The demand token returned during registration

#### Returns

`void`

***

### activateForValidTime()

> **activateForValidTime**(): `void`

Time valid: rebuild the scene runtime and restore Feature registration.

#### Returns

`void`

***

### addAvailabilityInterval()

> **addAvailabilityInterval**(`interval`): `this`

#### Parameters

##### interval

`TimeInterval`

#### Returns

`this`

***

### addFeature()

> **addFeature**(`feature`): [`Feature`](Feature.md)

Add component

#### Parameters

##### feature

[`Feature`](Feature.md)

Feature instance to add

#### Returns

[`Feature`](Feature.md)

Added (or already existing) Feature instance

#### Example

```ts
const feature = new PW.ModelFeature({ url: "/model.glb" });
entity.addFeature(feature);
```

***

### bindEngine()

> **bindEngine**(`engine`): `Entity`

Bind to Engine and complete registration.

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`Entity`

***

### ~~bindViewer()~~

> **bindViewer**(`viewer`): `Entity`

Compatible with old naming: bind to Engine and complete registration.

#### Parameters

##### viewer

[`Engine`](Engine.md)

#### Returns

`Entity`

#### Deprecated

Use bindEngine instead

***

### checkIsBehindCamera()

> **checkIsBehindCamera**(`satPos`, `camera?`): `boolean`

Whether behind the camera

#### Parameters

##### satPos

`Cartesian3`

##### camera?

`Camera`

#### Returns

`boolean`

***

### checkTimeValid()

> **checkTimeValid**(`time`): `boolean`

Check if the entity is within the valid time range at the specified time.

#### Parameters

##### time

`JulianDate`

Simulation time

#### Returns

`boolean`

Returns true if time is valid, false if outside available range

***

### clearAvailability()

> **clearAvailability**(): `this`

#### Returns

`this`

***

### computeModelMatrix()

> **computeModelMatrix**(`state`): `Matrix4`

Calculate model matrix

#### Parameters

##### state

[`EntityTimeState`](../interfaces/EntityTimeState.md)

#### Returns

`Matrix4`

***

### deactivateForInvalidTime()

> **deactivateForInvalidTime**(): `void`

When time is invalid, release the current scene runtime but preserve business entity objects and Feature configuration.

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Entity destruction

#### Returns

`void`

***

### getAvailability()

> **getAvailability**(): `TimeIntervalCollection` \| `undefined`

#### Returns

`TimeIntervalCollection` \| `undefined`

***

### ~~getBoundBoxFeature()~~

> **getBoundBoxFeature**(`options?`): [`BoundBoxFeature`](BoundBoxFeature.md)

#### Parameters

##### options?

`Partial`\<[`BoundBoxOptions`](../interfaces/BoundBoxOptions.md)\>

#### Returns

[`BoundBoxFeature`](BoundBoxFeature.md)

#### Deprecated

Please use [Entity.getOrCreateBoundBoxFeature](#getorcreateboundboxfeature).

***

### getBoundingSphere()

> **getBoundingSphere**(`time?`): `BoundingSphere`

Get the bounding sphere at the specified time (center prefers frame-correlated position).

#### Parameters

##### time?

`JulianDate`

Simulation time

#### Returns

`BoundingSphere`

***

### getBoundingSphereRadius()

> **getBoundingSphereRadius**(): `number`

Get bounding sphere radius (calculated based on BoundBoxFeature).

#### Returns

`number`

***

### getCurrentMatrix()

> **getCurrentMatrix**(): `Matrix4` \| `undefined`

Get the current frame's model matrix (prefer using render cache).

#### Returns

`Matrix4` \| `undefined`

The 4x4 model matrix for the current frame, returns undefined if cache is unavailable

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

Get the current frame's entity position (ECEF coordinates).

#### Returns

`Cartesian3` \| `undefined`

The current frame's position, returns undefined if no valid state

***

### getCurrentPositionECEF()

> **getCurrentPositionECEF**(): `Cartesian3` \| `undefined`

Get the current frame's entity ECEF (Earth-Centered, Earth-Fixed) position.

#### Returns

`Cartesian3` \| `undefined`

The current frame's ECEF position, returns undefined if no valid state

***

### getCurrentState()

> **getCurrentState**(): [`EntityTimeState`](../interfaces/EntityTimeState.md)

Get current state

#### Returns

[`EntityTimeState`](../interfaces/EntityTimeState.md)

***

### getCurrentTime()

> **getCurrentTime**(): `JulianDate`

Get current time

#### Returns

`JulianDate`

***

### getFeatureById()

> **getFeatureById**(`id`): [`IFeature`](../interfaces/IFeature.md) \| `undefined`

#### Parameters

##### id

`string`

#### Returns

[`IFeature`](../interfaces/IFeature.md) \| `undefined`

***

### getFeatureByName()

> **getFeatureByName**(`name`): [`IFeature`](../interfaces/IFeature.md) \| `undefined`

#### Parameters

##### name

`string`

#### Returns

[`IFeature`](../interfaces/IFeature.md) \| `undefined`

***

### getFeatures()

> **getFeatures**(): [`IFeature`](../interfaces/IFeature.md)[]

#### Returns

[`IFeature`](../interfaces/IFeature.md)[]

***

### getFrameAwarePosition()

> **getFrameAwarePosition**(`time`): `Cartesian3` \| `undefined`

#### Parameters

##### time

`JulianDate`

#### Returns

`Cartesian3` \| `undefined`

***

### getId()

> **getId**(): `string`

Get the entity unique identifier id.

#### Returns

`string`

Entity id string

***

### getMatrix()

> **getMatrix**(): `Matrix4`

Get the entity simulation Transform matrix (driven by Transformer, passively responding to transformations).

#### Returns

`Matrix4`

The currently applied 4x4 model matrix, returns identity matrix when no Transformer is present

***

### getOrCreateBoundBoxFeature()

> **getOrCreateBoundBoxFeature**(`options?`): [`BoundBoxFeature`](BoundBoxFeature.md)

Get or create a BoundBoxFeature strongly bound to the current Entity (singleton).

- Entity automatically creates it on demand internally; external manual add/remove of BoundBoxFeature is not allowed
- Returns the same instance, ensuring global singleton semantics

#### Parameters

##### options?

`Partial`\<[`BoundBoxOptions`](../interfaces/BoundBoxOptions.md)\>

Optional: parameters to merge when creating/updating

#### Returns

[`BoundBoxFeature`](BoundBoxFeature.md)

BoundBoxFeature instance

#### Example

```ts
const box = entity.getOrCreateBoundBoxFeature({
 dimensions: new Daisy.Cartesian3(200, 200, 200),
 shape: "ball",
});
box.onClick(() => console.log("bound box clicked"));
```

***

### getParent()

> **getParent**(): `Entity` \| `undefined`

Get parent entity (if resolvable).

#### Returns

`Entity` \| `undefined`

***

### getPosition()

> **getPosition**(`time`): `Cartesian3` \| `undefined`

Get entity position at the specified time (Cartesian coordinates).

#### Parameters

##### time

`JulianDate`

Simulation time

#### Returns

`Cartesian3` \| `undefined`

Entity position at the specified time, returns undefined if not resolvable

***

### getPositionByTime()

> **getPositionByTime**(`time`): `Cartesian3` \| `undefined`

#### Parameters

##### time

`JulianDate`

#### Returns

`Cartesian3` \| `undefined`

***

### getReferenceEntity()

> **getReferenceEntity**(`ref`): `Entity` \| `undefined`

#### Parameters

##### ref

[`REF`](../enums/REF.md)

#### Returns

`Entity` \| `undefined`

***

### getShowValue()

> **getShowValue**(`time?`, `visitedIds?`): `boolean`

Get the display value at the specified time (considering parent-child chain and available time range).

#### Parameters

##### time?

`JulianDate`

Simulation time (defaults to current time if omitted)

##### visitedIds?

`Set`\<`string`\>

#### Returns

`boolean`

***

### getTimes()

> **getTimes**(): `JulianDate`[]

Get the time collection from the Daisy trajectory sample object; static position returns empty array.

#### Returns

`JulianDate`[]

***

### getWorldMatrix()

> **getWorldMatrix**(`time?`): `Matrix4`

Get the world matrix at the specified time.

#### Parameters

##### time?

`JulianDate`

Simulation time

#### Returns

`Matrix4`

***

### hasUnthrottleableFeature()

> **hasUnthrottleableFeature**(): `boolean`

Determine if the entity currently contains at least one non-throttleable Feature.

#### Returns

`boolean`

***

### isOccludedByCelestialEllipsoid()

> **isOccludedByCelestialEllipsoid**(`positionECEF`, `time?`, `camera?`): `boolean`

#### Parameters

##### positionECEF

`Cartesian3`

##### time?

`JulianDate`

##### camera?

`Camera`

#### Returns

`boolean`

***

### isOccludedEllipsoid()

> **isOccludedEllipsoid**(`positionECEF`, `ellipsoid?`, `camera?`): `boolean`

Check if occluded by ellipsoid

#### Parameters

##### positionECEF

`Cartesian3`

##### ellipsoid?

`Ellipsoid` = `ELLIPSOID.EARTH_WGS84`

##### camera?

`Camera`

#### Returns

`boolean`

***

### isTrajectorySample()

> **isTrajectorySample**(): `boolean`

Determine if the entity position is a trajectory sample, generally not needed externally, for internal use

#### Returns

`boolean`

***

### isTrajectorySampleBodyFixed()

> **isTrajectorySampleBodyFixed**(): `boolean`

Determine if the entity position is a trajectory sample in the celestial body fixed coordinate system.

#### Returns

`boolean`

***

### LODAnyCameraInDistanceDisplayCondition()

> **LODAnyCameraInDistanceDisplayCondition**(`positionECEF`, `ddc?`): `boolean`

#### Parameters

##### positionECEF

`Cartesian3`

##### ddc?

`DistanceDisplayCondition`

#### Returns

`boolean`

***

### LODAnyCameraWithinMaxDistance()

> **LODAnyCameraWithinMaxDistance**(`positionECEF`, `maxDistance?`): `boolean`

#### Parameters

##### positionECEF

`Cartesian3`

##### maxDistance?

`number`

#### Returns

`boolean`

***

### LODCheckPassHandler()

> **LODCheckPassHandler**(`positionECEF`): `boolean`

#### Parameters

##### positionECEF

`Cartesian3`

#### Returns

`boolean`

***

### LODInCameraCullingVolume()

> **LODInCameraCullingVolume**(`positionECEF`): `boolean`

LOD check whether within the camera view frustum

#### Parameters

##### positionECEF

`Cartesian3`

#### Returns

`boolean`

***

### LODIsOccludedEarth()

> **LODIsOccludedEarth**(`positionECEF`): `boolean`

LOD check whether occluded by the Earth

#### Parameters

##### positionECEF

`Cartesian3`

#### Returns

`boolean`

***

### receiveFeatureEvent()

> **receiveFeatureEvent**(`event`, `payload?`): `void`

Receive "upward submission" interaction events from Features and convert them to Entity's own events.

Normally does not need to be called manually; when a Feature enables `enableSubmitToEntity(true)`,
Feature's click/dblclick/mouseenter/mouseleave events are automatically submitted here.

#### Parameters

##### event

`string`

Event name (e.g., "click" / "dblclick" / "mouseenter" / "mouseleave")

##### payload?

`any`

Event payload, usually from scene interaction picking results.

#### Returns

`void`

void

#### Example

```ts
entity.onClick((e) => {
 console.log("entity clicked", e.featureType, e.featureId);
});

feature.enableSubmitToEntity(true);
```

***

### removeFeature()

> **removeFeature**(`feature`): `void`

Remove component

#### Parameters

##### feature

[`Feature`](Feature.md)

Feature instance to remove

#### Returns

`void`

#### Example

```ts
const feature = entity.getFeatureByName("__model");
if (feature) entity.removeFeature(feature as any);
```

***

### removeFeatureById()

> **removeFeatureById**(`id`): `void`

#### Parameters

##### id

`string`

#### Returns

`void`

***

### removeFeatureByName()

> **removeFeatureByName**(`name`): `void`

#### Parameters

##### name

`string`

#### Returns

`void`

***

### removePath()

> **removePath**(): `void`

Remove fast path, only effective in TrajectorySample position mode

#### Returns

`void`

***

### resetTemporalState()

> **resetTemporalState**(`_time?`): `void`

#### Parameters

##### \_time?

`JulianDate`

#### Returns

`void`

***

### setAvailabilityIntervals()

> **setAvailabilityIntervals**(`intervals`): `this`

#### Parameters

##### intervals

`TimeInterval`[]

#### Returns

`this`

***

### setBodyAxis()

> **setBodyAxis**(`options`): `void`

Set entity body axis, only effective in 3D mode, for debugging only

#### Parameters

##### options

`BodyAxisOptions`

#### Returns

`void`

***

### setBodyAxisVectors()

> **setBodyAxisVectors**(`value`): `void`

Set entity body axis vectors (input vectors will be normalized).

#### Parameters

##### value

x/y/z axis vectors

###### x

`Cartesian3`

###### y

`Cartesian3`

###### z

`Cartesian3`

#### Returns

`void`

***

### setBoundBoxDebugVisible()

> **setBoundBoxDebugVisible**(`visible`): [`BoundBoxFeature`](BoundBoxFeature.md)

Set BoundBoxFeature debug visualization state (show/hide).

#### Parameters

##### visible

`boolean`

true to show; false to hide

#### Returns

[`BoundBoxFeature`](BoundBoxFeature.md)

BoundBoxFeature instance

#### Example

```ts
entity.setBoundBoxDebugVisible(true);
```

***

### setParent()

> **setParent**(`parent?`): `this`

Set parent entity (Entity or id).

#### Parameters

##### parent?

`string` \| `Entity`

Parent entity or parent entity id

#### Returns

`this`

***

### setPath()

> **setPath**(`path`): `void`

Set a fast trajectory line for the trajectory sample position.

Auto-optimization is enabled by default, adjusting sampling interval and point count based on entity count, speed, and camera scale.

#### Parameters

##### path

`EntityPathOptions`

#### Returns

`void`

#### Example

```ts
entity.setPath({
 historySecond: 3600,
 futureSecond: 7200,
 width: 2,
 historyColor: Daisy.Color.BLUE,
 futureColor: Daisy.Color.GREEN.withAlpha(0.5),
});
```

***

### setShowProperty()

> **setShowProperty**(`showProperty`): `void`

Set display property, can pass a boolean or a dynamic property implementing `getValue(time)`.

#### Parameters

##### showProperty

`any`

Display property

#### Returns

`void`

***

### supportsInertialSample()

> **supportsInertialSample**(): `boolean`

Whether coordinate system is supported

#### Returns

`boolean`

boolean

***

### tryGetWorldMatrix()

> **tryGetWorldMatrix**(`time`): `Matrix4` \| `undefined`

Attempt to get the world matrix at the specified time (returns undefined if necessary state is missing).

#### Parameters

##### time

`JulianDate`

Simulation time

#### Returns

`Matrix4` \| `undefined`

## Events

### offClick()

> **offClick**(`handler?`): `this`

Unlisten to Entity click event.

#### Parameters

##### handler?

(`e`) => `void`

Optional: specify the callback to remove; if not provided, removes all listeners for this event.

#### Returns

`this`

this
 click

***

### offDblClick()

> **offDblClick**(`handler?`): `this`

Unlisten to Entity double-click event.

#### Parameters

##### handler?

(`e`) => `void`

Optional: specify the callback to remove; if not provided, removes all listeners for this event.

#### Returns

`this`

this
 dblclick

***

### offMouseEnter()

> **offMouseEnter**(`handler?`): `this`

Unlisten to Entity mouse enter event.

#### Parameters

##### handler?

(`e`) => `void`

Optional: specify the callback to remove; if not provided, removes all listeners for this event.

#### Returns

`this`

this
 mouseenter

***

### offMouseLeave()

> **offMouseLeave**(`handler?`): `this`

Unlisten to Entity mouse leave event.

#### Parameters

##### handler?

(`e`) => `void`

Optional: specify the callback to remove; if not provided, removes all listeners for this event.

#### Returns

`this`

this
 mouseleave

***

### ~~onBeforeDestory()~~

> **onBeforeDestory**(`callback`): `void`

Historical alias of onBeforeDestroy (spelling preserved for compatibility).
 BEFORE_DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Deprecated

Use onBeforeDestroy instead

***

### onBeforeDestroy()

> **onBeforeDestroy**(`callback`): `void`

Listen for pre-destroy callback.
 BEFORE_DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onBeforeRegister()

> **onBeforeRegister**(`callback`): `void`

Listen for pre-registration callback.
 BEFORE_REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onBeforeUpdate()

> **onBeforeUpdate**(`callback`): `void`

Listen for pre-update callback.
 BEFORE_UPDATE

#### Parameters

##### callback

(`spaceObject`, `time`) => `void`

#### Returns

`void`

***

### onClick()

> **onClick**(`handler`): `this`

Listen to Entity click event.

- Can come from picking the entity itself (comType === "Entity")
- Can also come from Feature's upward event submission (Feature.enableSubmitToEntity)

#### Parameters

##### handler

(`e`) => `void`

Callback function

#### Returns

`this`

this
 click

#### Example

```ts
entity.onClick((e) => {
 console.log("clicked", e.entityId, e.featureType);
});
```

***

### onDblClick()

> **onDblClick**(`handler`): `this`

Listen to Entity double-click event.

#### Parameters

##### handler

(`e`) => `void`

Callback function

#### Returns

`this`

this
 dblclick

***

### ~~onDestory()~~

> **onDestory**(`callback`): `void`

Historical alias of onDestroy (spelling preserved for compatibility).
 DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Deprecated

Use onDestroy instead

***

### onDestroy()

> **onDestroy**(`callback`): `void`

Listen for destroy callback.
 DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onMouseEnter()

> **onMouseEnter**(`handler`): `this`

Listen to Entity mouse enter event.

#### Parameters

##### handler

(`e`) => `void`

Callback function

#### Returns

`this`

this
 mouseenter

***

### onMouseLeave()

> **onMouseLeave**(`handler`): `this`

Listen to Entity mouse leave event.

#### Parameters

##### handler

(`e`) => `void`

Callback function

#### Returns

`this`

this
 mouseleave

***

### onRegister()

> **onRegister**(`callback`): `void`

Listen to registration callback.
 REGISTER

#### Parameters

##### callback

(`spaceObject`) => `void`

#### Returns

`void`

***

### onSelected()

> **onSelected**(`callback`): `void`

Selection event

#### Parameters

##### callback

(`e`) => `void`

#### Returns

`void`

selected

***

### onUnSelected()

> **onUnSelected**(`callback`): `void`

Deselection event

#### Parameters

##### callback

(`e`) => `void`

#### Returns

`void`

unSelected

***

### onUpdate()

> **onUpdate**(`callback`): `void`

Listen for update callback.
 UPDATE

#### Parameters

##### callback

(`spaceObject`, `time`) => `void`

#### Returns

`void`
