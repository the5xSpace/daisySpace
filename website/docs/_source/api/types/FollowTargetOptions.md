[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / FollowTargetOptions

# Type Alias: FollowTargetOptions

> **FollowTargetOptions** = `object`

相机跟踪目标配置。

## Properties

### arcRotate?

> `optional` **arcRotate?**: `object`

环绕跟踪交互配置。

#### disableGroundCollisionSlideBelowTargetHeight?

> `optional` **disableGroundCollisionSlideBelowTargetHeight?**: `number`

低于该目标高度时关闭地面碰撞滑移，单位为米。

#### enableGroundCollisionSlide?

> `optional` **enableGroundCollisionSlide?**: `boolean`

接近地面时是否沿地表滑移。

#### targetFrameMode?

> `optional` **targetFrameMode?**: [`ArcRotateTargetFrameMode`](ArcRotateTargetFrameMode.md)

目标局部坐标系模式。

***

### installInputListeners?

> `optional` **installInputListeners?**: `boolean`

是否安装跟踪交互监听。默认 `true`。

***

### optimizeRender?

> `optional` **optimizeRender?**: `boolean`

是否在跟踪时启用按需渲染优化。默认 `true`。

***

### view?

> `optional` **view?**: [`FollowTargetView`](FollowTargetView.md)

跟踪视角。
