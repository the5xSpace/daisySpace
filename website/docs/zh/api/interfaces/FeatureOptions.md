[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FeatureOptions

# Interface: FeatureOptions

Feature 基础配置选项。

所有具体 Feature 的 Options 类型都继承自该接口。

## Extended by

- [`EntityComOptions`](EntityComOptions.md)
- [`TextOptions`](TextOptions.md)
- [`CylinderOptions`](CylinderOptions.md)
- [`EllipticalConeOptions`](EllipticalConeOptions.md)
- [`ModelOptions`](ModelOptions.md)
- [`PointComOptions`](PointComOptions.md)
- [`PathComponentOptions`](PathComponentOptions.md)
- [`BoxComponentEntityComOptions`](BoxComponentEntityComOptions.md)
- [`EllipsoidOptions`](EllipsoidOptions.md)
- [`CubeOptions`](CubeOptions.md)
- [`ParticleFeatureOptions`](ParticleFeatureOptions.md)
- [`CapsuleParticleOptions`](CapsuleParticleOptions.md)
- [`PopoverOptions`](UI.PopoverOptions.md)

## Properties

### id?

> `optional` **id?**: `string`

自定义标识（用于底层渲染对象标识/检索）。

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

是否参与所属 Entity 的包围球聚合。

适用于需要被相机 zoom/flyTo 纳入取景的 Feature。辅助线、临时效果等可以关闭。

***

### name?

> `optional` **name?**: `string`

名称（可用于展示/调试）。

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

是否启用叠加渲染通道。

***

### renderOrder?

> `optional` **renderOrder?**: `number`

渲染排序值（数值越小越先渲染）。

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

可见性策略配置。
