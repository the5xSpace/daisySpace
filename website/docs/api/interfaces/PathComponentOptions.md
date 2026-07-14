[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PathComponentOptions

# Interface: PathComponentOptions

TrailPathFeature 配置。

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### ~~afterSecond?~~

> `optional` **afterSecond?**: `number`

futureSecond 的兼容别名（不推荐继续使用）。

#### Deprecated

请使用 futureSecond

***

### autoOptimize?

> `optional` **autoOptimize?**: `boolean`

是否启用自动优化。

- 开启：系统会结合相机尺度/实体速度/实体数量自适应采样密度。
- 关闭：严格按用户给定的 resolutionSecond/maxDirectionInterpolationCount 采样。

#### Default

```ts
true
```

***

### ~~beforeSecond?~~

> `optional` **beforeSecond?**: `number`

historySecond 的兼容别名（不推荐继续使用）。

#### Deprecated

请使用 historySecond

***

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

轨迹线颜色（当前帧对应位置处的颜色）。

#### Default

```ts
Color.PURPLE.withAlpha(0.8)
```

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示距离条件。

***

### futureColor?

> `optional` **futureColor?**: [`DColor`](../types/DColor.md)

未来轨迹颜色。

#### Default

```ts
Color.PURPLE.withAlpha(0.35)
```

***

### futureMaterial?

> `optional` **futureMaterial?**: [`DMaterial`](../types/DMaterial.md)

未来轨迹材质（优先级高于 futureColor）。

***

### futureSecond?

> `optional` **futureSecond?**: `number`

向后（未来）显示的时间跨度（单位：秒）。

#### Default

```ts
43200
```

***

### historyColor?

> `optional` **historyColor?**: [`DColor`](../types/DColor.md)

历史轨迹颜色。

#### Default

```ts
Color.PURPLE.withAlpha(0.8)
```

***

### historyMaterial?

> `optional` **historyMaterial?**: [`DMaterial`](../types/DMaterial.md)

历史轨迹材质（优先级高于 historyColor）。

***

### historySecond?

> `optional` **historySecond?**: `number`

向前（历史）显示的时间跨度（单位：秒）。

#### Default

```ts
43200
```

***

### id?

> `optional` **id?**: `string`

自定义标识，用于轨迹渲染对象检索。

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

### materialAppearance?

> `optional` **materialAppearance?**: `MaterialAppearance`

线材质的渲染外观（高级用法）。

***

### maxDirectionInterpolationCount?

> `optional` **maxDirectionInterpolationCount?**: `number`

按“运行方向向量”进行插值的次数上限。

用于对方向变化较大的轨迹做更平滑的插值；值越大越平滑，但开销更高。

#### Default

```ts
720
```

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

### renderOrder?

> `optional` **renderOrder?**: `number`

渲染排序值（数值越小越先渲染）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### resolutionSecond?

> `optional` **resolutionSecond?**: `number`

轨迹采样分辨率（单位：秒）。

#### Default

```ts
60
```

***

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

***

### updateIntervalSecond?

> `optional` **updateIntervalSecond?**: `number`

数据刷新间隔（单位：秒）。

#### Default

```ts
1
```

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

可见性策略配置。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)

***

### width?

> `optional` **width?**: `number`

线宽（像素）。

#### Default

```ts
2
```
