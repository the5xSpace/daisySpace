[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BodyTrackedCameraController

# Class: BodyTrackedCameraController

天体机体跟踪相机控制器。

启用后会接管 Camera 的部分状态更新，使相机在天体自转/姿态变化时保持“相对机体坐标系”的稳定观察。

## Accessors

### state

#### Get Signature

> **get** **state**(): [`BodyTrackedCameraState`](../interfaces/BodyTrackedCameraState.md) \| `undefined`

当前跟踪状态；未启用时为 undefined。

##### Returns

[`BodyTrackedCameraState`](../interfaces/BodyTrackedCameraState.md) \| `undefined`

## Methods

### disable()

> **disable**(): `void`

关闭机体跟踪，并恢复相机/控制器的默认行为。

#### Returns

`void`

***

### enable()

> **enable**(`body`, `options?`): `void`

启用机体跟踪。

#### Parameters

##### body

[`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

目标天体椭球体

##### options?

###### applyImmediately?

`boolean`

#### Returns

`void`

***

### pause()

> **pause**(): `void`

暂停跟踪（保留内部状态，仅移除 preRender 和输入监听）。
用于 flyTo 动画期间，防止控制器覆盖动画。

#### Returns

`void`

***

### resume()

> **resume**(): `void`

恢复跟踪（重新安装 preRender 和输入监听，不重新捕获状态）。

#### Returns

`void`
