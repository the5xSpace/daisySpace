[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ImageAssetFrameSequenceOptions

# Interface: ImageAssetFrameSequenceOptions

## Properties

### columns?

> `optional` **columns?**: `number`

Number of columns in row-major layouts. Defaults to `count`.

***

### count

> **count**: `number`

Number of frames to generate.

***

### direction?

> `optional` **direction?**: `"row"` \| `"column"`

Traverse by row or by column. Defaults to row-major.

***

### frameHeight

> **frameHeight**: `number`

Frame crop height.

***

### frameWidth

> **frameWidth**: `number`

Frame crop width.

***

### image

> **image**: `string` \| `HTMLCanvasElement` \| `HTMLImageElement`

Image URL or already-created image element/canvas.

***

### outputHeight?

> `optional` **outputHeight?**: `number`

Optional output canvas height for every frame. Defaults to frame height.

***

### outputWidth?

> `optional` **outputWidth?**: `number`

Optional output canvas width for every frame. Defaults to frame width.

***

### spacingX?

> `optional` **spacingX?**: `number`

Horizontal spacing between frames.

***

### spacingY?

> `optional` **spacingY?**: `number`

Vertical spacing between frames.

***

### startIndex?

> `optional` **startIndex?**: `number`

Start frame index inside the grid.

***

### x?

> `optional` **x?**: `number`

First frame crop origin X.

***

### y?

> `optional` **y?**: `number`

First frame crop origin Y.
