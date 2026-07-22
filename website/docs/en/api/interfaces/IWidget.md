[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / IWidget

# Interface: IWidget

Daisy unified Widget lifecycle interface.

- register: Bind to Engine and complete resource creation within it
- createIn2d: Execute creation logic once when entering 2D mode
- update: Called on each simulation frame (optional implementation)
- refresh: Synchronously refresh UI after external configuration changes (optional implementation)
- morphSwitchHandle: Respond to scene switches
- destroy: Release resources, unbind listeners and DOM

## Extended by

- [`ILayer`](ILayer.md)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](../classes/Engine.md)

***

### id?

> `optional` **id?**: `string`

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean`

Whether the current Widget has been destroyed.
The collection manager uses it to avoid destroyed singleton instances.

***

### key?

> `optional` **key?**: `string`

Widget identification key (for singleton deduplication).

***

### name?

> `optional` **name?**: `string`

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean`

Whether destroy -> register rebuild is needed when scene morphs (2D/3D).
Default true; UI class widgets should usually be set to false.

***

### singleton?

> `optional` **singleton?**: `boolean`

Whether it is a singleton widget.
- If true, only one instance with the same key is allowed within the Engine.

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean`

Whether to ignore during camera aggregation observation.
UI controller class widgets should be set to true.

## Methods

### createIn2d()

> **createIn2d**(`engine`): `void`

Create Widget resources in 2D mode.

#### Parameters

##### engine

[`Engine`](../classes/Engine.md)

Engine instance

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Destroy the Widget, release resources and unbind events.

#### Returns

`void`

***

### getBoundingSphere()?

> `optional` **getBoundingSphere**(`time?`): `BoundingSphere` \| `undefined`

Get the Widget's bounding sphere (for camera aggregation observation).

#### Parameters

##### time?

`JulianDate`

Simulation time (optional)

#### Returns

`BoundingSphere` \| `undefined`

Bounding sphere instance, returns undefined if none

***

### morphSwitchHandle()

> **morphSwitchHandle**(`mode`): `void`

Scene mode switch handling callback.

#### Parameters

##### mode

`SceneMode`

Scene mode after switch

#### Returns

`void`

***

### refresh()?

> `optional` **refresh**(): `void`

Synchronously refresh Widget after external configuration changes.

For example, when Engine-level time format changes, UI Widgets can repaint titles, ticks, and current time here.

#### Returns

`void`

***

### register()

> **register**(`engine`): `IWidget`

Register the Widget to the engine, complete initialization binding and resource creation.

#### Parameters

##### engine

[`Engine`](../classes/Engine.md)

Target engine instance

#### Returns

`IWidget`

Current Widget instance

***

### update()

> **update**(`time`): `void`

Per-frame update callback.

#### Parameters

##### time

`JulianDate`

Current simulation time (JulianDate)

#### Returns

`void`
