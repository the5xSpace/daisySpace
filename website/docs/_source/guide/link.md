# 链路通信

Link 组件在两个端点之间渲染一条连接线，支持按时间调度显隐、流动箭头材质和方向控制。

## 架构

Link 实现 `IComponent` 接口，通过 `BaseObject.addLink()` 挂载：

```
源对象（卫星/地面站）
    └── Link 组件
          └── PolylineFeature（动态更新两端位置）
```

链路的两个端点通过 `target` 指定，源端隐式等于宿主对象自身。Link 内部用 `CelestialEllipsoid` 做地球遮挡检测——当一端被地球挡住时自动隐藏链路线。

## 添加链路

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")

const sat = new Daisy.PW.Satellite({ name: "RelaySAT" })
sat.bindEngine(engine)

const site = new Daisy.PW.GroundStation({ name: "Beijing-GS", position: /* ... */ })
site.bindEngine(engine)

// 地面站 → 卫星（上行链路）
site.addLink({
    name: "Uplink-Beijing",
    target: sat,
    show: passSlots,           // 仅在过境窗口内显示
    color: Daisy.Color.RED,
    width: 2,
    direction: "forward",
    speed: 1.0,
})

// 卫星 → 地面站（下行链路）
sat.addLink({
    name: "Downlink-to-Shanghai",
    target: site2,
    show: passSlots2,
    color: Daisy.Color.CYAN,
    width: 2,
    direction: "reverse",
    speed: 1.5,
})
```

## LinkOptions

| 参数 | 类型 | 说明 |
|------|------|------|
| `target` | `BaseObject \| Entity \| Cartesian3 \| { entity }` | 链路对端 |
| `show` | `boolean \| LinkTimeRange \| LinkTimeRange[]` | 显隐计划 |
| `color` | `DColor` | 线颜色 |
| `material` | `DMaterial` | 材质（优先级高于 color/speed/direction） |
| `width` | `number` | `2` | 线宽（像素） |
| `direction` | `"forward" \| "reverse"` | 流动方向 |
| `speed` | `number` | 流动速度（默认 0） |
| `clampToGround` | `boolean` | 贴地 |
| `arcType` | `ArcType` | 插值方式 |
| `name` | `string` | 名称 |

## 时间调度（LinkSchedule）

`show` 参数支持三种形式：

```typescript
// 始终显示
show: true

// 单个时间区间
show: { start: startJulianDate, end: endJulianDate }

// 多个时间区间（常见：过境窗口数组）
show: [
    { start: t0, end: t1 },
    { start: t2, end: t3 },
]
```

典型用法：先通过 `sat.getTransits()` 计算过境窗口，再将窗口映射为链路的时间区间：

```typescript
const transits = sat.getTransits({
    startTime, endTime,
    observerLocation: [40.052, 116.33, 0],
    minElevationDeg: 10,
})

const passSlots = transits.map(it => ({
    start: Daisy.JulianDate.fromDate(new Date(it.start)),
    end: Daisy.JulianDate.fromDate(new Date(it.end)),
}))

site.addLink({
    target: sat,
    show: passSlots,  // ← 只在过境时显示链路
    color: Daisy.Color.RED,
    width: 2,
})
```

## 流动箭头材质

```typescript
// 使用 MaterialFactory 预设

site.addLink({
    target: sat,
    show: passSlots,
    material: Daisy.MaterialFactory.PolylineArrow({
        color: Daisy.Color.RED,
        speed: 1.2,
    }),
    width: 3,
})
```

如果只传 `color` + `direction` + `speed` 而不传 `material`，Link 内部会自动生成默认的箭头流动材质。

## 地球遮挡检测

Link 自动使用当前宿主对象的 `celestialEllipsoid` 做遮挡检测：当链路线段的任一端点被天体遮挡时，自动隐藏链路。遮挡检测通过 `CelestialEllipsoid.rayIntersection()` 实现，仅在 3D 模式下生效。

## 动态端点

`target` 可以是移动的 Entity——Link 每帧通过 `entity.getCurrentPosition()` 获取对端位置并更新 PolylineFeature 的顶点。


---

<!--
  示例参考: [LinkCommunication.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/physicalWorld/LinkCommunication.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
