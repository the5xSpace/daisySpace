[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / NearEarthOrbiter

# Class: NearEarthOrbiter

NearEarthOrbiter：近地轨道目标（卫星/空间站/碎片等）。

提供能力：
- 按 NORAD Catalog Number 拉取 TLE（带缓存）
- 接收通用轨道源输入（TLE / OMM XML / JSON GP）
- 使用通用轨道源进行实时传播（可选）
- 构建一段时间范围内的星历采样轨迹（TrajectorySample）

轨道路径复用继承链上的 `FreeObjectConfig.path` 和宿主 `Entity.setPath()`。`Satellite` 作为语义别名使用同一套路径 API，不需要单独的实时轨道路径组件。

## Example

```ts
import * as Daisy from "daisy-space-sdk";

const sat = new Daisy.PW.NearEarthOrbiter({
 name: "STARLINK-1008",
 enableSpg4Propagation: true,
});
const tle = await sat.loadTleByNoradId(44714, 6 * 3600);
sat.setTle(tle);
sat.bindViewer(viewer);
```

## Extends

- [`Aircraft`](PW.Aircraft.md)

## Extended by

- [`Satellite`](PW.Satellite.md)

## Constructors

### Constructor

> **new NearEarthOrbiter**(`options?`, `celestialEllipsoid?`): `NearEarthOrbiter`

创建 NearEarthOrbiter。

#### Parameters

##### options?

[`NearEarthOrbiterConfig`](../types/PW.NearEarthOrbiterConfig.md)

配置（含轨道源与传播策略）

##### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md) = `...`

所属天体（默认地球）

#### Returns

`NearEarthOrbiter`

#### Overrides

[`Aircraft`](PW.Aircraft.md).[`constructor`](PW.Aircraft.md#constructor)

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`_celestialEllipsoid`](PW.Aircraft.md#_celestialellipsoid)

***

### \_entity

> **\_entity**: [`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`_entity`](PW.Aircraft.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`isDestroyed`](PW.Aircraft.md#isdestroyed)

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

获取宿主 Entity（用于挂载 Feature、交互事件、更新等）。

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`entity`](PW.Aircraft.md#entity)

***

### id

#### Get Signature

> **get** **id**(): `string`

##### Returns

`string`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`id`](PW.Aircraft.md#id)

***

### options

#### Get Signature

> **get** **options**(): [`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

对象创建/配置参数的原始快照（不同子类会扩展其结构）。

注意：这是“语义配置”的来源，而不是渲染结果。渲染落地由 _applyConfig + Feature/Component 完成。

##### Returns

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`options`](PW.Aircraft.md#options)

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

[`Aircraft`](PW.Aircraft.md).[`orientation`](PW.Aircraft.md#orientation)

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

[`Aircraft`](PW.Aircraft.md).[`position`](PW.Aircraft.md#position)

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

[`Aircraft`](PW.Aircraft.md).[`addComponent`](PW.Aircraft.md#addcomponent)

***

### addGroundTrack()

> **addGroundTrack**(`options?`): [`GroundTrackComponent`](PW.GroundTrackComponent.md)

添加真实星下点滚动轨迹组件。

#### Parameters

##### options?

[`GroundTrackComponentOptions`](../types/PW.GroundTrackComponentOptions.md) = `{}`

#### Returns

[`GroundTrackComponent`](PW.GroundTrackComponent.md)

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`addLink`](PW.Aircraft.md#addlink)

***

### addOrbitElementsView()

> **addOrbitElementsView**(`options?`): [`OrbitElementsViewComponent`](PW.OrbitElementsViewComponent.md)

添加轨道根数几何视图组件。

#### Parameters

##### options?

[`OrbitElementsViewComponentOptions`](../types/PW.OrbitElementsViewComponentOptions.md) = `{}`

#### Returns

[`OrbitElementsViewComponent`](PW.OrbitElementsViewComponent.md)

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

[`Aircraft`](PW.Aircraft.md).[`addPropulsion`](PW.Aircraft.md#addpropulsion)

***

### addSensor()

> **addSensor**(`options?`): [`Sensor`](PW.Sensor.md)

添加传感器。

说明：
- 轨道目标通常希望传感器“安装在机体坐标系原点”
- 这里会注入一个默认 position，使传感器不受对象位置写入策略影响

#### Parameters

##### options?

[`SensorOptions`](../types/PW.SensorOptions.md) = `{}`

#### Returns

[`Sensor`](PW.Sensor.md)

#### Overrides

[`Aircraft`](PW.Aircraft.md).[`addSensor`](PW.Aircraft.md#addsensor)

***

### applyEphemerisTrajectory()

> **applyEphemerisTrajectory**(`params`): [`TrajectorySample`](TrajectorySample.md)

旧名兼容入口。

#### Parameters

##### params

[`NearEarthOrbiterEphemerisRequest`](../types/PW.NearEarthOrbiterEphemerisRequest.md) & `object`

#### Returns

[`TrajectorySample`](TrajectorySample.md)

#### Example

```ts
sat.applyTrajectory({ stepSeconds: 30 });
```

***

### applyTrajectory()

> **applyTrajectory**(`params?`): [`TrajectorySample`](TrajectorySample.md)

写入轨迹采样的简写入口。

默认行为：
- 自动使用当前场景的开始/结束时间
- `stepSeconds` 默认 600

#### Parameters

##### params?

[`NearEarthOrbiterTrajectoryRequest`](../types/PW.NearEarthOrbiterTrajectoryRequest.md)

#### Returns

[`TrajectorySample`](TrajectorySample.md)

#### Example

```ts
sat.applyTrajectory();
sat.applyTrajectory({ stepSeconds: 30 });
```

***

### bindEngine()

> **bindEngine**(`engine`): `void`

绑定到 Engine 并完成注册。

额外行为：
- 若未显式关闭自动轨迹，且已经有轨道源，会在绑定后自动执行一次 `applyTrajectory()`

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`void`

#### Overrides

[`Aircraft`](PW.Aircraft.md).[`bindEngine`](PW.Aircraft.md#bindengine)

***

### buildEphemerisTrajectory()

> **buildEphemerisTrajectory**(`params`): [`TrajectorySample`](TrajectorySample.md)

构建一段时间范围内的星历轨迹采样（TrajectorySample）。

说明：
- 该方法用于“离线采样 + 插值”的方式驱动目标
- 若你启用了实时传播，也可以不使用该方法

#### Parameters

##### params

[`NearEarthOrbiterEphemerisRequest`](../types/PW.NearEarthOrbiterEphemerisRequest.md) & `object`

#### Returns

[`TrajectorySample`](TrajectorySample.md)

#### Example

```ts
const traj = sat.buildEphemerisTrajectory({
 startTime,
 endTime: stopTime,
 intervalSeconds: 30,
 trajectoryOptions: { interpolationAlgorithm: "LAGRANGE", interpolationDegree: 5 },
});
sat.position = traj as any;
sat.orientation = traj.getVelocityOrientation() as any;
```

***

### calculateEphemeris()

> **calculateEphemeris**(`params`): `any`[]

获取一段时间范围内的星历计算结果（不构建 TrajectorySample）。

#### Parameters

##### params

[`NearEarthOrbiterEphemerisRequest`](../types/PW.NearEarthOrbiterEphemerisRequest.md)

#### Returns

`any`[]

#### Example

```ts
const ephemeris = sat.calculateEphemeris({ startTime, endTime: stopTime, intervalSeconds: 30 });
console.log(ephemeris[0]);
```

***

### clearEphemerisCache()

> **clearEphemerisCache**(): `void`

清空星历缓存。

#### Returns

`void`

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

[`Aircraft`](PW.Aircraft.md).[`destroy`](PW.Aircraft.md#destroy)

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

[`Aircraft`](PW.Aircraft.md).[`getComponentById`](PW.Aircraft.md#getcomponentbyid)

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

[`Aircraft`](PW.Aircraft.md).[`getComponentByName`](PW.Aircraft.md#getcomponentbyname)

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

[`Aircraft`](PW.Aircraft.md).[`getComponents`](PW.Aircraft.md#getcomponents)

***

### getCurrentOrbitState()

> **getCurrentOrbitState**(`options?`): [`NearEarthOrbiterState`](../types/PW.NearEarthOrbiterState.md) \| `null`

获取当前仿真时刻的轨道状态。

#### Parameters

##### options?

###### observerLocation?

\[`number`, `number`, `number`\]

###### velocitySampleSeconds?

`number`

#### Returns

[`NearEarthOrbiterState`](../types/PW.NearEarthOrbiterState.md) \| `null`

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

获取当前仿真时刻的局部姿态。

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getCurrentOrientation`](PW.Aircraft.md#getcurrentorientation)

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

[`Aircraft`](PW.Aircraft.md).[`getCurrentPosition`](PW.Aircraft.md#getcurrentposition)

***

### getEphemeris()

> **getEphemeris**(`params?`): `any`[] \| `undefined`

获取当前已经计算并缓存的星历数据。

如果传入 params，则仅在与当前缓存参数一致时返回缓存结果，不会触发重算。

#### Parameters

##### params?

[`NearEarthOrbiterEphemerisRequest`](../types/PW.NearEarthOrbiterEphemerisRequest.md)

#### Returns

`any`[] \| `undefined`

***

### getEphemerisCache()

> **getEphemerisCache**(): [`NearEarthOrbiterEphemerisCache`](../types/PW.NearEarthOrbiterEphemerisCache.md) \| `undefined`

获取当前星历缓存元数据。

#### Returns

[`NearEarthOrbiterEphemerisCache`](../types/PW.NearEarthOrbiterEphemerisCache.md) \| `undefined`

***

### getOrbitDefinition()

> **getOrbitDefinition**(): `unknown`

获取当前轨道定义。

#### Returns

`unknown`

***

### getOrbitElements()

> **getOrbitElements**(): `OrbitElements`

解析当前轨道定义的轨道根数。

#### Returns

`OrbitElements`

***

### getOrbitMetadata()

> **getOrbitMetadata**(): `OrbitMetadata`

解析当前轨道定义的元数据。

#### Returns

`OrbitMetadata`

***

### getOrbitStateAtTime()

> **getOrbitStateAtTime**(`time`, `options?`): [`NearEarthOrbiterState`](../types/PW.NearEarthOrbiterState.md) \| `null`

获取指定仿真时刻的轨道状态（位置/姿态/瞬时轨道根数）。

#### Parameters

##### time

`JulianDate`

##### options?

###### observerLocation?

\[`number`, `number`, `number`\]

###### velocitySampleSeconds?

`number`

#### Returns

[`NearEarthOrbiterState`](../types/PW.NearEarthOrbiterState.md) \| `null`

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

[`Aircraft`](PW.Aircraft.md).[`getOrientationAtTime`](PW.Aircraft.md#getorientationattime)

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

[`Aircraft`](PW.Aircraft.md).[`getPosition`](PW.Aircraft.md#getposition)

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

[`Aircraft`](PW.Aircraft.md).[`getPositionAtTime`](PW.Aircraft.md#getpositionattime)

***

### getPropulsion()

> **getPropulsion**(`idOrName`): [`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Parameters

##### idOrName

`string`

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getPropulsion`](PW.Aircraft.md#getpropulsion)

***

### getPropulsions()

> **getPropulsions**(): [`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`getPropulsions`](PW.Aircraft.md#getpropulsions)

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

[`Aircraft`](PW.Aircraft.md).[`getTransformAtTime`](PW.Aircraft.md#gettransformattime)

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

[`Aircraft`](PW.Aircraft.md).[`getTransformMatrixAtTime`](PW.Aircraft.md#gettransformmatrixattime)

***

### getTransits()

> **getTransits**(`params`): `any`[]

计算卫星过境窗口（卫星自身能力，基于当前轨道源）。

返回值中的 `start/end` 为毫秒时间戳，可直接转为 `Date` 或 `JulianDate` 使用。

#### Parameters

##### params

[`NearEarthOrbiterTransitRequest`](../types/PW.NearEarthOrbiterTransitRequest.md)

#### Returns

`any`[]

***

### getVisibilityWindows()

> **getVisibilityWindows**(`params`): `number`[][]

计算可见窗口（仅返回 [startMs, endMs] 列表）。

#### Parameters

##### params

`Omit`\<[`NearEarthOrbiterTransitRequest`](../types/PW.NearEarthOrbiterTransitRequest.md), `"minElevationDeg"` \| `"maxTransits"`\>

#### Returns

`number`[][]

***

### loadTleByNameFromGroup()

> **loadTleByNameFromGroup**(`params`): `Promise`\<`string` \| `undefined`\>

在分组列表中按名称模糊匹配并写入当前对象。

#### Parameters

##### params

###### cacheLifeSeconds?

`number`

###### groupName

`string`

###### nameLike

`string`

#### Returns

`Promise`\<`string` \| `undefined`\>

***

### loadTleByNoradId()

> **loadTleByNoradId**(`noradId`, `cacheLifeSeconds?`): `Promise`\<`string`\>

根据 NORAD Catalog Number 拉取 TLE（带缓存）。

#### Parameters

##### noradId

`number`

NORAD Catalog Number

##### cacheLifeSeconds?

`number`

缓存时效（秒）

#### Returns

`Promise`\<`string`\>

***

### loadTleGroup()

> **loadTleGroup**(`groupName`, `cacheLifeSeconds?`): `Promise`\<`string`[]\>

按分组拉取 TLE 列表（带缓存）。

#### Parameters

##### groupName

`string`

##### cacheLifeSeconds?

`number`

#### Returns

`Promise`\<`string`[]\>

***

### observeAtTime()

> **observeAtTime**(`time`, `observerLocation?`): `any`

计算指定仿真时刻的单点观测结果。

#### Parameters

##### time

`JulianDate`

##### observerLocation?

\[`number`, `number`, `number`\]

#### Returns

`any`

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

[`Aircraft`](PW.Aircraft.md).[`register`](PW.Aircraft.md#register)

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

[`Aircraft`](PW.Aircraft.md).[`removeComponentById`](PW.Aircraft.md#removecomponentbyid)

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

[`Aircraft`](PW.Aircraft.md).[`removeComponentByName`](PW.Aircraft.md#removecomponentbyname)

***

### removePropulsion()

> **removePropulsion**(`idOrName`): `void`

#### Parameters

##### idOrName

`string`

#### Returns

`void`

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`removePropulsion`](PW.Aircraft.md#removepropulsion)

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

[`Aircraft`](PW.Aircraft.md).[`resetTemporalState`](PW.Aircraft.md#resettemporalstate)

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
obj.setOptions({ text: { text: "Updated" } });
```

#### Inherited from

[`Aircraft`](PW.Aircraft.md).[`setOptions`](PW.Aircraft.md#setoptions)

***

### setOrbitDefinition()

> **setOrbitDefinition**(`source`): `this`

设置轨道定义（首选入口）。

#### Parameters

##### source

`unknown`

#### Returns

`this`

***

### setOrbitSource()

> **setOrbitSource**(`source`): `void`

设置通用轨道源。

#### Parameters

##### source

`unknown`

#### Returns

`void`

***

### setSpg4PropagationEnabled()

> **setSpg4PropagationEnabled**(`enabled`): `void`

启用/关闭实时传播。

#### Parameters

##### enabled

`boolean`

#### Returns

`void`

***

### setTle()

> **setTle**(`tle`): `void`

设置 TLE（legacy 兼容入口）。

#### Parameters

##### tle

`string` \| `string`[]

两行或三行 TLE（字符串或字符串数组）

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

[`Aircraft`](PW.Aircraft.md).[`unregister`](PW.Aircraft.md#unregister)

***

### update()

> **update**(`time`): `void`

每帧更新：
- 可选实时传播：按仿真时间更新位置
- 可选速度朝向：当 position 是轨迹采样时自动更新姿态

#### Parameters

##### time

`JulianDate`

#### Returns

`void`

#### Overrides

[`Aircraft`](PW.Aircraft.md).[`update`](PW.Aircraft.md#update)

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

[`Aircraft`](PW.Aircraft.md).[`offClick`](PW.Aircraft.md#offclick)

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

[`Aircraft`](PW.Aircraft.md).[`offDblClick`](PW.Aircraft.md#offdblclick)

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

[`Aircraft`](PW.Aircraft.md).[`offMouseEnter`](PW.Aircraft.md#offmouseenter)

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

[`Aircraft`](PW.Aircraft.md).[`offMouseLeave`](PW.Aircraft.md#offmouseleave)

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

[`Aircraft`](PW.Aircraft.md).[`onBeforeDestroy`](PW.Aircraft.md#onbeforedestroy)

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

[`Aircraft`](PW.Aircraft.md).[`onBeforeRegister`](PW.Aircraft.md#onbeforeregister)

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

[`Aircraft`](PW.Aircraft.md).[`onBeforeUnregister`](PW.Aircraft.md#onbeforeunregister)

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

[`Aircraft`](PW.Aircraft.md).[`onBeforeUpdate`](PW.Aircraft.md#onbeforeupdate)

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

[`Aircraft`](PW.Aircraft.md).[`onClick`](PW.Aircraft.md#onclick)

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

[`Aircraft`](PW.Aircraft.md).[`onDblClick`](PW.Aircraft.md#ondblclick)

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

[`Aircraft`](PW.Aircraft.md).[`onDestroy`](PW.Aircraft.md#ondestroy)

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

[`Aircraft`](PW.Aircraft.md).[`onMouseEnter`](PW.Aircraft.md#onmouseenter)

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

[`Aircraft`](PW.Aircraft.md).[`onMouseLeave`](PW.Aircraft.md#onmouseleave)

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

[`Aircraft`](PW.Aircraft.md).[`onRegister`](PW.Aircraft.md#onregister)

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

[`Aircraft`](PW.Aircraft.md).[`onUnregister`](PW.Aircraft.md#onunregister)

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

[`Aircraft`](PW.Aircraft.md).[`onUpdate`](PW.Aircraft.md#onupdate)
