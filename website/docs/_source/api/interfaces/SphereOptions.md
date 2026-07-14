[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SphereOptions

# Interface: SphereOptions

SphereFeature 配置。

球体是三轴半径相等的 EllipsoidFeature 快捷封装。

## Extends

- `Omit`\<[`EllipsoidOptions`](EllipsoidOptions.md), `"dimensions"`\>

## Properties

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示距离条件。

当相机距离超出该范围时会自动隐藏。

#### Default

```ts
undefined（由视距策略与运行态决定）
```

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`distanceDisplayCondition`](EllipsoidOptions.md#distancedisplaycondition)

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

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`lighting`](EllipsoidOptions.md#lighting)

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

球体材质。

#### Overrides

[`EllipsoidOptions`](EllipsoidOptions.md).[`material`](EllipsoidOptions.md#material)

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

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`outline`](EllipsoidOptions.md#outline)

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

轮廓颜色。

#### Overrides

[`EllipsoidOptions`](EllipsoidOptions.md).[`outlineColor`](EllipsoidOptions.md#outlinecolor)

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

轮廓宽度（像素）。

#### Default

```ts
1
```

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`outlineWidth`](EllipsoidOptions.md#outlinewidth)

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

是否启用叠加渲染通道。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### radius?

> `optional` **radius?**: `number`

球半径（单位：米）。

#### Default

```ts
100
```

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

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`shadows`](EllipsoidOptions.md#shadows)

***

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`show`](EllipsoidOptions.md#show)

***

### stOffset?

> `optional` **stOffset?**: `Cartesian2`

纹理坐标偏移（单位：无量纲）。

当 `material` 为贴图材质时可用于滚动/平移贴图。

#### Default

```ts
Cartesian2.ZERO
```

#### Inherited from

[`EllipsoidOptions`](EllipsoidOptions.md).[`stOffset`](EllipsoidOptions.md#stoffset)

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

可见性策略配置。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
