[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EntityPositionShaderParamOptions

# Interface: EntityPositionShaderParamOptions

实体位置动态参数配置。

## Properties

### fallback?

> `optional` **fallback?**: `Cartesian3`

实体位置不可用时的回退世界坐标。默认零向量。

***

### unavailable?

> `optional` **unavailable?**: [`ShaderParamUnavailablePolicy`](../types/ShaderParamUnavailablePolicy.md)

位置不可用时的处理策略。默认 `hold`。
