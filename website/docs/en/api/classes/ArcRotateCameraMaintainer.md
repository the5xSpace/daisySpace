[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArcRotateCameraMaintainer

# Class: ArcRotateCameraMaintainer

ArcRotate camera maintainer.

Designed for follow-view needs of "rotating/zooming around a target point": internally maintains a set of orbit parameters (horizontal angle/pitch/distance/roll), and computes and applies camera pose each frame based on the target's transform.

Features:
- Supports DaisyEntity / compatible objects (as long as they provide worldMatrix / or can fall back to position)
- Supports fallback when target worldMatrix is missing (prefers the last valid matrix; or generates a translation matrix from state position)
- Supports ellipsoid terrain collision constraint (prevents camera from going below terrain)
- Supports roll (rotation around the view direction)
- Installable input listeners: drag-to-orbit, scroll-to-zoom; supports disabling/restoring the host's screen space controller

Usage suggestions:
- In practice, the following capability is typically used via `viewer.camera.followTarget(...)`; only use this class directly when custom target resolution, input, or collision strategies are needed.

## Example

```ts
// 低层使用方式：自行维护生命周期与每帧 update
const maintainer = new Daisy.ArcRotateCameraMaintainer(entity, viewer.camera, {
 viewForm: { theta: Math.PI, phi: 0.2, radius: 10000, roll: 0 },
})

maintainer.attach()

// 可选：安装输入（拖拽/滚轮）
maintainer.installInputListeners({
 canvas: viewer._originScene.canvas,
 screenSpaceCameraController: viewer._originScene.screenSpaceCameraController,
})

// 接入渲染循环（time 由外部回调传入）
const remove = viewer._originScene.preRender.addEventListener((_, time) => {
 maintainer.update(time)
})

// 清理
// remove(); maintainer.dispose()
```

## Constructors

### Constructor

> **new ArcRotateCameraMaintainer**(`entity`, `camera`, `options?`): `ArcRotateCameraMaintainer`

#### Parameters

##### entity

[`ArcRotateDaisyEntityLike`](../types/ArcRotateDaisyEntityLike.md)

Follow target (DaisyEntity or compatible object)

##### camera

[`ArcRotateCameraHost`](../types/ArcRotateCameraHost.md)

Camera host (provides underlying camera reference)

##### options?

[`ArcRotateCameraOptions`](../types/ArcRotateCameraOptions.md)

Initial view and local coordinate system configuration

#### Returns

`ArcRotateCameraMaintainer`

### Constructor

> **new ArcRotateCameraMaintainer**(`entity`, `camera`, `options?`): `ArcRotateCameraMaintainer`

#### Parameters

##### entity

[`ArcRotateEntityLike`](../types/ArcRotateEntityLike.md)

##### camera

[`ArcRotateCameraHost`](../types/ArcRotateCameraHost.md)

##### options?

[`ArcRotateCameraOptions`](../types/ArcRotateCameraOptions.md)

#### Returns

`ArcRotateCameraMaintainer`

## Accessors

### disposed

#### Get Signature

> **get** **disposed**(): `boolean`

Whether it has been disposed.

##### Returns

`boolean`

***

### mode

#### Get Signature

> **get** **mode**(): [`ArcRotateCameraMode`](../types/ArcRotateCameraMode.md)

Current working mode:
- Initial: Initialization (not yet in stable following)
- Follow: Following (updated each frame based on target)
- UserControl: External direct camera manipulation (state can be fed back at end)

##### Returns

[`ArcRotateCameraMode`](../types/ArcRotateCameraMode.md)

## Methods

### attach()

> **attach**(): `void`

Initialize and attach to the target, enter follow mode.

#### Returns

`void`

***

### dispose()

> **dispose**(): `void`

Release resources and dereference (includes unloading input listeners and restoring sscc state).

#### Returns

`void`

***

### installInputListeners()

> **installInputListeners**(`options`): `void`

Install input listeners (drag-to-orbit, scroll-to-zoom).

This method does not directly modify the camera; instead, it translates input into orbit/zoom intents for the internal controller;
meanwhile, it temporarily disables `screenSpaceCameraController` input and restores it on uninstall.

#### Parameters

##### options

[`ArcRotateInputInstallOptions`](../types/ArcRotateInputInstallOptions.md)

#### Returns

`void`

***

### onUserControlEnd()

> **onUserControlEnd**(): `void`

Mark exit from user control mode and feed current camera state back into internal orbit parameters.

#### Returns

`void`

***

### onUserControlStart()

> **onUserControlStart**(): `void`

Mark entry into user control mode (call when external direct camera manipulation begins).

#### Returns

`void`

***

### orbitBy()

> **orbitBy**(`deltaTheta`, `deltaPhi`): `void`

Perform orbit by angle increment.

#### Parameters

##### deltaTheta

`number`

Horizontal delta (radians)

##### deltaPhi

`number`

Vertical delta (radians)

#### Returns

`void`

***

### uninstallInputListeners()

> **uninstallInputListeners**(`options?`): `void`

Uninstall input listeners and restore `screenSpaceCameraController` state.

#### Parameters

##### options?

###### screenSpaceCameraController?

`any`

#### Returns

`void`

***

### update()

> **update**(`time`): `void`

Per-frame update (current simulation time is passed by the external render loop).

Note: Do not implicitly obtain time internally; it must be explicitly passed by the caller.

#### Parameters

##### time

`JulianDate`

#### Returns

`void`

***

### zoomByScale()

> **zoomByScale**(`scale`): `void`

Zoom by scale (>0, larger values are farther).

#### Parameters

##### scale

`number`

#### Returns

`void`
