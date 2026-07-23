[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / Mars

# Class: Mars

火星对象（含椭球、网格、体轴与可选大气）

## Example

```ts
const mars = new Mars({
 name: "Mars",
 ellipsoid: { show: true, terminator: true },
 atmosphere: { show: true, intensity: 0 },
 bodyAxis: true,
});
mars.bindEngine(engine);
engine.switchToCelestial(mars);
```

## Extends

- [`CelestialBody`](PW.CelestialBody.md)

## Constructors

### Constructor

> **new Mars**(`options?`): `Mars`

#### Parameters

##### options?

[`MarsConfig`](../types/PW.MarsConfig.md) = `{}`

#### Returns

`Mars`

#### Overrides

`CelestialBody.constructor`

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`_celestialEllipsoid`](PW.CelestialBody.md#_celestialellipsoid)

***

### \_entity

> **\_entity**: [`Entity`](Entity.md)

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_entity`](PW.CelestialBody.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`isDestroyed`](PW.CelestialBody.md#isdestroyed)

## Accessors

### bodyEllipsoid

#### Get Signature

> **get** **bodyEllipsoid**(): [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

暴露给外部：获取天体 Ellipsoid（`bindEngine` 之后才可用）。

##### Returns

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`bodyEllipsoid`](PW.CelestialBody.md#bodyellipsoid)

***

### celestialBodyOptions

#### Get Signature

> **get** **celestialBodyOptions**(): [`CelestialBodyConfig`](../types/PW.CelestialBodyConfig.md)

获取子类配置快照（用于基类内部访问子类配置）。

##### Returns

[`CelestialBodyConfig`](../types/PW.CelestialBodyConfig.md)

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`celestialBodyOptions`](PW.CelestialBody.md#celestialbodyoptions)

***

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

获取宿主 Entity（用于挂载 Feature、交互事件、更新等）。

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`entity`](PW.CelestialBody.md#entity)

***

### id

#### Get Signature

> **get** **id**(): `string`

##### Returns

`string`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`id`](PW.CelestialBody.md#id)

***

### options

#### Get Signature

> **get** **options**(): [`MarsConfig`](../types/PW.MarsConfig.md)

对象创建/配置参数的原始快照（不同子类会扩展其结构）。

注意：这是“语义配置”的来源，而不是渲染结果。渲染落地由 _applyConfig + Feature/Component 完成。

##### Returns

[`MarsConfig`](../types/PW.MarsConfig.md)

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`options`](PW.CelestialBody.md#options)

***

### position

#### Get Signature

> **get** **position**(): [`ObjectPositon`](../types/PW.ObjectPositon.md)

##### Returns

[`ObjectPositon`](../types/PW.ObjectPositon.md)

#### Set Signature

> **set** **position**(`value`): `void`

设置对象位置（支持静态坐标或采样轨迹）。

- 赋值后会同步写入宿主 entity.position
- 对 CelestialEntity（非地球天体）不允许使用支持惯性系的 TrajectorySample

##### Example

```ts
vehicle.position = Daisy.Cartesian3.fromDegrees(121.5, 31.2, 30);
```

##### Parameters

###### value

[`ObjectPositon`](../types/PW.ObjectPositon.md)

##### Returns

`void`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`position`](PW.CelestialBody.md#position)

## Methods

### \_createCelestialEllipsoid()

> **\_createCelestialEllipsoid**(`engine`): [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

构造并返回此天体的 CelestialEllipsoid（含位置/朝向/重力等参数）

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_createCelestialEllipsoid`](PW.CelestialBody.md#_createcelestialellipsoid)

***

### \_createEllipsoidMaterial()

> **\_createEllipsoidMaterial**(`config`): `Material`

构建椭球体的自定义材质（含 shader + uniforms）

#### Parameters

##### config

###### shadows

`ShadowMode`

###### show

`boolean`

###### terminator

`boolean`

#### Returns

`Material`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_createEllipsoidMaterial`](PW.CelestialBody.md#_createellipsoidmaterial)

***

### \_getBodyLabelPrefix()

> **\_getBodyLabelPrefix**(): `string`

获取体轴标签前缀（如 "月固系"）

#### Returns

`string`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getBodyLabelPrefix`](PW.CelestialBody.md#_getbodylabelprefix)

***

### \_getDefaultGridId()

> **\_getDefaultGridId**(): `string`

获取经纬网格默认 ID

#### Returns

`string`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getDefaultGridId`](PW.CelestialBody.md#_getdefaultgridid)

***

### \_getDefaultName()

> **\_getDefaultName**(): `string`

获取天体名称

#### Returns

`string`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getDefaultName`](PW.CelestialBody.md#_getdefaultname)

***

### \_getEllipsoid()

> **\_getEllipsoid**(): `Ellipsoid`

获取天体椭球常量

#### Returns

`Ellipsoid`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getEllipsoid`](PW.CelestialBody.md#_getellipsoid)

***

### \_getLockCameraAltitudeMultiplier()

> **\_getLockCameraAltitudeMultiplier**(): `number`

获取 lockCamera 的相机高度倍数（相对 maxRadius）

#### Returns

`number`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getLockCameraAltitudeMultiplier`](PW.CelestialBody.md#_getlockcameraaltitudemultiplier)

***

### \_getSurfaceGravity()

> **\_getSurfaceGravity**(): `number`

获取表面重力 (m/s²)

#### Returns

`number`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_getSurfaceGravity`](PW.CelestialBody.md#_getsurfacegravity)

***

### \_isBoundCelestial()

> **\_isBoundCelestial**(`target`): `boolean`

判断给定目标是否为当前天体（用于 lockCamera 的 currentCelestial 检查）。

#### Parameters

##### target

`any`

#### Returns

`boolean`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`_isBoundCelestial`](PW.CelestialBody.md#_isboundcelestial)

***

### \_tryInitCameraForLock()

> **\_tryInitCameraForLock**(`engine`, `time`): `boolean`

火星 lockCamera 相机初始化：简化版（无 reposition 参数，Gram-Schmidt up）。

#### Parameters

##### engine

[`Engine`](Engine.md)

##### time

`JulianDate`

#### Returns

`boolean`

#### Overrides

[`CelestialBody`](PW.CelestialBody.md).[`_tryInitCameraForLock`](PW.CelestialBody.md#_tryinitcameraforlock)

***

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

[`CelestialBody`](PW.CelestialBody.md).[`addComponent`](PW.CelestialBody.md#addcomponent)

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`addLink`](PW.CelestialBody.md#addlink)

***

### bindEngine()

> **bindEngine**(`engine`): `void`

基类 bindEngine：统一公共流程。
调用顺序：
1. `_createCelestialEllipsoid` → 设置天体椭球
2. `super.bindEngine` → 注册实体
3. `_setupGrid` → 经纬网格
4. `_setupSunDirectionObserver` → 光照方向
5. `_bindEngineExtras` → 子类扩展
6. `_setupLockCamera` → 相机锁定

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`void`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`bindEngine`](PW.CelestialBody.md#bindengine)

***

### ~~bindViewer()~~

> **bindViewer**(`viewer`): `void`

兼容旧名：绑定到 Engine。

#### Parameters

##### viewer

[`Engine`](Engine.md)

#### Returns

`void`

#### Deprecated

请使用 bindEngine

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`bindViewer`](PW.CelestialBody.md#bindviewer)

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

[`CelestialBody`](PW.CelestialBody.md).[`destroy`](PW.CelestialBody.md#destroy)

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

[`CelestialBody`](PW.CelestialBody.md).[`getComponentById`](PW.CelestialBody.md#getcomponentbyid)

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

[`CelestialBody`](PW.CelestialBody.md).[`getComponentByName`](PW.CelestialBody.md#getcomponentbyname)

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

[`CelestialBody`](PW.CelestialBody.md).[`getComponents`](PW.CelestialBody.md#getcomponents)

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

获取当前仿真时刻的局部姿态。

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`getCurrentOrientation`](PW.CelestialBody.md#getcurrentorientation)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

获取当前仿真时刻的世界位置。

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`getCurrentPosition`](PW.CelestialBody.md#getcurrentposition)

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

[`CelestialBody`](PW.CelestialBody.md).[`getOrientationAtTime`](PW.CelestialBody.md#getorientationattime)

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

[`CelestialBody`](PW.CelestialBody.md).[`getPosition`](PW.CelestialBody.md#getposition)

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

[`CelestialBody`](PW.CelestialBody.md).[`getPositionAtTime`](PW.CelestialBody.md#getpositionattime)

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

[`CelestialBody`](PW.CelestialBody.md).[`getTransformAtTime`](PW.CelestialBody.md#gettransformattime)

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

[`CelestialBody`](PW.CelestialBody.md).[`getTransformMatrixAtTime`](PW.CelestialBody.md#gettransformmatrixattime)

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

[`CelestialBody`](PW.CelestialBody.md).[`register`](PW.CelestialBody.md#register)

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

[`CelestialBody`](PW.CelestialBody.md).[`removeComponentById`](PW.CelestialBody.md#removecomponentbyid)

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

[`CelestialBody`](PW.CelestialBody.md).[`removeComponentByName`](PW.CelestialBody.md#removecomponentbyname)

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

[`CelestialBody`](PW.CelestialBody.md).[`resetTemporalState`](PW.CelestialBody.md#resettemporalstate)

***

### resumeCameraLock()

> **resumeCameraLock**(): `void`

恢复相机跟踪控制器（flyTo 动画结束后调用）。

#### Returns

`void`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`resumeCameraLock`](PW.CelestialBody.md#resumecameralock)

***

### setCameraLockInitialized()

> **setCameraLockInitialized**(`value`): `void`

兼容旧名

#### Parameters

##### value

`boolean`

#### Returns

`void`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`setCameraLockInitialized`](PW.CelestialBody.md#setcameralockinitialized)

***

### setCameraLockIntialized()

> **setCameraLockIntialized**(`value`): `void`

手动标记相机锁定已初始化（跳过重定位，仅修正 up 方向）。

#### Parameters

##### value

`boolean`

#### Returns

`void`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`setCameraLockIntialized`](PW.CelestialBody.md#setcameralockintialized)

***

### setGridSuppressShow()

> **setGridSuppressShow**(`value`): `void`

临时隐藏/显示经纬网格（如相机过渡期间），不影响 grid 配置。

#### Parameters

##### value

`boolean`

#### Returns

`void`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`setGridSuppressShow`](PW.CelestialBody.md#setgridsuppressshow)

***

### setSuppressLock()

> **setSuppressLock**(`value`): `void`

设置 lockCamera 的 suppress 状态（如 flyTo 动画期间暂停锁定）。

#### Parameters

##### value

`boolean`

#### Returns

`void`

#### Inherited from

[`CelestialBody`](PW.CelestialBody.md).[`setSuppressLock`](PW.CelestialBody.md#setsuppresslock)

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

[`CelestialBody`](PW.CelestialBody.md).[`unregister`](PW.CelestialBody.md#unregister)

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

[`CelestialBody`](PW.CelestialBody.md).[`update`](PW.CelestialBody.md#update)

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

[`CelestialBody`](PW.CelestialBody.md).[`offClick`](PW.CelestialBody.md#offclick)

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

[`CelestialBody`](PW.CelestialBody.md).[`offDblClick`](PW.CelestialBody.md#offdblclick)

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

[`CelestialBody`](PW.CelestialBody.md).[`offMouseEnter`](PW.CelestialBody.md#offmouseenter)

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

[`CelestialBody`](PW.CelestialBody.md).[`offMouseLeave`](PW.CelestialBody.md#offmouseleave)

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

[`CelestialBody`](PW.CelestialBody.md).[`onBeforeDestroy`](PW.CelestialBody.md#onbeforedestroy)

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

[`CelestialBody`](PW.CelestialBody.md).[`onBeforeRegister`](PW.CelestialBody.md#onbeforeregister)

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

[`CelestialBody`](PW.CelestialBody.md).[`onBeforeUnregister`](PW.CelestialBody.md#onbeforeunregister)

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

[`CelestialBody`](PW.CelestialBody.md).[`onBeforeUpdate`](PW.CelestialBody.md#onbeforeupdate)

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

[`CelestialBody`](PW.CelestialBody.md).[`onClick`](PW.CelestialBody.md#onclick)

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

[`CelestialBody`](PW.CelestialBody.md).[`onDblClick`](PW.CelestialBody.md#ondblclick)

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

[`CelestialBody`](PW.CelestialBody.md).[`onDestroy`](PW.CelestialBody.md#ondestroy)

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

[`CelestialBody`](PW.CelestialBody.md).[`onMouseEnter`](PW.CelestialBody.md#onmouseenter)

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

[`CelestialBody`](PW.CelestialBody.md).[`onMouseLeave`](PW.CelestialBody.md#onmouseleave)

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

[`CelestialBody`](PW.CelestialBody.md).[`onRegister`](PW.CelestialBody.md#onregister)

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

[`CelestialBody`](PW.CelestialBody.md).[`onUnregister`](PW.CelestialBody.md#onunregister)

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

[`CelestialBody`](PW.CelestialBody.md).[`onUpdate`](PW.CelestialBody.md#onupdate)
