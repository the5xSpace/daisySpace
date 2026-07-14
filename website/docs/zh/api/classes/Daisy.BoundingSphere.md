[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / BoundingSphere

# Class: BoundingSphere

A bounding sphere with a center and a radius.

## Param

The center of the bounding sphere.

## Param

The radius of the bounding sphere.

## Constructors

### Constructor

> **new BoundingSphere**(`center?`, `radius?`): `BoundingSphere`

#### Parameters

##### center?

[`Cartesian3`](Daisy.Cartesian3.md)

##### radius?

`number`

#### Returns

`BoundingSphere`

## Properties

### center

> **center**: [`Cartesian3`](Daisy.Cartesian3.md)

The center point of the sphere.

***

### radius

> **radius**: `number`

The radius of the sphere.

***

### packedLength

> `static` **packedLength**: `number`

The number of elements used to pack the object into an array.

## Methods

### clone()

> **clone**(`result?`): `BoundingSphere`

Duplicates this BoundingSphere instance.

#### Parameters

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

***

### computePlaneDistances()

> **computePlaneDistances**(`position`, `direction`, `result?`): `Interval`

The distances calculated by the vector from the center of the bounding sphere to position projected onto direction
plus/minus the radius of the bounding sphere.


If you imagine the infinite number of planes with normal direction, this computes the smallest distance to the
closest and farthest planes from position that intersect the bounding sphere.

#### Parameters

##### position

[`Cartesian3`](Daisy.Cartesian3.md)

The position to calculate the distance from.

##### direction

[`Cartesian3`](Daisy.Cartesian3.md)

The direction from position.

##### result?

`Interval`

A Interval to store the nearest and farthest distances.

#### Returns

`Interval`

The nearest and farthest distances on the bounding sphere from position in direction.

***

### distanceSquaredTo()

> **distanceSquaredTo**(`cartesian`): `number`

Computes the estimated distance squared from the closest point on a bounding sphere to a point.

#### Parameters

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The point

#### Returns

`number`

The estimated distance squared from the bounding sphere to the point.

#### Example

```ts
// Sort bounding spheres from back to front
spheres.sort(function(a, b) {
 return b.distanceSquaredTo(camera.positionWC) - a.distanceSquaredTo(camera.positionWC);
});
```

***

### equals()

> **equals**(`right?`): `boolean`

Compares this BoundingSphere against the provided BoundingSphere componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### right?

`BoundingSphere`

The right hand side BoundingSphere.

#### Returns

`boolean`

`true` if they are equal, `false` otherwise.

***

### intersectPlane()

> **intersectPlane**(`plane`): `Intersect`

Determines which side of a plane the sphere is located.

#### Parameters

##### plane

`Plane`

The plane to test against.

#### Returns

`Intersect`

Intersect.INSIDE if the entire sphere is on the side of the plane
 the normal is pointing, Intersect.OUTSIDE if the entire sphere is
 on the opposite side, and Intersect.INTERSECTING if the sphere
 intersects the plane.

***

### isOccluded()

> **isOccluded**(`occluder`): `boolean`

Determines whether or not a sphere is hidden from view by the occluder.

#### Parameters

##### occluder

`Occluder`

The occluder.

#### Returns

`boolean`

`true` if the sphere is not visible; otherwise `false`.

***

### volume()

> **volume**(): `number`

Computes the radius of the BoundingSphere.

#### Returns

`number`

The radius of the BoundingSphere.

***

### clone()

> `static` **clone**(`sphere`, `result?`): `BoundingSphere`

Duplicates a BoundingSphere instance.

#### Parameters

##### sphere

`BoundingSphere`

The bounding sphere to duplicate.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided. (Returns undefined if sphere is undefined)

***

### computePlaneDistances()

> `static` **computePlaneDistances**(`sphere`, `position`, `direction`, `result?`): `Interval`

The distances calculated by the vector from the center of the bounding sphere to position projected onto direction
plus/minus the radius of the bounding sphere.


If you imagine the infinite number of planes with normal direction, this computes the smallest distance to the
closest and farthest planes from position that intersect the bounding sphere.

#### Parameters

##### sphere

`BoundingSphere`

The bounding sphere to calculate the distance to.

##### position

[`Cartesian3`](Daisy.Cartesian3.md)

The position to calculate the distance from.

##### direction

[`Cartesian3`](Daisy.Cartesian3.md)

The direction from position.

##### result?

`Interval`

A Interval to store the nearest and farthest distances.

#### Returns

`Interval`

The nearest and farthest distances on the bounding sphere from position in direction.

***

### distanceSquaredTo()

> `static` **distanceSquaredTo**(`sphere`, `cartesian`): `number`

Computes the estimated distance squared from the closest point on a bounding sphere to a point.

#### Parameters

##### sphere

`BoundingSphere`

The sphere.

##### cartesian

[`Cartesian3`](Daisy.Cartesian3.md)

The point

#### Returns

`number`

The distance squared from the bounding sphere to the point. Returns 0 if the point is inside the sphere.

#### Example

```ts
// Sort bounding spheres from back to front
spheres.sort(function(a, b) {
 return Daisy.BoundingSphere.distanceSquaredTo(b, camera.positionWC) - Daisy.BoundingSphere.distanceSquaredTo(a, camera.positionWC);
});
```

***

### equals()

> `static` **equals**(`left?`, `right?`): `boolean`

Compares the provided BoundingSphere componentwise and returns
`true` if they are equal, `false` otherwise.

#### Parameters

##### left?

`BoundingSphere`

The first BoundingSphere.

##### right?

`BoundingSphere`

The second BoundingSphere.

#### Returns

`boolean`

`true` if left and right are equal, `false` otherwise.

***

### expand()

> `static` **expand**(`sphere`, `point`, `result?`): `BoundingSphere`

Computes a bounding sphere by enlarging the provided sphere to contain the provided point.

#### Parameters

##### sphere

`BoundingSphere`

A sphere to expand.

##### point

[`Cartesian3`](Daisy.Cartesian3.md)

A point to enclose in a bounding sphere.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

***

### fromBoundingSpheres()

> `static` **fromBoundingSpheres**(`boundingSpheres?`, `result?`): `BoundingSphere`

Computes a tight-fitting bounding sphere enclosing the provided array of bounding spheres.

#### Parameters

##### boundingSpheres?

`BoundingSphere`[]

The array of bounding spheres.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

***

### fromCornerPoints()

> `static` **fromCornerPoints**(`corner?`, `oppositeCorner?`, `result?`): `BoundingSphere`

Computes a bounding sphere from the corner points of an axis-aligned bounding box. The sphere
tightly and fully encompasses the box.

#### Parameters

##### corner?

[`Cartesian3`](Daisy.Cartesian3.md)

The minimum height over the rectangle.

##### oppositeCorner?

[`Cartesian3`](Daisy.Cartesian3.md)

The maximum height over the rectangle.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

#### Example

```ts
// Create a bounding sphere around the unit cube
const sphere = Daisy.BoundingSphere.fromCornerPoints(new Daisy.Cartesian3(-0.5, -0.5, -0.5), new Daisy.Cartesian3(0.5, 0.5, 0.5));
```

***

### fromEllipsoid()

> `static` **fromEllipsoid**(`ellipsoid`, `result?`): `BoundingSphere`

Creates a bounding sphere encompassing an ellipsoid.

#### Parameters

##### ellipsoid

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid around which to create a bounding sphere.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

#### Example

```ts
const boundingSphere = Daisy.BoundingSphere.fromEllipsoid(ellipsoid);
```

***

### fromEncodedCartesianVertices()

> `static` **fromEncodedCartesianVertices**(`positionsHigh?`, `positionsLow?`, `result?`): `BoundingSphere`

Computes a tight-fitting bounding sphere enclosing a list of EncodedCartesian3s, where the points are
stored in parallel flat arrays in X, Y, Z, order. The bounding sphere is computed by running two
algorithms, a naive algorithm and Ritter's algorithm. The smaller of the two spheres is used to
ensure a tight fit.

#### Parameters

##### positionsHigh?

`number`[]

An array of high bits of the encoded cartesians that the bounding sphere will enclose. Each point
 is formed from three elements in the array in the order X, Y, Z.

##### positionsLow?

`number`[]

An array of low bits of the encoded cartesians that the bounding sphere will enclose. Each point
 is formed from three elements in the array in the order X, Y, Z.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if one was not provided.

***

### fromOrientedBoundingBox()

> `static` **fromOrientedBoundingBox**(`orientedBoundingBox`, `result?`): `BoundingSphere`

Computes a tight-fitting bounding sphere enclosing the provided oriented bounding box.

#### Parameters

##### orientedBoundingBox

`OrientedBoundingBox`

The oriented bounding box.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

***

### fromPoints()

> `static` **fromPoints**(`positions?`, `result?`): `BoundingSphere`

Computes a tight-fitting bounding sphere enclosing a list of 3D Cartesian points.
The bounding sphere is computed by running two algorithms, a naive algorithm and
Ritter's algorithm. The smaller of the two spheres is used to ensure a tight fit.

#### Parameters

##### positions?

[`Cartesian3`](Daisy.Cartesian3.md)[]

An array of points that the bounding sphere will enclose. Each point must have `x`, `y`, and `z` properties.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if one was not provided.

***

### fromRectangle2D()

> `static` **fromRectangle2D**(`rectangle?`, `projection?`, `result?`): `BoundingSphere`

Computes a bounding sphere from a rectangle projected in 2D.

#### Parameters

##### rectangle?

[`Rectangle`](Daisy.Rectangle.md)

The rectangle around which to create a bounding sphere.

##### projection?

`any`

The projection used to project the rectangle into 2D.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

***

### fromRectangle3D()

> `static` **fromRectangle3D**(`rectangle?`, `ellipsoid?`, `surfaceHeight?`, `result?`): `BoundingSphere`

Computes a bounding sphere from a rectangle in 3D. The bounding sphere is created using a subsample of points
on the ellipsoid and contained in the rectangle. It may not be accurate for all rectangles on all types of ellipsoids.

#### Parameters

##### rectangle?

[`Rectangle`](Daisy.Rectangle.md)

The valid rectangle used to create a bounding sphere.

##### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

The ellipsoid used to determine positions of the rectangle.

##### surfaceHeight?

`number`

The height above the surface of the ellipsoid.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

***

### fromRectangleWithHeights2D()

> `static` **fromRectangleWithHeights2D**(`rectangle?`, `projection?`, `minimumHeight?`, `maximumHeight?`, `result?`): `BoundingSphere`

Computes a bounding sphere from a rectangle projected in 2D. The bounding sphere accounts for the
object's minimum and maximum heights over the rectangle.

#### Parameters

##### rectangle?

[`Rectangle`](Daisy.Rectangle.md)

The rectangle around which to create a bounding sphere.

##### projection?

`any`

The projection used to project the rectangle into 2D.

##### minimumHeight?

`number`

The minimum height over the rectangle.

##### maximumHeight?

`number`

The maximum height over the rectangle.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

***

### fromTransformation()

> `static` **fromTransformation**(`transformation`, `result?`): `BoundingSphere`

Computes a tight-fitting bounding sphere enclosing the provided affine transformation.

#### Parameters

##### transformation

[`Matrix4`](Daisy.Matrix4.md)

The affine transformation.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

***

### fromVertices()

> `static` **fromVertices**(`positions?`, `center?`, `stride?`, `result?`): `BoundingSphere`

Computes a tight-fitting bounding sphere enclosing a list of 3D points, where the points are
stored in a flat array in X, Y, Z, order. The bounding sphere is computed by running two
algorithms, a naive algorithm and Ritter's algorithm. The smaller of the two spheres is used to
ensure a tight fit.

#### Parameters

##### positions?

`number`[]

An array of points that the bounding sphere will enclose. Each point
 is formed from three elements in the array in the order X, Y, Z.

##### center?

[`Cartesian3`](Daisy.Cartesian3.md)

The position to which the positions are relative, which need not be the
 origin of the coordinate system. This is useful when the positions are to be used for
 relative-to-center (RTC) rendering.

##### stride?

`number`

The number of array elements per vertex. It must be at least 3, but it may
 be higher. Regardless of the value of this parameter, the X coordinate of the first position
 is at array index 0, the Y coordinate is at array index 1, and the Z coordinate is at array index
 2. When stride is 3, the X coordinate of the next position then begins at array index 3. If
 the stride is 5, however, two array elements are skipped and the next position begins at array
 index 5.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if one was not provided.

#### Example

```ts
// Compute the bounding sphere from 3 positions, each specified relative to a center.
// In addition to the X, Y, and Z coordinates, the points array contains two additional
// elements per point which are ignored for the purpose of computing the bounding sphere.
const center = new Daisy.Cartesian3(1.0, 2.0, 3.0);
const points = [1.0, 2.0, 3.0, 0.1, 0.2,
 4.0, 5.0, 6.0, 0.1, 0.2,
 7.0, 8.0, 9.0, 0.1, 0.2];
const sphere = Daisy.BoundingSphere.fromVertices(points, center, 5);
```

***

### intersectPlane()

> `static` **intersectPlane**(`sphere`, `plane`): `Intersect`

Determines which side of a plane a sphere is located.

#### Parameters

##### sphere

`BoundingSphere`

The bounding sphere to test.

##### plane

`Plane`

The plane to test against.

#### Returns

`Intersect`

Intersect.INSIDE if the entire sphere is on the side of the plane
 the normal is pointing, Intersect.OUTSIDE if the entire sphere is
 on the opposite side, and Intersect.INTERSECTING if the sphere
 intersects the plane.

***

### isOccluded()

> `static` **isOccluded**(`sphere`, `occluder`): `boolean`

Determines whether or not a sphere is hidden from view by the occluder.

#### Parameters

##### sphere

`BoundingSphere`

The bounding sphere surrounding the occluded object.

##### occluder

`Occluder`

The occluder.

#### Returns

`boolean`

`true` if the sphere is not visible; otherwise `false`.

***

### pack()

> `static` **pack**(`value`, `array`, `startingIndex?`): `number`[]

Stores the provided instance into the provided array.

#### Parameters

##### value

`BoundingSphere`

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

### projectTo2D()

> `static` **projectTo2D**(`sphere`, `projection?`, `result?`): `BoundingSphere`

Creates a bounding sphere in 2D from a bounding sphere in 3D world coordinates.

#### Parameters

##### sphere

`BoundingSphere`

The bounding sphere to transform to 2D.

##### projection?

`any`

The projection to 2D.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

***

### transform()

> `static` **transform**(`sphere`, `transform`, `result?`): `BoundingSphere`

Applies a 4x4 affine transformation matrix to a bounding sphere.

#### Parameters

##### sphere

`BoundingSphere`

The bounding sphere to apply the transformation to.

##### transform

[`Matrix4`](Daisy.Matrix4.md)

The transformation matrix to apply to the bounding sphere.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

***

### transformWithoutScale()

> `static` **transformWithoutScale**(`sphere`, `transform`, `result?`): `BoundingSphere`

Applies a 4x4 affine transformation matrix to a bounding sphere where there is no scale
The transformation matrix is not verified to have a uniform scale of 1.
This method is faster than computing the general bounding sphere transform using [BoundingSphere.transform](#transform).

#### Parameters

##### sphere

`BoundingSphere`

The bounding sphere to apply the transformation to.

##### transform

[`Matrix4`](Daisy.Matrix4.md)

The transformation matrix to apply to the bounding sphere.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

#### Example

```ts
const modelMatrix = Daisy.Transforms.eastNorthUpToFixedFrame(positionOnEllipsoid);
const boundingSphere = new Daisy.BoundingSphere();
const newBoundingSphere = Daisy.BoundingSphere.transformWithoutScale(boundingSphere, modelMatrix);
```

***

### union()

> `static` **union**(`left`, `right`, `result?`): `BoundingSphere`

Computes a bounding sphere that contains both the left and right bounding spheres.

#### Parameters

##### left

`BoundingSphere`

A sphere to enclose in a bounding sphere.

##### right

`BoundingSphere`

A sphere to enclose in a bounding sphere.

##### result?

`BoundingSphere`

The object onto which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if none was provided.

***

### unpack()

> `static` **unpack**(`array`, `startingIndex?`, `result?`): `BoundingSphere`

Retrieves an instance from a packed array.

#### Parameters

##### array

`number`[]

The packed array.

##### startingIndex?

`number`

The starting index of the element to be unpacked.

##### result?

`BoundingSphere`

The object into which to store the result.

#### Returns

`BoundingSphere`

The modified result parameter or a new BoundingSphere instance if one was not provided.
