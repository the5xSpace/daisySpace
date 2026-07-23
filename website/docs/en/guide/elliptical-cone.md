# Elliptical Cone

[EllipticalConeFeature](/en/api/classes/EllipticalConeFeature) is an elliptical-cone/elliptical-frustum primitive component built on [EllipticConeGeometry](/en/api/classes/EllipticConeGeometry). The X/Y opening angles can be configured independently, and the component is commonly used by Sensor components to render beam volumes.

## Basic Usage

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

## Independent X/Y Opening Angles

The key feature of an elliptical cone is that **the top and bottom faces each have two independent axis radii**, allowing elliptical cross-sections:

```typescript
// 顶部小端（靠近实体）
topSemiMajorAxis: 1200,    // 长半轴（米）
topSemiMinorAxis: 1200,    // 短半轴（米）

// 底部大端（远离实体方向）
bottomSemiMajorAxis: 260000, // 长半轴（米）
bottomSemiMinorAxis: 120000, // 短半轴（米）
```

| Parameter | Default | Description |
|------|--------|------|
| `topSemiMajorAxis` | `1` | Top semi-major axis, in meters |
| `topSemiMinorAxis` | `1` | Top semi-minor axis, in meters |
| `bottomSemiMajorAxis` | `100` | Bottom semi-major axis, in meters |
| `bottomSemiMinorAxis` | `50` | Bottom semi-minor axis, in meters |
| `slices` | `64` | Number of cross-section segments (larger values are smoother but more expensive) |

If all four radius parameters have the same value, the shape degenerates into a circular cone.

## Emission Direction (emitDirection)

`emitDirection` controls the cone's central-axis orientation and rotation-pivot position, determining the direction in which it extends from the Entity position:

| Value | Alignment | Typical use |
|------|----------|----------|
| `TO_GROUND` | Entity position is the top; extends toward the ground | Satellite-to-ground beam |
| `CENTER` | Entity position coincides with the cone center; rotates around the center | Freely oriented sensor |
| `TO_UP` | Entity position is the bottom; extends upward | Ground-to-sky station |
| `TO_BOTTOM` | Entity position is the top; extends downward (-Z) | Aircraft-to-ground |
| `TO_FRONT` | Entity position is the bottom; extends forward (+X) | Vehicle forward view |
| `TO_AFTER` | Entity position is the bottom; extends backward (-X) | Rear-view sensor |
| `TO_LEFT` | Entity position is the bottom; extends left (+Y) | Side view |
| `TO_RIGHT` | Entity position is the bottom; extends right (-Y) | Side view |

The **rotation-pivot position** differs by direction:

- `TO_GROUND`: the cone vertex is at the Entity position and rotation occurs around that point.
- `CENTER`: the cone center is at the Entity position and rotation occurs around the center.
- `TO_UP` / `TO_FRONT`, etc.: the cone base is at the Entity position and rotation occurs around that point.

## Height and Adaptation

```typescript
// 固定高度
height: 900000,
autoLength: false,

// 自动长度（动态求交计算高度，会覆盖 height）
autoLength: true,
```

When `autoLength: true`, the cone updates its height dynamically based on runtime state, such as terrain-ray intersections. This is suitable for scenes that must fit terrain or the ground precisely.

## Top and Bottom Caps

```typescript
capTop: true,     // 是否封闭顶面（默认 true）
capBottom: true,  // 是否封闭底面（默认 true）
```

## Outline and Material

```typescript
new Daisy.EllipticalConeFeature({
    // ...
    material: Daisy.Color.RED.withAlpha(0.38),
    outline: true,
    outlineColor: Daisy.Color.RED,
    outlineWidth: 2,
})
```

The material can be a `DMaterial` or a color (`DColor` / CSS color string). The outline width adjusts automatically with camera distance (`outlineUpdateByCamera: true`).

## Dynamic Rotation

Each Feature includes a `transformer`; use `setRotation()` to control the cone orientation dynamically:

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

The rotation effect depends on the pivot selected by `emitDirection`. For example, `TO_GROUND` swings around the vertex, `CENTER` rotates around the center, and `TO_UP` swings around the base.

## Body Axis Debugging

When debugging cone orientation, enable body-axis visualization through the Entity's `setBodyAxis()`:

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

Use a `PointFeature` to mark the Entity position and visually confirm that the cone's rotation pivot and orientation are correct.

## Parameter Table

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `topSemiMajorAxis` | `number` | `1` | Top semi-major axis, in meters |
| `topSemiMinorAxis` | `number` | `1` | Top semi-minor axis, in meters |
| `bottomSemiMajorAxis` | `number` | `100` | Bottom semi-major axis, in meters |
| `bottomSemiMinorAxis` | `number` | `50` | Bottom semi-minor axis, in meters |
| `height` | `number` | `100` | Height, in meters |
| `emitDirection` | `EmitDirection` | `TO_UP` | Emission direction/alignment reference |
| `autoLength` | `boolean` | `false` | Whether to calculate height dynamically |
| `slices` | `number` | `64` | Number of cross-section segments |
| `capTop` | `boolean` | `true` | Whether to cap the top |
| `capBottom` | `boolean` | `true` | Whether to cap the bottom |
| `material` | `DMaterial` | — | Material (takes precedence over `color`) |
| `color` | `DColor` | `Color.BLUE.withAlpha(0.5)` | Color (when `material` is not specified) |
| `outline` | `boolean` | `false` | Whether to draw an outline |
| `outlineColor` | `DColor` | — | Outline color |
| `outlineWidth` | `number` | `1` | Outline width in pixels |
| `show` | `boolean` | `true` | Visibility |
| `fill` | `boolean` | `true` | Whether to fill the surface |
| `numberOfVerticalLines` | `number` | `0` | Number of vertical lines (wireframe aid) |
| `position` | `Cartesian3` | — | Offset relative to the Entity coordinates |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Distance-based display condition |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | Vertex format |
| `shadows` | `ShadowMode` | — | Shadow mode |

> **Related API**: [EllipticalConeFeature](/en/api/classes/EllipticalConeFeature) · [EllipticConeGeometry](/en/api/classes/EllipticConeGeometry)
