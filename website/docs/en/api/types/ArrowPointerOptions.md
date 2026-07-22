[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / ArrowPointerOptions

# Type Alias: ArrowPointerOptions

> **ArrowPointerOptions** = `object` & [`FeatureOptions`](../interfaces/FeatureOptions.md)

ArrowPointerFeature configuration.

## Type Declaration

### arrowSize?

> `optional` **arrowSize?**: `number`

Arrow texture size (in pixels).

#### Default

```ts
15
```

### color?

> `optional` **color?**: [`DColor`](DColor.md)

Arrow color.

#### Default

```ts
Color.WHITE
```

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `Daisy.DistanceDisplayCondition`

Display distance condition.

If not set, the internal default is used per the view-distance strategy (typically NEAR).

### label?

> `optional` **label?**: [`ArrowPointerLabelOptions`](ArrowPointerLabelOptions.md)

Label configuration at the arrow tip.

Accepts either `ArrowPointerLabelOptions` or a plain string (used as text content).

### length?

> `optional` **length?**: `number`

Arrow length (in meters).

If set, "meters" mode takes priority; otherwise `lengthPx` is used and converted to meters/pixels based on the current view.

### lengthPx?

> `optional` **lengthPx?**: `number`

Arrow length (in screen pixels).

#### Default

```ts
100
```

### show?

> `optional` **show?**: `boolean`

Whether to show.

#### Default

```ts
true
```

### target

> **target**: [`ArrowPointerTarget`](ArrowPointerTarget.md)

Pointing target.

Supports coordinate points, Daisy entities, target callbacks, or built-in target names (sun/moon/mars/earthCenter).

### width?

> `optional` **width?**: `number`

Line width (in pixels).

Minimum value is 1.

#### Default

```ts
5
```

## Example

```ts
const feature = new ArrowPointerFeature({
 target: ArrowPointerFeature.targetMoon,
 lengthPx: 120,
 width: 3,
 color: "cyan",
 label: { text: "MOON" }
});
entity.addFeature(feature);
```
