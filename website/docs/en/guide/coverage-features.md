# Ground Coverage

Ground-coverage Features render polygon regions, heatmap data, and GeoJSON data as colored overlays on the Earth's surface.

## Choosing a Feature

| Requirement | Feature | Description |
|------|---------|------|
| Batch irregular polygon coverage | `CoverageAreaFeature` | Hardware-accelerated rasterization for large polygon sets |
| Heatmap density distribution | `HeatmapFeature` | Generates a heatmap from points and supports geographic masks |
| GeoJSON data import | `GeoJsonFeature` | Loads GeoJSON from a URL and parses it for rendering |

---

## CoverageAreaFeature

`CoverageAreaFeature` rasterizes multiple irregular longitude-latitude polygons in their individual colors and overlays them on the Earth's surface. It uses Canvas 2D and `beginPath/closePath/fill` for hardware-accelerated rasterization.

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

`polygons` is an array of `{ ring, color }` objects. Each item defines an independent polygon region:

| Field | Type | Description |
|------|------|------|
| `ring` | `[lng, lat][]` | Polygon vertex sequence in longitude-latitude coordinates, forming a closed ring |
| `color` | `string` | Fill color as a CSS color string such as `rgba(...)` or `hsl(...)` |

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

Changes made by `setResolution` and `setOutline` take effect immediately; polygon data does not need to be supplied again.

### Loading Province Boundaries (35 Provinces, 195 Rings)

CoverageAreaFeature supports loading large polygon sets. The following example overlays precise Chinese province boundaries and thousands of random polygons:

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

The province data comes from DataV GeoJSON and contains 35 provinces and 195 polygon rings.

### Resolution and Performance

`resolution` (in `px/°`) controls the precision of the raster Canvas. Higher values produce sharper images but use more GPU memory and drawing time. The recommended range is 4 to 16:

- Low resolution (4 to 8): suitable for many dense polygons while preserving frame rate
- High resolution (12 to 16): suitable for detailed boundary rendering such as province borders

> **Note:** After rasterization, the result is a texture and cannot scale indefinitely like a vector. Dynamic resolution redraws immediately through `setResolution()`.

### Options

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `polygons` | `{ ring, color }[]` | `[]` | Polygon array |
| `opacity` | `number` | `1` | Global opacity |
| `resolution` | `number` | `8` | Raster precision (px/°), recommended range 4 to 16 |
| `outlineWidth` | `number` | `0` | Outline width in pixels |
| `outlineColor` | `string` | `"rgba(0,0,0,1)"` | Outline color as a CSS string |
| `minVisible` | `number` | `0.01` | Minimum visible-resolution threshold |
| `name` | `string` | — | Name |

---

## HeatmapFeature

`HeatmapFeature` renders point data as a heatmap overlay. The source data is passed through the `grid` descriptor, which contains the point array, geographic region, and spread radius.

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
|------|------|------|
| `points` | `{ lng, lat, value }[]` | Heatmap points: `lng` is longitude, `lat` is latitude, and `value` is the weight |
| `region` | `{ westLon, southLat, eastLon, northLat }` | Bounds of the heatmap rendering region |
| `spread` | `number` | Heat spread radius for each point, in degrees |

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

For a custom color scale, `colorScheme` must be set to `"custom"`; the `colors` array defines the gradient from low to high values.

### Geographic Masks

Use the `masks` array to clip the heatmap to a geographic region, for example to display it only over land:

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
|----------|------|------|
| `geojson` | `object` | GeoJSON geometry data |
| `type` | `"hideInside" \| "hideOutside"` | Mask type; the default behavior is used when omitted |

### Loading External Data

Complete example: load population-density points and render a global population heatmap with a land mask:

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

### Options

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `grid` | `{ points, region, spread }` | — | Heatmap grid descriptor |
| `colorScheme` | `"thermal" \| "viridis" \| "blue-red" \| "custom"` | `"thermal"` | Color scale scheme |
| `colors` | `DColor[]` | — | Custom color scale array, required when `colorScheme: "custom"` |
| `masks` | `{ geojson, type }[]` | `[]` | Mask configuration array |
| `opacity` | `number` | `1` | Global opacity |
| `name` | `string` | — | Name |

---

## GeoJsonFeature

`GeoJsonFeature` asynchronously loads GeoJSON data from a URL, parses polygons, and delegates rendering to an internal `CoverageAreaFeature`. It supports GeoJSON types such as FeatureCollection, Feature, and MultiPolygon, and can extract label text from properties.

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

`loadFromUrl` is the core method of GeoJsonFeature and handles asynchronous loading and parsing:

| Parameter | Type | Description |
|------|------|------|
| `url` | `string` | URL path of the GeoJSON file |
| `callback` | `(polygons, options) => { polygons, options }` | Returns the modified polygons and options |

The callback receives two parameters:
- `polygons`: Parsed polygon array in `{ ring, color }[]` format, passed directly to the internal CoverageAreaFeature
- `options`: Current rendering options (`{ outlineWidth, outlineColor, opacity }`)

The callback must return a `{ polygons, options }` object. Use it to modify colors by country properties or adjust styles.

### Style Control

```typescript
// 动态更新描边
feature.setOutline(1.5, "rgba(0, 255, 200, 0.8)")

// 动态更新透明度
feature.setOpacity(0.6)
```

`setOutline` and `setOpacity` delegate to the internal `CoverageAreaFeature`, so their behavior matches direct use of CoverageAreaFeature.

### Label Rendering

The `label` option extracts label text from GeoJSON properties and renders it automatically:

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

Label text is mapped automatically from properties such as `name` or `admin` in the GeoJSON `properties` field.

### Supported GeoJSON Types

| Type | Description |
|------|------|
| `FeatureCollection` | Standard feature collection, the most common data format |
| `Feature` | Single feature |
| `MultiPolygon` | Multi-polygon, including complex regions with holes |

### Options

| Parameter | Type | Default | Description |
|------|------|--------|------|
| `outlineWidth` | `number` | `1` | Outline width in pixels |
| `outlineColor` | `string` | — | Outline color as a CSS string |
| `opacity` | `number` | `1` | Global opacity |
| `resolution` | `number` | `8` | Internal CoverageAreaFeature raster precision (px/°) |
| `label` | `{ show, font, fillColor, outlineColor, outlineWidth }` | — | Label configuration |
| `name` | `string` | — | Name |

> **Related APIs**: [CoverageAreaFeature](/en/api/classes/CoverageAreaFeature) · [HeatmapFeature](/en/api/classes/HeatmapFeature) · [GeoJsonFeature](/en/api/classes/GeoJsonFeature)
