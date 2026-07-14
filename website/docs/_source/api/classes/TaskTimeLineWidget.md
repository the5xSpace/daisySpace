[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskTimeLineWidget

# Class: TaskTimeLineWidget

以可拖拽、可缩放的步骤列表展示任务调度状态。

## Example

```ts
const taskTimeline = new Daisy.TaskTimeLineWidget(engine.timeSchedule, {
 mode: "standard",
 title: "飞行任务",
 timeFormat: { preset: "bjt" },
 onStepClick: (task) => console.log(task.id),
});
engine.addWidget(taskTimeline);
```

## Extends

- [`Widget`](Widget.md)

## Constructors

### Constructor

> **new TaskTimeLineWidget**(`schedule`, `options?`): `TaskTimeLineWidget`

创建任务时间线控件；调用 `engine.addWidget()` 后才会挂载并开始刷新。

#### Parameters

##### schedule

[`TimeSchedule`](TimeSchedule.md)

##### options?

[`TaskTimeLineWidgetOptions`](../interfaces/TaskTimeLineWidgetOptions.md) = `{}`

#### Returns

`TaskTimeLineWidget`

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

> **key**: `string` = `"daisy.task-timeline"`

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

停止刷新、解除事件监听并移除控件节点。

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

使用当前任务状态立即重绘视图。

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`refresh`](Widget.md#refresh)

***

### register()

> **register**(`engine`): `this`

将控件注册到引擎并订阅任务状态变化。

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`this`

#### Overrides

[`Widget`](Widget.md).[`register`](Widget.md#register)

***

### renderTimeline()

> **renderTimeline**(`container`, `state`): `void`

渲染任务步骤列表；子类可覆写此方法，配置的 `renderer` 优先于内置模板。

#### Parameters

##### container

`HTMLElement`

##### state

[`TaskStepListState`](../interfaces/TaskStepListState.md)

#### Returns

`void`

***

### setTitle()

> **setTitle**(`title`): `this`

更新面板标题并立即刷新视图。

#### Parameters

##### title

`string`

#### Returns

`this`

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
