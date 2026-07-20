[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ShaderParamBinding

# Interface: ShaderParamBinding\<T\>

Dynamic Shader parameter, resolved to a specific uniform value during material rendering.

## Type Parameters

### T

`T` = `unknown`

## Properties

### fallback

> `readonly` **fallback**: `T`

Fallback value used when the current value cannot be resolved.

***

### glslType

> `readonly` **glslType**: [`ShaderParamType`](../types/ShaderParamType.md)

The GLSL uniform type corresponding to this parameter.

***

### kind

> `readonly` **kind**: `"daisy-shader-param"`

Stable identification tag for the dynamic parameter object.

## Methods

### getValue()

> **getValue**(): `T`

Reads the current uniform value.

#### Returns

`T`
