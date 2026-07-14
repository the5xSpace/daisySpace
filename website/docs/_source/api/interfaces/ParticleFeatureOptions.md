[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ParticleFeatureOptions

# Interface: ParticleFeatureOptions

Feature 基础配置选项。

所有具体 Feature 的 Options 类型都继承自该接口。

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

发射器局部三轴姿态（heading / pitch / roll，单位：度），默认 `{ heading: 0, pitch: 0, roll: 0 }`（+Z 方向）。

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

为 true 时，已发射粒子以宿主本地坐标保存位置/速度，
每帧再投回当前宿主矩阵，避免高速宿主把存活粒子甩到世界坐标中。

***

### gravity?

> `optional` **gravity?**: `number` \| `boolean` \| `Cartesian3` \| \{ `acceleration?`: `number`; `enabled?`: `boolean`; `vector?`: `Cartesian3`; \}

粒子重力设置。

- `false`/未设置：关闭重力，保持 默认粒子行为
- `true`：使用宿主 Entity 所属 `CelestialEllipsoid.surfaceGravity`
- `number`：按宿主天体局部 -Up 方向施加指定 m/s²
- `Cartesian3`：直接作为世界坐标加速度向量，单位 m/s²
- object：可覆盖加速度大小、方向或启停

***

### id?

> `optional` **id?**: `string`

自定义标识（用于底层渲染对象标识/检索）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### image?

> `optional` **image?**: [`ImageAssetSource`](../types/ImageAssetSource.md)

粒子图片。支持：
- 原始 URL / Canvas / Image（向后兼容）
- 图片裁切 `{ image, x, y, width, height }`
- 序列帧 `{ image, frameWidth, frameHeight, count, columns }`

***

### imageSize?

> `optional` **imageSize?**: `Cartesian2`

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

是否参与所属 Entity 的包围球聚合。

适用于需要被相机 zoom/flyTo 纳入取景的 Feature。辅助线、临时效果等可以关闭。

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

名称（可用于展示/调试）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

是否启用叠加渲染通道。

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

为 true 时保留贴图自身 RGB，仅使用 startColor/endColor 的 alpha 控制淡入淡出。
图片裁切和序列帧默认启用，纯 canvas/image/URL 默认保留原有染色行为。

***

### renderOrder?

> `optional` **renderOrder?**: `number`

渲染排序值（数值越小越先渲染）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### scale?

> `optional` **scale?**: `number`

***

### screenSpaceLimit?

> `optional` **screenSpaceLimit?**: `boolean` \| [`ParticleScreenSpaceLimitOptions`](ParticleScreenSpaceLimitOptions.md)

屏幕空间预算。用于喷焰等效果在相机抵近或拉远时保持合理的像素长度、密度和尺寸。

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

可见性策略配置。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
