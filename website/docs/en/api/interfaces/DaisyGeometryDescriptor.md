[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / DaisyGeometryDescriptor

# Interface: DaisyGeometryDescriptor

Daisy 几何描述 —— FreeGeometryFeature 的核心输入。
positions 为局部坐标（相对 Entity 原点）。

## Properties

### boundingSphere?

> `optional` **boundingSphere?**: `BoundingSphere`

包围球（可选，缺失时从 positions 自动计算）

***

### indices

> **indices**: [`GeometryIndices`](../types/GeometryIndices.md)

索引数据（必填）

***

### normals?

> `optional` **normals?**: [`GeometryNormals`](../types/GeometryNormals.md)

顶点法线（可选，缺失时按 autoNormals 自动计算）

***

### positions

> **positions**: [`GeometryPositions`](../types/GeometryPositions.md)

顶点位置（必填，局部坐标）

***

### uvs?

> `optional` **uvs?**: [`GeometryUvs`](../types/GeometryUvs.md)

纹理坐标（可选）
