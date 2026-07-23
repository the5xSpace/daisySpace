[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / BoundingRectangle

# Class: BoundingRectangle

A bounding rectangle given by a corner, width and height.

## Param

**x**

The x coordinate of the rectangle.

## Param

**y**

The y coordinate of the rectangle.

## Param

**width**

The width of the rectangle.

## Param

**height**

The height of the rectangle.

## Constructors

### Constructor

> **new BoundingRectangle**(`x?`, `y?`, `width?`, `height?`): `BoundingRectangle`

#### Parameters

##### x?

`number`

##### y?

`number`

##### width?

`number`

##### height?

`number`

#### Returns

`BoundingRectangle`

## Properties

### height

> **height**: `number`

The height of the rectangle.

***

### width

> **width**: `number`

The width of the rectangle.

***

### x

> **x**: `number`

The x coordinate of the rectangle.

***

### y

> **y**: `number`

The y coordinate of the rectangle.

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

## Methods

### clone()

> **clone**(`result?`): `BoundingRectangle`

Duplicates this BoundingRectangle instance.

#### Parameters

##### result?

`BoundingRectangle`

The object onto which to store the result.

#### Returns

`BoundingRectangle`

The modified result parameter or a new BoundingRectangle instance if one was not provided.

***

### equals()

> **equals**(`right?`): `boolean`

Compares this BoundingRectangle against the provided BoundingRectangle componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`BoundingRectangle`

The right hand side BoundingRectangle.

#### Returns

`boolean`

`true` if they are equal, `false` otherwise.

***

### intersect()

> **intersect**(`right`): `Intersect`

Determines if this rectangle intersects with another.

#### Parameters

##### right

`BoundingRectangle`

A rectangle to check for intersection.

#### Returns

`Intersect`

`Intersect.INTERSECTING` if the rectangles intersect, `Intersect.OUTSIDE` otherwise.

***

### clone()

> `static` **clone**(`rectangle`, `result?`): `BoundingRectangle`

Duplicates a BoundingRectangle instance.

#### Parameters

##### rectangle

`BoundingRectangle`

The bounding rectangle to duplicate.

##### result?

`BoundingRectangle`

The object onto which to store the result.

#### Returns

`BoundingRectangle`

The modified result parameter or a new BoundingRectangle instance if one was not provided. (Returns undefined if rectangle is undefined)

***

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Compares the provided BoundingRectangles componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### left?

`BoundingRectangle`

The first BoundingRectangle.

##### right?

`BoundingRectangle`

The second BoundingRectangle.

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.

***

### expand()

> `static` **expand**(`rectangle`, `point`, `result?`): `BoundingRectangle`

Computes a bounding rectangle by enlarging the provided rectangle until it contains the provided point.

#### Parameters

##### rectangle

`BoundingRectangle`

A rectangle to expand.

##### point

[`Cartesian2`](Daisy.Cartesian2.md)

A point to enclose in a bounding rectangle.

##### result?

`BoundingRectangle`

The object onto which to store the result.

#### Returns

`BoundingRectangle`

The modified result parameter or a new BoundingRectangle instance if one was not provided.

***

### fromPoints()

> `static` **fromPoints**(`positions`, `result?`): `BoundingRectangle`

Computes a bounding rectangle enclosing the list of 2D points.
The rectangle is oriented with the corner at the bottom left.

#### Parameters

##### positions

[`Cartesian2`](Daisy.Cartesian2.md)[]

List of points that the bounding rectangle will enclose. Each point must have `x` and `y` properties.

##### result?

`BoundingRectangle`

The object onto which to store the result.

#### Returns

`BoundingRectangle`

The modified result parameter or a new BoundingRectangle instance if one was not provided.

***

### fromRectangle()

> `static` **fromRectangle**(`rectangle`, `projection?`, `result?`): `BoundingRectangle`

Computes a bounding rectangle from a rectangle.

#### Parameters

##### rectangle

[`Rectangle`](Daisy.Rectangle.md)

The valid rectangle used to create a bounding rectangle.

##### projection?

`any`

The projection used to project the rectangle into 2D.

##### result?

`BoundingRectangle`

The object onto which to store the result.

#### Returns

`BoundingRectangle`

The modified result parameter or a new BoundingRectangle instance if one was not provided.

***

### intersect()

> `static` **intersect**(`left`, `right`): `Intersect`

Determines if two rectangles intersect.

#### Parameters

##### left

`BoundingRectangle`

A rectangle to check for intersection.

##### right

`BoundingRectangle`

The other rectangle to check for intersection.

#### Returns

`Intersect`

`Intersect.INTERSECTING` if the rectangles intersect, `Intersect.OUTSIDE` otherwise.

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`BoundingRectangle`

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

### union()

> `static` **union**(`left`, `right`, `result?`): `BoundingRectangle`

Computes a bounding rectangle that is the union of the left and right bounding rectangles.

#### Parameters

##### left

`BoundingRectangle`

A rectangle to enclose in bounding rectangle.

##### right

`BoundingRectangle`

A rectangle to enclose in a bounding rectangle.

##### result?

`BoundingRectangle`

The object onto which to store the result.

#### Returns

`BoundingRectangle`

The modified result parameter or a new BoundingRectangle instance if one was not provided.

***

### unpack()

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `BoundingRectangle`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`BoundingRectangle`

The object into which to store the result.

#### Returns

`BoundingRectangle`

The modified result parameter or a new BoundingRectangle instance if one was not provided.
