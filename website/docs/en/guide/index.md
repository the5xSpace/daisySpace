---
title: Quick Start
---

# Quick Start

This page helps you get Daisy Space SDK up and running in under 5 minutes: from installing the SDK and initializing the engine, to creating entities, mounting Features, driving the camera, and finally launching a satellite via the `PW` namespace.

## 1. Install the SDK

Daisy Space SDK is published as an npm package. Install it with any supported package manager:

```bash
# npm
npm install daisy-space-sdk

# pnpm（推荐）
pnpm add daisy-space-sdk

# yarn
yarn add daisy-space-sdk
```

> The SDK pins the underlying rendering engine version internally — no need to repeat the dependency declaration in your project. For detailed requirements, see [安装指南](/en/guide/installation).

## 2. Minimal Runnable Example

The code below covers the full engine lifecycle: create → time config → play → entity / Feature → camera → physical object binding.

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

### 关键说明

| 步骤 | API | 说明 |
|------|-----|------|
| 1 | `Engine.create(container)` | 异步初始化，返回引擎实例；container 可为 id 字符串或 HTMLElement |
| 2 | `setSceneTime` / `setMultiplier` / `play` | 时间系统三件套，引擎只有在 `play()` 后才会推进仿真时间 |
| 3 | `createEntity` + `addFeature` | Entity 只持有位置/朝向，可视化完全由 Feature 决定 |
| 4 | `flyTo(target, options)` | 等价于 `engine.camera.flyToTarget`，target 可为 Entity / 坐标 / 数组 |
| 5 | `PW.Satellite.bindEngine(engine)` | 物理对象绑定引擎后会自动挂载实体并注册，进入仿真循环 |

> Playground 中已有等价 Demo：[EngineCreate.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/core/EngineCreate.svelte)，可对照运行。

## 3. Core Architecture Overview

Daisy Space SDK uses a four-layer architecture: the `PW` namespace composes high-level physical objects at the top level, `Entity` carries position and interaction, `Feature` handles concrete visualization, and `Engine` provides the render loop, camera, time, and layer infrastructure.

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

**Design principles:**

- **PW 命名空间**：`physicalWorld` module exposed via `export * as PW`, encapsulating business-level physical objects such as satellites, aircraft, ground stations, sensors, links, and constellations. Internally still built from Entity + Feature, with lower-level details hidden from consumers.
- **Entity**: Standalone entity class; holds only `position` / `orientation` and a set of Features. Container for position and interaction.
- **Feature**: All visualization handled by Features (points, lines, surfaces, models, labels, sensor cones, links, and 30+ other types). Any new Feature must implement the full `IFeature` lifecycle.
- **Engine**: Unified entry point for the render loop, camera, time scheduling, and layer management. Lower-level details hidden; only Daisy's own APIs exposed externally.

## 4. Next Learning Path

Progress through Beginner → Core Concepts → Practical, starting with the first column before branching by use case.

| Beginner | Core Concepts | Practical |
|----------|--------------|-----------|
| [Engine](/en/guide/engine) | [Entity](/en/guide/entity) | [卫星](/en/guide/satellite) |
| [安装](/en/guide/installation) | [Feature](/en/guide/feature) | [传感器](/en/guide/sensor) |
|  | [事件系统](/en/guide/event-system) | [链路通信](/en/guide/link) |

More topic guides (camera, layers, materials, CZML import, coverage analysis, constellations, GPU compute, etc.) are available in the left-hand navigation.
