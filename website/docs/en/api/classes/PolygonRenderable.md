[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolygonRenderable

# Class: PolygonRenderable

PolygonRenderable: A rendering wrapper for drawing polygon fill/outline using Primitive.

## Remarks

- Fill uses `PolygonGeometry` + `Daisy.MaterialAppearance`.
- Outline (optional) uses `PolygonOutlineGeometry` + `Daisy.PerInstanceColorAppearance`.
- The underlying Primitive uses [SafePrimitive](file:///d:/work/logic/space/daisyview-sdk/sdk/src/sdk/renderables/SafePrimitive.ts) to reduce risks from matrix issues in 2D/Morphing states.

## Constructors

### Constructor

> **new PolygonRenderable**(`viewer`, `options?`): `PolygonRenderable`

Creates a PolygonRenderable and immediately adds it to `viewer.collections.primitiveCollection`.

#### Parameters

##### viewer

[`Engine`](Engine.md)

Daisy SDK Engine。

##### options?

[`PolygonPrimitiveOptions`](../types/PolygonPrimitiveOptions.md)

Polygon options.

#### Returns

`PolygonRenderable`

## Methods

### buildOutlineGeometry()

> **buildOutlineGeometry**(`positions`, `ellipsoid`): `PolygonOutlineGeometry` \| `undefined`

Builds the polygon outline geometry.

#### Parameters

##### positions

`Cartesian3`[] \| [`Holes`](../types/Holes.md)

Vertices or hierarchy with holes.

##### ellipsoid

`Ellipsoid`

#### Returns

`PolygonOutlineGeometry` \| `undefined`

A `Daisy.Geometry` usable for Primitive.

***

### create()

> **create**(`basePositions`): `void`

Creates/rebuilds the fill Primitive.

#### Parameters

##### basePositions

`Cartesian3`[] \| [`Holes`](../types/Holes.md)

Processed (potentially sorted) positions.

#### Returns

`void`

***

### createOutline()

> **createOutline**(`basePositions`): `void`

Creates/removes the outline Primitive based on the current `options.outline`.

#### Parameters

##### basePositions

`Cartesian3`[] \| [`Holes`](../types/Holes.md)

Processed (potentially sorted) positions.

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

Removes fill/outline from `viewer.collections.primitiveCollection` and releases references.

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

### updateModelMatrix()

> **updateModelMatrix**(`time?`): `void`

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

***

### updatePositions()

> **updatePositions**(`positions`): `void`

Updates polygon vertices and rebuilds the Primitive (including optional outline).

#### Parameters

##### positions

`Cartesian3`[] \| `PolygonHierarchy` \| [`Holes`](../types/Holes.md)

New vertices or hierarchy.

#### Returns

`void`
