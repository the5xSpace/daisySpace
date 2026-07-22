[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [PW](../modules/PW.md) / RouteComponentOptions

# Interface: RouteComponentOptions

RouteComponent configuration

## Properties

### arcType?

> `optional` **arcType?**: `ArcType`

Line interpolation method

#### Default

```ts
ArcType.GEODESIC
```

***

### bezierSamples?

> `optional` **bezierSamples?**: `number`

Number of samples per bezier curve segment

#### Default

```ts
24
```

***

### bezierTension?

> `optional` **bezierTension?**: `number`

Bezier tension angle (in degrees), controls the curve arch amplitude

#### Default

```ts
5
```

***

### clampToGround?

> `optional` **clampToGround?**: `boolean`

Whether to clamp to ground

#### Default

```ts
false
```

***

### curveType?

> `optional` **curveType?**: `"bezier"` \| `"geodesic"`

Curve type

#### Default

```ts
"bezier"
```

***

### defaultIcon?

> `optional` **defaultIcon?**: `string`

Default icon URL (built-in marker SVG)

***

### iconScale?

> `optional` **iconScale?**: `number`

Icon scale

#### Default

```ts
1.0
```

***

### labelColor?

> `optional` **labelColor?**: [`DColor`](../types/DColor.md)

Label fill color

#### Default

```ts
Color.WHITE
```

***

### labelFont?

> `optional` **labelFont?**: `string`

Label font

#### Default

```ts
"13px sans-serif"
```

***

### labelOffsetY?

> `optional` **labelOffsetY?**: `number`

Label vertical offset (pixels, negative moves up) @default -32

***

### lineColor?

> `optional` **lineColor?**: [`DColor`](../types/DColor.md)

Line color

#### Default

```ts
cyan
```

***

### lineWidth?

> `optional` **lineWidth?**: `number`

Line width (pixels)

#### Default

```ts
2
```

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

Route material (DMaterial).

Supports Daisy.Material (e.g. PolylineGlow/PolylineDash/PolylineArrow dynamic materials),
color strings, Daisy.Color or DaisyMaterialDescriptor.
When set, overrides lineColor.

***

### popoverTrigger?

> `optional` **popoverTrigger?**: `"click"` \| `"always"` \| `"hover"`

Popover trigger method

#### Default

```ts
"hover"
```

***

### showIcons?

> `optional` **showIcons?**: `boolean`

Whether to show waypoint icons

#### Default

```ts
true
```

***

### showLabels?

> `optional` **showLabels?**: `boolean`

Whether to show waypoint labels

#### Default

```ts
true
```

***

### showLine?

> `optional` **showLine?**: `boolean`

Whether to show the line

#### Default

```ts
true
```

***

### waypoints

> **waypoints**: [`RouteWaypoint`](PW.RouteWaypoint.md)[]

Waypoint list (at least 2)
