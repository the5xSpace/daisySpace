# Collision Detection

Collision detection is implemented cooperatively by `BoundBoxFeature` (bounding boxes) and `BoundBoxCollection` (the detection collection). It supports precise OBB/SAT tests, broad-phase spatial hashing, and high-frequency collision events for multiple entities.

## Architecture

```
Entity
  ├── BoundBoxFeature（单例，通过 getOrCreateBoundBoxFeature 获取）
  │     └── Primitive（BoxGeometry / EllipsoidGeometry）
  │     └── Polyline[]（轮廓线）
  │     └── Transformer（位置/旋转/缩放）
  └── ...
```

All `BoundBoxFeature` instances register automatically with the global `BoundBoxCollection`, which schedules collision detection centrally.

## Creating a Bounding Box

Use `entity.getOrCreateBoundBoxFeature()` to get the Entity's singleton bounding box:

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")

const entity = engine.createEntity("Box-1")
entity.position = Daisy.TrajectorySample / Daisy.Cartesian3

const box = entity.getOrCreateBoundBoxFeature({
    dimensions: new Daisy.Cartesian3(8000, 6000, 5000),  // 长/宽/高（米）
    shape: "rect",           // "rect"（盒体）或 "ball"（球体）
    show: true,
    color: Daisy.Color.BLUE.withAlpha(0.24),
    outlineColor: Daisy.Color.CYAN,
    outlineWidth: 2.0,
    visualScale: 1.01,
    enableCollision: true,     // 启用碰撞检测
    collisionVisualMode: "highlight",
    collisionColor: Daisy.Color.RED.withAlpha(0.82),
})
```

The bounding box shares the Entity's lifecycle, and each Entity can have only one bounding-box instance.

## Bounding-Box Options

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `dimensions` | `Cartesian3` | `(100,100,100)` | Bounding-box dimensions, in meters |
| `shape` | `"rect"` \| `"ball"` | `"ball"` | Geometry shape |
| `show` | `boolean` | `true` | Whether to display |
| `color` | `Color` | `GREEN(0.3)` | Fill color |
| `outlineColor` | `Color` | `BLACK(0.5)` | Outline color |
| `outlineWidth` | `number` | `2` | Outline width in pixels |
| `visualScale` | `number` | `1.01` | Rendering scale (does not affect the collision volume) |
| `enableCollision` | `boolean` | `false` | Enables collision detection |
| `collisionVisualMode` | `"none"` \| `"highlight"` | `"none"` | Collision appearance mode |
| `collisionColor` | `Color` | `RED(0.5)` | Color in the collision state |
| `collisionVisualScale` | `number` | `1.08` | Rendering scale in the collision state |

### collisionVisualMode

- `"none"`: triggers collision events only and does not change the bounding-box appearance.
- `"highlight"`: highlights with `collisionColor` during a collision and restores the original color after separation.

## Bounding-Box Transform

Each `BoundBoxFeature` contains a `Transformer` and supports independent rotation and scaling:

```typescript
box.transformer.setRotation({
    heading: 45,
    pitch: 10,
    roll: 5,
})

box.transformer.setScale(new Daisy.Cartesian3(1.5, 1.5, 1.5))
```

`transformer` is composed with the Entity's world matrix to control the bounding box's OBB (Oriented Bounding Box) pose.

## Collision Events

`BoundBoxFeature` provides three collision-event callbacks:

| Event | Description |
|------|------|
| `onCollisionStart(callback)` | Invoked when a collision starts |
| `onCollisionEnd(callback)` | Invoked when a collision ends |
| `onCollisionMove(callback)` | Invoked while a collision continues (high frequency; use with care) |

```typescript
box.onCollisionStart((other) => {
    console.log(`碰撞开始: 与 ${other.entity?.name ?? other.id} 碰撞`)
})

box.onCollisionEnd((other) => {
    console.log(`碰撞结束: 与 ${other.entity?.name ?? other.id} 分离`)
})
```

> In high-frequency scenarios, listen only to start/end to avoid `collisionMove` flooding the output with many objects.

## BoundBoxCollection - Global Detection Collection

Access the global collision-detection collection through `engine.collections.boundBoxCollection` to control detection strategy and frequency:

### Detection Parameters

| Property | Type | Default | Description |
|------|------|:---:|------|
| `enableCollisionDetection` | `boolean` | `true` | Master switch for collision detection |
| `enableBroadPhase` | `boolean` | `true` | Broad-phase detection (bounding-sphere prefilter) |
| `spatialHashThreshold` | `number` | `80` | Enables spatial hashing above this object count |
| `collisionDetectionFrequencyHz` | `number` | `10` | Detection frequency (1-10 Hz) |

### Configuration Example

```typescript
engine.collections.boundBoxCollection.enableBroadPhase = true
engine.collections.boundBoxCollection.spatialHashThreshold = 40
engine.collections.boundBoxCollection.collisionDetectionFrequencyHz = 3
```

### Statistics

```typescript
const stats = engine.collections.boundBoxCollection.getStats()
// {
//   boxCount: 30,
//   enabledBoxCount: 25,
//   broadPhaseCandidatePairs: 120,
//   broadPhaseRejectedPairs: 98,
//   narrowPhaseTests: 22,
//   obbTests: 22,
//   collisions: 3,
//   durationMs: 0.42,
//   usedObb: true
// }
```

### Clearing State

```typescript
engine.collections.boundBoxCollection.clearCollisionStates()
// 清空所有包围盒的当前碰撞状态，适用于批量重建场景
```

## Detection Pipeline

```
┌─ 全量 Pair ─┐
│   O(N²/2)    │              ┌─ 外接球预筛 ─┐     ┌─ OBB/SAT 精检 ─┐
│对象数<阈值时  │  ──或──▶    │  空间分桶     │ ──▶│  8顶点投影测试  │ ──▶ 碰撞事件
│ 直接遍历     │              │  筛掉不交 Pair │     │  15轴分离检测  │
└──────────────┘              └───────────────┘     └────────────────┘
```

1. **Broad Phase**: when the object count exceeds `spatialHashThreshold`, spatial hashing reduces candidate pairs; otherwise all pairs are traversed in O(N²).
2. **Bounding-sphere prefilter**: compares the sum of the two bounding-sphere radii with the center distance to quickly eliminate impossible collision pairs.
3. **OBB/SAT Narrow Phase**: performs 15-axis separation tests (3+3+3×3) on oriented bounding boxes to determine whether a collision actually exists.

## Complete Example

```typescript
const engine = await Daisy.Engine.create("container")
const N = 30
const entities = []
const boxes = []

for (let i = 0; i < N; i++) {
    const entity = engine.createEntity(`Collision-${i}`)
    entity.position = Daisy.Cartesian3.fromDegrees(116 + i * 2, 39.9, 500_000 + i * 10_000)

    entity.addFeature(new Daisy.PointFeature({
        pixelSize: 3,
        color: Daisy.Color.CYAN.withAlpha(0.72),
    }))

    const box = entity.getOrCreateBoundBoxFeature({
        dimensions: new Daisy.Cartesian3(8000, 6000, 5000),
        shape: Math.random() > 0.5 ? "rect" : "ball",
        color: Daisy.Color.BLUE.withAlpha(0.24),
        outlineColor: Daisy.Color.CYAN,
        outlineWidth: 2.0,
        show: false,
        enableCollision: true,
        collisionVisualMode: "highlight",
        collisionColor: Daisy.Color.RED.withAlpha(0.82),
    })

    box.onCollisionStart((other) => {
        const a = entity.name ?? entity.getId()
        const b = other.entity?.name ?? other.id
        console.log(`${a} 开始碰撞 ${b}`)
    })

    box.onCollisionEnd((other) => {
        const a = entity.name ?? entity.getId()
        const b = other.entity?.name ?? other.id
        console.log(`${a} 结束碰撞 ${b}`)
    })

    entities.push(entity)
    boxes.push(box)
}

// 配置全局检测
engine.collections.boundBoxCollection.enableBroadPhase = true
engine.collections.boundBoxCollection.spatialHashThreshold = 40
engine.collections.boundBoxCollection.collisionDetectionFrequencyHz = 3

engine.play(1)
```

---

> **Related API**: [BoundBoxFeature](/en/api/classes/BoundBoxFeature) · [BoundBoxCollection](/en/api/classes/BoundBoxCollection) · [Entity](/en/api/classes/Entity)
