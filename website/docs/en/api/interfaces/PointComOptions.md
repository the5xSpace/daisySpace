[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PointComOptions

# Interface: PointComOptions

Point feature configuration (PointFeature).

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

Color

#### Default

```ts
Color.WHITE
```

***

### disableDepthTestDistance?

> `optional` **disableDepthTestDistance?**: `number`

Distance to disable depth test (in meters)

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Distance display condition

***

### id?

> `optional` **id?**: `string`

Custom identifier (for underlying render object identification/retrieval).

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

Whether to participate in the bounding sphere aggregation of the parent Entity.

Suitable for Features that need to be included in camera zoom/flyTo framing. Helper lines, temporary effects, etc. can disable this.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### name?

> `optional` **name?**: `string`

Name (can be used for display/debugging).

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

Outline color

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Outline width

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

### pixelSize?

> `optional` **pixelSize?**: `number`

Point size (in pixels).

When set together with `size`, `size` takes precedence.

Compatibility field: equivalent to `sizePx`.

#### Default

```ts
3
```

***

### position?

> `optional` **position?**: `Cartesian3`

Position relative to the entity's coordinate system

#### Default

```ts
Cartesian3.ZERO
```

***

### renderOrder?

> `optional` **renderOrder?**: `number`

Render order value (smaller values render first).

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### scaleByDistance?

> `optional` **scaleByDistance?**: `NearFarScalar`

Scale by distance condition

***

### show?

> `optional` **show?**: `boolean`

Show

#### Default

```ts
true
```

***

### size?

> `optional` **size?**: `number`

Point size (in meters).

Either this or `sizePx`; if both are set, meters take precedence.

***

### sizePx?

> `optional` **sizePx?**: `number`

Point size (in pixels).

When set together with `size`, `size` takes precedence.

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
