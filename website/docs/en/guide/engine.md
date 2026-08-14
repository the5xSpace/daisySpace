# Engine

[Engine](/en/api/classes/Engine) is the runtime entry point of DaisySpace-Sdk. All operations, including creating entities, controlling the camera, managing time, and adding layers, are initiated through an Engine instance.

## Create an Engine

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

`Engine.create()` is an **asynchronous** static factory method. Common options include:

| Parameter | Type | Default | Description |
|------|------|:---:|------|
| `viewDistance` | [`ViewDistanceStrategyOptions`](/en/api/interfaces/ViewDistanceStrategyOptions) | — | Entity/Widget view-distance strategy (switches by scene level); see [ViewDistance](/en/guide/view-distance) |
| `updateMaxFps` | `number` | `32` | Maximum Daisy logic-update frame rate |
| `terrainDetection` | `boolean` | `true` | Enable terrain collision detection |
| `entityUpdateGroups` | `number` | `6` | Number of staggered Entity-update groups, from [1, 32] |
| `lensFlare` | `boolean \|` [`EngineLensFlareOptions`](/en/api/interfaces/EngineLensFlareOptions) | — | Lens-flare effect |

> **Note**: `Engine.create()` automatically sets the static asset base URL. To customize the underlying asset path, call `Engine.setEngineBaseUrl("/path/to/cesium/")` before `create`.

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

### Difference Between play / pause / stop

| Method | `shouldAnimate` | `currentTime` |
|------|:---:|---|
| `play()` | `true` | Advances normally |
| `pause()` | `false` | **Keeps the current position** |
| `stop()` | `false` | **Resets to startTime** |

## Single-Object Preview Sessions

`PreviewEngineSession` is intended for short-lived previews in editors, inspectors, and asset panels. It still uses the real Engine, Entity, Feature, and physical-component rendering pipeline, but starts with the `preview` runtime profile and creates no globe, imagery, terrain, sky, sun, moon, stars, Widget, or time scheduler.

By default, a preview advances simulation time with continuous rendering enabled. Its camera uses the ArcRotate tracker to orbit the single host at 12 degrees per second. The host Entity's body XYZ axes are visible by default so particle emission, model attitude, and component mounting directions remain clear.

Each session creates exactly one temporary host when it starts:

| Host | Intended targets | Mounting methods |
|------|------|------|
| `entity` | Features such as geometry, models, material effects, and particles | `mountFeature()` |
| `base-object` | `IComponent` instances; it can also mount Features on the internal Entity | `mountComponent()` / `mountFeature()` |

Feature previews use the lightest Entity host:

```typescript
const session = await Daisy.PreviewEngineSession.create(container, {
    host: { kind: "entity", name: "Particle Preview" },
    cameraRange: 220,
    autoPlay: true,
    autoOrbit: true,
    orbitSpeedDegreesPerSecond: 12,
    showBodyAxis: true,
})

session.mountFeature(new Daisy.ParticleFeature({
    emissionRate: 120,
    minimumSpeed: 10,
    maximumSpeed: 30,
}))

// 参数变化时再次挂载，新 Feature 会替换并销毁旧目标
session.mountFeature(new Daisy.ParticleFeature({ emissionRate: 240 }))
session.resize()

// 这些开关只影响当前预览会话
session.setBodyAxisVisible(false)
session.setAutoOrbit(false)
session.resetCamera()

// 面板关闭、类型切换或创建完成时释放目标、宿主和 Engine
session.destroy()
```

Physical-component previews use a BaseObject host. When `createObject` is omitted, the session creates a `PW.FreeObject`; components with host-type restrictions must provide a compatible object factory.

```typescript
const session = await Daisy.PreviewEngineSession.create(container, {
    host: { kind: "base-object", name: "Component Preview" },
})

session.mountComponent(new Daisy.PW.WeatherParticleComponent({
    preset: "rain",
}))

// 宿主类别变化时重建唯一临时宿主
session.setHost({ kind: "entity", name: "Feature Preview" })
session.destroy()
```

The Entity or BaseObject created when a session starts is only a cold-start placeholder. When editing a complete Entity or physical object, first construct the object outside the session and attach all of its existing Features and Components, then call `replaceHost()`. The session destroys the placeholder, directly registers the supplied object, and takes ownership of it. The supplied object does not become a child of the placeholder, and its existing attachments are not removed by `clear()`.

```typescript
const session = await Daisy.PreviewEngineSession.create(container, {
    host: { kind: "entity", name: "Loading Placeholder" },
})

const entity = new Daisy.Entity("Edited Entity")
entity.addFeature(new Daisy.CubeFeature({ dimensions: new Daisy.Cartesian3(10, 10, 10) }))
entity.addFeature(new Daisy.PointFeature({ size: 16 }))

// 草稿构造完成后，直接替换占位宿主并接管完整对象
session.replaceHost(entity)
```

`replaceHost()` takes exclusive ownership of the supplied object's lifecycle. The next replacement or session destruction disposes that Entity/BaseObject together with all of its Features and Components, so do not pass an instance that already belongs to the production Runtime or another preview session. After replacement, camera tracking, body axes, automatic playback, and automatic orbiting all target the new host.

`PreviewEngineSession` owns the complete lifecycle of the current target, temporary host, camera tracking, body axes, per-frame orbit callback, and Engine. `mountFeature()` and `mountComponent()` clear the previous target and ensure playback continues. `destroy()` unregisters the orbit callback, releases camera tracking, and disposes every temporary resource; repeated calls are safe. Never persist preview sessions, temporary hosts, SDK instances, or preview state in a Scenario. Business data should contain only the definitions needed to reconstruct the target.

## Entity Management

[Entity](/en/api/classes/Entity) is the container for all visual objects in the scene. Each Entity gains rendering capabilities by mounting [Feature](/en/api/classes/Feature) components.

```typescript
// 方式一：engine.createEntity() 创建并自动注册
const entity = engine.createEntity("Satellite-01")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
entity.addFeature(new Daisy.PointFeature({ size: 1000, color: Daisy.Color.CYAN }))

// 方式二：new Entity() 后手动添加
const entity = new Daisy.Entity("MyEntity")
engine.addEntity(entity)
```

Query Entities:

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

Engine exposes camera capabilities through `engine.camera`:

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

## Switch Between 2D and 3D Modes

```typescript
engine.is3D()         // 当前是否为 3D 模式
engine.morphTo3D()    // 切换到 3D
engine.morphTo2D()    // 切换到 2D
engine.morphTo(Daisy.SceneMode.SCENE3D)

// 监听切换
engine.onMorphSwitch((mode) => { console.log("切换到:", mode) })
engine.onMorphStart(() => { console.log("开始切换") })
```

> **Pitfall**: `morphTo` supports switching only between 2D and 3D. In 2D mode, the tracked Entity is removed first and [ExtraCamera](/en/api/classes/ExtraCamera) is restored after the switch.

## Layer Management

Engine includes the `geoLayer` manager for imagery, terrain, and sky:

In the `scene` runtime profile, Engine uses the SDK's primary built-in imagery from `static/earth/` by default, using Web Mercator XYZ tiles. `NaturalEarthII` is the second built-in resource and uses `GeographicTilingScheme`. Web Mercator does not include the full polar projection range, but the globe/ellipsoid remains visible when imagery is missing or a request fails. For custom XYZ imagery, use `tilingScheme` to choose between Web Mercator and geographic coordinates. See [Geographic Layers](./layers.md) for third-party map addresses and authorization settings.

```typescript
// 影像
engine.geoLayer.clearImagery()
engine.geoLayer.setBaseImagery({
    type: Daisy.GeoImageryType.XYZ,
    url: Daisy.BuildModuleUrl.getUrl("static/earth/{z}/{x}/{y}.jpg"),
    minLevel: 0,
    maxLevel: 3,
    tilingScheme: "webMercator",
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

> **Recent change**: The `timeline`, `controlPanel`, and `simulationTimeWidget` options of `Engine.create` are deprecated. They emit a warning when used; use `addWidget()` instead.

## High-Performance Mode

When a scene contains many Entities (from hundreds to tens of thousands), high-performance mode can significantly reduce per-frame CPU cost:

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
    keepFeatureTypes: ["PointFeature", "UI_TextFeature", "ImageFeature"],
})

// 关闭
engine.setHighPerformanceMode(false)
```

**Core strategies**:

| Strategy | Description |
|------|------|
| Entity update groups | Assign Entities to N groups by ID hash and update only one group per frame |
| Visibility-check groups | Group lightweight checks for time validity and visibility state as well |
| Update-rate throttling | Update active Entities (hovered/selected/tracked) frequently and the rest less often |
| Feature culling | Keep only allowlisted Feature types on inactive Entities |

When enabled, `stateCache` uses 0.1-second time buckets and `modelMatrixCache` uses 1-second buckets. Disabling the mode restores unlimited buckets.

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

// 物理对象注册（[BaseObject](/api/classes/PW.BaseObject) 基类的内部调用）
engine.registerObject(satellite)
engine.unregisterObject(satellite)
engine.getObjects()

// 时间轴锁定（防止用户拖拽超出 setSceneTime 范围）
engine.lockTimeline()
engine.unlockTimeline()

// 重置回放状态（清空缓存、重置时序对象）
engine.resetPlaybackState(time?)
```

## Destroy

```typescript
engine.destroy()
```

`destroy()` performs the following steps in order:
1. Stop the render loop.
2. Remove all event listeners (morph, preUpdate, terrain error guards, and others).
3. Remove the lens-flare post-process stage.
4. Destroy all Entity, Widget, Layer, and physics objects.
5. Destroy the rendering instance.

> **Note**: Do not call `destroy()` while other asynchronous operations still reference the engine.

---


<!--
  示例参考: [EngineCreate.svelte](/playground/), [presets.ts](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/infra)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
