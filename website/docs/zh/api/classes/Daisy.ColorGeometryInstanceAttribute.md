[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / ColorGeometryInstanceAttribute

# Class: ColorGeometryInstanceAttribute

Value and type information for per-instance geometry color.

## Example

```ts
const instance = new Daisy.GeometryInstance({
 geometry : Daisy.BoxGeometry.fromDimensions({
 dimensions : new Daisy.Cartesian3(1000000.0, 1000000.0, 500000.0)
 }),
 modelMatrix : Daisy.Matrix4.multiplyByTranslation(Daisy.Transforms.eastNorthUpToFixedFrame(
 Daisy.Cartesian3.fromDegrees(0.0, 0.0)), new Daisy.Cartesian3(0.0, 0.0, 1000000.0), new Daisy.Matrix4()),
 id : 'box',
 attributes : {
 color : new Daisy.ColorGeometryInstanceAttribute(red, green, blue, alpha)
 }
});
```

## Param

**red**

The red component.

## Param

**green**

The green component.

## Param

**blue**

The blue component.

## Param

**alpha**

The alpha component.

## Constructors

### Constructor

> **new ColorGeometryInstanceAttribute**(`red?`, `green?`, `blue?`, `alpha?`): `ColorGeometryInstanceAttribute`

#### Parameters

##### red?

`number`

##### green?

`number`

##### blue?

`number`

##### alpha?

`number`

#### Returns

`ColorGeometryInstanceAttribute`

## Properties

### componentDatatype

> `readonly` **componentDatatype**: [`ComponentDatatype`](../enums/Daisy.ComponentDatatype.md)

The datatype of each component in the attribute, e.g., individual elements in
[ColorGeometryInstanceAttribute#value](#value).

***

### componentsPerAttribute

> `readonly` **componentsPerAttribute**: `number`

The number of components in the attributes, i.e., [ColorGeometryInstanceAttribute#value](#value).

***

### normalize

> `readonly` **normalize**: `boolean`

When `true` and `componentDatatype` is an integer format,
indicate that the components should be mapped to the range [0, 1] (unsigned)
or [-1, 1] (signed) when they are accessed as floating-point for rendering.

***

### value

> **value**: `Uint8Array`

The values for the attributes stored in a typed array.

## Methods

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Compares the provided ColorGeometryInstanceAttributes and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### left?

`ColorGeometryInstanceAttribute`

The first ColorGeometryInstanceAttribute.

##### right?

`ColorGeometryInstanceAttribute`

The second ColorGeometryInstanceAttribute.

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.

***

### fromColor()

> `static` **fromColor**(`color`): `ColorGeometryInstanceAttribute`

Creates a new ColorGeometryInstanceAttribute instance given the provided [Color](Daisy.Color.md).

#### Parameters

##### color

[`Color`](Daisy.Color.md)

The color.

#### Returns

`ColorGeometryInstanceAttribute`

The new ColorGeometryInstanceAttribute instance.

#### Example

```ts
const instance = new Daisy.GeometryInstance({
 geometry : geometry,
 attributes : {
 color : Daisy.ColorGeometryInstanceAttribute.fromColor(Daisy.Color.CORNFLOWERBLUE),
 }
});
```

***

### toValue()

> `static` **toValue**(`color`, `result?`): `Uint8Array`

Converts a color to a typed array that can be used to assign a color attribute.

#### Parameters

##### color

[`Color`](Daisy.Color.md)

The color.

##### result?

`Uint8Array`\<`ArrayBufferLike`\>

The array to store the result in, if undefined a new instance will be created.

#### Returns

`Uint8Array`

The modified result parameter or a new instance if result was undefined.

#### Example

```ts
const attributes = primitive.getGeometryInstanceAttributes('an id');
attributes.color = Daisy.ColorGeometryInstanceAttribute.toValue(Daisy.Color.AQUA, attributes.color);
```
