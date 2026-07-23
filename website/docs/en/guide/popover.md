# Popovers

[UI.PopoverFeature](/en/api/classes/UI.PopoverFeature) is a DOM Overlay popover component. It projects an HTML element to the screen position corresponding to an Entity instead of rendering inside the WebGL canvas. It supports multiple trigger modes, anchor directions, distance thresholds, and complete state callbacks.

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

Controls the popover direction relative to the Entity position:

| Value | Description |
|----|------|
| `"top"` | Popover above the Entity |
| `"bottom"` | Popover below the Entity |
| `"left"` | Popover to the left of the Entity |
| `"right"` | Popover to the right of the Entity |

## trigger — Trigger Mode

Three trigger modes control how the popover opens and closes:

### always — Always Visible

The popover remains open after initialization and is unaffected by click or keyboard events:

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: createTelemetryPanel(),
    anchorPosition: "top",
    trigger: "always",
    closeOnOutsideClick: false,
    closeOnEsc: false,
}))
```

This is suitable for persistent hints or task panels that always follow the Entity. Set `closeOnOutsideClick` and `closeOnEsc` to `false` to prevent accidental closing.

### click — Click to Toggle

Click the Entity to open the popover; click it again, press ESC, or click an empty area to close it:

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: createDetailCard(),
    anchorPosition: "bottom",
    trigger: "click",
    closeOnOutsideClick: true,
    closeOnEsc: true,
}))
```

This is suitable for detail panels and interactive information displays.

### hover — Show on Hover

The popover opens when the pointer enters the Entity and hides after the pointer leaves both the Entity and the popover:

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: createPreviewPanel(),
    anchorPosition: "left",
    trigger: "hover",
    hoverDelayMs: 260,
}))
```

The popover itself also keeps the hover state active, allowing users to move the pointer inside and click its content.

## maxDistance — Distance Threshold

`maxDistance` controls the maximum distance in meters at which the popover is visible. The popover hides automatically when the camera exceeds the threshold and reappears when it returns within the threshold:

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: el,
    trigger: "always",
    maxDistance: 900_000,     // 900 公里
}))
```

> **Note:** Exceeding the distance threshold only hides the DOM node; the popover's `visible` state (requested visibility) does not change. Distinguishing "requested visibility" from "actually rendered visibility" is important when debugging.

### Dynamically Adjust the Threshold

```typescript
popover.options = {
    ...popover.options,
    maxDistance: 400_000,
}
eng.triggerUpdateOnce?.()
```

## show() / hide() — API Control

Control popover visibility directly through the API, regardless of the trigger mode:

```typescript
// 手动打开
popover.show("api")

// 手动关闭
popover.hide("api")

// 切换状态
popover.toggle("api")
```

`show()` and `hide()` accept a reason string, which is passed to the `onVisibilityChange` callback.

## onVisibilityChange — State Callback

The callback runs whenever popover visibility changes. Its argument contains the visibility state and the reason for the change:

```typescript
popover.onVisibilityChange((event) => {
    console.log("请求可见:", event.visible)
    console.log("实际渲染:", event.rendered)
    console.log("变更原因:", event.reason)
})
```

### All Reason Codes

| reason | Meaning | Trigger |
|--------|------|----------|
| `initial` | Initialization | Initial state when the popover is created |
| `api` | API control | `show()` / `hide()` / `toggle()` is called |
| `entity-selected` | Entity selected | Automatically shown when the Entity is selected |
| `entity-unselected` | Entity unselected | Automatically hidden when selection is cleared |
| `outside-click` | Outside click | Click outside the popover and Entity |
| `escape` | ESC close | Escape key pressed |
| `hover-enter` | Hover entered | Pointer enters the Entity in hover mode |
| `hover-leave` | Hover left | Pointer leaves the Entity and popover in hover mode |
| `entity-hidden` | Entity hidden | Popover follows the hidden Entity |
| `missing-position` | Missing position | Entity cannot provide a valid position |
| `distance` | Hidden by distance | Camera exceeds the `maxDistance` threshold |
| `occluded` | Earth occlusion | Entity is occluded by the Earth surface |
| `offscreen` | Off-screen | Popover projects outside the screen |
| `rendered` | Rendered | DOM has been rendered on screen |
| `destroy` | Destroyed | Popover Feature is destroyed |

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

### Clickable Detail Card

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
|------|------|------|------|
| `closeOnEsc` | `boolean` | `true` (click mode) | Close the popover when ESC is pressed |
| `closeOnOutsideClick` | `boolean` | `true` (click mode) | Close the popover when clicking outside the popover and Entity |

For `"always"` mode, set both options to `false` to prevent users from accidentally closing a persistent panel.

## Entity Selection Integration

PopoverFeature integrates closely with Entity selection state. It automatically shows when an Entity is selected and hides when selection is cleared (`click` and `hover` modes). Use `entity.onSelected()` and `entity.onUnSelected()` to run additional logic when selection changes:

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
|------|------|--------|------|
| `element` | `string \| HTMLElement` | — | Bound DOM element (required) |
| `anchorPosition` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Anchor direction |
| `trigger` | `"always" \| "click" \| "hover"` | `"always"` | Trigger mode |
| `show` | `boolean` | — | Initial visibility |
| `maxDistance` | `number` | — | Maximum visible distance in meters |
| `offsetPx` | `Cartesian2` | — | Pixel offset |
| `gap` | `number` | `0` | Gap between the popover and anchor in pixels |
| `fixedWidth` | `number` | — | Fixed width in pixels |
| `backgroundColor` | `string` | — | Popover background color |
| `color` | `string` | — | Popover text color |
| `closeOnEsc` | `boolean` | Follows trigger | Whether to close on ESC |
| `closeOnOutsideClick` | `boolean` | Follows trigger | Whether to close on outside click |
| `hoverDelayMs` | `number` | `120` | Hide delay after leaving in hover mode, in milliseconds |
| `name` | `string` | — | Name |

> **Related API**: [UI.PopoverFeature](/en/api/classes/UI.PopoverFeature)
