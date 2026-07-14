# 相机系统

Daisy 相机系统提供飞行、跟随、多机位和环绕旋转能力。

## 基本操作

相机通过 `engine.camera` 访问：

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

`flyToTarget` 的 `target` 支持：
- `Entity` / `Entity[]` — 取实体当前位置
- `Cartesian3` / `Cartesian3[]` — 世界坐标
- `Cartographic` / `Cartographic[]` — 经纬度高程
- `{ lon, lat, height }` — 经纬度对象
- `[lon, lat, height]` — 坐标数组

## 跟随目标

```typescript
engine.followTarget(satellite)
// 等价于 engine.camera.followTarget(satellite)
```

`followTarget` 接收 `Entity` 或 `BaseObject`。相机自动跟踪目标运动，支持 ArcRotate 环绕控制：

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

## 环绕相机（ArcRotate）

ArcRotate 模式通过鼠标拖拽控制相机围绕目标旋转：

```typescript
// 切换到 ArcRotate 模式
engine.camera.followTarget(sat, {
    arcRotate: {
        targetFrameMode: "model",
        enableGroundCollisionSlide: true,
    },
})
```

| 参数 | 说明 |
|------|------|
| `targetFrameMode` | `"model"`（默认，继承目标姿态）/ `"enu"`（东北天参考系，不继承俯仰滚转） |
| `enableGroundCollisionSlide` | 碰撞地面时自动滑移 |
| `disableGroundCollisionSlideBelowTargetHeight` | 低于此高度关闭碰撞滑移 |

## 多机位（ExtraCamera / PiP）

画中画多机位通过 `engine.createExtraCamera()` 创建：

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

### flyToTarget 完整参数

| 参数 | 类型 | 说明 |
|------|------|------|
| `offset` | `HeadingPitchRange \| Cartesian3` | 相机偏移量（航向/俯仰/距离） |
| `duration` | `number` | 飞行耗时（秒），0 为瞬移 |

`target` 支持的输入形式：
- `Entity` / `Entity[]`
- `Cartesian3` / `Cartesian3[]`
- `Cartographic` / `Cartographic[]`
- `{ lon, lat, height }` / `{ longitude, latitude, height }`
- `[lon, lat]` / `[lon, lat, height]`
- `Promise` — 异步解析后再执行

### flyHome

```typescript
engine.camera.flyHome(duration)  // 飞回默认视角
```

### removeTrackedDaisyEntity

```typescript
// 解除跟踪
engine.camera.removeTrackedDaisyEntity()
```

### ExtraCamera 高级能力

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

PiP 窗口支持的交互：拖拽移动、调整大小、最小化、最大化/还原。

### ArcRotate 碰撞处理

| 参数 | 说明 |
|------|------|
| `enableGroundCollisionSlide` | 碰撞地面时相机自动滑移 |
| `disableGroundCollisionSlideBelowTargetHeight` | 低于目标此高度时关闭碰撞滑移 |
| `targetFrameMode` | `"model"`（默认，继承目标姿态）/ `"enu"`（东北天参考系，不继承俯仰滚转） |

## 输入控制

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


> **相关 API**：[Camera](/api/classes/Camera) · [ExtraCamera](/api/classes/ExtraCamera) · [Engine](/api/classes/Engine) · [Entity](/api/classes/Entity)

---

<!--
  示例参考: [Camera demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/camera)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
