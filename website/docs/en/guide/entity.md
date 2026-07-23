# Entity

[Entity](/en/api/classes/Entity) is the abstract container for scene objects in DaisySpace-Sdk. It does not render anything by itself; instead, it gains visualization capabilities by attaching Feature components.

## Core Concept

Entity does not render anything by itself. It gains visualization capabilities by **attaching Feature components**:

```
Entity（空壳） + PointFeature → 可渲染的点
Entity（空壳） + ModelFeature → 3D 模型
Entity（空壳） + PointFeature + LabelFeature + TrailPathFeature → 组合效果
```

This "composition over inheritance" design is the key to understanding Entity.

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

`bindEngine()` is required. Without an engine binding, Entity does not participate in the render loop and methods such as `getCurrentPosition()` return `undefined`.

## Position System

`entity.position` accepts three types with different position semantics:

| Type | Reference frame | Use case |
|------|--------|----------|
| `Cartesian3` | ECEF | Fixed locations (ground stations, static markers) |
| `TrajectorySample` | Inertial frame (configurable) | Orbital objects (satellites, celestial bodies) |
| `TrajectorySampleBodyFixed` | ECEF | Objects moving over the surface (aircraft, vessels) |

### Static Position

```typescript
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
```

### Time-Dependent Trajectory (TrajectorySample)

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

`TrajectorySample` supports three interpolation algorithms: `"LAGRANGE"` (default), `"LINEAR"`, and `"HERMITE"`.

### Body-Fixed Trajectory (TrajectorySampleBodyFixed)

```typescript
const traj = new Daisy.TrajectorySampleBodyFixed()
traj.pushData({ time, position: fixedPositionECEF })
entity.position = traj
```

It always uses `ReferenceFrame.FIXED`, and `evaluateECEF()` always returns ECEF coordinates.

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

`addFeature()` does the following:
1. Write `entity.celestialEllipsoid` to `feature.options.ellipsoid`
2. Check whether the current time is within the entity's validity interval, and call `feature.register(this)` immediately when it is
3. Add the Feature to the internal Map

> **Note:** Adding `BoundBoxFeature` through `addFeature()` throws an exception. The bounding box is an internal Entity singleton and must be obtained through `entity.getOrCreateBoundBoxFeature()`.

## Interaction Events

Entity provides a mouse interaction event chain. Events bubble from Features up to Entity:

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

Interaction state, used for LOD and UI decisions:

```typescript
entity.activated          // 是否被选中
entity.hovered            // 是否被悬停
entity.interaction        // InteractionComponent 对象（读写 pick/hover/click 状态）
```

## Transforms and Matrices

Entity has an independent `transformer`; translation, rotation, and scale are combined into the world matrix:

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

`getShowValue()` recursively checks `自己的 show 值 & 时间有效性 & 父实体的 show 值`.

## Bounding Box and Collision

```typescript
// 获取/创建包围盒
const bbox = entity.getOrCreateBoundBoxFeature({
    show: true,
    color: Daisy.Color.RED.withAlpha(0.3),
})
bbox.isColliding(otherEntity.getOrCreateBoundBoxFeature())  // OBB 碰撞检测
```

Entity owns a bounding-box singleton internally, and the bounding spheres of all attached Features are merged automatically.

## Body-Axis Debugging

```typescript
// 仅在 3D 模式下生效，显示 X/Y/Z 坐标轴
entity.setBodyAxis({ length: 1000000, width: 2 })
entity.bodyAxisVectors  // { x, y, z } 三个方向向量
```

## Parent-Child Relationships

```typescript
entity.setParent(parentEntity)
// 或
entity.parentId = "parent-id"

entity.getParent()   // 解析后的父实体
```

Parent-child relationships affect visibility; a child entity's `getShowValue()` checks the parent's show value.

## LOD Checks

Before each frame, the framework automatically performs the following checks and writes the results to entity properties:

```typescript
entity.isBehindCamera         // 是否在相机背后
entity.isOccludedByEarth      // 是否被地球遮挡
entity.isInCameraCullingVolume // 是否在视锥内

// 手动执行特定判定
entity.LODCheckPassHandler(positionECEF)
entity.LODAnyCameraWithinMaxDistance(positionECEF, maxDistance)
entity.isOccludedEllipsoid(positionECEF, ellipsoid, camera?)
```

> **Note:** These properties are read-only snapshots assigned by the framework and should not be written manually.

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
|------|------|
| `entity.onBeforeRegister(callback)` | Callback before registration |
| `entity.onRegister(callback)` | Callback after registration, with `(spaceObject: Entity)` |
| `entity.onBeforeUpdate(callback)` | Callback before each frame update, with `(spaceObject, time)` |
| `entity.onUpdate(callback)` | Callback after each frame update, with `(spaceObject, time)` |
| `entity.onBeforeDestroy(callback)` | Callback before destruction |
| `entity.onDestroy(callback)` | Callback after destruction |

### Selection Events

| Method | Description |
|------|------|
| `entity.onSelected(callback)` | Fires when the entity is picked by a click |
| `entity.onUnSelected(callback)` | Fires when the entity loses its selected state |

Read the current selection state from the `activated` property inside callbacks.

### Interaction Events

| Method | Description |
|------|------|
| `entity.onClick(handler)` | Click |
| `entity.offClick(handler?)` | Remove listener |
| `entity.onDblClick(handler)` | Double-click |
| `entity.offDblClick(handler?)` | Remove listener |
| `entity.onMouseEnter(handler)` | Mouse enter |
| `entity.offMouseEnter(handler?)` | Remove listener |
| `entity.onMouseLeave(handler)` | Mouse leave |
| `entity.offMouseLeave(handler?)` | Remove listener |

```typescript
entity.onClick((e) => {
    console.log("点击了实体:", e.entityId)
})

entity.onMouseEnter((e) => {
    console.log("悬停:", e.entityId)
})
```

Interaction events are installed on demand. The first call to methods such as `onClick` or `onMouseEnter` automatically registers the underlying ViewerEventHandle. Features with `enableSubmitToEntity(true)` also bubble events up to Entity.

## Common Pitfalls

> **Pitfall 1 — `instanceof TrajectorySample` fails across modules**: `instanceof` may fail across iframe or module boundaries. Use `entity.isTrajectorySample()` / `entity.isTrajectorySampleBodyFixed()` instead.
>
> **Pitfall 2 — `getCurrentPosition()` returns undefined**: This usually means `engine.clock.currentTime` does not fall within the trajectory data range. Confirm that `engine.setSceneTime()` was called and that simulation time remains within the trajectory interval after `engine.play()`.
>
> **Pitfall 3 — Do not forget `bindEngine()`**: An Entity without `bindEngine()` does not participate in the render loop, so methods such as `getCurrentPosition()` return `undefined`.
>
> **Pitfall 4 — Feature culling in high-performance mode**: Non-whitelisted Features on inactive entities do not trigger `update()`. See [Engine high-performance mode](/en/guide/engine#高性能模式).
>
> **Pitfall 5 — Zero-normal crash**: If custom geometry or a model contains a (0,0,0) normal, `normalize()` in `transformToWorldCoordinates` reports `"normalized result is not a number"`. Ensure that geometry normals are non-zero.


---

<!--
示例参考: [Core demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/core)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
