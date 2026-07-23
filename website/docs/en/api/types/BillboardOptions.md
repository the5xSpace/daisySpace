[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / BillboardOptions

# Type Alias: BillboardOptions

> **BillboardOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

BillboardFeature configuration.

Creates a billboard render node near an Entity and updates it every frame with the Entity position.

Design notes:
- This Feature manages node creation and destruction itself; it does not depend on the Entity property series.
- `position` is an offset in the Entity's local coordinate system and is added to the Entity's current position.
- Screen offsets support both pixels and meters. When meters are provided, they are converted to pixels using the camera scale each frame.

## Type Declaration

### alignedAxis?

> `optional` **alignedAxis?**: `Daisy.Cartesian3`

Alignment axis, usually used to align the billboard with a direction.

### color?

> `optional` **color?**: [`DColor`](DColor.md)

Color.

The value is normalized to a render-layer color object during creation and update.

#### Default

```ts
WHITE
```

### disableDepthTestDistance?

> `optional` **disableDepthTestDistance?**: `number`

Distance threshold in meters beyond which depth testing is disabled.

Larger values make the node more likely to remain visible; commonly used for UI nodes to avoid scene occlusion.

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `Daisy.DistanceDisplayCondition`

Display distance condition.

Automatically hides or shows the node at different viewing distances, typically to reduce UI load at long range.

### eyeOffset?

> `optional` **eyeOffset?**: `Daisy.Cartesian3`

Eye offset in meters.

### height?

> `optional` **height?**: `number`

Height.

- When `sizeInMeters=false`: the unit is pixels.
- When `sizeInMeters=true`: the unit is meters.

### heightReference?

> `optional` **heightReference?**: `Daisy.HeightReference`

Height reference.

### horizontalOrigin?

> `optional` **horizontalOrigin?**: `Daisy.HorizontalOrigin`

Horizontal alignment.

### image?

> `optional` **image?**: `string` \| `HTMLCanvasElement` \| `HTMLImageElement` \| `ImageData`

Billboard image.

Accepts an image URL, Canvas, Image, ImageData, and similar sources.

### imageSubRegion?

> `optional` **imageSubRegion?**: `Daisy.BoundingRectangle`

Image crop region.

### offsetMeters?

> `optional` **offsetMeters?**: `Daisy.Cartesian2`

Screen offset in meters.

Use it instead of `offsetPx`; when both are set, the meter value takes precedence.

Notes:
- Meter offsets express spatial scale and do not change meaning with screen resolution or zoom.
- They are converted to pixel offsets during the update cycle using the camera scale (see metersPerPixelAt in update).

### offsetPx?

> `optional` **offsetPx?**: `Daisy.Cartesian2`

Screen pixel offset.

When set together with `offsetMeters`, `offsetMeters` takes precedence because meters are adapted each frame.

### pixelOffset?

> `optional` **pixelOffset?**: `Daisy.Cartesian2`

Compatibility field equivalent to `offsetPx`.

When set together with `offsetMeters`, `offsetMeters` takes precedence.

### pixelOffsetMeters?

> `optional` **pixelOffsetMeters?**: `Daisy.Cartesian2`

Compatibility field equivalent to `offsetMeters`.

Use it instead of `offsetPx`; when both are set, the meter value takes precedence.

### pixelOffsetScaleByDistance?

> `optional` **pixelOffsetScaleByDistance?**: `Daisy.NearFarScalar`

Whether the pixel offset scales with distance.

### position?

> `optional` **position?**: `Daisy.Cartesian3`

Position in the Entity-relative coordinate system.

#### Default

```ts
Cartesian3.ZERO
```

### rotation?

> `optional` **rotation?**: `number`

Rotation angle in radians.

### scale?

> `optional` **scale?**: `number`

Scale factor.

#### Default

```ts
1
```

### scaleByDistance?

> `optional` **scaleByDistance?**: `Daisy.NearFarScalar`

Whether to scale with distance.

### show?

> `optional` **show?**: `boolean`

Whether to show the billboard.

#### Default

```ts
true
```

### sizeInMeters?

> `optional` **sizeInMeters?**: `boolean`

Whether dimensions use meters as the unit; otherwise width/height use pixels.

#### Default

```ts
false
```

### splitDirection?

> `optional` **splitDirection?**: `Daisy.SplitDirection`

Split-screen direction.

### translucencyByDistance?

> `optional` **translucencyByDistance?**: `Daisy.NearFarScalar`

Whether opacity changes with distance.

### verticalOrigin?

> `optional` **verticalOrigin?**: `Daisy.VerticalOrigin`

Vertical alignment.

### width?

> `optional` **width?**: `number`

Width.

- When `sizeInMeters=false`: the unit is pixels.
- When `sizeInMeters=true`: the unit is meters.
