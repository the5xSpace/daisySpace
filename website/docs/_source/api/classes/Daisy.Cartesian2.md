[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Cartesian2

# Class: Cartesian2

A 2D Cartesian point.

## Param

The X component.

## Param

The Y component.

## Constructors

### Constructor

> **new Cartesian2**(`x?`, `y?`): `Cartesian2`

#### Parameters

##### x?

`number`

##### y?

`number`

#### Returns

`Cartesian2`

## Properties

### x

> **x**: `number`

The X component.

***

### y

> **y**: `number`

The Y component.

***

### ONE

> `readonly` `static` **ONE**: `Cartesian2`

An immutable Cartesian2 instance initialized to (1.0, 1.0).

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

***

### UNIT\_X

> `readonly` `static` **UNIT\_X**: `Cartesian2`

An immutable Cartesian2 instance initialized to (1.0, 0.0).

***

### UNIT\_Y

> `readonly` `static` **UNIT\_Y**: `Cartesian2`

An immutable Cartesian2 instance initialized to (0.0, 1.0).

***

### ZERO

> `readonly` `static` **ZERO**: `Cartesian2`

An immutable Cartesian2 instance initialized to (0.0, 0.0).

## Methods

### clone()

> **clone**(`result?`): `Cartesian2`

Duplicates this Cartesian2 instance.

#### Parameters

##### result?

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter or a new Cartesian2 instance if one was not provided.

***

### equals()

> **equals**(`right?`): `boolean`

Compares this Cartesian against the provided Cartesian componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`Cartesian2`

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

`Cartesian2`

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

Creates a string representing this Cartesian in the format '(x, y)'.

#### Returns

`string`

A string representing the provided Cartesian in the format '(x, y)'.

***

### abs()

> `static` **abs**(`cartesian`, `result`): `Cartesian2`

Computes the absolute value of the provided Cartesian.

#### Parameters

##### cartesian

`Cartesian2`

The Cartesian whose absolute value is to be computed.

##### result

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter.

***

### add()

> `static` **add**(`left`, `right`, `result`): `Cartesian2`

Computes the componentwise sum of two Cartesians.

#### Parameters

##### left

`Cartesian2`

The first Cartesian.

##### right

`Cartesian2`

The second Cartesian.

##### result

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter.

***

### angleBetween()

> `static` **angleBetween**(`left`, `right`): `number`

Returns the angle, in radians, between the provided Cartesians.

#### Parameters

##### left

`Cartesian2`

The first Cartesian.

##### right

`Cartesian2`

The second Cartesian.

#### Returns

`number`

The angle between the Cartesians.

***

### clamp()

> `static` **clamp**(`value`, `min`, `max`, `result`): `Cartesian2`

Constrain a value to lie between two values.

#### Parameters

##### value

`Cartesian2`

The value to clamp.

##### min

`Cartesian2`

The minimum bound.

##### max

`Cartesian2`

The maximum bound.

##### result

`Cartesian2`

The object into which to store the result.

#### Returns

`Cartesian2`

The clamped value such that min <= result <= max.

***

### clone()

> `static` **clone**(`cartesian`, `result?`): `Cartesian2`

Duplicates a Cartesian2 instance.

#### Parameters

##### cartesian

`Cartesian2`

The Cartesian to duplicate.

##### result?

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter or a new Cartesian2 instance if one was not provided. (Returns undefined if cartesian is undefined)

***

### cross()

> `static` **cross**(`left`, `right`): `number`

Computes the magnitude of the cross product that would result from implicitly setting the Z coordinate of the input vectors to 0

#### Parameters

##### left

`Cartesian2`

The first Cartesian.

##### right

`Cartesian2`

The second Cartesian.

#### Returns

`number`

The cross product.

***

### distance()

> `static` **distance**(`left`, `right`): `number`

Computes the distance between two points.

#### Parameters

##### left

`Cartesian2`

The first point to compute the distance from.

##### right

`Cartesian2`

The second point to compute the distance to.

#### Returns

`number`

The distance between two points.

#### Example

```ts
// Returns 1.0
const d = Daisy.Cartesian2.distance(new Daisy.Cartesian2(1.0, 0.0), new Daisy.Cartesian2(2.0, 0.0));
```

***

### distanceSquared()

> `static` **distanceSquared**(`left`, `right`): `number`

Computes the squared distance between two points. Comparing squared distances
using this function is more efficient than comparing distances using Cartesian2#distance.

#### Parameters

##### left

`Cartesian2`

The first point to compute the distance from.

##### right

`Cartesian2`

The second point to compute the distance to.

#### Returns

`number`

The distance between two points.

#### Example

```ts
// Returns 4.0, not 2.0
const d = Daisy.Cartesian2.distance(new Daisy.Cartesian2(1.0, 0.0), new Daisy.Cartesian2(3.0, 0.0));
```

***

### divideByScalar()

> `static` **divideByScalar**(`cartesian`, `scalar`, `result`): `Cartesian2`

Divides the provided Cartesian componentwise by the provided scalar.

#### Parameters

##### cartesian

`Cartesian2`

The Cartesian to be divided.

##### scalar

`number`

The scalar to divide by.

##### result

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter.

***

### divideComponents()

> `static` **divideComponents**(`left`, `right`, `result`): `Cartesian2`

Computes the componentwise quotient of two Cartesians.

#### Parameters

##### left

`Cartesian2`

The first Cartesian.

##### right

`Cartesian2`

The second Cartesian.

##### result

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter.

***

### dot()

> `static` **dot**(`left`, `right`): `number`

Computes the dot (scalar) product of two Cartesians.

#### Parameters

##### left

`Cartesian2`

The first Cartesian.

##### right

`Cartesian2`

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

`Cartesian2`

The first Cartesian.

##### right?

`Cartesian2`

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

`Cartesian2`

The first Cartesian.

##### right?

`Cartesian2`

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

> `static` **fromArray**(`array`, `startingIndex?`, `result?`): `Cartesian2`

Creates a Cartesian2 from two consecutive elements in an array.

#### Parameters

##### array

`number`[]

The array whose two consecutive elements correspond to the x and y components, respectively.

##### startingIndex?

`number`

The offset into the array of the first element, which corresponds to the x component.

##### result?

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter or a new Cartesian2 instance if one was not provided.

#### Example

```ts
// Create a Cartesian2 with (1.0, 2.0)
const v = [1.0, 2.0];
const p = Daisy.Cartesian2.fromArray(v);

// Create a Cartesian2 with (1.0, 2.0) using an offset into an array
const v2 = [0.0, 0.0, 1.0, 2.0];
const p2 = Daisy.Cartesian2.fromArray(v2, 2);
```

***

### fromCartesian3()

> `static` **fromCartesian3**(`cartesian`, `result?`): `Cartesian2`

Creates a Cartesian2 instance from an existing Cartesian3. This simply takes the
x and y properties of the Cartesian3 and drops z.

#### Parameters

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The Cartesian3 instance to create a Cartesian2 instance from.

##### result?

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter or a new Cartesian2 instance if one was not provided.

***

### fromCartesian4()

> `static` **fromCartesian4**(`cartesian`, `result?`): `Cartesian2`

Creates a Cartesian2 instance from an existing Cartesian4. This simply takes the
x and y properties of the Cartesian4 and drops z and w.

#### Parameters

##### cartesian

[`Cartesian4`](Daisy.Cartesian4.md)

The Cartesian4 instance to create a Cartesian2 instance from.

##### result?

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter or a new Cartesian2 instance if one was not provided.

***

### fromElements()

> `static` **fromElements**(`x`, `y`, `result?`): `Cartesian2`

Creates a Cartesian2 instance from x and y coordinates.

#### Parameters

##### x

`number`

The x coordinate.

##### y

`number`

The y coordinate.

##### result?

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter or a new Cartesian2 instance if one was not provided.

***

### lerp()

> `static` **lerp**(`start`, `end`, `t`, `result`): `Cartesian2`

Computes the linear interpolation or extrapolation at t using the provided cartesians.

#### Parameters

##### start

`Cartesian2`

The value corresponding to t at 0.0.

##### end

`Cartesian2`

The value corresponding to t at 1.0.

##### t

`number`

The point along t at which to interpolate.

##### result

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter.

***

### magnitude()

> `static` **magnitude**(`cartesian`): `number`

Computes the Cartesian's magnitude (length).

#### Parameters

##### cartesian

`Cartesian2`

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

`Cartesian2`

The Cartesian instance whose squared magnitude is to be computed.

#### Returns

`number`

The squared magnitude.

***

### maximumByComponent()

> `static` **maximumByComponent**(`first`, `second`, `result`): `Cartesian2`

Compares two Cartesians and computes a Cartesian which contains the maximum components of the supplied Cartesians.

#### Parameters

##### first

`Cartesian2`

A cartesian to compare.

##### second

`Cartesian2`

A cartesian to compare.

##### result

`Cartesian2`

The object into which to store the result.

#### Returns

`Cartesian2`

A cartesian with the maximum components.

***

### maximumComponent()

> `static` **maximumComponent**(`cartesian`): `number`

Computes the value of the maximum component for the supplied Cartesian.

#### Parameters

##### cartesian

`Cartesian2`

The cartesian to use.

#### Returns

`number`

The value of the maximum component.

***

### minimumByComponent()

> `static` **minimumByComponent**(`first`, `second`, `result`): `Cartesian2`

Compares two Cartesians and computes a Cartesian which contains the minimum components of the supplied Cartesians.

#### Parameters

##### first

`Cartesian2`

A cartesian to compare.

##### second

`Cartesian2`

A cartesian to compare.

##### result

`Cartesian2`

The object into which to store the result.

#### Returns

`Cartesian2`

A cartesian with the minimum components.

***

### minimumComponent()

> `static` **minimumComponent**(`cartesian`): `number`

Computes the value of the minimum component for the supplied Cartesian.

#### Parameters

##### cartesian

`Cartesian2`

The cartesian to use.

#### Returns

`number`

The value of the minimum component.

***

### mostOrthogonalAxis()

> `static` **mostOrthogonalAxis**(`cartesian`, `result`): `Cartesian2`

Returns the axis that is most orthogonal to the provided Cartesian.

#### Parameters

##### cartesian

`Cartesian2`

The Cartesian on which to find the most orthogonal axis.

##### result

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The most orthogonal axis.

***

### multiplyByScalar()

> `static` **multiplyByScalar**(`cartesian`, `scalar`, `result`): `Cartesian2`

Multiplies the provided Cartesian componentwise by the provided scalar.

#### Parameters

##### cartesian

`Cartesian2`

The Cartesian to be scaled.

##### scalar

`number`

The scalar to multiply with.

##### result

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter.

***

### multiplyComponents()

> `static` **multiplyComponents**(`left`, `right`, `result`): `Cartesian2`

Computes the componentwise product of two Cartesians.

#### Parameters

##### left

`Cartesian2`

The first Cartesian.

##### right

`Cartesian2`

The second Cartesian.

##### result

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter.

***

### negate()

> `static` **negate**(`cartesian`, `result`): `Cartesian2`

Negates the provided Cartesian.

#### Parameters

##### cartesian

`Cartesian2`

The Cartesian to be negated.

##### result

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter.

***

### normalize()

> `static` **normalize**(`cartesian`, `result`): `Cartesian2`

Computes the normalized form of the supplied Cartesian.

#### Parameters

##### cartesian

`Cartesian2`

The Cartesian to be normalized.

##### result

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter.

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`Cartesian2`

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

Flattens an array of Cartesian2s into an array of components.

#### Parameters

##### array

`Cartesian2`[]

The array of cartesians to pack.

##### result?

`number`[]

The array onto which to store the result. If this is a typed array, it must have array.length * 2 components, else a DeveloperError will be thrown. If it is a regular array, it will be resized to have (array.length * 2) elements.

#### Returns

`number`[]

The packed array.

***

### subtract()

> `static` **subtract**(`left`, `right`, `result`): `Cartesian2`

Computes the componentwise difference of two Cartesians.

#### Parameters

##### left

`Cartesian2`

The first Cartesian.

##### right

`Cartesian2`

The second Cartesian.

##### result

`Cartesian2`

The object onto which to store the result.

#### Returns

`Cartesian2`

The modified result parameter.

***

### unpack()

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `Cartesian2`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`Cartesian2`

The object into which to store the result.

#### Returns

`Cartesian2`

The modified result parameter or a new Cartesian2 instance if one was not provided.

***

### unpackArray()

> `static` **unpackArray**(`array`, `result?`): `Cartesian2`[]

Unpacks an array of cartesian components into an array of Cartesian2s.

#### Parameters

##### array

`number`[]

The array of components to unpack.

##### result?

`Cartesian2`[]

The array onto which to store the result.

#### Returns

`Cartesian2`[]

The unpacked array.
