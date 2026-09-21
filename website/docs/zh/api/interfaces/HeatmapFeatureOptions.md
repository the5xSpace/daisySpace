[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / HeatmapFeatureOptions

# Interface: HeatmapFeatureOptions

Feature 基础配置选项。

所有具体 Feature 的 Options 类型都继承自该接口。

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### colors?

> `optional` **colors?**: [`DColor`](../types/DColor.md)[]

***

### colorScheme?

> `optional` **colorScheme?**: `"thermal"` \| `"viridis"` \| `"blue-red"` \| `"custom"`

***

### grid

> **grid**: `CoverageGridSource`

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

### masks?

> `optional` **masks?**: `GridMask`[]

***

### minVisible?

> `optional` **minVisible?**: `number`

***

### name?

> `optional` **name?**: `string`

名称（可用于展示/调试）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### opacity?

> `optional` **opacity?**: `number`

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

是否启用叠加渲染通道。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### renderOrder?

> `optional` **renderOrder?**: `number`

渲染排序值（数值越小越先渲染）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### show?

> `optional` **show?**: `boolean`

是否显示；未设置时由具体 Feature 使用其默认值。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`show`](FeatureOptions.md#show)

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

可见性策略配置。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
