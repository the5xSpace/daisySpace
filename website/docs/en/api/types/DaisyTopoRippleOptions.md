[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DaisyTopoRippleOptions

# Type Alias: DaisyTopoRippleOptions

> **DaisyTopoRippleOptions** = `object`

Terrain ripple material configuration.

## Properties

### bands?

> `optional` **bands?**: `number`

Number of static contour bands.

***

### baseColor?

> `optional` **baseColor?**: [`DColor`](DColor.md)

Background color.

***

### bend?

> `optional` **bend?**: `number`

Contour line curvature.

***

### center?

> `optional` **center?**: `Daisy.Cartesian2` \| \{ `x`: `number`; `y`: `number`; \} \| `number`

Ripple center in normalized texture coordinates.

***

### intensity?

> `optional` **intensity?**: `number`

Glow intensity.

***

### lineColor?

> `optional` **lineColor?**: [`DColor`](DColor.md)

Contour line color.

***

### lineWidth?

> `optional` **lineWidth?**: `number`

Static contour line width.

***

### opacity?

> `optional` **opacity?**: `number`

Overall opacity.

***

### radialWeight?

> `optional` **radialWeight?**: `number`

Weight of radial distance in the contour calculation.

***

### rippleCount?

> `optional` **rippleCount?**: `number`

Number of dynamic ripples.

***

### rippleWidth?

> `optional` **rippleWidth?**: `number`

Dynamic ripple width.

***

### slope?

> `optional` **slope?**: `number`

Overall tilt amount of contour lines.

***

### softness?

> `optional` **softness?**: `number`

Line edge softening width.

***

### speed?

> `optional` **speed?**: `number`

Animation speed.
