[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ParticleFeature

# Class: ParticleFeature

世界粒子 Feature。

ParticleFeature 基于 ParticleSystem，每个粒子都会拥有独立的位置、速度、
生命周期和 billboard。它适合雨、雪、雾、烟尘、水流、碎片扩散等“离开宿主后
仍属于物理世界”的自然粒子效果。

如果效果强绑定宿主、目标高度聚焦，并且需要稳定连续的主体形态（例如火箭喷焰、
飞机尾焰、姿控喷口），优先使用 CapsuleParticleFeature。胶囊粒子用单个世界锚定
sprite 面片播放预生成帧，并可做像素尺寸约束，避免高速目标出现离散粒子甩尾。

## Extends

- [`Feature`](Feature.md)

## Constructors

### Constructor

> **new ParticleFeature**(`options?`): `ParticleFeature`

#### Parameters

##### options?

[`ParticleFeatureOptions`](../interfaces/ParticleFeatureOptions.md) = `{}`

#### Returns

`ParticleFeature`

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

> `readonly` `static` **type**: `"ParticleFeature"` = `"ParticleFeature"`

#### Overrides

[`Feature`](Feature.md).[`type`](Feature.md#type)

## Accessors

### particleSystem

#### Get Signature

> **get** **particleSystem**(): `ParticleSystem` \| `undefined`

##### Returns

`ParticleSystem` \| `undefined`

***

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

[`Feature`](Feature.md).[`name`](Feature.md#name)

***

### options

#### Get Signature

> **get** **options**(): [`ParticleFeatureOptions`](../interfaces/ParticleFeatureOptions.md)

获取组件配置（EntityComOptions）。

子类通常会读取该对象中的 show / distanceDisplayCondition / height 等配置。

##### Returns

[`ParticleFeatureOptions`](../interfaces/ParticleFeatureOptions.md)

组件配置

#### Set Signature

> **set** **options**(`value`): `void`

获取组件配置（EntityComOptions）。

子类通常会读取该对象中的 show / distanceDisplayCondition / height 等配置。

##### Parameters

###### value

[`ParticleFeatureOptions`](../interfaces/ParticleFeatureOptions.md)

##### Returns

`void`

组件配置

#### Overrides

[`Feature`](Feature.md).[`options`](Feature.md#options)

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

[`Feature`](Feature.md).[`throttleable`](Feature.md#throttleable)

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

[`Feature`](Feature.md).[`useLod`](Feature.md#uselod)

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

### clearParticles()

> **clearParticles**(): `void`

#### Returns

`void`

***

### create()

> **create**(`entity`): `void`

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

### getBoundingSphere()

> **getBoundingSphere**(): `BoundingSphere` \| `undefined`

#### Returns

`BoundingSphere` \| `undefined`

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

> **register**(`entity`): `ParticleFeature`

将 Feature 注册到指定 Entity 上。

会触发 BEFORE_REGISTER/AFTER_REGISTER/REGISTER，并安装交互事件桥接（若已启用）。
同时会补齐默认 distanceDisplayCondition（若用户未配置）。

#### Parameters

##### entity

[`Entity`](Entity.md)

#### Returns

`ParticleFeature`

#### Overrides

[`Feature`](Feature.md).[`register`](Feature.md#register)

***

### resetTemporalState()

> **resetTemporalState**(`time?`): `void`

重置与时间连续性相关的内部状态。

默认实现为空，供需要处理 seek / rewind / 暂停拖拽 的 Feature 覆盖。

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

#### Overrides

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

### setEmitter()

> **setEmitter**(`emitter`): `void`

#### Parameters

##### emitter

[`ParticleEmitterLike`](../interfaces/ParticleEmitterLike.md) \| [`ParticleEmitterConfig`](../types/ParticleEmitterConfig.md)

#### Returns

`void`

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

### preloadImages()

> `static` **preloadImages**(`sources?`): `Promise`\<`void`\>

预加载粒子图片到缓存，避免首帧闪烁。
在 `register()` 之前调用可确保粒子系统创建时图片已就绪。

#### Parameters

##### sources?

[`ImageAssetSource`](../types/ImageAssetSource.md) \| [`ImageAssetSource`](../types/ImageAssetSource.md)[]

#### Returns

`Promise`\<`void`\>

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
