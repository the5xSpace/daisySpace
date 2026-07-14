[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / VertexFormat

# Class: VertexFormat

A vertex format defines what attributes make up a vertex. A VertexFormat can be provided
to a [Geometry](Daisy.Geometry.md) to request that certain properties be computed, e.g., just position,
position and normal, etc.

## Example

```ts
// Create a vertex format with position and 2D texture coordinate attributes.
const format = new Daisy.VertexFormat({
 position : true,
 st : true
});
```

## Param

An object with boolean properties corresponding to VertexFormat properties as shown in the code example.

## Constructors

### Constructor

> **new VertexFormat**(`options?`): `VertexFormat`

#### Parameters

##### options?

`any`

#### Returns

`VertexFormat`

## Properties

### bitangent

> **bitangent**: `boolean`

When `true`, the vertex has a bitangent attribute (normalized), which is used for tangent-space effects like bump mapping.

32-bit floating-point. 3 components per attribute.


***

### color

> **color**: `boolean`

When `true`, the vertex has an RGB color attribute.

8-bit unsigned byte. 3 components per attribute.


***

### normal

> **normal**: `boolean`

When `true`, the vertex has a normal attribute (normalized), which is commonly used for lighting.

32-bit floating-point. 3 components per attribute.


***

### position

> **position**: `boolean`

When `true`, the vertex has a 3D position attribute.

64-bit floating-point (for precision). 3 components per attribute.


***

### st

> **st**: `boolean`

When `true`, the vertex has a 2D texture coordinate attribute.

32-bit floating-point. 2 components per attribute


***

### tangent

> **tangent**: `boolean`

When `true`, the vertex has a tangent attribute (normalized), which is used for tangent-space effects like bump mapping.

32-bit floating-point. 3 components per attribute.


***

### ALL

> `readonly` `static` **ALL**: `VertexFormat`

An immutable vertex format with well-known attributes: position, normal, st, tangent, and bitangent.

***

### DEFAULT

> `readonly` `static` **DEFAULT**: `VertexFormat`

An immutable vertex format with position, normal, and st attributes.
This is compatible with most appearances and materials; however
normal and st attributes are not always required. When this is
known in advance, another `VertexFormat` should be used.

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

***

### POSITION\_AND\_COLOR

> `readonly` `static` **POSITION\_AND\_COLOR**: `VertexFormat`

An immutable vertex format with position and color attributes.

***

### POSITION\_AND\_NORMAL

> `readonly` `static` **POSITION\_AND\_NORMAL**: `VertexFormat`

An immutable vertex format with position and normal attributes.
This is compatible with per-instance color appearances like [PerInstanceColorAppearance](Daisy.PerInstanceColorAppearance.md).

***

### POSITION\_AND\_ST

> `readonly` `static` **POSITION\_AND\_ST**: `VertexFormat`

An immutable vertex format with position and st attributes.
This is compatible with EllipsoidSurfaceAppearance.

***

### POSITION\_NORMAL\_AND\_ST

> `readonly` `static` **POSITION\_NORMAL\_AND\_ST**: `VertexFormat`

An immutable vertex format with position, normal, and st attributes.
This is compatible with [MaterialAppearance](Daisy.MaterialAppearance.md) when [MaterialAppearance#materialSupport](Daisy.MaterialAppearance.md#materialsupport)
is `TEXTURED`.

***

### POSITION\_ONLY

> `readonly` `static` **POSITION\_ONLY**: `VertexFormat`

An immutable vertex format with only a position attribute.

## Methods

### clone()

> `static` **clone**(`vertexFormat`, `result?`): `VertexFormat`

Duplicates a VertexFormat instance.

#### Parameters

##### vertexFormat

`VertexFormat`

The vertex format to duplicate.

##### result?

`VertexFormat`

The object onto which to store the result.

#### Returns

`VertexFormat`

The modified result parameter or a new VertexFormat instance if one was not provided. (Returns undefined if vertexFormat is undefined)

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`VertexFormat`

The value to pack.

##### array

`number`[]

The array to pack into.

##### startingIndex?

`number`

The index into the array at which to start packing the elements.

#### Returns

`number`[]

The array that was packed into

***

### unpack()

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `VertexFormat`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`VertexFormat`

The object into which to store the result.

#### Returns

`VertexFormat`

The modified result parameter or a new VertexFormat instance if one was not provided.
