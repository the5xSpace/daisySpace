# Elliptical Cone

[EllipticalConeFeature](/en/api/classes/EllipticalConeFeature) is an elliptical cone/truncated cone primitive component, built on [EllipticConeGeometry](/en/api/classes/EllipticConeGeometry). The X/Y aperture angles can be set independently, and it is commonly used by the Sensor component for rendering beam volumes.

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

## X/Y Independent Aperture

The core feature of the elliptical cone is that **the top and bottom surfaces each have two independent axis radii**, allowing elliptical cross-sections:

```typescript
// 顶部小端（靠近实体）
topSemiMajorAxis: 1200,    // 长半轴（米）
topSemiMinorAxis: 1200,    // 短半轴（米）

// 底部大端（远离实体方向）
bottomSemiMajorAxis: 260000, // 长半轴（米）
bottomSemiMinorAxis: 120000, // 短半轴（米）
```

| Parameter | Default | Description |
|-----------|---------|-------------|
| `topSemiMajorAxis` | `1` | Top semi-major axis (meters) |
| `topSemiMinorAxis` | `1` | Top semi-minor axis (meters) |
| `bottomSemiMajorAxis` | `100` | Bottom semi-major axis (meters) |
| `bottomSemiMinorAxis` | `50` | Bottom semi-minor axis (meters) |
| `slices` | `64` | Cross-section divisions (higher = smoother, more expensive) |

If all four radius parameters are set to the same value, it degenerates into a cone.

## Emit Direction

`emitDirection` controls the cone's central axis orientation and rotation pivot position, determining the direction in which the cone extends from the entity position:

| Value | Alignment | Typical Scenario |
|-------|-----------|------------------|
| `TO_GROUND` | Entity position at top, extends toward ground | Satellite ground beam |
| `CENTER` | Entity position coincides with cone center, rotates around center | Free-orientation sensor |
| `TO_UP` | Entity position at bottom, extends upward | Ground station skyward |
| `TO_BOTTOM` | Entity position at top, extends downward (-Z) | Aircraft ground-facing |
| `TO_FRONT` | Entity position at bottom, extends forward (+X) | Vehicle front-facing |
| `TO_AFTER` | Entity position at bottom, extends backward (-X) | Rear-view sensor |
| `TO_LEFT` | Entity position at bottom, extends left (+Y) | Side-view |
| `TO_RIGHT` | Entity position at bottom, extends right (-Y) | Side-view |

The **rotation pivot position** differs by direction:
- `TO_GROUND`: Cone apex at entity position, rotates around this point
- `CENTER`: Cone center at entity position, rotates around center
- `TO_UP` / `TO_FRONT` etc.: Cone base point at entity position, rotates around this point

## Height and Auto-Length

```typescript
// 固定高度
height: 900000,
autoLength: false,

// 自动长度（动态求交计算高度，会覆盖 height）
autoLength: true,
```

When `autoLength: true`, the cone dynamically updates its height based on runtime conditions (e.g., surface ray intersection), suitable for scenarios requiring precise terrain/ground alignment.

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

Material supports `DMaterial` or colors (`DColor` / CSS color string). Outline width auto-adjusts with camera distance (`outlineUpdateByCamera: true`).

## Dynamic Rotation

Each Feature has a built-in `transformer`, which can dynamically control the cone's orientation via `setRotation()`:

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

The rotation effect depends on the pivot position set by `emitDirection` — for example, in `TO_GROUND` mode, the cone swings around its apex; in `CENTER` mode, it rotates around the center; in `TO_UP` mode, it swings around the base point.

## Body Axis Debugging

When debugging the cone's orientation, enable body axis visualization via the entity's `setBodyAxis()`:

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

Combined with `PointFeature` to mark the entity position, you can intuitively verify whether the cone's rotation pivot and orientation are correct.

## Parameter Table

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `topSemiMajorAxis` | `number` | `1` | Top semi-major axis (meters) |
| `topSemiMinorAxis` | `number` | `1` | Top semi-minor axis (meters) |
| `bottomSemiMajorAxis` | `number` | `100` | Bottom semi-major axis (meters) |
| `bottomSemiMinorAxis` | `number` | `50` | Bottom semi-minor axis (meters) |
| `height` | `number` | `100` | Height (meters) |
| `emitDirection` | `EmitDirection` | `TO_UP` | Emit direction / alignment reference |
| `autoLength` | `boolean` | `false` | Whether to dynamically compute height |
| `slices` | `number` | `64` | Cross-section divisions |
| `capTop` | `boolean` | `true` | Whether to cap the top |
| `capBottom` | `boolean` | `true` | Whether to cap the bottom |
| `material` | `DMaterial` | — | Material (overrides `color`) |
| `color` | `DColor` | `Color.BLUE.withAlpha(0.5)` | Color (when `material` is not specified) |
| `outline` | `boolean` | `false` | Whether to draw outline |
| `outlineColor` | `DColor` | — | Outline color |
| `outlineWidth` | `number` | `1` | Outline width (pixels) |
| `show` | `boolean` | `true` | Visibility |
| `fill` | `boolean` | `true` | Whether to fill the face |
| `numberOfVerticalLines` | `number` | `0` | Number of vertical lines (wireframe helper) |
| `position` | `Cartesian3` | — | Relative entity coordinate offset |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Distance display condition |
| `vertexFormat` | `VertexFormat` | `POSITION_AND_NORMAL` | Vertex format |
| `shadows` | `ShadowMode` | — | Shadow mode |

> **Related API**: [EllipticalConeFeature](/en/api/classes/EllipticalConeFeature) · [EllipticConeGeometry](/en/api/classes/EllipticConeGeometry)
