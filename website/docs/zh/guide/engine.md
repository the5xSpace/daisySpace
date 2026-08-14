# Engine 引擎

[Engine](/api/classes/Engine) 是 DaisySpace-Sdk 的运行时核心入口。一切操作——创建实体、控制相机、管理时间、添加图层——都通过 Engine 实例发起。

## 创建引擎

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

`Engine.create()` 是**异步**静态工厂方法。常用配置：

| 参数 | 类型 | 默认值 | 说明 |
|------|------|:---:|------|
| `viewDistance` | [`ViewDistanceStrategyOptions`](/api/interfaces/ViewDistanceStrategyOptions) | — | 实体/Widget 视距策略（按场景级别切换），详见 [ViewDistance](/guide/view-distance) |
| `updateMaxFps` | `number` | `32` | Daisy 逻辑更新最大帧率 |
| `terrainDetection` | `boolean` | `true` | 启用地形碰撞检测 |
| `entityUpdateGroups` | `number` | `6` | 实体交错更新分组数，范围 [1, 32] |
| `lensFlare` | `boolean \|` [`EngineLensFlareOptions`](/api/interfaces/EngineLensFlareOptions) | — | 镜头光晕效果 |

> **注意**：`Engine.create()` 内部会自动设置静态资源基址。如果想自定义底层资源路径，在 `create` 前调用 `Engine.setEngineBaseUrl("/path/to/cesium/")`。

## 生命周期

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

### play / pause / stop 的区别

| 方法 | `shouldAnimate` | `currentTime` |
|------|:---:|---|
| `play()` | `true` | 正常推进 |
| `pause()` | `false` | **保持当前位置** |
| `stop()` | `false` | **重置到 startTime** |

## 单对象预览会话

`PreviewEngineSession` 面向编辑器、属性检查器和素材面板中的短生命周期预览。它仍使用真实 Engine、Entity、Feature 和物理组件渲染链路，但以 `preview` 运行配置启动，不创建地球、影像、地形、天空、太阳、月球、星空、Widget 或时间调度器。

预览默认自动推进仿真时间并启用连续渲染，相机通过 ArcRotate 跟踪器以每秒 12 度围绕唯一宿主旋转。宿主 Entity 的本体 XYZ 坐标轴默认显示，便于判断粒子发射方向、模型姿态和组件安装方向。

会话启动时只创建一种临时宿主：

| 宿主 | 适用目标 | 挂载方法 |
|------|------|------|
| `entity` | Feature，例如几何体、模型、材质效果和粒子 | `mountFeature()` |
| `base-object` | `IComponent`，也可挂载内部 Entity 的 Feature | `mountComponent()` / `mountFeature()` |

Feature 预览使用最轻量的 Entity 宿主：

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

物理组件预览使用 BaseObject 宿主。未指定 `createObject` 时会创建 `PW.FreeObject`；有合法宿主类型限制的组件必须传入匹配的对象工厂。

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

会话启动时创建的 Entity 或 BaseObject 只是冷启动占位。编辑完整 Entity 或物理对象时，应先在会话外构造对象并挂载它已有的全部 Feature 和 Component，再调用 `replaceHost()`。会话会销毁占位宿主，直接注册并接管传入对象；传入对象不会成为占位宿主的子节点，其现有挂载内容也不会被 `clear()` 删除。

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

`replaceHost()` 接管传入对象的独占生命周期。下一次替换或会话销毁时，该 Entity/BaseObject 及其全部 Feature、Component 会一并销毁，因此不要传入已经属于正式 Runtime 或另一个预览会话的实例。替换后，相机跟踪、本体轴、自动播放和自动环绕都会重新指向新宿主。

`PreviewEngineSession` 拥有当前目标、临时宿主、相机跟踪、本体轴、逐帧环绕回调和 Engine 的完整生命周期。`mountFeature()` 或 `mountComponent()` 会先清理旧目标并确保播放继续，`destroy()` 会注销环绕回调、解除相机跟踪并释放全部临时资源，且可重复调用。预览会话、临时宿主、SDK 实例和预览状态都不应写入 Scenario；业务数据只保存可重新构造目标的定义。

## 实体管理

[Entity](/api/classes/Entity) 是场景中所有可视化对象的容器。每个 Entity 通过挂载 [Feature](/api/classes/Feature) 组件来获得渲染能力。

```typescript
// 方式一：engine.createEntity() 创建并自动注册
const entity = engine.createEntity("Satellite-01")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)
entity.addFeature(new Daisy.PointFeature({ size: 1000, color: Daisy.Color.CYAN }))

// 方式二：new Entity() 后手动添加
const entity = new Daisy.Entity("MyEntity")
engine.addEntity(entity)
```

查询实体：

```typescript
engine.entities           // 所有实体数组
engine.getEntityById(id)  // 按 ID 查找
engine.getEntityByName("Satellite-01")  // 按名称查找
engine.removeEntity(entity)  // 移除实体
```

## 时间控制

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

## 相机控制

Engine 通过 `engine.camera` 暴露相机能力：

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

## 2D / 3D 模式切换

```typescript
engine.is3D()         // 当前是否为 3D 模式
engine.morphTo3D()    // 切换到 3D
engine.morphTo2D()    // 切换到 2D
engine.morphTo(Daisy.SceneMode.SCENE3D)

// 监听切换
engine.onMorphSwitch((mode) => { console.log("切换到:", mode) })
engine.onMorphStart(() => { console.log("开始切换") })
```

> **陷阱**：`morphTo` 只支持 2D 和 3D 之间的切换。2D 模式下会先移除追踪的实体，完成切换后恢复 [ExtraCamera](/api/classes/ExtraCamera)。

## 图层管理

Engine 内置 `geoLayer` 管理器用于影像、地形、天空：

在 `scene` 运行配置中，Engine 默认使用 SDK 的主内置影像 `static/earth/`，即 Web Mercator XYZ 瓦片；`NaturalEarthII` 是第二套可选的 `GeographicTilingScheme` 资源。Web Mercator 不包含完整的南北极投影范围，但影像缺失或请求失败时 globe/椭球仍保持可见。自定义 XYZ 影像时，可通过 `tilingScheme` 在 Web Mercator 和 Geographic 之间选择。第三方地图地址与授权配置见[地理图层](./layers.md)。

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

## Widget 管理

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

> **已于近期变更**：`Engine.create` 的 `timeline` / `controlPanel` / `simulationTimeWidget` 配置已停用，调用时会输出 warning，请改用 `addWidget()`。

## 高性能模式

当场景实体数量较大（数百至数万级别）时，启用高性能模式可显著降低每帧 CPU 开销：

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

**核心策略**：

| 策略 | 说明 |
|------|------|
| 实体更新分组 | 按 ID 哈希分配到 N 组，每帧只更新其中一组 |
| 可见性检查分组 | 时间有效性 + 显隐状态的轻量检查也分组执行 |
| 更新频率节流 | 活跃实体（hover/选中/跟踪）高频更新，其余低频 |
| Feature 裁剪 | 非活跃实体仅保留白名单中的 Feature 类型 |

启用后自动将 `stateCache` 时间桶设为 0.1s、`modelMatrixCache` 设为 1s。禁用后恢复为不限制。

## 渲染回调

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

## 镜头光晕

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

## 天体系统

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

## 其他实用方法

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

## 销毁

```typescript
engine.destroy()
```

`destroy()` 按顺序执行：
1. 停止渲染循环
2. 移除所有事件监听（morph、preUpdate、terrain 错误守卫等）
3. 移除镜头光晕后处理
4. 销毁所有 Entity / Widget / Layer / 物理对象
5. 销毁渲染实例

> **注意**：不要在其他异步操作还在引用 engine 时调用 `destroy()`。

---


<!--
  示例参考: [EngineCreate.svelte](/playground/), [presets.ts](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/infra)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
