[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / RectangleOptions

# Type Alias: RectangleOptions

> **RectangleOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

RectangleFeature 配置。

用于在场景中绘制矩形几何体（如区域覆盖、地面标记等）。

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

### extrudedHeight?

> `optional` **extrudedHeight?**: `number`

挤出高度（单位：米）。

设置后矩形会从地面挤出到指定高度，形成立体效果。

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

### height?

> `optional` **height?**: `number`

矩形高度（单位：米）。

#### Default

```ts
0.1
```

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

矩形材质。

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

### rectangle?

> `optional` **rectangle?**: `Daisy.Rectangle`

矩形区域（西/南/东/北，单位：弧度）。

不传时默认使用父实体位置附近的极小矩形。

### rotation?

> `optional` **rotation?**: `number`

矩形旋转角（单位：弧度）。

#### Default

```ts
0
```

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

### stRotation?

> `optional` **stRotation?**: `number`

纹理旋转角（单位：弧度）。

#### Default

```ts
0
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
