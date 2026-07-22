[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SphereOptions

# Interface: SphereOptions

SphereFeature configuration.

A sphere is a convenient wrapper around EllipsoidFeature with equal three-axis radii.

## Extends

- `Omit`\<[`EllipsoidOptions`](EllipsoidOptions.md), `"dimensions"`\>

## Properties

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Distance display condition.

Automatically hides when the camera distance exceeds this range.

#### Default

```ts
undefined（由视距策略与运行态决定）
```

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`distanceDisplayCondition`](EllipsoidOptions.md#distancedisplaycondition)

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

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`lighting`](EllipsoidOptions.md#lighting)

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

Sphere material.

#### Overrides

[`EllipsoidOptions`](EllipsoidOptions.md).[`material`](EllipsoidOptions.md#material)

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

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`outline`](EllipsoidOptions.md#outline)

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

Outline color.

#### Overrides

[`EllipsoidOptions`](EllipsoidOptions.md).[`outlineColor`](EllipsoidOptions.md#outlinecolor)

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Outline width (pixels).

#### Default

```ts
1
```

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`outlineWidth`](EllipsoidOptions.md#outlinewidth)

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

Whether to enable overlay render pass.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### radius?

> `optional` **radius?**: `number`

Sphere radius (unit: meters).

#### Default

```ts
100
```

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

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`shadows`](EllipsoidOptions.md#shadows)

***

### show?

> `optional` **show?**: `boolean`

Whether to show.

#### Default

```ts
true
```

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`show`](EllipsoidOptions.md#show)

***

### stOffset?

> `optional` **stOffset?**: `Cartesian2`

Texture coordinate offset (unit: dimensionless).

Can be used to scroll/translate the texture when `material` is a mapped material.

#### Default

```ts
Cartesian2.ZERO
```

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`stOffset`](EllipsoidOptions.md#stoffset)

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
