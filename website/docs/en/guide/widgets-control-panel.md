# Control Panel

[ControlPanelWidget](/en/api/classes/ControlPanelWidget) encapsulates play/pause/speed controls and keyboard control, supporting three modes.

## Basic Usage

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

engine.addWidget(new Daisy.ControlPanelWidget({ mode: "standard" }))
```

## Modes

| Mode | Description |
|---|---|
| `"lite"` | Floating control panel only, no keyboard control |
| `"standard"` | Floating panel + keyboard control (Space to play/pause) |
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
|--------|------|-------------|
| `preset` | string | Preset position: `"leftTop"` / `"rightTop"` / `"leftBottom"` / `"rightBottom"` |
| `layout` | `"row"` \| `"column"` | Button arrangement direction |
| `draggable` | `boolean` | Whether the panel is draggable |
| `customize` | `string[]` | List of button IDs to display |

### Available Button IDs

`play_pause` / `stop` / `speed` / `speedSlider` / `2d_3d`

## Standalone Controllers

`ControlPanelWidget` internally uses the following components, which can also be created directly without the Widget:

```typescript
// Lite version (floating panel only)
const lite = new Daisy.LiteController(engine.ui, document.getElementById("controls")!)

// Standard version (panel + keyboard)
const standard = new Daisy.StandardController(engine.ui, document.getElementById("controls")!)
```

> **Related API**: [ControlPanelWidget](/en/api/classes/ControlPanelWidget) · [LiteController](/en/api/classes/LiteController) · [StandardController](/en/api/classes/StandardController)
