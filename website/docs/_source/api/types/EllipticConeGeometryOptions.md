[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EllipticConeGeometryOptions

# Type Alias: EllipticConeGeometryOptions

> **EllipticConeGeometryOptions** = `object`

创建椭圆椎体

## Example

```ts
const ellipticCone = new EllipticConeGeometry({
 semiMajorAxisBottom: 2000*1000,
 semiMinorAxisBottom: 1000*1000,
 semiMajorAxisTop: 10,
 semiMinorAxisTop: 2,
 height: 5000*1000,
 vertexFormat: Daisy.VertexFormat.POSITION_AND_NORMAL,
 });
 const geometry = EllipticConeGeometry.createGeometry(ellipticCone);

 const geometryInstance = new Daisy.GeometryInstance({
 geometry,
 modelMatrix: Daisy.Matrix4.IDENTITY,
 attributes: {
 color: Daisy.ColorGeometryInstanceAttribute.fromColor(AutoColor.RED),
 },
 });
 const renderables = new Primitive({
 geometryInstances: geometryInstance,
 appearance: new Daisy.PerInstanceColorAppearance({
 translucent: false,
 flat: false,
 }),
 asynchronous: false,
 });
 cesiumViewer.scene.primitives.add(renderables);
```

## Properties

### capBottom?

> `optional` **capBottom?**: `boolean`

是否封底（底部）。

***

### capTop?

> `optional` **capTop?**: `boolean`

是否封顶（顶部）。

***

### height?

> `optional` **height?**: `number`

高度（单位：米）

***

### semiMajorAxisBottom?

> `optional` **semiMajorAxisBottom?**: `number`

底面 a（单位：米）

***

### semiMajorAxisTop?

> `optional` **semiMajorAxisTop?**: `number`

顶面 a（单位：米）

***

### semiMinorAxisBottom?

> `optional` **semiMinorAxisBottom?**: `number`

底面 b（单位：米）

***

### semiMinorAxisTop?

> `optional` **semiMinorAxisTop?**: `number`

顶面 b（单位：米）

***

### slices?

> `optional` **slices?**: `number`

圆周切片数

***

### vertexFormat?

> `optional` **vertexFormat?**: `Daisy.VertexFormat`

顶点格式。

#### Default

```ts
VertexFormat.POSITION_AND_NORMAL
```
