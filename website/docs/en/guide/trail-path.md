# Trail Path

[TrailPathFeature](/en/api/classes/TrailPathFeature) renders a segment-colored trail line along an entity's motion path — history, current, and future segments each have independently controlled colors and materials.

## Configuration

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
entity.addFeature(new Daisy.TrailPathFeature({
    width: 3,

    // 历史轨迹（已走过的路径）
    historySecond: 30 * 60,               // 显示 30 分钟前历史
    historyColor: Daisy.Color.BLUE.withAlpha(0.6),

    // 未来轨迹（预测路径）
    futureSecond: 15 * 60,                // 显示 15 分钟后预测
    futureColor: Daisy.Color.GREEN.withAlpha(0.35),

    // 采样
    resolutionSecond: 60,                 // 采样间隔秒数，越小越平滑但开销更高
    maxDirectionInterpolationCount: 720,  // 方向插值上限，越大越平滑

    // 性能
    autoOptimize: true,                   // 根据相机尺度和实体速度自适应采样密度
    show: true,
}))
```

Or quickly set it via `entity.setPath()`:

```typescript
entity.setPath({
    historySecond: 43200,
    futureSecond: 43200,
    width: 3,
    historyColor: Daisy.Color.fromCssColorString("#00aaff"),
    futureColor: Daisy.Color.fromCssColorString("#00ff88"),
    resolutionSecond: 60,
    autoOptimize: true,
})
```

## Parameter Table

| Parameter | Type | Default | Description |
|-----------|------|:---:|-------------|
| `width` | `number` | 2 | Line width (pixels) |
| `historySecond` | `number` | 43200 | History trail time span (seconds) |
| `futureSecond` | `number` | 43200 | Future trail time span (seconds) |
| `resolutionSecond` | `number` | 60 | Sampling interval (seconds) |
| `maxDirectionInterpolationCount` | `number` | 720 | Direction interpolation cap |
| `autoOptimize` | `boolean` | true | Adaptive density sampling |
| `color` | `DColor` | PURPLE | Current segment (between history and future) color |
| `historyColor` | `DColor` | — | History segment color |
| `futureColor` | `DColor` | — | Future segment color |
| `historyMaterial` | `DMaterial` | — | History segment material (overrides historyColor) |
| `futureMaterial` | `DMaterial` | — | Future segment material (overrides futureColor) |
| `materialAppearance` | `MaterialAppearance` | — | Render appearance control (advanced usage) |
| `show` | `boolean` | true | Visibility |
| `updateIntervalSecond` | `number` | 1 | Trail line update interval (seconds); lowering reduces computation |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Distance display condition |
| `beforeSecond` | `number` | — | Compatibility alias for historySecond (deprecated) |
| `afterSecond` | `number` | — | Compatibility alias for futureSecond (deprecated) |

## Sampling Strategy

When `autoOptimize: true`, the system adaptively adjusts sampling density based on:

- **Camera distance**: farther distances use sparser sampling
- **Entity speed**: higher speeds use denser sampling to maintain visual continuity
- **Entity count**: large numbers of entities automatically reduce frequency

When `autoOptimize: false`, sampling strictly follows `resolutionSecond` and `maxDirectionInterpolationCount`.

## Performance Notes

- TrailPathFeature internally pre-computes trail sampling points via a Worker thread
- In large-scale constellation scenes (thousands of satellites), inactive entities' TrailPathFeature is skipped in high-performance mode
- For non-hover satellites, it's recommended to set `show: false` or control sampling density via `autoOptimize`

### TrajectorySample Data Construction

TrailPathFeature depends on the Entity's position being a TrajectorySample type. Build trajectory data:

```typescript
const trajectory = new Daisy.TrajectorySample(Daisy.ReferenceFrame.FIXED, {
    interpolationAlgorithm: "LAGRANGE",
    interpolationDegree: 5,
})

// 方式一：pushData 批量推送
const samples = []
for (let i = 0; i <= 96; i++) {
    const t = Daisy.JulianDate.addSeconds(startTime, i * 60, new Daisy.JulianDate())
    samples.push({
        time: t,
        position: Daisy.Cartesian3.fromDegrees(116 + i * 0.5, 39.9, 800000),
    })
}
trajectory.pushData(samples)

// 方式二：pushData 逐点添加
trajectory.pushData({ time, position })

entity.position = trajectory
```

### Three-segment Coloring

TrailPathFeature divides the trail into three independently colored segments:

- **History segment** (within historySecond range): historyColor / historyMaterial
- **Current segment** (near current position): color
- **Future segment** (within futureSecond range): futureColor / futureMaterial

When historyColor/futureColor are not set, all segments use color.

### Worker Acceleration

TrailPathFeature internally offloads trajectory sampling computation to a Web Worker thread. When the number of entities exceeds 100, multi-threaded pre-computation is automatically enabled. `updateIntervalSecond` controls the pre-computation frequency — larger values update more lazily but with higher display latency.

---

> **Related API**: [TrailPathFeature](/en/api/classes/TrailPathFeature) · [TrajectorySample](/en/api/classes/TrajectorySample) · [Entity](/en/api/classes/Entity)

<!--
示例参考: [TrailPath.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/features/TrailPath.svelte)
-->
