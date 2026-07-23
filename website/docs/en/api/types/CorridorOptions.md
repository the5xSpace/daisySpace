[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CorridorOptions

# Type Alias: CorridorOptions

> **CorridorOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

CorridorFeature configuration.

Used to draw corridor geometry along a path in the scene, such as flight corridors and roads.

## Type Declaration

### clampToGround?

> `optional` **clampToGround?**: `boolean`

Whether to clamp to the ground.

#### Default

```ts
false
```

### classificationType?

> `optional` **classificationType?**: `Daisy.ClassificationType`

Ground classification target.

Only effective when `clampToGround=true` and using GroundPrimitive.

#### Default

```ts
Daisy.ClassificationType.BOTH
```

### cornerType?

> `optional` **cornerType?**: `CornerType`

Corner type.

#### Default

```ts
CornerType.ROUNDED
```

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `Daisy.DistanceDisplayCondition`

Distance display condition.

Auto-hides when the camera distance exceeds this range.

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

Celestial ellipsoid used for ground clamping and celestial body following.

Note: once this component is added to an entity via Entity.addFeature(), it will be overridden by the entity's celestialEllipsoid,
and it will always follow the entity's celestial ellipsoid configuration.

#### Default

```ts
CelestialEllipsoid.Earth()
```

### extrudedHeight?

> `optional` **extrudedHeight?**: `number`

Extruded height in meters.

When set, the corridor extrudes from the ground to the specified height, creating a 3D effect.

### fill?

> `optional` **fill?**: `boolean`

Whether to fill the surface.

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

Corridor height in meters.

#### Default

```ts
0.1
```

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

Corridor material.

Supports `Daisy.Material` or a color (`DColor` or CSS color string).

#### Default

```ts
Color.BLUE.withAlpha(0.5)
```

### outline?

> `optional` **outline?**: `boolean`

Whether to draw an outline.

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

### pathway

> **pathway**: [`Pathway`](Pathway.md)

Corridor path.

Supports points, entity references, and parent entity placeholders.

### show?

> `optional` **show?**: `boolean`

Whether to show.

#### Default

```ts
true
```

### updateThrottleMs?

> `optional` **updateThrottleMs?**: `number`

Update throttle time in milliseconds.

Reduces recalculation overhead for high-frequency updates.

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

### width?

> `optional` **width?**: `number`

Corridor width in meters.

#### Default

```ts
1000
```
