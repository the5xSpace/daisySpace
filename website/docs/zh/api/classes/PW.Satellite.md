[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Satellite

# Class: Satellite

Satellite：NearEarthOrbiter 的语义别名。

语义更贴近“卫星”，便于在业务侧区分 SpaceStation / Debris / Satellite 等同族对象。

## Example

```ts
import * as Daisy from "daisy-space-sdk";

const sat = new Daisy.PW.Satellite({ name: "STARLINK-1008", enableSpg4Propagation: true });
const tle = await sat.loadTleByNoradId(44714, 6 * 3600);
sat.setTle(tle);
sat.bindViewer(viewer);
```

## Extends

- [`NearEarthOrbiter`](PW.NearEarthOrbiter.md)

## Constructors

### Constructor

> **new Satellite**(`options?`, `celestialEllipsoid?`): `Satellite`

创建 NearEarthOrbiter。

#### Parameters

##### options?

[`NearEarthOrbiterConfig`](../types/PW.NearEarthOrbiterConfig.md)

配置（含轨道源与传播策略）

##### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md) = `...`

所属天体（默认地球）

#### Returns

`Satellite`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`constructor`](PW.NearEarthOrbiter.md#constructor)

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`_celestialEllipsoid`](PW.NearEarthOrbiter.md#_celestialellipsoid)

***

### \_entity

> **\_entity**: [`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`_entity`](PW.NearEarthOrbiter.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`isDestroyed`](PW.NearEarthOrbiter.md#isdestroyed)

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

获取宿主 Entity（用于挂载 Feature、交互事件、更新等）。

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`entity`](PW.NearEarthOrbiter.md#entity)

***

### id

#### Get Signature

> **get** **id**(): `string`

##### Returns

`string`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`id`](PW.NearEarthOrbiter.md#id)

***

### options

#### Get Signature

> **get** **options**(): [`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

对象创建/配置参数的原始快照（不同子类会扩展其结构）。

注意：这是“语义配置”的来源，而不是渲染结果。渲染落地由 _applyConfig + Feature/Component 完成。

##### Returns

[`FreeObjectConfig`](../types/PW.FreeObjectConfig.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`options`](PW.NearEarthOrbiter.md#options)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`orientation`](PW.NearEarthOrbiter.md#orientation)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`position`](PW.NearEarthOrbiter.md#position)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addComponent`](PW.NearEarthOrbiter.md#addcomponent)

***

### addGroundTrack()

> **addGroundTrack**(`options?`): [`GroundTrackComponent`](PW.GroundTrackComponent.md)

添加真实星下点滚动轨迹组件。

#### Parameters

##### options?

[`GroundTrackComponentOptions`](../types/PW.GroundTrackComponentOptions.md) = `{}`

#### Returns

[`GroundTrackComponent`](PW.GroundTrackComponent.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addGroundTrack`](PW.NearEarthOrbiter.md#addgroundtrack)

***

### addInstantOrbit()

> **addInstantOrbit**(`options?`): [`InstantOrbitComponent`](PW.InstantOrbitComponent.md)

添加瞬时轨道估计组件。

#### Parameters

##### options?

[`InstantOrbitComponentOptions`](../types/PW.InstantOrbitComponentOptions.md) = `{}`

#### Returns

[`InstantOrbitComponent`](PW.InstantOrbitComponent.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addInstantOrbit`](PW.NearEarthOrbiter.md#addinstantorbit)

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addLink`](PW.NearEarthOrbiter.md#addlink)

***

### addOrbitElementsView()

> **addOrbitElementsView**(`options?`): [`OrbitElementsViewComponent`](PW.OrbitElementsViewComponent.md)

添加轨道根数几何视图组件。

#### Parameters

##### options?

[`OrbitElementsViewComponentOptions`](../types/PW.OrbitElementsViewComponentOptions.md) = `{}`

#### Returns

[`OrbitElementsViewComponent`](PW.OrbitElementsViewComponent.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addOrbitElementsView`](PW.NearEarthOrbiter.md#addorbitelementsview)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addPropulsion`](PW.NearEarthOrbiter.md#addpropulsion)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`addSensor`](PW.NearEarthOrbiter.md#addsensor)

***

### applyEphemerisTrajectory()

> **applyEphemerisTrajectory**(...`args`): [`TrajectorySample`](TrajectorySample.md)

旧名兼容入口。

#### Parameters

##### args

...\[[`NearEarthOrbiterEphemerisRequest`](../types/PW.NearEarthOrbiterEphemerisRequest.md) & `object`\]

#### Returns

[`TrajectorySample`](TrajectorySample.md)

#### Overrides

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`applyEphemerisTrajectory`](PW.NearEarthOrbiter.md#applyephemeristrajectory)

***

### applyTrajectory()

> **applyTrajectory**(...`args`): [`TrajectorySample`](TrajectorySample.md)

写入轨迹采样的简写入口。

#### Parameters

##### args

...\[[`NearEarthOrbiterTrajectoryRequest`](../types/PW.NearEarthOrbiterTrajectoryRequest.md)\]

#### Returns

[`TrajectorySample`](TrajectorySample.md)

#### Overrides

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`applyTrajectory`](PW.NearEarthOrbiter.md#applytrajectory)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`bindEngine`](PW.NearEarthOrbiter.md#bindengine)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`buildEphemerisTrajectory`](PW.NearEarthOrbiter.md#buildephemeristrajectory)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`calculateEphemeris`](PW.NearEarthOrbiter.md#calculateephemeris)

***

### clearEphemerisCache()

> **clearEphemerisCache**(): `void`

清空星历缓存。

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`clearEphemerisCache`](PW.NearEarthOrbiter.md#clearephemeriscache)

***

### clearFocusTarget()

> **clearFocusTarget**(): `this`

清除当前物理对象的选中聚焦盒。

#### Returns

`this`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`clearFocusTarget`](PW.NearEarthOrbiter.md#clearfocustarget)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`destroy`](PW.NearEarthOrbiter.md#destroy)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getComponentById`](PW.NearEarthOrbiter.md#getcomponentbyid)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getComponentByName`](PW.NearEarthOrbiter.md#getcomponentbyname)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getComponents`](PW.NearEarthOrbiter.md#getcomponents)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getCurrentOrbitState`](PW.NearEarthOrbiter.md#getcurrentorbitstate)

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

获取当前仿真时刻的局部姿态。

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getCurrentOrientation`](PW.NearEarthOrbiter.md#getcurrentorientation)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getCurrentPosition`](PW.NearEarthOrbiter.md#getcurrentposition)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getEphemeris`](PW.NearEarthOrbiter.md#getephemeris)

***

### getEphemerisCache()

> **getEphemerisCache**(): [`NearEarthOrbiterEphemerisCache`](../types/PW.NearEarthOrbiterEphemerisCache.md) \| `undefined`

获取当前星历缓存元数据。

#### Returns

[`NearEarthOrbiterEphemerisCache`](../types/PW.NearEarthOrbiterEphemerisCache.md) \| `undefined`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getEphemerisCache`](PW.NearEarthOrbiter.md#getephemeriscache)

***

### getOrbitDefinition()

> **getOrbitDefinition**(): `unknown`

获取当前轨道定义。

#### Returns

`unknown`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getOrbitDefinition`](PW.NearEarthOrbiter.md#getorbitdefinition)

***

### getOrbitElements()

> **getOrbitElements**(): `OrbitElements`

解析当前轨道定义的轨道根数。

#### Returns

`OrbitElements`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getOrbitElements`](PW.NearEarthOrbiter.md#getorbitelements)

***

### getOrbitMetadata()

> **getOrbitMetadata**(): `OrbitMetadata`

解析当前轨道定义的元数据。

#### Returns

`OrbitMetadata`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getOrbitMetadata`](PW.NearEarthOrbiter.md#getorbitmetadata)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getOrbitStateAtTime`](PW.NearEarthOrbiter.md#getorbitstateattime)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getOrientationAtTime`](PW.NearEarthOrbiter.md#getorientationattime)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getPosition`](PW.NearEarthOrbiter.md#getposition)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getPositionAtTime`](PW.NearEarthOrbiter.md#getpositionattime)

***

### getPropulsion()

> **getPropulsion**(`idOrName`): [`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Parameters

##### idOrName

`string`

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md) \| `undefined`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getPropulsion`](PW.NearEarthOrbiter.md#getpropulsion)

***

### getPropulsions()

> **getPropulsions**(): [`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Returns

[`PropulsionComponent`](PW.PropulsionComponent.md)[]

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getPropulsions`](PW.NearEarthOrbiter.md#getpropulsions)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getTransformAtTime`](PW.NearEarthOrbiter.md#gettransformattime)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getTransformMatrixAtTime`](PW.NearEarthOrbiter.md#gettransformmatrixattime)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getTransits`](PW.NearEarthOrbiter.md#gettransits)

***

### getVisibilityWindows()

> **getVisibilityWindows**(`params`): `number`[][]

计算可见窗口（仅返回 [startMs, endMs] 列表）。

#### Parameters

##### params

`Omit`\<[`NearEarthOrbiterTransitRequest`](../types/PW.NearEarthOrbiterTransitRequest.md), `"minElevationDeg"` \| `"maxTransits"`\>

#### Returns

`number`[][]

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`getVisibilityWindows`](PW.NearEarthOrbiter.md#getvisibilitywindows)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`loadTleByNameFromGroup`](PW.NearEarthOrbiter.md#loadtlebynamefromgroup)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`loadTleByNoradId`](PW.NearEarthOrbiter.md#loadtlebynoradid)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`loadTleGroup`](PW.NearEarthOrbiter.md#loadtlegroup)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`observeAtTime`](PW.NearEarthOrbiter.md#observeattime)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`register`](PW.NearEarthOrbiter.md#register)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`removeComponentById`](PW.NearEarthOrbiter.md#removecomponentbyid)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`removeComponentByName`](PW.NearEarthOrbiter.md#removecomponentbyname)

***

### removePropulsion()

> **removePropulsion**(`idOrName`): `void`

#### Parameters

##### idOrName

`string`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`removePropulsion`](PW.NearEarthOrbiter.md#removepropulsion)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`resetTemporalState`](PW.NearEarthOrbiter.md#resettemporalstate)

***

### setFocusTarget()

> **setFocusTarget**(`options?`): `this`

显示当前物理对象的选中聚焦盒。

#### Parameters

##### options?

`EntityFocusOptions` = `{}`

#### Returns

`this`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`setFocusTarget`](PW.NearEarthOrbiter.md#setfocustarget)

***

### setFocusVisible()

> **setFocusVisible**(`visible`, `options?`): `this`

显示或隐藏当前物理对象的选中聚焦盒。

#### Parameters

##### visible

`boolean`

##### options?

`EntityFocusOptions` = `{}`

#### Returns

`this`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`setFocusVisible`](PW.NearEarthOrbiter.md#setfocusvisible)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`setOptions`](PW.NearEarthOrbiter.md#setoptions)

***

### setOrbitDefinition()

> **setOrbitDefinition**(`source`): `this`

设置轨道定义（首选入口）。

#### Parameters

##### source

`unknown`

#### Returns

`this`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`setOrbitDefinition`](PW.NearEarthOrbiter.md#setorbitdefinition)

***

### setOrbitSource()

> **setOrbitSource**(`source`): `void`

设置通用轨道源。

#### Parameters

##### source

`unknown`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`setOrbitSource`](PW.NearEarthOrbiter.md#setorbitsource)

***

### setSpg4PropagationEnabled()

> **setSpg4PropagationEnabled**(`enabled`): `void`

启用/关闭实时传播。

#### Parameters

##### enabled

`boolean`

#### Returns

`void`

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`setSpg4PropagationEnabled`](PW.NearEarthOrbiter.md#setspg4propagationenabled)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`setTle`](PW.NearEarthOrbiter.md#settle)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`unregister`](PW.NearEarthOrbiter.md#unregister)

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

#### Inherited from

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`update`](PW.NearEarthOrbiter.md#update)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`offClick`](PW.NearEarthOrbiter.md#offclick)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`offDblClick`](PW.NearEarthOrbiter.md#offdblclick)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`offMouseEnter`](PW.NearEarthOrbiter.md#offmouseenter)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`offMouseLeave`](PW.NearEarthOrbiter.md#offmouseleave)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onBeforeDestroy`](PW.NearEarthOrbiter.md#onbeforedestroy)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onBeforeRegister`](PW.NearEarthOrbiter.md#onbeforeregister)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onBeforeUnregister`](PW.NearEarthOrbiter.md#onbeforeunregister)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onBeforeUpdate`](PW.NearEarthOrbiter.md#onbeforeupdate)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onClick`](PW.NearEarthOrbiter.md#onclick)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onDblClick`](PW.NearEarthOrbiter.md#ondblclick)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onDestroy`](PW.NearEarthOrbiter.md#ondestroy)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onMouseEnter`](PW.NearEarthOrbiter.md#onmouseenter)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onMouseLeave`](PW.NearEarthOrbiter.md#onmouseleave)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onRegister`](PW.NearEarthOrbiter.md#onregister)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onUnregister`](PW.NearEarthOrbiter.md#onunregister)

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

[`NearEarthOrbiter`](PW.NearEarthOrbiter.md).[`onUpdate`](PW.NearEarthOrbiter.md#onupdate)
