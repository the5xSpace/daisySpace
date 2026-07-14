[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolygonPrimitiveOptions

# Type Alias: PolygonPrimitiveOptions

> **PolygonPrimitiveOptions** = `object`

PolygonRenderable 创建参数。

## Remarks

- `positions` 支持两种形态：
 - `Daisy.Cartesian3[]`：简单多边形顶点序列；
 - `Holes`：带洞多边形（外环 + 若干内环）。
- 当传入 `Daisy.Cartesian3[]` 时，构造函数会在本地 ENU 平面上按角度排序顶点，
 以降低“顶点顺序不正确导致自交/剖分异常”的概率。
- `outline=true` 时，会额外创建一个 `PolygonOutlineGeometry` 的图元用于描边显示。

## Example

```ts
import { , PolygonRenderable } from "daisy-space-sdk";

// 注意：当使用 CelestialEllipsoid.Moon()/Sun() 等“非地球天体”时，
// positions 应当是“天体局部坐标”（以该天体中心为原点的 Cartesian3）。
// 最常见的输入方式是“该天体的经纬度 + 高度”生成 local 点：
// const local = Daisy.Cartesian3.fromDegrees(lon, lat, height, ELLIPSOID.MOON);
// 也可以是直接使用该天体为固定坐标系的相对坐标，此方式不支持惯性坐标，使用前需要先转换为该天体固定坐标。

const polygon = new PolygonRenderable(viewer, {
 positions: [
 Daisy.Cartesian3.fromDegrees(116.39, 39.90),
 Daisy.Cartesian3.fromDegrees(116.41, 39.90),
 Daisy.Cartesian3.fromDegrees(116.41, 39.92),
 Daisy.Cartesian3.fromDegrees(116.39, 39.92),
 ],
 material: Daisy.Color.YELLOW.withAlpha(0.4),
 outline: true,
 outlineColor: Daisy.Color.BLACK,
 outlineWidth: 2,
});

polygon.updatePositions([
 Daisy.Cartesian3.fromDegrees(116.39, 39.90),
 Daisy.Cartesian3.fromDegrees(116.42, 39.90),
 Daisy.Cartesian3.fromDegrees(116.42, 39.93),
]);

polygon.destroy();
```

## Properties

### arcType?

> `optional` **arcType?**: `Daisy.ArcType`

弧线类型（大地线/等高线等）。

#### Default

```ts
Daisy.ArcType.GEODESIC
```

***

### autoSortPositions?

> `optional` **autoSortPositions?**: `boolean`

***

### clampToGround?

> `optional` **clampToGround?**: `boolean`

是否贴地。

#### Default

```ts
false
```

***

### closeBottom?

> `optional` **closeBottom?**: `boolean`

是否封底（拉伸时有效）。

#### Default

```ts
true
```

***

### closeTop?

> `optional` **closeTop?**: `boolean`

是否封顶（拉伸时有效）。

#### Default

```ts
true
```

***

### depthWriteEnabled?

> `optional` **depthWriteEnabled?**: `boolean`

***

### ellipsoid?

> `optional` **ellipsoid?**: `Daisy.Ellipsoid` \| [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md)

计算与投影使用的椭球体。

#### Default

```ts
CelestialEllipsoid.Earth()
```

***

### extrudedHeight?

> `optional` **extrudedHeight?**: `number`

拉伸高度（形成柱体），单位与 `height` 一致。

***

### fill?

> `optional` **fill?**: `boolean`

***

### granularity?

> `optional` **granularity?**: `number`

角度粒度（弧度）。

#### Default

```ts
Daisy.Math.RADIANS_PER_DEGREE
```

***

### height?

> `optional` **height?**: `number`

多边形高度（相对椭球体）。

***

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

填充材质。

#### Default

```ts
Daisy.Color.YELLOW
```

***

### name?

> `optional` **name?**: `string`

调试/标识名称。

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

> `optional` **outlineColor?**: [`DColor`](DColor.md)

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

### perPositionHeight?

> `optional` **perPositionHeight?**: `boolean`

是否使用每点高度（positions 的 z 分量）。

#### Default

```ts
false
```

***

### positions?

> `optional` **positions?**: `Daisy.Cartesian3`[] \| [`Holes`](Holes.md) \| `Daisy.PolygonHierarchy`

多边形顶点或带洞层级。

#### Default

```ts
[]
```

***

### rebuildThrottleMs?

> `optional` **rebuildThrottleMs?**: `number`

***

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

***

### stRotation?

> `optional` **stRotation?**: `number`

纹理坐标旋转角（弧度）。

#### Default

```ts
0
```

***

### textureCoordinates?

> `optional` **textureCoordinates?**: `Daisy.Cartesian2`[] \| `TextureCoordinatesHoles` \| `Daisy.PolygonHierarchy`

纹理坐标（与 positions 一一对应）。

***

### vertexFormat?

> `optional` **vertexFormat?**: `Daisy.VertexFormat`

顶点格式。

#### Default

```ts
Daisy.VertexFormat.DEFAULT
```
