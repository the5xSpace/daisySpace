[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolylineVolumeOptions

# Type Alias: PolylineVolumeOptions

> **PolylineVolumeOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

PolylineVolumeFeature 配置。

用于沿路径绘制管道/体积几何体（如圆柱形管道、方形通道等）。

## Type Declaration

### cornerType?

> `optional` **cornerType?**: `CornerType`

拐角类型。

#### Default

```ts
CornerType.ROUNDED
```

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

管道材质。

支持 `Daisy.Material` 或颜色（`DColor` / CSS 色值字符串）。

#### Default

```ts
Color.BLUE.withAlpha(0.5)
```

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

管道路径。

支持点位、实体引用与父实体占位符。

### shape?

> `optional` **shape?**: `Daisy.Cartesian2`[]

管道截面形状（二维点数组，定义截面轮廓）。

默认为圆形截面（16 边形近似，半径 100 米）。

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
