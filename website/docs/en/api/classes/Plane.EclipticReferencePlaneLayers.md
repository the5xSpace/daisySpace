[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Plane](../modules/Plane.md) / EclipticReferencePlaneLayers

# Class: EclipticReferencePlaneLayers

Ecliptic reference plane.

Notes:
- Uses the normal direction corresponding to the ecliptic plane
- Origin at the Earth's center
- Displayed as a large rectangular grid for easy observation of Earth-Sun relationship

## Extends

- [`PlaneLayer`](Plane.PlaneLayer.md)\<[`EclipticReferencePlaneOptions`](../interfaces/Plane.EclipticReferencePlaneOptions.md)\>

## Constructors

### Constructor

> **new EclipticReferencePlaneLayers**(`options`): `EclipticReferencePlaneLayers`

#### Parameters

##### options

[`EclipticReferencePlaneOptions`](../interfaces/Plane.EclipticReferencePlaneOptions.md)

#### Returns

`EclipticReferencePlaneLayers`

#### Overrides

[`PlaneLayer`](Plane.PlaneLayer.md).[`constructor`](Plane.PlaneLayer.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

Engine instance.

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`engine`](Plane.PlaneLayer.md#engine)

***

### gridStyle

> **gridStyle**: [`PlaneGridStyle`](../types/Plane.PlaneGridStyle.md)

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`gridStyle`](Plane.PlaneLayer.md#gridstyle)

***

### id?

> `optional` **id?**: `string`

Unique layer identifier.

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`id`](Plane.PlaneLayer.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

Whether the current Widget has been destroyed.
The collection manager uses this to avoid destroyed singleton instances.

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`isDestroyed`](Plane.PlaneLayer.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget identifier key (for singleton deduplication).

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`key`](Plane.PlaneLayer.md#key)

***

### name?

> `optional` **name?**: `string`

Layer name.

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`name`](Plane.PlaneLayer.md#name)

***

### primitive

> **primitive**: `SafePrimitive` \| `undefined`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`primitive`](Plane.PlaneLayer.md#primitive)

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean` = `true`

Whether a destroy -> register rebuild is needed when the scene morphs (2D/3D).
Default true; UI-type widgets should generally be set to false.

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`rebuildOnMorph`](Plane.PlaneLayer.md#rebuildonmorph)

***

### referenceRadius

> **referenceRadius**: `number` = `1.0`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`referenceRadius`](Plane.PlaneLayer.md#referenceradius)

***

### singleton?

> `optional` **singleton?**: `boolean`

Whether it is a singleton widget.
- If true, only one instance with the same key is allowed in the Engine.

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`singleton`](Plane.PlaneLayer.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

Whether to ignore during camera aggregation observation.
UI controller-type widgets should be set to true.

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`zoomIgnored`](Plane.PlaneLayer.md#zoomignored)

## Accessors

### options

#### Get Signature

> **get** **options**(): [`EclipticReferencePlaneOptions`](../interfaces/Plane.EclipticReferencePlaneOptions.md)

##### Returns

[`EclipticReferencePlaneOptions`](../interfaces/Plane.EclipticReferencePlaneOptions.md)

#### Set Signature

> **set** **options**(`options`): `void`

##### Parameters

###### options

[`EclipticReferencePlaneOptions`](../interfaces/Plane.EclipticReferencePlaneOptions.md)

##### Returns

`void`

#### Overrides

[`PlaneLayer`](Plane.PlaneLayer.md).[`options`](Plane.PlaneLayer.md#options)

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

[`PlaneLayer`](Plane.PlaneLayer.md).[`createIn2d`](Plane.PlaneLayer.md#createin2d)

***

### destroy()

> **destroy**(): `void`

Destroy the layer.

#### Returns

`void`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`destroy`](Plane.PlaneLayer.md#destroy)

***

### getBoundingSphere()

> **getBoundingSphere**(`time?`): `BoundingSphere` \| `undefined`

#### Parameters

##### time?

`JulianDate`

#### Returns

`BoundingSphere` \| `undefined`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`getBoundingSphere`](Plane.PlaneLayer.md#getboundingsphere)

***

### is3d()

> **is3d**(): `boolean`

Check whether it is in 3D mode

#### Returns

`boolean`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`is3d`](Plane.PlaneLayer.md#is3d)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`_mode`): `void`

Handle scene mode switch events.

#### Parameters

##### \_mode

`SceneMode`

#### Returns

`void`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`morphSwitchHandle`](Plane.PlaneLayer.md#morphswitchhandle)

***

### refresh()

> **refresh**(): `void`

Synchronization refresh entry point after external configuration changes.

Subclasses can override this method to refresh DOM, Canvas, or cached state.

#### Returns

`void`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`refresh`](Plane.PlaneLayer.md#refresh)

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

[`PlaneLayer`](Plane.PlaneLayer.md).[`offMorphSwitch`](Plane.PlaneLayer.md#offmorphswitch)

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

[`PlaneLayer`](Plane.PlaneLayer.md).[`onMorphSwitch`](Plane.PlaneLayer.md#onmorphswitch)
