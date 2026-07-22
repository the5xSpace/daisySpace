[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / NightTileLayer

# Class: NightTileLayer

Tile layer shown only on the night side of the Earth.

## Remarks

- Usable in both 2D and 3D modes.
- The layer only removes imagery it created itself; it does not clear other base maps or overlays.
- Safe to repeatedly destroy and re-register when switching scene modes.

## Example

```ts
const nightTiles = engine.addWidget(new Daisy.NightTileLayer());
// 默认使用 Daisy 内置离线夜景瓦片。
```

## Extends

- [`Layer`](Layer.md)

## Constructors

### Constructor

> **new NightTileLayer**(`options?`): `NightTileLayer`

#### Parameters

##### options?

[`NightTileLayerOptions`](../interfaces/NightTileLayerOptions.md) = `{}`

#### Returns

`NightTileLayer`

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

### key

> `readonly` **key**: `"daisy-night-tile-layer"` = `"daisy-night-tile-layer"`

Widget identity key (for singleton deduplication).

#### Overrides

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

Whether to rebuild via destroy -> register on scene morph (2D/3D).
Default true; UI-type widgets should generally be set to false.

#### Inherited from

[`Layer`](Layer.md).[`rebuildOnMorph`](Layer.md#rebuildonmorph)

***

### singleton

> `readonly` **singleton**: `true` = `true`

Whether it is a singleton widget.
- If true, only one instance with the same key is allowed in the Engine.

#### Overrides

[`Layer`](Layer.md).[`singleton`](Layer.md#singleton)

***

### zoomIgnored?

> `optional` **zoomIgnored?**: `boolean` = `false`

Whether to ignore when the camera aggregates observation.
UI controller-type widgets should be set to true.

#### Inherited from

[`Layer`](Layer.md).[`zoomIgnored`](Layer.md#zoomignored)

## Accessors

### show

#### Get Signature

> **get** **show**(): `boolean`

Whether to show the night tile.

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

Create the layer in 2D space.

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

Destroy the layer.

#### Returns

`void`

#### Overrides

[`Layer`](Layer.md).[`destroy`](Layer.md#destroy)

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

> **morphSwitchHandle**(`_`): `void`

Handle scene mode switching events.

#### Parameters

##### \_

`SceneMode`

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

***

### unregister()

> **unregister**(): `void`

Unregister and release the imagery resources owned by the current instance.

#### Returns

`void`

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
