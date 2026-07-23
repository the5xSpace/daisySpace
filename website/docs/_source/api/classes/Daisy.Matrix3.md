[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Matrix3

# Class: Matrix3

A 3x3 matrix, indexable as a column-major order array.
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

**column0Row1**

The value for column 0, row 1.

## Param

**column1Row1**

The value for column 1, row 1.

## Param

**column2Row1**

The value for column 2, row 1.

## Param

**column0Row2**

The value for column 0, row 2.

## Param

**column1Row2**

The value for column 1, row 2.

## Param

**column2Row2**

The value for column 2, row 2.

## Extends

- `ArrayLike`\<`number`\>

## Implements

- `ArrayLike`\<`number`\>

## Indexable

> \[`n`: `number`\]: `number`

## Constructors

### Constructor

> **new Matrix3**(`column0Row0?`, `column1Row0?`, `column2Row0?`, `column0Row1?`, `column1Row1?`, `column2Row1?`, `column0Row2?`, `column1Row2?`, `column2Row2?`): `Matrix3`

#### Parameters

##### column0Row0?

`number`

##### column1Row0?

`number`

##### column2Row0?

`number`

##### column0Row1?

`number`

##### column1Row1?

`number`

##### column2Row1?

`number`

##### column0Row2?

`number`

##### column1Row2?

`number`

##### column2Row2?

`number`

#### Returns

`Matrix3`

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

The index into Matrix3 for column 0, row 0.

***

### COLUMN0ROW1

> `readonly` `static` **COLUMN0ROW1**: `number`

The index into Matrix3 for column 0, row 1.

***

### COLUMN0ROW2

> `readonly` `static` **COLUMN0ROW2**: `number`

The index into Matrix3 for column 0, row 2.

***

### COLUMN1ROW0

> `readonly` `static` **COLUMN1ROW0**: `number`

The index into Matrix3 for column 1, row 0.

***

### COLUMN1ROW1

> `readonly` `static` **COLUMN1ROW1**: `number`

The index into Matrix3 for column 1, row 1.

***

### COLUMN1ROW2

> `readonly` `static` **COLUMN1ROW2**: `number`

The index into Matrix3 for column 1, row 2.

***

### COLUMN2ROW0

> `readonly` `static` **COLUMN2ROW0**: `number`

The index into Matrix3 for column 2, row 0.

***

### COLUMN2ROW1

> `readonly` `static` **COLUMN2ROW1**: `number`

The index into Matrix3 for column 2, row 1.

***

### COLUMN2ROW2

> `readonly` `static` **COLUMN2ROW2**: `number`

The index into Matrix3 for column 2, row 2.

***

### IDENTITY

> `readonly` `static` **IDENTITY**: `Matrix3`

An immutable Matrix3 instance initialized to the identity matrix.

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

***

### ZERO

> `readonly` `static` **ZERO**: `Matrix3`

An immutable Matrix3 instance initialized to the zero matrix.

## Methods

### clone()

> **clone**(`result?`): `Matrix3`

Duplicates the provided Matrix3 instance.

#### Parameters

##### result?

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter or a new Matrix3 instance if one was not provided.

***

### equals()

> **equals**(`right?`): `boolean`

Compares this matrix to the provided matrix componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`Matrix3`

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

`Matrix3`

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
on a separate line and in the format '(column0, column1, column2)'.

#### Returns

`string`

A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1, column2)'.

***

### abs()

> `static` **abs**(`matrix`, `result`): `Matrix3`

Computes a matrix, which contains the absolute (unsigned) values of the provided matrix's elements.

#### Parameters

##### matrix

`Matrix3`

The matrix with signed elements.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### add()

> `static` **add**(`left`, `right`, `result`): `Matrix3`

Computes the sum of two matrices.

#### Parameters

##### left

`Matrix3`

The first matrix.

##### right

`Matrix3`

The second matrix.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### clone()

> `static` **clone**(`matrix`, `result?`): `Matrix3`

Duplicates a Matrix3 instance.

#### Parameters

##### matrix

`Matrix3`

The matrix to duplicate.

##### result?

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter or a new Matrix3 instance if one was not provided. (Returns undefined if matrix is undefined)

***

### computeEigenDecomposition()

> `static` **computeEigenDecomposition**(`matrix`, `result?`): `any`

Computes the eigenvectors and eigenvalues of a symmetric matrix.

Returns a diagonal matrix and unitary matrix such that:
`matrix = unitary matrix * diagonal matrix * transpose(unitary matrix)`


The values along the diagonal of the diagonal matrix are the eigenvalues. The columns
of the unitary matrix are the corresponding eigenvectors.


#### Parameters

##### matrix

`Matrix3`

The matrix to decompose into diagonal and unitary matrix. Expected to be symmetric.

##### result?

`any`

An object with unitary and diagonal properties which are matrices onto which to store the result.

#### Returns

`any`

An object with unitary and diagonal properties which are the unitary and diagonal matrices, respectively.

#### Example

```ts
const a = //... symetric matrix
const result = {
 unitary : new Daisy.Matrix3(),
 diagonal : new Daisy.Matrix3()
};
Daisy.Matrix3.computeEigenDecomposition(a, result);

const unitaryTranspose = Daisy.Matrix3.transpose(result.unitary, new Daisy.Matrix3());
const b = Daisy.Matrix3.multiply(result.unitary, result.diagonal, new Daisy.Matrix3());
Daisy.Matrix3.multiply(b, unitaryTranspose, b); // b is now equal to a

const lambda = Daisy.Matrix3.getColumn(result.diagonal, 0, new Daisy.Cartesian3()).x; // first eigenvalue
const v = Daisy.Matrix3.getColumn(result.unitary, 0, new Daisy.Cartesian3()); // first eigenvector
const c = Daisy.Cartesian3.multiplyByScalar(v, lambda, new Daisy.Cartesian3()); // equal to Daisy.Matrix3.multiplyByVector(a, v)
```

***

### determinant()

> `static` **determinant**(`matrix`): `number`

Computes the determinant of the provided matrix.

#### Parameters

##### matrix

`Matrix3`

The matrix to use.

#### Returns

`number`

The value of the determinant of the matrix.

***

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Compares the provided matrices componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### left?

`Matrix3`

The first matrix.

##### right?

`Matrix3`

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

`Matrix3`

The first matrix.

##### right?

`Matrix3`

The second matrix.

##### epsilon?

`number`

The epsilon to use for equality testing.

#### Returns

`boolean`

`true` if left and right are within the provided epsilon, `false` otherwise.

***

### fromArray()

> `static` **fromArray**(`array`, `startingIndex?`, `result?`): `Matrix3`

Creates a Matrix3 from 9 consecutive elements in an array.

#### Parameters

##### array

`number`[]

The array whose 9 consecutive elements correspond to the positions of the matrix. Assumes column-major order.

##### startingIndex?

`number`

The offset into the array of the first element, which corresponds to first column first row position in the matrix.

##### result?

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter or a new Matrix3 instance if one was not provided.

#### Example

```ts
// Create the Matrix3:
// [1.0, 2.0, 3.0]
// [1.0, 2.0, 3.0]
// [1.0, 2.0, 3.0]

const v = [1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0];
const m = Daisy.Matrix3.fromArray(v);

// Create same Matrix3 with using an offset into an array
const v2 = [0.0, 0.0, 1.0, 1.0, 1.0, 2.0, 2.0, 2.0, 3.0, 3.0, 3.0];
const m2 = Daisy.Matrix3.fromArray(v2, 2);
```

***

### fromColumnMajorArray()

> `static` **fromColumnMajorArray**(`values`, `result?`): `Matrix3`

Creates a Matrix3 instance from a column-major order array.

#### Parameters

##### values

`number`[]

The column-major order array.

##### result?

`Matrix3`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix3`

The modified result parameter, or a new Matrix3 instance if one was not provided.

***

### fromCrossProduct()

> `static` **fromCrossProduct**(`vector`, `result?`): `Matrix3`

Computes a Matrix3 instance representing the cross product equivalent matrix of a Cartesian3 vector.

#### Parameters

##### vector

[`Cartesian3`](Daisy.Cartesian3.md)

the vector on the left hand side of the cross product operation.

##### result?

`Matrix3`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix3`

The modified result parameter, or a new Matrix3 instance if one was not provided.

#### Example

```ts
// Creates
// [0.0, -9.0, 8.0]
// [9.0, 0.0, -7.0]
// [-8.0, 7.0, 0.0]
const m = Daisy.Matrix3.fromCrossProduct(new Daisy.Cartesian3(7.0, 8.0, 9.0));
```

***

### fromHeadingPitchRoll()

> `static` **fromHeadingPitchRoll**(`headingPitchRoll`, `result?`): `Matrix3`

Computes a 3x3 rotation matrix from the provided headingPitchRoll. (see http://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles )

#### Parameters

##### headingPitchRoll

`HeadingPitchRoll`

the headingPitchRoll to use.

##### result?

`Matrix3`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix3`

The 3x3 rotation matrix from this headingPitchRoll.

***

### fromQuaternion()

> `static` **fromQuaternion**(`quaternion`, `result?`): `Matrix3`

Computes a 3x3 rotation matrix from the provided quaternion.

#### Parameters

##### quaternion

[`Quaternion`](Daisy.Quaternion.md)

the quaternion to use.

##### result?

`Matrix3`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix3`

The 3x3 rotation matrix from this quaternion.

***

### fromRotationX()

> `static` **fromRotationX**(`angle`, `result?`): `Matrix3`

Creates a rotation matrix around the x-axis.

#### Parameters

##### angle

`number`

The angle, in radians, of the rotation. Positive angles are counterclockwise.

##### result?

`Matrix3`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix3`

The modified result parameter, or a new Matrix3 instance if one was not provided.

#### Example

```ts
// Rotate a point 45 degrees counterclockwise around the x-axis.
const p = new Daisy.Cartesian3(5, 6, 7);
const m = Daisy.Matrix3.fromRotationX(Daisy.Math.toRadians(45.0));
const rotated = Daisy.Matrix3.multiplyByVector(m, p, new Daisy.Cartesian3());
```

***

### fromRotationY()

> `static` **fromRotationY**(`angle`, `result?`): `Matrix3`

Creates a rotation matrix around the y-axis.

#### Parameters

##### angle

`number`

The angle, in radians, of the rotation. Positive angles are counterclockwise.

##### result?

`Matrix3`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix3`

The modified result parameter, or a new Matrix3 instance if one was not provided.

#### Example

```ts
// Rotate a point 45 degrees counterclockwise around the y-axis.
const p = new Daisy.Cartesian3(5, 6, 7);
const m = Daisy.Matrix3.fromRotationY(Daisy.Math.toRadians(45.0));
const rotated = Daisy.Matrix3.multiplyByVector(m, p, new Daisy.Cartesian3());
```

***

### fromRotationZ()

> `static` **fromRotationZ**(`angle`, `result?`): `Matrix3`

Creates a rotation matrix around the z-axis.

#### Parameters

##### angle

`number`

The angle, in radians, of the rotation. Positive angles are counterclockwise.

##### result?

`Matrix3`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix3`

The modified result parameter, or a new Matrix3 instance if one was not provided.

#### Example

```ts
// Rotate a point 45 degrees counterclockwise around the z-axis.
const p = new Daisy.Cartesian3(5, 6, 7);
const m = Daisy.Matrix3.fromRotationZ(Daisy.Math.toRadians(45.0));
const rotated = Daisy.Matrix3.multiplyByVector(m, p, new Daisy.Cartesian3());
```

***

### fromRowMajorArray()

> `static` **fromRowMajorArray**(`values`, `result?`): `Matrix3`

Creates a Matrix3 instance from a row-major order array.
The resulting matrix will be in column-major order.

#### Parameters

##### values

`number`[]

The row-major order array.

##### result?

`Matrix3`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix3`

The modified result parameter, or a new Matrix3 instance if one was not provided.

***

### fromScale()

> `static` **fromScale**(`scale`, `result?`): `Matrix3`

Computes a Matrix3 instance representing a non-uniform scale.

#### Parameters

##### scale

[`Cartesian3`](Daisy.Cartesian3.md)

The x, y, and z scale factors.

##### result?

`Matrix3`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix3`

The modified result parameter, or a new Matrix3 instance if one was not provided.

#### Example

```ts
// Creates
// [7.0, 0.0, 0.0]
// [0.0, 8.0, 0.0]
// [0.0, 0.0, 9.0]
const m = Daisy.Matrix3.fromScale(new Daisy.Cartesian3(7.0, 8.0, 9.0));
```

***

### fromUniformScale()

> `static` **fromUniformScale**(`scale`, `result?`): `Matrix3`

Computes a Matrix3 instance representing a uniform scale.

#### Parameters

##### scale

`number`

The uniform scale factor.

##### result?

`Matrix3`

The object in which the result will be stored, if undefined a new instance will be created.

#### Returns

`Matrix3`

The modified result parameter, or a new Matrix3 instance if one was not provided.

#### Example

```ts
// Creates
// [2.0, 0.0, 0.0]
// [0.0, 2.0, 0.0]
// [0.0, 0.0, 2.0]
const m = Daisy.Matrix3.fromUniformScale(2.0);
```

***

### getColumn()

> `static` **getColumn**(`matrix`, `index`, `result`): [`Cartesian3`](Daisy.Cartesian3.md)

Retrieves a copy of the matrix column at the provided index as a Cartesian3 instance.

#### Parameters

##### matrix

`Matrix3`

The matrix to use.

##### index

`number`

The zero-based index of the column to retrieve.

##### result

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter.

***

### getElementIndex()

> `static` **getElementIndex**(`column`, `row`): `number`

Computes the array index of the element at the provided row and column.

#### Parameters

##### column

`number`

The zero-based index of the column.

##### row

`number`

The zero-based index of the row.

#### Returns

`number`

The index of the element at the provided row and column.

#### Example

```ts
const myMatrix = new Daisy.Matrix3();
const column1Row0Index = Daisy.Matrix3.getElementIndex(1, 0);
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

`Matrix3`

The matrix.

#### Returns

`number`

The maximum scale.

***

### getRotation()

> `static` **getRotation**(`matrix`, `result`): `Matrix3`

Extracts the rotation matrix assuming the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix3`

The matrix.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### getRow()

> `static` **getRow**(`matrix`, `index`, `result`): [`Cartesian3`](Daisy.Cartesian3.md)

Retrieves a copy of the matrix row at the provided index as a Cartesian3 instance.

#### Parameters

##### matrix

`Matrix3`

The matrix to use.

##### index

`number`

The zero-based index of the row to retrieve.

##### result

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter.

***

### getScale()

> `static` **getScale**(`matrix`, `result`): [`Cartesian3`](Daisy.Cartesian3.md)

Extracts the non-uniform scale assuming the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix3`

The matrix.

##### result

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter.

***

### inverse()

> `static` **inverse**(`matrix`, `result`): `Matrix3`

Computes the inverse of the provided matrix.

#### Parameters

##### matrix

`Matrix3`

The matrix to invert.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### inverseTranspose()

> `static` **inverseTranspose**(`matrix`, `result`): `Matrix3`

Computes the inverse transpose of a matrix.

#### Parameters

##### matrix

`Matrix3`

The matrix to transpose and invert.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### multiply()

> `static` **multiply**(`left`, `right`, `result`): `Matrix3`

Computes the product of two matrices.

#### Parameters

##### left

`Matrix3`

The first matrix.

##### right

`Matrix3`

The second matrix.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### multiplyByScalar()

> `static` **multiplyByScalar**(`matrix`, `scalar`, `result`): `Matrix3`

Computes the product of a matrix and a scalar.

#### Parameters

##### matrix

`Matrix3`

The matrix.

##### scalar

`number`

The number to multiply by.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### multiplyByScale()

> `static` **multiplyByScale**(`matrix`, `scale`, `result`): `Matrix3`

Computes the product of a matrix times a (non-uniform) scale, as if the scale were a scale matrix.

#### Parameters

##### matrix

`Matrix3`

The matrix on the left-hand side.

##### scale

[`Cartesian3`](Daisy.Cartesian3.md)

The non-uniform scale on the right-hand side.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

#### Example

```ts
// Instead of Daisy.Matrix3.multiply(m, Daisy.Matrix3.fromScale(scale), m);
Daisy.Matrix3.multiplyByScale(m, scale, m);
```

***

### multiplyByUniformScale()

> `static` **multiplyByUniformScale**(`matrix`, `scale`, `result`): `Matrix3`

Computes the product of a matrix times a uniform scale, as if the scale were a scale matrix.

#### Parameters

##### matrix

`Matrix3`

The matrix on the left-hand side.

##### scale

`number`

The uniform scale on the right-hand side.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

#### Example

```ts
// Instead of Daisy.Matrix3.multiply(m, Daisy.Matrix3.fromUniformScale(scale), m);
Daisy.Matrix3.multiplyByUniformScale(m, scale, m);
```

***

### multiplyByVector()

> `static` **multiplyByVector**(`matrix`, `cartesian`, `result`): [`Cartesian3`](Daisy.Cartesian3.md)

Computes the product of a matrix and a column vector.

#### Parameters

##### matrix

`Matrix3`

The matrix.

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The column.

##### result

[`Cartesian3`](Daisy.Cartesian3.md)

The object onto which to store the result.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter.

***

### negate()

> `static` **negate**(`matrix`, `result`): `Matrix3`

Creates a negated copy of the provided matrix.

#### Parameters

##### matrix

`Matrix3`

The matrix to negate.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`Matrix3`

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

Flattens an array of Matrix3s into an array of components. The components
are stored in column-major order.

#### Parameters

##### array

`Matrix3`[]

The array of matrices to pack.

##### result?

`number`[]

The array onto which to store the result. If this is a typed array, it must have array.length * 9 components, else a DeveloperError will be thrown. If it is a regular array, it will be resized to have (array.length * 9) elements.

#### Returns

`number`[]

The packed array.

***

### setColumn()

> `static` **setColumn**(`matrix`, `index`, `cartesian`, `result`): `Matrix3`

Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian3 instance.

#### Parameters

##### matrix

`Matrix3`

The matrix to use.

##### index

`number`

The zero-based index of the column to set.

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The Cartesian whose values will be assigned to the specified column.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### setRotation()

> `static` **setRotation**(`matrix`, `rotation`, `result`): `Matrix3`

Sets the rotation assuming the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix3`

The matrix.

##### rotation

`Matrix3`

The rotation matrix.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### setRow()

> `static` **setRow**(`matrix`, `index`, `cartesian`, `result`): `Matrix3`

Computes a new matrix that replaces the specified row in the provided matrix with the provided Cartesian3 instance.

#### Parameters

##### matrix

`Matrix3`

The matrix to use.

##### index

`number`

The zero-based index of the row to set.

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The Cartesian whose values will be assigned to the specified row.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### setScale()

> `static` **setScale**(`matrix`, `scale`, `result`): `Matrix3`

Computes a new matrix that replaces the scale with the provided scale.
This assumes the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix3`

The matrix to use.

##### scale

[`Cartesian3`](Daisy.Cartesian3.md)

The scale that replaces the scale of the provided matrix.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### setUniformScale()

> `static` **setUniformScale**(`matrix`, `scale`, `result`): `Matrix3`

Computes a new matrix that replaces the scale with the provided uniform scale.
This assumes the matrix is an affine transformation.

#### Parameters

##### matrix

`Matrix3`

The matrix to use.

##### scale

`number`

The uniform scale that replaces the scale of the provided matrix.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### subtract()

> `static` **subtract**(`left`, `right`, `result`): `Matrix3`

Computes the difference of two matrices.

#### Parameters

##### left

`Matrix3`

The first matrix.

##### right

`Matrix3`

The second matrix.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### toArray()

> `static` **toArray**(`matrix`, `result?`): `number`[]

Creates an Array from the provided Matrix3 instance.
The array will be in column-major order.

#### Parameters

##### matrix

`Matrix3`

The matrix to use..

##### result?

`number`[]

The Array onto which to store the result.

#### Returns

`number`[]

The modified Array parameter or a new Array instance if one was not provided.

***

### transpose()

> `static` **transpose**(`matrix`, `result`): `Matrix3`

Computes the transpose of the provided matrix.

#### Parameters

##### matrix

`Matrix3`

The matrix to transpose.

##### result

`Matrix3`

The object onto which to store the result.

#### Returns

`Matrix3`

The modified result parameter.

***

### unpack()

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `Matrix3`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`Matrix3`

The object into which to store the result.

#### Returns

`Matrix3`

The modified result parameter or a new Matrix3 instance if one was not provided.

***

### unpackArray()

> `static` **unpackArray**(`array`, `result?`): `Matrix3`[]

Unpacks an array of column-major matrix components into an array of Matrix3s.

#### Parameters

##### array

`number`[]

The array of components to unpack.

##### result?

`Matrix3`[]

The array onto which to store the result.

#### Returns

`Matrix3`[]

The unpacked array.
