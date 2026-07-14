[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CelestialGeodeticGridLayers

# Class: CelestialGeodeticGridLayers

天体地理网格

## Example

```ts
const grid = new CelestialGeodeticGridLayers({
 show: true,
 width: 1,
 color: Daisy.Color.LIGHTGREEN.withAlpha(0.5),
 distanceDisplayCondition: undefined,
 id: "GeodeticGrid",
 showLabel: true,
 followCamera: true,
 step: 10,
 distanceDisplayLevel: ViewDistanceLevel.MEDIUM,
 labelOptions: {
 position: Daisy.Cartesian3.ZERO,
 distanceDisplayCondition: undefined,
 },
});
const moonGrid = new CelestialGeodeticGridLayers(
{ id: "MoonGrid", step: 10, showLabel: true, followCamera: true },
moon
);

viewer.addViewLayer(moonGrid);
```

## Extends

- [`Layer`](Layer.md)

## Extended by

- [`EarthGridLayers`](EarthGridLayers.md)

## Constructors

### Constructor

> **new CelestialGeodeticGridLayers**(`options?`, `celestialEllipsoid?`): `CelestialGeodeticGridLayers`

#### Parameters

##### options?

[`CelestialGeodeticGridOptions`](../interfaces/CelestialGeodeticGridOptions.md) = `{}`

##### celestialEllipsoid?

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Returns

`CelestialGeodeticGridLayers`

#### Overrides

[`Layer`](Layer.md).[`constructor`](Layer.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

引擎实例。

#### Inherited from

[`Layer`](Layer.md).[`engine`](Layer.md#engine)

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

> **morphSwitchHandle**(`mode`): `void`

处理场景模式切换事件。

#### Parameters

##### mode

`SceneMode`

当前场景模式。

#### Returns

`void`

#### Inherited from

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

***

### setCelestialEllipsoid()

> **setCelestialEllipsoid**(`celestialEllipsoid`): `void`

#### Parameters

##### celestialEllipsoid

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Returns

`void`

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
