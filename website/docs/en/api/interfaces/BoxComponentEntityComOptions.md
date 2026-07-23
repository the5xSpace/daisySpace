[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BoxComponentEntityComOptions

# Interface: BoxComponentEntityComOptions

Box component properties for BoxComponentEntityComOptions.

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### dimensions?

> `optional` **dimensions?**: `Cartesian3`

Box dimensions in meters, corresponding to the lengths along the X, Y, and Z axes.

#### Default

```ts
new Cartesian3(100, 100, 100)
```

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Display distance condition.

The component is hidden automatically when the camera distance falls outside this range.

#### Default

```ts
viewDistanceConst.FAR
```

***

### id?

> `optional` **id?**: `string`

Custom identifier, used to identify or look up the underlying render object.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

Whether to include this component in its owning Entity's bounding-sphere aggregation.

Useful for Features that should be included in the camera's zoom/flyTo view. It can be disabled for guides and temporary effects.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

Box material.

Accepts `Daisy.Material` or a color (`DColor` / CSS color string).

#### Default

```ts
Color.BLUE.withAlpha(0.6)
```

***

### name?

> `optional` **name?**: `string`

Name, which can be used for display or debugging.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### outline?

> `optional` **outline?**: `boolean`

Whether to draw the outline.

#### Default

```ts
true
```

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

Outline color.

#### Default

```ts
Color.BLACK
```

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Outline width in pixels.

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

### renderOrder?

> `optional` **renderOrder?**: `number`

Render order value; smaller values render first.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### shadows?

> `optional` **shadows?**: `ShadowMode`

Shadow mode.

#### Default

```ts
ShadowMode.DISABLED
```

***

### show?

> `optional` **show?**: `boolean`

Whether to show the component.

#### Default

```ts
true
```

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
