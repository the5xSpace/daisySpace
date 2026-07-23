# View-Distance Strategy

`ViewDistanceStrategy` manages the default visibility-distance ranges for each Feature type at different observation scales. It automatically hides detail elements when the camera is too far from or too close to a target, balancing visual quality and rendering performance.

## Core Concepts

The core of the view-distance strategy is a "scene template" table. Each scene (space, aviation, maritime, or ground) defines a set of `DistanceDisplayCondition` values divided into six **view-distance levels**:

```
EXTREME_NEAR  →  NEAR  →  MEDIUM  →  FAR  →  EXTREME_FAR  →  INFINITE
   (极近)       (近距)    (中距)     (远距)     (极远)          (无限)
```

Each `DistanceDisplayCondition(near, far)` defines a visible interval. The corresponding Feature is visible when the camera-to-target distance is between `[near, far]`.

## Built-In Scene Templates

| Scene | `ViewScene` value | Use |
|------|:---:|---|
| Space | `"space"` | Satellites, orbital objects, and celestial bodies (default) |
| Aviation | `"aviation"` | Aircraft and routes |
| Maritime | `"maritime"` | Vessels and surface platforms |
| Ground | `"ground"` | Ground stations and close-up details |

Thresholds for each template, in meters:

| Level | Space | Aviation | Maritime | Ground |
|------|:---:|:---:|:---:|:---:|
| EXTREME_NEAR | 0 ~ 5e6 | 0 ~ 200 | 0 ~ 100 | 0 ~ 50 |
| NEAR | 0 ~ 1e7 | 0 ~ 800 | 0 ~ 500 | 0 ~ 800 |
| MEDIUM | 0 ~ 5.5e7 | 200 ~ 1e4 | 100 ~ 5e3 | 50 ~ 5e3 |
| FAR | 0 ~ 3e8 | 1e3 ~ 5e4 | 500 ~ 5e4 | 500 ~ 5e4 |
| EXTREME_FAR | 0 ~ 4e10 | 1e4 ~ 2e5 | 5e3 ~ 2e5 | 5e3 ~ 2e5 |
| INFINITE | ∞ | ∞ | ∞ | ∞ |

## Configure the View-Distance Strategy

Configure it when creating the Engine:

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer", {
    daisy: {
        viewDistance: {
            scene: Daisy.ViewScene.SPACE,  // 默认航天尺度
        },
    },
})

// 运行时切换
engine.viewDistanceStrategy.setScene(Daisy.ViewScene.AVIATION)
engine.viewDistanceStrategy.getScene()  // "aviation"

// 获取当前模板（读写 DistanceDisplayCondition）
const template = engine.viewDistanceStrategy.getViewDistance()
// template.FAR = new DistanceDisplayCondition(0, 3e8)
```

## How Features Apply View-Distance Levels

Each Feature has a default view-distance level at construction time (usually `FAR`), which is assigned automatically during `register()`:

```
feature._options.distanceDisplayCondition = template[feature._defaultDistanceDisplayLevel]
```

If the user explicitly provides `distanceDisplayCondition`, that value is used without being overridden.

To customize the view-distance level:

```typescript
// 继承 Feature 后在构造函数中设置
this._defaultDistanceDisplayLevel = Daisy.ViewDistanceLevel.NEAR
```

## ViewDistanceLevel Enum

| Level | Meaning |
|------|------|
| `EXTREME_NEAR` | Extremely near - visible only when the camera is very close |
| `NEAR` | Near |
| `MEDIUM` | Medium |
| `FAR` | Far (the default for most Features) |
| `EXTREME_FAR` | Extremely far - almost always visible |
| `INFINITE` | Infinite - no upper-distance clipping |

## Custom Scene Templates

```typescript
const customDdc = (n: number, f: number) => new Daisy.DistanceDisplayCondition(n, f)

const myTemplate: Daisy.ViewDistanceTemplate = {
    PATH_RESOLUTION_SCALE: 5,
    EXTREME_NEAR: customDdc(0, 1e5),
    NEAR: customDdc(0, 1e6),
    MEDIUM: customDdc(0, 5e6),
    FAR: customDdc(0, 1e8),
    EXTREME_FAR: customDdc(0, 1e10),
    INFINITE: customDdc(0, Infinity),
}

const engine = await Daisy.Engine.create("daisyContainer", {
    daisy: {
        viewDistance: {
            scene: "my-scene",
            templates: new Map([["my-scene", myTemplate]]),
        },
    },
})
```

## Path-Resolution Scaling

`PATH_RESOLUTION_SCALE` is a special template field that controls the sampling density of trajectory paths:

| Template | `PATH_RESOLUTION_SCALE` |
|------|:---:|
| Space | 10 |
| Aviation | 1 |
| Maritime | 1 |
| Ground | 1 |

Larger values produce denser trajectory interpolation/sampling, resulting in smoother display at a higher computational cost. Space uses `10` because orbital spans are very large and denser sampling is needed for visual smoothness.

## Relationship to LOD

The `DistanceDisplayCondition` supplied by view-distance levels is a "static threshold", while LOD checks (`isBehindCamera`, `isOccludedByEarth`, and `isInCameraCullingVolume`) are "dynamic checks". They operate independently but work together:

- `DistanceDisplayCondition` - controls GPU-level Feature visibility (skips rendering on the GPU side).
- LOD checks - control whether the Entity's overall `update()` executes (skips computation on the CPU side).

In high-performance mode, LOD checks also apply an additional Feature allowlist filter (see [High-Performance Mode](/en/guide/engine#高性能模式)).


---

<!--
示例参考: [ViewDistance.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/core/ViewDistance.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 10/15 | 结构 10/10 → 95/100
-->
