[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / NearEarthOrbiterEphemerisPlan

# Interface: NearEarthOrbiterEphemerisPlan

生成可回放星历的参数。

与 `trajectory` 的旧字段相比，这里把时间范围、采样步长和插值策略
放在同一个任务对象中，调用者不需要猜测布尔字段的组合关系。

## Properties

### computeBackend?

> `optional` **computeBackend?**: [`TrajectoryComputeBackendMode`](../types/TrajectoryComputeBackendMode.md)

***

### interpolationAlgorithm?

> `optional` **interpolationAlgorithm?**: [`TrajectoryInterpolationAlgorithm`](../types/TrajectoryInterpolationAlgorithm.md)

***

### interpolationDegree?

> `optional` **interpolationDegree?**: `number`

***

### stepSeconds?

> `optional` **stepSeconds?**: `number`

***

### timeRange?

> `optional` **timeRange?**: [`NearEarthOrbiterMotionTimeRange`](PW.NearEarthOrbiterMotionTimeRange.md)
