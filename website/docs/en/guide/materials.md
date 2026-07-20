# Material System

`MaterialFactory` provides a unified material factory, encapsulating 40+ built-in materials and custom effect materials. All materials are created via factory methods, returning `DaisyMaterialDescriptor` that can be passed to any Feature's `material` parameter.

## Surface Materials

Applicable to surface Features (Ellipse, Polygon, Rectangle, etc.) and solid geometry. All methods are called statically through `MaterialFactory`.

### Solid / Color

The most basic solid color material, also the most stable default material for points, surfaces, and solid geometry.

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")

Daisy.MaterialFactory.Solid({ color: "#38bdf8", alpha: 0.74 })
// 简写
Daisy.MaterialFactory.Color(Daisy.Color.RED.withAlpha(0.5))
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | `DColor` | `WHITE` | Color |
| `alpha` | `number` | `1` | Alpha (0–1) |

### Image

Image texture material, suitable for surfaces and solids with texture coordinates.

```typescript
Daisy.MaterialFactory.Image("/assets/texture.png")
// 或通过 Builtin
Daisy.MaterialFactory.Builtin("image", { image: canvasElement, repeat: 3 })
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `image` | `string` \| `HTMLCanvasElement` \| `HTMLImageElement` | — | Texture source |
| `repeat` | `number` \| `Cartesian2` | 1 | Texture repeat count |

### Grid

Regular grid material, suitable for grid surfaces, area boundaries, and body surface guide lines.

```typescript
Daisy.MaterialFactory.Grid({
    color: Daisy.Color.WHITE,
    cellAlpha: 0.2,
    lineCount: new Daisy.Cartesian2(8, 8),
    lineThickness: new Daisy.Cartesian2(1, 1),
})
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | `DColor` | `WHITE` | Grid line color |
| `cellAlpha` | `number` | `0.1` | Cell fill transparency |
| `lineCount` | `Cartesian2` | `(8, 8)` | Row/column grid line count |
| `lineThickness` | `Cartesian2` | `(1, 1)` | Row/column line width |
| `lineOffset` | `Cartesian2` | `(0, 0)` | Grid line offset |

### Checkerboard

Checkerboard material, suitable for texture coordinate debugging and regular filling.

```typescript
Daisy.MaterialFactory.Checkerboard({
    lightColor: Daisy.Color.WHITE,
    darkColor: Daisy.Color.fromCssColorString("#2563eb"),
    repeat: new Daisy.Cartesian2(4, 4),
})
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `lightColor` | `DColor` | `WHITE` | Light square color |
| `darkColor` | `DColor` | `DARKGRAY` | Dark square color |
| `repeat` | `Cartesian2` | `(2, 2)` | Row/column repeat count |

### Stripe

Stripe material, suitable for directional textures and scan bases.

```typescript
Daisy.MaterialFactory.Stripe({
    evenColor: Daisy.Color.fromCssColorString("#fb7185"),
    oddColor: Daisy.Color.fromCssColorString("#1f2937"),
    repeat: 10,
    orientation: Daisy.StripeOrientation.HORIZONTAL,
})
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `evenColor` | `DColor` | `CYAN` | Even stripe color |
| `oddColor` | `DColor` | `BLACK` | Odd stripe color |
| `repeat` | `number` | 1 | Repeat count |
| `offset` | `number` | 0 | Stripe offset |
| `orientation` | `StripeOrientation` | `HORIZONTAL` | Direction: `HORIZONTAL` / `VERTICAL` |

### Dot

Dot matrix material, suitable for discrete sampling, masking, and low-density filling.

```typescript
Daisy.MaterialFactory.Dot({
    lightColor: Daisy.Color.fromCssColorString("#fef08a"),
    darkColor: Daisy.Color.fromCssColorString("#0f172a"),
    repeat: 10,
})
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `lightColor` | `DColor` | `WHITE` | Dot color |
| `darkColor` | `DColor` | `BLACK` | Background color |
| `repeat` | `Cartesian2` | `(1, 1)` | Row/column repeat count |

## Polyline Materials

Applicable to `PolylineFeature`. Created via `MaterialFactory.Builtin(type, options)` or dedicated shortcut methods.

### PolylineGlow

```typescript
Daisy.MaterialFactory.PolylineGlow({ color: Daisy.Color.CYAN, glowPower: 0.25 })
// 等效于
Daisy.MaterialFactory.Builtin("polylineGlow", { color: "#22d3ee", glowPower: 0.22 })
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | `DColor` | `WHITE` | Main line color |
| `glowPower` | `number` | `0.25` | Glow intensity (0–1) |
| `taperPower` | `number` | `1.0` | Taper power |

### PolylineDash

```typescript
Daisy.MaterialFactory.PolylineDash({ color: Daisy.Color.RED, dashLength: 16 })
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | `DColor` | `WHITE` | Dash color |
| `gapColor` | `DColor` | `TRANSPARENT` | Gap color |
| `dashLength` | `number` | 16 | Dash length (pixels) |
| `dashPattern` | `number` | `255` | Dash pattern bitmask |
| `speed` | `number` | 0 | Flow speed (>0 enables dynamic effect, unit px/s) |
| `flowColor` | `DColor` | — | Flow color (only effective in dynamic mode) |

### PolylineArrow

Single arrow flowing along the polyline, suitable for direction indication.

```typescript
Daisy.MaterialFactory.PolylineArrow({ color: "#34d399", speed: 1.5, arrowSize: 24 })
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | `DColor` | `WHITE` | Arrow color |
| `speed` | `number` | 1.2 | Flow speed |
| `direction` | `"forward"` \| `"backward"` \| `"both"` | `"forward"` | Flow direction |
| `arrowSize` | `number` | 15 | Arrow texture size (pixels) |

### PolylineArrowPath

Repeating arrows flowing along the line, suitable for path planning/route lines.

```typescript
Daisy.MaterialFactory.PolylineArrowPath({ color: Daisy.Color.ORANGE, speed: 3.0 })
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | `DColor` | `YELLOW` | Arrow color |
| `speed` | `number` | 3.0 | Flow speed |
| `arrowSize` | `number` | 15 | Arrow size (percentage of spacing) |
| `spacing` | `number` | 0.2 | Arrow spacing |
| `direction` | `"forward"` \| `"backward"` | `"forward"` | Direction |
| `glowColor` | `DColor` | — | Optional: enables internal glow effect on arrows |

## Custom Effect Materials

The SDK has 20+ built-in custom Shader materials (registered via `shaderManager.boot()`). Below are the complete parameter tables for the 5 core effect materials.

### SpiralFlow

Spiral axial flow, suitable for circular areas and energy diffusion surfaces.

```typescript
Daisy.MaterialFactory.SpiralFlow({
    color: "#155e75",
    spiralColor: "#facc15",
    speed: 1.2,
    count: 7,
    thickness: 0.28,
    opacity: 0.72,
    direction: "forward",  // 或 "backward"
})
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | `DColor` | Blue `(30,144,255)` | Main color |
| `spiralColor` | `DColor` | `YELLOW` | Spiral line color |
| `speed` | `number` | `1.0` | Scroll speed (≥0.1) |
| `count` | `number` | `6.0` | Layer count, range `[1, 20]` |
| `thickness` | `number` | `0.35` | Band width, range `[0.05, 0.95]` |
| `opacity` | `number` | `1.0` | Alpha (0–1) |
| `direction` | `"forward" \| "backward"` | `"forward"` | Flow direction |

### DownEmitDiffuse

Energy surface diffusing downward from center, suitable for projection-style area representation.

```typescript
Daisy.MaterialFactory.DownEmitDiffuse({
    color: "#166534",
    bottomColor: "#22c55e",
    speed: 0.8,
    diffusionRadius: 0.46,
    diffusionWidth: 0.08,
    opacity: 0.66,
})
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | `DColor` | `GREEN` | Main color |
| `bottomColor` | `DColor` | Bright green `(0,255,128)` | Bottom diffusion color |
| `speed` | `number` | `1.0` | Animation speed (≥0.1) |
| `diffusionRadius` | `number` | `0.45` | Diffusion radius (0.05–1.0) |
| `diffusionWidth` | `number` | `0.06` | Diffusion band width (0.01–0.5) |
| `opacity` | `number` | `1.0` | Alpha (0–1) |

### NeonScan

Neon diagonal scan, suitable for radar sweeps and state highlight surfaces.

```typescript
Daisy.MaterialFactory.NeonScan({
    baseColor: "#164e63",
    neonColor: "#7dd3fc",
    speed: 1.0,
    bandWidth: 0.18,
    glowSize: 0.42,
    opacity: 0.78,
})
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `baseColor` | `DColor` | `PURPLE` | Base color |
| `neonColor` | `DColor` | `CYAN` | Neon scan band color |
| `speed` | `number` | `1.5` | Scan speed (≥0.1) |
| `bandWidth` | `number` | `0.15` | Scan band width (0.01–0.5) |
| `glowSize` | `number` | `0.35` | Glow diffusion radius (0.05–0.95) |
| `opacity` | `number` | `1.0` | Alpha (0–1) |

### RadialPulse

Center radial pulse, suitable for alarm ranges and propagation effects.

```typescript
Daisy.MaterialFactory.RadialPulse({
    color: "#0f766e",
    pulseColor: "#f8fafc",
    speed: 1.0,
    ringWidth: 0.09,
    opacity: 0.7,
    center: new Daisy.Cartesian2(0.5, 0.5),
})
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | `DColor` | `CYAN` | Base color |
| `pulseColor` | `DColor` | `WHITE` | Pulse ring color |
| `speed` | `number` | `1.0` | Pulse speed (≥0.1) |
| `ringWidth` | `number` | `0.08` | Pulse ring width (0.01–0.5) |
| `center` | `Cartesian2` | `(0.5, 0.5)` | Pulse center (UV coordinates) |
| `opacity` | `number` | `1.0` | Alpha (0–1) |

### RingSweep

Angular ring sweep, suitable for disc-shaped scanning beams.

```typescript
Daisy.MaterialFactory.RingSweep({
    color: "#312e81",
    sweepColor: "#fb923c",
    speed: 1.0,
    width: 0.16,
    opacity: 0.72,
})
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `color` | `DColor` | `BLUE` | Base color |
| `sweepColor` | `DColor` | `ORANGE` | Sweep beam color |
| `speed` | `number` | `1.0` | Scan speed (≥0.1) |
| `width` | `number` | `0.12` | Beam width (0.01–0.5) |
| `opacity` | `number` | `1.0` | Alpha (0–1) |

## Daisy Advanced Shader Materials

Below are 17 `Daisy*` series advanced materials, all callable via `MaterialFactory.*` shortcut methods.

| Method | Effect | Description |
|--------|--------|-------------|
| `DaisyNoiseField` | fbm noise field | Suitable for clouds, energy surfaces, and body surface perturbations, `colorA` / `colorB` / `scale` / `speed` / `contrast` |
| `DaisyGridGlow` | Glowing grid | Pulsing grid lines, `baseColor` / `lineColor` / `cellCount` / `lineWidth` / `speed` |
| `DaisyContourBands` | Contour banding | Height/intensity/graded areas, `lowColor` / `highColor` / `bandCount` / `slope` |
| `DaisyCellular` | Cellular boundary texture | Suitable for partitioned areas and non-uniform boundaries, `baseColor` / `edgeColor` / `cellCount` |
| `DaisyHeatmap` | Radial heatmap | Suitable for intensity centers and risk distribution, `coldColor` / `midColor` / `hotColor` / `radius` |
| `DaisyScanline` | Scan line flicker | Suitable for screen, radar, and panel-style materials, `baseColor` / `scanColor` / `density` / `thickness` |
| `DaisyTurbulence` | Turbulence noise | Suitable for unstable clouds and fluid-like surfaces, `colorA` / `colorB` / `scale` / `intensity` |
| `DaisyMarble` | Noise-distorted marbling | Suitable for geological, energy cloud, and decorative body surfaces, `baseColor` / `veinColor` / `frequency` / `warp` |
| `DaisySdfRings` | SDF concentric rings | Suitable for precise pulses, targets, and ripples, `ringColor` / `count` / `width` |
| `DaisyHalftone` | Halftone dots | Suitable for density expression and graphic masking, `paperColor` / `inkColor` / `density` |
| `DaisyWarpedStripes` | Domain-warped stripes | Suitable for flow direction, wind fields, and irregular bands, `colorA` / `colorB` / `frequency` / `warpStrength` |
| `DaisyAurora` | Aurora curtain | Suitable for vertical flow and energy curtains, `lowColor` / `highColor` / `waviness` |
| `DaisyCircuit` | Circuit line pulse | Suitable for data links and tech body surfaces, `traceColor` / `cells` |
| `DaisyTopoRipple` | Contour radar wave | Suitable for terrain-like scanning and hot zone propagation, `lineColor` / `bands` / `rippleCount` |
| `DaisyMatrixRain` | Matrix rain | Suitable for data streams and matrix-style information surfaces, `rainColor` / `columns` / `rows` |
| `DaisyDitherFade` | Bayer dither fade | Suitable for low-cost transparent transitions and scan masks, `colorA` / `colorB` / `radial` |
| `DaisyAdvancedWater` | Advanced water surface | 5-layer waves, cross normals, Fresnel effect, Blinn-Phong specular, `baseColor` / `surfaceColor` / `waveSpeed` / `waveFrequency` |

Usage examples:

```typescript
// 噪声场
Daisy.MaterialFactory.DaisyNoiseField({ colorA: "#06b6d4", colorB: "#84cc16", scale: 8, contrast: 0.42 })

// 发光网格
Daisy.MaterialFactory.DaisyGridGlow({ baseColor: "#020617", lineColor: "#38bdf8", cellCount: { x: 9, y: 7 } })

// 热力图
Daisy.MaterialFactory.DaisyHeatmap({ coldColor: "#2563eb", midColor: "#22c55e", hotColor: "#f97316", radius: 0.72 })

// 高级水面
Daisy.MaterialFactory.DaisyAdvancedWater({ baseColor: "#001432", surfaceColor: "#006496", waveSpeed: 0.8, waveFrequency: 12.0 })
```

## Bonus Texture Materials (Builtin)

In addition to surface materials, `MaterialFactory.Builtin()` also supports the following standard texture material types, called via `Builtin(type, options)`:

| type | Description | Key Parameters |
|------|-------------|----------------|
| `"diffuseMap"` | Diffuse map | `image`, `repeat` |
| `"alphaMap"` | Alpha mask map | `image`, `repeat` |
| `"specularMap"` | Specular intensity map | `image`, `repeat` |
| `"emissionMap"` | Emission map | `image`, `repeat` |
| `"bumpMap"` | Bump perturbation map | `image`, `repeat`, `strength` |
| `"normalMap"` | Normal map | `image`, `repeat`, `strength` |
| `"water"` | Water normal animation | `normalMap`, `frequency`, `animationSpeed`, `amplitude` |
| `"rimLighting"` | Rim lighting material | `color`, `rimColor`, `width` |
| `"fade"` | Directional fade | `fadeInColor`, `fadeOutColor`, `maximumDistance`, `fadeDirection` |
| `"elevationContour"` | Terrain contour lines | `contourColor`, `spacing`, `width` |
| `"elevationRamp"` | Terrain height gradient | `image`, `minimumHeight`, `maximumHeight` |
| `"slopeRamp"` | Terrain slope gradient | `image` |
| `"aspectRamp"` | Terrain aspect gradient | `image` |
| `"elevationBand"` | Terrain height banding | `heights`, `colors` |
| `"waterMask"` | Surface water/land mask | `waterColor`, `landColor` |

## Carrier Type Compatibility

Different materials are applicable to different Feature carrier types:

| Carrier | Feature Type | Available Materials |
|---------|-------------|-------------------|
| `point` | `PointFeature` | Only `Solid / Color` (PointFeature uses `color` parameter, doesn't accept `material`) |
| `line` | `PolylineFeature` | `PolylineGlow`, `PolylineDash`, `PolylineArrow`, `PolylineArrowPath`, `PolylineOutline` |
| `surface` | `EllipseFeature`, `PolygonFeature`, `RectangleFeature` etc. | All surface materials, custom effect materials, Daisy advanced materials |
| `solid` | `CylinderFeature`, `BoxFeature`, `EllipsoidFeature`, `SphereFeature` | All surface materials, Daisy advanced materials (except `AdvancedWater`) |
| `terrain` | Earth surface / Globe | `ElevationContour`, `ElevationRamp`, `SlopeRamp`, `AspectRamp`, `ElevationBand`, `WaterMask` |

### Material Mounting Examples

```typescript
const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
```

```typescript
// 面要素：挂载螺旋流动材质
entity.addFeature(new Daisy.PolygonFeature({
    hierarchy: positions,
    material: Daisy.MaterialFactory.SpiralFlow({ color: "#155e75", spiralColor: "#facc15", speed: 1.2 }),
}))

// 线要素：挂载流动箭头
entity.addFeature(new Daisy.PolylineFeature({
    pathway: linePositions,
    width: 4,
    material: Daisy.MaterialFactory.PolylineArrow({ color: "#34d399", speed: 1.5 }),
}))

// 点要素：仅支持颜色
entity.addFeature(new Daisy.PointFeature({
    sizePx: 12,
    color: Daisy.Color.RED,
}))
```

> **Related API**: [MaterialFactory](/en/api/classes/MaterialFactory) · [SpiralFlowMaterial](/en/api/classes/SpiralFlowMaterial) · [DownEmitDiffuseMaterial](/en/api/classes/DownEmitDiffuseMaterial) · [NeonScanMaterial](/en/api/classes/NeonScanMaterial) · [RadialPulseMaterial](/en/api/classes/RadialPulseMaterial) · [RingSweepMaterial](/en/api/classes/RingSweepMaterial)

---

<!--
示例参考: [Material demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/materials)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
