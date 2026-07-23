[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / GeometryAttribute

# Class: GeometryAttribute

Values and type information for geometry attributes. A [Geometry](Daisy.Geometry.md)
generally contains one or more attributes. All attributes together form
the geometry's vertices.

## Example

```ts
const geometry = new Daisy.Geometry({
 attributes : {
 position : new Daisy.GeometryAttribute({
 componentDatatype : Daisy.ComponentDatatype.FLOAT,
 componentsPerAttribute : 3,
 values : new Float32Array([
 0.0, 0.0, 0.0,
 7500000.0, 0.0, 0.0,
 0.0, 7500000.0, 0.0
 ])
 })
 },
 primitiveType : Daisy.PrimitiveType.LINE_LOOP
});
```

## Param

**options**

Object with the following properties:

## Param

**options.componentDatatype**

The datatype of each component in the attribute, e.g., individual elements in values.

## Param

**options.componentsPerAttribute**

A number between 1 and 4 that defines the number of components in an attributes.

## Param

**options.normalize**

When `true` and `componentDatatype` is an integer format, indicate that the components should be mapped to the range [0, 1] (unsigned) or [-1, 1] (signed) when they are accessed as floating-point for rendering.

## Param

**options.values**

The values for the attributes stored in a typed array.

## Constructors

### Constructor

> **new GeometryAttribute**(`options?`): `GeometryAttribute`

#### Parameters

##### options?

###### componentDatatype

[`ComponentDatatype`](../enums/Daisy.ComponentDatatype.md)

###### componentsPerAttribute

`number`

###### normalize?

`boolean`

###### values

`number`[] \| `Float64Array`\<`ArrayBufferLike`\> \| `Float32Array`\<`ArrayBufferLike`\> \| `Uint8Array`\<`ArrayBufferLike`\> \| `Int8Array`\<`ArrayBufferLike`\> \| `Uint16Array`\<`ArrayBufferLike`\> \| `Int16Array`\<`ArrayBufferLike`\> \| `Uint32Array`\<`ArrayBufferLike`\> \| `Int32Array`\<`ArrayBufferLike`\>

#### Returns

`GeometryAttribute`

## Properties

### componentDatatype

> **componentDatatype**: [`ComponentDatatype`](../enums/Daisy.ComponentDatatype.md)

The datatype of each component in the attribute, e.g., individual elements in
[GeometryAttribute#values](#values).

***

### componentsPerAttribute

> **componentsPerAttribute**: `number`

A number between 1 and 4 that defines the number of components in an attributes.
For example, a position attribute with x, y, and z components would have 3 as
shown in the code example.

#### Example

```ts
attribute.componentDatatype = Daisy.ComponentDatatype.FLOAT;
attribute.componentsPerAttribute = 3;
attribute.values = new Float32Array([
 0.0, 0.0, 0.0,
 7500000.0, 0.0, 0.0,
 0.0, 7500000.0, 0.0
]);
```

***

### normalize

> **normalize**: `boolean`

When `true` and `componentDatatype` is an integer format,
indicate that the components should be mapped to the range [0, 1] (unsigned)
or [-1, 1] (signed) when they are accessed as floating-point for rendering.

This is commonly used when storing colors using [ComponentDatatype.UNSIGNED\_BYTE](../enums/Daisy.ComponentDatatype.md#unsigned_byte).


#### Example

```ts
attribute.componentDatatype = Daisy.ComponentDatatype.UNSIGNED_BYTE;
attribute.componentsPerAttribute = 4;
attribute.normalize = true;
attribute.values = new Uint8Array([
 Daisy.Color.floatToByte(color.red),
 Daisy.Color.floatToByte(color.green),
 Daisy.Color.floatToByte(color.blue),
 Daisy.Color.floatToByte(color.alpha)
]);
```

***

### values

> **values**: `number`[] \| `Float64Array`\<`ArrayBufferLike`\> \| `Float32Array`\<`ArrayBufferLike`\> \| `Uint8Array`\<`ArrayBufferLike`\> \| `Int8Array`\<`ArrayBufferLike`\> \| `Uint16Array`\<`ArrayBufferLike`\> \| `Int16Array`\<`ArrayBufferLike`\> \| `Uint32Array`\<`ArrayBufferLike`\> \| `Int32Array`\<`ArrayBufferLike`\>

The values for the attributes stored in a typed array. In the code example,
every three elements in `values` defines one attributes since
`componentsPerAttribute` is 3.

#### Example

```ts
attribute.componentDatatype = Daisy.ComponentDatatype.FLOAT;
attribute.componentsPerAttribute = 3;
attribute.values = new Float32Array([
 0.0, 0.0, 0.0,
 7500000.0, 0.0, 0.0,
 0.0, 7500000.0, 0.0
]);
```
