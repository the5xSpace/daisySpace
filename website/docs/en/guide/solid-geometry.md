# Solid Geometry

Solid geometry Features are used to render 3D closed geometries such as boxes, cubes, cylinders, ellipsoids, spheres, and elliptical cones. All solid geometries are positioned at the Entity's origin and support common options like material, outline, and shadows.

## Feature Selection

| Requirement | Feature | Description |
|-------------|---------|-------------|
| Box with independent X/Y/Z dimensions | `BoxFeature` | `dimensions: Cartesian3` |
| Frustum / variable cross-section cube | `CubeFeature` | Independent top/bottom width/length, `emitDirection` |
| Cylinder / frustum | `CylinderFeature` | Top and bottom radii can differ |
| Triaxial ellipsoid | `EllipsoidFeature` | `dimensions: Cartesian3`, supports textures |
| Sphere | `SphereFeature` | `radius`, internally reuses EllipsoidFeature |
| Elliptical cone / frustum (sensor cone) | `EllipticalConeFeature` | Top/bottom ellipse semi-axes, `emitDirection` |

## BoxFeature

Box, with edge lengths specified independently for X / Y / Z directions via `dimensions`.

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

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `dimensions` | `Cartesian3` | `(100, 100, 100)` | X / Y / Z edge lengths (meters) |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.6)` | Material |
| `outline` | `boolean` | `true` | Outline |
| `outlineColor` | `DColor` | `Color.BLACK` | Outline color |
| `outlineWidth` | `number` | `1` | Outline width (pixels) |
| `show` | `boolean` | `true` | Visibility |
| `shadows` | `ShadowMode` | `DISABLED` | Shadow mode |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | `undefined` | Distance display condition |

## CubeFeature

Frustum / cube, with independently configurable top and bottom width and length, controlled by `emitDirection` for alignment reference.

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

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `bottomX` | `number` | `100` | Bottom width (meters) |
| `bottomY` | `number` | `100` | Bottom length (meters) |
| `topX` | `number` | `100` | Top width (meters) |
| `topY` | `number` | `100` | Top length (meters) |
| `height` | `number` | `100` | Height (meters) |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.5)` | Material |
| `emitDirection` | `EmitDirection` | `TO_UP` | Emit direction / alignment reference |
| `autoLength` | `boolean` | `false` | Auto height (dynamic computation for ground clamping/ray intersection) |
| `fill` | `boolean` | `true` | Fill face |
| `outline` | `boolean` | `false` | Outline |
| `outlineColor` | `DColor` | — | Outline color |
| `outlineWidth` | `number` | `1` | Outline width (pixels) |
| `show` | `boolean` | `true` | Visibility |
| `position` | `Cartesian3` | — | Relative entity local offset |

## CylinderFeature

Cylinder / frustum, with independently configurable top and bottom radii. The height direction is along the Z axis (aligned after `emitDirection` transformation).

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

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `height` | `number` | `200000` | Height (meters) |
| `topRadius` | `number` | `100` | Top radius (meters) |
| `bottomRadius` | `number` | `100` | Bottom radius (meters) |
| `slices` | `number` | `64` | Slice count (higher = smoother) |
| `capTop` | `boolean` | `true` | Cap top |
| `capBottom` | `boolean` | `true` | Cap bottom |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.5)` | Material |
| `emitDirection` | `EmitDirection` | `TO_UP` | Emit direction |
| `autoLength` | `boolean` | `false` | Auto height |
| `fill` | `boolean` | `true` | Fill face |
| `outline` | `boolean` | `false` | Outline |
| `outlineColor` | `DColor` | — | Outline color |
| `outlineWidth` | `number` | `1` | Outline width (pixels) |
| `show` | `boolean` | `true` | Visibility |
| `position` | `Cartesian3` | — | Relative entity local offset |

## EllipsoidFeature

Triaxial ellipsoid, with `dimensions` corresponding to the diameters in the X / Y / Z directions. Supports texture mapping and lighting control.

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

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `dimensions` | `Cartesian3` | `(100, 100, 100)` | X / Y / Z axis diameters (meters) |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.6)` | Material (supports color/texture/DMaterial) |
| `outline` | `boolean` | `true` | Outline (triaxial ellipse ring) |
| `outlineColor` | `DColor` | `Color.BLACK` | Outline color |
| `outlineWidth` | `number` | `1` | Outline width (pixels) |
| `lighting` | `boolean` | `true` | Lighting (affects light/dark sides) |
| `stOffset` | `Cartesian2` | `(0, 0)` | Texture coordinate offset |
| `show` | `boolean` | `true` | Visibility |
| `shadows` | `ShadowMode` | `DISABLED` | Shadow mode |

## SphereFeature

Sphere, internally reuses `EllipsoidFeature`. All `EllipsoidFeature` parameters can be passed through.

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

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `radius` | `number` | `100` | Sphere radius (meters) |
| `material` | `DMaterial` | — | Material (pass-through to EllipsoidFeature) |
| `outline` | `boolean` | — | Outline |
| `outlineColor` | `DColor` | — | Outline color |
| `outlineWidth` | `number` | — | Outline width |

> **Tip**: Since `SphereFeature` inherits from `Omit<EllipsoidOptions, "dimensions">`, all EllipsoidFeature parameters (`lighting`, `stOffset`, `shadows`, etc.) can be passed directly.

## EllipticalConeFeature

Elliptical cone/frustum, with cross-section shape defined by top and bottom ellipse semi-axes. Commonly used for sensor beam coverage cones.

**`emitDirection` controls the central axis direction**: The cone's Z axis (height direction) is aligned to the specified direction via `emitDirection`. The X / Y semi-axes are always perpendicular to the plane of the emission direction, extending along the ellipse's major and minor axes respectively.

- `TO_UP`: Cone extends along +Z (away from the surface), Entity at the wide base end
- `TO_GROUND`: Cone extends along -Z (toward the surface), apex at the Entity position
- `CENTER`: Cone center coincides with the Entity

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

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `topSemiMajorAxis` | `number` | `1` | Top ellipse semi-major axis (meters) |
| `topSemiMinorAxis` | `number` | `1` | Top ellipse semi-minor axis (meters) |
| `bottomSemiMajorAxis` | `number` | `100` | Bottom ellipse semi-major axis (meters) |
| `bottomSemiMinorAxis` | `number` | `50` | Bottom ellipse semi-minor axis (meters) |
| `height` | `number` | `100` | Cone height (meters) |
| `slices` | `number` | `64` | Ellipse slice count |
| `capTop` | `boolean` | `true` | Cap top (top surface coverage) |
| `capBottom` | `boolean` | `true` | Cap bottom (bottom surface coverage) |
| `emitDirection` | `EmitDirection` | `TO_UP` | Emit direction, determines central axis orientation |
| `autoLength` | `boolean` | `false` | Auto height |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.5)` | Material |
| `fill` | `boolean` | `true` | Fill face |
| `outline` | `boolean` | `false` | Outline |
| `outlineColor` | `DColor` | — | Outline color |
| `outlineWidth` | `number` | `1` | Outline width (pixels) |
| `show` | `boolean` | `true` | Visibility |
| `position` | `Cartesian3` | — | Relative entity local offset |

### emitDirection Rotation Reference

| Mode | Rotation Pivot | Use Case |
|------|---------------|----------|
| `TO_GROUND` | Entity position as apex, cone extends toward Earth | Satellite ground sensor |
| `CENTER` | Cone center coincides with Entity | Centered cone |
| `TO_UP` | Entity position as base point, cone extends upward | Ground-to-air sensor |

> X / Y semi-axes are always perpendicular to the emit direction. For example, with `TO_GROUND`, the ellipse cross-section is in the plane perpendicular to the "toward Earth center" direction.

---

> **Related API**: [BoxFeature](/en/api/classes/BoxFeature) · [CubeFeature](/en/api/classes/CubeFeature) · [CylinderFeature](/en/api/classes/CylinderFeature) · [EllipsoidFeature](/en/api/classes/EllipsoidFeature) · [SphereFeature](/en/api/classes/SphereFeature) · [EllipticalConeFeature](/en/api/classes/EllipticalConeFeature)
