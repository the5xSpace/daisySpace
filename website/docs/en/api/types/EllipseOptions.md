[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EllipseOptions

# Type Alias: EllipseOptions

> **EllipseOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

EllipseFeature configuration.

Used to draw ellipse geometry in the scene, such as coverage areas and orbit projections.

## Type Declaration

### center?

> `optional` **center?**: `Daisy.Cartesian3` \| [`Entity`](../classes/Entity.md) \| [`REF`](../enums/REF.md)

Ellipse center.

Supports a coordinate point (`Cartesian3`), an Entity reference (`Entity`), or a parent-entity placeholder (`REF`).

#### Default

```ts
REF.PARENT_ENTITY
```

### clampToGround?

> `optional` **clampToGround?**: `boolean`

Whether to clamp to the ground.

#### Default

```ts
false
```

### classificationType?

> `optional` **classificationType?**: `Daisy.ClassificationType`

Classification target for ground clamping.

Effective only when `clampToGround=true` and the underlying implementation uses GroundPrimitive.

#### Default

```ts
Daisy.ClassificationType.BOTH
```

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `Daisy.DistanceDisplayCondition`

Distance display condition.

The ellipse is hidden automatically when the camera distance is outside this range.

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

Celestial ellipsoid used for ground calculations and celestial-body following.

Note: once this component is added to an Entity through Entity.addFeature(), it is overridden by the Entity's celestialEllipsoid.
The component always follows the Entity's celestial-ellipsoid configuration.

#### Default

```ts
CelestialEllipsoid.Earth()
```

### extrudedHeight?

> `optional` **extrudedHeight?**: `number`

Extruded height in meters.

When set, the ellipse is extruded from the ground to the specified height to create a 3D effect.

### fill?

> `optional` **fill?**: `boolean`

Whether to fill the area.

#### Default

```ts
true
```

### granularity?

> `optional` **granularity?**: `number`

Sampling granularity in radians.

#### Default

```ts
Daisy.Math.RADIANS_PER_DEGREE
```

### height?

> `optional` **height?**: `number`

Ellipse height in meters.

#### Default

```ts
0.1
```

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

Ellipse material.

Supports `Daisy.Material` or a color (`DColor` / CSS color string).

#### Default

```ts
Color.BLUE.withAlpha(0.5)
```

### outline?

> `optional` **outline?**: `boolean`

Whether to draw the outline.

#### Default

```ts
false
```

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](DColor.md)

Outline color.

#### Default

```ts
Color.BLACK
```

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Outline width in pixels.

#### Default

```ts
1
```

### rotation?

> `optional` **rotation?**: `number`

Ellipse rotation angle in radians.

#### Default

```ts
0
```

### semiMajorAxis?

> `optional` **semiMajorAxis?**: `number`

Semi-major axis length in meters.

#### Default

```ts
1000
```

### semiMinorAxis?

> `optional` **semiMinorAxis?**: `number`

Semi-minor axis length in meters.

#### Default

```ts
500
```

### show?

> `optional` **show?**: `boolean`

Whether to show the ellipse.

#### Default

```ts
true
```

### stRotation?

> `optional` **stRotation?**: `number`

Texture rotation angle in radians.

#### Default

```ts
0
```

### updateThrottleMs?

> `optional` **updateThrottleMs?**: `number`

Update throttle interval in milliseconds.

Useful for reducing recalculation overhead during high-frequency updates.

#### Default

```ts
400
```

### vertexFormat?

> `optional` **vertexFormat?**: `Daisy.VertexFormat`

Vertex format.

#### Default

```ts
VertexFormat.POSITION_AND_NORMAL
```
