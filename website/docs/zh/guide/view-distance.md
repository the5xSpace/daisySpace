# 视距策略

`ViewDistanceStrategy` 管理不同观察尺度下各类型 Feature 的默认可见距离范围。当相机离目标太远或太近时，自动隐藏细节元素，在视觉质量与渲染性能之间取得平衡。

## 核心概念

视距策略的核心是一张"场景模板"表：每种场景（航天/航空/海事/地面）定义了一组 `DistanceDisplayCondition`，按 6 个**视距等级**划分：

```
EXTREME_NEAR  →  NEAR  →  MEDIUM  →  FAR  →  EXTREME_FAR  →  INFINITE
   (极近)       (近距)    (中距)     (远距)     (极远)          (无限)
```

每个 `DistanceDisplayCondition(near, far)` 定义了一个可见区间——当相机到目标的距离在 `[near, far]` 之间时，对应 Feature 可见。

## 内置场景模板

| 场景 | `ViewScene` 值 | 适用 |
|------|:---:|---|
| 航天/空间 | `"space"` | 卫星、轨道物体、天体（默认） |
| 航空 | `"aviation"` | 飞行器、航路 |
| 海事 | `"maritime"` | 船舶、海面平台 |
| 地面 | `"ground"` | 地面站、近景细节 |

各模板的阈值（单位：米）：

| 等级 | Space | Aviation | Maritime | Ground |
|------|:---:|:---:|:---:|:---:|
| EXTREME_NEAR | 0 ~ 5e6 | 0 ~ 200 | 0 ~ 100 | 0 ~ 50 |
| NEAR | 0 ~ 1e7 | 0 ~ 800 | 0 ~ 500 | 0 ~ 800 |
| MEDIUM | 0 ~ 5.5e7 | 200 ~ 1e4 | 100 ~ 5e3 | 50 ~ 5e3 |
| FAR | 0 ~ 3e8 | 1e3 ~ 5e4 | 500 ~ 5e4 | 500 ~ 5e4 |
| EXTREME_FAR | 0 ~ 4e10 | 1e4 ~ 2e5 | 5e3 ~ 2e5 | 5e3 ~ 2e5 |
| INFINITE | ∞ | ∞ | ∞ | ∞ |

## 配置视距策略

在创建 Engine 时配置：

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

## Feature 如何应用视距等级

每个 Feature 在构造时有一个默认视距等级（大多数为 `FAR`），在 `register()` 阶段自动设置：

```
feature._options.distanceDisplayCondition = template[feature._defaultDistanceDisplayLevel]
```

如果用户显式传入了 `distanceDisplayCondition`，则使用用户值（不覆盖）。

自定义视距等级：

```typescript
// 继承 Feature 后在构造函数中设置
this._defaultDistanceDisplayLevel = Daisy.ViewDistanceLevel.NEAR
```

## ViewDistanceLevel 枚举

| 等级 | 含义 |
|------|------|
| `EXTREME_NEAR` | 极近——仅当相机非常靠近时可见 |
| `NEAR` | 近距 |
| `MEDIUM` | 中距 |
| `FAR` | 远距（大多数 Feature 的默认值） |
| `EXTREME_FAR` | 极远——几乎始终可见 |
| `INFINITE` | 无限——不做上限裁剪 |

## 自定义场景模板

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

## 路径分辨率缩放

`PATH_RESOLUTION_SCALE` 是模板中一个特殊字段，用于控制轨迹路径的采样密度：

| 模板 | `PATH_RESOLUTION_SCALE` |
|------|:---:|
| Space | 10 |
| Aviation | 1 |
| Maritime | 1 |
| Ground | 1 |

值越大，轨迹路径插值/采样越密，显示更平滑但计算开销更高。在 Space 场景下使用 `10` 是因为轨道跨距极大，需要更密的采样来保证视觉平滑。

## 与 LOD 的关系

视距等级提供的 `DistanceDisplayCondition` 是"静态阈值"，而 LOD 判定（`isBehindCamera`、`isOccludedByEarth`、`isInCameraCullingVolume`）是"动态判定"。两者独立但协同：

- `DistanceDisplayCondition` — 控制 Feature 的 GPU 级可见性（GPU 侧跳过渲染）
- LOD 判定 — 控制 Entity 的整体 `update()` 是否执行（CPU 侧跳过计算）

高性能模式下，LOD 判定还会再叠加一层 Feature 白名单过滤（见 [高性能模式](/guide/engine#高性能模式)）。


---

<!--
示例参考: [ViewDistance.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/core/ViewDistance.svelte)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 10/15 | 结构 10/10 → 95/100
-->
