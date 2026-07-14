[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / NearEarthOrbiterTrajectoryRequest

# Type Alias: NearEarthOrbiterTrajectoryRequest

> **NearEarthOrbiterTrajectoryRequest** = `object`

轨迹写入请求。

这是更偏业务侧的简写入口：
- `startTime/endTime` 可省略，会自动取当前场景时间
- `stepSeconds` 默认 600

## Properties

### endTime?

> `optional` **endTime?**: `Daisy.JulianDate`

采样结束时刻（仿真时间）；默认取场景结束时间

***

### intervalSeconds?

> `optional` **intervalSeconds?**: `number`

旧参数名兼容：采样间隔（秒）

***

### observerLocation?

> `optional` **observerLocation?**: \[`number`, `number`, `number`\]

观测者位置（经/纬/高），单位：deg/deg/m；默认 [0,0,0]

***

### setOrientation?

> `optional` **setOrientation?**: `boolean`

是否写入姿态；默认 true

***

### startTime?

> `optional` **startTime?**: `Daisy.JulianDate`

采样开始时刻（仿真时间）；默认取场景开始时间

***

### stepSeconds?

> `optional` **stepSeconds?**: `number`

采样步长（秒）；默认 600

***

### trajectoryOptions?

> `optional` **trajectoryOptions?**: [`NearEarthOrbiterTrajectoryOptions`](PW.NearEarthOrbiterTrajectoryOptions.md)

插值参数
