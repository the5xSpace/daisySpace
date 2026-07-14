[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ParticleScreenSpaceLimitOptions

# Interface: ParticleScreenSpaceLimitOptions

## Properties

### enabled?

> `optional` **enabled?**: `boolean`

是否启用屏幕空间预算。传入 false 时即使配置对象存在也不介入。

***

### maxEmissionRate?

> `optional` **maxEmissionRate?**: `number`

发射率上限。与 targetParticleSpacingPx 同时存在时取更严格者。

***

### maxParticleSizePx?

> `optional` **maxParticleSizePx?**: `number`

单颗粒子最终 billboard 尺寸上限（像素）。仅影响 sizeInMeters=false 的屏幕像素粒子。

***

### maxTailLengthPx?

> `optional` **maxTailLengthPx?**: `number`

尾焰在屏幕上的最大长度（像素）。通过动态压缩粒子生命周期并裁剪超长存活粒子实现。

***

### minEmissionRate?

> `optional` **minEmissionRate?**: `number`

发射率下限。避免尾焰被压得过稀。

***

### targetParticleSpacingPx?

> `optional` **targetParticleSpacingPx?**: `number`

期望粒子沿尾焰方向的屏幕间距（像素）。用于动态限制发射率，避免近距离变成粒子云。
