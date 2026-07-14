[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / PropulsionOptions

# Interface: PropulsionOptions

## Properties

### enabled?

> `optional` **enabled?**: `boolean`

是否启用动力装置。

***

### id?

> `optional` **id?**: `string`

动力装置 id。未传时由 BaseComponent 自动生成。

***

### name?

> `optional` **name?**: `string`

动力装置名称，推荐作为业务检索 key。

***

### particle?

> `optional` **particle?**: `false` \| [`PropulsionParticleOptions`](../types/PW.PropulsionParticleOptions.md)

粒子喷焰配置。传 false 可关闭可视效果，仅保留状态组件。

***

### position?

> `optional` **position?**: `Cartesian3`

动力装置相对宿主实体局部坐标系的位置。

***

### power?

> `optional` **power?**: `number`

推力/喷发强度，范围 0~1。当前只影响可视化。

***

### rotation?

> `optional` **rotation?**: [`Rotation`](../types/Rotation.md)

动力装置相对宿主实体局部坐标系的安装姿态。

***

### scale?

> `optional` **scale?**: `Cartesian3`

动力装置局部缩放。
