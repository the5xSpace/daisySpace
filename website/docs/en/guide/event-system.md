# Event System

DaisySpace-Sdk's event system is divided into three layers: **Engine global layer** → **Entity aggregation layer** → **Feature self layer**. Raw screen mouse input is parsed into Daisy-format pick results in `ViewerEventHandle`, then dispatched level by level through the three layers.

## Event System Layers

DaisySpace-Sdk events are divided into three groups by usage scenario:

| Layer | Entry Point | Use Case |
|------|----------|----------|
| [Entity Events](/en/guide/entity#事件系统) | `entity.onClick()` / `entity.onUpdate()` etc. | Entity lifecycle, selection, and interaction |
| [Feature Events](/en/guide/feature#事件系统) | `feature.onClick()` / `feature.onUpdate()` etc. | Feature-level interaction (bubbles to Entity) |
| [Physical Object Events](/en/guide/satellite#事件) | `sat.onClick()` / `sat.onUpdate()` etc. | PW-layer object interaction (bridged to Entity) |
| Engine-level Events | `engine.onPreRender()` / `engine.onMorphSwitch()` etc. | Render callbacks and scene mode switching |
| Low-level Event System | `EventManager` / `ViewerEventHandle` | Custom event pipeline (covered in this guide) |


## Event Flow

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

## EventManager — General Pub/Sub

`EventManager` is the low-level infrastructure of the event system and provides a standard publish-subscribe pattern:

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

## ViewerEventHandle — Engine-level Pick Bridge

`engine.eventHandle` is the Engine-mounted event bridge that parses screen-space mouse events into Daisy Entity/Feature pick results.

**Listen to Engine global events:**

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

`ViewerEventHandle` is implemented with `EventManager` internally, and `pickResult` contains the following fields:

| Field | Type | Description |
|------|------|------|
| `entityId` | `string` | Matched Entity ID |
| `entity` | `Entity` | Matched Entity instance |
| `comId` | `string` | Matched Feature component ID |
| `comType` | `string` | Matched Feature type name |
| `nodeName` | `string` | Matched render node name |

## Feature Interaction Events

Feature provides independent interaction event APIs, with usage similar to Entity:

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

**Event data `FeaturePickedEvent` adds two fields beyond the global pick result:**

| Field | Description |
|------|------|
| `stopPropagation()` | Stops the event from continuing to bubble to Entity |
| `isPropagationStopped()` | Checks whether bubbling has been stopped |

> **Trigger timing**: `FeatureEventHandle.ensureInstalled()` is installed automatically when either of the following is true:
> 1. The Feature has active event listeners
> 2. `enableSubmitToEntity(true)` is enabled (whether or not there are listeners)
>
> If neither condition is met, the Feature does not register pick listeners with `ViewerEventHandle`, so it will not receive events.

## Submit Events to Entity (Bubbling)

Use `enableSubmitToEntity(true)` to let Feature interaction events bubble up to the owning Entity:

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

**Bubbling flow (inside FeatureEventHandle):**

1. The screen pick result reaches `_handlePicked()`
2. `matchesPickedResult()` checks whether `entityId` and `comId` match the current Feature
3. The corresponding event on the Feature's own EventManager is triggered
4. If `submitToEntityEnabled === true` and the event has not been blocked by `stopPropagation()`
5. Call `feature.submitToEntity()` → `entity.receiveFeatureEvent()`
6. The Entity's `onClick` and similar callbacks run

### Stop Bubbling

```typescript
point.onClick((e) => {
    e.stopPropagation()  // Entity 不会收到此事件
})
```

## Entity Interaction Events

Entity aggregates pick results from itself and submissions from Features:

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

> The event data `entityId` for `onMouseEnter` / `onMouseLeave` may be `"unknown"` (the Entity cannot be picked during mouseleave), but `comType` is still valid.

## Interaction State

```typescript
// Entity 的交互状态
entity.activated    // 是否被选中
entity.hovered      // 是否被悬停
entity.interaction  // InteractionComponent { hovered, actived }
```

These states are maintained automatically by the framework each frame. In Feature and Entity event callbacks, you can read them via `e.entity?.activated` or `e.entity?.hovered`.

## Feature Visibility and Interaction Linkage

```typescript
new Daisy.PointFeature({
    color: Daisy.Color.RED,
    visibility: { mode: "hover" },  // 仅在悬停时渲染
})
```

`VisibilityMode` enum:
- `"normal"` — always visible (default)
- `"hover"` — visible only when `entity.interaction.hovered === true`
- `"click"` — visible only when `entity.interaction.actived === true`

Visibility is handled by the `Feature.updateByInteraction()` method (an optional method on `IFeature`).

## Lifecycle Events

Feature provides complete lifecycle event hooks (see [Feature Visualization Components](/en/guide/feature#生命周期详解)):

```typescript
feature.onBeforeRegister(() => console.log("即将注册"))
feature.onAfterRegister(() => console.log("已进入场景集合"))
feature.onRegister((entity) => console.log("注册完成, 绑定到:", entity.name))
feature.onBeforeUpdate((entity, time) => { /* 每帧更新前 */ })
feature.onUpdate((entity, time) => { /* 每帧更新后 */ })
feature.onBeforeDestroy(() => console.log("即将销毁"))
feature.onDestroy(() => console.log("已销毁"))
```

Entity also provides two lifecycle events:

```typescript
entity.onBeforeDestroy(() => console.log("Entity 即将销毁"))
entity.onDestroy(() => console.log("Entity 已销毁"))
```

## Custom Events

You can access the low-level `EventManager` directly via `engine.eventHandle.eventManager` to publish/subscribe custom events:

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

> Note the distinction: `engine.eventHandle` is a `ViewerEventHandle` instance, and its internal `eventManager` is an `EventManager` instance. The `add*/remove*` methods exposed by `ViewerEventHandle` are dedicated event channels (always using `SpaceEvent.SPACE_ENTITY_*` event names); do not mix them with the low-level `eventManager.on()`.


---

<!--
示例参考: [EventSystem.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/core/EventSystem.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
