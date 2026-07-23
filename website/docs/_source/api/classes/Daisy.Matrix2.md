[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Matrix2

# Class: Matrix2

A 2x2 matrix, indexable as a column-major order array.
Constructor parameters are in row-major order for code readability.

## Param

**column0Row0**

The value for column 0, row 0.

## Param

**column1Row0**

The value for column 1, row 0.

## Param

**column0Row1**

The value for column 0, row 1.

## Param

**column1Row1**

The value for column 1, row 1.

## Extends

- `ArrayLike`\<`number`\>

## Implements

- `ArrayLike`\<`number`\>

## Indexable

> \[`n`: `number`\]: `number`

## Constructors

### Constructor

> **new Matrix2**(`column0Row0?`, `column1Row0?`, `column0Row1?`, `column1Row1?`): `Matrix2`

#### Parameters

##### column0Row0?

`number`

##### column1Row0?

`number`

##### column0Row1?

`number`

##### column1Row1?

`number`

#### Returns

`Matrix2`

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

The index into Matrix2 for column 0, row 0.

#### Example

```ts
const matrix = new Daisy.Matrix2();
matrix[Daisy.Matrix2.COLUMN0ROW0] = 5.0; // set column 0, row 0 to 5.0
```

***

### COLUMN0ROW1

> `readonly` `static` **COLUMN0ROW1**: `number`

The index into Matrix2 for column 0, row 1.

#### Example

```ts
const matrix = new Daisy.Matrix2();
matrix[Daisy.Matrix2.COLUMN0ROW1] = 5.0; // set column 0, row 1 to 5.0
```

***

### COLUMN1ROW0

> `readonly` `static` **COLUMN1ROW0**: `number`

The index into Matrix2 for column 1, row 0.

#### Example

```ts
const matrix = new Daisy.Matrix2();
matrix[Daisy.Matrix2.COLUMN1ROW0] = 5.0; // set column 1, row 0 to 5.0
```

***

### COLUMN1ROW1

> `readonly` `static` **COLUMN1ROW1**: `number`

The index into Matrix2 for column 1, row 1.

#### Example

```ts
const matrix = new Daisy.Matrix2();
matrix[Daisy.Matrix2.COLUMN1ROW1] = 5.0; // set column 1, row 1 to 5.0
```

***

### IDENTITY

> `readonly` `static` **IDENTITY**: `Matrix2`

An immutable Matrix2 instance initialized to the identity matrix.

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

***

### ZERO

> `readonly` `static` **ZERO**: `Matrix2`

An immutable Matrix2 instance initialized to the zero matrix.

## Methods

### clone()

> **clone**(`result?`): `Matrix2`

Duplicates the provided Matrix2 instance.

#### Parameters

##### result?

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter or a new Matrix2 instance if one was not provided.

***

### equals()

> **equals**(`right?`): `boolean`

Compares this matrix to the provided matrix componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`Matrix2`

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

`Matrix2`

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

Creates a string representing this Matrix with each row being
on a separate line and in the format '(column0, column1)'.

#### Returns

`string`

A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1)'.

***

### abs()

> `static` **abs**(`matrix`, `result`): `Matrix2`

Computes a matrix, which contains the absolute (unsigned) values of the provided matrix's elements.

#### Parameters

##### matrix

`Matrix2`

The matrix with signed elements.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

***

### add()

> `static` **add**(`left`, `right`, `result`): `Matrix2`

Computes the sum of two matrices.

#### Parameters

##### left

`Matrix2`

The first matrix.

##### right

`Matrix2`

The second matrix.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

***

### clone()

> `static` **clone**(`matrix`, `result?`): `Matrix2`

Duplicates a Matrix2 instance.

#### Parameters

##### matrix

`Matrix2`

The matrix to duplicate.

##### result?

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter or a new Matrix2 instance if one was not provided. (Returns undefined if matrix is undefined)

***

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Compares the provided matrices componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### left?

`Matrix2`

The first matrix.

##### right?

`Matrix2`

The second matrix.

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.

***

### equalsEpsilon()

> `static` **equalsEpsilon**(`left?`, `right?`, `epsilon?`): `boolean`

Compares the provided matrices componentwise and returns
`true` if they are within the provided epsilon,
`false` otherwise.

#### Parameters

##### left?

`Matrix2`

The first matrix.

##### right?

`Matrix2`

The second matrix.

##### epsilon?

`number`

The epsilon to use for equality testing.

#### Returns

`boolean`

`true` if left and right are within the provided epsilon, `false` otherwise.

***

### fromArray()

> `static` **fromArray**(`array`, `startingIndex?`, `result?`): `Matrix2`

Creates a Matrix2 from 4 consecutive elements in an array.

#### Parameters

##### array

`number`[]

The array whose 4 consecutive elements correspond to the positions of the matrix. Assumes column-major order.

##### startingIndex?

`number`

The offset into the array of the first element, which corresponds to first column first row position in the matrix.

##### result?

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter or a new Matrix2 instance if one was not provided.

#### Example

```ts
// Create the Matrix2:
// [1.0, 2.0]
// [1.0, 2.0]

const v = [1.0, 1.0, 2.0, 2.0];
const m = Daisy.Matrix2.fromArray(v);

// Create same Matrix2 with using an offset into an array
const v2 = [0.0, 0.0, 1.0, 1.0, 2.0, 2.0];
const m2 = Daisy.Matrix2.fromArray(v2, 2);
```

***

### fromColumnMajorArray()

> `static` **fromColumnMajorArray**(`values`, `result?`): `Matrix2`

Creates a Matrix2 instance from a column-major order array.

#### Parameters

##### values

`number`[]

The column-major order array.

##### result?

`Matrix2`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix2`

The modified result parameter, or a new Matrix2 instance if one was not provided.

***

### fromRotation()

> `static` **fromRotation**(`angle`, `result?`): `Matrix2`

Creates a rotation matrix.

#### Parameters

##### angle

`number`

The angle, in radians, of the rotation. Positive angles are counterclockwise.

##### result?

`Matrix2`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix2`

The modified result parameter, or a new Matrix2 instance if one was not provided.

#### Example

```ts
// Rotate a point 45 degrees counterclockwise.
const p = new Daisy.Cartesian2(5, 6);
const m = Daisy.Matrix2.fromRotation(Daisy.Math.toRadians(45.0));
const rotated = Daisy.Matrix2.multiplyByVector(m, p, new Daisy.Cartesian2());
```

***

### fromRowMajorArray()

> `static` **fromRowMajorArray**(`values`, `result?`): `Matrix2`

Creates a Matrix2 instance from a row-major order array.
The resulting matrix will be in column-major order.

#### Parameters

##### values

`number`[]

The row-major order array.

##### result?

`Matrix2`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix2`

The modified result parameter, or a new Matrix2 instance if one was not provided.

***

### fromScale()

> `static` **fromScale**(`scale`, `result?`): `Matrix2`

Computes a Matrix2 instance representing a non-uniform scale.

#### Parameters

##### scale

[`Cartesian2`](Daisy.Cartesian2.md)

The x and y scale factors.

##### result?

`Matrix2`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix2`

The modified result parameter, or a new Matrix2 instance if one was not provided.

#### Example

```ts
// Creates
// [7.0, 0.0]
// [0.0, 8.0]
const m = Daisy.Matrix2.fromScale(new Daisy.Cartesian2(7.0, 8.0));
```

***

### fromUniformScale()

> `static` **fromUniformScale**(`scale`, `result?`): `Matrix2`

Computes a Matrix2 instance representing a uniform scale.

#### Parameters

##### scale

`number`

The uniform scale factor.

##### result?

`Matrix2`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix2`

The modified result parameter, or a new Matrix2 instance if one was not provided.

#### Example

```ts
// Creates
// [2.0, 0.0]
// [0.0, 2.0]
const m = Daisy.Matrix2.fromUniformScale(2.0);
```

***

### getColumn()

> `static` **getColumn**(`matrix`, `index`, `result`): [`Cartesian2`](Daisy.Cartesian2.md)

Retrieves a copy of the matrix column at the provided index as a Cartesian2 instance.

#### Parameters

##### matrix

`Matrix2`

The matrix to use.

##### index

`number`

The zero-based index of the column to retrieve.

##### result

[`Cartesian2`](Daisy.Cartesian2.md)

The object onto which to store the result.

#### Returns

[`Cartesian2`](Daisy.Cartesian2.md)

The modified result parameter.

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
const myMatrix = new Daisy.Matrix2();
const column1Row0Index = Daisy.Matrix2.getElementIndex(1, 0);
const column1Row0 = myMatrix[column1Row0Index]
myMatrix[column1Row0Index] = 10.0;
```

***

### getMaximumScale()

> `static` **getMaximumScale**(`matrix`): `number`

Computes the maximum scale assuming the matrix is an affine transformation.
The maximum scale is the maximum length of the column vectors.

#### Parameters

##### matrix

`Matrix2`

The matrix.

#### Returns

`number`

The maximum scale.

***

### getRotation()

> `static` **getRotation**(`matrix`, `result`): `Matrix2`

Extracts the rotation matrix assuming the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix2`

The matrix.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

***

### getRow()

> `static` **getRow**(`matrix`, `index`, `result`): [`Cartesian2`](Daisy.Cartesian2.md)

Retrieves a copy of the matrix row at the provided index as a Cartesian2 instance.

#### Parameters

##### matrix

`Matrix2`

The matrix to use.

##### index

`number`

The zero-based index of the row to retrieve.

##### result

[`Cartesian2`](Daisy.Cartesian2.md)

The object onto which to store the result.

#### Returns

[`Cartesian2`](Daisy.Cartesian2.md)

The modified result parameter.

***

### getScale()

> `static` **getScale**(`matrix`, `result`): [`Cartesian2`](Daisy.Cartesian2.md)

Extracts the non-uniform scale assuming the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix2`

The matrix.

##### result

[`Cartesian2`](Daisy.Cartesian2.md)

The object onto which to store the result.

#### Returns

[`Cartesian2`](Daisy.Cartesian2.md)

The modified result parameter.

***

### multiply()

> `static` **multiply**(`left`, `right`, `result`): `Matrix2`

Computes the product of two matrices.

#### Parameters

##### left

`Matrix2`

The first matrix.

##### right

`Matrix2`

The second matrix.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

***

### multiplyByScalar()

> `static` **multiplyByScalar**(`matrix`, `scalar`, `result`): `Matrix2`

Computes the product of a matrix and a scalar.

#### Parameters

##### matrix

`Matrix2`

The matrix.

##### scalar

`number`

The number to multiply by.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

***

### multiplyByScale()

> `static` **multiplyByScale**(`matrix`, `scale`, `result`): `Matrix2`

Computes the product of a matrix times a (non-uniform) scale, as if the scale were a scale matrix.

#### Parameters

##### matrix

`Matrix2`

The matrix on the left-hand side.

##### scale

[`Cartesian2`](Daisy.Cartesian2.md)

The non-uniform scale on the right-hand side.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

#### Example

```ts
// Instead of Daisy.Matrix2.multiply(m, Daisy.Matrix2.fromScale(scale), m);
Daisy.Matrix2.multiplyByScale(m, scale, m);
```

***

### multiplyByUniformScale()

> `static` **multiplyByUniformScale**(`matrix`, `scale`, `result`): `Matrix2`

Computes the product of a matrix times a uniform scale, as if the scale were a scale matrix.

#### Parameters

##### matrix

`Matrix2`

The matrix on the left-hand side.

##### scale

`number`

The uniform scale on the right-hand side.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

#### Example

```ts
// Instead of Daisy.Matrix2.multiply(m, Daisy.Matrix2.fromUniformScale(scale), m);
Daisy.Matrix2.multiplyByUniformScale(m, scale, m);
```

***

### multiplyByVector()

> `static` **multiplyByVector**(`matrix`, `cartesian`, `result`): [`Cartesian2`](Daisy.Cartesian2.md)

Computes the product of a matrix and a column vector.

#### Parameters

##### matrix

`Matrix2`

The matrix.

##### cartesian

[`Cartesian2`](Daisy.Cartesian2.md)

The column.

##### result

[`Cartesian2`](Daisy.Cartesian2.md)

The object onto which to store the result.

#### Returns

[`Cartesian2`](Daisy.Cartesian2.md)

The modified result parameter.

***

### negate()

> `static` **negate**(`matrix`, `result`): `Matrix2`

Creates a negated copy of the provided matrix.

#### Parameters

##### matrix

`Matrix2`

The matrix to negate.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`Matrix2`

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

Flattens an array of Matrix2s into an array of components. The components
are stored in column-major order.

#### Parameters

##### array

`Matrix2`[]

The array of matrices to pack.

##### result?

`number`[]

The array onto which to store the result. If this is a typed array, it must have array.length * 4 components, else a DeveloperError will be thrown. If it is a regular array, it will be resized to have (array.length * 4) elements.

#### Returns

`number`[]

The packed array.

***

### setColumn()

> `static` **setColumn**(`matrix`, `index`, `cartesian`, `result`): `Matrix2`

Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian2 instance.

#### Parameters

##### matrix

`Matrix2`

The matrix to use.

##### index

`number`

The zero-based index of the column to set.

##### cartesian

[`Cartesian2`](Daisy.Cartesian2.md)

The Cartesian whose values will be assigned to the specified column.

##### result

[`Cartesian2`](Daisy.Cartesian2.md)

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

***

### setRotation()

> `static` **setRotation**(`matrix`, `rotation`, `result`): `Matrix2`

Sets the rotation assuming the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix2`

The matrix.

##### rotation

`Matrix2`

The rotation matrix.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

***

### setRow()

> `static` **setRow**(`matrix`, `index`, `cartesian`, `result`): `Matrix2`

Computes a new matrix that replaces the specified row in the provided matrix with the provided Cartesian2 instance.

#### Parameters

##### matrix

`Matrix2`

The matrix to use.

##### index

`number`

The zero-based index of the row to set.

##### cartesian

[`Cartesian2`](Daisy.Cartesian2.md)

The Cartesian whose values will be assigned to the specified row.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

***

### setScale()

> `static` **setScale**(`matrix`, `scale`, `result`): `Matrix2`

Computes a new matrix that replaces the scale with the provided scale.
This assumes the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix2`

The matrix to use.

##### scale

[`Cartesian2`](Daisy.Cartesian2.md)

The scale that replaces the scale of the provided matrix.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

***

### setUniformScale()

> `static` **setUniformScale**(`matrix`, `scale`, `result`): `Matrix2`

Computes a new matrix that replaces the scale with the provided uniform scale.
This assumes the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix2`

The matrix to use.

##### scale

`number`

The uniform scale that replaces the scale of the provided matrix.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

***

### subtract()

> `static` **subtract**(`left`, `right`, `result`): `Matrix2`

Computes the difference of two matrices.

#### Parameters

##### left

`Matrix2`

The first matrix.

##### right

`Matrix2`

The second matrix.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

***

### toArray()

> `static` **toArray**(`matrix`, `result?`): `number`[]

Creates an Array from the provided Matrix2 instance.
The array will be in column-major order.

#### Parameters

##### matrix

`Matrix2`

The matrix to use..

##### result?

`number`[]

The Array onto which to store the result.

#### Returns

`number`[]

The modified Array parameter or a new Array instance if one was not provided.

***

### transpose()

> `static` **transpose**(`matrix`, `result`): `Matrix2`

Computes the transpose of the provided matrix.

#### Parameters

##### matrix

`Matrix2`

The matrix to transpose.

##### result

`Matrix2`

The object onto which to store the result.

#### Returns

`Matrix2`

The modified result parameter.

***

### unpack()

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `Matrix2`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`Matrix2`

The object into which to store the result.

#### Returns

`Matrix2`

The modified result parameter or a new Matrix2 instance if one was not provided.

***

### unpackArray()

> `static` **unpackArray**(`array`, `result?`): `Matrix2`[]

Unpacks an array of column-major matrix components into an array of Matrix2s.

#### Parameters

##### array

`number`[]

The array of components to unpack.

##### result?

`Matrix2`[]

The array onto which to store the result.

#### Returns

`Matrix2`[]

The unpacked array.
