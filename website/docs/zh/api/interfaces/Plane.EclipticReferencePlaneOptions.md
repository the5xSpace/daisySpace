[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Plane](../modules/Plane.md) / EclipticReferencePlaneOptions

# Interface: EclipticReferencePlaneOptions

## Extends

- [`PlaneLayerOptions`](Plane.PlaneLayerOptions.md)

## Properties

### color?

> `optional` **color?**: `Color`

颜色。

#### Default

```ts
Daisy.Color.WHITE.withAlpha(0.15)
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`color`](Plane.PlaneLayerOptions.md#color)

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示距离条件。

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`distanceDisplayCondition`](Plane.PlaneLayerOptions.md#distancedisplaycondition)

***

### gridStyle?

> `optional` **gridStyle?**: [`PlaneGridStyle`](../types/Plane.PlaneGridStyle.md)

网格样式。

#### Inherited from

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`gridStyle`](Plane.PlaneLayerOptions.md#gridstyle)

***

### id?

> `optional` **id?**: `string`

唯一标识。

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`id`](Plane.PlaneLayerOptions.md#id)

***

### planeAlpha?

> `optional` **planeAlpha?**: `number`

平面透明度。

#### Default

```ts
0.12
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`planeAlpha`](Plane.PlaneLayerOptions.md#planealpha)

***

### referenceRadius?

> `optional` **referenceRadius?**: `number`

参考半径，用于控制矩形平面的半宽半高。

#### Default

```ts
2e11
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`referenceRadius`](Plane.PlaneLayerOptions.md#referenceradius)

***

### segments?

> `optional` **segments?**: `number`

分段数（越大越圆滑，但几何更重）。

#### Inherited from

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`segments`](Plane.PlaneLayerOptions.md#segments)

***

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`show`](Plane.PlaneLayerOptions.md#show)

***

### updateIntervalSeconds?

> `optional` **updateIntervalSeconds?**: `number`

更新间隔（单位：秒）。

#### Default

```ts
10
```

#### Inherited from

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`updateIntervalSeconds`](Plane.PlaneLayerOptions.md#updateintervalseconds)
