[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CelestialMarkerWidget

# Class: CelestialMarkerWidget

标记 Widget。

在场景中为一组目标点绘制点标记和标签，支持按距离自动显示/隐藏。
适用于标注关键位置（如地面站、卫星等）。

## Extends

- [`MarkerWidget`](MarkerWidget.md)

## Constructors

### Constructor

> **new CelestialMarkerWidget**(`options?`): `CelestialMarkerWidget`

#### Parameters

##### options?

[`CelestialMarkerWidgetOptions`](../interfaces/CelestialMarkerWidgetOptions.md) = `{}`

#### Returns

`CelestialMarkerWidget`

#### Overrides

[`MarkerWidget`](MarkerWidget.md).[`constructor`](MarkerWidget.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`engine`](MarkerWidget.md#engine)

***

### id?

> `optional` **id?**: `string`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`id`](MarkerWidget.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

当前 Widget 是否已经释放。
集合管理器用它避开已销毁的单例实例。

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`isDestroyed`](MarkerWidget.md#isdestroyed)

***

### key

> **key**: `string` = `"daisy.celestial-marker"`

Widget 标识键（用于单例去重）。

#### Overrides

[`MarkerWidget`](MarkerWidget.md).[`key`](MarkerWidget.md#key)

***

### name?

> `optional` **name?**: `string`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`name`](MarkerWidget.md#name)

***

### rebuildOnMorph

> **rebuildOnMorph**: `boolean` = `false`

场景 morph(2D/3D) 时是否需要 destroy -> register 重建。
默认 true；UI 类 widget 通常应设为 false。

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`rebuildOnMorph`](MarkerWidget.md#rebuildonmorph)

***

### singleton

> **singleton**: `boolean` = `true`

是否为单例 widget。
- 若为 true，Engine 内同 key 只允许存在一个实例。

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`singleton`](MarkerWidget.md#singleton)

***

### zoomIgnored

> **zoomIgnored**: `boolean` = `true`

是否在相机聚合观测时忽略。
UI 控制器类 widget 应设为 true。

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`zoomIgnored`](MarkerWidget.md#zoomignored)

## Methods

### createIn2d()

> **createIn2d**(`_`): `void`

在 2D 模式下创建 Widget 资源。
子类应重写此方法以实现 2D 模式特有的初始化逻辑（如添加 Billboard、Label 等）。

#### Parameters

##### \_

[`Engine`](Engine.md)

引擎实例

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`createIn2d`](MarkerWidget.md#createin2d)

***

### destroy()

> **destroy**(): `void`

销毁 Widget，释放资源并解除事件绑定。
将移除 morph 切换监听并标记实例为已销毁。

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`destroy`](MarkerWidget.md#destroy)

***

### is3d()

> **is3d**(): `boolean`

判断当前场景是否处于 3D 模式。

#### Returns

`boolean`

若为 3D 模式返回 true，否则返回 false

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`is3d`](MarkerWidget.md#is3d)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`_`): `void`

场景模式切换处理。
当场景在 2D/3D 之间切换时由引擎回调触发，子类可重写以实现自适应逻辑。

#### Parameters

##### \_

`SceneMode`

切换后的场景模式

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`morphSwitchHandle`](MarkerWidget.md#morphswitchhandle)

***

### offMorphSwitch()

> **offMorphSwitch**(`callback`): `void`

移除场景模式切换监听。

#### Parameters

##### callback

(`mode`) => `void`

需要移除的回调函数

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`offMorphSwitch`](MarkerWidget.md#offmorphswitch)

***

### onMorphSwitch()

> **onMorphSwitch**(`callback`): `void`

注册场景模式切换监听。

#### Parameters

##### callback

(`mode`) => `void`

场景切换时的回调函数

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`onMorphSwitch`](MarkerWidget.md#onmorphswitch)

***

### refresh()

> **refresh**(): `void`

外部配置变化后的同步刷新入口。

子类可重写此方法刷新 DOM、Canvas 或缓存状态。

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`refresh`](MarkerWidget.md#refresh)

***

### register()

> **register**(`engine`): `this`

注册 Widget 到引擎，完成初始化绑定。
将当前实例挂载到指定 Engine，重置销毁标记，并监听场景 morph 事件。
若当前为 2D 模式，则立即调用 createIn2d 完成 2D 资源创建。

#### Parameters

##### engine

[`Engine`](Engine.md)

目标引擎实例

#### Returns

`this`

当前 Widget 实例（支持链式调用）

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`register`](MarkerWidget.md#register)

***

### update()

> **update**(`time`): `void`

每帧更新回调。
子类应重写此方法以实现逐帧驱动逻辑（如位置插值、状态同步等）。

#### Parameters

##### time

`JulianDate`

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`update`](MarkerWidget.md#update)
