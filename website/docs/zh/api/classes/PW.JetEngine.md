[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / JetEngine

# Class: JetEngine

喷气/喷焰发动机组件。

命名上偏通用，火箭、飞机、卫星姿控喷口都可以先复用这一个可视动力模块。

## Extends

- [`PropulsionComponent`](PW.PropulsionComponent.md)

## Constructors

### Constructor

> **new JetEngine**(`options?`): `JetEngine`

#### Parameters

##### options?

[`PropulsionOptions`](../interfaces/PW.PropulsionOptions.md) = `{}`

#### Returns

`JetEngine`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`constructor`](PW.PropulsionComponent.md#constructor)

## Properties

### transformer

> **transformer**: `Transformer` \| `undefined` = `undefined`

组件级 Transformer（可选）。

建议用来表示“安装/物理基准”变换，而不是去污染 Entity.transformer。

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`transformer`](PW.PropulsionComponent.md#transformer)

***

### type

> `readonly` **type**: `string` = `"JetEngine"`

组件类型标识。子类需要覆写。

#### Overrides

[`PropulsionComponent`](PW.PropulsionComponent.md).[`type`](PW.PropulsionComponent.md#type)

## Accessors

### capsuleParticleFeature

#### Get Signature

> **get** **capsuleParticleFeature**(): [`CapsuleParticleFeature`](CapsuleParticleFeature.md) \| `undefined`

##### Returns

[`CapsuleParticleFeature`](CapsuleParticleFeature.md) \| `undefined`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`capsuleParticleFeature`](PW.PropulsionComponent.md#capsuleparticlefeature)

***

### enabled

#### Get Signature

> **get** **enabled**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`enabled`](PW.PropulsionComponent.md#enabled)

***

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `undefined`

当前物理组件的渲染宿主实体。

##### Returns

[`Entity`](Entity.md) \| `undefined`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`entity`](PW.PropulsionComponent.md#entity)

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

[`PropulsionComponent`](PW.PropulsionComponent.md).[`id`](PW.PropulsionComponent.md#id)

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`isDestroyed`](PW.PropulsionComponent.md#isdestroyed)

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

[`PropulsionComponent`](PW.PropulsionComponent.md).[`name`](PW.PropulsionComponent.md#name)

***

### options

#### Get Signature

> **get** **options**(): [`PropulsionOptions`](../interfaces/PW.PropulsionOptions.md)

##### Returns

[`PropulsionOptions`](../interfaces/PW.PropulsionOptions.md)

#### Set Signature

> **set** **options**(`value`): `void`

##### Parameters

###### value

[`PropulsionOptions`](../interfaces/PW.PropulsionOptions.md)

##### Returns

`void`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`options`](PW.PropulsionComponent.md#options)

***

### particleFeature

#### Get Signature

> **get** **particleFeature**(): [`ParticleFeature`](ParticleFeature.md) \| [`CapsuleParticleFeature`](CapsuleParticleFeature.md) \| `undefined`

##### Returns

[`ParticleFeature`](ParticleFeature.md) \| [`CapsuleParticleFeature`](CapsuleParticleFeature.md) \| `undefined`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`particleFeature`](PW.PropulsionComponent.md#particlefeature)

***

### power

#### Get Signature

> **get** **power**(): `number`

##### Returns

`number`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`power`](PW.PropulsionComponent.md#power)

***

### registered

#### Get Signature

> **get** **registered**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`registered`](PW.PropulsionComponent.md#registered)

***

### worldParticleFeature

#### Get Signature

> **get** **worldParticleFeature**(): [`ParticleFeature`](ParticleFeature.md) \| `undefined`

##### Returns

[`ParticleFeature`](ParticleFeature.md) \| `undefined`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`worldParticleFeature`](PW.PropulsionComponent.md#worldparticlefeature)

## Methods

### clearFocusTarget()

> **clearFocusTarget**(): `this`

清除当前物理组件的选中聚焦盒。

#### Returns

`this`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`clearFocusTarget`](PW.PropulsionComponent.md#clearfocustarget)

***

### destroy()

> **destroy**(): `void`

销毁组件及其内部资源。

#### Returns

`void`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`destroy`](PW.PropulsionComponent.md#destroy)

***

### getFocusFeatures()

> **getFocusFeatures**(): [`IFeature`](../interfaces/IFeature.md)[]

返回组件直接持有的 Feature。

物理组件的具体实现通常将 Feature 保存在私有字段中；这里仅在用户选中组件时
做一次浅层解析，避免把组件内部的渲染 Feature 暴露成新的强制约束。

#### Returns

[`IFeature`](../interfaces/IFeature.md)[]

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`getFocusFeatures`](PW.PropulsionComponent.md#getfocusfeatures)

***

### propulsionPower()

> **propulsionPower**(`power`): `this`

#### Parameters

##### power

`number`

#### Returns

`this`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`propulsionPower`](PW.PropulsionComponent.md#propulsionpower)

***

### register()

> **register**(`object`): [`PropulsionComponent`](PW.PropulsionComponent.md)

将组件注册到物理对象上。

子类通常在这里创建/绑定内部渲染适配层（Feature）或初始化资源。

#### Parameters

##### object

[`BaseObject`](PW.BaseObject.md)

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md)

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`register`](PW.PropulsionComponent.md#register)

***

### resetTemporalState()

> **resetTemporalState**(`time?`): `void`

重置跨时间循环保留的临时状态。

当仿真时间倒退或循环回起点时，宿主对象会调用该方法，让组件清理跨帧缓存。

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`resetTemporalState`](PW.PropulsionComponent.md#resettemporalstate)

***

### setEnabled()

> **setEnabled**(`enabled`): `this`

#### Parameters

##### enabled

`boolean`

#### Returns

`this`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`setEnabled`](PW.PropulsionComponent.md#setenabled)

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

[`PropulsionComponent`](PW.PropulsionComponent.md).[`setFocusTarget`](PW.PropulsionComponent.md#setfocustarget)

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

[`PropulsionComponent`](PW.PropulsionComponent.md).[`setFocusVisible`](PW.PropulsionComponent.md#setfocusvisible)

***

### setPower()

> **setPower**(`power`): `this`

#### Parameters

##### power

`number`

#### Returns

`this`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`setPower`](PW.PropulsionComponent.md#setpower)

***

### start()

> **start**(`power?`): `this`

#### Parameters

##### power?

`number`

#### Returns

`this`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`start`](PW.PropulsionComponent.md#start)

***

### startPropulsion()

> **startPropulsion**(`power?`): `this`

#### Parameters

##### power?

`number`

#### Returns

`this`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`startPropulsion`](PW.PropulsionComponent.md#startpropulsion)

***

### stop()

> **stop**(): `this`

#### Returns

`this`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`stop`](PW.PropulsionComponent.md#stop)

***

### stopPropulsion()

> **stopPropulsion**(): `this`

#### Returns

`this`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`stopPropulsion`](PW.PropulsionComponent.md#stoppropulsion)

***

### unregister()

> **unregister**(): `void`

从物理对象卸载组件，但不销毁组件实例（可用于临时禁用）。

#### Returns

`void`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`unregister`](PW.PropulsionComponent.md#unregister)

***

### update()

> **update**(`_spaceObject`, `_time`): `void`

每帧更新（仿真时间驱动）。

#### Parameters

##### \_spaceObject

[`Entity`](Entity.md)

##### \_time

`JulianDate`

#### Returns

`void`

#### Inherited from

[`PropulsionComponent`](PW.PropulsionComponent.md).[`update`](PW.PropulsionComponent.md#update)
