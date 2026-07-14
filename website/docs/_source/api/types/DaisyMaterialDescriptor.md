[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DaisyMaterialDescriptor

# Type Alias: DaisyMaterialDescriptor

> **DaisyMaterialDescriptor** = `{ kind: "daisy-material"; type: string }`

Daisy 材质描述，可直接传给支持 `DMaterial` 的要素或组件。

## Properties

### kind

> **kind**: `"daisy-material"`

材质描述的稳定识别标记。

***

### source?

> `optional` **source?**: [`MaterialShaderSource`](MaterialShaderSource.md)

自定义材质源码；未设置时按已注册材质类型解析。

***

### translucent?

> `optional` **translucent?**: `boolean`

是否按半透明材质处理。默认 `true`。

***

### type

> **type**: `string`

内置或已注册的材质类型标识。

***

### uniforms?

> `optional` **uniforms?**: `Record`\<`string`, `unknown`\>

材质 uniform 参数。
