[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Cartographic

# Class: Cartographic

A position defined by longitude, latitude, and height.

## Param

The longitude, in radians.

## Param

The latitude, in radians.

## Param

The height, in meters, above the ellipsoid.

## Constructors

### Constructor

> **new Cartographic**(`longitude?`, `latitude?`, `height?`): `Cartographic`

#### Parameters

##### longitude?

`number`

##### latitude?

`number`

##### height?

`number`

#### Returns

`Cartographic`

## Properties

### height

> **height**: `number`

The height, in meters, above the ellipsoid.

***

### latitude

> **latitude**: `number`

The latitude, in radians.

***

### longitude

> **longitude**: `number`

The longitude, in radians.

***

### ZERO

> `readonly` `static` **ZERO**: `Cartographic`

An immutable Cartographic instance initialized to (0.0, 0.0, 0.0).

## Methods

### clone()

> **clone**(`result?`): `Cartographic`

Duplicates this instance.

#### Parameters

##### result?

`Cartographic`

The object onto which to store the result.

#### Returns

`Cartographic`

The modified result parameter or a new Cartographic instance if one was not provided.

***

### equals()

> **equals**(`right?`): `boolean`

Compares the provided against this cartographic componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`Cartographic`

The second cartographic.

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.

***

### equalsEpsilon()

> **equalsEpsilon**(`right?`, `epsilon?`): `boolean`

Compares the provided against this cartographic componentwise and returns
`true` if they are within the provided epsilon,
`false` otherwise.

#### Parameters

##### right?

`Cartographic`

The second cartographic.

##### epsilon?

`number`

The epsilon to use for equality testing.

#### Returns

`boolean`

`true` if left and right are within the provided epsilon, `false` otherwise.

***

### toString()

> **toString**(): `string`

Creates a string representing this cartographic in the format '(longitude, latitude, height)'.

#### Returns

`string`

A string representing the provided cartographic in the format '(longitude, latitude, height)'.

***

### clone()

> `static` **clone**(`cartographic`, `result?`): `Cartographic`

Duplicates a Cartographic instance.

#### Parameters

##### cartographic

`Cartographic`

The cartographic to duplicate.

##### result?

`Cartographic`

The object onto which to store the result.

#### Returns

`Cartographic`

The modified result parameter or a new Cartographic instance if one was not provided. (Returns undefined if cartographic is undefined)

***

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Compares the provided cartographics componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### left?

`Cartographic`

The first cartographic.

##### right?

`Cartographic`

The second cartographic.

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.

***

### equalsEpsilon()

> `static` **equalsEpsilon**(`left?`, `right?`, `epsilon?`): `boolean`

Compares the provided cartographics componentwise and returns
`true` if they are within the provided epsilon,
`false` otherwise.

#### Parameters

##### left?

`Cartographic`

The first cartographic.

##### right?

`Cartographic`

The second cartographic.

##### epsilon?

`number`

The epsilon to use for equality testing.

#### Returns

`boolean`

`true` if left and right are within the provided epsilon, `false` otherwise.

***

### fromCartesian()

> `static` **fromCartesian**(`cartesian`, `ellipsoid?`, `result?`): `Cartographic`

Creates a new Cartographic instance from a Cartesian position. The values in the
resulting object will be in radians.

#### Parameters

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The Cartesian position to convert to cartographic representation.

##### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid on which the position lies.

##### result?

`Cartographic`

The object onto which to store the result.

#### Returns

`Cartographic`

The modified result parameter, new Cartographic instance if none was provided, or undefined if the cartesian is at the center of the ellipsoid.

***

### fromDegrees()

> `static` **fromDegrees**(`longitude`, `latitude`, `height?`, `result?`): `Cartographic`

Creates a new Cartographic instance from longitude and latitude
specified in degrees. The values in the resulting object will
be in radians.

#### Parameters

##### longitude

`number`

The longitude, in degrees.

##### latitude

`number`

The latitude, in degrees.

##### height?

`number`

The height, in meters, above the ellipsoid.

##### result?

`Cartographic`

The object onto which to store the result.

#### Returns

`Cartographic`

The modified result parameter or a new Cartographic instance if one was not provided.

***

### fromRadians()

> `static` **fromRadians**(`longitude`, `latitude`, `height?`, `result?`): `Cartographic`

Creates a new Cartographic instance from longitude and latitude
specified in radians.

#### Parameters

##### longitude

`number`

The longitude, in radians.

##### latitude

`number`

The latitude, in radians.

##### height?

`number`

The height, in meters, above the ellipsoid.

##### result?

`Cartographic`

The object onto which to store the result.

#### Returns

`Cartographic`

The modified result parameter or a new Cartographic instance if one was not provided.

***

### toCartesian()

> `static` **toCartesian**(`cartographic`, `ellipsoid?`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md)

Creates a new Cartesian3 instance from a Cartographic input. The values in the inputted
object should be in radians.

#### Parameters

##### cartographic

`Cartographic`

Input to be converted into a Cartesian3 output.

##### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid on which the position lies.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The position
