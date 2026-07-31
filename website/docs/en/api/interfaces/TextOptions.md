[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / TextOptions

# Interface: TextOptions

Text feature for displaying text content in a scene.

Capabilities:
- Adds a `Label` in the Entity coordinate system
- Supports common style settings such as color, font, background, and position
- Manages its lifecycle through `Engine.collections.labelsCollection`

## Extends

- [`FeatureOptions`](FeatureOptions.md)

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

Distance threshold for disabling depth testing, in meters.

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Distance display condition.

***

### eyeOffset?

> `optional` **eyeOffset?**: `Cartesian3`

Eye offset.

***

### fillColor?

> `optional` **fillColor?**: [`DColor`](../types/DColor.md)

Text fill color. Defaults to `Daisy.Color.WHITE`.

***

### font?

> `optional` **font?**: `string`

Font, such as `16px sans-serif`.

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

Custom ID.

#### Overrides

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

Whether to include this Feature in its Entity's bounding-sphere aggregation.

Enable this for Features that should be included when the camera runs zoom/flyTo. It can be disabled for guides, temporary effects, and similar Features.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### name?

> `optional` **name?**: `string`

Name used for display or debugging.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### offsetMeters?

> `optional` **offsetMeters?**: `Cartesian2`

Screen offset in meters.

Mutually exclusive with `offsetPx`; when both are set, the meter-based value takes precedence.

***

### offsetPx?

> `optional` **offsetPx?**: `Cartesian2`

Screen offset in pixels.

When used with `offsetMeters`, `offsetMeters` takes precedence.

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

Text outline color.

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Text outline width in pixels.

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

Whether to enable the overlay rendering pass.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### pixelOffset?

> `optional` **pixelOffset?**: `Cartesian2`

Compatibility field equivalent to `offsetPx`, in pixels.

When used with `offsetMeters`, `offsetMeters` takes precedence.

***

### pixelOffsetMeters?

> `optional` **pixelOffsetMeters?**: `Cartesian2`

Compatibility field equivalent to `offsetMeters`, in meters.

Mutually exclusive with `offsetPx`; when both are set, the meter-based value takes precedence.

***

### pixelOffsetScaleByDistance?

> `optional` **pixelOffsetScaleByDistance?**: `NearFarScalar`

Distance-based scaling for the pixel offset.

***

### position?

> `optional` **position?**: `Cartesian3`

Position relative to the Entity coordinate system. Defaults to `Daisy.Cartesian3.ZERO`.

***

### renderOrder?

> `optional` **renderOrder?**: `number`

Render order. Lower values render first.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### scale?

> `optional` **scale?**: `number`

Scale.

***

### scaleByDistance?

> `optional` **scaleByDistance?**: `NearFarScalar`

Distance-based scaling.

***

### show?

> `optional` **show?**: `boolean`

Whether to show the text. Defaults to `true`.

***

### showBackground?

> `optional` **showBackground?**: `boolean`

Whether to show the background.

***

### style?

> `optional` **style?**: `LabelStyle`

Text drawing style.

***

### text

> **text**: `string`

Text content to display. Required.

***

### translucencyByDistance?

> `optional` **translucencyByDistance?**: `NearFarScalar`

Distance-based translucency.

***

### verticalOrigin?

> `optional` **verticalOrigin?**: `VerticalOrigin`

Vertical alignment.

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
