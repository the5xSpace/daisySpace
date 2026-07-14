[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / IWidget

# Interface: IWidget

Daisy 统一 Widget 生命周期接口。

- register: 绑定到 Engine，并在其中完成资源创建
- createIn2d: 在 2D 模式进入时执行一次创建逻辑
- update: 在每个仿真帧中调用（可选实现）
- refresh: 外部配置变化后同步刷新 UI（可选实现）
- morphSwitchHandle: 响应场景切换
- destroy: 释放资源、解绑监听与 DOM

## Extended by

- [`ILayer`](ILayer.md)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](../classes/Engine.md)

***

### id?

> `optional` **id?**: `string`

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean`

当前 Widget 是否已经释放。
集合管理器用它避开已销毁的单例实例。

***

### key?

> `optional` **key?**: `string`

Widget 标识键（用于单例去重）。

***

### name?

> `optional` **name?**: `string`

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean`

场景 morph(2D/3D) 时是否需要 destroy -> register 重建。
默认 true；UI 类 widget 通常应设为 false。

***

### singleton?

> `optional` **singleton?**: `boolean`

是否为单例 widget。
- 若为 true，Engine 内同 key 只允许存在一个实例。

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean`

是否在相机聚合观测时忽略。
UI 控制器类 widget 应设为 true。

## Methods

### createIn2d()

> **createIn2d**(`engine`): `void`

在 2D 模式下创建 Widget 资源。

#### Parameters

##### engine

[`Engine`](../classes/Engine.md)

引擎实例

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

销毁 Widget，释放资源并解除事件绑定。

#### Returns

`void`

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

***

### morphSwitchHandle()

> **morphSwitchHandle**(`mode`): `void`

场景模式切换处理回调。

#### Parameters

##### mode

`SceneMode`

切换后的场景模式

#### Returns

`void`

***

### refresh()?

> `optional` **refresh**(): `void`

外部配置变化后同步刷新 Widget。

例如 Engine 级时间格式变化时，UI Widget 可在此重绘标题、刻度和当前时间。

#### Returns

`void`

***

### register()

> **register**(`engine`): `IWidget`

注册 Widget 到引擎，完成初始化绑定与资源创建。

#### Parameters

##### engine

[`Engine`](../classes/Engine.md)

目标引擎实例

#### Returns

`IWidget`

当前 Widget 实例

***

### update()

> **update**(`time`): `void`

每帧更新回调。

#### Parameters

##### time

`JulianDate`

当前仿真时间（JulianDate）

#### Returns

`void`
