[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ModelFeature

# Class: ModelFeature

glTF/GLB 模型组件（不对外暴露 ）。

提供：
- 节点列表读取与节点变换（显示/隐藏、偏移、旋转、缩放、矩阵覆盖）
- 模型内置动画播放/停止（基于 activeAnimations）

节点变换以“状态副作用”的形式存在，并在每帧 update 自动应用到模型各节点。

## Examples

```ts
const entity = viewer.createEntity("sat-1");
entity.position = Daisy.Cartesian3.fromDegrees(116.3, 40.05, 500_000);
viewer.camera.flyToTarget(entity, {
 duration: 0.6,
 offset: new Daisy.HeadingPitchRange(
 Daisy.Math.toRadians(20),
 Daisy.Math.toRadians(-45),
 2_500_000
 ),
});

const model = entity.addFeature(new Daisy.ModelFeature({
 url: "/models/ChandraXrayObservatory.glb",
 minimumPixelSize: 64,
 show: true,
}));

model.onload(() => {
 const names = model.getNodeNames();
 if (names.includes("antenna")) {
 model.transformNode("antenna").setShow(false);
 }

 model.transformNode("body")
 .setTranslation(new Daisy.Cartesian3(0, 0, 0.2))
 .setRotationAxisAngleDeg(Daisy.Cartesian3.UNIT_Z, 15)
 .setScale(1.05);
});
```

```ts
const model = entity.addFeature(new Daisy.ModelFeature({ url: "/static/assets/robot.glb" }));
model.onload(() => {
 const anims = model.getAnimationInfos();
 const first = anims[0];
 if (first) {
 model.playAnimation({ index: first.index, loop: Daisy.ModelAnimationLoop.REPEAT, multiplier: 1.0 });
 }
});
```

## Extends

- [`Feature`](Feature.md)

## Constructors

### Constructor

> **new ModelFeature**(`options`): `ModelFeature`

#### Parameters

##### options

[`ModelOptions`](../interfaces/ModelOptions.md)

#### Returns

`ModelFeature`

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

### MODEL\_ANIMATION\_ADDED

> **MODEL\_ANIMATION\_ADDED**: `string` = `"MODEL_ANIMATION_ADDED"`

***

### MODEL\_ANIMATION\_REMOVED

> **MODEL\_ANIMATION\_REMOVED**: `string` = `"MODEL_ANIMATION_REMOVED"`

***

### MODEL\_ANIMATION\_STARTED

> **MODEL\_ANIMATION\_STARTED**: `string` = `"MODEL_ANIMATION_STARTED"`

***

### MODEL\_ANIMATION\_STOPPED

> **MODEL\_ANIMATION\_STOPPED**: `string` = `"MODEL_ANIMATION_STOPPED"`

***

### MODEL\_ANIMATION\_UPDATED

> **MODEL\_ANIMATION\_UPDATED**: `string` = `"MODEL_ANIMATION_UPDATED"`

***

### MODEL\_ON\_LOADED

> **MODEL\_ON\_LOADED**: `string` = `"MODEL_ON_LOADED"`

***

### registered

> **registered**: `boolean` = `false`

#### Inherited from

[`Feature`](Feature.md).[`registered`](Feature.md#registered)

***

### transformer

> **transformer**: `Transformer`

#### Overrides

[`Feature`](Feature.md).[`transformer`](Feature.md#transformer)

***

### type

> `static` **type**: `string` = `"ModelFeature"`

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

### nodes

#### Get Signature

> **get** **nodes**(): `object`

##### Returns

`object`

#### Set Signature

> **set** **nodes**(`nodes`): `void`

##### Parameters

###### nodes

##### Returns

`void`

***

### options

#### Get Signature

> **get** **options**(): [`ModelOptions`](../interfaces/ModelOptions.md)

获取组件配置（EntityComOptions）。

子类通常会读取该对象中的 show / distanceDisplayCondition / height 等配置。

##### Returns

[`ModelOptions`](../interfaces/ModelOptions.md)

组件配置

#### Set Signature

> **set** **options**(`value`): `void`

获取组件配置（EntityComOptions）。

子类通常会读取该对象中的 show / distanceDisplayCondition / height 等配置。

##### Parameters

###### value

[`ModelOptions`](../interfaces/ModelOptions.md)

##### Returns

`void`

组件配置

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

### clearNodeTransform()

> **clearNodeTransform**(`name`): `void`

#### Parameters

##### name

`string`

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

### disableExplosion()

> **disableExplosion**(): `this`

关闭模型爆炸图，并把没有用户节点变换的节点交还给 glTF 原始 transform/动画。

#### Returns

`this`

***

### disableTracking()

> **disableTracking**(): `void`

关闭“追踪”能力（保留 trackingTarget 配置）。

#### Returns

`void`

#### Inherited from

[`Feature`](Feature.md).[`disableTracking`](Feature.md#disabletracking)

***

### enableExplosion()

> **enableExplosion**(`options?`): `this`

启用模型爆炸图。

爆炸方向来自节点中心相对模型本地坐标中心的方向；`factor` 表示外移比例：
- `0.5`：每个节点再向外移动自身中心距离的 50%
- `1`：每个节点再向外移动自身中心距离的 100%

#### Parameters

##### options?

`number` \| [`ModelExplosionOptions`](../types/ModelExplosionOptions.md)

#### Returns

`this`

#### Example

```ts
model.enableExplosion({ factor: 0.8 });
```

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

### getActiveAnimations()

> **getActiveAnimations**(): [`ActiveModelAnimationInfo`](../types/ActiveModelAnimationInfo.md)[]

#### Returns

[`ActiveModelAnimationInfo`](../types/ActiveModelAnimationInfo.md)[]

***

### getAnimationInfos()

> **getAnimationInfos**(): [`ModelAnimationInfo`](../types/ModelAnimationInfo.md)[]

#### Returns

[`ModelAnimationInfo`](../types/ModelAnimationInfo.md)[]

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

### getExplosionState()

> **getExplosionState**(): [`ModelExplosionState`](../types/ModelExplosionState.md)

获取当前爆炸图状态。

#### Returns

[`ModelExplosionState`](../types/ModelExplosionState.md)

***

### getGltfNodeInfos()

> **getGltfNodeInfos**(): [`ModelNodeInfo`](../types/ModelNodeInfo.md)[]

#### Returns

[`ModelNodeInfo`](../types/ModelNodeInfo.md)[]

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

### getNode()

> **getNode**(`name`): `ModelNode` \| `undefined`

返回 glTF 文件中指定 name 的节点。用于修改节点的变换，以用于自定义动画。

#### Parameters

##### name

`string`

#### Returns

`ModelNode` \| `undefined`

***

### getNodeInfos()

> **getNodeInfos**(): [`ModelNodeInfo`](../types/ModelNodeInfo.md)[]

#### Returns

[`ModelNodeInfo`](../types/ModelNodeInfo.md)[]

***

### getNodeNames()

> **getNodeNames**(): `string`[]

#### Returns

`string`[]

***

### getVisualPixelDiameter()

> **getVisualPixelDiameter**(): `number` \| `undefined`

返回模型当前屏幕视觉直径，单位：px。

这里复刻 Model 的 minimumPixelSize 参考系：
- 的 `boundingSphere` 不包含 minimumPixelSize；
- 的 `computedScale` 才是 scale / minimumPixelSize / maximumScale 后的最终缩放；
- 附着喷焰等宿主视觉效果需要使用同一像素参考，避免远处模型被放大而喷焰仍按固定像素下限显示。

#### Returns

`number` \| `undefined`

***

### getVisualScaleFactor()

> **getVisualScaleFactor**(): `number`

返回模型当前视觉缩放倍率。

这个值用于 SDK 内部把“绑定在模型上的附属视觉效果”同步到模型的
minimumPixelSize 缩放结果，例如火箭喷焰、姿控喷口等胶囊粒子效果。

注意：这里不向外暴露底层渲染模型对象，只返回 Daisy 可消费的比例因子：
- 1 表示模型当前按配置 scale 渲染；
- 大于 1 表示模型被 minimumPixelSize 视觉放大；
- 读取不到内部运行态时保守返回 1。

#### Returns

`number`

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

#### Overrides

`Feature.morphSwitchHandle`

***

### onAnimationAdded()

> **onAnimationAdded**(`callback`): `void`

#### Parameters

##### callback

(`payload`) => `void`

#### Returns

`void`

***

### onAnimationRemoved()

> **onAnimationRemoved**(`callback`): `void`

#### Parameters

##### callback

(`payload`) => `void`

#### Returns

`void`

***

### onAnimationStarted()

> **onAnimationStarted**(`callback`): `void`

#### Parameters

##### callback

(`payload`) => `void`

#### Returns

`void`

***

### onAnimationStopped()

> **onAnimationStopped**(`callback`): `void`

#### Parameters

##### callback

(`payload`) => `void`

#### Returns

`void`

***

### onAnimationUpdated()

> **onAnimationUpdated**(`callback`): `void`

#### Parameters

##### callback

(`payload`) => `void`

#### Returns

`void`

***

### onload()

> **onload**(`callback`): `void`

模型加载完后的回调
必须在执行 addComponent前添加事件

#### Parameters

##### callback

(`model`) => `void`

#### Returns

`void`

***

### playAllAnimations()

> **playAllAnimations**(`options?`): `string`[]

#### Parameters

##### options?

`Omit`\<[`ModelAnimationPlayOptions`](../types/ModelAnimationPlayOptions.md), `"name"` \| `"index"`\>

#### Returns

`string`[]

***

### playAnimation()

> **playAnimation**(`options`): `string` \| `undefined`

#### Parameters

##### options

[`ModelAnimationPlayOptions`](../types/ModelAnimationPlayOptions.md)

#### Returns

`string` \| `undefined`

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

> **register**(`entity`): `ModelFeature`

将 Feature 注册到指定 Entity 上。

会触发 BEFORE_REGISTER/AFTER_REGISTER/REGISTER，并安装交互事件桥接（若已启用）。
同时会补齐默认 distanceDisplayCondition（若用户未配置）。

#### Parameters

##### entity

[`Entity`](Entity.md)

#### Returns

`ModelFeature`

#### Overrides

[`Feature`](Feature.md).[`register`](Feature.md#register)

***

### reset()

> **reset**(): `void`

#### Returns

`void`

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

### setAnimateWhilePaused()

> **setAnimateWhilePaused**(`animateWhilePaused`): `void`

#### Parameters

##### animateWhilePaused

`boolean`

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

#### Inherited from

[`Feature`](Feature.md).[`setBodyAxis`](Feature.md#setbodyaxis)

***

### setExploded()

> **setExploded**(`enabled`, `options?`): `this`

设置爆炸图开关。

#### Parameters

##### enabled

`boolean`

##### options?

`number` \| [`ModelExplosionOptions`](../types/ModelExplosionOptions.md)

#### Returns

`this`

***

### setExplosionFactor()

> **setExplosionFactor**(`factor`): `this`

设置爆炸强度。`factor <= 0` 会关闭爆炸图。

#### Parameters

##### factor

`number`

#### Returns

`this`

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

### stopAllAnimations()

> **stopAllAnimations**(): `void`

#### Returns

`void`

***

### stopAnimation()

> **stopAnimation**(`id`): `boolean`

#### Parameters

##### id

`string`

#### Returns

`boolean`

***

### transformNode()

> **transformNode**(`name`): [`ModelNodeTransform`](ModelNodeTransform.md)

#### Parameters

##### name

`string`

#### Returns

[`ModelNodeTransform`](ModelNodeTransform.md)

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
