[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DaisyBuiltinModelToggleConfig

# Type Alias: DaisyBuiltinModelToggleConfig

> **DaisyBuiltinModelToggleConfig** = `object`

物理对象构造配置中与内置模型相关的字段。

`model` 使用宽松结构，兼容 ModelOptions（url 可为 Resource）等上层类型。

## Properties

### model?

> `optional` **model?**: \{ `url?`: `unknown`; \} \| `false`

显式模型配置；`false` 表示不挂载模型。

***

### useBuiltinModel?

> `optional` **useBuiltinModel?**: `boolean`

是否启用内置默认模型。默认开启。
