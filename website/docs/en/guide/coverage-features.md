# Ground Coverage

Ground coverage Features are used to render polygon areas, heatmap data, and GeoJSON data as colored overlay layers on the Earth's surface.

## Feature Selection

| Requirement | Feature | Description |
|-------------|---------|-------------|
| Batch irregular polygon coverage | `CoverageAreaFeature` | Hardware-accelerated rasterization, suitable for large-scale polygons |
| Heat density distribution | `HeatmapFeature` | Generates heatmap from scatter points, supports geographic masking |
| GeoJSON data import | `GeoJsonFeature` | Loads GeoJSON from URL, auto-parses and renders |

---

## CoverageAreaFeature

`CoverageAreaFeature` rasterizes multiple irregular latitude/longitude polygons with individual colors as ground coverage overlays on the Earth's surface. It uses Canvas 2D per-ring `beginPath/closePath/fill` for hardware-accelerated rasterization.

### Basic Usage

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)

entity.addFeature(new Daisy.CoverageAreaFeature({
    polygons: [
        {
            ring: [
                [116, 38], [117, 39], [118, 38], [117, 37],
            ],
            color: "rgba(255, 0, 0, 0.6)",
        },
        {
            ring: [
                [120, 40], [121, 41], [122, 40], [121, 39],
            ],
            color: "hsl(200, 70%, 55%)",
        },
    ],
    opacity: 0.6,
    resolution: 8,           // 像素/经度，控制栅格精度
    outlineWidth: 1,
    outlineColor: "rgba(255, 0, 0, 0.8)",
}))
```

### polygons Format

`polygons` is an array of `{ ring, color }`, each defining an independent polygon area:

| Field | Type | Description |
|-------|------|-------------|
| `ring` | `[lng, lat][]` | Polygon vertex sequence (longitude/latitude coordinates, closed loop) |
| `color` | `string` | Fill color (CSS color string, e.g., `rgba(...)` or `hsl(...)`) |

### Dynamic Updates

```typescript
// 更新全部多边形
feature.setPolygons([
    { ring: [[100, 30], [102, 32], [103, 30]], color: "#ff0000" },
])

// 动态调整描边
feature.setOutline(2, "rgba(0, 255, 0, 0.9)")

// 动态调整栅格精度
feature.setResolution(12)   // 12px/°
```

Changes to `setResolution` and `setOutline` take effect immediately without needing to re-pass polygon data.

### Province Boundary Loading (35 Provinces, 195 Rings)

CoverageAreaFeature supports large-scale polygon loading. The following example overlays precise Chinese province boundaries and thousands of random polygons:

```typescript
import { CHINA_PROVINCES } from "./chinaProvinces"

// 混合自定义多边形与中国省份
const polygons = generateRandomPolygons(5000)
for (const province of CHINA_PROVINCES) {
    polygons.push(province)
}

const feature = new Daisy.CoverageAreaFeature({
    polygons,
    opacity: 0.6,
    resolution: 16,
    outlineWidth: 1,
    outlineColor: "rgba(255, 0, 0, 0.8)",
})
entity.addFeature(feature)
```

Province data source: DataV GeoJSON, 35 provinces, 195 polygon rings.

### Resolution and Performance

`resolution` (unit: `px/°`) controls the raster Canvas precision. Higher values yield sharper images but increase memory and rendering cost. Recommended range: 4~16:

- Low resolution (4~8): Suitable for high-density large polygon sets, maintains frame rate
- High resolution (12~16): Suitable for fine boundary rendering (e.g., province boundaries)

> **Note:** After rasterization, it becomes a texture and cannot be scaled infinitely like vectors. Dynamic resolution is achieved via `setResolution()` for immediate redraw.

### Parameter Table

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `polygons` | `{ ring, color }[]` | `[]` | Polygon array |
| `opacity` | `number` | `1` | Global transparency |
| `resolution` | `number` | `8` | Raster precision (px/°), recommended range 4~16 |
| `outlineWidth` | `number` | `0` | Outline width (pixels) |
| `outlineColor` | `string` | `"rgba(0,0,0,1)"` | Outline color (CSS string) |
| `minVisible` | `number` | `0.01` | Minimum visible resolution threshold |
| `name` | `string` | — | Name |

---

## HeatmapFeature

`HeatmapFeature` renders scatter point data as a heatmap overlay. The raw data is passed via a `grid` descriptor containing the point array, geographic region, and spread radius.

### Basic Usage

```typescript
entity.addFeature(new Daisy.HeatmapFeature({
    grid: {
        points: [
            { lng: 116.4, lat: 39.9, value: 0.8 },  // lng=经度, lat=纬度
            { lng: 121.5, lat: 31.2, value: 0.6 },
            { lng: 113.3, lat: 23.1, value: 0.9 },
        ],
        region: {
            westLon: 110,
            southLat: 20,
            eastLon: 130,
            northLat: 45,
        },
        spread: 2,              // 扩散半径（度）
    },
    colorScheme: "thermal",
    opacity: 0.7,
}))
```

### grid Descriptor

| Field | Type | Description |
|-------|------|-------------|
| `points` | `{ lng, lat, value }[]` | Heat point array: `lng` is longitude, `lat` is latitude, `value` is weight |
| `region` | `{ westLon, southLat, eastLon, northLat }` | Heatmap rendering region boundary |
| `spread` | `number` | Single point heat spread radius (degrees) |

### Color Scale Configuration

```typescript
// 预设色标
new Daisy.HeatmapFeature({
    grid: { /* ... */ },
    colorScheme: "thermal",   // 红-橙-黄色温渐变
})

new Daisy.HeatmapFeature({ grid: { /* ... */ }, colorScheme: "viridis" })
new Daisy.HeatmapFeature({ grid: { /* ... */ }, colorScheme: "blue-red" })

// 自定义色标
new Daisy.HeatmapFeature({
    grid: { /* ... */ },
    colorScheme: "custom",
    colors: [
        Daisy.Color.BLUE,
        Daisy.Color.CYAN,
        Daisy.Color.GREEN,
        Daisy.Color.YELLOW,
        Daisy.Color.ORANGE,
        Daisy.Color.RED,
        Daisy.Color.PURPLE,
        new Daisy.Color(0.15, 0.00, 0.15),
    ],
})
```

When using a custom color scale, `colorScheme` must be set to `"custom"`, and the `colors` array defines the gradient sequence from low to high values.

### Geographic Masking

The `masks` array can clip the heatmap to specified geographic areas, e.g., displaying only over land:

```typescript
// 加载陆地边界 GeoJSON 作为遮罩
const landGeoJSON = await fetch("/data/ne_110m_land.geojson").then(r => r.json())

new Daisy.HeatmapFeature({
    grid: { /* ... */ },
    colorScheme: "custom",
    colors: CUSTOM_COLORS,
    masks: [
        { geojson: landGeoJSON, type: "hideOutside" },
    ],
    opacity: 0.7,
})
```

| Mask Field | Type | Description |
|------------|------|-------------|
| `geojson` | `object` | GeoJSON geometry data |
| `type` | `"hideInside" \| "hideOutside"` | Mask type; uses default behavior when omitted |

### External Data Loading

Complete example: Loading population density point data with land mask to render a global population heatmap:

```typescript
const [points, landGeoJSON] = await Promise.all([
    fetch("/data/population-points.json").then(r => r.json()),
    fetch("/data/ne_110m_land.geojson").then(r => r.json()),
])

entity.addFeature(new Daisy.HeatmapFeature({
    grid: {
        points,
        region: { westLon: -180, southLat: -90, eastLon: 180, northLat: 90 },
        spread: 4,
    },
    colorScheme: "custom",
    colors: CUSTOM_COLORS,
    masks: [{ geojson: landGeoJSON, type: "hideOutside" }],
    opacity: 0.7,
}))
```

### Parameter Table

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `grid` | `{ points, region, spread }` | — | Heatmap grid descriptor |
| `colorScheme` | `"thermal" \| "viridis" \| "blue-red" \| "custom"` | `"thermal"` | Color scale scheme |
| `colors` | `DColor[]` | — | Custom color scale array (required when `colorScheme: "custom"`) |
| `masks` | `{ geojson, type }[]` | `[]` | Mask configuration array |
| `opacity` | `number` | `1` | Global transparency |
| `name` | `string` | — | Name |

---

## GeoJsonFeature

`GeoJsonFeature` asynchronously loads GeoJSON data from a URL, automatically parses polygons, and delegates rendering to an internal `CoverageAreaFeature`. It supports FeatureCollection, Feature, MultiPolygon, and other GeoJSON types, and can extract label text from properties.

### Basic Usage

```typescript
const feature = new Daisy.GeoJsonFeature({
    outlineWidth: 0.8,
    outlineColor: "rgba(255, 0, 0, 0.8)",
    opacity: 0.35,
    resolution: 8,
    label: {
        show: true,
        font: "12px sans-serif",
        fillColor: "#ffffff",
        outlineColor: "#0f172a",
        outlineWidth: 3,
    },
})
entity.addFeature(feature)

// 异步加载 GeoJSON 并渲染
await feature.loadFromUrl("/data/ne_110m_admin_0_countries.geojson", (polygons, options) => {
    return {
        polygons,
        options: {
            ...options,
            outlineWidth: 1,
            outlineColor: "rgba(255, 255, 255, 0.9)",
            opacity: 0.5,
        },
    }
})
```

### loadFromUrl(url, callback)

`loadFromUrl` is the core method of GeoJsonFeature, responsible for asynchronous loading and parsing:

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | `string` | URL path to the GeoJSON file |
| `callback` | `(polygons, options) => { polygons, options }` | Returns modified polygons and options |

The callback receives two parameters:
- `polygons`: Parsed polygon array (`{ ring, color }[]` format, directly passed to the internal CoverageAreaFeature)
- `options`: Current render options (`{ outlineWidth, outlineColor, opacity }`)

The callback must return a `{ polygons, options }` object, where you can modify colors and adjust styles based on country properties.

### Style Control

```typescript
// 动态更新描边
feature.setOutline(1.5, "rgba(0, 255, 200, 0.8)")

// 动态更新透明度
feature.setOpacity(0.6)
```

`setOutline` and `setOpacity` delegate to the internal `CoverageAreaFeature`, behaving identically to direct CoverageAreaFeature usage.

### Label Rendering

The `label` option can automatically extract label text from GeoJSON properties and render it:

```typescript
new Daisy.GeoJsonFeature({
    outlineWidth: 0.8,
    outlineColor: "rgba(255, 0, 0, 0.8)",
    opacity: 0.35,
    resolution: 8,
    label: {
        show: true,
        font: "12px sans-serif",
        fillColor: "#ffffff",
        outlineColor: "#0f172a",
        outlineWidth: 3,
    },
})
```

Label text is automatically mapped from properties like `name` or `admin` in the GeoJSON `properties` field.

### Supported GeoJSON Types

| Type | Description |
|------|-------------|
| `FeatureCollection` | Standard feature collection, the most common data format |
| `Feature` | Single feature |
| `MultiPolygon` | Multi-polygon (complex areas with holes) |

### Parameter Table

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `outlineWidth` | `number` | `1` | Outline width (pixels) |
| `outlineColor` | `string` | — | Outline color (CSS string) |
| `opacity` | `number` | `1` | Global transparency |
| `resolution` | `number` | `8` | Internal CoverageAreaFeature raster precision (px/°) |
| `label` | `{ show, font, fillColor, outlineColor, outlineWidth }` | — | Label configuration |
| `name` | `string` | — | Name |

> **Related API**: [CoverageAreaFeature](/en/api/classes/CoverageAreaFeature) · [HeatmapFeature](/en/api/classes/HeatmapFeature) · [GeoJsonFeature](/en/api/classes/GeoJsonFeature)
