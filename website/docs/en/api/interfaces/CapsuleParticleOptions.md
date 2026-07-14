[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CapsuleParticleOptions

# Interface: CapsuleParticleOptions

Feature 基础配置选项。

所有具体 Feature 的 Options 类型都继承自该接口。

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### alpha?

> `optional` **alpha?**: `number`

***

### anchorRatio?

> `optional` **anchorRatio?**: `number`

兼容旧版 billboard 的中心锚点比例。

世界锚定渲染中喷口就是贴图片面的局部原点，该字段不再参与主路径偏移。

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

复用粒子发射器语义描述喷口截面和扩散趋势。

注意：胶囊粒子不会创建 ParticleSystem，也不会逐粒子积分。
这里的 emitter 只作为“形态描述”参与动画帧生成，例如 cone.angle
控制火焰边缘扩散，radius 控制根部半径。

***

### emitter2D?

> `optional` **emitter2D?**: [`CapsuleParticleEmitter2DOptions`](CapsuleParticleEmitter2DOptions.md)

胶囊动画内部的 2D 粒子发射器。

CapsuleParticleFeature 仍然只向场景提交一个宿主绑定的贴图片面；
emitter2D 只在离屏 canvas 预生成动画帧时运行，用来替代硬编码的“子弹形”
或固定椭圆背景。它借鉴 city41/particle.js / Cocos2D 的参数模型，
适合火焰、喷流、能量束这类需要连续形体但又要有真实粒子流动感的效果。

***

### emitterDirection?

> `optional` **emitterDirection?**: `ParticleEmitterAttitude`

对局部发射方向的姿态修正，单位为度。

***

### emitterPreset?

> `optional` **emitterPreset?**: [`CapsuleParticleEmitterPreset`](../types/CapsuleParticleEmitterPreset.md)

内置 2D 发射器预设。

它不是最终贴图，也不只是几何形状；它会一起决定粒子出生区域、发射方向、
速度、寿命、力场、颜色随机和混合模式。

***

### frameCount?

> `optional` **frameCount?**: `number`

预生成动画帧数量。帧数越多越平滑，但会占用更多纹理图集空间。

***

### frameRate?

> `optional` **frameRate?**: `number`

***

### id?

> `optional` **id?**: `string`

自定义标识（用于底层渲染对象标识/检索）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

是否参与所属 Entity 的包围球聚合。

适用于需要被相机 zoom/flyTo 纳入取景的 Feature。辅助线、临时效果等可以关闭。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### length?

> `optional` **length?**: `number`

胶囊主体长度，单位：米。

***

### localDirection?

> `optional` **localDirection?**: `Cartesian3`

胶囊长轴方向，位于宿主实体局部坐标系。

火箭/飞机等 Vehicle 约定 +X 为前向，因此喷焰默认沿 -X 延伸。

***

### maxLength?

> `optional` **maxLength?**: `number`

胶囊最终显示长度上限，单位：米。

胶囊粒子默认使用世界锚定尺寸；当业务显式启用 `visualScaleMode: "match-model"`
时，这里可作为最终尺寸保险丝，避免贴图片面被模型像素缩放放成巨大色块。

***

### maxLengthPx?

> `optional` **maxLengthPx?**: `number`

屏幕空间长度上限，单位：px。

***

### maxRadius?

> `optional` **maxRadius?**: `number`

胶囊最终显示半径上限，单位：米。用途同 maxLength。

***

### maxRadiusPx?

> `optional` **maxRadiusPx?**: `number`

屏幕空间半径上限，单位：px。

***

### maxVisualScale?

> `optional` **maxVisualScale?**: `number`

***

### minLengthPx?

> `optional` **minLengthPx?**: `number`

屏幕空间长度下限，单位：px。

***

### minRadiusPx?

> `optional` **minRadiusPx?**: `number`

屏幕空间半径下限，单位：px。

***

### minVisualScale?

> `optional` **minVisualScale?**: `number`

***

### modelLengthRatio?

> `optional` **modelLengthRatio?**: `number`

喷焰长度相对宿主模型视觉直径的下限比例。

***

### modelMaxLengthRatio?

> `optional` **modelMaxLengthRatio?**: `number`

喷焰长度相对宿主模型视觉直径的上限比例。

***

### modelMaxRadiusRatio?

> `optional` **modelMaxRadiusRatio?**: `number`

喷焰半径相对宿主模型视觉直径的上限比例。

***

### modelRadiusRatio?

> `optional` **modelRadiusRatio?**: `number`

喷焰半径相对宿主模型视觉直径的下限比例。

***

### modelRelativeSizing?

> `optional` **modelRelativeSizing?**: `boolean`

是否按宿主模型的当前屏幕视觉尺寸抬高像素约束。

仅在 screenSpaceSizing=true 且模型被 minimumPixelSize 视觉放大时生效。
这不是把模型缩放直接乘到世界尺寸，而是在像素夹取阶段复用 Model
的 minimumPixelSize / maximumScale 结果，让喷焰与宿主模型保持同一视觉比例尺。

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

### particleImage?

> `optional` **particleImage?**: [`CapsuleParticleImageSource`](../types/CapsuleParticleImageSource.md)

单颗粒子图片/贴图源。

注意：这里的图片不是最终静态胶囊贴片，而是参与每一帧生成的单颗粒子图章。
胶囊粒子仍会预生成动画帧，避免切换图片后退化成一张不会动的平面图。

***

### position?

> `optional` **position?**: `Cartesian3`

胶囊粒子挂点的局部偏移，通常等于发动机喷口位置。

***

### power?

> `optional` **power?**: `number`

视觉功率，范围 0~1。频繁变化时只影响尺寸、透明度和播放速度，不重新生成动画帧。

***

### powerAffectsAlpha?

> `optional` **powerAffectsAlpha?**: `boolean`

power 是否参与透明度。

***

### powerAffectsPlayback?

> `optional` **powerAffectsPlayback?**: `boolean`

power 是否参与帧播放速度。

***

### powerAffectsSize?

> `optional` **powerAffectsSize?**: `boolean`

power 是否参与长度/半径缩放。通用胶囊粒子可关闭，避免把“方向/形态”绑死到动力语义。

***

### powerAffectsVisibility?

> `optional` **powerAffectsVisibility?**: `boolean`

power 是否参与可见性。默认 true，保持喷焰“停机即隐藏”的旧行为。

***

### preset?

> `optional` **preset?**: [`CapsuleParticlePreset`](../types/CapsuleParticlePreset.md)

***

### radius?

> `optional` **radius?**: `number`

胶囊根部半径，单位：米。

***

### renderOrder?

> `optional` **renderOrder?**: `number`

渲染排序值（数值越小越先渲染）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### rotation?

> `optional` **rotation?**: `number`

兼容旧版 billboard 的屏幕旋转字段。世界锚定主路径不使用该字段。

***

### screenSpaceSizing?

> `optional` **screenSpaceSizing?**: `boolean`

启用像素约束尺寸。

当前胶囊粒子仍是世界锚定贴图面片；该开关只把长度/半径限制在指定像素区间，
不使用 billboard 的屏幕偏移，也不会改变喷口锚点。

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

噪声强度，只在生成动画帧时生效。

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

可见性策略配置。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)

***

### visualScaleMode?

> `optional` **visualScaleMode?**: [`CapsuleParticleVisualScaleMode`](../types/CapsuleParticleVisualScaleMode.md)

是否按宿主模型的 minimumPixelSize 视觉缩放同步放大/缩小。

默认值为 `none`。火箭/飞机喷焰通常应使用 screenSpaceSizing 做像素约束，
不应把模型的 minimumPixelSize 缩放直接传给世界尺寸。
