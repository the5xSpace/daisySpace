[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ShaderParamBinding

# Interface: ShaderParamBinding\<T\>

动态 Shader 参数，在材质绘制时解析为具体 uniform 值。

## Type Parameters

### T

`T` = `unknown`

## Properties

### fallback

> `readonly` **fallback**: `T`

当前值无法解析时使用的回退值。

***

### glslType

> `readonly` **glslType**: [`ShaderParamType`](../types/ShaderParamType.md)

该参数对应的 GLSL uniform 类型。

***

### kind

> `readonly` **kind**: `"daisy-shader-param"`

动态参数对象的稳定识别标记。

## Methods

### getValue()

> **getValue**(): `T`

读取当前 uniform 值。

#### Returns

`T`
