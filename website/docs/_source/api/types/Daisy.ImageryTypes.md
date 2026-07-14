[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / ImageryTypes

# Type Alias: ImageryTypes

> **ImageryTypes** = `HTMLImageElement` \| `HTMLCanvasElement` \| `ImageBitmap`

The format in which [ImageryProvider](../classes/Daisy.ImageryProvider.md) methods return an image may
vary by provider, configuration, or server settings. Most common are
`HTMLImageElement`, `HTMLCanvasElement`, or on supported
browsers, `ImageBitmap`.

See the documentation for each ImageryProvider class for more information about how they return images.
