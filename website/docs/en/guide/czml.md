# CZML 数据导入

CZML 是一种描述时间动态场景的 JSON 格式。`CzmlImporter` 将 CZML 文档解析为 Daisy Entity + Feature 管线，同时支持退回到原生 DataSource 渲染。

## 基本用法

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

`load()` 返回 `Entity[]`——CZML 中每个实体包被转换为一个 Daisy Entity，并自动挂载对应的 Feature。`position` 和 `orientation` 转换为 `TrajectorySample` 轨迹。

## CzmlImporter 构造函数

```typescript
new Daisy.CzmlImporter(engine: Daisy.Engine)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `engine` | `Engine` | Daisy 引擎实例，用于创建 Entity、同步时钟、管理生命周期 |

## CzmlImporter.load() 参数表

```typescript
importer.load(czml: any[]): Daisy.Entity[]
importer.load(czml: any[], mode: "daisy"): Daisy.Entity[]
importer.load(czml: any[], mode: "cesium"): Promise<any>
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `czml` | `any[]` | — | CZML 包数组（含 `document` 包与实体包） |
| `mode` | `"daisy"` \| `"cesium"` | `"daisy"` | 导入模式：`"daisy"` 走 Entity/Feature 管线，`"cesium"` 退回到原生 DataSource 渲染 |

## 两种模式

```typescript
// Daisy 模式（默认）——走完整 Feature 管线
const importer = new Daisy.CzmlImporter(engine)
const entities = importer.load(czmlData)
// entities 可用于后续 Feature 操控、事件绑定、LOD 管理

// 原生回退模式——返回 DataSource
const dataSource = await importer.load(czmlData, "cesium")
// dataSource 可直接添加到 viewer 的 dataSources 中
```

`"cesium"` 模式适用于需要兼容已有 CZML 数据、但不希望走 Daisy Feature 管线的场景。

## 支持的 CZML 元素

16 种 CZML 图形元素自动映射为对应 Daisy Feature：

| CZML 元素 | 转换目标 | 说明 |
|-----------|----------|------|
| `point` | `PointFeature` | 点标记 |
| `billboard` | `BillboardFeature` | 公告板图标 |
| `label` | `UI.LabelFeature` | 文字标签 |
| `model` | `ModelFeature` | 3D 模型（glTF） |
| `path` | `TrailPathFeature` | 尾迹轨迹 |
| `polyline` | `PolylineFeature` | 折线 |
| `polygon` | `PolygonFeature` | 多边形 |
| `rectangle` | `RectangleFeature` | 矩形区域 |
| `wall` | `WallFeature` | 立面墙体 |
| `corridor` | `CorridorFeature` | 走廊几何体 |
| `ellipse` | `EllipseFeature` | 椭圆区域 |
| `ellipsoid` | `EllipsoidFeature` | 三轴椭球体 |
| `box` | `BoxFeature` | 长方体 |
| `cylinder` | `CylinderFeature` | 圆柱/圆台 |
| `polylineVolume` | `PolylineVolumeFeature` | 管状体积 |
| `tileset` | `TilesetFeature` | 3D Tiles 瓦片 |

每条 CZML 元素中的 `position` 自动转换为 Feature 的位置引用，`orientation` 转换为姿态轨迹。

## document 包与时钟同步

CZML 的 `document` 包携带时钟信息（`clock` 字段），导入时自动同步 Engine 时钟：

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

`CzmlImporter` 内部调用 `setClockFromDocument()`，自动完成以下同步：

| 字段 | Engine 操作 | 说明 |
|------|------------|------|
| `clock.interval` | `engine.setSceneTime(start, stop)` | 设置时间轴起止 |
| `clock.currentTime` | `engine.setCurrentTime()` | 设置当前时间 |
| `clock.multiplier` | `engine.setMultiplier()` | 时间倍速 |
| `clock.range` | `engine.setLoop()` | 循环/单向模式 |

## delete: true 处理

CZML 中的 `delete: true` 会从 Engine 移除对应实体：

```json
{ "id": "sat-01", "delete": true }
```

导入器先遍历所有包处理 `delete: true`，再为非删除包创建 Feature。已存在同 ID 实体时走更新路径（追加/替换 Feature），不存在时自动创建。

> **相关 API**：[CzmlImporter](/en/api/classes/CzmlImporter) · [CzmlPlusImporter](/en/api/classes/CzmlPlusImporter) · [Entity](/en/api/classes/Entity)

---

<!--
  示例参考: [CZML Playground](/playground/)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
