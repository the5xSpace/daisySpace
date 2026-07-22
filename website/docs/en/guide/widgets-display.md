# Simulation Time and Frame Rate Display

## SimulationTimeDisplayWidget

[SimulationTimeDisplayWidget](/en/api/classes/SimulationTimeDisplayWidget) Displays the current simulation time on screen.

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
|------|------|------|
| `preset` | string | Preset position, same as above |
| `theme` | `"dark"` \| `"light"` | Theme color scheme |
| `title` | string | Title text |
| `border` | boolean | Whether to show the border |
| `radius` | string | Corner radius: `"md"` / `"lg"` / `"full"` |
| `backgroundOpacity` | number | Background opacity (0~1) |
| `timeLabel` | `TimelineLabelOptions` | Time format override; see [Time Formatting](/en/guide/time-format) |

### Dynamic Update

```typescript
const sw = new Daisy.SimulationTimeDisplayWidget({ widgetOptions: { title: "SIM TIME" } })
engine.addWidget(sw)

// 运行时改标题
sw.setTitle("UTC TIME")

// 强制刷新
sw.refresh()
```

## FrameRateWidget

[FrameRateWidget](/en/api/classes/FrameRateWidget) Displays a real-time FPS counter.

```typescript
engine.addWidget(new Daisy.FrameRateWidget())
```

| FPS | Color | Label |
|---|---|---|
| >50 | Green | Excellent |
| >30 | Cyan | Good |
| >20 | Blue | Smooth |
| >10 | Yellow | Average |
| ≤10 | Red | Poor |

> **Related API**: [SimulationTimeDisplayWidget](/en/api/classes/SimulationTimeDisplayWidget) · [FrameRateWidget](/en/api/classes/FrameRateWidget) · [SimulationTimeWidget](/en/api/classes/SimulationTimeWidget)
