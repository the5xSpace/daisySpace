[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TaskGanttWidget

# Class: TaskGanttWidget

Task timeline Widget (Gantt chart) that displays the execution progress of TimeSchedule tasks in an HTML panel in real time.

## Features
- Binds to [TimeSchedule](TimeSchedule.md) and listens for task-status changes
- Refreshes every second (1 Hz), builds a state snapshot, and calls the renderer
- Assigns each task an independent color using HSL hue rotation and displays a legend at the bottom
- Shows timeline ticks for comparing time ratios
- Hover over a task bar to show a tooltip with the name, start/end times, status, and progress

## Three Customization Methods

### Method 1: Override CSS Variables (No Code)
```css
:root {
 --ttl-bg: rgba(30, 41, 59, 0.95);
 --ttl-cursor: #ef4444;
}
```

### Method 2: renderer Option (Function-Level Override)
```ts
new TaskGanttWidget(schedule, {
 renderer: (container, state) => {
 render(html`Tasks: ${state.tasks.length}`, container);
 }
});
```

### Method 3: Override Through Inheritance (Class-Level Override)
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

Whether the current Widget has been destroyed.
The collection manager uses this to skip destroyed singleton instances.

#### Inherited from

[`Widget`](Widget.md).[`isDestroyed`](Widget.md#isdestroyed)

***

### key

> **key**: `string` = `"daisy.task-gantt"`

Widget key (used for singleton deduplication).

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

Whether to rebuild through destroy -> register during scene morphing (2D/3D).
Defaults to true; UI Widgets should generally set this to false.

#### Overrides

[`Widget`](Widget.md).[`rebuildOnMorph`](Widget.md#rebuildonmorph)

***

### singleton

> **singleton**: `boolean` = `true`

Whether this is a singleton Widget.
- If true, only one instance with the same key is allowed within an Engine.

#### Overrides

[`Widget`](Widget.md).[`singleton`](Widget.md#singleton)

***

### zoomIgnored

> **zoomIgnored**: `boolean` = `true`

Whether to ignore this Widget during camera aggregation.
UI controller Widgets should set this to true.

#### Overrides

[`Widget`](Widget.md).[`zoomIgnored`](Widget.md#zoomignored)

## Methods

### createIn2d()

> **createIn2d**(`_`): `void`

Creates Widget resources in 2D mode.
Subclasses should override this method for 2D-specific initialization, such as adding Billboard or Label objects.

#### Parameters

##### \_

[`Engine`](Engine.md)

Engine instance.

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`createIn2d`](Widget.md#createin2d)

***

### destroy()

> **destroy**(): `void`

Destroys the Widget, releases resources, and removes event bindings.
Removes the morph-switch listener and marks the instance as destroyed.

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`destroy`](Widget.md#destroy)

***

### is3d()

> **is3d**(): `boolean`

Checks whether the current scene is in 3D mode.

#### Returns

`boolean`

Returns true in 3D mode and false otherwise.

#### Inherited from

[`Widget`](Widget.md).[`is3d`](Widget.md#is3d)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`_`): `void`

Handles scene-mode changes.
Called by the Engine when the scene switches between 2D and 3D; subclasses can override it for adaptive behavior.

#### Parameters

##### \_

`SceneMode`

Scene mode after the switch.

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`morphSwitchHandle`](Widget.md#morphswitchhandle)

***

### offMorphSwitch()

> **offMorphSwitch**(`callback`): `void`

Removes the scene-mode change listener.

#### Parameters

##### callback

(`mode`) => `void`

Callback function to remove.

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`offMorphSwitch`](Widget.md#offmorphswitch)

***

### onMorphSwitch()

> **onMorphSwitch**(`callback`): `void`

Registers a scene-mode change listener.

#### Parameters

##### callback

(`mode`) => `void`

Callback invoked when the scene changes.

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`onMorphSwitch`](Widget.md#onmorphswitch)

***

### refresh()

> **refresh**(): `void`

Entry point for synchronized refreshes after external configuration changes.

Subclasses can override this method to refresh the DOM, Canvas, or cached state.

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`refresh`](Widget.md#refresh)

***

### register()

> **register**(`engine`): `this`

Registers the Widget with the Engine and completes initialization bindings.
Mounts the current instance on the specified Engine, resets the destroyed flag, and listens for scene morph events.
When the current mode is 2D, immediately calls createIn2d to create 2D resources.

#### Parameters

##### engine

[`Engine`](Engine.md)

Target Engine instance.

#### Returns

`this`

Current Widget instance (supports chaining).

#### Overrides

[`Widget`](Widget.md).[`register`](Widget.md#register)

***

### renderTimeline()

> **renderTimeline**(`container`, `state`): `void`

Renders the timeline UI (overridable).

#### Parameters

##### container

`HTMLElement`

DOM container to mount into.

##### state

[`TaskGanttState`](../interfaces/TaskGanttState.md)

Current scheduler-state snapshot.

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

Per-frame update callback.
Subclasses should override this method for frame-driven logic such as position interpolation and state synchronization.

#### Parameters

##### \_

`JulianDate`

Current simulation time (JulianDate).

#### Returns

`void`

#### Inherited from

[`Widget`](Widget.md).[`update`](Widget.md#update)
