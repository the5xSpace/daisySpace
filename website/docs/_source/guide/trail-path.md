# 轨迹尾迹

[TrailPathFeature](/api/classes/TrailPathFeature) 沿实体运动路径渲染一条分段彩色的尾迹线——历史段、当前段、未来段各独立控制颜色和材质。

## 配置

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
const entity = engine.createEntity("demo")
const trajectory = new Daisy.TrajectorySampleBodyFixed()
trajectory.pushData([
    {
        time: Daisy.JulianDate.fromIso8601("2026-01-01T00:00:00Z"),
        position: Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000),
    },
    {
        time: Daisy.JulianDate.fromIso8601("2026-01-01T01:00:00Z"),
        position: Daisy.Cartesian3.fromDegrees(120.0, 35.0, 500_000),
    },
])
entity.position = trajectory
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

`TrailPathFeature` 需要实体的 `position` 是轨迹采样对象。静态 `Cartesian3` 只表示一个固定位置，不能生成历史或未来轨迹；如果希望使用统一的快捷入口，可以调用 `entity.setPath()`，它会使用同一个轨迹线实现。

或通过 `entity.setPath()` 快捷设置：

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

物理世界对象复用同一条路径实现。`FreeObject` 的 `path` 配置类型就是 `Entity.setPath()` 的参数，`Vehicle`、`NearEarthOrbiter` 和 `Satellite` 通过继承这项配置把路径转发给宿主 Entity；不需要额外挂载轨道路径组件。

## 参数表

| 参数 | 类型 | 默认 | 说明 |
|------|------|:---:|------|
| `width` | `number` | 2 | 线宽（像素） |
| `historySecond` | `number` | 43200 | 历史轨迹时间跨度（秒） |
| `futureSecond` | `number` | 43200 | 未来轨迹时间跨度（秒） |
| `resolutionSecond` | `number` | 60 | 采样间隔（秒） |
| `maxDirectionInterpolationCount` | `number` | 720 | 方向插值上限 |
| `autoOptimize` | `boolean` | true | 自适应密度采样 |
| `color` | `DColor` | PURPLE | 当前段（历史与未来之间）颜色 |
| `historyColor` | `DColor` | — | 历史段颜色 |
| `futureColor` | `DColor` | — | 未来段颜色 |
| `historyMaterial` | `DMaterial` | — | 历史段材质（优先于 historyColor） |
| `futureMaterial` | `DMaterial` | — | 未来段材质（优先于 futureColor） |
| `materialAppearance` | `MaterialAppearance` | — | 渲染外观控制（高级用法） |
| `show` | `boolean` | true | 显隐 |
| `updateIntervalSecond` | `number` | 1 | 轨迹线更新间隔（秒），降低可减少计算量 |
| `distanceDisplayCondition` | `DistanceDisplayCondition` | — | 距离显示条件 |
| `beforeSecond` | `number` | — | historySecond 的兼容别名（已废弃） |
| `afterSecond` | `number` | — | futureSecond 的兼容别名（已废弃） |

## 采样策略

`autoOptimize: true` 时，系统根据以下因素自适应调整采样密度：

- **相机距离**：距离越远，采样越稀疏
- **实体速度**：速度越快，采样越密集以保持视觉连续性
- **实体数量**：大量实体时自动降频

`autoOptimize: false` 时严格按 `resolutionSecond` 和 `maxDirectionInterpolationCount` 采样。

## 性能要点

- TrailPathFeature 内部通过 Worker 线程预计算轨迹采样点
- 大规模星座场景（数千颗卫星）中，非活跃实体的 TrailPathFeature 在高性能模式下会被跳过
- 建议非 hover 卫星设置 `show: false` 或通过 `autoOptimize` 控制采样密度

### TrajectorySample 数据构建

TrailPathFeature 依赖 Entity 的 position 为 TrajectorySample 类型。构建轨迹数据：

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

### 三段着色

TrailPathFeature 将轨迹分为三段独立着色：

- **历史段**（historySecond 范围内）：historyColor / historyMaterial
- **当前段**（当前位置附近）：color
- **未来段**（futureSecond 范围内）：futureColor / futureMaterial

未设置 historyColor/futureColor 时，所有段使用 color。

### Worker 加速

TrailPathFeature 内部将轨迹采样计算卸载到 Web Worker 线程。当实体数量超过 100 时自动启用多线程预计算。`updateIntervalSecond` 控制预计算频率——值越大更新越懒但显示延迟越高。

---

> **相关 API**：[TrailPathFeature](/api/classes/TrailPathFeature) · [TrajectorySample](/api/classes/TrajectorySample) · [Entity](/api/classes/Entity)

<!--
示例参考: [TrailPath.svelte](https://github.com/the5xSpace/daisySpace/blob/main/playground/src/demos/features/TrailPath.svelte)
-->
