[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Cartesian4

# Class: Cartesian4

A 4D Cartesian point.

## Param

**x**

The X component.

## Param

**y**

The Y component.

## Param

**z**

The Z component.

## Param

**w**

The W component.

## Constructors

### Constructor

> **new Cartesian4**(`x?`, `y?`, `z?`, `w?`): `Cartesian4`

#### Parameters

##### x?

`number`

##### y?

`number`

##### z?

`number`

##### w?

`number`

#### Returns

`Cartesian4`

## Properties

### w

> **w**: `number`

The W component.

***

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

> `readonly` `static` **ONE**: `Cartesian4`

An immutable Cartesian4 instance initialized to (1.0, 1.0, 1.0, 1.0).

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

***

### UNIT\_W

> `readonly` `static` **UNIT\_W**: `Cartesian4`

An immutable Cartesian4 instance initialized to (0.0, 0.0, 0.0, 1.0).

***

### UNIT\_X

> `readonly` `static` **UNIT\_X**: `Cartesian4`

An immutable Cartesian4 instance initialized to (1.0, 0.0, 0.0, 0.0).

***

### UNIT\_Y

> `readonly` `static` **UNIT\_Y**: `Cartesian4`

An immutable Cartesian4 instance initialized to (0.0, 1.0, 0.0, 0.0).

***

### UNIT\_Z

> `readonly` `static` **UNIT\_Z**: `Cartesian4`

An immutable Cartesian4 instance initialized to (0.0, 0.0, 1.0, 0.0).

***

### ZERO

> `readonly` `static` **ZERO**: `Cartesian4`

An immutable Cartesian4 instance initialized to (0.0, 0.0, 0.0, 0.0).

## Methods

### clone()

> **clone**(`result?`): `Cartesian4`

Duplicates this Cartesian4 instance.

#### Parameters

##### result?

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter or a new Cartesian4 instance if one was not provided.

***

### equals()

> **equals**(`right?`): `boolean`

Compares this Cartesian against the provided Cartesian componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`Cartesian4`

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

`Cartesian4`

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

Creates a string representing this Cartesian in the format '(x, y, z, w)'.

#### Returns

`string`

A string representing the provided Cartesian in the format '(x, y, z, w)'.

***

### abs()

> `static` **abs**(`cartesian`, `result`): `Cartesian4`

Computes the absolute value of the provided Cartesian.

#### Parameters

##### cartesian

`Cartesian4`

The Cartesian whose absolute value is to be computed.

##### result

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter.

***

### add()

> `static` **add**(`left`, `right`, `result`): `Cartesian4`

Computes the componentwise sum of two Cartesians.

#### Parameters

##### left

`Cartesian4`

The first Cartesian.

##### right

`Cartesian4`

The second Cartesian.

##### result

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter.

***

### clamp()

> `static` **clamp**(`value`, `min`, `max`, `result`): `Cartesian4`

Constrain a value to lie between two values.

#### Parameters

##### value

`Cartesian4`

The value to clamp.

##### min

`Cartesian4`

The minimum bound.

##### max

`Cartesian4`

The maximum bound.

##### result

`Cartesian4`

The object into which to store the result.

#### Returns

`Cartesian4`

The clamped value such that min <= result <= max.

***

### clone()

> `static` **clone**(`cartesian`, `result?`): `Cartesian4`

Duplicates a Cartesian4 instance.

#### Parameters

##### cartesian

`Cartesian4`

The Cartesian to duplicate.

##### result?

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter or a new Cartesian4 instance if one was not provided. (Returns undefined if cartesian is undefined)

***

### distance()

> `static` **distance**(`left`, `right`): `number`

Computes the 4-space distance between two points.

#### Parameters

##### left

`Cartesian4`

The first point to compute the distance from.

##### right

`Cartesian4`

The second point to compute the distance to.

#### Returns

`number`

The distance between two points.

#### Example

```ts
// Returns 1.0
const d = Daisy.Cartesian4.distance(
 new Daisy.Cartesian4(1.0, 0.0, 0.0, 0.0),
 new Daisy.Cartesian4(2.0, 0.0, 0.0, 0.0));
```

***

### distanceSquared()

> `static` **distanceSquared**(`left`, `right`): `number`

Computes the squared distance between two points. Comparing squared distances
using this function is more efficient than comparing distances using Cartesian4#distance.

#### Parameters

##### left

`Cartesian4`

The first point to compute the distance from.

##### right

`Cartesian4`

The second point to compute the distance to.

#### Returns

`number`

The distance between two points.

#### Example

```ts
// Returns 4.0, not 2.0
const d = Daisy.Cartesian4.distance(
 new Daisy.Cartesian4(1.0, 0.0, 0.0, 0.0),
 new Daisy.Cartesian4(3.0, 0.0, 0.0, 0.0));
```

***

### divideByScalar()

> `static` **divideByScalar**(`cartesian`, `scalar`, `result`): `Cartesian4`

Divides the provided Cartesian componentwise by the provided scalar.

#### Parameters

##### cartesian

`Cartesian4`

The Cartesian to be divided.

##### scalar

`number`

The scalar to divide by.

##### result

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter.

***

### divideComponents()

> `static` **divideComponents**(`left`, `right`, `result`): `Cartesian4`

Computes the componentwise quotient of two Cartesians.

#### Parameters

##### left

`Cartesian4`

The first Cartesian.

##### right

`Cartesian4`

The second Cartesian.

##### result

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter.

***

### dot()

> `static` **dot**(`left`, `right`): `number`

Computes the dot (scalar) product of two Cartesians.

#### Parameters

##### left

`Cartesian4`

The first Cartesian.

##### right

`Cartesian4`

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

`Cartesian4`

The first Cartesian.

##### right?

`Cartesian4`

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

`Cartesian4`

The first Cartesian.

##### right?

`Cartesian4`

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

> `static` **fromArray**(`array`, `startingIndex?`, `result?`): `Cartesian4`

Creates a Cartesian4 from four consecutive elements in an array.

#### Parameters

##### array

`number`[]

The array whose four consecutive elements correspond to the x, y, z, and w components, respectively.

##### startingIndex?

`number`

The offset into the array of the first element, which corresponds to the x component.

##### result?

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter or a new Cartesian4 instance if one was not provided.

#### Example

```ts
// Create a Cartesian4 with (1.0, 2.0, 3.0, 4.0)
const v = [1.0, 2.0, 3.0, 4.0];
const p = Daisy.Cartesian4.fromArray(v);

// Create a Cartesian4 with (1.0, 2.0, 3.0, 4.0) using an offset into an array
const v2 = [0.0, 0.0, 1.0, 2.0, 3.0, 4.0];
const p2 = Daisy.Cartesian4.fromArray(v2, 2);
```

***

### fromColor()

> `static` **fromColor**(`color`, `result?`): `Cartesian4`

Creates a Cartesian4 instance from a [Color](Daisy.Color.md). `red`, `green`, `blue`,
and `alpha` map to `x`, `y`, `z`, and `w`, respectively.

#### Parameters

##### color

[`Color`](Daisy.Color.md)

The source color.

##### result?

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter or a new Cartesian4 instance if one was not provided.

***

### fromElements()

> `static` **fromElements**(`x`, `y`, `z`, `w`, `result?`): `Cartesian4`

Creates a Cartesian4 instance from x, y, z and w coordinates.

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

##### w

`number`

The w coordinate.

##### result?

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter or a new Cartesian4 instance if one was not provided.

***

### lerp()

> `static` **lerp**(`start`, `end`, `t`, `result`): `Cartesian4`

Computes the linear interpolation or extrapolation at t using the provided cartesians.

#### Parameters

##### start

`Cartesian4`

The value corresponding to t at 0.0.

##### end

`Cartesian4`

The value corresponding to t at 1.0.

##### t

`number`

The point along t at which to interpolate.

##### result

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter.

***

### magnitude()

> `static` **magnitude**(`cartesian`): `number`

Computes the Cartesian's magnitude (length).

#### Parameters

##### cartesian

`Cartesian4`

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

`Cartesian4`

The Cartesian instance whose squared magnitude is to be computed.

#### Returns

`number`

The squared magnitude.

***

### maximumByComponent()

> `static` **maximumByComponent**(`first`, `second`, `result`): `Cartesian4`

Compares two Cartesians and computes a Cartesian which contains the maximum components of the supplied Cartesians.

#### Parameters

##### first

`Cartesian4`

A cartesian to compare.

##### second

`Cartesian4`

A cartesian to compare.

##### result

`Cartesian4`

The object into which to store the result.

#### Returns

`Cartesian4`

A cartesian with the maximum components.

***

### maximumComponent()

> `static` **maximumComponent**(`cartesian`): `number`

Computes the value of the maximum component for the supplied Cartesian.

#### Parameters

##### cartesian

`Cartesian4`

The cartesian to use.

#### Returns

`number`

The value of the maximum component.

***

### minimumByComponent()

> `static` **minimumByComponent**(`first`, `second`, `result`): `Cartesian4`

Compares two Cartesians and computes a Cartesian which contains the minimum components of the supplied Cartesians.

#### Parameters

##### first

`Cartesian4`

A cartesian to compare.

##### second

`Cartesian4`

A cartesian to compare.

##### result

`Cartesian4`

The object into which to store the result.

#### Returns

`Cartesian4`

A cartesian with the minimum components.

***

### minimumComponent()

> `static` **minimumComponent**(`cartesian`): `number`

Computes the value of the minimum component for the supplied Cartesian.

#### Parameters

##### cartesian

`Cartesian4`

The cartesian to use.

#### Returns

`number`

The value of the minimum component.

***

### mostOrthogonalAxis()

> `static` **mostOrthogonalAxis**(`cartesian`, `result`): `Cartesian4`

Returns the axis that is most orthogonal to the provided Cartesian.

#### Parameters

##### cartesian

`Cartesian4`

The Cartesian on which to find the most orthogonal axis.

##### result

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The most orthogonal axis.

***

### multiplyByScalar()

> `static` **multiplyByScalar**(`cartesian`, `scalar`, `result`): `Cartesian4`

Multiplies the provided Cartesian componentwise by the provided scalar.

#### Parameters

##### cartesian

`Cartesian4`

The Cartesian to be scaled.

##### scalar

`number`

The scalar to multiply with.

##### result

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter.

***

### multiplyComponents()

> `static` **multiplyComponents**(`left`, `right`, `result`): `Cartesian4`

Computes the componentwise product of two Cartesians.

#### Parameters

##### left

`Cartesian4`

The first Cartesian.

##### right

`Cartesian4`

The second Cartesian.

##### result

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter.

***

### negate()

> `static` **negate**(`cartesian`, `result`): `Cartesian4`

Negates the provided Cartesian.

#### Parameters

##### cartesian

`Cartesian4`

The Cartesian to be negated.

##### result

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter.

***

### normalize()

> `static` **normalize**(`cartesian`, `result`): `Cartesian4`

Computes the normalized form of the supplied Cartesian.

#### Parameters

##### cartesian

`Cartesian4`

The Cartesian to be normalized.

##### result

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter.

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`Cartesian4`

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

Flattens an array of Cartesian4s into an array of components.

#### Parameters

##### array

`Cartesian4`[]

The array of cartesians to pack.

##### result?

`number`[]

The array onto which to store the result. If this is a typed array, it must have array.length * 4 components, else a DeveloperError will be thrown. If it is a regular array, it will be resized to have (array.length * 4) elements.

#### Returns

`number`[]

The packed array.

***

### packFloat()

> `static` **packFloat**(`value`, `result?`): `Cartesian4`

Packs an arbitrary floating point value to 4 values representable using uint8.

#### Parameters

##### value

`number`

A floating point number.

##### result?

`Cartesian4`

The Cartesian4 that will contain the packed float.

#### Returns

`Cartesian4`

A Cartesian4 representing the float packed to values in x, y, z, and w.

***

### subtract()

> `static` **subtract**(`left`, `right`, `result`): `Cartesian4`

Computes the componentwise difference of two Cartesians.

#### Parameters

##### left

`Cartesian4`

The first Cartesian.

##### right

`Cartesian4`

The second Cartesian.

##### result

`Cartesian4`

The object onto which to store the result.

#### Returns

`Cartesian4`

The modified result parameter.

***

### unpack()

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `Cartesian4`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`Cartesian4`

The object into which to store the result.

#### Returns

`Cartesian4`

The modified result parameter or a new Cartesian4 instance if one was not provided.

***

### unpackArray()

> `static` **unpackArray**(`array`, `result?`): `Cartesian4`[]

Unpacks an array of cartesian components into an array of Cartesian4s.

#### Parameters

##### array

`number`[]

The array of components to unpack.

##### result?

`Cartesian4`[]

The array onto which to store the result.

#### Returns

`Cartesian4`[]

The unpacked array.
