# 天体标记

[CelestialMarkerWidget](/api/classes/CelestialMarkerWidget) 在 3D 场景中为天体（地球、月球、太阳、火星）绘制点标记和文字标签。继承自 [MarkerWidget](/api/classes/MarkerWidget)。

默认启用太阳、月球和火星，地球默认关闭。未启用的内置天体不会创建标记目标，也不会在每帧调用对应的星历计算。

## 基本用法

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

const markerWidget = new Daisy.CelestialMarkerWidget({
    enabledBodies: [
        Daisy.CelestialMarkerBody.Sun,
        Daisy.CelestialMarkerBody.Moon,
        Daisy.CelestialMarkerBody.Mars,
        Daisy.CelestialMarkerBody.Earth,
    ],
    showDistance: 90_000_000,
    pointSize: 8,
    font: "14px sans-serif",
})

engine.addWidget(markerWidget)
```

| 选项 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `enabledBodies` | `CelestialMarkerBody[]` | `[Sun, Moon, Mars]` | 要启用的内置天体完整列表；传入空数组表示关闭全部内置天体 |
| `earth` / `moon` / `sun` / `mars` | boolean | - | 旧版兼容字段。未传入 `enabledBodies` 且传入任意一个字段时，只启用值为 `true` 的字段；新代码建议使用 `enabledBodies` |
| `showDistance` | number | `90000000` | 标记可见的最大相机距离（米） |
| `pointSize` | number | `8` | 标记点像素大小 |
| `font` | string | `"14px sans-serif"` | 标签字体 |

## 运行时切换

`enabledBodies` 是完整列表，可以通过 getter/setter 或方法在运行时切换。切换后只会保留启用列表中的内置目标，关闭的天体不会继续计算星历：

```typescript
markerWidget.setEnabledBodies([
    Daisy.CelestialMarkerBody.Sun,
    Daisy.CelestialMarkerBody.Mars,
])

const enabledBodies = markerWidget.getEnabledBodies()
markerWidget.enabledBodies = [Daisy.CelestialMarkerBody.Moon]
```

## 数值精度

内置天体位置计算使用 Cesium 的 `JulianDate` 和 `Cartesian3`。`Cartesian3` 的坐标分量使用 JavaScript `number`（IEEE-754 双精度），SDK 不会把星历坐标降级为 `Float32`，对太阳系尺度的位置数值可以承担标记显示所需的表示精度。

实际位置误差主要取决于星历模型、时间分辨率和 ICRF/ECEF 坐标变换，而不是 JavaScript `number` 的范围。需要保持精度时，请直接传递 `JulianDate` 和 `Cartesian3`，不要先转换为 `Float32Array` 或自行舍入坐标。

## 自定义目标

`CelestialMarkerWidget` 通过 `custom` 字段支持任意标记目标：

```typescript
new Daisy.CelestialMarkerWidget({
    enabledBodies: [Daisy.CelestialMarkerBody.Sun],
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

每个 [MarkerTarget](/api/interfaces/MarkerTarget) 包含 `label`、`color`、`getPosition(time)`。

> **相关 API**：[CelestialMarkerWidget](/api/classes/CelestialMarkerWidget) · [MarkerWidget](/api/classes/MarkerWidget)
