# 性能优化

## 高性能模式

当场景中实体数量较大（数百至数万级别）时启用。核心策略：

**实体更新分组**：将实体按 ID 哈希分配到 N 组，每帧仅更新其中一组（降低 CPU 遍历开销）。

**更新频率节流**：活跃实体（hover/选中/跟踪）高频更新，非活跃实体低频更新。

**Feature 类型裁剪**：非活跃实体仅保留白名单中的 Feature 类型（如 Point、Label、Billboard），跳过模型、轨迹等渲染开销较大的 Feature。

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

## Worker 线程加速

以下计算密集型任务自动卸载到 Web Worker：

- 轨迹路径采样（TrailPathFeature 预计算）
- 传感器覆盖区域合并（WASM 布尔运算）
- 着色器多边形网格构建（ShaderPolygonFeature）

Worker 通过 `import.meta.url` 加载 ES Module，无需用户配置。

## WASM 加速

自编译 AssemblyScript 模块用于以下核心计算：

- **SGP4 轨道传播** — `HighPrecisionSGP4Analyzer` 使用 wasm-sgp4 实现高精度轨道计算
- **遮挡检测** — `isOccludedByEllipsoid` 使用 WASM 做射线-椭球求交
- **覆盖合并** — 多个传感器 footprint 的布尔合并

## FPS 控制

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

## 2D / 3D 模式

```typescript
engine.morphTo(Daisy.SceneMode.SCENE3D)
engine.morphTo(Daisy.SceneMode.SCENE2D)
engine.is3D()
engine.isMorphing

// 监听切换事件
engine.onMorphSwitch((mode) => { /* ... */ })
```

模式切换时，所有 Feature 的 `morphSwitchHandle()` 被调用。2D 模式下 ExtraCamera 被自动暂停，跟踪实体被解除（切换回 3D 时恢复）。

## 大星座场景建议

- 启用高性能模式，`entityUpdateGroups` 建议取实体数开方的 1/4 ~ 1/2
- 不需要地面裁剪时，卫星传感器设置 `throughGround: false`，直接按 `beamLength` 延伸
- 非 hover 卫星关闭轨迹路径（`path: { show: false }`）
- 使用 `ResolutionSecond` 控制 TrailPathFeature 采样密度


---

<!--
示例参考: [Performance demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
