[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / GeometryInstance

# Class: GeometryInstance

Geometry instancing allows one [Geometry](Daisy.Geometry.md) object to be positions in several
different locations and colored uniquely. For example, one BoxGeometry can
be instanced several times, each with a different `modelMatrix` to change
its position, rotation, and scale.

## Example

```ts
// Create geometry for a box, and two instances that refer to it.
// One instance positions the box on the bottom and colored aqua.
// The other instance positions the box on the top and color white.
const geometry = Daisy.BoxGeometry.fromDimensions({
 vertexFormat : Daisy.VertexFormat.POSITION_AND_NORMAL,
 dimensions : new Daisy.Cartesian3(1000000.0, 1000000.0, 500000.0)
});
const instanceBottom = new Daisy.GeometryInstance({
 geometry : geometry,
 modelMatrix : Daisy.Matrix4.multiplyByTranslation(Daisy.Transforms.eastNorthUpToFixedFrame(
 Daisy.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Daisy.Cartesian3(0.0, 0.0, 1000000.0), new Daisy.Matrix4()),
 attributes : {
 color : Daisy.ColorGeometryInstanceAttribute.fromColor(Daisy.Color.AQUA)
 },
 id : 'bottom'
});
const instanceTop = new Daisy.GeometryInstance({
 geometry : geometry,
 modelMatrix : Daisy.Matrix4.multiplyByTranslation(Daisy.Transforms.eastNorthUpToFixedFrame(
 Daisy.Cartesian3.fromDegrees(-75.59777, 40.03883)), new Daisy.Cartesian3(0.0, 0.0, 3000000.0), new Daisy.Matrix4()),
 attributes : {
 color : Daisy.ColorGeometryInstanceAttribute.fromColor(Daisy.Color.AQUA)
 },
 id : 'top'
});
```

## Param

**options**

Object with the following properties:

## Param

**options.geometry**

The geometry to instance.

## Param

**options.modelMatrix**

The model matrix that transforms to transform the geometry from model to world coordinates.

## Param

**options.id**

A user-defined object to return when the instance is picked with [Scene#pick](Daisy.Scene.md#pick) or get/set per-instance attributes with Primitive#getGeometryInstanceAttributes.

## Param

**options.attributes**

Per-instance attributes like a show or color attribute shown in the example below.

## Constructors

### Constructor

> **new GeometryInstance**(`options`): `GeometryInstance`

#### Parameters

##### options

###### attributes?

`any`

###### geometry

`GeometryFactory` \| [`Geometry`](Daisy.Geometry.md)

###### id?

`any`

###### modelMatrix?

[`Matrix4`](Daisy.Matrix4.md)

#### Returns

`GeometryInstance`

## Properties

### attributes

> **attributes**: `any`

Per-instance attributes like [ColorGeometryInstanceAttribute](Daisy.ColorGeometryInstanceAttribute.md) or ShowGeometryInstanceAttribute.
[Geometry](Daisy.Geometry.md) attributes varying per vertex; these attributes are constant for the entire instance.

***

### geometry

> **geometry**: [`Geometry`](Daisy.Geometry.md)

The geometry being instanced.

***

### id

> **id**: `any`

User-defined object returned when the instance is picked or used to get/set per-instance attributes.

***

### modelMatrix

> **modelMatrix**: [`Matrix4`](Daisy.Matrix4.md)

The 4x4 transformation matrix that transforms the geometry from model to world coordinates.
When this is the identity matrix, the geometry is drawn in world coordinates, i.e., Earth's WGS84 coordinates.
Local reference frames can be used by providing a different transformation matrix, like that returned
by [Transforms.eastNorthUpToFixedFrame](../functions/Daisy.Transforms.eastNorthUpToFixedFrame.md).
