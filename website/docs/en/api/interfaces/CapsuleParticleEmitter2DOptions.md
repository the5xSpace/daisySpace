[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CapsuleParticleEmitter2DOptions

# Interface: CapsuleParticleEmitter2DOptions

## Properties

### angle?

> `optional` **angle?**: `number`

发射方向，单位：度。与 city41/particle.js 一致，90 表示向上喷射。

***

### angleVariance?

> `optional` **angleVariance?**: `number`

***

### blendMode?

> `optional` **blendMode?**: [`CapsuleParticleEmitter2DBlendMode`](../types/CapsuleParticleEmitter2DBlendMode.md)

***

### colorVariance?

> `optional` **colorVariance?**: `number`

颜色随机强度，0~1。用于快速控制粒子间色彩差异。

***

### emissionRate?

> `optional` **emissionRate?**: `number`

发射频率语义，单位为“每个循环周期内的粒子密度”。预生成模式下主要影响出生相位分布。

***

### enabled?

> `optional` **enabled?**: `boolean`

是否启用胶囊内部 2D 粒子发射器。关闭时仍保留贴片姿态和像素比例逻辑。

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

2D canvas 内的重力/持续加速度，单位为归一化 canvas 高度 / 秒²。

***

### life?

> `optional` **life?**: `number`

***

### lifeVariance?

> `optional` **lifeVariance?**: `number`

***

### particleRadius?

> `optional` **particleRadius?**: `number`

单颗粒子基础半径，归一化到 canvas 宽度。

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

粒子出生点，归一化 canvas 坐标，x/y 范围通常为 0~1。

***

### sourceVariance?

> `optional` **sourceVariance?**: [`CapsuleParticleEmitter2DVector`](CapsuleParticleEmitter2DVector.md)

粒子出生点随机半宽，归一化 canvas 坐标。

***

### speed?

> `optional` **speed?**: `number`

粒子速度，单位为归一化 canvas 高度 / 秒。

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

粒子沿速度方向的拉伸倍数。

***

### tangentialAcceleration?

> `optional` **tangentialAcceleration?**: `number`

***

### tangentialAccelerationVariance?

> `optional` **tangentialAccelerationVariance?**: `number`

***

### totalParticles?

> `optional` **totalParticles?**: `number`

预生成动画循环内参与绘制的粒子数量。
