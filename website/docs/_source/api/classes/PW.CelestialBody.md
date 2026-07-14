[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / CelestialBody

# Abstract Class: CelestialBody

天体行星对象基类（抽象）。

从 Moon / Mars 提取公共实现，子类只需实现各自的抽象方法：
- Ellipsoid 材质与着色器
- CelestialEllipsoid 构造参数
- lockCamera 相机初始化逻辑
- 子类专属特性（如大气、晨昏线淡入淡出）

## Example

```ts
class MyBody extends CelestialBody {
 _getEllipsoid() { return ELLIPSOID.MY_BODY; }
 // ... implement other abstract methods
}
```

## Extends

- [`BaseObject`](PW.BaseObject.md)

## Extended by

- [`Moon`](PW.Moon.md)
- [`Mars`](PW.Mars.md)

## Properties

### \_celestialEllipsoid

> **\_celestialEllipsoid**: [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`_celestialEllipsoid`](PW.BaseObject.md#_celestialellipsoid)

***

### \_entity

> `abstract` **\_entity**: [`Entity`](Entity.md)

#### Overrides

[`BaseObject`](PW.BaseObject.md).[`_entity`](PW.BaseObject.md#_entity)

***

### isDestroyed

> **isDestroyed**: `boolean` = `false`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`isDestroyed`](PW.BaseObject.md#isdestroyed)

## Accessors

### bodyEllipsoid

#### Get Signature

> **get** **bodyEllipsoid**(): [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

暴露给外部：获取天体 Ellipsoid（`bindEngine` 之后才可用）。

##### Returns

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

***

### celestialBodyOptions

#### Get Signature

> **get** **celestialBodyOptions**(): [`CelestialBodyConfig`](../types/PW.CelestialBodyConfig.md)

获取子类配置快照（用于基类内部访问子类配置）。

##### Returns

[`CelestialBodyConfig`](../types/PW.CelestialBodyConfig.md)

***

### entity

#### Get Signature

> **get** **entity**(): [`Entity`](Entity.md) \| `CelestialEntity`

获取宿主 Entity（用于挂载 Feature、交互事件、更新等）。

##### Returns

[`Entity`](Entity.md) \| `CelestialEntity`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`entity`](PW.BaseObject.md#entity)

***

### options

#### Get Signature

> **get** **options**(): `any`

对象创建/配置参数的原始快照（不同子类会扩展其结构）。

注意：这是“语义配置”的来源，而不是渲染结果。渲染落地由 _applyConfig + Feature/Component 完成。

##### Returns

`any`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`options`](PW.BaseObject.md#options)

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

[`BaseObject`](PW.BaseObject.md).[`position`](PW.BaseObject.md#position)

## Methods

### \_createCelestialEllipsoid()

> `abstract` **\_createCelestialEllipsoid**(`engine`): [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

构造并返回此天体的 CelestialEllipsoid（含位置/朝向/重力等参数）

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

***

### \_createEllipsoidMaterial()

> `abstract` **\_createEllipsoidMaterial**(`config`): `Material`

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

***

### \_getBodyLabelPrefix()

> `abstract` **\_getBodyLabelPrefix**(): `string`

获取体轴标签前缀（如 "月固系"）

#### Returns

`string`

***

### \_getDefaultGridId()

> `abstract` **\_getDefaultGridId**(): `string`

获取经纬网格默认 ID

#### Returns

`string`

***

### \_getDefaultName()

> `abstract` **\_getDefaultName**(): `string`

获取天体名称

#### Returns

`string`

***

### \_getEllipsoid()

> `abstract` **\_getEllipsoid**(): `Ellipsoid`

获取天体椭球常量

#### Returns

`Ellipsoid`

***

### \_getLockCameraAltitudeMultiplier()

> `abstract` **\_getLockCameraAltitudeMultiplier**(): `number`

获取 lockCamera 的相机高度倍数（相对 maxRadius）

#### Returns

`number`

***

### \_getSurfaceGravity()

> `abstract` **\_getSurfaceGravity**(): `number`

获取表面重力 (m/s²)

#### Returns

`number`

***

### \_isBoundCelestial()

> **\_isBoundCelestial**(`target`): `boolean`

判断给定目标是否为当前天体（用于 lockCamera 的 currentCelestial 检查）。

#### Parameters

##### target

`any`

#### Returns

`boolean`

***

### \_tryInitCameraForLock()

> `abstract` **\_tryInitCameraForLock**(`engine`, `time`): `boolean`

lockCamera 相机初始化逻辑（定位+朝向+旋转），不同天体差异较大

#### Parameters

##### engine

[`Engine`](Engine.md)

##### time

`JulianDate`

#### Returns

`boolean`

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

[`BaseObject`](PW.BaseObject.md).[`addComponent`](PW.BaseObject.md#addcomponent)

***

### addLink()

> **addLink**(`options`): [`Link`](PW.Link.md)

#### Parameters

##### options

[`LinkOptions`](../types/PW.LinkOptions.md)

#### Returns

[`Link`](PW.Link.md)

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`addLink`](PW.BaseObject.md#addlink)

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

#### Overrides

[`BaseObject`](PW.BaseObject.md).[`bindEngine`](PW.BaseObject.md#bindengine)

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

#### Overrides

[`BaseObject`](PW.BaseObject.md).[`destroy`](PW.BaseObject.md#destroy)

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

[`BaseObject`](PW.BaseObject.md).[`getComponentById`](PW.BaseObject.md#getcomponentbyid)

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

[`BaseObject`](PW.BaseObject.md).[`getComponentByName`](PW.BaseObject.md#getcomponentbyname)

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

[`BaseObject`](PW.BaseObject.md).[`getComponents`](PW.BaseObject.md#getcomponents)

***

### getCurrentOrientation()

> **getCurrentOrientation**(): [`Rotation`](../types/Rotation.md)

获取当前仿真时刻的局部姿态。

#### Returns

[`Rotation`](../types/Rotation.md)

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getCurrentOrientation`](PW.BaseObject.md#getcurrentorientation)

***

### getCurrentPosition()

> **getCurrentPosition**(): `Cartesian3` \| `undefined`

获取当前仿真时刻的世界位置。

#### Returns

`Cartesian3` \| `undefined`

#### Inherited from

[`BaseObject`](PW.BaseObject.md).[`getCurrentPosition`](PW.BaseObject.md#getcurrentposition)

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

[`BaseObject`](PW.BaseObject.md).[`getOrientationAtTime`](PW.BaseObject.md#getorientationattime)

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

[`BaseObject`](PW.BaseObject.md).[`getPosition`](PW.BaseObject.md#getposition)

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

[`BaseObject`](PW.BaseObject.md).[`getPositionAtTime`](PW.BaseObject.md#getpositionattime)

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

[`BaseObject`](PW.BaseObject.md).[`getTransformAtTime`](PW.BaseObject.md#gettransformattime)

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

[`BaseObject`](PW.BaseObject.md).[`getTransformMatrixAtTime`](PW.BaseObject.md#gettransformmatrixattime)

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

[`BaseObject`](PW.BaseObject.md).[`register`](PW.BaseObject.md#register)

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

[`BaseObject`](PW.BaseObject.md).[`removeComponentById`](PW.BaseObject.md#removecomponentbyid)

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

[`BaseObject`](PW.BaseObject.md).[`removeComponentByName`](PW.BaseObject.md#removecomponentbyname)

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

[`BaseObject`](PW.BaseObject.md).[`resetTemporalState`](PW.BaseObject.md#resettemporalstate)

***

### resumeCameraLock()

> **resumeCameraLock**(): `void`

恢复相机跟踪控制器（flyTo 动画结束后调用）。

#### Returns

`void`

***

### setCameraLockInitialized()

> **setCameraLockInitialized**(`value`): `void`

兼容旧名

#### Parameters

##### value

`boolean`

#### Returns

`void`

***

### setCameraLockIntialized()

> **setCameraLockIntialized**(`value`): `void`

手动标记相机锁定已初始化（跳过重定位，仅修正 up 方向）。

#### Parameters

##### value

`boolean`

#### Returns

`void`

***

### setGridSuppressShow()

> **setGridSuppressShow**(`value`): `void`

临时隐藏/显示经纬网格（如相机过渡期间），不影响 grid 配置。

#### Parameters

##### value

`boolean`

#### Returns

`void`

***

### setSuppressLock()

> **setSuppressLock**(`value`): `void`

设置 lockCamera 的 suppress 状态（如 flyTo 动画期间暂停锁定）。

#### Parameters

##### value

`boolean`

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

[`BaseObject`](PW.BaseObject.md).[`unregister`](PW.BaseObject.md#unregister)

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

[`BaseObject`](PW.BaseObject.md).[`update`](PW.BaseObject.md#update)

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

[`BaseObject`](PW.BaseObject.md).[`offClick`](PW.BaseObject.md#offclick)

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

[`BaseObject`](PW.BaseObject.md).[`offDblClick`](PW.BaseObject.md#offdblclick)

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

[`BaseObject`](PW.BaseObject.md).[`offMouseEnter`](PW.BaseObject.md#offmouseenter)

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

[`BaseObject`](PW.BaseObject.md).[`offMouseLeave`](PW.BaseObject.md#offmouseleave)

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

[`BaseObject`](PW.BaseObject.md).[`onBeforeDestroy`](PW.BaseObject.md#onbeforedestroy)

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

[`BaseObject`](PW.BaseObject.md).[`onBeforeRegister`](PW.BaseObject.md#onbeforeregister)

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

[`BaseObject`](PW.BaseObject.md).[`onBeforeUnregister`](PW.BaseObject.md#onbeforeunregister)

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

[`BaseObject`](PW.BaseObject.md).[`onBeforeUpdate`](PW.BaseObject.md#onbeforeupdate)

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

[`BaseObject`](PW.BaseObject.md).[`onClick`](PW.BaseObject.md#onclick)

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

[`BaseObject`](PW.BaseObject.md).[`onDblClick`](PW.BaseObject.md#ondblclick)

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

[`BaseObject`](PW.BaseObject.md).[`onDestroy`](PW.BaseObject.md#ondestroy)

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

[`BaseObject`](PW.BaseObject.md).[`onMouseEnter`](PW.BaseObject.md#onmouseenter)

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

[`BaseObject`](PW.BaseObject.md).[`onMouseLeave`](PW.BaseObject.md#onmouseleave)

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

[`BaseObject`](PW.BaseObject.md).[`onRegister`](PW.BaseObject.md#onregister)

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

[`BaseObject`](PW.BaseObject.md).[`onUnregister`](PW.BaseObject.md#onunregister)

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

[`BaseObject`](PW.BaseObject.md).[`onUpdate`](PW.BaseObject.md#onupdate)
