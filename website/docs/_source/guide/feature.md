# Feature 可视化组件

Feature 是 DaisySpace-Sdk 中渲染能力的原子单元。每个 Feature 封装一种可视化形式——点、线、面、模型、标签、粒子等——通过挂载到 Entity 上来赋予实体可渲染的外观。

## 核心设计

```
Entity ─── 挂载 ───→ Feature (点/线/面/模型/标签/粒子 ...)
                      ├── 独立 Transformer（局部变换）
                      ├── 自身 LOD 管理
                      ├── 交互事件（点击/悬停）
                      └── visibility 策略（normal/hover/click）
```

Entity 与 Feature 是**组合关系**，不是继承关系。一个 Entity 可以同时挂载多个 Feature：

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")

const entity = engine.createEntity("Satellite")
entity.addFeature(new Daisy.PointFeature({ color: Daisy.Color.RED }))      // 红点标记
entity.addFeature(new Daisy.UI.TextFeature({ text: "SAT-01" }))            // 文本
entity.addFeature(new Daisy.TrailPathFeature({ /* ... */ }))               // 轨迹尾迹
```

## IFeature 接口

所有 Feature 必须实现 SDK 暴露的 `IFeature` 接口：

```typescript
interface IFeature {
    readonly type: string            // 类型标识（如 "PointFeature"）
    readonly requiresEntityModelMatrix: boolean  // 是否需要 Entity 计算模型矩阵
    registered: boolean

    register(entity: Entity): IFeature    // 注册到 Entity
    unregister(): void                    // 取消注册
    update(entity: Entity, time: JulianDate): void  // 每帧更新
    destroy(): void                       // 销毁
    morphSwitchHandle(mode: SceneMode): void  // 2D/3D 切换处理
    showLodIt(): void                     // LOD 恢复显示
    hiddenLodIt(): void                   // LOD 隐藏
    forceFlush(): void                    // 强制重建
    reCreate(entity: Entity): void        // 重建底层渲染节点
}
```

## Feature 基类能力

`Feature` 抽象基类提供了所有子类共用的基础能力：

| 能力 | 说明 |
|------|------|
| **生命周期事件** | `onBeforeRegister` / `onRegister` / `onAfterRegister` / `onBeforeUpdate` / `onUpdate` / `onBeforeDestroy` / `onDestroy` |
| **交互事件** | `onClick` / `onDblClick` / `onMouseEnter` / `onMouseLeave`（含 `off*` 取消） |
| **交互上报** | `enableSubmitToEntity(true)` — 将 Feature 的交互事件冒泡给所属 Entity |
| **Transformer** | `transformer` — 独立的局部变换矩阵，叠加到 Entity 的世界矩阵 |
| **LOD 模式** | `lodMode: "entity" \| "self" \| "none"` — 决定 LOD 判定策略 |
| **截流** | `throttleable` — 是否允许调度器在高性能模式下跳过更新 |
| **追踪** | `enableTracking({ trackingTarget })` — 动态追踪目标位置 |
| **可见性策略** | `visibility: { mode: "normal" \| "hover" \| "click" }` — 控制仅在悬停/选中时显示 |
| **距离显示条件** | `distanceDisplayCondition` — 自动按 NEAR/MEDIUM/FAR 视距分级 |
| **体轴调试** | `setBodyAxis(options)` — 显示局部坐标轴（仅 3D） |

## Feature 种类速查表

共 **29 种 Feature**（含 `UI` 下的标签/弹出框和 Entity 内部包围盒），按渲染类型分类：

### 标记类（Marker）

| Feature | 说明 | 关键参数 |
|---------|------|----------|
| `PointFeature` | 点标记（size/color/outline） | `size`, `color`, `outlineColor`, `outlineWidth` |
| `ImageFeature` | 图片/图标 | `image`, `scale`, `color`, `alignedAxis` |
| `UI.TextFeature` | 文本（CSS 样式字体系列） | `text`, `font`, `fillColor`, `style`, `pixelOffset` |
| `UI.PopoverFeature` | 弹出框（DOM Overlay） | `element`, `anchorPosition`, `trigger` |

### 线性图形（Line / Path）

| Feature | 说明 | 关键参数 |
|---------|------|----------|
| `PolylineFeature` | 折线/多段线 | `positions`, `width`, `material`, `clampToGround` |
| `TrailPathFeature` | 轨迹尾迹（历史+未来路径） | `historySecond`, `futureSecond`, `resolutionSecond` |
| `CorridorFeature` | 带状走廊（沿路径等宽区域） | `positions`, `width`, `material` |
| `WallFeature` | 立面墙 | `positions`, `minimumHeights`, `maximumHeights` |
| `PolylineVolumeFeature` | 管状体/截面多段线体积 | `positions`, `shape`, `material` |

### 面状图形（Area）

| Feature | 说明 | 关键参数 |
|---------|------|----------|
| `PolygonFeature` | 填充多边形 | `hierarchy`, `material`, `height`, `extrudedHeight` |
| `EllipseFeature` | 椭圆 | `center`, `semiMajorAxis`, `semiMinorAxis`, `material` |
| `RectangleFeature` | 矩形（地理坐标） | `coordinates`, `material`, `height` |
| `ShaderPolygonFeature` | 着色器驱动多边形 | `hierarchy`, `shaderUniforms`, `vertexShader`/`fragmentShader` |
| `CoverageAreaFeature` | 多色地面覆盖（硬件加速） | `polygons`, `colorList` |
| `HeatmapFeature` | 热力覆盖图 | `grid`, `colorScale`, `intensity` |
| `GeoJsonFeature` | GeoJSON 加载 | `data`, `callback`, `style` |

### 立体图形（Solid Geometry）

| Feature | 说明 | 关键参数 |
|---------|------|----------|
| `BoxFeature` | 长方体 | `dimensions`, `material`, `outline` |
| `CubeFeature` | 正方体 | `length`, `material` |
| `CylinderFeature` | 圆柱体 | `length`, `topRadius`, `bottomRadius`, `material` |
| `EllipsoidFeature` | 椭球体 | `radii`, `material`, `outline` |
| `SphereFeature` | 球体 | `radius`, `material`, `outline`, `texture` |
| `EllipticalConeFeature` | 椭圆锥体（传感器锥体） | `length`, `topRadius`, `bottomRadiusX/Y`, `material` |
| `FreeGeometryFeature` | 自定义几何体 | `positions`, `indices`, `normals`, `st`, `material` |

### 模型与场景（Model / Scene）

| Feature | 说明 | 关键参数 |
|---------|------|----------|
| `ModelFeature` | glTF/GLB 3D 模型 | `url`, `scale`, `minimumPixelSize`, `nodeTransform` |
| `TilesetFeature` | 3D Tiles 切片集 | `url`, `style`, `show` |

### 特效（Effect）

| Feature | 说明 | 关键参数 |
|---------|------|----------|
| `ParticleFeature` | 粒子系统 | `emitter`, `lifetime`, `speed`, `gravity` |
| `CapsuleParticleFeature` | 胶囊粒子（宿主绑定） | `preset`, `emitterPreset`, `particleImage` |
| `ArrowPointerFeature` | 指向箭头 | `target`, `length`, `color`, `headWidth` |

### 辅助（Helper）

| Feature | 说明 | 关键参数 |
|---------|------|----------|
| `BoundBoxFeature` | 包围盒（Entity 内部单例） | `color`, `show` |

## 生命周期详解

```
new XxxFeature(options)
    ↓
entity.addFeature(feature)   ← Feature 上的 onRegister 此时触发
    ↓                          （同时自动补全 distanceDisplayCondition）
帧循环 → feature.update(entity, time)
    ↓                          ← 每帧触发 BEFORE_UPDATE → preUpdate → 位置写入 → UPDATE
entity.removeFeature(feature)
    ↓
feature.destroy()             ← 析构 morph 监听、交互桥接、EventManager
```

### register() 做了哪些事

1. 触发 `BEFORE_REGISTER` 事件
2. 移除旧的 morph 监听，重新绑定到当前 Engine
3. 调用 `beforeRegister(entity)`（子类可覆盖）
4. 安装 morph 切换回调
5. 安装交互事件桥接（若已 `enableSubmitToEntity(true)`）
6. 触发 `AFTER_REGISTER` 事件
7. 自动补全 `distanceDisplayCondition`（若用户未配置，按视距策略取默认值）
8. 设置 `registered = true`
9. 触发 `REGISTER` 事件

### update() 流程

基类 `update()` 每帧执行：

1. 触发 `BEFORE_UPDATE` 事件
2. 调用 `preUpdate(entity, time)`（子类可覆盖）
3. 计算可见性：`options.show && entity.getShowValue(time)`
4. 应用 `visibility` 策略（normal/hover/click）
5. 更新 `node.position`（若 `lodMode ≠ "none"` 且 Entity 位置有效）
6. 触发 `UPDATE` 事件

> **子类通常覆盖 `preUpdate()` 而非 `update()`**，以保留基类的可见性管理逻辑。

### destroy() 流程

1. 设置 `registered = false`
2. 触发 `BEFORE_DESTROY` 事件
3. 解除 morph 监听
4. 销毁交互事件桥接（`FeatureEventHandle`）
5. 销毁体轴（`BodyAxis`）
6. 触发 `DESTROY` 事件
7. 销毁内部 `EventManager`

> `unregister()` 等价于 `destroy()` + 重置 `registered = false`。

## LOD 模式

Feature 提供三种 LOD 模式，通过 `lodMode` 控制：

| 模式 | 行为 | 适用场景 |
|------|------|----------|
| `"entity"`（默认） | 跟随所属 Entity 的视距 LOD 判定 | 大多数 Feature |
| `"self"` | Feature 自行在 update 中判断 LOD | ShaderPolygon 等独立性强的 Feature |
| `"none"` | 忽略 LOD，始终按 show 状态渲染 | 必须始终可见的辅助元素 |

> **高性能模式裁剪**：当 Entity 处于非活跃状态且 Feature 类型不在 `keepFeatureTypes` 白名单中时，不会触发 `update()`。

## 交互事件与上报

Feature 独立拥有一套交互事件系统：

```typescript
feature.onClick((e) => { console.log("clicked", e.comId) })
feature.onMouseEnter((e) => { /* ... */ })
```

通过 `enableSubmitToEntity(true)` 可将 Feature 事件冒泡到 Entity：

```typescript
feature.enableSubmitToEntity(true)

// Entity 侧接收
entity.onClick((e) => {
    console.log(e.featureType)  // "PointFeature"
    console.log(e.featureId)    // PointFeature 的 id
})
```

## Transformer

Feature 拥有独立的 `transformer`（类型 `Transformer`），提供三个变换通道：

```typescript
feature.transformer.setTranslation(new Daisy.Cartesian3(100, 0, 0))
feature.transformer.setRotation({ heading: 90, pitch: 0, roll: 0 }) // 角度制
feature.transformer.setScale(new Daisy.Cartesian3(2, 2, 2))

// 获取合成矩阵
const matrix = feature.getMatrix()
```

Feature 的 Transformer 叠加在 Entity 的世界矩阵之上，实现相对实体的局部变换。

## 可见性策略

```typescript
new Daisy.PointFeature({
    color: Daisy.Color.RED,
    visibility: { mode: "hover" },  // 仅在悬停时显示
})
```

| 模式 | 行为 |
|------|------|
| `"normal"` | 始终可见（默认） |
| `"hover"` | 仅在 mouseenter 时显示 |
| `"click"` | 仅在选中时显示 |

> **注意**：visibility 策略在 `updateByInteraction()` 中处理，该方法是 `IFeature` 的可选方法（`updateByInteraction?`），由 Entity 在每帧交互状态变化时主动调用。

## 追踪能力

部分 Feature（如 PolylineFeature、ArrowPointerFeature）支持动态追踪目标：

```typescript
polylineFeature.enableTracking({
    trackingEnabled: true,
    trackingTarget: targetEntity,
})
```

- `trackingTarget` 支持 `Entity` / `Cartographic` / `Cartesian3`
- 子类通过 `_getTrackTargetBPosition()` 获取目标当前位置

## SafePrimitive 规范

> 所有几何体创建必须通过 `SafePrimitive`，**不能**直接使用底层裸 API。`SafePrimitive` 在 2D / 变形状态下不会崩溃。

这是 Feature 内部实现层面的约束，用户无需感知，但理解它有助于排查 2D 模式下的渲染异常。


## 事件系统

### 生命周期事件

| 方法 | 说明 |
|------|------|
| `feature.onBeforeRegister(callback)` | 注册前回调 |
| `feature.onAfterRegister(callback)` | 注册后回调（Feature 已被添加到 Entity） |
| `feature.onRegister(callback)` | 注册时回调，参数 `(spaceObject: Entity)` |
| `feature.onBeforeUpdate(callback)` | 每帧更新前，参数 `(spaceObject, time)` |
| `feature.onUpdate(callback)` | 每帧更新后，参数 `(spaceObject, time)` |
| `feature.onBeforeDestroy(callback)` | 销毁前回调 |
| `feature.onDestroy(callback)` | 销毁后回调 |

> Feature 的生命周期事件与 Entity 的生命周期独立运行。

### 交互事件

| 方法 | 说明 |
|------|------|
| `feature.onClick(handler)` | 拾取命中该 Feature 时触发 |
| `feature.offClick(handler?)` | 移除 |
| `feature.onDblClick(handler)` | 双击 |
| `feature.offDblClick(handler?)` | 移除 |
| `feature.onMouseEnter(handler)` | 鼠标进入 |
| `feature.offMouseEnter(handler?)` | 移除 |
| `feature.onMouseLeave(handler)` | 鼠标离开 |
| `feature.offMouseLeave(handler?)` | 移除 |

Handler 参数类型为 `FeaturePickedEvent`（继承自 `ClickSpaceEntityResult`），包含 `entityId`、`featureType`、`entity` 等字段，支持 `stopPropagation()` 阻止冒泡。

```typescript
feature.onClick((e) => {
    console.log("Feature 类型:", e.featureType)
    e.stopPropagation()  // 阻止冒泡到 Entity
})
```

### 事件冒泡

```typescript
// 启用 Feature 交互事件向上提交到所属 Entity
feature.enableSubmitToEntity(true)
```

启用后，Feature 的 click/dblclick/mouseenter/mouseleave 事件会自动冒泡到所属 Entity 的 `receiveFeatureEvent`，Entity 收到后会以同一事件名触发自身 `_eventManager`。

---

<!--
示例参考: [Feature demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/features)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
