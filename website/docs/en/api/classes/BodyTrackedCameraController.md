[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BodyTrackedCameraController

# Class: BodyTrackedCameraController

Celestial body tracked camera controller.

When enabled, it takes over partial state updates of the Camera, keeping the observation stable relative to the body coordinate system during celestial body rotation/attitude changes.

## Accessors

### state

#### Get Signature

> **get** **state**(): [`BodyTrackedCameraState`](../interfaces/BodyTrackedCameraState.md) \| `undefined`

Current tracking state; undefined when not enabled.

##### Returns

[`BodyTrackedCameraState`](../interfaces/BodyTrackedCameraState.md) \| `undefined`

## Methods

### disable()

> **disable**(): `void`

Disables body tracking and restores the default behavior of the camera/controller.

#### Returns

`void`

***

### enable()

> **enable**(`body`, `options?`): `void`

Enables body tracking.

#### Parameters

##### body

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

Target celestial ellipsoid

##### options?

###### applyImmediately?

`boolean`

#### Returns

`void`

***

### pause()

> **pause**(): `void`

Pauses tracking (preserves internal state, only removes preRender and input listeners).
Used during flyTo animations to prevent the controller from overriding the animation.

#### Returns

`void`

***

### resume()

> **resume**(): `void`

Resumes tracking (reinstalls preRender and input listeners without recapturing state).

#### Returns

`void`
