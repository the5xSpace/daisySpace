# Material System

`MaterialFactory` provides a unified material factory with more than 40 built-in and custom effect materials. All materials are created through factory methods, return a `DaisyMaterialDescriptor`, and can be passed to the `material` option of any Feature.

## Surface Materials

These materials are suitable for surface Features such as Ellipse, Polygon, and Rectangle, as well as solid geometry. All methods are called statically through `MaterialFactory`.

### Solid / Color

The most basic solid-color material and the most stable default for points, surfaces, and solid geometry.

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")

Daisy.MaterialFactory.Solid({ color: "#38bdf8", alpha: 0.74 })
// 简写
Daisy.MaterialFactory.Color(Daisy.Color.RED.withAlpha(0.5))
```

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `color` | `DColor` | `WHITE` | Color |
| `alpha` | `number` | `1` | Opacity (0–1) |

### Image

Image-texture material for surfaces and solid geometry with texture coordinates.

```typescript
Daisy.MaterialFactory.Image("/assets/texture.png")
// 或通过 Builtin
Daisy.MaterialFactory.Builtin("image", { image: canvasElement, repeat: 3 })
```

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `image` | `string` \| `HTMLCanvasElement` \| `HTMLImageElement` | — | Texture source |
| `repeat` | `number` \| `Cartesian2` | 1 | Texture repeat count |

### Grid

Regular grid material for grid surfaces, region boundaries, and auxiliary lines on solid bodies.

```typescript
Daisy.MaterialFactory.Grid({
    color: Daisy.Color.WHITE,
    cellAlpha: 0.2,
    lineCount: new Daisy.Cartesian2(8, 8),
    lineThickness: new Daisy.Cartesian2(1, 1),
})
```

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `color` | `DColor` | `WHITE` | Grid-line color |
| `cellAlpha` | `number` | `0.1` | Cell fill opacity |
| `lineCount` | `Cartesian2` | `(8, 8)` | Number of grid lines by row and column |
| `lineThickness` | `Cartesian2` | `(1, 1)` | Row and column line width |
| `lineOffset` | `Cartesian2` | `(0, 0)` | Grid-line offset |

### Checkerboard

Checkerboard material for texture-coordinate debugging and regular fills.

```typescript
Daisy.MaterialFactory.Checkerboard({
    lightColor: Daisy.Color.WHITE,
    darkColor: Daisy.Color.fromCssColorString("#2563eb"),
    repeat: new Daisy.Cartesian2(4, 4),
})
```

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `lightColor` | `DColor` | `WHITE` | Light-cell color |
| `darkColor` | `DColor` | `DARKGRAY` | Dark-cell color |
| `repeat` | `Cartesian2` | `(2, 2)` | Row and column repeat count |

### Stripe

Stripe material for directional textures and scanning bases.

```typescript
Daisy.MaterialFactory.Stripe({
    evenColor: Daisy.Color.fromCssColorString("#fb7185"),
    oddColor: Daisy.Color.fromCssColorString("#1f2937"),
    repeat: 10,
    orientation: Daisy.StripeOrientation.HORIZONTAL,
})
```

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `evenColor` | `DColor` | `CYAN` | Even-stripe color |
| `oddColor` | `DColor` | `BLACK` | Odd-stripe color |
| `repeat` | `number` | 1 | Repeat count |
| `offset` | `number` | 0 | Stripe offset |
| `orientation` | `StripeOrientation` | `HORIZONTAL` | Direction: `HORIZONTAL` / `VERTICAL` |

### Dot

Dot-pattern material for discrete sampling, masks, and low-density fills.

```typescript
Daisy.MaterialFactory.Dot({
    lightColor: Daisy.Color.fromCssColorString("#fef08a"),
    darkColor: Daisy.Color.fromCssColorString("#0f172a"),
    repeat: 10,
})
```

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `lightColor` | `DColor` | `WHITE` | Dot color |
| `darkColor` | `DColor` | `BLACK` | Background color |
| `repeat` | `Cartesian2` | `(1, 1)` | Row and column repeat count |

## Line Materials (Polyline)

These materials are used with `PolylineFeature`. Create them through `MaterialFactory.Builtin(type, options)` or dedicated convenience methods.

### PolylineGlow

```typescript
Daisy.MaterialFactory.PolylineGlow({ color: Daisy.Color.CYAN, glowPower: 0.25 })
// 等效于
Daisy.MaterialFactory.Builtin("polylineGlow", { color: "#22d3ee", glowPower: 0.22 })
```

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `color` | `DColor` | `WHITE` | Main-line color |
| `glowPower` | `number` | `0.25` | Glow intensity (0–1) |
| `taperPower` | `number` | `1.0` | Taper falloff |

### PolylineDash

```typescript
Daisy.MaterialFactory.PolylineDash({ color: Daisy.Color.RED, dashLength: 16 })
```

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `color` | `DColor` | `WHITE` | Dash color |
| `gapColor` | `DColor` | `TRANSPARENT` | Gap color |
| `dashLength` | `number` | 16 | Dash length in pixels |
| `dashPattern` | `number` | `255` | Dash-style bitmask |
| `speed` | `number` | 0 | Flow speed; values >0 enable animation, in px/s |
| `flowColor` | `DColor` | — | Flow color, used only in animated mode |

### PolylineArrow

Single arrows flow along the polyline, suitable for direction indicators.

```typescript
Daisy.MaterialFactory.PolylineArrow({ color: "#34d399", speed: 1.5, arrowSize: 24 })
```

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `color` | `DColor` | `WHITE` | Arrow color |
| `speed` | `number` | 1.2 | Flow speed |
| `direction` | `"forward"` \| `"backward"` \| `"both"` | `"forward"` | Flow direction |
| `arrowSize` | `number` | 15 | Arrow texture size in pixels |

### PolylineArrowPath

Repeated arrows flow along the line, suitable for route planning and travel paths.

```typescript
Daisy.MaterialFactory.PolylineArrowPath({ color: Daisy.Color.ORANGE, speed: 3.0 })
```

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `color` | `DColor` | `YELLOW` | Arrow color |
| `speed` | `number` | 3.0 | Flow speed |
| `arrowSize` | `number` | 15 | Arrow size as a percentage of spacing |
| `spacing` | `number` | 0.2 | Arrow spacing |
| `direction` | `"forward"` \| `"backward"` | `"forward"` | Direction |
| `glowColor` | `DColor` | — | Optional internal flowing-glow effect |

## Custom Effect Materials

Sdk includes more than 20 custom Shader materials, registered through `shaderManager.boot()`. The following sections list the complete options for five core effect materials.

### SpiralFlow

Axial spiral flow, suitable for circular regions and energy-diffusion surfaces.

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
|------|------|--------|------|
| `color` | `DColor` | Blue `(30,144,255)` | Main color |
| `spiralColor` | `DColor` | `YELLOW` | Spiral-line color |
| `speed` | `number` | `1.0` | Scroll speed (≥0.1) |
| `count` | `number` | `6.0` | Layer count, range `[1, 20]` |
| `thickness` | `number` | `0.35` | Band width, range `[0.05, 0.95]` |
| `opacity` | `number` | `1.0` | Opacity (0–1) |
| `direction` | `"forward" \| "backward"` | `"forward"` | Flow direction |

### DownEmitDiffuse

An energy surface that diffuses downward from the center, suitable for projection-style regions.

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
|------|------|--------|------|
| `color` | `DColor` | `GREEN` | Main color |
| `bottomColor` | `DColor` | Bright green `(0,255,128)` | Bottom diffusion color |
| `speed` | `number` | `1.0` | Animation speed (≥0.1) |
| `diffusionRadius` | `number` | `0.45` | Diffusion radius (0.05–1.0) |
| `diffusionWidth` | `number` | `0.06` | Diffusion-band width (0.01–0.5) |
| `opacity` | `number` | `1.0` | Opacity (0–1) |

### NeonScan

Diagonal neon scanning, suitable for radar sweeps and highlighted status surfaces.

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
|------|------|--------|------|
| `baseColor` | `DColor` | `PURPLE` | Base color |
| `neonColor` | `DColor` | `CYAN` | Neon scan-band color |
| `speed` | `number` | `1.5` | Scan speed (≥0.1) |
| `bandWidth` | `number` | `0.15` | Scan-band width (0.01–0.5) |
| `glowSize` | `number` | `0.35` | Soft-glow diffusion radius (0.05–0.95) |
| `opacity` | `number` | `1.0` | Opacity (0–1) |

### RadialPulse

Central radial pulses, suitable for alert ranges and propagation effects.

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
|------|------|--------|------|
| `color` | `DColor` | `CYAN` | Base color |
| `pulseColor` | `DColor` | `WHITE` | Pulse-ring color |
| `speed` | `number` | `1.0` | Pulse speed (≥0.1) |
| `ringWidth` | `number` | `0.08` | Pulse-ring width (0.01–0.5) |
| `center` | `Cartesian2` | `(0.5, 0.5)` | Pulse center (UV coordinates) |
| `opacity` | `number` | `1.0` | Opacity (0–1) |

### RingSweep

Angular ring scanning, suitable for disk-shaped scanning beams.

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
|------|------|--------|------|
| `color` | `DColor` | `BLUE` | Base color |
| `sweepColor` | `DColor` | `ORANGE` | Sweep-beam color |
| `speed` | `number` | `1.0` | Scan speed (≥0.1) |
| `width` | `number` | `0.12` | Beam width (0.01–0.5) |
| `opacity` | `number` | `1.0` | Opacity (0–1) |

## Daisy Advanced Shader Materials

The following are 17 advanced materials in the `Daisy*` series, all called through `MaterialFactory.*` convenience methods.

| Method | Effect | Description |
|------|------|------|
| `DaisyNoiseField` | fbm noise field | Suitable for clouds, energy surfaces, and body-surface distortion, `colorA` / `colorB` / `scale` / `speed` / `contrast` |
| `DaisyGridGlow` | Glowing grid | Pulsing grid lines, `baseColor` / `lineColor` / `cellCount` / `lineWidth` / `speed` |
| `DaisyContourBands` | Contour bands | Height, intensity, and graded regions, `lowColor` / `highColor` / `bandCount` / `slope` |
| `DaisyCellular` | Cellular boundary texture | Suitable for tiled regions and irregular boundaries, `baseColor` / `edgeColor` / `cellCount` |
| `DaisyHeatmap` | Radial heatmap | Suitable for intensity centers and risk distributions, `coldColor` / `midColor` / `hotColor` / `radius` |
| `DaisyScanline` | Scanning-line flicker | Suitable for screens, radar, and panel-style materials, `baseColor` / `scanColor` / `density` / `thickness` |
| `DaisyTurbulence` | Turbulence noise | Suitable for unstable clouds and fluid-like surfaces, `colorA` / `colorB` / `scale` / `intensity` |
| `DaisyMarble` | Noise-distorted marble | Suitable for geology, energy clouds, and decorative surfaces, `baseColor` / `veinColor` / `frequency` / `warp` |
| `DaisySdfRings` | SDF concentric rings | Suitable for precise pulses, bullseyes, and ripples, `ringColor` / `count` / `width` |
| `DaisyHalftone` | Halftone dots | Suitable for density expression and graphic masks, `paperColor` / `inkColor` / `density` |
| `DaisyWarpedStripes` | Domain-warped stripes | Suitable for flow direction, wind fields, and irregular bands, `colorA` / `colorB` / `frequency` / `warpStrength` |
| `DaisyAurora` | Aurora curtain | Suitable for vertical flow and energy walls, `lowColor` / `highColor` / `waviness` |
| `DaisyCircuit` | Circuit-line pulse | Suitable for data links and technical surfaces, `traceColor` / `cells` |
| `DaisyTopoRipple` | Contour radar ripple | Suitable for terrain-like scanning and hot-zone propagation, `lineColor` / `bands` / `rippleCount` |
| `DaisyMatrixRain` | Matrix rain | Suitable for data streams and matrix-style information surfaces, `rainColor` / `columns` / `rows` |
| `DaisyDitherFade` | Bayer dither fade | Suitable for low-cost transparency transitions and scan masks, `colorA` / `colorB` / `radial` |
| `DaisyAdvancedWater` | Advanced stylized water | Five wave layers, cross normals, Fresnel effect, and Blinn-Phong highlights, `baseColor` / `surfaceColor` / `waveSpeed` / `waveFrequency` |

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

In addition to surface materials, `MaterialFactory.Builtin()` supports the following standard texture material types through `Builtin(type, options)`:

| type | Description | Key parameters |
|------|------|----------|
| `"diffuseMap"` | Diffuse texture map | `image`, `repeat` |
| `"alphaMap"` | Transparency mask texture | `image`, `repeat` |
| `"specularMap"` | Specular-intensity texture | `image`, `repeat` |
| `"emissionMap"` | Emission texture | `image`, `repeat` |
| `"bumpMap"` | Bump-distortion texture | `image`, `repeat`, `strength` |
| `"normalMap"` | Normal map | `image`, `repeat`, `strength` |
| `"water"` | Animated water normals | `normalMap`, `frequency`, `animationSpeed`, `amplitude` |
| `"rimLighting"` | Rim-light material | `color`, `rimColor`, `width` |
| `"fade"` | Directional fade | `fadeInColor`, `fadeOutColor`, `maximumDistance`, `fadeDirection` |
| `"elevationContour"` | Terrain contours | `contourColor`, `spacing`, `width` |
| `"elevationRamp"` | Terrain elevation gradient | `image`, `minimumHeight`, `maximumHeight` |
| `"slopeRamp"` | Terrain slope gradient | `image` |
| `"aspectRamp"` | Terrain aspect gradient | `image` |
| `"elevationBand"` | Terrain elevation bands | `heights`, `colors` |
| `"waterMask"` | Surface water-land mask | `waterColor`, `landColor` |

## Carrier Compatibility

Different materials are supported by different Feature carrier types:

| Carrier | Feature type | Available materials |
|------|-------------|---------|
| `point` | `PointFeature` | Only `Solid / Color` (PointFeature uses the `color` option and does not accept `material`) |
| `line` | `PolylineFeature` | `PolylineGlow`, `PolylineDash`, `PolylineArrow`, `PolylineArrowPath`, `PolylineOutline` |
| `surface` | `EllipseFeature`, `PolygonFeature`, `RectangleFeature`, and others | All surface, custom effect, and Daisy advanced materials |
| `solid` | `CylinderFeature`, `BoxFeature`, `EllipsoidFeature`, `SphereFeature` | All surface and Daisy advanced materials except `AdvancedWater` |
| `terrain` | Earth surface / Globe | `ElevationContour`, `ElevationRamp`, `SlopeRamp`, `AspectRamp`, `ElevationBand`, `WaterMask` |

### Material Attachment Example

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

> **Related APIs**: [MaterialFactory](/en/api/classes/MaterialFactory) · [SpiralFlowMaterial](/en/api/classes/SpiralFlowMaterial) · [DownEmitDiffuseMaterial](/en/api/classes/DownEmitDiffuseMaterial) · [NeonScanMaterial](/en/api/classes/NeonScanMaterial) · [RadialPulseMaterial](/en/api/classes/RadialPulseMaterial) · [RingSweepMaterial](/en/api/classes/RingSweepMaterial)

---

<!--
示例参考: [Material demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/materials)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
