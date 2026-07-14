[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / PerInstanceColorAppearance

# Class: PerInstanceColorAppearance

An appearance for [GeometryInstance](Daisy.GeometryInstance.md) instances with color attributes.
This allows several geometry instances, each with a different color, to
be drawn with the same Primitive as shown in the second example below.

## Example

```ts
// A solid white line segment
const primitive = new Daisy.Primitive({
 geometryInstances : new Daisy.GeometryInstance({
 geometry : new Daisy.SimplePolylineGeometry({
 positions : Daisy.Cartesian3.fromDegreesArray([
 0.0, 0.0,
 5.0, 0.0
 ])
 }),
 attributes : {
 color : Daisy.ColorGeometryInstanceAttribute.fromColor(new Daisy.Color(1.0, 1.0, 1.0, 1.0))
 }
 }),
 appearance : new Daisy.PerInstanceColorAppearance({
 flat : true,
 translucent : false
 })
});

// Two rectangles in a primitive, each with a different color
const instance = new Daisy.GeometryInstance({
 geometry : new Daisy.RectangleGeometry({
 rectangle : Daisy.Rectangle.fromDegrees(0.0, 20.0, 10.0, 30.0)
 }),
 attributes : {
 color : new Daisy.ColorGeometryInstanceAttribute(1.0, 0.0, 0.0, 0.5)
 }
});

const anotherInstance = new Daisy.GeometryInstance({
 geometry : new Daisy.RectangleGeometry({
 rectangle : Daisy.Rectangle.fromDegrees(0.0, 40.0, 10.0, 50.0)
 }),
 attributes : {
 color : new Daisy.ColorGeometryInstanceAttribute(0.0, 0.0, 1.0, 0.5)
 }
});

const rectanglePrimitive = new Daisy.Primitive({
 geometryInstances : [instance, anotherInstance],
 appearance : new Daisy.PerInstanceColorAppearance()
});
```

## Param

Object with the following properties:

## Param

When `true`, flat shading is used in the fragment shader, which means lighting is not taking into account.

## Param

When `true`, the fragment shader flips the surface normal as needed to ensure that the normal faces the viewer to avoid dark spots. This is useful when both sides of a geometry should be shaded like WallGeometry.

## Param

When `true`, the geometry is expected to appear translucent so [PerInstanceColorAppearance#renderState](#renderstate) has alpha blending enabled.

## Param

When `true`, the geometry is expected to be closed so [PerInstanceColorAppearance#renderState](#renderstate) has backface culling enabled.

## Param

Optional GLSL vertex shader source to override the default vertex shader.

## Param

Optional GLSL fragment shader source to override the default fragment shader.

## Param

Optional render state to override the default render state.

## Constructors

### Constructor

> **new PerInstanceColorAppearance**(`options?`): `PerInstanceColorAppearance`

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

###### renderState?

`any`

###### translucent?

`boolean`

###### vertexShaderSource?

`string`

#### Returns

`PerInstanceColorAppearance`

## Properties

### closed

> `readonly` **closed**: `boolean`

When `true`, the geometry is expected to be closed so
[PerInstanceColorAppearance#renderState](#renderstate) has backface culling enabled.
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

The GLSL source code for the fragment shader.

***

### material

> **material**: [`Material`](Daisy.Material.md)

This property is part of the Appearance interface, but is not
used by PerInstanceColorAppearance since a fully custom fragment shader is used.

***

### renderState

> `readonly` **renderState**: `any`

The WebGL fixed-function state to use when rendering the geometry.

The render state can be explicitly defined when constructing a PerInstanceColorAppearance
instance, or it is set implicitly via [PerInstanceColorAppearance#translucent](#translucent)
and [PerInstanceColorAppearance#closed](#closed).


***

### translucent

> **translucent**: `boolean`

When `true`, the geometry is expected to appear translucent so
[PerInstanceColorAppearance#renderState](#renderstate) has alpha blending enabled.

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

***

### FLAT\_VERTEX\_FORMAT

> `readonly` `static` **FLAT\_VERTEX\_FORMAT**: [`VertexFormat`](Daisy.VertexFormat.md)

The [VertexFormat](Daisy.VertexFormat.md) that all PerInstanceColorAppearance instances
are compatible with when [PerInstanceColorAppearance#flat](#flat) is `true`.
This requires only a `position` attribute.

***

### VERTEX\_FORMAT

> `readonly` `static` **VERTEX\_FORMAT**: [`VertexFormat`](Daisy.VertexFormat.md)

The [VertexFormat](Daisy.VertexFormat.md) that all PerInstanceColorAppearance instances
are compatible with. This requires only `position` and `normal`
attributes.

## Methods

### getFragmentShaderSource()

> **getFragmentShaderSource**(): `string`

Procedurally creates the full GLSL fragment shader source. For PerInstanceColorAppearance,
this is derived from [PerInstanceColorAppearance#fragmentShaderSource](#fragmentshadersource), [PerInstanceColorAppearance#flat](#flat),
and [PerInstanceColorAppearance#faceForward](#faceforward).

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

Determines if the geometry is translucent based on [PerInstanceColorAppearance#translucent](#translucent).

#### Returns

`boolean`

`true` if the appearance is translucent.
