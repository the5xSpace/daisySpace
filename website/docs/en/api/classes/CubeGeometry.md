[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CubeGeometry

# Class: CubeGeometry

Daisy cone/cylinder (wraps CubeGeometry)

## Constructors

### Constructor

> **new CubeGeometry**(`options`): `CubeGeometry`

#### Parameters

##### options

[`CubeGeometryOptions`](../types/CubeGeometryOptions.md)

#### Returns

`CubeGeometry`

## Properties

### options

> **options**: [`CubeGeometryOptions`](../types/CubeGeometryOptions.md)

## Methods

### computeBeamFootprintOnGround()

> `static` **computeBeamFootprintOnGround**(`options`): `Cartographic`[]

Computes the intersection of the rectangular bottom boundary rays with the ellipsoid (projection footprint)
Consistent with the style of EllipticConeGeometry's computeBeamFootprintOnGround.

#### Parameters

##### options

###### bottomLength

`number`

###### bottomWidth

`number`

###### ellipsoid?

`Ellipsoid` \| [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

###### height

`number`

###### matrix

`Matrix4`

###### rayPosition

`Cartesian3`

###### slices?

`number`

#### Returns

`Cartographic`[]

***

### get2dPosition()

> `static` **get2dPosition**(`cubeGeometry`, `matrix`, `rayPosition`, `ellipsoid?`, `slices?`): `Cartesian3`[]

Gets the 2D footprint projection coordinates (Cartesian3) based on the rectangular bottom

#### Parameters

##### cubeGeometry

`CubeGeometry`

##### matrix

`Matrix4`

##### rayPosition

`Cartesian3`

##### ellipsoid?

`Ellipsoid` \| [`CelestialEllipsoid`](PW.CelestialEllipsoid.md)

##### slices?

`number` = `4`

#### Returns

`Cartesian3`[]
