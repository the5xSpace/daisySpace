[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FeatureOptions

# Interface: FeatureOptions

Base configuration options for Feature.

All concrete Feature Options types inherit from this interface.

## Extended by

- [`EntityComOptions`](EntityComOptions.md)
- [`TextOptions`](TextOptions.md)
- [`CylinderOptions`](CylinderOptions.md)
- [`EllipticalConeOptions`](EllipticalConeOptions.md)
- [`ModelOptions`](ModelOptions.md)
- [`PointComOptions`](PointComOptions.md)
- [`PathComponentOptions`](PathComponentOptions.md)
- [`BoxComponentEntityComOptions`](BoxComponentEntityComOptions.md)
- [`EllipsoidOptions`](EllipsoidOptions.md)
- [`CubeOptions`](CubeOptions.md)
- [`ParticleFeatureOptions`](ParticleFeatureOptions.md)
- [`CapsuleParticleOptions`](CapsuleParticleOptions.md)
- [`PopoverOptions`](UI.PopoverOptions.md)

## Properties

### id?

> `optional` **id?**: `string`

Custom identifier (used for underlying render object identification/retrieval).

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

Whether to participate in the bounding sphere aggregation of the parent Entity.

Suitable for Features that need to be included in camera zoom/flyTo framing. Auxiliary lines, temporary effects, etc. can disable this.

***

### name?

> `optional` **name?**: `string`

Name (can be used for display/debugging).

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

Whether to enable the overlay render pass.

***

### renderOrder?

> `optional` **renderOrder?**: `number`

Render order value (lower values render first).

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.
