[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ViewDistanceTemplate

# Type Alias: ViewDistanceTemplate

> **ViewDistanceTemplate** = `object` & `{ [K in ViewDistanceLevel]: Daisy.DistanceDisplayCondition }`

View distance threshold template.

Each `ViewDistanceLevel` corresponds to a `Daisy.DistanceDisplayCondition(near, far)`,
used to describe the visible distance range of a feature type at different observation scales.

## Type Declaration

### PATH\_RESOLUTION\_SCALE?

> `optional` **PATH\_RESOLUTION\_SCALE?**: `number`

Trajectory/path resolution scaling factor.

Larger values make the path display smoother (denser interpolation/sampling), but increase computation/rendering cost.
