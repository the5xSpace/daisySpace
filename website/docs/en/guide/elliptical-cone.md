# 椭圆锥

[EllipticalConeFeature](/en/api/classes/EllipticalConeFeature) 是一个椭圆锥/椭圆台图元组件，基于 [EllipticConeGeometry](/en/api/classes/EllipticConeGeometry) 构建。X/Y 轴开口角可独立设置，常被 Sensor 组件用于渲染波束体积。

## 基础用法

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
const entity = engine.createEntity("demo")

entity.addFeature(new Daisy.EllipticalConeFeature({
    topSemiMajorAxis: 10,
    topSemiMinorAxis: 10,
    bottomSemiMajorAxis: 50000,
    bottomSemiMinorAxis: 30000,
    height: 400000,
    material: Daisy.Color.RED.withAlpha(0.3),
    emitDirection: Daisy.EmitDirection.TO_GROUND,
}))
```

## X/Y 独立开角

椭圆锥的核心特点是 **顶面和底面各有两个独立轴半径**，可以创建椭圆形截面：

```typescript
// 顶部小端（靠近实体）
topSemiMajorAxis: 1200,    // 长半轴（米）
topSemiMinorAxis: 1200,    // 短半轴（米）

// 底部大端（远离实体方向）
bottomSemiMajorAxis: 260000, // 长半轴（米）
bottomSemiMinorAxis: 120000, // 短半轴（米）
```

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `topSemiMajorAxis` | `1` | 顶面长半轴（米） |
| `topSemiMinorAxis` | `1` | 顶面短半轴（米） |
| `bottomSemiMajorAxis` | `100` | 底面长半轴（米） |
| `bottomSemiMinorAxis` | `50` | 底面短半轴（米） |
| `slices` | `64` | 截面分割数（越大越圆滑，开销更大） |

若四个半径参数设为相同值，则退化为圆锥。

## 发射方向（emitDirection）

`emitDirection` 控制锥体的中心轴朝向和旋转枢轴位置，决定了椎体从实体位置向哪个方向延伸：

| 值 | 对齐方式 | 典型场景 |
|------|----------|----------|
| `TO_GROUND` | 实体位置为顶部，向地表方向延伸 | 卫星对地波束 |
| `CENTER` | 实体位置与锥体中心重合，绕中心旋转 | 自由朝向传感器 |
| `TO_UP` | 实体位置为底部，向上延伸 | 地面站对空 |
| `TO_BOTTOM` | 实体位置为顶部，向下方（-Z）延伸 | 飞机对地 |
| `TO_FRONT` | 实体位置为底部，向前方（+X）延伸 | 车辆前视 |
| `TO_AFTER` | 实体位置为底部，向后方（-X）延伸 | 后视传感器 |
| `TO_LEFT` | 实体位置为底部，向左侧（+Y）延伸 | 侧视 |
| `TO_RIGHT` | 实体位置为底部，向右侧（-Y）延伸 | 侧视 |

不同方向下，**旋转枢轴位置**不同：

- `TO_GROUND`：椎体顶点在实体位置，绕该点旋转
- `CENTER`：椎体中心在实体位置，绕中心旋转
- `TO_UP` / `TO_FRONT` 等：椎体底点在实体位置，绕该点旋转

## 高度与自适应

```typescript
// 固定高度
height: 900000,
autoLength: false,

// 自动长度（动态求交计算高度，会覆盖 height）
autoLength: true,
```

当 `autoLength: true` 时，锥体会根据运行态（如地表射线求交）动态更新高度，适合需要精确贴合地形/地面的场景。

## 封顶与封底

```typescript
capTop: true,     // 是否封闭顶面（默认 true）
capBottom: true,  // 是否封闭底面（默认 true）
```

## 轮廓与材质

```typescript
new Daisy.EllipticalConeFeature({
    // ...
    material: Daisy.Color.RED.withAlpha(0.38),
    outline: true,
    outlineColor: Daisy.Color.RED,
    outlineWidth: 2,
})
```

材质支持 `DMaterial` 或颜色（`DColor` / CSS 色值字符串）。轮廓线会随相机距离自动调整粗细（`outlineUpdateByCamera: true`）。

## 动态旋转

每个 Feature 自带 `transformer`，可通过 `setRotation()` 动态控制椎体朝向：

```typescript
const cone = new Daisy.EllipticalConeFeature({ /* ... */ })
entity.addFeature(cone)

// 在 onPreRender 中持续更新
engine.onPreRender(() => {
    cone.transformer.setRotation({
        heading: t * 32,            // 绕 +Z 旋转（度/秒）
        pitch: Math.sin(t) * 30,    // 俯仰摆动（度）
        roll: 0,                    // 横滚（度）
    })
})
```

旋转效果取决于 `emitDirection` 设置的枢轴位置——例如 `TO_GROUND` 模式下椎体会绕顶点摆动，`CENTER` 模式下绕中心旋转，`TO_UP` 模式下绕底点摆动。

## Body Axis 辅助调试

在为椎体做方向调试时，可通过实体的 `setBodyAxis()` 开启体轴可视化：

```typescript
entity.setBodyAxis({
    length: 620000,         // 轴长度
    axisWidth: 4,           // 轴粗细
    showLabels: true,       // 显示 XYZ 标签
    labelPrefix: "G-",      // 标签前缀
    showSphere: true,       // 原点显示球体
    showWireframe: true,    // 线框包围
})
```

结合 `PointFeature` 标记实体位置，可以直观确认锥体的旋转枢轴和朝向是否正确。

## 参数表

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `topSemiMajorAxis` | `number` | `1` | 顶面长半轴（米） |
| `topSemiMinorAxis` | `number` | `1` | 顶面短半轴（米） |
| `bottomSemiMajorAxis` | `number` | `100` | 底面长半轴（米） |
| `bottomSemiMinorAxis` | `number` | `50` | 底面短半轴（米） |
| `height` | `number` | `100` | 高度（米） |
| `emitDirection` | `EmitDirection` | `TO_UP` | 发射方向/对齐基准 |
| `autoLength` | `boolean` | `false` | 是否动态计算高度 |
| `slices` | `number` | `64` | 截面分割数 |
| `capTop` | `boolean` | `true` | 是否封顶 |
| `capBottom` | `boolean` | `true` | 是否封底 |
| `material` | `DMaterial` | — | 材质（优先于 `color`） |
| `color` | `DColor` | `Color.BLUE.withAlpha(0.5)` | 颜色（`material` 未指定时） |
| `outline` | `boolean` | `false` | 是否绘制轮廓线 |
| `outlineColor` | `DColor` | — | 轮廓颜色 |
| `outlineWidth` | `number` | `1` | 轮廓宽度（像素） |
| `show` | `boolean` | `true` | 显隐 |
| `fill` | `boolean` | `true` | 是否填充面 |
| `numberOfVerticalLines` | `number` | `0` | 垂直线条数量（线框辅助） |
| `position` | `Cartesian3` | — | 相对实体坐标偏移 |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | 距离显示条件 |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | 顶点格式 |
| `shadows` | `ShadowMode` | — | 阴影模式 |

> **相关 API**：[EllipticalConeFeature](/en/api/classes/EllipticalConeFeature) · [EllipticConeGeometry](/en/api/classes/EllipticConeGeometry)
