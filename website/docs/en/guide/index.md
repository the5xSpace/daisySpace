---
title: Getting Started
---

# Getting Started

This page helps you get DaisySpace-Sdk running in 5 minutes: install the SDK, initialize the Engine, create an Entity, attach a Feature, drive the camera, and finally launch a satellite with the `PW` namespace.

## 1. SDK Installation

DaisySpace-Sdk is published as an npm package and can be installed with `npm` / `pnpm` / `yarn`:

```bash
# npm
npm install daisy-space-sdk

# pnpm（推荐）
pnpm add daisy-space-sdk

# yarn
yarn add daisy-space-sdk
```

> The SDK already pins the underlying rendering engine version, so you do not need to declare that dependency again in your project. See the [Installation Guide](/en/guide/installation) for detailed environment requirements.

## 2. Minimal Runnable Example

The following code covers the typical Engine lifecycle end to end: create → configure time → play → Entity/Feature → camera → physical object binding.

```typescript
import * as Daisy from 'daisy-space-sdk'

// ── 1. 创建引擎 ──────────────────────────────────────────────
// 传入 DOM 容器 id 或 HTMLElement，返回 Engine 实例
const engine = await Daisy.Engine.create('daisyContainer')

// ── 2. 设置仿真时间 ──────────────────────────────────────────
// JulianDate.fromDate() 把 JS Date 转为引擎内部时间
// setSceneTime(start, stop, loop) 配置时间区间与是否循环
const start = Daisy.JulianDate.fromDate(new Date('2025-06-01T00:00:00Z'))
const stop  = Daisy.JulianDate.fromDate(new Date('2025-06-02T00:00:00Z'))
engine.setSceneTime(start, stop, true)

// 时间倍率：60x 表示仿真时间流速为真实时间的 60 倍
engine.setMultiplier(60)
engine.play()

// ── 3. 创建实体并挂载 Feature ────────────────────────────────
// Entity 是 Daisy 的独立实体类
// 通过 position + addFeature 组合表达"在某位置上画什么"
const entity = engine.createEntity('DemoEntity')
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000) // 北京上空 500km

entity.addFeature(new Daisy.PointFeature({
  size: 1000,                 // 点大小，单位：米
  color: Daisy.Color.CYAN,          // 填充色
  outlineColor: Daisy.Color.WHITE,  // 轮廓色
  outlineWidth: 2,            // 轮廓宽
}))

// ── 4. 相机飞向目标 ──────────────────────────────────────────
// engine.flyTo 是 camera.flyToTarget 的快捷入口
// duration 单位为秒
engine.flyTo(entity, { duration: 2 })

// ── 5. 创建卫星（使用 PW 命名空间）──────────────────────────
// physicalWorld 通过 `export * as PW` 暴露
// bindEngine 会把物理对象绑定到引擎，并完成注册
const tleText = `1 25544U 98067A   25152.50000000  .00000000  00000-0  00000-0 0  9990
2 25544  51.6400 247.4627 0000000  51.6400 110.0000 15.50000000    001`

const sat = new Daisy.PW.Satellite({ name: 'SAT-1', tle: tleText })
sat.bindEngine(engine)
```

### Key Notes

| Step | API | Description |
|------|-----|------|
| 1 | `Engine.create(container)` | Initializes asynchronously and returns an Engine instance; container can be an id string or an HTMLElement |
| 2 | `setSceneTime` / `setMultiplier` / `play` | The three core time APIs; the Engine advances simulation time only after `play()` |
| 3 | `createEntity` + `addFeature` | An Entity holds only position/orientation; visualization is entirely driven by Features |
| 4 | `flyTo(target, options)` | Equivalent to `engine.camera.flyToTarget`; target can be an Entity / coordinate / array |
| 5 | `PW.Satellite.bindEngine(engine)` | After binding to the Engine, the physical object automatically mounts its Entity, registers, and enters the simulation loop |

> An equivalent Demo already exists in Playground: [EngineCreate.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/core/EngineCreate.svelte). You can run it side by side.

## 3. Core Architecture Overview

DaisySpace-Sdk uses a four-layer architecture: the `PW` namespace composes high-level physical objects at the top, `Entity` carries position and interaction, `Feature` handles concrete visualization, and `Engine` provides the rendering loop, camera, time, and layer infrastructure.

```
┌─────────────────────────────────┐
│  PW 命名空间                      │
│  Satellite / Aircraft / Site     │
│  Sensor / Link / Constellation   │
├─────────────────────────────────┤
│  Entity                          │
│  position / orientation          │
│  Feature 集合 / 交互事件          │
├─────────────────────────────────┤
│  Feature (30+ 种)                │
│  Model / Point / Polyline / ...  │
├─────────────────────────────────┤
│  Engine                          │
│  渲染循环 / 相机 / 时间 / 图层     │
└─────────────────────────────────┘
```

**Design Highlights:**

- **PW Namespace**: The `physicalWorld` module is exposed via `export * as PW` and wraps business-level physical objects such as satellites, aircraft, sites, sensors, links, and constellations. Internally they are still implemented as Entity + Feature combinations, but the low-level details are hidden from the public API.
- **Entity**: A standalone entity class that only holds `position` / `orientation` and a set of Features. It is the container for position and interaction.
- **Feature**: All visualization is handled by Features (points, lines, surfaces, models, labels, sensor cones, links, and 30+ other types). New Features must implement the full `IFeature` lifecycle.
- **Engine**: The unified entry point for the rendering loop, camera, time scheduling, and layer management. It hides low-level implementation details and exposes only Daisy's own API.

## 4. Next Learning Path

Follow the three columns from "Getting Started → Core Concepts → Hands-on". We recommend finishing the first column before jumping to other topics as needed.

| Getting Started | Core Concepts | Hands-on |
|------|----------|------|
| [Engine](/en/guide/engine) | [Entity](/en/guide/entity) | [Satellite](/en/guide/satellite) |
| [Installation](/en/guide/installation) | [Feature](/en/guide/feature) | [Sensor](/en/guide/sensor) |
|  | [Event System](/en/guide/event-system) | [Link Communication](/en/guide/link) |

For more topic guides (camera, layers, materials, CZML import, coverage analysis, constellations, GPU computing, and more), see the left navigation.
