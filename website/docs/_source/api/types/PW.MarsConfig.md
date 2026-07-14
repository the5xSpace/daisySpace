[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / MarsConfig

# Type Alias: MarsConfig

> **MarsConfig** = [`CelestialBodyConfig`](PW.CelestialBodyConfig.md) & `object`

火星对象配置（含大气层扩展）

## Type Declaration

### atmosphere?

> `optional` **atmosphere?**: `boolean` \| \{ `intensity?`: `number`; `show?`: `boolean`; \}

大气层开关或参数

#### Union Members

`boolean`

***

##### Type Literal

\{ `intensity?`: `number`; `show?`: `boolean`; \}

##### intensity?

> `optional` **intensity?**: `number`

强度偏移，负值减弱、正值增强

##### show?

> `optional` **show?**: `boolean`

是否显示大气层
