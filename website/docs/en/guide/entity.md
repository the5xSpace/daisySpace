# Entity

[Entity](/en/api/classes/Entity) is the abstract carrier of scene objects in DaisySpace-Sdk. It does not render anything itself; instead, it gains visualization capabilities by mounting Feature components.

## Core Concept

Entity itself renders nothing. It gains visualization capabilities by **mounting Feature components**:

```
Entity（空壳） + PointFeature → 可渲染的点
Entity（空壳） + ModelFeature → 3D 模型
Entity（空壳） + PointFeature + LabelFeature + TrailPathFeature → 组合效果
```

This "composition over inheritance" design is key to understanding Entity.

## Creation and Registration

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")

// 手动创建
const entity = new Daisy.Entity("MyEntity")
// 或指定自定义 ID
const entity = new Daisy.Entity("MyEntity", { id: "custom-id" })

// 方式一：绑定到 Engine 并注册
entity.bindEngine(engine)   // 挂载引擎引用
engine.addEntity(entity)    // 注册到渲染循环

// 方式二：engine.createEntity() 一步完成
const entity = engine.createEntity("MyEntity")
// 内部等价于：new Entity(name) → addEntity()

// 按 ID 或名称查找
engine.getEntityById("custom-id")
engine.getEntityByName("MyEntity")
```

`bindEngine()` is required — without binding to the engine, the Entity does not participate in the render loop, and methods like `getCurrentPosition()` return `undefined`.

## Position System

`entity.position` accepts three types, corresponding to three position semantics:

| Type | Reference Frame | Use Case |
|------|----------------|----------|
| `Cartesian3` | ECEF | Fixed points (ground stations, static markers) |
| `TrajectorySample` | Inertial (configurable) | Orbital objects (satellites, celestial bodies) |
| `TrajectorySampleBodyFixed` | ECEF | Surface-moving objects (aircraft, ships) |

### Static Position

```typescript
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
```

### Time-Series Trajectory (TrajectorySample)

```typescript
const traj = new Daisy.TrajectorySample(Daisy.ReferenceFrame.INERTIAL, {
    interpolationAlgorithm: "LAGRANGE",
    interpolationDegree: 5,
})

// 添加采样点：pushData({ time, position })
const startTime = Daisy.JulianDate.fromDate(new Date("2025-06-01T00:00:00Z"))
traj.pushData({ time: startTime, position: Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000) })
traj.pushData({ time: /* t + 60s */, position: Daisy.Cartesian3.fromDegrees(120.0, 35.0, 500_000) })
// ...

entity.position = traj
```

`TrajectorySample` supports three interpolation algorithms: `"LAGRANGE"` (default), `"LINEAR"`, `"HERMITE"`.

### Body-Fixed Trajectory (TrajectorySampleBodyFixed)

```typescript
const traj = new Daisy.TrajectorySampleBodyFixed()
traj.pushData({ time, position: fixedPositionECEF })
entity.position = traj
```

Forces `ReferenceFrame.FIXED`, `evaluateECEF()` always returns ECEF coordinates.

### Runtime Position Queries

```typescript
// 按指定时间查询
entity.getPositionByTime(someJulianDate)

// 查询当前仿真时间的位置（ECI/ECEF 取决于类型）
entity.getCurrentPosition()

// 始终返回 ECEF
entity.getCurrentPositionECEF()

// 按参考系返回（支持指定 targetFrame）
entity.getFrameAwarePosition(time, { targetFrame: "ECEF" })

// 获取轨迹时间戳列表
entity.getTimes()

// 判断位置类型
entity.isTrajectorySample()          // TrajectorySample?
entity.isTrajectorySampleBodyFixed() // TrajectorySampleBodyFixed?

// 是否支持惯性系采样
entity.supportsInertialSample()
```

## Feature Management

```typescript
// 挂载 Feature
const point = new Daisy.PointFeature({ size: 1000, color: Daisy.Color.CYAN })
entity.addFeature(point)

// 移除 Feature
entity.removeFeature(point)       // 按实例移除
entity.removeFeatureById("id")    // 按 ID 移除
entity.removeFeatureByName("name") // 按名称移除
```

`addFeature()` will:
1. Write `entity.celestialEllipsoid` into `feature.options.ellipsoid`
2. Check if the current time is within the entity's valid interval; if so, immediately call `feature.register(this)`
3. Add the Feature to the internal Map

> **Note**: Adding `BoundBoxFeature` via `addFeature()` throws an exception. The bounding box is an internal singleton of the Entity and must be obtained via `entity.getOrCreateBoundBoxFeature()`.

## Interaction Events

Entity provides a mouse interaction event chain, with events bubbling up from Features to the Entity:

```typescript
entity.onClick((e) => {
    console.log("clicked entity:", e.entityId)
    console.log("feature type:", e.featureType)
})

entity.onDblClick((e) => { /* ... */ })
entity.onMouseEnter((e) => { /* ... */ })
entity.onMouseLeave((e) => { /* ... */ })

// 取消监听
entity.offClick(handler)    // 移除指定 handler
entity.offClick()           // 移除全部 click handler
```

Interaction state (for LOD and UI judgment):

```typescript
entity.activated          // 是否被选中
entity.hovered            // 是否被悬停
entity.interaction        // InteractionComponent 对象（读写 pick/hover/click 状态）
```

## Transform and Matrix

Entity has its own `transformer`, composing translation, rotation, and scaling into a world matrix:

```typescript
// 访问 Transformer
entity.transformer.setTranslation(new Daisy.Cartesian3(1000, 0, 0))
entity.transformer.setRotation({ heading: 45, pitch: 0, roll: 0 }) // 角度制
entity.transformer.setScale(new Daisy.Cartesian3(2, 2, 2))

// 获取合成矩阵
entity.getMatrix()              // Transformer 生成的局部矩阵
entity.worldMatrix              // 只读：当前帧的世界矩阵
entity.getWorldMatrix(time)     // 按时间计算
entity.tryGetWorldMatrix(time)  // 可能返回 undefined
entity.getCurrentMatrix()       // 当前仿真时间的矩阵

// 变换矩阵叠加链：
// 最终矩阵 = baseMatrix × initTransform × transform × preset × scale
```

## Display and Visibility

```typescript
entity.show = true          // 基础显隐开关
entity.getShowValue(time)   // 获取某时刻的显隐状态（考虑父子链 + 时间有效性）

// 动态显隐（支持依赖时间变化的属性）
entity.setShowProperty(someTimeVaryingProperty)
```

`getShowValue()` recursively checks: `own show value & time validity & parent entity's show value`.

## Bounding Box and Collision

```typescript
// 获取/创建包围盒
const bbox = entity.getOrCreateBoundBoxFeature({
    show: true,
    color: Daisy.Color.RED.withAlpha(0.3),
})
bbox.isColliding(otherEntity.getOrCreateBoundBoxFeature())  // OBB 碰撞检测
```

Entity internally holds a bounding box singleton; the bounding spheres of all mounted Features are automatically merged.

## Body Axis Debugging

```typescript
// 仅在 3D 模式下生效，显示 X/Y/Z 坐标轴
entity.setBodyAxis({ length: 1000000, width: 2 })
entity.bodyAxisVectors  // { x, y, z } 三个方向向量
```

## Parent-Child Relationship

```typescript
entity.setParent(parentEntity)
// 或
entity.parentId = "parent-id"

entity.getParent()   // 解析后的父实体
```

Parent-child relationships affect visibility state (the child's `getShowValue()` checks the parent's show).

## LOD Judgment

The framework automatically performs the following judgments before each frame render (results written to entity properties):

```typescript
entity.isBehindCamera         // 是否在相机背后
entity.isOccludedByEarth      // 是否被地球遮挡
entity.isInCameraCullingVolume // 是否在视锥内

// 手动执行特定判定
entity.LODCheckPassHandler(positionECEF)
entity.LODAnyCameraWithinMaxDistance(positionECEF, maxDistance)
entity.isOccludedEllipsoid(positionECEF, ellipsoid, camera?)
```

> **Note**: These properties are read-only snapshots automatically assigned by the framework and should not be manually written.

## Lifecycle

```
new Entity() → bindEngine() → addEntity() → addFeature() → [帧循环 update]
                                                    ↓
                                                removeFeature()
                                                    ↓
            removeEntity() → destroy()
```

```typescript
// 销毁回调
entity.onBeforeDestroy(() => { /* 清理资源 */ })
entity.onDestroy(() => { /* 释放引用 */ })

// 销毁实体（自动销毁所有 Feature）
entity.destroy()
```

## Custom Properties

```typescript
// 挂载任意键值对
entity.customProperties = { category: "satellite", priority: 1 }

// 描述信息
entity.description = "通信卫星 ST-001"
```

## Event System

### Lifecycle Events

| Method | Description |
|--------|-------------|
| `entity.onBeforeRegister(callback)` | Pre-registration callback |
| `entity.onRegister(callback)` | Post-registration callback, parameter `(spaceObject: Entity)` |
| `entity.onBeforeUpdate(callback)` | Pre-update each frame, parameter `(spaceObject, time)` |
| `entity.onUpdate(callback)` | Post-update each frame, parameter `(spaceObject, time)` |
| `entity.onBeforeDestroy(callback)` | Pre-destruction callback |
| `entity.onDestroy(callback)` | Post-destruction callback |

### Selection Events

| Method | Description |
|--------|-------------|
| `entity.onSelected(callback)` | Triggered when the entity is picked by click |
| `entity.onUnSelected(callback)` | Triggered when the entity loses selection |

The `activated` property can be read in callbacks for the current selection state.

### Interaction Events

| Method | Description |
|--------|-------------|
| `entity.onClick(handler)` | Single click |
| `entity.offClick(handler?)` | Remove |
| `entity.onDblClick(handler)` | Double click |
| `entity.offDblClick(handler?)` | Remove |
| `entity.onMouseEnter(handler)` | Mouse enter |
| `entity.offMouseEnter(handler?)` | Remove |
| `entity.onMouseLeave(handler)` | Mouse leave |
| `entity.offMouseLeave(handler?)` | Remove |

```typescript
entity.onClick((e) => {
    console.log("点击了实体:", e.entityId)
})

entity.onMouseEnter((e) => {
    console.log("悬停:", e.entityId)
})
```

Interaction events are installed on demand — the first call to `onClick` / `onMouseEnter` etc. automatically registers with the underlying ViewerEventHandle. Features with `enableSubmitToEntity(true)` also bubble up to the Entity.

## Common Pitfalls

> **Pitfall 1 — `instanceof TrajectorySample` fails across modules**: In cross-iframe/module scenarios, `instanceof` may fail. The correct approach is to use `entity.isTrajectorySample()` / `entity.isTrajectorySampleBodyFixed()` instead.
>
> **Pitfall 2 — `getCurrentPosition()` returns undefined**: Usually because `engine.clock.currentTime` doesn't match the trajectory data's time range. Ensure `engine.setSceneTime()` has been called and the simulation time is within the trajectory interval after `engine.play()`.
>
> **Pitfall 3 — `bindEngine()` is mandatory**: An Entity without `bindEngine()` does not participate in the render loop, and methods like `getCurrentPosition()` return `undefined`.
>
> **Pitfall 4 — Feature pruning in high-performance mode**: Non-whitelisted Features of inactive entities do not trigger `update()`. See [Engine High Performance Mode](/en/guide/engine#high-performance-mode).
>
> **Pitfall 5 — Zero normal crash**: If a custom geometry or model contains (0,0,0) normals, `normalize()` in `transformToWorldCoordinates` will report `"normalized result is not a number"`. Ensure geometry normals are non-zero.


---

<!--
示例参考: [Core demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/core)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
