# Popover

[UI.PopoverFeature](/en/api/classes/UI.PopoverFeature) is a DOM Overlay popup component — it projects HTML elements to the entity's corresponding position in screen coordinates, rather than rendering within the WebGL canvas. It supports multiple trigger modes, anchor directions, distance thresholds, and complete state callbacks.

## Basic Usage

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
```

```typescript
// 使用 CSS 选择器
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: "#my-popover",
    anchorPosition: "top",
    trigger: "click",
}))

// 直接传入 HTMLElement
const el = document.createElement("div")
el.innerHTML = "<strong>自定义内容</strong>"
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: el,
    anchorPosition: "bottom",
    trigger: "hover",
}))
```

## anchorPosition — Anchor Direction

Controls the popup's direction relative to the entity position:

| Value | Description |
|-------|-------------|
| `"top"` | Popup above the entity |
| `"bottom"` | Popup below the entity |
| `"left"` | Popup to the left of the entity |
| `"right"` | Popup to the right of the entity |

## trigger — Trigger Mode

Three trigger modes control the popup's open/close behavior:

### always — Always Visible

The popup stays open after initialization, unaffected by click and keyboard events:

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: createTelemetryPanel(),
    anchorPosition: "top",
    trigger: "always",
    closeOnOutsideClick: false,
    closeOnEsc: false,
}))
```

Suitable for persistent tooltips or task panels that always follow the entity. Setting `closeOnOutsideClick` and `closeOnEsc` to `false` prevents accidental closing.

### click — Click Toggle

Click the entity to open the popup; click again, press ESC, or click the blank area to close:

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: createDetailCard(),
    anchorPosition: "bottom",
    trigger: "click",
    closeOnOutsideClick: true,
    closeOnEsc: true,
}))
```

Suitable for detail panels and interactive information display.

### hover — Hover Display

The popup opens when the mouse enters the entity and closes with a delay after leaving the entity and popup:

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: createPreviewPanel(),
    anchorPosition: "left",
    trigger: "hover",
    hoverDelayMs: 260,
}))
```

The popup itself also maintains a hover state, allowing users to move the mouse into the popup to interact with content.

## maxDistance — Distance Threshold

`maxDistance` controls the maximum distance (meters) at which the popup is visible. When the camera distance exceeds the threshold, the popup auto-hides; when it returns within the threshold, it reappears:

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: el,
    trigger: "always",
    maxDistance: 900_000,     // 900 公里
}))
```

> **Note:** Exceeding the distance threshold only hides the DOM node; the popup's `visible` state (requested visibility) does not change. Distinguishing between "requested visibility" and "actual rendered visibility" is important for debugging.

### Dynamic Threshold Adjustment

```typescript
popover.options = {
    ...popover.options,
    maxDistance: 400_000,
}
eng.triggerUpdateOnce?.()
```

## show() / hide() — API Control

Directly control popup visibility via API, regardless of trigger mode:

```typescript
// 手动打开
popover.show("api")

// 手动关闭
popover.hide("api")

// 切换状态
popover.toggle("api")
```

`show()` and `hide()` accept a reason string parameter, which is passed to the `onVisibilityChange` callback.

## onVisibilityChange — State Callback

Triggered on every visibility change of the popup, with the callback parameters containing the visibility state and the reason for the change:

```typescript
popover.onVisibilityChange((event) => {
    console.log("请求可见:", event.visible)
    console.log("实际渲染:", event.rendered)
    console.log("变更原因:", event.reason)
})
```

### All Reason Codes

| reason | Meaning | Trigger Scenario |
|--------|---------|------------------|
| `initial` | Initialization | Initial state when popup is created |
| `api` | API control | Calling `show()` / `hide()` / `toggle()` |
| `entity-selected` | Entity selected | Auto-show when entity is selected |
| `entity-unselected` | Entity deselected | Auto-hide when entity is deselected |
| `outside-click` | Outside click | Clicking outside the popup and entity |
| `escape` | ESC close | Pressing Escape key |
| `hover-enter` | Hover enter | Mouse entering entity (hover mode) |
| `hover-leave` | Hover leave | Mouse leaving entity and popup (hover mode) |
| `entity-hidden` | Entity hidden | Popup follows when entity is hidden |
| `missing-position` | No position | Entity cannot get a valid position |
| `distance` | Distance hide | Camera distance exceeds `maxDistance` threshold |
| `occluded` | Earth occlusion | Entity is occluded by Earth's surface |
| `offscreen` | Off-screen | Popup projects off-screen |
| `rendered` | Rendered | DOM has been drawn on screen |
| `destroy` | Destroyed | Popup Feature is destroyed |

## Complete Examples

### Persistent Telemetry Panel

```typescript
const content = document.createElement("div")
content.innerHTML = `
    <div style="font-weight:800">SAT-01</div>
    <div style="opacity:0.7">Alt: 550km</div>
    <div style="opacity:0.7">V: 7.8km/s</div>
`

entity.addFeature(new Daisy.UI.PopoverFeature({
    element: content,
    anchorPosition: "top",
    trigger: "always",
    closeOnOutsideClick: false,
    closeOnEsc: false,
    maxDistance: 9_000_000,
    fixedWidth: 200,
    gap: 10,
    backgroundColor: "rgba(12, 16, 24, 0.94)",
    color: "#f4f7fb",
}))
```

### Click Detail Card

```typescript
const card = document.createElement("div")
card.className = "detail-card"
card.innerHTML = `
    <div class="title">地面站 GS-01</div>
    <div class="coords">117.04°E, 39.86°N</div>
    <button class="action-btn">查看详情</button>
`

const popover = new Daisy.UI.PopoverFeature({
    element: card,
    anchorPosition: "bottom",
    trigger: "click",
    closeOnOutsideClick: true,
    closeOnEsc: true,
    maxDistance: 9_000_000,
})

popover.onVisibilityChange((event) => {
    console.log(`[${event.reason}] visible=${event.visible} rendered=${event.rendered}`)
})

entity.addFeature(popover)
```

### Hover Preview

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: createTooltip("目标区域属性"),
    anchorPosition: "left",
    trigger: "hover",
    hoverDelayMs: 260,
    maxDistance: 9_000_000,
}))
```

## ESC Close and Outside Click

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `closeOnEsc` | `boolean` | `true` (click mode) | Close popup on ESC key |
| `closeOnOutsideClick` | `boolean` | `true` (click mode) | Close popup when clicking outside the popup and entity |

For `"always"` mode, it is recommended to set both to `false` to prevent users from accidentally closing persistent panels.

## Entity Selection Integration

PopoverFeature is deeply integrated with entity selection state. When an entity is selected, the popup is automatically shown; when deselected, it is automatically hidden (in `click` and `hover` modes). Additional logic can be executed via `entity.onSelected()` and `entity.onUnSelected()`:

```typescript
entity.onSelected(() => {
    if (!popover.visible) {
        popover.show("api")
    }
})

entity.onUnSelected(() => {
    // 可选：手动保持弹窗打开
    // popover.show("api")
})
```

## Parameter Table

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `element` | `string \| HTMLElement` | — | Bound DOM element (required) |
| `anchorPosition` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Anchor direction |
| `trigger` | `"always" \| "click" \| "hover"` | `"always"` | Trigger mode |
| `show` | `boolean` | — | Initial visibility |
| `maxDistance` | `number` | — | Maximum visible distance (meters) |
| `offsetPx` | `Cartesian2` | — | Pixel offset |
| `gap` | `number` | `0` | Gap between popup and anchor (pixels) |
| `fixedWidth` | `number` | — | Fixed width (pixels) |
| `backgroundColor` | `string` | — | Popup background color |
| `color` | `string` | — | Popup text color |
| `closeOnEsc` | `boolean` | Follows trigger | Whether to close on ESC key |
| `closeOnOutsideClick` | `boolean` | Follows trigger | Whether to close on outside click |
| `hoverDelayMs` | `number` | `120` | Hide delay after leaving in hover mode (ms) |
| `name` | `string` | — | Name |

> **Related API**: [UI.PopoverFeature](/en/api/classes/UI.PopoverFeature)
