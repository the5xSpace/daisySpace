[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / PolygonRenderable

# Class: PolygonRenderable

PolygonRenderable：用 Primitive 绘制多边形填充/轮廓的渲染封装。

## Remarks

- 填充部分使用 `PolygonGeometry` + `Daisy.MaterialAppearance`。
- 轮廓部分（可选）使用 `PolygonOutlineGeometry` + `Daisy.PerInstanceColorAppearance`。
- 底层 Primitive 使用 [SafePrimitive](file:///d:/work/logic/space/daisyview-sdk/sdk/src/sdk/renderables/SafePrimitive.ts)，以降低 2D/Morphing 状态下矩阵问题带来的风险。

## Constructors

### Constructor

> **new PolygonRenderable**(`viewer`, `options?`): `PolygonRenderable`

创建一个 PolygonRenderable 并立即加入到 `viewer.collections.primitiveCollection`。

#### Parameters

##### viewer

[`Engine`](Engine.md)

Daisy SDK Engine。

##### options?

[`PolygonPrimitiveOptions`](../types/PolygonPrimitiveOptions.md)

多边形参数。

#### Returns

`PolygonRenderable`

## Methods

### buildOutlineGeometry()

> **buildOutlineGeometry**(`positions`, `ellipsoid`): `PolygonOutlineGeometry` \| `undefined`

构建多边形轮廓几何体（outline）。

#### Parameters

##### positions

`Cartesian3`[] \| [`Holes`](../types/Holes.md)

顶点或带洞层级。

##### ellipsoid

`Ellipsoid`

#### Returns

`PolygonOutlineGeometry` \| `undefined`

可用于 Primitive 的 `Daisy.Geometry`。

***

### create()

> **create**(`basePositions`): `void`

创建/重建填充 Primitive。

#### Parameters

##### basePositions

`Cartesian3`[] \| [`Holes`](../types/Holes.md)

已处理（可能已排序）的 positions。

#### Returns

`void`

***

### createOutline()

> **createOutline**(`basePositions`): `void`

根据当前 `options.outline` 创建/移除轮廓 Primitive。

#### Parameters

##### basePositions

`Cartesian3`[] \| [`Holes`](../types/Holes.md)

已处理（可能已排序）的 positions。

#### Returns

`void`

***

### destroy()

> **destroy**(): `void`

从 `viewer.collections.primitiveCollection` 移除填充/轮廓并释放引用。

#### Returns

`void`

***

### setShow()

> **setShow**(`show`): `void`

#### Parameters

##### show

`boolean`

#### Returns

`void`

***

### updateModelMatrix()

> **updateModelMatrix**(`time?`): `void`

#### Parameters

##### time?

`JulianDate`

#### Returns

`void`

***

### updatePositions()

> **updatePositions**(`positions`): `void`

更新多边形顶点并重建 Primitive（包含可选轮廓）。

#### Parameters

##### positions

`Cartesian3`[] \| `PolygonHierarchy` \| [`Holes`](../types/Holes.md)

新的顶点或层级。

#### Returns

`void`
