[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArcRotateCameraOptions

# Type Alias: ArcRotateCameraOptions

> **ArcRotateCameraOptions** = `object`

Orbit camera configuration options.

- viewForm takes priority over initialXXX
- localBodyAxis can be used to override the target's local coordinate system (used to define the reference axis for the orbit target)

## Properties

### disableGroundCollisionSlideBelowTargetHeight?

> `optional` **disableGroundCollisionSlideBelowTargetHeight?**: `number`

When the target is below this height (meters) above the ellipsoid surface, the ground-contact orbit strategy is automatically disabled.

For near-Earth targets, continuing to use ground-contact orbiting can push the camera into the surface; setting this threshold switches to blocking further pull-down.

***

### enableGroundCollisionSlide?

> `optional` **enableGroundCollisionSlide?**: `boolean`

Whether to allow the camera view ray to compress the effective radius after touching the ground, creating a "ground-hugging orbit / bypass from below" interaction.

When disabled, dragging further toward the ground is blocked, but horizontal rotation, upward dragging, and zooming remain available.

#### Default

```ts
true
```

***

### initialPhi?

> `optional` **initialPhi?**: `number`

***

### initialPhiDeg?

> `optional` **initialPhiDeg?**: `number`

***

### initialRadius?

> `optional` **initialRadius?**: `number`

***

### initialRoll?

> `optional` **initialRoll?**: `number`

***

### initialRollDeg?

> `optional` **initialRollDeg?**: `number`

***

### initialTheta?

> `optional` **initialTheta?**: `number`

***

### localBodyAxis?

> `optional` **localBodyAxis?**: `object`

#### x

> **x**: `Daisy.Cartesian3`

#### y

> **y**: `Daisy.Cartesian3`

#### z

> **z**: `Daisy.Cartesian3`

***

### radiusMultiplier?

> `optional` **radiusMultiplier?**: `number`

***

### targetFrameMode?

> `optional` **targetFrameMode?**: [`ArcRotateTargetFrameMode`](ArcRotateTargetFrameMode.md)

Follow reference frame mode.

#### Default

```ts
"model"
```

***

### viewForm?

> `optional` **viewForm?**: [`ArcRotateCameraViewForm`](ArcRotateCameraViewForm.md)
