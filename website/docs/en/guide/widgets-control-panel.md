# Control Panel

[ControlPanelWidget](/en/api/classes/ControlPanelWidget) bundles play/pause, speed-control, and keyboard controls, with three modes.

## Basic Usage

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

engine.addWidget(new Daisy.ControlPanelWidget({ mode: "standard" }))
```

## mode

| Mode | Description |
|---|---|
| `"lite"` | Floating control panel only, without keyboard controls |
| `"standard"` | Floating panel + keyboard controls (Space plays/pauses) |
| `"customize"` | Custom button list specified through `panelOptions.customize` |

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
| `draggable` | `boolean` | Whether the panel can be dragged |
| `customize` | `string[]` | List of button IDs to display |

### Available Button IDs

`play_pause` / `stop` / `speed` / `speedSlider` / `2d_3d`

## Standalone Controllers

`ControlPanelWidget` uses the following components internally; they can also be created directly without a Widget:

```typescript
// 精简版（仅浮动面板）
const lite = new Daisy.LiteController(engine.ui, document.getElementById("controls")!)

// 标准版（面板 + 键盘）
const standard = new Daisy.StandardController(engine.ui, document.getElementById("controls")!)
```

> **Related API**: [ControlPanelWidget](/en/api/classes/ControlPanelWidget) · [LiteController](/en/api/classes/LiteController) · [StandardController](/en/api/classes/StandardController)
