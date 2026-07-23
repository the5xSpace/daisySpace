[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / CelestialEllipsoid

# Class: CelestialEllipsoid

Celestial ellipsoid with a world-position offset.

Purpose: in an Earth-fixed (ECEF) scene, place a "local ellipsoid" (with radii matching Ellipsoid)
at a world-coordinate position (ECEF), and provide:
- ray-ellipsoid intersection calculations
- world coordinates <-> celestial-body local coordinates transformations, with the body center as the origin
- per-frame updates of the translation and rotation matrices for dynamic bodies such as the Moon and Sun

Coordinate-system conventions:
- The scene uses the Earth-fixed ECEF frame by default, with the Earth's center at (0,0,0).
- `position` must be the celestial body's world coordinate in ECEF.
- `orientation` (optional) rotates the celestial body's local coordinate system into ECEF, for example to keep a body's longitude-latitude frame consistent in ECEF.
- `ray.origin` and `ray.direction` must be ECEF world coordinates; this class transforms the ray into the body's local coordinate system before computing the intersection.

Dynamic position:
- For non-Earth bodies such as the Moon and Sun, the body center changes over time in ECEF.
- The current time can be provided through `time`, with `position(time)` and `orientation(time)` depending on it.
- `getLocalToWorldMatrix()` then returns a new matrix every frame. If drawn objects such as polygons, polylines, or primitives are defined in body-local coordinates, their points must be multiplied by this matrix every frame (or primitive.modelMatrix must be set); otherwise, ground clamping may fail or positions may drift.

## Example

```ts
// 动态月球：位置每帧变化（ECEF）
const moon = new CelestialEllipsoid({
 ellipsoid: ELLIPSOID.MOON,
 time: () => viewer.clock.currentTime,
 position: (time) => Utils.getMoonPositionECEF(time),
});

// 世界射线与月球求交（命中点为 ECEF 坐标）
const ray = { origin: viewer.camera.positionWC, direction: viewer.camera.directionWC };
const hitECEF = moon.rayIntersection(ray);

// 若你要在“月球表面”贴地绘制，点位应当是“月球局部坐标”（以月心为原点，使用月球椭球）。
// 最常见的输入方式是“月球经纬度 + 高度”，它会生成月心为原点的 local Cartesian3：
const localOnMoon = Daisy.Cartesian3.fromDegrees(0, 0, 0, ELLIPSOID.MOON);

// 也可以直接传入任意“月心为原点”的 local Cartesian3（不一定必须经纬度）
const localAny = new Daisy.Cartesian3(1000, 0, 0);

// 使用本类把 local 点变换到 ECEF 世界，再交给 绘制（或把 modelMatrix 设为 getLocalToWorldMatrix）
const worldPoint = moon.localToWorldPoint(localOnMoon);
```

## Constructors

### Constructor

> **new CelestialEllipsoid**(`options`): `CelestialEllipsoid`

Constructor.

#### Parameters

##### options

Celestial ellipsoid parameters.

###### ellipsoid

`Ellipsoid`

###### orientation?

[`CelestialEllipsoidOrientation`](../types/PW.CelestialEllipsoidOrientation.md)

###### position

[`CelestialEllipsoidPositionECEF`](../types/PW.CelestialEllipsoidPositionECEF.md)

###### surfaceGravity?

`number`

###### time?

`JulianDate` \| (() => `JulianDate`)

#### Returns

`CelestialEllipsoid`

#### Example

```ts
const moon = new CelestialEllipsoid({
 ellipsoid: Daisy.ELLIPSOID.MOON,
 time: () => viewer.clock.currentTime,
 position: (t) => Daisy.Utils.getMoonPositionECEF(t),
 orientation: (t) => Daisy.Utils.getMoonRotationMatrix(t),
});
```

## Properties

### ellipsoid

> **ellipsoid**: `Ellipsoid`

Celestial ellipsoid geometry parameters, such as radii.

Note: the ellipsoid itself is always defined in the "celestial-body local coordinate system (with the body center as the origin)";
the translation and rotation of the body center in the world ECEF coordinate system are determined by `position/orientation`.

***

### orientation

> **orientation**: [`CelestialEllipsoidOrientation`](../types/PW.CelestialEllipsoidOrientation.md) \| `undefined`

Source of the orientation from the celestial-body local coordinate system to ECEF (optional).

- If omitted, an identity rotation is used.
- For dynamic bodies, a function can be provided to return a matrix or quaternion for a given time.

***

### position

> **position**: [`CelestialEllipsoidPositionECEF`](../types/PW.CelestialEllipsoidPositionECEF.md)

Source of the celestial body's center position in ECEF.

- A fixed Cartesian3 means that the body center is stationary.
- A function means that the body center changes over time and can be updated every frame.

***

### surfaceGravity

> **surfaceGravity**: `number`

Constant gravitational acceleration near the celestial body's surface, in m/s².

This approximate value is intended for short-lived effects such as visual particles and local ground-based dynamics; orbital dynamics should still use dedicated orbital or gravity models.

## Methods

### cameraHeightMeters()

> **cameraHeightMeters**(`cameraPositionECEF`, `time?`): `number` \| `null`

Get the camera altitude above the celestial body's surface, in meters.

#### Parameters

##### cameraPositionECEF

`Cartesian3`

##### time?

`JulianDate`

#### Returns

`number` \| `null`

#### Example

```ts
const h = celestial.cameraHeightMeters(viewer.camera.positionWC);
```

***

### cartesianToCartographic()

> **cartesianToCartographic**(`cartesianECEF`): `Cartographic` \| `null`

Convert ECEF world coordinates to longitude and latitude (Cartographic).

#### Parameters

##### cartesianECEF

`Cartesian3`

#### Returns

`Cartographic` \| `null`

#### Example

```ts
const carto = celestial.cartesianToCartographic(viewer.camera.positionWC);
```

***

### cartographicToCartesian()

> **cartographicToCartesian**(`cartographic`): `Cartesian3` \| `null`

Convert longitude and latitude (Cartographic) to ECEF world coordinates.

#### Parameters

##### cartographic

`Cartographic`

#### Returns

`Cartesian3` \| `null`

#### Example

```ts
const carto = Daisy.Cartographic.fromDegrees(116.39, 39.9, 0);
const world = celestial.cartographicToCartesian(carto);
```

***

### computeGroundPositions()

> **computeGroundPositions**(`positions`, `options?`): `Cartesian3`[]

Compute ground-clamped path sample points, optionally closing, sorting, and clamping the path.

#### Parameters

##### positions

`Cartesian3`[]

Path points in ECEF world coordinates.

##### options?

Sampling configuration.

###### clampToGround?

`boolean`

Whether to interpolate along the ground; defaults to false.

###### loop?

`boolean`

Whether to close the path; defaults to false.

###### sampleCount?

`number`

The number of interpolation samples per segment (integer, >=1); defaults to 32.

###### sortBefore?

`boolean`

Whether to sort by wrap angle before sampling; defaults to true.

###### time?

`JulianDate`

#### Returns

`Cartesian3`[]

#### Example

```ts
const sampled = celestial.computeGroundPositions(path, {
 sampleCount: 32,
 clampToGround: true,
});
```

***

### computeRayEllipsoidGrazingPoint()

> **computeRayEllipsoidGrazingPoint**(`origin`, `direction`, `time?`): `Cartesian3` \| `null`

Compute the grazing point of a ray relative to the ellipsoid (grazing point).

When a ray does not directly hit the ellipsoid, this can be used to construct a closed arc continuous with the horizon.

#### Parameters

##### origin

`Cartesian3`

##### direction

`Cartesian3`

##### time?

`JulianDate`

#### Returns

`Cartesian3` \| `null`

***

### computeRayEllipsoidIntersection()

> **computeRayEllipsoidIntersection**(`origin`, `direction`): `Cartesian3` \| `null`

Compute the intersection of a ray with the celestial ellipsoid (simplified call).

#### Parameters

##### origin

`Cartesian3`

##### direction

`Cartesian3`

#### Returns

`Cartesian3` \| `null`

#### Example

```ts
const hit = celestial.computeRayEllipsoidIntersection(origin, direction);
```

***

### distanceBetweenECEFPointsStable()

> **distanceBetweenECEFPointsStable**(`aECEF`, `bECEF`, `time?`): `number` \| `null`

Compute the distance between two ECEF points. This is more numerically stable for offset non-Earth bodies.

Explanation:
- First transform the ECEF points to the "celestial-body local coordinate system" with the body center as the origin, then compute the Euclidean distance.
- Compared with calculating distance directly in ECEF, this is less prone to precision issues when the body center is far from the Earth's center.

#### Parameters

##### aECEF

`Cartesian3`

Point A (ECEF).

##### bECEF

`Cartesian3`

Point B (ECEF).

##### time?

`JulianDate`

Simulation time (optional; defaults to the internal timeProvider).

#### Returns

`number` \| `null`

***

### EdgePointsToCartographicByRayAndMatrix()

> **EdgePointsToCartographicByRayAndMatrix**(`edgePoints`, `rayPosition`, `matrix`): `Cartographic`[]

#### Parameters

##### edgePoints

`Cartesian3`[]

##### rayPosition

`Cartesian3`

##### matrix

`Matrix4`

#### Returns

`Cartographic`[]

***

### getBodyToWorldRotation()

> **getBodyToWorldRotation**(`time?`, `result?`): `Matrix3`

Get the rotation matrix from the celestial body's rotation to world coordinates.

#### Parameters

##### time?

`JulianDate`

##### result?

`Matrix3`

#### Returns

`Matrix3`

#### Example

```ts
const rot = celestial.getBodyToWorldRotation(viewer.clock.currentTime);
```

***

### getLocalToWorldMatrix()

> **getLocalToWorldMatrix**(`time?`, `result?`): `Matrix4` \| `null`

Get the matrix from celestial-body local coordinates to world coordinates.

#### Parameters

##### time?

`JulianDate`

##### result?

`Matrix4`

#### Returns

`Matrix4` \| `null`

#### Example

```ts
const localToWorld = celestial.getLocalToWorldMatrix();
```

***

### getPositionECEF()

> **getPositionECEF**(`time?`): `Cartesian3` \| `undefined`

Get the ECEF coordinates of the celestial body's center.

#### Parameters

##### time?

`JulianDate`

#### Returns

`Cartesian3` \| `undefined`

#### Example

```ts
const center = celestial.getPositionECEF(viewer.clock.currentTime);
```

***

### getSurfaceGravity()

> **getSurfaceGravity**(): `number`

Get the constant gravitational acceleration near the celestial body's surface, in m/s².

#### Returns

`number`

***

### getTrajectorySample()

> **getTrajectorySample**(`centerTime`, `rangeSeconds?`, `stepSeconds?`, `referenceFrame?`): [`TrajectorySample`](TrajectorySample.md)

Get sparse trajectory samples within the specified time range.

#### Parameters

##### centerTime

`JulianDate`

Center time.

##### rangeSeconds?

`number` = `...`

Range before and after the center time (seconds); defaults to 100 days (86400 * 100).

##### stepSeconds?

`number` = `86400`

Sampling interval (seconds); defaults to 1 day (86400).

##### referenceFrame?

`ReferenceFrame` = `Daisy.ReferenceFrame.INERTIAL`

Reference frame; defaults to INERTIAL (ICRF).

#### Returns

[`TrajectorySample`](TrajectorySample.md)

#### Example

```ts
const sample = celestial.getTrajectorySample(
 viewer.clock.currentTime,
 86400 * 10,
 86400
);
```

***

### getWorldToLocalMatrix()

> **getWorldToLocalMatrix**(`time?`, `result?`): `Matrix4` \| `null`

Get the matrix from world coordinates to celestial-body local coordinates.

#### Parameters

##### time?

`JulianDate`

##### result?

`Matrix4`

#### Returns

`Matrix4` \| `null`

#### Example

```ts
const worldToLocal = celestial.getWorldToLocalMatrix();
```

***

### isEarth()

> **isEarth**(`options?`): `boolean`

Determine whether the current ellipsoid represents Earth, based on its position being near the origin and its radii being near WGS84.

#### Parameters

##### options?

Check conditions.

###### positionToleranceMeters?

`number`

Position tolerance (meters); defaults to 1e-3.

###### radiiToleranceMeters?

`number`

Radii tolerance (meters); defaults to 1e-3.

###### time?

`JulianDate`

#### Returns

`boolean`

#### Example

```ts
const isEarth = celestial.isEarth();
```

***

### localToWorldPoint()

> **localToWorldPoint**(`cartesianLocal`, `time?`, `result?`): `Cartesian3` \| `null`

Convert celestial-body local coordinates to ECEF world coordinates.

#### Parameters

##### cartesianLocal

`Cartesian3`

##### time?

`JulianDate`

##### result?

`Cartesian3`

#### Returns

`Cartesian3` \| `null`

#### Example

```ts
const local = new Daisy.Cartesian3(1000, 0, 0);
const world = celestial.localToWorldPoint(local);
```

***

### rayIntersection()

> **rayIntersection**(`ray`, `time?`): `Cartesian3` \| `null`

Compute the intersection of a ray with the celestial ellipsoid and return the nearest valid intersection.

- The returned coordinates are ECEF world coordinates.
- Returns `null` when there is no hit or the position is invalid.

#### Parameters

##### ray

[`CelestialRayLike`](../types/PW.CelestialRayLike.md)

##### time?

`JulianDate`

#### Returns

`Cartesian3` \| `null`

#### Example

```ts
const ray = { origin: viewer.camera.positionWC, direction: viewer.camera.directionWC };
const hit = celestial.rayIntersection(ray);
```

***

### sortPositions()

> **sortPositions**(`positions`, `time?`): `Cartesian3`[]

#### Parameters

##### positions

`Cartesian3`[]

##### time?

`JulianDate`

#### Returns

`Cartesian3`[]

***

### worldToLocalPoint()

> **worldToLocalPoint**(`cartesianECEF`, `time?`, `result?`): `Cartesian3` \| `null`

Convert ECEF world coordinates to celestial-body local coordinates.

#### Parameters

##### cartesianECEF

`Cartesian3`

##### time?

`JulianDate`

##### result?

`Cartesian3`

#### Returns

`Cartesian3` \| `null`

#### Example

```ts
const local = celestial.worldToLocalPoint(viewer.camera.positionWC);
```

***

### create()

> `static` **create**(`options`): `CelestialEllipsoid`

Create a celestial ellipsoid instance.

#### Parameters

##### options

###### ellipsoid

`Ellipsoid`

###### orientation?

[`CelestialEllipsoidOrientation`](../types/PW.CelestialEllipsoidOrientation.md)

###### position

[`CelestialEllipsoidPositionECEF`](../types/PW.CelestialEllipsoidPositionECEF.md)

###### surfaceGravity?

`number`

###### time?

`JulianDate` \| (() => `JulianDate`)

#### Returns

`CelestialEllipsoid`

#### Example

```ts
const mars = CelestialEllipsoid.create({
 ellipsoid: Daisy.ELLIPSOID.MARS,
 time: () => viewer.clock.currentTime,
 position: (time) => Daisy.Utils.getMarsPositionECEF(time),
});
```

***

### Earth()

> `static` **Earth**(`options?`): `CelestialEllipsoid`

Create the Earth ellipsoid, with the ECEF origin at the Earth's center.

Convention: in Daisy's Fixed/ECEF coordinate system, the Earth's center is (0, 0, 0).

#### Parameters

##### options?

###### ellipsoid?

`Ellipsoid`

#### Returns

`CelestialEllipsoid`

#### Example

```ts
const earth = CelestialEllipsoid.Earth();
```

***

### Moon()

> `static` **Moon**(`options?`): `CelestialEllipsoid`

Create the Moon ellipsoid. The lunar-center position is calculated using Daisy's built-in Simon1994 planetary ephemeris, first in the inertial frame and then converted to ECEF.

#### Parameters

##### options?

###### ellipsoid?

`Ellipsoid`

###### time?

`JulianDate` \| (() => `JulianDate`)

#### Returns

`CelestialEllipsoid`

#### Example

```ts
import { , CelestialEllipsoid } from "daisy-space-sdk";

const moon = CelestialEllipsoid.Moon({
 time: () => Daisy.JulianDate.now(),
});
```

***

### setActiveCamerasProvider()

> `static` **setActiveCamerasProvider**(`provider?`): `void`

Register the active camera provider.

- Used by the position-cache strategy to determine whether a camera is near the celestial body.

#### Parameters

##### provider?

() => `Camera`[]

#### Returns

`void`

#### Example

```ts
CelestialEllipsoid.setActiveCamerasProvider(() => viewer.getAllCesiumCameras());
```

***

### setClockMultiplierProvider()

> `static` **setClockMultiplierProvider**(`provider?`): `void`

Register the clock multiplier provider.

- Used to reduce cache freshness at high time multipliers.

#### Parameters

##### provider?

() => `number`

#### Returns

`void`

#### Example

```ts
CelestialEllipsoid.setClockMultiplierProvider(() => viewer.clock.multiplier);
```

***

### Sun()

> `static` **Sun**(`options?`): `CelestialEllipsoid`

Create the Sun ellipsoid. The solar-center position is calculated using the built-in Simon1994 planetary ephemeris, first in the inertial frame and then converted to ECEF.

Note: a Sun Ellipsoid is not built in, so a spherical ellipsoid with the Sun's mean radius is used by default.

#### Parameters

##### options?

###### ellipsoid?

`Ellipsoid`

###### time?

`JulianDate` \| (() => `JulianDate`)

#### Returns

`CelestialEllipsoid`

#### Example

```ts
const sun = CelestialEllipsoid.Sun({
 time: () => Daisy.JulianDate.now(),
});
```
