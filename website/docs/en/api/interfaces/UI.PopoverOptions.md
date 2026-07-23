[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [UI](../modules/UI.md) / PopoverOptions

# Interface: PopoverOptions

DOM Overlay Feature Options
Configuration options interface.

## Extends

- [`FeatureOptions`](FeatureOptions.md)

## Properties

### anchorPosition?

> `optional` **anchorPosition?**: [`PopoverAnchor`](../types/UI.PopoverAnchor.md)

Position relative to the entity.
Positioning anchor relative to the entity.

#### Default

```ts
'top'
```

***

### backgroundColor?

> `optional` **backgroundColor?**: [`DColor`](../types/DColor.md)

Background color of the overlay.
Popover background color.

#### Default

```ts
'rgba(0, 0, 0, 0.75)'
```

***

### backgroundOpacity?

> `optional` **backgroundOpacity?**: `number`

Background opacity override.
Background opacity override; when set, it overrides the alpha of `backgroundColor`.

***

### closeOnEsc?

> `optional` **closeOnEsc?**: `boolean`

Whether to close on ESC (effective only when `trigger !== 'always'`).
The `always` mode does not install an ESC close listener; call `hide()` to close it.

#### Default

```ts
trigger !== 'always'
```

***

### closeOnOutsideClick?

> `optional` **closeOnOutsideClick?**: `boolean`

Whether to close when clicking outside the popover (effective only when `trigger !== 'always'`).
The `always` mode does not install an outside-click close listener; call `hide()` to close it.

#### Default

```ts
trigger !== 'always'
```

***

### color?

> `optional` **color?**: `string`

Text color (if applicable).
Text color.

#### Default

```ts
'white'
```

***

### destroyDOM?

> `optional` **destroyDOM?**: `boolean`

Whether to destroy the bound DOM element when this feature is destroyed.
If false, the element will be hidden (display: none) and appended to the body (or left where it is but hidden).
Whether to remove the bound DOM element when destroyed.
If false, it is only hidden and moved back to body; if true, it is completely removed from the DOM tree.

#### Default

```ts
false
```

***

### element

> **element**: `string` \| `HTMLElement`

The DOM element to bind. Can be a CSS selector string or an HTMLElement.
Bound DOM element; supports a CSS selector or a directly supplied HTMLElement object.

***

### fixedHeight?

> `optional` **fixedHeight?**: `string` \| `number`

Fixed height of the content area.
Fixed height of the content area.

***

### fixedWidth?

> `optional` **fixedWidth?**: `string` \| `number`

Fixed width of the content area.
Fixed width of the content area.

***

### frame?

> `optional` **frame?**: `boolean`

Whether to show the default frame (background, padding, border-radius) on the content wrapper.
Whether to display the default frame (background color, padding, and rounded corners).
Set to `false` when your custom element has its own styling and you don't want
the built-in dark frame to interfere.
Set to false when the custom element has its own styling and the built-in dark frame is undesirable.

#### Default

```ts
true
```

***

### gap?

> `optional` **gap?**: `number`

Distance from the anchor point (gap).
Gap between the arrow tip and the target point, in pixels.
The direction is adjusted automatically according to anchorPosition:
- top: offset upward
- bottom: offset downward
- left: offset to the left
- right: offset to the right

#### Default

```ts
0
```

***

### gapMeters?

> `optional` **gapMeters?**: `number`

Distance from the anchor point (gap).
Gap between the arrow tip and the target point, in meters.

Choose this or `gapPx`; if both are set, the meter-based value takes precedence.

***

### gapPx?

> `optional` **gapPx?**: `number`

Distance from the anchor point (gap).
Gap between the arrow tip and the target point, in pixels.

When set together with `gapMeters`, `gapMeters` takes precedence.

***

### hoverDelayMs?

> `optional` **hoverDelayMs?**: `number`

Hide delay in hover mode, in milliseconds.

#### Default

```ts
120
```

***

### id?

> `optional` **id?**: `string`

Custom identifier used to identify or look up the underlying rendering object.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`id`](FeatureOptions.md#id)

***

### includeInBoundingSphere?

> `optional` **includeInBoundingSphere?**: `boolean`

Whether to participate in the bounding-sphere aggregation of the owning Entity.

Useful for Features that should be included when the camera uses zoom/flyTo. Auxiliary lines and temporary effects can disable this.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`includeInBoundingSphere`](FeatureOptions.md#includeinboundingsphere)

***

### maxDistance?

> `optional` **maxDistance?**: `number`

Max visibility distance in meters.
Maximum display distance, in meters.
Automatically hidden beyond this distance.

***

### name?

> `optional` **name?**: `string`

Name, which can be used for display or debugging.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`name`](FeatureOptions.md#name)

***

### offset?

> `optional` **offset?**: `object`

Offset in screen pixels.
Screen pixel offset (X, Y), in pixels.

When set together with `offsetMeters`, `offsetMeters` takes precedence.

Compatibility field equivalent to `offsetPx`.

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### offsetMeters?

> `optional` **offsetMeters?**: `object`

Offset in meters.
Screen offset (X, Y), in meters.

Choose this or `offsetPx`; if both are set, the meter-based value takes precedence.

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### offsetPx?

> `optional` **offsetPx?**: `object`

Offset in screen pixels.
Screen pixel offset (X, Y), in pixels.

When set together with `offsetMeters`, `offsetMeters` takes precedence.

#### x

> **x**: `number`

#### y

> **y**: `number`

***

### overlayPass?

> `optional` **overlayPass?**: `boolean`

Whether to enable the overlay rendering pass.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`overlayPass`](FeatureOptions.md#overlaypass)

***

### renderOrder?

> `optional` **renderOrder?**: `number`

Rendering order value; smaller values are rendered first.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`renderOrder`](FeatureOptions.md#renderorder)

***

### show?

> `optional` **show?**: `boolean`

Initial visibility.
Initial display state.

#### Default

```ts
true
```

***

### snapToPixel?

> `optional` **snapToPixel?**: `boolean`

Snap DOM position to integer CSS pixels.
Snaps the DOM position to whole pixels to reduce text jitter caused by subpixel antialiasing.

#### Default

```ts
true
```

***

### trigger?

> `optional` **trigger?**: [`PopoverTrigger`](../types/UI.PopoverTrigger.md)

Trigger mode.

- `always`：always visible (default)
- `click`：visible when the entity is clicked, hidden when deselected
- `hover`：visible while hovering over the entity, then hidden after a delay

#### Default

```ts
'always'
```

***

### visibility?

> `optional` **visibility?**: [`VisibilityStrategy`](../types/VisibilityStrategy.md)

Visibility strategy configuration.

#### Inherited from

[`FeatureOptions`](FeatureOptions.md).[`visibility`](FeatureOptions.md#visibility)
