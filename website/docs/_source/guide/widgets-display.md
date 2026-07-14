# 仿真时间与帧率显示

## SimulationTimeDisplayWidget

[SimulationTimeDisplayWidget](/api/classes/SimulationTimeDisplayWidget) 在屏幕上显示当前仿真时间。

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

| 选项 | 类型 | 说明 |
|------|------|------|
| `preset` | string | 预设位置，同上 |
| `theme` | `"dark"` \| `"light"` | 主题配色 |
| `title` | string | 标题文字 |
| `border` | boolean | 是否显示边框 |
| `radius` | string | 圆角：`"md"` / `"lg"` / `"full"` |
| `backgroundOpacity` | number | 背景透明度（0~1） |
| `timeLabel` | `TimelineLabelOptions` | 时间格式覆盖，详见 [时间格式化](/guide/time-format) |

### 动态更新

```typescript
const sw = new Daisy.SimulationTimeDisplayWidget({ widgetOptions: { title: "SIM TIME" } })
engine.addWidget(sw)

// 运行时改标题
sw.setTitle("UTC TIME")

// 强制刷新
sw.refresh()
```

## FrameRateWidget

[FrameRateWidget](/api/classes/FrameRateWidget) 显示实时 FPS 计数器。

```typescript
engine.addWidget(new Daisy.FrameRateWidget())
```

| FPS | 颜色 | 标签 |
|---|---|---|
| >50 | 绿色 | 极佳 |
| >30 | 青色 | 优秀 |
| >20 | 蓝色 | 流畅 |
| >10 | 黄色 | 一般 |
| ≤10 | 红色 | 差 |

> **相关 API**：[SimulationTimeDisplayWidget](/api/classes/SimulationTimeDisplayWidget) · [FrameRateWidget](/api/classes/FrameRateWidget) · [SimulationTimeWidget](/api/classes/SimulationTimeWidget)
