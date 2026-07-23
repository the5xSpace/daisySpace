[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / NearFarScalar

# Class: NearFarScalar

Represents a scalar value's lower and upper bound at a near distance and far distance in eye space.

## Param

**near**

The lower bound of the camera range.

## Param

**nearValue**

The value at the lower bound of the camera range.

## Param

**far**

The upper bound of the camera range.

## Param

**farValue**

The value at the upper bound of the camera range.

## Constructors

### Constructor

> **new NearFarScalar**(`near?`, `nearValue?`, `far?`, `farValue?`): `NearFarScalar`

#### Parameters

##### near?

`number`

##### nearValue?

`number`

##### far?

`number`

##### farValue?

`number`

#### Returns

`NearFarScalar`

## Properties

### far

> **far**: `number`

The upper bound of the camera range.

***

### farValue

> **farValue**: `number`

The value at the upper bound of the camera range.

***

### near

> **near**: `number`

The lower bound of the camera range.

***

### nearValue

> **nearValue**: `number`

The value at the lower bound of the camera range.

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

## Methods

### clone()

> **clone**(`result?`): `NearFarScalar`

Duplicates this instance.

#### Parameters

##### result?

`NearFarScalar`

The object onto which to store the result.

#### Returns

`NearFarScalar`

The modified result parameter or a new NearFarScalar instance if one was not provided.

***

### equals()

> **equals**(`right?`): `boolean`

Compares this instance to the provided NearFarScalar and returns `true` if they are equal,
`false` otherwise.

#### Parameters

##### right?

`NearFarScalar`

The right hand side NearFarScalar.

#### Returns

`boolean`

`true` if left and right are equal; otherwise `false`.

***

### clone()

> `static` **clone**(`nearFarScalar`, `result?`): `NearFarScalar`

Duplicates a NearFarScalar instance.

#### Parameters

##### nearFarScalar

`NearFarScalar`

The NearFarScalar to duplicate.

##### result?

`NearFarScalar`

The object onto which to store the result.

#### Returns

`NearFarScalar`

The modified result parameter or a new NearFarScalar instance if one was not provided. (Returns undefined if nearFarScalar is undefined)

***

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Compares the provided NearFarScalar and returns `true` if they are equal,
`false` otherwise.

#### Parameters

##### left?

`NearFarScalar`

The first NearFarScalar.

##### right?

`NearFarScalar`

The second NearFarScalar.

#### Returns

`boolean`

`true` if left and right are equal; otherwise `false`.

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`NearFarScalar`

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

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `NearFarScalar`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`NearFarScalar`

The object into which to store the result.

#### Returns

`NearFarScalar`

The modified result parameter or a new NearFarScalar instance if one was not provided.
