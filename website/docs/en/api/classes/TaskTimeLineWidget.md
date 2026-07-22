[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskTimeLineWidget

# Class: TaskTimeLineWidget

Displays task schedule status as a draggable, zoomable step list.

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

Creates a task timeline widget; it mounts and starts refreshing only after calling `engine.addWidget()`.

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

Whether the current Widget has been destroyed.
The collection manager uses this to avoid destroyed singleton instances.

#### Inherited from

[`Widget`](Widget.md).[`isDestroyed`](Widget.md#isdestroyed)

***

### key

> **key**: `string` = `"daisy.task-timeline"`

Widget identification key (for singleton deduplication).

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

Whether destroy -> register rebuild is needed on scene morph (2D/3D).
Default is true; UI widgets should usually be set to false.

#### Overrides

[`Widget`](Widget.md).[`rebuildOnMorph`](Widget.md#rebuildonmorph)

***

### singleton

> **singleton**: `boolean` = `true`

Whether it is a singleton widget.
- If true, only one instance with the same key is allowed in the Engine.

#### Overrides

[`Widget`](Widget.md).[`singleton`](Widget.md#singleton)

***

### zoomIgnored

> **zoomIgnored**: `boolean` = `true`

Whether to ignore during camera aggregation observation.
UI controller widgets should be set to true.

#### Overrides

[`Widget`](Widget.md).[`zoomIgnored`](Widget.md#zoomignored)

## Methods

### createIn2d()

> **createIn2d**(`_`): `void`

Create Widget resources in 2D mode.
Subclasses should override this method to implement 2D-specific initialization logic (such as adding Billboards, Labels, etc.).

#### Parameters

##### \_

[`Engine`](Engine.md)

Engine instance

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`createIn2d`](Widget.md#createin2d)

***

### destroy()

> **destroy**(): `void`

Stops refreshing, unbinds event listeners, and removes the widget node.

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`destroy`](Widget.md#destroy)

***

### is3d()

> **is3d**(): `boolean`

Determines whether the current scene is in 3D mode.

#### Returns

`boolean`

Returns true if in 3D mode, false otherwise

#### Inherited from

[`Widget`](Widget.md).[`is3d`](Widget.md#is3d)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`_`): `void`

Scene mode switch handler.
Called by the engine when the scene switches between 2D/3D. Subclasses can override for adaptive logic.

#### Parameters

##### \_

`SceneMode`

The scene mode after switching

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`morphSwitchHandle`](Widget.md#morphswitchhandle)

***

### offMorphSwitch()

> **offMorphSwitch**(`callback`): `void`

Remove scene mode switch listener.

#### Parameters

##### callback

(`mode`) => `void`

The callback function to remove

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`offMorphSwitch`](Widget.md#offmorphswitch)

***

### onMorphSwitch()

> **onMorphSwitch**(`callback`): `void`

Register scene mode switch listener.

#### Parameters

##### callback

(`mode`) => `void`

Callback function when scene switches

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`onMorphSwitch`](Widget.md#onmorphswitch)

***

### refresh()

> **refresh**(): `void`

Immediately redraws the view using the current task status.

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`refresh`](Widget.md#refresh)

***

### register()

> **register**(`engine`): `this`

Registers the widget with the engine and subscribes to task status changes.

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

Renders the task step list; subclasses can override this method, and the configured `renderer` takes precedence over the built-in template.

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

Updates the panel title and immediately refreshes the view.

#### Parameters

##### title

`string`

#### Returns

`this`

***

### update()

> **update**(`_`): `void`

Per-frame update callback.
Subclasses should override this method to implement per-frame driving logic (such as position interpolation, state synchronization, etc.).

#### Parameters

##### \_

`JulianDate`

Current simulation time (JulianDate)

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`update`](Widget.md#update)
