[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Quaternion

# Class: Quaternion

A set of 4-dimensional coordinates used to represent rotation in 3-dimensional space.

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

> **new Quaternion**(`x?`, `y?`, `z?`, `w?`): `Quaternion`

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

`Quaternion`

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

### IDENTITY

> `readonly` `static` **IDENTITY**: `Quaternion`

An immutable Quaternion instance initialized to (0.0, 0.0, 0.0, 1.0).

***

### packedInterpolationLength

> `static` **packedInterpolationLength**: `number`

The number of elements used to store the object into an array in its interpolatable form.

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

***

### ZERO

> `readonly` `static` **ZERO**: `Quaternion`

An immutable Quaternion instance initialized to (0.0, 0.0, 0.0, 0.0).

## Methods

### clone()

> **clone**(`result?`): `Quaternion`

Duplicates this Quaternion instance.

#### Parameters

##### result?

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter or a new Quaternion instance if one was not provided.

***

### equals()

> **equals**(`right?`): `boolean`

Compares this and the provided quaternion componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`Quaternion`

The right hand side quaternion.

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.

***

### equalsEpsilon()

> **equalsEpsilon**(`right?`, `epsilon?`): `boolean`

Compares this and the provided quaternion componentwise and returns
`true` if they are within the provided epsilon,
`false` otherwise.

#### Parameters

##### right?

`Quaternion`

The right hand side quaternion.

##### epsilon?

`number`

The epsilon to use for equality testing.

#### Returns

`boolean`

`true` if left and right are within the provided epsilon, `false` otherwise.

***

### toString()

> **toString**(): `string`

Returns a string representing this quaternion in the format (x, y, z, w).

#### Returns

`string`

A string representing this Quaternion.

***

### add()

> `static` **add**(`left`, `right`, `result`): `Quaternion`

Computes the componentwise sum of two quaternions.

#### Parameters

##### left

`Quaternion`

The first quaternion.

##### right

`Quaternion`

The second quaternion.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### clone()

> `static` **clone**(`quaternion`, `result?`): `Quaternion`

Duplicates a Quaternion instance.

#### Parameters

##### quaternion

`Quaternion`

The quaternion to duplicate.

##### result?

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter or a new Quaternion instance if one was not provided. (Returns undefined if quaternion is undefined)

***

### computeAngle()

> `static` **computeAngle**(`quaternion`): `number`

Computes the angle of rotation of the provided quaternion.

#### Parameters

##### quaternion

`Quaternion`

The quaternion to use.

#### Returns

`number`

The angle of rotation.

***

### computeAxis()

> `static` **computeAxis**(`quaternion`, `result`): [`Cartesian3`](Daisy.Cartesian3.md)

Computes the axis of rotation of the provided quaternion.

#### Parameters

##### quaternion

`Quaternion`

The quaternion to use.

##### result

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter.

***

### computeInnerQuadrangle()

> `static` **computeInnerQuadrangle**(`q0`, `q1`, `q2`, `result`): `Quaternion`

Computes an inner quadrangle point.
This will compute quaternions that ensure a squad curve is C<sup>1</sup>.

#### Parameters

##### q0

`Quaternion`

The first quaternion.

##### q1

`Quaternion`

The second quaternion.

##### q2

`Quaternion`

The third quaternion.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### conjugate()

> `static` **conjugate**(`quaternion`, `result`): `Quaternion`

Computes the conjugate of the provided quaternion.

#### Parameters

##### quaternion

`Quaternion`

The quaternion to conjugate.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### convertPackedArrayForInterpolation()

> `static` **convertPackedArrayForInterpolation**(`packedArray`, `startingIndex?`, `lastIndex?`, `result?`): `void`

Converts a packed array into a form suitable for interpolation.

#### Parameters

##### packedArray

`number`[]

The packed array.

##### startingIndex?

`number`

The index of the first element to be converted.

##### lastIndex?

`number`

The index of the last element to be converted.

##### result?

`number`[]

The object into which to store the result.

#### Returns

`void`

***

### divideByScalar()

> `static` **divideByScalar**(`quaternion`, `scalar`, `result`): `Quaternion`

Divides the provided quaternion componentwise by the provided scalar.

#### Parameters

##### quaternion

`Quaternion`

The quaternion to be divided.

##### scalar

`number`

The scalar to divide by.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### dot()

> `static` **dot**(`left`, `right`): `number`

Computes the dot (scalar) product of two quaternions.

#### Parameters

##### left

`Quaternion`

The first quaternion.

##### right

`Quaternion`

The second quaternion.

#### Returns

`number`

The dot product.

***

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Compares the provided quaternions componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### left?

`Quaternion`

The first quaternion.

##### right?

`Quaternion`

The second quaternion.

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.

***

### equalsEpsilon()

> `static` **equalsEpsilon**(`left?`, `right?`, `epsilon?`): `boolean`

Compares the provided quaternions componentwise and returns
`true` if they are within the provided epsilon,
`false` otherwise.

#### Parameters

##### left?

`Quaternion`

The first quaternion.

##### right?

`Quaternion`

The second quaternion.

##### epsilon?

`number`

The epsilon to use for equality testing.

#### Returns

`boolean`

`true` if left and right are within the provided epsilon, `false` otherwise.

***

### exp()

> `static` **exp**(`cartesian`, `result`): `Quaternion`

The exponential quaternion function.

#### Parameters

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The cartesian.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### fastSlerp()

> `static` **fastSlerp**(`start`, `end`, `t`, `result`): `Quaternion`

Computes the spherical linear interpolation or extrapolation at t using the provided quaternions.
This implementation is faster than Quaternion#slerp, but is only accurate up to 10<sup>-6</sup>.

#### Parameters

##### start

`Quaternion`

The value corresponding to t at 0.0.

##### end

`Quaternion`

The value corresponding to t at 1.0.

##### t

`number`

The point along t at which to interpolate.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### fastSquad()

> `static` **fastSquad**(`q0`, `q1`, `s0`, `s1`, `t`, `result`): `Quaternion`

Computes the spherical quadrangle interpolation between quaternions.
An implementation that is faster than Quaternion#squad, but less accurate.

#### Parameters

##### q0

`Quaternion`

The first quaternion.

##### q1

`Quaternion`

The second quaternion.

##### s0

`Quaternion`

The first inner quadrangle.

##### s1

`Quaternion`

The second inner quadrangle.

##### t

`number`

The time in [0,1] used to interpolate.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter or a new instance if none was provided.

***

### fromAxisAngle()

> `static` **fromAxisAngle**(`axis`, `angle`, `result?`): `Quaternion`

Computes a quaternion representing a rotation around an axis.

#### Parameters

##### axis

[`Cartesian3`](Daisy.Cartesian3.md)

The axis of rotation.

##### angle

`number`

The angle in radians to rotate around the axis.

##### result?

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter or a new Quaternion instance if one was not provided.

***

### fromHeadingPitchRoll()

> `static` **fromHeadingPitchRoll**(`headingPitchRoll`, `result?`): `Quaternion`

Computes a rotation from the given heading, pitch and roll angles. Heading is the rotation about the
negative z axis. Pitch is the rotation about the negative y axis. Roll is the rotation about
the positive x axis.

#### Parameters

##### headingPitchRoll

`HeadingPitchRoll`

The rotation expressed as a heading, pitch and roll.

##### result?

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter or a new Quaternion instance if none was provided.

***

### fromRotationMatrix()

> `static` **fromRotationMatrix**(`matrix`, `result?`): `Quaternion`

Computes a Quaternion from the provided Matrix3 instance.

#### Parameters

##### matrix

[`Matrix3`](Daisy.Matrix3.md)

The rotation matrix.

##### result?

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter or a new Quaternion instance if one was not provided.

***

### inverse()

> `static` **inverse**(`quaternion`, `result`): `Quaternion`

Computes the inverse of the provided quaternion.

#### Parameters

##### quaternion

`Quaternion`

The quaternion to normalize.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### lerp()

> `static` **lerp**(`start`, `end`, `t`, `result`): `Quaternion`

Computes the linear interpolation or extrapolation at t using the provided quaternions.

#### Parameters

##### start

`Quaternion`

The value corresponding to t at 0.0.

##### end

`Quaternion`

The value corresponding to t at 1.0.

##### t

`number`

The point along t at which to interpolate.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### log()

> `static` **log**(`quaternion`, `result`): [`Cartesian3`](Daisy.Cartesian3.md)

The logarithmic quaternion function.

#### Parameters

##### quaternion

`Quaternion`

The unit quaternion.

##### result

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter.

***

### magnitude()

> `static` **magnitude**(`quaternion`): `number`

Computes magnitude for the provided quaternion.

#### Parameters

##### quaternion

`Quaternion`

The quaternion to conjugate.

#### Returns

`number`

The magnitude.

***

### magnitudeSquared()

> `static` **magnitudeSquared**(`quaternion`): `number`

Computes magnitude squared for the provided quaternion.

#### Parameters

##### quaternion

`Quaternion`

The quaternion to conjugate.

#### Returns

`number`

The magnitude squared.

***

### multiply()

> `static` **multiply**(`left`, `right`, `result`): `Quaternion`

Computes the product of two quaternions.

#### Parameters

##### left

`Quaternion`

The first quaternion.

##### right

`Quaternion`

The second quaternion.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### multiplyByScalar()

> `static` **multiplyByScalar**(`quaternion`, `scalar`, `result`): `Quaternion`

Multiplies the provided quaternion componentwise by the provided scalar.

#### Parameters

##### quaternion

`Quaternion`

The quaternion to be scaled.

##### scalar

`number`

The scalar to multiply with.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### negate()

> `static` **negate**(`quaternion`, `result`): `Quaternion`

Negates the provided quaternion.

#### Parameters

##### quaternion

`Quaternion`

The quaternion to be negated.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### normalize()

> `static` **normalize**(`quaternion`, `result`): `Quaternion`

Computes the normalized form of the provided quaternion.

#### Parameters

##### quaternion

`Quaternion`

The quaternion to normalize.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`Quaternion`

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

### slerp()

> `static` **slerp**(`start`, `end`, `t`, `result`): `Quaternion`

Computes the spherical linear interpolation or extrapolation at t using the provided quaternions.

#### Parameters

##### start

`Quaternion`

The value corresponding to t at 0.0.

##### end

`Quaternion`

The value corresponding to t at 1.0.

##### t

`number`

The point along t at which to interpolate.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### squad()

> `static` **squad**(`q0`, `q1`, `s0`, `s1`, `t`, `result`): `Quaternion`

Computes the spherical quadrangle interpolation between quaternions.

#### Parameters

##### q0

`Quaternion`

The first quaternion.

##### q1

`Quaternion`

The second quaternion.

##### s0

`Quaternion`

The first inner quadrangle.

##### s1

`Quaternion`

The second inner quadrangle.

##### t

`number`

The time in [0,1] used to interpolate.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

#### Example

```ts
// 1. compute the squad interpolation between two quaternions on a curve
const s0 = Daisy.Quaternion.computeInnerQuadrangle(quaternions[i - 1], quaternions[i], quaternions[i + 1], new Daisy.Quaternion());
const s1 = Daisy.Quaternion.computeInnerQuadrangle(quaternions[i], quaternions[i + 1], quaternions[i + 2], new Daisy.Quaternion());
const q = Daisy.Quaternion.squad(quaternions[i], quaternions[i + 1], s0, s1, t, new Daisy.Quaternion());

// 2. compute the squad interpolation as above but where the first quaternion is a end point.
const s1 = Daisy.Quaternion.computeInnerQuadrangle(quaternions[0], quaternions[1], quaternions[2], new Daisy.Quaternion());
const q = Daisy.Quaternion.squad(quaternions[0], quaternions[1], quaternions[0], s1, t, new Daisy.Quaternion());
```

***

### subtract()

> `static` **subtract**(`left`, `right`, `result`): `Quaternion`

Computes the componentwise difference of two quaternions.

#### Parameters

##### left

`Quaternion`

The first quaternion.

##### right

`Quaternion`

The second quaternion.

##### result

`Quaternion`

The object onto which to store the result.

#### Returns

`Quaternion`

The modified result parameter.

***

### unpack()

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `Quaternion`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`Quaternion`

The object into which to store the result.

#### Returns

`Quaternion`

The modified result parameter or a new Quaternion instance if one was not provided.

***

### unpackInterpolationResult()

> `static` **unpackInterpolationResult**(`array`, `sourceArray`, `firstIndex?`, `lastIndex?`, `result?`): `Quaternion`

Retrieves an instance from a packed array converted with [convertPackedArrayForInterpolation](#convertpackedarrayforinterpolation).

#### Parameters

##### array

`number`[]

The array previously packed for interpolation.

##### sourceArray

`number`[]

The original packed array.

##### firstIndex?

`number`

The firstIndex used to convert the array.

##### lastIndex?

`number`

The lastIndex used to convert the array.

##### result?

`Quaternion`

The object into which to store the result.

#### Returns

`Quaternion`

The modified result parameter or a new Quaternion instance if one was not provided.
