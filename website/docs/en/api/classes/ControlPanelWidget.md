[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ControlPanelWidget

# Class: ControlPanelWidget

Control-panel Widget.

Wraps FloatingControlPanel and keyboard-control components in the Widget lifecycle.
Supports lite, standard, and customize modes.

## Extends

- [`Widget`](Widget.md)

## Constructors

### Constructor

> **new ControlPanelWidget**(`options?`): `ControlPanelWidget`

#### Parameters

##### options?

`object` & [`FloatingPanelOptions`](../types/FloatingPanelOptions.md) = `{}`

#### Returns

`ControlPanelWidget`

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

> **key**: `string` = `"daisy.control-panel"`

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

#### Inherited from

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
