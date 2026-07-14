[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ConjunctionOptions

# Type Alias: ConjunctionOptions

> **ConjunctionOptions** = `object`

交汇预报选项。

- `stepSeconds`: 采样步长（越小越精细但更耗时）
- `distanceThreshold`: 触发候选区间的距离阈值（只对阈值内区间做细化搜索）

## Properties

### centralBody?

> `optional` **centralBody?**: [`CentralBody`](CentralBody.md)

***

### distanceThreshold?

> `optional` **distanceThreshold?**: `number`

***

### ellipsoid?

> `optional` **ellipsoid?**: `Daisy.Ellipsoid`

***

### stepSeconds?

> `optional` **stepSeconds?**: `number`
