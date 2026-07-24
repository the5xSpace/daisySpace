[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SunConeLayer

# Class: SunConeLayer

展示遮挡天体背向光源一侧的本影和半影空间范围。

## Remarks

日锥只在三维模式下显示；切换到二维模式时释放空间渲染资源，返回三维模式后重建。
`visualLengthScale` 仅改变可视长度，`getOcclusionState()` 始终使用真实天体尺寸判定。

## Example

```ts
const sunCone = engine.addWidget(new Daisy.SunConeLayer({
 showUmbra: true,
 showPenumbra: true,
 visualLengthScale: 0.05,
}));
const position = spacecraft.getCurrentPosition();
if (position) {
 const state = sunCone.getOcclusionState(position);
}
```

## Extends

- [`Layer`](Layer.md)

## Constructors

### Constructor

> **new SunConeLayer**(`options?`): `SunConeLayer`

创建日锥图层并校验显示、分段和更新间隔配置。

#### Parameters

##### options?

[`SunConeLayerOptions`](../interfaces/SunConeLayerOptions.md) = `{}`

#### Returns

`SunConeLayer`

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

### show

#### Get Signature

> **get** **show**(): `boolean`

是否显示日锥；修改后立即更新已有空间渲染资源。

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

进入二维模式时释放三维空间渲染资源。

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

销毁图层并解除注册。

#### Returns

`void`

#### Overrides

[`Layer`](Layer.md).[`destroy`](Layer.md#destroy)

***

### getBoundingSphere()

> **getBoundingSphere**(): `BoundingSphere` \| `undefined`

获取当前可见日锥的包围球；未显示或不在三维模式时返回 `undefined`。

#### Returns

`BoundingSphere` \| `undefined`

***

### getOcclusionState()

> **getOcclusionState**(`observer`, `time?`): [`SunOcclusionState`](../types/SunOcclusionState.md)

判定任意世界坐标点位于日照区、本影还是半影。

#### Parameters

##### observer

`Cartesian3`

待判定点的世界坐标。

##### time?

`JulianDate`

判定时刻；未设置时优先使用引擎当前时刻。

#### Returns

[`SunOcclusionState`](../types/SunOcclusionState.md)

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

在离开三维模式时释放日锥的空间渲染资源。

#### Parameters

##### mode

`SceneMode`

#### Returns

`void`

#### Overrides

[`Layer`](Layer.md).[`morphSwitchHandle`](Layer.md#morphswitchhandle)

***

### refresh()

> **refresh**(): `void`

忽略更新间隔，按引擎当前时刻立即重建日锥。

#### Returns

`void`

#### Overrides

[`Layer`](Layer.md).[`refresh`](Layer.md#refresh)

***

### register()

> **register**(`engine`): `SunConeLayer`

将图层注册到引擎；三维模式下立即创建本影和半影。

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`SunConeLayer`

#### Overrides

`Layer.register`

***

### unregister()

> **unregister**(): `void`

解除注册并释放当前图层拥有的空间渲染资源。

#### Returns

`void`

***

### update()

> **update**(`time`): `void`

根据仿真时刻和配置的最小更新间隔刷新日锥形态。

#### Parameters

##### time

`JulianDate`

#### Returns

`void`

#### Overrides

`Layer.update`

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
