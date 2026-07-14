[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / PolygonHierarchy

# Class: PolygonHierarchy

An hierarchy of linear rings which define a polygon and its holes.
The holes themselves may also have holes which nest inner polygons.

## Param

A linear ring defining the outer boundary of the polygon or hole.

## Param

An array of polygon hierarchies defining holes in the polygon.

## Constructors

### Constructor

> **new PolygonHierarchy**(`positions?`, `holes?`): `PolygonHierarchy`

#### Parameters

##### positions?

[`Cartesian3`](Daisy.Cartesian3.md)[]

##### holes?

`PolygonHierarchy`[]

#### Returns

`PolygonHierarchy`

## Properties

### holes

> **holes**: `PolygonHierarchy`[]

An array of polygon hierarchies defining holes in the polygon.

***

### positions

> **positions**: [`Cartesian3`](Daisy.Cartesian3.md)[]

A linear ring defining the outer boundary of the polygon or hole.
