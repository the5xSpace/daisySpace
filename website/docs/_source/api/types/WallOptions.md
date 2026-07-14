[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / WallOptions

# Type Alias: WallOptions

> **WallOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

WallFeature 配置。

用于在场景中绘制墙体几何体（如围栏、屏障、垂直面等）。

## Type Declaration

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `Daisy.DistanceDisplayCondition`

显示距离条件。

当相机距离超出该范围时会自动隐藏。

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

贴地计算与天体跟随所使用的天体椭球。

注意：一旦该组件通过 Entity.addFeature() 添加到实体上，会被实体的 celestialEllipsoid 覆盖，
组件将始终遵循实体的天体椭球配置。

#### Default

```ts
CelestialEllipsoid.Earth()
```

### fill?

> `optional` **fill?**: `boolean`

是否填充面。

#### Default

```ts
true
```

### granularity?

> `optional` **granularity?**: `number`

采样粒度（单位：弧度）。

#### Default

```ts
Daisy.Math.RADIANS_PER_DEGREE
```

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

墙体材质。

支持 `Daisy.Material` 或颜色（`DColor` / CSS 色值字符串）。

#### Default

```ts
Color.BLUE.withAlpha(0.5)
```

### maximumHeights?

> `optional` **maximumHeights?**: `number`[]

每个顶点的最大高度（单位：米）。

数组长度应与路径点数一致。

### minimumHeights?

> `optional` **minimumHeights?**: `number`[]

每个顶点的最小高度（单位：米）。

数组长度应与路径点数一致。

### outline?

> `optional` **outline?**: `boolean`

是否绘制轮廓线。

#### Default

```ts
false
```

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](DColor.md)

轮廓颜色。

#### Default

```ts
Color.BLACK
```

### outlineWidth?

> `optional` **outlineWidth?**: `number`

轮廓宽度（单位：像素）。

#### Default

```ts
1
```

### pathway

> **pathway**: [`Pathway`](Pathway.md)

墙体路径。

支持点位、实体引用与父实体占位符。

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

### updateThrottleMs?

> `optional` **updateThrottleMs?**: `number`

更新节流时间（单位：毫秒）。

适用于高频更新时降低重算开销。

#### Default

```ts
400
```

### vertexFormat?

> `optional` **vertexFormat?**: `Daisy.VertexFormat`

顶点格式。

#### Default

```ts
VertexFormat.POSITION_AND_NORMAL
```
