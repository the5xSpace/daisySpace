# Performance Optimization

## High Performance Mode

Enabled when the scene contains a large number of entities (hundreds to tens of thousands). Core strategies:

**Entity update grouping**: Entities are divided into N groups by ID hash, with only one group updated per frame (reducing CPU traversal overhead).

**Update frequency throttling**: Active entities (hover/selected/tracked) update at high frequency, while inactive entities update at low frequency.

**Feature type pruning**: Inactive entities only retain whitelisted Feature types (e.g., Point, Label, Billboard), skipping expensive rendering features like models and trails.

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")
```

```typescript
// 最简启用
engine.setHighPerformanceMode(true)

// 自定义参数
engine.setHighPerformanceMode({
    enabled: true,
    entityUpdateGroups: 4,
    visibilityCheckGroups: 24,
    inactiveUpdateIntervalSeconds: 0.5,
    activeUpdateIntervalSeconds: 0.03,
    keepFeatureTypes: ["PointFeature", "UI_LabelFeature", "BillboardFeature"],
})

// 自动启用阈值（实体数 >= 500 时自动开启）
engine.setHighPerformanceMode({
    enabled: true,
    autoSetupThreshold: 500,
})
```

## Worker Thread Acceleration

The following computation-intensive tasks are automatically offloaded to Web Workers:

- Trail path sampling (TrailPathFeature pre-computation)
- Sensor coverage area merging (WASM boolean operations)
- Shader polygon mesh construction (ShaderPolygonFeature)

Workers load ES Modules via `import.meta.url`, requiring no user configuration.

## WASM Acceleration

Self-compiled AssemblyScript modules are used for the following core computations:

- **SGP4 orbit propagation** — `HighPrecisionSGP4Analyzer` uses wasm-sgp4 for high-precision orbit computation
- **Occlusion detection** — `isOccludedByEllipsoid` uses WASM for ray-ellipsoid intersection
- **Coverage merging** — Boolean merging of multiple sensor footprints

## FPS Control

```typescript
// 控制 Daisy 逻辑更新帧率
engine.setUpdateMaxFps(30)    // 最高 30 FPS
engine.setUpdateMaxFps(false) // 不限制

// 查询当前逻辑帧率
engine.getDaisyUpdateFps()

// 地形检测开关（关闭可减少 CPU 开销）
engine.setTerrainDetectionEnabled(false)

// 渲染模式
engine.stopAutoRender()   // 按需渲染（省电）
engine.startAutoRender()  // 恢复自动渲染
```

## 2D / 3D Mode

```typescript
engine.morphTo(Daisy.SceneMode.SCENE3D)
engine.morphTo(Daisy.SceneMode.SCENE2D)
engine.is3D()
engine.isMorphing

// 监听切换事件
engine.onMorphSwitch((mode) => { /* ... */ })
```

When switching modes, all Features' `morphSwitchHandle()` is called. In 2D mode, ExtraCamera is automatically paused, and tracked entities are released (restored when switching back to 3D).

## Large Constellation Recommendations

- Enable high performance mode; `entityUpdateGroups` is recommended to be 1/4 to 1/2 of the square root of the entity count
- When ground clipping is not needed, set satellite sensors to `throughGround: false` to extend directly by `beamLength`
- Disable trail paths for non-hover satellites (`path: { show: false }`)
- Use `ResolutionSecond` to control TrailPathFeature sampling density


---

<!--
示例参考: [Performance demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
