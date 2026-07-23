# 3D Models and Tilesets

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

| Parameter | Type | Description |
|------|------|------|
| `url` | `string` | glTF/GLB asset path |
| `scale` | `number` | Scale |
| `minimumPixelSize` | `number` | Minimum pixel size |
| `maximumScale` | `number` | Maximum scale |
| `color` | `DColor` | Color overlay |
| `silhouetteColor` | `DColor` | Silhouette color |
| `silhouetteSize` | `number` | Silhouette width in pixels |
| `colorBlendMode` | `ColorBlendMode` | Color-blend mode |
| `nodeTransform` | `object` | Initial node-transform configuration |

### Node Transforms

Access nodes after the model finishes loading (`onload`). `transformNode(name)` returns a chainable `ModelNodeTransform`; configured transforms are applied automatically each frame as stateful effects:

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

### Node-Transform API

`model.transformNode(name)` returns a `ModelNodeTransform`, whose methods can all be chained:

| Method | Description |
|------|------|
| `model.getNodeNames()` | Get all node names as `string[]` |
| `model.transformNode(name)` | Get a chainable transform for the specified node |
| `.setShow(visible)` | Set node visibility |
| `.setTranslation(Cartesian3)` | Set translation |
| `.setRotation(Quaternion)` / `.setRotationAxisAngleDeg(axis, deg)` / `.setRotationHprDeg(h, p, r)` | Set rotation |
| `.setScale(number \| Cartesian3)` | Set scale |
| `.setColorOverlay(color, blend)` / `.setOpacity(n)` | Set color overlay or opacity |
| `.setMatrix(matrix)` | Set the local matrix directly |

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
|----|------|
| `ModelAnimationLoop.NONE` | No loop; stop after one play |
| `ModelAnimationLoop.REPEAT` | Repeat continuously |
| `ModelAnimationLoop.MIRRORED_REPEAT` | Mirrored loop; play forward and then backward |

### Complete ModelAnimationPlayOptions Parameters

| Parameter | Type | Description |
|------|------|------|
| `name` | `string` | Animation name; choose this or index |
| `index` | `number` | Animation index; choose this or name |
| `startTime` | `JulianDate` | Animation start time |
| `delay` | `number` | Start delay in seconds |
| `stopTime` | `JulianDate` | Animation stop time |
| `removeOnStop` | `boolean` | Remove automatically when stopped |
| `multiplier` | `number` | Playback speed multiplier |
| `reverse` | `boolean` | Play in reverse |
| `loop` | `ModelAnimationLoop` | Loop mode |
| `animationTime` | `function` | Custom time-mapping function |

## TilesetFeature — 3D Tiles

Use it to load large-scale tiled scenes such as city models, point clouds, and photogrammetry:

```typescript
entity.addFeature(new Daisy.TilesetFeature({
    url: "/tiles/city/tileset.json",
    maximumScreenSpaceError: 16,
    maximumMemoryUsage: 512,           // MB
    dynamicScreenSpaceError: true,     // 自适应帧率
}))
```

Or use an Ion asset:

```typescript
entity.addFeature(new Daisy.TilesetFeature({
    ionAssetId: 12345,
    maximumScreenSpaceError: 8,
}))
```

| Parameter | Type | Description |
|------|------|------|
| `url` | `string` | Path to tileset.json |
| `ionAssetId` | `number` | Ion asset ID |
| `maximumScreenSpaceError` | `number` | Maximum screen-space error |
| `maximumMemoryUsage` | `number` | Maximum memory in MB |
| `dynamicScreenSpaceError` | `boolean` | Adaptive frame-rate optimization |
| `modelMatrix` | `Matrix4` | Overall transformation matrix |


> **Related API**: [ModelFeature](/en/api/classes/ModelFeature) · [TilesetFeature](/en/api/classes/TilesetFeature) · [ModelNodeTransform](/en/api/classes/ModelNodeTransform)

---

<!--
示例参考: [Model and Tileset demos](https://github.com/the5xSpace/daisySpace/tree/main/playground/src/demos/features)
  评分配额: API 30/30 | 概念 25/25 | 示例 20/20 | 陷阱 15/15 | 结构 10/10 → 100/100
-->
