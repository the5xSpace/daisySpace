[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / Ray

# Class: Ray

Represents a ray that extends infinitely from the provided origin in the provided direction.

## Param

**origin**

The origin of the ray.

## Param

**direction**

The direction of the ray.

## Constructors

### Constructor

> **new Ray**(`origin?`, `direction?`): `Ray`

#### Parameters

##### origin?

[`Cartesian3`](Daisy.Cartesian3.md)

##### direction?

[`Cartesian3`](Daisy.Cartesian3.md)

#### Returns

`Ray`

## Properties

### direction

> **direction**: [`Cartesian3`](Daisy.Cartesian3.md)

The direction of the ray.

***

### origin

> **origin**: [`Cartesian3`](Daisy.Cartesian3.md)

The origin of the ray.

## Methods

### clone()

> `static` **clone**(`ray`, `result?`): `Ray`

Duplicates a Ray instance.

#### Parameters

##### ray

`Ray`

The ray to duplicate.

##### result?

`Ray`

The object onto which to store the result.

#### Returns

`Ray`

The modified result parameter or a new Ray instance if one was not provided. (Returns undefined if ray is undefined)

***

### getPoint()

> `static` **getPoint**(`ray`, `t`, `result?`): [`Cartesian3`](Daisy.Cartesian3.md)

Computes the point along the ray given by r(t) = o + t*d,
where o is the origin of the ray and d is the direction.

#### Parameters

##### ray

`Ray`

The ray.

##### t

`number`

A scalar value.

##### result?

[`Cartesian3`](Daisy.Cartesian3.md)

The object in which the result will be stored.

#### Returns

[`Cartesian3`](Daisy.Cartesian3.md)

The modified result parameter, or a new instance if none was provided.

#### Example

```ts
//Get the first intersection point of a ray and an ellipsoid.
const intersection = Daisy.IntersectionTests.rayEllipsoid(ray, ellipsoid);
const point = Daisy.Ray.getPoint(ray, intersection.start);
```
