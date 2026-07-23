# Timeline

[TimelineWidget](/en/api/classes/TimelineWidget) is a complete custom time-bar control that replaces the underlying native timeline. It supports zooming, panning, time tick labels, track paths, and interval highlights.

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
|------|------|
| Drag with the left mouse button | Pan the time window |
| Mouse wheel | Zoom the time window |
| Click the tick area | Jump to that time |
| Drag the pointer | Move the current time |

## Zoom Controls

```typescript
// 缩放到指定时间范围
timeline.zoomTo(startTime, stopTime)

// 相对当前时间缩放（amount < 1 放大，> 1 缩小）
timeline.zoomFrom(0.5)
```

## Tracks and Highlights

```typescript
// 添加彩色轨道（在时间轴上叠加色条）
const track = timeline.addTrack(
    { start: Daisy.JulianDate.fromIso8601("2026-07-01T06:00:00Z"), stop: Daisy.JulianDate.fromIso8601("2026-07-01T12:00:00Z") },
    6,
    "rgba(0, 255, 255, 0.9)",
)

// 添加高亮区间
timeline.addHighlightRange("rgba(255, 255, 0, 0.3)", 12)
```

| Method | Description |
|------|------|
| `addTrack(interval, heightPx, color?, bgColor?)` | Adds a track bar |
| `addHighlightRange(color, heightPx, base?)` | Adds a highlighted interval |

## Time Formatting

```typescript
// 运行时更换格式
timeline.configureLabel({ preset: "iso-ms" })

// 手动格式化单个时刻
const label = timeline.makeLabel(currentTime)
```

See [Time Formatting](/en/guide/time-format) for details.

> **Related API**: [TimelineWidget](/en/api/classes/TimelineWidget) · [TimelineTrack](/en/api/classes/TimelineTrack) · [TimelineHighlightRange](/en/api/classes/TimelineHighlightRange)
