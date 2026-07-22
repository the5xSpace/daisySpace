[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / Layer

# Class: Layer

Daisy unified Widget lifecycle interface.

- register: Bind to Engine and complete resource creation within it
- createIn2d: Execute creation logic once when entering 2D mode
- update: Called on each simulation frame (optional implementation)
- refresh: Synchronously refresh UI after external configuration changes (optional implementation)
- morphSwitchHandle: Respond to scene switches
- destroy: Release resources, unbind listeners and DOM

## Extends

- [`Widget`](Widget.md)

## Extended by

- [`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md)
- [`CelestialSphereGridLayers`](CelestialSphereGridLayers.md)
- [`SunConeLayer`](SunConeLayer.md)
- [`NightTileLayer`](NightTileLayer.md)
- [`PlaneLayer`](Plane.PlaneLayer.md)

## Implements

- [`ILayer`](../interfaces/ILayer.md)

## Constructors

### Constructor

> **new Layer**(`options`): `Layer`

Constructor.

#### Parameters

##### options

`any`

Layer options.

#### Returns

`Layer`

#### Overrides

[`Widget`](Widget.md).[`constructor`](Widget.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

Engine instance.

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`engine`](../interfaces/ILayer.md#engine)

#### Inherited from

[`Widget`](Widget.md).[`engine`](Widget.md#engine)

***

### id?

> `optional` **id?**: `string`

Layer unique identifier.

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`id`](../interfaces/ILayer.md#id)

#### Overrides

[`Widget`](Widget.md).[`id`](Widget.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

Whether the current Widget has been destroyed.
The collection manager uses it to avoid destroyed singleton instances.

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`isDestroyed`](../interfaces/ILayer.md#isdestroyed)

#### Inherited from

[`Widget`](Widget.md).[`isDestroyed`](Widget.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget identification key (for singleton deduplication).

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`key`](../interfaces/ILayer.md#key)

#### Inherited from

[`Widget`](Widget.md).[`key`](Widget.md#key)

***

### name?

> `optional` **name?**: `string`

Layer name.

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`name`](../interfaces/ILayer.md#name)

#### Overrides

[`Widget`](Widget.md).[`name`](Widget.md#name)

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean` = `true`

Whether destroy -> register rebuild is needed when scene morphs (2D/3D).
Default true; UI class widgets should usually be set to false.

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`rebuildOnMorph`](../interfaces/ILayer.md#rebuildonmorph)

#### Inherited from

[`Widget`](Widget.md).[`rebuildOnMorph`](Widget.md#rebuildonmorph)

***

### singleton?

> `optional` **singleton?**: `boolean`

Whether it is a singleton widget.
- If true, only one instance with the same key is allowed within the Engine.

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`singleton`](../interfaces/ILayer.md#singleton)

#### Inherited from

[`Widget`](Widget.md).[`singleton`](Widget.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

Whether to ignore during camera aggregation observation.
UI controller class widgets should be set to true.

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`zoomIgnored`](../interfaces/ILayer.md#zoomignored)

#### Inherited from

[`Widget`](Widget.md).[`zoomIgnored`](Widget.md#zoomignored)

## Methods

### createIn2d()

> **createIn2d**(`engine`): `void`

Create layer in 2D space.

#### Parameters

##### engine

[`Engine`](Engine.md)

Engine instance.

#### Returns

`void`

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`createIn2d`](../interfaces/ILayer.md#createin2d)

#### Overrides

[`Widget`](Widget.md).[`createIn2d`](Widget.md#createin2d)

***

### destroy()

> **destroy**(): `void`

Destroy the layer.

#### Returns

`void`

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`destroy`](../interfaces/ILayer.md#destroy)

#### Overrides

[`Widget`](Widget.md).[`destroy`](Widget.md#destroy)

***

### is3d()

> **is3d**(): `boolean`

Determine whether it is 3D mode

#### Returns

`boolean`

#### Overrides

[`Widget`](Widget.md).[`is3d`](Widget.md#is3d)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`mode`): `void`

Handle scene mode switch events.

#### Parameters

##### mode

`SceneMode`

Current scene mode.

#### Returns

`void`

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`morphSwitchHandle`](../interfaces/ILayer.md#morphswitchhandle)

#### Overrides

[`Widget`](Widget.md).[`morphSwitchHandle`](Widget.md#morphswitchhandle)

***

### refresh()

> **refresh**(): `void`

Synchronous refresh entry after external configuration changes.

Subclasses can override this method to refresh DOM, Canvas, or cached state.

#### Returns

`void`

#### Implementation of

[`ILayer`](../interfaces/ILayer.md).[`refresh`](../interfaces/ILayer.md#refresh)

#### Inherited from

[`Widget`](Widget.md).[`refresh`](Widget.md#refresh)

## Events

### offMorphSwitch()

> **offMorphSwitch**(`callback`): `void`

Remove morph switch event listener

#### Parameters

##### callback

(`mode`) => `void`

MORPH_SWITCH

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`offMorphSwitch`](Widget.md#offmorphswitch)

***

### onMorphSwitch()

> **onMorphSwitch**(`callback`): `void`

Listen for morph switch events

#### Parameters

##### callback

(`mode`) => `void`

MORPH_SWITCH

#### Returns

`void`

#### Overrides

[`Widget`](Widget.md).[`onMorphSwitch`](Widget.md#onmorphswitch)
