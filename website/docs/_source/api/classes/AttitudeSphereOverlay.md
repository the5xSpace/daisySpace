[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AttitudeSphereOverlay

# Class: AttitudeSphereOverlay

AttitudeSphereOverlay：2D Canvas 版本的姿态球（HUD）。

## Remarks

- 适合放在主视图右上/左上角作为“相机朝向指示器”。
- 该类只负责绘制，不会自动订阅 帧事件；需要业务侧自行在合适的时机调用 `renderFromCamera`。

## Constructors

### Constructor

> **new AttitudeSphereOverlay**(`viewer`, `options?`): `AttitudeSphereOverlay`

创建 overlay 并将 canvas 追加到容器中。

#### Parameters

##### viewer

[`Engine`](Engine.md)

Daisy SDK Engine。

##### options?

[`AttitudeSphereOverlayOptions`](../types/AttitudeSphereOverlayOptions.md)

overlay 参数。

#### Returns

`AttitudeSphereOverlay`

## Methods

### destroy()

> **destroy**(): `void`

移除 canvas 并释放引用。

#### Returns

`void`

***

### renderFromCamera()

> **renderFromCamera**(`camera`): `void`

根据相机姿态渲染姿态球到画布。

#### Parameters

##### camera

`Camera`

 相机。

#### Returns

`void`

#### Remarks

- 该方法是“即时绘制”：每次调用都会清空并重绘当前帧内容。
- 建议在 的帧回调（如 `scene.postRender`）或相机变化回调中调用。
