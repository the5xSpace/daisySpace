[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ParticleFeatureOptions

# Interface: ParticleFeatureOptions

Feature base configuration options.

All concrete Feature Options types inherit from this interface.

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### bursts?

> `optional` **bursts?**: `ParticleBurst`[]

***

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

***

### emissionRate?

> `optional` **emissionRate?**: `number`

***

### emitter?

> `optional` **emitter?**: [`ParticleEmitterLike`](ParticleEmitterLike.md) \| [`ParticleEmitterConfig`](../types/ParticleEmitterConfig.md)

***

### emitterDirection?

> `optional` **emitterDirection?**: `ParticleEmitterAttitude`

Emitter local three-axis attitude (heading / pitch / roll, unit: degrees), defaults to `{ heading: 0, pitch: 0, roll: 0 }` (+Z direction).

***

### emitterModelMatrix?

> `optional` **emitterModelMatrix?**: `Matrix4`

***

### endColor?

> `optional` **endColor?**: [`DColor`](../types/DColor.md)

***

### endScale?

> `optional` **endScale?**: `number`

***

### followEntity?

> `optional` **followEntity?**: `boolean`

When true, emitted particles store position/velocity in host local coordinates,
and are transformed back into the current host matrix each frame, preventing a fast-moving host from leaving alive particles behind in world space.

***

### gravity?

> `optional` **gravity?**: `number` \| `boolean` \| `Cartesian3` \| \{ `acceleration?`: `number`; `enabled?`: `boolean`; `vector?`: `Cartesian3`; \}

Particle gravity settings.

- `false`/unset: disables gravity, keeps default particle behavior
- `true`: uses the host Entity's `CelestialEllipsoid.surfaceGravity`
- `number`: applies the specified m/s² along the host celestial body's local -Up direction
- `Cartesian3`: directly used as a world-space acceleration vector in m/s²
- object: can override acceleration magnitude, direction, or toggle

***

### id?

> `optional` **id?**: `string`

Custom identifier (for underlying render object identification/retrieval).

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### image?

> `optional` **image?**: [`ImageAssetSource`](../types/ImageAssetSource.md)

Particle image. Supports:
- Raw URL / Canvas / Image (backward compatible)
- Image crop `{ image, x, y, width, height }`
- Sprite sheet `{ image, frameWidth, frameHeight, count, columns }`

***

### imageSize?

> `optional` **imageSize?**: `Cartesian2`

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

Whether to participate in the bounding sphere aggregation of the parent Entity.

Suitable for Features that need to be included in camera zoom/flyTo framing. Guidelines, temporary effects, etc. can be disabled.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### lifetime?

> `optional` **lifetime?**: `number`

***

### loop?

> `optional` **loop?**: `boolean`

***

### mass?

> `optional` **mass?**: `number`

***

### maximumImageSize?

> `optional` **maximumImageSize?**: `Cartesian2`

***

### maximumMass?

> `optional` **maximumMass?**: `number`

***

### maximumParticleLife?

> `optional` **maximumParticleLife?**: `number`

***

### maximumSpeed?

> `optional` **maximumSpeed?**: `number`

***

### minimumImageSize?

> `optional` **minimumImageSize?**: `Cartesian2`

***

### minimumMass?

> `optional` **minimumMass?**: `number`

***

### minimumParticleLife?

> `optional` **minimumParticleLife?**: `number`

***

### minimumSpeed?

> `optional` **minimumSpeed?**: `number`

***

### name?

> `optional` **name?**: `string`

Name (used for display/debugging).

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

Whether to enable the overlay render pass.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### particleLife?

> `optional` **particleLife?**: `number`

***

### position?

> `optional` **position?**: `Cartesian3`

***

### preserveImageColor?

> `optional` **preserveImageColor?**: `boolean`

When true, preserves the texture's own RGB and only uses startColor/endColor alpha for fade in/out.
Image crop and sprite sheet modes enable this by default; plain canvas/image/URL retains original tinting behavior.

***

### renderOrder?

> `optional` **renderOrder?**: `number`

Render order value (lower values render first).

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### scale?

> `optional` **scale?**: `number`

***

### screenSpaceLimit?

> `optional` **screenSpaceLimit?**: `boolean` \| [`ParticleScreenSpaceLimitOptions`](ParticleScreenSpaceLimitOptions.md)

Screen space budget. Used for effects like jet exhaust to maintain reasonable pixel length, density, and size as the camera moves closer or farther away.

***

### show?

> `optional` **show?**: `boolean`

***

### sizeInMeters?

> `optional` **sizeInMeters?**: `boolean`

***

### speed?

> `optional` **speed?**: `number`

***

### startColor?

> `optional` **startColor?**: [`DColor`](../types/DColor.md)

***

### startScale?

> `optional` **startScale?**: `number`

***

### updateCallback?

> `optional` **updateCallback?**: `updateCallback`

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
