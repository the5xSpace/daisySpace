[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / encodePolygons

# Function: encodePolygons()

> **encodePolygons**(`polygons`, `outlineWidth?`, `outlineColor?`, `resolution?`, `maxPolygons?`, `options?`): `object`

Draws all CoveragePolygons onto a single canvas.

Each ring is first unwrapped along the meridian, then expanded into one or more independent canvas paths,
so that edges crossing ±180° are not forced into a single line spanning the entire map.

## Parameters

### polygons

[`CoveragePolygon`](../interfaces/CoveragePolygon.md)[]

### outlineWidth?

`number` = `0`

### outlineColor?

`string` = `"rgba(255,255,255,0.4)"`

### resolution?

`number` = `8`

### maxPolygons?

`number` = `50000`

### options?

[`EncodePolygonOptions`](../interfaces/EncodePolygonOptions.md) = `{}`

## Returns

`object`

### canvas

> **canvas**: `HTMLCanvasElement`

### region

> **region**: `object`

#### region.east

> **east**: `number`

#### region.north

> **north**: `number`

#### region.south

> **south**: `number`

#### region.west

> **west**: `number`
