[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolylineGroundOptions

# Type Alias: PolylineGroundOptions

> **PolylineGroundOptions** = `object`

Parameters for creating a ground-clamped Polyline.

## Remarks

- When `clampToGround=true`, the provided `positions` are sampled and interpolated to the ground surface for a smoother, more terrain-following polyline effect (internally uses `GeoMath.computeGroundPositions`).
- `material` supports automatic material types from the Daisy SDK (such as `Daisy.Color`, Daisy.Material, etc.).

## Example

```ts
import { , PolylineGroundRenderable } from "daisy-space-sdk";

const line = new PolylineGroundRenderable(viewer, {
 clampToGround: true,
 width: 4,
 material: Daisy.Color.CYAN.withAlpha(0.9),
 positions: [
 Daisy.Cartesian3.fromDegrees(116.39, 39.9),
 Daisy.Cartesian3.fromDegrees(116.41, 39.91),
 ],
});
```

## Properties

### alwaysOnTop?

> `optional` **alwaysOnTop?**: `boolean`

Whether always visible (internally equivalent to depthFailMaterial = material).

#### Default

```ts
false
```

***

### arcType?

> `optional` **arcType?**: `Daisy.ArcType`

***

### clampToGround?

> `optional` **clampToGround?**: `boolean`

Whether to render clamped to ground.

#### Default

```ts
false
```

***

### classificationType?

> `optional` **classificationType?**: `Daisy.ClassificationType`

***

### depthFailMaterial?

> `optional` **depthFailMaterial?**: [`DMaterial`](DMaterial.md)

Material used when depth test fails (can be used to remain visible when occluded by Earth).

***

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md) \| `Daisy.Ellipsoid`

Ellipsoid used for ground sampling.

#### Default

```ts
CelestialEllipsoid.Earth()
```

***

### loop?

> `optional` **loop?**: `boolean`

Whether to close the path during ground sampling (affects the start/end handling of interpolation/sampling).

#### Default

```ts
false
```

***

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

Polyline material.

#### Default

```ts
Daisy.Color.YELLOW
```

***

### positions?

> `optional` **positions?**: `Daisy.Cartesian3`[]

Polyline control points (world coordinates).

#### Default

```ts
[]
```

***

### sampleCount?

> `optional` **sampleCount?**: `number`

Number of ground interpolation sample points (sampling density).

#### Default

```ts
80
```

***

### show?

> `optional` **show?**: `boolean`

Whether to show.

#### Default

```ts
true
```

***

### sortBefore?

> `optional` **sortBefore?**: `boolean`

Whether to sort points in geographic order before ground sampling.
For time-series trajectories (such as sub-satellite points), set to false to preserve temporal order.

#### Default

```ts
true
```

***

### width?

> `optional` **width?**: `number`

Line width (in pixels).

#### Default

```ts
2
```

