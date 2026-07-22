[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CelestialMarkerWidget

# Class: CelestialMarkerWidget

Marker Widget.

Draws point markers and labels for a set of target points in the scene, with automatic distance-based show/hide.
Suitable for marking key locations (e.g., ground stations, satellites, etc.).

## Extends

- [`MarkerWidget`](MarkerWidget.md)

## Constructors

### Constructor

> **new CelestialMarkerWidget**(`options?`): `CelestialMarkerWidget`

#### Parameters

##### options?

[`CelestialMarkerWidgetOptions`](../interfaces/CelestialMarkerWidgetOptions.md) = `{}`

#### Returns

`CelestialMarkerWidget`

#### Overrides

[`MarkerWidget`](MarkerWidget.md).[`constructor`](MarkerWidget.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`engine`](MarkerWidget.md#engine)

***

### id?

> `optional` **id?**: `string`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`id`](MarkerWidget.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

Whether the current Widget has been destroyed.
The collection manager uses it to avoid destroyed singleton instances.

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`isDestroyed`](MarkerWidget.md#isdestroyed)

***

### key

> **key**: `string` = `"daisy.celestial-marker"`

Widget identification key (for singleton deduplication).

#### Overrides

[`MarkerWidget`](MarkerWidget.md).[`key`](MarkerWidget.md#key)

***

### name?

> `optional` **name?**: `string`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`name`](MarkerWidget.md#name)

***

### rebuildOnMorph

> **rebuildOnMorph**: `boolean` = `false`

Whether destroy -> register rebuild is needed when scene morphs (2D/3D).
Default true; UI class widgets should usually be set to false.

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`rebuildOnMorph`](MarkerWidget.md#rebuildonmorph)

***

### singleton

> **singleton**: `boolean` = `true`

Whether it is a singleton widget.
- If true, only one instance with the same key is allowed within the Engine.

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`singleton`](MarkerWidget.md#singleton)

***

### zoomIgnored

> **zoomIgnored**: `boolean` = `true`

Whether to ignore during camera aggregation observation.
UI controller class widgets should be set to true.

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`zoomIgnored`](MarkerWidget.md#zoomignored)

## Methods

### createIn2d()

> **createIn2d**(`_`): `void`

Create Widget resources in 2D mode.
Subclasses should override this method to implement 2D-specific initialization logic (e.g., adding Billboards, Labels, etc.).

#### Parameters

##### \_

[`Engine`](Engine.md)

Engine instance

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`createIn2d`](MarkerWidget.md#createin2d)

***

### destroy()

> **destroy**(): `void`

Destroy the Widget, release resources and unbind events.
Removes morph switch listener and marks the instance as destroyed.

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`destroy`](MarkerWidget.md#destroy)

***

### is3d()

> **is3d**(): `boolean`

Determine whether the current scene is in 3D mode.

#### Returns

`boolean`

Returns true if in 3D mode, false otherwise

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`is3d`](MarkerWidget.md#is3d)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`_`): `void`

Scene mode switch handling.
Triggered by the engine callback when the scene switches between 2D/3D; subclasses can override to implement adaptive logic.

#### Parameters

##### \_

`SceneMode`

Scene mode after switch

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`morphSwitchHandle`](MarkerWidget.md#morphswitchhandle)

***

### offMorphSwitch()

> **offMorphSwitch**(`callback`): `void`

Remove scene mode switch listener.

#### Parameters

##### callback

(`mode`) => `void`

Callback function to remove

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`offMorphSwitch`](MarkerWidget.md#offmorphswitch)

***

### onMorphSwitch()

> **onMorphSwitch**(`callback`): `void`

Register scene mode switch listener.

#### Parameters

##### callback

(`mode`) => `void`

Callback function for scene switch

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`onMorphSwitch`](MarkerWidget.md#onmorphswitch)

***

### refresh()

> **refresh**(): `void`

Synchronous refresh entry after external configuration changes.

Subclasses can override this method to refresh DOM, Canvas, or cached state.

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`refresh`](MarkerWidget.md#refresh)

***

### register()

> **register**(`engine`): `this`

Register the Widget to the engine, complete initialization binding.
Mounts the current instance to the specified Engine, resets the destroyed flag, and listens for scene morph events.
If currently in 2D mode, immediately calls createIn2d to complete 2D resource creation.

#### Parameters

##### engine

[`Engine`](Engine.md)

Target engine instance

#### Returns

`this`

Current Widget instance (supports chaining)

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`register`](MarkerWidget.md#register)

***

### update()

> **update**(`time`): `void`

Per-frame update callback.
Subclasses should override this method to implement frame-by-frame driving logic (e.g., position interpolation, state synchronization, etc.).

#### Parameters

##### time

`JulianDate`

#### Returns

`void`

#### Inherited from

[`MarkerWidget`](MarkerWidget.md).[`update`](MarkerWidget.md#update)
