[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / CelestialBodyConfig

# Type Alias: CelestialBodyConfig

> **CelestialBodyConfig** = `object`

天体行星对象的共享配置基础。

## Properties

### arrowPointers?

> `optional` **arrowPointers?**: [`ArrowPointerOptions`](ArrowPointerOptions.md)[]

指向箭头配置列表

***

### bodyAxis?

> `optional` **bodyAxis?**: `boolean` \| `BodyAxisOptions`

是否显示体轴

***

### ellipsoid?

> `optional` **ellipsoid?**: `false` \| \{ `shadows?`: `Daisy.ShadowMode`; `show?`: `boolean`; `terminator?`: `boolean`; \}

椭球配置，false 表示禁用

#### Union Members

`false`

***

##### Type Literal

\{ `shadows?`: `Daisy.ShadowMode`; `show?`: `boolean`; `terminator?`: `boolean`; \}

##### shadows?

> `optional` **shadows?**: `Daisy.ShadowMode`

阴影模式

##### show?

> `optional` **show?**: `boolean`

是否显示椭球

##### terminator?

> `optional` **terminator?**: `boolean`

是否启用晨昏线光照过渡

***

### grid?

> `optional` **grid?**: `false` \| `ConstructorParameters`\<*typeof* [`CelestialGeodeticGridLayers`](../classes/CelestialGeodeticGridLayers.md)\>\[`0`\]

经纬网格配置，false 表示禁用

***

### lockCamera?

> `optional` **lockCamera?**: `boolean`

是否锁定相机到天体

***

### name?

> `optional` **name?**: `string`

名称

***

### track?

> `optional` **track?**: `boolean`

是否启用相机跟踪
