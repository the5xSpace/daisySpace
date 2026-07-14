[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EllipticalConeFeature

# Class: EllipticalConeFeature

椭圆锥/椭圆台要素（EllipticalConeFeature）。

## Extends

- `BaseSolidFeature`

## Constructors

### Constructor

> **new EllipticalConeFeature**(`options?`): `EllipticalConeFeature`

#### Parameters

##### options?

[`EllipticalConeOptions`](../interfaces/EllipticalConeOptions.md) = `{}`

#### Returns

`EllipticalConeFeature`

#### Overrides

`BaseSolidFeature.constructor`

## Properties

### autoHeight

> **autoHeight**: `number` = `0`

最近一次计算出的“自动长度”（单位：米）。

语义：
- 当 emitDirection=TO_GROUND：表示“对地延展长度”（从发射端到地面）
- 当 trackingTarget 存在：表示“宿主到目标”的距离

注意：autoHeight 是计算结果，不等同于 options.height（options.height 是基准长度）。

#### Inherited from

`BaseSolidFeature.autoHeight`

***

### ellipticCone

> **ellipticCone**: [`EllipticConeGeometry`](EllipticConeGeometry.md) \| `undefined`

***

### eventManager

> `readonly` **eventManager**: `EventManager`

#### Inherited from

`BaseSolidFeature.eventManager`

***

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

`BaseSolidFeature.handle`

***

### registered

> **registered**: `boolean` = `false`

#### Inherited from

`BaseSolidFeature.registered`

***

### transformer

> **transformer**: `Transformer`

#### Inherited from

`BaseSolidFeature.transformer`

***

### type

> `readonly` `static` **type**: `"EllipticalConeFeature"` = `'EllipticalConeFeature'`

#### Overrides

`BaseSolidFeature.type`

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

`BaseSolidFeature.entity`

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

`BaseSolidFeature.id`

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

`BaseSolidFeature.includeInBoundingSphere`

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

`BaseSolidFeature.lodMode`

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

`BaseSolidFeature.name`

***

### options

#### Get Signature

> **get** **options**(): [`EllipticalConeOptions`](../interfaces/EllipticalConeOptions.md)

获取组件配置（EntityComOptions）。

子类通常会读取该对象中的 show / distanceDisplayCondition / height 等配置。

##### Returns

[`EllipticalConeOptions`](../interfaces/EllipticalConeOptions.md)

组件配置

#### Set Signature

> **set** **options**(`value`): `void`

获取组件配置（EntityComOptions）。

子类通常会读取该对象中的 show / distanceDisplayCondition / height 等配置。

##### Parameters

###### value

[`EllipticalConeOptions`](../interfaces/EllipticalConeOptions.md)

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

#### Inherited from

`BaseSolidFeature.requiresEntityModelMatrix`

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

`BaseSolidFeature.throttleable`

***

### type

#### Get Signature

> **get** **type**(): `string`

##### Returns

`string`

#### Inherited from

`BaseSolidFeature.type`

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

`BaseSolidFeature.viewDistanceConst`

***

### visibility

#### Get Signature

> **get** **visibility**(): [`VisibilityStrategy`](../types/VisibilityStrategy.md) \| `undefined`

##### Returns

[`VisibilityStrategy`](../types/VisibilityStrategy.md) \| `undefined`

#### Inherited from

`BaseSolidFeature.visibility`

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

`BaseSolidFeature.beforeRegister`

***

### calcAutoHeight()

> **calcAutoHeight**(`time?`): `void`

计算自动长度并写入 Z 方向缩放。

前置条件：
- Entity 当前 position 可用

结果：
- 更新 autoHeight
- 若 options.height 合法，则应用 ratio = autoHeight / options.height 到 Z 缩放

分支：
- trackingTarget 存在：
 - 长度直接取“发射点到目标”的距离
- emitDirection=TO_GROUND：
 - 通过 make2dFootprintPositions 采样得到对地点集合
 - 用 _stableDistanceFromPositions 得到稳定长度
- trackingTarget 不存在且非 TO_GROUND：
 - 直接回退到 beamLength / 默认长度

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

#### Inherited from

`BaseSolidFeature.calcAutoHeight`

***

### computeRayPositionFromEmitPoint()

> **computeRayPositionFromEmitPoint**(`appliedMatrix`, `time?`): `Cartesian3`

#### Parameters

##### appliedMatrix

`Matrix4`

##### time?

`JulianDate`

#### Returns

`Cartesian3`

#### Inherited from

`BaseSolidFeature.computeRayPositionFromEmitPoint`

***

### create2dPrimitive()

> **create2dPrimitive**(`entity`, `matrix`): `void`

创建 2D footprint 表现（仅 TO_GROUND）。

说明：
- 2D 下只保留“投影区域”语义，因此使用 make2dFootprintPositions 生成边界点
- 会根据当前中心天体（ellipsoid）做坐标适配（局部坐标/中心偏移）
- 若开启 outline，会额外创建一条闭合边界线

#### Parameters

##### entity

[`Entity`](Entity.md)

##### matrix

`Matrix4`

#### Returns

`void`

#### Overrides

`BaseSolidFeature.create2dPrimitive`

***

### createPrimitive()

> **createPrimitive**(): [`EllipticConeGeometry`](EllipticConeGeometry.md)

#### Returns

[`EllipticConeGeometry`](EllipticConeGeometry.md)

***

### createPrimitiveInstance()

> **createPrimitiveInstance**(`entity`): `void`

创建 3D 体积表现（以及可选的轮廓）。

关键点：
- pivot：根据 emitDirection 选择旋转/缩放的基准点
- autoLength：若启用，会在创建前先计算一次 Z 缩放，确保创建时长度更贴近运行态
- geometry：由子类 makeSolidGeometry 提供；若无返回则跳过创建
- translation：通过 transformer.calcOriginTranslateZ 将“基准长度”换算为合适的局部平移

#### Parameters

##### entity

[`Entity`](Entity.md)

#### Returns

`void`

#### Overrides

`BaseSolidFeature.createPrimitiveInstance`

***

### destroy()

> **destroy**(): `void`

销毁：释放渲染对象资源。

#### Returns

`void`

#### Inherited from

`BaseSolidFeature.destroy`

***

### disableTracking()

> **disableTracking**(): `void`

关闭“追踪”能力（保留 trackingTarget 配置）。

#### Returns

`void`

#### Inherited from

`BaseSolidFeature.disableTracking`

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

`BaseSolidFeature.enableTracking`

***

### forceFlush()

> **forceFlush**(): `void`

强制刷新 Feature 的表现。

用于某些需要“重建节点”的 Feature（如底层 底层 Primitive 无法增量更新时）。
默认调用 `reCreate`，具体行为由子类实现。

#### Returns

`void`

#### Inherited from

`BaseSolidFeature.forceFlush`

***

### getBoundingSphere()

> **getBoundingSphere**(`time?`): `BoundingSphere` \| `undefined`

#### Parameters

##### time?

`JulianDate`

#### Returns

`BoundingSphere` \| `undefined`

#### Inherited from

`BaseSolidFeature.getBoundingSphere`

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

获取所属 Entity 的当前位置（与 Entity.getCurrentPosition 一致）。

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

`BaseSolidFeature.getCurrentPosition`

***

### getEngine()

> **getEngine**(): [`Engine`](Engine.md) \| `undefined`

获取所属 Engine（如果已注册到 Entity）。

#### Returns

[`Engine`](Engine.md) \| `undefined`

#### Inherited from

`BaseSolidFeature.getEngine`

***

### getMatrix()

> **getMatrix**(): `Matrix4`

获取当前 Feature 的变换矩阵。

若未设置 transformer 的应用矩阵，则返回单位矩阵。

#### Returns

`Matrix4`

变换矩阵

#### Inherited from

`BaseSolidFeature.getMatrix`

***

### is3d()

> **is3d**(): `boolean`

当前 Engine 是否处于 3D 模式。

#### Returns

`boolean`

#### Inherited from

`BaseSolidFeature.is3d`

***

### make2dFootprintPositions()

> **make2dFootprintPositions**(`matrix`, `currentPosition`, `ellipsoid?`, `slices?`): `Cartesian3`[]

#### Parameters

##### matrix

`Matrix4`

##### currentPosition

`Cartesian3`

##### ellipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

##### slices?

`number`

#### Returns

`Cartesian3`[]

#### Overrides

`BaseSolidFeature.make2dFootprintPositions`

***

### make2dFootprintSamples()

> **make2dFootprintSamples**(`matrix`, `currentPosition`, `ellipsoid?`, `slices?`): `FootprintSample`[]

#### Parameters

##### matrix

`Matrix4`

##### currentPosition

`Cartesian3`

##### ellipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

##### slices?

`number`

#### Returns

`FootprintSample`[]

#### Overrides

`BaseSolidFeature.make2dFootprintSamples`

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

`BaseSolidFeature.morphSwitchHandle`

***

### onCalcAutoHeight()

> **onCalcAutoHeight**(`callback`): `void`

#### Parameters

##### callback

(`height`) => `void`

#### Returns

`void`

#### Inherited from

`BaseSolidFeature.onCalcAutoHeight`

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

`BaseSolidFeature.preUpdate`

***

### reCreate()

> **reCreate**(`entity`): `void`

重建：用于参数发生“无法增量更新”的变化时，强制重建渲染对象。

- 3D：重建体积表现
- 2D：重建 footprint 表现

#### Parameters

##### entity

[`Entity`](Entity.md)

#### Returns

`void`

#### Overrides

`BaseSolidFeature.reCreate`

***

### register()

> **register**(`entity`): `EllipticalConeFeature`

注册到实体，并在满足条件时创建 3D 体积表现。

这里做的事情偏“初始化一次”的逻辑：
- 只在 3D + height 存在时尝试创建体积表现
- 预先计算一次“是否在距离显示范围内”，避免一注册就创建大量不可见对象
- 根据 emitDirection 设置 pivot（旋转/缩放的中心基准）

注意：
- 2D footprint 的创建是按需发生在 update 周期里（只在 TO_GROUND 且 2D 时创建）

#### Parameters

##### entity

[`Entity`](Entity.md)

#### Returns

`EllipticalConeFeature`

#### Overrides

`BaseSolidFeature.register`

***

### resetAutoLength()

> **resetAutoLength**(): `this`

#### Returns

`this`

#### Inherited from

`BaseSolidFeature.resetAutoLength`

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

#### Inherited from

`BaseSolidFeature.resetTemporalState`

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

`BaseSolidFeature.setBodyAxis`

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

`BaseSolidFeature.setIncludeInBoundingSphere`

***

### setXYScale()

> **setXYScale**(`scale`, `y?`): `this`

设置横向（X/Y）缩放。

典型使用：
- 对“体积投影”的横向尺寸做整体缩放（例如传感器开角变化导致底面尺寸变化时）
- 不影响 autoLength 对 Z 方向的缩放策略

入参支持：
- 单个数值：X/Y 等比缩放
- 两个数值：X、Y 分别缩放
- {x,y} 或二维向量：显式指定

#### Parameters

##### scale

`number` \| `Cartesian2` \| \{ `x`: `number`; `y`: `number`; \}

##### y?

`number`

#### Returns

`this`

#### Inherited from

`BaseSolidFeature.setXYScale`

***

### unregister()

> **unregister**(): `void`

取消注册（等价于 destroy）。

#### Returns

`void`

#### Inherited from

`BaseSolidFeature.unregister`

***

### update()

> **update**(`entity`, `time`): `void`

每帧更新：负责可见性判定、形态切换、矩阵同步与 autoLength/追踪对齐等逻辑。

核心流程：
1) 模式一致性：根据 Engine 当前 2D/3D 状态，若已有渲染对象形态不匹配则销毁
2) 最终可见性 inRange：
 - show（Feature 配置）与 Entity show（随时间变化）
 - distanceDisplayCondition（任意相机命中距离范围）
3) 可见性变化：仅当 inRange 与上一帧不同才同步到渲染对象，并触发一次刷新
4) 若不可见：提前 return，避免后续矩阵/几何计算
5) 自动对齐：当 trackingTarget 存在时，自动把本地“发射轴”对齐到目标方向
6) 3D：
 - 未创建则按需创建体积表现
 - 已创建则每帧同步 modelMatrix，并调用钩子 onAfterApplied
 - autoLength 时每帧更新高度缩放
7) 2D：
 - 仅 TO_GROUND 需要 footprint；按需创建/更新 footprint

#### Parameters

##### entity

[`Entity`](Entity.md)

##### time

`JulianDate`

#### Returns

`void`

#### Overrides

`BaseSolidFeature.update`

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

`BaseSolidFeature.updateByInteraction`

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

`BaseSolidFeature.offClick`

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

`BaseSolidFeature.offDblClick`

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

`BaseSolidFeature.offMorphSwitch`

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

`BaseSolidFeature.offMouseEnter`

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

`BaseSolidFeature.offMouseLeave`

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

`BaseSolidFeature.onAfterRegister`

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

`BaseSolidFeature.onBeforeDestroy`

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

`BaseSolidFeature.onBeforeRegister`

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

`BaseSolidFeature.onBeforeUpdate`

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

`BaseSolidFeature.onClick`

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

`BaseSolidFeature.onDblClick`

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

`BaseSolidFeature.onDestroy`

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

`BaseSolidFeature.onMorphSwitch`

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

`BaseSolidFeature.onMouseEnter`

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

`BaseSolidFeature.onMouseLeave`

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

`BaseSolidFeature.onRegister`

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

`BaseSolidFeature.onUpdate`
