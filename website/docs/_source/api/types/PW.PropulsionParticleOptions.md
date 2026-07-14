[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / PropulsionParticleOptions

# Type Alias: PropulsionParticleOptions

> **PropulsionParticleOptions** = `Partial`\<[`ParticleFeatureOptions`](../interfaces/ParticleFeatureOptions.md)\> & `Partial`\<[`CapsuleParticleOptions`](../interfaces/CapsuleParticleOptions.md)\> & `object`

## Type Declaration

### alpha?

> `optional` **alpha?**: `number`

透明度覆盖，范围 0~1。

### color?

> `optional` **color?**: [`DColor`](DColor.md)

统一火焰主色。传入后会派生 startColor/endColor。

### emissionRateScale?

> `optional` **emissionRateScale?**: `number`

发射率倍率。

### lengthScale?

> `optional` **lengthScale?**: `number`

粒子速度/长度表现倍率。

### preset?

> `optional` **preset?**: [`PropulsionParticlePreset`](PW.PropulsionParticlePreset.md)

内置粒子预设。当前仅提供 rocket-flame，后续粒子库会继续扩展。

### renderer?

> `optional` **renderer?**: [`PropulsionParticleRenderer`](PW.PropulsionParticleRenderer.md)

喷焰渲染管线。

- `capsule-sprite`：宿主胶囊粒子，一张世界锚定 sprite 面片，适合火箭/飞机喷焰。
- `capsule-billboard`：旧配置兼容别名，内部同样走 `capsule-sprite`。
- `world-particle`：世界粒子，逐粒子积分，适合烟雾、雨雪、水流等离开宿主后的自然粒子。

### sizeScale?

> `optional` **sizeScale?**: `number`

粒子尺寸倍率。
