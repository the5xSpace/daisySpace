[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Plane](../modules/Plane.md) / EquatorialPlaneLayers

# Class: EquatorialPlaneLayers

Equatorial plane.

## Extends

- [`PlaneLayer`](Plane.PlaneLayer.md)\<[`EquatorialPlaneOptions`](../interfaces/Plane.EquatorialPlaneOptions.md)\>

## Constructors

### Constructor

> **new EquatorialPlaneLayers**(`options`): `EquatorialPlaneLayers`

Draws an equatorial plane.

#### Parameters

##### options

[`EquatorialPlaneOptions`](../interfaces/Plane.EquatorialPlaneOptions.md)

#### Returns

`EquatorialPlaneLayers`

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
The collection manager uses this to skip destroyed singleton instances.

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`isDestroyed`](Plane.PlaneLayer.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget key (used for singleton deduplication).

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`key`](Plane.PlaneLayer.md#key)

***

### label

> **label**: `Label` \| `undefined`

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

Whether to rebuild through destroy -> register during scene morphing (2D/3D).
Defaults to true; UI Widgets should generally set this to false.

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

Whether this is a singleton Widget.
- If true, only one instance with the same key is allowed within an Engine.

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`singleton`](Plane.PlaneLayer.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

Whether to ignore this Widget during camera aggregation.
UI controller Widgets should set this to true.

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`zoomIgnored`](Plane.PlaneLayer.md#zoomignored)

## Accessors

### options

#### Get Signature

> **get** **options**(): [`EquatorialPlaneOptions`](../interfaces/Plane.EquatorialPlaneOptions.md)

##### Returns

[`EquatorialPlaneOptions`](../interfaces/Plane.EquatorialPlaneOptions.md)

#### Set Signature

> **set** **options**(`options`): `void`

##### Parameters

###### options

[`EquatorialPlaneOptions`](../interfaces/Plane.EquatorialPlaneOptions.md)

##### Returns

`void`

#### Overrides

[`PlaneLayer`](Plane.PlaneLayer.md).[`options`](Plane.PlaneLayer.md#options)

## Methods

### createIn2d()

> **createIn2d**(`engine`): `void`

Creates the layer in 2D space.

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

Destroys the component; manual invocation is usually unnecessary.

#### Returns

`void`

#### Overrides

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

Checks whether the current mode is 3D.

#### Returns

`boolean`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`is3d`](Plane.PlaneLayer.md#is3d)

***

### refresh()

> **refresh**(): `void`

Entry point for synchronized refreshes after external configuration changes.

Subclasses can override this method to refresh the DOM, Canvas, or cached state.

#### Returns

`void`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`refresh`](Plane.PlaneLayer.md#refresh)

## Events

### offMorphSwitch()

> **offMorphSwitch**(`callback`): `void`

Removes the projection-switch event listener.

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

Listens for projection-switch events.

#### Parameters

##### callback

(`mode`) => `void`

MORPH_SWITCH

#### Returns

`void`

#### Inherited from

[`PlaneLayer`](Plane.PlaneLayer.md).[`onMorphSwitch`](Plane.PlaneLayer.md#onmorphswitch)
