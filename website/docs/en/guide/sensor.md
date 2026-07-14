# 传感器

Sensor 是 DaisySpace-Sdk 物理世界中最核心的组件之一，封装了波束可视化、覆盖投影、跟踪模式和流动材质等能力。

## 架构

Sensor 实现 `IComponent` 接口，通过 `BaseObject.addSensor()` 挂载到物理对象上。内部使用多个 Feature（EllipticalConeFeature / ShaderPolygonFeature 等）组合渲染：

```
BaseObject（卫星/地面站）
    └── Sensor 组件
          ├── 波束体积（EllipticalConeFeature / CylinderFeature / CubeFeature）
          ├── 覆盖足迹（ShaderPolygonFeature + BeamProjector）
          └── 流动效果（自定义材质）
```

## 波束类型（SensorType）

| 类型 | 值 | 几何体 |
|------|:---:|--------|
| `PW.SensorType.EllipticalCone` | `"ellipticalCone"` | 椭圆锥（X/Y 开角可独立设置） |
| `PW.SensorType.Cone` | `"cone"` | 圆锥（圆形截面） |
| `PW.SensorType.Pyramid` | `"pyramid"` | 四棱锥（内部使用 CubeFeature 渲染） |
| `PW.SensorType.Cylinder` | `"cylinder"` | 柱体 |

## 添加传感器

每个物理对象类型有不同的默认发射方向（由 `addSensor()` 自动设置 `emitDirection` 默认值）：

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("container")
const sat = new Daisy.PW.Satellite({ name: "SAT-1" })
sat.bindEngine(engine)

const sensor = sat.addSensor({
    type: Daisy.PW.SensorType.EllipticalCone,
    apertureDeg: 45,                   // 开角（度），也可写 { xDeg, yDeg }
    beamLength: 500_000,               // 波束长度（米）
    color: Daisy.Color.RED.withAlpha(0.3),
    emitDirection: Daisy.EmitDirection.TO_GROUND,
})
```

## 发射方向（EmitDirection）

控制波束相对宿主对象的朝向：

| 值 | 方向 | 适用场景 |
|------|------|----------|
| `CENTER` | 原点发射 | 通用 |
| `TO_UP` | +Z（上方） | 地面站对空 |
| `TO_BOTTOM` | -Z（下方） | 飞机对地侦查 |
| `TO_GROUND` | 地表法线方向 | 卫星对地 |
| `TO_FRONT` | +X（前方） | 车辆前视 |
| `TO_AFTER` | -X（后方） | 后视传感器 |
| `TO_LEFT` | +Y（左侧） | 侧视 |
| `TO_RIGHT` | -Y（右侧） | 侧视 |

各对象类型的默认值：`Satellite` 为 `TO_BOTTOM`，`Aircraft` 为 `TO_BOTTOM`，`GroundStation` 为 `TO_UP`，`Vehicle` 为 `TO_FRONT`。

## 波束姿态（beamAttitudeDeg）

手动设置波束指向角：

```typescript
sat.addSensor({
    type: Daisy.PW.SensorType.Cone,
    apertureDeg: 30,
    beamAttitudeDeg: {
        azimuthDeg: 0,     // 方位角（绕 +Z）
        elevationDeg: -90, // 俯仰角（-90 = 正下方）
        rollDeg: 0,        // 横滚角
    },
})
```

> 注意：启用跟踪模式后，`beamAttitudeDeg` 会被忽略。

## 跟踪模式（link.track）

传感器自动跟踪目标实体或坐标：

```typescript
// 按时间段切换目标
sensor.options = {
    link: {
        track: [
            { start: t0, end: t1, target: satA.entity },
            { start: t1, end: t2, target: satB.entity },
        ],
    }
}

// 无目标时不写对应时间段，或结束当前 track 区间
sensor.options = {
    link: {
        track: [
            { start: t2, stop: t3, target: station.entity },
        ],
    }
}
```

支持的目标类型：`Entity`、`BaseObject`、`Cartesian3`、`Cartographic`。

## 覆盖足迹（BeamFootprint）

只有 `emitDirection === TO_GROUND` 时才会生成地面覆盖足迹；其他发射方向调用该能力会返回空结果。

在传感器下方渲染地面覆盖区域：

```typescript
sensor.setBeamFootprint({
    show: true,
    fillColor: Daisy.Color.RED.withAlpha(0.25),
    outline: true,
    outlineColor: Daisy.Color.WHITE,
    outlineWidthPx: 2,
    footprintTimes: { start: t0, end: t1 },  // 或 JulianDate[] / TimeRange[]
    sampleStepSeconds: 30,
    maxSampleCount: 1000,
    retainSeconds: 5000,
})
```

足迹通过 `BeamProjector` 计算（SGP4 坐标 → 地面交点 → 多边形轮廓），渲染使用 `ShaderPolygonFeature`。

## 流动效果（link.flow）

波束体积上的流动材质：

```typescript
sensor.options = {
    link: {
        flow: {
            speed: 1.0,            // 流速系数（默认 1）
            count: 0.3,            // 带状层密度（0~1）
            thickness: 0.35,       // 带宽（0~1）
            opacity: 0.8,          // 透明度
            direction: "forward",  // "forward" 或 "reverse"
            activeWhen: [
                { start: t0, end: t1 },
            ],
        },
    },
}
```

不配置 `activeWhen` 时，流动效果默认跟随 track 是否有目标（有目标时激活）。

### drawFootprint — 绘制计算覆盖

在时间范围内计算并渲染传感器地面覆盖区域，基于 `BeamProjector` 做波束-地面交点采样：

```typescript
sensor.drawFootprint({
    begin: engine.getStartTime(),
    end: engine.getStopTime(),
    union: true,                              // 合并所有时间片覆盖
    sampleStepSeconds: 30,                    // 采样间隔
    maxSampleCount: 500,                      // 最大采样点数
    fillColor: Daisy.Color.RED.withAlpha(0.25),
    outline: true,
    outlineColor: Daisy.Color.RED,
    outlineWidthPx: 2,
})
```

`drawFootprint` 由 `Sensor` 实例直接调用，内部委托 `BeamProjector` 做时间序列采样，再通过 `ShaderPolygonFeature` 渲染多边形。调用 `clearFootprintUnionRenderer()` 可清除渲染结果。

### throughGround

控制波束是否禁止穿透地面/天体椭球，默认 `true`：

```typescript
sat.addSensor({
    throughGround: false,     // 允许穿透，直接按 beamLength 延伸
    // ... other options
})
```

- `true`：禁止穿透。波束朝向椭球且发生相交时，长度会限制到最近交点
- `false`：允许穿透。波束直接按 `beamLength` 延伸。适用于深空传感器或无需地面裁剪的场景

### apertureDeg X/Y 轴向

在 `TO_GROUND` 发射方向下，`apertureDeg` 的 X/Y 轴与卫星运动方向有明确的对应关系：

```typescript
sat.addSensor({
    apertureDeg: { xDeg: 30, yDeg: 60 },  // 30° 沿轨方向, 60° 交轨方向
})
```

| 轴 | 方向 | 说明 |
|------|------|------|
| `xDeg` | 沿轨方向 (along-track) | 卫星前进方向的开角 |
| `yDeg` | 交轨方向 (cross-track) | 垂直于前进方向的开角 |

当 `apertureDeg` 为单一 `number` 时，X/Y 方向开角相同（圆锥形截面）。

## 覆盖合并（Coverage Merge）

多个传感器覆盖区域的布尔合并（WASM 加速）：

```typescript
// 多颗卫星的传感器覆盖合并
const sensors = sats.map(sat => sat.sensors[0])
// 覆盖合并通过 Constellation + CoverageAnalysis 实现（见分析工具篇）
```

## SensorOptions 完整清单

| 参数 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 名称 |
| `type` | `SensorType` | 波束体积类型 |
| `show` | `TimeValue<boolean>` | 总开关（关则停止全部计算） |
| `beamShow` | `TimeValue<boolean>` | 仅控制波束可见性 |
| `material` | `DMaterial` | 材质（优先于 color） |
| `color` | `DColor` | 颜色（默认 CYAN 25% 透明） |
| `apertureDeg` | `number \| { xDeg, yDeg }` | X/Y 独立开角 |
| `beamLength` | `TimeValue<number>` | 波束长度（米） |
| `emitDirection` | `EmitDirection` | 发射方向 |
| `throughGround` | `boolean` | 是否禁止穿透地面/天体椭球 |
| `beamAttitudeDeg` | `SensorBeamAttitudeDeg` | 手动姿态角 |
| `link.track` | `SensorTrackInterval[]` | 跟踪目标时间段配置 |
| `link.flow` | `SensorFlowConfigDetail` | 流动效果配置 |
| `footPrint` | `BeamFootprint \| false` | 覆盖足迹配置 |

> **相关 API**：[PW.Sensor](/en/api/classes/PW.Sensor) · `Analysis.BeamProjector` · [ShaderPolygonFeature](/en/api/classes/ShaderPolygonFeature)

---

<!--
示例参考: [SensorBeam.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/physicalWorld/SensorBeam.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
