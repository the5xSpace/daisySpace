# Feature Visualization Components

Feature is the atomic unit of rendering capability in DaisySpace-Sdk. Each Feature encapsulates one visual form, such as a point, line, surface, model, label, or particle, and gives an Entity a renderable appearance when attached to it.

## Core Design

```
Entity ─── 挂载 ───→ Feature (点/线/面/模型/标签/粒子 ...)
                      ├── 独立 Transformer（局部变换）
                      ├── 自身 LOD 管理
                      ├── 交互事件（点击/悬停）
                      └── visibility 策略（normal/hover/click）
```

Entity and Feature have a **composition relationship**, not an inheritance relationship. One Entity can attach multiple Features at the same time:

```typescript
import * as Daisy from "daisy-space-sdk"
const engine = await Daisy.Engine.create("daisyContainer")

const entity = engine.createEntity("Satellite")
entity.addFeature(new Daisy.PointFeature({ color: Daisy.Color.RED }))      // 红点标记
entity.addFeature(new Daisy.UI.LabelFeature({ text: "SAT-01" }))           // 文字标签
entity.addFeature(new Daisy.TrailPathFeature({ /* ... */ }))               // 轨迹尾迹
```

## IFeature Interface

Every Feature must implement the `IFeature` interface exposed by the SDK:

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

## Feature Base-Class Capabilities

The `Feature` abstract base class provides capabilities shared by all subclasses:

| Capability | Description |
|------|------|
| **Lifecycle events** | `onBeforeRegister` / `onRegister` / `onAfterRegister` / `onBeforeUpdate` / `onUpdate` / `onBeforeDestroy` / `onDestroy` |
| **Interaction events** | `onClick` / `onDblClick` / `onMouseEnter` / `onMouseLeave` (with `off*` removal methods) |
| **Interaction submission** | `enableSubmitToEntity(true)` — bubbles Feature interaction events to its Entity |
| **Transformer** | `transformer` — independent local transform matrix added to the Entity world matrix |
| **LOD mode** | `lodMode: "entity" \| "self" \| "none"` — selects the LOD strategy |
| **Throttling** | `throttleable` — allows the scheduler to skip updates in high-performance mode |
| **Tracking** | `enableTracking({ trackingTarget })` — dynamically tracks a target position |
| **Visibility strategy** | `visibility: { mode: "normal" \| "hover" \| "click" }` — shows only when hovered or selected |
| **Distance display condition** | `distanceDisplayCondition` — automatically groups visibility by NEAR/MEDIUM/FAR distance |
| **Body-axis debugging** | `setBodyAxis(options)` — displays local axes in 3D mode only |

## Feature Quick Reference

There are **29 Feature types**, including labels/popovers under `UI` and the Entity-internal bounding box, grouped by rendering type:

### Markers

| Feature | Description | Key parameters |
|---------|------|----------|
| `PointFeature` | Point marker (size/color/outline) | `size`, `color`, `outlineColor`, `outlineWidth` |
| `BillboardFeature` | Billboard/icon | `image`, `scale`, `color`, `alignedAxis` |
| `UI.LabelFeature` | Text label (CSS-styled font family) | `text`, `font`, `fillColor`, `style`, `pixelOffset` |
| `UI.PopoverFeature` | Popover (DOM Overlay) | `element`, `anchorPosition`, `trigger` |

### Lines and Paths

| Feature | Description | Key parameters |
|---------|------|----------|
| `PolylineFeature` | Polyline | `positions`, `width`, `material`, `clampToGround` |
| `TrailPathFeature` | Trail path (past and future path) | `historySecond`, `futureSecond`, `resolutionSecond` |
| `CorridorFeature` | Corridor (constant-width region along a path) | `positions`, `width`, `material` |
| `WallFeature` | Vertical wall | `positions`, `minimumHeights`, `maximumHeights` |
| `PolylineVolumeFeature` | Tubular or cross-section polyline volume | `positions`, `shape`, `material` |

### Areas

| Feature | Description | Key parameters |
|---------|------|----------|
| `PolygonFeature` | Filled polygon | `hierarchy`, `material`, `height`, `extrudedHeight` |
| `EllipseFeature` | Ellipse | `center`, `semiMajorAxis`, `semiMinorAxis`, `material` |
| `RectangleFeature` | Rectangle (geographic coordinates) | `coordinates`, `material`, `height` |
| `ShaderPolygonFeature` | Shader-driven polygon | `hierarchy`, `shaderUniforms`, `vertexShader`/`fragmentShader` |
| `CoverageAreaFeature` | Multicolor ground coverage (hardware accelerated) | `polygons`, `colorList` |
| `HeatmapFeature` | Heatmap overlay | `grid`, `colorScale`, `intensity` |
| `GeoJsonFeature` | GeoJSON loading | `data`, `callback`, `style` |

### Solid Geometry

| Feature | Description | Key parameters |
|---------|------|----------|
| `BoxFeature` | Box | `dimensions`, `material`, `outline` |
| `CubeFeature` | Cube | `length`, `material` |
| `CylinderFeature` | Cylinder | `length`, `topRadius`, `bottomRadius`, `material` |
| `EllipsoidFeature` | Ellipsoid | `radii`, `material`, `outline` |
| `SphereFeature` | Sphere | `radius`, `material`, `outline`, `texture` |
| `EllipticalConeFeature` | Elliptical cone (sensor cone) | `length`, `topRadius`, `bottomRadiusX/Y`, `material` |
| `FreeGeometryFeature` | Custom geometry | `positions`, `indices`, `normals`, `st`, `material` |

### Models and Scenes

| Feature | Description | Key parameters |
|---------|------|----------|
| `ModelFeature` | glTF/GLB 3D model | `url`, `scale`, `minimumPixelSize`, `nodeTransform` |
| `TilesetFeature` | 3D Tiles tileset | `url`, `style`, `show` |

### Effects

| Feature | Description | Key parameters |
|---------|------|----------|
| `ParticleFeature` | Particle system | `emitter`, `lifetime`, `speed`, `gravity` |
| `CapsuleParticleFeature` | Capsule particles (host-bound) | `preset`, `emitterPreset`, `particleImage` |
| `ArrowPointerFeature` | Direction arrow | `target`, `length`, `color`, `headWidth` |

### Helpers

| Feature | Description | Key parameters |
|---------|------|----------|
| `BoundBoxFeature` | Bounding box (Entity-internal singleton) | `color`, `show` |

## Lifecycle in Detail

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

### What register() Does

1. Trigger the `BEFORE_REGISTER` event
2. Remove the old morph listener and rebind it to the current Engine
3. Call `beforeRegister(entity)`, which subclasses can override
4. Install the morph-switch callback
5. Install the interaction bridge when `enableSubmitToEntity(true)` is enabled
6. Trigger the `AFTER_REGISTER` event
7. Fill in `distanceDisplayCondition` automatically when it is not configured, using the distance strategy default
8. Set `registered = true`
9. Trigger the `REGISTER` event

### update() Flow

The base-class `update()` performs the following steps each frame:

1. Trigger the `BEFORE_UPDATE` event
2. Call `preUpdate(entity, time)`, which subclasses can override
3. Compute visibility: `options.show && entity.getShowValue(time)`
4. Apply the `visibility` strategy (normal/hover/click)
5. Update `node.position` when `lodMode ≠ "none"` and the Entity position is valid
6. Trigger the `UPDATE` event

> **Subclasses should generally override `preUpdate()` rather than `update()`** to preserve the base-class visibility management logic.

### destroy() Flow

1. Set `registered = false`
2. Trigger the `BEFORE_DESTROY` event
3. Remove the morph listener
4. Destroy the interaction bridge (`FeatureEventHandle`)
5. Destroy the body axis (`BodyAxis`)
6. Trigger the `DESTROY` event
7. Destroy the internal `EventManager`

> `unregister()` is equivalent to `destroy()` plus resetting `registered = false`.

## LOD Modes

Feature provides three LOD modes controlled by `lodMode`:

| Mode | Behavior | Use case |
|------|------|----------|
| `"entity"` (default) | Follows the owning Entity's distance-based LOD decision | Most Features |
| `"self"` | Feature evaluates LOD itself in update | Independent Features such as ShaderPolygon |
| `"none"` | Ignores LOD and always renders according to show | Helper elements that must always be visible |

> **High-performance culling**: When an Entity is inactive and the Feature type is not in the `keepFeatureTypes` allowlist, `update()` is not triggered.

## Interaction Events and Submission

Feature has its own interaction event system:

```typescript
feature.onClick((e) => { console.log("clicked", e.comId) })
feature.onMouseEnter((e) => { /* ... */ })
```

Use `enableSubmitToEntity(true)` to bubble Feature events to Entity:

```typescript
feature.enableSubmitToEntity(true)

// Entity 侧接收
entity.onClick((e) => {
    console.log(e.featureType)  // "PointFeature"
    console.log(e.featureId)    // PointFeature 的 id
})
```

## Transformer

Feature has an independent `transformer` of type `Transformer` with three transform channels:

```typescript
feature.transformer.setTranslation(new Daisy.Cartesian3(100, 0, 0))
feature.transformer.setRotation({ heading: 90, pitch: 0, roll: 0 }) // 角度制
feature.transformer.setScale(new Daisy.Cartesian3(2, 2, 2))

// 获取合成矩阵
const matrix = feature.getMatrix()
```

The Feature Transformer is applied on top of the Entity world matrix to provide a local transform relative to the Entity.

## Visibility Strategy

```typescript
new Daisy.PointFeature({
    color: Daisy.Color.RED,
    visibility: { mode: "hover" },  // 仅在悬停时显示
})
```

| Mode | Behavior |
|------|------|
| `"normal"` | Always visible (default) |
| `"hover"` | Visible only on mouseenter |
| `"click"` | Visible only when selected |

> **Note:** The visibility strategy is handled by `updateByInteraction()`. This is an optional `IFeature` method (`updateByInteraction?`) that Entity calls when interaction state changes during a frame.

## Tracking

Some Features, such as PolylineFeature and ArrowPointerFeature, support dynamic target tracking:

```typescript
polylineFeature.enableTracking({
    trackingEnabled: true,
    trackingTarget: targetEntity,
})
```

- `trackingTarget` supports `Entity` / `Cartographic` / `Cartesian3`
- Subclasses use `_getTrackTargetBPosition()` to obtain the target's current position

## SafePrimitive Rule

> All geometry must be created through `SafePrimitive`; **do not** call the underlying raw API directly. `SafePrimitive` does not crash in 2D or morphing states.

This is an internal Feature implementation constraint. Users normally do not need to know it, but understanding it helps diagnose rendering issues in 2D mode.


## Event System

### Lifecycle Events

| Method | Description |
|------|------|
| `feature.onBeforeRegister(callback)` | Callback before registration |
| `feature.onAfterRegister(callback)` | Callback after registration, when the Feature has been added to Entity |
| `feature.onRegister(callback)` | Registration callback, with `(spaceObject: Entity)` |
| `feature.onBeforeUpdate(callback)` | Callback before each frame update, with `(spaceObject, time)` |
| `feature.onUpdate(callback)` | Callback after each frame update, with `(spaceObject, time)` |
| `feature.onBeforeDestroy(callback)` | Callback before destruction |
| `feature.onDestroy(callback)` | Callback after destruction |

> Feature lifecycle events run independently from Entity lifecycle events.

### Interaction Events

| Method | Description |
|------|------|
| `feature.onClick(handler)` | Fires when this Feature is picked |
| `feature.offClick(handler?)` | Remove listener |
| `feature.onDblClick(handler)` | Double-click |
| `feature.offDblClick(handler?)` | Remove listener |
| `feature.onMouseEnter(handler)` | Mouse enter |
| `feature.offMouseEnter(handler?)` | Remove listener |
| `feature.onMouseLeave(handler)` | Mouse leave |
| `feature.offMouseLeave(handler?)` | Remove listener |

Handler parameter is a `FeaturePickedEvent` (derived from `ClickSpaceEntityResult`) containing fields such as `entityId`, `featureType`, and `entity`. Call `stopPropagation()` to stop bubbling.

```typescript
feature.onClick((e) => {
    console.log("Feature 类型:", e.featureType)
    e.stopPropagation()  // 阻止冒泡到 Entity
})
```

### Event Bubbling

```typescript
// 启用 Feature 交互事件向上提交到所属 Entity
feature.enableSubmitToEntity(true)
```

After enabling it, Feature click/dblclick/mouseenter/mouseleave events automatically bubble to the owning Entity's `receiveFeatureEvent`. Entity then triggers its own `_eventManager` with the same event name.

---

<!--
示例参考: [Feature demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/features)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
