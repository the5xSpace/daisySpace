[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CapsuleParticleOptions

# Interface: CapsuleParticleOptions

Base configuration options for a Feature.

The Options type for every concrete Feature extends this interface.

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### alpha?

> `optional` **alpha?**: `number`

***

### anchorRatio?

> `optional` **anchorRatio?**: `number`

Center anchor ratio retained for compatibility with the legacy billboard implementation.

In world-anchored rendering, the nozzle is the local origin of the textured plane, so this field no longer affects the main-path offset.

***

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

***

### coreColor?

> `optional` **coreColor?**: [`DColor`](../types/DColor.md)

***

### disableDepthTestDistance?

> `optional` **disableDepthTestDistance?**: `number`

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

***

### emitter?

> `optional` **emitter?**: [`ParticleEmitterConfig`](../types/ParticleEmitterConfig.md)

Reuses particle-emitter semantics to describe the nozzle cross-section and expansion trend.

Note: capsule particles do not create a ParticleSystem or integrate individual particles.
Here, emitter participates in animation-frame generation only as a shape description;
for example, cone.angle controls flame-edge expansion and radius controls the root radius.

***

### emitter2D?

> `optional` **emitter2D?**: [`CapsuleParticleEmitter2DOptions`](CapsuleParticleEmitter2DOptions.md)

The internal 2D particle emitter used by the capsule animation.

CapsuleParticleFeature still submits only one host-bound textured plane to the scene;
emitter2D runs only while animation frames are pre-generated on an offscreen canvas,
replacing a hard-coded bullet shape or fixed ellipse background. It borrows the
parameter model of city41/particle.js / Cocos2D and suits flames, jets, and energy
beams that need a continuous shape with a genuine particle-flow feel.

***

### emitterDirection?

> `optional` **emitterDirection?**: `ParticleEmitterAttitude`

Attitude correction for the local emission direction, in degrees.

***

### emitterPreset?

> `optional` **emitterPreset?**: [`CapsuleParticleEmitterPreset`](../types/CapsuleParticleEmitterPreset.md)

Built-in 2D emitter preset.

It is neither the final texture nor merely a geometric shape; it jointly determines
the particle birth region, emission direction, speed, lifetime, force fields, color
randomization, and blend mode.

***

### frameCount?

> `optional` **frameCount?**: `number`

Number of pre-generated animation frames. More frames produce smoother motion but use more texture-atlas space.

***

### frameRate?

> `optional` **frameRate?**: `number`

***

### id?

> `optional` **id?**: `string`

Custom identifier, used to identify or look up the underlying render object.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

Whether to include this Feature in its owning Entity's bounding-sphere aggregation.

Useful for Features that should be included in the camera's zoom/flyTo view. It can be disabled for guides and temporary effects.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### length?

> `optional` **length?**: `number`

Length of the capsule body, in meters.

***

### localDirection?

> `optional` **localDirection?**: `Cartesian3`

Direction of the capsule's major axis in the host Entity's local coordinate system.

Vehicles such as rockets and aircraft conventionally use +X as forward, so the exhaust extends along -X by default.

***

### maxLength?

> `optional` **maxLength?**: `number`

Maximum final display length of the capsule, in meters.

Capsule particles use world-anchored sizing by default. When the application explicitly enables
`visualScaleMode: "match-model"`, this acts as a final size safeguard against the textured plane
being enlarged into a huge block by model pixel scaling.

***

### maxLengthPx?

> `optional` **maxLengthPx?**: `number`

Maximum screen-space length, in px.

***

### maxRadius?

> `optional` **maxRadius?**: `number`

Maximum final display radius of the capsule, in meters. The purpose is the same as maxLength.

***

### maxRadiusPx?

> `optional` **maxRadiusPx?**: `number`

Maximum screen-space radius, in px.

***

### maxVisualScale?

> `optional` **maxVisualScale?**: `number`

***

### minLengthPx?

> `optional` **minLengthPx?**: `number`

Minimum screen-space length, in px.

***

### minRadiusPx?

> `optional` **minRadiusPx?**: `number`

Minimum screen-space radius, in px.

***

### minVisualScale?

> `optional` **minVisualScale?**: `number`

***

### modelLengthRatio?

> `optional` **modelLengthRatio?**: `number`

Minimum exhaust length as a ratio of the host model's apparent diameter.

***

### modelMaxLengthRatio?

> `optional` **modelMaxLengthRatio?**: `number`

Maximum exhaust length as a ratio of the host model's apparent diameter.

***

### modelMaxRadiusRatio?

> `optional` **modelMaxRadiusRatio?**: `number`

Maximum exhaust radius as a ratio of the host model's apparent diameter.

***

### modelRadiusRatio?

> `optional` **modelRadiusRatio?**: `number`

Minimum exhaust radius as a ratio of the host model's apparent diameter.

***

### modelRelativeSizing?

> `optional` **modelRelativeSizing?**: `boolean`

Whether to raise the pixel constraints according to the host model's current apparent screen size.

Effective only when screenSpaceSizing=true and the model is visually enlarged by minimumPixelSize.
This does not multiply model scaling directly into world size; it reuses the Model's
minimumPixelSize / maximumScale results during pixel clamping so the exhaust and host model
retain the same visual scale.

***

### name?

> `optional` **name?**: `string`

Name, which can be used for display or debugging.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

Whether to enable the overlay render pass.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### particleImage?

> `optional` **particleImage?**: [`CapsuleParticleImageSource`](../types/CapsuleParticleImageSource.md)

Image or texture source for an individual particle.

Note: this image is not the final static capsule texture; it is the single-particle stamp
used to generate each frame. Capsule particles still pre-generate animation frames so that
switching the image does not degrade the effect into a motionless plane.

***

### position?

> `optional` **position?**: `Cartesian3`

Local offset of the capsule particle anchor, usually the engine nozzle position.

***

### power?

> `optional` **power?**: `number`

Visual power, in the range 0-1. Frequent changes affect only size, opacity, and playback speed; animation frames are not regenerated.

***

### powerAffectsAlpha?

> `optional` **powerAffectsAlpha?**: `boolean`

Whether power contributes to opacity.

***

### powerAffectsPlayback?

> `optional` **powerAffectsPlayback?**: `boolean`

Whether power contributes to frame playback speed.

***

### powerAffectsSize?

> `optional` **powerAffectsSize?**: `boolean`

Whether power contributes to length/radius scaling. Generic capsule particles can disable this to avoid tying direction or shape to power semantics.

***

### powerAffectsVisibility?

> `optional` **powerAffectsVisibility?**: `boolean`

Whether power contributes to visibility. Defaults to true, preserving the legacy behavior of hiding exhaust when stopped.

***

### preset?

> `optional` **preset?**: [`CapsuleParticlePreset`](../types/CapsuleParticlePreset.md)

***

### radius?

> `optional` **radius?**: `number`

Root radius of the capsule, in meters.

***

### renderOrder?

> `optional` **renderOrder?**: `number`

Render order value; smaller values render first.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### rotation?

> `optional` **rotation?**: `number`

Screen rotation field retained for compatibility with the legacy billboard implementation. The world-anchored main path does not use this field.

***

### screenSpaceSizing?

> `optional` **screenSpaceSizing?**: `boolean`

Enable pixel-constrained sizing.

Capsule particles remain world-anchored textured planes; this switch only constrains length/radius
to the specified pixel range. It does not use billboard screen offsets or change the nozzle anchor.

***

### show?

> `optional` **show?**: `boolean`

***

### tailColor?

> `optional` **tailColor?**: [`DColor`](../types/DColor.md)

***

### textureHeight?

> `optional` **textureHeight?**: `number`

***

### textureWidth?

> `optional` **textureWidth?**: `number`

***

### turbulence?

> `optional` **turbulence?**: `number`

Noise intensity, effective only while generating animation frames.

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)

***

### visualScaleMode?

> `optional` **visualScaleMode?**: [`CapsuleParticleVisualScaleMode`](../types/CapsuleParticleVisualScaleMode.md)

Whether to synchronize scaling with the host model's minimumPixelSize visual scale.

The default is `none`. Rocket and aircraft exhaust should usually use screenSpaceSizing
for pixel constraints; model minimumPixelSize scaling should not be passed directly to world size.
