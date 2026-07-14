[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / encodePolygons

# Function: encodePolygons()

> **encodePolygons**(`polygons`, `outlineWidth?`, `outlineColor?`, `resolution?`, `maxPolygons?`, `options?`): `object`

将所有 CoveragePolygon 绘制到一张 canvas 上。

每个 ring 会先做经线解包，再展开成一个或多个独立的 canvas path，
这样就不会把跨 ±180° 的边硬连成一条横贯全图的长边。

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
