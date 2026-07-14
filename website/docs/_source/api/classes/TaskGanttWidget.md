[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskGanttWidget

# Class: TaskGanttWidget

任务时间线 Widget（甘特图） — 在 HTML 面板中实时展示 TimeSchedule 调度任务的执行进度。

## 功能
- 绑定 [TimeSchedule](TimeSchedule.md)，监听任务状态变更事件
- 每秒刷新（1Hz），构建状态快照并调用渲染函数
- 每个任务分配独立颜色（HSL 色相旋转），底部图例展示
- 时间轴刻度，方便对比时间比例
- Hover 任务条显示 tooltip（名称、起止时间、状态、进度）

## 三种定制方式

### 方式 1：CSS 变量覆盖（零代码）
```css
:root {
 --ttl-bg: rgba(30, 41, 59, 0.95);
 --ttl-cursor: #ef4444;
}
```

### 方式 2：renderer 选项（函数级覆写）
```ts
new TaskGanttWidget(schedule, {
 renderer: (container, state) => {
 render(html`Tasks: ${state.tasks.length}`, container);
 }
});
```

### 方式 3：继承覆写（类级覆写）
```ts
class MyWidget extends TaskGanttWidget {
 renderTimeline(container, state) {
 render(myTemplate(state), container);
 }
}
```

## Example

```ts
const widget = new TaskGanttWidget(engine.timeSchedule, {
 width: 500,
 height: 300,
 tickCount: 8,
});
engine.addWidget(widget);
```

## Extends

- [`Widget`](Widget.md)

## Constructors

### Constructor

> **new TaskGanttWidget**(`schedule`, `options?`): `TaskGanttWidget`

#### Parameters

##### schedule

[`TimeSchedule`](TimeSchedule.md)

##### options?

[`TaskGanttWidgetOptions`](../interfaces/TaskGanttWidgetOptions.md) = `{}`

#### Returns

`TaskGanttWidget`

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

> **key**: `string` = `"daisy.task-gantt"`

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

销毁 Widget，释放资源并解除事件绑定。
将移除 morph 切换监听并标记实例为已销毁。

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

外部配置变化后的同步刷新入口。

子类可重写此方法刷新 DOM、Canvas 或缓存状态。

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`refresh`](Widget.md#refresh)

***

### register()

> **register**(`engine`): `this`

注册 Widget 到引擎，完成初始化绑定。
将当前实例挂载到指定 Engine，重置销毁标记，并监听场景 morph 事件。
若当前为 2D 模式，则立即调用 createIn2d 完成 2D 资源创建。

#### Parameters

##### engine

[`Engine`](Engine.md)

目标引擎实例

#### Returns

`this`

当前 Widget 实例（支持链式调用）

#### Overrides

[`Widget`](Widget.md).[`register`](Widget.md#register)

***

### renderTimeline()

> **renderTimeline**(`container`, `state`): `void`

渲染时间线 UI（可覆写）。

#### Parameters

##### container

`HTMLElement`

挂载 DOM 容器

##### state

[`TaskGanttState`](../interfaces/TaskGanttState.md)

当前调度状态快照

#### Returns

`void`

***

### setTitle()

> **setTitle**(`title`): `this`

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
