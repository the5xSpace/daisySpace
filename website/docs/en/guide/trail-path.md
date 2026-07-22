# Trail Path

[TrailPathFeature](/en/api/classes/TrailPathFeature) renders a segmented, color-coded trail line along an entity's path — the history, current, and future segments each have independently controllable color and material.

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

Or use the `entity.setPath()` shorthand:

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
|-----------|------|------:|-------------|
| `width` | `number` | 2 | Line width (pixels) |
| `historySecond` | `number` | 43200 | History trail time span (seconds) |
| `futureSecond` | `number` | 43200 | Future trail time span (seconds) |
| `resolutionSecond` | `number` | 60 | Sampling interval (seconds) |
| `maxDirectionInterpolationCount` | `number` | 720 | Direction interpolation cap |
| `autoOptimize` | `boolean` | true | Adaptive density sampling |
| `color` | `DColor` | PURPLE | Current segment color (between history and future) |
| `historyColor` | `DColor` | — | History segment color |
| `futureColor` | `DColor` | — | Future segment color |
| `historyMaterial` | `DMaterial` | — | History segment material (takes precedence over historyColor) |
| `futureMaterial` | `DMaterial` | — | Future segment material (takes precedence over futureColor) |
| `materialAppearance` | `MaterialAppearance` | — | Rendering appearance control (advanced usage) |
| `show` | `boolean` | true | Visibility |
| `updateIntervalSecond` | `number` | 1 | Trail update interval (seconds); lowering it reduces computation |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Distance-based display condition |
| `beforeSecond` | `number` | — | Deprecated compatibility alias for historySecond |
| `afterSecond` | `number` | — | Deprecated compatibility alias for futureSecond |

## Sampling Strategy

When `autoOptimize: true`, the system adaptively adjusts sampling density based on the following factors:

- **Camera distance**: the farther the camera, the sparser the sampling
- **Entity speed**: the faster the entity moves, the denser the sampling to maintain visual continuity
- **Entity count**: sampling is automatically reduced when many entities are present

When `autoOptimize: false`, sampling strictly follows `resolutionSecond` and `maxDirectionInterpolationCount`.

## Performance Notes

- TrailPathFeature pre-computes trajectory sample points internally via a Web Worker thread
- In large-scale constellation scenarios (thousands of satellites), TrailPathFeature on inactive entities is skipped in high-performance mode
- For non-hovered satellites, set `show: false` or control sampling density via `autoOptimize`

### Building TrajectorySample Data

TrailPathFeature expects the Entity's position to be of type TrajectorySample. Build trajectory data as follows:

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

### Three-Segment Coloring

TrailPathFeature divides the trail into three independently colored segments:

- **History segment** (within historySecond): historyColor / historyMaterial
- **Current segment** (near current position): color
- **Future segment** (within futureSecond): futureColor / futureMaterial

When neither historyColor nor futureColor is set, all segments use color.

### Worker Acceleration

TrailPathFeature offloads trajectory sampling computation to a Web Worker thread. Multi-threaded pre-computation is automatically enabled when the entity count exceeds 100. `updateIntervalSecond` controls the pre-computation frequency — a larger value makes updates lazier but increases display latency.

---

> **Related API**: [TrailPathFeature](/en/api/classes/TrailPathFeature) · [TrajectorySample](/en/api/classes/TrajectorySample) · [Entity](/en/api/classes/Entity)

<!--
示例参考: [TrailPath.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/features/TrailPath.svelte)
-->
