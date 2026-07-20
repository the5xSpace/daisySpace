[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DaisyGeometryDescriptor

# Interface: DaisyGeometryDescriptor

Daisy geometry descriptor - the core input for FreeGeometryFeature.
positions are local coordinates (relative to the Entity origin).

## Properties

### boundingSphere?

> `optional` **boundingSphere?**: `BoundingSphere`

Bounding sphere (optional, auto-computed from positions when missing)

***

### indices

> **indices**: [`GeometryIndices`](../types/GeometryIndices.md)

Index data (required)

***

### normals?

> `optional` **normals?**: [`GeometryNormals`](../types/GeometryNormals.md)

Vertex normals (optional, auto-computed according to autoNormals when missing)

***

### positions

> **positions**: [`GeometryPositions`](../types/GeometryPositions.md)

Vertex positions (required, local coordinates)

***

### uvs?

> `optional` **uvs?**: [`GeometryUvs`](../types/GeometryUvs.md)

Texture coordinates (optional)
