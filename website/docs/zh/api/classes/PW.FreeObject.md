[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / FreeObject

# Class: FreeObject

FreeObject：通用物理语义对象（可挂载一组常用 Feature）。

- 地球天体：使用 Entity
- 非地球天体：使用 CelestialEntity（支持天体偏移/旋转）

## Example

```ts
const obj = new FreeObject({
 name: "Obj-1",
 model: { url: "/models/ChandraXrayObservatory.glb", minimumPixelSize: 40 },
 text: { text: "Obj-1" },
});
obj.position = Daisy.Cartesian3.fromDegrees(116.39, 39.9, 1000);
obj.bindViewer(viewer);
```

## Extends

- [`BaseObject`](PW.BaseObject.md)

## Extended by

- [`Vehicle`](PW.Vehicle.md)

## Constructors

### Constructor

> **new FreeObject**(`options?`, `celestialEllipsoid?`): `FreeObject`

创建 FreeObject。

#### Parameters

##### options?

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

FreeObject 配置

##### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

所属天体（默认地球）

#### Returns

`FreeObject`

#### Overrides

`BaseObject.constructor`

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`_celestialEllipsoid`](PW.BaseObject.md#_celestialellipsoid)

***

### \_entity

> **\_entity**: [`Entity`](Entity.md) \| `CelestialEntity`

#### Overrides

[`BaseObject`](PW.BaseObject.md).[`_entity`](PW.BaseObject.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`isDestroyed`](PW.BaseObject.md#isdestroyed)

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

获取宿主 Entity（用于挂载 Feature、交互事件、更新等）。

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`entity`](PW.BaseObject.md#entity)

***

### id

#### Get Signature

> **get** **id**(): `string`

##### Returns

`string`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`id`](PW.BaseObject.md#id)

***

### options

#### Get Signature

> **get** **options**(): [`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

对象创建/配置参数的原始快照（不同子类会扩展其结构）。

注意：这是“语义配置”的来源，而不是渲染结果。渲染落地由 _applyConfig + Feature/Component 完成。

##### Returns

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

#### Overrides

[`BaseObject`](PW.BaseObject.md).[`options`](PW.BaseObject.md#options)

***

### position

#### Get Signature

> **get** **position**(): [`ObjectPositon`](../types/PW.ObjectPositon.md)

##### Returns

[`ObjectPositon`](../types/PW.ObjectPositon.md)

#### Set Signature

> **set** **position**(`value`): `void`

设置对象位置（支持静态坐标或采样轨迹）。

- 赋值后会同步写入宿主 entity.position
- 对 CelestialEntity（非地球天体）不允许使用支持惯性系的 TrajectorySample

##### Example

```ts
vehicle.position = Daisy.Cartesian3.fromDegrees(121.5, 31.2, 30);
```

##### Parameters

###### value

[`ObjectPositon`](../types/PW.ObjectPositon.md)

##### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`position`](PW.BaseObject.md#position)

## Methods

### addComponent()

> **addComponent**\<`T`\>(`component`): `T`

挂载一个 PhysicalWorld 组件到当前对象。

注意：Feature 仍应通过 Entity.addFeature() 的路径挂载；该方法仅面向 IComponent。

#### Type Parameters

##### T

`T` *extends* [`IComponent`](../interfaces/PW.IComponent.md)

#### Parameters

##### component

`T`

组件实例

#### Returns

`T`

#### Example

```ts
obj.addComponent(new Sensor({ range: 100000 }));
```

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`addComponent`](PW.BaseObject.md#addcomponent)

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`addLink`](PW.BaseObject.md#addlink)

***

### addSensor()

> **addSensor**(`options?`): [`Sensor`](PW.Sensor.md)

添加一个物理传感器组件（通用实现）。

设计目标：
- 把“添加传感器”的基础能力收敛到 FreeObject（适配更多物理对象类别）
- 由各个子类仅提供“默认安装方向”的语义差异

#### Parameters

##### options?

[`SensorOptions`](../types/PW.SensorOptions.md) = `{}`

#### Returns

[`Sensor`](PW.Sensor.md)

#### Example

```ts
import * as Daisy from "daisy-space-sdk";

const obj = new Daisy.PW.FreeObject({ name: "Obj-1" });
obj.bindViewer(viewer);

// 默认 TO_UP
obj.addSensor({ apertureDeg: 10, beamLength: 80_000 });

// 覆盖安装方向
obj.addSensor({ emitDirection: Daisy.EmitDirection.TO_FRONT, apertureDeg: 6, beamLength: 60_000 });
```

***

### bindEngine()

> **bindEngine**(`engine`): `void`

绑定到 Engine 并完成注册。

- 若 Engine 中不存在同 id 的实体，会自动 addEntity
- 随后会触发 register()

#### Parameters

##### engine

[`Engine`](Engine.md)

Daisy Engine

#### Returns

`void`

#### Example

```ts
obj.bindEngine(engine);
```

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`bindEngine`](PW.BaseObject.md#bindengine)

***

### destroy()

> **destroy**(): `void`

销毁对象（清理交互监听、销毁组件、销毁宿主实体并释放事件管理器）。

#### Returns

`void`

#### Example

```ts
obj.destroy();
```

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`destroy`](PW.BaseObject.md#destroy)

***

### getComponentById()

> **getComponentById**(`id?`): [`Component`](../types/PW.Component.md)[]

根据 id 获取组件列表（理论上 id 全局唯一，但保留返回数组以兼容历史逻辑）。

#### Parameters

##### id?

`string`

组件 id

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getComponentById`](PW.BaseObject.md#getcomponentbyid)

***

### getComponentByName()

> **getComponentByName**(`name?`): [`Component`](../types/PW.Component.md)[]

根据 name 获取组件列表。

#### Parameters

##### name?

`string`

组件名称（component.name）

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getComponentByName`](PW.BaseObject.md#getcomponentbyname)

***

### getComponents()

> **getComponents**(`type?`): [`Component`](../types/PW.Component.md)[]

获取组件列表。

#### Parameters

##### type?

`string`

组件类型（对应 component.type）；不传则返回全部

#### Returns

[`Component`](../types/PW.Component.md)[]

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getComponents`](PW.BaseObject.md#getcomponents)

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

获取当前仿真时刻的局部姿态。

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getCurrentOrientation`](PW.BaseObject.md#getcurrentorientation)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

获取当前仿真时刻的世界位置。

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getCurrentPosition`](PW.BaseObject.md#getcurrentposition)

***

### getOrientationAtTime()

> **getOrientationAtTime**(`timestamp`): [`Rotation`](../types/Rotation.md)

获取指定仿真时刻的局部姿态。

#### Parameters

##### timestamp

`JulianDate`

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getOrientationAtTime`](PW.BaseObject.md#getorientationattime)

***

### getPosition()

> **getPosition**(`time`): `Cartesian3` \| `undefined`

获取指定时刻的位置（委托给宿主 entity.getPosition）。

#### Parameters

##### time

`JulianDate`

仿真时间

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getPosition`](PW.BaseObject.md#getposition)

***

### getPositionAtTime()

> **getPositionAtTime**(`timestamp`): `Cartesian3` \| `undefined`

获取指定仿真时刻的世界位置。

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getPositionAtTime`](PW.BaseObject.md#getpositionattime)

***

### getTransformAtTime()

> **getTransformAtTime**(`timestamp`): `BaseObjectResolvedTransform`

获取指定仿真时刻的局部姿态。

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`BaseObjectResolvedTransform`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getTransformAtTime`](PW.BaseObject.md#gettransformattime)

***

### getTransformMatrixAtTime()

> **getTransformMatrixAtTime**(`timestamp`): `Matrix4`

获取指定仿真时刻的局部变换矩阵。

#### Parameters

##### timestamp

`JulianDate`

#### Returns

`Matrix4`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getTransformMatrixAtTime`](PW.BaseObject.md#gettransformmatrixattime)

***

### register()

> **register**(): `void`

将宿主实体注册到 Daisy 管线中（触发 entity.reRegisterAll）。

#### Returns

`void`

#### Example

```ts
obj.register();
```

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`register`](PW.BaseObject.md#register)

***

### removeComponentById()

> **removeComponentById**(`id`): `void`

根据 id 移除组件（会先 destroy）。

#### Parameters

##### id

`string`

组件 id

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`removeComponentById`](PW.BaseObject.md#removecomponentbyid)

***

### removeComponentByName()

> **removeComponentByName**(`name`): `void`

根据 name 移除组件（会先 destroy）。

#### Parameters

##### name

`string`

组件名称

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`removeComponentByName`](PW.BaseObject.md#removecomponentbyname)

***

### resetTemporalState()

> **resetTemporalState**(`time?`): `void`

重置跨帧/跨时间循环的运行态。

Engine 在检测到仿真时间倒退时调用此方法。这里不销毁业务配置，只清理
BaseObject 自身的时间值缓存，并把 reset 继续下发给挂载组件。

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`resetTemporalState`](PW.BaseObject.md#resettemporalstate)

***

### setOptions()

> **setOptions**(`config`): `void`

更新配置（会按策略重建对应的 Feature）。

#### Parameters

##### config

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

新配置

#### Returns

`void`

#### Example

```ts
obj.setOptions({ text: { text: "Updated" } });
```

***

### unregister()

> **unregister**(): `void`

反注册：移除实体挂载的所有 Feature，并通知组件解除绑定。

#### Returns

`void`

#### Example

```ts
obj.unregister();
```

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`unregister`](PW.BaseObject.md#unregister)

***

### update()

> **update**(`time`): `void`

每帧更新（驱动 entity.update，并同步驱动挂载组件的 update）。

#### Parameters

##### time

`JulianDate`

仿真时间

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`update`](PW.BaseObject.md#update)

## Events

### offClick()

> **offClick**(`handler?`): `void`

取消监听对象点击事件。
 click

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`offClick`](PW.BaseObject.md#offclick)

***

### offDblClick()

> **offDblClick**(`handler?`): `void`

取消监听对象双击事件。
 dblclick

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`offDblClick`](PW.BaseObject.md#offdblclick)

***

### offMouseEnter()

> **offMouseEnter**(`handler?`): `void`

取消监听对象鼠标移入事件。
 mouseenter

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`offMouseEnter`](PW.BaseObject.md#offmouseenter)

***

### offMouseLeave()

> **offMouseLeave**(`handler?`): `void`

取消监听对象鼠标移出事件。
 mouseleave

#### Parameters

##### handler?

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`offMouseLeave`](PW.BaseObject.md#offmouseleave)

***

### onBeforeDestroy()

> **onBeforeDestroy**(`callback`): `void`

监听销毁前事件。
 BEFORE_DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onBeforeDestroy`](PW.BaseObject.md#onbeforedestroy)

***

### onBeforeRegister()

> **onBeforeRegister**(`callback`): `void`

监听注册前事件。
 BEFORE_REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onBeforeRegister`](PW.BaseObject.md#onbeforeregister)

***

### onBeforeUnregister()

> **onBeforeUnregister**(`callback`): `void`

监听卸载前事件。
 BEFORE_UNREGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onBeforeUnregister`](PW.BaseObject.md#onbeforeunregister)

***

### onBeforeUpdate()

> **onBeforeUpdate**(`callback`): `void`

监听更新前事件。
 BEFORE_UPDATE

#### Parameters

##### callback

(`time`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onBeforeUpdate`](PW.BaseObject.md#onbeforeupdate)

***

### onClick()

> **onClick**(`handler`): `void`

监听对象点击事件。
 click

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onClick`](PW.BaseObject.md#onclick)

***

### onDblClick()

> **onDblClick**(`handler`): `void`

监听对象双击事件。
 dblclick

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onDblClick`](PW.BaseObject.md#ondblclick)

***

### onDestroy()

> **onDestroy**(`callback`): `void`

监听销毁事件。
 DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onDestroy`](PW.BaseObject.md#ondestroy)

***

### onMouseEnter()

> **onMouseEnter**(`handler`): `void`

监听对象鼠标移入事件。
 mouseenter

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onMouseEnter`](PW.BaseObject.md#onmouseenter)

***

### onMouseLeave()

> **onMouseLeave**(`handler`): `void`

监听对象鼠标移出事件。
 mouseleave

#### Parameters

##### handler

(`e`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onMouseLeave`](PW.BaseObject.md#onmouseleave)

***

### onRegister()

> **onRegister**(`callback`): `void`

监听注册完成事件。
 REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onRegister`](PW.BaseObject.md#onregister)

***

### onUnregister()

> **onUnregister**(`callback`): `void`

监听卸载事件。
 UNREGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onUnregister`](PW.BaseObject.md#onunregister)

***

### onUpdate()

> **onUpdate**(`callback`): `void`

监听更新事件。
 UPDATE

#### Parameters

##### callback

(`time`) => `void`

#### Returns

`void`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`onUpdate`](PW.BaseObject.md#onupdate)
