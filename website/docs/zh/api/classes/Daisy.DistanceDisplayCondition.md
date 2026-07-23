[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / DistanceDisplayCondition

# Class: DistanceDisplayCondition

Determines visibility based on the distance to the camera.

## Example

```ts
// Make a billboard that is only visible when the distance to the camera is between 10 and 20 meters.
billboard.distanceDisplayCondition = new Daisy.DistanceDisplayCondition(10.0, 20.0);
```

## Param

**near**

The smallest distance in the interval where the object is visible.

## Param

**far**

The largest distance in the interval where the object is visible.

## Constructors

### Constructor

> **new DistanceDisplayCondition**(`near?`, `far?`): `DistanceDisplayCondition`

#### Parameters

##### near?

`number`

##### far?

`number`

#### Returns

`DistanceDisplayCondition`

## Properties

### far

> **far**: `number`

The largest distance in the interval where the object is visible.

***

### near

> **near**: `number`

The smallest distance in the interval where the object is visible.

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

## Methods

### clone()

> **clone**(`result?`): `DistanceDisplayCondition`

Duplicates this instance.

#### Parameters

##### result?

`DistanceDisplayCondition`

The result onto which to store the result.

#### Returns

`DistanceDisplayCondition`

The duplicated instance.

***

### equals()

> **equals**(`other?`): `boolean`

Determines if this distance display condition is equal to another.

#### Parameters

##### other?

`DistanceDisplayCondition`

Another distance display condition.

#### Returns

`boolean`

Whether this distance display condition is equal to the other.

***

### clone()

> `static` **clone**(`value?`, `result?`): `DistanceDisplayCondition`

Duplicates a distance display condition instance.

#### Parameters

##### value?

`DistanceDisplayCondition`

The distance display condition to duplicate.

##### result?

`DistanceDisplayCondition`

The result onto which to store the result.

#### Returns

`DistanceDisplayCondition`

The duplicated instance.

***

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Determines if two distance display conditions are equal.

#### Parameters

##### left?

`DistanceDisplayCondition`

A distance display condition.

##### right?

`DistanceDisplayCondition`

Another distance display condition.

#### Returns

`boolean`

Whether the two distance display conditions are equal.

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`DistanceDisplayCondition`

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

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `DistanceDisplayCondition`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`DistanceDisplayCondition`

The object into which to store the result.

#### Returns

`DistanceDisplayCondition`

The modified result parameter or a new DistanceDisplayCondition instance if one was not provided.
