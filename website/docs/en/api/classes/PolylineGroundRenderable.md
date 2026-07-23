[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolylineGroundRenderable

# Class: PolylineGroundRenderable

PolylineGroundRenderable is a polyline wrapper based on `viewer.collections.polylineCollection`.

This class creates, updates, and destroys polylines so application code does not need to manipulate Collection details directly.

## Example

```ts
const renderable = new PolylineGroundRenderable(viewer, {
 positions,
 clampToGround: true,
});

renderable.updatePositions(nextPositions);
renderable.destroy();
```

## Constructors

### Constructor

> **new PolylineGroundRenderable**(`viewer`, `options?`): `PolylineGroundRenderable`

Creates a polyline and immediately adds it to `viewer.collections.polylineCollection`.

#### Parameters

##### viewer

[`Engine`](Engine.md)

Daisy SDK Engine。

##### options?

[`PolylineGroundOptions`](../types/PolylineGroundOptions.md)

Polyline configuration options.

#### Returns

`PolylineGroundRenderable`

## Methods

### create()

> **create**(): `void`

Creates a Polyline and adds it to polylineCollection.

#### Returns

`void`

#### Remarks

When `clampToGround=true`, the `positions` are sampled and interpolated against the ground during creation.

***

### destroy()

> **destroy**(): `void`

Removes the polyline from `viewer.collections.polylineCollection` and releases the reference.

#### Returns

`void`

***

### setAlwaysOnTop()

> **setAlwaysOnTop**(`alwaysOnTop`): `void`

#### Parameters

##### alwaysOnTop

`boolean`

#### Returns

`void`

***

### setArcType()

> **setArcType**(`arcType`): `void`

#### Parameters

##### arcType

`ArcType` \| `undefined`

#### Returns

`void`

***

### setDepthFailMaterial()

> **setDepthFailMaterial**(`material`): `void`

#### Parameters

##### material

[`DMaterial`](../types/DMaterial.md) \| `undefined`

#### Returns

`void`

***

### setMaterial()

> **setMaterial**(`material`): `void`

#### Parameters

##### material

[`DMaterial`](../types/DMaterial.md)

#### Returns

`void`

***

### setShow()

> **setShow**(`show`): `void`

#### Parameters

##### show

`boolean`

#### Returns

`void`

***

### setWidth()

> **setWidth**(`width`): `void`

#### Parameters

##### width

`number`

#### Returns

`void`

***

### updatePositions()

> **updatePositions**(`positions`): `void`

Updates the polyline control points.

#### Parameters

##### positions

`Cartesian3`[]

New polyline control points in world coordinates.

#### Returns

`void`

#### Remarks

- When `clampToGround=true`, the ground-sampled point set is recalculated automatically.
