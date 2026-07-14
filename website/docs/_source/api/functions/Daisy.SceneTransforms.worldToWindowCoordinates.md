[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [SceneTransforms](../modules/Daisy.SceneTransforms.md) / worldToWindowCoordinates

# Function: worldToWindowCoordinates()

> **worldToWindowCoordinates**(`scene`, `position`, `result?`): [`Cartesian2`](../classes/Daisy.Cartesian2.md) \| `undefined`

Transforms a position in world (WGS84 or alternative ellipsoid) coordinates to window coordinates. This is commonly used to place an
HTML element at the same screen position as an object in the scene.

## Parameters

### scene

[`Scene`](../classes/Daisy.Scene.md)

The scene.

### position

[`Cartesian3`](../classes/Daisy.Cartesian3.md)

The position in world (WGS84 or alternative ellipsoid) coordinates.

### result?

[`Cartesian2`](../classes/Daisy.Cartesian2.md)

An optional object to return the input position transformed to window coordinates.

## Returns

[`Cartesian2`](../classes/Daisy.Cartesian2.md) \| `undefined`

The modified result parameter or a new Cartesian2 instance if one was not provided. This may be `undefined` if the input position is near the center of the ellipsoid.

## Example

```ts
// Output the window position of longitude/latitude (0, 0) every time the mouse moves.
const position = Daisy.Cartesian3.fromDegrees(0.0, 0.0);
const handler = new Daisy.ScreenSpaceEventHandler(scene.canvas);
handler.setInputAction(function(movement) {
 console.log(Daisy.SceneTransforms.worldToWindowCoordinates(scene, position));
}, Daisy.ScreenSpaceEventType.MOUSE_MOVE);
```
