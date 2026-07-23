[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / PropulsionComponent

# Class: PropulsionComponent

通用动力组件。

第一阶段只表达“动力装置的状态与可视化喷焰”，不参与轨迹积分或姿态控制。

## Extends

- [`BaseComponent`](PW.BaseComponent.md)

## Extended by

- [`JetEngine`](PW.JetEngine.md)

## Constructors

### Constructor

> **new PropulsionComponent**(`options?`): `PropulsionComponent`

#### Parameters

##### options?

[`PropulsionOptions`](../interfaces/PW.PropulsionOptions.md) = `{}`

#### Returns

`PropulsionComponent`

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

> `readonly` **type**: `string` = `"PropulsionComponent"`

组件类型标识。子类需要覆写。

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`type`](PW.BaseComponent.md#type)

## Accessors

### capsuleParticleFeature

#### Get Signature

> **get** **capsuleParticleFeature**(): [`CapsuleParticleFeature`](CapsuleParticleFeature.md) \| `undefined`

##### Returns

[`CapsuleParticleFeature`](CapsuleParticleFeature.md) \| `undefined`

***

### enabled

#### Get Signature

> **get** **enabled**(): `boolean`

##### Returns

`boolean`

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

[`RouteComponent`](PW.RouteComponent.md).[`id`](PW.RouteComponent.md#id)

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

***

### particleFeature

#### Get Signature

> **get** **particleFeature**(): [`ParticleFeature`](ParticleFeature.md) \| [`CapsuleParticleFeature`](CapsuleParticleFeature.md) \| `undefined`

##### Returns

[`ParticleFeature`](ParticleFeature.md) \| [`CapsuleParticleFeature`](CapsuleParticleFeature.md) \| `undefined`

***

### power

#### Get Signature

> **get** **power**(): `number`

##### Returns

`number`

***

### registered

#### Get Signature

> **get** **registered**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`registered`](PW.BaseComponent.md#registered)

***

### worldParticleFeature

#### Get Signature

> **get** **worldParticleFeature**(): [`ParticleFeature`](ParticleFeature.md) \| `undefined`

##### Returns

[`ParticleFeature`](ParticleFeature.md) \| `undefined`

## Methods

### destroy()

> **destroy**(): `void`

销毁组件及其内部资源。

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`destroy`](PW.BaseComponent.md#destroy)

***

### propulsionPower()

> **propulsionPower**(`power`): `this`

#### Parameters

##### power

`number`

#### Returns

`this`

***

### register()

> **register**(`object`): `PropulsionComponent`

将组件注册到物理对象上。

子类通常在这里创建/绑定内部渲染适配层（Feature）或初始化资源。

#### Parameters

##### object

[`BaseObject`](PW.BaseObject.md)

#### Returns

`PropulsionComponent`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`register`](PW.BaseComponent.md#register)

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

#### Overrides

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

### setPower()

> **setPower**(`power`): `this`

#### Parameters

##### power

`number`

#### Returns

`this`

***

### start()

> **start**(`power?`): `this`

#### Parameters

##### power?

`number`

#### Returns

`this`

***

### startPropulsion()

> **startPropulsion**(`power?`): `this`

#### Parameters

##### power?

`number`

#### Returns

`this`

***

### stop()

> **stop**(): `this`

#### Returns

`this`

***

### stopPropulsion()

> **stopPropulsion**(): `this`

#### Returns

`this`

***

### unregister()

> **unregister**(): `void`

从物理对象卸载组件，但不销毁组件实例（可用于临时禁用）。

#### Returns

`void`

#### Inherited from

[`BaseComponent`](PW.BaseComponent.md).[`unregister`](PW.BaseComponent.md#unregister)

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

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`update`](PW.BaseComponent.md#update)
