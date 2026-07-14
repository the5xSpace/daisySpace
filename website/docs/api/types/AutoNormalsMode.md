[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AutoNormalsMode

# Type Alias: AutoNormalsMode

> **AutoNormalsMode** = `"flat"` \| `"smooth"` \| `false`

法线自动计算模式。
- "flat"：每个顶点的法线 = 其所属三角形的面法线，棱角分明。
- "smooth"：每个顶点的法线 = 其相邻三角形面法线的平均，光滑曲面。
- false：不自动计算，使用用户传入的法线。
