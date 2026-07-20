[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ShaderParams

# Variable: ShaderParams

> `const` **ShaderParams**: `Readonly`\<\{ `dynamic`: [`ShaderParamBinding`](../interfaces/ShaderParamBinding.md)\<`T`\>; `entityPosition`: [`ShaderParamBinding`](../interfaces/ShaderParamBinding.md)\<`Cartesian3`\>; `timeSeconds`: [`ShaderParamBinding`](../interfaces/ShaderParamBinding.md)\<`number`\>; \}\>

Shader dynamic parameter shortcut constructor.

The return value can be directly placed in `MaterialFactory.Custom()`'s `uniforms`; the material reads the latest values during rendering.

## Example

```ts
const material = Daisy.MaterialFactory.Custom("TrackingBeam", {
 targetPosition: Daisy.ShaderParams.entityPosition(targetEntity),
 elapsed: Daisy.ShaderParams.timeSeconds(engine),
}, source);
```
