[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CelestialSphereGridLayers

# Class: CelestialSphereGridLayers

Daisy 统一 Widget 生命周期接口。

- register: 绑定到 Engine，并在其中完成资源创建
- createIn2d: 在 2D 模式进入时执行一次创建逻辑
- update: 在每个仿真帧中调用（可选实现）
- refresh: 外部配置变化后同步刷新 UI（可选实现）
- morphSwitchHandle: 响应场景切换
- destroy: 释放资源、解绑监听与 DOM

## Extends

- [`Layer`](Layer.md)

## Constructors

### Constructor

> **new CelestialSphereGridLayers**(`options`): `CelestialSphereGridLayers`

#### Parameters

##### options

[`CelestialSphereGridOptions`](../interfaces/CelestialSphereGridOptions.md)

#### Returns

`CelestialSphereGridLayers`

#### Overrides

[`Layer`](Layer.md).[`constructor`](Layer.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

引擎实例。

#### Inherited from

[`Layer`](Layer.md).[`engine`](Layer.md#engine)

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

### primitive

> **primitive**: `SafePrimitive` \| `null` = `null`

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean` = `true`

场景 morph(2D/3D) 时是否需要 destroy -> register 重建。
默认 true；UI 类 widget 通常应设为 false。

#### Inherited from

[`Layer`](Layer.md).[`rebuildOnMorph`](Layer.md#rebuildonmorph)

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

图层唯一标识符；来自构造参数 `options.id`，注册前后均可读取。

#### Inherited from

[`TimelineWidget`](TimelineWidget.md).[`id`](TimelineWidget.md#id)

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

图层名称。

#### Inherited from

[`TimelineWidget`](TimelineWidget.md).[`name`](TimelineWidget.md#name)

***

### options

#### Get Signature

> **get** **options**(): [`CelestialSphereGridOptions`](../interfaces/CelestialSphereGridOptions.md)

##### Returns

[`CelestialSphereGridOptions`](../interfaces/CelestialSphereGridOptions.md)

#### Set Signature

> **set** **options**(`options`): `void`

##### Parameters

###### options

[`CelestialSphereGridOptions`](../interfaces/CelestialSphereGridOptions.md)

##### Returns

`void`

## Methods

### calcGrid()

> **calcGrid**(`raStep?`, `decStep?`, `baseRadius?`): `object`

#### Parameters

##### raStep?

`number`

##### decStep?

`number`

##### baseRadius?

`number` = `...`

#### Returns

`object`

##### decs

> **decs**: `number`[]

##### lines

> **lines**: `Cartesian3`[][]

##### ras

> **ras**: `number`[]

***

### convertRaDecToCartesian()

> **convertRaDecToCartesian**(`raHours`, `decDegrees`, `radius`): `Cartesian3`

#### Parameters

##### raHours

`number`

##### decDegrees

`number`

##### radius

`number`

#### Returns

`Cartesian3`

***

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

> **getBoundingSphere**(`_time?`): `BoundingSphere` \| `undefined`

#### Parameters

##### \_time?

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

> **morphSwitchHandle**(`mode`): `void`

处理场景模式切换事件。

#### Parameters

##### mode

`SceneMode`

当前场景模式。

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
