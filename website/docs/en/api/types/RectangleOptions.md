[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / RectangleOptions

# Type Alias: RectangleOptions

> **RectangleOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

RectangleFeature configuration.

Used to draw rectangular geometry in the scene (e.g., area overlays, ground markers, etc.).

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

### extrudedHeight?

> `optional` **extrudedHeight?**: `number`

Extruded height (in meters).

When set, the rectangle extrudes from the ground to the specified height, creating a 3D effect.

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

### height?

> `optional` **height?**: `number`

Rectangle height (in meters).

#### Default

```ts
0.1
```

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

Rectangle material.

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

### rectangle?

> `optional` **rectangle?**: `Daisy.Rectangle`

Rectangle area (west/south/east/north, in radians).

When not set, defaults to a tiny rectangle near the parent entity's position.

### rotation?

> `optional` **rotation?**: `number`

Rectangle rotation angle (in radians).

#### Default

```ts
0
```

### show?

> `optional` **show?**: `boolean`

Whether to show.

#### Default

```ts
true
```

### stRotation?

> `optional` **stRotation?**: `number`

Texture rotation angle (in radians).

#### Default

```ts
0
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
