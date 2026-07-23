[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Entity

# Class: Entity

Daisy 实体。

- Feature 生命周期管理（注册/卸载）
- 轨迹、朝向、遮挡/视锥判断等运行时状态
- 与 Daisy Engine 的交互事件对接

## Constructors

### Constructor

> **new Entity**(`name?`, `options?`): `Entity`

创建一个 Daisy 实体。

#### Parameters

##### name?

`string` = `""`

实体名称，默认为空字符串

##### options?

可选配置项

###### id?

`string`

自定义实体 id，不传则自动生成 GUID

#### Returns

`Entity`

#### Example

```ts
const entity = new Entity("卫星A");
const entity2 = new Entity("卫星B", { id: "sat-b" });
```

## Properties

### celestialEllipsoid

> **celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

***

### isBehindCamera

> **isBehindCamera**: `boolean` = `false`

是否在相机背后

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

***

### isInCameraCullingVolume

> **isInCameraCullingVolume**: `boolean` = `false`

是否在相机视锥内

***

### isOccludedByEarth

> **isOccludedByEarth**: `boolean` = `false`

是否被地球遮挡

***

### lastPosition

> **lastPosition**: `Cartesian3` \| `undefined`

***

### lastUpdateSimTime

> **lastUpdateSimTime**: `JulianDate` \| `undefined`

***

### lastVelocity

> **lastVelocity**: `Cartesian3` \| `undefined`

***

### matrix

> **matrix**: `Matrix4` = `Daisy.Matrix4.IDENTITY`

***

### previousFrameState

> **previousFrameState**: [`EntityTimeState`](../interfaces/EntityTimeState.md) \| `undefined`

***

### transformer

> **transformer**: `Transformer`

***

### updateGroup

> **updateGroup**: `number` \| `undefined`

***

### ~~viewer~~

> **viewer**: [`Engine`](Engine.md) \| `undefined`

兼容旧命名：建议改用 `engine`。

#### Deprecated

请使用 engine

***

### viewForm

> **viewForm**: `Cartesian3` = `Daisy.Cartesian3.ZERO`

## Accessors

### activated

#### Get Signature

> **get** **activated**(): `boolean`

获取是否处于激活状态。

##### Returns

`boolean`

#### Set Signature

> **set** **activated**(`value`): `void`

设置是否处于激活状态。

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### bodyAxis

#### Get Signature

> **get** **bodyAxis**(): `BodyAxis` \| `undefined`

获取体轴调试对象（仅在开启并处于 3D 模式时存在）。

##### Returns

`BodyAxis` \| `undefined`

***

### bodyAxisVectors

#### Get Signature

> **get** **bodyAxisVectors**(): `object`

获取实体体轴向量（归一化后的 x/y/z）。

##### Returns

`object`

###### x

> **x**: `Cartesian3`

###### y

> **y**: `Cartesian3`

###### z

> **z**: `Cartesian3`

***

### boundingSphereRadius

#### Get Signature

> **get** **boundingSphereRadius**(): `number`

获取包围球半径。

##### Returns

`number`

***

### customProperties

#### Get Signature

> **get** **customProperties**(): `Record`\<`string`, `any`\> \| `undefined`

获取自定义属性。

##### Returns

`Record`\<`string`, `any`\> \| `undefined`

#### Set Signature

> **set** **customProperties**(`value`): `void`

设置实体自定义属性。

##### Parameters

###### value

`Record`\<`string`, `any`\> \| `undefined`

##### Returns

`void`

***

### description

#### Get Signature

> **get** **description**(): `string` \| `undefined`

获取描述信息。

##### Returns

`string` \| `undefined`

#### Set Signature

> **set** **description**(`value`): `void`

设置实体描述信息。

##### Parameters

###### value

`string` \| `undefined`

##### Returns

`void`

***

### engine

#### Get Signature

> **get** **engine**(): [`Engine`](Engine.md) \| `undefined`

新命名别名：与 `viewer` 同步，优先用于新代码。

##### Returns

[`Engine`](Engine.md) \| `undefined`

#### Set Signature

> **set** **engine**(`value`): `void`

##### Parameters

###### value

[`Engine`](Engine.md) \| `undefined`

##### Returns

`void`

***

### hovered

#### Get Signature

> **get** **hovered**(): `boolean`

获取是否处于悬停状态。

##### Returns

`boolean`

#### Set Signature

> **set** **hovered**(`value`): `void`

设置是否处于悬停状态。

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### interaction

#### Get Signature

> **get** **interaction**(): `InteractionComponent`

获取交互组件（用于拾取、悬停、点击等状态管理）。

##### Returns

`InteractionComponent`

***

### name

#### Get Signature

> **get** **name**(): `string`

获取实体名称。

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

设置实体名称。

##### Parameters

###### value

`string`

##### Returns

`void`

***

### orientation

#### Get Signature

> **get** **orientation**(): `Property` \| `Quaternion` \| `undefined`

获取实体方向属性

##### Returns

`Property` \| `Quaternion` \| `undefined`

#### Set Signature

> **set** **orientation**(`value`): `void`

设置实体方向属性

##### Parameters

###### value

`Property` \| `Quaternion` \| `undefined`

##### Returns

`void`

***

### parentId

#### Get Signature

> **get** **parentId**(): `string` \| `undefined`

获取父实体 id。

##### Returns

`string` \| `undefined`

#### Set Signature

> **set** **parentId**(`value`): `void`

设置父实体 id（会触发父子关系同步）。

##### Parameters

###### value

`string` \| `undefined`

##### Returns

`void`

***

### position

#### Get Signature

> **get** **position**(): `EntityPositions`

获取实体位置属性，非实时位置

##### Returns

`EntityPositions`

#### Set Signature

> **set** **position**(`position`): `void`

设置实体位置属性，一般为TrajectorySample或Cartesian3 ，这个属性是仿真场景的关键属性，用于更新实体位置

##### Parameters

###### position

`EntityPositions`

实体位置属性，一般为TrajectorySample或Cartesian3

##### Returns

`void`

***

### show

#### Get Signature

> **get** **show**(): `boolean`

获取实体显示属性，一般为boolean ，这个属性是仿真场景的关键属性，用于控制实体是否显示

##### Returns

`boolean`

#### Set Signature

> **set** **show**(`value`): `void`

设置实体显示属性，一般为boolean ，这个属性是仿真场景的关键属性，用于控制实体是否显示

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### viewDistanceConst

#### Get Signature

> **get** **viewDistanceConst**(): [`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

获取视距配置

##### Returns

[`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

***

### viewFrom

#### Get Signature

> **get** **viewFrom**(): `Cartesian3` \| `undefined`

获取相机跟随视角偏移

##### Returns

`Cartesian3` \| `undefined`

#### Set Signature

> **set** **viewFrom**(`value`): `void`

设置相机跟随视角偏移

##### Parameters

###### value

`Cartesian3` \| `undefined`

##### Returns

`void`

***

### worldMatrix

#### Get Signature

> **get** **worldMatrix**(): `Matrix4`

获取当前世界矩阵（优先使用缓存的 currentMatrix）。

##### Returns

`Matrix4`

## Methods

### \_hasContinuousUpdateDemandAt()

> **\_hasContinuousUpdateDemandAt**(`time`): `boolean`

判断当前时刻是否存在命中的内部连续更新需求。

#### Parameters

##### time

`JulianDate`

当前仿真时间

#### Returns

`boolean`

***

### \_registerContinuousUpdateDemand()

> **\_registerContinuousUpdateDemand**(`demand`, `token?`): `string`

注册“本帧必须更新实体”的内部调度需求。

说明：
- 这是给组件/特征使用的内部优先级钩子，不面向常规业务 API
- 当任一 demand 在当前时刻返回 true 时，调度器会跳过常规位移节流，直接执行实体更新

#### Parameters

##### demand

`EntityContinuousUpdateDemand`

给定当前仿真时间，返回本帧是否必须更新

##### token?

`string`

可选稳定标识；不传时自动生成

#### Returns

`string`

实际写入的 token

***

### \_unregisterContinuousUpdateDemand()

> **\_unregisterContinuousUpdateDemand**(`token?`): `void`

取消内部调度需求注册。

#### Parameters

##### token?

`string`

注册时返回的 demand token

#### Returns

`void`

***

### activateForValidTime()

> **activateForValidTime**(): `void`

时间有效：重建场景运行态并恢复 Feature 注册。

#### Returns

`void`

***

### addAvailabilityInterval()

> **addAvailabilityInterval**(`interval`): `this`

#### Parameters

##### interval

`TimeInterval`

#### Returns

`this`

***

### addFeature()

> **addFeature**(`feature`): [`Feature`](Feature.md)

添加组件

#### Parameters

##### feature

[`Feature`](Feature.md)

要添加的 Feature 实例

#### Returns

[`Feature`](Feature.md)

已添加（或已存在）的 Feature 实例

#### Example

```ts
const feature = new PW.ModelFeature({ url: "/model.glb" });
entity.addFeature(feature);
```

***

### bindEngine()

> **bindEngine**(`engine`): `Entity`

绑定到 Engine 并完成注册。

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`Entity`

***

### ~~bindViewer()~~

> **bindViewer**(`viewer`): `Entity`

兼容旧名：绑定到 Engine 并完成注册。

#### Parameters

##### viewer

[`Engine`](Engine.md)

#### Returns

`Entity`

#### Deprecated

请使用 bindEngine

***

### checkIsBehindCamera()

> **checkIsBehindCamera**(`satPos`, `camera?`): `boolean`

检查是否在相机背后

#### Parameters

##### satPos

`Cartesian3`

##### camera?

`Camera`

#### Returns

`boolean`

***

### checkTimeValid()

> **checkTimeValid**(`time`): `boolean`

检查实体在指定时间是否在有效时间区间内。

#### Parameters

##### time

`JulianDate`

仿真时间

#### Returns

`boolean`

时间有效返回 true，超出可用区间返回 false

***

### clearAvailability()

> **clearAvailability**(): `this`

#### Returns

`this`

***

### computeModelMatrix()

> **computeModelMatrix**(`state`): `Matrix4`

计算模型矩阵

#### Parameters

##### state

[`EntityTimeState`](../interfaces/EntityTimeState.md)

#### Returns

`Matrix4`

***

### deactivateForInvalidTime()

> **deactivateForInvalidTime**(): `void`

时间无效时释放当前场景运行态，但保留业务实体对象和 Feature 配置。

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

实体销毁

#### Returns

`void`

***

### getAvailability()

> **getAvailability**(): `TimeIntervalCollection` \| `undefined`

#### Returns

`TimeIntervalCollection` \| `undefined`

***

### ~~getBoundBoxFeature()~~

> **getBoundBoxFeature**(`options?`): [`BoundBoxFeature`](BoundBoxFeature.md)

#### Parameters

##### options?

`Partial`\<[`BoundBoxOptions`](../interfaces/BoundBoxOptions.md)\>

#### Returns

[`BoundBoxFeature`](BoundBoxFeature.md)

#### Deprecated

请使用 [Entity.getOrCreateBoundBoxFeature](#getorcreateboundboxfeature)。

***

### getBoundingSphere()

> **getBoundingSphere**(`time?`): `BoundingSphere`

获取指定时间的包围球（中心优先使用帧相关位置）。

#### Parameters

##### time?

`JulianDate`

仿真时间

#### Returns

`BoundingSphere`

***

### getBoundingSphereRadius()

> **getBoundingSphereRadius**(): `number`

获取包围球半径（基于 BoundBoxFeature 计算）。

#### Returns

`number`

***

### getCurrentMatrix()

> **getCurrentMatrix**(): `Matrix4` \| `undefined`

获取当前帧的模型矩阵（优先使用渲染缓存）。

#### Returns

`Matrix4` \| `undefined`

当前帧的 4x4 模型矩阵，缓存不可用时返回 undefined

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

获取当前帧的实体位置（ECEF 坐标）。

#### Returns

`Cartesian3` \| `undefined`

当前帧的位置坐标，若无有效状态则返回 undefined

***

### getCurrentPositionECEF()

> **getCurrentPositionECEF**(): `Cartesian3` \| `undefined`

获取当前帧的实体 ECEF（地球固定坐标系）位置。

#### Returns

`Cartesian3` \| `undefined`

当前帧的 ECEF 位置坐标，若无有效状态则返回 undefined

***

### getCurrentState()

> **getCurrentState**(): [`EntityTimeState`](../interfaces/EntityTimeState.md)

获取当前状态

#### Returns

[`EntityTimeState`](../interfaces/EntityTimeState.md)

***

### getCurrentTime()

> **getCurrentTime**(): `JulianDate`

获取当前时间

#### Returns

`JulianDate`

***

### getFeatureById()

> **getFeatureById**(`id`): [`IFeature`](../interfaces/IFeature.md) \| `undefined`

#### Parameters

##### id

`string`

#### Returns

[`IFeature`](../interfaces/IFeature.md) \| `undefined`

***

### getFeatureByName()

> **getFeatureByName**(`name`): [`IFeature`](../interfaces/IFeature.md) \| `undefined`

#### Parameters

##### name

`string`

#### Returns

[`IFeature`](../interfaces/IFeature.md) \| `undefined`

***

### getFeatures()

> **getFeatures**(): [`IFeature`](../interfaces/IFeature.md)[]

#### Returns

[`IFeature`](../interfaces/IFeature.md)[]

***

### getFrameAwarePosition()

> **getFrameAwarePosition**(`time`): `Cartesian3` \| `undefined`

#### Parameters

##### time

`JulianDate`

#### Returns

`Cartesian3` \| `undefined`

***

### getId()

> **getId**(): `string`

获取实体唯一标识 id。

#### Returns

`string`

实体 id 字符串

***

### getMatrix()

> **getMatrix**(): `Matrix4`

获取实体的仿真变换矩阵（由 Transformer 驱动，被动响应变换）。

#### Returns

`Matrix4`

当前应用的 4x4 模型矩阵，无 Transformer 时返回单位矩阵

***

### getOrCreateBoundBoxFeature()

> **getOrCreateBoundBoxFeature**(`options?`): [`BoundBoxFeature`](BoundBoxFeature.md)

获取或创建与当前 Entity 强绑定的 BoundBoxFeature（单实例）。

- Entity 内部会按需自动创建；外部不允许手动 add/remove BoundBoxFeature
- 返回同一个实例，保证全局单例语义

#### Parameters

##### options?

`Partial`\<[`BoundBoxOptions`](../interfaces/BoundBoxOptions.md)\>

可选：创建/更新时要合并的参数

#### Returns

[`BoundBoxFeature`](BoundBoxFeature.md)

BoundBoxFeature 实例

#### Example

```ts
const box = entity.getOrCreateBoundBoxFeature({
 dimensions: new Daisy.Cartesian3(200, 200, 200),
 shape: "ball",
});
box.onClick(() => console.log("bound box clicked"));
```

***

### getParent()

> **getParent**(): `Entity` \| `undefined`

获取父实体（若可解析）。

#### Returns

`Entity` \| `undefined`

***

### getPosition()

> **getPosition**(`time`): `Cartesian3` \| `undefined`

获取指定时间的实体位置（笛卡尔坐标）。

#### Parameters

##### time

`JulianDate`

仿真时间

#### Returns

`Cartesian3` \| `undefined`

指定时间的实体位置坐标，若无法解析则返回 undefined

***

### getPositionByTime()

> **getPositionByTime**(`time`): `Cartesian3` \| `undefined`

#### Parameters

##### time

`JulianDate`

#### Returns

`Cartesian3` \| `undefined`

***

### getReferenceEntity()

> **getReferenceEntity**(`ref`): `Entity` \| `undefined`

#### Parameters

##### ref

[`REF`](../enums/REF.md)

#### Returns

`Entity` \| `undefined`

***

### getShowValue()

> **getShowValue**(`time?`, `visitedIds?`): `boolean`

获取指定时间的显示值（考虑父子链与可用时间区间）。

#### Parameters

##### time?

`JulianDate`

仿真时间（缺省时使用当前时间）

##### visitedIds?

`Set`\<`string`\>

#### Returns

`boolean`

***

### getTimes()

> **getTimes**(): `JulianDate`[]

获取 Daisy 轨迹采样对象中的时间集合；静态位置返回空数组。

#### Returns

`JulianDate`[]

***

### getWorldMatrix()

> **getWorldMatrix**(`time?`): `Matrix4`

获取指定时间的世界矩阵。

#### Parameters

##### time?

`JulianDate`

仿真时间

#### Returns

`Matrix4`

***

### hasUnthrottleableFeature()

> **hasUnthrottleableFeature**(): `boolean`

判断实体当前是否包含至少一个不可截流的 Feature。

#### Returns

`boolean`

***

### isOccludedByCelestialEllipsoid()

> **isOccludedByCelestialEllipsoid**(`positionECEF`, `time?`, `camera?`): `boolean`

#### Parameters

##### positionECEF

`Cartesian3`

##### time?

`JulianDate`

##### camera?

`Camera`

#### Returns

`boolean`

***

### isOccludedEllipsoid()

> **isOccludedEllipsoid**(`positionECEF`, `ellipsoid?`, `camera?`): `boolean`

检测是否被椭球遮挡

#### Parameters

##### positionECEF

`Cartesian3`

##### ellipsoid?

`Ellipsoid` = `ELLIPSOID.EARTH_WGS84`

##### camera?

`Camera`

#### Returns

`boolean`

***

### isTrajectorySample()

> **isTrajectorySample**(): `boolean`

判断实体位置是否为轨迹样本，一般不需要调用，内部使用

#### Returns

`boolean`

***

### isTrajectorySampleBodyFixed()

> **isTrajectorySampleBodyFixed**(): `boolean`

判断实体位置是否为天体固定坐标系下的轨迹采样。

#### Returns

`boolean`

***

### LODAnyCameraInDistanceDisplayCondition()

> **LODAnyCameraInDistanceDisplayCondition**(`positionECEF`, `ddc?`): `boolean`

#### Parameters

##### positionECEF

`Cartesian3`

##### ddc?

`DistanceDisplayCondition`

#### Returns

`boolean`

***

### LODAnyCameraWithinMaxDistance()

> **LODAnyCameraWithinMaxDistance**(`positionECEF`, `maxDistance?`): `boolean`

#### Parameters

##### positionECEF

`Cartesian3`

##### maxDistance?

`number`

#### Returns

`boolean`

***

### LODCheckPassHandler()

> **LODCheckPassHandler**(`positionECEF`): `boolean`

#### Parameters

##### positionECEF

`Cartesian3`

#### Returns

`boolean`

***

### LODInCameraCullingVolume()

> **LODInCameraCullingVolume**(`positionECEF`): `boolean`

LOD检测是否在相机视锥内

#### Parameters

##### positionECEF

`Cartesian3`

#### Returns

`boolean`

***

### LODIsOccludedEarth()

> **LODIsOccludedEarth**(`positionECEF`): `boolean`

LOD检测是否被地球遮挡

#### Parameters

##### positionECEF

`Cartesian3`

#### Returns

`boolean`

***

### receiveFeatureEvent()

> **receiveFeatureEvent**(`event`, `payload?`): `void`

接收来自 Feature 的“向上提交”交互事件，并转换为 Entity 自身事件触发。

通常不需要手动调用；当 Feature 启用 `enableSubmitToEntity(true)` 后，
Feature 的 click/dblclick/mouseenter/mouseleave 会自动提交到这里。

#### Parameters

##### event

`string`

事件名（如 "click" / "dblclick" / "mouseenter" / "mouseleave"）

##### payload?

`any`

事件负载，通常来自场景交互拾取结果。

#### Returns

`void`

void

#### Example

```ts
entity.onClick((e) => {
 console.log("entity clicked", e.featureType, e.featureId);
});

feature.enableSubmitToEntity(true);
```

***

### removeFeature()

> **removeFeature**(`feature`): `void`

移除组件

#### Parameters

##### feature

[`Feature`](Feature.md)

要移除的 Feature 实例

#### Returns

`void`

#### Example

```ts
const feature = entity.getFeatureByName("__model");
if (feature) entity.removeFeature(feature as any);
```

***

### removeFeatureById()

> **removeFeatureById**(`id`): `void`

#### Parameters

##### id

`string`

#### Returns

`void`

***

### removeFeatureByName()

> **removeFeatureByName**(`name`): `void`

#### Parameters

##### name

`string`

#### Returns

`void`

***

### removePath()

> **removePath**(): `void`

移除快速路径，仅在TrajectorySample位置模式下生效

#### Returns

`void`

***

### resetTemporalState()

> **resetTemporalState**(`_time?`): `void`

#### Parameters

##### \_time?

`JulianDate`

#### Returns

`void`

***

### setAvailabilityIntervals()

> **setAvailabilityIntervals**(`intervals`): `this`

#### Parameters

##### intervals

`TimeInterval`[]

#### Returns

`this`

***

### setBodyAxis()

> **setBodyAxis**(`options`): `void`

设置实体体轴,仅在3D模式下生效，仅用于调试

#### Parameters

##### options

`BodyAxisOptions`

#### Returns

`void`

***

### setBodyAxisVectors()

> **setBodyAxisVectors**(`value`): `void`

设置实体体轴向量（会对输入向量进行归一化）。

#### Parameters

##### value

x/y/z 轴向量

###### x

`Cartesian3`

###### y

`Cartesian3`

###### z

`Cartesian3`

#### Returns

`void`

***

### setBoundBoxDebugVisible()

> **setBoundBoxDebugVisible**(`visible`): [`BoundBoxFeature`](BoundBoxFeature.md)

设置 BoundBoxFeature 的 debug 可视状态（显示/隐藏）。

#### Parameters

##### visible

`boolean`

true 显示；false 隐藏

#### Returns

[`BoundBoxFeature`](BoundBoxFeature.md)

BoundBoxFeature 实例

#### Example

```ts
entity.setBoundBoxDebugVisible(true);
```

***

### setParent()

> **setParent**(`parent?`): `this`

设置父实体（Entity 或 id）。

#### Parameters

##### parent?

`string` \| `Entity`

父实体或父实体 id

#### Returns

`this`

***

### setPath()

> **setPath**(`path`): `void`

为轨迹采样位置设置快速轨迹线。

自动优化默认开启，会结合实体数量、速度和相机尺度调整采样间隔与点数上限。

#### Parameters

##### path

`EntityPathOptions`

#### Returns

`void`

#### Example

```ts
entity.setPath({
 historySecond: 3600,
 futureSecond: 7200,
 width: 2,
 historyColor: Daisy.Color.BLUE,
 futureColor: Daisy.Color.GREEN.withAlpha(0.5),
});
```

***

### setShowProperty()

> **setShowProperty**(`showProperty`): `void`

设置显示属性，可传布尔值或实现 `getValue(time)` 的动态属性。

#### Parameters

##### showProperty

`any`

显示属性

#### Returns

`void`

***

### supportsInertialSample()

> **supportsInertialSample**(): `boolean`

是否支持关心坐标系

#### Returns

`boolean`

boolean

***

### tryGetWorldMatrix()

> **tryGetWorldMatrix**(`time`): `Matrix4` \| `undefined`

尝试获取指定时间的世界矩阵（缺少必要状态时返回 undefined）。

#### Parameters

##### time

`JulianDate`

仿真时间

#### Returns

`Matrix4` \| `undefined`

## Events

### offClick()

> **offClick**(`handler?`): `this`

取消监听 Entity 点击事件。

#### Parameters

##### handler?

(`e`) => `void`

可选：指定要移除的回调；不传则移除该事件下的全部监听

#### Returns

`this`

this
 click

***

### offDblClick()

> **offDblClick**(`handler?`): `this`

取消监听 Entity 双击事件。

#### Parameters

##### handler?

(`e`) => `void`

可选：指定要移除的回调；不传则移除该事件下的全部监听

#### Returns

`this`

this
 dblclick

***

### offMouseEnter()

> **offMouseEnter**(`handler?`): `this`

取消监听 Entity 鼠标移入事件。

#### Parameters

##### handler?

(`e`) => `void`

可选：指定要移除的回调；不传则移除该事件下的全部监听

#### Returns

`this`

this
 mouseenter

***

### offMouseLeave()

> **offMouseLeave**(`handler?`): `this`

取消监听 Entity 鼠标移出事件。

#### Parameters

##### handler?

(`e`) => `void`

可选：指定要移除的回调；不传则移除该事件下的全部监听

#### Returns

`this`

this
 mouseleave

***

### ~~onBeforeDestory()~~

> **onBeforeDestory**(`callback`): `void`

onBeforeDestroy 的历史别名（拼写保留兼容）。
 BEFORE_DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Deprecated

请使用 onBeforeDestroy

***

### onBeforeDestroy()

> **onBeforeDestroy**(`callback`): `void`

监听销毁前回调。
 BEFORE_DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onBeforeRegister()

> **onBeforeRegister**(`callback`): `void`

监听注册前回调。
 BEFORE_REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onBeforeUpdate()

> **onBeforeUpdate**(`callback`): `void`

监听更新前回调。
 BEFORE_UPDATE

#### Parameters

##### callback

(`spaceObject`, `time`) => `void`

#### Returns

`void`

***

### onClick()

> **onClick**(`handler`): `this`

监听 Entity 点击事件。

- 既可来自实体自身（comType === "Entity"）的拾取
- 也可来自 Feature 的向上事件提交（Feature.enableSubmitToEntity）

#### Parameters

##### handler

(`e`) => `void`

回调函数

#### Returns

`this`

this
 click

#### Example

```ts
entity.onClick((e) => {
 console.log("clicked", e.entityId, e.featureType);
});
```

***

### onDblClick()

> **onDblClick**(`handler`): `this`

监听 Entity 双击事件。

#### Parameters

##### handler

(`e`) => `void`

回调函数

#### Returns

`this`

this
 dblclick

***

### ~~onDestory()~~

> **onDestory**(`callback`): `void`

onDestroy 的历史别名（拼写保留兼容）。
 DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Deprecated

请使用 onDestroy

***

### onDestroy()

> **onDestroy**(`callback`): `void`

监听销毁回调。
 DESTROY

#### Parameters

##### callback

() => `void`

#### Returns

`void`

***

### onMouseEnter()

> **onMouseEnter**(`handler`): `this`

监听 Entity 鼠标移入事件。

#### Parameters

##### handler

(`e`) => `void`

回调函数

#### Returns

`this`

this
 mouseenter

***

### onMouseLeave()

> **onMouseLeave**(`handler`): `this`

监听 Entity 鼠标移出事件。

#### Parameters

##### handler

(`e`) => `void`

回调函数

#### Returns

`this`

this
 mouseleave

***

### onRegister()

> **onRegister**(`callback`): `void`

监听注册回调。
 REGISTER

#### Parameters

##### callback

(`spaceObject`) => `void`

#### Returns

`void`

***

### onSelected()

> **onSelected**(`callback`): `void`

选择事件

#### Parameters

##### callback

(`e`) => `void`

#### Returns

`void`

selected

***

### onUnSelected()

> **onUnSelected**(`callback`): `void`

取消选择事件

#### Parameters

##### callback

(`e`) => `void`

#### Returns

`void`

unSelected

***

### onUpdate()

> **onUpdate**(`callback`): `void`

监听更新回调。
 UPDATE

#### Parameters

##### callback

(`spaceObject`, `time`) => `void`

#### Returns

`void`
