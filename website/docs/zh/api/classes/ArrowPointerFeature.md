[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArrowPointerFeature

# Class: ArrowPointerFeature

ArrowPointerFeature：从当前实体指向目标的“箭头线”要素。

- 回调返回值发生变化时，才会触发方向/终点重算
- `targetSun/targetMoon` 使用 `Utils.getSunPositionECEF/getMoonPositionECEF`
- label（如配置）固定放在箭头终点

## Example

```ts
const arrow = new ArrowPointerFeature({
 target: someCesiumEntity,
 lengthPx: 100,
 color: Daisy.Color.ORANGE,
 label: { text: "TARGET" }
});
entity.addFeature(arrow);
```

## Extends

- [`Feature`](Feature.md)

## Constructors

### Constructor

> **new ArrowPointerFeature**(`options`): `ArrowPointerFeature`

创建 ArrowPointerFeature。

#### Parameters

##### options

[`ArrowPointerOptions`](../types/ArrowPointerOptions.md)

ArrowPointerFeature 配置

#### Returns

`ArrowPointerFeature`

#### Example

```ts
const feature = new ArrowPointerFeature({
 target: ArrowPointerFeature.targetSun,
 lengthPx: 120,
 color: "yellow",
 label: { text: "SUN" }
});
```

#### Overrides

[`Feature`](Feature.md).[`constructor`](Feature.md#constructor)

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

#### Inherited from

[`Feature`](Feature.md).[`handle`](Feature.md#handle)

***

### registered

> **registered**: `boolean` = `false`

#### Inherited from

[`Feature`](Feature.md).[`registered`](Feature.md#registered)

***

### transformer

> **transformer**: `Transformer`

#### Inherited from

[`Feature`](Feature.md).[`transformer`](Feature.md#transformer)

***

### type

> `readonly` `static` **type**: `"ArrowPointerFeature"` = `"ArrowPointerFeature"`

#### Overrides

[`Feature`](Feature.md).[`type`](Feature.md#type)

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

#### Inherited from

[`Feature`](Feature.md).[`entity`](Feature.md#entity)

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

#### Inherited from

[`Feature`](Feature.md).[`id`](Feature.md#id)

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

#### Inherited from

[`Feature`](Feature.md).[`includeInBoundingSphere`](Feature.md#includeinboundingsphere)

***

### isDestroyed

#### Get Signature

> **get** **isDestroyed**(): `boolean`

##### Returns

`boolean`

#### Inherited from

[`Feature`](Feature.md).[`isDestroyed`](Feature.md#isdestroyed)

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

#### Inherited from

[`Feature`](Feature.md).[`lodMode`](Feature.md#lodmode)

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

#### Inherited from

[`PopoverFeature`](UI.PopoverFeature.md).[`name`](UI.PopoverFeature.md#name)

***

### options

#### Get Signature

> **get** **options**(): [`ArrowPointerOptions`](../types/ArrowPointerOptions.md)

获取当前配置（合并后的最终配置）。

##### Example

```ts
const px = feature.options.lengthPx;
```

##### Returns

[`ArrowPointerOptions`](../types/ArrowPointerOptions.md)

#### Set Signature

> **set** **options**(`value`): `void`

设置配置（直接覆盖，不做深合并）。

##### Example

```ts
feature.options = { ...feature.options, lengthPx: 160 };
```

##### Parameters

###### value

[`ArrowPointerOptions`](../types/ArrowPointerOptions.md)

新配置

##### Returns

`void`

#### Overrides

[`GeoJsonFeature`](GeoJsonFeature.md).[`options`](GeoJsonFeature.md#options)

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

#### Inherited from

[`Feature`](Feature.md).[`requiresEntityModelMatrix`](Feature.md#requiresentitymodelmatrix)

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

#### Inherited from

[`PopoverFeature`](UI.PopoverFeature.md).[`throttleable`](UI.PopoverFeature.md#throttleable)

***

### type

#### Get Signature

> **get** **type**(): `string`

##### Returns

`string`

#### Inherited from

[`Feature`](Feature.md).[`type`](Feature.md#type-1)

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

#### Inherited from

[`FreeGeometryFeature`](FreeGeometryFeature.md).[`useLod`](FreeGeometryFeature.md#uselod)

***

### viewDistanceConst

#### Get Signature

> **get** **viewDistanceConst**(): [`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

获取视距配置

##### Returns

[`ViewDistanceTemplate`](../types/ViewDistanceTemplate.md)

#### Inherited from

[`Feature`](Feature.md).[`viewDistanceConst`](Feature.md#viewdistanceconst)

***

### visibility

#### Get Signature

> **get** **visibility**(): [`VisibilityStrategy`](../types/VisibilityStrategy.md) \| `undefined`

##### Returns

[`VisibilityStrategy`](../types/VisibilityStrategy.md) \| `undefined`

#### Inherited from

[`Feature`](Feature.md).[`visibility`](Feature.md#visibility)

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

#### Inherited from

[`Feature`](Feature.md).[`beforeRegister`](Feature.md#beforeregister)

***

### destroy()

> **destroy**(): `void`

销毁要素：从 viewer 的集合中移除 polyline 与 label，并释放引用。

#### Returns

`void`

#### Example

```ts
feature.destroy();
```

#### Overrides

[`Feature`](Feature.md).[`destroy`](Feature.md#destroy)

***

### disableTracking()

> **disableTracking**(): `void`

关闭“追踪”能力（保留 trackingTarget 配置）。

#### Returns

`void`

#### Inherited from

[`Feature`](Feature.md).[`disableTracking`](Feature.md#disabletracking)

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

#### Inherited from

[`Feature`](Feature.md).[`enableTracking`](Feature.md#enabletracking)

***

### forceFlush()

> **forceFlush**(): `void`

强制刷新 Feature 的表现。

用于某些需要“重建节点”的 Feature（如底层 底层 Primitive 无法增量更新时）。
默认调用 `reCreate`，具体行为由子类实现。

#### Returns

`void`

#### Inherited from

[`Feature`](Feature.md).[`forceFlush`](Feature.md#forceflush)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

获取所属 Entity 的当前位置（与 Entity.getCurrentPosition 一致）。

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`Feature`](Feature.md).[`getCurrentPosition`](Feature.md#getcurrentposition)

***

### getEngine()

> **getEngine**(): [`Engine`](Engine.md) \| `undefined`

获取所属 Engine（如果已注册到 Entity）。

#### Returns

[`Engine`](Engine.md) \| `undefined`

#### Inherited from

[`Feature`](Feature.md).[`getEngine`](Feature.md#getengine)

***

### getMatrix()

> **getMatrix**(): `Matrix4`

获取当前 Feature 的变换矩阵。

若未设置 transformer 的应用矩阵，则返回单位矩阵。

#### Returns

`Matrix4`

变换矩阵

#### Inherited from

[`Feature`](Feature.md).[`getMatrix`](Feature.md#getmatrix)

***

### is3d()

> **is3d**(): `boolean`

当前 Engine 是否处于 3D 模式。

#### Returns

`boolean`

#### Inherited from

[`Feature`](Feature.md).[`is3d`](Feature.md#is3d)

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

#### Inherited from

`Feature.morphSwitchHandle`

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

#### Inherited from

[`Feature`](Feature.md).[`preUpdate`](Feature.md#preupdate)

***

### register()

> **register**(`entity`): `ArrowPointerFeature`

注册到 Daisy.Entity：创建/挂载底层 polyline 与（可选）label。

注意：即使不主动调用，`update()` 在需要时也会自动触发注册。

#### Parameters

##### entity

[`Entity`](Entity.md)

当前要素所属实体

#### Returns

`ArrowPointerFeature`

this

#### Example

```ts
feature.register(entity);
```

#### Overrides

[`Feature`](Feature.md).[`register`](Feature.md#register)

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

#### Inherited from

[`Feature`](Feature.md).[`resetTemporalState`](Feature.md#resettemporalstate)

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

#### Inherited from

[`Feature`](Feature.md).[`setBodyAxis`](Feature.md#setbodyaxis)

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

#### Inherited from

[`Feature`](Feature.md).[`setIncludeInBoundingSphere`](Feature.md#setincludeinboundingsphere)

***

### unregister()

> **unregister**(): `void`

取消注册（等价于 destroy）。

#### Returns

`void`

#### Inherited from

[`Feature`](Feature.md).[`unregister`](Feature.md#unregister)

***

### update()

> **update**(`entity`, `time`): `void`

每帧更新：解析目标位置、根据像素长度换算世界长度，更新箭头线与 label。

#### Parameters

##### entity

[`Entity`](Entity.md)

当前要素所属实体

##### time

`JulianDate`

当前帧时间（用于解析 Entity 位置/天体位置）

#### Returns

`void`

#### Example

```ts
// 一般由 Engine 的渲染循环自动调用，无需手动调用
feature.update(entity, viewer.cesiumViewer.clock.currentTime);
```

#### Overrides

`Feature.update`

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

#### Inherited from

[`Feature`](Feature.md).[`updateByInteraction`](Feature.md#updatebyinteraction)

***

### targetEarthCenter()

> `static` **targetEarthCenter**(`_entity`, `_time`): `Cartesian3`

#### Parameters

##### \_entity

[`Entity`](Entity.md)

##### \_time

`JulianDate`

#### Returns

`Cartesian3`

***

### targetMars()

> `static` **targetMars**(`_entity`, `time`): `Cartesian3`

#### Parameters

##### \_entity

[`Entity`](Entity.md)

##### time

`JulianDate`

#### Returns

`Cartesian3`

***

### targetMoon()

> `static` **targetMoon**(`_entity`, `time`): `Cartesian3`

#### Parameters

##### \_entity

[`Entity`](Entity.md)

##### time

`JulianDate`

#### Returns

`Cartesian3`

***

### targetSun()

> `static` **targetSun**(`_entity`, `time`): `Cartesian3`

#### Parameters

##### \_entity

[`Entity`](Entity.md)

##### time

`JulianDate`

#### Returns

`Cartesian3`

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

#### Inherited from

[`Feature`](Feature.md).[`offClick`](Feature.md#offclick)

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

#### Inherited from

[`Feature`](Feature.md).[`offDblClick`](Feature.md#offdblclick)

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

#### Inherited from

[`Feature`](Feature.md).[`offMorphSwitch`](Feature.md#offmorphswitch)

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

#### Inherited from

[`Feature`](Feature.md).[`offMouseEnter`](Feature.md#offmouseenter)

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

#### Inherited from

[`Feature`](Feature.md).[`offMouseLeave`](Feature.md#offmouseleave)

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

#### Inherited from

[`Feature`](Feature.md).[`onAfterRegister`](Feature.md#onafterregister)

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

#### Inherited from

[`Feature`](Feature.md).[`onBeforeDestroy`](Feature.md#onbeforedestroy)

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

#### Inherited from

[`Feature`](Feature.md).[`onBeforeRegister`](Feature.md#onbeforeregister)

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

#### Inherited from

[`Feature`](Feature.md).[`onBeforeUpdate`](Feature.md#onbeforeupdate)

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

#### Inherited from

[`Feature`](Feature.md).[`onClick`](Feature.md#onclick)

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

#### Inherited from

[`Feature`](Feature.md).[`onDblClick`](Feature.md#ondblclick)

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

#### Inherited from

[`Feature`](Feature.md).[`onDestroy`](Feature.md#ondestroy)

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

#### Inherited from

[`Feature`](Feature.md).[`onMorphSwitch`](Feature.md#onmorphswitch)

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

#### Inherited from

[`Feature`](Feature.md).[`onMouseEnter`](Feature.md#onmouseenter)

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

#### Inherited from

[`Feature`](Feature.md).[`onMouseLeave`](Feature.md#onmouseleave)

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

#### Inherited from

[`Feature`](Feature.md).[`onRegister`](Feature.md#onregister)

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

#### Inherited from

[`Feature`](Feature.md).[`onUpdate`](Feature.md#onupdate)
