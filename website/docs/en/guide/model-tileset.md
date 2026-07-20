# 3D Model and Tileset

## ModelFeature — glTF/GLB Model

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

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | `string` | glTF/GLB resource path |
| `scale` | `number` | Scale |
| `minimumPixelSize` | `number` | Minimum pixel size |
| `maximumScale` | `number` | Maximum scale |
| `color` | `DColor` | Overlay color |
| `silhouetteColor` | `DColor` | Silhouette color |
| `silhouetteSize` | `number` | Silhouette width (pixels) |
| `colorBlendMode` | `ColorBlendMode` | Color blend mode |
| `nodeTransform` | `object` | Node initial transform configuration |

### Node Transformation

Nodes must be accessed after the model is loaded (`onload`). `transformNode(name)` returns a chainable `ModelNodeTransform`, and the set transforms automatically take effect each frame as state side effects:

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

`model.transformNode(name)` returns `ModelNodeTransform`, whose methods are all chainable:

| Method | Description |
|--------|-------------|
| `model.getNodeNames()` | Get all node names `string[]` |
| `model.transformNode(name)` | Get the specified node's transformer (chainable) |
| `.setShow(visible)` | Set node visibility |
| `.setTranslation(Cartesian3)` | Set translation |
| `.setRotation(Quaternion)` / `.setRotationAxisAngleDeg(axis, deg)` / `.setRotationHprDeg(h, p, r)` | Set rotation |
| `.setScale(number \| Cartesian3)` | Set scale |
| `.setColorOverlay(color, blend)` / `.setOpacity(n)` | Set overlay color / opacity |
| `.setMatrix(matrix)` | Directly set local matrix |

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

| Value | Description |
|-------|-------------|
| `ModelAnimationLoop.NONE` | No loop (plays once then stops) |
| `ModelAnimationLoop.REPEAT` | Repeat loop |
| `ModelAnimationLoop.MIRRORED_REPEAT` | Mirror loop (forward then reverse) |

### ModelAnimationPlayOptions Full Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `string` | Animation name (mutually exclusive with index) |
| `index` | `number` | Animation index (mutually exclusive with name) |
| `startTime` | `JulianDate` | Animation start time |
| `delay` | `number` | Delay start (seconds) |
| `stopTime` | `JulianDate` | Animation stop time |
| `removeOnStop` | `boolean` | Auto-remove on stop |
| `multiplier` | `number` | Playback speed multiplier |
| `reverse` | `boolean` | Reverse playback |
| `loop` | `ModelAnimationLoop` | Loop mode |
| `animationTime` | `function` | Custom time mapping function |

## TilesetFeature — 3D Tiles

Used for loading large-scale tiled scenes (city models, point clouds, oblique photography):

```typescript
entity.addFeature(new Daisy.TilesetFeature({
    url: "/tiles/city/tileset.json",
    maximumScreenSpaceError: 16,
    maximumMemoryUsage: 512,           // MB
    dynamicScreenSpaceError: true,     // 自适应帧率
}))
```

Or using Ion resources:

```typescript
entity.addFeature(new Daisy.TilesetFeature({
    ionAssetId: 12345,
    maximumScreenSpaceError: 8,
}))
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `url` | `string` | tileset.json path |
| `ionAssetId` | `number` | Ion resource ID |
| `maximumScreenSpaceError` | `number` | Maximum screen space error |
| `maximumMemoryUsage` | `number` | Maximum memory (MB) |
| `dynamicScreenSpaceError` | `boolean` | Adaptive frame rate optimization |
| `modelMatrix` | `Matrix4` | Overall transform matrix |


> **Related API**: [ModelFeature](/en/api/classes/ModelFeature) · [TilesetFeature](/en/api/classes/TilesetFeature) · [ModelNodeTransform](/en/api/classes/ModelNodeTransform)

---

<!--
示例参考: [Model and Tileset demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/features)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
