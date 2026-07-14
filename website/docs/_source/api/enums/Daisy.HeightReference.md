[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / HeightReference

# Enumeration: HeightReference

Represents the position relative to the terrain.

## Enumeration Members

### CLAMP\_TO\_3D\_TILE

> **CLAMP\_TO\_3D\_TILE**: `5`

The position is clamped to 3D Tiles.

***

### CLAMP\_TO\_GROUND

> **CLAMP\_TO\_GROUND**: `1`

The position is clamped to the terrain and 3D Tiles. When clamping to 3D Tilesets such as photorealistic 3D Tiles, ensure the tileset has 3DTileset#enableCollision set to `true`. Otherwise, the entity may not be correctly clamped to the tileset surface.

***

### CLAMP\_TO\_TERRAIN

> **CLAMP\_TO\_TERRAIN**: `3`

The position is clamped to terain.

***

### NONE

> **NONE**: `0`

The position is absolute.

***

### RELATIVE\_TO\_3D\_TILE

> **RELATIVE\_TO\_3D\_TILE**: `6`

The position height is the height above 3D Tiles.

***

### RELATIVE\_TO\_GROUND

> **RELATIVE\_TO\_GROUND**: `2`

The position height is the height above the terrain and 3D Tiles.

***

### RELATIVE\_TO\_TERRAIN

> **RELATIVE\_TO\_TERRAIN**: `4`

The position height is the height above terrain.
