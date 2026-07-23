[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / RectangleGeometry

# Class: RectangleGeometry

A description of a cartographic rectangle on an ellipsoid centered at the origin. Rectangle geometry can be rendered with both Primitive and [GroundPrimitive](Daisy.GroundPrimitive.md).

## Example

```ts
// 1. create a rectangle
const rectangle = new Daisy.RectangleGeometry({
 ellipsoid : Daisy.Ellipsoid.default,
 rectangle : Daisy.Rectangle.fromDegrees(-80.0, 39.0, -74.0, 42.0),
 height : 10000.0
});
const geometry = Daisy.RectangleGeometry.createGeometry(rectangle);

// 2. create an extruded rectangle without a top
const rectangle = new Daisy.RectangleGeometry({
 ellipsoid : Daisy.Ellipsoid.default,
 rectangle : Daisy.Rectangle.fromDegrees(-80.0, 39.0, -74.0, 42.0),
 height : 10000.0,
 extrudedHeight: 300000
});
const geometry = Daisy.RectangleGeometry.createGeometry(rectangle);
```

## Param

**options**

Object with the following properties:

## Param

**options.rectangle**

A cartographic rectangle with north, south, east and west properties in radians.

## Param

**options.vertexFormat**

The vertex attributes to be computed.

## Param

**options.ellipsoid**

The ellipsoid on which the rectangle lies.

## Param

**options.granularity**

The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.

## Param

**options.height**

The distance in meters between the rectangle and the ellipsoid surface.

## Param

**options.rotation**

The rotation of the rectangle, in radians. A positive rotation is counter-clockwise.

## Param

**options.stRotation**

The rotation of the texture coordinates, in radians. A positive rotation is counter-clockwise.

## Param

**options.extrudedHeight**

The distance in meters between the rectangle's extruded face and the ellipsoid surface.

## Constructors

### Constructor

> **new RectangleGeometry**(`options`): `RectangleGeometry`

#### Parameters

##### options

###### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

###### extrudedHeight?

`number`

###### granularity?

`number`

###### height?

`number`

###### rectangle

[`Rectangle`](Daisy.Rectangle.md)

###### rotation?

`number`

###### stRotation?

`number`

###### vertexFormat?

[`VertexFormat`](Daisy.VertexFormat.md)

#### Returns

`RectangleGeometry`

## Properties

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

## Methods

### computeRectangle()

> `static` **computeRectangle**(`options`, `result?`): [`Rectangle`](Daisy.Rectangle.md)

Computes the bounding rectangle based on the provided options

#### Parameters

##### options

Object with the following properties:

###### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid on which the rectangle lies.

###### granularity?

`number`

The distance, in radians, between each latitude and longitude. Determines the number of positions in the buffer.

###### rectangle

[`Rectangle`](Daisy.Rectangle.md)

A cartographic rectangle with north, south, east and west properties in radians.

###### rotation?

`number`

The rotation of the rectangle, in radians. A positive rotation is counter-clockwise.

##### result?

[`Rectangle`](Daisy.Rectangle.md)

An object in which to store the result.

#### Returns

[`Rectangle`](Daisy.Rectangle.md)

The result rectangle

***

### createGeometry()

> `static` **createGeometry**(`rectangleGeometry`): [`Geometry`](Daisy.Geometry.md) \| `undefined`

Computes the geometric representation of a rectangle, including its vertices, indices, and a bounding sphere.

#### Parameters

##### rectangleGeometry

`RectangleGeometry`

A description of the rectangle.

#### Returns

[`Geometry`](Daisy.Geometry.md) \| `undefined`

The computed vertices and indices.

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`RectangleGeometry`

The value to pack.

##### array

`number`[]

The array to pack into.

##### startingIndex?

`number`

The index into the array at which to start packing the elements.

#### Returns

`number`[]

The array that was packed into

***

### unpack()

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `RectangleGeometry`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`RectangleGeometry`

The object into which to store the result.

#### Returns

`RectangleGeometry`

The modified result parameter or a new RectangleGeometry instance if one was not provided.
