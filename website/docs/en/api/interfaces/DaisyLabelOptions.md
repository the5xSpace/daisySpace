[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DaisyLabelOptions

# Interface: DaisyLabelOptions

Daisy label configuration for creating a text label node near an Entity.

## Properties

### backgroundColor?

> `optional` **backgroundColor?**: [`DColor`](../types/DColor.md)

Background color.

***

### backgroundPadding?

> `optional` **backgroundPadding?**: `Cartesian2`

Background padding.

***

### disableDepthTestDistance?

> `optional` **disableDepthTestDistance?**: `number`

Distance threshold, in meters, beyond which depth testing is disabled.

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Display distance condition.

***

### eyeOffset?

> `optional` **eyeOffset?**: `Cartesian3`

Eye offset in meters.

***

### fillColor?

> `optional` **fillColor?**: [`DColor`](../types/DColor.md)

Text fill color.

***

### font?

> `optional` **font?**: `string`

Font, such as `"16px sans-serif"`.

***

### heightReference?

> `optional` **heightReference?**: `HeightReference`

Height reference.

***

### horizontalOrigin?

> `optional` **horizontalOrigin?**: `HorizontalOrigin`

Horizontal alignment.

***

### id?

> `optional` **id?**: `string`

Custom identifier.

***

### offsetMeters?

> `optional` **offsetMeters?**: `Cartesian2`

Screen offset in meters. Use it instead of `offsetPx`; when both are set, the meter value takes precedence.

***

### offsetPx?

> `optional` **offsetPx?**: `Cartesian2`

Screen pixel offset. When set together with `offsetMeters`, `offsetMeters` takes precedence.

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

Text outline color.

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Text outline width in pixels.

***

### pixelOffset?

> `optional` **pixelOffset?**: `Cartesian2`

Compatibility field equivalent to `offsetPx`.

***

### pixelOffsetMeters?

> `optional` **pixelOffsetMeters?**: `Cartesian2`

Compatibility field equivalent to `offsetMeters`.

***

### pixelOffsetScaleByDistance?

> `optional` **pixelOffsetScaleByDistance?**: `NearFarScalar`

Whether the pixel offset scales with distance.

***

### position?

> `optional` **position?**: `Cartesian3`

Position in the Entity-relative coordinate system.

***

### scale?

> `optional` **scale?**: `number`

Scale factor.

***

### scaleByDistance?

> `optional` **scaleByDistance?**: `NearFarScalar`

Whether the scale changes with distance.

***

### show?

> `optional` **show?**: `boolean`

Whether to show the label.

***

### showBackground?

> `optional` **showBackground?**: `boolean`

Whether to show the background.

***

### style?

> `optional` **style?**: `LabelStyle`

Label style: fill, outline, or fill with outline.

***

### text?

> `optional` **text?**: `string`

Text content to display.

***

### translucencyByDistance?

> `optional` **translucencyByDistance?**: `NearFarScalar`

Whether opacity changes with distance.

***

### verticalOrigin?

> `optional` **verticalOrigin?**: `VerticalOrigin`

Vertical alignment.
