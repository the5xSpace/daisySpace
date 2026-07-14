[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / AtmosphereOptions

# Type Alias: AtmosphereOptions

> **AtmosphereOptions** = `{ atmosphereRadius: number; mieAnisotropy: number; mieScaleHeight: number; mieScattering: Daisy.Cartesian3; planetRadius: number; rayleighScaleHeight: number; rayleighScattering: Daisy.Cartesian3 }`

大气物理参数集合

- 所有长度单位均为米
- 散射与吸收系数为每通道的系数向量
- mieAnisotropy 取值范围 [-1, 1]，常用 0.7~0.9

## Properties

### absorption?

> `optional` **absorption?**: `Daisy.Cartesian3`

吸收系数（RGB 通道系数），可选，默认全 0

***

### atmosphereRadius

> **atmosphereRadius**: `number`

大气层外半径（米），决定遮罩范围

***

### intensity?

> `optional` **intensity?**: `number`

强度偏移，负值减弱、正值增强，常用范围 [-1,1]

***

### mieAnisotropy

> **mieAnisotropy**: `number`

米氏相函数各向异性系数 g，[-1,1]，接近 1 表示明显前向散射

***

### mieScaleHeight

> **mieScaleHeight**: `number`

米氏散射尺度高度 Hm（米），影响前向散射随高度衰减速率

***

### mieScattering

> **mieScattering**: `Daisy.Cartesian3`

米氏散射系数（RGB 通道系数）

***

### planetRadius

> **planetRadius**: `number`

行星半径（米），用于确定地表位置

***

### rayleighScaleHeight

> **rayleighScaleHeight**: `number`

瑞利散射尺度高度 Hr（米），影响蓝色散射强度随高度衰减速率

***

### rayleighScattering

> **rayleighScattering**: `Daisy.Cartesian3`

瑞利散射系数（RGB 通道系数）

***

### steps?

> `optional` **steps?**: `number`

采样步数（整数，>=1），影响视觉质量与性能，默认 12
