[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / GroundStationAntennaPointingOptions

# Type Alias: GroundStationAntennaPointingOptions

> **GroundStationAntennaPointingOptions** = `object`

## Properties

### azimuthAxis?

> `optional` **azimuthAxis?**: `Daisy.Cartesian3`

方位旋转轴（模型节点局部坐标）。

DSN 预设模型使用 Y 轴作为模型竖直轴。

***

### azimuthNode?

> `optional` **azimuthNode?**: `string`

方位旋转节点。DSN 34m/70m 模型中通常为 `azimuth`。

***

### azimuthOffsetDeg?

> `optional` **azimuthOffsetDeg?**: `number`

模型节点与业务角之间的固定偏置。

***

### elevationAxis?

> `optional` **elevationAxis?**: `Daisy.Cartesian3`

俯仰旋转轴（模型节点局部坐标）。

***

### elevationNode?

> `optional` **elevationNode?**: `string`

俯仰旋转节点。DSN 34m/70m 模型中通常为 `elevation`。

***

### elevationOffsetDeg?

> `optional` **elevationOffsetDeg?**: `number`
