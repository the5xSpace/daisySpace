[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ILayer

# Interface: ILayer

Daisy 统一 Widget 生命周期接口。

- register: 绑定到 Engine，并在其中完成资源创建
- createIn2d: 在 2D 模式进入时执行一次创建逻辑
- update: 在每个仿真帧中调用（可选实现）
- refresh: 外部配置变化后同步刷新 UI（可选实现）
- morphSwitchHandle: 响应场景切换
- destroy: 释放资源、解绑监听与 DOM

## Extends

- [`IWidget`](IWidget.md)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](../classes/Engine.md)

引擎实例。

#### Overrides

[`IWidget`](IWidget.md).[`engine`](IWidget.md#engine)

***

### id?

> `optional` **id?**: `string`

图层唯一标识符；来自构造参数 `options.id`，注册前后均可读取。

#### Overrides

[`IWidget`](IWidget.md).[`id`](IWidget.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean`

当前 Widget 是否已经释放。
集合管理器用它避开已销毁的单例实例。

#### Inherited from

[`IWidget`](IWidget.md).[`isDestroyed`](IWidget.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget 标识键（用于单例去重）。

#### Inherited from

[`IWidget`](IWidget.md).[`key`](IWidget.md#key)

***

### name?

> `optional` **name?**: `string`

图层名称。

#### Overrides

[`IWidget`](IWidget.md).[`name`](IWidget.md#name)

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean`

场景 morph(2D/3D) 时是否需要 destroy -> register 重建。
默认 true；UI 类 widget 通常应设为 false。

#### Inherited from

[`IWidget`](IWidget.md).[`rebuildOnMorph`](IWidget.md#rebuildonmorph)

***

### singleton?

> `optional` **singleton?**: `boolean`

是否为单例 widget。
- 若为 true，Engine 内同 key 只允许存在一个实例。

#### Inherited from

[`IWidget`](IWidget.md).[`singleton`](IWidget.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean`

是否在相机聚合观测时忽略。
UI 控制器类 widget 应设为 true。

#### Inherited from

[`IWidget`](IWidget.md).[`zoomIgnored`](IWidget.md#zoomignored)

## Methods

### createIn2d()

> **createIn2d**(`engine`): `void`

在2D空间创建图层。

#### Parameters

##### engine

[`Engine`](../classes/Engine.md)

引擎实例。

#### Returns

`void`

#### Overrides

[`IWidget`](IWidget.md).[`createIn2d`](IWidget.md#createin2d)

***

### destroy()

> **destroy**(): `void`

销毁图层。

#### Returns

`void`

#### Overrides

[`IWidget`](IWidget.md).[`destroy`](IWidget.md#destroy)

***

### getBoundingSphere()?

> `optional` **getBoundingSphere**(`time?`): `BoundingSphere` \| `undefined`

获取 Widget 的包围球（用于相机聚合观测）。

#### Parameters

##### time?

`JulianDate`

仿真时间（可选）

#### Returns

`BoundingSphere` \| `undefined`

包围球实例，若无则返回 undefined

#### Inherited from

[`IWidget`](IWidget.md).[`getBoundingSphere`](IWidget.md#getboundingsphere)

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

#### Overrides

[`IWidget`](IWidget.md).[`morphSwitchHandle`](IWidget.md#morphswitchhandle)

***

### refresh()?

> `optional` **refresh**(): `void`

外部配置变化后同步刷新 Widget。

例如 Engine 级时间格式变化时，UI Widget 可在此重绘标题、刻度和当前时间。

#### Returns

`void`

#### Inherited from

[`IWidget`](IWidget.md).[`refresh`](IWidget.md#refresh)

***

### register()

> **register**(`engine`): [`Layer`](../classes/Layer.md)

注册图层到引擎。

#### Parameters

##### engine

[`Engine`](../classes/Engine.md)

引擎实例。

#### Returns

[`Layer`](../classes/Layer.md)

已注册的图层实例。

#### Overrides

[`IWidget`](IWidget.md).[`register`](IWidget.md#register)

***

### update()

> **update**(`time`): `void`

更新图层数据。

#### Parameters

##### time

`JulianDate`

当前时间（JulianDate 格式）。

#### Returns

`void`

#### Overrides

[`IWidget`](IWidget.md).[`update`](IWidget.md#update)
