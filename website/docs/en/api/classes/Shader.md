[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Shader

# Class: Shader

Daisy custom material Shader base class.

Provides default registration logic; subclasses typically only need to declare `type`, `glsl`, and `uniforms`.

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

Daisy GLSL material source code.

#### Implementation of

[`IShader`](../interfaces/IShader.md).[`glsl`](../interfaces/IShader.md#glsl)

***

### type

> **type**: `string` = `""`

Globally unique material type identifier.

#### Implementation of

[`IShader`](../interfaces/IShader.md).[`type`](../interfaces/IShader.md#type)

***

### uniforms

> **uniforms**: `any` = `{}`

Default uniform parameters.

#### Implementation of

[`IShader`](../interfaces/IShader.md).[`uniforms`](../interfaces/IShader.md#uniforms)
