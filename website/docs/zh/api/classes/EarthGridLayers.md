[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EarthGridLayers

# Class: EarthGridLayers

地球Wgs84地理网格

## Extends

- [`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md)

## Constructors

### Constructor

> **new EarthGridLayers**(`options`): `EarthGridLayers`

#### Parameters

##### options

[`earthGridOptions`](../interfaces/earthGridOptions.md)

#### Returns

`EarthGridLayers`

#### Overrides

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`constructor`](CelestialGeodeticGridLayers.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

引擎实例。

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`engine`](CelestialGeodeticGridLayers.md#engine)

***

### id?

> `optional` **id?**: `string`

图层唯一标识符。

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`id`](CelestialGeodeticGridLayers.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

当前 Widget 是否已经释放。
集合管理器用它避开已销毁的单例实例。

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`isDestroyed`](CelestialGeodeticGridLayers.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget 标识键（用于单例去重）。

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`key`](CelestialGeodeticGridLayers.md#key)

***

### name?

> `optional` **name?**: `string`

图层名称。

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`name`](CelestialGeodeticGridLayers.md#name)

***

### primitive

> **primitive**: `SafePrimitive` \| `null` = `null`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`primitive`](CelestialGeodeticGridLayers.md#primitive)

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean` = `true`

场景 morph(2D/3D) 时是否需要 destroy -> register 重建。
默认 true；UI 类 widget 通常应设为 false。

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`rebuildOnMorph`](CelestialGeodeticGridLayers.md#rebuildonmorph)

***

### singleton?

> `optional` **singleton?**: `boolean`

是否为单例 widget。
- 若为 true，Engine 内同 key 只允许存在一个实例。

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`singleton`](CelestialGeodeticGridLayers.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

是否在相机聚合观测时忽略。
UI 控制器类 widget 应设为 true。

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`zoomIgnored`](CelestialGeodeticGridLayers.md#zoomignored)

## Accessors

### options

#### Get Signature

> **get** **options**(): [`CelestialGeodeticGridOptions`](../interfaces/CelestialGeodeticGridOptions.md)

##### Returns

[`CelestialGeodeticGridOptions`](../interfaces/CelestialGeodeticGridOptions.md)

#### Set Signature

> **set** **options**(`options`): `void`

##### Parameters

###### options

[`CelestialGeodeticGridOptions`](../interfaces/CelestialGeodeticGridOptions.md)

##### Returns

`void`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`options`](CelestialGeodeticGridLayers.md#options)

***

### suppressShow

#### Get Signature

> **get** **suppressShow**(): `boolean`

##### Returns

`boolean`

#### Set Signature

> **set** **suppressShow**(`value`): `void`

临时隐藏网格（如相机过渡期间），不影响 options.show 配置

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`suppressShow`](CelestialGeodeticGridLayers.md#suppressshow)

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

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`createIn2d`](CelestialGeodeticGridLayers.md#createin2d)

***

### destroy()

> **destroy**(): `void`

销毁图层。

#### Returns

`void`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`destroy`](CelestialGeodeticGridLayers.md#destroy)

***

### getBoundingSphere()

> **getBoundingSphere**(`time?`): `BoundingSphere` \| `undefined`

#### Parameters

##### time?

`JulianDate`

#### Returns

`BoundingSphere` \| `undefined`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`getBoundingSphere`](CelestialGeodeticGridLayers.md#getboundingsphere)

***

### is3d()

> **is3d**(): `boolean`

判断是否是3d模式

#### Returns

`boolean`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`is3d`](CelestialGeodeticGridLayers.md#is3d)

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

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`morphSwitchHandle`](CelestialGeodeticGridLayers.md#morphswitchhandle)

***

### refresh()

> **refresh**(): `void`

外部配置变化后的同步刷新入口。

子类可重写此方法刷新 DOM、Canvas 或缓存状态。

#### Returns

`void`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`refresh`](CelestialGeodeticGridLayers.md#refresh)

***

### setCelestialEllipsoid()

> **setCelestialEllipsoid**(`celestialEllipsoid`): `void`

#### Parameters

##### celestialEllipsoid

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Returns

`void`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`setCelestialEllipsoid`](CelestialGeodeticGridLayers.md#setcelestialellipsoid)

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

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`offMorphSwitch`](CelestialGeodeticGridLayers.md#offmorphswitch)

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

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`onMorphSwitch`](CelestialGeodeticGridLayers.md#onmorphswitch)
