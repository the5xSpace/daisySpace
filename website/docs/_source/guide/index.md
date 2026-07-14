---
title: 快速开始
---

# 快速开始

本页帮助你在 5 分钟内跑通 DaisySpace-Sdk：从安装 SDK、初始化引擎，到创建实体、挂载 Feature、驱动相机，最后用 `PW` 命名空间发射一颗卫星。

## 一、SDK 安装

DaisySpace-Sdk 作为 npm 包发布，支持 `npm` / `pnpm` / `yarn` 任意包管理器安装：

```bash
# npm
npm install daisy-space-sdk

# pnpm（推荐）
pnpm add daisy-space-sdk

# yarn
yarn add daisy-space-sdk
```

> SDK 内部已锁定底层渲染引擎版本，无需在项目中重复声明依赖。详细环境要求见 [安装指南](/guide/installation)。

## 二、最小可运行示例

下面这段代码完整覆盖了引擎的典型生命周期：创建 → 时间配置 → 播放 → 实体/Feature → 相机 → 物理对象绑定。

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

## 三、核心架构概览

DaisySpace-Sdk 采用四层分层：`PW` 命名空间在顶层组合高层物理对象，`Entity` 承载位置与交互，`Feature` 负责具体可视化，`Engine` 提供渲染循环、相机、时间与图层基础设施。

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

**设计要点：**

- **PW 命名空间**：`physicalWorld` 模块通过 `export * as PW` 暴露，封装卫星、飞行器、站点、传感器、链路、星座等业务级物理对象。它们内部仍由 Entity + Feature 组合实现，但对外屏蔽了底层细节。
- **Entity**：独立实体类，只持有 `position` / `orientation` 与一组 Feature，是位置与交互的容器。
- **Feature**：所有可视化都由 Feature 承担（点、线、面、模型、标签、传感器锥、链路等 30 余种）。新增 Feature 必须实现 `IFeature` 完整生命周期。
- **Engine**：渲染循环、相机、时间调度、图层管理的统一入口，屏蔽底层实现细节，对外只暴露 Daisy 自己的 API。

## 四、下一步学习路径

按"入门 → 核心概念 → 实战"三列推进，建议先打通第一列，再按业务需要跳读。

| 入门 | 核心概念 | 实战 |
|------|----------|------|
| [Engine](/guide/engine) | [Entity](/guide/entity) | [卫星](/guide/satellite) |
| [安装](/guide/installation) | [Feature](/guide/feature) | [传感器](/guide/sensor) |
|  | [事件系统](/guide/event-system) | [链路通信](/guide/link) |

更多专题指南（相机、图层、材质、CZML 导入、覆盖分析、星座、GPU 计算等）见左侧导航。
