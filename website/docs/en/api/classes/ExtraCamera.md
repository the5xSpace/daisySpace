[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ExtraCamera

# Class: ExtraCamera

Camera management class.
Used to manage camera operations in the scene, including entity tracking, frustum display, and other features.

## Example

```ts
const camera = new Camera(viewer);
```

## Extends

- [`Camera`](Camera.md)

## Constructors

### Constructor

> **new ExtraCamera**(`viewer`, `options?`): `ExtraCamera`

Constructor

#### Parameters

##### viewer

[`Engine`](Engine.md)

Engine instance

##### options?

Configuration options

###### camera?

`Camera`

Specify the underlying camera object to use; if not provided, the engine's default camera is used

###### id?

`string`

#### Returns

`ExtraCamera`

#### Overrides

`Camera.constructor`

## Properties

### id

> **id**: `string`

#### Inherited from

[`Camera`](Camera.md).[`id`](Camera.md#id)

***

### stopPiP

> **stopPiP**: (() => `void`) \| `undefined`

***

### viewer

> **viewer**: [`Engine`](Engine.md) \| `undefined`

The associated engine instance.

#### Overrides

[`Camera`](Camera.md).[`viewer`](Camera.md#viewer)

## Accessors

### isMainCamera

#### Get Signature

> **get** **isMainCamera**(): `boolean`

Whether this is the main camera

##### Returns

`boolean`

#### Inherited from

[`Camera`](Camera.md).[`isMainCamera`](Camera.md#ismaincamera)

***

### trackedEntity

#### Get Signature

> **get** **trackedEntity**(): [`FollowTarget`](../types/FollowTarget.md) \| `undefined`

##### Returns

[`FollowTarget`](../types/FollowTarget.md) \| `undefined`

#### Inherited from

[`Camera`](Camera.md).[`trackedEntity`](Camera.md#trackedentity)

## Methods

### cameraToWorldCoordinates()

> **cameraToWorldCoordinates**(`cartesian`, `result?`): `Cartesian4`

Transform a vector/point from camera reference system to world coordinates.

#### Parameters

##### cartesian

`Cartesian4`

The vector/point to transform (Cartesian4).

##### result?

`Cartesian4`

Reusable output result object.

#### Returns

`Cartesian4`

The transformed vector/point.

#### Inherited from

[`Camera`](Camera.md).[`cameraToWorldCoordinates`](Camera.md#cameratoworldcoordinates)

***

### cameraToWorldCoordinatesPoint()

> **cameraToWorldCoordinatesPoint**(`cartesian`, `result?`): `Cartesian3`

Transform a point from camera reference system to world coordinates.

#### Parameters

##### cartesian

`Cartesian3`

The point to transform (Cartesian3).

##### result?

`Cartesian3`

Reusable output result object.

#### Returns

`Cartesian3`

The transformed point.

#### Inherited from

[`Camera`](Camera.md).[`cameraToWorldCoordinatesPoint`](Camera.md#cameratoworldcoordinatespoint)

***

### cameraToWorldCoordinatesVector()

> **cameraToWorldCoordinatesVector**(`cartesian`, `result?`): `Cartesian3`

Transform a vector from camera reference system to world coordinates.

#### Parameters

##### cartesian

`Cartesian3`

The vector to transform (Cartesian3).

##### result?

`Cartesian3`

Reusable output result object.

#### Returns

`Cartesian3`

The transformed vector.

#### Inherited from

[`Camera`](Camera.md).[`cameraToWorldCoordinatesVector`](Camera.md#cameratoworldcoordinatesvector)

***

### cancelFlight()

> **cancelFlight**(): `void`

Cancel the current camera flight, stopping at the current position (no effect if no flight in progress).

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`cancelFlight`](Camera.md#cancelflight)

***

### closePiP()

> **closePiP**(): `void`

Close picture-in-picture

#### Returns

`void`

***

### completeFlight()

> **completeFlight**(): `void`

Immediately complete the current camera flight, teleporting to the flight destination (no effect if no flight in progress).

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`completeFlight`](Camera.md#completeflight)

***

### computeViewRectangle()

> **computeViewRectangle**(`ellipsoid?`, `result?`): `Rectangle` \| `undefined`

Compute the approximate visible rectangle on the ellipsoid.

#### Parameters

##### ellipsoid?

`Ellipsoid`

The ellipsoid for which to compute the visible region, defaults to Ellipsoid.WGS84.

##### result?

`Rectangle`

Reusable output result object.

#### Returns

`Rectangle` \| `undefined`

The visible rectangle, or undefined if the ellipsoid is not visible.

#### Inherited from

[`Camera`](Camera.md).[`computeViewRectangle`](Camera.md#computeviewrectangle)

***

### destroy()

> **destroy**(): `void`

Destroy the camera management object.
Clean up all tracking and visualization effects.

#### Returns

`void`

#### Example

```ts
camera.destroy();
```

#### Overrides

[`Camera`](Camera.md).[`destroy`](Camera.md#destroy)

***

### distanceToBoundingSphere()

> **distanceToBoundingSphere**(`boundingSphere`): `number`

Get the distance from the camera to the front surface of the bounding sphere.

#### Parameters

##### boundingSphere

`BoundingSphere`

The bounding sphere in world coordinates.

#### Returns

`number`

Distance value (meters).

#### Inherited from

[`Camera`](Camera.md).[`distanceToBoundingSphere`](Camera.md#distancetoboundingsphere)

***

### flyHome()

> **flyHome**(`duration?`): `void`

Fly to the “home view”.

In 3D mode, uses the default view rectangle; in 2D/Columbus view, displays the entire map.

#### Parameters

##### duration?

`number`

Flight duration in seconds. If not provided, estimated based on distance.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`flyHome`](Camera.md#flyhome)

***

### flyTo()

> **flyTo**(`options`): `void`

Fly from the current position to a new position or rectangle area.

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

#### Inherited from

[`Camera`](Camera.md).[`flyTo`](Camera.md#flyto)

***

### flyToBoundingSphere()

> **flyToBoundingSphere**(`boundingSphere`, `options?`): `void`

Fly to a position where the current view contains the specified bounding sphere.

#### Parameters

##### boundingSphere

`BoundingSphere`

The bounding sphere in world coordinates.

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

#### Inherited from

[`Camera`](Camera.md).[`flyToBoundingSphere`](Camera.md#flytoboundingsphere)

***

### flyToTarget()

> **flyToTarget**(`target`, `options?`): `Promise`\<`boolean`\>

Fly the camera to a target (main camera uses engine default flight logic; extra cameras fly based on point set)

Supports Daisy `Entity`, coordinate objects, coordinate arrays, and async targets.

Conventions:
- `[lon, lat, height]` and `{lon,lat,height?}`/`{lng,lat,alt?}`/`{longitude,latitude,height?}` are parsed as degrees
- `Cartographic` is parsed as radians

#### Parameters

##### target

[`CameraViewTarget`](../types/CameraViewTarget.md)

Camera flight target

##### options?

[`CameraFlyToTargetOptions`](../types/CameraFlyToTargetOptions.md) = `{}`

Camera flight options

#### Returns

`Promise`\<`boolean`\>

Whether the camera flight was successful

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

#### Inherited from

[`Camera`](Camera.md).[`flyToTarget`](Camera.md#flytotarget)

***

### followTarget()

> **followTarget**(`entity`, `options?`): `void`

Set the entity or physical object for the camera to track.

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

#### Inherited from

[`Camera`](Camera.md).[`followTarget`](Camera.md#followtarget)

***

### getDirection()

> **getDirection**(): `Cartesian3`

Get the camera direction vector.
Returns a cloned copy.

#### Returns

`Cartesian3`

Camera direction vector (unit vector).

#### Inherited from

[`Camera`](Camera.md).[`getDirection`](Camera.md#getdirection)

***

### getFrustumState()

> **getFrustumState**(): `object`

#### Returns

`object`

##### options

> **options**: `object`

###### options.color?

> `optional` **color?**: `Color`

###### options.outlineColor?

> `optional` **outlineColor?**: `Color`

###### options.showIcon?

> `optional` **showIcon?**: `boolean`

##### show

> **show**: `boolean`

***

### getMagnitude()

> **getMagnitude**(): `number`

Get the “magnitude” of the camera position.

In 3D, the magnitude of the position vector; in 2D/Columbus view, the distance from camera to the map.

#### Returns

`number`

Camera position magnitude value.

#### Inherited from

[`Camera`](Camera.md).[`getMagnitude`](Camera.md#getmagnitude)

***

### getPickRay()

> **getPickRay**(`windowPosition`, `result?`): `Ray` \| `undefined`

Generate a pick ray from the camera position through a screen pixel.

#### Parameters

##### windowPosition

`Cartesian2`

Screen pixel coordinates.

##### result?

`Ray`

Reusable output result object.

#### Returns

`Ray` \| `undefined`

Ray (containing origin and direction), returns undefined if it cannot be computed.

#### Inherited from

[`Camera`](Camera.md).[`getPickRay`](Camera.md#getpickray)

***

### getPiPState()

> **getPiPState**(): `object`

#### Returns

`object`

##### open

> **open**: `boolean`

##### options?

> `optional` **options?**: `ExtraCameraPiPOptions`

***

### getPixelSize()

> **getPixelSize**(`boundingSphere`, `drawingBufferWidth`, `drawingBufferHeight`): `number`

Compute the pixel size in world units (meters).

#### Parameters

##### boundingSphere

`BoundingSphere`

The bounding sphere in world coordinates.

##### drawingBufferWidth

`number`

Drawing buffer width.

##### drawingBufferHeight

`number`

Drawing buffer height.

#### Returns

`number`

Pixel size (meters).

#### Inherited from

[`Camera`](Camera.md).[`getPixelSize`](Camera.md#getpixelsize)

***

### getPosition()

> **getPosition**(): `Cartesian3`

Get the camera world position (defensive read of positionWC ?? position).
Returns a cloned copy; modifying the return value does not affect the camera internal state.

#### Returns

`Cartesian3`

Camera world position.

#### Inherited from

[`Camera`](Camera.md).[`getPosition`](Camera.md#getposition)

***

### getRectangleCameraCoordinates()

> **getRectangleCameraCoordinates**(`rectangle`, `result?`): `Cartesian3`

Compute the camera position needed to “see a given rectangle area”.

#### Parameters

##### rectangle

`Rectangle`

The rectangle area that needs to be visible.

##### result?

`Cartesian3`

Reusable output result object.

#### Returns

`Cartesian3`

Camera position (world coordinates).

#### Inherited from

[`Camera`](Camera.md).[`getRectangleCameraCoordinates`](Camera.md#getrectanglecameracoordinates)

***

### getRight()

> **getRight**(): `Cartesian3`

Get the camera right vector.
Returns a cloned copy.

#### Returns

`Cartesian3`

Camera right vector (unit vector).

#### Inherited from

[`Camera`](Camera.md).[`getRight`](Camera.md#getright)

***

### getUp()

> **getUp**(): `Cartesian3`

Get the camera up vector.
Returns a cloned copy.

#### Returns

`Cartesian3`

Camera up vector (unit vector).

#### Inherited from

[`Camera`](Camera.md).[`getUp`](Camera.md#getup)

***

### hideAttitudeSphere()

> **hideAttitudeSphere**(): `void`

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`hideAttitudeSphere`](Camera.md#hideattitudesphere)

***

### hideAttitudeSphereOverlay()

> **hideAttitudeSphereOverlay**(): `void`

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`hideAttitudeSphereOverlay`](Camera.md#hideattitudesphereoverlay)

***

### look()

> **look**(`axis`, `angle?`): `void`

Rotate the camera’s three orientation vectors (direction/up/right) around an arbitrary axis.

#### Parameters

##### axis

`Cartesian3`

Rotation axis.

##### angle?

`number`

Rotation angle (radians), uses defaultLookAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`look`](Camera.md#look)

***

### lookAt()

> **lookAt**(`target`, `offset`): `void`

Lock the camera view to a specified target position, using an offset to determine camera orientation.

#### Parameters

##### target

`Cartesian3`

Target world position.

##### offset

`Cartesian3` \| `HeadingPitchRange`

Offset relative to the target (HeadingPitchRange or Cartesian3).

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`lookAt`](Camera.md#lookat)

***

### lookAtTransform()

> **lookAtTransform**(`transform`, `offset?`): `void`

Set the camera in a reference frame defined by a transform matrix (target is the transform origin), using an offset for camera orientation.

#### Parameters

##### transform

`Matrix4`

Transform matrix defining the reference frame.

##### offset?

`Cartesian3` \| `HeadingPitchRange`

Offset relative to the target (Cartesian3 or HeadingPitchRange).

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`lookAtTransform`](Camera.md#lookattransform)

***

### lookDown()

> **lookDown**(`amount?`): `void`

Look downward around the right axis (effective in non-2D mode).

#### Parameters

##### amount?

`number`

Rotation angle (radians), uses defaultLookAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`lookDown`](Camera.md#lookdown)

***

### lookLeft()

> **lookLeft**(`amount?`): `void`

Look left around the up axis (effective in non-2D mode).

#### Parameters

##### amount?

`number`

Rotation angle (radians), uses defaultLookAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`lookLeft`](Camera.md#lookleft)

***

### lookRight()

> **lookRight**(`amount?`): `void`

Look right around the up axis (effective in non-2D mode).

#### Parameters

##### amount?

`number`

Rotation angle (radians), uses defaultLookAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`lookRight`](Camera.md#lookright)

***

### lookUp()

> **lookUp**(`amount?`): `void`

Look upward around the right axis (effective in non-2D mode).

#### Parameters

##### amount?

`number`

Rotation angle (radians), uses defaultLookAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`lookUp`](Camera.md#lookup)

***

### move()

> **move**(`direction`, `amount?`): `void`

Translate the camera position along a specified direction.

#### Parameters

##### direction

`Cartesian3`

Move direction (unit vector, world coordinates).

##### amount?

`number`

Move distance (meters), uses defaultMoveAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`move`](Camera.md#move)

***

### moveBackward()

> **moveBackward**(`amount?`): `void`

Translate opposite to the camera view direction (appears as zoom in 2D mode).

#### Parameters

##### amount?

`number`

Move distance (meters), uses defaultMoveAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`moveBackward`](Camera.md#movebackward)

***

### moveDown()

> **moveDown**(`amount?`): `void`

Translate opposite to the camera up direction.

#### Parameters

##### amount?

`number`

Move distance (meters), uses defaultMoveAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`moveDown`](Camera.md#movedown)

***

### moveForward()

> **moveForward**(`amount?`): `void`

Translate along the camera view direction (appears as zoom in 2D mode).

#### Parameters

##### amount?

`number`

Move distance (meters), uses defaultMoveAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`moveForward`](Camera.md#moveforward)

***

### moveLeft()

> **moveLeft**(`amount?`): `void`

Translate opposite to the camera right direction.

#### Parameters

##### amount?

`number`

Move distance (meters), uses defaultMoveAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`moveLeft`](Camera.md#moveleft)

***

### moveRight()

> **moveRight**(`amount?`): `void`

Translate along the camera right direction.

#### Parameters

##### amount?

`number`

Move distance (meters), uses defaultMoveAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`moveRight`](Camera.md#moveright)

***

### moveUp()

> **moveUp**(`amount?`): `void`

Translate along the camera up direction.

#### Parameters

##### amount?

`number`

Move distance (meters), uses defaultMoveAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`moveUp`](Camera.md#moveup)

***

### onChanged()

> **onChanged**(`callback`): () => `void`

Subscribe to camera change events, returns an unsubscribe function.

#### Parameters

##### callback

() => `void`

Callback function for camera changes.

#### Returns

Unsubscribe function, removes the listener when called.

() => `void`

#### Inherited from

[`Camera`](Camera.md).[`onChanged`](Camera.md#onchanged)

***

### openInsetView()

> **openInsetView**(`options?`): `void`

#### Parameters

##### options?

`ExtraCameraPiPOptions` = `{}`

#### Returns

`void`

***

### openPiP()

> **openPiP**(`options?`): `void`

Open picture-in-picture (PiP) mode.
Automatically creates a floating view window that synchronously displays the current camera view.

#### Parameters

##### options?

`ExtraCameraPiPOptions` = `{}`

Configuration options

#### Returns

`void`

***

### pickEllipsoid()

> **pickEllipsoid**(`windowPosition`, `ellipsoid?`, `result?`): `Cartesian3` \| `undefined`

Pick a point on the ellipsoid/map surface from screen coordinates.

#### Parameters

##### windowPosition

`Cartesian2`

Screen pixel coordinates.

##### ellipsoid?

`Ellipsoid`

The ellipsoid to pick from, defaults to Ellipsoid.WGS84.

##### result?

`Cartesian3`

Reusable output result object.

#### Returns

`Cartesian3` \| `undefined`

The picked world coordinate point, returns undefined if nothing was picked.

#### Inherited from

[`Camera`](Camera.md).[`pickEllipsoid`](Camera.md#pickellipsoid)

***

### removeFrustum()

> **removeFrustum**(): `void`

Remove frustum display.

#### Returns

`void`

#### Example

```ts
camera.removeFrustum();
```

***

### removeTrackedDaisyEntity()

> **removeTrackedDaisyEntity**(): `void`

Remove the current entity tracking.
Unlock and restore camera control.

#### Returns

`void`

#### Example

```ts
camera.removeTrackedDaisyEntity();
```

#### Inherited from

[`Camera`](Camera.md).[`removeTrackedDaisyEntity`](Camera.md#removetrackeddaisyentity)

***

### rotate()

> **rotate**(`axis`, `angle?`): `void`

Rotate the camera around an arbitrary world axis, keeping the distance from camera to the reference frame origin constant.

#### Parameters

##### axis

`Cartesian3`

Rotation axis (world coordinates).

##### angle?

`number`

Rotation angle (radians), uses defaultRotateAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`rotate`](Camera.md#rotate)

***

### rotateDown()

> **rotateDown**(`angle?`): `void`

Rotate downward around the camera reference frame center.

#### Parameters

##### angle?

`number`

Rotation angle (radians), uses defaultRotateAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`rotateDown`](Camera.md#rotatedown)

***

### rotateLeft()

> **rotateLeft**(`angle?`): `void`

Rotate left around the camera reference frame center.

#### Parameters

##### angle?

`number`

Rotation angle (radians), uses defaultRotateAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`rotateLeft`](Camera.md#rotateleft)

***

### rotateRight()

> **rotateRight**(`angle?`): `void`

Rotate right around the camera reference frame center.

#### Parameters

##### angle?

`number`

Rotation angle (radians), uses defaultRotateAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`rotateRight`](Camera.md#rotateright)

***

### rotateUp()

> **rotateUp**(`angle?`): `void`

Rotate upward around the camera reference frame center.

#### Parameters

##### angle?

`number`

Rotation angle (radians), uses defaultRotateAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`rotateUp`](Camera.md#rotateup)

***

### setDirection()

> **setDirection**(`dir`): `void`

Directly set the camera direction vector.
Disconnects any current tracking state first.

#### Parameters

##### dir

`Cartesian3`

Direction vector (world coordinates).

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`setDirection`](Camera.md#setdirection)

***

### setFrustumFar()

> **setFrustumFar**(`far`): `void`

Set the camera far clipping plane distance.

#### Parameters

##### far

`number`

Far clipping plane distance (meters)

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`setFrustumFar`](Camera.md#setfrustumfar)

***

### setFrustumNear()

> **setFrustumNear**(`near`): `void`

Set the camera near clipping plane distance.

#### Parameters

##### near

`number`

Near clipping plane distance (meters)

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`setFrustumNear`](Camera.md#setfrustumnear)

***

### setPosition()

> **setPosition**(`pos`): `void`

Directly set the camera world position.
Disconnects any current tracking state first.

#### Parameters

##### pos

`Cartesian3`

Target position (world coordinates).

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`setPosition`](Camera.md#setposition)

***

### setUp()

> **setUp**(`up`): `void`

Directly set the camera up vector.
Disconnects any current tracking state first.

#### Parameters

##### up

`Cartesian3`

Up vector (world coordinates).

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`setUp`](Camera.md#setup)

***

### setView()

> **setView**(`options`): `void`

Set the camera view to a specified position or area, consistent with Cesium setView.

#### Parameters

##### options

View parameter configuration

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

#### Inherited from

[`Camera`](Camera.md).[`setView`](Camera.md#setview)

***

### showAttitudeSphere()

> **showAttitudeSphere**(`options?`): [`AttitudeSphereRenderable`](AttitudeSphereRenderable.md)

#### Parameters

##### options?

[`AttitudeSphereOptions`](../types/AttitudeSphereOptions.md) = `{}`

#### Returns

[`AttitudeSphereRenderable`](AttitudeSphereRenderable.md)

#### Inherited from

[`Camera`](Camera.md).[`showAttitudeSphere`](Camera.md#showattitudesphere)

***

### showAttitudeSphereOverlay()

> **showAttitudeSphereOverlay**(`options?`): [`AttitudeSphereOverlay`](AttitudeSphereOverlay.md)

#### Parameters

##### options?

[`AttitudeSphereOverlayOptions`](../types/AttitudeSphereOverlayOptions.md) = `{}`

#### Returns

[`AttitudeSphereOverlay`](AttitudeSphereOverlay.md)

#### Overrides

[`Camera`](Camera.md).[`showAttitudeSphereOverlay`](Camera.md#showattitudesphereoverlay)

***

### showFrustum()

> **showFrustum**(`options?`): `void`

Display the camera frustum.
Visualizes the frustum range of the current camera.

#### Parameters

##### options?

Frustum display configuration

###### color?

`Color`

Frustum line color

###### outlineColor?

`Color`

Outline color (not yet used)

###### showCamera?

`boolean`

Whether to show the camera

#### Returns

`void`

#### Example

```ts
// 显示默认黄色视锥和图标
camera.showFrustum();

// 显示红色视锥，不显示图标
camera.showFrustum({
 color: "#ff0000",
 showCamera: false
});
```

***

### switchToOrthographicFrustum()

> **switchToOrthographicFrustum**(): `void`

Switch to orthographic projection (no effect in 2D mode).

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`switchToOrthographicFrustum`](Camera.md#switchtoorthographicfrustum)

***

### switchToPerspectiveFrustum()

> **switchToPerspectiveFrustum**(): `void`

Switch to perspective projection (no effect in 2D mode).

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`switchToPerspectiveFrustum`](Camera.md#switchtoperspectivefrustum)

***

### twistLeft()

> **twistLeft**(`amount?`): `void`

Twist counterclockwise around the direction axis (roll).

#### Parameters

##### amount?

`number`

Rotation angle (radians), uses defaultLookAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`twistLeft`](Camera.md#twistleft)

***

### twistRight()

> **twistRight**(`amount?`): `void`

Twist clockwise around the direction axis (roll).

#### Parameters

##### amount?

`number`

Rotation angle (radians), uses defaultLookAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`twistRight`](Camera.md#twistright)

***

### unlockView()

> **unlockView**(): `void`

Unlock the view, restoring the camera to free world-coordinate view.
Semantic wrapper equivalent to lookAtTransform(Matrix4.IDENTITY).

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`unlockView`](Camera.md#unlockview)

***

### viewBoundingSphere()

> **viewBoundingSphere**(`boundingSphere`, `offset?`): `void`

Set the camera so the current view contains the specified bounding sphere.

#### Parameters

##### boundingSphere

`BoundingSphere`

The bounding sphere in world coordinates.

##### offset?

`HeadingPitchRange`

Heading/Pitch/Range in the local ENU coordinate system centered at the bounding sphere center.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`viewBoundingSphere`](Camera.md#viewboundingsphere)

***

### worldToCameraCoordinates()

> **worldToCameraCoordinates**(`cartesian`, `result?`): `Cartesian4`

Transform a vector/point from world coordinates to the camera reference frame.

#### Parameters

##### cartesian

`Cartesian4`

The vector/point to transform (Cartesian4).

##### result?

`Cartesian4`

Reusable output result object.

#### Returns

`Cartesian4`

The transformed vector/point.

#### Inherited from

[`Camera`](Camera.md).[`worldToCameraCoordinates`](Camera.md#worldtocameracoordinates)

***

### worldToCameraCoordinatesPoint()

> **worldToCameraCoordinatesPoint**(`cartesian`, `result?`): `Cartesian3`

Transform a point from world coordinates to the camera reference frame.

#### Parameters

##### cartesian

`Cartesian3`

The point to transform (Cartesian3).

##### result?

`Cartesian3`

Reusable output result object.

#### Returns

`Cartesian3`

The transformed point.

#### Inherited from

[`Camera`](Camera.md).[`worldToCameraCoordinatesPoint`](Camera.md#worldtocameracoordinatespoint)

***

### worldToCameraCoordinatesVector()

> **worldToCameraCoordinatesVector**(`cartesian`, `result?`): `Cartesian3`

Transform a vector from world coordinates to the camera reference frame.

#### Parameters

##### cartesian

`Cartesian3`

The vector to transform (Cartesian3).

##### result?

`Cartesian3`

Reusable output result object.

#### Returns

`Cartesian3`

The transformed vector.

#### Inherited from

[`Camera`](Camera.md).[`worldToCameraCoordinatesVector`](Camera.md#worldtocameracoordinatesvector)

***

### zoom()

> **zoom**(`target`, `offset?`): `Promise`\<`boolean`\>

Zoom to one or more targets.

This is a new aggregated entry point, supporting mixed inputs:
- Daisy Entity / PhysicalWorld Object
- Underlying entity collections / data sources / objects with computable bounds
- Widget / Layer (if they implement `getBoundingSphere()`)
- Cartesian3 / Cartographic / common lat/lon objects
- Arrays of the above types

UI widgets with `zoomIgnored = true` are automatically skipped.

#### Parameters

##### target

`any`

##### offset?

`Cartesian3` \| `HeadingPitchRange`

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`Camera`](Camera.md).[`zoom`](Camera.md#zoom)

***

### zoomAll()

> **zoomAll**(`offset?`): `Promise`\<`boolean`\>

Zoom to all 3D targets within the current Engine.

#### Parameters

##### offset?

`Cartesian3` \| `HeadingPitchRange`

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`Camera`](Camera.md).[`zoomAll`](Camera.md#zoomall)

***

### zoomIn()

> **zoomIn**(`amount?`): `void`

Zoom in along the view direction.

#### Parameters

##### amount?

`number`

Zoom amount, uses defaultZoomAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`zoomIn`](Camera.md#zoomin)

***

### zoomOut()

> **zoomOut**(`amount?`): `void`

Zoom out along the opposite of the view direction.

#### Parameters

##### amount?

`number`

Zoom amount, uses defaultZoomAmount if not provided.

#### Returns

`void`

#### Inherited from

[`Camera`](Camera.md).[`zoomOut`](Camera.md#zoomout)

***

### zoomTo()

> **zoomTo**(`target`, `offset?`): `Promise`\<`boolean`\>

Zoom/move camera to target (main camera uses engine default movement logic; extra cameras fly based on point set)

Supports Daisy `Entity`, coordinate objects, coordinate arrays, and async targets.

Conventions:
- `[lon, lat, height]` and `{lon,lat,height?}`/`{lng,lat,alt?}`/`{longitude,latitude,height?}` are parsed as degrees
- `Cartographic` is parsed as radians

#### Parameters

##### target

[`CameraViewTarget`](../types/CameraViewTarget.md)

##### offset?

`Cartesian3` \| `HeadingPitchRange`

#### Returns

`Promise`\<`boolean`\>

#### Inherited from

[`Camera`](Camera.md).[`zoomTo`](Camera.md#zoomto)
