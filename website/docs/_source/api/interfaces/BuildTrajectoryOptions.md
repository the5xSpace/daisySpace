[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BuildTrajectoryOptions

# Interface: BuildTrajectoryOptions

## Properties

### maxSampleIntervalSeconds?

> `optional` **maxSampleIntervalSeconds?**: `number`

轨迹最大采样间隔（秒）。用于提高由速度推导姿态时的时间分辨率。

***

### sampleRateHz?

> `optional` **sampleRateHz?**: `number`

轨迹最低采样频率（Hz）。例如 24 表示相邻采样点最多间隔 1/24 秒。

***

### timeDistribution?

> `optional` **timeDistribution?**: `number` \| `"uniform"`

时间分配方式。

- `uniform`：按采样点均匀分配时间
- `number`：按段距离 / 该速度估算相对用时，再缩放到 start-stop 总时长
