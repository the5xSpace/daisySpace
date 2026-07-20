[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / CameraWeatherParticleOptions

# Interface: CameraWeatherParticleOptions

## Properties

### alpha?

> `optional` **alpha?**: `number`

***

### area?

> `optional` **area?**: `Cartesian3`

Weather emission volume in front of the camera. x/y/z correspond to camera right/up/forward directions, in meters.

***

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

***

### distance?

> `optional` **distance?**: `number`

Forward distance from the camera to the center of the weather volume, in meters.

***

### enabled?

> `optional` **enabled?**: `boolean`

***

### id?

> `optional` **id?**: `string`

***

### intensity?

> `optional` **intensity?**: `number`

Weather intensity, range 0~1. Controls emission rate and transparency.

***

### name?

> `optional` **name?**: `string`

***

### particle?

> `optional` **particle?**: `Partial`\<[`ParticleFeatureOptions`](ParticleFeatureOptions.md)\>

Overrides or appends underlying world particle parameters.

***

### preset?

> `optional` **preset?**: [`WeatherParticlePreset`](../types/PW.WeatherParticlePreset.md)
