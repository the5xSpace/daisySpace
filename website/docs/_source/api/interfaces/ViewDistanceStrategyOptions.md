[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ViewDistanceStrategyOptions

# Interface: ViewDistanceStrategyOptions

视距策略构造参数。

## Properties

### scene?

> `optional` **scene?**: `string`

当前使用的场景模板名。

- 可使用 `ViewScene.*` 的内置值
- 或注册自定义模板名

***

### templates?

> `optional` **templates?**: `Map`\<`string`, [`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)\>

自定义模板集合。

会与内置模板合并；同名 key 会覆盖内置值。
