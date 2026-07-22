[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Plane](../modules/Plane.md) / PlaneLayerOptions

# Interface: PlaneLayerOptions

## Extended by

- [`EclipticPlaneOptions`](Plane.EclipticPlaneOptions.md)
- [`EclipticReferencePlaneOptions`](Plane.EclipticReferencePlaneOptions.md)
- [`EquatorialPlaneOptions`](Plane.EquatorialPlaneOptions.md)

## Properties

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

Color.

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Distance display condition.

***

### gridStyle?

> `optional` **gridStyle?**: [`PlaneGridStyle`](../types/Plane.PlaneGridStyle.md)

Grid style.

***

### id?

> `optional` **id?**: `string`

Unique identifier.

***

### planeAlpha?

> `optional` **planeAlpha?**: `number`

Plane fill opacity (0~1).

***

### referenceRadius?

> `optional` **referenceRadius?**: `number`

Reference radius (in meters).

The exact meaning depends on the specific plane implementation (e.g., disk radius, grid radius, etc.).

#### Default

```ts
1
```

***

### segments?

> `optional` **segments?**: `number`

Number of segments (higher values are smoother but more geometrically expensive).

***

### show?

> `optional` **show?**: `boolean`

Whether to show.

***

### updateIntervalSeconds?

> `optional` **updateIntervalSeconds?**: `number`

Update interval (in seconds).

#### Default

```ts
10
```
