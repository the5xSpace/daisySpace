[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / withDaisyBuiltinModel

# Function: withDaisyBuiltinModel()

> **withDaisyBuiltinModel**\<`T`\>(`options`, `kind`, `overrides?`): `T`

为物理对象配置注入内置默认模型。

用于各物理对象构造函数：在调用 super 之前把默认模型写入 options。
用户已显式提供 `model`，或 `useBuiltinModel === false` 时保持原配置不变。

## Type Parameters

### T

`T` *extends* [`DaisyBuiltinModelToggleConfig`](../types/DaisyBuiltinModelToggleConfig.md)

## Parameters

### options

`T` \| `undefined`

### kind

[`DaisyModelKind`](../types/DaisyModelKind.md)

### overrides?

`Partial`\<[`DaisyBuiltinModelVisualOptions`](../types/DaisyBuiltinModelVisualOptions.md)\>

## Returns

`T`
