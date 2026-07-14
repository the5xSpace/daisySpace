[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EllipsoidOptions

# Interface: EllipsoidOptions

EllipsoidFeature 配置。
 EllipsoidOptions

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### dimensions?

> `optional` **dimensions?**: `Cartesian3`

椭球体三轴半径（单位：米），分别对应 X/Y/Z 方向的半径。

#### Default

```ts
new Cartesian3(100, 100, 100)
```

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示距离条件。

当相机距离超出该范围时会自动隐藏。

#### Default

```ts
undefined（由视距策略与运行态决定）
```

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

### lighting?

> `optional` **lighting?**: `boolean`

是否启用光照（影响明暗效果）。

#### Default

```ts
true
```

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

椭球材质。

支持 `Daisy.Material` 或颜色（`DColor` / CSS 色值字符串）。

#### Default

```ts
Color.BLUE.withAlpha(0.6)
```

***

### name?

> `optional` **name?**: `string`

名称（可用于展示/调试）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### outline?

> `optional` **outline?**: `boolean`

是否绘制轮廓线。

#### Default

```ts
true
```

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

轮廓颜色。

#### Default

```ts
Color.BLACK
```

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

轮廓宽度（像素）。

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

### renderOrder?

> `optional` **renderOrder?**: `number`

渲染排序值（数值越小越先渲染）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### shadows?

> `optional` **shadows?**: `ShadowMode`

阴影模式。

#### Default

```ts
ShadowMode.DISABLED
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

### stOffset?

> `optional` **stOffset?**: `Cartesian2`

纹理坐标偏移（单位：无量纲）。

当 `material` 为贴图材质时可用于滚动/平移贴图。

#### Default

```ts
Cartesian2.ZERO
```

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

可见性策略配置。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
