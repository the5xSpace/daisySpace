[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / AttitudeSphereOptions

# Type Alias: AttitudeSphereOptions

> **AttitudeSphereOptions** = `object`

AttitudeSphereRenderable creation parameters.

## Remarks

- This visualization creates objects in `viewer.collections.primitiveCollection` and `polylineCollection/labelsCollection`.
- `updateOrientation` accepts `Daisy.Matrix3` or `Daisy.Matrix4`, representing the attitude rotation.
- Default `axisLength = radius * 1.2`.

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

Axis length (world units). Uses `radius * 1.2` automatically when not provided.

***

### axisWidth?

> `optional` **axisWidth?**: `number`

Axis width (in pixels).

#### Default

```ts
2
```

***

### center?

> `optional` **center?**: `Daisy.Cartesian3`

Sphere center (world coordinates).

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

Sphere radius (world units, typically meters).

#### Default

```ts
200000
```

***

### showAxes?

> `optional` **showAxes?**: `boolean`

Whether to draw XYZ axis arrows.

#### Default

```ts
true
```

***

### showLabels?

> `optional` **showLabels?**: `boolean`

Whether to draw XYZ text labels.

#### Default

```ts
true
```

***

### showSphere?

> `optional` **showSphere?**: `boolean`

Whether to draw a translucent sphere.

#### Default

```ts
true
```

***

### showWireframe?

> `optional` **showWireframe?**: `boolean`

Whether to draw the sphere wireframe.

#### Default

```ts
true
```

***

### sphereMaterial?

> `optional` **sphereMaterial?**: [`DMaterial`](DMaterial.md)

Sphere material.

#### Default

```ts
Daisy.Color.GRAY.withAlpha(0.25)
```

***

### wireColor?

> `optional` **wireColor?**: [`DColor`](DColor.md)

Wireframe color.

#### Default

```ts
Daisy.Color.WHITE.withAlpha(0.8)
```

***

### xColor?

> `optional` **xColor?**: [`DColor`](DColor.md)

X-axis color.

#### Default

```ts
Daisy.Color.RED
```

***

### yColor?

> `optional` **yColor?**: [`DColor`](DColor.md)

Y-axis color.

#### Default

```ts
Daisy.Color.GREEN
```

***

### zColor?

> `optional` **zColor?**: [`DColor`](DColor.md)

Z-axis color.

#### Default

```ts
Daisy.Color.BLUE
```
