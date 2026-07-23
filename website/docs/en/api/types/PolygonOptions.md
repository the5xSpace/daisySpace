[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolygonOptions

# Type Alias: PolygonOptions

> **PolygonOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

PolygonFeature configuration.

## Type Declaration

### arcType?

> `optional` **arcType?**: `Daisy.ArcType`

Arc type for connecting edges.

#### Default

```ts
Daisy.ArcType.GEODESIC
```

### autoSortPositions?

> `optional` **autoSortPositions?**: `boolean`

Whether to automatically sort input positions to avoid self-intersections and similar issues.

### clampToGround?

> `optional` **clampToGround?**: `boolean`

### closeBottom?

> `optional` **closeBottom?**: `boolean`

Whether to close the bottom when extruding.

#### Default

```ts
true
```

### closeTop?

> `optional` **closeTop?**: `boolean`

Whether to close the top when extruding.

#### Default

```ts
true
```

### depthWriteEnabled?

> `optional` **depthWriteEnabled?**: `boolean`

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `Daisy.DistanceDisplayCondition`

Distance display condition.

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

Celestial ellipsoid used for ground calculations and celestial-body following.

Note: once this component is added to an Entity through Entity.addFeature(), it is overridden by the Entity's celestialEllipsoid.
The component always follows the Entity's celestial-ellipsoid configuration.

### extrudedHeight?

> `optional` **extrudedHeight?**: `number`

Extruded height in meters.

### fill?

> `optional` **fill?**: `boolean`

### granularity?

> `optional` **granularity?**: `number`

Sampling granularity in radians.

#### Default

```ts
Daisy.Math.RADIANS_PER_DEGREE
```

### height?

> `optional` **height?**: `number`

Height in meters.

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

Material.

### name?

> `optional` **name?**: `string`

Name (for display or debugging).

### outline?

> `optional` **outline?**: `boolean`

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](DColor.md)

Outline color.

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Outline width.

#### Default

```ts
1
```

### pathway

> **pathway**: [`Pathway`](Pathway.md) \| [`Holes`](Holes.md) \| `Daisy.PolygonHierarchy`

Polygon vertex and hole input.

Supports:
- `Pathway`: sequence of positions or Entity references
- `Holes`: recursive positions + holes structure
- `Daisy.PolygonHierarchy`

### perPositionHeight?

> `optional` **perPositionHeight?**: `boolean`

Whether to specify the height independently for each position (subject to combination limits with ground clamping, extrusion, and related settings).

### rebuildThrottleMs?

> `optional` **rebuildThrottleMs?**: `number`

Rebuild throttle interval in milliseconds.

### show?

> `optional` **show?**: `boolean`

Whether to show the polygon.

#### Default

```ts
true
```

### stRotation?

> `optional` **stRotation?**: `number`

Texture rotation in radians.

#### Default

```ts
0
```

### textureCoordinates?

> `optional` **textureCoordinates?**: `Daisy.Cartesian2`[] \| [`TextureCoordinatesHoles`](TextureCoordinatesHoles.md) \| `Daisy.PolygonHierarchy`

Texture-coordinate input.

### updateThrottleMs?

> `optional` **updateThrottleMs?**: `number`

Update throttle interval in milliseconds.

Useful for reducing recalculation overhead during high-frequency updates.

### vertexFormat?

> `optional` **vertexFormat?**: `Daisy.VertexFormat`

Vertex format.

#### Default

```ts
VertexFormat.DEFAULT
```
