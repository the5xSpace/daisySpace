[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimelineWidget

# Class: TimelineWidget

展示仿真时间范围，并支持拖动当前时刻、平移和缩放可见区间。

通常由引擎界面配置自动创建；需要独立配置时可手动添加。

## Example

```ts
const timeline = new Daisy.TimelineWidget({
 timeFormat: { preset: "date-time-ms", utcOffsetHours: 8 },
});
engine.addWidget(timeline);
timeline.zoomTo(engine.getStartTime(), engine.getStopTime());
```

## Extends

- [`Widget`](Widget.md)

## Constructors

### Constructor

> **new TimelineWidget**(`options?`): `TimelineWidget`

创建时间轴控件；调用 `engine.addWidget()` 后才会挂载。

#### Parameters

##### options?

[`TimelineWidgetOptions`](../interfaces/TimelineWidgetOptions.md) = `{}`

#### Returns

`TimelineWidget`

#### Overrides

[`Widget`](Widget.md).[`constructor`](Widget.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

#### Inherited from

[`Widget`](Widget.md).[`engine`](Widget.md#engine)

***

### id?

> `optional` **id?**: `string`

#### Inherited from

[`Widget`](Widget.md).[`id`](Widget.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

当前 Widget 是否已经释放。
集合管理器用它避开已销毁的单例实例。

#### Inherited from

[`Widget`](Widget.md).[`isDestroyed`](Widget.md#isdestroyed)

***

### key

> **key**: `string` = `"daisy.timeline"`

Widget 标识键（用于单例去重）。

#### Overrides

[`Widget`](Widget.md).[`key`](Widget.md#key)

***

### name?

> `optional` **name?**: `string`

#### Inherited from

[`Widget`](Widget.md).[`name`](Widget.md#name)

***

### rebuildOnMorph

> **rebuildOnMorph**: `boolean` = `false`

场景 morph(2D/3D) 时是否需要 destroy -> register 重建。
默认 true；UI 类 widget 通常应设为 false。

#### Overrides

[`Widget`](Widget.md).[`rebuildOnMorph`](Widget.md#rebuildonmorph)

***

### singleton

> **singleton**: `boolean` = `true`

是否为单例 widget。
- 若为 true，Engine 内同 key 只允许存在一个实例。

#### Overrides

[`Widget`](Widget.md).[`singleton`](Widget.md#singleton)

***

### zoomIgnored

> **zoomIgnored**: `boolean` = `true`

是否在相机聚合观测时忽略。
UI 控制器类 widget 应设为 true。

#### Overrides

[`Widget`](Widget.md).[`zoomIgnored`](Widget.md#zoomignored)

## Methods

### addHighlightRange()

> **addHighlightRange**(`color`, `heightInPx`, `base?`): [`TimelineHighlightRange`](TimelineHighlightRange.md)

添加覆盖在刻度条上的高亮区间描述。

返回对象后可继续设置其起止时刻。

#### Parameters

##### color

`string`

##### heightInPx

`number`

##### base?

`number`

#### Returns

[`TimelineHighlightRange`](TimelineHighlightRange.md)

***

### addTrack()

> **addTrack**(`interval`, `heightInPx`, `color?`, `backgroundColor?`): [`TimelineTrack`](TimelineTrack.md)

添加一个时间区间轨道。

#### Parameters

##### interval

轨道覆盖的起止时刻。

###### start

`JulianDate`

###### stop

`JulianDate`

##### heightInPx

`number`

轨道高度，单位为像素。

##### color?

`Color`

区间颜色。

##### backgroundColor?

`Color`

轨道背景颜色。

#### Returns

[`TimelineTrack`](TimelineTrack.md)

***

### configureLabel()

> **configureLabel**(`timeFormat?`): `this`

更新局部时间标签格式并立即重绘刻度。

#### Parameters

##### timeFormat?

[`TimeFormatConfig`](../types/TimeFormatConfig.md)

#### Returns

`this`

***

### createIn2d()

> **createIn2d**(`_`): `void`

在 2D 模式下创建 Widget 资源。
子类应重写此方法以实现 2D 模式特有的初始化逻辑（如添加 Billboard、Label 等）。

#### Parameters

##### \_

[`Engine`](Engine.md)

引擎实例

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`createIn2d`](Widget.md#createin2d)

***

### destroy()

> **destroy**(): `void`

解除时钟与交互事件，移除时间轴节点和轨道数据。

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`destroy`](Widget.md#destroy)

***

### is3d()

> **is3d**(): `boolean`

判断当前场景是否处于 3D 模式。

#### Returns

`boolean`

若为 3D 模式返回 true，否则返回 false

#### Inherited from

[`Widget`](Widget.md).[`is3d`](Widget.md#is3d)

***

### makeLabel()

> **makeLabel**(`time`): `string`

将指定仿真时刻格式化为时间轴标签。

#### Parameters

##### time

`JulianDate`

#### Returns

`string`

***

### morphSwitchHandle()

> **morphSwitchHandle**(`_`): `void`

场景模式切换处理。
当场景在 2D/3D 之间切换时由引擎回调触发，子类可重写以实现自适应逻辑。

#### Parameters

##### \_

`SceneMode`

切换后的场景模式

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`morphSwitchHandle`](Widget.md#morphswitchhandle)

***

### offMorphSwitch()

> **offMorphSwitch**(`callback`): `void`

移除场景模式切换监听。

#### Parameters

##### callback

(`mode`) => `void`

需要移除的回调函数

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`offMorphSwitch`](Widget.md#offmorphswitch)

***

### onMorphSwitch()

> **onMorphSwitch**(`callback`): `void`

注册场景模式切换监听。

#### Parameters

##### callback

(`mode`) => `void`

场景切换时的回调函数

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`onMorphSwitch`](Widget.md#onmorphswitch)

***

### refresh()

> **refresh**(): `void`

刷新时间刻度与当前时刻指针。

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`refresh`](Widget.md#refresh)

***

### refreshLabels()

> **refreshLabels**(): `void`

按当前格式重新生成时间刻度标签。

#### Returns

`void`

***

### register()

> **register**(`engine`): `this`

将时间轴挂载到引擎视图，并同步引擎时钟。

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`this`

#### Overrides

[`Widget`](Widget.md).[`register`](Widget.md#register)

***

### resize()

> **resize**(): `void`

根据容器尺寸和轨道总高度重新布局时间轴。

#### Returns

`void`

***

### update()

> **update**(`_`): `void`

每帧更新回调。
子类应重写此方法以实现逐帧驱动逻辑（如位置插值、状态同步等）。

#### Parameters

##### \_

`JulianDate`

当前仿真时间（JulianDate）

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`update`](Widget.md#update)

***

### updateFromClock()

> **updateFromClock**(): `void`

从引擎时钟同步当前时刻指针和拖动状态。

#### Returns

`void`

***

### zoomFrom()

> **zoomFrom**(`amount`): `void`

按当前游标位置缩放可见区间；大于 1 放大时间跨度，小于 1 缩小。

#### Parameters

##### amount

`number`

#### Returns

`void`

***

### zoomTo()

> **zoomTo**(`startTime`, `stopTime`): `void`

将可见时间范围调整为指定起止时刻。

#### Parameters

##### startTime

`JulianDate`

##### stopTime

`JulianDate`

#### Returns

`void`
