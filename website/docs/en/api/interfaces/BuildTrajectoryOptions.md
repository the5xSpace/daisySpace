[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BuildTrajectoryOptions

# Interface: BuildTrajectoryOptions

## Properties

### maxSampleIntervalSeconds?

> `optional` **maxSampleIntervalSeconds?**: `number`

Maximum trajectory sampling interval (seconds). Used to improve time resolution when deriving attitude from velocity.

***

### sampleRateHz?

> `optional` **sampleRateHz?**: `number`

Minimum trajectory sampling frequency (Hz). For example, 24 means adjacent samples are at most 1/24 second apart.

***

### timeDistribution?

> `optional` **timeDistribution?**: `number` \| `"uniform"`

Time allocation method.

- `uniform`: evenly distributes time across sample points
- `number`: estimates relative time by segment distance / speed, then scales to the start-stop total duration
