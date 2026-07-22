[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CoverageAreaOptions

# Interface: CoverageAreaOptions

## Properties

### label?

> `optional` **label?**: [`CoverageLabelOptions`](CoverageLabelOptions.md)

Global label style configuration. Each polygon's text can be set independently via CoveragePolygon.label

***

### maxPolygons?

> `optional` **maxPolygons?**: `number`

Polygon rendering limit. When exceeded, only the first N polygons are rendered and console.warn is issued.

- Default 50000: Covers mainstream integrated GPUs (Intel UHD / AMD Radeon Graphics)
- Dedicated GPUs (RTX 3060+) can be set higher
- 50K polygons render in about 3-8 seconds on a 1440×720 canvas; adjust based on client GPU benchmarks
- Only affects rendering; coverage statistics always use the full computation result

#### Default

```ts
50000
```

***

### minVisible?

> `optional` **minVisible?**: `number`

Visibility threshold. Textures with alpha below this value are not rendered. Default 0.01

***

### opacity?

> `optional` **opacity?**: `number`

Global opacity (0-1). Default 0.8

***

### outlineColor?

> `optional` **outlineColor?**: `string`

Outline color. Default "rgba(255,255,255,0.4)"

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Individual polygon outline width (pixels). 0 means no outline. Default 0

***

### polygons

> **polygons**: [`CoveragePolygon`](CoveragePolygon.md)[]

List of coverage area polygons. Each polygon can have an independent color

***

### resolution?

> `optional` **resolution?**: `number`

Texture resolution (pixels/degree). Higher values are sharper. Default 8, recommended 4-16
