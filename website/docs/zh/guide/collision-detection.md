# 碰撞检测

碰撞检测由 `BoundBoxFeature`（包围盒）和 `BoundBoxCollection`（检测集合）协作完成，支持 OBB/SAT 精确检测、宽相空间分桶和多实体高频碰撞事件。

## 架构

```
Entity
  ├── BoundBoxFeature（单例，通过 getOrCreateBoundBoxFeature 获取）
  │     └── Primitive（BoxGeometry / EllipsoidGeometry）
  │     └── Polyline[]（轮廓线）
  │     └── Transformer（位置/旋转/缩放）
  └── ...
```

所有 `BoundBoxFeature` 自动注册到全局 `BoundBoxCollection`，统一调度碰撞检测。

## 创建包围盒

通过 `entity.getOrCreateBoundBoxFeature()` 获取实体的单例包围盒：

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

包围盒与实体同生命周期，每个实体只能有一个包围盒实例。

## 包围盒配置参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `dimensions` | `Cartesian3` | `(100,100,100)` | 包围盒尺寸（米） |
| `shape` | `"rect"` \| `"ball"` | `"ball"` | 几何体形状 |
| `show` | `boolean` | `true` | 是否显示 |
| `color` | `Color` | `GREEN(0.3)` | 填充颜色 |
| `outlineColor` | `Color` | `BLACK(0.5)` | 轮廓颜色 |
| `outlineWidth` | `number` | `2` | 轮廓线宽（像素） |
| `visualScale` | `number` | `1.01` | 渲染缩放（不影响碰撞体） |
| `enableCollision` | `boolean` | `false` | 启用碰撞检测 |
| `collisionVisualMode` | `"none"` \| `"highlight"` | `"none"` | 碰撞外观模式 |
| `collisionColor` | `Color` | `RED(0.5)` | 碰撞态颜色 |
| `collisionVisualScale` | `number` | `1.08` | 碰撞态渲染缩放 |

### collisionVisualMode

- `"none"`：仅触发碰撞事件，不改变包围盒外观
- `"highlight"`：碰撞时使用 `collisionColor` 高亮，分离后恢复原色

## 包围盒变换

每个 `BoundBoxFeature` 内嵌 `Transformer`，支持独立旋转与缩放：

```typescript
box.transformer.setRotation({
    heading: 45,
    pitch: 10,
    roll: 5,
})

box.transformer.setScale(new Daisy.Cartesian3(1.5, 1.5, 1.5))
```

`transformer` 与实体的世界矩阵合成，最终控制包围盒的 OBB（Oriented Bounding Box）姿态。

## 碰撞事件

`BoundBoxFeature` 提供三个碰撞事件回调：

| 事件 | 说明 |
|------|------|
| `onCollisionStart(callback)` | 碰撞开始时触发 |
| `onCollisionEnd(callback)` | 碰撞结束时触发 |
| `onCollisionMove(callback)` | 碰撞持续中触发（高频，慎用） |

```typescript
box.onCollisionStart((other) => {
    console.log(`碰撞开始: 与 ${other.entity?.name ?? other.id} 碰撞`)
})

box.onCollisionEnd((other) => {
    console.log(`碰撞结束: 与 ${other.entity?.name ?? other.id} 分离`)
})
```

> 高频场景下建议仅监听 start/end，避免 `collisionMove` 在高数量对象时刷屏。

## BoundBoxCollection — 全局检测集合

通过 `engine.collections.boundBoxCollection` 访问全局碰撞检测集合，控制检测策略和频率：

### 检测参数

| 属性 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `enableCollisionDetection` | `boolean` | `true` | 碰撞检测总开关 |
| `enableBroadPhase` | `boolean` | `true` | 宽相检测（外接球预筛） |
| `spatialHashThreshold` | `number` | `80` | 超过此数量启用空间分桶 |
| `collisionDetectionFrequencyHz` | `number` | `10` | 检测频率（1-10 Hz） |

### 配置示例

```typescript
engine.collections.boundBoxCollection.enableBroadPhase = true
engine.collections.boundBoxCollection.spatialHashThreshold = 40
engine.collections.boundBoxCollection.collisionDetectionFrequencyHz = 3
```

### 统计信息

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

### 状态清理

```typescript
engine.collections.boundBoxCollection.clearCollisionStates()
// 清空所有包围盒的当前碰撞状态，适用于批量重建场景
```

## 检测管线

```
┌─ 全量 Pair ─┐
│   O(N²/2)    │              ┌─ 外接球预筛 ─┐     ┌─ OBB/SAT 精检 ─┐
│对象数<阈值时  │  ──或──▶    │  空间分桶     │ ──▶│  8顶点投影测试  │ ──▶ 碰撞事件
│ 直接遍历     │              │  筛掉不交 Pair │     │  15轴分离检测  │
└──────────────┘              └───────────────┘     └────────────────┘
```

1. **宽相（Broad Phase）**：对象数超过 `spatialHashThreshold` 时使用空间分桶减少候选 pair；否则 O(N²) 全量遍历
2. **外接球预筛**：比较两物体外接球半径之和与中心距，快速排除不可能碰撞的 pair
3. **OBB/SAT 精检**：对有向包围盒做 15 轴分离检测（3+3+3×3），确定是否真正碰撞

## 完整示例

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

> **相关 API**：[BoundBoxFeature](/api/classes/BoundBoxFeature) · [BoundBoxCollection](/api/classes/BoundBoxCollection) · [Entity](/api/classes/Entity)
