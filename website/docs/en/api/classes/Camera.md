[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Camera

# Class: Camera

Camera management class
Used to manage camera operations in the scene, including entity tracking, frustum visualization, and other features

## Example

```ts
const camera = new Camera(viewer);
```

## Extended by

- [`ExtraCamera`](ExtraCamera.md)

## Properties

### id

> **id**: `string`

***

### viewer

> **viewer**: [`Engine`](Engine.md) \| `undefined`

Associated engine instance.

## Accessors

### isMainCamera

#### Get Signature

> **get** **isMainCamera**(): `boolean`

Whether this is the main camera

##### Returns

`boolean`

***

### trackedEntity

#### Get Signature

> **get** **trackedEntity**(): [`FollowTarget`](../types/FollowTarget.md) \| `undefined`

##### Returns

[`FollowTarget`](../types/FollowTarget.md) \| `undefined`

## Methods

### cameraToWorldCoordinates()

> **cameraToWorldCoordinates**(`cartesian`, `result?`): `Cartesian4`

Transforms a vector/point from the camera reference frame to world coordinates.

#### Parameters

##### cartesian

`Cartesian4`

Vector/point to transform (Cartesian4).

##### result?

`Cartesian4`

Output result reuse object.

#### Returns

`Cartesian4`

Transformed vector/point.

***

### cameraToWorldCoordinatesPoint()

> **cameraToWorldCoordinatesPoint**(`cartesian`, `result?`): `Cartesian3`

Transforms a point from the camera reference frame to world coordinates.

#### Parameters

##### cartesian

`Cartesian3`

Point to transform (Cartesian3).

##### result?

`Cartesian3`

Output result reuse object.

#### Returns

`Cartesian3`

Transformed point.

***

### cameraToWorldCoordinatesVector()

> **cameraToWorldCoordinatesVector**(`cartesian`, `result?`): `Cartesian3`

Transforms a vector from the camera reference frame to world coordinates.

#### Parameters

##### cartesian

`Cartesian3`

Vector to transform (Cartesian3).

##### result?

`Cartesian3`

Output result reuse object.

#### Returns

`Cartesian3`

Transformed vector.

***

### cancelFlight()

> **cancelFlight**(): `void`

Cancels the current camera flight, stopping at the current position (no effect if no flight is active).

#### Returns

`void`

***

### completeFlight()

> **completeFlight**(): `void`

Immediately completes the current camera flight, snapping to the flight destination (no effect if no flight is active).

#### Returns

`void`

***

### computeViewRectangle()

> **computeViewRectangle**(`ellipsoid?`, `result?`): `Rectangle` \| `undefined`

Computes the approximate visible rectangular area on the ellipsoid.

#### Parameters

##### ellipsoid?

`Ellipsoid`

The ellipsoid for which to compute the visible region. Defaults to Ellipsoid.WGS84.

##### result?

`Rectangle`

Output result reuse object.

#### Returns

`Rectangle` \| `undefined`

The visible rectangular area; returns undefined if the ellipsoid is not visible.

***

### destroy()

> **destroy**(): `void`

Destroys the camera management object.

#### Returns

`void`

#### Example

```ts
camera.destroy();
```

***

### distanceToBoundingSphere()

> **distanceToBoundingSphere**(`boundingSphere`): `number`

Gets the distance from the camera to the front surface of a bounding sphere.

#### Parameters

##### boundingSphere

`BoundingSphere`

Bounding sphere in world coordinates.

#### Returns

`number`

Distance value (meters).

***

### flyHome()

> **flyHome**(`duration?`): `void`

Flights the camera to the "home" view.

3D mode uses the default view rectangle; 2D / Columbus view displays the entire map.

#### Parameters

##### duration?

`number`

Flight duration in seconds. If not provided, estimated based on distance.

#### Returns

`void`

***

### flyTo()

> **flyTo**(`options`): `void`

Flights the camera from the current position to a new position or rectangular region.

#### Parameters

##### options

Flight parameters.

###### cancel?

`FlightCancelledCallback`

###### complete?

`FlightCompleteCallback`

###### convert?

`boolean`

###### destination

`Cartesian3` \| `Rectangle`

###### duration?

`number`

###### easingFunction?

`Callback`

###### endTransform?

`Matrix4`

###### flyOverLongitude?

`number`

###### flyOverLongitudeWeight?

`number`

###### maximumHeight?

`number`

###### orientation?

`any`

###### pitchAdjustHeight?

`number`

#### Returns

`void`

***

### flyToBoundingSphere()

> **flyToBoundingSphere**(`boundingSphere`, `options?`): `void`

Flights the camera to a position such that the current view contains the specified bounding sphere.

#### Parameters

##### boundingSphere

`BoundingSphere`

Bounding sphere in world coordinates.

##### options?

Flight parameters.

###### cancel?

`FlightCancelledCallback`

###### complete?

`FlightCompleteCallback`

###### duration?

`number`

###### easingFunction?

`Callback`

###### endTransform?

`Matrix4`

###### flyOverLongitude?

`number`

###### flyOverLongitudeWeight?

`number`

###### maximumHeight?

`number`

###### offset?

`HeadingPitchRange`

###### pitchAdjustHeight?

`number`

#### Returns

`void`

***

### flyToTarget()

> **flyToTarget**(`target`, `options?`): `Promise`\<`boolean`\>

Flights the camera to a target (the main camera delegates to the engine's default flight logic; extra cameras fly based on point sets).

Supports Daisy `Entity`, coordinate objects, coordinate collections, and async targets.

Conventions:
- `[lon, lat, height]` and `{lon,lat,height?}` / `{lng,lat,alt?}` / `{longitude,latitude,height?}` are parsed as "degrees"
- `Cartographic` is parsed as "radians"

#### Parameters

##### target

[`CameraViewTarget`](../types/CameraViewTarget.md)

Camera flight target.

##### options?

[`CameraFlyToTargetOptions`](../types/CameraFlyToTargetOptions.md) = `{}`

Camera flight options.

#### Returns

`Promise`\<`boolean`\>

Whether the camera flight succeeded.

#### Example

```ts
camera.flyTo(entity);
camera.flyTo([entity1, entity2]);

camera.flyTo(new Cartesian3(x, y, z));
camera.flyTo([cart1, cart2, cart3]);

camera.flyTo({ lon: 120, lat: 30, height: 1000 });
camera.flyTo([{ lng: 120, lat: 30 }, { lng: 121, lat: 31, alt: 5000 }]);
camera.flyTo([120, 30, 1000]);

camera.flyTo(targetPromise);
```

***

### followTarget()

> **followTarget**(`entity`, `options?`): `void`

Sets the entity or physical object that the camera tracks.

#### Parameters

##### entity

[`FollowTarget`](../types/FollowTarget.md)

The entity or physical object to track.

##### options?

[`FollowTargetOptions`](../types/FollowTargetOptions.md) = `{}`

Tracking view, interaction, and rendering optimization configuration.

#### Returns

`void`

#### Example

```ts
engine.camera.followTarget(entity, {
 view: {
 distance: 50_000,
 headingDeg: 45,
 pitchDeg: -30,
 rollDeg: 0,
 },
});
```

***

### getDirection()

> **getDirection**(): `Cartesian3`

Gets the camera's direction vector.
Returns a clone copy.

#### Returns

`Cartesian3`

Camera direction vector (unit vector).

***

### getMagnitude()

> **getMagnitude**(): `number`

Gets the "magnitude" of the camera position.

In 3D this is the length of the position vector; in 2D / Columbus view this is the distance from the camera to the map.

#### Returns

`number`

Camera position magnitude value.

***

### getPickRay()

> **getPickRay**(`windowPosition`, `result?`): `Ray` \| `undefined`

Generates a pick ray passing through a screen pixel from the camera position.

#### Parameters

##### windowPosition

`Cartesian2`

Screen pixel coordinates.

##### result?

`Ray`

Output result reuse object.

#### Returns

`Ray` \| `undefined`

The ray (containing origin and direction); returns undefined if it cannot be computed.

***

### getPixelSize()

> **getPixelSize**(`boundingSphere`, `drawingBufferWidth`, `drawingBufferHeight`): `number`

Computes the size of a pixel in world units (meters).

#### Parameters

##### boundingSphere

`BoundingSphere`

Bounding sphere in world coordinates.

##### drawingBufferWidth

`number`

Drawing buffer width.

##### drawingBufferHeight

`number`

Drawing buffer height.

#### Returns

`number`

Pixel size (meters).

***

### getPosition()

> **getPosition**(): `Cartesian3`

Gets the camera's world coordinate position (defensively reads positionWC ?? position).
Returns a clone copy; modifying the returned value does not affect the camera's internal state.

#### Returns

`Cartesian3`

Camera world coordinate position.

***

### getRectangleCameraCoordinates()

> **getRectangleCameraCoordinates**(`rectangle`, `result?`): `Cartesian3`

Computes the camera position required to "see" a given rectangular region.

#### Parameters

##### rectangle

`Rectangle`

The rectangular region that must be visible.

##### result?

`Cartesian3`

Output result reuse object.

#### Returns

`Cartesian3`

Camera position coordinates (world coordinate system).

***

### getRight()

> **getRight**(): `Cartesian3`

Gets the camera right vector.
Returns a clone copy.

#### Returns

`Cartesian3`

Camera right vector (unit vector).

***

### getUp()

> **getUp**(): `Cartesian3`

Gets the camera up vector.
Returns a clone copy.

#### Returns

`Cartesian3`

Camera up vector (unit vector).

***

### hideAttitudeSphere()

> **hideAttitudeSphere**(): `void`

#### Returns

`void`

***

### hideAttitudeSphereOverlay()

> **hideAttitudeSphereOverlay**(): `void`

#### Returns

`void`

***

### look()

> **look**(`axis`, `angle?`): `void`

Rotates the camera's three attitude vectors (direction / up / right) around an arbitrary axis.

#### Parameters

##### axis

`Cartesian3`

Rotation axis.

##### angle?

`number`

Rotation angle in radians; uses defaultLookAmount if not provided.

#### Returns

`void`

***

### lookAt()

> **lookAt**(`target`, `offset`): `void`

Locks the camera view to a specified target position, using an offset to determine the camera attitude.

#### Parameters

##### target

`Cartesian3`

Target world coordinate position.

##### offset

`Cartesian3` \| `HeadingPitchRange`

Offset relative to the target (HeadingPitchRange or Cartesian3).

#### Returns

`void`

***

### lookAtTransform()

> **lookAtTransform**(`transform`, `offset?`): `void`

Sets the camera using a reference frame defined by a transformation matrix (target is the transformation matrix origin), and uses an offset to determine the camera attitude.

#### Parameters

##### transform

`Matrix4`

Transformation matrix that defines the reference frame.

##### offset?

`Cartesian3` \| `HeadingPitchRange`

Offset relative to the target (Cartesian3 or HeadingPitchRange).

#### Returns

`void`

***

### lookDown()

> **lookDown**(`amount?`): `void`

Looks downward around the right axis (effective only in non-2D mode).

#### Parameters

##### amount?

`number`

Rotation angle in radians; uses defaultLookAmount if not provided.

#### Returns

`void`

***

### lookLeft()

> **lookLeft**(`amount?`): `void`

Looks to the left around the up axis (effective only in non-2D mode).

#### Parameters

##### amount?

`number`

Rotation angle in radians; uses defaultLookAmount if not provided.

#### Returns

`void`

***

### lookRight()

> **lookRight**(`amount?`): `void`

Looks to the right around the up axis (effective only in non-2D mode).

#### Parameters

##### amount?

`number`

Rotation angle in radians; uses defaultLookAmount if not provided.

#### Returns

`void`

***

### lookUp()

> **lookUp**(`amount?`): `void`

Looks upward around the right axis (effective only in non-2D mode).

#### Parameters

##### amount?

`number`

Rotation angle in radians; uses defaultLookAmount if not provided.

#### Returns

`void`

***

### move()

> **move**(`direction`, `amount?`): `void`

Translates the camera position along the specified direction.

#### Parameters

##### direction

`Cartesian3`

Movement direction (unit vector, world coordinate system).

##### amount?

`number`

Movement distance in meters; uses defaultMoveAmount if not provided.

#### Returns

`void`

***

### moveBackward()

> **moveBackward**(`amount?`): `void`

Translates the camera in the direction opposite to its line of sight (behaves as zoom in 2D mode).

#### Parameters

##### amount?

`number`

Movement distance in meters; uses defaultMoveAmount if not provided.

#### Returns

`void`

***

### moveDown()

> **moveDown**(`amount?`): `void`

Translates the camera in the opposite direction of its up vector.

#### Parameters

##### amount?

`number`

Movement distance in meters; uses defaultMoveAmount if not provided.

#### Returns

`void`

***

### moveForward()

> **moveForward**(`amount?`): `void`

Translates the camera along its line of sight (behaves as zoom in 2D mode).

#### Parameters

##### amount?

`number`

Movement distance in meters; uses defaultMoveAmount if not provided.

#### Returns

`void`

***

### moveLeft()

> **moveLeft**(`amount?`): `void`

Translates the camera in the opposite direction of its right vector.

#### Parameters

##### amount?

`number`

Movement distance in meters; uses defaultMoveAmount if not provided.

#### Returns

`void`

***

### moveRight()

> **moveRight**(`amount?`): `void`

Translates the camera along its right vector.

#### Parameters

##### amount?

`number`

Movement distance in meters; uses defaultMoveAmount if not provided.

#### Returns

`void`

***

### moveUp()

> **moveUp**(`amount?`): `void`

Translates the camera along its up vector.

#### Parameters

##### amount?

`number`

Movement distance in meters; uses defaultMoveAmount if not provided.

#### Returns

`void`

***

### onChanged()

> **onChanged**(`callback`): () => `void`

Subscribes to camera change events, returning an unsubscribe function.

#### Parameters

##### callback

() => `void`

Callback function invoked when the camera changes.

#### Returns

Cancel subscription function; calling it removes the listener.

() => `void`

***

### pickEllipsoid()

> **pickEllipsoid**(`windowPosition`, `ellipsoid?`, `result?`): `Cartesian3` \| `undefined`

Picks a point on the ellipsoid / map surface from screen coordinates.

#### Parameters

##### windowPosition

`Cartesian2`

Screen pixel coordinates.

##### ellipsoid?

`Ellipsoid`

The ellipsoid to pick from. Defaults to Ellipsoid.WGS84.

##### result?

`Cartesian3`

Output result reuse object.

#### Returns

`Cartesian3` \| `undefined`

The picked world coordinate point; returns undefined if nothing was picked.

***

### removeTrackedDaisyEntity()

> **removeTrackedDaisyEntity**(): `void`

Removes the current entity tracking.
Releases the lock and restores camera control.

#### Returns

`void`

#### Example

```ts
camera.removeTrackedDaisyEntity();
```

***

### rotate()

> **rotate**(`axis`, `angle?`): `void`

Rotates the camera around an arbitrary axis in world coordinates, keeping the distance from the camera to the reference frame origin unchanged.

#### Parameters

##### axis

`Cartesian3`

Rotation axis (world coordinate system).

##### angle?

`number`

Rotation angle in radians; uses defaultRotateAmount if not provided.

#### Returns

`void`

***

### rotateDown()

> **rotateDown**(`angle?`): `void`

Rotates the camera downward around the camera reference frame center.

#### Parameters

##### angle?

`number`

Rotation angle in radians; uses defaultRotateAmount if not provided.

#### Returns

`void`

***

### rotateLeft()

> **rotateLeft**(`angle?`): `void`

Rotates the camera to the left around the camera reference frame center.

#### Parameters

##### angle?

`number`

Rotation angle in radians; uses defaultRotateAmount if not provided.

#### Returns

`void`

***

### rotateRight()

> **rotateRight**(`angle?`): `void`

Rotates the camera to the right around the camera reference frame center.

#### Parameters

##### angle?

`number`

Rotation angle in radians; uses defaultRotateAmount if not provided.

#### Returns

`void`

***

### rotateUp()

> **rotateUp**(`angle?`): `void`

Rotates the camera upward around the camera reference frame center.

#### Parameters

##### angle?

`number`

Rotation angle in radians; uses defaultRotateAmount if not provided.

#### Returns

`void`

***

### setDirection()

> **setDirection**(`dir`): `void`

Directly sets the camera's direction vector.
First disconnects any current tracking state.

#### Parameters

##### dir

`Cartesian3`

Direction vector (world coordinates).

#### Returns

`void`

***

### setFrustumFar()

> **setFrustumFar**(`far`): `void`

Sets the camera far clipping plane distance.

#### Parameters

##### far

`number`

Far clipping plane distance (meters)

#### Returns

`void`

***

### setFrustumNear()

> **setFrustumNear**(`near`): `void`

Sets the camera near clipping plane distance.

#### Parameters

##### near

`number`

Near clipping plane distance (meters)

#### Returns

`void`

***

### setPosition()

> **setPosition**(`pos`): `void`

Directly sets the camera's world coordinate position.
First disconnects any current tracking state.

#### Parameters

##### pos

`Cartesian3`

Target position (world coordinates).

#### Returns

`void`

***

### setUp()

> **setUp**(`up`): `void`

Directly sets the camera up vector.
First disconnects any current tracking state.

#### Parameters

##### up

`Cartesian3`

Up vector (world coordinates).

#### Returns

`void`

***

### setView()

> **setView**(`options`): `void`

Sets the camera view to the specified position or region, consistent with the Cesium setView method.

#### Parameters

##### options

View parameter configuration.

###### convert?

`boolean`

###### destination?

`Cartesian3` \| `Rectangle`

###### endTransform?

`Matrix4`

###### orientation?

`HeadingPitchRollValues` \| `DirectionUp`

#### Returns

`void`

***

### showAttitudeSphere()

> **showAttitudeSphere**(`options?`): [`AttitudeSphereRenderable`](AttitudeSphereRenderable.md)

#### Parameters

##### options?

[`AttitudeSphereOptions`](../types/AttitudeSphereOptions.md) = `{}`

#### Returns

[`AttitudeSphereRenderable`](AttitudeSphereRenderable.md)

***

### showAttitudeSphereOverlay()

> **showAttitudeSphereOverlay**(`options?`): [`AttitudeSphereOverlay`](AttitudeSphereOverlay.md)

#### Parameters

##### options?

[`AttitudeSphereOverlayOptions`](../types/AttitudeSphereOverlayOptions.md) = `{}`

#### Returns

[`AttitudeSphereOverlay`](AttitudeSphereOverlay.md)

***

### switchToOrthographicFrustum()

> **switchToOrthographicFrustum**(): `void`

Switches to orthographic projection (no effect in 2D mode).

#### Returns

`void`

***

### switchToPerspectiveFrustum()

> **switchToPerspectiveFrustum**(): `void`

Switches to perspective projection (no effect in 2D mode).

#### Returns

`void`

***

### twistLeft()

> **twistLeft**(`amount?`): `void`

Twists counterclockwise around the direction axis (roll).

#### Parameters

##### amount?

`number`

Rotation angle in radians; uses defaultLookAmount if not provided.

#### Returns

`void`

***

### twistRight()

> **twistRight**(`amount?`): `void`

Twists clockwise around the direction axis (roll).

#### Parameters

##### amount?

`number`

Rotation angle in radians; uses defaultLookAmount if not provided.

#### Returns

`void`

***

### unlockView()

> **unlockView**(): `void`

Releases the view lock and restores the camera to a free view in world coordinates.
Semantically equivalent to lookAtTransform(Matrix4.IDENTITY).

#### Returns

`void`

***

### viewBoundingSphere()

> **viewBoundingSphere**(`boundingSphere`, `offset?`): `void`

Sets the camera so that the current view contains the specified bounding sphere.

#### Parameters

##### boundingSphere

`BoundingSphere`

Bounding sphere in world coordinates.

##### offset?

`HeadingPitchRange`

Heading / Pitch / Range in a local ENU coordinate system centered at the bounding sphere center.

#### Returns

`void`

***

### worldToCameraCoordinates()

> **worldToCameraCoordinates**(`cartesian`, `result?`): `Cartesian4`

Transforms a vector/point from world coordinates to the camera reference frame.

#### Parameters

##### cartesian

`Cartesian4`

Vector/point to transform (Cartesian4).

##### result?

`Cartesian4`

Output result reuse object.

#### Returns

`Cartesian4`

Transformed vector/point.

***

### worldToCameraCoordinatesPoint()

> **worldToCameraCoordinatesPoint**(`cartesian`, `result?`): `Cartesian3`

Transforms a point from world coordinates to the camera reference frame.

#### Parameters

##### cartesian

`Cartesian3`

Point to transform (Cartesian3).

##### result?

`Cartesian3`

Output result reuse object.

#### Returns

`Cartesian3`

Transformed point.

***

### worldToCameraCoordinatesVector()

> **worldToCameraCoordinatesVector**(`cartesian`, `result?`): `Cartesian3`

Transforms a vector from world coordinates to the camera reference frame.

#### Parameters

##### cartesian

`Cartesian3`

Vector to transform (Cartesian3).

##### result?

`Cartesian3`

Output result reuse object.

#### Returns

`Cartesian3`

Transformed vector.

***

### zoom()

> **zoom**(`target`, `offset?`): `Promise`\<`boolean`\>

Zooms to one or more targets.

This is the new aggregated entry point that accepts mixed inputs:
- Daisy Entity / PhysicalWorld Object
- Low-level entity collections / data sources / objects with computable bounds
- Widget / Layer (if they implement `getBoundingSphere()`)
- Cartesian3 / Cartographic / common lat/lon objects
- Arrays of the above types

UI-class widgets with `zoomIgnored = true` are automatically skipped.

#### Parameters

##### target

`any`

##### offset?

`Cartesian3` \| `HeadingPitchRange`

#### Returns

`Promise`\<`boolean`\>

***

### zoomAll()

> **zoomAll**(`offset?`): `Promise`\<`boolean`\>

Zooms to all 3D targets in the current Engine.

#### Parameters

##### offset?

`Cartesian3` \| `HeadingPitchRange`

#### Returns

`Promise`\<`boolean`\>

***

### zoomIn()

> **zoomIn**(`amount?`): `void`

Zooms in along the line of sight.

#### Parameters

##### amount?

`number`

Zoom amount; uses defaultZoomAmount if not provided.

#### Returns

`void`

***

### zoomOut()

> **zoomOut**(`amount?`): `void`

Zooms out along the opposite direction of the line of sight.

#### Parameters

##### amount?

`number`

Zoom amount; uses defaultZoomAmount if not provided.

#### Returns

`void`

***

### zoomTo()

> **zoomTo**(`target`, `offset?`): `Promise`\<`boolean`\>

Zooms / moves the camera to a target (the main camera uses the engine's default camera logic; extra cameras fly based on point sets).

Supports Daisy `Entity`, coordinate objects, coordinate collections, and async targets.

Conventions:
- `[lon, lat, height]` and `{lon,lat,height?}` / `{lng,lat,alt?}` / `{longitude,latitude,height?}` are parsed as "degrees"
- `Cartographic` is parsed as "radians"

#### Parameters

##### target

[`CameraViewTarget`](../types/CameraViewTarget.md)

##### offset?

`Cartesian3` \| `HeadingPitchRange`

#### Returns

`Promise`\<`boolean`\>
