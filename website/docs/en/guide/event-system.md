# Event System

DaisySpace-Sdk's event system is divided into three layers: **Engine global layer** → **Entity aggregation layer** → **Feature self layer**. Raw screen mouse input is parsed into Daisy-format pick results in `ViewerEventHandle`, then distributed layer by layer.

## Event System Layers

DaisySpace-Sdk's events are divided into three groups by usage scenario:

| Layer | Entry Point | Use Case |
|-------|-------------|----------|
| [Entity Events](/en/guide/entity#event-system) | `entity.onClick()` / `entity.onUpdate()` etc. | Entity lifecycle, selection, and interaction |
| [Feature Events](/en/guide/feature#event-system) | `feature.onClick()` / `feature.onUpdate()` etc. | Feature-level interaction (bubbles to Entity) |
| [Physical Object Events](/en/guide/satellite#events) | `sat.onClick()` / `sat.onUpdate()` etc. | PW layer object interaction (bridged to Entity) |
| Engine-level events | `engine.onPreRender()` / `engine.onMorphSwitch()` etc. | Render callbacks, scene mode switching |
| Low-level event system | `EventManager` / `ViewerEventHandle` | Custom event pipeline (covered in this document) |


## Event Chain

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

## EventManager — General Pub-Sub

`EventManager` is the low-level infrastructure of the event system, providing a standard publish-subscribe pattern:

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

## ViewerEventHandle — Engine-Level Pick Bridge

`engine.eventHandle` is the event bridge mounted on the engine, parsing screen-space mouse events into Daisy entity/Feature pick results.

**Listening to engine global events:**

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

`ViewerEventHandle` is implemented internally using `EventManager`. `pickResult` contains the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `entityId` | `string` | Hit Entity ID |
| `entity` | `Entity` | Hit Entity instance |
| `comId` | `string` | Hit Feature component ID |
| `comType` | `string` | Hit Feature type name |
| `nodeName` | `string` | Hit render node name |

## Feature Interaction Events

Features provide an independent interaction event API, similar in usage to Entity:

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

**Event data `FeaturePickedEvent` adds two more fields compared to global pick:**

| Field | Description |
|-------|-------------|
| `stopPropagation()` | Prevents the event from continuing to bubble to the Entity |
| `isPropagationStopped()` | Checks if propagation has been stopped |

> **Trigger timing**: `FeatureEventHandle.ensureInstalled()` auto-installs in the following cases:
> 1. The Feature has active event listeners
> 2. `enableSubmitToEntity(true)` is enabled (regardless of listeners)
>
> If neither condition is met, the Feature does not register a pick listener with `ViewerEventHandle` and thus will not receive events.

## Event Submission to Entity (Bubbling)

Using `enableSubmitToEntity(true)` allows Feature interaction events to bubble up to its parent Entity:

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

**Bubbling flow (FeatureEventHandle internal):**

1. Screen pick result arrives at `_handlePicked()`
2. `matchesPickedResult()` checks if `entityId` and `comId` match the current Feature
3. Triggers the corresponding event on the Feature's own EventManager
4. If `submitToEntityEnabled === true` and not blocked by `stopPropagation()`
5. Calls `feature.submitToEntity()` → `entity.receiveFeatureEvent()`
6. Entity's `onClick` etc. callbacks execute

### Preventing Bubbling

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

> `onMouseEnter` / `onMouseLeave` event data may have `entityId` as `"unknown"` (in mouseleave scenarios where the entity cannot be picked), but `comType` is still valid.

## Interaction State

```typescript
// Entity 的交互状态
entity.activated    // 是否被选中
entity.hovered      // 是否被悬停
entity.interaction  // InteractionComponent { hovered, actived }
```

These states are automatically maintained by the framework each frame. In Feature and Entity event callbacks, they can be accessed via `e.entity?.activated` or `e.entity?.hovered`.

## Feature Visibility and Interaction Linkage

```typescript
new Daisy.PointFeature({
    color: Daisy.Color.RED,
    visibility: { mode: "hover" },  // 仅在悬停时渲染
})
```

`VisibilityMode` enum:
- `"normal"` — Always visible (default)
- `"hover"` — Only visible when `entity.interaction.hovered === true`
- `"click"` — Only visible when `entity.interaction.actived === true`

Visibility is handled by the `Feature.updateByInteraction()` method (optional method of `IFeature`).

## Lifecycle Events

Features provide complete lifecycle event hooks (see [Feature Visualization Component](/en/guide/feature#lifecycle-details) for details):

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

You can directly access the underlying `EventManager` via `engine.eventHandle.eventManager` to publish/subscribe to custom events:

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

> Note the distinction: `engine.eventHandle` is a `ViewerEventHandle` instance, and its internal `eventManager` is an `EventManager` instance. The `add*/remove*` methods exposed by `ViewerEventHandle` are dedicated event channels (fixed using `SpaceEvent.SPACE_ENTITY_*` event names) and should not be mixed with the underlying `eventManager.on()`.


---

<!--
示例参考: [EventSystem.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/core/EventSystem.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
