[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / earthGridOptions

# Interface: earthGridOptions

## Extends

- [`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md)

## Properties

### color?

> `optional` **color?**: `Color`

颜色。

#### Default

```ts
Color.LIGHTGREEN.withAlpha(0.5)
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`color`](CelestialGeodeticGridOptions.md#color)

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示距离条件。

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`distanceDisplayCondition`](CelestialGeodeticGridOptions.md#distancedisplaycondition)

***

### distanceDisplayLevel?

> `optional` **distanceDisplayLevel?**: [`ViewDistanceLevel`](../enums/ViewDistanceLevel.md)

视距等级（用于与 Engine 的视距策略结合）。

#### Default

```ts
ViewDistanceLevel.FAR
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`distanceDisplayLevel`](CelestialGeodeticGridOptions.md#distancedisplaylevel)

***

### followCamera?

> `optional` **followCamera?**: `boolean`

标签是否跟随相机移动（屏幕空间稳定显示）。

#### Default

```ts
true
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`followCamera`](CelestialGeodeticGridOptions.md#followcamera)

***

### id?

> `optional` **id?**: `string`

唯一标识。

#### Default

```ts
"GeodeticGrid"
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`id`](CelestialGeodeticGridOptions.md#id)

***

### labelOptions?

> `optional` **labelOptions?**: [`LabelOptionsWithFormat`](../types/LabelOptionsWithFormat.md)

标签配置。

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`labelOptions`](CelestialGeodeticGridOptions.md#labeloptions)

***

### material?

> `optional` **material?**: `Material`

材质。

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`material`](CelestialGeodeticGridOptions.md#material)

***

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`show`](CelestialGeodeticGridOptions.md#show)

***

### showLabel?

> `optional` **showLabel?**: `boolean`

是否显示标签。

#### Default

```ts
true
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`showLabel`](CelestialGeodeticGridOptions.md#showlabel)

***

### step?

> `optional` **step?**: `number`

经纬网格步进（单位：度）。

#### Default

```ts
10
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`step`](CelestialGeodeticGridOptions.md#step)

***

### width?

> `optional` **width?**: `number`

线宽（像素）。

#### Default

```ts
1
```

#### Inherited from

[`CelestialGeodeticGridOptions`](CelestialGeodeticGridOptions.md).[`width`](CelestialGeodeticGridOptions.md#width)
