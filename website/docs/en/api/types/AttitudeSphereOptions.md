[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AttitudeSphereOptions

# Type Alias: AttitudeSphereOptions

> **AttitudeSphereOptions** = `object`

AttitudeSphereRenderable 创建参数。

## Remarks

- 该可视化会在 `viewer.collections.primitiveCollection` 与 `polylineCollection/labelsCollection` 中创建对象。
- `updateOrientation` 接收 `Daisy.Matrix3` 或 `Daisy.Matrix4`，表示姿态旋转（rotation）。
- 默认 `axisLength = radius * 1.2`。

## Example

```ts
import { , AttitudeSphereRenderable } from "daisy-space-sdk";

const sphere = new AttitudeSphereRenderable(viewer, {
 center: Daisy.Cartesian3.fromDegrees(116.39, 39.9, 300000),
 radius: 150000,
 showLabels: true,
});

const rot = Daisy.Matrix3.fromRotationZ(Daisy.Math.toRadians(30));
sphere.updateOrientation(rot);

sphere.destroy();
```

## Properties

### axisLength?

> `optional` **axisLength?**: `number`

轴线长度（世界单位）。未传入时自动使用 `radius * 1.2`。

***

### axisWidth?

> `optional` **axisWidth?**: `number`

轴线宽度（像素）。

#### Default

```ts
2
```

***

### center?

> `optional` **center?**: `Daisy.Cartesian3`

球心（世界坐标）。

#### Default

```ts
Daisy.Cartesian3.ZERO
```

***

### distanceDisplayCondition?

> `optional` **distanceDisplayCondition?**: `Daisy.DistanceDisplayCondition`

***

### labelPrefix?

> `optional` **labelPrefix?**: `string`

***

### radius?

> `optional` **radius?**: `number`

球半径（世界单位，通常为米）。

#### Default

```ts
200000
```

***

### showAxes?

> `optional` **showAxes?**: `boolean`

是否绘制 XYZ 三轴箭头。

#### Default

```ts
true
```

***

### showLabels?

> `optional` **showLabels?**: `boolean`

是否绘制 XYZ 文字标签。

#### Default

```ts
true
```

***

### showSphere?

> `optional` **showSphere?**: `boolean`

是否绘制半透明球体。

#### Default

```ts
true
```

***

### showWireframe?

> `optional` **showWireframe?**: `boolean`

是否绘制球体线框。

#### Default

```ts
true
```

***

### sphereMaterial?

> `optional` **sphereMaterial?**: [`DMaterial`](DMaterial.md)

球体材质。

#### Default

```ts
Daisy.Color.GRAY.withAlpha(0.25)
```

***

### wireColor?

> `optional` **wireColor?**: [`DColor`](DColor.md)

线框颜色。

#### Default

```ts
Daisy.Color.WHITE.withAlpha(0.8)
```

***

### xColor?

> `optional` **xColor?**: [`DColor`](DColor.md)

X 轴颜色。

#### Default

```ts
Daisy.Color.RED
```

***

### yColor?

> `optional` **yColor?**: [`DColor`](DColor.md)

Y 轴颜色。

#### Default

```ts
Daisy.Color.GREEN
```

***

### zColor?

> `optional` **zColor?**: [`DColor`](DColor.md)

Z 轴颜色。

#### Default

```ts
Daisy.Color.BLUE
```
