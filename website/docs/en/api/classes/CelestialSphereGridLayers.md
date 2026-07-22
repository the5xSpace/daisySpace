[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CelestialSphereGridLayers

# Class: CelestialSphereGridLayers

Daisy unified Widget lifecycle interface.


- register: bind to Engine and complete resource creation
- createIn2d: execute creation logic once when entering 2D mode
- update: called on each simulation frame (optional)
- refresh: sync UI after external config changes (optional)
- morphSwitchHandle: respond to scene switching
- destroy: release resources, unbind listeners and DOM

## Extends

- [`Layer`](Layer.md)

## Constructors

### Constructor

> **new CelestialSphereGridLayers**(`options`): `CelestialSphereGridLayers`

#### Parameters

##### options

[`CelestialSphereGridOptions`](../interfaces/CelestialSphereGridOptions.md)

#### Returns

`CelestialSphereGridLayers`

#### Overrides

[`Layer`](Layer.md).[`constructor`](Layer.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

Engine instance.

#### Inherited from

[`Layer`](Layer.md).[`engine`](Layer.md#engine)

***

### id?

> `optional` **id?**: `string`

Layer unique identifier.

#### Inherited from

[`Layer`](Layer.md).[`id`](Layer.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

Whether the current Widget has been destroyed.
Used by the collection manager to avoid already-destroyed singleton instances.

#### Inherited from

[`Layer`](Layer.md).[`isDestroyed`](Layer.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget identity key (for singleton deduplication).

#### Inherited from

[`Layer`](Layer.md).[`key`](Layer.md#key)

***

### name?

> `optional` **name?**: `string`

Layer name.

#### Inherited from

[`Layer`](Layer.md).[`name`](Layer.md#name)

***

### primitive

> **primitive**: `SafePrimitive` \| `null` = `null`

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean` = `true`

Whether to rebuild via destroy -> register on scene morph (2D/3D).
Default true; UI-type widgets should generally be set to false.

#### Inherited from

[`Layer`](Layer.md).[`rebuildOnMorph`](Layer.md#rebuildonmorph)

***

### singleton?

> `optional` **singleton?**: `boolean`

Whether it is a singleton widget.
- If true, only one instance with the same key is allowed in the Engine.

#### Inherited from

[`Layer`](Layer.md).[`singleton`](Layer.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

Whether to ignore when the camera aggregates observation.
UI controller-type widgets should be set to true.

#### Inherited from

[`Layer`](Layer.md).[`zoomIgnored`](Layer.md#zoomignored)

## Accessors

### options

#### Get Signature

> **get** **options**(): [`CelestialSphereGridOptions`](../interfaces/CelestialSphereGridOptions.md)

##### Returns

[`CelestialSphereGridOptions`](../interfaces/CelestialSphereGridOptions.md)

#### Set Signature

> **set** **options**(`options`): `void`

##### Parameters

###### options

[`CelestialSphereGridOptions`](../interfaces/CelestialSphereGridOptions.md)

##### Returns

`void`

## Methods

### calcGrid()

> **calcGrid**(`raStep?`, `decStep?`, `baseRadius?`): `object`

#### Parameters

##### raStep?

`number`

##### decStep?

`number`

##### baseRadius?

`number` = `...`

#### Returns

`object`

##### decs

> **decs**: `number`[]

##### lines

> **lines**: `Cartesian3`[][]

##### ras

> **ras**: `number`[]

***

### convertRaDecToCartesian()

> **convertRaDecToCartesian**(`raHours`, `decDegrees`, `radius`): `Cartesian3`

#### Parameters

##### raHours

`number`

##### decDegrees

`number`

##### radius

`number`

#### Returns

`Cartesian3`

***

### createIn2d()

> **createIn2d**(`engine`): `void`

Create the layer in 2D space.

#### Parameters

##### engine

[`Engine`](Engine.md)

Engine instance.

#### Returns

`void`

#### Inherited from

[`Layer`](Layer.md).[`createIn2d`](Layer.md#createin2d)

***

### destroy()

> **destroy**(): `void`

Destroy the layer.

#### Returns

`void`

#### Overrides

[`Layer`](Layer.md).[`destroy`](Layer.md#destroy)

***

### getBoundingSphere()

> **getBoundingSphere**(`_time?`): `BoundingSphere` \| `undefined`

#### Parameters

##### \_time?

`JulianDate`

#### Returns

`BoundingSphere` \| `undefined`

***

### is3d()

> **is3d**(): `boolean`

Determine whether it is 3D mode

#### Returns

`boolean`

#### Inherited from

[`Layer`](Layer.md).[`is3d`](Layer.md#is3d)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`mode`): `void`

Handle scene mode switching events.

#### Parameters

##### mode

`SceneMode`

Current scene mode.

#### Returns

`void`

#### Overrides

[`Layer`](Layer.md).[`morphSwitchHandle`](Layer.md#morphswitchhandle)

***

### refresh()

> **refresh**(): `void`

Entry point for syncing refresh after external configuration changes.

Subclasses can override this method to refresh DOM, Canvas or cached state.

#### Returns

`void`

#### Inherited from

[`Layer`](Layer.md).[`refresh`](Layer.md#refresh)

## Events

### offMorphSwitch()

> **offMorphSwitch**(`callback`): `void`

Remove projection switch event listener

#### Parameters

##### callback

(`mode`) => `void`

MORPH_SWITCH

#### Returns

`void`

#### Inherited from

[`Layer`](Layer.md).[`offMorphSwitch`](Layer.md#offmorphswitch)

***

### onMorphSwitch()

> **onMorphSwitch**(`callback`): `void`

Listen for projection switch events

#### Parameters

##### callback

(`mode`) => `void`

MORPH_SWITCH

#### Returns

`void`

#### Inherited from

[`Layer`](Layer.md).[`onMorphSwitch`](Layer.md#onmorphswitch)
