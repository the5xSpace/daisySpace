[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TimelineTrack

# Class: TimelineTrack

## Constructors

### Constructor

> **new TimelineTrack**(`interval`, `pixelHeight`, `color?`, `backgroundColor?`): `TimelineTrack`

#### Parameters

##### interval

###### start

`JulianDate`

###### stop

`JulianDate`

##### pixelHeight

`number`

##### color?

`Color`

##### backgroundColor?

`Color`

#### Returns

`TimelineTrack`

## Properties

### backgroundColor

> `readonly` **backgroundColor**: `Color`

***

### color

> `readonly` **color**: `Color`

***

### height

> `readonly` **height**: `number`

***

### interval

> `readonly` **interval**: `object`

#### start

> **start**: `JulianDate`

#### stop

> **stop**: `JulianDate`

## Methods

### render()

> **render**(`context`, `renderState`): `void`

#### Parameters

##### context

`CanvasRenderingContext2D`

##### renderState

[`TimelineTrackRenderState`](../interfaces/TimelineTrackRenderState.md)

#### Returns

`void`
