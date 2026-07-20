[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AutoNormalsMode

# Type Alias: AutoNormalsMode

> **AutoNormalsMode** = `"flat"` \| `"smooth"` \| `false`

Normal auto-computation mode.
- "flat": each vertex normal equals its triangle's face normal, giving sharp edges.
- "smooth": each vertex normal is the average of its adjacent triangle face normals, giving smooth surfaces.
- false: do not auto-compute, use user-provided normals.
