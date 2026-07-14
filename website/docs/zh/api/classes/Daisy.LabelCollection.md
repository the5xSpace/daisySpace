[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / LabelCollection

# Class: LabelCollection

A renderable collection of labels. Labels are viewport-aligned text positioned in the 3D scene.
Each label can have a different font, color, scale, etc.






Example labels




Labels are added and removed from the collection using [LabelCollection#add](#add)
and [LabelCollection#remove](#remove).

## Example

```ts
// Create a label collection with two labels
const labels = scene.primitives.add(new Daisy.LabelCollection());
labels.add({
 position : new Daisy.Cartesian3(1.0, 2.0, 3.0),
 text : 'A label'
});
labels.add({
 position : new Daisy.Cartesian3(4.0, 5.0, 6.0),
 text : 'Another label'
});
```

## Param

Object with the following properties:

## Param

The 4x4 transformation matrix that transforms each label from model to world coordinates.

## Param

For debugging only. Determines if this primitive's commands' bounding spheres are shown.

## Param

Must be passed in for labels that use the height reference property or will be depth tested against the globe.

## Param

The label blending option. The default
is used for rendering both opaque and translucent labels. However, if either all of the labels are completely opaque or all are completely translucent,
setting the technique to BlendOption.OPAQUE or BlendOption.TRANSLUCENT can improve performance by up to 2x.

## Param

Determines if the labels in the collection will be shown.

## Constructors

### Constructor

> **new LabelCollection**(`options?`): `LabelCollection`

#### Parameters

##### options?

###### blendOption?

`BlendOption`

###### debugShowBoundingVolume?

`boolean`

###### modelMatrix?

[`Matrix4`](Daisy.Matrix4.md)

###### scene?

[`Scene`](Daisy.Scene.md)

###### show?

`boolean`

#### Returns

`LabelCollection`

## Properties

### blendOption

> **blendOption**: `BlendOption`

The label blending option. The default is used for rendering both opaque and translucent labels.
However, if either all of the labels are completely opaque or all are completely translucent,
setting the technique to BlendOption.OPAQUE or BlendOption.TRANSLUCENT can improve
performance by up to 2x.

***

### debugShowBoundingVolume

> **debugShowBoundingVolume**: `boolean`

This property is for debugging only; it is not for production use nor is it optimized.

Draws the bounding sphere for each draw command in the primitive.


***

### length

> `readonly` **length**: `number`

Returns the number of labels in this collection. This is commonly used with
[LabelCollection#get](#get) to iterate over all the labels
in the collection.

***

### modelMatrix

> **modelMatrix**: [`Matrix4`](Daisy.Matrix4.md)

The 4x4 transformation matrix that transforms each label in this collection from model to world coordinates.
When this is the identity matrix, the labels are drawn in world coordinates, i.e., Earth's WGS84 coordinates.
Local reference frames can be used by providing a different transformation matrix, like that returned
by [Transforms.eastNorthUpToFixedFrame](../functions/Daisy.Transforms.eastNorthUpToFixedFrame.md).

#### Example

```ts
const center = Daisy.Cartesian3.fromDegrees(-75.59777, 40.03883);
labels.modelMatrix = Daisy.Transforms.eastNorthUpToFixedFrame(center);
labels.add({
 position : new Daisy.Cartesian3(0.0, 0.0, 0.0),
 text : 'Center'
});
labels.add({
 position : new Daisy.Cartesian3(1000000.0, 0.0, 0.0),
 text : 'East'
});
labels.add({
 position : new Daisy.Cartesian3(0.0, 1000000.0, 0.0),
 text : 'North'
});
labels.add({
 position : new Daisy.Cartesian3(0.0, 0.0, 1000000.0),
 text : 'Up'
});
```

***

### show

> **show**: `boolean`

Determines if labels in this collection will be shown.

## Methods

### add()

> **add**(`options?`): `Label`

Creates and adds a label with the specified initial properties to the collection.
The added label is returned so it can be modified or removed from the collection later.

#### Parameters

##### options?

`ConstructorOptions`

A template describing the label's properties as shown in Example 1.

#### Returns

`Label`

The label that was added to the collection.

#### Examples

```ts
// Example 1: Add a label, specifying all the default values.
const l = labels.add({
 show : true,
 position : Daisy.Cartesian3.ZERO,
 text : '',
 font : '30px sans-serif',
 fillColor : Daisy.Color.WHITE,
 outlineColor : Daisy.Color.BLACK,
 outlineWidth : 1.0,
 showBackground : false,
 backgroundColor : new Daisy.Color(0.165, 0.165, 0.165, 0.8),
 backgroundPadding : new Daisy.Cartesian2(7, 5),
 style : Daisy.LabelStyle.FILL,
 pixelOffset : Daisy.Cartesian2.ZERO,
 eyeOffset : Daisy.Cartesian3.ZERO,
 horizontalOrigin : Daisy.HorizontalOrigin.LEFT,
 verticalOrigin : Daisy.VerticalOrigin.BASELINE,
 scale : 1.0,
 translucencyByDistance : undefined,
 pixelOffsetScaleByDistance : undefined,
 heightReference : HeightReference.NONE,
 distanceDisplayCondition : undefined
});
```

```ts
// Example 2: Specify only the label's cartographic position,
// text, and font.
const l = labels.add({
 position : Daisy.Cartesian3.fromRadians(longitude, latitude, height),
 text : 'Hello World',
 font : '24px Helvetica',
});
```

***

### contains()

> **contains**(`label`): `boolean`

Check whether this collection contains a given label.

#### Parameters

##### label

`Label`

The label to check for.

#### Returns

`boolean`

true if this collection contains the label, false otherwise.

***

### destroy()

> **destroy**(): `void`

Destroys the WebGL resources held by this object. Destroying an object allows for deterministic
release of WebGL resources, instead of relying on the garbage collector to destroy this object.



Once an object is destroyed, it should not be used; calling any function other than
`isDestroyed` will result in a DeveloperError exception. Therefore,
assign the return value (`undefined`) to the object as done in the example.

#### Returns

`void`

#### Example

```ts
labels = labels && labels.destroy();
```

***

### get()

> **get**(`index`): `Label`

Returns the label in the collection at the specified index. Indices are zero-based
and increase as labels are added. Removing a label shifts all labels after
it to the left, changing their indices. This function is commonly used with
[LabelCollection#length](#length) to iterate over all the labels
in the collection.

#### Parameters

##### index

`number`

The zero-based index of the billboard.

#### Returns

`Label`

The label at the specified index.

#### Example

```ts
// Toggle the show property of every label in the collection
const len = labels.length;
for (let i = 0; i < len; ++i) {
 const l = billboards.get(i);
 l.show = !l.show;
}
```

***

### isDestroyed()

> **isDestroyed**(): `boolean`

Returns true if this object was destroyed; otherwise, false.



If this object was destroyed, it should not be used; calling any function other than
`isDestroyed` will result in a DeveloperError exception.

#### Returns

`boolean`

True if this object was destroyed; otherwise, false.

***

### remove()

> **remove**(`label`): `boolean`

Removes a label from the collection. Once removed, a label is no longer usable.

#### Parameters

##### label

`Label`

The label to remove.

#### Returns

`boolean`

`true` if the label was removed; `false` if the label was not found in the collection.

#### Example

```ts
const l = labels.add(...);
labels.remove(l); // Returns true
```

***

### removeAll()

> **removeAll**(): `void`

Removes all labels from the collection.

#### Returns

`void`

#### Example

```ts
labels.add(...);
labels.add(...);
labels.removeAll();
```
