[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EntityPositionShaderParamOptions

# Interface: EntityPositionShaderParamOptions

Entity position dynamic parameter configuration.

## Properties

### fallback?

> `optional` **fallback?**: `Cartesian3`

Fallback world coordinates when entity position is unavailable. Defaults to zero vector.

***

### unavailable?

> `optional` **unavailable?**: [`ShaderParamUnavailablePolicy`](../types/ShaderParamUnavailablePolicy.md)

Policy when position is unavailable. Defaults to `hold`.
