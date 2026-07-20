[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / IShader

# Interface: IShader

Daisy custom material Shader interface.

All custom materials that can be registered by the Shader manager must implement this interface.

## Properties

### glsl

> **glsl**: [`MaterialShaderSource`](../types/MaterialShaderSource.md)

Daisy GLSL material source code; plain strings are automatically recognized and Daisy identifiers are converted.

***

### type

> **type**: `string`

Globally unique material type identifier.

***

### uniforms

> **uniforms**: `any`

Shader default uniform parameters. Dynamic parameters are resolved at render time.
