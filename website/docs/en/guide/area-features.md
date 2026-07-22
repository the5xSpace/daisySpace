# 面要素

面要素（Area Features）在场景中绘制填充多边形、椭圆和矩形几何体，支持贴地、挤出和轮廓线。

## PolygonFeature

`PolygonFeature` 绘制填充多边形，支持孔洞（hole）递归结构，可贴地拉伸为立体建筑体块。

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

`pathway` 支持三种输入形式：

| 形式 | 说明 |
|------|------|
| `Cartesian3[]` | 简单点列 |
| `Holes` | `{ positions, holes? }` 递归结构，支持孔洞 |
| `PolygonHierarchy` | 多边形层级结构 |

### 参数表

| 参数 | 类型 | 默认 | 说明 |
|------|------|:---:|------|
| `pathway` | `Pathway \| Holes \| PolygonHierarchy` | — | 顶点/孔洞输入 |
| `show` | `boolean` | true | 显隐 |
| `name` | `string` | — | 名称 |
| `material` | `DMaterial` | — | 材质 |
| `height` | `number` | 0.1 | 高度（米） |
| `extrudedHeight` | `number` | — | 挤出高度（米） |
| `vertexFormat` | `VertexFormat` | `DEFAULT` | 顶点格式 |
| `stRotation` | `number` | 0 | 纹理旋转（弧度） |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | 采样粒度（弧度） |
| `perPositionHeight` | `boolean` | false | 是否每个点独立高度 |
| `closeTop` | `boolean` | true | 挤出时顶部是否闭合 |
| `closeBottom` | `boolean` | true | 挤出时底部是否闭合 |
| `clampToGround` | `boolean` | false | 是否贴地 |
| `depthWriteEnabled` | `boolean` | false | 是否写深度 |
| `outline` | `boolean` | false | 是否绘制轮廓线 |
| `outlineColor` | `DColor` | — | 轮廓颜色 |
| `outlineWidth` | `number` | 1 | 轮廓宽度（像素） |
| `fill` | `boolean` | — | 是否填充面 |
| `arcType` | `ArcType` | `GEODESIC` | 连线弧线类型 |
| `textureCoordinates` | `Cartesian2[] \| TextureCoordinatesHoles` | — | 纹理坐标输入 |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | 显示距离条件 |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | 天体椭球 |
| `updateThrottleMs` | `number` | 400 | 更新节流时间（毫秒） |
| `autoSortPositions` | `boolean` | — | 是否自动排序（避免自交） |
| `rebuildThrottleMs` | `number` | — | 重建节流时间（毫秒） |

## EllipseFeature

`EllipseFeature` 以指定中心点和半轴长度绘制椭圆，适合表示覆盖区域、轨道投影等。

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

### 参数表

| 参数 | 类型 | 默认 | 说明 |
|------|------|:---:|------|
| `center` | `Cartesian3 \| Entity \| REF` | `REF.PARENT_ENTITY` | 椭圆中心点 |
| `semiMajorAxis` | `number` | 1000 | 长半轴长度（米） |
| `semiMinorAxis` | `number` | 500 | 短半轴长度（米） |
| `height` | `number` | 0.1 | 椭圆高度（米） |
| `extrudedHeight` | `number` | — | 挤出高度（米） |
| `rotation` | `number` | 0 | 椭圆旋转角（弧度） |
| `stRotation` | `number` | 0 | 纹理旋转角（弧度） |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | 采样粒度（弧度） |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | 顶点格式 |
| `material` | `DMaterial` | `BLUE.alpha(0.5)` | 椭圆材质 |
| `outline` | `boolean` | false | 是否绘制轮廓线 |
| `outlineColor` | `DColor` | `BLACK` | 轮廓颜色 |
| `outlineWidth` | `number` | 1 | 轮廓宽度（像素） |
| `show` | `boolean` | true | 显隐 |
| `fill` | `boolean` | true | 是否填充面 |
| `clampToGround` | `boolean` | false | 是否贴地 |
| `classificationType` | `ClassificationType` | `BOTH` | 贴地分类目标 |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | 显示距离条件 |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | 天体椭球 |
| `updateThrottleMs` | `number` | 400 | 更新节流时间（毫秒） |

## RectangleFeature

`RectangleFeature` 以地理矩形（西/南/东/北弧度坐标）绘制矩形几何体。

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

### 参数表

| 参数 | 类型 | 默认 | 说明 |
|------|------|:---:|------|
| `rectangle` | `Rectangle` | — | 矩形区域（西/南/东/北，弧度） |
| `height` | `number` | 0.1 | 矩形高度（米） |
| `extrudedHeight` | `number` | — | 挤出高度（米） |
| `rotation` | `number` | 0 | 矩形旋转角（弧度） |
| `stRotation` | `number` | 0 | 纹理旋转角（弧度） |
| `granularity` | `number` | `RADIANS_PER_DEGREE` | 采样粒度（弧度） |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | 顶点格式 |
| `material` | `DMaterial` | `BLUE.alpha(0.5)` | 矩形材质 |
| `outline` | `boolean` | false | 是否绘制轮廓线 |
| `outlineColor` | `DColor` | `BLACK` | 轮廓颜色 |
| `outlineWidth` | `number` | 1 | 轮廓宽度（像素） |
| `show` | `boolean` | true | 显隐 |
| `fill` | `boolean` | true | 是否填充面 |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | 显示距离条件 |
| `ellipsoid` | `CelestialEllipsoid` | `Earth()` | 天体椭球 |
| `updateThrottleMs` | `number` | 400 | 更新节流时间（毫秒） |

> **Related API**: [PolygonFeature](/en/api/classes/PolygonFeature) · [EllipseFeature](/en/api/classes/EllipseFeature) · [RectangleFeature](/en/api/classes/RectangleFeature)

---

<!--
  示例参考: [Area feature demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/features)
-->
