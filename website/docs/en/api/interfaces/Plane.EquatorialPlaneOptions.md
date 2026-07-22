[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Plane](../modules/Plane.md) / EquatorialPlaneOptions

# Interface: EquatorialPlaneOptions

## Extends

- [`PlaneLayerOptions`](Plane.PlaneLayerOptions.md)

## Properties

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

Color

#### Default

```ts
AutoColor.LIGHTPINK.withAlpha(0.4)
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`color`](Plane.PlaneLayerOptions.md#color)

***

### displayRadius?

> `optional` **displayRadius?**: `number`

Display clip scale (unit: meters)

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

Display distance range

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`distanceDisplayCondition`](Plane.PlaneLayerOptions.md#distancedisplaycondition)

***

### gridStyle?

> `optional` **gridStyle?**: [`PlaneGridStyle`](../types/Plane.PlaneGridStyle.md)

Grid style.

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`gridStyle`](Plane.PlaneLayerOptions.md#gridstyle)

***

### id?

> `optional` **id?**: `string`

ID is auto-generated, please do not pass it in

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`id`](Plane.PlaneLayerOptions.md#id)

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

Material

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

Label border color

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

Label outline width

***

### planeAlpha?

> `optional` **planeAlpha?**: `number`

Plane fill opacity (0~1).

#### Inherited from

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`planeAlpha`](Plane.PlaneLayerOptions.md#planealpha)

***

### radius?

> `optional` **radius?**: `number`

***

### referenceRadius?

> `optional` **referenceRadius?**: `number`

Reference radius (unit: meters).

The exact meaning depends on the specific plane implementation (e.g., disk radius, grid radius, etc.).

#### Default

```ts
1
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`referenceRadius`](Plane.PlaneLayerOptions.md#referenceradius)

***

### segments?

> `optional` **segments?**: `number`

Disk precision, defaults to 64

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`segments`](Plane.PlaneLayerOptions.md#segments)

***

### show?

> `optional` **show?**: `boolean`

Whether to show

#### Default

```ts
true
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`show`](Plane.PlaneLayerOptions.md#show)

***

### showLabel?

> `optional` **showLabel?**: `boolean`

Whether to show label

#### Default

```ts
true
```

***

### updateIntervalSeconds?

> `optional` **updateIntervalSeconds?**: `number`

Update interval (unit: seconds).

#### Default

```ts
10
```

#### Inherited from

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`updateIntervalSeconds`](Plane.PlaneLayerOptions.md#updateintervalseconds)

***

### width?

> `optional` **width?**: `number`

Width

#### Default

```ts
1
```
