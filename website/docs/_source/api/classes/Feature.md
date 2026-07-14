[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Feature

# Abstract Class: Feature

Feature 基类。

提供：
- 生命周期（register/update/destroy）基础流程
- 与 Entity/Engine 的关联
- 变换器（Transformer）与机体坐标轴（BodyAxis）等通用能力

## Extended by

- [`ModelFeature`](ModelFeature.md)
- [`PointFeature`](PointFeature.md)
- [`TrailPathFeature`](TrailPathFeature.md)
- [`BillboardFeature`](BillboardFeature.md)
- [`BoundBoxFeature`](BoundBoxFeature.md)
- [`BoxFeature`](BoxFeature.md)
- [`SphereFeature`](SphereFeature.md)
- [`PolylineFeature`](PolylineFeature.md)
- [`PolygonFeature`](PolygonFeature.md)
- [`ShaderPolygonFeature`](ShaderPolygonFeature.md)
- [`EllipseFeature`](EllipseFeature.md)
- [`RectangleFeature`](RectangleFeature.md)
- [`CorridorFeature`](CorridorFeature.md)
- [`WallFeature`](WallFeature.md)
- [`PolylineVolumeFeature`](PolylineVolumeFeature.md)
- [`ArrowPointerFeature`](ArrowPointerFeature.md)
- [`TilesetFeature`](TilesetFeature.md)
- [`ParticleFeature`](ParticleFeature.md)
- [`CapsuleParticleFeature`](CapsuleParticleFeature.md)
- [`HeatmapFeature`](HeatmapFeature.md)
- [`CoverageAreaFeature`](CoverageAreaFeature.md)
- [`GeoJsonFeature`](GeoJsonFeature.md)
- [`FreeGeometryFeature`](FreeGeometryFeature.md)
- [`LabelFeature`](UI.LabelFeature.md)
- [`PopoverFeature`](UI.PopoverFeature.md)

## Implements

- [`IFeature`](../interfaces/IFeature.md)

## Constructors

### Constructor

> **new Feature**(`options?`): `Feature`

#### Parameters

##### options?

`any` = `...`

{PathComponentOptions}

#### Returns

`Feature`

## Properties

### handle

> **handle**: (`mode`) => `void`

场景模式切换时的默认处理。

2D/非 3D 模式下，默认销毁机体坐标轴以避免异常显示。

#### Parameters

##### mode

`SceneMode`

#### Returns

`void`

***

### registered

> **registered**: `boolean` = `false`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`registered`](../interfaces/IFeature.md#registered)

***

### transformer

> **transformer**: `Transformer`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`transformer`](../interfaces/IFeature.md#transformer)

***

### type

> `readonly` `static` **type**: `string` = `""`

## Accessors

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `undefined`

##### Returns

[`Entity`](Entity.md) \| `undefined`

#### Set Signature

> **set** **entity**(`value`): `void`

##### Parameters

###### value

[`Entity`](Entity.md) \| `undefined`

##### Returns

`void`

***

### id

#### Get Signature

> **get** **id**(): `string`

Feature 的唯一标识。

##### Default

`${type}__${GenGuid()}`

##### Returns

`string`

#### Set Signature

> **set** **id**(`value`): `void`

Feature 的唯一标识。

通常由基类在构造时自动生成：`${type}__${GenGuid()}`。
子类也可以在注册前手动覆盖。

##### Default

`${type}__${GenGuid()}`

##### Parameters

###### value

`string`

##### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`id`](../interfaces/IFeature.md#id)

***

### includeInBoundingSphere

#### Get Signature

> **get** **includeInBoundingSphere**(): `boolean`

当前 Feature 是否参与 Entity 的包围球聚合。

默认值为 `true`。辅助线、粒子等不希望影响相机取景的 Feature 可以关闭。

##### Returns

`boolean`

#### Set Signature

> **set** **includeInBoundingSphere**(`value`): `void`

设置当前 Feature 是否参与 Entity 的包围球聚合。

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`includeInBoundingSphere`](../interfaces/IFeature.md#includeinboundingsphere)

***

### lodMode

#### Get Signature

> **get** **lodMode**(): `"entity"` \| `"none"` \| `"self"`

获取当前 Feature 的 LOD 模式。

##### Returns

`"entity"` \| `"none"` \| `"self"`

#### Set Signature

> **set** **lodMode**(`mode`): `void`

设置当前 Feature 的 LOD 模式。

##### Parameters

###### mode

`"entity"` \| `"none"` \| `"self"`

##### Returns

`void`

***

### name

#### Get Signature

> **get** **name**(): `string`

Feature 的显示名称（业务自定义）。

##### Default

```ts
""
```

##### Returns

`string`

#### Set Signature

> **set** **name**(`value`): `void`

Feature 的显示名称（业务自定义）。

##### Default

```ts
""
```

##### Parameters

###### value

`string`

##### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`name`](../interfaces/IFeature.md#name)

***

### options

#### Get Signature

> **get** **options**(): `any`

获取组件配置（EntityComOptions）。

子类通常会读取该对象中的 show / distanceDisplayCondition / height 等配置。

##### Returns

`any`

组件配置

#### Set Signature

> **set** **options**(`value`): `void`

合并更新组件配置（EntityComOptions）。

注意：会保留旧配置并覆盖新字段；并同步 LOD 记忆的 show 状态。

##### Parameters

###### value

`any`

##### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`options`](../interfaces/IFeature.md#options)

***

### requiresEntityModelMatrix

#### Get Signature

> **get** **requiresEntityModelMatrix**(): `boolean`

默认保守：大多数 Feature 需要 Entity 模型矩阵。

##### Returns

`boolean`

当前 Feature 是否需要 Entity 在每帧预先计算模型矩阵。

点、标签、广告牌这类只依赖实体位置的 Feature 可以返回 false，
从而让海量目标场景跳过不必要的姿态/矩阵计算。

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`requiresEntityModelMatrix`](../interfaces/IFeature.md#requiresentitymodelmatrix)

***

### throttleable

#### Get Signature

> **get** **throttleable**(): `boolean`

获取当前 Feature 是否允许被截流。

##### Returns

`boolean`

#### Set Signature

> **set** **throttleable**(`value`): `void`

设置当前 Feature 是否允许被截流。

当值变化时，会尝试通知所属 Entity 重新聚合其 feature-level 调度状态。

##### Parameters

###### value

`boolean`

##### Returns

`void`

***

### type

#### Get Signature

> **get** **type**(): `string`

##### Returns

`string`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`type`](../interfaces/IFeature.md#type)

***

### useLod

#### Get Signature

> **get** **useLod**(): `boolean`

是否启用 LOD（由外部策略驱动决定是否显示）。

##### Returns

`boolean`

#### Set Signature

> **set** **useLod**(`use`): `void`

是否启用 LOD（由外部策略驱动决定是否显示）。

##### Parameters

###### use

`boolean`

##### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`useLod`](../interfaces/IFeature.md#uselod)

***

### viewDistanceConst

#### Get Signature

> **get** **viewDistanceConst**(): [`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

获取视距配置

##### Returns

[`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

***

### visibility

#### Get Signature

> **get** **visibility**(): [`VisibilityStrategy`](../types/VisibilityStrategy.md) \| `undefined`

##### Returns

[`VisibilityStrategy`](../types/VisibilityStrategy.md) \| `undefined`

## Methods

### beforeRegister()

> **beforeRegister**(`entity`): `void`

注册前置逻辑（子类可覆盖）。

默认行为：记录所属 Entity 引用。

#### Parameters

##### entity

[`Entity`](Entity.md)

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

销毁 Feature。

会解除 morph 监听、销毁事件桥接与坐标轴，并清理内部 EventManager。

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`destroy`](../interfaces/IFeature.md#destroy)

***

### disableTracking()

> **disableTracking**(): `void`

关闭“追踪”能力（保留 trackingTarget 配置）。

#### Returns

`void`

***

### enableTracking()

> **enableTracking**(`options`): `void`

启用“追踪”能力。

追踪目标可为 Entity / Cartographic / Cartesian3；子类可在 update 中使用
`_getTrackTargetBPosition` 获取目标位置并做朝向、连线等行为。

#### Parameters

##### options

[`TrackingOptions`](../interfaces/TrackingOptions.md)

配置项

#### Returns

`void`

***

### forceFlush()

> **forceFlush**(): `void`

强制刷新 Feature 的表现。

用于某些需要“重建节点”的 Feature（如底层 底层 Primitive 无法增量更新时）。
默认调用 `reCreate`，具体行为由子类实现。

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`forceFlush`](../interfaces/IFeature.md#forceflush)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

获取所属 Entity 的当前位置（与 Entity.getCurrentPosition 一致）。

#### Returns

`Cartesian3` \| `undefined`

***

### getEngine()

> **getEngine**(): [`Engine`](Engine.md) \| `undefined`

获取所属 Engine（如果已注册到 Entity）。

#### Returns

[`Engine`](Engine.md) \| `undefined`

***

### getMatrix()

> **getMatrix**(): `Matrix4`

获取当前 Feature 的变换矩阵。

若未设置 transformer 的应用矩阵，则返回单位矩阵。

#### Returns

`Matrix4`

变换矩阵

***

### is3d()

> **is3d**(): `boolean`

当前 Engine 是否处于 3D 模式。

#### Returns

`boolean`

***

### morphSwitchHandle()

> **morphSwitchHandle**(`mode`): `void`

场景模式切换时的默认处理。

2D/非 3D 模式下，默认销毁机体坐标轴以避免异常显示。

#### Parameters

##### mode

`SceneMode`

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`morphSwitchHandle`](../interfaces/IFeature.md#morphswitchhandle)

***

### preUpdate()

> **preUpdate**(`entity`, `time`): `void`

#### Parameters

##### entity

`any`

##### time

`JulianDate`

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`preUpdate`](../interfaces/IFeature.md#preupdate)

***

### register()

> **register**(`entity`): [`IFeature`](../interfaces/IFeature.md) \| `Feature`

将 Feature 注册到指定 Entity 上。

会触发 BEFORE_REGISTER/AFTER_REGISTER/REGISTER，并安装交互事件桥接（若已启用）。
同时会补齐默认 distanceDisplayCondition（若用户未配置）。

#### Parameters

##### entity

[`Entity`](Entity.md)

#### Returns

[`IFeature`](../interfaces/IFeature.md) \| `Feature`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`register`](../interfaces/IFeature.md#register)

***

### resetTemporalState()

> **resetTemporalState**(`_time?`): `void`

重置与时间连续性相关的内部状态。

默认实现为空，供需要处理 seek / rewind / 暂停拖拽 的 Feature 覆盖。

#### Parameters

##### \_time?

`JulianDate`

#### Returns

`void`

***

### setBodyAxis()

> **setBodyAxis**(`options`): `void`

配置机体坐标轴（BodyAxis）。

调用后会在 update 周期内按需创建/更新坐标轴（仅 3D 模式可用）。

#### Parameters

##### options

`BodyAxisOptions`

#### Returns

`void`

#### Default

```ts
undefined 配置项
```

***

### setIncludeInBoundingSphere()

> **setIncludeInBoundingSphere**(`value`): `this`

设置当前 Feature 是否参与 Entity 的包围球聚合。

#### Parameters

##### value

`boolean`

是否参与包围球聚合。

#### Returns

`this`

当前 Feature，便于链式调用。

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`setIncludeInBoundingSphere`](../interfaces/IFeature.md#setincludeinboundingsphere)

***

### unregister()

> **unregister**(): `void`

取消注册（等价于 destroy）。

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`unregister`](../interfaces/IFeature.md#unregister)

***

### updateByInteraction()

> **updateByInteraction**(`interaction`, `entity`): `void`

#### Parameters

##### interaction

`InteractionComponent`

##### entity

[`Entity`](Entity.md)

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`updateByInteraction`](../interfaces/IFeature.md#updatebyinteraction)

## Events

### offClick()

> **offClick**(`handler?`): `this`

取消监听 Feature 的点击事件。

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

取消监听 Feature 的双击事件。

#### Parameters

##### handler?

(`e`) => `void`

可选：指定要移除的回调；不传则移除该事件下的全部监听

#### Returns

`this`

this
 dblclick

***

### offMorphSwitch()

> **offMorphSwitch**(`callback`): `void`

取消监听场景模式切换。

#### Parameters

##### callback

(`mode`) => `void`

回调函数
 MORPH_SWITCH

#### Returns

`void`

***

### offMouseEnter()

> **offMouseEnter**(`handler?`): `this`

取消监听 Feature 的鼠标移入事件。

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

取消监听 Feature 的鼠标移出事件。

#### Parameters

##### handler?

(`e`) => `void`

可选：指定要移除的回调；不传则移除该事件下的全部监听

#### Returns

`this`

this
 mouseleave

***

### onAfterRegister()

> **onAfterRegister**(`callback`): `void`

监听注册后回调。

在此阶段会同步 LOD 的 show 初始值。
 AFTER_REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onAfterRegister`](../interfaces/IFeature.md#onafterregister)

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

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onBeforeDestroy`](../interfaces/IFeature.md#onbeforedestroy)

***

### onBeforeRegister()

> **onBeforeRegister**(`callback`): `void`

监听注册前回调。

该回调不带参数；若需要 Entity 参数请使用 onRegister。
 BEFORE_REGISTER

#### Parameters

##### callback

() => `void`

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onBeforeRegister`](../interfaces/IFeature.md#onbeforeregister)

***

### onBeforeUpdate()

> **onBeforeUpdate**(`callback`): `void`

监听更新前回调。

#### Parameters

##### callback

(`spaceObject`, `time`) => `void`

(Entity, time)
 BEFORE_UPDATE

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onBeforeUpdate`](../interfaces/IFeature.md#onbeforeupdate)

***

### onClick()

> **onClick**(`handler`): `this`

监听 Feature 的点击事件。

#### Parameters

##### handler

(`e`) => `void`

事件回调

#### Returns

`this`

this
 click

#### Example

```ts
feature.onClick((e) => {
 console.log("feature clicked", e.comId);
});
```

***

### onDblClick()

> **onDblClick**(`handler`): `this`

监听 Feature 的双击事件。

#### Parameters

##### handler

(`e`) => `void`

事件回调

#### Returns

`this`

this
 dblclick

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

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onDestroy`](../interfaces/IFeature.md#ondestroy)

***

### onMorphSwitch()

> **onMorphSwitch**(`callback`): `void`

监听场景模式切换。

#### Parameters

##### callback

(`mode`) => `void`

回调函数
 MORPH_SWITCH

#### Returns

`void`

***

### onMouseEnter()

> **onMouseEnter**(`handler`): `this`

监听 Feature 的鼠标移入事件。

#### Parameters

##### handler

(`e`) => `void`

事件回调

#### Returns

`this`

this
 mouseenter

***

### onMouseLeave()

> **onMouseLeave**(`handler`): `this`

监听 Feature 的鼠标移出事件。

#### Parameters

##### handler

(`e`) => `void`

事件回调

#### Returns

`this`

this
 mouseleave

***

### onRegister()

> **onRegister**(`callback`): `void`

监听注册完成事件。

#### Parameters

##### callback

(`spaceObject`) => `void`

回调参数为所属 Entity
 REGISTER

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onRegister`](../interfaces/IFeature.md#onregister)

***

### onUpdate()

> **onUpdate**(`callback`): `void`

监听更新回调。

#### Parameters

##### callback

(`spaceObject`, `time`) => `void`

(Entity, time)
 UPDATE

#### Returns

`void`

#### Implementation of

[`IFeature`](../interfaces/IFeature.md).[`onUpdate`](../interfaces/IFeature.md#onupdate)
