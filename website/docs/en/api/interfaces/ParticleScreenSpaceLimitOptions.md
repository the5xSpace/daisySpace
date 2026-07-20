[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ParticleScreenSpaceLimitOptions

# Interface: ParticleScreenSpaceLimitOptions

## Properties

### enabled?

> `optional` **enabled?**: `boolean`

Whether to enable screen-space budget. Pass false to disable even if the config object exists.

***

### maxEmissionRate?

> `optional` **maxEmissionRate?**: `number`

Emission rate upper limit. When both this and targetParticleSpacingPx are set, the stricter one applies.

***

### maxParticleSizePx?

> `optional` **maxParticleSizePx?**: `number`

Maximum final billboard size per particle (pixels). Only affects screen-pixel particles with sizeInMeters=false.

***

### maxTailLengthPx?

> `optional` **maxTailLengthPx?**: `number`

Maximum plume length on screen (pixels). Achieved by dynamically compressing particle lifetime and culling over-long particles.

***

### minEmissionRate?

> `optional` **minEmissionRate?**: `number`

Emission rate lower limit. Prevents the plume from becoming too sparse.

***

### targetParticleSpacingPx?

> `optional` **targetParticleSpacingPx?**: `number`

Desired screen-space spacing between particles along the plume direction (pixels). Used to dynamically limit emission rate and avoid particle clouds at close range.
