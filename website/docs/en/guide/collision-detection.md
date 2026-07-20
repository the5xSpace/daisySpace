# Collision Detection

Collision detection is performed collaboratively by `BoundBoxFeature` (bounding box) and `BoundBoxCollection` (detection collection), supporting precise OBB/SAT detection, broad-phase spatial bucketing, and multi-entity high-frequency collision events.

## Architecture

```
Entity
  ├── BoundBoxFeature（单例，通过 getOrCreateBoundBoxFeature 获取）
  │     └└── Primitive（BoxGeometry / EllipsoidGeometry）
  │     └└── Polyline[]（轮廓线）
  │     └└── Transformer（位置/旋转/缩放）
  └└── ...
```

All `BoundBoxFeature` instances automatically register to the global `BoundBoxCollection`, which uniformly schedules collision detection.

## Creating Bounding Boxes

Get the entity's singleton bounding box via `entity.getOrCreateBoundBoxFeature()`:

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

The bounding box shares the entity's lifecycle; each entity can have only one bounding box instance.

## Bounding Box Configuration Parameters

| Parameter | Type | Default | Description |
|-----------|------|:---:|-------------|
| `dimensions` | `Cartesian3` | `(100,100,100)` | Bounding box dimensions (meters) |
| `shape` | `"rect"` \| `"ball"` | `"ball"` | Geometry shape |
| `show` | `boolean` | `true` | Whether to display |
| `color` | `Color` | `GREEN(0.3)` | Fill color |
| `outlineColor` | `Color` | `BLACK(0.5)` | Outline color |
| `outlineWidth` | `number` | `2` | Outline line width (pixels) |
| `visualScale` | `number` | `1.01` | Render scale (does not affect collision body) |
| `enableCollision` | `boolean` | `false` | Enable collision detection |
| `collisionVisualMode` | `"none"` \| `"highlight"` | `"none"` | Collision appearance mode |
| `collisionColor` | `Color` | `RED(0.5)` | Collision state color |
| `collisionVisualScale` | `number` | `1.08` | Collision state render scale |

### collisionVisualMode

- `"none"`: Only triggers collision events, does not change bounding box appearance
- `"highlight"`: Highlights with `collisionColor` during collision, restores original color after separation

## Bounding Box Transformation

Each `BoundBoxFeature` embeds a `Transformer`, supporting independent rotation and scaling:

```typescript
box.transformer.setRotation({
    heading: 45,
    pitch: 10,
    roll: 5,
})

box.transformer.setScale(new Daisy.Cartesian3(1.5, 1.5, 1.5))
```

`transformer` composites with the entity's world matrix, ultimately controlling the bounding box's OBB (Oriented Bounding Box) pose.

## Collision Events

`BoundBoxFeature` provides three collision event callbacks:

| Event | Description |
|-------|-------------|
| `onCollisionStart(callback)` | Triggered when collision starts |
| `onCollisionEnd(callback)` | Triggered when collision ends |
| `onCollisionMove(callback)` | Triggered during collision (high frequency, use with caution) |

```typescript
box.onCollisionStart((other) => {
    console.log(`碰撞开始: 与 ${other.entity?.name ?? other.id} 碰撞`)
})

box.onCollisionEnd((other) => {
    console.log(`碰撞结束: 与 ${other.entity?.name ?? other.id} 分离`)
})
```

> In high-frequency scenarios, it is recommended to only listen to start/end, avoiding `collisionMove` flooding the console when there are many objects.

## BoundBoxCollection — Global Detection Collection

Access the global collision detection collection via `engine.collections.boundBoxCollection`, controlling detection strategy and frequency:

### Detection Parameters

| Property | Type | Default | Description |
|----------|------|:---:|-------------|
| `enableCollisionDetection` | `boolean` | `true` | Collision detection master switch |
| `enableBroadPhase` | `boolean` | `true` | Broad-phase detection (bounding sphere pre-screening) |
| `spatialHashThreshold` | `number` | `80` | Enables spatial bucketing above this count |
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

### State Cleanup

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

1. **Broad Phase**: When the object count exceeds `spatialHashThreshold`, spatial bucketing is used to reduce candidate pairs; otherwise, O(N²) full traversal
2. **Bounding Sphere Pre-screening**: Compares the sum of the two objects' bounding sphere radii with the center distance to quickly eliminate impossible pairs
3. **OBB/SAT Precise Detection**: Performs 15-axis separation detection (3+3+3×3) on the oriented bounding boxes to determine whether a real collision occurred

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
