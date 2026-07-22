# Control Panel

[ControlPanelWidget](/en/api/classes/ControlPanelWidget) wraps play/pause/speed controls and keyboard shortcuts, and supports three modes.

## Basic Usage

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

engine.addWidget(new Daisy.ControlPanelWidget({ mode: "standard" }))
```

## Modes

| Mode | Description |
|------|-------------|
| `"lite"` | Floating control panel only, without keyboard shortcuts |
| `"standard"` | Floating panel + keyboard shortcuts (Space for play/pause) |
| `"customize"` | Custom button list, specified via `panelOptions.customize` |

## Panel Options

```typescript
engine.addWidget(new Daisy.ControlPanelWidget({
    mode: "customize",
    panelOptions: {
        preset: "leftBottom",
        layout: "column",
        draggable: true,
        customize: ["play_pause", "stop", "speedSlider", "2d_3d"],
    },
}))
```

| Option | Type | Description |
|------|------|------|
| `preset` | string | Preset position: `"leftTop"` / `"rightTop"` / `"leftBottom"` / `"rightBottom"` |
| `layout` | `"row"` \| `"column"` | Button arrangement direction |
| `draggable` | `boolean` | Whether draggable |
| `customize` | `string[]` | List of button IDs to display |

### Available Button IDs

`play_pause` / `stop` / `speed` / `speedSlider` / `2d_3d`

## Standalone Controllers

The `ControlPanelWidget` internally uses the following components, and can also be created directly without a Widget:

```typescript
// 精简版（仅浮动面板）
const lite = new Daisy.LiteController(engine.ui, document.getElementById("controls")!)

// 标准版（面板 + 键盘）
const standard = new Daisy.StandardController(engine.ui, document.getElementById("controls")!)
```

> **Related API**: [ControlPanelWidget](/en/api/classes/ControlPanelWidget) · [LiteController](/en/api/classes/LiteController) · [StandardController](/en/api/classes/StandardController)