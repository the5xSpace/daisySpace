# Engine

[Engine](/en/api/classes/Engine) is the runtime core entry point of DaisySpace-Sdk. All operations — creating entities, controlling the camera, managing time, adding layers — are initiated through an Engine instance.

## Creating the Engine

```typescript
import * as Daisy from "daisy-space-sdk"

// 最简创建：传入 DOM 容器
const engine = await Daisy.Engine.create("daisyContainer")

// 完整配置
const engine = await Daisy.Engine.create("daisyContainer", {
    viewDistance: { scene: Daisy.ViewScene.SPACE },
    updateMaxFps: 30,
    terrainDetection: true,
    entityUpdateGroups: 6,
    lensFlare: { show: true, intensity: 1.0 },
})
```

`Engine.create()` is an **asynchronous** static factory method. Common configurations:

| Parameter | Type | Default | Description |
|-----------|------|:---:|-------------|
| `viewDistance` | [`ViewDistanceStrategyOptions`](/en/api/interfaces/ViewDistanceStrategyOptions) | — | Entity/Widget view distance strategy (switchable by scene level), see [ViewDistance](/en/guide/view-distance) |
| `updateMaxFps` | `number` | `32` | Daisy logical update maximum frame rate |
| `terrainDetection` | `boolean` | `true` | Enable terrain collision detection |
| `entityUpdateGroups` | `number` | `6` | Entity interleaved update group count, range [1, 32] |
| `lensFlare` | `boolean \|` [`EngineLensFlareOptions`](/en/api/interfaces/EngineLensFlareOptions) | — | Lens flare effect |

> **Note**: `Engine.create()` internally sets the static resource base URL automatically. To customize the underlying resource path, call `Engine.setEngineBaseUrl("/path/to/cesium/")` before `create`.

## Lifecycle

```
Engine.create()  →  play()  →  setSceneTime()  →  [实体操作]  →  stop() / destroy()
```

```typescript
const engine = await Daisy.Engine.create(container)

// 设置仿真时间范围（2025-06-01 ~ 2025-06-02，循环播放）
const start = Daisy.JulianDate.fromDate(new Date("2025-06-01T00:00:00Z"))
const stop  = Daisy.JulianDate.fromDate(new Date("2025-06-02T00:00:00Z"))
engine.setSceneTime(start, stop, true)

// 启动（可选参数：时间倍速）
engine.play(1)
// 或指定倍速
engine.play(60)  // 60x 加速

// 暂停（冻结当前时间，不重置）
engine.pause()

// 停止（重置到 startTime）
engine.stop()

// 销毁（释放所有资源）
engine.destroy()
```

### play / pause / stop Differences

| Method | `shouldAnimate` | `currentTime` |
|--------|:---:|---|
| `play()` | `true` | Advances normally |
| `pause()` | `false` | **Keeps current position** |
| `stop()` | `false` | **Resets to startTime** |

## Entity Management

[Entity](/en/api/classes/Entity) is the container for all visualizable objects in the scene. Each Entity gains rendering capabilities by mounting [Feature](/en/api/classes/Feature) components.

```typescript
// 方式一：engine.createEntity() 创建并自动注册
const entity = engine.createEntity("Satellite-01")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
entity.addFeature(new Daisy.PointFeature({ size: 1000, color: Daisy.Color.CYAN }))

// 方式二：new Entity() 后手动添加
const entity = new Daisy.Entity("MyEntity")
engine.addEntity(entity)
```

Querying entities:

```typescript
engine.entities           // 所有实体数组
engine.getEntityById(id)  // 按 ID 查找
engine.getEntityByName("Satellite-01")  // 按名称查找
engine.removeEntity(entity)  // 移除实体
```

## Time Control

```typescript
// 场景时间
engine.setSceneTime(startTime, stopTime, true)  // 设置范围 + 循环
engine.getCurrentTime()   // 当前仿真时间
engine.getStartTime()     // 开始时间
engine.getStopTime()      // 结束时间
engine.setCurrentTime(t)  // 跳转到指定时间

// 播放控制
engine.setMultiplier(60)  // 60x 倍速
engine.getMultiplier()    // 获取当前倍速
engine.isAnimating()      // 是否正在播放
engine.setLoop(true)      // 设置循环

// 时间调度器（不同于 scene time，用于调度区间任务）
const schedule = engine.createTimeSchedule()
engine.removeTimeSchedule(schedule)
```

## Camera Control

Engine exposes camera capabilities via `engine.camera`:

```typescript
// 飞行动画到目标
const entity = engine.createEntity("target")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
engine.flyTo(entity, { duration: 2 })
// 或通过 camera 属性
engine.camera.flyToTarget(entity, {
    offset: new Daisy.HeadingPitchRange(0, Daisy.Math.toRadians(-45), 2_500_000),
})

// 跟随实体
engine.followTarget(entity)

// 缩放
engine.zoomTo(target, offset)
engine.zoomAll()  // 缩放到所有可见对象

// 多相机（画中画等场景）
const extra = engine.createExtraCamera({ id: "pip" })
extra.openPiP({ container: "#pip-container" })
engine.getExtraCamera("pip")
engine.removeExtraCamera("pip")

// 限制缩放
engine.setMinZoomDistance(100)
engine.setMaxZoomDistance(10_000_000)

// 锁定/解锁用户交互
engine.setCameraInputEnabled(false)
// 按字段精细化控制（返回 restore 函数）
const restore = engine.setCameraInputFlags({
    rotate: false, zoom: false, translate: false,
})
// ... 操作 ...
restore()  // 恢复
```

## 2D / 3D Mode Switching

```typescript
engine.is3D()         // 当前是否为 3D 模式
engine.morphTo3D()    // 切换到 3D
engine.morphTo2D()    // 切换到 2D
engine.morphTo(Daisy.SceneMode.SCENE3D)

// 监听切换
engine.onMorphSwitch((mode) => { console.log("切换到:", mode) })
engine.onMorphStart(() => { console.log("开始切换") })
```

> **Pitfall**: `morphTo` only supports switching between 2D and 3D. In 2D mode, tracked entities are first removed, then restored after switching back to [ExtraCamera](/en/api/classes/ExtraCamera).

## Layer Management

Engine has a built-in `geoLayer` manager for imagery, terrain, and sky:

```typescript
// 影像
engine.geoLayer.clearImagery()
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: "...",
    minLevel: 0, maxLevel: 3,
})

// 天空
engine.geoLayer.setSky({ type: Daisy.GeoSkyType.Default })

// 辅助图层（网格、参考平面等）
engine.addViewLayer(myGridLayer)
engine.removeViewLayer(myGridLayer)
```

## Widget Management

```typescript
// Widget 不再通过 Engine.create 的顶层配置管理
// 必须使用 addWidget 手动添加
engine.addWidget(new Daisy.ControlPanelWidget({ mode: "standard" }))
engine.addWidget(new Daisy.FrameRateWidget())
engine.getWidgets()            // 获取所有 widget
engine.removeWidget(widget)    // 移除（默认不销毁）
engine.removeWidget(widget, true)  // 移除并销毁
engine.clearWidgets()          // 清空全部
```

> **Recent Change**: The `timeline` / `controlPanel` / `simulationTimeWidget` configurations in `Engine.create` have been deprecated. They will output a warning when called; use `addWidget()` instead.

## High Performance Mode

When the scene contains a large number of entities (hundreds to tens of thousands), enabling high performance mode can significantly reduce per-frame CPU overhead:

```typescript
// 最简启用（使用默认参数）
engine.setHighPerformanceMode(true)

// 查看状态
engine.isHighPerformanceMode()

// 自定义参数
engine.setHighPerformanceMode({
    enabled: true,
    entityUpdateGroups: 4,           // 每帧更新 ~25% 实体
    visibilityCheckGroups: 12,       // 可见性检查分组
    inactiveUpdateIntervalSeconds: 0.5,
    activeUpdateIntervalSeconds: 0.03,
    keepFeatureTypes: ["PointFeature", "UI_LabelFeature", "BillboardFeature"],
})

// 关闭
engine.setHighPerformanceMode(false)
```

**Core Strategies**:

| Strategy | Description |
|----------|-------------|
| Entity update grouping | Entities are divided into N groups by ID hash, only one group updated per frame |
| Visibility check grouping | Lightweight time validity + visibility state checks are also grouped |
| Update frequency throttling | Active entities (hover/selected/tracked) update at high frequency, others at low frequency |
| Feature pruning | Inactive entities only retain whitelisted Feature types |

When enabled, `stateCache` time bucket is automatically set to 0.1s and `modelMatrixCache` to 1s. Disabling restores the unlimited state.

## Render Callbacks

```typescript
// preRender：每帧渲染前
const removePre = engine.onPreRender((time) => { /* ... */ })

// postRender：每帧渲染后
const removePost = engine.onPostRender((time) => { /* ... */ })

// onTick：时钟 tick
const removeTick = engine.onTick(() => { /* ... */ })

// 手动触发一次渲染
engine.triggerUpdateOnce()

// 控制自动渲染
engine.stopAutoRender()   // 按需渲染模式（省电）
engine.startAutoRender()  // 恢复自动渲染
```

## Lens Flare

```typescript
engine.setLensFlare({
    show: true,
    intensity: 1.0,
    distortion: 10.0,
    dispersion: 0.4,
    haloWidth: 0.4,
    dirtAmount: 0.4,
})
engine.setLensFlareVisible(false)  // 临时隐藏（保留参数）
engine.getLensFlareOptions()       // 获取当前配置
```

## Celestial System

```typescript
const engine = await Daisy.Engine.create("daisyContainer")

const moon = new Daisy.PW.Moon({ name: "Moon", lockCamera: true })
engine.switchToCelestial(moon)
moon.bindEngine(engine)

// 当前天体
engine.currentCelestial

// 切换回地球
engine.removeCelestial()
```

## Other Utility Methods

```typescript
engine.debug(true)        // 显示 FPS 面板
engine.resize()           // 手动触发 resize
engine.setReferenceFrame(...)  // 设置参考坐标系
engine.getDaisyUpdateFps()     // 获取 Daisy 逻辑帧率

// 物理对象注册（[BaseObject](/en/api/classes/PW.BaseObject) 基类的内部调用）
engine.registerObject(satellite)
engine.unregisterObject(satellite)
engine.getObjects()

// 时间轴锁定（防止用户拖拽超出 setSceneTime 范围）
engine.lockTimeline()
engine.unlockTimeline()

// 重置回放状态（清空缓存、重置时序对象）
engine.resetPlaybackState(time?)
```

## Destruction

```typescript
engine.destroy()
```

`destroy()` executes in order:
1. Stop the render loop
2. Remove all event listeners (morph, preUpdate, terrain error guard, etc.)
3. Remove lens flare post-processing
4. Destroy all Entity / Widget / Layer / physical objects
5. Destroy the render instance

> **Note**: Do not call `destroy()` while other asynchronous operations still reference the engine.

---


<!--
示例参考: [EngineCreate.svelte](/playground/), [presets.ts](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/infra)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
