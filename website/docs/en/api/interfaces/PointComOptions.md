[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PointComOptions

# Interface: PointComOptions

点要素配置（PointFeature）。

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

颜色

#### Default

```ts
Color.WHITE
```

***

### disableDepthTestDistance?

> `optional` **disableDepthTestDistance?**: `number`

禁用深度测试的距离（单位：米）

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示距离条件

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

### name?

> `optional` **name?**: `string`

名称（可用于展示/调试）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

轮廓颜色

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

轮廓宽度

#### Default

```ts
1
```

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

是否启用叠加渲染通道。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### pixelSize?

> `optional` **pixelSize?**: `number`

点尺寸（单位：像素）。

与 `size` 同时设置时，以 `size` 为准。

兼容字段：等同 `sizePx`。

#### Default

```ts
3
```

***

### position?

> `optional` **position?**: `Cartesian3`

相对实体坐标系下的位置

#### Default

```ts
Cartesian3.ZERO
```

***

### renderOrder?

> `optional` **renderOrder?**: `number`

渲染排序值（数值越小越先渲染）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### scaleByDistance?

> `optional` **scaleByDistance?**: `NearFarScalar`

缩放距离条件

***

### show?

> `optional` **show?**: `boolean`

显示

#### Default

```ts
true
```

***

### size?

> `optional` **size?**: `number`

点尺寸（单位：米）。

与 `sizePx` 二选一；若同时设置则优先使用米。

***

### sizePx?

> `optional` **sizePx?**: `number`

点尺寸（单位：像素）。

与 `size` 同时设置时，以 `size` 为准。

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

可见性策略配置。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
