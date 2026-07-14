# 弹出层

[UI.PopoverFeature](/api/classes/UI.PopoverFeature) 是 DOM Overlay 弹出层组件——它将 HTML 元素投影到屏幕坐标系中实体对应的位置，而不是在 WebGL 画布内渲染。支持多种触发模式、锚点方向、距离门限和完整的状态回调。

## 基础用法

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

## anchorPosition — 锚点方向

控制弹窗相对于实体位置的弹出方向：

| 值 | 说明 |
|----|------|
| `"top"` | 弹窗在实体上方 |
| `"bottom"` | 弹窗在实体下方 |
| `"left"` | 弹窗在实体左侧 |
| `"right"` | 弹窗在实体右侧 |

## trigger — 触发模式

三种触发模式控制弹窗的打开/关闭行为：

### always — 常驻显示

弹窗在初始化后始终保持打开，不受点击和键盘事件影响：

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: createTelemetryPanel(),
    anchorPosition: "top",
    trigger: "always",
    closeOnOutsideClick: false,
    closeOnEsc: false,
}))
```

适合常驻提示或任务面板，始终跟随实体。`closeOnOutsideClick` 和 `closeOnEsc` 设为 `false` 可防止误关闭。

### click — 点击切换

点击实体打开弹窗，再次点击实体、按 ESC 或点击空白区域关闭：

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: createDetailCard(),
    anchorPosition: "bottom",
    trigger: "click",
    closeOnOutsideClick: true,
    closeOnEsc: true,
}))
```

适合详情面板和交互式信息展示。

### hover — 悬停显示

鼠标进入实体时打开弹窗，离开实体和弹窗后延迟隐藏：

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: createPreviewPanel(),
    anchorPosition: "left",
    trigger: "hover",
    hoverDelayMs: 260,
}))
```

弹窗自身也会保持 hover 状态，方便用户将鼠标移入弹窗内部点击内容。

## maxDistance — 距离门限

`maxDistance` 控制弹窗可见的最大距离（米）。相机距离超过门限时弹窗自动隐藏，回到门限内时重新显示：

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: el,
    trigger: "always",
    maxDistance: 900_000,     // 900 公里
}))
```

> **注意：** 超过距离门限时只是隐藏 DOM 节点，弹窗的 `visible` 状态（请求可见）不会改变。区分"请求可见"与"实际渲染可见"对调试很重要。

### 动态调整门限

```typescript
popover.options = {
    ...popover.options,
    maxDistance: 400_000,
}
eng.triggerUpdateOnce?.()
```

## show() / hide() — API 控制

通过 API 直接控制弹窗可见性，不受 trigger 模式限制：

```typescript
// 手动打开
popover.show("api")

// 手动关闭
popover.hide("api")

// 切换状态
popover.toggle("api")
```

`show()` 和 `hide()` 接收一个 reason 字符串参数，该原因会传递到 `onVisibilityChange` 回调中。

## onVisibilityChange — 状态回调

弹窗每次可见性变化时触发回调，回调参数包含可见状态和变更原因：

```typescript
popover.onVisibilityChange((event) => {
    console.log("请求可见:", event.visible)
    console.log("实际渲染:", event.rendered)
    console.log("变更原因:", event.reason)
})
```

### 全部 reason 码

| reason | 含义 | 触发场景 |
|--------|------|----------|
| `initial` | 初始化 | 弹窗创建时的初始状态 |
| `api` | API 控制 | 调用 `show()` / `hide()` / `toggle()` |
| `entity-selected` | 实体选中 | 选中实体时自动显示 |
| `entity-unselected` | 实体取消 | 取消选中时自动隐藏 |
| `outside-click` | 外部点击 | 点击弹窗和实体以外的区域 |
| `escape` | ESC 关闭 | 按下 Escape 键 |
| `hover-enter` | 悬停进入 | 鼠标进入实体（hover 模式） |
| `hover-leave` | 悬停离开 | 鼠标离开实体和弹窗（hover 模式） |
| `entity-hidden` | 实体隐藏 | 实体被隐藏时弹窗跟随隐藏 |
| `missing-position` | 无坐标 | 实体无法获取有效位置 |
| `distance` | 距离隐藏 | 相机距离超过 `maxDistance` 门限 |
| `occluded` | 地球遮挡 | 实体被地球曲面遮挡 |
| `offscreen` | 屏幕外 | 弹窗投影到屏幕外 |
| `rendered` | 已渲染 | DOM 已经上屏绘制 |
| `destroy` | 已销毁 | 弹窗 Feature 被销毁 |

## 完整示例

### 常驻遥测面板

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

### 点击详情卡片

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

### hover 悬停预览

```typescript
entity.addFeature(new Daisy.UI.PopoverFeature({
    element: createTooltip("目标区域属性"),
    anchorPosition: "left",
    trigger: "hover",
    hoverDelayMs: 260,
    maxDistance: 9_000_000,
}))
```

## ESC 关闭与外部点击

| 选项 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `closeOnEsc` | `boolean` | `true`（click 模式） | 按 ESC 键关闭弹窗 |
| `closeOnOutsideClick` | `boolean` | `true`（click 模式） | 点击弹窗和实体以外的区域关闭弹窗 |

对于 `"always"` 模式，建议将两者设为 `false`，否则用户可能意外关闭常驻面板。

## 实体选中集成

PopoverFeature 与实体选中状态深度集成。选中实体时自动显示弹窗，取消选中时自动隐藏（`click` 和 `hover` 模式）。可通过 `entity.onSelected()` 和 `entity.onUnSelected()` 在选中状态变化时执行额外逻辑：

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

## 参数表

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `element` | `string \| HTMLElement` | — | 绑定的 DOM 元素（必填） |
| `anchorPosition` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | 锚点方向 |
| `trigger` | `"always" \| "click" \| "hover"` | `"always"` | 触发模式 |
| `show` | `boolean` | — | 初始可见性 |
| `maxDistance` | `number` | — | 最大可见距离（米） |
| `offsetPx` | `Cartesian2` | — | 像素偏移 |
| `gap` | `number` | `0` | 弹窗与锚点间距（像素） |
| `fixedWidth` | `number` | — | 固定宽度（像素） |
| `backgroundColor` | `string` | — | 弹窗背景色 |
| `color` | `string` | — | 弹窗文字颜色 |
| `closeOnEsc` | `boolean` | 跟随 trigger | 是否响应 ESC 键关闭 |
| `closeOnOutsideClick` | `boolean` | 跟随 trigger | 是否响应外部点击关闭 |
| `hoverDelayMs` | `number` | `120` | hover 模式下离开后的隐藏延迟（毫秒） |
| `name` | `string` | — | 名称 |

> **相关 API**：[UI.PopoverFeature](/api/classes/UI.PopoverFeature)
