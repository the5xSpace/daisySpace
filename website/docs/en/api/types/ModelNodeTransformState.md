[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ModelNodeTransformState

# Type Alias: ModelNodeTransformState

> **ModelNodeTransformState** = `object`

Model node transform state (state side effect).

- This state does not immediately modify node rendering; it is automatically applied to the corresponding node in each frame's ModelFeature.update()
- matrix has highest priority:
 - matrix === null: restores to undefined, returning transform control to the glTF original transform/animation
 - matrix present: directly overwrites the node matrix
- opacity / colorOverlay：
 - The underlying ModelNode does not provide node-level color/alpha
 - Daisy internally modifies the model's DrawCommand uniformMap, allowing the node to reuse the model_color/model_colorBlend pipeline
 - This approach preserves the original lighting result (applied after lightingStage), avoiding abrupt "solid color patch" effects.

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
