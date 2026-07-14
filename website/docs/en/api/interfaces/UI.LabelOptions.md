[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [UI](../modules/UI.md) / LabelOptions

# Interface: LabelOptions

标签要素，用于在场景中显示文本标签

功能：
- 在实体坐标系下添加一个 `Label`
- 支持颜色、字体、背景、位置等常用样式配置
- 按 `Engine.collections.labelsCollection` 管理生命周期

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### backgroundColor?

> `optional` **backgroundColor?**: [`DColor`](../types/DColor.md)

背景颜色

***

### backgroundPadding?

> `optional` **backgroundPadding?**: `Cartesian2`

背景内边距

***

### disableDepthTestDistance?

> `optional` **disableDepthTestDistance?**: `number`

关闭深度检测的距离阈值（单位：米）

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示距离条件

***

### eyeOffset?

> `optional` **eyeOffset?**: `Cartesian3`

视点偏移

***

### fillColor?

> `optional` **fillColor?**: [`DColor`](../types/DColor.md)

文本填充色，默认 `Daisy.Color.WHITE`

***

### font?

> `optional` **font?**: `string`

字体，如 `16px sans-serif`

***

### heightReference?

> `optional` **heightReference?**: `HeightReference`

高程参考

***

### horizontalOrigin?

> `optional` **horizontalOrigin?**: `HorizontalOrigin`

水平对齐

***

### id?

> `optional` **id?**: `string`

自定义 id

#### Overrides

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

是否参与所属 Entity 的包围球聚合。

适用于需要被相机 zoom/flyTo 纳入取景的 Feature。辅助线、临时效果等可以关闭。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### name?

> `optional` **name?**: `string`

名称（可用于展示/调试）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### offsetMeters?

> `optional` **offsetMeters?**: `Cartesian2`

屏幕偏移（单位：米）。

与 `offsetPx` 二选一；若同时设置则优先使用米。

***

### offsetPx?

> `optional` **offsetPx?**: `Cartesian2`

屏幕像素偏移（单位：像素）。

与 `offsetMeters` 同时设置时，以 `offsetMeters` 为准。

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

文本描边颜色

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

文本描边宽度（像素）

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

是否启用叠加渲染通道。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### pixelOffset?

> `optional` **pixelOffset?**: `Cartesian2`

兼容字段：等同 `offsetPx`（单位：像素）。

与 `offsetMeters` 同时设置时，以 `offsetMeters` 为准。

***

### pixelOffsetMeters?

> `optional` **pixelOffsetMeters?**: `Cartesian2`

兼容字段：等同 `offsetMeters`（单位：米）。

与 `offsetPx` 二选一；若同时设置则优先使用米。

***

### pixelOffsetScaleByDistance?

> `optional` **pixelOffsetScaleByDistance?**: `NearFarScalar`

距离缩放（像素偏移）

***

### position?

> `optional` **position?**: `Cartesian3`

相对实体坐标系下的位置，默认 `Daisy.Cartesian3.ZERO`

***

### renderOrder?

> `optional` **renderOrder?**: `number`

渲染排序值（数值越小越先渲染）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### scale?

> `optional` **scale?**: `number`

缩放

***

### scaleByDistance?

> `optional` **scaleByDistance?**: `NearFarScalar`

距离缩放

***

### show?

> `optional` **show?**: `boolean`

是否显示，默认 `true`

***

### showBackground?

> `optional` **showBackground?**: `boolean`

是否显示背景

***

### style?

> `optional` **style?**: `LabelStyle`

标签样式

***

### text

> **text**: `string`

显示的文本内容（必填）

***

### translucencyByDistance?

> `optional` **translucencyByDistance?**: `NearFarScalar`

透明度随距离变化

***

### verticalOrigin?

> `optional` **verticalOrigin?**: `VerticalOrigin`

垂直对齐

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

可见性策略配置。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
