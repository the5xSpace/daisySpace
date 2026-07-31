# 地面站

地面站（GroundStation）是固定在行星表面的测控站点，可挂载天线模型、部署对空传感器并与航天器建立通信链路。`PW.Site` 是 `PW.GroundStation` 的语义别名，两者完全等价。

## 对象层次

```
BaseObject（抽象基类）
  └── FreeObject
        └── Vehicle                    ← 传感器默认 TO_FRONT
              └── GroundStation / Site ← 传感器默认 TO_UP
```

## 创建地面站

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

const site = new Daisy.PW.GroundStation({
    name: "Beijing-DSN",
    position: Daisy.Cartesian3.fromDegrees(116.4, 39.9, 80),
    stationModel: false,          // 不挂载 3D 天线模型
    point: false,
    text: {
        text: "Beijing-DSN",
        font: "13px sans-serif",
        offsetPx: new Daisy.Cartesian2(0, -26),
        showBackground: true,
    },
})
site.bindEngine(engine)
```

GroundStation 默认挂载 `dsn34` 天线模型；可通过 `stationModel` 选择预设站型或传入自定义模型配置。

## 站型选项（stationModel）

| 值 | 说明 |
|------|------|
| `"dsn34"` | DSN 34m 天线（默认） |
| `"dsn70"` | DSN 70m 大型天线 |
| `"radome"` | 雷达罩 |
| `false` | 不挂载模型，仅显示点位 |
| `ModelOptions` | 自定义模型（url / minimumPixelSize / maximumScale） |

## 天线朝向控制

天线模型通过 `azimuth` 和 `elevation` 两个旋转节点实现姿态控制。使用 `setAntennaPointing()` 驱动模型节点：

```typescript
// 方位角 135°，俯仰角 42°
site.setAntennaPointing(135, 42)

// 获取天线节点列表，确认可控节点
const nodes = site.getAntennaNodeNames()
// 示例输出：["azimuth", "elevation", "base", ...]
```

可通过 `antenna` 配置自定义旋转节点名称、旋转轴和偏置角：

```typescript
const site = new Daisy.PW.GroundStation({
    name: "Custom-Antenna",
    antenna: {
        azimuthNode: "azimuth",
        elevationNode: "elevation",
        azimuthAxis: Daisy.Cartesian3.UNIT_Y,
        elevationAxis: Daisy.Cartesian3.UNIT_X,
        azimuthOffsetDeg: 0,
        elevationOffsetDeg: 0,
    },
})
```

> Sensor 的 `link.track` 负责控制波束的真实指向；`setAntennaPointing()` 仅驱动模型节点的视觉姿态。

## 添加传感器

GroundStation 的传感器默认安装方向为 `TO_UP`（指向天空），适用于对空观测场景：

```typescript
const beam = site.addSensor({
    name: "Tracking-Beam",
    type: Daisy.PW.SensorType.EllipticalCone,
    emitDirection: Daisy.EmitDirection.TO_UP,  // 默认值，可省略
    apertureDeg: { xDeg: 4.5, yDeg: 4.5 },
    beamLength: 180_000,
    color: Daisy.Color.CYAN.withAlpha(0.34),
    outline: true,
    outlineColor: Daisy.Color.WHITE.withAlpha(0.72),
})
```

传感器可通过 `link.track` 跟踪飞行目标，实现波束实时指向：

```typescript
const trackPlan = [{ start: missionStart, end: missionStop, target: aircraft }]

site.addSensor({
    name: "Tracking-Beam",
    type: Daisy.PW.SensorType.EllipticalCone,
    apertureDeg: 4.5,
    beamLength: 180_000,
    color: Daisy.Color.CYAN.withAlpha(0.34),
    link: {
        track: trackPlan,
        flow: { activeWhen: [{ start: missionStart, end: missionStop }] },
    },
})
```

详见 [传感器](/guide/sensor)。

## 添加通信链路

`addLink()` 建立地面站与目标航天器之间的可视化链路，支持时间调度和流动动画：

```typescript
site.addLink({
    name: "Telemetry-Link",
    target: aircraft,
    color: Daisy.Color.LIME,
    width: 3,
    direction: "forward",
    speed: 1.35,
    show: [{ start: missionStart, end: missionStop }],
    arcType: Daisy.ArcType.NONE,
})
```

详见 [链路通信](/guide/link)。

## 过境预报集成

结合 `getTransits()` 方法获取卫星过境窗口，将窗口时间用于链路的 `show` 配置：

```typescript
const transits = sat.getTransits({
    startTime: engine.getStartTime(),
    endTime: engine.getStopTime(),
    observerLocation: [39.9, 116.4, 80],
    minElevationDeg: 10,
})

const passSlots = transits.map(t => ({ start: t.start, end: t.end }))
```

## 构造函数参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `name` | `string` | — | 站点名称 |
| `position` | `Cartesian3` | `ZERO` | ECEF 坐标 |
| `stationModel` | `"dsn34"` \| `"dsn70"` \| `"radome"` \| `ModelOptions` \| `false` | `"dsn34"` | 天线模型配置 |
| `model` | `ModelOptions` \| `false` | — | 覆盖 stationModel，传入 false 则不挂载模型 |
| `antenna` | `GroundStationAntennaPointingOptions` | — | 天线节点控制配置 |
| `text` | `TextOptions` \| `false` | — | 文本 |
| `point` | `PointComOptions` \| `false` | — | 点位标记 |
| `image` | `ImageOptions` \| `false` | — | 图片 |
| `sensors` | `SensorOptions` \| `SensorOptions[]` | — | 预挂载传感器 |

## 事件

[PW.GroundStation](/api/classes/PW.GroundStation) 继承自 [BaseObject](/api/classes/PW.BaseObject)，事件 API 与 [卫星](/guide/satellite#事件) 相同，包括完整的生命周期事件和交互事件。

---

> **相关 API**：[PW.GroundStation](/api/classes/PW.GroundStation) · [PW.Sensor](/api/classes/PW.Sensor) · [PW.Link](/api/classes/PW.Link) · [PW.Aircraft](/api/classes/PW.Aircraft)
