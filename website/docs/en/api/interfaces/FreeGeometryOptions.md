[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FreeGeometryOptions

# Interface: FreeGeometryOptions

FreeGeometryFeature options.

## Extends

- [`EntityComOptions`](EntityComOptions.md)

## Properties

### asynchronous?

> `optional` **asynchronous?**: `boolean`

Create geometry asynchronously, default false

***

### autoNormals?

> `optional` **autoNormals?**: [`AutoNormalsMode`](../types/AutoNormalsMode.md)

Normal auto-computation mode, default "flat"

***

### closed?

> `optional` **closed?**: `boolean`

Whether the geometry is a closed solid (affects lighting), default true

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Distance display condition.

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`distanceDisplayCondition`](EntityComOptions.md#distancedisplaycondition)

***

### doubleSided?

> `optional` **doubleSided?**: `boolean`

Double-sided rendering (disables backface culling), default false

***

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

Ellipsoid configuration used for ground-clamping, ray intersection, and other "celestial ellipsoid" related calculations.

Note: Once this component is added to an entity via Entity.addFeature(), it will be overridden by the entity's celestialEllipsoid,
and the component will always follow the entity's celestial ellipsoid configuration.

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`ellipsoid`](EntityComOptions.md#ellipsoid)

***

### flat?

> `optional` **flat?**: `boolean`

Flat shading (non-smooth shading), default false

***

### geometry

> **geometry**: [`DaisyGeometryDescriptor`](DaisyGeometryDescriptor.md)

Geometry descriptor (required)

***

### id?

> `optional` **id?**: `string`

Custom identifier (for underlying render object identification/retrieval).

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`id`](EntityComOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

Whether to participate in the bounding sphere aggregation of the parent Entity.

Suitable for Features that need to be included in camera zoom/flyTo framing. Helper lines, temporary effects, etc. can disable this.

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`includeInBoundingSphere`](EntityComOptions.md#includeinboundingsphere)

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

Material, using the DMaterial system

***

### name?

> `optional` **name?**: `string`

Name (can be used for display/debugging).

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`name`](EntityComOptions.md#name)

***

### outline?

> `optional` **outline?**: `boolean`

Show outline, default false

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

Outline color

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

Whether to enable the overlay render pass.

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`overlayPass`](EntityComOptions.md#overlaypass)

***

### position?

> `optional` **position?**: `Cartesian3`

Position relative to the entity's coordinate system.

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`position`](EntityComOptions.md#position)

***

### renderOrder?

> `optional` **renderOrder?**: `number`

Render order value (smaller values render first).

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`renderOrder`](EntityComOptions.md#renderorder)

***

### show

> **show**: `boolean`

Whether to show.

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`show`](EntityComOptions.md#show)

***

### translucent?

> `optional` **translucent?**: `boolean`

Translucent, default inferred from material

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`EntityComOptions`](EntityComOptions.md).[`visibility`](EntityComOptions.md#visibility)

***

### wireframe?

> `optional` **wireframe?**: `boolean`

Wireframe mode, default false
