# Shader Polygon

[ShaderPolygonFeature](/en/api/classes/ShaderPolygonFeature) is a polygon rendering component based on a custom shader pipeline, supporting both ground-projected and floating polygons, suitable for coverage areas, geo-fencing, and high-performance batch rendering scenarios.

## Basic Usage

Polygons are defined by a vertex sequence (`Cartesian3[]`) via `pathway`, requiring at least 3 vertices:

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")

const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)

entity.addFeature(new Daisy.ShaderPolygonFeature({
    pathway: [
        Daisy.Cartesian3.fromDegrees(90, 20, 0),
        Daisy.Cartesian3.fromDegrees(120, 20, 0),
        Daisy.Cartesian3.fromDegrees(110, 40, 0),
    ],
    color: Daisy.Color.BLUE.withAlpha(0.35),
}))
```

Input can also be provided via `polygonHierarchy` (`PolygonHierarchy`) or a pre-built `mesh` (`ShaderPolygonMeshInput`).

## Ground Clamping and Floating

`surfaceConform` controls whether the polygon is projected onto the celestial surface (default `false`):

```typescript
// 贴地多边形（surfaceConform: true）
new Daisy.ShaderPolygonFeature({
    pathway: positions,
    color: Daisy.Color.fromCssColorString("#2288ff").withAlpha(0.35),
    surfaceConform: true,
})

// 悬浮多边形（surfaceConform: false + height 抬升）
new Daisy.ShaderPolygonFeature({
    pathway: positions,
    color: Daisy.Color.fromCssColorString("#00ddff").withAlpha(0.5),
    surfaceConform: false,
    height: 2000000,   // 高度（米）
})
```

Advanced surface subdivision parameters can be controlled via `subdivisionGranularityMeters`, `maxSubdivisionDepth`, `surfaceErrorMeters`, etc.

## Outline

```typescript
new Daisy.ShaderPolygonFeature({
    pathway: positions,
    color: Daisy.Color.RED.withAlpha(0.3),
    outline: true,
    outlineColor: Daisy.Color.WHITE,
    outlineWidth: 2,       // 像素
})
```

> **Note:** Outlines are generated based on geodesic densification (`_densifyGeodesic`). Excessive edge counts can significantly impact performance. The ShadePolygonPerf benchmark has already indicated that "enabling outlines causes a sharp performance degradation."

### Dynamic Outline Updates

```typescript
// 动态开启或关闭轮廓
feature.setOutline(true, Daisy.Color.WHITE, 1.5)
feature.setOutline(false)
```

## Worker Parallel Mesh Building

Mesh construction (triangulation + surface subdivision) is executed asynchronously in a Web Worker by default, without blocking the main thread:

- All instances share a `sharedMeshBuildWorker`, avoiding repeated Worker creation overhead
- Automatically falls back to the main thread on Worker failure (`meshBuildWorkerFallbackToMainThread = true`)
- Can be disabled via the `meshBuildInWorker` option (generally not needed)

This mechanism ensures that even when creating hundreds of polygons in a single frame, the main thread rendering is not blocked by mesh building.

## Performance Mode

### Batch Creation

In the Perf benchmark Demo (`ShaderPolygonPerf.svelte`), **batch creation** mode is used to avoid blocking a single frame:

```typescript
const BATCH = 80  // 每批 80 个
function addBatch() {
    const end = Math.min(idx + BATCH, n)
    for (let i = idx; i < end; i++) {
        entity.addFeature(new Daisy.ShaderPolygonFeature({
            pathway: defs[i].pts,
            color: defs[i].color,
        }))
    }
    idx = end
    if (idx < n) setTimeout(addBatch, 0) // 让出主线程
}
```

### Benchmark Data

The `ShaderPolygonPerf` Demo demonstrates the ability to render **1000 colored polygons** simultaneously (up to 1000, 4~8 sides, distributed uniformly on the ellipsoid using golden angles).

### Performance Tips

| Tip | Description |
|-----|-------------|
| Batch creation | ~80 per batch, `setTimeout(fn, 0)` to yield the main thread |
| Worker mesh building | Enabled by default, triangulation doesn't block rendering |
| Avoid large-scale outlines | Outlines require geodesic densification, significant overhead |
| Control surface subdivision granularity | `subdivisionGranularityMeters` should not be set too small |
| Control polygon vertex count | More vertices per polygon increases triangulation and densification cost |

## Parameter Table

| Parameter | Type | Default | Description |
|-----------|------|--------|-------------|
| `pathway` | `Pathway` | — | Polygon vertex sequence (`Cartesian3[]`/`REF` etc.) |
| `polygonHierarchy` | `PolygonHierarchy` | — | Polygon hierarchy |
| `mesh` | `ShaderPolygonMeshInput` | — | Pre-built mesh (`{ vertices, indices, boundingSphere }`) |
| `color` | `DColor` | `Color.CYAN.withAlpha(0.8)` | Fill color |
| `surfaceConform` | `boolean` | `false` | Whether to project onto celestial surface (ground clamp) |
| `height` | `number` | — | Floating height (meters), effective when `surfaceConform: false` |
| `outline` | `boolean` | `false` | Whether to draw outline |
| `outlineColor` | `DColor` | `Color.BLACK` | Outline color |
| `outlineWidth` | `number` | `1` | Outline width (pixels) |
| `show` | `boolean` | `true` | Visibility |
| `name` | `string` | — | Name (debugging) |
| `effectType` | `number` | `0` | Shader effect type index |
| `speed` | `number` | `1` | Effect animation speed |
| `radius` | `number` | `1` | Effect radius (meters) |
| `projectionMode` | `"tangent" \| "cartographic"` | `"tangent"` | Surface projection mode |
| `projectionReferenceLongitude` | `number` | — | Cartographic projection reference longitude |
| `subdivisionGranularityMeters` | `number` | — | Surface subdivision granularity (meters) |
| `maxSubdivisionDepth` | `number` | — | Maximum subdivision depth |
| `surfaceErrorMeters` | `number` | — | Surface fitting error tolerance (meters) |
| `surfaceLiftMeters` | `number` | — | Surface normal lift (meters) |
| `boundaryDensify` | `boolean` | `true` | Boundary densification interpolation |
| `boundaryMaxArcMeters` | `number` | — | Boundary densification max arc length (meters) |
| `boundaryMaxSagittaMeters` | `number` | — | Boundary densification max sagitta (meters) |
| `boundaryMaxDeltaLonDeg` | `number` | — | Boundary densification max longitude span |
| `boundaryMaxDeltaLatDeg` | `number` | — | Boundary densification max latitude span |
| `skinnyAspectLimit` | `number` | — | Slender triangle aspect ratio threshold |
| `midpointErrorMeters` | `number` | — | Midpoint error tolerance (meters) |
| `centroidErrorMeters` | `number` | — | Centroid error tolerance (meters) |
| `preferLongestEdgeSplit` | `boolean` | `false` | Prefer splitting along the longest edge |
| `disableCulling` | `boolean` | `false` | Disable back-face culling |
| `disableBackFaceCulling` | `boolean` | `false` | Independent back-face culling |
| `depthTestEnabled` | `boolean` | `true` | Depth test |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Distance display condition |
| `ellipsoid` | `CelestialEllipsoid` | — | Celestial ellipsoid configuration |
| `debug` | `boolean` | `false` | Debug mode |
| `debugWireframe` | `boolean` | `false` | Wireframe rendering (debugging) |
| `debugWireframeColor` | `Color` | — | Wireframe color |

> **Related API**: [ShaderPolygonFeature](/en/api/classes/ShaderPolygonFeature)
