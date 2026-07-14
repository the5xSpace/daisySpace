[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Link

# Class: Link

管理两个对象之间的链路绘制与传输效果。

组件会综合目标端可见性、时间计划以及中心天体遮挡结果，
决定当前时刻是否绘制链路线。

## Example

```ts
sat.addLink({
 name: "Downlink-Sat",
 target: groundStation,
 show: downlinkWindows,
 direction: "reverse",
 speed: 1.0,
});
```

## Extends

- [`BaseComponent`](PW.BaseComponent.md)

## Constructors

### Constructor

> **new Link**(`options`): `Link`

创建链路组件；注册到物理对象后才会创建链路线。

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

`Link`

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

> `readonly` **type**: `string` = `"Link"`

组件类型标识。子类需要覆写。

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`type`](PW.BaseComponent.md#type)

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

#### Inherited from

[`RouteComponent`](PW.RouteComponent.md).[`id`](PW.RouteComponent.md#id)

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

> **get** **options**(): [`LinkOptions`](../types/PW.LinkOptions.md)

获取当前完整配置。

##### Returns

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Set Signature

> **set** **options**(`value`): `void`

合并更新链路配置并同步已有链路线。

##### Parameters

###### value

`Partial`\<[`LinkOptions`](../types/PW.LinkOptions.md)\>

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

### destroy()

> **destroy**(): `void`

销毁链路组件及其链路线。

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`destroy`](PW.BaseComponent.md#destroy)

***

### getHostObject()

> **getHostObject**(): [`BaseObject`](PW.BaseObject.md) \| `undefined`

获取当前绑定的宿主对象。

#### Returns

[`BaseObject`](PW.BaseObject.md) \| `undefined`

当前链路所属的物理对象。

***

### register()

> **register**(`object`): `Link`

注册到宿主物理对象并创建链路线。

#### Parameters

##### object

[`BaseObject`](PW.BaseObject.md)

#### Returns

`Link`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`register`](PW.BaseComponent.md#register)

***

### remove()

> **remove**(): `void`

将链路组件从宿主对象上移除并销毁内部资源。

#### Returns

`void`

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

### setShow()

> **setShow**(`show`): `void`

更新链路显示计划。

#### Parameters

##### show

[`LinkSchedule`](../types/PW.LinkSchedule.md)

新的显示计划。

#### Returns

`void`

***

### setTarget()

> **setTarget**(`target`): `void`

更新链路目标端。

#### Parameters

##### target

[`LinkEndpoint`](../types/PW.LinkEndpoint.md)

新的目标端对象或点位。

#### Returns

`void`

***

### unregister()

> **unregister**(): `void`

解除注册并释放链路线。

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`unregister`](PW.BaseComponent.md#unregister)

***

### update()

> **update**(`_spaceObject`, `time`): `void`

按当前时刻刷新链路可见性与几何配置。

仅当目标端存在、两端可见、显示计划命中且链路未被中心天体遮挡时，
才会实际绘制链路线。

#### Parameters

##### \_spaceObject

`any`

当前宿主对象，链路内部不直接使用该参数。

##### time

`JulianDate`

当前仿真时间。

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`update`](PW.BaseComponent.md#update)
