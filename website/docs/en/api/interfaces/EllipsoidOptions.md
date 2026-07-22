[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EllipsoidOptions

# Interface: EllipsoidOptions

EllipsoidFeature configuration.
 EllipsoidOptions

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### dimensions?

> `optional` **dimensions?**: `Cartesian3`

Ellipsoid three-axis radii (unit: meters), corresponding to the X/Y/Z axis radii respectively.

#### Default

```ts
new Cartesian3(100, 100, 100)
```

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Distance display condition.

Automatically hides when the camera distance exceeds this range.

#### Default

```ts
undefined（由视距策略与运行态决定）
```

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

Suitable for Features that need to be included in the camera zoom/flyTo framing. Guidelines, temporary effects, etc. can disable this.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### lighting?

> `optional` **lighting?**: `boolean`

Whether to enable lighting (affects shading effects).

#### Default

```ts
true
```

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

Ellipsoid material.

Supports `Daisy.Material` or color (`DColor` / CSS color string).

#### Default

```ts
Color.BLUE.withAlpha(0.6)
```

***

### name?

> `optional` **name?**: `string`

Name (for display/debugging).

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### outline?

> `optional` **outline?**: `boolean`

Whether to draw outline.

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

Outline width (pixels).

#### Default

```ts
1
```

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

Whether to enable overlay render pass.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### renderOrder?

> `optional` **renderOrder?**: `number`

Render order value (lower values render first).

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

Whether to show.

#### Default

```ts
true
```

***

### stOffset?

> `optional` **stOffset?**: `Cartesian2`

Texture coordinate offset (unit: dimensionless).

Can be used to scroll/translate the texture when `material` is a mapped material.

#### Default

```ts
Cartesian2.ZERO
```

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
