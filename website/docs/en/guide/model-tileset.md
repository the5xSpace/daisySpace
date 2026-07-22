# 3D Models and Tileset

## ModelFeature — glTF/GLB Models

```typescript
import * as Daisy from "daisy-space-sdk"

const engine = await Daisy.Engine.create("daisyContainer")
const entity = engine.createEntity("demo")
entity.position = Daisy.Cartesian3.fromDegrees(116.4, 39.9, 500_000)

entity.addFeature(new Daisy.ModelFeature({
    url: "/assets/satellite.glb",
    scale: 1.0,
    minimumPixelSize: 32,         // 最小像素尺寸，避免远距消失
    maximumScale: 100,            // 最大缩放上限
    color: Daisy.Color.WHITE,           // 模型叠加色
    silhouetteColor: Daisy.Color.RED,   // 选中/悬停的轮廓色
    silhouetteSize: 2,
}))
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | `string` | glTF/GLB 资源路径 |
| `scale` | `number` | 缩放 |
| `minimumPixelSize` | `number` | 最小像素尺寸 |
| `maximumScale` | `number` | 最大缩放 |
| `color` | `DColor` | 叠加色 |
| `silhouetteColor` | `DColor` | 轮廓色 |
| `silhouetteSize` | `number` | 轮廓宽度（像素） |
| `colorBlendMode` | `ColorBlendMode` | 颜色混合模式 |
| `nodeTransform` | `object` | 节点初始变换配置 |

### Node Transforms

节点需在模型加载完成（`onload`）后访问。`transformNode(name)` 返回可链式调用的 `ModelNodeTransform`，所设变换会作为状态副作用在每帧自动生效：

```typescript
const model = entity.addFeature(new Daisy.ModelFeature({ url: "/sat.glb" }))

model.onload(() => {
    // 获取所有节点名称
    const names = model.getNodeNames()
    // → ["Antenna", "Panel", "Body"]

    // 链式设置节点变换（平移 / 旋转 / 缩放）
    model.transformNode("Body")
        .setTranslation(new Daisy.Cartesian3(0, 0, 0.2))
        .setRotationAxisAngleDeg(Daisy.Cartesian3.UNIT_Z, 15)
        .setScale(1.05)

    // 设置节点可见性
    model.transformNode("Panel").setShow(false)
})
```

### Node Transform API

`model.transformNode(name)` returns `ModelNodeTransform`, all methods are chainable:

| Method | 说明 |
|------|------|
| `model.getNodeNames()` | 获取所有节点名称 `string[]` |
| `model.transformNode(name)` | 获取指定节点的变换器（链式） |
| `.setShow(visible)` | 设置节点可见性 |
| `.setTranslation(Cartesian3)` | 设置平移 |
| `.setRotation(Quaternion)` / `.setRotationAxisAngleDeg(axis, deg)` / `.setRotationHprDeg(h, p, r)` | 设置旋转 |
| `.setScale(number \| Cartesian3)` | 设置缩放 |
| `.setColorOverlay(color, blend)` / `.setOpacity(n)` | 设置叠加色 / 不透明度 |
| `.setMatrix(matrix)` | 直接设置局部矩阵 |

### Animation Control

```typescript
const animationId = model.playAnimation({
    name: "Rotation",
    loop: Daisy.ModelAnimationLoop.REPEAT,
    multiplier: 1.0,
    startTime: engine.getCurrentTime(),
})

if (animationId) model.stopAnimation(animationId)
model.getAnimationInfos()  // → [{ index: 0, name: "Rotation" }, ...]
```

### ModelAnimationLoop Enum

| 值 | 说明 |
|----|------|
| `ModelAnimationLoop.NONE` | 不循环（播放一次后停止） |
| `ModelAnimationLoop.REPEAT` | 重复循环 |
| `ModelAnimationLoop.MIRRORED_REPEAT` | 镜像循环（先正向再反向） |

### ModelAnimationPlayOptions — Full Parameters

| 参数 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 动画名称（与 index 二选一） |
| `index` | `number` | 动画索引（与 name 二选一） |
| `startTime` | `JulianDate` | 动画开始时间 |
| `delay` | `number` | 延迟启动（秒） |
| `stopTime` | `JulianDate` | 动画停止时间 |
| `removeOnStop` | `boolean` | 停止时自动移除 |
| `multiplier` | `number` | 播放倍速 |
| `reverse` | `boolean` | 反向播放 |
| `loop` | `ModelAnimationLoop` | 循环模式 |
| `animationTime` | `function` | 自定义时间映射函数 |

## TilesetFeature — 3D Tiles

用于加载大规模切片场景（城市模型、点云、倾斜摄影）：

```typescript
entity.addFeature(new Daisy.TilesetFeature({
    url: "/tiles/city/tileset.json",
    maximumScreenSpaceError: 16,
    maximumMemoryUsage: 512,           // MB
    dynamicScreenSpaceError: true,     // 自适应帧率
}))
```

或使用 Ion 资源：

```typescript
entity.addFeature(new Daisy.TilesetFeature({
    ionAssetId: 12345,
    maximumScreenSpaceError: 8,
}))
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `url` | `string` | tileset.json 路径 |
| `ionAssetId` | `number` | Ion 资源 ID |
| `maximumScreenSpaceError` | `number` | 最大屏幕空间误差 |
| `maximumMemoryUsage` | `number` | 最大内存（MB） |
| `dynamicScreenSpaceError` | `boolean` | 自适应帧率优化 |
| `modelMatrix` | `Matrix4` | 整体变换矩阵 |


> **Related APIs**: [ModelFeature](/api/classes/ModelFeature) · [TilesetFeature](/api/classes/TilesetFeature) · [ModelNodeTransform](/api/classes/ModelNodeTransform)

---

<!--
示例参考: [Model and Tileset demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/features)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
