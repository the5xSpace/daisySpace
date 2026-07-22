# Area Features

Area Features draw filled polygon, ellipse, and rectangle geometries in the scene, supporting ground-clamp, extrusion, and outline.

## PolygonFeature

`PolygonFeature` draws filled polygons, supports recursive hole structures, and can extrude upward into solid building volumes.

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
|------|-------------|
| `Cartesian3[]` | Simple point list |
| `Holes` | `{ positions, holes? }` recursive structure, supports holes |
| `PolygonHierarchy` | Polygon hierarchy structure |

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|:-------:|-------------|
| `pathway` | `Pathway \| Holes \| PolygonHierarchy` | — | Vertex/hole input |
| `show` | `boolean` | true | Visibility |
| `name` | `string` | — | Name |
| `material` | `DMaterial` | — | Material |
| `height` | `number` | 0.1 | Height (m) |
| `extrudedHeight` | `number` | — | Extrusion height (m) |
| `vertexFormat` | `VertexFormat` | `DEFAULT` | Vertex format |
| `stRotation` | `number` | 0 | Texture rotation (radians) |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | Sample granularity (radians) |
| `perPositionHeight` | `boolean` | false | Whether each point has independent height |
| `closeTop` | `boolean` | true | Close top when extruding |
| `closeBottom` | `boolean` | true | Close bottom when extruding |
| `clampToGround` | `boolean` | false | Whether to clamp to ground |
| `depthWriteEnabled` | `boolean` | false | Whether to write depth |
| `outline` | `boolean` | false | Whether to draw outline |
| `outlineColor` | `DColor` | — | Outline color |
| `outlineWidth` | `number` | 1 | Outline width (pixels) |
| `fill` | `boolean` | — | Whether to fill the face |
| `arcType` | `ArcType` | `GEODESIC` | Connection arc type |
| `textureCoordinates` | `Cartesian2[] \| TextureCoordinatesHoles` | — | Texture coordinate input |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Display distance condition |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | Celestial ellipsoid |
| `updateThrottleMs` | `number` | 400 | Update throttle time (ms) |
| `autoSortPositions` | `boolean` | — | Whether to auto-sort (avoid self-intersection) |
| `rebuildThrottleMs` | `number` | — | Rebuild throttle time (ms) |

## EllipseFeature

`EllipseFeature` draws an ellipse centered at a specified point with given semi-axis lengths. Suitable for coverage areas, orbit projections, etc.

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

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|:-------:|-------------|
| `center` | `Cartesian3 \| Entity \| REF` | `REF.PARENT_ENTITY` | Ellipse center point |
| `semiMajorAxis` | `number` | 1000 | Semi-major axis length (m) |
| `semiMinorAxis` | `number` | 500 | Semi-minor axis length (m) |
| `height` | `number` | 0.1 | Ellipse height (m) |
| `extrudedHeight` | `number` | — | Extrusion height (m) |
| `rotation` | `number` | 0 | Ellipse rotation angle (radians) |
| `stRotation` | `number` | 0 | Texture rotation angle (radians) |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | Sample granularity (radians) |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | Vertex format |
| `material` | `DMaterial` | `BLUE.alpha(0.5)` | Ellipse material |
| `outline` | `boolean` | false | Whether to draw outline |
| `outlineColor` | `DColor` | `BLACK` | Outline color |
| `outlineWidth` | `number` | 1 | Outline width (pixels) |
| `show` | `boolean` | true | Visibility |
| `fill` | `boolean` | true | Whether to fill face |
| `clampToGround` | `boolean` | false | Whether to clamp to ground |
| `classificationType` | `ClassificationType` | `BOTH` | Ground-clamp classification target |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Display distance condition |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | Celestial ellipsoid |
| `updateThrottleMs` | `number` | 400 | Update throttle time (ms) |

## RectangleFeature

`RectangleFeature` draws rectangle geometry from a geographic rectangle (west/south/east/north in radians).

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

### Parameters

| Parameter | Type | Default | Description |
|-----------|------|:-------:|-------------|
| `rectangle` | `Rectangle` | — | Rectangle region (west/south/east/north, radians) |
| `height` | `number` | 0.1 | Rectangle height (m) |
| `extrudedHeight` | `number` | — | Extrusion height (m) |
| `rotation` | `number` | 0 | Rectangle rotation angle (radians) |
| `stRotation` | `number` | 0 | Texture rotation angle (radians) |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | Sample granularity (radians) |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | Vertex format |
| `material` | `DMaterial` | `BLUE.alpha(0.5)` | Rectangle material |
| `outline` | `boolean` | false | Whether to draw outline |
| `outlineColor` | `DColor` | `BLACK` | Outline color |
| `outlineWidth` | `number` | 1 | Outline width (pixels) |
| `show` | `boolean` | true | Visibility |
| `fill` | `boolean` | true | Whether to fill face |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Display distance condition |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | Celestial ellipsoid |
| `updateThrottleMs` | `number` | 400 | Update throttle time (ms) |

> **相关 API**：[PolygonFeature](/api/classes/PolygonFeature) · [EllipseFeature](/api/classes/EllipseFeature) · [RectangleFeature](/api/classes/RectangleFeature)

---

<!--
   Example reference: [Area feature demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/features)
-->
