[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolylineOptions

# Type Alias: PolylineOptions

> **PolylineOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

PolylineFeature configuration.

Describes the line path through `pathway`, supporting positions, entity references, and parent-entity placeholders.

## Type Declaration

### alwaysOnTop?

> `optional` **alwaysOnTop?**: `boolean`

Whether the line is always visible (uses depthFailMaterial when occluded by the Earth).

#### Default

```ts
false
```

### arcType?

> `optional` **arcType?**: `Daisy.ArcType`

Polyline interpolation method.

Controls how adjacent sample points are connected.

### clampToGround?

> `optional` **clampToGround?**: `boolean`

Whether to clamp to the ground.

#### Default

```ts
true
```

### classificationType?

> `optional` **classificationType?**: `Daisy.ClassificationType`

Classification target for the ground-clamped polyline.

Effective only when `clampToGround=true` and the underlying implementation uses GroundPolylinePrimitive.

#### Default

```ts
Daisy.ClassificationType.BOTH
```

### depthFailMaterial?

> `optional` **depthFailMaterial?**: [`DMaterial`](DMaterial.md)

Depth-fail material (optional).

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

Central-body definition used for ground calculations and celestial-body following.

Note: once this component is added to an Entity, this value is overridden by the Entity's own central-body configuration.
The component always follows the central body currently bound to the Entity.

Note: when using a non-default central body, positions in `pathway` must use that body's local coordinates.

#### Default

```ts
CelestialEllipsoid.Earth()
```

### loop?

> `optional` **loop?**: `boolean`

Whether to close the line into a loop.

#### Default

```ts
false
```

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

Material.

### name?

> `optional` **name?**: `string`

Name (for display or debugging).

### pathway?

> `optional` **pathway?**: [`Pathway`](Pathway.md)

Polyline path.

Supports positions, entity references, and parent-entity placeholders.

### show?

> `optional` **show?**: `boolean`

Whether to show the polyline.

#### Default

```ts
true
```

### sortBefore?

> `optional` **sortBefore?**: `boolean`

Whether to sort positions geographically before ground sampling.
Set to false for time-series trajectories to preserve time order.

#### Default

```ts
true
```

### trackingTarget?

> `optional` **trackingTarget?**: `PolylineTrackTarget`

Compatibility alias for `trackTarget`, matching the naming of Feature.enableTracking.

### trackTarget?

> `optional` **trackTarget?**: `PolylineTrackTarget`

Target to track automatically.

When configured, PolylineFeature adds the target to `pathway`:
- When pathway is not provided: use `[REF.SELF_ENTITY, trackTarget]`
- When pathway contains only the host/start point: append `trackTarget` as the endpoint

This is useful for expressing a link where the host Entity always connects to a dynamic target.

### width?

> `optional` **width?**: `number`

Line width in pixels.

The minimum is 1.

#### Default

```ts
2
```
