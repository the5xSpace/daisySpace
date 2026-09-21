[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / resolveDaisyBuiltinModelOptions

# Function: resolveDaisyBuiltinModelOptions()

> **resolveDaisyBuiltinModelOptions**(`options`, `kind`, `overrides?`): `false` \| [`DaisyBuiltinModelVisualOptions`](../types/DaisyBuiltinModelVisualOptions.md) \| \{ `url?`: `unknown`; \} \| `undefined`

解析物理对象应使用的模型配置（构造期）。

优先级：
1. 显式 `model`（含 `false`）
2. `useBuiltinModel === false` → 不注入
3. 否则返回对应 `DaisyModelLibrary` 内置模型

## Parameters

### options

[`DaisyBuiltinModelToggleConfig`](../types/DaisyBuiltinModelToggleConfig.md) \| `undefined`

### kind

[`DaisyModelKind`](../types/DaisyModelKind.md)

### overrides?

`Partial`\<[`DaisyBuiltinModelVisualOptions`](../types/DaisyBuiltinModelVisualOptions.md)\>

## Returns

`false` \| [`DaisyBuiltinModelVisualOptions`](../types/DaisyBuiltinModelVisualOptions.md) \| \{ `url?`: `unknown`; \} \| `undefined`

`false` / 用户自定义模型 / 内置模型；`undefined` 表示不注入
