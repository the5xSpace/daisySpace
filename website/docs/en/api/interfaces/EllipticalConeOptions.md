[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EllipticalConeOptions

# Interface: EllipticalConeOptions

EllipticalConeFeature 配置。

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### autoLength?

> `optional` **autoLength?**: `boolean`

是否启用自动长度（动态计算 height）。

当为 true 时，会根据运行态（如地表/射线求交）动态更新高度，可能覆盖输入的 `height`。

#### Default

```ts
false
```

***

### bottomSemiMajorAxis?

> `optional` **bottomSemiMajorAxis?**: `number`

底面长半轴（单位：米）。

#### Default

```ts
100
```

***

### bottomSemiMinorAxis?

> `optional` **bottomSemiMinorAxis?**: `number`

底面短半轴（单位：米）。

#### Default

```ts
50
```

***

### capBottom?

> `optional` **capBottom?**: `boolean`

是否封底（底部）。

***

### capTop?

> `optional` **capTop?**: `boolean`

是否封顶（顶部）。

***

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

颜色（当未指定 `material` 时，通常会以该颜色构建默认材质）。

#### Default

```ts
Color.BLUE.withAlpha(0.5)
```

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示距离条件

***

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

贴地/射线求交等“天体椭球”相关计算时使用的椭球配置。

注意：一旦该组件通过 Entity.addFeature() 添加到实体上，会被实体的 celestialEllipsoid 覆盖，
组件将始终遵循实体的天体椭球配置。

***

### emitDirection?

> `optional` **emitDirection?**: [`EmitDirection`](../enums/EmitDirection.md)

发射方向/对齐基准。

- `TOP_CENTER`：以顶部为基准对齐
- `BOTTOM_CENTER`：以底部为基准对齐
- `CENTER`：以中心为基准对齐
- `TO_GROUND`：向地表方向延伸（通常配合 `autoLength` 使用）

#### Default

```ts
EmitDirection.TOP_CENTER
```

***

### fill?

> `optional` **fill?**: `boolean`

是否填充面。

#### Default

```ts
true
```

***

### height?

> `optional` **height?**: `number`

高度（单位：米）。

#### Default

```ts
100
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

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

材质。

支持 `Daisy.Material` 或颜色（`DColor` / CSS 色值字符串）。

***

### name?

> `optional` **name?**: `string`

名称（可用于展示/调试）。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### numberOfVerticalLines?

> `optional` **numberOfVerticalLines?**: `number`

垂直线条数量（用于线框/轮廓辅助）。

#### Default

```ts
0
```

***

### outline?

> `optional` **outline?**: `boolean`

是否绘制轮廓线。

#### Default

```ts
false
```

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

### position?

> `optional` **position?**: `Cartesian3`

相对实体坐标系下的位置

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

***

### show?

> `optional` **show?**: `boolean`

显示

#### Default

```ts
true
```

***

### slices?

> `optional` **slices?**: `number`

切分片数（越大越圆滑，但开销更高）。

#### Default

```ts
64
```

***

### topSemiMajorAxis?

> `optional` **topSemiMajorAxis?**: `number`

顶面长半轴（单位：米）。

#### Default

```ts
1
```

***

### topSemiMinorAxis?

> `optional` **topSemiMinorAxis?**: `number`

顶面短半轴（单位：米）。

#### Default

```ts
1
```

***

### vertexFormat?

> `optional` **vertexFormat?**: `VertexFormat`

顶点格式。

#### Default

```ts
VertexFormat.POSITION_AND_NORMAL
```

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

可见性策略配置。

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
