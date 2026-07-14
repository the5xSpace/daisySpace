# 实体几何体

实体几何体 Feature 用于渲染长方体、立方体、圆柱、椭球、球体、椭圆锥等三维封闭几何。所有实体几何体均以 Entity 位置为原点，支持材质、轮廓线、阴影等通用选项。

## Feature 选型

| 需求 | Feature | 说明 |
|------|---------|------|
| 三轴独立尺寸的长方体 | `BoxFeature` | `dimensions: Cartesian3` |
| 棱台 / 截面可变的立方体 | `CubeFeature` | 底顶面独立宽长、`emitDirection` |
| 圆柱 / 圆台 | `CylinderFeature` | 顶底半径可不同 |
| 三轴椭球体 | `EllipsoidFeature` | `dimensions: Cartesian3`，支持纹理 |
| 正球体 | `SphereFeature` | `radius`，内部复用 EllipsoidFeature |
| 椭圆锥 / 椭圆台（传感器锥体） | `EllipticalConeFeature` | 顶底椭圆半轴、`emitDirection` |

## BoxFeature

长方体，通过 `dimensions` 分别指定 X / Y / Z 三个方向的边长。

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
```

```typescript
entity.addFeature(new Daisy.BoxFeature({
    dimensions: new Daisy.Cartesian3(200000, 200000, 200000),
    material: Daisy.Color.CYAN.withAlpha(0.6),
    outline: true,
    outlineColor: Daisy.Color.BLACK,
    outlineWidth: 1,
}))
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `dimensions` | `Cartesian3` | `(100, 100, 100)` | X / Y / Z 三边边长（米） |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.6)` | 材质 |
| `outline` | `boolean` | `true` | 轮廓线 |
| `outlineColor` | `DColor` | `Color.BLACK` | 轮廓色 |
| `outlineWidth` | `number` | `1` | 轮廓宽度（像素） |
| `show` | `boolean` | `true` | 可见性 |
| `shadows` | `ShadowMode` | `DISABLED` | 阴影模式 |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | `undefined` | 视距显示条件 |

## CubeFeature

棱台 / 立方体，底顶面可独立指定宽度和长度，通过 `emitDirection` 控制对齐基准。

```typescript
entity.addFeature(new Daisy.CubeFeature({
    bottomX: 100,        // 底部宽
    bottomY: 100,        // 底部长
    topX: 100,           // 顶面宽
    topY: 100,           // 顶面长
    height: 100,
    material: Daisy.Color.BLUE.withAlpha(0.5),
    emitDirection: Daisy.EmitDirection.TO_UP,
    outline: true,
    outlineColor: Daisy.Color.WHITE,
}))
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `bottomX` | `number` | `100` | 底部宽度（米） |
| `bottomY` | `number` | `100` | 底部长度（米） |
| `topX` | `number` | `100` | 顶面宽度（米） |
| `topY` | `number` | `100` | 顶面长度（米） |
| `height` | `number` | `100` | 高度（米） |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.5)` | 材质 |
| `emitDirection` | `EmitDirection` | `TO_UP` | 发射方向/对齐基准 |
| `autoLength` | `boolean` | `false` | 自动高度（贴地/射线求交动态计算） |
| `fill` | `boolean` | `true` | 填充面 |
| `outline` | `boolean` | `false` | 轮廓线 |
| `outlineColor` | `DColor` | — | 轮廓色 |
| `outlineWidth` | `number` | `1` | 轮廓宽度（像素） |
| `show` | `boolean` | `true` | 可见性 |
| `position` | `Cartesian3` | — | 相对实体局部偏移 |

## CylinderFeature

圆柱 / 圆台，顶底半径可不同。高度方向为 Z 轴（经 `emitDirection` 变换后对齐）。

```typescript
entity.addFeature(new Daisy.CylinderFeature({
    height: 300000,
    topRadius: 80000,
    bottomRadius: 80000,
    material: Daisy.Color.LIME.withAlpha(0.6),
    slices: 64,
    capTop: true,
    capBottom: true,
}))
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `height` | `number` | `200000` | 高度（米） |
| `topRadius` | `number` | `100` | 顶部半径（米） |
| `bottomRadius` | `number` | `100` | 底部半径（米） |
| `slices` | `number` | `64` | 切分片数（越大越圆滑） |
| `capTop` | `boolean` | `true` | 封顶 |
| `capBottom` | `boolean` | `true` | 封底 |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.5)` | 材质 |
| `emitDirection` | `EmitDirection` | `TO_UP` | 发射方向 |
| `autoLength` | `boolean` | `false` | 自动高度 |
| `fill` | `boolean` | `true` | 填充面 |
| `outline` | `boolean` | `false` | 轮廓线 |
| `outlineColor` | `DColor` | — | 轮廓色 |
| `outlineWidth` | `number` | `1` | 轮廓宽度（像素） |
| `show` | `boolean` | `true` | 可见性 |
| `position` | `Cartesian3` | — | 相对实体局部偏移 |

## EllipsoidFeature

三轴椭球体，`dimensions` 对应 X / Y / Z 三个方向的直径。支持纹理贴图、光照控制。

```typescript
entity.addFeature(new Daisy.EllipsoidFeature({
    dimensions: new Daisy.Cartesian3(150000, 100000, 100000),
    material: Daisy.Color.ORANGE.withAlpha(0.6),
    outline: true,
    outlineColor: Daisy.Color.BLACK,
    outlineWidth: 1,
    lighting: true,
}))
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `dimensions` | `Cartesian3` | `(100, 100, 100)` | X / Y / Z 三轴直径（米） |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.6)` | 材质（支持颜色/纹理/DMaterial） |
| `outline` | `boolean` | `true` | 轮廓线（三轴椭圆环） |
| `outlineColor` | `DColor` | `Color.BLACK` | 轮廓色 |
| `outlineWidth` | `number` | `1` | 轮廓宽度（像素） |
| `lighting` | `boolean` | `true` | 光照（影响明暗面） |
| `stOffset` | `Cartesian2` | `(0, 0)` | 纹理坐标偏移 |
| `show` | `boolean` | `true` | 可见性 |
| `shadows` | `ShadowMode` | `DISABLED` | 阴影模式 |

## SphereFeature

正球体，内部复用 `EllipsoidFeature`。所有 `EllipsoidFeature` 的参数均可透传使用。

```typescript
entity.addFeature(new Daisy.SphereFeature({
    radius: 120000,
    material: Daisy.Color.PURPLE.withAlpha(0.5),
    outline: true,
    outlineColor: Daisy.Color.WHITE,
    // EllipsoidOptions 中的参数同样可用：
    lighting: true,
    stOffset: new Daisy.Cartesian2(0, 0),
}))
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `radius` | `number` | `100` | 球体半径（米） |
| `material` | `DMaterial` | — | 材质（透传 EllipsoidFeature） |
| `outline` | `boolean` | — | 轮廓线 |
| `outlineColor` | `DColor` | — | 轮廓色 |
| `outlineWidth` | `number` | — | 轮廓宽度 |

> **提示**：由于 `SphereFeature` 继承自 `Omit<EllipsoidOptions, "dimensions">`，所有 EllipsoidFeature 参数（`lighting`、`stOffset`、`shadows` 等）均可直接传入。

## EllipticalConeFeature

椭圆锥/椭圆台，通过顶底椭圆半轴定义截面形状。常用于表示传感器波束覆盖锥体。

**`emitDirection` 控制中心轴方向**：锥体的 Z 轴（高度方向）经 `emitDirection` 对齐到指定方向。X / Y 半轴始终垂直于发射方向所在的平面，分别沿椭圆的长短轴方向展开。

- `TO_UP`：锥体沿 +Z（远离地表）延伸，Entity 位于宽底端
- `TO_GROUND`：锥体沿 -Z（指向地表）延伸，顶点在 Entity 位置
- `CENTER`：锥体中心与 Entity 重合

```typescript
entity.addFeature(new Daisy.EllipticalConeFeature({
    topSemiMajorAxis: 1200,
    topSemiMinorAxis: 1200,
    bottomSemiMajorAxis: 260000,
    bottomSemiMinorAxis: 120000,
    height: 900000,
    slices: 72,
    material: Daisy.Color.RED.withAlpha(0.38),
    outline: true,
    outlineColor: Daisy.Color.RED,
    outlineWidth: 2,
    emitDirection: Daisy.EmitDirection.TO_GROUND,
    autoLength: false,
    capTop: true,
    capBottom: true,
}))
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `topSemiMajorAxis` | `number` | `1` | 顶端椭圆长半轴（米） |
| `topSemiMinorAxis` | `number` | `1` | 顶端椭圆短半轴（米） |
| `bottomSemiMajorAxis` | `number` | `100` | 底端椭圆长半轴（米） |
| `bottomSemiMinorAxis` | `number` | `50` | 底端椭圆短半轴（米） |
| `height` | `number` | `100` | 锥体高度（米） |
| `slices` | `number` | `64` | 椭圆切分片数 |
| `capTop` | `boolean` | `true` | 封顶（顶端覆盖面） |
| `capBottom` | `boolean` | `true` | 封底（底端覆盖面） |
| `emitDirection` | `EmitDirection` | `TO_UP` | 发射方向，决定中心轴朝向 |
| `autoLength` | `boolean` | `false` | 自动高度 |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.5)` | 材质 |
| `fill` | `boolean` | `true` | 填充面 |
| `outline` | `boolean` | `false` | 轮廓线 |
| `outlineColor` | `DColor` | — | 轮廓色 |
| `outlineWidth` | `number` | `1` | 轮廓宽度（像素） |
| `show` | `boolean` | `true` | 可见性 |
| `position` | `Cartesian3` | — | 相对实体局部偏移 |

### emitDirection 旋转基准

| 模式 | 旋转基准点 | 适用场景 |
|------|-----------|----------|
| `TO_GROUND` | Entity 位置为顶点，锥体向地球方向延伸 | 卫星对地传感器 |
| `CENTER` | 椎体中心与 Entity 重合 | 居中锥体 |
| `TO_UP` | Entity 位置为底点，锥体向上延伸 | 地对空传感器 |

> X / Y 半轴始终垂直于 emit 方向。例如 `TO_GROUND` 时，椭圆截面在垂直于"指向地心方向"的平面内展开。

---

> **相关 API**：[BoxFeature](/api/classes/BoxFeature) · [CubeFeature](/api/classes/CubeFeature) · [CylinderFeature](/api/classes/CylinderFeature) · [EllipsoidFeature](/api/classes/EllipsoidFeature) · [SphereFeature](/api/classes/SphereFeature) · [EllipticalConeFeature](/api/classes/EllipticalConeFeature)
