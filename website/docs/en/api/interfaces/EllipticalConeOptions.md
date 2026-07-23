[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EllipticalConeOptions

# Interface: EllipticalConeOptions

EllipticalConeFeature configuration.

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### autoLength?

> `optional` **autoLength?**: `boolean`

Whether to enable automatic length (dynamically computes height).

When true, the height is updated dynamically from runtime conditions such as ground or ray intersections, which may override the input `height`.

#### Default

```ts
false
```

***

### bottomSemiMajorAxis?

> `optional` **bottomSemiMajorAxis?**: `number`

Bottom semi-major axis in meters.

#### Default

```ts
100
```

***

### bottomSemiMinorAxis?

> `optional` **bottomSemiMinorAxis?**: `number`

Bottom semi-minor axis in meters.

#### Default

```ts
50
```

***

### capBottom?

> `optional` **capBottom?**: `boolean`

Whether to cap the bottom.

***

### capTop?

> `optional` **capTop?**: `boolean`

Whether to cap the top.

***

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

Color (when `material` is not specified, a default material is usually created from this color).

#### Default

```ts
Color.BLUE.withAlpha(0.5)
```

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Distance display condition.

***

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

Ellipsoid configuration used for celestial-ellipsoid calculations such as ground clamping and ray intersections.

Note: once this component is added to an Entity through Entity.addFeature(), it is overridden by the Entity's celestialEllipsoid.
The component always follows the Entity's celestial-ellipsoid configuration.

***

### emitDirection?

> `optional` **emitDirection?**: [`EmitDirection`](../enums/EmitDirection.md)

Emission direction and alignment reference.

- `TOP_CENTER`: align using the top as the reference
- `BOTTOM_CENTER`: align using the bottom as the reference
- `CENTER`: align using the center as the reference
- `TO_GROUND`: extend toward the ground (usually used with `autoLength`)

#### Default

```ts
EmitDirection.TOP_CENTER
```

***

### fill?

> `optional` **fill?**: `boolean`

Whether to fill the faces.

#### Default

```ts
true
```

***

### height?

> `optional` **height?**: `number`

Height in meters.

#### Default

```ts
100
```

***

### id?

> `optional` **id?**: `string`

Custom identifier for identifying or retrieving the underlying render object.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

Whether to participate in the bounding-sphere aggregation of the owning Entity.

Useful for Features that should be included in camera zoom/flyTo framing. Auxiliary lines and temporary effects can disable it.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

Material.

Supports `Daisy.Material` or a color (`DColor` / CSS color string).

***

### name?

> `optional` **name?**: `string`

Name (for display or debugging).

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### numberOfVerticalLines?

> `optional` **numberOfVerticalLines?**: `number`

Number of vertical lines for wireframe or outline assistance.

#### Default

```ts
0
```

***

### outline?

> `optional` **outline?**: `boolean`

Whether to draw the outline.

#### Default

```ts
false
```

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

Outline color.

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Outline width.

#### Default

```ts
1
```

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

Whether to enable the overlay render pass.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### position?

> `optional` **position?**: `Cartesian3`

Position in the Entity's local coordinate system.

***

### renderOrder?

> `optional` **renderOrder?**: `number`

Render-order value (lower values render first).

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### shadows?

> `optional` **shadows?**: `ShadowMode`

Shadow mode.

***

### show?

> `optional` **show?**: `boolean`

Whether to show.

#### Default

```ts
true
```

***

### slices?

> `optional` **slices?**: `number`

Number of slices (larger values produce smoother geometry at a higher cost).

#### Default

```ts
64
```

***

### topSemiMajorAxis?

> `optional` **topSemiMajorAxis?**: `number`

Top semi-major axis in meters.

#### Default

```ts
1
```

***

### topSemiMinorAxis?

> `optional` **topSemiMinorAxis?**: `number`

Top semi-minor axis in meters.

#### Default

```ts
1
```

***

### vertexFormat?

> `optional` **vertexFormat?**: `VertexFormat`

Vertex format.

#### Default

```ts
VertexFormat.POSITION_AND_NORMAL
```

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
