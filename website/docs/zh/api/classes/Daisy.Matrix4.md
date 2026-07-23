[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Matrix4

# Class: Matrix4

A 4x4 matrix, indexable as a column-major order array.
Constructor parameters are in row-major order for code readability.

## Param

**column0Row0**

The value for column 0, row 0.

## Param

**column1Row0**

The value for column 1, row 0.

## Param

**column2Row0**

The value for column 2, row 0.

## Param

**column3Row0**

The value for column 3, row 0.

## Param

**column0Row1**

The value for column 0, row 1.

## Param

**column1Row1**

The value for column 1, row 1.

## Param

**column2Row1**

The value for column 2, row 1.

## Param

**column3Row1**

The value for column 3, row 1.

## Param

**column0Row2**

The value for column 0, row 2.

## Param

**column1Row2**

The value for column 1, row 2.

## Param

**column2Row2**

The value for column 2, row 2.

## Param

**column3Row2**

The value for column 3, row 2.

## Param

**column0Row3**

The value for column 0, row 3.

## Param

**column1Row3**

The value for column 1, row 3.

## Param

**column2Row3**

The value for column 2, row 3.

## Param

**column3Row3**

The value for column 3, row 3.

## Extends

- `ArrayLike`\<`number`\>

## Implements

- `ArrayLike`\<`number`\>

## Indexable

> \[`n`: `number`\]: `number`

## Constructors

### Constructor

> **new Matrix4**(`column0Row0?`, `column1Row0?`, `column2Row0?`, `column3Row0?`, `column0Row1?`, `column1Row1?`, `column2Row1?`, `column3Row1?`, `column0Row2?`, `column1Row2?`, `column2Row2?`, `column3Row2?`, `column0Row3?`, `column1Row3?`, `column2Row3?`, `column3Row3?`): `Matrix4`

#### Parameters

##### column0Row0?

`number`

##### column1Row0?

`number`

##### column2Row0?

`number`

##### column3Row0?

`number`

##### column0Row1?

`number`

##### column1Row1?

`number`

##### column2Row1?

`number`

##### column3Row1?

`number`

##### column0Row2?

`number`

##### column1Row2?

`number`

##### column2Row2?

`number`

##### column3Row2?

`number`

##### column0Row3?

`number`

##### column1Row3?

`number`

##### column2Row3?

`number`

##### column3Row3?

`number`

#### Returns

`Matrix4`

#### Inherited from

`ArrayLike<number>.constructor`

## Properties

### length

> **length**: `number`

Gets the number of items in the collection.

#### Inherited from

`ArrayLike.length`

***

### COLUMN0ROW0

> `readonly` `static` **COLUMN0ROW0**: `number`

The index into Matrix4 for column 0, row 0.

***

### COLUMN0ROW1

> `readonly` `static` **COLUMN0ROW1**: `number`

The index into Matrix4 for column 0, row 1.

***

### COLUMN0ROW2

> `readonly` `static` **COLUMN0ROW2**: `number`

The index into Matrix4 for column 0, row 2.

***

### COLUMN0ROW3

> `readonly` `static` **COLUMN0ROW3**: `number`

The index into Matrix4 for column 0, row 3.

***

### COLUMN1ROW0

> `readonly` `static` **COLUMN1ROW0**: `number`

The index into Matrix4 for column 1, row 0.

***

### COLUMN1ROW1

> `readonly` `static` **COLUMN1ROW1**: `number`

The index into Matrix4 for column 1, row 1.

***

### COLUMN1ROW2

> `readonly` `static` **COLUMN1ROW2**: `number`

The index into Matrix4 for column 1, row 2.

***

### COLUMN1ROW3

> `readonly` `static` **COLUMN1ROW3**: `number`

The index into Matrix4 for column 1, row 3.

***

### COLUMN2ROW0

> `readonly` `static` **COLUMN2ROW0**: `number`

The index into Matrix4 for column 2, row 0.

***

### COLUMN2ROW1

> `readonly` `static` **COLUMN2ROW1**: `number`

The index into Matrix4 for column 2, row 1.

***

### COLUMN2ROW2

> `readonly` `static` **COLUMN2ROW2**: `number`

The index into Matrix4 for column 2, row 2.

***

### COLUMN2ROW3

> `readonly` `static` **COLUMN2ROW3**: `number`

The index into Matrix4 for column 2, row 3.

***

### COLUMN3ROW0

> `readonly` `static` **COLUMN3ROW0**: `number`

The index into Matrix4 for column 3, row 0.

***

### COLUMN3ROW1

> `readonly` `static` **COLUMN3ROW1**: `number`

The index into Matrix4 for column 3, row 1.

***

### COLUMN3ROW2

> `readonly` `static` **COLUMN3ROW2**: `number`

The index into Matrix4 for column 3, row 2.

***

### COLUMN3ROW3

> `readonly` `static` **COLUMN3ROW3**: `number`

The index into Matrix4 for column 3, row 3.

***

### IDENTITY

> `readonly` `static` **IDENTITY**: `Matrix4`

An immutable Matrix4 instance initialized to the identity matrix.

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

***

### ZERO

> `readonly` `static` **ZERO**: `Matrix4`

An immutable Matrix4 instance initialized to the zero matrix.

## Methods

### clone()

> **clone**(`result?`): `Matrix4`

Duplicates the provided Matrix4 instance.

#### Parameters

##### result?

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter or a new Matrix4 instance if one was not provided.

***

### equals()

> **equals**(`right?`): `boolean`

Compares this matrix to the provided matrix componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`Matrix4`

The right hand side matrix.

#### Returns

`boolean`

`true` if they are equal, `false` otherwise.

***

### equalsEpsilon()

> **equalsEpsilon**(`right?`, `epsilon?`): `boolean`

Compares this matrix to the provided matrix componentwise and returns
`true` if they are within the provided epsilon,
`false` otherwise.

#### Parameters

##### right?

`Matrix4`

The right hand side matrix.

##### epsilon?

`number`

The epsilon to use for equality testing.

#### Returns

`boolean`

`true` if they are within the provided epsilon, `false` otherwise.

***

### toString()

> **toString**(): `string`

Computes a string representing this Matrix with each row being
on a separate line and in the format '(column0, column1, column2, column3)'.

#### Returns

`string`

A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1, column2, column3)'.

***

### abs()

> `static` **abs**(`matrix`, `result`): `Matrix4`

Computes a matrix, which contains the absolute (unsigned) values of the provided matrix's elements.

#### Parameters

##### matrix

`Matrix4`

The matrix with signed elements.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

***

### add()

> `static` **add**(`left`, `right`, `result`): `Matrix4`

Computes the sum of two matrices.

#### Parameters

##### left

`Matrix4`

The first matrix.

##### right

`Matrix4`

The second matrix.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

***

### clone()

> `static` **clone**(`matrix`, `result?`): `Matrix4`

Duplicates a Matrix4 instance.

#### Parameters

##### matrix

`Matrix4`

The matrix to duplicate.

##### result?

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter or a new Matrix4 instance if one was not provided. (Returns undefined if matrix is undefined)

***

### computeInfinitePerspectiveOffCenter()

> `static` **computeInfinitePerspectiveOffCenter**(`left`, `right`, `bottom`, `top`, `near`, `result`): `Matrix4`

Computes a Matrix4 instance representing an infinite off center perspective transformation.

#### Parameters

##### left

`number`

The number of meters to the left of the camera that will be in view.

##### right

`number`

The number of meters to the right of the camera that will be in view.

##### bottom

`number`

The number of meters below of the camera that will be in view.

##### top

`number`

The number of meters above of the camera that will be in view.

##### near

`number`

The distance to the near plane in meters.

##### result

`Matrix4`

The object in which the result will be stored.

#### Returns

`Matrix4`

The modified result parameter.

***

### computeOrthographicOffCenter()

> `static` **computeOrthographicOffCenter**(`left`, `right`, `bottom`, `top`, `near`, `far`, `result`): `Matrix4`

Computes a Matrix4 instance representing an orthographic transformation matrix.

#### Parameters

##### left

`number`

The number of meters to the left of the camera that will be in view.

##### right

`number`

The number of meters to the right of the camera that will be in view.

##### bottom

`number`

The number of meters below of the camera that will be in view.

##### top

`number`

The number of meters above of the camera that will be in view.

##### near

`number`

The distance to the near plane in meters.

##### far

`number`

The distance to the far plane in meters.

##### result

`Matrix4`

The object in which the result will be stored.

#### Returns

`Matrix4`

The modified result parameter.

***

### computePerspectiveFieldOfView()

> `static` **computePerspectiveFieldOfView**(`fovY`, `aspectRatio`, `near`, `far`, `result`): `Matrix4`

Computes a Matrix4 instance representing a perspective transformation matrix.

#### Parameters

##### fovY

`number`

The field of view along the Y axis in radians.

##### aspectRatio

`number`

The aspect ratio.

##### near

`number`

The distance to the near plane in meters.

##### far

`number`

The distance to the far plane in meters.

##### result

`Matrix4`

The object in which the result will be stored.

#### Returns

`Matrix4`

The modified result parameter.

***

### computePerspectiveOffCenter()

> `static` **computePerspectiveOffCenter**(`left`, `right`, `bottom`, `top`, `near`, `far`, `result`): `Matrix4`

Computes a Matrix4 instance representing an off center perspective transformation.

#### Parameters

##### left

`number`

The number of meters to the left of the camera that will be in view.

##### right

`number`

The number of meters to the right of the camera that will be in view.

##### bottom

`number`

The number of meters below the camera that will be in view.

##### top

`number`

The number of meters above the camera that will be in view.

##### near

`number`

The distance to the near plane in meters.

##### far

`number`

The distance to the far plane in meters.

##### result

`Matrix4`

The object in which the result will be stored.

#### Returns

`Matrix4`

The modified result parameter.

***

### computeView()

> `static` **computeView**(`position`, `direction`, `up`, `right`, `result`): `Matrix4`

Computes a Matrix4 instance that transforms from world space to view space.

#### Parameters

##### position

[`Cartesian3`](Daisy.Cartesian3.md)

The position of the camera.

##### direction

[`Cartesian3`](Daisy.Cartesian3.md)

The forward direction.

##### up

[`Cartesian3`](Daisy.Cartesian3.md)

The up direction.

##### right

[`Cartesian3`](Daisy.Cartesian3.md)

The right direction.

##### result

`Matrix4`

The object in which the result will be stored.

#### Returns

`Matrix4`

The modified result parameter.

***

### computeViewportTransformation()

> `static` **computeViewportTransformation**(`viewport?`, `nearDepthRange?`, `farDepthRange?`, `result?`): `Matrix4`

Computes a Matrix4 instance that transforms from normalized device coordinates to window coordinates.

#### Parameters

##### viewport?

`any`

The viewport's corners as shown in Example 1.

##### nearDepthRange?

`number`

The near plane distance in window coordinates.

##### farDepthRange?

`number`

The far plane distance in window coordinates.

##### result?

`Matrix4`

The object in which the result will be stored.

#### Returns

`Matrix4`

The modified result parameter.

#### Example

```ts
// Create viewport transformation using an explicit viewport and depth range.
const m = Daisy.Matrix4.computeViewportTransformation({
 x : 0.0,
 y : 0.0,
 width : 1024.0,
 height : 768.0
}, 0.0, 1.0, new Daisy.Matrix4());
```

***

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Compares the provided matrices componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### left?

`Matrix4`

The first matrix.

##### right?

`Matrix4`

The second matrix.

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.

#### Example

```ts
//compares two Matrix4 instances

// a = [10.0, 14.0, 18.0, 22.0]
// [11.0, 15.0, 19.0, 23.0]
// [12.0, 16.0, 20.0, 24.0]
// [13.0, 17.0, 21.0, 25.0]

// b = [10.0, 14.0, 18.0, 22.0]
// [11.0, 15.0, 19.0, 23.0]
// [12.0, 16.0, 20.0, 24.0]
// [13.0, 17.0, 21.0, 25.0]

if(Daisy.Matrix4.equals(a,b)) {
 console.log("Both matrices are equal");
} else {
 console.log("They are not equal");
}

//Prints "Both matrices are equal" on the console
```

***

### equalsEpsilon()

> `static` **equalsEpsilon**(`left?`, `right?`, `epsilon?`): `boolean`

Compares the provided matrices componentwise and returns
`true` if they are within the provided epsilon,
`false` otherwise.

#### Parameters

##### left?

`Matrix4`

The first matrix.

##### right?

`Matrix4`

The second matrix.

##### epsilon?

`number`

The epsilon to use for equality testing.

#### Returns

`boolean`

`true` if left and right are within the provided epsilon, `false` otherwise.

#### Example

```ts
//compares two Matrix4 instances

// a = [10.5, 14.5, 18.5, 22.5]
// [11.5, 15.5, 19.5, 23.5]
// [12.5, 16.5, 20.5, 24.5]
// [13.5, 17.5, 21.5, 25.5]

// b = [10.0, 14.0, 18.0, 22.0]
// [11.0, 15.0, 19.0, 23.0]
// [12.0, 16.0, 20.0, 24.0]
// [13.0, 17.0, 21.0, 25.0]

if(Daisy.Matrix4.equalsEpsilon(a,b,0.1)){
 console.log("Difference between both the matrices is less than 0.1");
} else {
 console.log("Difference between both the matrices is not less than 0.1");
}

//Prints "Difference between both the matrices is not less than 0.1" on the console
```

***

### fromArray()

> `static` **fromArray**(`array`, `startingIndex?`, `result?`): `Matrix4`

Creates a Matrix4 from 16 consecutive elements in an array.

#### Parameters

##### array

`number`[]

The array whose 16 consecutive elements correspond to the positions of the matrix. Assumes column-major order.

##### startingIndex?

`number`

The offset into the array of the first element, which corresponds to first column first row position in the matrix.

##### result?

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter or a new Matrix4 instance if one was not provided.

#### Example

```ts
// Create the Matrix4:
// [1.0, 2.0, 3.0, 4.0]
// [1.0, 2.0, 3.0, 4.0]
// [1.0, 2.0, 3.0, 4.0]
// [1.0, 2.0, 3.0, 4.0]

const v = [1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 4.0, 4.0, 4.0, 4.0];
const m = Daisy.Matrix4.fromArray(v);

// Create same Matrix4 with using an offset into an array
const v2 = [0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0, 3.0, 4.0, 4.0, 4.0, 4.0];
const m2 = Daisy.Matrix4.fromArray(v2, 2);
```

***

### fromCamera()

> `static` **fromCamera**(`camera`, `result?`): `Matrix4`

Computes a Matrix4 instance from a Camera.

#### Parameters

##### camera

`Camera`

The camera to use.

##### result?

`Matrix4`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix4`

The modified result parameter, or a new Matrix4 instance if one was not provided.

***

### fromColumnMajorArray()

> `static` **fromColumnMajorArray**(`values`, `result?`): `Matrix4`

Computes a Matrix4 instance from a column-major order array.

#### Parameters

##### values

`number`[]

The column-major order array.

##### result?

`Matrix4`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix4`

The modified result parameter, or a new Matrix4 instance if one was not provided.

***

### fromRotation()

> `static` **fromRotation**(`rotation`, `result?`): `Matrix4`

Creates a rotation matrix.

#### Parameters

##### rotation

[`Matrix3`](Daisy.Matrix3.md)

The rotation matrix.

##### result?

`Matrix4`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix4`

The modified result parameter, or a new Matrix4 instance if one was not provided.

***

### fromRotationTranslation()

> `static` **fromRotationTranslation**(`rotation`, `translation?`, `result?`): `Matrix4`

Computes a Matrix4 instance from a Matrix3 representing the rotation
and a Cartesian3 representing the translation.

#### Parameters

##### rotation

[`Matrix3`](Daisy.Matrix3.md)

The upper left portion of the matrix representing the rotation.

##### translation?

[`Cartesian3`](Daisy.Cartesian3.md)

The upper right portion of the matrix representing the translation.

##### result?

`Matrix4`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix4`

The modified result parameter, or a new Matrix4 instance if one was not provided.

***

### fromRowMajorArray()

> `static` **fromRowMajorArray**(`values`, `result?`): `Matrix4`

Computes a Matrix4 instance from a row-major order array.
The resulting matrix will be in column-major order.

#### Parameters

##### values

`number`[]

The row-major order array.

##### result?

`Matrix4`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix4`

The modified result parameter, or a new Matrix4 instance if one was not provided.

***

### fromScale()

> `static` **fromScale**(`scale`, `result?`): `Matrix4`

Computes a Matrix4 instance representing a non-uniform scale.

#### Parameters

##### scale

[`Cartesian3`](Daisy.Cartesian3.md)

The x, y, and z scale factors.

##### result?

`Matrix4`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix4`

The modified result parameter, or a new Matrix4 instance if one was not provided.

#### Example

```ts
// Creates
// [7.0, 0.0, 0.0, 0.0]
// [0.0, 8.0, 0.0, 0.0]
// [0.0, 0.0, 9.0, 0.0]
// [0.0, 0.0, 0.0, 1.0]
const m = Daisy.Matrix4.fromScale(new Daisy.Cartesian3(7.0, 8.0, 9.0));
```

***

### fromTranslation()

> `static` **fromTranslation**(`translation`, `result?`): `Matrix4`

Creates a Matrix4 instance from a Cartesian3 representing the translation.

#### Parameters

##### translation

[`Cartesian3`](Daisy.Cartesian3.md)

The upper right portion of the matrix representing the translation.

##### result?

`Matrix4`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix4`

The modified result parameter, or a new Matrix4 instance if one was not provided.

***

### fromTranslationQuaternionRotationScale()

> `static` **fromTranslationQuaternionRotationScale**(`translation`, `rotation`, `scale`, `result?`): `Matrix4`

Computes a Matrix4 instance from a translation, rotation, and scale (TRS)
representation with the rotation represented as a quaternion.

#### Parameters

##### translation

[`Cartesian3`](Daisy.Cartesian3.md)

The translation transformation.

##### rotation

[`Quaternion`](Daisy.Quaternion.md)

The rotation transformation.

##### scale

[`Cartesian3`](Daisy.Cartesian3.md)

The non-uniform scale transformation.

##### result?

`Matrix4`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix4`

The modified result parameter, or a new Matrix4 instance if one was not provided.

#### Example

```ts
const result = Daisy.Matrix4.fromTranslationQuaternionRotationScale(
 new Daisy.Cartesian3(1.0, 2.0, 3.0), // translation
 Daisy.Quaternion.IDENTITY, // rotation
 new Daisy.Cartesian3(7.0, 8.0, 9.0), // scale
 result);
```

***

### fromTranslationRotationScale()

> `static` **fromTranslationRotationScale**(`translationRotationScale`, `result?`): `Matrix4`

Creates a Matrix4 instance from a TranslationRotationScale instance.

#### Parameters

##### translationRotationScale

`TranslationRotationScale`

The instance.

##### result?

`Matrix4`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix4`

The modified result parameter, or a new Matrix4 instance if one was not provided.

***

### fromUniformScale()

> `static` **fromUniformScale**(`scale`, `result?`): `Matrix4`

Computes a Matrix4 instance representing a uniform scale.

#### Parameters

##### scale

`number`

The uniform scale factor.

##### result?

`Matrix4`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix4`

The modified result parameter, or a new Matrix4 instance if one was not provided.

#### Example

```ts
// Creates
// [2.0, 0.0, 0.0, 0.0]
// [0.0, 2.0, 0.0, 0.0]
// [0.0, 0.0, 2.0, 0.0]
// [0.0, 0.0, 0.0, 1.0]
const m = Daisy.Matrix4.fromUniformScale(2.0);
```

***

### getColumn()

> `static` **getColumn**(`matrix`, `index`, `result`): [`Cartesian4`](Daisy.Cartesian4.md)

Retrieves a copy of the matrix column at the provided index as a Cartesian4 instance.

#### Parameters

##### matrix

`Matrix4`

The matrix to use.

##### index

`number`

The zero-based index of the column to retrieve.

##### result

[`Cartesian4`](Daisy.Cartesian4.md)

The object onto which to store the result.

#### Returns

[`Cartesian4`](Daisy.Cartesian4.md)

The modified result parameter.

#### Examples

```ts
//returns a Cartesian4 instance with values from the specified column
// m = [10.0, 11.0, 12.0, 13.0]
// [14.0, 15.0, 16.0, 17.0]
// [18.0, 19.0, 20.0, 21.0]
// [22.0, 23.0, 24.0, 25.0]

//Example 1: Creates an instance of Cartesian
const a = Daisy.Matrix4.getColumn(m, 2, new Daisy.Cartesian4());
```

```ts
//Example 2: Sets values for Cartesian instance
const a = new Daisy.Cartesian4();
Daisy.Matrix4.getColumn(m, 2, a);

// a.x = 12.0; a.y = 16.0; a.z = 20.0; a.w = 24.0;
```

***

### getElementIndex()

> `static` **getElementIndex**(`row`, `column`): `number`

Computes the array index of the element at the provided row and column.

#### Parameters

##### row

`number`

The zero-based index of the row.

##### column

`number`

The zero-based index of the column.

#### Returns

`number`

The index of the element at the provided row and column.

#### Example

```ts
const myMatrix = new Daisy.Matrix4();
const column1Row0Index = Daisy.Matrix4.getElementIndex(1, 0);
const column1Row0 = myMatrix[column1Row0Index];
myMatrix[column1Row0Index] = 10.0;
```

***

### getMatrix3()

> `static` **getMatrix3**(`matrix`, `result`): [`Matrix3`](Daisy.Matrix3.md)

Gets the upper left 3x3 matrix of the provided matrix.

#### Parameters

##### matrix

`Matrix4`

The matrix to use.

##### result

[`Matrix3`](Daisy.Matrix3.md)

The object onto which to store the result.

#### Returns

[`Matrix3`](Daisy.Matrix3.md)

The modified result parameter.

#### Example

```ts
// returns a Matrix3 instance from a Matrix4 instance

// m = [10.0, 14.0, 18.0, 22.0]
// [11.0, 15.0, 19.0, 23.0]
// [12.0, 16.0, 20.0, 24.0]
// [13.0, 17.0, 21.0, 25.0]

const b = new Daisy.Matrix3();
Daisy.Matrix4.getMatrix3(m,b);

// b = [10.0, 14.0, 18.0]
// [11.0, 15.0, 19.0]
// [12.0, 16.0, 20.0]
```

***

### getMaximumScale()

> `static` **getMaximumScale**(`matrix`): `number`

Computes the maximum scale assuming the matrix is an affine transformation.
The maximum scale is the maximum length of the column vectors in the upper-left
3x3 matrix.

#### Parameters

##### matrix

`Matrix4`

The matrix.

#### Returns

`number`

The maximum scale.

***

### getRotation()

> `static` **getRotation**(`matrix`, `result`): [`Matrix3`](Daisy.Matrix3.md)

Extracts the rotation matrix assuming the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix4`

The matrix.

##### result

[`Matrix3`](Daisy.Matrix3.md)

The object onto which to store the result.

#### Returns

[`Matrix3`](Daisy.Matrix3.md)

The modified result parameter.

***

### getRow()

> `static` **getRow**(`matrix`, `index`, `result`): [`Cartesian4`](Daisy.Cartesian4.md)

Retrieves a copy of the matrix row at the provided index as a Cartesian4 instance.

#### Parameters

##### matrix

`Matrix4`

The matrix to use.

##### index

`number`

The zero-based index of the row to retrieve.

##### result

[`Cartesian4`](Daisy.Cartesian4.md)

The object onto which to store the result.

#### Returns

[`Cartesian4`](Daisy.Cartesian4.md)

The modified result parameter.

#### Examples

```ts
//returns a Cartesian4 instance with values from the specified column
// m = [10.0, 11.0, 12.0, 13.0]
// [14.0, 15.0, 16.0, 17.0]
// [18.0, 19.0, 20.0, 21.0]
// [22.0, 23.0, 24.0, 25.0]

//Example 1: Returns an instance of Cartesian
const a = Daisy.Matrix4.getRow(m, 2, new Daisy.Cartesian4());
```

```ts
//Example 2: Sets values for a Cartesian instance
const a = new Daisy.Cartesian4();
Daisy.Matrix4.getRow(m, 2, a);

// a.x = 18.0; a.y = 19.0; a.z = 20.0; a.w = 21.0;
```

***

### getScale()

> `static` **getScale**(`matrix`, `result`): [`Cartesian3`](Daisy.Cartesian3.md)

Extracts the non-uniform scale assuming the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix4`

The matrix.

##### result

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter

***

### getTranslation()

> `static` **getTranslation**(`matrix`, `result`): [`Cartesian3`](Daisy.Cartesian3.md)

Gets the translation portion of the provided matrix, assuming the matrix is an affine transformation matrix.

#### Parameters

##### matrix

`Matrix4`

The matrix to use.

##### result

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter.

***

### inverse()

> `static` **inverse**(`matrix`, `result`): `Matrix4`

Computes the inverse of the provided matrix using Cramers Rule.
If the determinant is zero, the matrix can not be inverted, and an exception is thrown.
If the matrix is a proper rigid transformation, it is more efficient
to invert it with [Matrix4.inverseTransformation](#inversetransformation).

#### Parameters

##### matrix

`Matrix4`

The matrix to invert.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

***

### inverseTransformation()

> `static` **inverseTransformation**(`matrix`, `result`): `Matrix4`

Computes the inverse of the provided matrix assuming it is a proper rigid matrix,
where the upper left 3x3 elements are a rotation matrix,
and the upper three elements in the fourth column are the translation.
The bottom row is assumed to be [0, 0, 0, 1].
The matrix is not verified to be in the proper form.
This method is faster than computing the inverse for a general 4x4
matrix using [Matrix4.inverse](#inverse).

#### Parameters

##### matrix

`Matrix4`

The matrix to invert.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

***

### inverseTranspose()

> `static` **inverseTranspose**(`matrix`, `result`): `Matrix4`

Computes the inverse transpose of a matrix.

#### Parameters

##### matrix

`Matrix4`

The matrix to transpose and invert.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

***

### multiply()

> `static` **multiply**(`left`, `right`, `result`): `Matrix4`

Computes the product of two matrices.

#### Parameters

##### left

`Matrix4`

The first matrix.

##### right

`Matrix4`

The second matrix.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

***

### multiplyByMatrix3()

> `static` **multiplyByMatrix3**(`matrix`, `rotation`, `result`): `Matrix4`

Multiplies a transformation matrix (with a bottom row of `[0.0, 0.0, 0.0, 1.0]`)
by a 3x3 rotation matrix. This is an optimization
for `Matrix4.multiply(m, Matrix4.fromRotationTranslation(rotation), m);` with less allocations and arithmetic operations.

#### Parameters

##### matrix

`Matrix4`

The matrix on the left-hand side.

##### rotation

[`Matrix3`](Daisy.Matrix3.md)

The 3x3 rotation matrix on the right-hand side.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

#### Example

```ts
// Instead of Daisy.Matrix4.multiply(m, Daisy.Matrix4.fromRotationTranslation(rotation), m);
Daisy.Matrix4.multiplyByMatrix3(m, rotation, m);
```

***

### multiplyByPoint()

> `static` **multiplyByPoint**(`matrix`, `cartesian`, `result`): [`Cartesian3`](Daisy.Cartesian3.md)

Computes the product of a matrix and a [Cartesian3](Daisy.Cartesian3.md). This is equivalent to calling [Matrix4.multiplyByVector](#multiplybyvector)
with a [Cartesian4](Daisy.Cartesian4.md) with a `w` component of 1, but returns a [Cartesian3](Daisy.Cartesian3.md) instead of a [Cartesian4](Daisy.Cartesian4.md).

#### Parameters

##### matrix

`Matrix4`

The matrix.

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The point.

##### result

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter.

#### Example

```ts
const p = new Daisy.Cartesian3(1.0, 2.0, 3.0);
const result = Daisy.Matrix4.multiplyByPoint(matrix, p, new Daisy.Cartesian3());
```

***

### multiplyByPointAsVector()

> `static` **multiplyByPointAsVector**(`matrix`, `cartesian`, `result`): [`Cartesian3`](Daisy.Cartesian3.md)

Computes the product of a matrix and a [Cartesian3](Daisy.Cartesian3.md). This is equivalent to calling [Matrix4.multiplyByVector](#multiplybyvector)
with a [Cartesian4](Daisy.Cartesian4.md) with a `w` component of zero.

#### Parameters

##### matrix

`Matrix4`

The matrix.

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The point.

##### result

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter.

#### Example

```ts
const p = new Daisy.Cartesian3(1.0, 2.0, 3.0);
const result = Daisy.Matrix4.multiplyByPointAsVector(matrix, p, new Daisy.Cartesian3());
// A shortcut for
// Cartesian3 p = ...
// Daisy.Matrix4.multiplyByVector(matrix, new Daisy.Cartesian4(p.x, p.y, p.z, 0.0), result);
```

***

### multiplyByScalar()

> `static` **multiplyByScalar**(`matrix`, `scalar`, `result`): `Matrix4`

Computes the product of a matrix and a scalar.

#### Parameters

##### matrix

`Matrix4`

The matrix.

##### scalar

`number`

The number to multiply by.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

#### Example

```ts
//create a Matrix4 instance which is a scaled version of the supplied Matrix4
// m = [10.0, 11.0, 12.0, 13.0]
// [14.0, 15.0, 16.0, 17.0]
// [18.0, 19.0, 20.0, 21.0]
// [22.0, 23.0, 24.0, 25.0]

const a = Daisy.Matrix4.multiplyByScalar(m, -2, new Daisy.Matrix4());

// m remains the same
// a = [-20.0, -22.0, -24.0, -26.0]
// [-28.0, -30.0, -32.0, -34.0]
// [-36.0, -38.0, -40.0, -42.0]
// [-44.0, -46.0, -48.0, -50.0]
```

***

### multiplyByScale()

> `static` **multiplyByScale**(`matrix`, `scale`, `result`): `Matrix4`

Multiplies an affine transformation matrix (with a bottom row of `[0.0, 0.0, 0.0, 1.0]`)
by an implicit non-uniform scale matrix. This is an optimization
for `Matrix4.multiply(m, Matrix4.fromUniformScale(scale), m);`, where
`m` must be an affine matrix.
This function performs fewer allocations and arithmetic operations.

#### Parameters

##### matrix

`Matrix4`

The affine matrix on the left-hand side.

##### scale

[`Cartesian3`](Daisy.Cartesian3.md)

The non-uniform scale on the right-hand side.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

#### Example

```ts
// Instead of Daisy.Matrix4.multiply(m, Daisy.Matrix4.fromScale(scale), m);
Daisy.Matrix4.multiplyByScale(m, scale, m);
```

***

### multiplyByTranslation()

> `static` **multiplyByTranslation**(`matrix`, `translation`, `result`): `Matrix4`

Multiplies a transformation matrix (with a bottom row of `[0.0, 0.0, 0.0, 1.0]`)
by an implicit translation matrix defined by a [Cartesian3](Daisy.Cartesian3.md). This is an optimization
for `Matrix4.multiply(m, Matrix4.fromTranslation(position), m);` with less allocations and arithmetic operations.

#### Parameters

##### matrix

`Matrix4`

The matrix on the left-hand side.

##### translation

[`Cartesian3`](Daisy.Cartesian3.md)

The translation on the right-hand side.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

#### Example

```ts
// Instead of Daisy.Matrix4.multiply(m, Daisy.Matrix4.fromTranslation(position), m);
Daisy.Matrix4.multiplyByTranslation(m, position, m);
```

***

### multiplyByUniformScale()

> `static` **multiplyByUniformScale**(`matrix`, `scale`, `result`): `Matrix4`

Computes the product of a matrix times a uniform scale, as if the scale were a scale matrix.

#### Parameters

##### matrix

`Matrix4`

The matrix on the left-hand side.

##### scale

`number`

The uniform scale on the right-hand side.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

#### Example

```ts
// Instead of Daisy.Matrix4.multiply(m, Daisy.Matrix4.fromUniformScale(scale), m);
Daisy.Matrix4.multiplyByUniformScale(m, scale, m);
```

***

### multiplyByVector()

> `static` **multiplyByVector**(`matrix`, `cartesian`, `result`): [`Cartesian4`](Daisy.Cartesian4.md)

Computes the product of a matrix and a column vector.

#### Parameters

##### matrix

`Matrix4`

The matrix.

##### cartesian

[`Cartesian4`](Daisy.Cartesian4.md)

The vector.

##### result

[`Cartesian4`](Daisy.Cartesian4.md)

The object onto which to store the result.

#### Returns

[`Cartesian4`](Daisy.Cartesian4.md)

The modified result parameter.

***

### multiplyTransformation()

> `static` **multiplyTransformation**(`left`, `right`, `result`): `Matrix4`

Computes the product of two matrices assuming the matrices are affine transformation matrices,
where the upper left 3x3 elements are any matrix, and
the upper three elements in the fourth column are the translation.
The bottom row is assumed to be [0, 0, 0, 1].
The matrix is not verified to be in the proper form.
This method is faster than computing the product for general 4x4
matrices using [Matrix4.multiply](#multiply).

#### Parameters

##### left

`Matrix4`

The first matrix.

##### right

`Matrix4`

The second matrix.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

#### Example

```ts
const m1 = new Daisy.Matrix4(1.0, 6.0, 7.0, 0.0, 2.0, 5.0, 8.0, 0.0, 3.0, 4.0, 9.0, 0.0, 0.0, 0.0, 0.0, 1.0);
const m2 = Daisy.Transforms.eastNorthUpToFixedFrame(new Daisy.Cartesian3(1.0, 1.0, 1.0));
const m3 = Daisy.Matrix4.multiplyTransformation(m1, m2, new Daisy.Matrix4());
```

***

### negate()

> `static` **negate**(`matrix`, `result`): `Matrix4`

Computes a negated copy of the provided matrix.

#### Parameters

##### matrix

`Matrix4`

The matrix to negate.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

#### Example

```ts
//create a new Matrix4 instance which is a negation of a Matrix4
// m = [10.0, 11.0, 12.0, 13.0]
// [14.0, 15.0, 16.0, 17.0]
// [18.0, 19.0, 20.0, 21.0]
// [22.0, 23.0, 24.0, 25.0]

const a = Daisy.Matrix4.negate(m, new Daisy.Matrix4());

// m remains the same
// a = [-10.0, -11.0, -12.0, -13.0]
// [-14.0, -15.0, -16.0, -17.0]
// [-18.0, -19.0, -20.0, -21.0]
// [-22.0, -23.0, -24.0, -25.0]
```

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`Matrix4`

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

### packArray()

> `static` **packArray**(`array`, `result?`): `number`[]

Flattens an array of Matrix4s into an array of components. The components
are stored in column-major order.

#### Parameters

##### array

`Matrix4`[]

The array of matrices to pack.

##### result?

`number`[]

The array onto which to store the result. If this is a typed array, it must have array.length * 16 components, else a DeveloperError will be thrown. If it is a regular array, it will be resized to have (array.length * 16) elements.

#### Returns

`number`[]

The packed array.

***

### setColumn()

> `static` **setColumn**(`matrix`, `index`, `cartesian`, `result`): `Matrix4`

Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian4 instance.

#### Parameters

##### matrix

`Matrix4`

The matrix to use.

##### index

`number`

The zero-based index of the column to set.

##### cartesian

[`Cartesian4`](Daisy.Cartesian4.md)

The Cartesian whose values will be assigned to the specified column.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

#### Example

```ts
//creates a new Matrix4 instance with new column values from the Cartesian4 instance
// m = [10.0, 11.0, 12.0, 13.0]
// [14.0, 15.0, 16.0, 17.0]
// [18.0, 19.0, 20.0, 21.0]
// [22.0, 23.0, 24.0, 25.0]

const a = Daisy.Matrix4.setColumn(m, 2, new Daisy.Cartesian4(99.0, 98.0, 97.0, 96.0), new Daisy.Matrix4());

// m remains the same
// a = [10.0, 11.0, 99.0, 13.0]
// [14.0, 15.0, 98.0, 17.0]
// [18.0, 19.0, 97.0, 21.0]
// [22.0, 23.0, 96.0, 25.0]
```

***

### setRotation()

> `static` **setRotation**(`matrix`, `rotation`, `result`): `Matrix4`

Sets the rotation assuming the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix4`

The matrix.

##### rotation

[`Matrix3`](Daisy.Matrix3.md)

The rotation matrix.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

***

### setRow()

> `static` **setRow**(`matrix`, `index`, `cartesian`, `result`): `Matrix4`

Computes a new matrix that replaces the specified row in the provided matrix with the provided Cartesian4 instance.

#### Parameters

##### matrix

`Matrix4`

The matrix to use.

##### index

`number`

The zero-based index of the row to set.

##### cartesian

[`Cartesian4`](Daisy.Cartesian4.md)

The Cartesian whose values will be assigned to the specified row.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

#### Example

```ts
//create a new Matrix4 instance with new row values from the Cartesian4 instance
// m = [10.0, 11.0, 12.0, 13.0]
// [14.0, 15.0, 16.0, 17.0]
// [18.0, 19.0, 20.0, 21.0]
// [22.0, 23.0, 24.0, 25.0]

const a = Daisy.Matrix4.setRow(m, 2, new Daisy.Cartesian4(99.0, 98.0, 97.0, 96.0), new Daisy.Matrix4());

// m remains the same
// a = [10.0, 11.0, 12.0, 13.0]
// [14.0, 15.0, 16.0, 17.0]
// [99.0, 98.0, 97.0, 96.0]
// [22.0, 23.0, 24.0, 25.0]
```

***

### setScale()

> `static` **setScale**(`matrix`, `scale`, `result`): `Matrix4`

Computes a new matrix that replaces the scale with the provided scale.
This assumes the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix4`

The matrix to use.

##### scale

[`Cartesian3`](Daisy.Cartesian3.md)

The scale that replaces the scale of the provided matrix.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

***

### setTranslation()

> `static` **setTranslation**(`matrix`, `translation`, `result`): `Matrix4`

Computes a new matrix that replaces the translation in the rightmost column of the provided
matrix with the provided translation. This assumes the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix4`

The matrix to use.

##### translation

[`Cartesian3`](Daisy.Cartesian3.md)

The translation that replaces the translation of the provided matrix.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

***

### setUniformScale()

> `static` **setUniformScale**(`matrix`, `scale`, `result`): `Matrix4`

Computes a new matrix that replaces the scale with the provided uniform scale.
This assumes the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix4`

The matrix to use.

##### scale

`number`

The uniform scale that replaces the scale of the provided matrix.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

***

### subtract()

> `static` **subtract**(`left`, `right`, `result`): `Matrix4`

Computes the difference of two matrices.

#### Parameters

##### left

`Matrix4`

The first matrix.

##### right

`Matrix4`

The second matrix.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

***

### toArray()

> `static` **toArray**(`matrix`, `result?`): `number`[]

Computes an Array from the provided Matrix4 instance.
The array will be in column-major order.

#### Parameters

##### matrix

`Matrix4`

The matrix to use..

##### result?

`number`[]

The Array onto which to store the result.

#### Returns

`number`[]

The modified Array parameter or a new Array instance if one was not provided.

#### Example

```ts
//create an array from an instance of Matrix4
// m = [10.0, 14.0, 18.0, 22.0]
// [11.0, 15.0, 19.0, 23.0]
// [12.0, 16.0, 20.0, 24.0]
// [13.0, 17.0, 21.0, 25.0]
const a = Daisy.Matrix4.toArray(m);

// m remains the same
//creates a = [10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0, 24.0, 25.0]
```

***

### transpose()

> `static` **transpose**(`matrix`, `result`): `Matrix4`

Computes the transpose of the provided matrix.

#### Parameters

##### matrix

`Matrix4`

The matrix to transpose.

##### result

`Matrix4`

The object onto which to store the result.

#### Returns

`Matrix4`

The modified result parameter.

#### Example

```ts
//returns transpose of a Matrix4
// m = [10.0, 11.0, 12.0, 13.0]
// [14.0, 15.0, 16.0, 17.0]
// [18.0, 19.0, 20.0, 21.0]
// [22.0, 23.0, 24.0, 25.0]

const a = Daisy.Matrix4.transpose(m, new Daisy.Matrix4());

// m remains the same
// a = [10.0, 14.0, 18.0, 22.0]
// [11.0, 15.0, 19.0, 23.0]
// [12.0, 16.0, 20.0, 24.0]
// [13.0, 17.0, 21.0, 25.0]
```

***

### unpack()

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `Matrix4`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`Matrix4`

The object into which to store the result.

#### Returns

`Matrix4`

The modified result parameter or a new Matrix4 instance if one was not provided.

***

### unpackArray()

> `static` **unpackArray**(`array`, `result?`): `Matrix4`[]

Unpacks an array of column-major matrix components into an array of Matrix4s.

#### Parameters

##### array

`number`[]

The array of components to unpack.

##### result?

`Matrix4`[]

The array onto which to store the result.

#### Returns

`Matrix4`[]

The unpacked array.
