# Trail Paths

[TrailPathFeature](/en/api/classes/TrailPathFeature) renders a segmented, colored trail along an Entity's motion path. The historical, current, and future segments have independent color and material controls.

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

Or use `entity.setPath()` as a shortcut:

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

Physical-world objects reuse the same path implementation. `FreeObject`'s `path` configuration uses the parameter type of `Entity.setPath()`, and `Vehicle`, `NearEarthOrbiter`, and `Satellite` inherit this configuration and forward it to their host Entity. No separate orbit-path component is required.

## Parameter Table

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `width` | `number` | 2 | Line width in pixels |
| `historySecond` | `number` | 43200 | Historical trail time span, in seconds |
| `futureSecond` | `number` | 43200 | Future trail time span, in seconds |
| `resolutionSecond` | `number` | 60 | Sampling interval, in seconds |
| `maxDirectionInterpolationCount` | `number` | 720 | Maximum direction-interpolation count |
| `autoOptimize` | `boolean` | true | Adaptive-density sampling |
| `color` | `DColor` | PURPLE | Current-segment color between the historical and future segments |
| `historyColor` | `DColor` | — | Historical-segment color |
| `futureColor` | `DColor` | — | Future-segment color |
| `historyMaterial` | `DMaterial` | — | Historical-segment material (takes precedence over historyColor) |
| `futureMaterial` | `DMaterial` | — | Future-segment material (takes precedence over futureColor) |
| `materialAppearance` | `MaterialAppearance` | — | Rendering appearance control (advanced use) |
| `show` | `boolean` | true | Visibility |
| `updateIntervalSecond` | `number` | 1 | Trail update interval in seconds; reducing it can lower computation cost |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | Distance-based display condition |
| `beforeSecond` | `number` | — | Compatibility alias for historySecond (deprecated) |
| `afterSecond` | `number` | — | Compatibility alias for futureSecond (deprecated) |

## Sampling Strategy

When `autoOptimize: true`, the system adaptively adjusts sampling density based on:

- **Camera distance**: sparser sampling at greater distances.
- **Entity speed**: denser sampling at higher speeds to preserve visual continuity.
- **Entity count**: automatically reduces the update rate when there are many Entities.

When `autoOptimize: false`, sampling strictly follows `resolutionSecond` and `maxDirectionInterpolationCount`.

## Performance Notes

- TrailPathFeature precomputes trajectory sample points on a Worker thread.
- In large constellations with thousands of satellites, TrailPathFeature instances for inactive Entities are skipped in high-performance mode.
- For satellites that are not hovered, set `show: false` or use `autoOptimize` to control sampling density.

### Building TrajectorySample Data

TrailPathFeature expects the Entity's position to be a TrajectorySample. Build trajectory data as follows:

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

- **Historical segment** (within the historySecond range): historyColor / historyMaterial
- **Current segment** (near the current position): color
- **Future segment** (within the futureSecond range): futureColor / futureMaterial

When historyColor/futureColor are not set, all segments use color.

### Worker Acceleration

TrailPathFeature offloads trajectory sampling calculations to Web Worker threads. Multithreaded precomputation is enabled automatically when the Entity count exceeds 100. `updateIntervalSecond` controls the precomputation frequency: larger values reduce update frequency but increase display latency.

---

> **Related API**: [TrailPathFeature](/en/api/classes/TrailPathFeature) · [TrajectorySample](/en/api/classes/TrajectorySample) · [Entity](/en/api/classes/Entity)

<!--
示例参考: [TrailPath.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/features/TrailPath.svelte)
-->
