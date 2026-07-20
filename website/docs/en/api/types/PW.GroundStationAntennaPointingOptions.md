[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / GroundStationAntennaPointingOptions

# Type Alias: GroundStationAntennaPointingOptions

> **GroundStationAntennaPointingOptions** = `object`

## Properties

### azimuthAxis?

> `optional` **azimuthAxis?**: `Daisy.Cartesian3`

Azimuth rotation axis (model node local coordinates).

DSN preset models use the Y axis as the model vertical axis.

***

### azimuthNode?

> `optional` **azimuthNode?**: `string`

Azimuth rotation node. Typically `azimuth` in DSN 34m/70m models.

***

### azimuthOffsetDeg?

> `optional` **azimuthOffsetDeg?**: `number`

Fixed offset between the model node and the business angle.

***

### elevationAxis?

> `optional` **elevationAxis?**: `Daisy.Cartesian3`

Elevation rotation axis (model node local coordinates).

***

### elevationNode?

> `optional` **elevationNode?**: `string`

Elevation rotation node. Typically `elevation` in DSN 34m/70m models.

***

### elevationOffsetDeg?

> `optional` **elevationOffsetDeg?**: `number`
