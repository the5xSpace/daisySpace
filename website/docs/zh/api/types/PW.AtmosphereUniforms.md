[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / AtmosphereUniforms

# Type Alias: AtmosphereUniforms

> **AtmosphereUniforms** = `{ u\_absorption: Daisy.Cartesian3; u\_atmosphereRadius: number; u\_intensity: number; u\_mieG: number; u\_mieScaleHeight: number; u\_mieScattering: Daisy.Cartesian3; u\_planetRadius: number; u\_rayleighScaleHeight: number; u\_rayleighScattering: Daisy.Cartesian3; u\_steps: number }`

着色器 uniforms 映射

- 与 AtmosphereOptions 一一对应的运行时值
- 供材质 fabric.uniforms 直接使用

## Properties

### u\_absorption

> **u\_absorption**: `Daisy.Cartesian3`

吸收系数（RGB 通道系数）

***

### u\_atmosphereRadius

> **u\_atmosphereRadius**: `number`

大气层半径（米）

***

### u\_intensity

> **u\_intensity**: `number`

强度偏移，负值减弱、正值增强

***

### u\_mieG

> **u\_mieG**: `number`

米氏相函数各向异性系数 g，[-1,1]

***

### u\_mieScaleHeight

> **u\_mieScaleHeight**: `number`

米氏散射尺度高度 Hm（米）

***

### u\_mieScattering

> **u\_mieScattering**: `Daisy.Cartesian3`

米氏散射系数（RGB 通道系数）

***

### u\_planetRadius

> **u\_planetRadius**: `number`

行星半径（米）

***

### u\_rayleighScaleHeight

> **u\_rayleighScaleHeight**: `number`

瑞利散射尺度高度 Hr（米）

***

### u\_rayleighScattering

> **u\_rayleighScattering**: `Daisy.Cartesian3`

瑞利散射系数（RGB 通道系数）

***

### u\_steps

> **u\_steps**: `number`

采样步数（整数，>=1）
