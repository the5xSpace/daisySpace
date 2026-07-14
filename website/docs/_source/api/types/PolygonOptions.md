[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolygonOptions

# Type Alias: PolygonOptions

> **PolygonOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

PolygonFeature 配置。

## Type Declaration

### arcType?

> `optional` **arcType?**: `Daisy.ArcType`

连线弧线类型。

#### Default

```ts
Daisy.ArcType.GEODESIC
```

### autoSortPositions?

> `optional` **autoSortPositions?**: `boolean`

是否自动对输入点排序（避免自交等问题）。

### clampToGround?

> `optional` **clampToGround?**: `boolean`

### closeBottom?

> `optional` **closeBottom?**: `boolean`

是否封底（挤出时底部是否闭合）。

#### Default

```ts
true
```

### closeTop?

> `optional` **closeTop?**: `boolean`

是否封顶（挤出时顶部是否闭合）。

#### Default

```ts
true
```

### depthWriteEnabled?

> `optional` **depthWriteEnabled?**: `boolean`

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `Daisy.DistanceDisplayCondition`

显示距离条件。

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

贴地计算与“天体跟随”使用的天体椭球。

注意：一旦该组件通过 Entity.addFeature() 添加到实体上，会被实体的 celestialEllipsoid 覆盖，
组件将始终遵循实体的天体椭球配置。

### extrudedHeight?

> `optional` **extrudedHeight?**: `number`

挤出高度（单位：米）。

### fill?

> `optional` **fill?**: `boolean`

### granularity?

> `optional` **granularity?**: `number`

采样粒度（弧度）。

#### Default

```ts
Daisy.Math.RADIANS_PER_DEGREE
```

### height?

> `optional` **height?**: `number`

高度（单位：米）。

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

材质。

### name?

> `optional` **name?**: `string`

名称（可用于展示/调试）。

### outline?

> `optional` **outline?**: `boolean`

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](DColor.md)

轮廓颜色

### outlineWidth?

> `optional` **outlineWidth?**: `number`

轮廓宽度

#### Default

```ts
1
```

### pathway

> **pathway**: [`Pathway`](Pathway.md) \| [`Holes`](Holes.md) \| `Daisy.PolygonHierarchy`

多边形顶点/孔洞输入。

支持：
- `Pathway`：点位/Entity 引用序列
- `Holes`：positions + holes 递归结构
- `Daisy.PolygonHierarchy`

### perPositionHeight?

> `optional` **perPositionHeight?**: `boolean`

是否按每个点单独指定高度（与贴地/挤出等设置存在组合限制，遵循默认规则）。

### rebuildThrottleMs?

> `optional` **rebuildThrottleMs?**: `number`

重建节流时间（毫秒）。

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

### stRotation?

> `optional` **stRotation?**: `number`

纹理旋转（弧度）。

#### Default

```ts
0
```

### textureCoordinates?

> `optional` **textureCoordinates?**: `Daisy.Cartesian2`[] \| [`TextureCoordinatesHoles`](TextureCoordinatesHoles.md) \| `Daisy.PolygonHierarchy`

纹理坐标输入。

### updateThrottleMs?

> `optional` **updateThrottleMs?**: `number`

更新节流时间（毫秒）。

适用于高频更新时降低重算开销。

### vertexFormat?

> `optional` **vertexFormat?**: `Daisy.VertexFormat`

顶点格式。

#### Default

```ts
VertexFormat.DEFAULT
```
