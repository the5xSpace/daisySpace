# 时间格式化

所有时间相关组件（仿真时间显示、时间轴刻度、甘特图标签等）共享同一套格式化系统。引擎维护全局默认格式，各组件可独立覆盖。

## 全局设置

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

### 预设

| 预设 | 输出示例 |
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
| `"t0"` | `T+123.0s`（需要传 `t0` 参考时间） |
| `"cesium"` | `Jul 01 2026 00:00:00 UTC`（兼容格式） |

## 组件级覆盖

各组件构造时传入 `timeFormat`（或等效字段）即可覆盖全局格式。覆盖逻辑：传入函数或字符串时**完全替换**全局格式；传入对象时**浅合并**全局格式。

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

## 自定义格式生成器

通过 `TimeFormatters.custom()` 注册完全自定义的格式化函数：

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

`dt` 对象（[TimeFormatDateTime](/api/interfaces/TimeFormatDateTime)）提供全量时间字段和快捷方法：

| 字段 | 说明 |
|------|------|
| `dt.date` | JS Date（已偏移时区） |
| `dt.utcDate` | 原始 UTC Date |
| `dt.relativeSeconds` | 相对 T0 的秒数 |
| `dt.timestampMs` | 毫秒时间戳 |
| `dt.format(pattern)` | 用令牌模板二次格式化 |
| `dt.toISOString()` | ISO 8601 字符串 |

## Format 令牌

自定义 `format` 字符串时可用以下令牌：

| 令牌 | 说明 | 示例 |
|------|------|------|
| `YYYY` | 四位年份 | `2026` |
| `MM` | 两位月份 | `07` |
| `MMM` | 英文月份缩写 | `Jul` |
| `DD` | 两位日期 | `01` |
| `HH` | 两位小时（24h） | `14` |
| `mm` | 两位分钟 | `30` |
| `ss` | 两位秒 | `45` |
| `SSS` | 三位毫秒 | `123` |
| `TZ` | 时区名称 | `UTC` / `BJT` / `UTC+08` |
| `Z` | 时区偏移 | `Z` / `+08:00` |

```typescript
engine.setTimeFormat({
    preset: "utc",
    format: "YYYY年MM月DD日 HH:mm:ss TZ",
    utcOffsetHours: 8,
    timezoneName: "BJT",
})
// 输出: "2026年07月01日 08:00:00 BJT"
```

## 直接格式化

不修改全局格式时，可调用 `engine.formatTime()` 单次格式化：

```typescript
const label = engine.formatTime(currentTime, { preset: "t0", t0: launchEpoch })
```

> **相关 API**：[TimeFormatConfig](/api/types/TimeFormatConfig) · [TimeFormatOptions](/api/interfaces/TimeFormatOptions) · [TimeFormatDateTime](/api/interfaces/TimeFormatDateTime) · [TimeFormatCallback](/api/types/TimeFormatCallback) · [TimelineLabelOptions](/api/interfaces/TimelineLabelOptions)
