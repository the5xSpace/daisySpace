[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / GeoGlobeOptions

# Interface: GeoGlobeOptions

地表显示属性配置。
所有字段均为可选，仅对传入的字段进行设置，未传入的字段保持当前值。

## Properties

### atmosphereBrightnessShift?

> `optional` **atmosphereBrightnessShift?**: `number`

大气亮度偏移（-1~1）

***

### atmosphereHueShift?

> `optional` **atmosphereHueShift?**: `number`

大气色调偏移（0~1）

***

### atmosphereSaturationShift?

> `optional` **atmosphereSaturationShift?**: `number`

大气饱和度偏移（-1~1）

***

### backFaceCulling?

> `optional` **backFaceCulling?**: `boolean`

是否剔除地形背面

***

### baseColor?

> `optional` **baseColor?**: `Color`

无影像时的地球底色

***

### depthTestAgainstTerrain?

> `optional` **depthTestAgainstTerrain?**: `boolean`

图元（Billboard/Polyline/Label 等）是否与地形做深度测试

***

### enableLighting?

> `optional` **enableLighting?**: `boolean`

是否启用日照光照效果

***

### lambertDiffuseMultiplier?

> `optional` **lambertDiffuseMultiplier?**: `number`

日照 Lambert 漫反射系数（仅 enableLighting=true 时生效）

***

### lightingFadeInDistance?

> `optional` **lightingFadeInDistance?**: `number`

光照开始衰减的距离（米），仅 enableLighting 或 showGroundAtmosphere 时生效

***

### lightingFadeOutDistance?

> `optional` **lightingFadeOutDistance?**: `number`

光照完全生效的距离（米），仅 enableLighting 或 showGroundAtmosphere 时生效

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md) \| `null`

地形材质；传入 null 可清除当前材质

***

### maximumScreenSpaceError?

> `optional` **maximumScreenSpaceError?**: `number`

屏幕空间误差，值越高性能越好但画质越低

***

### shadows?

> `optional` **shadows?**: `number`

阴影模式：0=禁用, 1=启用投射, 2=启用接收, 3=投射+接收

***

### show?

> `optional` **show?**: `boolean`

是否显示地球，默认 true

***

### showGroundAtmosphere?

> `optional` **showGroundAtmosphere?**: `boolean`

是否显示地表大气层

***

### showSkirts?

> `optional` **showSkirts?**: `boolean`

是否显示地形裙边

***

### showWaterEffect?

> `optional` **showWaterEffect?**: `boolean`

是否显示水面波浪效果

***

### tileCacheSize?

> `optional` **tileCacheSize?**: `number`

地形瓦片缓存数量

***

### vertexShadowDarkness?

> `optional` **vertexShadowDarkness?**: `number`

顶点阴影暗度（仅 enableLighting=true 时生效）
