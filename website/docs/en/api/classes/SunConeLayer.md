[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / SunConeLayer

# Class: SunConeLayer

Displays the spatial extent of the umbra and penumbra behind an occluding body relative to the light source.

## Remarks

The light cone is displayed only in 3D mode; spatial rendering resources are released when switching to 2D and rebuilt when returning to 3D.
`visualLengthScale` changes only the visual length, while `getOcclusionState()` always uses the body's actual size for classification.

## Example

```ts
const sunCone = engine.addWidget(new Daisy.SunConeLayer({
 showUmbra: true,
 showPenumbra: true,
 visualLengthScale: 0.05,
}));
const position = spacecraft.getCurrentPosition();
if (position) {
 const state = sunCone.getOcclusionState(position);
}
```

## Extends

- [`Layer`](Layer.md)

## Constructors

### Constructor

> **new SunConeLayer**(`options?`): `SunConeLayer`

Creates the light-cone layer and validates the display, segmentation, and update-interval options.

#### Parameters

##### options?

[`SunConeLayerOptions`](../interfaces/SunConeLayerOptions.md) = `{}`

#### Returns

`SunConeLayer`

#### Overrides

[`Layer`](Layer.md).[`constructor`](Layer.md#constructor)

## Properties

### engine?

> `optional` **engine?**: [`Engine`](Engine.md)

The engine instance.

#### Inherited from

[`Layer`](Layer.md).[`engine`](Layer.md#engine)

***

### id?

> `optional` **id?**: `string`

Unique layer identifier.

#### Inherited from

[`Layer`](Layer.md).[`id`](Layer.md#id)

***

### isDestroyed?

> `optional` **isDestroyed?**: `boolean` = `false`

Whether the current Widget has been destroyed.
The collection manager uses this to avoid destroyed singleton instances.

#### Inherited from

[`Layer`](Layer.md).[`isDestroyed`](Layer.md#isdestroyed)

***

### key?

> `optional` **key?**: `string`

Widget identifier key, used for singleton deduplication.

#### Inherited from

[`Layer`](Layer.md).[`key`](Layer.md#key)

***

### name?

> `optional` **name?**: `string`

Layer name.

#### Inherited from

[`Layer`](Layer.md).[`name`](Layer.md#name)

***

### rebuildOnMorph?

> `optional` **rebuildOnMorph?**: `boolean` = `true`

Whether to rebuild with destroy -> register when the scene morphs (2D/3D).
The default is true; UI widgets should usually set this to false.

#### Inherited from

[`Layer`](Layer.md).[`rebuildOnMorph`](Layer.md#rebuildonmorph)

***

### singleton?

> `optional` **singleton?**: `boolean`

Whether this is a singleton widget.
- If true, only one instance with the same key can exist in the Engine.

#### Inherited from

[`Layer`](Layer.md).[`singleton`](Layer.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

Whether to ignore this widget during camera aggregate observation.
UI controller widgets should set this to true.

#### Inherited from

[`Layer`](Layer.md).[`zoomIgnored`](Layer.md#zoomignored)

## Accessors

### show

#### Get Signature

> **get** **show**(): `boolean`

Whether to display the light cone; changes immediately update existing spatial rendering resources.

##### Returns

`boolean`

#### Set Signature

> **set** **show**(`value`): `void`

##### Parameters

###### value

`boolean`

##### Returns

`void`

## Methods

### createIn2d()

> **createIn2d**(`_`): `void`

Releases 3D spatial rendering resources when entering 2D mode.

#### Parameters

##### \_

[`Engine`](Engine.md)

#### Returns

`void`

#### Overrides

[`Layer`](Layer.md).[`createIn2d`](Layer.md#createin2d)

***

### destroy()

> **destroy**(): `void`

Destroys and unregisters the layer.

#### Returns

`void`

#### Overrides

[`Layer`](Layer.md).[`destroy`](Layer.md#destroy)

***

### getBoundingSphere()

> **getBoundingSphere**(): `BoundingSphere` \| `undefined`

Gets the bounding sphere of the currently visible light cone; returns `undefined` when it is hidden or the scene is not in 3D mode.

#### Returns

`BoundingSphere` \| `undefined`

***

### getOcclusionState()

> **getOcclusionState**(`observer`, `time?`): [`SunOcclusionState`](../types/SunOcclusionState.md)

Determines whether a world-coordinate point is in the lit region, umbra, or penumbra.

#### Parameters

##### observer

`Cartesian3`

World coordinates of the point to classify.

##### time?

`JulianDate`

Time at which to classify the point; when omitted, the engine's current time is used first.

#### Returns

[`SunOcclusionState`](../types/SunOcclusionState.md)

***

### is3d()

> **is3d**(): `boolean`

Determines whether the scene is in 3D mode.

#### Returns

`boolean`

#### Inherited from

[`Layer`](Layer.md).[`is3d`](Layer.md#is3d)

***

### morphSwitchHandle()

> **morphSwitchHandle**(`mode`): `void`

Releases the light cone's spatial rendering resources when leaving 3D mode.

#### Parameters

##### mode

`SceneMode`

#### Returns

`void`

#### Overrides

[`Layer`](Layer.md).[`morphSwitchHandle`](Layer.md#morphswitchhandle)

***

### refresh()

> **refresh**(): `void`

Ignores the update interval and immediately rebuilds the light cone using the engine's current time.

#### Returns

`void`

#### Overrides

[`Layer`](Layer.md).[`refresh`](Layer.md#refresh)

***

### register()

> **register**(`engine`): `SunConeLayer`

Registers the layer with the engine; immediately creates the umbra and penumbra in 3D mode.

#### Parameters

##### engine

[`Engine`](Engine.md)

#### Returns

`SunConeLayer`

#### Overrides

`Layer.register`

***

### unregister()

> **unregister**(): `void`

Unregisters the layer and releases its current spatial rendering resources.

#### Returns

`void`

***

### update()

> **update**(`time`): `void`

Refreshes the light-cone shape according to the simulation time and configured minimum update interval.

#### Parameters

##### time

`JulianDate`

#### Returns

`void`

#### Overrides

`Layer.update`

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

[`Layer`](Layer.md).[`offMorphSwitch`](Layer.md#offmorphswitch)

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

[`Layer`](Layer.md).[`onMorphSwitch`](Layer.md#onmorphswitch)
