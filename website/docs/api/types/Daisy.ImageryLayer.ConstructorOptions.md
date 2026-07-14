[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [ImageryLayer](../modules/Daisy.ImageryLayer.md) / ConstructorOptions

# Type Alias: ConstructorOptions

> **ConstructorOptions** = `object`

Initialization options for the ImageryLayer constructor.

## Properties

### alpha?

> `optional` **alpha?**: `number` \| ((...`params`) => `any`)

The alpha blending value of this layer, from 0.0 to 1.0.
 This can either be a simple number or a function with the signature
 `function(frameState, layer, x, y, level)`. The function is passed the
 current frame state, this layer, and the x, y, and level coordinates of the
 imagery tile for which the alpha is required, and it is expected to return
 the alpha value to use for the tile.

***

### brightness?

> `optional` **brightness?**: `number` \| ((...`params`) => `any`)

The brightness of this layer. 1.0 uses the unmodified imagery
 color. Less than 1.0 makes the imagery darker while greater than 1.0 makes it brighter.
 This can either be a simple number or a function with the signature
 `function(frameState, layer, x, y, level)`. The function is passed the
 current frame state, this layer, and the x, y, and level coordinates of the
 imagery tile for which the brightness is required, and it is expected to return
 the brightness value to use for the tile. The function is executed for every
 frame and for every tile, so it must be fast.

***

### colorToAlpha?

> `optional` **colorToAlpha?**: [`Color`](../classes/Daisy.Color.md)

Color to be used as alpha.

***

### colorToAlphaThreshold?

> `optional` **colorToAlphaThreshold?**: `number`

Threshold for color-to-alpha.

***

### contrast?

> `optional` **contrast?**: `number` \| ((...`params`) => `any`)

The contrast of this layer. 1.0 uses the unmodified imagery color.
 Less than 1.0 reduces the contrast while greater than 1.0 increases it.
 This can either be a simple number or a function with the signature
 `function(frameState, layer, x, y, level)`. The function is passed the
 current frame state, this layer, and the x, y, and level coordinates of the
 imagery tile for which the contrast is required, and it is expected to return
 the contrast value to use for the tile. The function is executed for every
 frame and for every tile, so it must be fast.

***

### cutoutRectangle?

> `optional` **cutoutRectangle?**: [`Rectangle`](../classes/Daisy.Rectangle.md)

Cartographic rectangle for cutting out a portion of this ImageryLayer.

***

### dayAlpha?

> `optional` **dayAlpha?**: `number` \| ((...`params`) => `any`)

The alpha blending value of this layer on the day side of the globe, from 0.0 to 1.0.
 This can either be a simple number or a function with the signature
 `function(frameState, layer, x, y, level)`. The function is passed the
 current frame state, this layer, and the x, y, and level coordinates of the
 imagery tile for which the alpha is required, and it is expected to return
 the alpha value to use for the tile. This only takes effect when `enableLighting` is `true`.

***

### gamma?

> `optional` **gamma?**: `number` \| ((...`params`) => `any`)

The gamma correction to apply to this layer. 1.0 uses the unmodified imagery color.
 This can either be a simple number or a function with the signature
 `function(frameState, layer, x, y, level)`. The function is passed the
 current frame state, this layer, and the x, y, and level coordinates of the
 imagery tile for which the gamma is required, and it is expected to return
 the gamma value to use for the tile. The function is executed for every
 frame and for every tile, so it must be fast.

***

### hue?

> `optional` **hue?**: `number` \| ((...`params`) => `any`)

The hue of this layer. 0.0 uses the unmodified imagery color.
 This can either be a simple number or a function with the signature
 `function(frameState, layer, x, y, level)`. The function is passed the
 current frame state, this layer, and the x, y, and level coordinates
 of the imagery tile for which the hue is required, and it is expected to return
 the hue value to use for the tile. The function is executed for every
 frame and for every tile, so it must be fast.

***

### magnificationFilter?

> `optional` **magnificationFilter?**: `TextureMagnificationFilter`

The
 texture minification filter to apply to this layer. Possible values
 are `TextureMagnificationFilter.LINEAR` and
 `TextureMagnificationFilter.NEAREST`.

***

### maximumAnisotropy?

> `optional` **maximumAnisotropy?**: `number`

The maximum anisotropy level to use
 for texture filtering. If this parameter is not specified, the maximum anisotropy supported
 by the WebGL stack will be used. Larger values make the imagery look better in horizon
 views.

***

### maximumTerrainLevel?

> `optional` **maximumTerrainLevel?**: `number`

The maximum terrain level-of-detail at which to show this imagery layer,
 or undefined to show it at all levels. Level zero is the least-detailed level.

***

### minificationFilter?

> `optional` **minificationFilter?**: `TextureMinificationFilter`

The
 texture minification filter to apply to this layer. Possible values
 are `TextureMinificationFilter.LINEAR` and
 `TextureMinificationFilter.NEAREST`.

***

### minimumTerrainLevel?

> `optional` **minimumTerrainLevel?**: `number`

The minimum terrain level-of-detail at which to show this imagery layer,
 or undefined to show it at all levels. Level zero is the least-detailed level.

***

### nightAlpha?

> `optional` **nightAlpha?**: `number` \| ((...`params`) => `any`)

The alpha blending value of this layer on the night side of the globe, from 0.0 to 1.0.
 This can either be a simple number or a function with the signature
 `function(frameState, layer, x, y, level)`. The function is passed the
 current frame state, this layer, and the x, y, and level coordinates of the
 imagery tile for which the alpha is required, and it is expected to return
 the alpha value to use for the tile. This only takes effect when `enableLighting` is `true`.

***

### rectangle?

> `optional` **rectangle?**: [`Rectangle`](../classes/Daisy.Rectangle.md)

The rectangle of the layer. This rectangle
 can limit the visible portion of the imagery provider.

***

### saturation?

> `optional` **saturation?**: `number` \| ((...`params`) => `any`)

The saturation of this layer. 1.0 uses the unmodified imagery color.
 Less than 1.0 reduces the saturation while greater than 1.0 increases it.
 This can either be a simple number or a function with the signature
 `function(frameState, layer, x, y, level)`. The function is passed the
 current frame state, this layer, and the x, y, and level coordinates
 of the imagery tile for which the saturation is required, and it is expected to return
 the saturation value to use for the tile. The function is executed for every
 frame and for every tile, so it must be fast.

***

### show?

> `optional` **show?**: `boolean`

True if the layer is shown; otherwise, false.

***

### splitDirection?

> `optional` **splitDirection?**: [`SplitDirection`](../enums/Daisy.SplitDirection.md) \| ((...`params`) => `any`)

The [SplitDirection](../enums/Daisy.SplitDirection.md) split to apply to this layer.
