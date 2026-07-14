[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ModelNodeTransformState

# Type Alias: ModelNodeTransformState

> **ModelNodeTransformState** = `object`

模型节点变换状态（状态副作用）。

- 该状态不会立即修改节点渲染，而是在 ModelFeature.update() 每帧自动应用到对应节点
- matrix 优先级最高：
 - matrix === null：恢复为 undefined，把变换控制权交还给 glTF 原始 transform/动画
 - matrix 存在：直接覆盖节点 matrix
- opacity / colorOverlay：
 - 底层 ModelNode 本身不提供节点级 color/alpha
 - Daisy 在内部通过修改模型 DrawCommand 的 uniformMap，让节点复用 的 model_color/model_colorBlend 管线
 - 该方案会保留原有光照结果（在 lightingStage 之后叠加），避免“纯色贴片”式的突兀效果

## Properties

### colorOverlay?

> `optional` **colorOverlay?**: [`DColor`](DColor.md)

***

### colorOverlayBlend?

> `optional` **colorOverlayBlend?**: `number`

***

### matrix?

> `optional` **matrix?**: `Daisy.Matrix4` \| `null`

***

### opacity?

> `optional` **opacity?**: `number`

***

### rotation?

> `optional` **rotation?**: `Daisy.Quaternion`

***

### scale?

> `optional` **scale?**: `number` \| `Daisy.Cartesian3`

***

### show?

> `optional` **show?**: `boolean`

***

### translation?

> `optional` **translation?**: `Daisy.Cartesian3`
