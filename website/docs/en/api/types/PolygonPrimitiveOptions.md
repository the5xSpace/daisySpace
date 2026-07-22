[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolygonPrimitiveOptions

# Type Alias: PolygonPrimitiveOptions

> **PolygonPrimitiveOptions** = `object`

PolygonRenderable creation parameters.

## Remarks

- `positions` supports two forms:
 - `Daisy.Cartesian3[]`: simple polygon vertex sequence;
 - `Holes`: polygon with holes (outer ring + inner rings).
- When passing `Daisy.Cartesian3[]`, the constructor sorts vertices by angle on the local ENU plane,
  to reduce the probability of "self-intersection/tessellation errors caused by incorrect vertex order".
- When `outline=true`, an additional `PolygonOutlineGeometry` primitive is created for outline display.

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

Arc type (geodesic/rhumb line, etc.).

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

Whether to clamp to ground.

#### Default

```ts
false
```

***

### closeBottom?

> `optional` **closeBottom?**: `boolean`

Whether to close the bottom (effective when extruded).

#### Default

```ts
true
```

***

### closeTop?

> `optional` **closeTop?**: `boolean`

Whether to close the top (effective when extruded).

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

Ellipsoid used for computation and projection.

#### Default

```ts
CelestialEllipsoid.Earth()
```

***

### extrudedHeight?

> `optional` **extrudedHeight?**: `number`

Extruded height (forms a column), unit is the same as `height`.

***

### fill?

> `optional` **fill?**: `boolean`

***

### granularity?

> `optional` **granularity?**: `number`

Angular granularity (radians).

#### Default

```ts
Daisy.Math.RADIANS_PER_DEGREE
```

***

### height?

> `optional` **height?**: `number`

Polygon height (relative to the ellipsoid).

***

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

Fill material.

#### Default

```ts
Daisy.Color.YELLOW
```

***

### name?

> `optional` **name?**: `string`

Debug/identifier name.

***

### outline?

> `optional` **outline?**: `boolean`

Whether to draw outline.

#### Default

```ts
false
```

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](DColor.md)

Outline color

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Outline width

#### Default

```ts
1
```

***

### perPositionHeight?

> `optional` **perPositionHeight?**: `boolean`

Whether to use per-vertex height (z-component of positions).

#### Default

```ts
false
```

***

### positions?

> `optional` **positions?**: `Daisy.Cartesian3`[] \| [`Holes`](Holes.md) \| `Daisy.PolygonHierarchy`

Polygon vertices or hierarchy with holes.

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

Whether to show.

#### Default

```ts
true
```

***

### stRotation?

> `optional` **stRotation?**: `number`

Texture coordinate rotation angle (radians).

#### Default

```ts
0
```

***

### textureCoordinates?

> `optional` **textureCoordinates?**: `Daisy.Cartesian2`[] \| `TextureCoordinatesHoles` \| `Daisy.PolygonHierarchy`

Texture coordinates (one-to-one with positions).

***

### vertexFormat?

> `optional` **vertexFormat?**: `Daisy.VertexFormat`

Vertex format.

#### Default

```ts
Daisy.VertexFormat.DEFAULT
```
