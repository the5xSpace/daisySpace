# 时间轴

[TimelineWidget](/api/classes/TimelineWidget) 是一个完整的自定义时间条控件，替代底层原生时间轴。支持缩放、平移、时间刻度标签、轨道路径和区间高亮。

## 基本用法

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

TimelineWidget 固定锚定在容器底部。

## 时间轴操作

| 操作 | 行为 |
|------|------|
| 鼠标左键拖拽 | 平移时间窗口 |
| 鼠标滚轮 | 缩放时间窗口 |
| 点击刻度区域 | 跳转到该时刻 |
| 拖动指针 | 移动当前时间 |

## 缩放控制

```typescript
// 缩放到指定时间范围
timeline.zoomTo(startTime, stopTime)

// 相对当前时间缩放（amount < 1 放大，> 1 缩小）
timeline.zoomFrom(0.5)
```

## 轨道与高亮

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

| 方法 | 说明 |
|------|------|
| `addTrack(interval, heightPx, color?, bgColor?)` | 添加轨道色条 |
| `addHighlightRange(color, heightPx, base?)` | 添加高亮区间 |

## 时间格式化

```typescript
// 运行时更换格式
timeline.configureLabel({ preset: "iso-ms" })

// 手动格式化单个时刻
const label = timeline.makeLabel(currentTime)
```

详见 [时间格式化](/guide/time-format)。

> **相关 API**：[TimelineWidget](/api/classes/TimelineWidget) · [TimelineTrack](/api/classes/TimelineTrack) · [TimelineHighlightRange](/api/classes/TimelineHighlightRange)
