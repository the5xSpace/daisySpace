[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ILayer

# Interface: ILayer

Daisy's unified Widget lifecycle interface.

- register: bind to an Engine and create resources within it
- createIn2d: run creation logic once when entering 2D mode
- update: called on each simulation frame (optional implementation)
- refresh: synchronize and refresh the UI after external configuration changes (optional implementation)
- morphSwitchHandle: respond to scene-mode changes
- destroy: release resources and detach listeners and DOM elements

## Extends

- [`IWidget`](IWidget.md)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](../classes/Engine.md)

Engine instance.

#### Overrides

[`IWidget`](IWidget.md).[`engine`](IWidget.md#engine)

***

### id?

> `optional` **id?**: `string`

Unique layer identifier.

#### Overrides

[`IWidget`](IWidget.md).[`id`](IWidget.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean`

Whether the current Widget has been destroyed.
The collection manager uses this to skip destroyed singleton instances.

#### Inherited from

[`IWidget`](IWidget.md).[`isDestroyed`](IWidget.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget key (used for singleton deduplication).

#### Inherited from

[`IWidget`](IWidget.md).[`key`](IWidget.md#key)

***

### name?

> `optional` **name?**: `string`

Layer name.

#### Overrides

[`IWidget`](IWidget.md).[`name`](IWidget.md#name)

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean`

Whether to rebuild through destroy -> register during scene morphing (2D/3D).
Defaults to true; UI Widgets should generally set this to false.

#### Inherited from

[`IWidget`](IWidget.md).[`rebuildOnMorph`](IWidget.md#rebuildonmorph)

***

### singleton?

> `optional` **singleton?**: `boolean`

Whether this is a singleton Widget.
- If true, only one instance with the same key is allowed within an Engine.

#### Inherited from

[`IWidget`](IWidget.md).[`singleton`](IWidget.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean`

Whether to ignore this Widget during camera aggregation.
UI controller Widgets should set this to true.

#### Inherited from

[`IWidget`](IWidget.md).[`zoomIgnored`](IWidget.md#zoomignored)

## Methods

### createIn2d()

> **createIn2d**(`engine`): `void`

Creates the layer in 2D space.

#### Parameters

##### engine

[`Engine`](../classes/Engine.md)

Engine instance.

#### Returns

`void`

#### Overrides

[`IWidget`](IWidget.md).[`createIn2d`](IWidget.md#createin2d)

***

### destroy()

> **destroy**(): `void`

Destroys the layer.

#### Returns

`void`

#### Overrides

[`IWidget`](IWidget.md).[`destroy`](IWidget.md#destroy)

***

### getBoundingSphere()?

> `optional` **getBoundingSphere**(`time?`): `BoundingSphere` \| `undefined`

Gets the Widget's bounding sphere for camera aggregation.

#### Parameters

##### time?

`JulianDate`

Simulation time (optional)

#### Returns

`BoundingSphere` \| `undefined`

Bounding-sphere instance, or undefined when unavailable

#### Inherited from

[`IWidget`](IWidget.md).[`getBoundingSphere`](IWidget.md#getboundingsphere)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`mode`): `void`

Handles a scene-mode change event.

#### Parameters

##### mode

`SceneMode`

Current scene mode.

#### Returns

`void`

#### Overrides

[`IWidget`](IWidget.md).[`morphSwitchHandle`](IWidget.md#morphswitchhandle)

***

### refresh()?

> `optional` **refresh**(): `void`

Synchronizes and refreshes the Widget after external configuration changes.

For example, when the Engine-level time format changes, a UI Widget can redraw the title, ticks, and current time here.

#### Returns

`void`

#### Inherited from

[`IWidget`](IWidget.md).[`refresh`](IWidget.md#refresh)

***

### register()

> **register**(`engine`): [`Layer`](../classes/Layer.md)

Registers the layer with the Engine.

#### Parameters

##### engine

[`Engine`](../classes/Engine.md)

Engine instance.

#### Returns

[`Layer`](../classes/Layer.md)

Registered layer instance.

#### Overrides

[`IWidget`](IWidget.md).[`register`](IWidget.md#register)

***

### update()

> **update**(`time`): `void`

Updates layer data.

#### Parameters

##### time

`JulianDate`

Current time in JulianDate format.

#### Returns

`void`

#### Overrides

[`IWidget`](IWidget.md).[`update`](IWidget.md#update)
