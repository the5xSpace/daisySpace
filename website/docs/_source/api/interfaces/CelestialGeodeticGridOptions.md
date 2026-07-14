[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CelestialGeodeticGridOptions

# Interface: CelestialGeodeticGridOptions

## Extended by

- [`earthGridOptions`](earthGridOptions.md)

## Properties

### color?

> `optional` **color?**: `Color`

颜色。

#### Default

```ts
Color.LIGHTGREEN.withAlpha(0.5)
```

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `DistanceDisplayCondition`

显示距离条件。

***

### distanceDisplayLevel?

> `optional` **distanceDisplayLevel?**: [`ViewDistanceLevel`](../enums/ViewDistanceLevel.md)

视距等级（用于与 Engine 的视距策略结合）。

#### Default

```ts
ViewDistanceLevel.FAR
```

***

### followCamera?

> `optional` **followCamera?**: `boolean`

标签是否跟随相机移动（屏幕空间稳定显示）。

#### Default

```ts
true
```

***

### id?

> `optional` **id?**: `string`

唯一标识。

#### Default

```ts
"GeodeticGrid"
```

***

### labelOptions?

> `optional` **labelOptions?**: [`LabelOptionsWithFormat`](../types/LabelOptionsWithFormat.md)

标签配置。

***

### material?

> `optional` **material?**: `Material`

材质。

***

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

***

### showLabel?

> `optional` **showLabel?**: `boolean`

是否显示标签。

#### Default

```ts
true
```

***

### step?

> `optional` **step?**: `number`

经纬网格步进（单位：度）。

#### Default

```ts
10
```

***

### width?

> `optional` **width?**: `number`

线宽（像素）。

#### Default

```ts
1
```
