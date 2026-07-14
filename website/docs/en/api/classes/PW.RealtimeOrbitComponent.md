[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / RealtimeOrbitComponent

# Class: RealtimeOrbitComponent

绘制当前时刻的瞬时轨道圈。

这个组件不同于 `path` 尾迹：它不显示历史/未来时间窗，而是根据当前
位置与速度估算 osculating orbit，并绘制完整闭合的轨道面椭圆。

## Extends

- [`BaseComponent`](PW.BaseComponent.md)

## Constructors

### Constructor

> **new RealtimeOrbitComponent**(`options?`): `RealtimeOrbitComponent`

#### Parameters

##### options?

[`RealtimeOrbitComponentOptions`](../types/PW.RealtimeOrbitComponentOptions.md) = `{}`

#### Returns

`RealtimeOrbitComponent`

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

> `readonly` **type**: `string` = `"RealtimeOrbitComponent"`

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

[`BaseComponent`](PW.BaseComponent.md).[`id`](PW.BaseComponent.md#id)

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

销毁组件及其内部资源。

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`destroy`](PW.BaseComponent.md#destroy)

***

### getDebugAngles()

> **getDebugAngles**(`time?`): \{ `inclinationDeg`: `number`; `raanDeg`: `number`; \} \| `undefined`

便于外部调试时读取近似六根数角度。

#### Parameters

##### time?

`JulianDate`

#### Returns

\{ `inclinationDeg`: `number`; `raanDeg`: `number`; \} \| `undefined`

***

### getLatestElements()

> **getLatestElements**(): [`RealtimeOrbitElements`](../types/PW.RealtimeOrbitElements.md) \| `undefined`

#### Returns

[`RealtimeOrbitElements`](../types/PW.RealtimeOrbitElements.md) \| `undefined`

***

### getOptimalViewDistanceMeters()

> **getOptimalViewDistanceMeters**(): `number` \| `undefined`

#### Returns

`number` \| `undefined`

***

### register()

> **register**(`object`): `RealtimeOrbitComponent`

将组件注册到物理对象上。

子类通常在这里创建/绑定内部渲染适配层（Feature）或初始化资源。

#### Parameters

##### object

`any`

#### Returns

`RealtimeOrbitComponent`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`register`](PW.BaseComponent.md#register)

***

### resetTemporalState()

> **resetTemporalState**(): `void`

重置跨时间循环保留的临时状态。

当仿真时间倒退或循环回起点时，宿主对象会调用该方法，让组件清理跨帧缓存。

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`resetTemporalState`](PW.BaseComponent.md#resettemporalstate)

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

> **update**(`spaceObject`, `time`): `void`

每帧更新（仿真时间驱动）。

#### Parameters

##### spaceObject

[`Entity`](Entity.md)

##### time

`JulianDate`

#### Returns

`void`

#### Overrides

[`BaseComponent`](PW.BaseComponent.md).[`update`](PW.BaseComponent.md#update)
