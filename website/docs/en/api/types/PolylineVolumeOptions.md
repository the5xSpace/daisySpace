[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolylineVolumeOptions

# Type Alias: PolylineVolumeOptions

> **PolylineVolumeOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

PolylineVolumeFeature configuration.

Used to draw pipe/volume geometry along a path (e.g., cylindrical pipes, square channels, etc.).

## Type Declaration

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

Pipe material.

Supports `Daisy.Material` or colors (`DColor` / CSS color string).

#### Default

```ts
Color.BLUE.withAlpha(0.5)
```

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

Pipe pathway.

Supports points, entity references, and parent entity placeholders.

### shape?

> `optional` **shape?**: `Daisy.Cartesian2`[]

Pipe cross-section shape (array of 2D points defining the cross-section contour).

Defaults to circular cross-section (16-sided polygon approximation, radius 100 meters).

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
