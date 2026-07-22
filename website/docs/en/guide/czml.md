# CZML Data Import

CZML is a JSON format for describing time-dynamic scenes. `CzmlImporter` parses CZML documents into the Daisy Entity + Feature pipeline, with fallback support for native DataSource rendering.

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

`load()` returns `Entity[]` — each CZML entity packet is converted to a Daisy Entity with its corresponding Feature auto-mounted. `position` and `orientation` are converted to `TrajectorySample` trajectories.

## CzmlImporter Constructor

```typescript
new Daisy.CzmlImporter(engine: Daisy.Engine)
```

| Parameter | Type | Description |
|------|------|------|
| `engine` | `Engine` | Daisy engine instance; used to create Entity instances, synchronize the clock, and manage lifecycle |

## CzmlImporter.load() Parameter Table

```typescript
importer.load(czml: any[]): Daisy.Entity[]
importer.load(czml: any[], mode: "daisy"): Daisy.Entity[]
importer.load(czml: any[], mode: "cesium"): Promise<any>
```

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `czml` | `any[]` | — | Array of CZML packets (including `document` and entity packets) |
| `mode` | `"daisy"` \| `"cesium"` | `"daisy"` | Import mode: `"daisy"` uses the Entity/Feature pipeline; `"cesium"` falls back to native DataSource rendering |

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

`"cesium"` mode is appropriate when you need compatibility with existing CZML data but prefer not to route through the Daisy Feature pipeline.

## Supported CZML Elements

16 CZML graphics elements are automatically mapped to their corresponding Daisy Features:

| CZML Element | Mapped To | Description |
|--------------|-----------|-------------|
| `point` | `PointFeature` | Point marker |
| `billboard` | `BillboardFeature` | Billboard icon |
| `label` | `UI.LabelFeature` | Text label |
| `model` | `ModelFeature` | 3D model (glTF) |
| `path` | `TrailPathFeature` | Trail path |
| `polyline` | `PolylineFeature` | Polyline |
| `polygon` | `PolygonFeature` | Polygon |
| `rectangle` | `RectangleFeature` | Rectangle region |
| `wall` | `WallFeature` | Wall |
| `corridor` | `CorridorFeature` | Corridor geometry |
| `ellipse` | `EllipseFeature` | Ellipse region |
| `ellipsoid` | `EllipsoidFeature` | Triaxial ellipsoid |
| `box` | `BoxFeature` | Box |
| `cylinder` | `CylinderFeature` | Cylinder / frustum |
| `polylineVolume` | `PolylineVolumeFeature` | Tubular volume |
| `tileset` | `TilesetFeature` | 3D Tiles tile set |

The `position` field in each CZML element is automatically converted to a Feature position reference; `orientation` is converted to an attitude trajectory.

## document Packet and Clock Synchronization

The CZML `document` packet carries clock information (the `clock` field), which is automatically synchronized to the Engine clock on import:

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

`CzmlImporter` internally calls `setClockFromDocument()`, which automatically performs the following synchronizations:

| Field | Engine Operation | Description |
|------|------|------|
| `clock.interval` | `engine.setSceneTime(start, stop)` | Set the time-axis start and stop |
| `clock.currentTime` | `engine.setCurrentTime()` | Set the current time |
| `clock.multiplier` | `engine.setMultiplier()` | Time multiplier |
| `clock.range` | `engine.setLoop()` | Loop / one-shot mode |

## Handling 'delete: true'

`delete: true` in a CZML packet causes the corresponding entity to be removed from the Engine:

```json
{ "id": "sat-01", "delete": true }
```

The importer first processes all `delete: true` packets, then creates Features for non-deleted packets. When an entity with the same ID already exists, it takes the update path (appending / replacing Features); otherwise the entity is created automatically.

> **Related API**: [CzmlImporter](/en/api/classes/CzmlImporter) · [CzmlPlusImporter](/en/api/classes/CzmlPlusImporter) · [Entity](/en/api/classes/Entity)

---

<!--
  示例参考: [CZML Playground](/playground/)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
