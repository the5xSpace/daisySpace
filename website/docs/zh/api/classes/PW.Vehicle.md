[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Vehicle

# Class: Vehicle

Vehicle：移动工具（物理语义对象）。

设计原则：
- 对外提供“语义 API”，内部复用 Daisy.Entity + Feature + PW.Component
- 多数图形挂载能力（模型/标签/广告牌/轨迹/碰撞等）复用 FreeObject 的策略系统

## Extends

- [`FreeObject`](PW.FreeObject.md)

## Extended by

- [`Aircraft`](PW.Aircraft.md)
- [`Rocket`](PW.Rocket.md)
- [`GroundStation`](PW.GroundStation.md)
- [`Vessel`](PW.Vessel.md)

## Constructors

### Constructor

> **new Vehicle**(`options?`, `celestialEllipsoid?`): `Vehicle`

创建 Vehicle。

#### Parameters

##### options?

[`VehicleConfig`](../types/PW.VehicleConfig.md)

Vehicle 配置（继承 FreeObjectConfig，并扩展 orientation/sensors）

##### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

所属天体（默认地球）

#### Returns

`Vehicle`

#### Example

```ts
const vehicle = new Vehicle({
 name: "Vehicle-1",
 model: { url: "/models/ChandraXrayObservatory.glb", minimumPixelSize: 48 },
 label: { text: "Vehicle-1" },
 sensors: { type: SensorType.EllipticalCone, range: 120_000, apertureDeg: 10 },
});
vehicle.position = Daisy.Cartesian3.fromDegrees(121.5, 31.2, 30);
vehicle.bindViewer(viewer);
```

#### Overrides

[`FreeObject`](PW.FreeObject.md).[`constructor`](PW.FreeObject.md#constructor)

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`_celestialEllipsoid`](PW.FreeObject.md#_celestialellipsoid)

***

### \_entity

> **\_entity**: [`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`_entity`](PW.FreeObject.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`isDestroyed`](PW.FreeObject.md#isdestroyed)

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

获取宿主 Entity（用于挂载 Feature、交互事件、更新等）。

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`entity`](PW.FreeObject.md#entity)

***

### options

#### Get Signature

> **get** **options**(): [`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

对象创建/配置参数的原始快照（不同子类会扩展其结构）。

注意：这是“语义配置”的来源，而不是渲染结果。渲染落地由 _applyConfig + Feature/Component 完成。

##### Returns

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`options`](PW.FreeObject.md#options)

***

### orientation

#### Get Signature

> **get** **orientation**(): `Property` \| `Quaternion` \| `undefined`

##### Returns

`Property` \| `Quaternion` \| `undefined`

#### Set Signature

> **set** **orientation**(`value`): `void`

便捷设置姿态（写入宿主 Entity.orientation）。

##### Parameters

###### value

`Property` \| `Quaternion` \| `undefined`

##### Returns

`void`

***

### position

#### Get Signature

> **get** **position**(): [`ObjectPositon`](../types/PW.ObjectPositon.md)

设置对象位置（支持静态坐标或采样轨迹）。

- 赋值后会同步写入宿主 entity.position
- 对 CelestialEntity（非地球天体）不允许使用支持惯性系的 TrajectorySample

##### Example

```ts
vehicle.position = Daisy.Cartesian3.fromDegrees(121.5, 31.2, 30);
```

##### Returns

[`ObjectPositon`](../types/PW.ObjectPositon.md)

#### Set Signature

> **set** **position**(`value`): `void`

便捷设置位置（支持静态坐标或采样轨迹）。

##### Parameters

###### value

[`ObjectPositon`](../types/PW.ObjectPositon.md)

##### Returns

`void`

#### Overrides

[`FreeObject`](PW.FreeObject.md).[`position`](PW.FreeObject.md#position)

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

[`FreeObject`](PW.FreeObject.md).[`addComponent`](PW.FreeObject.md#addcomponent)

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`addLink`](PW.FreeObject.md#addlink)

***

### addPropulsion()

> **addPropulsion**\<`T`\>(`propulsion`): `T`

#### Type Parameters

##### T

`T` *extends* [`PropulsionComponent`](PW.PropulsionComponent.md)

#### Parameters

##### propulsion

`T`

#### Returns

`T`

***

### addSensor()

> **addSensor**(`options?`): [`Sensor`](PW.Sensor.md)

添加一个物理传感器组件。

Vehicle 传感器位置默认 TO_FRONT。
业务侧可通过 `emitDirection` 覆盖安装方向。

#### Parameters

##### options?

[`SensorOptions`](../types/PW.SensorOptions.md) = `{}`

#### Returns

[`Sensor`](PW.Sensor.md)

#### Example

```ts
import * as Daisy from "daisy-space-sdk";

const vehicle = new Daisy.PW.Vehicle({ name: "Vehicle-1" });
vehicle.bindViewer(viewer);

// 默认 TO_FRONT
vehicle.addSensor({ apertureDeg: { xDeg: 12, yDeg: 6 }, beamLength: 200_000 });

// 覆盖安装方向
vehicle.addSensor({ emitDirection: Daisy.EmitDirection.TO_UP, apertureDeg: 10, beamLength: 120_000 });
```

#### Overrides

[`FreeObject`](PW.FreeObject.md).[`addSensor`](PW.FreeObject.md#addsensor)

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

[`FreeObject`](PW.FreeObject.md).[`bindEngine`](PW.FreeObject.md#bindengine)

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

[`FreeObject`](PW.FreeObject.md).[`destroy`](PW.FreeObject.md#destroy)

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

[`FreeObject`](PW.FreeObject.md).[`getComponentById`](PW.FreeObject.md#getcomponentbyid)

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

[`FreeObject`](PW.FreeObject.md).[`getComponentByName`](PW.FreeObject.md#getcomponentbyname)

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

[`FreeObject`](PW.FreeObject.md).[`getComponents`](PW.FreeObject.md#getcomponents)

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

获取当前仿真时刻的局部姿态。

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`FreeObject`](PW.FreeObject.md).[`getCurrentOrientation`](PW.FreeObject.md#getcurrentorientation)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

获取当前仿真时间的实时位置。

如果 position 是 TrajectorySample，会根据引擎当前时间求值；
如果是静态 Cartesian3，直接返回。

#### Returns

`Cartesian3` \| `undefined`

当前时刻的世界坐标，或 undefined（无法求值时）

#### Overrides

[`FreeObject`](PW.FreeObject.md).[`getCurrentPosition`](PW.FreeObject.md#getcurrentposition)

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

[`FreeObject`](PW.FreeObject.md).[`getOrientationAtTime`](PW.FreeObject.md#getorientationattime)

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

[`FreeObject`](PW.FreeObject.md).[`getPosition`](PW.FreeObject.md#getposition)

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

[`FreeObject`](PW.FreeObject.md).[`getPositionAtTime`](PW.FreeObject.md#getpositionattime)

***

### getPropulsion()

> **getPropulsion**(`idOrName`): [`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Parameters

##### idOrName

`string`

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

***

### getPropulsions()

> **getPropulsions**(): [`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md)[]

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

[`FreeObject`](PW.FreeObject.md).[`getTransformAtTime`](PW.FreeObject.md#gettransformattime)

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

[`FreeObject`](PW.FreeObject.md).[`getTransformMatrixAtTime`](PW.FreeObject.md#gettransformmatrixattime)

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

[`FreeObject`](PW.FreeObject.md).[`register`](PW.FreeObject.md#register)

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

[`FreeObject`](PW.FreeObject.md).[`removeComponentById`](PW.FreeObject.md#removecomponentbyid)

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

[`FreeObject`](PW.FreeObject.md).[`removeComponentByName`](PW.FreeObject.md#removecomponentbyname)

***

### removePropulsion()

> **removePropulsion**(`idOrName`): `void`

#### Parameters

##### idOrName

`string`

#### Returns

`void`

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

[`FreeObject`](PW.FreeObject.md).[`resetTemporalState`](PW.FreeObject.md#resettemporalstate)

***

### setOptions()

> **setOptions**(`config`): `void`

更新配置（会按策略重建对应的 Feature）。

#### Parameters

##### config

[`VehicleConfig`](../types/PW.VehicleConfig.md)

新配置

#### Returns

`void`

#### Example

```ts
obj.setOptions({ label: { text: "Updated" } });
```

#### Overrides

[`FreeObject`](PW.FreeObject.md).[`setOptions`](PW.FreeObject.md#setoptions)

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

[`FreeObject`](PW.FreeObject.md).[`unregister`](PW.FreeObject.md#unregister)

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

[`FreeObject`](PW.FreeObject.md).[`update`](PW.FreeObject.md#update)

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

[`FreeObject`](PW.FreeObject.md).[`offClick`](PW.FreeObject.md#offclick)

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

[`FreeObject`](PW.FreeObject.md).[`offDblClick`](PW.FreeObject.md#offdblclick)

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

[`FreeObject`](PW.FreeObject.md).[`offMouseEnter`](PW.FreeObject.md#offmouseenter)

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

[`FreeObject`](PW.FreeObject.md).[`offMouseLeave`](PW.FreeObject.md#offmouseleave)

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

[`FreeObject`](PW.FreeObject.md).[`onBeforeDestroy`](PW.FreeObject.md#onbeforedestroy)

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

[`FreeObject`](PW.FreeObject.md).[`onBeforeRegister`](PW.FreeObject.md#onbeforeregister)

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

[`FreeObject`](PW.FreeObject.md).[`onBeforeUnregister`](PW.FreeObject.md#onbeforeunregister)

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

[`FreeObject`](PW.FreeObject.md).[`onBeforeUpdate`](PW.FreeObject.md#onbeforeupdate)

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

[`FreeObject`](PW.FreeObject.md).[`onClick`](PW.FreeObject.md#onclick)

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

[`FreeObject`](PW.FreeObject.md).[`onDblClick`](PW.FreeObject.md#ondblclick)

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

[`FreeObject`](PW.FreeObject.md).[`onDestroy`](PW.FreeObject.md#ondestroy)

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

[`FreeObject`](PW.FreeObject.md).[`onMouseEnter`](PW.FreeObject.md#onmouseenter)

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

[`FreeObject`](PW.FreeObject.md).[`onMouseLeave`](PW.FreeObject.md#onmouseleave)

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

[`FreeObject`](PW.FreeObject.md).[`onRegister`](PW.FreeObject.md#onregister)

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

[`FreeObject`](PW.FreeObject.md).[`onUnregister`](PW.FreeObject.md#onunregister)

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

[`FreeObject`](PW.FreeObject.md).[`onUpdate`](PW.FreeObject.md#onupdate)
