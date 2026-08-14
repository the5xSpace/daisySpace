[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / GeographicTilingScheme

# Class: GeographicTilingScheme

A tiling scheme for geometry referenced to a simple GeographicProjection where
longitude and latitude are directly mapped to X and Y. This projection is commonly
known as geographic, equirectangular, equidistant cylindrical, or plate carrée.

## Param

Object with the following properties:

## Param

The ellipsoid whose surface is being tiled. Defaults to
the default ellipsoid.

## Param

The rectangle, in radians, covered by the tiling scheme.

## Param

The number of tiles in the X direction at level zero of
the tile tree.

## Param

The number of tiles in the Y direction at level zero of
the tile tree.

## Constructors

### Constructor

> **new GeographicTilingScheme**(`options?`): `GeographicTilingScheme`

#### Parameters

##### options?

###### ellipsoid?

[`Ellipsoid`](Daisy.Ellipsoid.md)

###### numberOfLevelZeroTilesX?

`number`

###### numberOfLevelZeroTilesY?

`number`

###### rectangle?

[`Rectangle`](Daisy.Rectangle.md)

#### Returns

`GeographicTilingScheme`

## Properties

### ellipsoid

> **ellipsoid**: [`Ellipsoid`](Daisy.Ellipsoid.md)

Gets the ellipsoid that is tiled by this tiling scheme.

***

### projection

> **projection**: `MapProjection`

Gets the map projection used by this tiling scheme.

***

### rectangle

> **rectangle**: [`Rectangle`](Daisy.Rectangle.md)

Gets the rectangle, in radians, covered by this tiling scheme.

## Methods

### getNumberOfXTilesAtLevel()

> **getNumberOfXTilesAtLevel**(`level`): `number`

Gets the total number of tiles in the X direction at a specified level-of-detail.

#### Parameters

##### level

`number`

The level-of-detail.

#### Returns

`number`

The number of tiles in the X direction at the given level.

***

### getNumberOfYTilesAtLevel()

> **getNumberOfYTilesAtLevel**(`level`): `number`

Gets the total number of tiles in the Y direction at a specified level-of-detail.

#### Parameters

##### level

`number`

The level-of-detail.

#### Returns

`number`

The number of tiles in the Y direction at the given level.

***

### positionToTileXY()

> **positionToTileXY**(`position`, `level`, `result?`): [`Cartesian2`](Daisy.Cartesian2.md)

Calculates the tile x, y coordinates of the tile containing
a given cartographic position.

#### Parameters

##### position

[`Cartographic`](Daisy.Cartographic.md)

The position.

##### level

`number`

The tile level-of-detail. Zero is the least detailed.

##### result?

[`Cartesian2`](Daisy.Cartesian2.md)

The instance to which to copy the result, or undefined if a new instance
 should be created.

#### Returns

[`Cartesian2`](Daisy.Cartesian2.md)

The specified 'result', or a new object containing the tile x, y coordinates
 if 'result' is undefined.

***

### rectangleToNativeRectangle()

> **rectangleToNativeRectangle**(`rectangle`, `result?`): [`Rectangle`](Daisy.Rectangle.md)

Transforms a rectangle specified in geodetic radians to the native coordinate system
of this tiling scheme.

#### Parameters

##### rectangle

[`Rectangle`](Daisy.Rectangle.md)

The rectangle to transform.

##### result?

[`Rectangle`](Daisy.Rectangle.md)

The instance to which to copy the result, or undefined if a new instance
 should be created.

#### Returns

[`Rectangle`](Daisy.Rectangle.md)

The specified 'result', or a new object containing the native rectangle if 'result'
 is undefined.

***

### tileXYToNativeRectangle()

> **tileXYToNativeRectangle**(`x`, `y`, `level`, `result?`): [`Rectangle`](Daisy.Rectangle.md)

Converts tile x, y coordinates and level to a rectangle expressed in the native coordinates
of the tiling scheme.

#### Parameters

##### x

`number`

The integer x coordinate of the tile.

##### y

`number`

The integer y coordinate of the tile.

##### level

`number`

The tile level-of-detail. Zero is the least detailed.

##### result?

`any`

The instance to which to copy the result, or undefined if a new instance
 should be created.

#### Returns

[`Rectangle`](Daisy.Rectangle.md)

The specified 'result', or a new object containing the rectangle
 if 'result' is undefined.

***

### tileXYToRectangle()

> **tileXYToRectangle**(`x`, `y`, `level`, `result?`): [`Rectangle`](Daisy.Rectangle.md)

Converts tile x, y coordinates and level to a cartographic rectangle in radians.

#### Parameters

##### x

`number`

The integer x coordinate of the tile.

##### y

`number`

The integer y coordinate of the tile.

##### level

`number`

The tile level-of-detail. Zero is the least detailed.

##### result?

`any`

The instance to which to copy the result, or undefined if a new instance
 should be created.

#### Returns

[`Rectangle`](Daisy.Rectangle.md)

The specified 'result', or a new object containing the rectangle
 if 'result' is undefined.
