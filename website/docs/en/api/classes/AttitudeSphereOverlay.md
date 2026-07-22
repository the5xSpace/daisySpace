[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AttitudeSphereOverlay

# Class: AttitudeSphereOverlay

AttitudeSphereOverlay: 2D Canvas version of the attitude sphere (HUD).

## Remarks

- Suitable for placing in the top-right/top-left corner of the main view as a "camera orientation indicator".
- This class is only responsible for rendering; it does not automatically subscribe to frame events. The business side should call `renderFromCamera` at appropriate times.

## Constructors

### Constructor

> **new AttitudeSphereOverlay**(`viewer`, `options?`): `AttitudeSphereOverlay`

Creates the overlay and appends the canvas to the container.

#### Parameters

##### viewer

[`Engine`](Engine.md)

Daisy SDK Engine。

##### options?

[`AttitudeSphereOverlayOptions`](../types/AttitudeSphereOverlayOptions.md)

Overlay parameters.

#### Returns

`AttitudeSphereOverlay`

## Methods

### destroy()

> **destroy**(): `void`

Removes the canvas and releases references.

#### Returns

`void`

***

### renderFromCamera()

> **renderFromCamera**(`camera`): `void`

Renders the attitude sphere to the canvas based on the camera orientation.

#### Parameters

##### camera

`Camera`

 Camera.

#### Returns

`void`

#### Remarks

- This method performs "immediate rendering": each call clears and redraws the current frame content.
- It is recommended to call it in the frame callback (e.g. `scene.postRender`) or camera change callback.
