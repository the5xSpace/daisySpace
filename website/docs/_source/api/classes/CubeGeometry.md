[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / CubeGeometry

# Class: CubeGeometry

Daisy圆锥/柱体（封装 CubeGeometry）

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

计算矩形底面边界射线与椭球的交点（投影 footprint）
与 EllipticConeGeometry 的 computeBeamFootprintOnGround 风格一致。

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

获取用于2D绘图的 footprint 投影坐标（Cartesian3），基于矩形底面

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
