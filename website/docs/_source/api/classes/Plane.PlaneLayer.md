[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Plane](../modules/Plane.md) / PlaneLayer

# Abstract Class: PlaneLayer\<TOptions\>

Daisy 统一 Widget 生命周期接口。

- register: 绑定到 Engine，并在其中完成资源创建
- createIn2d: 在 2D 模式进入时执行一次创建逻辑
- update: 在每个仿真帧中调用（可选实现）
- refresh: 外部配置变化后同步刷新 UI（可选实现）
- morphSwitchHandle: 响应场景切换
- destroy: 释放资源、解绑监听与 DOM

## Extends

- [`Layer`](Layer.md)

## Extended by

- [`EclipticPlaneLayers`](Plane.EclipticPlaneLayers.md)
- [`EclipticReferencePlaneLayers`](Plane.EclipticReferencePlaneLayers.md)
- [`EquatorialPlaneLayers`](Plane.EquatorialPlaneLayers.md)

## Type Parameters

### TOptions

`TOptions` *extends* [`PlaneLayerOptions`](../interfaces/Plane.PlaneLayerOptions.md) = [`PlaneLayerOptions`](../interfaces/Plane.PlaneLayerOptions.md)

## Constructors

### Constructor

> **new PlaneLayer**\<`TOptions`\>(`options`): `PlaneLayer`\<`TOptions`\>

#### Parameters

##### options

`TOptions`

#### Returns

`PlaneLayer`\<`TOptions`\>

#### Overrides

[`Layer`](Layer.md).[`constructor`](Layer.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

引擎实例。

#### Inherited from

[`Layer`](Layer.md).[`engine`](Layer.md#engine)

***

### gridStyle

> **gridStyle**: [`PlaneGridStyle`](../types/Plane.PlaneGridStyle.md)

***

### id?

> `optional` **id?**: `string`

图层唯一标识符。

#### Inherited from

[`Layer`](Layer.md).[`id`](Layer.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

当前 Widget 是否已经释放。
集合管理器用它避开已销毁的单例实例。

#### Inherited from

[`Layer`](Layer.md).[`isDestroyed`](Layer.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget 标识键（用于单例去重）。

#### Inherited from

[`Layer`](Layer.md).[`key`](Layer.md#key)

***

### name?

> `optional` **name?**: `string`

图层名称。

#### Inherited from

[`Layer`](Layer.md).[`name`](Layer.md#name)

***

### primitive

> **primitive**: `SafePrimitive` \| `undefined`

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean` = `true`

场景 morph(2D/3D) 时是否需要 destroy -> register 重建。
默认 true；UI 类 widget 通常应设为 false。

#### Inherited from

[`Layer`](Layer.md).[`rebuildOnMorph`](Layer.md#rebuildonmorph)

***

### referenceRadius

> **referenceRadius**: `number` = `1.0`

***

### singleton?

> `optional` **singleton?**: `boolean`

是否为单例 widget。
- 若为 true，Engine 内同 key 只允许存在一个实例。

#### Inherited from

[`Layer`](Layer.md).[`singleton`](Layer.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

是否在相机聚合观测时忽略。
UI 控制器类 widget 应设为 true。

#### Inherited from

[`Layer`](Layer.md).[`zoomIgnored`](Layer.md#zoomignored)

## Accessors

### options

#### Get Signature

> **get** **options**(): `TOptions`

##### Returns

`TOptions`

#### Set Signature

> **set** **options**(`options`): `void`

##### Parameters

###### options

`TOptions`

##### Returns

`void`

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

#### Inherited from

[`Layer`](Layer.md).[`createIn2d`](Layer.md#createin2d)

***

### destroy()

> **destroy**(): `void`

销毁图层。

#### Returns

`void`

#### Overrides

[`Layer`](Layer.md).[`destroy`](Layer.md#destroy)

***

### getBoundingSphere()

> **getBoundingSphere**(`time?`): `BoundingSphere` \| `undefined`

#### Parameters

##### time?

`JulianDate`

#### Returns

`BoundingSphere` \| `undefined`

***

### is3d()

> **is3d**(): `boolean`

判断是否是3d模式

#### Returns

`boolean`

#### Inherited from

[`Layer`](Layer.md).[`is3d`](Layer.md#is3d)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`_mode`): `void`

处理场景模式切换事件。

#### Parameters

##### \_mode

`SceneMode`

#### Returns

`void`

#### Overrides

[`Layer`](Layer.md).[`morphSwitchHandle`](Layer.md#morphswitchhandle)

***

### refresh()

> **refresh**(): `void`

外部配置变化后的同步刷新入口。

子类可重写此方法刷新 DOM、Canvas 或缓存状态。

#### Returns

`void`

#### Inherited from

[`Layer`](Layer.md).[`refresh`](Layer.md#refresh)

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

#### Inherited from

[`Layer`](Layer.md).[`offMorphSwitch`](Layer.md#offmorphswitch)

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

#### Inherited from

[`Layer`](Layer.md).[`onMorphSwitch`](Layer.md#onmorphswitch)
