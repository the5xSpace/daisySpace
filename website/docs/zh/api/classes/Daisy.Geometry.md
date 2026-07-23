[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Geometry

# Class: Geometry

A geometry representation with attributes forming vertices and optional index data
defining primitives. Geometries and an Appearance, which describes the shading,
can be assigned to a Primitive for visualization. A `Primitive` can
be created from many heterogeneous - in many cases - geometries for performance.

Geometries can be transformed and optimized using functions in GeometryPipeline.


## Example

```ts
// Create geometry with a position attribute and indexed lines.
const positions = new Float64Array([
 0.0, 0.0, 0.0,
 7500000.0, 0.0, 0.0,
 0.0, 7500000.0, 0.0
]);

const geometry = new Daisy.Geometry({
 attributes : {
 position : new Daisy.GeometryAttribute({
 componentDatatype : Daisy.ComponentDatatype.DOUBLE,
 componentsPerAttribute : 3,
 values : positions
 })
 },
 indices : new Uint16Array([0, 1, 1, 2, 2, 0]),
 primitiveType : Daisy.PrimitiveType.LINES,
 boundingSphere : Daisy.BoundingSphere.fromVertices(positions)
});
```

## Param

**options**

Object with the following properties:

## Param

**options.attributes**

Attributes, which make up the geometry's vertices.

## Param

**options.primitiveType**

The type of primitives in the geometry.

## Param

**options.indices**

Optional index data that determines the primitives in the geometry.

## Param

**options.boundingSphere**

An optional bounding sphere that fully enclosed the geometry.

## Constructors

### Constructor

> **new Geometry**(`options`): `Geometry`

#### Parameters

##### options

###### attributes

[`GeometryAttributes`](Daisy.GeometryAttributes.md)

###### boundingSphere?

[`BoundingSphere`](Daisy.BoundingSphere.md)

###### indices?

`Uint16Array`\<`ArrayBufferLike`\> \| `Uint32Array`\<`ArrayBufferLike`\>

###### primitiveType?

[`PrimitiveType`](../enums/Daisy.PrimitiveType.md)

#### Returns

`Geometry`

## Properties

### attributes

> **attributes**: [`GeometryAttributes`](Daisy.GeometryAttributes.md)

Attributes, which make up the geometry's vertices. Each property in this object corresponds to a
[GeometryAttribute](Daisy.GeometryAttribute.md) containing the attribute's data.

Attributes are always stored non-interleaved in a Geometry.


There are reserved attribute names with well-known semantics. The following attributes
are created by a Geometry (depending on the provided [VertexFormat](Daisy.VertexFormat.md).

- `position` - 3D vertex position. 64-bit floating-point (for precision). 3 components per attribute. See [VertexFormat#position](Daisy.VertexFormat.md#position).
- `normal` - Normal (normalized), commonly used for lighting. 32-bit floating-point. 3 components per attribute. See [VertexFormat#normal](Daisy.VertexFormat.md#normal).
- `st` - 2D texture coordinate. 32-bit floating-point. 2 components per attribute. See [VertexFormat#st](Daisy.VertexFormat.md#st).
- `bitangent` - Bitangent (normalized), used for tangent-space effects like bump mapping. 32-bit floating-point. 3 components per attribute. See [VertexFormat#bitangent](Daisy.VertexFormat.md#bitangent).
- `tangent` - Tangent (normalized), used for tangent-space effects like bump mapping. 32-bit floating-point. 3 components per attribute. See [VertexFormat#tangent](Daisy.VertexFormat.md#tangent).



The following attribute names are generally not created by a Geometry, but are added
to a Geometry by a Primitive or GeometryPipeline functions to prepare
the geometry for rendering.

- `position3DHigh` - High 32 bits for encoded 64-bit position computed with GeometryPipeline.encodeAttribute. 32-bit floating-point. 4 components per attribute.
- `position3DLow` - Low 32 bits for encoded 64-bit position computed with GeometryPipeline.encodeAttribute. 32-bit floating-point. 4 components per attribute.
- `position2DHigh` - High 32 bits for encoded 64-bit 2D (Columbus view) position computed with GeometryPipeline.encodeAttribute. 32-bit floating-point. 4 components per attribute.
- `position2DLow` - Low 32 bits for encoded 64-bit 2D (Columbus view) position computed with GeometryPipeline.encodeAttribute. 32-bit floating-point. 4 components per attribute.
- `color` - RGBA color (normalized) usually from GeometryInstance#color. 32-bit floating-point. 4 components per attribute.
- `pickColor` - RGBA color used for picking. 32-bit floating-point. 4 components per attribute.



#### Example

```ts
geometry.attributes.position = new Daisy.GeometryAttribute({
 componentDatatype : Daisy.ComponentDatatype.FLOAT,
 componentsPerAttribute : 3,
 values : new Float32Array(0)
});
```

***

### boundingSphere

> **boundingSphere**: [`BoundingSphere`](Daisy.BoundingSphere.md) \| `undefined`

An optional bounding sphere that fully encloses the geometry. This is
commonly used for culling.

***

### indices

> **indices**: `any`[] \| `undefined`

Optional index data that - along with [Geometry#primitiveType](#primitivetype) -
determines the primitives in the geometry.

***

### primitiveType

> **primitiveType**: [`PrimitiveType`](../enums/Daisy.PrimitiveType.md) \| `undefined`

The type of primitives in the geometry. This is most often [PrimitiveType.TRIANGLES](../enums/Daisy.PrimitiveType.md#triangles),
but can varying based on the specific geometry.

## Methods

### computeNumberOfVertices()

> `static` **computeNumberOfVertices**(`geometry`): `number`

Computes the number of vertices in a geometry. The runtime is linear with
respect to the number of attributes in a vertex, not the number of vertices.

#### Parameters

##### geometry

`Geometry`

The geometry.

#### Returns

`number`

The number of vertices in the geometry.

#### Example

```ts
const numVertices = Daisy.Geometry.computeNumberOfVertices(geometry);
```
