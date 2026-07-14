[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Rocket

# Class: Rocket

Rocket：火箭主动段物理对象。

该对象把 ascent 动力学、TrajectorySample、姿态和默认可视 Feature 收束到 PW 层，
demo/业务侧不需要直接拼 Entity + AscentTrajectoryBuilder。

## Extends

- [`Vehicle`](PW.Vehicle.md)

## Constructors

### Constructor

> **new Rocket**(`options?`, `celestialEllipsoid?`): `Rocket`

#### Parameters

##### options?

[`RocketConfig`](../types/PW.RocketConfig.md) = `{}`

##### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md) = `...`

#### Returns

`Rocket`

#### Overrides

[`Vehicle`](PW.Vehicle.md).[`constructor`](PW.Vehicle.md#constructor)

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`_celestialEllipsoid`](PW.Vehicle.md#_celestialellipsoid)

***

### \_entity

> **\_entity**: [`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`_entity`](PW.Vehicle.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`isDestroyed`](PW.Vehicle.md#isdestroyed)

## Accessors

### ascentOptions

#### Get Signature

> **get** **ascentOptions**(): [`AscentTrajectoryOptions`](../interfaces/AscentTrajectoryOptions.md) \| `undefined`

##### Returns

[`AscentTrajectoryOptions`](../interfaces/AscentTrajectoryOptions.md) \| `undefined`

***

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

获取宿主 Entity（用于挂载 Feature、交互事件、更新等）。

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`entity`](PW.Vehicle.md#entity)

***

### events

#### Get Signature

> **get** **events**(): [`AscentEvent`](../interfaces/AscentEvent.md)[]

##### Returns

[`AscentEvent`](../interfaces/AscentEvent.md)[]

***

### options

#### Get Signature

> **get** **options**(): [`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

对象创建/配置参数的原始快照（不同子类会扩展其结构）。

注意：这是“语义配置”的来源，而不是渲染结果。渲染落地由 _applyConfig + Feature/Component 完成。

##### Returns

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`options`](PW.Vehicle.md#options)

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

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`orientation`](PW.Vehicle.md#orientation)

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

#### Inherited from

[`Vessel`](PW.Vessel.md).[`position`](PW.Vessel.md#position)

***

### startTime

#### Get Signature

> **get** **startTime**(): `JulianDate` \| `undefined`

##### Returns

`JulianDate` \| `undefined`

***

### stopTime

#### Get Signature

> **get** **stopTime**(): `JulianDate` \| `undefined`

##### Returns

`JulianDate` \| `undefined`

***

### summary

#### Get Signature

> **get** **summary**(): [`AscentSummary`](../interfaces/AscentSummary.md) \| `undefined`

##### Returns

[`AscentSummary`](../interfaces/AscentSummary.md) \| `undefined`

***

### trajectory

#### Get Signature

> **get** **trajectory**(): [`TrajectorySample`](TrajectorySample.md) \| `undefined`

##### Returns

[`TrajectorySample`](TrajectorySample.md) \| `undefined`

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

[`Vehicle`](PW.Vehicle.md).[`addComponent`](PW.Vehicle.md#addcomponent)

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`addLink`](PW.Vehicle.md#addlink)

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

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`addPropulsion`](PW.Vehicle.md#addpropulsion)

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

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`addSensor`](PW.Vehicle.md#addsensor)

***

### applyAscentTrajectory()

> **applyAscentTrajectory**(`epoch?`, `ascent?`): [`TrajectorySample`](TrajectorySample.md)

生成并写入主动段轨迹。

#### Parameters

##### epoch?

`JulianDate`

##### ascent?

[`AscentTrajectoryOptions`](../interfaces/AscentTrajectoryOptions.md)

#### Returns

[`TrajectorySample`](TrajectorySample.md)

***

### bindEngine()

> **bindEngine**(`engine`): `void`

绑定 Engine 后，若尚未生成 trajectory，则用场景当前时间作为 epoch 自动生成。

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`void`

#### Overrides

[`Vehicle`](PW.Vehicle.md).[`bindEngine`](PW.Vehicle.md#bindengine)

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

[`Vehicle`](PW.Vehicle.md).[`destroy`](PW.Vehicle.md#destroy)

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

[`Vehicle`](PW.Vehicle.md).[`getComponentById`](PW.Vehicle.md#getcomponentbyid)

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

[`Vehicle`](PW.Vehicle.md).[`getComponentByName`](PW.Vehicle.md#getcomponentbyname)

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

[`Vehicle`](PW.Vehicle.md).[`getComponents`](PW.Vehicle.md#getcomponents)

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

获取当前仿真时刻的局部姿态。

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getCurrentOrientation`](PW.Vehicle.md#getcurrentorientation)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

获取当前仿真时间的实时位置。

如果 position 是 TrajectorySample，会根据引擎当前时间求值；
如果是静态 Cartesian3，直接返回。

#### Returns

`Cartesian3` \| `undefined`

当前时刻的世界坐标，或 undefined（无法求值时）

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getCurrentPosition`](PW.Vehicle.md#getcurrentposition)

***

### getFlightStateAtTime()

> **getFlightStateAtTime**(`time?`): `object`

当前/指定时刻的主动段状态，便于面板读取。

#### Parameters

##### time?

`JulianDate` = `...`

#### Returns

`object`

##### altitudeMeters

> **altitudeMeters**: `number` \| `undefined`

##### elapsedSeconds

> **elapsedSeconds**: `number`

##### position

> **position**: `Cartesian3` \| `undefined`

##### speedMetersPerSecond

> **speedMetersPerSecond**: `number` \| `undefined`

##### time

> **time**: `JulianDate`

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

[`Vehicle`](PW.Vehicle.md).[`getOrientationAtTime`](PW.Vehicle.md#getorientationattime)

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

[`Vehicle`](PW.Vehicle.md).[`getPosition`](PW.Vehicle.md#getposition)

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

[`Vehicle`](PW.Vehicle.md).[`getPositionAtTime`](PW.Vehicle.md#getpositionattime)

***

### getPropulsion()

> **getPropulsion**(`idOrName`): [`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Parameters

##### idOrName

`string`

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getPropulsion`](PW.Vehicle.md#getpropulsion)

***

### getPropulsions()

> **getPropulsions**(): [`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`getPropulsions`](PW.Vehicle.md#getpropulsions)

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

[`Vehicle`](PW.Vehicle.md).[`getTransformAtTime`](PW.Vehicle.md#gettransformattime)

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

[`Vehicle`](PW.Vehicle.md).[`getTransformMatrixAtTime`](PW.Vehicle.md#gettransformmatrixattime)

***

### ignite()

> **ignite**(`power?`): [`PropulsionComponent`](PW.PropulsionComponent.md)

点火：打开默认主发动机喷焰。当前只控制可视化动力模块，不改变轨迹积分。

#### Parameters

##### power?

`number` = `1`

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md)

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

[`Vehicle`](PW.Vehicle.md).[`register`](PW.Vehicle.md#register)

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

[`Vehicle`](PW.Vehicle.md).[`removeComponentById`](PW.Vehicle.md#removecomponentbyid)

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

[`Vehicle`](PW.Vehicle.md).[`removeComponentByName`](PW.Vehicle.md#removecomponentbyname)

***

### removePropulsion()

> **removePropulsion**(`idOrName`): `void`

#### Parameters

##### idOrName

`string`

#### Returns

`void`

#### Inherited from

[`Vehicle`](PW.Vehicle.md).[`removePropulsion`](PW.Vehicle.md#removepropulsion)

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

[`Vehicle`](PW.Vehicle.md).[`resetTemporalState`](PW.Vehicle.md#resettemporalstate)

***

### setAutoAlignVerticalModelToFlight()

> **setAutoAlignVerticalModelToFlight**(`enabled`): `void`

开关竖直火箭模型到飞行前向的自动安装姿态。

#### Parameters

##### enabled

`boolean`

#### Returns

`void`

***

### setBodyAxis()

> **setBodyAxis**(`options?`): `void`

打开或更新火箭机体坐标轴，用于排查主动段姿态与局部坐标系。

#### Parameters

##### options?

`true` \| `BodyAxisOptions`

#### Returns

`void`

***

### setOptions()

> **setOptions**(`config`): `void`

更新配置（会按策略重建对应的 Feature）。

#### Parameters

##### config

[`BaseObjectTransformTimeline`](../types/PW.BaseObjectTransformTimeline.md) & `object` & `object` & `Partial`\<[`RocketConfig`](../types/PW.RocketConfig.md)\>

新配置

#### Returns

`void`

#### Example

```ts
obj.setOptions({ label: { text: "Updated" } });
```

#### Overrides

[`Vehicle`](PW.Vehicle.md).[`setOptions`](PW.Vehicle.md#setoptions)

***

### setThrottle()

> **setThrottle**(`power`): [`PropulsionComponent`](PW.PropulsionComponent.md)

设置默认主发动机节流。当前只影响喷焰强度。

#### Parameters

##### power

`number`

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md)

***

### shutdown()

> **shutdown**(): `void`

停机：关闭默认主发动机喷焰。

#### Returns

`void`

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

[`Vehicle`](PW.Vehicle.md).[`unregister`](PW.Vehicle.md#unregister)

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

[`Vehicle`](PW.Vehicle.md).[`update`](PW.Vehicle.md#update)

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

[`Vehicle`](PW.Vehicle.md).[`offClick`](PW.Vehicle.md#offclick)

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

[`Vehicle`](PW.Vehicle.md).[`offDblClick`](PW.Vehicle.md#offdblclick)

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

[`Vehicle`](PW.Vehicle.md).[`offMouseEnter`](PW.Vehicle.md#offmouseenter)

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

[`Vehicle`](PW.Vehicle.md).[`offMouseLeave`](PW.Vehicle.md#offmouseleave)

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

[`Vehicle`](PW.Vehicle.md).[`onBeforeDestroy`](PW.Vehicle.md#onbeforedestroy)

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

[`Vehicle`](PW.Vehicle.md).[`onBeforeRegister`](PW.Vehicle.md#onbeforeregister)

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

[`Vehicle`](PW.Vehicle.md).[`onBeforeUnregister`](PW.Vehicle.md#onbeforeunregister)

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

[`Vehicle`](PW.Vehicle.md).[`onBeforeUpdate`](PW.Vehicle.md#onbeforeupdate)

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

[`Vehicle`](PW.Vehicle.md).[`onClick`](PW.Vehicle.md#onclick)

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

[`Vehicle`](PW.Vehicle.md).[`onDblClick`](PW.Vehicle.md#ondblclick)

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

[`Vehicle`](PW.Vehicle.md).[`onDestroy`](PW.Vehicle.md#ondestroy)

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

[`Vehicle`](PW.Vehicle.md).[`onMouseEnter`](PW.Vehicle.md#onmouseenter)

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

[`Vehicle`](PW.Vehicle.md).[`onMouseLeave`](PW.Vehicle.md#onmouseleave)

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

[`Vehicle`](PW.Vehicle.md).[`onRegister`](PW.Vehicle.md#onregister)

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

[`Vehicle`](PW.Vehicle.md).[`onUnregister`](PW.Vehicle.md#onunregister)

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

[`Vehicle`](PW.Vehicle.md).[`onUpdate`](PW.Vehicle.md#onupdate)
