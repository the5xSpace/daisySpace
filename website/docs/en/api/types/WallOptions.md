[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / WallOptions

# Type Alias: WallOptions

> **WallOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

WallFeature configuration.

Used to draw wall geometry in the scene (e.g., fences, barriers, vertical surfaces, etc.).

## Type Declaration

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `Daisy.DistanceDisplayCondition`

Distance display condition.

When the camera distance exceeds this range, it is automatically hidden.

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

The celestial ellipsoid used for ground-clamping and celestial body following.

Note: Once this component is added to an entity via Entity.addFeature(), it will be overridden by the entity's celestialEllipsoid,
and the component will always follow the entity's celestial ellipsoid configuration.

#### Default

```ts
CelestialEllipsoid.Earth()
```

### fill?

> `optional` **fill?**: `boolean`

Whether to fill the face.

#### Default

```ts
true
```

### granularity?

> `optional` **granularity?**: `number`

Sampling granularity (in radians).

#### Default

```ts
Daisy.Math.RADIANS_PER_DEGREE
```

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

Wall material.

Supports `Daisy.Material` or colors (`DColor` / CSS color string).

#### Default

```ts
Color.BLUE.withAlpha(0.5)
```

### maximumHeights?

> `optional` **maximumHeights?**: `number`[]

Maximum height for each vertex (in meters).

Array length should match the number of path points.

### minimumHeights?

> `optional` **minimumHeights?**: `number`[]

Minimum height for each vertex (in meters).

Array length should match the number of path points.

### outline?

> `optional` **outline?**: `boolean`

Whether to draw outline.

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

Outline width (in pixels).

#### Default

```ts
1
```

### pathway

> **pathway**: [`Pathway`](Pathway.md)

Wall pathway.

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

Update throttle time (in milliseconds).

Suitable for reducing recalculation overhead during high-frequency updates.

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
