[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolylineGroundOptions

# Type Alias: PolylineGroundOptions

> **PolylineGroundOptions** = `object`

贴地折线（Polyline）创建参数。

## Remarks

- 当 `clampToGround=true` 时，会对传入的 `positions` 做贴地采样插值，
 以获得更平滑/更贴地的折线效果（内部使用 `GeoMath.computeGroundPositions`）。
- `material` 支持 Daisy SDK 的自动材质类型（如 `Daisy.Color`、Daisy.Material 等）。

## Example

```ts
import { , PolylineGroundRenderable } from "daisy-space-sdk";

const line = new PolylineGroundRenderable(viewer, {
 clampToGround: true,
 width: 4,
 material: Daisy.Color.CYAN.withAlpha(0.9),
 positions: [
 Daisy.Cartesian3.fromDegrees(116.39, 39.9),
 Daisy.Cartesian3.fromDegrees(116.41, 39.91),
 ],
});
```

## Properties

### alwaysOnTop?

> `optional` **alwaysOnTop?**: `boolean`

是否始终可见（内部等价为 depthFailMaterial = material）。

#### Default

```ts
false
```

***

### arcType?

> `optional` **arcType?**: `Daisy.ArcType`

***

### clampToGround?

> `optional` **clampToGround?**: `boolean`

是否贴地渲染。

#### Default

```ts
false
```

***

### classificationType?

> `optional` **classificationType?**: `ClassificationType`

***

### depthFailMaterial?

> `optional` **depthFailMaterial?**: [`DMaterial`](DMaterial.md)

深度失败时使用的材质（可用于“被地球遮挡时仍可见”）。

***

### ellipsoid?

> `optional` **ellipsoid?**: [`CelestialEllipsoid`](../classes/PW.CelestialEllipsoid.md) \| `Daisy.Ellipsoid`

贴地采样使用的椭球体。

#### Default

```ts
CelestialEllipsoid.Earth()
```

***

### loop?

> `optional` **loop?**: `boolean`

贴地采样时是否闭合（会影响插值/采样的首尾处理）。

#### Default

```ts
false
```

***

### material?

> `optional` **material?**: [`DMaterial`](DMaterial.md)

折线材质。

#### Default

```ts
Daisy.Color.YELLOW
```

***

### positions?

> `optional` **positions?**: `Daisy.Cartesian3`[]

折线控制点（世界坐标）。

#### Default

```ts
[]
```

***

### sampleCount?

> `optional` **sampleCount?**: `number`

贴地插值采样点数量（采样密度）。

#### Default

```ts
80
```

***

### show?

> `optional` **show?**: `boolean`

是否显示。

#### Default

```ts
true
```

***

### sortBefore?

> `optional` **sortBefore?**: `boolean`

贴地采样前是否按地理顺序排序点位。
对于时间序列轨迹（如星下点）应设为 false 以保持时间顺序。

#### Default

```ts
true
```

***

### width?

> `optional` **width?**: `number`

线宽（像素）。

#### Default

```ts
2
```
