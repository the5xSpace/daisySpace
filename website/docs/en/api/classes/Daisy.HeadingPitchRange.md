[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / HeadingPitchRange

# Class: HeadingPitchRange

Defines a heading angle, pitch angle, and range in a local frame.
Heading is the rotation from the local east direction where a positive angle is increasing southward.
Pitch is the rotation from the local xy-plane. Positive pitch angles are above the plane. Negative pitch
angles are below the plane. Range is the distance from the center of the frame.

## Param

The heading angle in radians.

## Param

The pitch angle in radians.

## Param

The distance from the center in meters.

## Constructors

### Constructor

> **new HeadingPitchRange**(`heading?`, `pitch?`, `range?`): `HeadingPitchRange`

#### Parameters

##### heading?

`number`

##### pitch?

`number`

##### range?

`number`

#### Returns

`HeadingPitchRange`

## Properties

### heading

> **heading**: `number`

Heading is the rotation from the local east direction where a positive angle is increasing southward.

***

### pitch

> **pitch**: `number`

Pitch is the rotation from the local xy-plane. Positive pitch angles
are above the plane. Negative pitch angles are below the plane.

***

### range

> **range**: `number`

Range is the distance from the center of the local frame.

## Methods

### clone()

> `static` **clone**(`hpr`, `result?`): `HeadingPitchRange`

Duplicates a HeadingPitchRange instance.

#### Parameters

##### hpr

`HeadingPitchRange`

The HeadingPitchRange to duplicate.

##### result?

`HeadingPitchRange`

The object onto which to store the result.

#### Returns

`HeadingPitchRange`

The modified result parameter or a new HeadingPitchRange instance if one was not provided. (Returns undefined if hpr is undefined)
