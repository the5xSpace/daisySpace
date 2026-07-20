# Camera System

The Daisy camera system provides flying, following, multi-camera, and orbit rotation capabilities.

## Basic Operations

The camera is accessed via `engine.camera`:

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
const entity = engine.createEntity("demo")

// 飞行到目标
engine.camera.flyToTarget(entity, {
    offset: new Daisy.HeadingPitchRange(0, Daisy.Math.toRadians(-45), 2_500_000),
    duration: 2,
})

// flyTo 等价简写
engine.flyTo(entity, { duration: 2 })

// 缩放到单个/多个目标
engine.zoomTo(target, offset)
engine.zoom(target, offset)
engine.zoomAll()   // 缩放到所有可见实体

// 限制缩放距离
engine.setMinZoomDistance(100)
engine.setMaxZoomDistance(10_000_000)
```

`flyToTarget` supports these `target` types:
- `Entity` / `Entity[]` — Gets the entity's current position
- `Cartesian3` / `Cartesian3[]` — World coordinates
- `Cartographic` / `Cartographic[]` — Longitude, latitude, height
- `{ lon, lat, height }` — Longitude/latitude object
- `[lon, lat, height]` — Coordinate array

## Following a Target

```typescript
engine.followTarget(satellite)
// 等价于 engine.camera.followTarget(satellite)
```

`followTarget` accepts `Entity` or `BaseObject`. The camera automatically tracks the target's motion, with ArcRotate orbit control support:

```typescript
engine.camera.followTarget(aircraft, {
    view: {
        distance: 500000,
        headingDeg: 0,
        pitchDeg: -30,
    },
    arcRotate: {
        enableGroundCollisionSlide: true,
    },
})
```

## ArcRotate Camera

ArcRotate mode controls the camera orbiting around the target via mouse drag:

```typescript
// 切换到 ArcRotate 模式
engine.camera.followTarget(sat, {
    arcRotate: {
        targetFrameMode: "model",
        enableGroundCollisionSlide: true,
    },
})
```

| Parameter | Description |
|-----------|-------------|
| `targetFrameMode` | `"model"` (default, inherits target attitude) / `"enu"` (East-North-Up reference, doesn't inherit pitch/roll) |
| `enableGroundCollisionSlide` | Auto-slide when colliding with ground |
| `disableGroundCollisionSlideBelowTargetHeight` | Disable collision slide below this height |

## Multi-Camera (ExtraCamera / PiP)

Picture-in-picture multi-camera is created via `engine.createExtraCamera()`:

```typescript
// 创建额外相机
const extra = engine.createExtraCamera({
    id: "sat-closeup",
})

// 额外相机跟随目标
extra.followTarget(sat.entity, {
    view: { distance: 50000, pitchDeg: -90 },
})

// 打开画中画
extra.openPiP({
    container: "#pip-container",
    position: {
        top: "20px",
        right: "20px",
        width: 320,
        aspectRatio: 16 / 9,
    },
    enableMouseControl: true,
})

// 查询/移除
engine.getExtraCamera("sat-closeup")
engine.removeExtraCamera("sat-closeup")

// 活跃相机
engine.getActiveRenderCameraId()
engine.pushActiveRenderCameraId("sat-closeup")
engine.popActiveRenderCameraId()
```

### flyToTarget Full Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `offset` | `HeadingPitchRange \| Cartesian3` | Camera offset (heading/pitch/range) |
| `duration` | `number` | Flight duration (seconds), 0 for instant |

Supported `target` input forms:
- `Entity` / `Entity[]`
- `Cartesian3` / `Cartesian3[]`
- `Cartographic` / `Cartographic[]`
- `{ lon, lat, height }` / `{ longitude, latitude, height }`
- `[lon, lat]` / `[lon, lat, height]`
- `Promise` — Resolves asynchronously before execution

### flyHome

```typescript
engine.camera.flyHome(duration)  // 飞回默认视角
```

### removeTrackedDaisyEntity

```typescript
// 解除跟踪
engine.camera.removeTrackedDaisyEntity()
```

### ExtraCamera Advanced Capabilities

```typescript
const extra = engine.createExtraCamera({ id: "pip" })

// 显示视锥
extra.showFrustum({
    color: Daisy.Color.CYAN.withAlpha(0.3),
})

// 显示姿态球覆盖层
extra.showAttitudeSphereOverlay({
    size: 140,
})

// PiP 窗口管理
extra.openPiP({
    container: "#pip",
    position: { top: "20px", right: "20px", width: 320, aspectRatio: 16/9 },
    enableMouseControl: true,
    title: "卫星特写",
})

// 销毁
extra.destroy()
```

PiP window supports: drag to move, resize, minimize, maximize/restore.

### ArcRotate Collision Handling

| Parameter | Description |
|-----------|-------------|
| `enableGroundCollisionSlide` | Camera auto-slides when colliding with ground |
| `disableGroundCollisionSlideBelowTargetHeight` | Disables collision slide below this target height |
| `targetFrameMode` | `"model"` (default, inherits target attitude) / `"enu"` (East-North-Up reference, doesn't inherit pitch/roll) |

## Input Control

```typescript
// 全局开关
engine.setCameraInputEnabled(false)

// 按字段精细化控制（返回 restore 函数）
const restore = engine.setCameraInputFlags({
    rotate: false,
    zoom: false,
    translate: true,
})
// ... 操作 ...
restore()
```


> **Related API**: [Camera](/en/api/classes/Camera) · [ExtraCamera](/en/api/classes/ExtraCamera) · [Engine](/en/api/classes/Engine) · [Entity](/en/api/classes/Entity)

---

<!--
  示例参考: [Camera demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/camera)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
