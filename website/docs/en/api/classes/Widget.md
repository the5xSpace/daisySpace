[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Widget

# Class: Widget

Daisy Widget base class (lifecycle aligned with legacy Layer).

## Extended by

- [`MarkerWidget`](MarkerWidget.md)
- [`Layer`](Layer.md)
- [`ControlPanelWidget`](ControlPanelWidget.md)
- [`SimulationTimeDisplayWidget`](SimulationTimeDisplayWidget.md)
- [`FrameRateWidget`](FrameRateWidget.md)
- [`WatermarkWidget`](WatermarkWidget.md)
- [`TaskTimeLineWidget`](TaskTimeLineWidget.md)
- [`TaskGanttWidget`](TaskGanttWidget.md)
- [`TimelineWidget`](TimelineWidget.md)

## Implements

- [`IWidget`](../interfaces/IWidget.md)

## Constructors

### Constructor

> **new Widget**(): `Widget`

#### Returns

`Widget`

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`engine`](../interfaces/IWidget.md#engine)

***

### id?

> `optional` **id?**: `string`

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`id`](../interfaces/IWidget.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

Whether the current Widget has been destroyed.
The collection manager uses this to avoid destroyed singleton instances.

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`isDestroyed`](../interfaces/IWidget.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget identification key (for singleton deduplication).

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`key`](../interfaces/IWidget.md#key)

***

### name?

> `optional` **name?**: `string`

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`name`](../interfaces/IWidget.md#name)

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean` = `true`

Whether destroy -> register rebuild is needed on scene morph (2D/3D).
Default is true; UI widgets should usually be set to false.

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`rebuildOnMorph`](../interfaces/IWidget.md#rebuildonmorph)

***

### singleton?

> `optional` **singleton?**: `boolean`

Whether it is a singleton widget.
- If true, only one instance with the same key is allowed in the Engine.

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`singleton`](../interfaces/IWidget.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

Whether to ignore during camera aggregation observation.
UI controller widgets should be set to true.

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`zoomIgnored`](../interfaces/IWidget.md#zoomignored)

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

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`createIn2d`](../interfaces/IWidget.md#createin2d)

***

### destroy()

> **destroy**(): `void`

Destroy the Widget, release resources and unbind events.
Removes morph switch listeners and marks the instance as destroyed.

#### Returns

`void`

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`destroy`](../interfaces/IWidget.md#destroy)

***

### is3d()

> **is3d**(): `boolean`

Determines whether the current scene is in 3D mode.

#### Returns

`boolean`

Returns true if in 3D mode, false otherwise

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

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`morphSwitchHandle`](../interfaces/IWidget.md#morphswitchhandle)

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

***

### refresh()

> **refresh**(): `void`

Entry point for syncing after external configuration changes.

Subclasses can override to refresh DOM, Canvas, or cached state.

#### Returns

`void`

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`refresh`](../interfaces/IWidget.md#refresh)

***

### register()

> **register**(`engine`): `Widget`

Register the Widget with the engine to complete initialization binding.
Mounts the current instance to the specified Engine, resets the destroyed flag, and listens to scene morph events.
If currently in 2D mode, immediately calls createIn2d to complete 2D resource creation.

#### Parameters

##### engine

[`Engine`](Engine.md)

Target engine instance

#### Returns

`Widget`

Current Widget instance (supports chaining)

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`register`](../interfaces/IWidget.md#register)

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

#### Implementation of

[`IWidget`](../interfaces/IWidget.md).[`update`](../interfaces/IWidget.md#update)
