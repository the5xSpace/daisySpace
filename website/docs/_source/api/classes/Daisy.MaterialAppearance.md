[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / MaterialAppearance

# Class: MaterialAppearance

An appearance for arbitrary geometry (as opposed to EllipsoidSurfaceAppearance, for example)
that supports shading with materials.

## Example

```ts
const primitive = new Daisy.Primitive({
 geometryInstances : new Daisy.GeometryInstance({
 geometry : new Daisy.WallGeometry({
 materialSupport : Daisy.MaterialAppearance.MaterialSupport.BASIC.vertexFormat,
 // ...
 })
 }),
 appearance : new Daisy.MaterialAppearance({
 material : Daisy.Material.fromType('Color'),
 faceForward : true
 })

});
```

## Param

Object with the following properties:

## Param

When `true`, flat shading is used in the fragment shader, which means lighting is not taking into account.

## Param

When `true`, the fragment shader flips the surface normal as needed to ensure that the normal faces the viewer to avoid dark spots. This is useful when both sides of a geometry should be shaded like WallGeometry.

## Param

When `true`, the geometry is expected to appear translucent so [MaterialAppearance#renderState](#renderstate) has alpha blending enabled.

## Param

When `true`, the geometry is expected to be closed so [MaterialAppearance#renderState](#renderstate) has backface culling enabled.

## Param

The type of materials that will be supported.

## Param

The material used to determine the fragment color.

## Param

Optional GLSL vertex shader source to override the default vertex shader.

## Param

Optional GLSL fragment shader source to override the default fragment shader.

## Param

Optional render state to override the default render state.

## Constructors

### Constructor

> **new MaterialAppearance**(`options?`): `MaterialAppearance`

#### Parameters

##### options?

###### closed?

`boolean`

###### faceForward?

`boolean`

###### flat?

`boolean`

###### fragmentShaderSource?

`string`

###### material?

[`Material`](Daisy.Material.md)

###### materialSupport?

[`MaterialSupportType`](../types/Daisy.MaterialAppearance.MaterialSupportType.md)

###### renderState?

`any`

###### translucent?

`boolean`

###### vertexShaderSource?

`string`

#### Returns

`MaterialAppearance`

## Properties

### closed

> `readonly` **closed**: `boolean`

When `true`, the geometry is expected to be closed so
[MaterialAppearance#renderState](#renderstate) has backface culling enabled.
If the viewer enters the geometry, it will not be visible.

***

### faceForward

> `readonly` **faceForward**: `boolean`

When `true`, the fragment shader flips the surface normal
as needed to ensure that the normal faces the viewer to avoid
dark spots. This is useful when both sides of a geometry should be
shaded like WallGeometry.

***

### flat

> `readonly` **flat**: `boolean`

When `true`, flat shading is used in the fragment shader,
which means lighting is not taking into account.

***

### fragmentShaderSource

> `readonly` **fragmentShaderSource**: `string`

The GLSL source code for the fragment shader. The full fragment shader
source is built procedurally taking into account [MaterialAppearance#material](#material),
[MaterialAppearance#flat](#flat), and [MaterialAppearance#faceForward](#faceforward).
Use [MaterialAppearance#getFragmentShaderSource](#getfragmentshadersource) to get the full source.

***

### material

> **material**: [`Material`](Daisy.Material.md)

The material used to determine the fragment color. Unlike other MaterialAppearance
properties, this is not read-only, so an appearance's material can change on the fly.

***

### materialSupport

> `readonly` **materialSupport**: [`MaterialSupportType`](../types/Daisy.MaterialAppearance.MaterialSupportType.md)

The type of materials supported by this instance. This impacts the required
[VertexFormat](Daisy.VertexFormat.md) and the complexity of the vertex and fragment shaders.

***

### renderState

> `readonly` **renderState**: `any`

The WebGL fixed-function state to use when rendering the geometry.

The render state can be explicitly defined when constructing a MaterialAppearance
instance, or it is set implicitly via [MaterialAppearance#translucent](#translucent)
and [MaterialAppearance#closed](#closed).


***

### translucent

> **translucent**: `boolean`

When `true`, the geometry is expected to appear translucent.

***

### vertexFormat

> `readonly` **vertexFormat**: [`VertexFormat`](Daisy.VertexFormat.md)

The [VertexFormat](Daisy.VertexFormat.md) that this appearance instance is compatible with.
A geometry can have more vertex attributes and still be compatible - at a
potential performance cost - but it can't have less.

***

### vertexShaderSource

> `readonly` **vertexShaderSource**: `string`

The GLSL source code for the vertex shader.

## Methods

### getFragmentShaderSource()

> **getFragmentShaderSource**(): `string`

Procedurally creates the full GLSL fragment shader source. For MaterialAppearance,
this is derived from [MaterialAppearance#fragmentShaderSource](#fragmentshadersource), [MaterialAppearance#material](#material),
[MaterialAppearance#flat](#flat), and [MaterialAppearance#faceForward](#faceforward).

#### Returns

`string`

The full GLSL fragment shader source.

***

### getRenderState()

> **getRenderState**(): `any`

Creates a render state. This is not the final render state instance; instead,
it can contain a subset of render state properties identical to the render state
created in the context.

#### Returns

`any`

The render state.

***

### isTranslucent()

> **isTranslucent**(): `boolean`

Determines if the geometry is translucent based on [MaterialAppearance#translucent](#translucent) and [Material#isTranslucent](Daisy.Material.md#istranslucent).

#### Returns

`boolean`

`true` if the appearance is translucent.
