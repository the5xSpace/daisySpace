[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimeInterpolationMode

# Type Alias: TimeInterpolationMode

> **TimeInterpolationMode** = `"step"` \| `"linear"` \| `"cubic"`

离散采样序列的插值模式。

- `"step"`：阶跃（适合开关量/枚举类，区间内保持前值）
- `"linear"`：线性插值（默认，稳定不易过冲）
- `"cubic"`：三次平滑插值（更平滑，适合连续参数）
