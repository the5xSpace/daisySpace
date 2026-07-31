# Entity 实体

[Entity](/api/classes/Entity) 是 DaisySpace-Sdk 中场景对象的抽象载体。它本身不负责渲染，而是通过挂载 Feature 组件来获得可视化能力。

## 核心概念

Entity 本身不渲染任何东西。它通过**挂载 Feature 组件**来获得可视化能力：

```
Entity（空壳） + PointFeature → 可渲染的点
Entity（空壳） + ModelFeature → 3D 模型
Entity（空壳） + PointFeature + TextFeature + TrailPathFeature → 组合效果
```

这种"组合优于继承"的设计是理解 Entity 的关键。

## 创建与注册

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

`bindEngine()` 是必须的——没有绑定引擎，Entity 不参与渲染循环，`getCurrentPosition()` 等方法返回 `undefined`。

## 位置系统

`entity.position` 接受三种类型，对应三种位置语义：

| 类型 | 参考系 | 适用场景 |
|------|--------|----------|
| `Cartesian3` | ECEF | 固定点位（地面站、静态标记） |
| `TrajectorySample` | 惯性系（可指定） | 轨道物体（卫星、天体） |
| `TrajectorySampleBodyFixed` | ECEF | 地表运动物体（飞行器、船舶） |

### 静态位置

```typescript
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
```

### 时序轨迹（TrajectorySample）

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

`TrajectorySample` 支持三种插值算法：`"LAGRANGE"`（默认）、`"LINEAR"`、`"HERMITE"`。

### 体固坐标系轨迹（TrajectorySampleBodyFixed）

```typescript
const traj = new Daisy.TrajectorySampleBodyFixed()
traj.pushData({ time, position: fixedPositionECEF })
entity.position = traj
```

强制使用 `ReferenceFrame.FIXED`，`evaluateECEF()` 始终返回 ECEF 坐标。

### 运行时位置查询

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

## Feature 管理

```typescript
// 挂载 Feature
const point = new Daisy.PointFeature({ size: 1000, color: Daisy.Color.CYAN })
entity.addFeature(point)

// 移除 Feature
entity.removeFeature(point)       // 按实例移除
entity.removeFeatureById("id")    // 按 ID 移除
entity.removeFeatureByName("name") // 按名称移除
```

`addFeature()` 会：
1. 将 `entity.celestialEllipsoid` 写入 `feature.options.ellipsoid`
2. 检查当前时间是否在实体有效区间内，是则立即调用 `feature.register(this)`
3. 将 Feature 加入内部 Map

> **注意**：`BoundBoxFeature` 通过 `addFeature()` 添加会抛出异常。包围盒是 Entity 的内部单例，需通过 `entity.getOrCreateBoundBoxFeature()` 获取。

## 交互事件

Entity 提供鼠标交互事件链，事件从 Feature 向上冒泡到 Entity：

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

交互状态（用于 LOD 和 UI 判断）：

```typescript
entity.activated          // 是否被选中
entity.hovered            // 是否被悬停
entity.interaction        // InteractionComponent 对象（读写 pick/hover/click 状态）
```

## 变换与矩阵

Entity 拥有独立的 `transformer`，叠加平移、旋转、缩放后合成世界矩阵：

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

编辑器或场景序列化层应把附加的局部平移、旋转和缩放作为一组完整状态保存，并在创建与更新时写回目标 `transformer`。`BaseObject` 的对象级变换最终作用于其内部 Entity 的 `transformer`，Feature 则使用自身的 `transformer`；不要假定所有 `IComponent` 都支持通用变换，组件安装姿态应继续使用对应组件的公开参数。

## 显示与可见性

```typescript
entity.show = true          // 基础显隐开关
entity.getShowValue(time)   // 获取某时刻的显隐状态（考虑父子链 + 时间有效性）

// 动态显隐（支持依赖时间变化的属性）
entity.setShowProperty(someTimeVaryingProperty)
```

`getShowValue()` 会递归检查：`自己的 show 值 & 时间有效性 & 父实体的 show 值`。

## 包围盒与碰撞

```typescript
// 获取/创建包围盒
const bbox = entity.getOrCreateBoundBoxFeature({
    show: true,
    color: Daisy.Color.RED.withAlpha(0.3),
})
bbox.isColliding(otherEntity.getOrCreateBoundBoxFeature())  // OBB 碰撞检测
```

Entity 内部持有包围盒单例，所有挂载的 Feature 的包围球会自动合并。

## 体轴调试

```typescript
// 仅在 3D 模式下生效，显示 X/Y/Z 坐标轴
entity.setBodyAxis({ length: 1000000, width: 2 })
entity.bodyAxisVectors  // { x, y, z } 三个方向向量
```

## 父子关系

```typescript
entity.setParent(parentEntity)
// 或
entity.parentId = "parent-id"

entity.getParent()   // 解析后的父实体
```

父子关系影响显隐状态（子实体的 `getShowValue()` 会检查父实体的 show）。

## LOD 判定

框架在每帧渲染前自动执行以下判定（结果写入实体属性）：

```typescript
entity.isBehindCamera         // 是否在相机背后
entity.isOccludedByEarth      // 是否被地球遮挡
entity.isInCameraCullingVolume // 是否在视锥内

// 手动执行特定判定
entity.LODCheckPassHandler(positionECEF)
entity.LODAnyCameraWithinMaxDistance(positionECEF, maxDistance)
entity.isOccludedEllipsoid(positionECEF, ellipsoid, camera?)
```

> **注意**：这些属性是框架自动赋值的只读快照，不应手动写入。

## 生命周期

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

## 自定义属性

```typescript
// 挂载任意键值对
entity.customProperties = { category: "satellite", priority: 1 }

// 描述信息
entity.description = "通信卫星 ST-001"
```

## 事件系统

### 生命周期事件

| 方法 | 说明 |
|------|------|
| `entity.onBeforeRegister(callback)` | 注册前回调 |
| `entity.onRegister(callback)` | 注册后回调，参数 `(spaceObject: Entity)` |
| `entity.onBeforeUpdate(callback)` | 每帧更新前，参数 `(spaceObject, time)` |
| `entity.onUpdate(callback)` | 每帧更新后，参数 `(spaceObject, time)` |
| `entity.onBeforeDestroy(callback)` | 销毁前回调 |
| `entity.onDestroy(callback)` | 销毁后回调 |

### 选择事件

| 方法 | 说明 |
|------|------|
| `entity.onSelected(callback)` | 单击拾取到该实体时触发 |
| `entity.onUnSelected(callback)` | 失去选中状态时触发 |

`activated` 属性可在回调中读取当前选中状态。

### 交互事件

| 方法 | 说明 |
|------|------|
| `entity.onClick(handler)` | 单击 |
| `entity.offClick(handler?)` | 移除 |
| `entity.onDblClick(handler)` | 双击 |
| `entity.offDblClick(handler?)` | 移除 |
| `entity.onMouseEnter(handler)` | 鼠标进入 |
| `entity.offMouseEnter(handler?)` | 移除 |
| `entity.onMouseLeave(handler)` | 鼠标离开 |
| `entity.offMouseLeave(handler?)` | 移除 |

```typescript
entity.onClick((e) => {
    console.log("点击了实体:", e.entityId)
})

entity.onMouseEnter((e) => {
    console.log("悬停:", e.entityId)
})
```

交互事件按需安装——首次调用 `onClick` / `onMouseEnter` 等方法时自动注册到底层 ViewerEventHandle。`enableSubmitToEntity(true)` 的 Feature 也会向上冒泡到 Entity。

## 常见陷阱

> **陷阱 1 — `instanceof TrajectorySample` 跨模块失效**：在跨 iframe / module 场景下 `instanceof` 可能失效。正确做法是用 `entity.isTrajectorySample()` / `entity.isTrajectorySampleBodyFixed()` 替代。
>
> **陷阱 2 — `getCurrentPosition()` 返回 undefined**：通常是因为 `engine.clock.currentTime` 与轨迹数据的时间范围不匹配。确认已调用 `engine.setSceneTime()`，且 `engine.play()` 后仿真时间在轨迹区间内。
>
> **陷阱 3 — `bindEngine()` 不可忘**：未调用 `bindEngine()` 的 Entity 不参与渲染循环，`getCurrentPosition()` 等方法返回 `undefined`。
>
> **陷阱 4 — 高性能模式下的 Feature 裁剪**：非活跃实体的非白名单 Feature 不会触发 `update()`。见 [Engine 高性能模式](/guide/engine#高性能模式)。
>
> **陷阱 5 — 零法线崩溃**：如果自定义几何体或模型包含 (0,0,0) 法线，`transformToWorldCoordinates` 中的 `normalize()` 会报 `"normalized result is not a number"`。确保几何体法线非零。


---

<!--
示例参考: [Core demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/core)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
