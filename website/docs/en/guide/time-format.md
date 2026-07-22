# Time Formatting

All time-related components (simulation time display, timeline ticks, Gantt chart labels, etc.) share the same formatting system. The engine maintains a global default format, and each component can override it independently.

## Global Settings

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

// 预设名称
engine.setTimeFormat("date-time")

// 预设 + 时区偏移
engine.setTimeFormat({ preset: "date-time", utcOffsetHours: 8, timezoneName: "BJT" })

// 使用工厂函数
engine.setTimeFormat(Daisy.TimeFormatters.beijingTime({ format: "HH:mm:ss TZ" }))

// T0 相对时间（常用于发射场景）
engine.setTimeFormat({ preset: "t0", t0: launchEpoch, t0Label: "T" })

// 读取当前全局格式
const fmt = engine.getTimeFormat()
```

### Presets

| Preset | Output Example |
|------|----------|
| `"utc"` | `2026-07-01 00:00:00 UTC` |
| `"bjt"` | `2026-07-01 08:00:00 BJT` |
| `"iso"` | `2026-07-01T00:00:00Z` |
| `"iso-ms"` | `2026-07-01T00:00:00.000Z` |
| `"date"` | `2026-07-01` |
| `"time"` | `00:00:00` |
| `"time-ms"` | `00:00:00.000` |
| `"date-time"` | `2026-07-01 00:00:00 UTC` |
| `"date-time-ms"` | `2026-07-01 00:00:00.000 UTC` |
| `"t0"` | `T+123.0s` (requires `t0` reference time) |
| `"cesium"` | `Jul 01 2026 00:00:00 UTC` (compatible format) |

## Component-level Override

Pass `timeFormat` (or equivalent field) during component construction to override the global format. Override logic: passing a function or string **fully replaces** the global format; passing an object **shallow-merges** with the global format.

### SimulationTimeWidget

```typescript
engine.addWidget(new Daisy.SimulationTimeDisplayWidget({
    widgetOptions: {
        timeLabel: { preset: "bjt", format: "HH:mm:ss TZ" },
    },
}))
```

### TimelineWidget

```typescript
engine.addWidget(new Daisy.TimelineWidget({
    timeFormat: { preset: "t0", t0: launchEpoch },
}))
```

### TaskGanttWidget

```typescript
engine.addWidget(new Daisy.TaskGanttWidget(schedule, {
    timeFormat: { preset: "t0", t0: launchEpoch },
    axisTimeFormat: { preset: "time" },  // 时间轴刻度独立格式
}))
```

### TaskTimeLineWidget

```typescript
engine.addWidget(new Daisy.TaskTimeLineWidget(schedule, {
    timeFormat: "date-time-ms",
}))
```

## Custom Format Generator

Register a fully custom formatting function via `TimeFormatters.custom()`:

```typescript
engine.setTimeFormat(Daisy.TimeFormatters.custom(
    (dt) => {
        // dt: TimeFormatDateTime，包含 year/month/day/hour/minute/second/millisecond 等字段
        const quarter = Math.floor(dt.parts.month / 3) + 1
        return `${dt.parts.year} Q${quarter} ${String(dt.parts.day).padStart(2, "0")}日`
    },
    { utcOffsetHours: 8, timezoneName: "BJT" },
))
// 输出: "2026 Q3 01日"
```

`dt` object ([TimeFormatDateTime](/en/api/interfaces/TimeFormatDateTime)) provides full time fields and helper methods:

| Field | Description |
|------|------|
| `dt.date` | JS Date (already shifted to timezone) |
| `dt.utcDate` | Original UTC Date |
| `dt.relativeSeconds` | Seconds relative to T0 |
| `dt.timestampMs` | Millisecond timestamp |
| `dt.format(pattern)` | Secondary format using token template |
| `dt.toISOString()` | ISO 8601 string |

## Format 令牌

The following tokens are available when constructing a custom `format` string:

| Token | Description | Example |
|------|------|------|
| `YYYY` | 4-digit year | `2026` |
| `MM` | 2-digit month | `07` |
| `MMM` | English month abbreviation | `Jul` |
| `DD` | 2-digit day | `01` |
| `HH` | 2-digit hour (24h) | `14` |
| `mm` | 2-digit minute | `30` |
| `ss` | 2-digit second | `45` |
| `SSS` | 3-digit millisecond | `123` |
| `TZ` | Timezone name | `UTC` / `BJT` / `UTC+08` |
| `Z` | Timezone offset | `Z` / `+08:00` |

```typescript
engine.setTimeFormat({
    preset: "utc",
    format: "YYYY年MM月DD日 HH:mm:ss TZ",
    utcOffsetHours: 8,
    timezoneName: "BJT",
})
// 输出: "2026年07月01日 08:00:00 BJT"
```

## Direct Formatting

When not modifying the global format, call `engine.formatTime()` for one-time formatting:

```typescript
const label = engine.formatTime(currentTime, { preset: "t0", t0: launchEpoch })
```

> **Related API**: [TimeFormatConfig](/en/api/types/TimeFormatConfig) · [TimeFormatOptions](/en/api/interfaces/TimeFormatOptions) · [TimeFormatDateTime](/en/api/interfaces/TimeFormatDateTime) · [TimeFormatCallback](/en/api/types/TimeFormatCallback) · [TimelineLabelOptions](/en/api/interfaces/TimelineLabelOptions)
