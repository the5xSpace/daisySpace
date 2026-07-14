[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / GroundStationConfig

# Type Alias: GroundStationConfig

> **GroundStationConfig** = [`VehicleConfig`](PW.VehicleConfig.md) & `object`

## Type Declaration

### antenna?

> `optional` **antenna?**: [`GroundStationAntennaPointingOptions`](PW.GroundStationAntennaPointingOptions.md)

天线节点控制配置。

### stationModel?

> `optional` **stationModel?**: [`GroundStationPresetModel`](PW.GroundStationPresetModel.md) \| [`ModelOptions`](../interfaces/ModelOptions.md) \| `false`

预设站型模型。

- 不传：默认 dsn34
- false：不自动挂载模型
- ModelOptions：使用自定义模型
