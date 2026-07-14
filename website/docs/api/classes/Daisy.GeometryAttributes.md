[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / GeometryAttributes

# Class: GeometryAttributes

Attributes, which make up a geometry's vertices. Each property in this object corresponds to a
[GeometryAttribute](Daisy.GeometryAttribute.md) containing the attribute's data.

Attributes are always stored non-interleaved in a Geometry.


## Constructors

### Constructor

> **new GeometryAttributes**(): `GeometryAttributes`

#### Returns

`GeometryAttributes`

## Properties

### bitangent

> **bitangent**: [`GeometryAttribute`](Daisy.GeometryAttribute.md) \| `undefined`

The bitangent attribute (normalized), which is used for tangent-space effects like bump mapping.

32-bit floating-point. 3 components per attribute.


***

### color

> **color**: [`GeometryAttribute`](Daisy.GeometryAttribute.md) \| `undefined`

The color attribute.

8-bit unsigned integer. 4 components per attribute.


***

### normal

> **normal**: [`GeometryAttribute`](Daisy.GeometryAttribute.md) \| `undefined`

The normal attribute (normalized), which is commonly used for lighting.

32-bit floating-point. 3 components per attribute.


***

### position

> **position**: [`GeometryAttribute`](Daisy.GeometryAttribute.md) \| `undefined`

The 3D position attribute.

64-bit floating-point (for precision). 3 components per attribute.


***

### st

> **st**: [`GeometryAttribute`](Daisy.GeometryAttribute.md) \| `undefined`

The 2D texture coordinate attribute.

32-bit floating-point. 2 components per attribute


***

### tangent

> **tangent**: [`GeometryAttribute`](Daisy.GeometryAttribute.md) \| `undefined`

The tangent attribute (normalized), which is used for tangent-space effects like bump mapping.

32-bit floating-point. 3 components per attribute.

