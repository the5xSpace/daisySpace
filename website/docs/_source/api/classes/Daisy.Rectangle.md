[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Rectangle

# Class: Rectangle

A two dimensional region specified as longitude and latitude coordinates.

## Param

**west**

The westernmost longitude, in radians, in the range [-Pi, Pi].

## Param

**south**

The southernmost latitude, in radians, in the range [-Pi/2, Pi/2].

## Param

**east**

The easternmost longitude, in radians, in the range [-Pi, Pi].

## Param

**north**

The northernmost latitude, in radians, in the range [-Pi/2, Pi/2].

## Constructors

### Constructor

> **new Rectangle**(`west?`, `south?`, `east?`, `north?`): `Rectangle`

#### Parameters

##### west?

`number`

##### south?

`number`

##### east?

`number`

##### north?

`number`

#### Returns

`Rectangle`

## Properties

### east

> **east**: `number`

The easternmost longitude in radians in the range [-Pi, Pi].

***

### height

> `readonly` **height**: `number`

Gets the height of the rectangle in radians.

***

### north

> **north**: `number`

The northernmost latitude in radians in the range [-Pi/2, Pi/2].

***

### south

> **south**: `number`

The southernmost latitude in radians in the range [-Pi/2, Pi/2].

***

### west

> **west**: `number`

The westernmost longitude in radians in the range [-Pi, Pi].

***

### width

> `readonly` **width**: `number`

Gets the width of the rectangle in radians.

***

### MAX\_VALUE

> `readonly` `static` **MAX\_VALUE**: `Rectangle`

The largest possible rectangle.

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

## Methods

### clone()

> **clone**(`result?`): `Rectangle`

Duplicates this Rectangle.

#### Parameters

##### result?

`Rectangle`

The object onto which to store the result.

#### Returns

`Rectangle`

The modified result parameter or a new Rectangle instance if none was provided.

***

### equals()

> **equals**(`other?`): `boolean`

Compares the provided Rectangle with this Rectangle componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### other?

`Rectangle`

The Rectangle to compare.

#### Returns

`boolean`

`true` if the Rectangles are equal, `false` otherwise.

***

### equalsEpsilon()

> **equalsEpsilon**(`other?`, `epsilon?`): `boolean`

Compares the provided Rectangle with this Rectangle componentwise and returns
`true` if they are within the provided epsilon,
`false` otherwise.

#### Parameters

##### other?

`Rectangle`

The Rectangle to compare.

##### epsilon?

`number`

The epsilon to use for equality testing.

#### Returns

`boolean`

`true` if the Rectangles are within the provided epsilon, `false` otherwise.

***

### center()

> `static` **center**(`rectangle`, `result?`): [`Cartographic`](Daisy.Cartographic.md)

Computes the center of a rectangle.

#### Parameters

##### rectangle

`Rectangle`

The rectangle for which to find the center

##### result?

[`Cartographic`](Daisy.Cartographic.md)

The object onto which to store the result.

#### Returns

[`Cartographic`](Daisy.Cartographic.md)

The modified result parameter or a new Cartographic instance if none was provided.

***

### clone()

> `static` **clone**(`rectangle`, `result?`): `Rectangle`

Duplicates a Rectangle.

#### Parameters

##### rectangle

`Rectangle`

The rectangle to clone.

##### result?

`Rectangle`

The object onto which to store the result, or undefined if a new instance should be created.

#### Returns

`Rectangle`

The modified result parameter or a new Rectangle instance if none was provided. (Returns undefined if rectangle is undefined)

***

### computeHeight()

> `static` **computeHeight**(`rectangle`): `number`

Computes the height of a rectangle in radians.

#### Parameters

##### rectangle

`Rectangle`

The rectangle to compute the height of.

#### Returns

`number`

The height.

***

### computeWidth()

> `static` **computeWidth**(`rectangle`): `number`

Computes the width of a rectangle in radians.

#### Parameters

##### rectangle

`Rectangle`

The rectangle to compute the width of.

#### Returns

`number`

The width.

***

### contains()

> `static` **contains**(`rectangle`, `cartographic`): `boolean`

Returns true if the cartographic is on or inside the rectangle, false otherwise.

#### Parameters

##### rectangle

`Rectangle`

The rectangle

##### cartographic

[`Cartographic`](Daisy.Cartographic.md)

The cartographic to test.

#### Returns

`boolean`

true if the provided cartographic is inside the rectangle, false otherwise.

***

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Compares the provided rectangles and returns `true` if they are equal,
`false` otherwise.

#### Parameters

##### left?

`Rectangle`

The first Rectangle.

##### right?

`Rectangle`

The second Rectangle.

#### Returns

`boolean`

`true` if left and right are equal; otherwise `false`.

***

### equalsEpsilon()

> `static` **equalsEpsilon**(`left?`, `right?`, `absoluteEpsilon?`): `boolean`

Compares the provided Rectangles componentwise and returns
`true` if they pass an absolute or relative tolerance test,
`false` otherwise.

#### Parameters

##### left?

`Rectangle`

The first Rectangle.

##### right?

`Rectangle`

The second Rectangle.

##### absoluteEpsilon?

`number`

The absolute epsilon tolerance to use for equality testing.

#### Returns

`boolean`

`true` if left and right are within the provided epsilon, `false` otherwise.

***

### expand()

> `static` **expand**(`rectangle`, `cartographic`, `result?`): `Rectangle`

Computes a rectangle by enlarging the provided rectangle until it contains the provided cartographic.

#### Parameters

##### rectangle

`Rectangle`

A rectangle to expand.

##### cartographic

[`Cartographic`](Daisy.Cartographic.md)

A cartographic to enclose in a rectangle.

##### result?

`Rectangle`

The object onto which to store the result.

#### Returns

`Rectangle`

The modified result parameter or a new Rectangle instance if one was not provided.

***

### fromBoundingSphere()

> `static` **fromBoundingSphere**(`boundingSphere`, `ellipsoid?`, `result?`): `Rectangle`

Create a rectangle from a bounding sphere, ignoring height.

#### Parameters

##### boundingSphere

[`BoundingSphere`](Daisy.BoundingSphere.md)

The bounding sphere.

##### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid.

##### result?

`Rectangle`

The object onto which to store the result, or undefined if a new instance should be created.

#### Returns

`Rectangle`

The modified result parameter or a new Rectangle instance if none was provided.

***

### fromCartesianArray()

> `static` **fromCartesianArray**(`cartesians`, `ellipsoid?`, `result?`): `Rectangle`

Creates the smallest possible Rectangle that encloses all positions in the provided array.

#### Parameters

##### cartesians

[`Cartesian3`](Daisy.Cartesian3.md)[]

The list of Cartesian instances.

##### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid the cartesians are on.

##### result?

`Rectangle`

The object onto which to store the result, or undefined if a new instance should be created.

#### Returns

`Rectangle`

The modified result parameter or a new Rectangle instance if none was provided.

***

### fromCartographicArray()

> `static` **fromCartographicArray**(`cartographics`, `result?`): `Rectangle`

Creates the smallest possible Rectangle that encloses all positions in the provided array.

#### Parameters

##### cartographics

[`Cartographic`](Daisy.Cartographic.md)[]

The list of Cartographic instances.

##### result?

`Rectangle`

The object onto which to store the result, or undefined if a new instance should be created.

#### Returns

`Rectangle`

The modified result parameter or a new Rectangle instance if none was provided.

***

### fromDegrees()

> `static` **fromDegrees**(`west?`, `south?`, `east?`, `north?`, `result?`): `Rectangle`

Creates a rectangle given the boundary longitude and latitude in degrees.

#### Parameters

##### west?

`number`

The westernmost longitude in degrees in the range [-180.0, 180.0].

##### south?

`number`

The southernmost latitude in degrees in the range [-90.0, 90.0].

##### east?

`number`

The easternmost longitude in degrees in the range [-180.0, 180.0].

##### north?

`number`

The northernmost latitude in degrees in the range [-90.0, 90.0].

##### result?

`Rectangle`

The object onto which to store the result, or undefined if a new instance should be created.

#### Returns

`Rectangle`

The modified result parameter or a new Rectangle instance if none was provided.

#### Example

```ts
const rectangle = Daisy.Rectangle.fromDegrees(0.0, 20.0, 10.0, 30.0);
```

***

### fromRadians()

> `static` **fromRadians**(`west?`, `south?`, `east?`, `north?`, `result?`): `Rectangle`

Creates a rectangle given the boundary longitude and latitude in radians.

#### Parameters

##### west?

`number`

The westernmost longitude in radians in the range [-Math.PI, Math.PI].

##### south?

`number`

The southernmost latitude in radians in the range [-Math.PI/2, Math.PI/2].

##### east?

`number`

The easternmost longitude in radians in the range [-Math.PI, Math.PI].

##### north?

`number`

The northernmost latitude in radians in the range [-Math.PI/2, Math.PI/2].

##### result?

`Rectangle`

The object onto which to store the result, or undefined if a new instance should be created.

#### Returns

`Rectangle`

The modified result parameter or a new Rectangle instance if none was provided.

#### Example

```ts
const rectangle = Daisy.Rectangle.fromRadians(0.0, Math.PI/4, Math.PI/8, 3*Math.PI/4);
```

***

### intersection()

> `static` **intersection**(`rectangle`, `otherRectangle`, `result?`): `Rectangle` \| `undefined`

Computes the intersection of two rectangles. This function assumes that the rectangle's coordinates are
latitude and longitude in radians and produces a correct intersection, taking into account the fact that
the same angle can be represented with multiple values as well as the wrapping of longitude at the
anti-meridian. For a simple intersection that ignores these factors and can be used with projected
coordinates, see [Rectangle.simpleIntersection](#simpleintersection).

#### Parameters

##### rectangle

`Rectangle`

On rectangle to find an intersection

##### otherRectangle

`Rectangle`

Another rectangle to find an intersection

##### result?

`Rectangle`

The object onto which to store the result.

#### Returns

`Rectangle` \| `undefined`

The modified result parameter, a new Rectangle instance if none was provided or undefined if there is no intersection.

***

### northeast()

> `static` **northeast**(`rectangle`, `result?`): [`Cartographic`](Daisy.Cartographic.md)

Computes the northeast corner of a rectangle.

#### Parameters

##### rectangle

`Rectangle`

The rectangle for which to find the corner

##### result?

[`Cartographic`](Daisy.Cartographic.md)

The object onto which to store the result.

#### Returns

[`Cartographic`](Daisy.Cartographic.md)

The modified result parameter or a new Cartographic instance if none was provided.

***

### northwest()

> `static` **northwest**(`rectangle`, `result?`): [`Cartographic`](Daisy.Cartographic.md)

Computes the northwest corner of a rectangle.

#### Parameters

##### rectangle

`Rectangle`

The rectangle for which to find the corner

##### result?

[`Cartographic`](Daisy.Cartographic.md)

The object onto which to store the result.

#### Returns

[`Cartographic`](Daisy.Cartographic.md)

The modified result parameter or a new Cartographic instance if none was provided.

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`Rectangle`

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

### simpleIntersection()

> `static` **simpleIntersection**(`rectangle`, `otherRectangle`, `result?`): `Rectangle` \| `undefined`

Computes a simple intersection of two rectangles. Unlike [Rectangle.intersection](#intersection), this function
does not attempt to put the angular coordinates into a consistent range or to account for crossing the
anti-meridian. As such, it can be used for rectangles where the coordinates are not simply latitude
and longitude (i.e. projected coordinates).

#### Parameters

##### rectangle

`Rectangle`

On rectangle to find an intersection

##### otherRectangle

`Rectangle`

Another rectangle to find an intersection

##### result?

`Rectangle`

The object onto which to store the result.

#### Returns

`Rectangle` \| `undefined`

The modified result parameter, a new Rectangle instance if none was provided or undefined if there is no intersection.

***

### southeast()

> `static` **southeast**(`rectangle`, `result?`): [`Cartographic`](Daisy.Cartographic.md)

Computes the southeast corner of a rectangle.

#### Parameters

##### rectangle

`Rectangle`

The rectangle for which to find the corner

##### result?

[`Cartographic`](Daisy.Cartographic.md)

The object onto which to store the result.

#### Returns

[`Cartographic`](Daisy.Cartographic.md)

The modified result parameter or a new Cartographic instance if none was provided.

***

### southwest()

> `static` **southwest**(`rectangle`, `result?`): [`Cartographic`](Daisy.Cartographic.md)

Computes the southwest corner of a rectangle.

#### Parameters

##### rectangle

`Rectangle`

The rectangle for which to find the corner

##### result?

[`Cartographic`](Daisy.Cartographic.md)

The object onto which to store the result.

#### Returns

[`Cartographic`](Daisy.Cartographic.md)

The modified result parameter or a new Cartographic instance if none was provided.

***

### subsample()

> `static` **subsample**(`rectangle`, `ellipsoid?`, `surfaceHeight?`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md)[]

Samples a rectangle so that it includes a list of Cartesian points suitable for passing to
BoundingSphere#fromPoints. Sampling is necessary to account
for rectangles that cover the poles or cross the equator.

#### Parameters

##### rectangle

`Rectangle`

The rectangle to subsample.

##### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid to use.

##### surfaceHeight?

`number`

The height of the rectangle above the ellipsoid.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)[]

The array of Cartesians onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)[]

The modified result parameter or a new Array of Cartesians instances if none was provided.

***

### subsection()

> `static` **subsection**(`rectangle`, `westLerp`, `southLerp`, `eastLerp`, `northLerp`, `result?`): `Rectangle`

Computes a subsection of a rectangle from normalized coordinates in the range [0.0, 1.0].

#### Parameters

##### rectangle

`Rectangle`

The rectangle to subsection.

##### westLerp

`number`

The west interpolation factor in the range [0.0, 1.0]. Must be less than or equal to eastLerp.

##### southLerp

`number`

The south interpolation factor in the range [0.0, 1.0]. Must be less than or equal to northLerp.

##### eastLerp

`number`

The east interpolation factor in the range [0.0, 1.0]. Must be greater than or equal to westLerp.

##### northLerp

`number`

The north interpolation factor in the range [0.0, 1.0]. Must be greater than or equal to southLerp.

##### result?

`Rectangle`

The object onto which to store the result.

#### Returns

`Rectangle`

The modified result parameter or a new Rectangle instance if none was provided.

***

### union()

> `static` **union**(`rectangle`, `otherRectangle`, `result?`): `Rectangle`

Computes a rectangle that is the union of two rectangles.

#### Parameters

##### rectangle

`Rectangle`

A rectangle to enclose in rectangle.

##### otherRectangle

`Rectangle`

A rectangle to enclose in a rectangle.

##### result?

`Rectangle`

The object onto which to store the result.

#### Returns

`Rectangle`

The modified result parameter or a new Rectangle instance if none was provided.

***

### unpack()

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `Rectangle`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`Rectangle`

The object into which to store the result.

#### Returns

`Rectangle`

The modified result parameter or a new Rectangle instance if one was not provided.
