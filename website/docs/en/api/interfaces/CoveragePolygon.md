[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CoveragePolygon

# Interface: CoveragePolygon

Closed polygon definition for a single coverage area.
ring is an array of longitude/latitude points; the first and last points need not repeat (auto-closed).

## Properties

### color

> **color**: `string`

CSS color string, e.g., "#ff0000" / "rgba(255,0,0,0.5)"

***

### label?

> `optional` **label?**: `string`

Polygon label text (optional); when set, displayed at the polygon centroid

***

### ring

> **ring**: \[`number`, `number`\][]

Closed longitude/latitude ring [[lng, lat], [lng, lat], ...], at least 3 points
