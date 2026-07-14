[**daisy-space-sdk v0.3.0**](../README.md)

***

[daisy-space-sdk](../README.md) / [Daisy](../modules/Daisy.md) / [CustomHeightmapTerrainProvider](../modules/Daisy.CustomHeightmapTerrainProvider.md) / GeometryCallback

# Type Alias: GeometryCallback

> **GeometryCallback** = (`x`, `y`, `level`) => `Int8Array` \| `Uint8Array` \| `Int16Array` \| `Uint16Array` \| `Int32Array` \| `Uint32Array` \| `Float32Array` \| `Float64Array` \| `number`[] \| `Promise`\<`Int8Array` \| `Uint8Array` \| `Int16Array` \| `Uint16Array` \| `Int32Array` \| `Uint32Array` \| `Float32Array` \| `Float64Array` \| `number`[]\> \| `undefined`

## Parameters

### x

`number`

The X coordinate of the tile for which to request geometry.

### y

`number`

The Y coordinate of the tile for which to request geometry.

### level

`number`

The level of the tile for which to request geometry.

## Returns

`Int8Array` \| `Uint8Array` \| `Int16Array` \| `Uint16Array` \| `Int32Array` \| `Uint32Array` \| `Float32Array` \| `Float64Array` \| `number`[] \| `Promise`\<`Int8Array` \| `Uint8Array` \| `Int16Array` \| `Uint16Array` \| `Int32Array` \| `Uint32Array` \| `Float32Array` \| `Float64Array` \| `number`[]\> \| `undefined`
