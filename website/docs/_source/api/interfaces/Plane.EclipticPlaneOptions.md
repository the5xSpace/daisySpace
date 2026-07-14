[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Plane](../modules/Plane.md) / EclipticPlaneOptions

# Interface: EclipticPlaneOptions

## Extends

- [`PlaneLayerOptions`](Plane.PlaneLayerOptions.md)

## Properties

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

颜色

#### Default

```ts
Color.LIGHTGREEN.withAlpha(0.5)
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`color`](Plane.PlaneLayerOptions.md#color)

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示范围

#### Default

```ts
new Daisy.DistanceDisplayCondition(0, 1.5e+8)
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`distanceDisplayCondition`](Plane.PlaneLayerOptions.md#distancedisplaycondition)

***

### gridCellPixelSize?

> `optional` **gridCellPixelSize?**: `number`

目标网格单元的屏幕像素尺寸（仅 gridFollowCamera=true 生效）。

#### Default

```ts
80
```

***

### gridFollowCamera?

> `optional` **gridFollowCamera?**: `boolean`

是否根据相机距离自动调整网格密度，使屏幕上网格视觉密度更稳定。

#### Default

```ts
true
```

***

### gridLinePixelWidth?

> `optional` **gridLinePixelWidth?**: `number`

目标网格线宽的屏幕像素尺寸（仅 gridFollowCamera=true 生效）。

#### Default

```ts
1
```

***

### gridMaxCellSizeMeters?

> `optional` **gridMaxCellSizeMeters?**: `number`

网格单元最大尺寸（米），用于限制过稀（仅 gridFollowCamera=true 生效）。

#### Default

```ts
5000000000
```

***

### gridMinCellSizeMeters?

> `optional` **gridMinCellSizeMeters?**: `number`

网格单元最小尺寸（米），用于限制过密导致闪烁（仅 gridFollowCamera=true 生效）。

#### Default

```ts
100000
```

***

### gridStyle?

> `optional` **gridStyle?**: [`PlaneGridStyle`](../types/Plane.PlaneGridStyle.md)

网格样式。

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

材质

***

### monthlyLabelFillColor?

> `optional` **monthlyLabelFillColor?**: [`DColor`](../types/DColor.md)

月度标签填充颜色

#### Default

```ts
Color.WHITE
```

***

### monthlyLabelFont?

> `optional` **monthlyLabelFont?**: `string`

月度标签字体

#### Default

```ts
"12px sans-serif"
```

***

### monthlyLabelOutlineColor?

> `optional` **monthlyLabelOutlineColor?**: [`DColor`](../types/DColor.md)

月度标签描边颜色

#### Default

```ts
Color.BLACK
```

***

### monthlyLabelOutlineWidth?

> `optional` **monthlyLabelOutlineWidth?**: `number`

月度标签描边宽度

#### Default

```ts
2
```

***

### monthlyLineColor?

> `optional` **monthlyLineColor?**: [`DColor`](../types/DColor.md)

月度连线颜色

#### Default

```ts
Color.WHITE.withAlpha(0.35)
```

***

### monthlyLineWidth?

> `optional` **monthlyLineWidth?**: `number`

月度连线线宽

#### Default

```ts
1
```

***

### monthlyPointColor?

> `optional` **monthlyPointColor?**: [`DColor`](../types/DColor.md)

月度点位颜色

#### Default

```ts
Color.WHITE
```

***

### monthlyPointSize?

> `optional` **monthlyPointSize?**: `number`

月度点位像素大小

#### Default

```ts
6
```

***

### orbitColor?

> `optional` **orbitColor?**: [`DColor`](../types/DColor.md)

边线颜色

#### Default

```ts
Color.WHITE
```

***

### orbitSegments?

> `optional` **orbitSegments?**: `number`

边线分段数（越大越圆，但每帧更新更重）。

#### Default

```ts
256
```

***

### orbitWidth?

> `optional` **orbitWidth?**: `number`

边线线宽

#### Default

```ts
3
```

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

标签颜色

#### Default

```ts
Color.YELLOW.withAlpha(0.5)
```

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

标签线宽

#### Default

```ts
1
```

***

### planeAlpha?

> `optional` **planeAlpha?**: `number`

平面填充透明度（0~1）。

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`planeAlpha`](Plane.PlaneLayerOptions.md#planealpha)

***

### radius?

> `optional` **radius?**: `number`

黄道面圆盘的半径（单位：米）。

- 不传时：使用当前时刻日地距离（约 1 AU）。
- 传入时：同时影响黄道面圆盘大小，以及“地球公转轨道圆”的半径。

***

### referenceRadius?

> `optional` **referenceRadius?**: `number`

参考半径（单位：米）。

具体含义由不同平面实现决定（如圆盘半径、网格半径等）。

#### Default

```ts
1
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`referenceRadius`](Plane.PlaneLayerOptions.md#referenceradius)

***

### segments?

> `optional` **segments?**: `number`

黄道面圆盘边界采样点数（越大越圆，但几何更重）。

#### Default

```ts
4
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`segments`](Plane.PlaneLayerOptions.md#segments)

***

### show?

> `optional` **show?**: `boolean`

显示

#### Default

```ts
true
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`show`](Plane.PlaneLayerOptions.md#show)

***

### showLabel?

> `optional` **showLabel?**: `boolean`

显示标签

#### Default

```ts
true
```

***

### showMonthlyLabels?

> `optional` **showMonthlyLabels?**: `boolean`

是否显示每月日期标签（需 showMonthlyLines=true）。

#### Default

```ts
true
```

***

### showMonthlyLines?

> `optional` **showMonthlyLines?**: `boolean`

是否显示每月连线（太阳 -> 地球在该月的公转位置）。

#### Default

```ts
false
```

***

### showMonthlyPoints?

> `optional` **showMonthlyPoints?**: `boolean`

是否显示每月点位（需 showMonthlyLines=true）。

#### Default

```ts
true
```

***

### showOrbit?

> `optional` **showOrbit?**: `boolean`

是否显示黄道面边线。

#### Default

```ts
true
```

***

### showSunEarthLine?

> `optional` **showSunEarthLine?**: `boolean`

是否显示“日-地”连线（太阳 -> 地心）。

#### Default

```ts
true
```

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

***

### width?

> `optional` **width?**: `number`

宽度

#### Default

```ts
1
```
