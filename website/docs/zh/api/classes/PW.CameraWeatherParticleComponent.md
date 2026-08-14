[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / CameraWeatherParticleComponent

# Class: CameraWeatherParticleComponent

相机天气粒子组件。

该组件是 ParticleFeature 的物理世界封装，适合雨、雪、雾、云这类自然粒子：
- 粒子属于世界空间，可以有速度、生命周期和自然扩散；
- 组件会把发射体积挂在相机前方，让用户靠近/拉远时始终有局部天气观感；
- 它不用于火箭喷焰/飞机尾焰。喷焰主体属于强宿主绑定、强聚焦目标，应使用
 CapsuleParticleFeature 或 JetEngine 的 `capsule-sprite` 渲染管线。

## Extends

- [`BaseComponent`](PW.BaseComponent.md)

## Extended by

- [`WeatherParticleComponent`](PW.WeatherParticleComponent.md)

## Constructors

### Constructor

> **new CameraWeatherParticleComponent**(`options?`): `CameraWeatherParticleComponent`

#### Parameters

##### options?

[`CameraWeatherParticleOptions`](../interfaces/PW.CameraWeatherParticleOptions.md) = `{}`

#### Returns

`CameraWeatherParticleComponent`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`constructor`](PW.BaseComponent.md#constructor)

## Properties

### transformer

> **transformer**: `Transformer` \| `undefined` = `undefined`

组件级 Transformer（可选）。

建议用来表示“安装/物理基准”变换，而不是去污染 Entity.transformer。

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`transformer`](PW.BaseComponent.md#transformer)

***

### type

> `readonly` **type**: `string` = `"CameraWeatherParticleComponent"`

组件类型标识。子类需要覆写。

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`type`](PW.BaseComponent.md#type)

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `undefined`

当前物理组件的渲染宿主实体。

##### Returns

[`Entity`](Entity.md) \| `undefined`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`entity`](PW.BaseComponent.md#entity)

***

### id

#### Get Signature

> **get** **id**(): `string`

设置组件 id（全局唯一标识）。

- 通常由 BaseComponent.register() 自动生成
- 也允许业务侧手动指定以便对齐外部系统 id

##### Returns

`string`

#### Set Signature

> **set** **id**(`value`): `void`

设置组件 id（全局唯一标识）。

- 通常由 BaseComponent.register() 自动生成
- 也允许业务侧手动指定以便对齐外部系统 id

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`id`](PW.BaseComponent.md#id)

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`isDestroyed`](PW.BaseComponent.md#isdestroyed)

***

### name

#### Get Signature

> **get** **name**(): `string`

设置组件名称（用于按名称检索/管理）。

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

设置组件名称（用于按名称检索/管理）。

##### Parameters

###### value

`string`

##### Returns

`void`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`name`](PW.BaseComponent.md#name)

***

### options

#### Get Signature

> **get** **options**(): [`CameraWeatherParticleOptions`](../interfaces/PW.CameraWeatherParticleOptions.md)

##### Returns

[`CameraWeatherParticleOptions`](../interfaces/PW.CameraWeatherParticleOptions.md)

#### Set Signature

> **set** **options**(`value`): `void`

##### Parameters

###### value

[`CameraWeatherParticleOptions`](../interfaces/PW.CameraWeatherParticleOptions.md)

##### Returns

`void`

***

### registered

#### Get Signature

> **get** **registered**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`registered`](PW.BaseComponent.md#registered)

## Methods

### clearFocusTarget()

> **clearFocusTarget**(): `this`

清除当前物理组件的选中聚焦盒。

#### Returns

`this`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`clearFocusTarget`](PW.BaseComponent.md#clearfocustarget)

***

### destroy()

> **destroy**(): `void`

销毁组件及其内部资源。

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`destroy`](PW.BaseComponent.md#destroy)

***

### getFocusFeatures()

> **getFocusFeatures**(): [`IFeature`](../interfaces/IFeature.md)[]

返回组件直接持有的 Feature。

物理组件的具体实现通常将 Feature 保存在私有字段中；这里仅在用户选中组件时
做一次浅层解析，避免把组件内部的渲染 Feature 暴露成新的强制约束。

#### Returns

[`IFeature`](../interfaces/IFeature.md)[]

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`getFocusFeatures`](PW.BaseComponent.md#getfocusfeatures)

***

### register()

> **register**(`object`): `CameraWeatherParticleComponent`

将组件注册到物理对象上。

子类通常在这里创建/绑定内部渲染适配层（Feature）或初始化资源。

#### Parameters

##### object

[`BaseObject`](PW.BaseObject.md)

#### Returns

`CameraWeatherParticleComponent`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`register`](PW.BaseComponent.md#register)

***

### resetTemporalState()

> **resetTemporalState**(`_time?`): `void`

重置跨时间循环保留的临时状态。

当仿真时间倒退或循环回起点时，宿主对象会调用该方法，让组件清理跨帧缓存。

#### Parameters

##### \_time?

`JulianDate`

#### Returns

`void`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`resetTemporalState`](PW.BaseComponent.md#resettemporalstate)

***

### setEnabled()

> **setEnabled**(`enabled`): `this`

#### Parameters

##### enabled

`boolean`

#### Returns

`this`

***

### setFocusTarget()

> **setFocusTarget**(`options?`): `this`

显示当前物理组件的选中聚焦盒。

#### Parameters

##### options?

`EntityFocusOptions` = `{}`

#### Returns

`this`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`setFocusTarget`](PW.BaseComponent.md#setfocustarget)

***

### setFocusVisible()

> **setFocusVisible**(`visible`, `options?`): `this`

显示或隐藏当前物理组件的选中聚焦盒。

#### Parameters

##### visible

`boolean`

##### options?

`EntityFocusOptions` = `{}`

#### Returns

`this`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`setFocusVisible`](PW.BaseComponent.md#setfocusvisible)

***

### setIntensity()

> **setIntensity**(`intensity`): `this`

#### Parameters

##### intensity

`number`

#### Returns

`this`

***

### setPreset()

> **setPreset**(`preset`): `this`

#### Parameters

##### preset

[`WeatherParticlePreset`](../types/PW.WeatherParticlePreset.md)

#### Returns

`this`

***

### unregister()

> **unregister**(): `void`

从物理对象卸载组件，但不销毁组件实例（可用于临时禁用）。

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`unregister`](PW.BaseComponent.md#unregister)

***

### update()

> **update**(`spaceObject`, `_time`): `void`

每帧更新（仿真时间驱动）。

#### Parameters

##### spaceObject

[`Entity`](Entity.md)

##### \_time

`JulianDate`

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`update`](PW.BaseComponent.md#update)
