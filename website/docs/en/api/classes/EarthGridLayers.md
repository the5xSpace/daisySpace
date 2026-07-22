[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EarthGridLayers

# Class: EarthGridLayers

Earth Wgs84 geodetic grid

## Extends

- [`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md)

## Constructors

### Constructor

> **new EarthGridLayers**(`options`): `EarthGridLayers`

#### Parameters

##### options

[`earthGridOptions`](../interfaces/earthGridOptions.md)

#### Returns

`EarthGridLayers`

#### Overrides

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`constructor`](CelestialGeodeticGridLayers.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

Engine instance.

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`engine`](CelestialGeodeticGridLayers.md#engine)

***

### id?

> `optional` **id?**: `string`

Layer unique identifier.

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`id`](CelestialGeodeticGridLayers.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

Whether the current Widget has been destroyed.
Used by the collection manager to avoid already-destroyed singleton instances.

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`isDestroyed`](CelestialGeodeticGridLayers.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget identity key (for singleton deduplication).

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`key`](CelestialGeodeticGridLayers.md#key)

***

### name?

> `optional` **name?**: `string`

Layer name.

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`name`](CelestialGeodeticGridLayers.md#name)

***

### primitive

> **primitive**: `SafePrimitive` \| `null` = `null`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`primitive`](CelestialGeodeticGridLayers.md#primitive)

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean` = `true`

Whether to rebuild via destroy -> register on scene morph (2D/3D).
Default true; UI-type widgets should generally be set to false.

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`rebuildOnMorph`](CelestialGeodeticGridLayers.md#rebuildonmorph)

***

### singleton?

> `optional` **singleton?**: `boolean`

Whether it is a singleton widget.
- If true, only one instance with the same key is allowed in the Engine.

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`singleton`](CelestialGeodeticGridLayers.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

Whether to ignore when the camera aggregates observation.
UI controller-type widgets should be set to true.

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`zoomIgnored`](CelestialGeodeticGridLayers.md#zoomignored)

## Accessors

### options

#### Get Signature

> **get** **options**(): [`CelestialGeodeticGridOptions`](../interfaces/CelestialGeodeticGridOptions.md)

##### Returns

[`CelestialGeodeticGridOptions`](../interfaces/CelestialGeodeticGridOptions.md)

#### Set Signature

> **set** **options**(`options`): `void`

##### Parameters

###### options

[`CelestialGeodeticGridOptions`](../interfaces/CelestialGeodeticGridOptions.md)

##### Returns

`void`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`options`](CelestialGeodeticGridLayers.md#options)

***

### suppressShow

#### Get Signature

> **get** **suppressShow**(): `boolean`

##### Returns

`boolean`

#### Set Signature

> **set** **suppressShow**(`value`): `void`

Temporarily hide the grid (e.g. during camera transitions), does not affect options.show configuration

##### Parameters

###### value

`boolean`

##### Returns

`void`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`suppressShow`](CelestialGeodeticGridLayers.md#suppressshow)

## Methods

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

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`createIn2d`](CelestialGeodeticGridLayers.md#createin2d)

***

### destroy()

> **destroy**(): `void`

Destroy the layer.

#### Returns

`void`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`destroy`](CelestialGeodeticGridLayers.md#destroy)

***

### getBoundingSphere()

> **getBoundingSphere**(`time?`): `BoundingSphere` \| `undefined`

#### Parameters

##### time?

`JulianDate`

#### Returns

`BoundingSphere` \| `undefined`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`getBoundingSphere`](CelestialGeodeticGridLayers.md#getboundingsphere)

***

### is3d()

> **is3d**(): `boolean`

Determine whether it is 3D mode

#### Returns

`boolean`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`is3d`](CelestialGeodeticGridLayers.md#is3d)

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

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`morphSwitchHandle`](CelestialGeodeticGridLayers.md#morphswitchhandle)

***

### refresh()

> **refresh**(): `void`

Entry point for syncing refresh after external configuration changes.

Subclasses can override this method to refresh DOM, Canvas or cached state.

#### Returns

`void`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`refresh`](CelestialGeodeticGridLayers.md#refresh)

***

### setCelestialEllipsoid()

> **setCelestialEllipsoid**(`celestialEllipsoid`): `void`

#### Parameters

##### celestialEllipsoid

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

#### Returns

`void`

#### Inherited from

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`setCelestialEllipsoid`](CelestialGeodeticGridLayers.md#setcelestialellipsoid)

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

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`offMorphSwitch`](CelestialGeodeticGridLayers.md#offmorphswitch)

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

[`CelestialGeodeticGridLayers`](CelestialGeodeticGridLayers.md).[`onMorphSwitch`](CelestialGeodeticGridLayers.md#onmorphswitch)
