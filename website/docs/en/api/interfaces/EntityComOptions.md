[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EntityComOptions

# Interface: EntityComOptions

General configuration for Features on an Entity.

This type is typically used as the base options class for specific Features.

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Extended by

- [`FreeGeometryOptions`](FreeGeometryOptions.md)

## Properties

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Distance display condition.

***

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

Ellipsoid configuration used when the component involves ground-clamping, ray intersection, or other celestial ellipsoid calculations.

Note: Once the component is added to an entity via Entity.addFeature(), it will be overridden by the entity's celestialEllipsoid,
and will always follow the entity's celestial ellipsoid configuration.

***

### id?

> `optional` **id?**: `string`

Custom ID (for underlying render object identification/retrieval).

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

Whether to participate in the bounding sphere aggregation of the owning Entity.

Suitable for Features that need to be framed by camera zoom/flyTo. Guidelines, temporary effects, etc. can be disabled.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### name?

> `optional` **name?**: `string`

Name (can be used for display/debugging).

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

Whether to enable the overlay render pass.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### position?

> `optional` **position?**: `Cartesian3`

Position relative to the entity's coordinate system.

***

### renderOrder?

> `optional` **renderOrder?**: `number`

Render order value (lower values render first).

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### show

> **show**: `boolean`

Whether to show the component.

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
