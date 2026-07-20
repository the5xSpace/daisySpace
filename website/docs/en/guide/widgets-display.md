# Simulation Time and Frame Rate Display

## SimulationTimeDisplayWidget

[SimulationTimeDisplayWidget](/en/api/classes/SimulationTimeDisplayWidget) displays the current simulation time on screen.

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
engine.setSceneTime(startTime, stopTime, true)
engine.play(1)

engine.addWidget(new Daisy.SimulationTimeDisplayWidget({
    widgetOptions: {
        preset: "rightTop",
        title: "SIM TIME",
        theme: "dark",
        timeLabel: { preset: "date-time", utcOffsetHours: 8, timezoneName: "BJT" },
    },
}))
```

| Option | Type | Description |
|--------|------|-------------|
| `preset` | string | Preset position, same as above |
| `theme` | `"dark"` \| `"light"` | Theme color scheme |
| `title` | string | Title text |
| `border` | boolean | Whether to show a border |
| `radius` | string | Border radius: `"md"` / `"lg"` / `"full"` |
| `backgroundOpacity` | number | Background opacity (0~1) |
| `timeLabel` | `TimelineLabelOptions` | Time format override, see [Time Format](/en/guide/time-format) |

### Dynamic Updates

```typescript
const sw = new Daisy.SimulationTimeDisplayWidget({ widgetOptions: { title: "SIM TIME" } })
engine.addWidget(sw)

// Change title at runtime
sw.setTitle("UTC TIME")

// Force refresh
sw.refresh()
```

## FrameRateWidget

[FrameRateWidget](/en/api/classes/FrameRateWidget) displays a real-time FPS counter.

```typescript
engine.addWidget(new Daisy.FrameRateWidget())
```

| FPS | Color | Label |
|-----|-------|-------|
| >50 | Green | Excellent |
| >30 | Cyan | Great |
| >20 | Blue | Smooth |
| >10 | Yellow | Fair |
| ≤10 | Red | Poor |

> **Related API**: [SimulationTimeDisplayWidget](/en/api/classes/SimulationTimeDisplayWidget) · [FrameRateWidget](/en/api/classes/FrameRateWidget) · [SimulationTimeWidget](/en/api/classes/SimulationTimeWidget)
