[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ControlPanelWidget

# Class: ControlPanelWidget

控制面板 Widget。

封装 FloatingControlPanel 和键盘控制组件为 Widget 生命周期，
支持 lite/standard/customize 三种模式。

## Extends

- [`Widget`](Widget.md)

## Constructors

### Constructor

> **new ControlPanelWidget**(`options?`): `ControlPanelWidget`

#### Parameters

##### options?

`object` & [`FloatingPanelOptions`](../types/FloatingPanelOptions.md) = `{}`

#### Returns

`ControlPanelWidget`

#### Overrides

[`Widget`](Widget.md).[`constructor`](Widget.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

#### Inherited from

[`Widget`](Widget.md).[`engine`](Widget.md#engine)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

当前 Widget 是否已经释放。
集合管理器用它避开已销毁的单例实例。

#### Inherited from

[`Widget`](Widget.md).[`isDestroyed`](Widget.md#isdestroyed)

***

### key

> **key**: `string` = `"daisy.control-panel"`

Widget 标识键（用于单例去重）。

#### Overrides

[`Widget`](Widget.md).[`key`](Widget.md#key)

***

### rebuildOnMorph

> **rebuildOnMorph**: `boolean` = `false`

场景 morph(2D/3D) 时是否需要 destroy -> register 重建。
默认 true；UI 类 widget 通常应设为 false。

#### Overrides

[`Widget`](Widget.md).[`rebuildOnMorph`](Widget.md#rebuildonmorph)

***

### singleton

> **singleton**: `boolean` = `true`

是否为单例 widget。
- 若为 true，Engine 内同 key 只允许存在一个实例。

#### Overrides

[`Widget`](Widget.md).[`singleton`](Widget.md#singleton)

***

### zoomIgnored

> **zoomIgnored**: `boolean` = `true`

是否在相机聚合观测时忽略。
UI 控制器类 widget 应设为 true。

#### Overrides

[`Widget`](Widget.md).[`zoomIgnored`](Widget.md#zoomignored)

## Accessors

### id

#### Get Signature

> **get** **id**(): `string` \| `undefined`

Widget 唯一标识。

##### Returns

`string` \| `undefined`

#### Set Signature

> **set** **id**(`value`): `void`

Widget 唯一标识。

构造参数中的 `id` 会由 Widget 基类保存，注册到 Engine 前后均可读取。

##### Parameters

###### value

`string` \| `undefined`

##### Returns

`void`

Widget 唯一标识。

构造参数中的 `id` 会由 Widget 基类保存，注册到 Engine 前后均可读取。

#### Inherited from

[`Widget`](Widget.md).[`id`](Widget.md#id)

***

### name

#### Get Signature

> **get** **name**(): `string` \| `undefined`

Widget 显示名称。

##### Returns

`string` \| `undefined`

#### Set Signature

> **set** **name**(`value`): `void`

Widget 显示名称。

##### Parameters

###### value

`string` \| `undefined`

##### Returns

`void`

Widget 显示名称。

#### Inherited from

[`Widget`](Widget.md).[`name`](Widget.md#name)

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

[`Widget`](Widget.md).[`createIn2d`](Widget.md#createin2d)

***

### destroy()

> **destroy**(): `void`

销毁 Widget，释放资源并解除事件绑定。
将移除 morph 切换监听并标记实例为已销毁。

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`destroy`](Widget.md#destroy)

***

### is3d()

> **is3d**(): `boolean`

判断当前场景是否处于 3D 模式。

#### Returns

`boolean`

若为 3D 模式返回 true，否则返回 false

#### Inherited from

[`Widget`](Widget.md).[`is3d`](Widget.md#is3d)

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

[`Widget`](Widget.md).[`morphSwitchHandle`](Widget.md#morphswitchhandle)

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

[`Widget`](Widget.md).[`offMorphSwitch`](Widget.md#offmorphswitch)

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

[`Widget`](Widget.md).[`onMorphSwitch`](Widget.md#onmorphswitch)

***

### refresh()

> **refresh**(): `void`

外部配置变化后的同步刷新入口。

子类可重写此方法刷新 DOM、Canvas 或缓存状态。

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`refresh`](Widget.md#refresh)

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

#### Overrides

[`Widget`](Widget.md).[`register`](Widget.md#register)

***

### update()

> **update**(`_`): `void`

每帧更新回调。
子类应重写此方法以实现逐帧驱动逻辑（如位置插值、状态同步等）。

#### Parameters

##### \_

`JulianDate`

当前仿真时间（JulianDate）

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`update`](Widget.md#update)
