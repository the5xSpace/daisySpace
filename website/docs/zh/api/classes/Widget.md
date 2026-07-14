[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Widget

# Class: Widget

Daisy Widget 基类（生命周期对齐旧 Layer）。

## Extended by

- [`MarkerWidget`](MarkerWidget.md)
- [`Layer`](Layer.md)
- [`ControlPanelWidget`](ControlPanelWidget.md)
- [`SimulationTimeDisplayWidget`](SimulationTimeDisplayWidget.md)
- [`FrameRateWidget`](FrameRateWidget.md)
- [`WatermarkWidget`](WatermarkWidget.md)
- [`TaskTimeLineWidget`](TaskTimeLineWidget.md)
- [`TaskGanttWidget`](TaskGanttWidget.md)
- [`TimelineWidget`](TimelineWidget.md)

## Implements

- [`IWidget`](../interfaces/IWidget.md)

## Constructors

### Constructor

> **new Widget**(): `Widget`

#### Returns

`Widget`

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`engine`](../interfaces/IWidget.md#engine)

***

### id?

> `optional` **id?**: `string`

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`id`](../interfaces/IWidget.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

当前 Widget 是否已经释放。
集合管理器用它避开已销毁的单例实例。

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`isDestroyed`](../interfaces/IWidget.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget 标识键（用于单例去重）。

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`key`](../interfaces/IWidget.md#key)

***

### name?

> `optional` **name?**: `string`

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`name`](../interfaces/IWidget.md#name)

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean` = `true`

场景 morph(2D/3D) 时是否需要 destroy -> register 重建。
默认 true；UI 类 widget 通常应设为 false。

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`rebuildOnMorph`](../interfaces/IWidget.md#rebuildonmorph)

***

### singleton?

> `optional` **singleton?**: `boolean`

是否为单例 widget。
- 若为 true，Engine 内同 key 只允许存在一个实例。

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`singleton`](../interfaces/IWidget.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

是否在相机聚合观测时忽略。
UI 控制器类 widget 应设为 true。

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`zoomIgnored`](../interfaces/IWidget.md#zoomignored)

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

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`createIn2d`](../interfaces/IWidget.md#createin2d)

***

### destroy()

> **destroy**(): `void`

销毁 Widget，释放资源并解除事件绑定。
将移除 morph 切换监听并标记实例为已销毁。

#### Returns

`void`

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`destroy`](../interfaces/IWidget.md#destroy)

***

### is3d()

> **is3d**(): `boolean`

判断当前场景是否处于 3D 模式。

#### Returns

`boolean`

若为 3D 模式返回 true，否则返回 false

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

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`morphSwitchHandle`](../interfaces/IWidget.md#morphswitchhandle)

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

***

### refresh()

> **refresh**(): `void`

外部配置变化后的同步刷新入口。

子类可重写此方法刷新 DOM、Canvas 或缓存状态。

#### Returns

`void`

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`refresh`](../interfaces/IWidget.md#refresh)

***

### register()

> **register**(`engine`): `Widget`

注册 Widget 到引擎，完成初始化绑定。
将当前实例挂载到指定 Engine，重置销毁标记，并监听场景 morph 事件。
若当前为 2D 模式，则立即调用 createIn2d 完成 2D 资源创建。

#### Parameters

##### engine

[`Engine`](Engine.md)

目标引擎实例

#### Returns

`Widget`

当前 Widget 实例（支持链式调用）

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`register`](../interfaces/IWidget.md#register)

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

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`update`](../interfaces/IWidget.md#update)
