[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Ellipsoid

# Class: Ellipsoid

A quadratic surface defined in Cartesian coordinates by the equation
`(x / a)^2 + (y / b)^2 + (z / c)^2 = 1`. Primarily used
by to represent the shape of planetary bodies.

Rather than constructing this object directly, one of the provided
constants is normally used.

## Param

**x**

The radius in the x direction.

## Param

**y**

The radius in the y direction.

## Param

**z**

The radius in the z direction.

## Constructors

### Constructor

> **new Ellipsoid**(`x?`, `y?`, `z?`): `Ellipsoid`

#### Parameters

##### x?

`number`

##### y?

`number`

##### z?

`number`

#### Returns

`Ellipsoid`

## Properties

### maximumRadius

> `readonly` **maximumRadius**: `number`

Gets the maximum radius of the ellipsoid.

***

### minimumRadius

> `readonly` **minimumRadius**: `number`

Gets the minimum radius of the ellipsoid.

***

### oneOverRadii

> `readonly` **oneOverRadii**: [`Cartesian3`](Daisy.Cartesian3.md)

Gets one over the radii of the ellipsoid.

***

### oneOverRadiiSquared

> `readonly` **oneOverRadiiSquared**: [`Cartesian3`](Daisy.Cartesian3.md)

Gets one over the squared radii of the ellipsoid.

***

### radii

> `readonly` **radii**: [`Cartesian3`](Daisy.Cartesian3.md)

Gets the radii of the ellipsoid.

***

### radiiSquared

> `readonly` **radiiSquared**: [`Cartesian3`](Daisy.Cartesian3.md)

Gets the squared radii of the ellipsoid.

***

### radiiToTheFourth

> `readonly` **radiiToTheFourth**: [`Cartesian3`](Daisy.Cartesian3.md)

Gets the radii of the ellipsoid raise to the fourth power.

***

### default

> `static` **default**: `Ellipsoid`

The default ellipsoid used when not otherwise specified.

#### Example

```ts
Daisy.Ellipsoid.default = Daisy.Ellipsoid.MOON;

// Apollo 11 landing site
const position = Daisy.Cartesian3.fromRadians(
 0.67416,
 23.47315,
);
```

***

### MARS

> `readonly` `static` **MARS**: `Ellipsoid`

An Ellipsoid instance initialized to a sphere with the mean radii of Mars.
Source: https://epsg.io/104905

***

### MOON

> `readonly` `static` **MOON**: `Ellipsoid`

An Ellipsoid instance initialized to a sphere with the lunar radius.

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

***

### UNIT\_SPHERE

> `readonly` `static` **UNIT\_SPHERE**: `Ellipsoid`

An Ellipsoid instance initialized to radii of (1.0, 1.0, 1.0).

***

### WGS84

> `readonly` `static` **WGS84**: `Ellipsoid`

An Ellipsoid instance initialized to the WGS84 standard.

## Methods

### cartesianArrayToCartographicArray()

> **cartesianArrayToCartographicArray**(`cartesians`, `result?`): [`Cartographic`](Daisy.Cartographic.md)[]

Converts the provided array of cartesians to an array of cartographics.

#### Parameters

##### cartesians

[`Cartesian3`](Daisy.Cartesian3.md)[]

An array of Cartesian positions.

##### result?

[`Cartographic`](Daisy.Cartographic.md)[]

The object onto which to store the result.

#### Returns

[`Cartographic`](Daisy.Cartographic.md)[]

The modified result parameter or a new Array instance if none was provided.

#### Example

```ts
//Create an array of Cartesians and determine their Cartographic representation on a WGS84 ellipsoid.
const positions = [new Daisy.Cartesian3(17832.12, 83234.52, 952313.73),
 new Daisy.Cartesian3(17832.13, 83234.53, 952313.73),
 new Daisy.Cartesian3(17832.14, 83234.54, 952313.73)]
const cartographicPositions = Daisy.Ellipsoid.WGS84.cartesianArrayToCartographicArray(positions);
```

***

### cartesianToCartographic()

> **cartesianToCartographic**(`cartesian`, `result?`): [`Cartographic`](Daisy.Cartographic.md)

Converts the provided cartesian to cartographic representation.
The cartesian is undefined at the center of the ellipsoid.

#### Parameters

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The Cartesian position to convert to cartographic representation.

##### result?

[`Cartographic`](Daisy.Cartographic.md)

The object onto which to store the result.

#### Returns

[`Cartographic`](Daisy.Cartographic.md)

The modified result parameter, new Cartographic instance if none was provided, or undefined if the cartesian is at the center of the ellipsoid.

#### Example

```ts
//Create a Cartesian and determine it's Cartographic representation on a WGS84 ellipsoid.
const position = new Daisy.Cartesian3(17832.12, 83234.52, 952313.73);
const cartographicPosition = Daisy.Ellipsoid.WGS84.cartesianToCartographic(position);
```

***

### cartographicArrayToCartesianArray()

> **cartographicArrayToCartesianArray**(`cartographics`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md)[]

Converts the provided array of cartographics to an array of Cartesians.

#### Parameters

##### cartographics

[`Cartographic`](Daisy.Cartographic.md)[]

An array of cartographic positions.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)[]

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)[]

The modified result parameter or a new Array instance if none was provided.

#### Example

```ts
//Convert an array of Cartographics and determine their Cartesian representation on a WGS84 ellipsoid.
const positions = [new Daisy.Cartographic(Daisy.Math.toRadians(21), Daisy.Math.toRadians(78), 0),
 new Daisy.Cartographic(Daisy.Math.toRadians(21.321), Daisy.Math.toRadians(78.123), 100),
 new Daisy.Cartographic(Daisy.Math.toRadians(21.645), Daisy.Math.toRadians(78.456), 250)];
const cartesianPositions = Daisy.Ellipsoid.WGS84.cartographicArrayToCartesianArray(positions);
```

***

### cartographicToCartesian()

> **cartographicToCartesian**(`cartographic`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md)

Converts the provided cartographic to Cartesian representation.

#### Parameters

##### cartographic

[`Cartographic`](Daisy.Cartographic.md)

The cartographic position.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter or a new Cartesian3 instance if none was provided.

#### Example

```ts
//Create a Cartographic and determine it's Cartesian representation on a WGS84 ellipsoid.
const position = new Daisy.Cartographic(Daisy.Math.toRadians(21), Daisy.Math.toRadians(78), 5000);
const cartesianPosition = Daisy.Ellipsoid.WGS84.cartographicToCartesian(position);
```

***

### clone()

> **clone**(`result?`): `Ellipsoid`

Duplicates an Ellipsoid instance.

#### Parameters

##### result?

`Ellipsoid`

The object onto which to store the result, or undefined if a new
 instance should be created.

#### Returns

`Ellipsoid`

The cloned Ellipsoid.

***

### equals()

> **equals**(`right?`): `boolean`

Compares this Ellipsoid against the provided Ellipsoid componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`Ellipsoid`

The other Ellipsoid.

#### Returns

`boolean`

`true` if they are equal, `false` otherwise.

***

### geocentricSurfaceNormal()

> **geocentricSurfaceNormal**(`cartesian`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md)

Computes the unit vector directed from the center of this ellipsoid toward the provided Cartesian position.

#### Parameters

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The Cartesian for which to to determine the geocentric normal.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter or a new Cartesian3 instance if none was provided.

***

### geodeticSurfaceNormal()

> **geodeticSurfaceNormal**(`cartesian`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md)

Computes the normal of the plane tangent to the surface of the ellipsoid at the provided position.

#### Parameters

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The Cartesian position for which to to determine the surface normal.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter or a new Cartesian3 instance if none was provided, or undefined if a normal cannot be found.

***

### geodeticSurfaceNormalCartographic()

> **geodeticSurfaceNormalCartographic**(`cartographic`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md)

Computes the normal of the plane tangent to the surface of the ellipsoid at the provided position.

#### Parameters

##### cartographic

[`Cartographic`](Daisy.Cartographic.md)

The cartographic position for which to to determine the geodetic normal.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter or a new Cartesian3 instance if none was provided.

***

### getLocalCurvature()

> **getLocalCurvature**(`surfacePosition`, `result?`): [`Cartesian2`](Daisy.Cartesian2.md)

Computes the ellipsoid curvatures at a given position on the surface.

#### Parameters

##### surfacePosition

[`Cartesian3`](Daisy.Cartesian3.md)

The position on the ellipsoid surface where curvatures will be calculated.

##### result?

[`Cartesian2`](Daisy.Cartesian2.md)

The cartesian to which to copy the result, or undefined to create and return a new instance.

#### Returns

[`Cartesian2`](Daisy.Cartesian2.md)

The local curvature of the ellipsoid surface at the provided position, in east and north directions.

***

### getSurfaceNormalIntersectionWithZAxis()

> **getSurfaceNormalIntersectionWithZAxis**(`position`, `buffer?`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md) \| `undefined`

Computes a point which is the intersection of the surface normal with the z-axis.

#### Parameters

##### position

[`Cartesian3`](Daisy.Cartesian3.md)

the position. must be on the surface of the ellipsoid.

##### buffer?

`number`

A buffer to subtract from the ellipsoid size when checking if the point is inside the ellipsoid.
 In earth case, with common earth datums, there is no need for this buffer since the intersection point is always (relatively) very close to the center.
 In WGS84 datum, intersection point is at max z = +-42841.31151331382 (0.673% of z-axis).
 Intersection point could be outside the ellipsoid if the ratio of MajorAxis / AxisOfRotation is bigger than the square root of 2

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)

The cartesian to which to copy the result, or undefined to create and
 return a new instance.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md) \| `undefined`

the intersection point if it's inside the ellipsoid, undefined otherwise

***

### scaleToGeocentricSurface()

> **scaleToGeocentricSurface**(`cartesian`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md)

Scales the provided Cartesian position along the geocentric surface normal
so that it is on the surface of this ellipsoid.

#### Parameters

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The Cartesian position to scale.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter or a new Cartesian3 instance if none was provided.

***

### scaleToGeodeticSurface()

> **scaleToGeodeticSurface**(`cartesian`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md)

Scales the provided Cartesian position along the geodetic surface normal
so that it is on the surface of this ellipsoid. If the position is
at the center of the ellipsoid, this function returns undefined.

#### Parameters

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The Cartesian position to scale.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter, a new Cartesian3 instance if none was provided, or undefined if the position is at the center.

***

### surfaceArea()

> **surfaceArea**(`rectangle`): `number`

Computes an approximation of the surface area of a rectangle on the surface of an ellipsoid using
Gauss-Legendre 10th order quadrature.

#### Parameters

##### rectangle

[`Rectangle`](Daisy.Rectangle.md)

The rectangle used for computing the surface area.

#### Returns

`number`

The approximate area of the rectangle on the surface of this ellipsoid.

***

### toString()

> **toString**(): `string`

Creates a string representing this Ellipsoid in the format '(radii.x, radii.y, radii.z)'.

#### Returns

`string`

A string representing this ellipsoid in the format '(radii.x, radii.y, radii.z)'.

***

### transformPositionFromScaledSpace()

> **transformPositionFromScaledSpace**(`position`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md)

Transforms a Cartesian X, Y, Z position from the ellipsoid-scaled space by multiplying
its components by the result of [Ellipsoid#radii](#radii).

#### Parameters

##### position

[`Cartesian3`](Daisy.Cartesian3.md)

The position to transform.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)

The position to which to copy the result, or undefined to create and
 return a new instance.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The position expressed in the unscaled space. The returned instance is the
 one passed as the result parameter if it is not undefined, or a new instance of it is.

***

### transformPositionToScaledSpace()

> **transformPositionToScaledSpace**(`position`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md)

Transforms a Cartesian X, Y, Z position to the ellipsoid-scaled space by multiplying
its components by the result of [Ellipsoid#oneOverRadii](#oneoverradii).

#### Parameters

##### position

[`Cartesian3`](Daisy.Cartesian3.md)

The position to transform.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)

The position to which to copy the result, or undefined to create and
 return a new instance.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The position expressed in the scaled space. The returned instance is the
 one passed as the result parameter if it is not undefined, or a new instance of it is.

***

### clone()

> `static` **clone**(`ellipsoid`, `result?`): `Ellipsoid`

Duplicates an Ellipsoid instance.

#### Parameters

##### ellipsoid

`Ellipsoid`

The ellipsoid to duplicate.

##### result?

`Ellipsoid`

The object onto which to store the result, or undefined if a new
 instance should be created.

#### Returns

`Ellipsoid`

The cloned Ellipsoid. (Returns undefined if ellipsoid is undefined)

***

### fromCartesian3()

> `static` **fromCartesian3**(`cartesian?`, `result?`): `Ellipsoid`

Computes an Ellipsoid from a Cartesian specifying the radii in x, y, and z directions.

#### Parameters

##### cartesian?

[`Cartesian3`](Daisy.Cartesian3.md)

The ellipsoid's radius in the x, y, and z directions.

##### result?

`Ellipsoid`

The object onto which to store the result, or undefined if a new
 instance should be created.

#### Returns

`Ellipsoid`

A new Ellipsoid instance.

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`Ellipsoid`

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

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `Ellipsoid`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`Ellipsoid`

The object into which to store the result.

#### Returns

`Ellipsoid`

The modified result parameter or a new Ellipsoid instance if one was not provided.
