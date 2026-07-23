[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Plane](../modules/Plane.md) / EclipticPlaneOptions

# Interface: EclipticPlaneOptions

## Extends

- [`PlaneLayerOptions`](Plane.PlaneLayerOptions.md)

## Properties

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

Color.

#### Default

```ts
Color.LIGHTGREEN.withAlpha(0.5)
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`color`](Plane.PlaneLayerOptions.md#color)

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Display range.

#### Default

```ts
new Daisy.DistanceDisplayCondition(0, 1.5e+8)
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`distanceDisplayCondition`](Plane.PlaneLayerOptions.md#distancedisplaycondition)

***

### gridCellPixelSize?

> `optional` **gridCellPixelSize?**: `number`

Target screen-pixel size of grid cells; effective only when gridFollowCamera=true.

#### Default

```ts
80
```

***

### gridFollowCamera?

> `optional` **gridFollowCamera?**: `boolean`

Whether to automatically adjust grid density based on camera distance for a more consistent visual density on screen.

#### Default

```ts
true
```

***

### gridLinePixelWidth?

> `optional` **gridLinePixelWidth?**: `number`

Target screen-pixel width of grid lines; effective only when gridFollowCamera=true.

#### Default

```ts
1
```

***

### gridMaxCellSizeMeters?

> `optional` **gridMaxCellSizeMeters?**: `number`

Maximum grid-cell size in meters, used to prevent the grid from becoming too sparse; effective only when gridFollowCamera=true.

#### Default

```ts
5000000000
```

***

### gridMinCellSizeMeters?

> `optional` **gridMinCellSizeMeters?**: `number`

Minimum grid-cell size in meters, used to prevent flickering caused by an overly dense grid; effective only when gridFollowCamera=true.

#### Default

```ts
100000
```

***

### gridStyle?

> `optional` **gridStyle?**: [`PlaneGridStyle`](../types/Plane.PlaneGridStyle.md)

Grid style.

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`gridStyle`](Plane.PlaneLayerOptions.md#gridstyle)

***

### id?

> `optional` **id?**: `string`

id

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`id`](Plane.PlaneLayerOptions.md#id)

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

Material.

***

### monthlyLabelFillColor?

> `optional` **monthlyLabelFillColor?**: [`DColor`](../types/DColor.md)

Monthly label fill color.

#### Default

```ts
Color.WHITE
```

***

### monthlyLabelFont?

> `optional` **monthlyLabelFont?**: `string`

Monthly label font.

#### Default

```ts
"12px sans-serif"
```

***

### monthlyLabelOutlineColor?

> `optional` **monthlyLabelOutlineColor?**: [`DColor`](../types/DColor.md)

Monthly label outline color.

#### Default

```ts
Color.BLACK
```

***

### monthlyLabelOutlineWidth?

> `optional` **monthlyLabelOutlineWidth?**: `number`

Monthly label outline width.

#### Default

```ts
2
```

***

### monthlyLineColor?

> `optional` **monthlyLineColor?**: [`DColor`](../types/DColor.md)

Monthly connector line color.

#### Default

```ts
Color.WHITE.withAlpha(0.35)
```

***

### monthlyLineWidth?

> `optional` **monthlyLineWidth?**: `number`

Monthly connector line width.

#### Default

```ts
1
```

***

### monthlyPointColor?

> `optional` **monthlyPointColor?**: [`DColor`](../types/DColor.md)

Monthly point color.

#### Default

```ts
Color.WHITE
```

***

### monthlyPointSize?

> `optional` **monthlyPointSize?**: `number`

Monthly point size in pixels.

#### Default

```ts
6
```

***

### orbitColor?

> `optional` **orbitColor?**: [`DColor`](../types/DColor.md)

Boundary color.

#### Default

```ts
Color.WHITE
```

***

### orbitSegments?

> `optional` **orbitSegments?**: `number`

Number of boundary segments; larger values produce a rounder boundary but make each frame more expensive.

#### Default

```ts
256
```

***

### orbitWidth?

> `optional` **orbitWidth?**: `number`

Boundary line width.

#### Default

```ts
3
```

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

Label color.

#### Default

```ts
Color.YELLOW.withAlpha(0.5)
```

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Label line width.

#### Default

```ts
1
```

***

### planeAlpha?

> `optional` **planeAlpha?**: `number`

Plane fill opacity (0 to 1).

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`planeAlpha`](Plane.PlaneLayerOptions.md#planealpha)

***

### radius?

> `optional` **radius?**: `number`

Radius of the ecliptic-plane disk, in meters.

- If omitted: uses the Sun-Earth distance at the current time (approximately 1 AU).
- If provided: affects both the ecliptic-plane disk size and the radius of the "Earth orbit circle".

***

### referenceRadius?

> `optional` **referenceRadius?**: `number`

Reference radius, in meters.

The specific meaning depends on the plane implementation, such as disk radius or grid radius.

#### Default

```ts
1
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`referenceRadius`](Plane.PlaneLayerOptions.md#referenceradius)

***

### segments?

> `optional` **segments?**: `number`

Number of sampling points on the ecliptic-plane disk boundary; larger values produce a rounder boundary but heavier geometry.

#### Default

```ts
4
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`segments`](Plane.PlaneLayerOptions.md#segments)

***

### show?

> `optional` **show?**: `boolean`

Display.

#### Default

```ts
true
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`show`](Plane.PlaneLayerOptions.md#show)

***

### showLabel?

> `optional` **showLabel?**: `boolean`

Display labels.

#### Default

```ts
true
```

***

### showMonthlyLabels?

> `optional` **showMonthlyLabels?**: `boolean`

Whether to display monthly date labels; requires showMonthlyLines=true.

#### Default

```ts
true
```

***

### showMonthlyLines?

> `optional` **showMonthlyLines?**: `boolean`

Whether to display monthly connector lines (from the Sun to Earth's orbital position for that month).

#### Default

```ts
false
```

***

### showMonthlyPoints?

> `optional` **showMonthlyPoints?**: `boolean`

Whether to display monthly points; requires showMonthlyLines=true.

#### Default

```ts
true
```

***

### showOrbit?

> `optional` **showOrbit?**: `boolean`

Whether to display the ecliptic-plane boundary.

#### Default

```ts
true
```

***

### showSunEarthLine?

> `optional` **showSunEarthLine?**: `boolean`

Whether to display the Sun-Earth line (from the Sun to the Earth's center).

#### Default

```ts
true
```

***

### updateIntervalSeconds?

> `optional` **updateIntervalSeconds?**: `number`

Update interval, in seconds.

#### Default

```ts
10
```

#### Inherited from

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`updateIntervalSeconds`](Plane.PlaneLayerOptions.md#updateintervalseconds)

***

### width?

> `optional` **width?**: `number`

Width.

#### Default

```ts
1
```
