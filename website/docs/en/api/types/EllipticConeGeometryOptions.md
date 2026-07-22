[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / EllipticConeGeometryOptions

# Type Alias: EllipticConeGeometryOptions

> **EllipticConeGeometryOptions** = `object`

Creates an elliptic cone

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

Whether to cap the bottom.

***

### capTop?

> `optional` **capTop?**: `boolean`

Whether to cap the top.

***

### height?

> `optional` **height?**: `number`

Height (in meters)

***

### semiMajorAxisBottom?

> `optional` **semiMajorAxisBottom?**: `number`

Bottom semi-major axis (in meters)

***

### semiMajorAxisTop?

> `optional` **semiMajorAxisTop?**: `number`

Top semi-major axis (in meters)

***

### semiMinorAxisBottom?

> `optional` **semiMinorAxisBottom?**: `number`

Bottom semi-minor axis (in meters)

***

### semiMinorAxisTop?

> `optional` **semiMinorAxisTop?**: `number`

Top semi-minor axis (in meters)

***

### slices?

> `optional` **slices?**: `number`

Circumferential slices count

***

### vertexFormat?

> `optional` **vertexFormat?**: `Daisy.VertexFormat`

Vertex format.

#### Default

```ts
VertexFormat.POSITION_AND_NORMAL
```
