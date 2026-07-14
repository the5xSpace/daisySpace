[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / IShader

# Interface: IShader

Daisy 自定义材质 Shader 接口。

所有可由 Shader 管理器统一注册的自定义材质需实现该接口。

## Properties

### glsl

> **glsl**: [`MaterialShaderSource`](../types/MaterialShaderSource.md)

Daisy GLSL 材质源码；直接字符串会自动识别并转换 Daisy 标识符。

***

### type

> **type**: `string`

全局唯一的材质类型标识。

***

### uniforms

> **uniforms**: `any`

Shader 默认 uniform 参数。动态参数会在绘制时解析。
