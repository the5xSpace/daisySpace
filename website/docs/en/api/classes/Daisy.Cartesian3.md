[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Cartesian3

# Class: Cartesian3

A 3D Cartesian point.

## Param

The X component.

## Param

The Y component.

## Param

The Z component.

## Constructors

### Constructor

> **new Cartesian3**(`x?`, `y?`, `z?`): `Cartesian3`

#### Parameters

##### x?

`number`

##### y?

`number`

##### z?

`number`

#### Returns

`Cartesian3`

## Properties

### x

> **x**: `number`

The X component.

***

### y

> **y**: `number`

The Y component.

***

### z

> **z**: `number`

The Z component.

***

### ONE

> `readonly` `static` **ONE**: `Cartesian3`

An immutable Cartesian3 instance initialized to (1.0, 1.0, 1.0).

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

***

### UNIT\_X

> `readonly` `static` **UNIT\_X**: `Cartesian3`

An immutable Cartesian3 instance initialized to (1.0, 0.0, 0.0).

***

### UNIT\_Y

> `readonly` `static` **UNIT\_Y**: `Cartesian3`

An immutable Cartesian3 instance initialized to (0.0, 1.0, 0.0).

***

### UNIT\_Z

> `readonly` `static` **UNIT\_Z**: `Cartesian3`

An immutable Cartesian3 instance initialized to (0.0, 0.0, 1.0).

***

### ZERO

> `readonly` `static` **ZERO**: `Cartesian3`

An immutable Cartesian3 instance initialized to (0.0, 0.0, 0.0).

## Methods

### clone()

> **clone**(`result?`): `Cartesian3`

Duplicates this Cartesian3 instance.

#### Parameters

##### result?

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter or a new Cartesian3 instance if one was not provided.

***

### equals()

> **equals**(`right?`): `boolean`

Compares this Cartesian against the provided Cartesian componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`Cartesian3`

The right hand side Cartesian.

#### Returns

`boolean`

`true` if they are equal, `false` otherwise.

***

### equalsEpsilon()

> **equalsEpsilon**(`right?`, `relativeEpsilon?`, `absoluteEpsilon?`): `boolean`

Compares this Cartesian against the provided Cartesian componentwise and returns
`true` if they pass an absolute or relative tolerance test,
`false` otherwise.

#### Parameters

##### right?

`Cartesian3`

The right hand side Cartesian.

##### relativeEpsilon?

`number`

The relative epsilon tolerance to use for equality testing.

##### absoluteEpsilon?

`number`

The absolute epsilon tolerance to use for equality testing.

#### Returns

`boolean`

`true` if they are within the provided epsilon, `false` otherwise.

***

### toString()

> **toString**(): `string`

Creates a string representing this Cartesian in the format '(x, y, z)'.

#### Returns

`string`

A string representing this Cartesian in the format '(x, y, z)'.

***

### abs()

> `static` **abs**(`cartesian`, `result`): `Cartesian3`

Computes the absolute value of the provided Cartesian.

#### Parameters

##### cartesian

`Cartesian3`

The Cartesian whose absolute value is to be computed.

##### result

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter.

***

### add()

> `static` **add**(`left`, `right`, `result`): `Cartesian3`

Computes the componentwise sum of two Cartesians.

#### Parameters

##### left

`Cartesian3`

The first Cartesian.

##### right

`Cartesian3`

The second Cartesian.

##### result

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter.

***

### angleBetween()

> `static` **angleBetween**(`left`, `right`): `number`

Returns the angle, in radians, between the provided Cartesians.

#### Parameters

##### left

`Cartesian3`

The first Cartesian.

##### right

`Cartesian3`

The second Cartesian.

#### Returns

`number`

The angle between the Cartesians.

***

### clamp()

> `static` **clamp**(`cartesian`, `min`, `max`, `result`): `Cartesian3`

Constrain a value to lie between two values.

#### Parameters

##### cartesian

`Cartesian3`

The value to clamp.

##### min

`Cartesian3`

The minimum bound.

##### max

`Cartesian3`

The maximum bound.

##### result

`Cartesian3`

The object into which to store the result.

#### Returns

`Cartesian3`

The clamped value such that min <= value <= max.

***

### clone()

> `static` **clone**(`cartesian`, `result?`): `Cartesian3`

Duplicates a Cartesian3 instance.

#### Parameters

##### cartesian

`Cartesian3`

The Cartesian to duplicate.

##### result?

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter or a new Cartesian3 instance if one was not provided. (Returns undefined if cartesian is undefined)

***

### cross()

> `static` **cross**(`left`, `right`, `result`): `Cartesian3`

Computes the cross (outer) product of two Cartesians.

#### Parameters

##### left

`Cartesian3`

The first Cartesian.

##### right

`Cartesian3`

The second Cartesian.

##### result

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The cross product.

***

### distance()

> `static` **distance**(`left`, `right`): `number`

Computes the distance between two points.

#### Parameters

##### left

`Cartesian3`

The first point to compute the distance from.

##### right

`Cartesian3`

The second point to compute the distance to.

#### Returns

`number`

The distance between two points.

#### Example

```ts
// Returns 1.0
const d = Daisy.Cartesian3.distance(new Daisy.Cartesian3(1.0, 0.0, 0.0), new Daisy.Cartesian3(2.0, 0.0, 0.0));
```

***

### distanceSquared()

> `static` **distanceSquared**(`left`, `right`): `number`

Computes the squared distance between two points. Comparing squared distances
using this function is more efficient than comparing distances using Cartesian3#distance.

#### Parameters

##### left

`Cartesian3`

The first point to compute the distance from.

##### right

`Cartesian3`

The second point to compute the distance to.

#### Returns

`number`

The distance between two points.

#### Example

```ts
// Returns 4.0, not 2.0
const d = Daisy.Cartesian3.distanceSquared(new Daisy.Cartesian3(1.0, 0.0, 0.0), new Daisy.Cartesian3(3.0, 0.0, 0.0));
```

***

### divideByScalar()

> `static` **divideByScalar**(`cartesian`, `scalar`, `result`): `Cartesian3`

Divides the provided Cartesian componentwise by the provided scalar.

#### Parameters

##### cartesian

`Cartesian3`

The Cartesian to be divided.

##### scalar

`number`

The scalar to divide by.

##### result

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter.

***

### divideComponents()

> `static` **divideComponents**(`left`, `right`, `result`): `Cartesian3`

Computes the componentwise quotient of two Cartesians.

#### Parameters

##### left

`Cartesian3`

The first Cartesian.

##### right

`Cartesian3`

The second Cartesian.

##### result

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter.

***

### dot()

> `static` **dot**(`left`, `right`): `number`

Computes the dot (scalar) product of two Cartesians.

#### Parameters

##### left

`Cartesian3`

The first Cartesian.

##### right

`Cartesian3`

The second Cartesian.

#### Returns

`number`

The dot product.

***

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Compares the provided Cartesians componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### left?

`Cartesian3`

The first Cartesian.

##### right?

`Cartesian3`

The second Cartesian.

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.

***

### equalsEpsilon()

> `static` **equalsEpsilon**(`left?`, `right?`, `relativeEpsilon?`, `absoluteEpsilon?`): `boolean`

Compares the provided Cartesians componentwise and returns
`true` if they pass an absolute or relative tolerance test,
`false` otherwise.

#### Parameters

##### left?

`Cartesian3`

The first Cartesian.

##### right?

`Cartesian3`

The second Cartesian.

##### relativeEpsilon?

`number`

The relative epsilon tolerance to use for equality testing.

##### absoluteEpsilon?

`number`

The absolute epsilon tolerance to use for equality testing.

#### Returns

`boolean`

`true` if left and right are within the provided epsilon, `false` otherwise.

***

### fromArray()

> `static` **fromArray**(`array`, `startingIndex?`, `result?`): `Cartesian3`

Creates a Cartesian3 from three consecutive elements in an array.

#### Parameters

##### array

`number`[]

The array whose three consecutive elements correspond to the x, y, and z components, respectively.

##### startingIndex?

`number`

The offset into the array of the first element, which corresponds to the x component.

##### result?

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter or a new Cartesian3 instance if one was not provided.

#### Example

```ts
// Create a Cartesian3 with (1.0, 2.0, 3.0)
const v = [1.0, 2.0, 3.0];
const p = Daisy.Cartesian3.fromArray(v);

// Create a Cartesian3 with (1.0, 2.0, 3.0) using an offset into an array
const v2 = [0.0, 0.0, 1.0, 2.0, 3.0];
const p2 = Daisy.Cartesian3.fromArray(v2, 2);
```

***

### fromCartesian4()

> `static` **fromCartesian4**(`cartesian`, `result?`): `Cartesian3`

Creates a Cartesian3 instance from an existing Cartesian4. This simply takes the
x, y, and z properties of the Cartesian4 and drops w.

#### Parameters

##### cartesian

[`Cartesian4`](Daisy.Cartesian4.md)

The Cartesian4 instance to create a Cartesian3 instance from.

##### result?

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter or a new Cartesian3 instance if one was not provided.

***

### fromDegrees()

> `static` **fromDegrees**(`longitude`, `latitude`, `height?`, `ellipsoid?`, `result?`): `Cartesian3`

Returns a Cartesian3 position from longitude and latitude values given in degrees.

#### Parameters

##### longitude

`number`

The longitude, in degrees

##### latitude

`number`

The latitude, in degrees

##### height?

`number`

The height, in meters, above the ellipsoid.

##### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid on which the position lies.

##### result?

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The position

#### Example

```ts
const position = Daisy.Cartesian3.fromDegrees(-115.0, 37.0);
```

***

### fromDegreesArray()

> `static` **fromDegreesArray**(`coordinates`, `ellipsoid?`, `result?`): `Cartesian3`[]

Returns an array of Cartesian3 positions given an array of longitude and latitude values given in degrees.

#### Parameters

##### coordinates

`number`[]

A list of longitude and latitude values. Values alternate [longitude, latitude, longitude, latitude...].

##### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid on which the coordinates lie.

##### result?

`Cartesian3`[]

An array of Cartesian3 objects to store the result.

#### Returns

`Cartesian3`[]

The array of positions.

#### Example

```ts
const positions = Daisy.Cartesian3.fromDegreesArray([-115.0, 37.0, -107.0, 33.0]);
```

***

### fromDegreesArrayHeights()

> `static` **fromDegreesArrayHeights**(`coordinates`, `ellipsoid?`, `result?`): `Cartesian3`[]

Returns an array of Cartesian3 positions given an array of longitude, latitude and height values where longitude and latitude are given in degrees.

#### Parameters

##### coordinates

`number`[]

A list of longitude, latitude and height values. Values alternate [longitude, latitude, height, longitude, latitude, height...].

##### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid on which the position lies.

##### result?

`Cartesian3`[]

An array of Cartesian3 objects to store the result.

#### Returns

`Cartesian3`[]

The array of positions.

#### Example

```ts
const positions = Daisy.Cartesian3.fromDegreesArrayHeights([-115.0, 37.0, 100000.0, -107.0, 33.0, 150000.0]);
```

***

### fromElements()

> `static` **fromElements**(`x`, `y`, `z`, `result?`): `Cartesian3`

Creates a Cartesian3 instance from x, y and z coordinates.

#### Parameters

##### x

`number`

The x coordinate.

##### y

`number`

The y coordinate.

##### z

`number`

The z coordinate.

##### result?

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter or a new Cartesian3 instance if one was not provided.

***

### fromRadians()

> `static` **fromRadians**(`longitude`, `latitude`, `height?`, `ellipsoid?`, `result?`): `Cartesian3`

Returns a Cartesian3 position from longitude and latitude values given in radians.

#### Parameters

##### longitude

`number`

The longitude, in radians

##### latitude

`number`

The latitude, in radians

##### height?

`number`

The height, in meters, above the ellipsoid.

##### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid on which the position lies.

##### result?

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The position

#### Example

```ts
const position = Daisy.Cartesian3.fromRadians(-2.007, 0.645);
```

***

### fromRadiansArray()

> `static` **fromRadiansArray**(`coordinates`, `ellipsoid?`, `result?`): `Cartesian3`[]

Returns an array of Cartesian3 positions given an array of longitude and latitude values given in radians.

#### Parameters

##### coordinates

`number`[]

A list of longitude and latitude values. Values alternate [longitude, latitude, longitude, latitude...].

##### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid on which the coordinates lie.

##### result?

`Cartesian3`[]

An array of Cartesian3 objects to store the result.

#### Returns

`Cartesian3`[]

The array of positions.

#### Example

```ts
const positions = Daisy.Cartesian3.fromRadiansArray([-2.007, 0.645, -1.867, .575]);
```

***

### fromRadiansArrayHeights()

> `static` **fromRadiansArrayHeights**(`coordinates`, `ellipsoid?`, `result?`): `Cartesian3`[]

Returns an array of Cartesian3 positions given an array of longitude, latitude and height values where longitude and latitude are given in radians.

#### Parameters

##### coordinates

`number`[]

A list of longitude, latitude and height values. Values alternate [longitude, latitude, height, longitude, latitude, height...].

##### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid on which the position lies.

##### result?

`Cartesian3`[]

An array of Cartesian3 objects to store the result.

#### Returns

`Cartesian3`[]

The array of positions.

#### Example

```ts
const positions = Daisy.Cartesian3.fromRadiansArrayHeights([-2.007, 0.645, 100000.0, -1.867, .575, 150000.0]);
```

***

### fromSpherical()

> `static` **fromSpherical**(`spherical`, `result?`): `Cartesian3`

Converts the provided Spherical into Cartesian3 coordinates.

#### Parameters

##### spherical

`Spherical`

The Spherical to be converted to Cartesian3.

##### result?

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter or a new Cartesian3 instance if one was not provided.

***

### lerp()

> `static` **lerp**(`start`, `end`, `t`, `result`): `Cartesian3`

Computes the linear interpolation or extrapolation at t using the provided cartesians.

#### Parameters

##### start

`Cartesian3`

The value corresponding to t at 0.0.

##### end

`Cartesian3`

The value corresponding to t at 1.0.

##### t

`number`

The point along t at which to interpolate.

##### result

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter.

***

### magnitude()

> `static` **magnitude**(`cartesian`): `number`

Computes the Cartesian's magnitude (length).

#### Parameters

##### cartesian

`Cartesian3`

The Cartesian instance whose magnitude is to be computed.

#### Returns

`number`

The magnitude.

***

### magnitudeSquared()

> `static` **magnitudeSquared**(`cartesian`): `number`

Computes the provided Cartesian's squared magnitude.

#### Parameters

##### cartesian

`Cartesian3`

The Cartesian instance whose squared magnitude is to be computed.

#### Returns

`number`

The squared magnitude.

***

### maximumByComponent()

> `static` **maximumByComponent**(`first`, `second`, `result`): `Cartesian3`

Compares two Cartesians and computes a Cartesian which contains the maximum components of the supplied Cartesians.

#### Parameters

##### first

`Cartesian3`

A cartesian to compare.

##### second

`Cartesian3`

A cartesian to compare.

##### result

`Cartesian3`

The object into which to store the result.

#### Returns

`Cartesian3`

A cartesian with the maximum components.

***

### maximumComponent()

> `static` **maximumComponent**(`cartesian`): `number`

Computes the value of the maximum component for the supplied Cartesian.

#### Parameters

##### cartesian

`Cartesian3`

The cartesian to use.

#### Returns

`number`

The value of the maximum component.

***

### midpoint()

> `static` **midpoint**(`left`, `right`, `result`): `Cartesian3`

Computes the midpoint between the right and left Cartesian.

#### Parameters

##### left

`Cartesian3`

The first Cartesian.

##### right

`Cartesian3`

The second Cartesian.

##### result

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The midpoint.

***

### minimumByComponent()

> `static` **minimumByComponent**(`first`, `second`, `result`): `Cartesian3`

Compares two Cartesians and computes a Cartesian which contains the minimum components of the supplied Cartesians.

#### Parameters

##### first

`Cartesian3`

A cartesian to compare.

##### second

`Cartesian3`

A cartesian to compare.

##### result

`Cartesian3`

The object into which to store the result.

#### Returns

`Cartesian3`

A cartesian with the minimum components.

***

### minimumComponent()

> `static` **minimumComponent**(`cartesian`): `number`

Computes the value of the minimum component for the supplied Cartesian.

#### Parameters

##### cartesian

`Cartesian3`

The cartesian to use.

#### Returns

`number`

The value of the minimum component.

***

### mostOrthogonalAxis()

> `static` **mostOrthogonalAxis**(`cartesian`, `result`): `Cartesian3`

Returns the axis that is most orthogonal to the provided Cartesian.

#### Parameters

##### cartesian

`Cartesian3`

The Cartesian on which to find the most orthogonal axis.

##### result

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The most orthogonal axis.

***

### multiplyByScalar()

> `static` **multiplyByScalar**(`cartesian`, `scalar`, `result`): `Cartesian3`

Multiplies the provided Cartesian componentwise by the provided scalar.

#### Parameters

##### cartesian

`Cartesian3`

The Cartesian to be scaled.

##### scalar

`number`

The scalar to multiply with.

##### result

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter.

***

### multiplyComponents()

> `static` **multiplyComponents**(`left`, `right`, `result`): `Cartesian3`

Computes the componentwise product of two Cartesians.

#### Parameters

##### left

`Cartesian3`

The first Cartesian.

##### right

`Cartesian3`

The second Cartesian.

##### result

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter.

***

### negate()

> `static` **negate**(`cartesian`, `result`): `Cartesian3`

Negates the provided Cartesian.

#### Parameters

##### cartesian

`Cartesian3`

The Cartesian to be negated.

##### result

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter.

***

### normalize()

> `static` **normalize**(`cartesian`, `result`): `Cartesian3`

Computes the normalized form of the supplied Cartesian.

#### Parameters

##### cartesian

`Cartesian3`

The Cartesian to be normalized.

##### result

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter.

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`Cartesian3`

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

### packArray()

> `static` **packArray**(`array`, `result?`): `number`[]

Flattens an array of Cartesian3s into an array of components.

#### Parameters

##### array

`Cartesian3`[]

The array of cartesians to pack.

##### result?

`number`[]

The array onto which to store the result. If this is a typed array, it must have array.length * 3 components, else a DeveloperError will be thrown. If it is a regular array, it will be resized to have (array.length * 3) elements.

#### Returns

`number`[]

The packed array.

***

### projectVector()

> `static` **projectVector**(`a`, `b`, `result`): `Cartesian3`

Projects vector a onto vector b

#### Parameters

##### a

`Cartesian3`

The vector that needs projecting

##### b

`Cartesian3`

The vector to project onto

##### result

`Cartesian3`

The result cartesian

#### Returns

`Cartesian3`

The modified result parameter

***

### subtract()

> `static` **subtract**(`left`, `right`, `result`): `Cartesian3`

Computes the componentwise difference of two Cartesians.

#### Parameters

##### left

`Cartesian3`

The first Cartesian.

##### right

`Cartesian3`

The second Cartesian.

##### result

`Cartesian3`

The object onto which to store the result.

#### Returns

`Cartesian3`

The modified result parameter.

***

### unpack()

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `Cartesian3`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`Cartesian3`

The object into which to store the result.

#### Returns

`Cartesian3`

The modified result parameter or a new Cartesian3 instance if one was not provided.

***

### unpackArray()

> `static` **unpackArray**(`array`, `result?`): `Cartesian3`[]

Unpacks an array of cartesian components into an array of Cartesian3s.

#### Parameters

##### array

`number`[]

The array of components to unpack.

##### result?

`Cartesian3`[]

The array onto which to store the result.

#### Returns

`Cartesian3`[]

The unpacked array.
