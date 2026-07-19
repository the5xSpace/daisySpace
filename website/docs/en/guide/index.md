---
title: Quick Start
---

# Quick Start

This page helps you get DaisySpace-Sdk running in 5 minutes: from installing the SDK and initializing the engine, to creating entities, attaching Features, driving the camera, and finally launching a satellite through the `PW` namespace.

## 1. SDK Installation

DaisySpace-Sdk is published as an npm package and supports installation with any package manager, including `npm`, `pnpm`, and `yarn`:

```bash
# npm
npm install daisy-space-sdk

# pnpm（推荐）
pnpm add daisy-space-sdk

# yarn
yarn add daisy-space-sdk
```

> The SDK pins the underlying rendering engine version internally, so you do not need to declare the dependency again in your project. See the [Installation Guide](/en/guide/installation) for detailed environment requirements.

## 2. Minimal Runnable Example

The code below covers the engine's typical lifecycle end to end: create -> time configuration -> play -> Entity/Feature -> camera -> physical object binding.

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
|------|-----|-------------|
| 1 | `Engine.create(container)` | Asynchronous initialization that returns an engine instance; container can be an id string or an HTMLElement |
| 2 | `setSceneTime` / `setMultiplier` / `play` | The three core time APIs; the engine advances simulation time only after `play()` is called |
| 3 | `createEntity` + `addFeature` | An entity only holds position and orientation; visualization is entirely determined by features |
| 4 | `flyTo(target, options)` | Equivalent to `engine.camera.flyToTarget`; target can be an entity, coordinates, or an array |
| 5 | `PW.Satellite.bindEngine(engine)` | After a physical object is bound to the engine, it automatically mounts the entity and registers itself into the simulation loop |

> A matching demo already exists in Playground: [EngineCreate.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/core/EngineCreate.svelte). You can run it side by side for comparison.

## 3. Core Architecture Overview

DaisySpace-Sdk uses a four-layer architecture: the `PW` namespace combines high-level physical objects at the top, `Entity` carries position and interaction, `Feature` handles concrete visualization, and `Engine` provides the rendering loop, camera, time, and layer infrastructure.

```
┌─────────────────────────────────┐
│  PW Namespace                   │
│  Satellite / Aircraft / Site    │
│  Sensor / Link / Constellation  │
├─────────────────────────────────┤
│  Entity                         │
│  position / orientation         │
│  Feature set / interaction      │
├─────────────────────────────────┤
│  Feature (30+ types)            │
│  Model / Point / Polyline / ... │
├─────────────────────────────────┤
│  Engine                         │
│  Rendering loop / camera / time / layers │
└─────────────────────────────────┘
```

**Design Highlights:**

- **PW namespace**: The `physicalWorld` module is exposed through `export * as PW` and packages business-level physical objects such as satellites, aircraft, sites, sensors, links, and constellations. They are still implemented with Entity + Feature internally, but the low-level details are hidden from consumers.
- **Entity**: A standalone entity class that holds only `position` / `orientation` and a set of Features, serving as the container for location and interaction.
- **Feature**: All visualization is handled by Features, including points, lines, polygons, models, labels, sensor cones, links, and more than 30 other types. Any new Feature must implement the full `IFeature` lifecycle.
- **Engine**: The unified entry point for the rendering loop, camera, time scheduling, and layer management, shielding implementation details and exposing only Daisy's own API surface.

## 4. Next Learning Path

Move forward in the three columns of "Basics -> Core Concepts -> Practice". It is recommended to finish the first column first, then jump based on your needs.

| Basics | Core Concepts | Practice |
|------|----------|------|
| [Engine](/en/guide/engine) | [Entity](/en/guide/entity) | [Satellite](/en/guide/satellite) |
| [Installation](/en/guide/installation) | [Feature](/en/guide/feature) | [Sensor](/en/guide/sensor) |
|  | [Event System](/en/guide/event-system) | [Link](/en/guide/link) |

More topic guides, including camera, layers, materials, CZML import, coverage analysis, constellations, and GPU compute, are available in the left navigation.
