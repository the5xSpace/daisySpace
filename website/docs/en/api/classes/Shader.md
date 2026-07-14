[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Shader

# Class: Shader

Daisy 自定义材质 Shader 基类。

提供默认注册逻辑，子类通常只需声明 `type`、`glsl` 和 `uniforms`。

## Example

```ts
class WarningShader extends Daisy.Shader {
 type = "WarningPulse";
 uniforms = { color: Daisy.Color.RED };
 glsl = `
 daisy_material daisy_getMaterial(daisy_materialInput input) {
 daisy_material material = daisy_getDefaultMaterial(input);
 material.diffuse = color.rgb;
 material.alpha = color.a;
 return material;
 }
 `;
}
```

## Implements

- [`IShader`](../interfaces/IShader.md)

## Constructors

### Constructor

> **new Shader**(): `Shader`

#### Returns

`Shader`

## Properties

### glsl

> **glsl**: [`MaterialShaderSource`](../types/MaterialShaderSource.md) = `""`

Daisy GLSL 材质源码。

#### Implementation of

[`IShader`](../interfaces/IShader.md).[`glsl`](../interfaces/IShader.md#glsl)

***

### type

> **type**: `string` = `""`

全局唯一的材质类型标识。

#### Implementation of

[`IShader`](../interfaces/IShader.md).[`type`](../interfaces/IShader.md#type)

***

### uniforms

> **uniforms**: `any` = `{}`

默认 uniform 参数。

#### Implementation of

[`IShader`](../interfaces/IShader.md).[`uniforms`](../interfaces/IShader.md#uniforms)
