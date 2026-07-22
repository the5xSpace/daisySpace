[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FollowTargetOptions

# Type Alias: FollowTargetOptions

> **FollowTargetOptions** = `object`

Camera follow target configuration.

## Properties

### arcRotate?

> `optional` **arcRotate?**: `object`

Orbit follow interaction configuration.

#### disableGroundCollisionSlideBelowTargetHeight?

> `optional` **disableGroundCollisionSlideBelowTargetHeight?**: `number`

Disables ground collision slide when the target is below this height, in meters.

#### enableGroundCollisionSlide?

> `optional` **enableGroundCollisionSlide?**: `boolean`

Whether to slide along the terrain when near the ground.

#### targetFrameMode?

> `optional` **targetFrameMode?**: [`ArcRotateTargetFrameMode`](ArcRotateTargetFrameMode.md)

Target local coordinate system mode.

***

### installInputListeners?

> `optional` **installInputListeners?**: `boolean`

Whether to install follow interaction listeners. Default `true`.

***

### optimizeRender?

> `optional` **optimizeRender?**: `boolean`

Whether to enable on-demand rendering optimization while following. Default `true`.

***

### view?

> `optional` **view?**: [`FollowTargetView`](FollowTargetView.md)

Follow view.
