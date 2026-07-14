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

相机前天气发射体积，x/y/z 分别对应相机右、上、前方向，单位：米。

***

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

***

### distance?

> `optional` **distance?**: `number`

天气体积中心距离相机的前向距离，单位：米。

***

### enabled?

> `optional` **enabled?**: `boolean`

***

### id?

> `optional` **id?**: `string`

***

### intensity?

> `optional` **intensity?**: `number`

天气强度，范围 0~1。用于控制发射率和透明度。

***

### name?

> `optional` **name?**: `string`

***

### particle?

> `optional` **particle?**: `Partial`\<[`ParticleFeatureOptions`](ParticleFeatureOptions.md)\>

覆盖或追加底层世界粒子参数。

***

### preset?

> `optional` **preset?**: [`WeatherParticlePreset`](../types/PW.WeatherParticlePreset.md)
