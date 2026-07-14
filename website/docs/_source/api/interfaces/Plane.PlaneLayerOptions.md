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

颜色。

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示距离条件。

***

### gridStyle?

> `optional` **gridStyle?**: [`PlaneGridStyle`](../types/Plane.PlaneGridStyle.md)

网格样式。

***

### id?

> `optional` **id?**: `string`

唯一标识。

***

### planeAlpha?

> `optional` **planeAlpha?**: `number`

平面填充透明度（0~1）。

***

### referenceRadius?

> `optional` **referenceRadius?**: `number`

参考半径（单位：米）。

具体含义由不同平面实现决定（如圆盘半径、网格半径等）。

#### Default

```ts
1
```

***

### segments?

> `optional` **segments?**: `number`

分段数（越大越圆滑，但几何更重）。

***

### show?

> `optional` **show?**: `boolean`

是否显示。

***

### updateIntervalSeconds?

> `optional` **updateIntervalSeconds?**: `number`

更新间隔（单位：秒）。

#### Default

```ts
10
```
