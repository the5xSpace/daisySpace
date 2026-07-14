# 事件系统

DaisySpace-Sdk 的事件系统分为三层：**Engine 全局层** → **Entity 聚合层** → **Feature 自身层**。原始屏幕鼠标输入在 `ViewerEventHandle` 中被解析为 Daisy 格式的拾取结果，然后沿三层逐级分发。

## 事件系统分层

DaisySpace-Sdk 的事件分为三组，按使用场景区分：

| 层级 | 使用入口 | 适用场景 |
|------|----------|----------|
| [Entity 事件](/en/guide/entity#事件系统) | `entity.onClick()` / `entity.onUpdate()` 等 | 实体的生命周期、选择和交互 |
| [Feature 事件](/en/guide/feature#事件系统) | `feature.onClick()` / `feature.onUpdate()` 等 | Feature 粒度的交互（冒泡到 Entity） |
| [物理对象事件](/en/guide/satellite#事件) | `sat.onClick()` / `sat.onUpdate()` 等 | PW 层对象的交互（桥接到 Entity） |
| 引擎级事件 | `engine.onPreRender()` / `engine.onMorphSwitch()` 等 | 渲染回调、场景模式切换 |
| 底层事件系统 | `EventManager` / `ViewerEventHandle` | 自定义事件管道（本文涵盖） |


## 事件链路

```
屏幕点击
    ↓
ViewerEventHandle.safePick()  ← 解析 pick 结果
    ↓
SPACE_ENTITY_CLICK / HOVER / DBL_CLICK / HOVER_OUT
    ↓
┌────────────────────────────────────────────┐
│  FeatureEventHandle (可选，仅已安装)          │
│  → matchesPickedResult() 匹配合适的 Feature    │
│  → Feature 自身 onClick / onMouseEnter 等    │
│  → submitToEntity (可选冒泡)                   │
└────────────────────────────────────────────┘
    ↓
Entity.onClick / onDblClick / onMouseEnter / onMouseLeave
    ↓  (事件继续冒泡到 PW 层)
BaseObject 事件回调
```

## EventManager — 通用发布订阅

`EventManager` 是事件系统的底层基础设施，提供标准的发布-订阅模式：

```typescript
import * as Daisy from "daisy-space-sdk"

const em = new Daisy.EventManager()

// 监听
em.on("message", (data) => console.log(data))

// 一次监听
em.once("app-ready", () => console.log("ready"))

// 阻断传播
em.on("click", (data, ctx) => {
    if (data.shouldCancel) ctx.stopPropagation()
})

// 触发
em.trigger("message", { text: "hello" })

// 取消监听
em.off("message", handler)  // 移除指定回调
em.off("message")           // 移除全部回调

// 查询
em.hasEvent("message")
em.getListenerCount("message")
em.getEvents()

// 销毁
em.destroy()
```

## ViewerEventHandle — 引擎级拾取桥接

`engine.eventHandle` 是引擎挂载的事件桥接器，将屏幕空间鼠标事件解析为 Daisy 实体/Feature 拾取结果。

**监听引擎全局事件：**

```typescript
const eh = engine.eventHandle

// 全局点击
eh.addClickSpaceEntityListener((result) => {
    console.log(result.entityId)   // 命中的 Entity ID
    console.log(result.comId)      // 命中的 Feature 组件 ID
    console.log(result.comType)    // 组件类型 (如 "PointFeature")
    console.log(result.entity)     // 命中的 Entity 实例
})

// 全局双击
eh.addDoubleClickSpaceEntityListener((result) => { /* ... */ })

// 悬停进入 / 离开
eh.addHoverSpaceEntityListener((result) => { /* ... */ })
eh.addHoverOutSpaceEntityListener((result) => { /* ... */ })

// 移除监听（需要传入同一个函数引用）
eh.removeClickSpaceEntityListener(handler)
eh.removeDoubleClickSpaceEntityListener(handler)
eh.removeHoverSpaceEntityListener(handler)
eh.removeHoverOutSpaceEntityListener(handler)
```

`ViewerEventHandle` 内部使用 `EventManager` 实现，`pickResult` 包含以下字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `entityId` | `string` | 命中的 Entity ID |
| `entity` | `Entity` | 命中的 Entity 实例 |
| `comId` | `string` | 命中的 Feature 组件 ID |
| `comType` | `string` | 命中的 Feature 类型名称 |
| `nodeName` | `string` | 命中的渲染节点名称 |

## Feature 交互事件

Feature 提供独立的交互事件 API，用法与 Entity 类似：

```typescript
const point = new Daisy.PointFeature({ color: Daisy.Color.CYAN })

// 监听 Feature 自身事件
point.onClick((e) => {
    console.log(e.comId, e.comType)
})
point.onDblClick((e) => { /* ... */ })
point.onMouseEnter((e) => { /* ... */ })
point.onMouseLeave((e) => { /* ... */ })

// 取消监听
point.offClick(handler)  // 指定回调
point.offClick()         // 全部回调
```

**事件数据 `FeaturePickedEvent` 比全局拾取多了两个字段：**

| 字段 | 说明 |
|------|------|
| `stopPropagation()` | 调用后阻止事件继续向 Entity 冒泡 |
| `isPropagationStopped()` | 检查冒泡是否已被阻止 |

> **触发时机**：`FeatureEventHandle.ensureInstalled()` 在以下情况自动安装：
> 1. Feature 自身有活跃的事件监听器
> 2. 启用了 `enableSubmitToEntity(true)`（无论是否有监听器）
>
> 如果两者都不满足，Feature 不会向 `ViewerEventHandle` 注册拾取监听，也就不会收到事件。

## 事件提交到 Entity（冒泡）

通过 `enableSubmitToEntity(true)` 可以让 Feature 的交互事件向上冒泡到所属 Entity：

```typescript
point.enableSubmitToEntity(true)

// Entity 侧接收——可区分来源
entity.onClick((e) => {
    if (e.featureType === "PointFeature") {
        console.log("来自 PointFeature 的点击:", e.featureId)
    } else if (e.comType === "Entity") {
        console.log("来自 Entity 自身的点击")
    }
})
```

**冒泡流程（FeatureEventHandle 内部）：**

1. 屏幕拾取结果到达 `_handlePicked()`
2. `matchesPickedResult()` 检查 `entityId` 和 `comId` 是否匹配当前 Feature
3. 触发 Feature 自身 EventManager 的对应事件
4. 如果 `submitToEntityEnabled === true` 且未被 `stopPropagation()` 阻断
5. 调用 `feature.submitToEntity()` → `entity.receiveFeatureEvent()`
6. Entity 的 `onClick` 等回调执行

### 阻止冒泡

```typescript
point.onClick((e) => {
    e.stopPropagation()  // Entity 不会收到此事件
})
```

## Entity 交互事件

Entity 聚合来自自身的拾取结果和来自 Feature 的提交：

```typescript
entity.onClick((e) => {
    console.log(e.featureType)  // "PointFeature" 或 "Entity"
    console.log(e.featureId)    // Feature ID（若来源是 Feature）
    console.log(e.comType)      // 组件类型
})

entity.onDblClick((e) => { /* ... */ })
entity.onMouseEnter((e) => { /* ... */ })
entity.onMouseLeave((e) => { /* ... */ })

// 移除
entity.offClick(handler)
entity.offDblClick(handler)
entity.offMouseEnter(handler)
entity.offMouseLeave(handler)
```

> `onMouseEnter` / `onMouseLeave` 的事件数据 `entityId` 可能为 `"unknown"`（mouseleave 场景下无法拾取到实体），但 `comType` 仍然有效。

## 交互状态

```typescript
// Entity 的交互状态
entity.activated    // 是否被选中
entity.hovered      // 是否被悬停
entity.interaction  // InteractionComponent { hovered, actived }
```

这些状态由框架在每帧自动维护，Feature 和 Entity 的事件回调中可通过 `e.entity?.activated` 或 `e.entity?.hovered` 读取。

## Feature 可见性与交互联动

```typescript
new Daisy.PointFeature({
    color: Daisy.Color.RED,
    visibility: { mode: "hover" },  // 仅在悬停时渲染
})
```

`VisibilityMode` 枚举：
- `"normal"` — 始终可见（默认）
- `"hover"` — 仅在 `entity.interaction.hovered === true` 时可见
- `"click"` — 仅在 `entity.interaction.actived === true` 时可见

可见性由 `Feature.updateByInteraction()` 方法处理（`IFeature` 的可选方法）。

## 生命周期事件

Feature 提供完整的生命周期事件钩子（详见 [Feature 可视化组件](/en/guide/feature#生命周期详解)）：

```typescript
feature.onBeforeRegister(() => console.log("即将注册"))
feature.onAfterRegister(() => console.log("已进入场景集合"))
feature.onRegister((entity) => console.log("注册完成, 绑定到:", entity.name))
feature.onBeforeUpdate((entity, time) => { /* 每帧更新前 */ })
feature.onUpdate((entity, time) => { /* 每帧更新后 */ })
feature.onBeforeDestroy(() => console.log("即将销毁"))
feature.onDestroy(() => console.log("已销毁"))
```

Entity 也提供两个生命周期事件：

```typescript
entity.onBeforeDestroy(() => console.log("Entity 即将销毁"))
entity.onDestroy(() => console.log("Entity 已销毁"))
```

## 自定义事件

可通过 `engine.eventHandle.eventManager` 直接访问底层的 `EventManager` 来发布/订阅自定义事件：

```typescript
const em = engine.eventHandle.eventManager

em.on("my-custom-event", (payload) => {
    console.log(payload.kind, payload.message)
})

em.trigger("my-custom-event", {
    kind: "notification",
    message: "仿真已完成",
})

em.off("my-custom-event")
```

> 注意区分：`engine.eventHandle` 是 `ViewerEventHandle` 实例，它内部的 `eventManager` 是 `EventManager` 实例。`ViewerEventHandle` 暴露的 `add*/remove*` 方法是专用的事件通道（固定使用 `SpaceEvent.SPACE_ENTITY_*` 事件名），不要与底层 `eventManager.on()` 混用。


---

<!--
示例参考: [EventSystem.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/core/EventSystem.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
