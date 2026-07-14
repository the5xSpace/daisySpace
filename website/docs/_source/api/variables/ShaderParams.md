[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ShaderParams

# Variable: ShaderParams

> `const` **ShaderParams**: `Readonly`\<\{ `dynamic`: [`ShaderParamBinding`](../interfaces/ShaderParamBinding.md)\<`T`\>; `entityPosition`: [`ShaderParamBinding`](../interfaces/ShaderParamBinding.md)\<`Cartesian3`\>; `timeSeconds`: [`ShaderParamBinding`](../interfaces/ShaderParamBinding.md)\<`number`\>; \}\>

Shader 动态参数快捷构造器。

返回值可直接放入 `MaterialFactory.Custom()` 的 `uniforms`；材质绘制时会读取最新值。

## Example

```ts
const material = Daisy.MaterialFactory.Custom("TrackingBeam", {
 targetPosition: Daisy.ShaderParams.entityPosition(targetEntity),
 elapsed: Daisy.ShaderParams.timeSeconds(engine),
}, source);
```
