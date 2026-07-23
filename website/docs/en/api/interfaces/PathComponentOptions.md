[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PathComponentOptions

# Interface: PathComponentOptions

Configuration for TrailPathFeature.

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### ~~afterSecond?~~

> `optional` **afterSecond?**: `number`

Compatibility alias for futureSecond (continued use is not recommended).

#### Deprecated

Use futureSecond instead.

***

### autoOptimize?

> `optional` **autoOptimize?**: `boolean`

Whether to enable automatic optimization.

- Enabled: the system adaptively adjusts sampling density based on camera scale, entity speed, and entity count.
- Disabled: samples strictly according to the user-provided resolutionSecond/maxDirectionInterpolationCount.

#### Default

```ts
true
```

***

### ~~beforeSecond?~~

> `optional` **beforeSecond?**: `number`

Compatibility alias for historySecond (continued use is not recommended).

#### Deprecated

Use historySecond instead.

***

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

Trail line color at the position corresponding to the current frame.

#### Default

```ts
Color.PURPLE.withAlpha(0.8)
```

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Display distance condition.

***

### futureColor?

> `optional` **futureColor?**: [`DColor`](../types/DColor.md)

Future trail color.

#### Default

```ts
Color.PURPLE.withAlpha(0.35)
```

***

### futureMaterial?

> `optional` **futureMaterial?**: [`DMaterial`](../types/DMaterial.md)

Future trail material, which takes precedence over futureColor.

***

### futureSecond?

> `optional` **futureSecond?**: `number`

The time span displayed backward toward the future, in seconds.

#### Default

```ts
43200
```

***

### historyColor?

> `optional` **historyColor?**: [`DColor`](../types/DColor.md)

Historical trail color.

#### Default

```ts
Color.PURPLE.withAlpha(0.8)
```

***

### historyMaterial?

> `optional` **historyMaterial?**: [`DMaterial`](../types/DMaterial.md)

Historical trail material, which takes precedence over historyColor.

***

### historySecond?

> `optional` **historySecond?**: `number`

The time span displayed forward toward the past, in seconds.

#### Default

```ts
43200
```

***

### id?

> `optional` **id?**: `string`

Custom identifier used to look up the trail rendering object.

#### Overrides

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

Whether to participate in the bounding-sphere aggregation of the owning Entity.

Useful for Features that should be included when the camera uses zoom/flyTo. Auxiliary lines and temporary effects can disable this.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### materialAppearance?

> `optional` **materialAppearance?**: `MaterialAppearance`

Rendering appearance of the line material (advanced use).

***

### maxDirectionInterpolationCount?

> `optional` **maxDirectionInterpolationCount?**: `number`

Maximum number of interpolations using the "motion direction vector".

Used to smooth interpolation for trails with large direction changes; larger values are smoother but more expensive.

#### Default

```ts
720
```

***

### name?

> `optional` **name?**: `string`

Name, which can be used for display or debugging.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

Whether to enable the overlay rendering pass.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### renderOrder?

> `optional` **renderOrder?**: `number`

Rendering order value; smaller values are rendered first.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### resolutionSecond?

> `optional` **resolutionSecond?**: `number`

Trail sampling resolution, in seconds.

#### Default

```ts
60
```

***

### show?

> `optional` **show?**: `boolean`

Whether to display the trail.

#### Default

```ts
true
```

***

### updateIntervalSecond?

> `optional` **updateIntervalSecond?**: `number`

Data refresh interval, in seconds.

#### Default

```ts
1
```

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)

***

### width?

> `optional` **width?**: `number`

Line width in pixels.

#### Default

```ts
2
```
