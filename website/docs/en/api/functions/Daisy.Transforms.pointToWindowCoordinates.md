[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [Transforms](../modules/Daisy.Transforms.md) / pointToWindowCoordinates

# Function: pointToWindowCoordinates()

> **pointToWindowCoordinates**(`modelViewProjectionMatrix`, `viewportTransformation`, `point`, `result?`): [`Cartesian2`](../classes/Daisy.Cartesian2.md)

Transform a point from model coordinates to window coordinates.

## Parameters

### modelViewProjectionMatrix

[`Matrix4`](../classes/Daisy.Matrix4.md)

The 4x4 model-view-projection matrix.

### viewportTransformation

[`Matrix4`](../classes/Daisy.Matrix4.md)

The 4x4 viewport transformation.

### point

[`Cartesian3`](../classes/Daisy.Cartesian3.md)

The point to transform.

### result?

[`Cartesian2`](../classes/Daisy.Cartesian2.md)

The object onto which to store the result.

## Returns

[`Cartesian2`](../classes/Daisy.Cartesian2.md)

The modified result parameter or a new Cartesian2 instance if none was provided.
