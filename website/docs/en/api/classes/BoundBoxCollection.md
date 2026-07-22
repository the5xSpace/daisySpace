[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BoundBoxCollection

# Class: BoundBoxCollection

BoundBoxCollection manages all BoundBoxFeature instances and provides collision detection and event dispatching.
- Only responsible for capability and event dispatching, not active scheduling.
- External code (e.g., engine) decides when to call triggerCollisionEvents.
- Supports collision detection

## Constructors

### Constructor

> **new BoundBoxCollection**(): `BoundBoxCollection`

#### Returns

`BoundBoxCollection`

## Properties

### enableBroadPhase

> **enableBroadPhase**: `boolean` = `true`

Conservative bounding sphere pre-check before OBB/SAT. Only filters out pairs that are guaranteed not to collide.

***

### enableCollisionDetection

> **enableCollisionDetection**: `boolean` = `true`

Collision detection toggle

***

### ~~forceDisableObbLimit~~

> **forceDisableObbLimit**: `number` = `Number.POSITIVE_INFINITY`

#### Deprecated

OBB/SAT serves as accuracy fallback and is no longer automatically disabled based on count.

***

### spatialHashThreshold

> **spatialHashThreshold**: `number` = `80`

When the number of objects reaches this threshold, spatial hashing is used to reduce candidate pairs.

***

### useObb

> **useObb**: `boolean` = `true`

OBB/SAT final precision detection toggle.

#### Remarks

To ensure collision detection accuracy, the current implementation always uses OBB/SAT as the fallback.
This field is retained for backward compatibility; setting it to false will not disable the final precision check.

## Accessors

### collisionDetectionFrequencyHz

#### Get Signature

> **get** **collisionDetectionFrequencyHz**(): `number`

Collision detections per second. Valid range 1-10; values above 10 are clamped to 10.

##### Returns

`number`

#### Set Signature

> **set** **collisionDetectionFrequencyHz**(`value`): `void`

##### Parameters

###### value

`number`

##### Returns

`void`

***

### maxCollisionDetectionInterval

#### Get Signature

> **get** **maxCollisionDetectionInterval**(): `number`

Backward-compatible: detection interval will not fall below 100ms to avoid exceeding 10Hz.

##### Returns

`number`

#### Set Signature

> **set** **maxCollisionDetectionInterval**(`value`): `void`

##### Parameters

###### value

`number`

##### Returns

`void`

## Methods

### addBox()

> **addBox**(`box`): `void`

Add a BoundBoxFeature to the collection

#### Parameters

##### box

[`BoundBoxFeature`](BoundBoxFeature.md)

#### Returns

`void`

***

### checkCollisions()

> **checkCollisions**(): `void`

Check pairwise collisions of all boxes and return the list of collision pairs

#### Returns

`void`

***

### clear()

> **clear**(): `void`

Clear the collection and events

#### Returns

`void`

***

### clearCollisionStates()

> **clearCollisionStates**(): `void`

Clear the current collision state of all bounding boxes in the collection.

Useful for batch start/stop, rebuild scenarios, or stress test count switching to prevent stale pair states from contaminating the next detection round.

#### Returns

`void`

***

### getStats()

> **getStats**(): [`BoundBoxCollisionStats`](../interfaces/BoundBoxCollisionStats.md)

#### Returns

[`BoundBoxCollisionStats`](../interfaces/BoundBoxCollisionStats.md)

***

### removeBox()

> **removeBox**(`box`): `void`

Remove a BoundBoxFeature from the collection

#### Parameters

##### box

[`BoundBoxFeature`](BoundBoxFeature.md)

#### Returns

`void`
