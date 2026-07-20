# 天体标记

[CelestialMarkerWidget](/en/api/classes/CelestialMarkerWidget) 在 3D 场景中为天体（地球、月球、太阳、火星）绘制点标记和文字标签。继承自 [MarkerWidget](/en/api/classes/MarkerWidget)。

## 基本用法

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

engine.addWidget(new Daisy.CelestialMarkerWidget({
    earth: true,
    moon: true,
    sun: true,
    mars: false,
    showDistance: 90_000_000,
    pointSize: 8,
    font: "14px sans-serif",
}))
```

| 选项 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `earth` | boolean | `false` | 是否显示地球标记 |
| `moon` | boolean | `false` | 是否显示月球标记 |
| `sun` | boolean | `false` | 是否显示太阳标记 |
| `mars` | boolean | `false` | 是否显示火星标记 |
| `showDistance` | number | `90000000` | 标记可见的最大相机距离（米） |
| `pointSize` | number | `8` | 标记点像素大小 |
| `font` | string | `"14px sans-serif"` | 标签字体 |

标记目标在 Widget 构造时确定；运行时若需更换目标，应销毁旧 Widget 后重新创建。

## 自定义目标

`CelestialMarkerWidget` 通过 `custom` 字段支持任意标记目标：

```typescript
new Daisy.CelestialMarkerWidget({
    sun: true,
    custom: [{
        label: "Space Station",
        color: Daisy.Color.CYAN,
        getPosition: (time) => {
            // 返回 ECEF 坐标
            return stationEntity.getPositionByTime(time)
        },
    }],
})
```

每个 [MarkerTarget](/en/api/interfaces/MarkerTarget) 包含 `label`、`color`、`getPosition(time)`。

> **相关 API**：[CelestialMarkerWidget](/en/api/classes/CelestialMarkerWidget) · [MarkerWidget](/en/api/classes/MarkerWidget)
