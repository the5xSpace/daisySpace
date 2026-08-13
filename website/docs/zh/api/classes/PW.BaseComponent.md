[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / BaseComponent

# Class: BaseComponent

PhysicalWorld 组件基类。

组件用于描述“物理语义能力”（例如传感器、载荷、控制系统等），并由 PW.BaseObject 统一管理生命周期。

设计要点：
- 组件不直接暴露 对象给 SDK 外部使用方
- 组件可在内部持有/驱动一个或多个 Feature 作为渲染适配层

## Extended by

- [`Sensor`](PW.Sensor.md)
- [`PropulsionComponent`](PW.PropulsionComponent.md)
- [`CameraWeatherParticleComponent`](PW.CameraWeatherParticleComponent.md)
- [`Link`](PW.Link.md)
- [`OrbitElementsViewComponent`](PW.OrbitElementsViewComponent.md)
- [`GroundTrackComponent`](PW.GroundTrackComponent.md)
- [`RouteComponent`](PW.RouteComponent.md)

## Implements

- [`IComponent`](../interfaces/PW.IComponent.md)

## Constructors

### Constructor

> **new BaseComponent**(`options?`): `BaseComponent`

#### Parameters

##### options?

[`ComponentIdentityOptions`](../types/PW.ComponentIdentityOptions.md) = `{}`

#### Returns

`BaseComponent`

## Properties

### transformer

> **transformer**: `Transformer` \| `undefined` = `undefined`

组件级 Transformer（可选）。

建议用来表示“安装/物理基准”变换，而不是去污染 Entity.transformer。

#### Implementation of

[`IComponent`](../interfaces/PW.IComponent.md).[`transformer`](../interfaces/PW.IComponent.md#transformer)

***

### type

> `readonly` **type**: `string` = `""`

组件类型标识。子类需要覆写。

#### Implementation of

[`IComponent`](../interfaces/PW.IComponent.md).[`type`](../interfaces/PW.IComponent.md#type)

## Accessors

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

#### Implementation of

[`IComponent`](../interfaces/PW.IComponent.md).[`id`](../interfaces/PW.IComponent.md#id)

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

##### Returns

`boolean`

#### Implementation of

[`IComponent`](../interfaces/PW.IComponent.md).[`isDestroyed`](../interfaces/PW.IComponent.md#isdestroyed)

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

#### Implementation of

[`IComponent`](../interfaces/PW.IComponent.md).[`name`](../interfaces/PW.IComponent.md#name)

***

### registered

#### Get Signature

> **get** **registered**(): `boolean`

##### Returns

`boolean`

#### Implementation of

[`IComponent`](../interfaces/PW.IComponent.md).[`registered`](../interfaces/PW.IComponent.md#registered)

## Methods

### destroy()

> **destroy**(): `void`

销毁组件及其内部资源。

#### Returns

`void`

#### Implementation of

[`IComponent`](../interfaces/PW.IComponent.md).[`destroy`](../interfaces/PW.IComponent.md#destroy)

***

### register()

> **register**(`object`): [`IComponent`](../interfaces/PW.IComponent.md)

将组件注册到物理对象上。

子类通常在这里创建/绑定内部渲染适配层（Feature）或初始化资源。

#### Parameters

##### object

[`BaseObject`](PW.BaseObject.md)

#### Returns

[`IComponent`](../interfaces/PW.IComponent.md)

#### Implementation of

[`IComponent`](../interfaces/PW.IComponent.md).[`register`](../interfaces/PW.IComponent.md#register)

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

#### Implementation of

[`IComponent`](../interfaces/PW.IComponent.md).[`resetTemporalState`](../interfaces/PW.IComponent.md#resettemporalstate)

***

### unregister()

> **unregister**(): `void`

从物理对象卸载组件，但不销毁组件实例（可用于临时禁用）。

#### Returns

`void`

#### Implementation of

[`IComponent`](../interfaces/PW.IComponent.md).[`unregister`](../interfaces/PW.IComponent.md#unregister)

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

#### Implementation of

[`IComponent`](../interfaces/PW.IComponent.md).[`update`](../interfaces/PW.IComponent.md#update)
