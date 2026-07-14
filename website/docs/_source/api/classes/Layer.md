[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Layer

# Class: Layer

Daisy 统一 Widget 生命周期接口。

- register: 绑定到 Engine，并在其中完成资源创建
- createIn2d: 在 2D 模式进入时执行一次创建逻辑
- update: 在每个仿真帧中调用（可选实现）
- refresh: 外部配置变化后同步刷新 UI（可选实现）
- morphSwitchHandle: 响应场景切换
- destroy: 释放资源、解绑监听与 DOM

## Extends

- [`Widget`](Widget.md)

## Extended by

- [`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md)
- [`CelestialSphereGridLayers`](CelestialSphereGridLayers.md)
- [`SunConeLayer`](SunConeLayer.md)
- [`NightTileLayer`](NightTileLayer.md)
- [`PlaneLayer`](Plane.PlaneLayer.md)

## Implements

- [`ILayer`](../interfaces/ILayer.md)

## Constructors

### Constructor

> **new Layer**(`options`): `Layer`

构造函数。

#### Parameters

##### options

`any`

图层选项。

#### Returns

`Layer`

#### Overrides

[`Widget`](Widget.md).[`constructor`](Widget.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

引擎实例。

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`engine`](../interfaces/ILayer.md#engine)

#### Inherited from

[`Widget`](Widget.md).[`engine`](Widget.md#engine)

***

### id?

> `optional` **id?**: `string`

图层唯一标识符。

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`id`](../interfaces/ILayer.md#id)

#### Overrides

[`Widget`](Widget.md).[`id`](Widget.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

当前 Widget 是否已经释放。
集合管理器用它避开已销毁的单例实例。

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`isDestroyed`](../interfaces/ILayer.md#isdestroyed)

#### Inherited from

[`Widget`](Widget.md).[`isDestroyed`](Widget.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget 标识键（用于单例去重）。

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`key`](../interfaces/ILayer.md#key)

#### Inherited from

[`Widget`](Widget.md).[`key`](Widget.md#key)

***

### name?

> `optional` **name?**: `string`

图层名称。

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`name`](../interfaces/ILayer.md#name)

#### Overrides

[`Widget`](Widget.md).[`name`](Widget.md#name)

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean` = `true`

场景 morph(2D/3D) 时是否需要 destroy -> register 重建。
默认 true；UI 类 widget 通常应设为 false。

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`rebuildOnMorph`](../interfaces/ILayer.md#rebuildonmorph)

#### Inherited from

[`Widget`](Widget.md).[`rebuildOnMorph`](Widget.md#rebuildonmorph)

***

### singleton?

> `optional` **singleton?**: `boolean`

是否为单例 widget。
- 若为 true，Engine 内同 key 只允许存在一个实例。

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`singleton`](../interfaces/ILayer.md#singleton)

#### Inherited from

[`Widget`](Widget.md).[`singleton`](Widget.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

是否在相机聚合观测时忽略。
UI 控制器类 widget 应设为 true。

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`zoomIgnored`](../interfaces/ILayer.md#zoomignored)

#### Inherited from

[`Widget`](Widget.md).[`zoomIgnored`](Widget.md#zoomignored)

## Methods

### createIn2d()

> **createIn2d**(`engine`): `void`

在2D空间创建图层。

#### Parameters

##### engine

[`Engine`](Engine.md)

引擎实例。

#### Returns

`void`

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`createIn2d`](../interfaces/ILayer.md#createin2d)

#### Overrides

[`Widget`](Widget.md).[`createIn2d`](Widget.md#createin2d)

***

### destroy()

> **destroy**(): `void`

销毁图层。

#### Returns

`void`

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`destroy`](../interfaces/ILayer.md#destroy)

#### Overrides

[`Widget`](Widget.md).[`destroy`](Widget.md#destroy)

***

### is3d()

> **is3d**(): `boolean`

判断是否是3d模式

#### Returns

`boolean`

#### Overrides

[`Widget`](Widget.md).[`is3d`](Widget.md#is3d)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`mode`): `void`

处理场景模式切换事件。

#### Parameters

##### mode

`SceneMode`

当前场景模式。

#### Returns

`void`

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`morphSwitchHandle`](../interfaces/ILayer.md#morphswitchhandle)

#### Overrides

[`Widget`](Widget.md).[`morphSwitchHandle`](Widget.md#morphswitchhandle)

***

### refresh()

> **refresh**(): `void`

外部配置变化后的同步刷新入口。

子类可重写此方法刷新 DOM、Canvas 或缓存状态。

#### Returns

`void`

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`refresh`](../interfaces/ILayer.md#refresh)

#### Inherited from

[`Widget`](Widget.md).[`refresh`](Widget.md#refresh)

## Events

### offMorphSwitch()

> **offMorphSwitch**(`callback`): `void`

移除投影切换事件监听

#### Parameters

##### callback

(`mode`) => `void`

MORPH_SWITCH

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`offMorphSwitch`](Widget.md#offmorphswitch)

***

### onMorphSwitch()

> **onMorphSwitch**(`callback`): `void`

监听投影切换事件

#### Parameters

##### callback

(`mode`) => `void`

MORPH_SWITCH

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`onMorphSwitch`](Widget.md#onmorphswitch)
