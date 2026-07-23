# Solid Geometry

Solid geometry Features render closed 3D shapes such as boxes, cubes, cylinders, ellipsoids, spheres, and elliptical cones. All solid geometry uses the Entity position as its origin and supports common options such as materials, outlines, and shadows.

## Choosing a Feature

| Requirement | Feature | Description |
|------|---------|------|
| Box with independent dimensions on all three axes | `BoxFeature` | `dimensions: Cartesian3` |
| Cube or frustum with variable cross-sections | `CubeFeature` | Independent top/bottom width and length, `emitDirection` |
| Cylinder or truncated cylinder | `CylinderFeature` | Top and bottom radii can differ |
| Three-axis ellipsoid | `EllipsoidFeature` | `dimensions: Cartesian3`, supports textures |
| Sphere | `SphereFeature` | `radius`, internally reuses EllipsoidFeature |
| Elliptical cone or truncated cone (sensor cone) | `EllipticalConeFeature` | Top/bottom elliptical semi-axes, `emitDirection` |

## BoxFeature

Create a box by specifying the edge lengths along the X, Y, and Z axes with `dimensions`.

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
|------|------|--------|------|
| `dimensions` | `Cartesian3` | `(100, 100, 100)` | X, Y, and Z edge lengths in meters |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.6)` | Material |
| `outline` | `boolean` | `true` | Outline |
| `outlineColor` | `DColor` | `Color.BLACK` | Outline color |
| `outlineWidth` | `number` | `1` | Outline width in pixels |
| `show` | `boolean` | `true` | Visibility |
| `shadows` | `ShadowMode` | `DISABLED` | Shadow mode |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | `undefined` | Distance display condition |

## CubeFeature

Create a frustum or cube with independent top and bottom widths and lengths. Use `emitDirection` to control the alignment reference.

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
|------|------|--------|------|
| `bottomX` | `number` | `100` | Bottom width in meters |
| `bottomY` | `number` | `100` | Bottom length in meters |
| `topX` | `number` | `100` | Top width in meters |
| `topY` | `number` | `100` | Top length in meters |
| `height` | `number` | `100` | Height in meters |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.5)` | Material |
| `emitDirection` | `EmitDirection` | `TO_UP` | Emission direction and alignment reference |
| `autoLength` | `boolean` | `false` | Automatic height from surface/ray intersections |
| `fill` | `boolean` | `true` | Fill faces |
| `outline` | `boolean` | `false` | Outline |
| `outlineColor` | `DColor` | — | Outline color |
| `outlineWidth` | `number` | `1` | Outline width in pixels |
| `show` | `boolean` | `true` | Visibility |
| `position` | `Cartesian3` | — | Local offset relative to the Entity |

## CylinderFeature

A cylinder or truncated cylinder with independently configurable top and bottom radii. Its height axis is Z, transformed by `emitDirection` for alignment.

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
|------|------|--------|------|
| `height` | `number` | `200000` | Height in meters |
| `topRadius` | `number` | `100` | Top radius in meters |
| `bottomRadius` | `number` | `100` | Bottom radius in meters |
| `slices` | `number` | `64` | Number of slices; larger values are smoother |
| `capTop` | `boolean` | `true` | Cap the top |
| `capBottom` | `boolean` | `true` | Cap the bottom |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.5)` | Material |
| `emitDirection` | `EmitDirection` | `TO_UP` | Emission direction |
| `autoLength` | `boolean` | `false` | Automatic height |
| `fill` | `boolean` | `true` | Fill faces |
| `outline` | `boolean` | `false` | Outline |
| `outlineColor` | `DColor` | — | Outline color |
| `outlineWidth` | `number` | `1` | Outline width in pixels |
| `show` | `boolean` | `true` | Visibility |
| `position` | `Cartesian3` | — | Local offset relative to the Entity |

## EllipsoidFeature

A three-axis ellipsoid where `dimensions` specifies the diameters along X, Y, and Z. Supports texture mapping and lighting controls.

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
|------|------|--------|------|
| `dimensions` | `Cartesian3` | `(100, 100, 100)` | X, Y, and Z diameters in meters |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.6)` | Material; supports colors, textures, and DMaterial |
| `outline` | `boolean` | `true` | Three-axis elliptical outline |
| `outlineColor` | `DColor` | `Color.BLACK` | Outline color |
| `outlineWidth` | `number` | `1` | Outline width in pixels |
| `lighting` | `boolean` | `true` | Lighting, affecting shaded faces |
| `stOffset` | `Cartesian2` | `(0, 0)` | Texture-coordinate offset |
| `show` | `boolean` | `true` | Visibility |
| `shadows` | `ShadowMode` | `DISABLED` | Shadow mode |

## SphereFeature

A sphere that internally reuses `EllipsoidFeature`. All `EllipsoidFeature` parameters can be passed through.

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
|------|------|--------|------|
| `radius` | `number` | `100` | Sphere radius in meters |
| `material` | `DMaterial` | — | Material, passed through to EllipsoidFeature |
| `outline` | `boolean` | — | Outline |
| `outlineColor` | `DColor` | — | Outline color |
| `outlineWidth` | `number` | — | Outline width |

> **Tip**: Because `SphereFeature` extends `Omit<EllipsoidOptions, "dimensions">`, all EllipsoidFeature parameters (`lighting`, `stOffset`, `shadows`, and others) can be passed directly.

## EllipticalConeFeature

An elliptical cone or truncated cone whose cross-section is defined by the top and bottom elliptical semi-axes. It is commonly used to represent sensor coverage cones.

**`emitDirection` controls the central-axis direction**: the cone's Z axis (height direction) is aligned to the specified direction by `emitDirection`. The X and Y semi-axes remain perpendicular to the plane containing the emission direction and expand along the ellipse's major and minor axes.

- `TO_UP`: The cone extends along +Z (away from the surface), with the Entity at the wide base.
- `TO_GROUND`: The cone extends along -Z (toward the surface), with the apex at the Entity position.
- `CENTER`: The cone center coincides with the Entity.

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
|------|------|--------|------|
| `topSemiMajorAxis` | `number` | `1` | Top elliptical semi-major axis in meters |
| `topSemiMinorAxis` | `number` | `1` | Top elliptical semi-minor axis in meters |
| `bottomSemiMajorAxis` | `number` | `100` | Bottom elliptical semi-major axis in meters |
| `bottomSemiMinorAxis` | `number` | `50` | Bottom elliptical semi-minor axis in meters |
| `height` | `number` | `100` | Cone height in meters |
| `slices` | `number` | `64` | Number of elliptical slices |
| `capTop` | `boolean` | `true` | Cap the top |
| `capBottom` | `boolean` | `true` | Cap the bottom |
| `emitDirection` | `EmitDirection` | `TO_UP` | Emission direction that determines the central axis |
| `autoLength` | `boolean` | `false` | Automatic height |
| `material` | `DMaterial` | `Color.BLUE.withAlpha(0.5)` | Material |
| `fill` | `boolean` | `true` | Fill faces |
| `outline` | `boolean` | `false` | Outline |
| `outlineColor` | `DColor` | — | Outline color |
| `outlineWidth` | `number` | `1` | Outline width in pixels |
| `show` | `boolean` | `true` | Visibility |
| `position` | `Cartesian3` | — | Local offset relative to the Entity |

### emitDirection Rotation Reference

| Mode | Rotation reference | Use case |
|------|-----------|----------|
| `TO_GROUND` | Entity position is the apex; cone extends toward Earth | Satellite-to-ground sensor |
| `CENTER` | Cone center coincides with the Entity | Centered cone |
| `TO_UP` | Entity position is the base; cone extends upward | Ground-to-air sensor |

> The X and Y semi-axes are always perpendicular to the emission direction. For example, with `TO_GROUND`, the elliptical cross-section expands in the plane perpendicular to the direction toward the center of the Earth.

---

> **Related APIs**: [BoxFeature](/en/api/classes/BoxFeature) · [CubeFeature](/en/api/classes/CubeFeature) · [CylinderFeature](/en/api/classes/CylinderFeature) · [EllipsoidFeature](/en/api/classes/EllipsoidFeature) · [SphereFeature](/en/api/classes/SphereFeature) · [EllipticalConeFeature](/en/api/classes/EllipticalConeFeature)
