[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CapsuleParticleEmitter2DOptions

# Interface: CapsuleParticleEmitter2DOptions

## Properties

### angle?

> `optional` **angle?**: `number`

Emission direction in degrees. Consistent with city41/particle.js, 90 means upward.

***

### angleVariance?

> `optional` **angleVariance?**: `number`

***

### blendMode?

> `optional` **blendMode?**: [`CapsuleParticleEmitter2DBlendMode`](../types/CapsuleParticleEmitter2DBlendMode.md)

***

### colorVariance?

> `optional` **colorVariance?**: `number`

Color randomization intensity, 0~1. Used to quickly control color variation between particles.

***

### emissionRate?

> `optional` **emissionRate?**: `number`

Emission-rate semantics, measured as "particle density per cycle". In pre-generated mode, this primarily affects the distribution of birth phases.

***

### enabled?

> `optional` **enabled?**: `boolean`

Whether to enable the internal 2D particle emitter. When disabled, sprite orientation and pixel scale logic are preserved.

***

### endColor?

> `optional` **endColor?**: [`DColor`](../types/DColor.md)

***

### endColorVariance?

> `optional` **endColorVariance?**: [`CapsuleParticleEmitter2DColorVariance`](CapsuleParticleEmitter2DColorVariance.md)

***

### endScale?

> `optional` **endScale?**: `number`

***

### gravity?

> `optional` **gravity?**: [`CapsuleParticleEmitter2DVector`](CapsuleParticleEmitter2DVector.md)

Gravity/continuous acceleration in 2D canvas, in normalized canvas height / sec².

***

### life?

> `optional` **life?**: `number`

***

### lifeVariance?

> `optional` **lifeVariance?**: `number`

***

### particleRadius?

> `optional` **particleRadius?**: `number`

Base radius of a single particle, normalized to canvas width.

***

### particleRadiusVariance?

> `optional` **particleRadiusVariance?**: `number`

***

### radialAcceleration?

> `optional` **radialAcceleration?**: `number`

***

### radialAccelerationVariance?

> `optional` **radialAccelerationVariance?**: `number`

***

### seed?

> `optional` **seed?**: `number`

***

### source?

> `optional` **source?**: [`CapsuleParticleEmitter2DVector`](CapsuleParticleEmitter2DVector.md)

Particle spawn point in normalized canvas coordinates, x/y range typically 0~1.

***

### sourceVariance?

> `optional` **sourceVariance?**: [`CapsuleParticleEmitter2DVector`](CapsuleParticleEmitter2DVector.md)

Particle spawn point random half-width in normalized canvas coordinates.

***

### speed?

> `optional` **speed?**: `number`

Particle speed in normalized canvas height / sec.

***

### speedVariance?

> `optional` **speedVariance?**: `number`

***

### startColor?

> `optional` **startColor?**: [`DColor`](../types/DColor.md)

***

### startColorVariance?

> `optional` **startColorVariance?**: [`CapsuleParticleEmitter2DColorVariance`](CapsuleParticleEmitter2DColorVariance.md)

***

### startScale?

> `optional` **startScale?**: `number`

***

### stretch?

> `optional` **stretch?**: `number`

Particle stretch factor along velocity direction.

***

### tangentialAcceleration?

> `optional` **tangentialAcceleration?**: `number`

***

### tangentialAccelerationVariance?

> `optional` **tangentialAccelerationVariance?**: `number`

***

### totalParticles?

> `optional` **totalParticles?**: `number`

Number of particles rendered in the pre-generated animation cycle.
