[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GeoJsonFeatureOptions

# Interface: GeoJsonFeatureOptions

## Extends

- `Partial`\<[`CoverageAreaOptions`](CoverageAreaOptions.md)\>.`Partial`\<[`FeatureOptions`](FeatureOptions.md)\>

## Properties

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

### label?

> `optional` **label?**: [`CoverageLabelOptions`](CoverageLabelOptions.md)

标签全局样式配置，各多边形可通过 CoveragePolygon.label 单独设置文字

#### Inherited from

[`CoverageAreaOptions`](CoverageAreaOptions.md).[`label`](CoverageAreaOptions.md#label)

***

### maxPolygons?

> `optional` **maxPolygons?**: `number`

多边形渲染上限，超过此数量仅渲染前 N 个并发出 console.warn。

- 默认 50000：覆盖主流集成显卡（Intel UHD / AMD Radeon Graphics）
- 独立显卡（RTX 3060+）可设置更大值
- 50K 多边形在 1440×720 canvas 上渲染约 3-8 秒，请按客户端 GPU 实测调整
- 仅影响渲染，覆盖率统计始终使用全量计算结果

#### Default

```ts
50000
```

#### Inherited from

[`CoverageAreaOptions`](CoverageAreaOptions.md).[`maxPolygons`](CoverageAreaOptions.md#maxpolygons)

***

### minVisible?

> `optional` **minVisible?**: `number`

可见性阈值，纹理 alpha 低于此值不渲染，默认 0.01

#### Inherited from

[`CoverageAreaOptions`](CoverageAreaOptions.md).[`minVisible`](CoverageAreaOptions.md#minvisible)

***

### name?

> `optional` **name?**: `string`

名称（可用于展示/调试）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### onBuildError?

> `optional` **onBuildError?**: [`GeoJsonBuildErrorCallback`](../types/GeoJsonBuildErrorCallback.md)

***

### opacity?

> `optional` **opacity?**: `number`

全局不透明度 (0-1)，默认 0.8

#### Inherited from

[`CoverageAreaOptions`](CoverageAreaOptions.md).[`opacity`](CoverageAreaOptions.md#opacity)

***

### outlineColor?

> `optional` **outlineColor?**: `string`

描边颜色，默认 "rgba(255,255,255,0.4)"

#### Inherited from

[`CoverageAreaOptions`](CoverageAreaOptions.md).[`outlineColor`](CoverageAreaOptions.md#outlinecolor)

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

单个多边形描边宽度（像素），0 表示不描边，默认 0

#### Inherited from

[`CoverageAreaOptions`](CoverageAreaOptions.md).[`outlineWidth`](CoverageAreaOptions.md#outlinewidth)

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

是否启用叠加渲染通道。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### polygons?

> `optional` **polygons?**: [`CoveragePolygon`](CoveragePolygon.md)[]

覆盖区域多边形列表，每个多边形可独立设置颜色

#### Inherited from

[`CoverageAreaOptions`](CoverageAreaOptions.md).[`polygons`](CoverageAreaOptions.md#polygons)

***

### renderOrder?

> `optional` **renderOrder?**: `number`

渲染排序值（数值越小越先渲染）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### resolution?

> `optional` **resolution?**: `number`

纹理分辨率（像素/度），越大越清晰，默认 8，建议 4-16

#### Inherited from

[`CoverageAreaOptions`](CoverageAreaOptions.md).[`resolution`](CoverageAreaOptions.md#resolution)

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
