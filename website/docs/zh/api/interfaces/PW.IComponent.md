[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / IComponent

# Interface: IComponent

PhysicalWorld 组件接口。

组件用于承载“物理语义能力”（例如传感器、载荷、控制系统等），并挂载到 BaseObject 上统一管理：
- register/unregister：绑定与解绑宿主对象
- update：每帧更新（由宿主对象驱动）
- destroy：释放资源

## Properties

### transformer

> **transformer**: `Transformer` \| `undefined`

组件级 Transformer（可选）。

建议用于表达“安装/物理基准”的局部变换。

***

### type

> `readonly` **type**: `string`

组件类型标识（用于按类型检索组件）。

约定：同一类型组件可在对象上出现多个实例（由 id 区分）。

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

获取组件 id（全局唯一标识）。

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

***

### name

#### Get Signature

> **get** **name**(): `string`

获取组件名称。

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

## Methods

### destroy()

> **destroy**(): `void`

销毁组件及其内部资源。

#### Returns

`void`

***

### register()

> **register**(`object`): `IComponent`

注册到物理对象（宿主）上。

#### Parameters

##### object

[`BaseObject`](../classes/PW.BaseObject.md)

宿主 PhysicalWorld 对象

#### Returns

`IComponent`

***

### resetTemporalState()?

> `optional` **resetTemporalState**(`time?`): `void`

重置跨时间循环保留的临时状态。

当仿真时间倒退或循环回起点时，宿主对象会调用该方法，让组件清理跨帧缓存。

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

***

### unregister()

> **unregister**(): `void`

从宿主对象卸载组件（不销毁实例）。

#### Returns

`void`

***

### update()

> **update**(`spaceObject`, `time`): `void`

每帧更新（仿真时间驱动）。

#### Parameters

##### spaceObject

[`Entity`](../classes/Entity.md)

宿主 Daisy.Entity

##### time

`JulianDate`

仿真时间

#### Returns

`void`
