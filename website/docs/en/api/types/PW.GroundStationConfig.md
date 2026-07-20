[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / GroundStationConfig

# Type Alias: GroundStationConfig

> **GroundStationConfig** = [`VehicleConfig`](PW.VehicleConfig.md) & `object`

## Type Declaration

### antenna?

> `optional` **antenna?**: [`GroundStationAntennaPointingOptions`](PW.GroundStationAntennaPointingOptions.md)

Antenna node control configuration.

### stationModel?

> `optional` **stationModel?**: [`GroundStationPresetModel`](PW.GroundStationPresetModel.md) \| [`ModelOptions`](../interfaces/ModelOptions.md) \| `false`

Preset station model.

- Not set: defaults to dsn34
- false: do not auto-mount model
- ModelOptions: use a custom model
