[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / InstantOrbitComponentOptions

# Type Alias: InstantOrbitComponentOptions

> **InstantOrbitComponentOptions** = `object`

## Properties

### alwaysOnTop?

> `optional` **alwaysOnTop?**: `boolean`

***

### depthFailMaterial?

> `optional` **depthFailMaterial?**: [`DMaterial`](DMaterial.md)

***

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

***

### maxEccentricity?

> `optional` **maxEccentricity?**: `number`

超过此值时拒绝绘制近抛物线或双曲线状态。

***

### minEccentricity?

> `optional` **minEccentricity?**: `number`

低于此值时将圆轨道视为没有稳定近地点方向。

***

### name?

> `optional` **name?**: `string`

***

### resampleSeconds?

> `optional` **resampleSeconds?**: `number`

重新根据当前位置和速度估算轨道的最短间隔（秒）。

***

### sampleCount?

> `optional` **sampleCount?**: `number`

闭合轨道的采样点数量；首尾会额外重复一个点以闭合曲线。

***

### show?

> `optional` **show?**: `boolean`

***

### velocitySampleSeconds?

> `optional` **velocitySampleSeconds?**: `number`

用于从轨道源估算速度的中心差分时间窗（秒）。

***

### width?

> `optional` **width?**: `number`
