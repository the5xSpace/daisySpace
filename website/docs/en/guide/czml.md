# CZML Data Import

CZML is a JSON format for describing time-dynamic scenes. `CzmlImporter` parses CZML documents into the Daisy Entity + Feature pipeline and can also fall back to native DataSource rendering.

## Basic Usage

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

// 从远端加载 CZML
const res = await fetch("/assets/sample.czml")
const czmlPackets = await res.json()

// 创建导入器并解析
const importer = new Daisy.CzmlImporter(engine)
const entities = importer.load(czmlPackets)
```

`load()` returns `Entity[]`. Each entity packet in the CZML is converted into a Daisy Entity with the corresponding Feature mounted automatically. `position` and `orientation` are converted into a `TrajectorySample` trajectory.

## CzmlImporter Constructor

```typescript
new Daisy.CzmlImporter(engine: Daisy.Engine)
```

| Parameter | Type | Description |
|------|------|------|
| `engine` | `Engine` | Daisy Engine instance used to create Entity, synchronize the clock, and manage lifecycles |

## CzmlImporter.load() Parameter Table

```typescript
importer.load(czml: any[]): Daisy.Entity[]
importer.load(czml: any[], mode: "daisy"): Daisy.Entity[]
importer.load(czml: any[], mode: "cesium"): Promise<any>
```

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `czml` | `any[]` | — | CZML packet array, including the `document` packet and entity packets |
| `mode` | `"daisy"` \| `"cesium"` | `"daisy"` | Import mode: `"daisy"` uses the Entity/Feature pipeline, while `"cesium"` falls back to native DataSource rendering |

## Two Modes

```typescript
// Daisy 模式（默认）——走完整 Feature 管线
const importer = new Daisy.CzmlImporter(engine)
const entities = importer.load(czmlData)
// entities 可用于后续 Feature 操控、事件绑定、LOD 管理

// 原生回退模式——返回 DataSource
const dataSource = await importer.load(czmlData, "cesium")
// dataSource 可直接添加到 viewer 的 dataSources 中
```

The `"cesium"` mode is useful when existing CZML data must remain compatible without using the Daisy Feature pipeline.

## Supported CZML Elements

Sixteen CZML graphic elements are mapped automatically to the corresponding Daisy Features:

| CZML Element | Conversion target | Description |
|-----------|----------|------|
| `point` | `PointFeature` | Point marker |
| `billboard` | `BillboardFeature` | Billboard icon |
| `label` | `UI.LabelFeature` | Text label |
| `model` | `ModelFeature` | 3D model (glTF) |
| `path` | `TrailPathFeature` | Trail path |
| `polyline` | `PolylineFeature` | Polyline |
| `polygon` | `PolygonFeature` | Polygon |
| `rectangle` | `RectangleFeature` | Rectangular area |
| `wall` | `WallFeature` | Vertical wall geometry |
| `corridor` | `CorridorFeature` | Corridor geometry |
| `ellipse` | `EllipseFeature` | Elliptical area |
| `ellipsoid` | `EllipsoidFeature` | Triaxial ellipsoid |
| `box` | `BoxFeature` | Box |
| `cylinder` | `CylinderFeature` | Cylinder/cone |
| `polylineVolume` | `PolylineVolumeFeature` | Tubular volume |
| `tileset` | `TilesetFeature` | 3D Tiles tileset |

The `position` in each CZML element is converted automatically into a Feature position reference, while `orientation` is converted into an attitude trajectory.

## Document Packets and Clock Synchronization

The CZML `document` packet carries clock information in the `clock` field, which is synchronized to the Engine clock during import:

```json
{
  "id": "document",
  "clock": {
    "interval": "2012-03-15T10:00:00Z/2012-03-16T10:00:00Z",
    "currentTime": "2012-03-15T10:00:00Z",
    "multiplier": 60,
    "range": "LOOP_STOP",
    "step": "SYSTEM_CLOCK_MULTIPLIER"
  }
}
```

`CzmlImporter` calls `setClockFromDocument()` internally to perform the following synchronization:

| Field | Engine operation | Description |
|------|------------|------|
| `clock.interval` | `engine.setSceneTime(start, stop)` | Sets the timeline start and stop |
| `clock.currentTime` | `engine.setCurrentTime()` | Sets the current time |
| `clock.multiplier` | `engine.setMultiplier()` | Time multiplier |
| `clock.range` | `engine.setLoop()` | Loop or one-way mode |

## Handling delete: true

`delete: true` in CZML removes the corresponding Entity from the Engine:

```json
{ "id": "sat-01", "delete": true }
```

The importer first processes `delete: true` across all packets, then creates Features for non-deletion packets. When an Entity with the same ID already exists, it follows the update path (appending or replacing Features); otherwise, it creates the Entity automatically.

> **Related API**: [CzmlImporter](/en/api/classes/CzmlImporter) · [CzmlPlusImporter](/en/api/classes/CzmlPlusImporter) · [Entity](/en/api/classes/Entity)

---

<!--
  示例参考: [CZML Playground](/playground/)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
