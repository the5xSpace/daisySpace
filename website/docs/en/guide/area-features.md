# Area Features

Area Features render filled polygons, ellipses, and rectangles in a scene, with support for ground clamping, extrusion, and outlines.

## PolygonFeature

`PolygonFeature` renders filled polygons and supports recursive hole structures. Polygons can be clamped to the ground and extruded into solid building-like volumes.

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")
const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
```

```typescript
// 简单多边形
entity.addFeature(new Daisy.PolygonFeature({
    pathway: [
        Daisy.Cartesian3.fromDegrees(116, 38),
        Daisy.Cartesian3.fromDegrees(117, 38),
        Daisy.Cartesian3.fromDegrees(117, 39),
        Daisy.Cartesian3.fromDegrees(116, 39),
    ],
    material: Daisy.MaterialFactory.Solid({ color: "#3b82f6", alpha: 0.5 }),
    height: 0,
    extrudedHeight: 500,
    outline: true,
    outlineColor: Daisy.Color.WHITE,
    outlineWidth: 2,
}))

// 带孔洞多边形
entity.addFeature(new Daisy.PolygonFeature({
    pathway: {
        positions: outerRing,               // Cartesian3[] 外环
        holes: [
            { positions: innerHole1 },      // Holes 递归结构
        ],
    },
    material: Daisy.Color.RED.withAlpha(0.5),
    height: 100,
}))
```

`pathway` supports three input forms:

| Form | Description |
|------|------|
| `Cartesian3[]` | Simple point sequence |
| `Holes` | Recursive `{ positions, holes? }` structure with hole support |
| `PolygonHierarchy` | Polygon hierarchy structure |

### Parameter Table

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `pathway` | `Pathway \| Holes \| PolygonHierarchy` | — | Vertex/hole input |
| `show` | `boolean` | true | Visibility |
| `name` | `string` | — | Name |
| `material` | `DMaterial` | — | Material |
| `height` | `number` | 0.1 | Height in meters |
| `extrudedHeight` | `number` | — | Extrusion height in meters |
| `vertexFormat` | `VertexFormat` | `DEFAULT` | Vertex format |
| `stRotation` | `number` | 0 | Texture rotation in radians |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | Sampling granularity in radians |
| `perPositionHeight` | `boolean` | false | Whether each point has an independent height |
| `closeTop` | `boolean` | true | Whether to close the top during extrusion |
| `closeBottom` | `boolean` | true | Whether to close the bottom during extrusion |
| `clampToGround` | `boolean` | false | Whether to clamp to the ground |
| `depthWriteEnabled` | `boolean` | false | Whether to write depth |
| `outline` | `boolean` | false | Whether to draw an outline |
| `outlineColor` | `DColor` | — | Outline color |
| `outlineWidth` | `number` | 1 | Outline width in pixels |
| `fill` | `boolean` | — | Whether to fill faces |
| `arcType` | `ArcType` | `GEODESIC` | Arc interpolation type |
| `textureCoordinates` | `Cartesian2[] \| TextureCoordinatesHoles` | — | Texture-coordinate input |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Display distance condition |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | Celestial ellipsoid |
| `updateThrottleMs` | `number` | 400 | Update throttle interval in milliseconds |
| `autoSortPositions` | `boolean` | — | Whether to sort automatically to avoid self-intersections |
| `rebuildThrottleMs` | `number` | — | Rebuild throttle interval in milliseconds |

## EllipseFeature

`EllipseFeature` draws an ellipse from a specified center and semi-axis lengths, making it suitable for coverage areas, orbital projections, and similar shapes.

```typescript
// 以父实体位置为中心的椭圆
entity.addFeature(new Daisy.EllipseFeature({
    center: Daisy.REF.PARENT_ENTITY,               // 默认值
    semiMajorAxis: 3000,                     // 长半轴（米）
    semiMinorAxis: 1500,                     // 短半轴（米）
    height: 100,
    rotation: Daisy.Math.toRadians(45),      // 椭圆旋转（弧度）
    material: Daisy.MaterialFactory.Solid({ color: "#8b5cf6", alpha: 0.3 }),
    outline: true,
    outlineColor: Daisy.Color.PURPLE,
}))

// 固定坐标中心的椭圆
entity.addFeature(new Daisy.EllipseFeature({
    center: Daisy.Cartesian3.fromDegrees(120, 35),
    semiMajorAxis: 5000,
    semiMinorAxis: 3000,
    extrudedHeight: 200,
    material: Daisy.Color.GREEN.withAlpha(0.4),
}))
```

### Parameter Table

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `center` | `Cartesian3 \| Entity \| REF` | `REF.PARENT_ENTITY` | Ellipse center |
| `semiMajorAxis` | `number` | 1000 | Semi-major-axis length in meters |
| `semiMinorAxis` | `number` | 500 | Semi-minor-axis length in meters |
| `height` | `number` | 0.1 | Ellipse height in meters |
| `extrudedHeight` | `number` | — | Extrusion height in meters |
| `rotation` | `number` | 0 | Ellipse rotation in radians |
| `stRotation` | `number` | 0 | Texture rotation in radians |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | Sampling granularity in radians |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | Vertex format |
| `material` | `DMaterial` | `BLUE.alpha(0.5)` | Ellipse material |
| `outline` | `boolean` | false | Whether to draw an outline |
| `outlineColor` | `DColor` | `BLACK` | Outline color |
| `outlineWidth` | `number` | 1 | Outline width in pixels |
| `show` | `boolean` | true | Visibility |
| `fill` | `boolean` | true | Whether to fill faces |
| `clampToGround` | `boolean` | false | Whether to clamp to the ground |
| `classificationType` | `ClassificationType` | `BOTH` | Ground-classification target |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Display distance condition |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | Celestial ellipsoid |
| `updateThrottleMs` | `number` | 400 | Update throttle interval in milliseconds |

## RectangleFeature

`RectangleFeature` renders a geographic rectangle from west/south/east/north coordinates in radians.

```typescript
// 地理矩形（西/南/东/北，单位：弧度）
const rect = Daisy.Rectangle.fromDegrees(115, 35, 120, 40)

entity.addFeature(new Daisy.RectangleFeature({
    rectangle: rect,
    height: 0,
    extrudedHeight: 800,
    material: Daisy.MaterialFactory.Solid({ color: "#f59e0b", alpha: 0.4 }),
    outline: true,
    outlineColor: Daisy.Color.ORANGE,
    outlineWidth: 2,
}))
```

### Parameter Table

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `rectangle` | `Rectangle` | — | Rectangle region (west/south/east/north in radians) |
| `height` | `number` | 0.1 | Rectangle height in meters |
| `extrudedHeight` | `number` | — | Extrusion height in meters |
| `rotation` | `number` | 0 | Rectangle rotation in radians |
| `stRotation` | `number` | 0 | Texture rotation in radians |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | Sampling granularity in radians |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | Vertex format |
| `material` | `DMaterial` | `BLUE.alpha(0.5)` | Rectangle material |
| `outline` | `boolean` | false | Whether to draw an outline |
| `outlineColor` | `DColor` | `BLACK` | Outline color |
| `outlineWidth` | `number` | 1 | Outline width in pixels |
| `show` | `boolean` | true | Visibility |
| `fill` | `boolean` | true | Whether to fill faces |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Display distance condition |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | Celestial ellipsoid |
| `updateThrottleMs` | `number` | 400 | Update throttle interval in milliseconds |

> **Related API**: [PolygonFeature](/en/api/classes/PolygonFeature) · [EllipseFeature](/en/api/classes/EllipseFeature) · [RectangleFeature](/en/api/classes/RectangleFeature)

---

<!--
  示例参考: [Area feature demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/features)
-->
