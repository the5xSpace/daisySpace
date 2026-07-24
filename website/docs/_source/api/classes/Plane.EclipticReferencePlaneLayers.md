[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Plane](../modules/Plane.md) / EclipticReferencePlaneLayers

# Class: EclipticReferencePlaneLayers

黄道参考平面

说明：
- 仍然使用黄道面对应的法向
- 以地心为原点
- 显示形状为大矩形网格，便于观察地球与太阳关系

## Extends

- [`PlaneLayer`](Plane.PlaneLayer.md)\<[`EclipticReferencePlaneOptions`](../interfaces/Plane.EclipticReferencePlaneOptions.md)\>

## Constructors

### Constructor

> **new EclipticReferencePlaneLayers**(`options`): `EclipticReferencePlaneLayers`

#### Parameters

##### options

[`EclipticReferencePlaneOptions`](../interfaces/Plane.EclipticReferencePlaneOptions.md)

#### Returns

`EclipticReferencePlaneLayers`

#### Overrides

[`PlaneLayer`](Plane.PlaneLayer.md).[`constructor`](Plane.PlaneLayer.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

引擎实例。

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`engine`](Plane.PlaneLayer.md#engine)

***

### gridStyle

> **gridStyle**: [`PlaneGridStyle`](../types/Plane.PlaneGridStyle.md)

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`gridStyle`](Plane.PlaneLayer.md#gridstyle)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

当前 Widget 是否已经释放。
集合管理器用它避开已销毁的单例实例。

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`isDestroyed`](Plane.PlaneLayer.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget 标识键（用于单例去重）。

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`key`](Plane.PlaneLayer.md#key)

***

### primitive

> **primitive**: `SafePrimitive` \| `undefined`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`primitive`](Plane.PlaneLayer.md#primitive)

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean` = `true`

场景 morph(2D/3D) 时是否需要 destroy -> register 重建。
默认 true；UI 类 widget 通常应设为 false。

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`rebuildOnMorph`](Plane.PlaneLayer.md#rebuildonmorph)

***

### referenceRadius

> **referenceRadius**: `number` = `1.0`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`referenceRadius`](Plane.PlaneLayer.md#referenceradius)

***

### singleton?

> `optional` **singleton?**: `boolean`

是否为单例 widget。
- 若为 true，Engine 内同 key 只允许存在一个实例。

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`singleton`](Plane.PlaneLayer.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

是否在相机聚合观测时忽略。
UI 控制器类 widget 应设为 true。

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`zoomIgnored`](Plane.PlaneLayer.md#zoomignored)

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

> **get** **options**(): [`EclipticReferencePlaneOptions`](../interfaces/Plane.EclipticReferencePlaneOptions.md)

##### Returns

[`EclipticReferencePlaneOptions`](../interfaces/Plane.EclipticReferencePlaneOptions.md)

#### Set Signature

> **set** **options**(`options`): `void`

##### Parameters

###### options

[`EclipticReferencePlaneOptions`](../interfaces/Plane.EclipticReferencePlaneOptions.md)

##### Returns

`void`

#### Overrides

[`PlaneLayer`](Plane.PlaneLayer.md).[`options`](Plane.PlaneLayer.md#options)

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

[`PlaneLayer`](Plane.PlaneLayer.md).[`createIn2d`](Plane.PlaneLayer.md#createin2d)

***

### destroy()

> **destroy**(): `void`

销毁图层。

#### Returns

`void`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`destroy`](Plane.PlaneLayer.md#destroy)

***

### getBoundingSphere()

> **getBoundingSphere**(`time?`): `BoundingSphere` \| `undefined`

#### Parameters

##### time?

`JulianDate`

#### Returns

`BoundingSphere` \| `undefined`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`getBoundingSphere`](Plane.PlaneLayer.md#getboundingsphere)

***

### is3d()

> **is3d**(): `boolean`

判断是否是3d模式

#### Returns

`boolean`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`is3d`](Plane.PlaneLayer.md#is3d)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`_mode`): `void`

处理场景模式切换事件。

#### Parameters

##### \_mode

`SceneMode`

#### Returns

`void`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`morphSwitchHandle`](Plane.PlaneLayer.md#morphswitchhandle)

***

### refresh()

> **refresh**(): `void`

外部配置变化后的同步刷新入口。

子类可重写此方法刷新 DOM、Canvas 或缓存状态。

#### Returns

`void`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`refresh`](Plane.PlaneLayer.md#refresh)

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

[`PlaneLayer`](Plane.PlaneLayer.md).[`offMorphSwitch`](Plane.PlaneLayer.md#offmorphswitch)

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

[`PlaneLayer`](Plane.PlaneLayer.md).[`onMorphSwitch`](Plane.PlaneLayer.md#onmorphswitch)
