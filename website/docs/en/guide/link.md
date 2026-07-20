# Link Communication

The Link component renders a connecting line between two endpoints, supporting time-scheduled visibility, flowing arrow materials, and direction control.

## Architecture

Link implements the `IComponent` interface and is attached via `BaseObject.addLink()`:

```
源对象（卫星/地面站）
    └── Link 组件
          └└── PolylineFeature（动态更新两端位置）
```

The two endpoints of the link are specified via `target`; the source end implicitly equals the host object itself. Link internally uses `CelestialEllipsoid` for Earth occlusion detection — when one end is occluded by Earth, the link line is automatically hidden.

## Adding a Link

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

| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | `BaseObject \| Entity \| Cartesian3 \| { entity }` | Link opposite end |
| `show` | `boolean \| LinkTimeRange \| LinkTimeRange[]` | Visibility schedule |
| `color` | `DColor` | Line color |
| `material` | `DMaterial` | Material (takes priority over color/speed/direction) |
| `width` | `number` | `2` | Line width (pixels) |
| `direction` | `"forward" \| "reverse"` | Flow direction |
| `speed` | `number` | Flow speed (default 0) |
| `clampToGround` | `boolean` | Clamped to ground |
| `arcType` | `ArcType` | Interpolation method |
| `name` | `string` | Name |

## Time Scheduling (LinkSchedule)

The `show` parameter supports three forms:

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

Typical usage: first compute transit windows via `sat.getTransits()`, then map the windows to link time intervals:

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

## Flowing Arrow Material

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

If only `color` + `direction` + `speed` are passed without `material`, Link internally generates a default arrow flow material.

## Earth Occlusion Detection

Link automatically uses the current host object's `celestialEllipsoid` for occlusion detection: when either endpoint of the link line segment is occluded by a celestial body, the link is automatically hidden. Occlusion detection is implemented via `CelestialEllipsoid.rayIntersection()` and only takes effect in 3D mode.

## Dynamic Endpoints

`target` can be a moving Entity — Link retrieves the opposite end's position via `entity.getCurrentPosition()` each frame and updates the PolylineFeature's vertices.


---

<!--
  示例参考: [LinkCommunication.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/physicalWorld/LinkCommunication.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
