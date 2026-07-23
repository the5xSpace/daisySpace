# Simulation Time and Frame Rate Display

## SimulationTimeDisplayWidget

[SimulationTimeDisplayWidget](/en/api/classes/SimulationTimeDisplayWidget) displays the current simulation time on the screen.

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
| `preset` | string | Preset position, as above |
| `theme` | `"dark"` \| `"light"` | Theme colors |
| `title` | string | Title text |
| `border` | boolean | Whether to display a border |
| `radius` | string | Corner radius: `"md"` / `"lg"` / `"full"` |
| `backgroundOpacity` | number | Background opacity (0 to 1) |
| `timeLabel` | `TimelineLabelOptions` | Time-format override; see [Time Formatting](/en/guide/time-format) |

### Dynamic Updates

```typescript
const sw = new Daisy.SimulationTimeDisplayWidget({ widgetOptions: { title: "SIM TIME" } })
engine.addWidget(sw)

// 运行时改标题
sw.setTitle("UTC TIME")

// 强制刷新
sw.refresh()
```

## FrameRateWidget

[FrameRateWidget](/en/api/classes/FrameRateWidget) displays a real-time FPS counter.

```typescript
engine.addWidget(new Daisy.FrameRateWidget())
```

| FPS | Color | Label |
|---|---|---|
| >50 | Green | Excellent |
| >30 | Cyan | Very good |
| >20 | Blue | Smooth |
| >10 | Yellow | Fair |
| ≤10 | Red | Poor |

> **Related API**: [SimulationTimeDisplayWidget](/en/api/classes/SimulationTimeDisplayWidget) · [FrameRateWidget](/en/api/classes/FrameRateWidget) · [SimulationTimeWidget](/en/api/classes/SimulationTimeWidget)
