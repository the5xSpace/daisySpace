[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / PropulsionParticleOptions

# Type Alias: PropulsionParticleOptions

> **PropulsionParticleOptions** = `Partial`\<[`ParticleFeatureOptions`](../interfaces/ParticleFeatureOptions.md)\> & `Partial`\<[`CapsuleParticleOptions`](../interfaces/CapsuleParticleOptions.md)\> & `object`

## Type Declaration

### alpha?

> `optional` **alpha?**: `number`

Opacity override, range 0~1.

### color?

> `optional` **color?**: [`DColor`](DColor.md)

Uniform flame main color. After passing, startColor/endColor will be derived.

### emissionRateScale?

> `optional` **emissionRateScale?**: `number`

Emission rate scale.

### lengthScale?

> `optional` **lengthScale?**: `number`

Particle speed/length scale.

### preset?

> `optional` **preset?**: [`PropulsionParticlePreset`](PW.PropulsionParticlePreset.md)

Built-in particle preset. Currently only provides rocket-flame; more presets will be added in the future.

### renderer?

> `optional` **renderer?**: [`PropulsionParticleRenderer`](PW.PropulsionParticleRenderer.md)

Propulsion particle renderer.

- `capsule-sprite`: Host capsule particle, a world-anchored sprite patch, suitable for rocket/aircraft plumes.
- `capsule-billboard`: Legacy config compatibility alias; internally also maps to `capsule-sprite`.
- `world-particle`: World particle, integrated per particle, suitable for natural particles like smoke, rain, snow, and water flow after leaving the host.

### sizeScale?

> `optional` **sizeScale?**: `number`

Particle size scale.
