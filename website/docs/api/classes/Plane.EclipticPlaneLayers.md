[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Plane](../modules/Plane.md) / EclipticPlaneLayers

# Class: EclipticPlaneLayers

黄道面（地心视角下的黄道平面）。

特性：
- 黄道面圆盘：使用“单位圆几何 + modelMatrix 缩放/旋转/平移”，避免 AU 量级带来的精度问题
- 黄道面边线：地心为锚点，半径默认为实时日地距离（可用 options.radius 覆盖）
- 月度辅助：可选显示每月连线/日期标签/点位（日期格式：YYYY/MM/DD）

## Example

```ts
import * as Daisy from "./sdk/index";

const = Daisy.;
const viewer = uiViewer.viewer;

viewer.addViewLayer(new Daisy.EclipticPlaneLayers({
 show: true,
 color: Daisy.Color.YELLOW.withAlpha(0.5),
 planeAlpha: 0.2,

 showOrbit: true,
 orbitColor: Daisy.Color.WHITE,
 orbitWidth: 3,
 orbitSegments: 256,

 showSunEarthLine: true,

 showMonthlyLines: true,
 showMonthlyLabels: true,
 showMonthlyPoints: true,
 monthlyLineColor: Daisy.Color.WHITE.withAlpha(0.35),
 monthlyLineWidth: 1,
 monthlyLabelFont: "12px sans-serif",
 monthlyPointSize: 6,
}));
```

## Extends

- [`PlaneLayer`](Plane.PlaneLayer.md)\<[`EclipticPlaneOptions`](../interfaces/Plane.EclipticPlaneOptions.md)\>

## Constructors

### Constructor

> **new EclipticPlaneLayers**(`options`): `EclipticPlaneLayers`

#### Parameters

##### options

[`EclipticPlaneOptions`](../interfaces/Plane.EclipticPlaneOptions.md)

#### Returns

`EclipticPlaneLayers`

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

### id?

> `optional` **id?**: `string`

图层唯一标识符。

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`id`](Plane.PlaneLayer.md#id)

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

### label

> **label**: `Label` \| `undefined`

***

### monthlyLabels

> **monthlyLabels**: `Label`[] = `[]`

***

### monthlyPoints

> **monthlyPoints**: `PointPrimitive`[] = `[]`

***

### monthlyPolylines

> **monthlyPolylines**: `Polyline`[] = `[]`

***

### name?

> `optional` **name?**: `string`

图层名称。

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`name`](Plane.PlaneLayer.md#name)

***

### orbitPolyline

> **orbitPolyline**: `Polyline` \| `undefined`

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

### sunEarthPolyline

> **sunEarthPolyline**: `Polyline` \| `undefined`

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

是否在相机聚合观测时忽略。
UI 控制器类 widget 应设为 true。

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`zoomIgnored`](Plane.PlaneLayer.md#zoomignored)

## Accessors

### options

#### Get Signature

> **get** **options**(): [`EclipticPlaneOptions`](../interfaces/Plane.EclipticPlaneOptions.md)

##### Returns

[`EclipticPlaneOptions`](../interfaces/Plane.EclipticPlaneOptions.md)

#### Set Signature

> **set** **options**(`options`): `void`

##### Parameters

###### options

[`EclipticPlaneOptions`](../interfaces/Plane.EclipticPlaneOptions.md)

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

销毁 一般不需要手动调用

#### Returns

`void`

#### Overrides

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
