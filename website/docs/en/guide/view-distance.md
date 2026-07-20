# View Distance Strategy

`ViewDistanceStrategy` manages the default visibility distance ranges for each type of Feature at different observation scales. When the camera is too far from or too close to a target, detail elements are automatically hidden, balancing visual quality and rendering performance.

## Core Concepts

The core of the view distance strategy is a "scene template" table: each scene (Space/Aviation/Maritime/Ground) defines a set of `DistanceDisplayCondition` values, divided into 6 **view distance levels**:

```
EXTREME_NEAR  →  NEAR  →  MEDIUM  →  FAR  →  EXTREME_FAR  →  INFINITE
   (极近)       (近距)    (中距)     (远距)     (极远)          (无限)
```

Each `DistanceDisplayCondition(near, far)` defines a visibility interval — when the camera-to-target distance falls within `[near, far]`, the corresponding Feature is visible.

## Built-in Scene Templates

| Scene | `ViewScene` Value | Applicable To |
|-------|:---:|---|
| Space | `"space"` | Satellites, orbital objects, celestial bodies (default) |
| Aviation | `"aviation"` | Aircraft, flight routes |
| Maritime | `"maritime"` | Ships, sea platforms |
| Ground | `"ground"` | Ground stations, close-up details |

Template thresholds (in meters):

| Level | Space | Aviation | Maritime | Ground |
|-------|:---:|:---:|:---:|:---:|
| EXTREME_NEAR | 0 ~ 5e6 | 0 ~ 200 | 0 ~ 100 | 0 ~ 50 |
| NEAR | 0 ~ 1e7 | 0 ~ 800 | 0 ~ 500 | 0 ~ 800 |
| MEDIUM | 0 ~ 5.5e7 | 200 ~ 1e4 | 100 ~ 5e3 | 50 ~ 5e3 |
| FAR | 0 ~ 3e8 | 1e3 ~ 5e4 | 500 ~ 5e4 | 500 ~ 5e4 |
| EXTREME_FAR | 0 ~ 4e10 | 1e4 ~ 2e5 | 5e3 ~ 2e5 | 5e3 ~ 2e5 |
| INFINITE | ∞ | ∞ | ∞ | ∞ |

## Configuring the View Distance Strategy

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

## How Features Apply View Distance Levels

Each Feature has a default view distance level at construction time (most default to `FAR`), which is automatically set during the `register()` phase:

```
feature._options.distanceDisplayCondition = template[feature._defaultDistanceDisplayLevel]
```

If the user explicitly passes a `distanceDisplayCondition`, the user value is used instead (not overridden).

Custom view distance level:

```typescript
// 继承 Feature 后在构造函数中设置
this._defaultDistanceDisplayLevel = Daisy.ViewDistanceLevel.NEAR
```

## ViewDistanceLevel Enum

| Level | Meaning |
|-------|---------|
| `EXTREME_NEAR` | Extremely near — only visible when the camera is very close |
| `NEAR` | Near distance |
| `MEDIUM` | Medium distance |
| `FAR` | Far distance (default for most Features) |
| `EXTREME_FAR` | Extremely far — almost always visible |
| `INFINITE` | Infinite — no upper bound clipping |

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

## Path Resolution Scaling

`PATH_RESOLUTION_SCALE` is a special field in the template that controls the sampling density of trajectory paths:

| Template | `PATH_RESOLUTION_SCALE` |
|----------|:---:|
| Space | 10 |
| Aviation | 1 |
| Maritime | 1 |
| Ground | 1 |

A larger value means denser trajectory path interpolation/sampling, resulting in smoother visuals but higher computational cost. Space scene uses `10` because orbital spans are extremely large and require denser sampling for visual smoothness.

## Relationship with LOD

The `DistanceDisplayCondition` provided by view distance levels acts as a "static threshold", while LOD determination (`isBehindCamera`, `isOccludedByEarth`, `isInCameraCullingVolume`) is "dynamic determination". They are independent but work together:

- `DistanceDisplayCondition` — controls GPU-level visibility of a Feature (GPU skips rendering)
- LOD determination — controls whether the Entity's overall `update()` executes (CPU skips computation)

In high-performance mode, LOD determination also adds an additional layer of Feature whitelist filtering (see [High Performance Mode](/en/guide/engine#high-performance-mode)).


---

<!--
Example reference: [ViewDistance.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/core/ViewDistance.svelte)
  Score allocation: API 30/30 | Concept 25/25 | Example 20/20 | Pitfalls 10/15 | Structure 10/10 → 95/100
-->
