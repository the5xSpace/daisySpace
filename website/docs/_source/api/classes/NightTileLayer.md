[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / NightTileLayer

# Class: NightTileLayer

仅在地球夜侧显示的瓦片图层。

## Remarks

- 2D 与 3D 模式均可使用。
- 图层只移除自身创建的影像，不会清空其他底图或叠加层。
- 场景模式切换时可安全重复执行销毁和重新注册。

## Example

```ts
const nightTiles = engine.addWidget(new Daisy.NightTileLayer());
// 默认使用 Daisy 内置离线夜景瓦片。
```

## Extends

- [`Layer`](Layer.md)

## Constructors

### Constructor

> **new NightTileLayer**(`options?`): `NightTileLayer`

#### Parameters

##### options?

[`NightTileLayerOptions`](../interfaces/NightTileLayerOptions.md) = `{}`

#### Returns

`NightTileLayer`

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

### key

> `readonly` **key**: `"daisy-night-tile-layer"` = `"daisy-night-tile-layer"`

Widget 标识键（用于单例去重）。

#### Overrides

[`Layer`](Layer.md).[`key`](Layer.md#key)

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean` = `true`

场景 morph(2D/3D) 时是否需要 destroy -> register 重建。
默认 true；UI 类 widget 通常应设为 false。

#### Inherited from

[`Layer`](Layer.md).[`rebuildOnMorph`](Layer.md#rebuildonmorph)

***

### singleton

> `readonly` **singleton**: `true` = `true`

是否为单例 widget。
- 若为 true，Engine 内同 key 只允许存在一个实例。

#### Overrides

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

[`Layer`](Layer.md).[`id`](Layer.md#id)

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

[`Layer`](Layer.md).[`name`](Layer.md#name)

***

### show

#### Get Signature

> **get** **show**(): `boolean`

是否显示夜间瓦片。

##### Returns

`boolean`

#### Set Signature

> **set** **show**(`value`): `void`

##### Parameters

###### value

`boolean`

##### Returns

`void`

## Methods

### createIn2d()

> **createIn2d**(`_`): `void`

在2D空间创建图层。

#### Parameters

##### \_

[`Engine`](Engine.md)

#### Returns

`void`

#### Overrides

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

### is3d()

> **is3d**(): `boolean`

判断是否是3d模式

#### Returns

`boolean`

#### Inherited from

[`Layer`](Layer.md).[`is3d`](Layer.md#is3d)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`_`): `void`

处理场景模式切换事件。

#### Parameters

##### \_

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

***

### unregister()

> **unregister**(): `void`

解除注册并释放当前实例拥有的影像资源。

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
