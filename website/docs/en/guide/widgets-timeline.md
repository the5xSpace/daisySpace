# Timeline

[TimelineWidget](/en/api/classes/TimelineWidget) is a fully custom time bar control that replaces the underlying native timeline. Supports zooming, panning, time tick labels, track paths, and interval highlighting.

## Basic Usage

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
const start = Daisy.JulianDate.fromIso8601("2026-07-01T00:00:00Z")
const stop  = Daisy.JulianDate.fromIso8601("2026-07-02T00:00:00Z")
engine.setSceneTime(start, stop, true)

const timeline = new Daisy.TimelineWidget({
    timeFormat: { preset: "date-time", utcOffsetHours: 8, timezoneName: "BJT" },
})
engine.addWidget(timeline)
engine.play(1)
```

TimelineWidget is anchored to the bottom of the container.

## Timeline Operations

| Operation | Behavior |
|-----------|----------|
| Left mouse drag | Pan the time window |
| Mouse wheel | Zoom the time window |
| Click on the tick area | Jump to that time |
| Drag the pointer | Move the current time |

## Zoom Control

```typescript
// 缩放到指定时间范围
timeline.zoomTo(startTime, stopTime)

// 相对当前时间缩放（amount < 1 放大，> 1 缩小）
timeline.zoomFrom(0.5)
```

## Tracks and Highlights

```typescript
// Add a colored track (overlay a color bar on the timeline)
const track = timeline.addTrack(
    { start: Daisy.JulianDate.fromIso8601("2026-07-01T06:00:00Z"), stop: Daisy.JulianDate.fromIso8601("2026-07-01T12:00:00Z") },
    6,
    "rgba(0, 255, 255, 0.9)",
)

// Add a highlight range
timeline.addHighlightRange("rgba(255, 255, 0, 0.3)", 12)
```

| Method | Description |
|--------|-------------|
| `addTrack(interval, heightPx, color?, bgColor?)` | Add a track color bar |
| `addHighlightRange(color, heightPx, base?)` | Add a highlight range |

## Time Formatting

```typescript
// Change format at runtime
timeline.configureLabel({ preset: "iso-ms" })

// Manually format a single time
const label = timeline.makeLabel(currentTime)
```

See [Time Format](/en/guide/time-format) for details.

> **Related API**: [TimelineWidget](/en/api/classes/TimelineWidget) · [TimelineTrack](/en/api/classes/TimelineTrack) · [TimelineHighlightRange](/en/api/classes/TimelineHighlightRange)
