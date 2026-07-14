[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Plane](../modules/Plane.md) / EquatorialPlaneOptions

# Interface: EquatorialPlaneOptions

## Extends

- [`PlaneLayerOptions`](Plane.PlaneLayerOptions.md)

## Properties

### color?

> `optional` **color?**: [`DColor`](../types/DColor.md)

颜色

#### Default

```ts
AutoColor.LIGHTPINK.withAlpha(0.4)
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`color`](Plane.PlaneLayerOptions.md#color)

***

### displayRadius?

> `optional` **displayRadius?**: `number`

显示裁剪尺度（单位：米）

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示距离范围

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`distanceDisplayCondition`](Plane.PlaneLayerOptions.md#distancedisplaycondition)

***

### gridStyle?

> `optional` **gridStyle?**: [`PlaneGridStyle`](../types/Plane.PlaneGridStyle.md)

网格样式。

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`gridStyle`](Plane.PlaneLayerOptions.md#gridstyle)

***

### id?

> `optional` **id?**: `string`

id 自动生成请不要传入

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`id`](Plane.PlaneLayerOptions.md#id)

***

### material?

> `optional` **material?**: [`DMaterial`](../types/DMaterial.md)

材质

***

### outlineColor?

> `optional` **outlineColor?**: [`DColor`](../types/DColor.md)

文字边框色

***

### outlineWidth?

> `optional` **outlineWidth?**: `number`

文字外框宽度

***

### planeAlpha?

> `optional` **planeAlpha?**: `number`

平面填充透明度（0~1）。

#### Inherited from

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`planeAlpha`](Plane.PlaneLayerOptions.md#planealpha)

***

### radius?

> `optional` **radius?**: `number`

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

圆盘精度 默认64

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`segments`](Plane.PlaneLayerOptions.md#segments)

***

### show?

> `optional` **show?**: `boolean`

是否显示

#### Default

```ts
true
```

#### Overrides

[`PlaneLayerOptions`](Plane.PlaneLayerOptions.md).[`show`](Plane.PlaneLayerOptions.md#show)

***

### showLabel?

> `optional` **showLabel?**: `boolean`

是否显示标签

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
